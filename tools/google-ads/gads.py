#!/usr/bin/env python3
"""gads: read-only Google Ads API client for this project, with login profiles.

Adapted from the Ads CLI Starter Kit's bin/gads. Stdlib only. Auth is gcloud
Application Default Credentials (ADC); each login profile keeps its ADC in its
own gcloud config folder, so two Google logins never overwrite each other.

Usage (run through tools/google-ads/gads, which supplies the Python):
  gads --profile <name> auth status                   verify the login, list direct accounts
  gads --profile <name> accounts                      name, currency, manager? per direct account
  gads --profile <name> tree <MANAGER_ID>             every account under a manager account
  gads --profile <name> query <CUSTOMER_ID> "<GAQL>"  run a GAQL query (paginated)
  gads --profile <name> fields <field_or_resource>    GoogleAdsField metadata lookup
  gads --profile <name> raw <path> [--body '<json>']  read-only escape hatch

Options:
  --profile <name>      required on every call (or set GADS_PROFILE). "toggle" is
                        the toggle.solutions login in gcloud's default folder;
                        any other name uses the folder "<default>-<name>".
  --login-cid <id>      the manager account the request goes through, for this
                        call only. "direct" sends none (you are a user on the
                        account itself). Default: the profile's login ID.
  -o json|table|jsonl   output format (default: table)

Environment (read from .env at the project root when not already set):
  GOOGLE_ADS_LOGIN_CUSTOMER_ID           toggle profile's default manager ID
  GOOGLE_ADS_LOGIN_CUSTOMER_ID_<PROFILE> another profile's default (optional)
  GOOGLE_ADS_DEVELOPER_TOKEN             optional. Google sunset developer
                                         tokens on 2026-09-09; sent if set
  GOOGLE_ADS_API_VERSION                 default v25. On a 404, bump this
  GCLOUD_BIN                             path to gcloud if not on PATH

Read-only by construction: only search and metadata endpoints exist here, and
no mutate request is ever sent.
"""

import json
import os
import re
import shutil
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request

API_HOST = "https://googleads.googleapis.com"
PROJECT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DEFAULT_PROFILE = "toggle"

# `raw` is an escape hatch, not a write path. Anchored allowlist over the
# DECODED path; anything else (incl. :mutate) is rejected before any call.
RAW_POST_PATHS = [
    r"customers/\d+/googleAds:search",
    r"customers/\d+/googleAds:searchStream",
    r"googleAdsFields:search",
]
RAW_GET_PATHS = [
    r"customers:listAccessibleCustomers",
    r"customers/\d+",
    r"googleAdsFields/[A-Za-z0-9._]+",
]

_token_cache = {}


def die(msg, hint=None):
    sys.stderr.write(f"gads: {msg}\n")
    if hint:
        sys.stderr.write(f"      {hint}\n")
    sys.exit(1)


def load_dotenv():
    """Pull GOOGLE_* lines from the project .env without overriding the shell."""
    path = os.path.join(PROJECT, ".env")
    if not os.path.exists(path):
        return
    with open(path, encoding="utf-8") as f:
        for line in f:
            m = re.match(r'\s*(?:export\s+)?(GOOGLE_[A-Z0-9_]+)=(["\']?)(.*?)\2\s*$', line)
            if m and m.group(1) not in os.environ:
                os.environ[m.group(1)] = m.group(3)


def gcloud_base():
    """gcloud's default config folder on this OS."""
    if os.name == "nt":
        return os.path.join(os.environ.get("APPDATA", os.path.expanduser("~")), "gcloud")
    return os.path.expanduser("~/.config/gcloud")


def select_profile(name):
    """Point gcloud at the profile's config folder and set its default login ID."""
    if not re.fullmatch(r"[a-z0-9-]+", name):
        die(f"invalid profile name {name!r}", "use lowercase letters, digits and dashes")
    base = gcloud_base()
    folder = base if name == DEFAULT_PROFILE else f"{base}-{name}"
    adc = os.path.join(folder, "application_default_credentials.json")
    if not os.path.exists(adc):
        die(f"profile {name!r} has no login yet ({adc} is missing)",
            "sign in once, see installations/google-ads/install.md step 5")
    os.environ["CLOUDSDK_CONFIG"] = folder
    if name == DEFAULT_PROFILE:
        lcid = os.environ.get("GOOGLE_ADS_LOGIN_CUSTOMER_ID", "")
    else:
        lcid = os.environ.get(f"GOOGLE_ADS_LOGIN_CUSTOMER_ID_{name.upper().replace('-', '_')}", "")
    os.environ["GADS_DEFAULT_LOGIN_CID"] = lcid.strip()
    return folder, adc


