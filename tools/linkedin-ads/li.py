#!/usr/bin/env python3
"""li: read-only LinkedIn Ads (Advertising API) client for this project.

Stdlib only, same shape as tools/tiktok-ads/tt.py. Auth is one member access
token (60 days) plus its refresh token (about a year), minted once with
LinkedIn's OAuth Token Generator and kept in .env at the project root.

Usage (run through tools/linkedin-ads/li, which supplies the Python):
  li auth status                   verify the token: scopes, expiry, accounts
  li auth refresh [--save]         trade the refresh token for a new access token
  li accounts                      every ad account the token's login can read
  li campaigns <ACCOUNT_ID>        campaigns: status, objective, budget, schedule
  li groups <ACCOUNT_ID>           campaign groups
  li creatives <ACCOUNT_ID>        ads: campaign, review status, serving holds
  li report <ACCOUNT_ID>           spend, impressions, clicks, conversions, leads
  li raw "<path?query>"            read-only escape hatch (GET, allowlisted)

Report options:
  --level campaign|group|creative|account   what each row is (default: campaign)
  --since YYYY-MM-DD                        first day (default: 7 days ago)
  --until YYYY-MM-DD                        last day (default: yesterday)
  --daily                                   one row per day instead of one total
  --all                                     include rows with no activity
  --metrics a,b,c                           replace the default adAnalytics fields

Campaign, group and creative options:
  --all                 include REMOVED and ARCHIVED items (hidden by default)

Options:
  -o json|table|jsonl   output format (default: table)
  --save                on `auth refresh`, write the new token into .env

Environment (read from .env at the project root when not already set):
  LINKEDIN_CLIENT_ID       the developer app's Client ID
  LINKEDIN_CLIENT_SECRET   that app's Primary Client Secret
  LINKEDIN_ACCESS_TOKEN    from the Token Generator, or `auth refresh --save`
  LINKEDIN_REFRESH_TOKEN   from the Token Generator
  LINKEDIN_API_VERSION     YYYYMM, default 202609 (LinkedIn retires a version
                           about a year after release; bump it on HTTP 426)

Read-only by construction: every API call here is a GET, the token carries only
r_ads and r_ads_reporting, and `raw` refuses any path outside its allowlist.
Money is reported in the account's own currency (costInLocalCurrency).
"""

import datetime
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

API_HOST = "https://api.linkedin.com/rest"
OAUTH_HOST = "https://www.linkedin.com/oauth/v2"
PROJECT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TOKEN_HINT = "run `li auth refresh --save`, or mint a new token (installations/linkedin-ads/install.md)"

# `raw` is an escape hatch, not a write path. Anchored allowlist over the
# DECODED path, query string excluded. Only GET is ever sent.
RAW_GET_PATHS = [
    r"adAccounts",
    r"adAccounts/\d+",
    r"adAccounts/\d+/adCampaigns(/\d+)?",
    r"adAccounts/\d+/adCampaignGroups(/\d+)?",
    r"adAccounts/\d+/creatives(/[^/]+)?",
    r"adAccountUsers",
    r"adAnalytics",
]


def die(msg, hint=None):
    sys.stderr.write(f"li: {msg}\n")
    if hint:
        sys.stderr.write(f"    {hint}\n")
    sys.exit(1)


def load_dotenv():
    """Pull LINKEDIN_* lines from the project .env without overriding the shell.

    Empty values are skipped, so a blank placeholder line never masks a real
    value set in the shell. A trailing `# comment` is dropped.
    """
    path = os.path.join(PROJECT, ".env")
    if not os.path.exists(path):
        return
    with open(path, encoding="utf-8") as f:
        for line in f:
            m = re.match(
                r'\s*(?:export\s+)?(LINKEDIN_[A-Z0-9_]+)=(["\']?)(.*?)\2\s*(?:#.*)?$',
                line)
            if m and m.group(3) and m.group(1) not in os.environ:
                os.environ[m.group(1)] = m.group(3)


def api_version():
    return os.environ.get("LINKEDIN_API_VERSION", "202609")


def need(var, hint):
    val = os.environ.get(var, "").strip()
    if not val:
        die(f"{var} is not set", hint)
    return val


