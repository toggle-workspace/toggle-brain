# Sora image prompt patterns

Tool-specific patterns for Sora's still-image generation. Sora's image mode shares the video model's grounding, so prompts emphasise spatial and lighting realism.

---

## Prompt grammar

Cinematic, scene-led. Sora thinks in shots more than in stills — write as if briefing a DP.

`<shot type> of <subject> <action>, <setting>, <lighting>, <lens + film notes>, <mood>.`

---

## Strengths to lean on

- **Photoreal lighting** — handles complex light setups (mixed sources, practical lights, soft / hard contrast) well.
- **Scene composition** — strong at depth, layering, foreground/midground/background.
- **Hands and bodies** — generally accurate.

---

## Structure

1. **Shot type** — close-up / medium / wide / over-the-shoulder / aerial.
2. **Subject + action** — who, doing what.
3. **Setting** — physical environment, time of day, weather.
4. **Lighting** — direction, quality (hard / soft), colour temperature, practicals.
5. **Lens + film** — 35mm, 50mm, 85mm; film stock if relevant.
6. **Mood** — quiet / intense / playful / formal.

---

## Example lines

- `Medium shot of a chef plating a dish in a busy kitchen, late evening, warm tungsten overheads mixed with cool window light from frame right, 50mm lens, shallow focus, documentary mood.`
- `Wide aerial of a beach at dawn, two surfers walking toward the water, low sun from camera right, long shadows, soft pastel sky, cinematic.`

---

## Aspect ratios

Pass via the platform. Common: 16:9, 9:16, 1:1, 4:5.

---

## What works

- Named shot types and lens lengths.
- Specific lighting language (DPs' vocabulary).
- One subject per prompt for clarity.

---

## What doesn't

- Vague style words ("epic", "stunning", "best").
- Asking for legible long text (use Flux).
- Conflicting instructions (warm + cool light without explaining the mix).
