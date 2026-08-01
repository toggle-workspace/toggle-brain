#!/bin/bash
#
# refresh-dashboard.sh — daily refresh of the UNITAR Meta ads creative dashboard.
#
# Pipeline:  pull (Graph API + System User token) -> build HTML -> upload to Google Drive.
# Designed for a bare launchd environment, so every path is absolute.
#
# Prereqs (one-time):
#   1. tools/meta-ads-cli/.env holds ACCESS_TOKEN (System User token with access to the
#      UNITAR ad account). See tools/meta-ads-cli/README.md "Authentication".
#   2. UNITAR_DRIVE_FOLDER_ID exported (the client's shared Drive folder for the file).
#
set -uo pipefail

# --- environment (launchd gives almost nothing) -----------------------------
export HOME="/Users/zaidsaad"
export PATH="/Users/zaidsaad/.local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
CLAUDE_BIN="/Users/zaidsaad/.local/bin/claude"
REPO="/Users/zaidsaad/Desktop/Code/Toggle Brain"
ASSETS="$REPO/clients/audaura-unitar/assets"
HTML="$REPO/clients/audaura-unitar/04-reports/meta-ads-dashboard.html"

LOG_DIR="$ASSETS/logs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/refresh.log"
STAMP() { date '+%Y-%m-%d %H:%M:%S %z'; }
echo "[$(STAMP)] refresh start" >> "$LOG"

# --- auth: token from shared meta-ads-cli .env, account fixed to UNITAR ------
if [[ -f "$REPO/tools/meta-ads-cli/.env" ]]; then
  set -a; source "$REPO/tools/meta-ads-cli/.env"; set +a
fi
export AD_ACCOUNT_ID="act_1034316391892752"   # UNITAR (MYR) - Audaura

if [[ -z "${ACCESS_TOKEN:-}" ]]; then
  echo "[$(STAMP)] FAIL: ACCESS_TOKEN not set (create the System User token first)" >> "$LOG"
  exit 1
fi

# Use the dedicated venv python (has Pillow, needed to downscale creative images —
# the system/homebrew python3 lacks Pillow, which once produced a 36 MB page).
PY="$ASSETS/.venv/bin/python3"
[ -x "$PY" ] || PY="$(command -v python3)"

# --- 1) pull -----------------------------------------------------------------
if ! "$PY" "$ASSETS/pull_meta.py" >> "$LOG" 2>&1; then
  echo "[$(STAMP)] FAIL: pull_meta.py" >> "$LOG"; exit 1
fi

# --- 2) build ----------------------------------------------------------------
if ! "$PY" "$ASSETS/build_ads_dashboard.py" >> "$LOG" 2>&1; then
  echo "[$(STAMP)] FAIL: build_ads_dashboard.py" >> "$LOG"; exit 1
fi

# --- 3) deploy to Cloudflare Pages (one stable URL the team + client bookmark) ---
# The dashboard is a single self-contained HTML. Cloudflare Pages serves it at
# https://<project>.pages.dev and updates in place on each deploy, so the URL never
# changes and nobody downloads anything.
#
# One-time setup: create a free Cloudflare account, then a scoped API token with the
# "Cloudflare Pages: Edit" permission, and note your Account ID. Put them in
# deploy.env (gitignored) next to this script:
#   CLOUDFLARE_API_TOKEN=...
#   CLOUDFLARE_ACCOUNT_ID=...
#   CF_PAGES_PROJECT=unitar-ads-dashboard
if [[ -f "$ASSETS/deploy.env" ]]; then
  set -a; source "$ASSETS/deploy.env"; set +a
fi
WRANGLER="$(command -v wrangler || echo /opt/homebrew/bin/wrangler)"

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" || ! -x "$WRANGLER" ]]; then
  echo "[$(STAMP)] built OK, skipped deploy (deploy.env / wrangler not ready)" >> "$LOG"
  exit 0
fi

PROJECT="${CF_PAGES_PROJECT:-unitar-ads-dashboard}"
DEPLOY_DIR="$ASSETS/.pages"
mkdir -p "$DEPLOY_DIR"
cp "$HTML" "$DEPLOY_DIR/index.html"

# ensure the project exists (idempotent; harmless error if it already does)
"$WRANGLER" pages project create "$PROJECT" --production-branch=main >> "$LOG" 2>&1 || true

if "$WRANGLER" pages deploy "$DEPLOY_DIR" --project-name="$PROJECT" --branch=main --commit-dirty=true >> "$LOG" 2>&1; then
  echo "[$(STAMP)] refresh OK (pulled, built, deployed to Cloudflare Pages: https://$PROJECT.pages.dev)" >> "$LOG"
else
  echo "[$(STAMP)] built OK but Cloudflare Pages deploy FAILED" >> "$LOG"; exit 1
fi
