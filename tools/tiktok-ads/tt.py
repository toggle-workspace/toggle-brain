#!/usr/bin/env python3
"""tt: read-only TikTok Ads (Marketing API) client for this project.

Stdlib only, same shape as tools/google-ads/gads.py. Auth is one long-lived
access token per TikTok login, obtained once through the browser consent screen
and kept in .env at the project root.

Usage (run through tools/tiktok-ads/tt, which supplies the Python):
  tt auth url                      print the consent link to open in a browser
  tt auth exchange "<url|code>"    turn the redirected URL into an access token
  tt auth status                   verify the token, list authorized advertisers
  tt accounts                      name, currency, timezone, status per advertiser
  tt campaigns <ADVERTISER_ID>     campaigns on one advertiser
  tt report <ADVERTISER_ID>        spend, impressions, clicks, leads, cost per lead
  tt raw <path> [--body '<json>']  read-only escape hatch

Report options:
  --level campaign|adgroup|ad|account   what each row is (default: campaign)
  --since YYYY-MM-DD                    first day (default: 7 days ago)
  --until YYYY-MM-DD                    last day (default: yesterday)
  --daily                               one row per day instead of one total
  --all                                 include campaigns that spent nothing
  --metrics a,b,c                       replace the default metric set

Options:
  -o json|table|jsonl   output format (default: table)
  --save                on `auth exchange`, append the token to .env

Environment (read from .env at the project root when not already set):
  TIKTOK_APP_ID          the developer app's App ID
  TIKTOK_APP_SECRET      that app's Secret
  TIKTOK_ACCESS_TOKEN    written by `auth exchange --save`
  TIKTOK_REDIRECT_URI    must match the app's configured redirect URL exactly
  TIKTOK_API_VERSION     default v1.3

Read-only by construction: only GET reporting and metadata endpoints exist here,
and `raw` refuses any path outside its allowlist.
"""

import datetime
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

API_HOST = "https://business-api.tiktok.com"
AUTH_PAGE = f"{API_HOST}/portal/auth"
PROJECT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# `raw` is an escape hatch, not a write path. Anchored allowlist over the
# DECODED path; every TikTok write verb (/create/, /update/, /delete/, /status/)
# is rejected before any call is made.
RAW_GET_PATHS = [
    r"oauth2/advertiser/get/",
    r"advertiser/info/",
    r"campaign/get/",
    r"adgroup/get/",
    r"ad/get/",
    r"report/integrated/get/",
]


def die(msg, hint=None):
    sys.stderr.write(f"tt: {msg}\n")
    if hint:
        sys.stderr.write(f"    {hint}\n")
    sys.exit(1)


def load_dotenv():
    """Pull TIKTOK_* lines from the project .env without overriding the shell.

    A trailing `# comment` is dropped, so `TIKTOK_APP_ID="769..."  # Brain Ads`
    reads as the ID alone. Quote any value that needs a literal `#` in it.
    """
    path = os.path.join(PROJECT, ".env")
    if not os.path.exists(path):
        return
    with open(path, encoding="utf-8") as f:
        for line in f:
            m = re.match(
                r'\s*(?:export\s+)?(TIKTOK_[A-Z0-9_]+)=(["\']?)(.*?)\2\s*(?:#.*)?$',
                line)
            if m and m.group(1) not in os.environ:
                os.environ[m.group(1)] = m.group(3)


def api_version():
    return os.environ.get("TIKTOK_API_VERSION", "v1.3")


def need(var, hint):
    val = os.environ.get(var, "").strip()
    if not val:
        die(f"{var} is not set", hint)
    return val


