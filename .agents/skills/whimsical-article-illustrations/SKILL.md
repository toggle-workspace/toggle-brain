---
name: whimsical-article-illustrations
description: Generate whimsical, hand-drawn body illustrations for English articles OR any set of ideas — articles, posts, blogs, Notion docs, workflow docs, methodologies, processes, structures, states, metaphors, arguments, or a list of rules/principles/lessons. Triggers like "whimsical illustrations", "hand-drawn article art", "body illustrations", "illustrate my rules", "illustrate these principles", "make an Inky illustration", "illustration suggestions", "shot list", "de-title / fix this image". Defaults to the Inky mascot IP, a pure-white hand-drawn look, sparse red/orange/blue handwritten labels, and a clean but wildly imaginative visual style. The mascot is swappable — see MASCOT-SWAP.md to make a company-flavored version.
---

# Whimsical Article Illustrations

## Runtime note (Claude Code)

Claude Code has **no built-in `image_gen` tool**. When invoked here, do NOT try to call `image_gen` or any rendering tool — it doesn't exist and the call will fail. Instead, deliver the shot list plus a ready-to-paste generation prompt (in the `references/prompt-template.md` format) for each image, and let the user render it in their own image tool (Codex, an image-gen MCP, etc.). Everything else in this skill — digesting the source, planning the shots, enforcing the house style, and QA/iteration guidance — works fully here. If a future host DOES expose an image tool, use it per step 3.

## Core positioning

Design and generate 16:9 horizontal body illustrations for English articles. The goal is NOT commercial illustration, slide-deck infographics, or cute cartoons. It's to turn the article's key judgment, workflow, structure, state, or metaphor into one clean, strange, creative, readable-but-not-a-manual hand-drawn explainer.

The default visual IP is the **mascot** (see `references/mascot.md`): a deadpan character who earnestly does one absurd-but-coherent job. The mascot must perform the core action of the scene — never stand beside it as decoration.

## Read these references first

Load as the task needs them — don't stuff them all into context at once:

- `references/style-dna.md` — style DNA, color, type, hard bans.
- `references/mascot.md` — the mascot IP: look, personality, action library, bans. **This is the one file you swap to re-flavor the whole skill.**
- `references/composition-patterns.md` — structure types, the original-metaphor method, and the no-cloning rule.
- `references/prompt-template.md` — single-image generation prompt template.
- `references/qa-checklist.md` — post-generation checks and iteration rules.
- `assets/examples/` — low-frequency visual calibration only. Do NOT copy their compositions, objects, or labels. (Note: legacy examples carry Chinese labels — read them for line density, white space, color restraint, and mascot attitude, not for text.)

## Workflow

### 1. Digest the article

Read the body, link, Notion page, Markdown file, or screenshot the user gives you. Extract:

- What the core argument is
- Which paragraphs carry a cognitive turn
- What's suited to explaining with a picture
- What's text-only and needs no image

Don't illustrate evenly. Prioritize **cognitive anchors**: a core judgment, two breakpoints, an input→output loop, a fork, a before/after, one-input-many-outputs, a handoff path, a common pit, a change in a character's state.

### 2. Give the illustration strategy first

If the user only says "analyze how to illustrate this / think about where images are needed," lead with a shot list. For each image, write:

- Which paragraph it follows
- The image's subject
- The core idea
- The structure type
- What the mascot is doing in it
- Suggested elements
- Suggested English labels

Default 4–8 images. Very short article: 1–3. Long article: don't casually exceed 9. Enough is enough — don't turn the body into a picture book.

### 3. Generate one at a time

If the user clearly asks to "generate / output / make the images / do it," don't stop to reconfirm; generate each image separately with the built-in `image_gen`. Never tile multiple images into one.

Each image explains only one core structure. The prompt must include:

- 16:9 horizontal English article illustration
- Pure white background
- Black hand-drawn line art
- Sparse red/orange/blue handwritten English annotations
- Lots of white space
- The mascot as the core action subject
- No PPT, no commercial illustration, no childish cuteness, no complex architecture diagram, no top-left type title

Don't reproduce past examples. Examples supply style density and how the mascot participates — never directly reuse existing compositions unless the user explicitly asks to reproduce a specific one. Reinvent a strange-but-coherent metaphor from the current article every time.

### 4. Check and iterate

After generating, run `references/qa-checklist.md`. Regenerate or edit locally if you hit:

- The mascot is only decoration
- The frame is too full
- It reads like a flowchart / PPT
- Too much text or bad typos
- A "Common Pitfalls / Flowchart / System Architecture" title appears in the top-left
- The style is too cute, childish, or stiff
- The background isn't clean white

### 5. Save and deliver

If the user is working inside a workspace, copy final images to:

```text
assets/<article-slug>-illustrations/
```

Name in order:

```text
01-topic-name.png
02-topic-name.png
```

Keep the original generated files. Don't overwrite existing assets unless the user explicitly asks to replace them.

## Output register

Keep the pre-generation strategy short and sharp. The post-generation delivery should include:

- How many images were generated
- What each image is for
- The save path
- Which images are most solid, which are optional

Don't lecture on style theory — let the images speak.
