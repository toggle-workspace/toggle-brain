# Runway prompt patterns

Tool-specific patterns for Runway (Gen-3 / Gen-4 lineage). Strongest at image-to-video animation and controllable camera moves.

---

## Prompt grammar

Shot grammar. Runway thinks one shot at a time. Describe the camera move and the subject motion separately.

`<camera move>. <subject motion>. <environment + lighting>. <duration + aspect>.`

---

## Camera moves (the language Runway respects)

- **Static** — locked-off, no move.
- **Push in / pull out** — dolly toward or away from subject.
- **Pan left / right** — horizontal rotation on tripod.
- **Tilt up / down** — vertical rotation on tripod.
- **Truck left / right** — lateral dolly.
- **Pedestal up / down** — vertical translation.
- **Crane / boom** — combined vertical + tilt.
- **Handheld** — slight organic motion, no specific direction.
- **Orbit** — circle around subject.

---

## Subject motion

Describe the subject's action explicitly. Runway separates camera from subject; conflate them and it gets confused.

Examples:
- `Subject motion: woman turns her head from frame left to camera, slight smile, hair catches the light.`
- `Subject motion: liquid pours from bottle into glass, steady stream, ice cubes shift.`

---

## Duration + aspect

- Default: 5s or 10s clips.
- Aspect: 16:9, 9:16, 1:1 (set in the platform UI).
- For longer narratives: chain multiple 5s shots; don't try to prompt for 30s in one go.

---

## Example prompts

- `Camera move: slow push in over 5 seconds. Subject motion: woman looks up from her laptop and meets the camera. Environment: warm-lit café, late afternoon, bokeh background. Aspect: 9:16.`
- `Camera move: locked-off static. Subject motion: steam rises from a coffee cup in slow continuous wisps. Environment: dark wood table, single soft overhead light. Aspect: 1:1.`

---

## What works

- Image-to-video with a strong start frame.
- Single, named camera move per shot.
- Slow moves (2–3s push-in over 5s) — feel cinematic.

---

## What doesn't

- Multiple camera moves in one shot.
- Fast cuts inside a single generation (cut in edit, not in the prompt).
- Asking for dialogue or lip-sync without an explicit audio model.