def call(path, query=""):
    """One GET against the versioned REST API.

    `query` is a pre-built query string: Rest.li 2.0 wants its (a:b,c:d)
    syntax left as is, so only URN values are percent-encoded, by the caller.
    """
    token = need("LINKEDIN_ACCESS_TOKEN", TOKEN_HINT)
    url = f"{API_HOST}/{path.lstrip('/')}" + (f"?{query}" if query else "")
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {token}",
        "LinkedIn-Version": api_version(),
        "X-Restli-Protocol-Version": "2.0.0",
    })
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")
        hints = {
            401: "the access token is invalid or expired; " + TOKEN_HINT,
            403: "this login has no role on that ad account, or the scope is missing",
            426: f"API version {api_version()} is retired; set LINKEDIN_API_VERSION to a newer YYYYMM",
        }
        die(f"HTTP {e.code} from {url}\n{body[:800]}", hints.get(e.code))
    except urllib.error.URLError as e:
        die(f"network error: {e.reason}")


def paged(path, query):
    """Walk LinkedIn's pageToken cursor (pageSize 100) to the end."""
    rows, token = [], None
    while True:
        q = f"{query}&pageSize=100" + (f"&pageToken={urllib.parse.quote(token)}" if token else "")
        data = call(path, q)
        rows.extend(data.get("elements", []))
        token = (data.get("metadata") or {}).get("nextPageToken")
        if not token or not data.get("elements"):
            return rows


def oauth_post(endpoint, fields):
    data = urllib.parse.urlencode(fields).encode()
    req = urllib.request.Request(f"{OAUTH_HOST}/{endpoint}", data=data, method="POST",
                                 headers={"Content-Type": "application/x-www-form-urlencoded"})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        die(f"HTTP {e.code} from {endpoint}\n{e.read().decode(errors='replace')[:800]}")
    except urllib.error.URLError as e:
        die(f"network error: {e.reason}")


def flat_row(obj):
    row = {}

    def walk(o, pre):
        if isinstance(o, dict):
            for k, v in o.items():
                walk(v, f"{pre}{k}.")
        elif isinstance(o, list):
            row[pre.rstrip(".")] = json.dumps(o, ensure_ascii=False)
        else:
            row[pre.rstrip(".")] = o

    walk(obj, "")
    return row


def emit(rows, fmt):
    rows = [flat_row(r) for r in rows]
    if fmt == "json":
        print(json.dumps(rows, indent=2, ensure_ascii=False))
        return
    if fmt == "jsonl":
        for r in rows:
            print(json.dumps(r, ensure_ascii=False))
        return
    if not rows:
        print("(no rows)")
        return
    cols = []
    for r in rows:
        for k in r:
            if k not in cols:
                cols.append(k)
    widths = {c: min(64, max(len(c), *(len(str(r.get(c, ""))) for r in rows))) for c in cols}
    print("  ".join(c.ljust(widths[c]) for c in cols))
    print("  ".join("-" * widths[c] for c in cols))
    for r in rows:
        print("  ".join(str(r.get(c, ""))[: widths[c]].ljust(widths[c]) for c in cols))
    print(f"({len(rows)} rows)")


def mask(secret):
    return f"{secret[:6]}{'.' * 8}{secret[-4:]}" if len(secret) > 12 else "(short)"


def when(epoch):
    if not epoch:
        return ""
    # LinkedIn mixes seconds (OAuth) and milliseconds (REST); normalize.
    secs = epoch / 1000 if epoch > 10**11 else epoch
    return datetime.datetime.fromtimestamp(secs, datetime.timezone.utc).strftime("%Y-%m-%d")


def save_env(name, value):
    """Write NAME="value" into .env, replacing any line already there.

    load_dotenv keeps the first match, so appending after an old token would
    leave the old value in force. Returns True if a line was replaced.
    """
    path = os.path.join(PROJECT, ".env")
    line = f'export {name}="{value}"\n'
    pattern = re.compile(rf'\s*(?:export\s+)?{name}=')
    lines = []
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            lines = f.readlines()
    out, replaced = [], False
    for existing in lines:
        if pattern.match(existing):
            if not replaced:
                out.append(line)
                replaced = True
            continue
        out.append(existing)
    if not replaced:
        if out and not out[-1].endswith("\n"):
            out[-1] += "\n"
        out.append(line)
    with open(path, "w", encoding="utf-8") as f:
        f.writelines(out)
    os.chmod(path, 0o600)
    return replaced


def list_accounts():
    return paged("adAccounts", "q=search")


