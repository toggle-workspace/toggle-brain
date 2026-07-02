#!/bin/bash
#
# build-view.sh — build one ACL-scoped read view for the bot.
#
# A "view" is a clean checkout (git archive of origin/main — committed only, no
# .git, no WIP) containing ALL shared zones plus ONLY the client folders this
# view is allowed to see. Non-allowed clients physically DO NOT EXIST in the
# view, so the ACL holds even against a broad Glob/enumeration — you cannot list
# or read a file that isn't there. The path-guard hook then fences reads to the
# view root, so other views and the rest of the disk are unreachable too.
#
# Atomic via a symlink swap (a query mid-read keeps its now-unlinked dir inode).
#
# Env in:
#   BRAIN_BOT_REPO_ROOT     (required) the live repo to archive from
#   BRAIN_BOT_VIEW_DIR      (required) the symlink path for this view
#   BRAIN_BOT_REF           (optional) default origin/main
#   BRAIN_BOT_VIEW_CLIENTS  (optional) "all" | "" (shared only) | "slug1,slug2"

set -euo pipefail
export PATH="/Users/zaidsaad/.local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

REPO_ROOT="${BRAIN_BOT_REPO_ROOT:?BRAIN_BOT_REPO_ROOT not set}"
LINK="${BRAIN_BOT_VIEW_DIR:?BRAIN_BOT_VIEW_DIR not set}"
REF="${BRAIN_BOT_REF:-origin/main}"
CLIENTS="${BRAIN_BOT_VIEW_CLIENTS-}"
# Top-level zones that carry cross-client confidential data (MRR, named quotes,
# pipeline, daily decisions). They are NOT "shared" — they're dropped from every
# non-"all" view, so a client-scoped or shared-only user can't read another
# client's numbers out of Sales/ or archive/quotes/. Only the "all" view has them.
EXCLUDE="${BRAIN_BOT_EXCLUDE_ZONES-}"
is_excluded() { case ",$EXCLUDE," in *",$1,"*) return 0 ;; esac; return 1; }

# Latest shared brain (non-fatal if offline).
git -C "$REPO_ROOT" fetch --quiet origin main || echo "build-view: fetch failed (offline?), using local $REF"

BASE_DIR="$(dirname "$LINK")"
mkdir -p "$BASE_DIR"
NEW="$BASE_DIR/$(basename "$LINK").$$"
rm -rf "$NEW"
mkdir -p "$NEW"

if [ "$CLIENTS" = "all" ]; then
  # Whole tree — admins / unrestricted users.
  git -C "$REPO_ROOT" archive --format=tar "$REF" | tar -x -C "$NEW"
else
  # Shared zones = every top-level entry EXCEPT clients/ and the admin-only zones.
  PATHSPECS=()
  while IFS= read -r name; do
    [ -z "$name" ] && continue
    [ "$name" = "clients" ] && continue
    if is_excluded "$name"; then
      echo "build-view: zone '$name' is admin-only — excluded from this scoped view"
      continue
    fi
    PATHSPECS+=("$name")
  done < <(git -C "$REPO_ROOT" ls-tree --name-only "$REF")

  # Add only the allowed client folders that actually exist (a typo in the
  # allowlist must not break the whole view).
  if [ -n "$CLIENTS" ]; then
    IFS=',' read -ra SLUGS <<< "$CLIENTS"
    for s in "${SLUGS[@]}"; do
      s="$(echo "$s" | tr -d '[:space:]')"
      [ -z "$s" ] && continue
      if [ -n "$(git -C "$REPO_ROOT" ls-tree -d --name-only "$REF" "clients/$s")" ]; then
        PATHSPECS+=("clients/$s")
      else
        echo "build-view: WARN allowed client 'clients/$s' not found in $REF — skipped"
      fi
    done
  fi

  git -C "$REPO_ROOT" archive --format=tar "$REF" -- "${PATHSPECS[@]}" | tar -x -C "$NEW"
fi

ln -sfn "$NEW" "$LINK"
for d in "$BASE_DIR/$(basename "$LINK")".*; do
  [ "$d" = "$NEW" ] && continue
  rm -rf "$d" 2>/dev/null || true
done

NCLIENTS=$(ls -1 "$NEW/clients" 2>/dev/null | wc -l | tr -d ' ')
echo "build-view: $LINK clients=[${CLIENTS:-shared-only}] ($(find "$NEW" -name '*.md' | wc -l | tr -d ' ') md, $NCLIENTS client dirs)"
