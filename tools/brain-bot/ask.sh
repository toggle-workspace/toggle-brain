#!/bin/bash
#
# ask.sh — run a single READ-ONLY brain query through headless Claude Code.
#
# stdout = the answer text and nothing else (the listener captures it verbatim).
# This script is the ONE seam a future runtime swap (container / VPS / Anthropic
# SDK) replaces — the Telegram layer never assumes how the answer is produced.
#
# Modeled on tools/gdoc-sync/pull-gdoc.sh (headless `claude -p`, absolute paths
# for a minimal launchd environment).
#
# Env in:  BRAIN_BOT_REPO_ROOT (required), BRAIN_BOT_MODEL (optional)
# Arg in:  $1 = the user's question

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# --- environment (launchd gives almost nothing) -----------------------------
export HOME="/Users/zaidsaad"
export PATH="/Users/zaidsaad/.local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"
CLAUDE_BIN="/Users/zaidsaad/.local/bin/claude"

REPO_ROOT="${BRAIN_BOT_REPO_ROOT:?BRAIN_BOT_REPO_ROOT not set}"
MODEL="${BRAIN_BOT_MODEL:-claude-sonnet-4-6}"
QUESTION="${1:?usage: ask.sh <question>}"
SYSTEM="$(cat "$SCRIPT_DIR/prompt/system.md")"

# Run the agent with the repo as its working directory so Claude Code auto-loads
# the root CLAUDE.md router as project context.
cd "$REPO_ROOT"

# READ-ONLY BY CONSTRUCTION: only Read/Grep/Glob are permitted; Bash/Write/Edit
# and friends are explicitly denied. This tool allowlist — NOT the prompt — is
# the safety boundary for the MVP. (The full jail: a containerized clean
# `git archive main` checkout with no $HOME and no .git — lands in a later phase.)
exec "$CLAUDE_BIN" -p "$QUESTION" \
  --append-system-prompt "$SYSTEM" \
  --model "$MODEL" \
  --allowedTools "Read" "Grep" "Glob" \
  --disallowedTools "Bash" "Write" "Edit" "NotebookEdit" "WebFetch" "WebSearch" "Task" \
  < /dev/null
