#!/usr/bin/env python3
"""
Whimsical Article Illustrations — local image generator (Apple Silicon / MLX).

Backs the `whimsical-article-illustrations` skill's Claude Code runtime. Turns a
ready-to-paste generation prompt into a PNG on disk using FLUX.1 running locally
through mflux (Apple's MLX). No API key, no per-image cost, fully offline after
the one-time model download.

The skill flow is: write prompt -> run this -> Read the PNG back -> QA against
references/qa-checklist.md -> iterate. This script is only the "make the pixels"
step; the judgment stays in the skill.

Usage
-----
  python gen.py --prompt "…" --out path/to/image.png
  python gen.py --prompt "…" --out out.png --ref previous.png --strength 0.6
  python gen.py --prompt "…" --out out.png --model dev --steps 20 --seed 42

Models (--model, passed straight to mflux ModelConfig.from_name)
------
  schnell  (default) FLUX.1-schnell, Apache-2.0, ungated, 2-4 steps, fast.
  dev                 FLUX.1-dev, gated (needs a Hugging Face token + license),
                      better text rendering, 20-50 steps, slower.
  Other mflux names work too (e.g. qwen_image for stronger text), but may be
  larger than 16 GB RAM comfortably holds — treat as experimental.

Passing --ref switches to img2img: the reference image is the starting point and
--strength controls how far the model moves away from it (low = keep the
reference, high = ignore it). This is the local stand-in for a true edit loop.
"""

import argparse
import sys
import time
from pathlib import Path


# 16:9 sizes that are multiples of 16 (FLUX operates on multiples of 16).
RESOLUTIONS = {
    "16:9": (1344, 768),
    "1:1": (1024, 1024),
    "9:16": (768, 1344),
    "4:3": (1152, 896),
}

# Sensible step defaults per family; schnell is a few-step distilled model.
DEFAULT_STEPS = {"schnell": 4, "dev": 20}

# black-forest-labs gates FLUX repos on Hugging Face (a free-but-required license
# acknowledgement + token), even for Apache-2.0 schnell. To keep this tool truly
# key-free, the default schnell entry points at an UNGATED community mirror that
# ships mflux-format 4-bit weights (no token, no license wall). The official
# entries need `huggingface-cli login` first — see README. `repo` is the HF id,
# `base` is the architecture mflux should assume, `quantize` is None when the
# repo is already quantized.
MODELS = {
    # default: no token needed
    "schnell": {"repo": "dhairyashil/FLUX.1-schnell-mflux-4bit", "base": "schnell", "quantize": None},
    # official BFL repos: need a HF token + accepted license
    "schnell-official": {"repo": "black-forest-labs/FLUX.1-schnell", "base": "schnell", "quantize": 4},
    "dev": {"repo": "black-forest-labs/FLUX.1-dev", "base": "dev", "quantize": 4},
}


