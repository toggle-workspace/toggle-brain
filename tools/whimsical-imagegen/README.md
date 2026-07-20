# whimsical-imagegen — local FLUX generator

Backs the `whimsical-article-illustrations` skill inside Claude Code / VS Code.
It turns a generation prompt into an actual PNG on disk using **FLUX.1 running
locally on Apple Silicon** through [mflux](https://github.com/filipstrand/mflux)
(Apple's MLX). No API key, no per-image cost, offline after the first download.

## Why this exists

Claude Code has no built-in image tool. This gives the agent one: it generates
the image, then **reads the PNG back**, checks it against the skill's QA
checklist, and iterates — the full loop, inside the editor.

## One-time setup

Needs Python 3.10+ (macOS ships 3.9, too old):

```bash
brew install python@3.12          # if you don't have 3.10+ already
tools/whimsical-imagegen/setup.sh # creates .venv, installs mflux
```

The first `gen.py` run downloads the model (a few GB, cached under
`~/.cache/huggingface`). Later runs are fully offline. **No API key or login is
needed for the default model** — see the note below on why.

### Why no Hugging Face token is needed (and when you'd want one)

black-forest-labs now gates every official FLUX repo behind a free-but-required
license click + HF token — even Apache-2.0 `schnell` returns `401 GatedRepoError`
on a fresh machine. To keep this tool genuinely key-free, the **default `schnell`
model points at an ungated community mirror** (`dhairyashil/FLUX.1-schnell-mflux-4bit`)
that ships the same weights in mflux 4-bit format. It's a third-party re-upload —
fine for illustration work, but if you'd rather pull the **official** weights:

```bash
huggingface-cli login          # paste a token from huggingface.co/settings/tokens
# then accept the license on the model's HF page, and use:
gen.py --model schnell-official …     # or --model dev
```

## Generate

```bash
VENV=tools/whimsical-imagegen/.venv/bin/python

# first-shot, 16:9 (default)
$VENV tools/whimsical-imagegen/gen.py \
  --prompt "pure white background, hand-drawn line art, a small deadpan mascot …" \
  --out /path/to/scratchpad/shot-01.png

# refine an existing image (local edit stand-in, via img2img)
$VENV tools/whimsical-imagegen/gen.py \
  --prompt "same scene, remove the title text at the top" \
  --ref shot-01.png --strength 0.55 \
  --out shot-01b.png
```

`gen.py --help` lists every flag. Key ones:

| Flag | Default | Notes |
|---|---|---|
| `--model` | `schnell` | `schnell` = ungated mirror, no token. `schnell-official` / `dev` = official BFL repos, **need a HF token + license**. |
| `--repo` | — | Advanced: point at another mflux-format HF repo directly. |
| `--ratio` | `16:9` | Also `1:1`, `9:16`, `4:3`. Or set `--width/--height` (multiples of 16). |
| `--steps` | 4 / 20 | schnell needs few; dev needs more. |
| `--seed` | random | Set it to reproduce or to hold a look while editing the prompt. |
| `--quantize` | auto | None for the pre-quantized mirror, 4 for official repos. 4-bit fits 16 GB RAM. |
| `--ref` / `--strength` | — | img2img refinement. Low strength keeps the reference, high strays. |

## Known limits (local FLUX)

- **Text in images is weak**, and schnell more so. The skill's *sparse
  handwritten labels* may render garbled. Fallbacks: regenerate with the QA
  loop, switch to `--model dev`, or composite labels afterward (PIL +
  handwriting font).
- **No true instruction edit** ("remove the title") locally — `--ref` img2img
  approximates it. A real edit loop needs FLUX.1-Kontext-dev (gated); that's a
  future add-on.
- **16 GB RAM is the floor.** schnell at 4-bit is fine; `dev` or higher
  precision will be tight — close heavy apps first.

## Where images go

Iterate in the session scratchpad. Copy only **approved finals** into
`clients/<slug>/02-creative/` per the repo convention. Generated PNGs here are
git-ignored.
