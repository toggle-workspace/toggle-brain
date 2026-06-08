---
last_reviewed: 2026-06-08
owner: TBD
---

# Toggle default style-pack

Toggle's default voice + visual bundle. Used as the baseline when a client has no override `style-pack.md`. Client overrides take precedence — see `clients/<slug>/style-pack.md`.

This file references the brain; it does not duplicate it.

---

## Voice rules

See `brain/voice/toggle-house-voice.md` for the canonical voice rules. Highlights enforced here:

- Tone: dry, information-dense, no emojis, no exclamation marks.
- Sentence length: short. Cut filler.
- Channel modulation: see `brain/voice/tone-by-channel.md`.
- Never-say list: see `brain/voice/never-say.md`.
- Do-say list: see `brain/voice/do-say.md`.

Positioning anchors: see `brain/positioning/elevator-pitches.md` for the elevator pitches; reference, don't paraphrase.

---

## Visual rules

| Aspect | Value |
|---|---|
| Primary palette | TBD (hex codes) |
| Secondary palette | TBD |
| Typography (display) | TBD |
| Typography (body) | TBD |
| Logo lockup rules | TBD — see brand guidelines doc when available |
| Motion style | TBD (e.g. subtle ease-out, no bounce) |
| Photography style | TBD (e.g. natural light, real people, no stock cliché) |
| Illustration style | TBD |

> Visual rules are placeholders until Toggle's brand guidelines doc lands. Do not invent palette values when this is unfilled.

---

## Default lengths / ratios per platform

| Platform | Aspect | Typical length | Notes |
|---|---|---|---|
| TikTok | 9:16 | 15–60s | Captions burned-in |
| Instagram Reels | 9:16 | 15–60s | Captions burned-in |
| Instagram Feed | 1:1 or 4:5 | static / 30–60s | Carousel up to 10 cards |
| Instagram Story | 9:16 | 15s per frame | Sticker-friendly |
| YouTube Shorts | 9:16 | 15–60s | Captions optional |
| LinkedIn post | 1:1 | 100–250 words | Hook in first line |
| Meta Feed Ad | 1:1 or 4:5 | static / 15–30s | Primary text <125 chars where possible |
| Email | n/a | subject <50 chars | Preview <90 chars |

---

## How to use

- Generators read this file as the default.
- If a client has `clients/<slug>/style-pack.md`, that file overrides specific sections.
- Updates to voice rules go in `brain/voice/`, not here. This file points to the brain.