def call(path, params=None, token=None, body=None):
    """One REST call. TikTok answers HTTP 200 on failure, so the envelope
    `code` is the real status: 0 means OK, anything else is an error."""
    url = f"{API_HOST}/open_api/{api_version()}/{path.lstrip('/')}"
    if params:
        # TikTok wants list and dict parameters JSON-encoded inside the query string.
        flat = {k: (json.dumps(v) if isinstance(v, (list, dict)) else v)
                for k, v in params.items() if v is not None}
        url += "?" + urllib.parse.urlencode(flat)
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Access-Token"] = token
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, headers=headers,
                                 method="POST" if data is not None else "GET")
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            payload = json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        die(f"HTTP {e.code} from {url}\n{e.read().decode(errors='replace')}")
    except urllib.error.URLError as e:
        die(f"network error: {e.reason}")

    code = payload.get("code")
    if code not in (0, None):
        msg = payload.get("message", "(no message)")
        hints = {
            40001: "bad request: check the app ID, secret or advertiser ID",
            40002: "the auth code is used up or expired; start at `tt auth url` again",
            40100: "the access token is invalid or was revoked; re-authorize",
            40105: "no access token sent, or it does not cover this advertiser",
            40110: "this app is not permitted on that advertiser account",
        }
        die(f"TikTok error {code}: {msg}", hints.get(code))
    return payload.get("data", {})


def paged(path, params, token, key="list"):
    """Walk TikTok's page / page_size pagination to the end."""
    rows, page = [], 1
    while True:
        params = dict(params, page=page, page_size=100)
        data = call(path, params=params, token=token)
        rows.extend(data.get(key, []))
        info = data.get("page_info", {})
        if page >= info.get("total_page", 1):
            return rows
        page += 1


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


def cmd_auth_url():
    app_id = need("TIKTOK_APP_ID", "add it to .env from the app's row in the developer portal")
    redirect = need("TIKTOK_REDIRECT_URI",
                    "add the EXACT redirect URL configured on the app (Edit > Advertiser redirect URL)")
    url = f"{AUTH_PAGE}?" + urllib.parse.urlencode(
        {"app_id": app_id, "state": "toggle", "redirect_uri": redirect})
    print("1. Open this link in a browser already signed in to the TikTok account")
    print("   that has access to the ad accounts you want:\n")
    print(f"   {url}\n")
    print("2. Tick every ad account you want this token to reach, then Confirm.")
    print("3. The browser lands on your redirect URL. Copy the WHOLE address")
    print("   from the address bar (it carries ?auth_code=...), then run:\n")
    print('   tools/tiktok-ads/tt auth exchange "<paste the whole URL here>" --save')


def cmd_auth_exchange(raw_input, save):
    app_id = need("TIKTOK_APP_ID", "add it to .env")
    secret = need("TIKTOK_APP_SECRET", "add it to .env")
    code = raw_input.strip()
    if "auth_code=" in code:
        qs = urllib.parse.parse_qs(urllib.parse.urlparse(code).query)
        found = qs.get("auth_code") or qs.get("code")
        if not found:
            die("that URL has no auth_code in it", "copy the full address after the redirect")
        code = found[0]
    data = call("oauth2/access_token/", body={
        "app_id": app_id, "secret": secret, "auth_code": code})
    token = data.get("access_token", "")
    if not token:
        die("TikTok returned no access_token", json.dumps(data))
    ids = data.get("advertiser_ids", [])
    print(f"OK: token issued, covering {len(ids)} advertiser account(s)")
    print(f"token:   {mask(token)}")
    print(f"scope:   {data.get('scope')}")
    for a in ids:
        print(f"  {a}")
    if save:
        path = os.path.join(PROJECT, ".env")
        with open(path, "a", encoding="utf-8") as f:
            f.write("\n# TikTok Ads (tools/tiktok-ads/tt). Long-lived; rotate, never delete.\n")
            f.write(f'export TIKTOK_ACCESS_TOKEN="{token}"\n')
        os.chmod(path, 0o600)
        print(f"\nsaved to {path} as TIKTOK_ACCESS_TOKEN (chmod 600)")
    else:
        print("\nNot saved. Re-run with --save, or add this line to .env yourself:")
        print('  export TIKTOK_ACCESS_TOKEN="<the token above>"')


