# `assets/` — shared, non-client binaries

Logos, fonts, deck masters, reference images for `--sref`/`--cref` anchoring.

## What goes here

| Folder | For |
|---|---|
| `logos/` | Toggle logo + partner/vendor logos used across decks |
| `fonts/` | Brand fonts (license-permitting) |
| `reference-images/` | Style references for image generation tools (Midjourney `--sref`, Flux refs, etc.) |
| `deck-masters/` | Pitch deck master templates (Keynote, Figma exports, PDF references) |

## What does NOT go here

- Client-specific assets → `clients/<slug>/assets/` (and only small previews; master files in Drive).
- Anything over ~5 MB. Use Drive and link to it from the relevant brief.

## `.gitignore` policy

Heavy binaries (`.psd`, `.ai`, `.indd`, `.aep`, `.prproj`, `.fig`, large `.mov`/`.mp4`, `.zip`) under `clients/<x>/assets/` are gitignored. See root `.gitignore`.
