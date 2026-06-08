# Sora video prompt patterns

Tool-specific patterns for OpenAI Sora. Strongest at multi-shot narrative, physical realism, and coherent scene continuity.

---

## Prompt grammar

Cinematic, scene-led. Sora handles longer prompts than Runway and respects narrative structure.

`<shot description>. <subject + action>. <environment>. <lighting>. <camera + lens>. <duration cues>.`

For multi-shot sequences, list shots in order — Sora can stitch.

---

## Shot vocabulary

- **Shot types** — close-up, medium close-up, medium, medium wide, wide, extreme wide, over-the-shoulder, POV.
- **Camera moves** — static, push in, pull out, pan, tilt, truck, pedestal, dolly, orbit, handheld, Steadicam.
- **Lens** — 24mm (wide), 35mm (natural), 50mm (eye-level), 85mm (portrait), 135mm (telephoto).
- **Speed** — slow, normal, fast; ramped (slow → normal); slow-motion (120fps look).

---

## Structure (per shot)

1. **Shot type + camera move.**
2. **Subject and action.**
3. **Environment, time of day.**
4. **Lighting** — directional, named, with practicals if relevant.
5. **Lens + film notes.**
6. **Duration cue** ("the shot holds for…").

---

## Example prompt

```
A medium close-up of a barista in a Singapore café, late morning. She tamps espresso, brushes a strand of hair behind her ear, and slides the portafilter into the group head. Warm window light from camera left, cool fluorescent fill from above, mixed colour temperature. 50mm lens, shallow depth of field. The camera slowly pushes in over 6 seconds. Documentary, observational mood.
```

---

## Multi-shot stitching

```
Shot 1 (3s): Wide shot of a quiet street at dawn, lone runner enters frame from right.
Shot 2 (3s): Medium of the same runner, breath visible, cool blue light.
Shot 3 (4s): Close-up on running shoes hitting wet pavement, slow motion.
```

---

## What works

- Cinematic vocabulary. Sora is trained on it.
- Concrete sensory anchors (named lighting, named lenses).
- Multi-shot sequences when the narrative is clear.

---

## What doesn't

- Asking for legible text on screen.
- Fast hand / finger micro-motion (still a weak spot in this generation of models).
- Complex dialogue with lip-sync — handle in post.