def parse_args(argv=None):
    p = argparse.ArgumentParser(
        description="Generate a whimsical hand-drawn illustration locally via FLUX/mflux.",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    p.add_argument("--prompt", required=True, help="Generation prompt (see references/prompt-template.md).")
    p.add_argument("--out", required=True, help="Output PNG path. Parent dirs are created.")
    p.add_argument("--model", default="schnell", choices=list(MODELS),
                   help="schnell (ungated mirror, no token) | schnell-official | dev (both need a HF token).")
    p.add_argument("--repo", help="Override the HF repo id (advanced; e.g. another mflux-format mirror).")
    p.add_argument("--base-model", dest="base_model", choices=["schnell", "dev"],
                   help="Architecture for a custom --repo. Defaults to the --model's base.")
    p.add_argument("--ratio", choices=list(RESOLUTIONS), default="16:9", help="Aspect ratio.")
    p.add_argument("--width", type=int, help="Override width (px, multiple of 16).")
    p.add_argument("--height", type=int, help="Override height (px, multiple of 16).")
    p.add_argument("--steps", type=int, help="Inference steps. Defaults: schnell=4, dev=20.")
    p.add_argument("--seed", type=int, help="Seed for reproducibility. Omit for a time-based random seed.")
    p.add_argument("--guidance", type=float, default=3.5, help="Guidance scale (dev honors it; schnell ignores).")
    p.add_argument("--quantize", type=int, choices=[4, 8],
                   help="Weight quantization bits. Default: None for pre-quantized mirrors, 4 for official repos.")
    p.add_argument("--negative", default="commercial illustration, childish cartoon, PowerPoint, "
                   "photo, 3d render, top-left title text, watermark, frame, border",
                   help="Negative prompt (steers away from the house-style bans).")
    p.add_argument("--ref", help="Reference image for img2img refinement (local edit stand-in).")
    p.add_argument("--strength", type=float, default=0.6,
                   help="img2img strength with --ref: low keeps the reference, high strays from it.")
    return p.parse_args(argv)


def main(argv=None):
    args = parse_args(argv)

    try:
        from mflux.models.common.config.model_config import ModelConfig
        from mflux.models.flux.variants.txt2img.flux import Flux1
    except ImportError:
        sys.exit(
            "mflux is not installed in this interpreter.\n"
            "Run tools/whimsical-imagegen/setup.sh first, then invoke gen.py with\n"
            "the venv python it prints (…/.venv/bin/python)."
        )

    spec = MODELS[args.model]
    repo = args.repo or spec["repo"]
    base_model = args.base_model or spec["base"]
    quantize = args.quantize if args.quantize is not None else spec["quantize"]

    if bool(args.width) ^ bool(args.height):
        sys.exit("Pass both --width and --height, or neither (use --ratio).")
    if args.width and args.height:
        width, height = args.width, args.height
    else:
        width, height = RESOLUTIONS[args.ratio]
    if width % 16 or height % 16:
        sys.exit(f"width/height must be multiples of 16 (got {width}x{height}).")

    steps = args.steps or DEFAULT_STEPS.get(base_model, 20)
    seed = args.seed if args.seed is not None else int(time.time())

    out = Path(args.out).expanduser()
    out.parent.mkdir(parents=True, exist_ok=True)

    ref_path = None
    if args.ref:
        ref_path = Path(args.ref).expanduser()
        if not ref_path.exists():
            sys.exit(f"--ref image not found: {ref_path}")

    print(
        f"[gen] repo={repo} base={base_model} quantize={quantize} {width}x{height} "
        f"steps={steps} seed={seed} "
        + (f"img2img(ref={ref_path.name}, strength={args.strength})" if ref_path else "text2img"),
        file=sys.stderr,
    )
    print("[gen] first run for a repo downloads weights (a few GB); later runs are offline.", file=sys.stderr)

    try:
        model_config = ModelConfig.from_name(model_name=repo, base_model=base_model)
        flux = Flux1(model_config=model_config, quantize=quantize)

        gen_kwargs = dict(
            seed=seed,
            prompt=args.prompt,
            num_inference_steps=steps,
            height=height,
            width=width,
            guidance=args.guidance,
            negative_prompt=args.negative or None,
        )
        if ref_path is not None:
            gen_kwargs["image_path"] = str(ref_path)
            gen_kwargs["image_strength"] = args.strength

        image = flux.generate_image(**gen_kwargs)
    except Exception as e:
        if "GatedRepo" in type(e).__name__ or "401" in str(e) or "gated" in str(e).lower():
            sys.exit(
                f"\n[gen] '{repo}' is gated on Hugging Face.\n"
                "Either use the default ungated mirror (drop --model / --repo),\n"
                "or authenticate for the official repo: accept its license on the HF\n"
                "model page, then run  huggingface-cli login  (or export HF_TOKEN=…).\n"
                "See tools/whimsical-imagegen/README.md."
            )
        raise

    image.save(path=str(out), overwrite=True)

    print(f"[gen] saved {out} (seed={seed})", file=sys.stderr)
    print(str(out))  # stdout = final path, for scripting


if __name__ == "__main__":
    main()
