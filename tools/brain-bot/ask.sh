#!/bin/bash
#
# ask.sh — run a single READ-ONLY brain query through headless Claude Code.
#
# stdout = the answer text and nothing else (the listener captures it verbatim).
# This script is the ONE seam a future runtime swap (container / VPS / Anthropic
# SDK) replaces — the Telegram layer never assumes how the answer is produced.
#
# The JAIL (two layers, both enforced here):
#   1. cwd is the CLEAN CHECKOUT (committed origin/main only — no .git, no WIP),
#      built by refresh-checkout.sh.
#   2. A PreToolUse hook (hooks/path-guard.py) hard-denies any Read/Grep/Glob
#      that resolves outside that checkout (blocks ~/.ssh, ~/.claude, .. escapes).
# Plus: only Read/Grep/Glob are allowed; Bash/Write/Edit are denied.
#
# Env in:  BRAIN_BOT_CHECKOUT_DIR (required), BRAIN_BOT_MODEL (optional)
# Arg in:  $1 = the user's question

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# --- environment (launchd gives almost nothing) -----------------------------
export HOME="/Users/zaidsaad"
export PATH="/Users/zaidsaad/.local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
CLAUDE_BIN="/Users/zaidsaad/.local/bin/claude"

CHECKOUT_DIR="${BRAIN_BOT_CHECKOUT_DIR:?BRAIN_BOT_CHECKOUT_DIR not set (run refresh-checkout.sh)}"
MODEL="${BRAIN_BOT_MODEL:-claude-sonnet-4-6}"
QUESTION="${1:?usage: ask.sh <question>}"
SYSTEM="$(cat "$SCRIPT_DIR/prompt/system.md")"
HOOK="$SCRIPT_DIR/hooks/path-guard.py"

if [[ ! -d "$CHECKOUT_DIR" ]]; then
  echo "ask.sh: view $CHECKOUT_DIR missing — build it with build-view.sh first." >&2
  exit 1
fi

# Register the path-guard hook via a generated settings file (gitignored — it
# carries this machine's absolute hook path).
SETTINGS="$SCRIPT_DIR/.settings.gen.json"
cat > "$SETTINGS" <<JSON
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Read|Grep|Glob",
        "hooks": [ { "type": "command", "command": "/usr/bin/python3 \"$HOOK\"" } ]
      }
    ]
  }
}
JSON

# Run with the clean checkout as cwd so Claude Code auto-loads its CLAUDE.md
# router as project context.
cd "$CHECKOUT_DIR"

# --strict-mcp-config: ignore the VIEW's committed .mcp.json (the archive of main
# ships one). Without it, every query would spin up the repo's MCP servers inside
# the jail. We pass no --mcp-config, so strict mode means zero MCP servers — the
# jail rests on our hook + tool allowlist, not on whatever config the repo ships.
exec "$CLAUDE_BIN" -p "$QUESTION" \
  --append-system-prompt "$SYSTEM" \
  --model "$MODEL" \
  --allowedTools "Read" "Grep" "Glob" \
  --disallowedTools "Bash" "Write" "Edit" "NotebookEdit" "WebFetch" "WebSearch" "Task" \
  --strict-mcp-config \
  --settings "$SETTINGS" \
  < /dev/null