def cmd_auth_status():
    app_id = need("TIKTOK_APP_ID", "add it to .env")
    secret = need("TIKTOK_APP_SECRET", "add it to .env")
    token = need("TIKTOK_ACCESS_TOKEN", "run `tt auth url` then `tt auth exchange`")
    print(f"app id:       {app_id}")
    print(f"token:        {mask(token)}")
    print(f"API version:  {api_version()}")
    data = call("oauth2/advertiser/get/",
                params={"app_id": app_id, "secret": secret}, token=token)
    rows = data.get("list", [])
    print(f"\nOK: token valid, {len(rows)} advertiser account(s) authorized:")
    for r in rows:
        print(f"  {r.get('advertiser_id')}  {r.get('advertiser_name')}")


def authorized_ids(token):
    data = call("oauth2/advertiser/get/", token=token, params={
        "app_id": need("TIKTOK_APP_ID", "add it to .env"),
        "secret": need("TIKTOK_APP_SECRET", "add it to .env")})
    return [r["advertiser_id"] for r in data.get("list", [])]


def cmd_accounts(fmt):
    token = need("TIKTOK_ACCESS_TOKEN", "run `tt auth url` then `tt auth exchange`")
    ids = authorized_ids(token)
    if not ids:
        die("no advertiser accounts are authorized for this token",
            "re-run the consent step and tick the accounts you need")
    rows = []
    fields = ["advertiser_id", "name", "status", "currency", "timezone",
              "company", "role", "balance"]
    # advertiser/info caps the id list per call, so ask in batches.
    for i in range(0, len(ids), 100):
        data = call("advertiser/info/", token=token,
                    params={"advertiser_ids": ids[i:i + 100], "fields": fields})
        rows.extend(data.get("list", []))
    emit(rows, fmt)


def cmd_campaigns(advertiser_id, fmt):
    token = need("TIKTOK_ACCESS_TOKEN", "run `tt auth url` then `tt auth exchange`")
    if not advertiser_id.isdigit():
        die(f"advertiser id {advertiser_id!r} is not numeric")
    rows = paged("campaign/get/", {"advertiser_id": advertiser_id}, token)
    emit(rows, fmt)


# TikTok splits settings from results: /campaign/get/ knows a campaign's budget,
# only /report/integrated/get/ knows what it spent. Each level needs its own
# data_level, its own id dimension, and its own name fields (which TikTok counts
# as metrics, not dimensions).
LEVELS = {
    "account":  ("AUCTION_ADVERTISER", "advertiser_id", []),
    "campaign": ("AUCTION_CAMPAIGN", "campaign_id", ["campaign_name"]),
    "adgroup":  ("AUCTION_ADGROUP", "adgroup_id", ["adgroup_name", "campaign_name"]),
    "ad":       ("AUCTION_AD", "ad_id", ["ad_name", "adgroup_name", "campaign_name"]),
}

# The numbers every Toggle report actually quotes. `conversion` is whatever the
# campaign optimizes for, so on a lead-gen campaign it is leads and
# `cost_per_conversion` is cost per lead.
BASE_METRICS = ["spend", "impressions", "clicks", "ctr", "cpc", "cpm",
                "conversion", "cost_per_conversion", "conversion_rate"]


def iso(day):
    return day.strftime("%Y-%m-%d")


def check_date(label, value):
    try:
        datetime.datetime.strptime(value, "%Y-%m-%d")
    except ValueError:
        die(f"{label} must look like YYYY-MM-DD, got {value!r}")
    return value


