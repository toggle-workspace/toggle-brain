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

# caffeinate lives HERE, not in the plist. When the plist made launchd exec
# /usr/bin/caffeinate, which then exec'd this script, macOS denied the read with
# "Operation not permitted" and KeepAlive crash-looped it: TCC is decided by the
# responsible process, and caffeinate carries no grant for ~/Desktop while
# launchd-exec'd /bin/bash does. Keeping bash as the program fixes it, and -dis
# still holds the Mac awake for the lifetime of the listener.
exec /usr/bin/caffeinate -dis /opt/homebrew/bin/node "$SCRIPT_DIR/listener.js"
