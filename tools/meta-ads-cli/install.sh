#!/usr/bin/env bash
#
# install.sh — install Meta's official Ads CLI (`meta`) globally for the team.
#
# What this does:
#   - Ensures pipx is available (installs via Homebrew or pip --user if missing)
#   - Installs the official `meta-ads` PyPI package (published by Meta) into an
#     isolated pipx venv, exposing the `meta` command on your PATH
#   - Pins a known-good version and a compatible Python (3.13) — the wheels are
#     cp312/cp313 only, so Python 3.14 will NOT work (no wheel, no sdist)
#
# Usage:
#   tools/meta-ads-cli/install.sh           # install pinned version
#   META_ADS_VERSION=1.1.0 tools/meta-ads-cli/install.sh
#
# After install, authenticate by exporting ACCESS_TOKEN + AD_ACCOUNT_ID
# (see README.md). Never paste your token into a chat / commit it.

set -euo pipefail

# Pinned for reproducibility across the team. Bump deliberately.
META_ADS_VERSION="${META_ADS_VERSION:-1.1.0}"
PY_VERSION="3.13"   # cp313 wheel exists for macOS arm64 + linux; 3.14 does not

say()  { printf '\033[1;36m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m!! \033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31mxx \033[0m %s\n' "$*" >&2; exit 1; }

# --- 1. Ensure pipx ---------------------------------------------------------
if ! command -v pipx >/dev/null 2>&1; then
  say "pipx not found — installing it"
  if command -v brew >/dev/null 2>&1; then
    brew install pipx
  elif command -v python3 >/dev/null 2>&1; then
    python3 -m pip install --user pipx
  else
    die "Need either Homebrew or python3 to install pipx. Install one and re-run."
  fi
fi

PIPX="$(command -v pipx)"
say "Using pipx: $PIPX"

# Make sure pipx's bin dir is on PATH for future shells.
"$PIPX" ensurepath >/dev/null 2>&1 || true

# --- 2. Install / upgrade meta-ads -----------------------------------------
# pipx will download a standalone CPython $PY_VERSION if one isn't present,
# so this works even on machines whose default python is too new (3.14+).
say "Installing meta-ads==$META_ADS_VERSION (Python $PY_VERSION)"
if "$PIPX" list --short 2>/dev/null | grep -q '^meta-ads '; then
  # Already installed: reinstall in place, reusing the venv's pinned Python.
  # (--python is ignored alongside --force, so we don't pass it here.)
  "$PIPX" install --force "meta-ads==$META_ADS_VERSION"
else
  "$PIPX" install "meta-ads==$META_ADS_VERSION" \
    --python "$PY_VERSION" --fetch-python=missing
fi

# --- 3. Verify --------------------------------------------------------------
if command -v meta >/dev/null 2>&1; then
  say "Installed: $(meta --version)"
else
  warn "Installed, but 'meta' isn't on PATH in THIS shell yet."
  warn "Open a new terminal, or run:  eval \"\$(pipx environment --value PIPX_BIN_DIR >/dev/null 2>&1; echo)\""
  warn "Typically just: export PATH=\"\$HOME/.local/bin:\$PATH\""
fi

cat <<'EOF'

Next: authenticate.
  1. cp tools/meta-ads-cli/.env.example tools/meta-ads-cli/.env   (or anywhere private)
  2. Fill ACCESS_TOKEN + AD_ACCOUNT_ID  (see README.md for how to generate a token)
  3. set -a; source tools/meta-ads-cli/.env; set +a
  4. meta auth status        # should report authenticated

Docs: tools/meta-ads-cli/README.md
EOF
