# Veo prompt patterns

Tool-specific patterns for Google Veo (Veo 2 / Veo 3 lineage). Strongest at native audio (Veo 3+) and realistic physics.

---

## Prompt grammar

Scene description + camera direction + audio direction (Veo 3+).

`<scene>. <camera>. <audio>. <duration>.`

---

## Strengths to lean on

- **Native audio (Veo 3+)** — generates synchronised audio including dialogue, ambient sound, and music cues. You prompt the audio in-line.
- **Physics realism** — water, fabric, gravity, collision.
- **Long-take stability** — 8s+ shots without drift.

---

## Structure

1. **Scene** — who, what, where, when.
2. **Camera** — shot type, move, lens.
3. **Audio** — dialogue, ambient, foley, music (Veo 3+).
4. **Duration + aspect** — set via platform.

---

## Example prompts

```
Scene: A street vendor in Kuala Lumpur stirs a wok of char kway teow over a high flame, late evening, neon signs reflecting off the wet pavement.
Camera: Medium close-up, handheld, slight push-in over 6 seconds.
Audio: The sizzle of the wok, distant motorbike traffic, the vendor calling out an order in Bahasa Malaysia.
Duration: 8 seconds.
```

```
Scene: Two friends sitting on a Penang beach at sunset.
Camera: Wide static shot, anchored on a tripod, 35mm lens.
Audio: Waves breaking gently, one friend says "We finally made it." The other laughs.
Duration: 6 seconds.
```

---

## Audio direction (Veo 3+)

- **Dialogue:** put the line in quotes; name the speaker if multiple.
- **Ambient:** describe the soundscape ("rain on a tin roof", "office hum", "café murmur").
- **Foley:** specific actions ("the sound of glass clinking", "footsteps on gravel").
- **Music:** describe genre + mood, not a specific song.

---

## What works

- Audio + scene + camera together — Veo benefits from all three.
- Realistic physics scenarios.
- Specific cultural detail (food, signage, language).

---

## What doesn't

- Asking for a specific copyrighted song.
- Long dialogue exchanges (keep to 1–2 lines per shot).
- Conflicting audio cues (silence + busy ambient).
