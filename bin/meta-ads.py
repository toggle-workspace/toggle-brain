#!/usr/bin/env python3
"""meta-ads.py - Meta Marketing API reporting CLI (read only).

Why this exists instead of Meta's official `meta` CLI: the official `meta-ads`
PyPI package ships compiled wheels for Linux and macOS arm64 only. There is no
win_amd64 wheel and no source distribution, so it cannot install on Windows.
This script is a stdlib-only stand in that speaks the same Graph API, keeps the
Ads CLI Starter Kit conventions, and runs anywhere a Python 3.9+ interpreter is
available. See installations/meta-ads/install.md for the full story.

Design rules carried over from the starter kit:
  - Credentials come from `.env` at the project root. Source it first.
  - Every data command names its ad account explicitly. There is no default.
  - Reads are free. This CLI implements no writes at all, by construction.
  - An allowlist (META_ALLOWED_ACCOUNTS) hard blocks any account outside scope.

Environment:
  ACCESS_TOKEN            Long lived Meta system user token. Used when no
                          profile is configured for an account.
  ACCESS_TOKEN_<PROFILE>  One token per client, so no single token spans two
                          clients. Example: ACCESS_TOKEN_TOGGLE.
  META_ACCOUNT_PROFILES   Comma separated act_<id>=PROFILE pairs saying which
                          token owns which account. Optional; without it every
                          command falls back to ACCESS_TOKEN.
  META_ALLOWED_ACCOUNTS   Comma separated act_<id> values that commands may
                          target. Any other account is refused. Required.
  META_API_VERSION        Graph API version, default v23.0.

Usage:
  source .env
  meta auth status                                  # token identity + scope audit
  meta accounts                                     # every account the token sees
  meta business list                                # Business Manager ids
  meta business accounts --business <id>            # the portfolio under one
  meta campaigns --account "$ACT_UNITAR"
  meta adsets    --account "$ACT_UNITAR" [--campaign-id ID]
  meta ads       --account "$ACT_UNITAR" [--adset-id ID]
  meta insights  --account "$ACT_UNITAR" [--level campaign] [--date-preset last_7d]
                 [--since 2026-08-01 --until 2026-08-31] [--by-day]

Global flags: -o table|json|plain (default table), --debug
"""

import argparse
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

DEFAULT_API_VERSION = "v23.0"
GRAPH = "https://graph.facebook.com"
DEBUG = False


# --------------------------------------------------------------------------
# environment and scope
# --------------------------------------------------------------------------

class GraphError(Exception):
    """A Graph API error a caller wants to handle rather than exit on."""

    def __init__(self, code, message):
        super().__init__(message)
        self.code = code
        self.message = message


def die(msg, code=1):
    print(f"xx {msg}", file=sys.stderr)
    sys.exit(code)


def api_version():
    return os.environ.get("META_API_VERSION", "").strip() or DEFAULT_API_VERSION


def profile_map():
    """Parse META_ACCOUNT_PROFILES into {act_id: PROFILE}.

    Each client gets its own system user token, so one over assigned or leaked
    token can never reach another client's account. This map says which token
    owns which account:

        META_ACCOUNT_PROFILES="act_123=UNITAR,act_456=TOGGLE"

    Leave it unset and every command falls back to a single ACCESS_TOKEN, which
    is how this CLI behaved before profiles existed.
    """
    raw = os.environ.get("META_ACCOUNT_PROFILES", "")
    out = {}
    for pair in raw.split(","):
        pair = pair.strip()
        if not pair:
            continue
        if "=" not in pair:
            die(f"META_ACCOUNT_PROFILES entry {pair!r} is not act_<id>=PROFILE. "
                "Fix the line in .env.")
        acct, name = pair.split("=", 1)
        name = name.strip().upper()
        if not name:
            die(f"META_ACCOUNT_PROFILES entry {pair!r} has an empty profile name.")
        out[normalize(acct)] = name
    return out


