# install: Google Ads reporting CLI → this project

> **Paste this file into Claude Code and it will connect this machine to Google Ads, read only, through `tools/google-ads/gads`.** Works on macOS and Windows. Each person signs in with their own Google login, and a machine can hold more than one login side by side.

Adapted from Phase 3 of the Ads CLI Starter Kit, rewritten for two changes the kit predates: Google sunset developer tokens on 2026-09-09, and some of us need a second Google login for partner agency accounts.

---

## READS
- This file
- `installations/google-ads/connection-card.md` (which login and which route reaches each account)
- `tools/google-ads/gads.py` (the `--help` text at the top lists every command)

---

## How access works (read once)

1. **Access lives on a Google Cloud project, not a developer token.** Toggle's project is `adroit-nuance-510512-k8` (display name `toggle-google-ads-reporting`, project number `801354963863`). Google approved it for **Explorer** access on 2026-10-03: 2,880 operations a day on live accounts, reporting fully available. A new machine reuses this project, so nobody applies again.
2. **Your Google login decides which accounts you can read.** If you can open an account in the Google Ads web interface with a login, `gads` can read it with that login. New accounts appear on the next call with no reconnect.
3. **A login profile is one Google login on this machine.** `toggle` is always your toggle.solutions login. Any other name (such as `personal`) is a second login, stored in its own gcloud folder so the two never overwrite each other.
4. **A route is the manager account a request goes through.** The same login reaches some accounts through the Toggle manager account, some directly, and some through a partner's manager account. A wrong route returns `403 The caller does not have permission`. The connection card lists the route for every known account.

---

## CHECKS (run these before anything else)

```bash
# 1. The tool is present
ls -la tools/google-ads/gads tools/google-ads/gads.py

# 2. uv (supplies the Python gads runs on; python3 3.9+ works too)
uv --version
# Missing on macOS:   curl -LsSf https://astral.sh/uv/install.sh | sh
# Missing on Windows: powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# 3. The Google Cloud CLI
gcloud --version
# Windows + Git Bash: `gcloud` there can fail with "Python was not found". Run
# gcloud commands in PowerShell instead. gads itself is unaffected (it calls gcloud.cmd).

# 4. .env exists at the project root and git ignores it
ls -la .env && git check-ignore -v .env
```

Stop and report any failure before continuing.

---

## STEPS

### 1. Install the Google Cloud CLI (you, about 10 minutes, skip if CHECK 3 passed)

**macOS:** `brew install --cask gcloud-cli`. If Homebrew reports no such cask, use `brew install --cask google-cloud-sdk`. Open a new terminal afterward.

**Windows:** Claude downloads the installer and checks its signature:

```bash
curl -sSLo ~/Downloads/GoogleCloudSDKInstaller.exe https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe
powershell -NoProfile -Command "(Get-AuthenticodeSignature \"$env:USERPROFILE\Downloads\GoogleCloudSDKInstaller.exe\").Status"
# Expected: Valid (signed by Google LLC)
```

You run it: leave both opening checkboxes unticked, keep **Single User** and every default, and on the last screen untick **Start Google Cloud SDK Shell** and **Run 'gcloud init'**. Restart Claude Code so it picks up the new PATH.

### 2. Get the OAuth client file (you, 3 minutes)

The sign-in app already exists in the Toggle Cloud project. Download its client file:

1. Open **console.cloud.google.com** as jordan@toggle.solutions (or ask Jordan for the file over a private channel).
2. Select the project **toggle-google-ads-reporting** in the dropdown at the top left.
3. Go to **APIs & Services → OAuth consent screen**, which opens Google Auth Platform. Click **Clients**, open **Ads Reporting Dashboard**, and click the download icon.
4. Save it as `ads-oauth-client.json` in the gcloud folder, which is hidden on both systems, so paste the path into the save dialog:
   - macOS: `~/.config/gcloud/ads-oauth-client.json` (press Cmd+Shift+G in the dialog to type a path)
   - Windows: `%APPDATA%\gcloud\ads-oauth-client.json` (paste into the address bar)

Claude creates the folder first if it is missing (`mkdir -p ~/.config/gcloud` or `mkdir -p "$APPDATA/gcloud"`). The file holds a client secret, so it stays out of this repo.

### 3. Sign in the `toggle` profile (you, 2 minutes)

Claude starts the sign-in in the background; a browser window opens.

```bash
# macOS
gcloud auth application-default login \
  --scopes=https://www.googleapis.com/auth/adwords,https://www.googleapis.com/auth/cloud-platform \
  --client-id-file="$HOME/.config/gcloud/ads-oauth-client.json"
```

```powershell
# Windows (PowerShell)
gcloud auth application-default login --scopes="https://www.googleapis.com/auth/adwords,https://www.googleapis.com/auth/cloud-platform" --client-id-file="$env:APPDATA\gcloud\ads-oauth-client.json"
```

In the browser: pick **your toggle.solutions login**, click **Advanced → Go to Ads Reporting (unsafe)** on the "Google hasn't verified this app" screen (expected, the app is ours and unverified on purpose), tick every permission box, and click **Continue**. Google words the Ads permission as "see, edit, create and delete"; `gads` sends reads only.