def cmd_auth_status():
    client_id = need("LINKEDIN_CLIENT_ID", "add it to .env from the app's Auth tab")
    secret = need("LINKEDIN_CLIENT_SECRET", "add it to .env from the app's Auth tab")
    token = need("LINKEDIN_ACCESS_TOKEN", TOKEN_HINT)
    info = oauth_post("introspectToken",
                      {"client_id": client_id, "client_secret": secret, "token": token})
    print(f"client id:    {client_id}")
    print(f"token:        {mask(token)}")
    print(f"status:       {info.get('status')}")
    print(f"scope:        {info.get('scope')}")
    print(f"expires:      {when(info.get('expires_at'))}")
    print(f"refresh:      {'set' if os.environ.get('LINKEDIN_REFRESH_TOKEN') else 'NOT set'}")
    print(f"API version:  {api_version()}")
    if not info.get("active"):
        die("token is not active", TOKEN_HINT)
    left = (info.get("expires_at", 0) - datetime.datetime.now().timestamp()) / 86400
    if left < 7:
        print(f"\nwarning: token expires in {left:.0f} days; run `li auth refresh --save`")
    rows = list_accounts()
    print(f"\nOK: token valid, {len(rows)} ad account(s) readable:")
    for a in rows:
        print(f"  {a.get('id')}  {a.get('name')}  ({a.get('currency')})")


def cmd_auth_refresh(save):
    client_id = need("LINKEDIN_CLIENT_ID", "add it to .env")
    secret = need("LINKEDIN_CLIENT_SECRET", "add it to .env")
    refresh = need("LINKEDIN_REFRESH_TOKEN", "mint a new token with the Token Generator")
    data = oauth_post("accessToken", {
        "grant_type": "refresh_token", "refresh_token": refresh,
        "client_id": client_id, "client_secret": secret})
    token = data.get("access_token", "")
    if not token:
        die("LinkedIn returned no access_token", json.dumps(data))
    now = datetime.datetime.now().timestamp()
    print(f"OK: new access token {mask(token)}")
    print(f"expires:      {when(now + data.get('expires_in', 0))}")
    if data.get("refresh_token_expires_in"):
        print(f"refresh until {when(now + data['refresh_token_expires_in'])}")
    if save:
        save_env("LINKEDIN_ACCESS_TOKEN", token)
        if data.get("refresh_token") and data["refresh_token"] != refresh:
            save_env("LINKEDIN_REFRESH_TOKEN", data["refresh_token"])
        print("\nsaved to .env")
    else:
        print("\nNot saved. Re-run with --save.")


def cmd_accounts(fmt):
    rows = [{
        "id": a.get("id"), "name": a.get("name"), "currency": a.get("currency"),
        "status": a.get("status"), "serving": ",".join(a.get("servingStatuses", [])),
        "type": a.get("type"), "test": a.get("test"),
    } for a in list_accounts()]
    emit(rows, fmt)


def check_account(account_id):
    if not str(account_id).isdigit():
        die(f"account id {account_id!r} is not numeric", "run `li accounts` to list them")
    return account_id


def money(b):
    return f"{b['amount']} {b['currencyCode']}" if b else ""


def cmd_campaigns(account_id, show_all, fmt):
    check_account(account_id)
    rows = []
    for c in paged(f"adAccounts/{account_id}/adCampaigns", "q=search"):
        if c.get("status") == "REMOVED" and not show_all:
            continue
        sched = c.get("runSchedule") or {}
        rows.append({
            "id": c.get("id"), "name": c.get("name"), "status": c.get("status"),
            "serving": ",".join(c.get("servingStatuses", [])),
            "objective": c.get("objectiveType"), "format": c.get("format"),
            "daily_budget": money(c.get("dailyBudget")),
            "total_budget": money(c.get("totalBudget")),
            "cost_type": c.get("costType"),
            "start": when(sched.get("start")), "end": when(sched.get("end")),
            "group": str(c.get("campaignGroup", "")).rsplit(":", 1)[-1],
        })
    emit(rows, fmt)


def cmd_groups(account_id, show_all, fmt):
    check_account(account_id)
    rows = []
    for g in paged(f"adAccounts/{account_id}/adCampaignGroups", "q=search"):
        if g.get("status") == "REMOVED" and not show_all:
            continue
        sched = g.get("runSchedule") or {}
        rows.append({
            "id": g.get("id"), "name": g.get("name"), "status": g.get("status"),
            "serving": ",".join(g.get("servingStatuses", [])),
            "total_budget": money(g.get("totalBudget")),
            "start": when(sched.get("start")), "end": when(sched.get("end")),
        })
    emit(rows, fmt)


