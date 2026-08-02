#!/bin/bash
#
# pull-gdoc.sh — Pull the latest text of a Google Doc to a local file.
#
# Uses the headless Claude Code CLI + the claude.ai "Google Drive" MCP connector
# (the only authenticated path to private Drive docs on this machine — there is
# no rclone/gdrive/gcloud installed). The doc text is large and gets offloaded
# by the harness to a tool-results file, so the agent extracts it from there.
#
# Usage:  pull-gdoc.sh <fileId> <dest-file>
#
# Scheduled via a launchd LaunchAgent (see README.md). Designed to run in a
# minimal launchd/cron environment, so every binary path is absolute.

set -euo pipefail

FILE_ID="${1:?usage: pull-gdoc.sh <fileId> <dest-file>}"
DEST="${2:?usage: pull-gdoc.sh <fileId> <dest-file>}"

# --- environment (launchd gives almost nothing) -----------------------------
export HOME="/Users/zaidsaad"
export PATH="/Users/zaidsaad/.local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
CLAUDE_BIN="/Users/zaidsaad/.local/bin/claude"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$SCRIPT_DIR/logs"
mkdir -p "$LOG_DIR"
STAMP="$(date '+%Y-%m-%d %H:%M:%S %z')"

mkdir -p "$(dirname "$DEST")"

echo "[$STAMP] pull-gdoc start  fileId=$FILE_ID  dest=$DEST" >> "$LOG_DIR/sync.log"

PROMPT="Pull the latest content of a Google Doc and save it as Markdown. Do exactly this and nothing else:

1. Call the Google Drive tool read_file_content with fileId ${FILE_ID}.
2. The returned text is large, so the harness will save it to a tool-results .txt file and give you that path. The file is JSON with schema {fileContent: string}.
3. Use Bash to extract the fileContent field VERBATIM and write it to this exact path (overwrite it): ${DEST}
   Use a command of this form (substitute the real tool-results path):
   python3 -c \"import json; d=json.load(open('TOOL_RESULTS_PATH')); open('${DEST}','w').write(d['fileContent']); print('chars', len(d['fileContent']))\"
4. Reply with only the character count written. Do not summarize the document."

# Freshness baseline: -s alone passes on a stale file left over from a previous
# run, so remember the current mtime and require it to change.
BEFORE_MTIME="$(stat -f '%m' "$DEST" 2>/dev/null || echo 0)"

# Run headless. bypassPermissions so no interactive prompt blocks the cron run.
#
# Two guards, both learned the hard way:
#   - `|| RC=$?` instead of a bare call. Under `set -e` a non-zero exit aborted the
#     script on the spot, so the FAILED branch below was unreachable and every
#     failure since June logged nothing at all.
#   - perl alarm as a timeout. There is no coreutils `timeout` on this machine, and
#     the 2026-08-01 run sat on a stalled Drive read for ~10 minutes before dying.
TIMEOUT_SECS="${GDOC_TIMEOUT_SECS:-600}"
RC=0
/usr/bin/perl -e 'alarm shift; exec @ARGV or exit 127' "$TIMEOUT_SECS" \
  "$CLAUDE_BIN" -p "$PROMPT" \
  --allowedTools "mcp__claude_ai_Google_Drive__read_file_content" "Bash" "Read" "Write" \
  --permission-mode bypassPermissions \
  < /dev/null \
  >> "$LOG_DIR/sync.log" 2>&1 || RC=$?

END="$(date '+%Y-%m-%d %H:%M:%S %z')"
AFTER_MTIME="$(stat -f '%m' "$DEST" 2>/dev/null || echo 0)"

if [[ $RC -eq 142 ]]; then
  echo "[$END] pull-gdoc FAILED: timed out after ${TIMEOUT_SECS}s (Drive read stalled)" >> "$LOG_DIR/sync.log"
  exit 1
fi
if [[ $RC -ne 0 ]]; then
  echo "[$END] pull-gdoc FAILED rc=$RC (claude error; see output above)" >> "$LOG_DIR/sync.log"
  exit 1
fi
if [[ ! -s "$DEST" ]]; then
  echo "[$END] pull-gdoc FAILED: dest missing or empty" >> "$LOG_DIR/sync.log"
  exit 1
fi
if [[ "$AFTER_MTIME" == "$BEFORE_MTIME" ]]; then
  echo "[$END] pull-gdoc FAILED: claude exited 0 but $DEST was never rewritten (stale copy left in place)" >> "$LOG_DIR/sync.log"
  exit 1
fi
echo "[$END] pull-gdoc OK  bytes=$(wc -c < "$DEST" | tr -d ' ')" >> "$LOG_DIR/sync.log"
