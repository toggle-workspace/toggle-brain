# Flux prompt patterns

Tool-specific patterns for Black Forest Labs' Flux models (Pro / Dev / Schnell). Flux handles longer, more literal prompts than Midjourney and is stronger at typography.

---

## Prompt grammar

Natural-language description, comma-separated clauses. Flux follows instructions more literally than MJ — be precise.

`<subject>, <action>, <environment>, <lighting>, <camera + composition>, <style + medium>, <quality modifiers>`

---

## Strengths to lean on

- **Typography** — Flux renders legible text far better than MJ. Use it for posters, billboards, signage.
- **Hands and anatomy** — historically more accurate than MJ.
- **Literal compositions** — "person standing on the LEFT, dog on the RIGHT" is respected.

---

## Structure (in order)

1. **Subject + action** — who is doing what.
2. **Environment** — where, when, weather.
3. **Lighting** — directional, named (rim light / Rembrandt / split / butterfly).
4. **Camera + composition** — lens, angle, framing.
5. **Style + medium** — photography / illustration / 3D render / film stock.
6. **Quality modifiers** — sharp focus, high detail, 8k, etc. (use sparingly).

---

## Example lines

- `A close-up portrait of a Singaporean barista pulling an espresso shot, steam rising from the cup, warm afternoon light through a café window, 85mm lens, shallow depth of field, documentary photography, sharp focus`
- `A bold typographic poster with the text "OPEN LATE" in chunky sans-serif against a deep red background, slight grain, 1970s print aesthetic, centered composition`

---

## Aspect ratios

Pass via the platform (Replicate / Fal / ComfyUI). Common: 1:1, 4:5, 9:16, 16:9, 3:2.

---

## What works

- Literal spatial direction ("foreground", "background", "left of frame").
- Named lighting setups.
- Asking for legible text directly inside the prompt.
- Long prompts (Flux respects them; MJ truncates them).

---

## What doesn't

- Over-stacked "quality" modifiers ("masterpiece, 8k, ultra-detailed, award-winning") — diminishing returns.
- Generic emotional adjectives ("beautiful", "amazing") without sensory anchors.
