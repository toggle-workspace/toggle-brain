# Nano Banana prompt patterns

Tool-specific patterns for Google's Nano Banana (Gemini-native image generation / edit model). Strongest at conversational edits and multi-image composition.

---

## Prompt grammar

Conversational. Nano Banana is instruction-tuned — write as you'd direct a designer.

`<what to show / edit>. <constraints>. <style notes>.`

---

## Strengths to lean on

- **Multi-image input** — supply 2+ reference images and ask it to combine elements ("put the subject from image 1 in the setting from image 2").
- **Conversational edits** — "remove the watermark", "change the shirt to navy", "extend the background".
- **Identity preservation** — keeps a referenced person/product recognisable across edits.
- **In-image text** — handles text reasonably well; check spelling on every render.

---

## Structure

1. **Action verb** — generate / edit / extend / combine / restyle.
2. **Subject** — what or who.
3. **Setting** — where.
4. **Constraints** — what must stay the same (identity, brand colours, composition).
5. **Style notes** — photographic / illustrated / specific reference.

---

## Example lines

- `Generate a product hero shot of [product name] on a warm wood surface, soft window light from the left, shallow depth of field, photographed for a lifestyle catalogue.`
- `Take the person in image 1 and place them in the office setting from image 2. Keep their face, hair, and clothing identical. Match the lighting in image 2.`
- `Edit this image: remove the sticker on the bottle, keep everything else identical.`

---

## What works

- Reference images. Nano Banana is multimodal-native; give it visual anchors.
- Explicit "keep / change" instructions.
- Brand colour callouts by name + hex.

---

## What doesn't

- Over-long flowery prose.
- Asking for fine typographic detail (use Flux or downstream type tool).
- Implicit edits ("make it better") — be specific.
