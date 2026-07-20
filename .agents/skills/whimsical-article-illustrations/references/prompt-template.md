# Image Generation Prompt Template

Generate each image separately. Replace the variables from the article content. Never tile multiple images into one.

> **Swap point:** the "Recurring IP character" block below is the mascot definition. To re-flavor the skill for a company, replace that block (and `references/mascot.md`) with the new character. Leave everything else intact.

```text
Generate one standalone 16:9 horizontal English article illustration.

Visual DNA:
Pure white background. Minimalist black hand-drawn line art. Slightly wobbly pen lines. Lots of empty white space. Sparse red/orange/blue handwritten English annotations. Clean absurd product-sketch feeling. No gradients, no shadows, no paper texture, no complex background, no commercial vector style, no PPT infographic look, no cute mascot poster, no children's illustration, no realistic UI.

Recurring IP character required:
Inky, a small solid-black absurd creature with white dot eyes, tiny thin legs, blank serious expression, and a slightly uneven hand-drawn body. Inky must perform the core conceptual action, not decorate the scene. Keep Inky serious, deadpan, and slightly bizarre — not cute.

Theme:
{illustration subject}

Structure type:
{Workflow / System fragment / Before-after / Character state / Concept metaphor / Method layering / Map-route / Mini comic panels}

Core idea:
{the one core idea this image expresses}

Composition:
{concrete scene: where Inky is, what Inky is doing, the main objects, how information flows}

Suggested elements:
{element 1} / {element 2} / {element 3} / {element 4}

English handwritten labels:
{label 1} / {label 2} / {label 3} / {label 4} / {optional label 5}

Color use:
Black for main line art and Inky. Orange for main flow/path/arrows. Red only for key warnings/problems/results. Blue only for secondary notes or feedback/system state.

Constraints:
One image explains only one core structure. Keep the main subject around 40%-60% of the canvas. Preserve at least 35% blank white space. Use at most 5-8 short handwritten English labels. Do not write a title in the top-left corner. Do not write the structure type on the image. Do not make it a formal diagram, course slide, or dense explainer. Do not copy prior examples or reuse known case compositions unless explicitly requested; invent a fresh visual metaphor for this specific article. It should be clear but not instructional, interesting but not childish, strange but clean.
```

## Image-editing prompts

Remove a top-left title:

```text
Edit the provided image. Remove only the handwritten title "{text to delete}" and its underline from the top-left corner. Fill that area with the same clean white background, matching the surrounding blank paper. Preserve everything else exactly: characters, labels, paths, line style, composition, aspect ratio, and image quality. Do not add any new text or objects.
```

Push the whimsy:

```text
Regenerate this illustration with the same core meaning and simple layout, but make Inky more central to the conceptual action. Inky should be doing the strange work that explains the idea, not standing beside the diagram. Keep it clean, sparse, hand-drawn, and not cute.
```
