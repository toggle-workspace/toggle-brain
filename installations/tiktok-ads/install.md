# install: TikTok Ads reporting CLI → this project

> **Paste this file into Claude Code and it will connect this machine to TikTok Ads, read only, through `tools/tiktok-ads/tt`.** Works on macOS and Windows. One access token per TikTok login, obtained once through a browser consent screen.

Written after the first connection on 2026-10-08, so every step below is one that was actually run rather than one copied from TikTok's documentation. The same day, the recipe was run a second time on Windows 11 through uv, so both platforms are proven.

---

## READS
- This file
- `installations/tiktok-ads/connection-card.md` (which advertiser ID belongs to which client)
- `tools/tiktok-ads/tt.py` (the `--help` text at the top lists every command)

---

## How access works (read once)

1. **Access lives on a developer app, not on your TikTok login alone.** Toggle's app is **Toggle Solutions TikTok Brain Ads**, App ID `7692121001227878421`, approved by TikTok in October 2026. A new machine reuses this app, so nobody applies again. The app is managed at <https://business-api.tiktok.com/portal>.
2. **Your TikTok login decides which ad accounts the token can read.** Authorization happens at the user level, so there is no account picker on the consent screen. The token simply covers every advertiser account the approving login can reach, and the list comes back in the token response. Toggle's current token was approved by `jordan420` (pinto.jordan@gmail.com), which holds Business Center admin plus partner links into client accounts.
3. **A new client account appears only after a fresh consent.** Unlike Google Ads, the account list is fixed at the moment the token is issued. When Toggle takes on a TikTok client, repeat steps 4 and 5 to mint a replacement token.
4. **The token is the whole credential.** There is no refresh cycle to maintain for Marketing API reporting. Treat the token like a password: it lives in `.env`, never in a chat window, never in this repo.
5. **The portal never shows a token.** The app page lists the App ID, the Secret and the redirect URL, but an access token only exists after a consent and an exchange. Each machine can mint its own, and tokens minted from the same Secret work side by side, so connecting a second machine does not disconnect the first.

---

## CHECKS (run these before anything else)

```bash
# 1. The tool is present
ls -la tools/tiktok-ads/tt tools/tiktok-ads/tt.py

# 2. uv (supplies the Python tt runs on; python3 3.9+ works too)
uv --version
# Missing on macOS:   curl -LsSf https://astral.sh/uv/install.sh | sh
# Missing on Windows: powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# 3. .env exists at the project root and git ignores it
ls -la .env && git check-ignore -v .env
```

Stop and report any failure before continuing.

---

## STEPS

### 1. Get the app credentials (you, 2 minutes)

1. Open <https://business-api.tiktok.com/portal> and sign in with the TikTok account that owns the app.
2. On **My Apps**, confirm **Toggle Solutions TikTok Brain Ads** shows **Approved** and the **Online** toggle is on.
3. Click **Edit**. Copy the **Secret** using the copy icon, or click the eye icon to reveal it. It is 40 characters long. **Never click Reset** beside it: a new Secret invalidates every token minted from the old one, on every machine.
4. On the same page, note **Advertiser redirect URLs**. It is currently `https://toggle.solutions`, with **no trailing slash**.

### 2. Add the TikTok lines to `.env` (Claude)

Append to `.env` at the project root if missing. The App ID is not a secret; the other two are.

```bash
export TIKTOK_APP_ID="7692121001227878421"
export TIKTOK_APP_SECRET="<the 40-character secret from step 1>"
export TIKTOK_REDIRECT_URI="https://toggle.solutions"
```

Then `chmod 600 .env`.

`TIKTOK_REDIRECT_URI` must match the portal value character for character. A trailing slash on one side and not the other fails the authorization with an unhelpful error.

`tt` reads `TIKTOK_*` lines from `.env` by itself, so no `source .env` is needed. It drops a trailing `# comment`, so inline notes are safe.

### 3. Generate the consent link (Claude)

```bash
tools/tiktok-ads/tt auth url
```

That prints a link of the form `https://business-api.tiktok.com/portal/auth?app_id=...&state=toggle&redirect_uri=...`. The portal also shows a ready-made **Advertiser authorization URL** on the app page, which is the same thing with a placeholder `state`.

### 4. Approve in the browser (you, 2 minutes)

Open the link in a browser **already signed in to the TikTok account whose ad accounts you want**. Check the account name shown at the top of the consent screen before clicking anything.

Leave every requested permission ticked. Scroll to the bottom and click **Confirm**.

The browser lands on `https://toggle.solutions/?auth_code=...&state=toggle`. Copy the **whole** address from the address bar. The code is single use and expires within minutes.

### 5. Exchange the code for a token (Claude)

```bash
tools/tiktok-ads/tt auth exchange "<the whole redirected URL>" --save
```

That prints how many advertiser accounts the token covers and writes `TIKTOK_ACCESS_TOKEN` into `.env` at mode 600. If a `TIKTOK_ACCESS_TOKEN` line already exists, including an empty placeholder, `--save` replaces it in place, so a re-consent for a new client takes effect immediately. Without `--save` it prints the token instead, for manual placement.

