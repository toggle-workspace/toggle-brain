#!/bin/bash
#
# lint-map.sh — flag repo paths referenced in MAP.md / CLAUDE.md / README.md
# that no longer exist. The bot's navigation leans on these indexes; as the repo
# grows they drift, and a dangling reference sends the agent looking for files
# that aren't there. Run this manually or in CI. Exit non-zero if anything broke.
#
# Usage: lint-map.sh [repo-root]   (defaults to the repo this script lives in)

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="${1:-$(cd "$SCRIPT_DIR/../.." && pwd)}"
cd "$REPO"

ZONES="brain|clients|generators|prompts|templates|playbooks|Sales|cockpit|installations|archive|tools|assets"
checked=0
missing=0

for doc in MAP.md CLAUDE.md README.md; do
  [ -f "$doc" ] || continue
  while IFS= read -r p; do
    p="${p%/}"                          # strip trailing slash
    [ -z "$p" ] && continue
    # ignore relative-escape tokens and documented placeholders (YYYY-MM-DD,
    # <slug>, <name>, etc. — these are templates in the index, not real paths)
    case "$p" in
      *..*|*YYYY*|*MM-DD*|*"<"*|*">"*) continue ;;
    esac
    checked=$((checked + 1))
    if [ ! -e "$p" ]; then
      echo "BROKEN  $doc -> $p"
      missing=$((missing + 1))
    fi
  done < <(grep -oE "\`($ZONES)/[A-Za-z0-9_./-]+\`" "$doc" | tr -d '`' | sort -u)
done

echo "lint-map: checked $checked path references, $missing broken"
[ "$missing" -eq 0 ]
