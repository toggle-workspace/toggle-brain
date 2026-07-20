#!/usr/bin/env bash
# One-time setup for the local whimsical illustration generator (Apple Silicon).
# Idempotent: safe to re-run. Creates an isolated venv and installs mflux.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV="$HERE/.venv"

# Prefer a real 3.10+ interpreter; macOS system python is 3.9 and too old for mflux.
PYBIN=""
for cand in python3.12 python3.11 python3.10 \
            /opt/homebrew/opt/python@3.12/bin/python3.12 \
            /opt/homebrew/opt/python@3.11/bin/python3.11; do
  if command -v "$cand" >/dev/null 2>&1; then PYBIN="$(command -v "$cand")"; break; fi
  [ -x "$cand" ] && { PYBIN="$cand"; break; }
done
if [ -z "$PYBIN" ]; then
  echo "No Python 3.10+ found. Install one first:  brew install python@3.12" >&2
  exit 1
fi
echo "[setup] using interpreter: $PYBIN ($("$PYBIN" --version))"

if [ ! -d "$VENV" ]; then
  echo "[setup] creating venv at $VENV"
  "$PYBIN" -m venv "$VENV"
fi

echo "[setup] installing mflux (this pulls PyTorch/MLX wheels, a few hundred MB)"
"$VENV/bin/python" -m pip install --upgrade pip >/dev/null
"$VENV/bin/python" -m pip install mflux

echo
echo "[setup] done. Generate with:"
echo "  $VENV/bin/python $HERE/gen.py --prompt \"…\" --out out.png"
