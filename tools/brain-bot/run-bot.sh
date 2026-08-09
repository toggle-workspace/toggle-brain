#!/bin/bash
#
# run-bot.sh — start the brain-bot Telegram listener.
#
# Loads the bot token from a gitignored .env, then runs the long-poll listener.
# Designed to also work under launchd (absolute binary paths, minimal env).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export HOME="/Users/zaidsaad"
export PATH="/Users/zaidsaad/.local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

# Load secrets (TELEGRAM_TOKEN) from a gitignored .env if present.
if [[ -f "$SCRIPT_DIR/.env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source "$SCRIPT_DIR/.env"
  set +a
fi

if [[ -z "${TELEGRAM_TOKEN:-}" ]]; then
  echo "TELEGRAM_TOKEN not set. Create $SCRIPT_DIR/.env containing:" >&2
  echo "  TELEGRAM_TOKEN=123456:your-botfather-token" >&2
  exit 1
fi

# NO caffeinate. It used to wrap this exec with -dis, which held display, idle
# and system sleep open for as long as the bot ran — in practice, permanently.
# Zaid needs the Mac to sleep, so the listener now sleeps with it: the process
# suspends on sleep and resumes on wake, and Telegram retains undelivered
# updates for ~24h, so queued messages are answered on the next wake rather
# than lost. The trade is that the bot cannot reply while the Mac is asleep.
exec /opt/homebrew/bin/node "$SCRIPT_DIR/listener.js"