The auth code in the redirected URL is single use and dies within minutes, so pasting that URL into a chat with Claude is safe. The token that comes back is not, and it should go straight into `.env` through `--save`.

### 6. Verify (Claude)

```bash
tools/tiktok-ads/tt auth status      # token valid, authorized advertiser count
tools/tiktok-ads/tt accounts         # name, company, currency, timezone, status
```

A healthy `auth status` ends with `OK: token valid, N advertiser account(s) authorized`. Compare that list against `connection-card.md`. A client missing from it is a Business Center permission gap, not a setup fault, and the fix is to grant access in Business Center and then repeat steps 3 to 5.

### 7. Smoke test one live account (Claude)

```bash
tools/tiktok-ads/tt report 7508692797466329106 --since 2026-09-01 --until 2026-09-30
```

That is UNITAR for September 2026. The first connection returned RM267,845.29 spend against 1,690 conversions across nine active campaigns. Rows back means the machine is connected.

### 8. Record the setup

Update `installations/tiktok-ads/connection-card.md` whenever an account, a client mapping, or the approving login changes.

---

## Everyday use

```bash
tools/tiktok-ads/tt accounts                                     # every authorized account
tools/tiktok-ads/tt campaigns <ADV_ID>                           # campaign settings, not results
tools/tiktok-ads/tt report <ADV_ID>                              # last 7 days, by campaign
tools/tiktok-ads/tt report <ADV_ID> --since 2026-09-01 --until 2026-09-30
tools/tiktok-ads/tt report <ADV_ID> --level ad --since ... --until ...
tools/tiktok-ads/tt report <ADV_ID> --level account --daily      # day by day
tools/tiktok-ads/tt report <ADV_ID> --all                        # include dormant campaigns
tools/tiktok-ads/tt -o json report <ADV_ID> > out.json
```

`--level` takes `account`, `campaign`, `adgroup`, or `ad`. Spend is in the account's own currency, which is MYR on every Toggle account so far.

`conversion` is whatever the campaign optimizes for, so on a lead generation campaign it means leads and `cost_per_conversion` means cost per lead. A brand awareness campaign reports zero conversions by design, not by fault.

Rows with no spend, impressions, clicks or conversions are hidden by default, since most accounts carry years of dormant campaigns. Pass `--all` to see them. The totals line counts the full result set either way.

## Rules of engagement

1. **Read only.** `tools/tiktok-ads/tt` has no write command, and `raw` refuses any path outside its read allowlist. Every TikTok write verb (`/create/`, `/update/`, `/delete/`, `/status/`) is rejected before a call is made.
2. **The token never leaves the machine.** Not into this repo, not into a chat window, not into an MCP config. If it leaks, reset the Secret in the portal, which invalidates every token minted from it, then redo steps 1 to 5.
3. **White-label accounts stay on the login that reaches them.** Some partner agency accounts must not learn Toggle is involved. The same rule that governs Google Ads applies here.
4. **Settings and results are different endpoints.** `campaigns` tells you a campaign's budget and status. Only `report` tells you what it spent. Never infer performance from the campaigns list.

## Known risk: the token is bound to a personal login

The current token was approved by `pinto.jordan@gmail.com`, a personal Google account rather than a toggle.solutions one. Every client account the CLI can read flows through that single login. If it is lost, locked, or handed over, TikTok reporting stops for the whole agency.

The fix is a toggle.solutions TikTok login added to Business Center with the same roles and partner links, then a fresh consent from that login. Until then, treat this as a single point of failure worth knowing about.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `TikTok error 40002` on `auth exchange` | The code is used up or expired. Start again at step 3 and move faster. |
| `TikTok error 40100` or `40105` | The token is invalid, revoked, or does not cover that advertiser. Redo steps 3 to 5. |
| `TikTok error 40110` | The app is not permitted on that advertiser account. Grant it in Business Center first. |
| Authorization fails straight after Confirm | `TIKTOK_REDIRECT_URI` does not match the portal value. Check the trailing slash. |
| A client is missing from `accounts` | The approving login cannot reach it. Fix the role in Business Center, then redo steps 3 to 5. |
| `STATUS_SELF_SERVICE_UNAUDITED` on an account | That account was never fully verified with TikTok. Reporting on it may return nothing. |
| Report returns rows but every metric is zero | The date range predates the campaign, or the account genuinely did not run. Widen the range to confirm. |
| `TIKTOK_APP_ID is not set` | `.env` is missing the TikTok block. Redo step 2. |
| `TIKTOK_ACCESS_TOKEN is not set` straight after a successful `--save` | `.env` holds two token lines and the first is empty. `tt` reads the first match. Delete the empty line. Versions of `tt` from 2026-10-08 onward replace the line instead of appending, so this only bites an older copy. |
| Every machine stopped working at once | Someone clicked **Reset** on the Secret. Put the new Secret in each machine's `.env`, then redo steps 3 to 5 on each one. |
