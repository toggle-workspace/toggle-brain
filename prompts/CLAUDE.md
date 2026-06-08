# `prompts/` — reusable prompt library

A library, not a set of entry points. Generators (`generators/`) pull from here.

---

## The rules of this zone

1. **No entry points.** Slash-commands live in `generators/`. This folder is *content the generators reference*.
2. **@-reference `brain/voice/` and `brain/positioning/`; never inline them.** A prompt that hardcodes voice rules will drift when the voice updates.
3. **Style-packs bundle voice + visual; reference them, don't duplicate them.** Toggle default lives in `style-packs/toggle-default.md`. Client overrides live in `clients/<slug>/style-pack.md`.
4. **Winning prompts get promoted to `canonical/`** with attribution (which client, which campaign, what metric it moved). Promotion is a curation act, not automatic.

---

## What's in here

| Folder | Holds |
|---|---|
| `copy/hooks/`, `copy/bodies/`, `copy/ctas/` | Reusable copy snippets, by component type |
| `platforms/tiktok.md`, `meta.md`, `linkedin.md`, `youtube-shorts.md` | Platform-specific prompt scaffolds (format rules, hooks, CTA patterns) |
| `image/midjourney.md`, `flux.md`, `nano-banana.md`, `sora-image.md` | Tool-specific image prompt patterns (`--sref`, `--ar`, `--style raw`, etc.) |
| `video/runway.md`, `sora.md`, `veo.md` | Tool-specific video prompt patterns (shot grammar, motion, duration) |
| `style-packs/toggle-default.md` | Toggle's default voice + visual bundle |
| `style-packs/_template.md` | Skeleton for client overrides |
| `canonical/` | Promoted winners — proven in market, with attribution |

---

## When to put a prompt here vs. in a client folder

- **Here** if it could be reused across clients (TikTok hook patterns, Midjourney style refs, CTA structures).
- **In `clients/<slug>/02-creative/`** if it's specific to one client's brand and won't reuse.

When a client-specific prompt clearly generalises, move it here and reference it.