def cmd_creatives(account_id, show_all, fmt):
    check_account(account_id)
    rows = []
    for c in paged(f"adAccounts/{account_id}/creatives", "q=criteria"):
        if c.get("intendedStatus") in ("REMOVED", "ARCHIVED") and not show_all:
            continue
        rows.append({
            "id": str(c.get("id", "")).rsplit(":", 1)[-1], "name": c.get("name") or "",
            "campaign": str(c.get("campaign", "")).rsplit(":", 1)[-1],
            "status": c.get("intendedStatus"), "serving": c.get("isServing"),
            "review": (c.get("review") or {}).get("status"),
            "rejected_for": ",".join((c.get("review") or {}).get("rejectionReasons", [])),
            "holds": ",".join(c.get("servingHoldReasons", [])),
            "created": when(c.get("createdAt")),
        })
    emit(rows, fmt)


# adAnalytics answers with URNs only; names come from the matching list call.
LEVELS = {
    "account":  ("ACCOUNT", None),
    "group":    ("CAMPAIGN_GROUP", "adCampaignGroups"),
    "campaign": ("CAMPAIGN", "adCampaigns"),
    "creative": ("CREATIVE", "creatives"),
}

# The numbers Toggle reports quote. Website conversions and Lead Gen Form leads
# stay separate: they are different actions and their costs must not blend.
BASE_FIELDS = ["costInLocalCurrency", "impressions", "clicks", "landingPageClicks",
               "externalWebsiteConversions", "oneClickLeads", "videoViews"]


def iso(day):
    return day.strftime("%Y-%m-%d")


def check_date(label, value):
    try:
        datetime.datetime.strptime(value, "%Y-%m-%d")
    except ValueError:
        die(f"{label} must look like YYYY-MM-DD, got {value!r}")
    return value


def restli_date(value):
    y, m, d = (int(x) for x in value.split("-"))
    return f"(year:{y},month:{m},day:{d})"


def names_for(account_id, level):
    _, path = LEVELS[level]
    if not path:
        return {}
    query = "q=criteria" if level == "creative" else "q=search"
    out = {}
    for e in paged(f"adAccounts/{account_id}/{path}", query):
        eid = str(e.get("id", ""))
        # Creatives come back as full URNs; campaigns and groups as bare ids.
        out[eid.rsplit(":", 1)[-1]] = e.get("name") or ""
    return out


def ratio(a, b, scale=1):
    return round(scale * a / b, 2) if b else ""


def cmd_report(account_id, level, since, until, daily, fields, show_all, fmt):
    check_account(account_id)
    if level not in LEVELS:
        die(f"unknown level {level!r}", "use one of: " + ", ".join(LEVELS))
    pivot, _ = LEVELS[level]

    today = datetime.date.today()
    until = check_date("--until", until) if until else iso(today - datetime.timedelta(days=1))
    since = check_date("--since", since) if since else iso(today - datetime.timedelta(days=7))
    if since > until:
        die(f"--since ({since}) is after --until ({until})")

    wanted = fields.split(",") if fields else list(BASE_FIELDS)
    account_urn = urllib.parse.quote(f"urn:li:sponsoredAccount:{account_id}", safe="")
    query = "&".join([
        "q=analytics",
        f"pivot={pivot}",
        f"timeGranularity={'DAILY' if daily else 'ALL'}",
        f"dateRange=(start:{restli_date(since)},end:{restli_date(until)})",
        f"accounts=List({account_urn})",
        "fields=" + ",".join(["pivotValues", "dateRange"] + wanted),
    ])
    data = call("adAnalytics", query)
    names = names_for(account_id, level)

    rows = []
    for e in data.get("elements", []):
        eid = (e.get("pivotValues") or [""])[0].rsplit(":", 1)[-1]
        row = {}
        if daily:
            s = (e.get("dateRange") or {}).get("start") or {}
            row["day"] = f"{s.get('year')}-{s.get('month', 0):02d}-{s.get('day', 0):02d}"
        row["id"] = eid
        if level != "account":
            row["name"] = names.get(eid, "")
        for k in wanted:
            v = e.get(k)
            row[k] = round(float(v), 2) if k.startswith("cost") and v is not None else v
        if not fields:
            cost = float(e.get("costInLocalCurrency") or 0)
            imp, clk = e.get("impressions") or 0, e.get("clicks") or 0
            row["ctr_pct"] = ratio(clk, imp, 100)
            row["cpc"] = ratio(cost, clk)
            row["cpm"] = ratio(cost, imp, 1000)
        rows.append(row)

    rows.sort(key=lambda r: (r.get("day", ""), -float(r.get("costInLocalCurrency") or 0)))

    # Most accounts carry dormant campaigns; hide rows that did nothing at all.
    dropped = 0
    if not show_all:
        def alive(r):
            return any(float(r.get(k) or 0) > 0 for k in
                       ("costInLocalCurrency", "impressions", "clicks",
                        "externalWebsiteConversions", "oneClickLeads"))
        kept = [r for r in rows if alive(r)]
        dropped = len(rows) - len(kept)
        rows = kept

    if fmt == "table":
        print(f"account {account_id} · {level} · {since} to {until}"
              f"{' · daily' if daily else ''} · cost in account currency\n")
    emit(rows, fmt)
    if fmt == "table" and rows and not fields:
        tot = {k: sum(float(r.get(k) or 0) for r in rows) for k in BASE_FIELDS}
        cost, conv, leads = tot["costInLocalCurrency"], tot["externalWebsiteConversions"], tot["oneClickLeads"]
        print(f"\ntotal spend {cost:,.2f} · impressions {tot['impressions']:,.0f}"
              f" · clicks {tot['clicks']:,.0f} · CTR {ratio(tot['clicks'], tot['impressions'], 100) or 0}%"
              f" · website conversions {conv:,.0f}"
              + (f" (cost each {cost / conv:,.2f})" if conv else "")
              + f" · form leads {leads:,.0f}"
              + (f" (cost each {cost / leads:,.2f})" if leads else ""))
    if dropped:
        # stderr, not stdout: this note must never land inside piped json/jsonl.
        print(f"({dropped} rows with no activity hidden; --all to show them)", file=sys.stderr)