The terminal prints `Credentials saved to file: [.../gcloud/application_default_credentials.json]`.

### 4. Add the Google lines to `.env` (Claude)

Append these lines to `.env` at the project root if they are missing. Neither value is a secret.

```bash
export GOOGLE_ADS_LOGIN_CUSTOMER_ID="6738385427"   # Toggle Solutions manager account
export GOOGLE_PROJECT_ID="adroit-nuance-510512-k8"
# Optional since 2026-09-09; Google ignores it. Leave unset.
# export GOOGLE_ADS_DEVELOPER_TOKEN=""
```

`gads` reads `GOOGLE_*` lines from `.env` by itself, so no `source .env` is needed.

### 5. Add a second login profile (optional, you + Claude, 2 minutes)

For accounts that only another Google login can open. Pick a short profile name (`personal` below). The sign-in is step 3 with `CLOUDSDK_CONFIG` pointing at a new folder named `<gcloud folder>-<profile>`:

```bash
# macOS
mkdir -p "$HOME/.config/gcloud-personal"
CLOUDSDK_CONFIG="$HOME/.config/gcloud-personal" gcloud auth application-default login \
  --scopes=https://www.googleapis.com/auth/adwords,https://www.googleapis.com/auth/cloud-platform \
  --client-id-file="$HOME/.config/gcloud/ads-oauth-client.json"
```

```powershell
# Windows (PowerShell)
New-Item -ItemType Directory -Force "$env:APPDATA\gcloud-personal" | Out-Null
$env:CLOUDSDK_CONFIG = "$env:APPDATA\gcloud-personal"
gcloud auth application-default login --scopes="https://www.googleapis.com/auth/adwords,https://www.googleapis.com/auth/cloud-platform" --client-id-file="$env:APPDATA\gcloud\ads-oauth-client.json"
```

In the browser, pick **the other login**, then follow the same clicks as step 3. If the browser offers the toggle.solutions login only, click **Use another account**.

A second profile has no default route. To give it one, add `GOOGLE_ADS_LOGIN_CUSTOMER_ID_PERSONAL="<manager id>"` to `.env`.

### 6. Verify (Claude)

```bash
tools/google-ads/gads --profile toggle auth status       # login folder, default route, direct accounts
tools/google-ads/gads --profile toggle accounts          # name, currency, manager? for each direct account
tools/google-ads/gads --profile personal accounts        # only if step 5 was done
```

A healthy `auth status` ends with `OK: authenticated, N account(s) with direct user access`. An `accounts` row with `CUSTOMER_NOT_ENABLED` is a deactivated account, not a setup fault.

### 7. Smoke test one live account (Claude)

```bash
tools/google-ads/gads --profile toggle query 4547947408 \
  "SELECT campaign.name, metrics.clicks, metrics.cost_micros FROM campaign WHERE segments.date DURING LAST_7_DAYS AND metrics.impressions > 0"
```

That is CDC Management Development through the Toggle manager account. Rows back means the machine is connected.

### 8. Record the setup

Update `installations/google-ads/connection-card.md` when a new account, route, or profile appears.

---

## Everyday use

```bash
tools/google-ads/gads --profile toggle tree 6738385427                    # every account under the Toggle manager account
tools/google-ads/gads --profile toggle query <ID> "<GAQL>"                 # through the profile's default route
tools/google-ads/gads --profile toggle query <ID> "<GAQL>" --login-cid direct
tools/google-ads/gads --profile toggle query <ID> "<GAQL>" --login-cid <MANAGER_ID>
tools/google-ads/gads --profile toggle -o json query <ID> "<GAQL>" > out.json
tools/google-ads/gads --profile toggle fields metrics.conversions          # field metadata
```

`cost_micros` divides by 1,000,000 for the account currency.

## Rules of engagement

1. **Read only.** `tools/google-ads/gads` has no write command, and `raw` refuses any path outside its search and metadata allowlist.
2. **Every call names its profile.** There is no default profile, so a partner account cannot be queried with the wrong login by habit.
3. **White-label accounts stay on the login that reaches them.** Some partner agency accounts must not learn Toggle is involved. Never link those to the Toggle manager account, and never invite a toggle.solutions user to them.
4. **Login files stay on the machine.** `ads-oauth-client.json` and `application_default_credentials.json` never go into this repo, a chat, or an MCP config.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `403 The caller does not have permission` | Wrong route. Try `--login-cid direct`, then the manager ID from the connection card. |
| `CUSTOMER_NOT_ENABLED` | The account is deactivated. No route will work. |
| `profile '<name>' has no login yet` | Run step 3 (for `toggle`) or step 5 (for any other profile). |
| `Python was not found` from `gcloud` in Git Bash | Run gcloud commands in PowerShell. |
| "Access blocked" on the sign-in page | The Google Auth Platform app slipped back to Testing. Publish it again under **Audience**. |
| HTTP 404 on every call | API version `v25` was sunset. Set `GOOGLE_ADS_API_VERSION` in `.env` to the current version. |
| HTTP 401 | The login expired or was revoked. Repeat the sign-in step for that profile. |
