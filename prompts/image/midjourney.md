# Midjourney prompt patterns

Tool-specific patterns for Midjourney. Update for the current model version when MJ ships a new one.

---

## Prompt grammar

`<subject> in <environment>, <lighting>, <composition>, <modifiers> <flags>`

Order matters. Subject first; flags last.

---

## Core flags

| Flag | Purpose | Example |
|---|---|---|
| `--ar W:H` | Aspect ratio | `--ar 9:16`, `--ar 1:1`, `--ar 16:9` |
| `--style raw` | Less stylised, more photographic | `--style raw` |
| `--sref <url>` | Style reference (visual DNA) | `--sref https://...` |
| `--cref <url>` | Character reference (face identity) | `--cref https://...` |
| `--cw 0–100` | Character weight (how strict the cref is) | `--cw 60` |
| `--stylize 0–1000` | Aesthetic intensity (lower = literal) | `--stylize 100` |
| `--no <x>` | Negative prompt | `--no text, logo` |
| `--seed <n>` | Reproducibility | `--seed 12345` |

---

## Structure (in order)

1. **Subject** — who or what.
2. **Environment** — where (location, time of day, weather).
3. **Lighting** — golden hour / overcast / studio softbox / neon / etc.
4. **Composition** — wide shot / close-up / over-the-shoulder / aerial / rule-of-thirds.
5. **Modifiers** — film stock (Portra 400, Kodak Gold), lens (35mm, 85mm), texture, mood.
6. **Flags** — `--ar`, `--style raw`, `--sref`, etc.

---

## Example lines

- `young Malaysian founder at a desk, late afternoon natural window light, medium close-up, shallow depth of field, Portra 400 grain, candid --ar 4:5 --style raw`
- `minimalist product shot of a matte black bottle on white seamless backdrop, soft studio light from camera left, centered composition, hyper-detailed, commercial photography --ar 1:1 --stylize 50`

---

## What works

- Specific nouns ("Kodak Portra 400") over vague adjectives ("vintage film").
- `--style raw` for anything photographic.
- `--sref` for brand consistency across a campaign.
- Negative prompts to suppress text artefacts.

---

## What doesn't

- Long flowery prose. MJ truncates and re-weights.
- Mixing too many style references (1 `--sref` is usually enough).
- Asking for legible text (use a text overlay tool downstream).