def token_env_var(profile):
    return f"ACCESS_TOKEN_{profile}" if profile else "ACCESS_TOKEN"


def token_for_profile(profile):
    var = token_env_var(profile)
    tok = os.environ.get(var, "").strip()
    if tok:
        return tok
    if profile:
        die(f"{var} is not set, but META_ACCOUNT_PROFILES maps an account to "
            f"profile {profile}. Add that line to .env, then: source .env")
    die("ACCESS_TOKEN is not set. Run: source .env")


def token_for_account(acct):
    """The token that owns this account.

    An account mapped to a profile uses that profile's token and nothing else.
    It never falls through to ACCESS_TOKEN, because a silent fallback is how a
    command ends up running against the wrong client's credentials.
    """
    return token_for_profile(profile_map().get(normalize(acct), ""))


def env_profiles():
    """Profiles that have a token in the environment, whether or not any
    account is mapped to them yet. A token pasted before its account id is
    known is the normal state halfway through adding a client, and it should
    still be auditable."""
    names = []
    prefix = "ACCESS_TOKEN_"
    for var, val in os.environ.items():
        if not var.startswith(prefix) or not (val or "").strip():
            continue
        name = var[len(prefix):].strip().upper()
        if name and name not in names:
            names.append(name)
    return sorted(names)


def known_profiles():
    """Every profile this project knows about: the ones mapped to an account,
    in .env order, then any that only have a token so far. Falls back to the
    single unprofiled ACCESS_TOKEN when no profiles exist at all."""
    names = []
    for name in profile_map().values():
        if name not in names:
            names.append(name)
    for name in env_profiles():
        if name not in names:
            names.append(name)
    if not names:
        names.append("")
    return names


def resolve_profile(name):
    """Pick the profile a token level command should run as."""
    profiles = known_profiles()
    want = (name or "").strip().upper()
    if want:
        if want not in profiles:
            die(f"No profile named {want}. Configured: "
                + ", ".join(x or "(default)" for x in profiles))
        return want
    if len(profiles) == 1:
        return profiles[0]
    die("Several profiles are configured ("
        + ", ".join(x or "(default)" for x in profiles)
        + "). Name the one to use with --profile.")


def redact(text):
    """Never let any token reach stdout, stderr, or a debug line."""
    for var, val in os.environ.items():
        if not var.startswith("ACCESS_TOKEN"):
            continue
        val = (val or "").strip()
        if val and val in text:
            text = text.replace(val, f"<{var} redacted>")
    return text


def normalize(acct):
    """Accept 123, act_123, or ACT_123 and return the canonical act_123."""
    acct = (acct or "").strip()
    if not acct:
        return ""
    low = acct.lower()
    if low.startswith("act_"):
        return "act_" + low[4:]
    return "act_" + low


def allowed_accounts():
    raw = os.environ.get("META_ALLOWED_ACCOUNTS", "")
    return [normalize(x) for x in raw.split(",") if x.strip()]


def check_account(acct):
    """Refuse any account outside META_ALLOWED_ACCOUNTS. This is the guard rail
    that keeps a broadly scoped token from touching another team's account."""
    acct = normalize(acct)
    allow = allowed_accounts()
    if not allow:
        die("META_ALLOWED_ACCOUNTS is empty. Set it in .env before running "
            "any account command, so an out of scope account cannot be reached.")
    if acct not in allow:
        die(f"{acct} is not in META_ALLOWED_ACCOUNTS ({', '.join(allow)}). "
            "Refusing. Add it to .env deliberately if it really is in scope.")
    return acct


# --------------------------------------------------------------------------
# transport
# --------------------------------------------------------------------------

