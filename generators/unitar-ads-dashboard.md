# `/unitar-ads-dashboard` — refresh the UNITAR Meta ads creative dashboard

> **Moved 2026-08-02.** The scripts described here left this repo for
> `~/Desktop/Code/toggle-unitar-ads-dashboard` (GitHub `zsaaad/toggle-unitar-ads-dashboard`,
> private). Paths below point at the new repo. The built HTML still lands in
> `clients/audaura-unitar/04-reports/meta-ads-dashboard.html` here.

Pulls the latest UNITAR Meta ads data, rebuilds the white-label creative dashboard, and
(optionally) publishes it to the client's shareable link. Designed to run daily.

## READS
- `~/Desktop/Code/toggle-unitar-ads-dashboard/build_ads_dashboard.py` — the renderer (never edit output HTML by hand)
- `~/Desktop/Code/toggle-unitar-ads-dashboard/meta_ads_snapshot.json` — the data the renderer consumes
- Meta Ads account **1034316391892752** ("UNITAR (MYR) - Audaura", currency MYR)

## WRITES
- `~/Desktop/Code/toggle-unitar-ads-dashboard/meta_ads_snapshot.json` (fresh pull)
- `~/Desktop/Code/toggle-unitar-ads-dashboard/creatives/<ad_id>.jpg` (downloaded thumbnails, white-label safe)
- `clients/audaura-unitar/04-reports/meta-ads-dashboard.html` (the deliverable)

## Binding rules
- **White-label** (`[[unitar-white-label-rule]]`): no Toggle or Madcrack anywhere. The renderer already omits all Toggle branding; keep it that way.
- **Writing standards**: no em dash, full sentences. The renderer's copy obeys this.

## Pipeline (4 steps)

### 1. Pull the data
Query the account for the wanted window (default `last_30d`):
- **Account totals** — `ads_get_ad_entities` level=account: spend, impressions, clicks, ctr, cpc, cpm, reach, frequency, lead, cost_per_lead.
- **Daily trend** — same call with `time_increment: 1`: spend, lead per day.
- **Every ad** — level=ad, sorted `spend_descending`, limit 100+: id, name, effective_status, status, spend, impressions, clicks, ctr, lead, cost_per_lead. `effective_status` is what drives Active vs Paused vs Campaign-paused.
- **Creatives (copy + image)** — `ads_get_creatives` with fields id, name, body, title, image_url, thumbnail_url, then `ads_get_creative_ads` (or match on ad→creative) to attach copy and image to each ad. If this endpoint errors (it has been flaky), the dashboard still builds — cards show "creative syncing" until the next successful pull.

Write it all into `meta_ads_snapshot.json` in the shape the renderer expects (`account`, `daily`, `ads[]` with `body`/`title`/`thumbnail_url` when available).

### 2. Download thumbnails (white-label + renders offline)
For each ad with an `image_url`/`thumbnail_url`, download it to `assets/creatives/<ad_id>.jpg` and set the ad's `thumbnail_url` in the snapshot to that **local relative path**. This avoids Facebook-CDN hotlinking and keeps the file self-contained. (Optional but recommended before publishing to a host.)

### 3. Build
`python3 ~/Desktop/Code/toggle-unitar-ads-dashboard/build_ads_dashboard.py`

### 4. Publish (see hosting decision)
Copy `meta-ads-dashboard.html` (+ `assets/creatives/`) to the chosen host so the client opens one stable URL.

## The built pipeline (chosen: System User token + Google Drive file)
All three scripts live in the `toggle-unitar-ads-dashboard` repo (`~/Desktop/Code/toggle-unitar-ads-dashboard`, GitHub `zsaaad/toggle-unitar-ads-dashboard`, private), extracted from this monorepo on 2026-08-02:
- `pull_meta.py` — Graph API pull using `ACCESS_TOKEN` + `AD_ACCOUNT_ID` (stdlib only). Pulls account totals, daily trend, ad-level insights (spend + leads via the `actions` edge), and `/ads?fields=creative{body,title,thumbnail_url}` for status + copy + thumbnail in one shot (this avoids the flaky `ads_get_creatives` MCP tool). Downloads and base64-embeds thumbnails so the file is self-contained for Drive. Writes `meta_ads_snapshot.json`.
- `refresh-dashboard.sh` — orchestrator: source Meta token from `tools/meta-ads-cli/.env`, pull, build, then **deploy to Cloudflare Pages** via `wrangler pages deploy` (creds in gitignored `assets/deploy.env`: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `CF_PAGES_PROJECT`). Serves one stable URL `https://<project>.pages.dev`, updated in place daily, no downloads. launchd-safe. NOTE: Google Drive was rejected — it has no native HTML viewer, so the team would have to download the file every day (not sustainable). Cloudflare Pages renders it at a bookmarkable URL.
- `com.toggle.unitar-ads-dashboard.plist` — launchd LaunchAgent, daily 07:30, per cron-not-habit.

**Auth crux:** the MCP OAuth is interactive/session-scoped, so cron cannot use it. Unattended pulls use a **Meta System User token** (created once in Business Manager, see `tools/meta-ads-cli/README.md`), pasted into `tools/meta-ads-cli/.env` (gitignored). First real run must sanity-check the `LEAD_ACTIONS` mapping in `pull_meta.py` against the account lead total.

**Go-live (one-time):**
1. Create the System User token; put `ACCESS_TOKEN` in `tools/meta-ads-cli/.env`.
2. `set -a; source tools/meta-ads-cli/.env; set +a` then `export AD_ACCOUNT_ID=act_1034316391892752` and run `python3 ~/Desktop/Code/toggle-unitar-ads-dashboard/pull_meta.py` once; verify leads/spend match, fix `LEAD_ACTIONS` if off.
3. Put the client's Drive folder id in the plist's `UNITAR_DRIVE_FOLDER_ID`.
4. `cp` the plist to `~/Library/LaunchAgents/` and `launchctl load` it.

Interactive/manual refresh (no token needed): call the Meta Ads MCP tools directly, write the snapshot, run `build_ads_dashboard.py`.