def api_version():
    return os.environ.get("GOOGLE_ADS_API_VERSION", "v25")


def gcloud_bin():
    explicit = os.environ.get("GCLOUD_BIN")
    if explicit:
        return explicit
    on_path = shutil.which("gcloud")
    if on_path:
        return on_path
    for fallback in ("~/google-cloud-sdk/bin/gcloud",
                     "/opt/homebrew/bin/gcloud", "/usr/local/bin/gcloud"):
        fallback = os.path.expanduser(fallback)
        if os.path.exists(fallback):
            return fallback
    die("gcloud not found", "install the Google Cloud CLI or set GCLOUD_BIN")


def adc_token():
    if "t" in _token_cache:
        return _token_cache["t"]
    try:
        out = subprocess.run(
            [gcloud_bin(), "auth", "application-default", "print-access-token"],
            capture_output=True, text=True, timeout=60,
        )
    except subprocess.TimeoutExpired:
        die("gcloud timed out fetching an access token")
    if out.returncode != 0:
        die("gcloud could not produce an access token for this profile",
            (out.stderr.strip().splitlines() or ["re-run the sign-in step"])[-1])
    _token_cache["t"] = out.stdout.strip()
    return _token_cache["t"]


def digits(cid):
    return "".join(c for c in cid if c.isdigit())


def check_raw_path(path, has_body):
    decoded = urllib.parse.unquote(path).lstrip("/")
    allowed = RAW_POST_PATHS if has_body else RAW_GET_PATHS
    if not any(re.fullmatch(p, decoded) for p in allowed):
        verb = "POST" if has_body else "GET"
        die(f"raw {verb} to {decoded!r} is not on the read-only allowlist",
            "allowed: " + ", ".join(allowed))
    return decoded


def call(path, body=None, login_cid=None, raise_err=False):
    """One REST call. login_cid: None = profile default, "direct" = no header."""
    url = f"{API_HOST}/{api_version()}/{path.lstrip('/')}"
    headers = {
        "Authorization": f"Bearer {adc_token()}",
        "Content-Type": "application/json",
    }
    dev = os.environ.get("GOOGLE_ADS_DEVELOPER_TOKEN", "").strip()
    if dev:
        headers["developer-token"] = dev
    lcid = login_cid if login_cid is not None else os.environ.get("GADS_DEFAULT_LOGIN_CID", "")
    if lcid and lcid != "direct":
        headers["login-customer-id"] = digits(lcid)
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, headers=headers,
                                 method="POST" if data is not None else "GET")
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")
        try:
            detail = json.dumps(json.loads(detail), indent=2)
        except ValueError:
            pass
        hint = None
        if e.code == 404:
            hint = (f"API version {api_version()} may be sunset; "
                    "set GOOGLE_ADS_API_VERSION and retry")
        elif e.code == 401:
            hint = "login rejected; re-run the sign-in step for this profile"
        elif "CUSTOMER_NOT_ENABLED" in detail:
            hint = "the account is deactivated or not set up yet; no route will work"
        elif "USER_PERMISSION_DENIED" in detail or "does not have permission" in detail:
            hint = ("wrong route: try --login-cid direct, or --login-cid <the manager "
                    "account above it>; see installations/google-ads/connection-card.md")
        elif "NOT_APPROVED" in detail:
            hint = ("the Cloud project is on Test access; apply for Explorer in "
                    "Cloud console > Google Ads API > Manage")
        if raise_err:
            first = next((ln.strip() for ln in detail.splitlines()
                          if '"message"' in ln), detail[:120])
            raise RuntimeError(f"HTTP {e.code}: {first}")
        die(f"HTTP {e.code} from {url}\n{detail}", hint)
    except urllib.error.URLError as e:
        if raise_err:
            raise RuntimeError(f"network error: {e.reason}")
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
    widths = {c: min(60, max(len(c), *(len(str(r.get(c, ""))) for r in rows))) for c in cols}
    print("  ".join(c.ljust(widths[c]) for c in cols))
    print("  ".join("-" * widths[c] for c in cols))
    for r in rows:
        print("  ".join(str(r.get(c, ""))[: widths[c]].ljust(widths[c]) for c in cols))
    print(f"({len(rows)} rows)")


def search(cid, query, login_cid=None, raise_err=False):
    rows, token = [], None
    while True:
        body = {"query": query}
        if token:
            body["pageToken"] = token
        resp = call(f"customers/{digits(cid)}/googleAds:search", body,
                    login_cid=login_cid, raise_err=raise_err)
        rows.extend(resp.get("results", []))
        token = resp.get("nextPageToken")
        if not token:
            return rows