def cmd_report(advertiser_id, level, since, until, daily, metrics, show_all, fmt):
    token = need("TIKTOK_ACCESS_TOKEN", "run `tt auth url` then `tt auth exchange`")
    if not advertiser_id.isdigit():
        die(f"advertiser id {advertiser_id!r} is not numeric")
    if level not in LEVELS:
        die(f"unknown level {level!r}", "use one of: " + ", ".join(LEVELS))
    data_level, id_field, name_fields = LEVELS[level]

    today = datetime.date.today()
    until = check_date("--until", until) if until else iso(today - datetime.timedelta(days=1))
    since = check_date("--since", since) if since else iso(today - datetime.timedelta(days=7))
    if since > until:
        die(f"--since ({since}) is after --until ({until})")

    dimensions = [id_field] + (["stat_time_day"] if daily else [])
    wanted = metrics.split(",") if metrics else list(BASE_METRICS)
    rows = paged("report/integrated/get/", {
        "advertiser_id": advertiser_id,
        "report_type": "BASIC",
        "data_level": data_level,
        "dimensions": dimensions,
        "metrics": name_fields + wanted,
        "start_date": since,
        "end_date": until,
    }, token)

    # Each row arrives as {"dimensions": {...}, "metrics": {...}}. Flatten to one
    # record so the table reads like a spreadsheet, names first, spend next.
    flat = []
    for r in rows:
        merged = dict(r.get("dimensions", {}))
        merged.update(r.get("metrics", {}))
        ordered = {}
        for k in name_fields + dimensions + wanted:
            if k in merged:
                ordered[k] = merged.pop(k)
        ordered.update(merged)
        flat.append(ordered)

    if daily:
        flat.sort(key=lambda r: str(r.get("stat_time_day", "")))

    # Most accounts carry years of dormant campaigns. Showing them buries the
    # handful that actually ran, so silent rows are dropped unless asked for.
    # A row counts as silent only when it did nothing at all: filtering on spend
    # alone would hide late-attributed conversions and understate the totals.
    dropped = 0
    if not show_all:
        def alive(r):
            return any(float(r.get(k) or 0) > 0
                       for k in ("spend", "impressions", "clicks", "conversion"))
        kept = [r for r in flat if alive(r)]
        dropped = len(flat) - len(kept)
        flat = kept

    if fmt == "table":
        print(f"advertiser {advertiser_id} · {level} · {since} to {until}"
              f"{' · daily' if daily else ''}\n")
    emit(flat, fmt)
    if fmt == "table" and flat:
        spent = sum(float(r.get("spend") or 0) for r in flat)
        conv = sum(float(r.get("conversion") or 0) for r in flat)
        print(f"\ntotal spend {spent:,.2f} · conversions {conv:,.0f}"
              + (f" · cost per conversion {spent / conv:,.2f}" if conv else ""))
    if dropped:
        # stderr, not stdout: this note must never land inside piped json/jsonl.
        print(f"({dropped} rows with no activity hidden; --all to show them)",
              file=sys.stderr)


def cmd_raw(path, body, fmt):
    token = need("TIKTOK_ACCESS_TOKEN", "run `tt auth url` then `tt auth exchange`")
    decoded = urllib.parse.unquote(path).lstrip("/")
    if not any(re.fullmatch(p, decoded) for p in RAW_GET_PATHS):
        die(f"raw GET to {decoded!r} is not on the read-only allowlist",
            "allowed: " + ", ".join(RAW_GET_PATHS))
    data = call(decoded, params=body, token=token)
    if isinstance(data, dict) and isinstance(data.get("list"), list) and fmt != "json":
        emit(data["list"], fmt)
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
        if sub == "url":
            cmd_auth_url()
        elif sub == "exchange":
            if len(args) < 3:
                die('usage: tt auth exchange "<redirected url or auth_code>" [--save]')
            cmd_auth_exchange(args[2], save)
        elif sub == "status":
            cmd_auth_status()
        else:
            die("usage: tt auth url | tt auth exchange \"<url>\" | tt auth status")
    elif cmd == "accounts":
        cmd_accounts(fmt)
    elif cmd == "campaigns":
        if len(args) < 2:
            die("usage: tt campaigns <ADVERTISER_ID>")
        cmd_campaigns(args[1], fmt)
    elif cmd == "report":
        if len(args) < 2:
            die("usage: tt report <ADVERTISER_ID> [--level campaign] "
                "[--since YYYY-MM-DD] [--until YYYY-MM-DD] [--daily]")
        cmd_report(args[1], opts["--level"], opts["--since"], opts["--until"],
                   daily, opts["--metrics"], show_all, fmt)
    elif cmd == "raw":
        if len(args) < 2:
            die("usage: tt raw <path> [--body '<json>']")
        body = json.loads(args[args.index("--body") + 1]) if "--body" in args else None
        cmd_raw(args[1], body, fmt)
    else:
        die(f"unknown command {cmd!r}", "run tt --help")


if __name__ == "__main__":
    main(sys.argv[1:])
