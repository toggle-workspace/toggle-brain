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

# Run headless. bypassPermissions so no interactive prompt blocks the cron run.
"$CLAUDE_BIN" -p "$PROMPT" \
  --allowedTools "mcp__claude_ai_Google_Drive__read_file_content" "Bash" "Read" "Write" \
  --permission-mode bypassPermissions \
  < /dev/null \
  >> "$LOG_DIR/sync.log" 2>&1

RC=$?
END="$(date '+%Y-%m-%d %H:%M:%S %z')"
if [[ $RC -eq 0 && -s "$DEST" ]]; then
  echo "[$END] pull-gdoc OK  bytes=$(wc -c < "$DEST" | tr -d ' ')" >> "$LOG_DIR/sync.log"
else
  echo "[$END] pull-gdoc FAILED rc=$RC (dest empty or claude error)" >> "$LOG_DIR/sync.log"
  exit 1
fi