def cmd_auth_status(profile, folder, adc):
    print(f"profile:         {profile}")
    print(f"gcloud folder:   {folder}")
    print(f"login file:      present ({adc})")
    print(f"gcloud:          {gcloud_bin()}")
    print(f"default login:   {os.environ.get('GADS_DEFAULT_LOGIN_CID') or 'none (direct)'}")
    print(f"API version:     {api_version()}")
    names = call("customers:listAccessibleCustomers").get("resourceNames", [])
    print(f"\nOK: authenticated, {len(names)} account(s) with direct user access:")
    for n in names:
        print(f"  {n.split('/')[-1]}")


def cmd_accounts(fmt):
    # listAccessibleCustomers returns accounts the login is a direct user on,
    # so each is queried with no manager header: that route always applies.
    names = call("customers:listAccessibleCustomers").get("resourceNames", [])
    rows, failures = [], 0
    q = ("SELECT customer.id, customer.descriptive_name, customer.manager, "
         "customer.currency_code, customer.status FROM customer")
    for rn in names:
        cid = rn.split("/")[-1]
        try:
            rows.extend(search(cid, q, login_cid="direct", raise_err=True))
        except RuntimeError as e:
            failures += 1
            rows.append({"customer": {"id": cid, "error": str(e)}})
    emit(rows, fmt)
    if failures:
        print(f"gads: {failures} account(s) errored (complete:false)", file=sys.stderr)
        sys.exit(2)


def cmd_tree(manager, fmt, login_cid):
    q = ("SELECT customer_client.id, customer_client.descriptive_name, "
         "customer_client.manager, customer_client.level, customer_client.currency_code, "
         "customer_client.status FROM customer_client")
    emit(search(manager, q, login_cid=login_cid or digits(manager)), fmt)


def main(argv):
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    load_dotenv()
    fmt, login_cid, profile, args = "table", None, os.environ.get("GADS_PROFILE"), []
    i = 0
    while i < len(argv):
        a = argv[i]
        if a in ("-o", "--login-cid", "--profile") and i + 1 >= len(argv):
            die(f"{a} needs a value")
        if a == "-o":
            i += 1
            fmt = argv[i]
            if fmt not in ("json", "table", "jsonl"):
                die(f"unknown format {fmt!r}")
        elif a == "--login-cid":
            i += 1
            login_cid = argv[i]
        elif a == "--profile":
            i += 1
            profile = argv[i]
        else:
            args.append(a)
        i += 1

    if not args or args[0] in ("-h", "--help", "help"):
        print(__doc__)
        return
    if not profile:
        die("no profile given", "pass --profile toggle (or another signed-in profile)")
    folder, adc = select_profile(profile)

    cmd = args[0]
    if cmd == "auth" and args[1:2] == ["status"]:
        cmd_auth_status(profile, folder, adc)
    elif cmd == "accounts":
        cmd_accounts(fmt)
    elif cmd == "tree":
        if len(args) < 2:
            die("usage: gads tree <MANAGER_ID>")
        cmd_tree(args[1], fmt, login_cid)
    elif cmd == "query":
        if len(args) < 3:
            die('usage: gads query <CUSTOMER_ID> "<GAQL>"')
        emit(search(args[1], args[2], login_cid=login_cid), fmt)
    elif cmd == "fields":
        if len(args) < 2:
            die("usage: gads fields <field_or_resource_name>")
        name = args[1]
        if not re.fullmatch(r"[A-Za-z0-9._]+", name):
            die(f"invalid field name {name!r}")
        q = ("SELECT name, category, data_type, selectable, filterable, "
             f"sortable, is_repeated WHERE name LIKE '%{name}%'")
        results, token = [], None
        while True:
            body = {"query": q, "pageSize": 200}
            if token:
                body["pageToken"] = token
            resp = call("googleAdsFields:search", body, login_cid="direct")
            results.extend(resp.get("results", []))
            token = resp.get("nextPageToken")
            if not token:
                break
        emit(results, fmt)
    elif cmd == "raw":
        if len(args) < 2:
            die("usage: gads raw <path> [--body '<json>']")
        body = json.loads(args[args.index("--body") + 1]) if "--body" in args else None
        path = check_raw_path(args[1], body is not None)
        print(json.dumps(call(path, body, login_cid=login_cid), indent=2, ensure_ascii=False))
    else:
        die(f"unknown command {cmd!r}", "run gads --help")


if __name__ == "__main__":
    main(sys.argv[1:])