def call(path, params=None, tok=None, hint=None, soft=False):
    params = dict(params or {})
    params["access_token"] = tok or token_for_profile("")
    url = f"{GRAPH}/{api_version()}/{path.lstrip('/')}?{urllib.parse.urlencode(params)}"
    if DEBUG:
        print(redact(f".. GET {url}"), file=sys.stderr)
    req = urllib.request.Request(url, headers={"User-Agent": "toggle-meta-cli/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode("utf-8", "replace")
        try:
            err = json.loads(raw).get("error", {})
        except json.JSONDecodeError:
            die(redact(f"HTTP {exc.code}: {raw[:400]}"))
        msg = err.get("message", "unknown error")
        sub = err.get("error_user_msg") or ""
        code = err.get("code")
        if soft:
            raise GraphError(code, redact(msg))
        if code == 190:
            die(f"Token rejected (code 190): {msg}\n"
                "   The token is expired, revoked, or was minted for a different app. "
                "Regenerate it in Business Manager and update .env.")
        if code == 100 and hint and "permission" in msg.lower():
            die(f"""Graph API error (code {code}): {msg}
{hint}""")
        if code == 100 and "version" in msg.lower():
            die(f"{msg}\n   Set META_API_VERSION in .env to a supported Graph "
                "API version and retry.")
        if code in (10, 200, 272):
            die(f"Permission denied (code {code}): {msg}\n"
                + (hint or
                   "   The system user token is missing ads_read on this ad account. "
                   "Assign the account to the system user in Business Manager."))
        die(redact(f"Graph API error (code {code}): {msg} {sub}".strip()))
    except urllib.error.URLError as exc:
        die(f"Network error reaching graph.facebook.com: {exc.reason}")


def paged(path, params, limit_pages=50, tok=None, hint=None, soft=False):
    """Follow Graph cursor pagination and return the concatenated data list.

    The cursor URLs Graph hands back already carry the same access_token, so
    pagination stays on the token the first page was fetched with."""
    params = dict(params or {})
    params.setdefault("limit", 100)
    out, pages = [], 0
    payload = call(path, params, tok=tok, hint=hint, soft=soft)
    while True:
        out.extend(payload.get("data", []))
        pages += 1
        nxt = payload.get("paging", {}).get("next")
        if not nxt or pages >= limit_pages:
            break
        if DEBUG:
            print(redact(f".. GET {nxt}"), file=sys.stderr)
        req = urllib.request.Request(nxt, headers={"User-Agent": "toggle-meta-cli/1.0"})
        try:
            with urllib.request.urlopen(req, timeout=90) as resp:
                payload = json.loads(resp.read().decode("utf-8"))
        except urllib.error.URLError as exc:
            die(f"Network error while paginating: {exc}")
    return out


# --------------------------------------------------------------------------
# output
# --------------------------------------------------------------------------

def emit(rows, fmt, columns=None):
    if fmt == "json":
        print(json.dumps(rows, indent=2, ensure_ascii=False))
        return
    if not rows:
        print("(no rows)")
        return
    if columns is None:
        seen = []
        for row in rows:
            for key in row:
                if key not in seen:
                    seen.append(key)
        columns = seen
    table = [[("" if r.get(c) is None else str(r.get(c))) for c in columns] for r in rows]
    if fmt == "plain":
        for line in table:
            print("\t".join(line))
        return
    widths = [len(c) for c in columns]
    for line in table:
        for i, cell in enumerate(line):
            widths[i] = max(widths[i], len(cell))
    print("  ".join(c.ljust(widths[i]) for i, c in enumerate(columns)))
    print("  ".join("-" * widths[i] for i in range(len(columns))))
    for line in table:
        print("  ".join(cell.ljust(widths[i]) for i, cell in enumerate(line)))


# --------------------------------------------------------------------------
# commands
# --------------------------------------------------------------------------

ACCOUNT_FIELDS = "id,account_id,name,account_status,currency,timezone_name,business"
ACCOUNT_FIELDS_BASIC = "id,account_id,name,account_status,currency,timezone_name"


def visible_accounts(tok=None):
    """Accounts this token can see.

    The owning business comes back for free on tokens that carry
    business_management. A reporting token scoped to ads_read cannot read that
    field, and Meta answers the whole request with an error rather than just
    omitting the field, so drop it and ask again.
    """
    try:
        rows = paged("me/adaccounts", {"fields": ACCOUNT_FIELDS}, tok=tok, soft=True)
    except GraphError as exc:
        if exc.code != 100:
            die(f"Graph API error (code {exc.code}): {exc.message}")
        rows = paged("me/adaccounts", {"fields": ACCOUNT_FIELDS_BASIC}, tok=tok)
        for r in rows:
            r["business"] = {"name": "(needs business_management)", "id": ""}
    out = []
    for r in rows:
        biz = r.get("business") or {}
        out.append({
            "id": r.get("id"),
            "name": r.get("name"),
            "currency": r.get("currency"),
            "timezone": r.get("timezone_name"),
            "status": r.get("account_status"),
            "business": biz.get("name", ""),
            "business_id": biz.get("id", ""),
        })
    return out


def audit_profile(profile, fmt):
    """Audit one token: who it is, the accounts it owns, and anything else it
    can reach. Returns True when the profile is clean.

    "Clean" is stricter than authenticated. A token that can see an account
    belonging to a different profile is a shared credential, and this reports
    it as a failure even though every command would still refuse that account.
    """
    var = token_env_var(profile)
    label = profile or "(default)"
    pmap = profile_map()
    owned = [a for a in allowed_accounts() if pmap.get(a, "") == profile]

    tok = os.environ.get(var, "").strip()
    if not tok:
        # Report and keep going. One unconfigured profile should not stop the
        # audit of the others, which is the normal state mid setup.
        print(f"Profile        : {label}  (token from {var})")
        print(f"Owns           : {', '.join(owned) if owned else '(none set)'}")
        print()
        print(f"xx {var} is empty. Paste this profile's system user token into "
              ".env, then: source .env")
        return False

    me = call("me", {"fields": "id,name"}, tok=tok)
    print(f"Profile        : {label}  (token from {var})")
    print(f"Token identity : {me.get('name', '(unnamed)')} (id {me.get('id')})")
    print(f"Graph version  : {api_version()}")
    print(f"Owns           : {', '.join(owned) if owned else '(none set)'}")
    print()

    accounts = visible_accounts(tok=tok)
    owned_set = set(owned)
    in_scope = [a for a in accounts if a["id"] in owned_set]
    out_scope = [a for a in accounts if a["id"] not in owned_set]
    foreign = [a for a in out_scope if a["id"] in pmap]

    print(f"Ad accounts this token can see: {len(accounts)}")
    print()
    print("IN SCOPE")
    emit(in_scope, fmt) if in_scope else print("  (none)")

    clean = True

    if out_scope:
        print()
        print(f"OUT OF SCOPE ({len(out_scope)}) - visible to the token, blocked by this CLI")
        emit(out_scope, fmt)
        print()
        print("!! This token is broader than this profile needs. Every command "
              "here refuses the accounts above,")
        print("!! but the token itself could still reach them from other tools. "
              "To tighten it at the source,")
        print("!! unassign those accounts from the system user in Business "
              "Manager and regenerate the token.")

    if foreign:
        clean = False
        print()
        print("!! SHARED CREDENTIAL: this token can see accounts that belong to "
              "another profile here:")
        for a in foreign:
            print(f"!!   {a['id']}  {a['name']}  -> profile {pmap[a['id']]}")
        print("!! One token per client is the whole point of the profile split. "
              "Unassign these in Business")
        print("!! Manager, regenerate this token, and re-run the audit.")

    missing = [a for a in owned if a not in {x["id"] for x in accounts}]
    if missing:
        clean = False
        print()
        print("xx In scope account(s) not visible to this token: " + ", ".join(missing))
        print("   Assign them to the system user with ads_read in Business Manager.")

    return clean


def cmd_auth(args, fmt):
    if args.auth_cmd != "status":
        die("usage: meta auth status")

    profiles = known_profiles()
    want = (getattr(args, "profile", None) or "").strip().upper()
    if want:
        if want not in profiles:
            die(f"No profile named {want}. Configured: "
                + ", ".join(x or "(default)" for x in profiles))
        profiles = [want]

    unmapped = [a for a in allowed_accounts() if a not in profile_map()]
    results = []
    for idx, prof in enumerate(profiles):
        if idx:
            print()
            print("-" * 78)
            print()
        results.append(audit_profile(prof, fmt))

    print()
    if profile_map() and unmapped:
        print("!! Allowed but unmapped account(s): " + ", ".join(unmapped))
        print("!! They fall back to the bare ACCESS_TOKEN. Give each one a "
              "META_ACCOUNT_PROFILES entry.")
        print()

    if all(results):
        print("OK: authenticated. Every account is reachable, and no token "
              "reaches another profile's account.")
    else:
        die("One or more profiles failed the audit. See the lines above.")


def cmd_accounts(args, fmt):
    """Every account every configured token can see, labelled by profile."""
    allow = allowed_accounts()
    pmap = profile_map()
    rows = []
    for prof in known_profiles():
        for a in visible_accounts(tok=token_for_profile(prof)):
            a["seen_by"] = prof or "(default)"
            a["owner"] = pmap.get(a["id"], "(unmapped)")
            a["in_scope"] = "yes" if a["id"] in allow else "NO"
            rows.append(a)
    emit(rows, fmt, ["id", "name", "currency", "business", "business_id",
                     "seen_by", "owner", "in_scope"])


BUSINESS_SCOPE_HINT = (
    "   This token cannot read Business Manager metadata. That needs the "
    "business_management scope, which a reporting token deliberately does not "
    "carry. Two ways forward: read the business id straight off `meta accounts`, "
    "which works with ads_read alone, or mint a short lived discovery token that "
    "has business_management, run this once, and delete it afterwards.")

BUSINESS_ACCOUNT_FIELDS = "id,account_id,name,account_status,currency,timezone_name"


def cmd_business(args, fmt):
    """Read only discovery of a Business Manager portfolio.

    This is the one command not gated by META_ALLOWED_ACCOUNTS, because it is
    how you find the id that belongs in the allowlist. It reads and never
    writes, and seeing an account listed here does not make it reachable by any
    other command in this CLI.
    """
    tok = token_for_profile(resolve_profile(getattr(args, "profile", None)))

    if args.business_cmd == "list":
        rows = paged("me/businesses", {"fields": "id,name,verification_status"},
                     tok=tok, hint=BUSINESS_SCOPE_HINT)
        if not rows:
            print("This token is not attached to any Business Manager it can read.")
            return
        emit(rows, fmt, ["id", "name", "verification_status"])
        return

    if not args.business:
        die("usage: meta business accounts --business <business_id>")

    allow = set(allowed_accounts())
    pmap = profile_map()
    rows = []
    for edge, relation in (("owned_ad_accounts", "owned"),
                           ("client_ad_accounts", "partner")):
        for a in paged(f"{args.business.strip()}/{edge}",
                       {"fields": BUSINESS_ACCOUNT_FIELDS},
                       tok=tok, hint=BUSINESS_SCOPE_HINT):
            rows.append({
                "id": a.get("id"),
                "name": a.get("name"),
                "currency": a.get("currency"),
                "relation": relation,
                "profile": pmap.get(a.get("id"), "(unmapped)"),
                "in_scope": "yes" if a.get("id") in allow else "NO",
            })

    if not rows:
        print("No ad accounts under this business are visible to this token.")
        return

    emit(rows, fmt, ["id", "name", "currency", "relation", "profile", "in_scope"])

    partner = [r for r in rows if r["relation"] == "partner"]
    if partner:
        print()
        print(f"{len(partner)} of these are partner accounts, owned by clients "
              "rather than by this business.")
        print("Listing them grants nothing. Add only the accounts this project "
              "should read to META_ALLOWED_ACCOUNTS,")
        print("and give each one its own token profile.")


def cmd_campaigns(args, fmt):
    acct = check_account(args.account)
    tok = token_for_account(acct)
    rows = paged(f"{acct}/campaigns", {
        "fields": "id,name,status,effective_status,objective,daily_budget,"
                  "lifetime_budget,start_time,stop_time",
    }, tok=tok)
    emit(rows, fmt, ["id", "name", "status", "effective_status", "objective",
                     "daily_budget", "start_time"])


def targeting_summary(t):
    """Collapse an ad set targeting spec into a one line audience label."""
    t = t or {}
    custom = [a.get("name") or a.get("id") for a in t.get("custom_audiences", [])]
    excluded = [a.get("name") or a.get("id") for a in t.get("excluded_custom_audiences", [])]
    flex = t.get("flexible_spec") or []
    interests, behaviours, demos = [], [], []
    for spec in flex:
        interests += [i.get("name") for i in spec.get("interests", [])]
        behaviours += [i.get("name") for i in spec.get("behaviors", [])]
        for k in ("education_statuses", "work_positions", "work_employers",
                  "family_statuses", "life_events", "industries", "income"):
            demos += [i.get("name") if isinstance(i, dict) else str(i)
                      for i in spec.get(k, [])]
    interests += [i.get("name") for i in t.get("interests", [])]
    if not flex and not interests and not behaviours and not demos:
        kind = "Custom audience only" if custom else "Broad (no targeting)"
    elif custom:
        kind = "Custom audience + detailed targeting"
    else:
        kind = "Detailed targeting (interests/behaviours)"
    geo = t.get("geo_locations") or {}
    places = [c for c in geo.get("countries", [])]
    places += [r.get("name") for r in geo.get("regions", [])]
    places += [c.get("name") for c in geo.get("cities", [])]
    return {
        "targeting_type": kind,
        "custom_audiences": custom,
        "excluded_custom_audiences": excluded,
        "interests": interests,
        "behaviors": behaviours,
        "demographics": demos,
        "age": f"{t.get('age_min', '')}-{t.get('age_max', '')}",
        "genders": t.get("genders"),
        "locations": places,
        "advantage_audience": (t.get("targeting_automation") or {}).get("advantage_audience"),
        "locales": t.get("locales"),
    }


def cmd_adsets(args, fmt):
    acct = check_account(args.account)
    tok = token_for_account(acct)
    fields = ("id,name,campaign_id,status,effective_status,"
              "daily_budget,lifetime_budget,optimization_goal,start_time")
    if args.targeting:
        fields += ",targeting"
    params = {"fields": fields}
    if args.campaign_id:
        rows = paged(f"{args.campaign_id}/adsets", params, tok=tok)
    else:
        rows = paged(f"{acct}/adsets", params, tok=tok)
    cols = ["id", "name", "campaign_id", "status", "effective_status",
            "optimization_goal", "daily_budget"]
    if args.targeting:
        for r in rows:
            r["audience"] = targeting_summary(r.pop("targeting", None))
            r["targeting_type"] = r["audience"]["targeting_type"]
        cols = ["id", "name", "status", "optimization_goal", "targeting_type"]
    emit(rows, fmt, cols)


def cmd_ads(args, fmt):
    acct = check_account(args.account)
    tok = token_for_account(acct)
    params = {"fields": "id,name,adset_id,campaign_id,status,effective_status,"
                        "creative{id,name}"}
    if args.adset_id:
        rows = paged(f"{args.adset_id}/ads", params, tok=tok)
    else:
        rows = paged(f"{acct}/ads", params, tok=tok)
    for r in rows:
        cre = r.pop("creative", None) or {}
        r["creative_id"] = cre.get("id", "")
    emit(rows, fmt, ["id", "name", "adset_id", "campaign_id", "status",
                     "effective_status", "creative_id"])


def cmd_forms(args, fmt):
    """Lead gen forms attached to the ad sets in an account.

    Graph hangs the form off the ad set as promoted_object.lead_gen_form_id and
    returns the id alone, so every distinct id is resolved to its name in a
    second call. Ad sets that optimize for something other than leads carry no
    form and come back blank."""
    acct = check_account(args.account)
    tok = token_for_account(acct)
    params = {"fields": "id,name,campaign_id,effective_status,"
                        "optimization_goal,promoted_object"}
    if args.campaign_id:
        rows = paged(f"{args.campaign_id}/adsets", params, tok=tok)
    else:
        rows = paged(f"{acct}/adsets", params, tok=tok)

    if args.active:
        rows = [r for r in rows if r.get("effective_status") == "ACTIVE"]

    seen, out = {}, []
    for r in rows:
        fid = (r.get("promoted_object") or {}).get("lead_gen_form_id", "")
        if fid and fid not in seen:
            try:
                seen[fid] = call(fid, {"fields": "name,status"},
                                 tok=tok, soft=True)
            except GraphError as exc:
                seen[fid] = {"name": f"<lookup failed: {exc.message}>"}
        form = seen.get(fid, {})
        out.append({
            "adset_id": r.get("id", ""),
            "adset_name": r.get("name", ""),
            "campaign_id": r.get("campaign_id", ""),
            "effective_status": r.get("effective_status", ""),
            "optimization_goal": r.get("optimization_goal", ""),
            "lead_gen_form_id": fid,
            "form_name": form.get("name", ""),
            "form_status": form.get("status", ""),
        })
    emit(out, fmt, ["adset_name", "effective_status", "optimization_goal",
                    "lead_gen_form_id", "form_name", "form_status"])


INSIGHT_FIELDS = ("spend,impressions,reach,frequency,clicks,ctr,cpc,cpm,"
                  "actions,cost_per_action_type")


def cmd_insights(args, fmt):
    acct = check_account(args.account)
    tok = token_for_account(acct)
    params = {"fields": INSIGHT_FIELDS, "level": args.level}

    if args.since or args.until:
        if not (args.since and args.until):
            die("--since and --until must be given together.")
        params["time_range"] = json.dumps({"since": args.since, "until": args.until})
    else:
        params["date_preset"] = args.date_preset

    if args.by_day:
        params["time_increment"] = 1
    if args.breakdown:
        params["breakdowns"] = args.breakdown
    if args.level != "account":
        params["fields"] = ("campaign_id,campaign_name," + INSIGHT_FIELDS
                            if args.level == "campaign" else
                            "campaign_name,adset_id,adset_name," + INSIGHT_FIELDS
                            if args.level == "adset" else
                            "campaign_name,adset_name,ad_id,ad_name," + INSIGHT_FIELDS)

    rows = paged(f"{acct}/insights", params, tok=tok)

    if fmt == "json":
        emit(rows, fmt)
        return

    # Meta reports three distinct lead numbers and they are easy to confuse:
    #   onsite_conversion.lead_grouped  instant form leads filled on Meta
    #   offsite_conversion.fb_pixel_lead  leads fired by the website pixel
    #   lead                            the sum of those two
    # Ads Manager's "Leads" column, and every UNITAR report built off it, means
    # lead_grouped. Reporting the `lead` total instead silently inflates the
    # count and understates CPL, so all three are shown with explicit names.
    def action_value(row, action_type):
        for action in (row.get("actions") or []):
            if action.get("action_type") == action_type:
                try:
                    return int(float(action.get("value", 0)))
                except (TypeError, ValueError):
                    return 0
        return 0

    flat = []
    for r in rows:
        item = {k: v for k, v in r.items()
                if k not in ("actions", "cost_per_action_type")}
        form = action_value(r, "onsite_conversion.lead_grouped")
        pixel = action_value(r, "offsite_conversion.fb_pixel_lead")
        total = action_value(r, "lead")
        item["leads_form"] = form
        item["leads_pixel"] = pixel
        item["leads_total"] = total
        spend = float(r.get("spend") or 0)
        item["cpl_form"] = round(spend / form, 2) if form else ""
        purchase = action_value(r, "purchase")
        if purchase:
            item["purchase"] = purchase
        flat.append(item)

    preferred = ["date_start", "date_stop", "region", "country", "age", "gender",
                 "publisher_platform", "campaign_name", "adset_name", "ad_name",
                 "spend", "impressions", "reach", "frequency", "clicks", "ctr",
                 "cpc", "cpm", "leads_form", "cpl_form", "leads_pixel",
                 "leads_total", "purchase"]
    present = [c for c in preferred if any(c in row for row in flat)]
    extras = [k for row in flat for k in row if k not in present and not k.endswith("_id")]
    seen, cols = set(), []
    for c in present + extras:
        if c not in seen:
            seen.add(c)
            cols.append(c)
    emit(flat, fmt, cols)


# --------------------------------------------------------------------------

def main():
    global DEBUG
    p = argparse.ArgumentParser(
        prog="meta",
        description="Meta Marketing API reporting CLI (read only, scope locked).")
    p.add_argument("-o", "--output", choices=["table", "json", "plain"],
                   default="table")
    p.add_argument("--debug", action="store_true")
    sub = p.add_subparsers(dest="cmd", required=True)

    a = sub.add_parser("auth", help="token identity and scope audit")
    a.add_argument("auth_cmd", choices=["status"])
    a.add_argument("--profile",
                   help="audit one profile only, e.g. TOGGLE. Default: all.")

    sub.add_parser("accounts",
                   help="every ad account every configured token can see")

    b = sub.add_parser("business",
                       help="discover Business Manager ids and the ad accounts "
                            "under one (read only)")
    b.add_argument("business_cmd", choices=["list", "accounts"])
    b.add_argument("--business",
                   help="business id, required by: meta business accounts")
    b.add_argument("--profile",
                   help="which token to use, e.g. TOGGLE. Optional when only "
                        "one profile is configured.")

    c = sub.add_parser("campaigns", help="campaigns in an ad account")
    c.add_argument("--account", required=True)

    s = sub.add_parser("adsets", help="ad sets in an ad account")
    s.add_argument("--account", required=True)
    s.add_argument("--campaign-id")
    s.add_argument("--targeting", action="store_true",
                   help="include the audience spec (custom audiences, interests, "
                        "geo, age) for each ad set")

    f = sub.add_parser("forms",
                       help="lead gen forms attached to ad sets in an account")
    f.add_argument("--account", required=True)
    f.add_argument("--campaign-id")
    f.add_argument("--active", action="store_true",
                   help="only ad sets whose effective status is ACTIVE")

    d = sub.add_parser("ads", help="ads in an ad account")
    d.add_argument("--account", required=True)
    d.add_argument("--adset-id")

    i = sub.add_parser("insights", help="performance report")
    i.add_argument("--account", required=True)
    i.add_argument("--level", choices=["account", "campaign", "adset", "ad"],
                   default="campaign")
    i.add_argument("--date-preset", default="last_7d")
    i.add_argument("--since")
    i.add_argument("--until")
    i.add_argument("--by-day", action="store_true")
    i.add_argument("--breakdown",
                   help="Graph breakdown, e.g. region, country, age, gender, "
                        "publisher_platform. Comma separate to combine.")

    args = p.parse_args()
    DEBUG = args.debug
    fmt = args.output

    handlers = {
        "auth": cmd_auth,
        "accounts": cmd_accounts,
        "business": cmd_business,
        "campaigns": cmd_campaigns,
        "adsets": cmd_adsets,
        "forms": cmd_forms,
        "ads": cmd_ads,
        "insights": cmd_insights,
    }
    handlers[args.cmd](args, fmt)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(130)