def cmd_raw(target, fmt):
    path, _, query = target.lstrip("/").partition("?")
    decoded = urllib.parse.unquote(path)
    if not any(re.fullmatch(p, decoded) for p in RAW_GET_PATHS):
        die(f"raw GET to {decoded!r} is not on the read-only allowlist",
            "allowed: " + ", ".join(RAW_GET_PATHS))
    data = call(path, query)
    if isinstance(data, dict) and isinstance(data.get("elements"), list) and fmt != "json":
        emit(data["elements"], fmt)
    else:
        print(json.dumps(data, indent=2, ensure_ascii=False))


def main(argv):
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    load_dotenv()
    fmt, save, daily, show_all, args = "table", False, False, False, []
    opts = {"--level": "campaign", "--since": None, "--until": None, "--metrics": None}
    i = 0
    while i < len(argv):
        a = argv[i]
        if a == "-o":
            if i + 1 >= len(argv):
                die("-o needs a value")
            i += 1
            fmt = argv[i]
            if fmt not in ("json", "table", "jsonl"):
                die(f"unknown format {fmt!r}")
        elif a in opts:
            if i + 1 >= len(argv):
                die(f"{a} needs a value")
            i += 1
            opts[a] = argv[i]
        elif a == "--daily":
            daily = True
        elif a == "--all":
            show_all = True
        elif a == "--save":
            save = True
        else:
            args.append(a)
        i += 1

    if not args or args[0] in ("-h", "--help", "help"):
        print(__doc__)
        return

    cmd = args[0]
    if cmd == "auth":
        sub = args[1] if len(args) > 1 else ""
        if sub == "status":
            cmd_auth_status()
        elif sub == "refresh":
            cmd_auth_refresh(save)
        else:
            die("usage: li auth status | li auth refresh [--save]")
    elif cmd == "accounts":
        cmd_accounts(fmt)
    elif cmd in ("campaigns", "groups", "creatives"):
        if len(args) < 2:
            die(f"usage: li {cmd} <ACCOUNT_ID> [--all]")
        {"campaigns": cmd_campaigns, "groups": cmd_groups,
         "creatives": cmd_creatives}[cmd](args[1], show_all, fmt)
    elif cmd == "report":
        if len(args) < 2:
            die("usage: li report <ACCOUNT_ID> [--level campaign] "
                "[--since YYYY-MM-DD] [--until YYYY-MM-DD] [--daily]")
        cmd_report(args[1], opts["--level"], opts["--since"], opts["--until"],
                   daily, opts["--metrics"], show_all, fmt)
    elif cmd == "raw":
        if len(args) < 2:
            die('usage: li raw "<path?query>"')
        cmd_raw(args[1], fmt)
    else:
        die(f"unknown command {cmd!r}", "run li --help")


if __name__ == "__main__":
    main(sys.argv[1:])
