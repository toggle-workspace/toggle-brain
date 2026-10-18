# install: LinkedIn Ads reporting CLI → this project

> **Paste this file into Claude Code and it will connect this machine to LinkedIn Ads, read only, through `tools/linkedin-ads/li`.** Works on macOS and Windows. One access token per LinkedIn login, minted in the browser with LinkedIn's Token Generator.

Written after the first connection on 2026-10-18 on Windows 11 through uv, so every step below is one that was run rather than one copied from LinkedIn's documentation. The Mac has not been connected yet; the steps are the same apart from the uv install line.

---

## READS
- This file
- `installations/linkedin-ads/connection-card.md` (which ad account ID belongs to which client)
- `tools/linkedin-ads/li.py` (the `--help` text at the top lists every command)

---

## How access works (read once)

1. **Access lives on a developer app.** Toggle's app is **Toggle Solutions Ads Reporting**, Client ID `788mpnv8ec2p5m`, linked to the Toggle Solutions company page and approved for the **Advertising API (Development tier)** on 2026-10-18. It is managed at <https://www.linkedin.com/developers/apps>. A new machine reuses this app, so nobody applies again.
2. **Your LinkedIn login decides which ad accounts the token can read.** The token covers every ad account where the approving login holds a role in Campaign Manager (Viewer is enough). A new client account shows up as soon as the client adds that login to their account; no new token is needed.
3. **Two scopes only: `r_ads` and `r_ads_reporting`.** The app was approved for many more, including `rw_ads` and the posting scopes. Never tick those on the token: it sits in a plain text `.env`, and a read-only token cannot change a campaign even if it leaks.
4. **The access token lasts 60 days, the refresh token about a year.** `li auth refresh --save` trades the refresh token for a new access token without a browser. When the refresh token itself runs out, mint a new pair (step 2).
5. **Never click "Generate a new Client Secret" or the ✕ beside the secret.** A new secret breaks every refresh on every machine.

---

## CHECKS (run these before anything else)

```bash
# 1. The tool is present
ls -la tools/linkedin-ads/li tools/linkedin-ads/li.py

# 2. uv (supplies the Python li runs on; python3 3.9+ works too)
uv --version
# Missing on macOS:   curl -LsSf https://astral.sh/uv/install.sh | sh
# Missing on Windows: powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# 3. .env exists at the project root and git ignores it
ls -la .env && git check-ignore -v .env
```

Stop and report any failure before continuing.

---

## STEPS

### 1. Add the LinkedIn lines to `.env` (Claude)

Append to `.env` at the project root if missing. The Client ID is not a secret; the other three are, and the human pastes them in, never through the chat.

```bash
# LinkedIn Ads (read only). App: Toggle Solutions Ads Reporting.
# Access token expires 60 days after it is created.
export LINKEDIN_CLIENT_ID="788mpnv8ec2p5m"
export LINKEDIN_CLIENT_SECRET=""
export LINKEDIN_ACCESS_TOKEN=""
export LINKEDIN_REFRESH_TOKEN=""
```

### 2. Mint the token (human, 3 minutes)

1. Sign in at <https://www.linkedin.com/developers> with the LinkedIn login that has a role on the client ad accounts.
2. Open **Docs and tools → OAuth Token Tools → Create token**.
3. Select **Toggle Solutions Ads Reporting**, keep **Member authorization code (3-legged)**, and tick **only `r_ads` and `r_ads_reporting`**.
4. Click **Request access token**, then **Allow**.
5. Use the page's copy buttons to paste the **access token** and the **refresh token** into `.env`. From the app's **Auth** tab, copy the **Primary Client Secret** into `LINKEDIN_CLIENT_SECRET`. Do not retype them and do not screenshot this page into a chat: l, I and 1 look identical in these tokens.

**If it fails with "the state parameter was modified":** this happened on the first run. Two fixes, in order: add `https://www.linkedin.com/developers/tools/oauth/redirect` under **Auth → Authorized redirect URLs for your app**, then redo step 2 in an incognito window with no other LinkedIn tabs open.

### 3. Verify (Claude)

```bash
tools/linkedin-ads/li auth status        # scopes, expiry, readable accounts
tools/linkedin-ads/li accounts
tools/linkedin-ads/li report 547313427   # VoiceRun, last 7 days
```

`auth status` must show `scope: r_ads,r_ads_reporting` and list VoiceRun. Update `connection-card.md` if the account list changed.

### 4. Set a reminder (human)

Put the access token's expiry date (shown by `auth status`) minus 5 days in the calendar. On that day run `tools/linkedin-ads/li auth refresh --save`.

---

## Gotchas found on the first run

- **Every request needs `LinkedIn-Version: YYYYMM` and `X-Restli-Protocol-Version: 2.0.0`.** `li` sends both. LinkedIn retires a version about a year after release; an HTTP 426 means set `LINKEDIN_API_VERSION` in `.env` to a newer month.
- **Cost comes in the account's own currency** (`costInLocalCurrency`). VoiceRun is USD; the SECOM and personal accounts include MYR ones. Never add spend across accounts without converting.
- **Website conversions and Lead Gen Form leads are separate columns** (`externalWebsiteConversions`, `oneClickLeads`). Report them separately; their costs do not blend.
- **adAnalytics returns IDs, not names.** `li` looks the names up per level, so a removed campaign can show a blank name.
- **Lead contact details are out of scope.** Downloading who filled a Lead Gen Form needs the separate Lead Sync API product, which Toggle has not requested.

---

## Uninstall

Delete the four `LINKEDIN_*` lines from `.env`. To cut access everywhere, remove the app under LinkedIn **Settings → Data privacy → Permitted services** for the approving login.
