#!/bin/bash
#
# refresh-checkout.sh — rebuild the clean, committed-only checkout the bot reads.
#
# The bot must NOT read Zaid's live working tree (uncommitted WIP, half-edited
# pricing, never-meant-to-ship drafts) nor the .git history (deleted secrets).
# So it answers from a clean `git archive` export of origin/main — committed
# files only, no .git, no WIP. This is the second half of the jail (the
# path-guard hook is the first).
#
# Atomic via a symlink swap: build a fresh dir, repoint the symlink, then remove
# stale dirs. A query mid-read keeps its (now-unlinked) dir inode until it exits.
#
# Env in: BRAIN_BOT_REPO_ROOT (required), BRAIN_BOT_CHECKOUT_DIR (required, the
#         symlink path), BRAIN_BOT_REF (optional, default origin/main)

set -euo pipefail

export PATH="/Users/zaidsaad/.local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

REPO_ROOT="${BRAIN_BOT_REPO_ROOT:?BRAIN_BOT_REPO_ROOT not set}"
LINK="${BRAIN_BOT_CHECKOUT_DIR:?BRAIN_BOT_CHECKOUT_DIR not set}"
REF="${BRAIN_BOT_REF:-origin/main}"

# Pull the latest shared brain so answers reflect what the team has merged,
# not just this machine's local main. Non-fatal if offline.
git -C "$REPO_ROOT" fetch --quiet origin main || echo "refresh-checkout: fetch failed (offline?), using local $REF"

BASE_DIR="$(dirname "$LINK")"
mkdir -p "$BASE_DIR"
NEW="$BASE_DIR/checkout.$$"
rm -rf "$NEW"
mkdir -p "$NEW"

# Committed files only — archive carries no .git and no uncommitted changes.
git -C "$REPO_ROOT" archive --format=tar "$REF" | tar -x -C "$NEW"

# Atomic repoint, then sweep older builds.
ln -sfn "$NEW" "$LINK"
for d in "$BASE_DIR"/checkout.*; do
  [ "$d" = "$NEW" ] && continue
  rm -rf "$d" 2>/dev/null || true
done

echo "refresh-checkout: $LINK -> $NEW (from $REF, $(find "$NEW" -name '*.md' | wc -l | tr -d ' ') md files)"
