---
name: visualise
description: "Turn Claude's previous response into the clearest visual — flowchart, table, tree, timeline, chart, ASCII diagram, or a rendered HTML/image. Auto-picks the best medium. Use when the user types /visualise (or /visualize), or says \"show me that visually\", \"draw that\", \"make a diagram/flowchart/chart of that\", \"turn that into a picture\"."
user-invocable: true
metadata:
  trigger: /visualise, /visualize, "show me that visually", "draw that", "diagram this"
---

# Visualise — see the last response

Turn the **immediately preceding assistant response** into the clearest possible visual. Read what was just said, decide which visual form fits it best, then render it.

## What to visualise

1. **Default target = the last assistant message.** Visualise what Claude just explained in this conversation.
2. If the user names or pastes a specific part ("just the pricing table", "the flow you described"), visualise that instead.
3. If there is no prior assistant turn, ask what to visualise. Do not invent content.

## Step 1 — Pick the form (auto)

Match the *shape of the information* to the form. Pick the single best fit.

| If the content is… | Use | 
|---|---|
| A process, steps in order, or branching decisions | **Flowchart** (mermaid `flowchart` / `graph`) |
| A comparison across items and attributes | **Table** or a small comparison **grid** |
| A hierarchy, breakdown, or parent/child structure | **Tree** (ASCII tree, or mermaid) |
| Events or stages over time | **Timeline** |
| Quantities, trends, proportions, distributions | **Chart** — bar, line, pie, etc. (load the `dataviz` skill first) |
| Relationships / how things connect | **Node-and-edge diagram** (mermaid `graph`) |
| A concept, layout, UI, or scene best *drawn* | **Image** (see Step 2) |
| Something small and simple | **Inline ASCII** — fastest, stays in the terminal |

When the user explicitly names a form, honor it: `/visualise as ascii | table | flowchart | tree | timeline | chart | html | image`.

## Step 2 — Pick where to render it

- **Inline in the chat** for anything simple: ASCII diagrams, small markdown tables, short trees. Fastest, no extra step. Note the terminal renders GitHub-flavored markdown but does **not** render mermaid as a diagram, so an inline mermaid fence stays as code.
- **HTML Artifact** for anything rich or diagrammatic: mermaid flowcharts/graphs/trees, charts, styled or multi-panel layouts. Artifacts render mermaid natively (```mermaid fences or `<pre class="mermaid">`) and let you share a link.
  - Before writing the page, **load the `artifact-design` skill** (required by the Artifact tool).
  - For any data chart, **also load the `dataviz` skill** before choosing colors or chart type.
  - Write the file, then publish with the Artifact tool. Keep it self-contained (inline CSS/JS, no external assets) and theme-aware.
- **Image** when a real drawing communicates best (a concept, a scene, a mascot-style explainer). Use an available image path such as the `whimsical-article-illustrations` skill, or Canva tools if connected. Only go here when a diagram or chart genuinely would not do the job.

Default rule of thumb: **simple → inline; diagram or chart or styled → HTML Artifact; illustrative → image.** When in doubt between inline and Artifact, prefer inline for a single small diagram and an Artifact for anything a person would want to keep or share.

## Step 3 — Render faithfully

- Represent only what the response actually said. Do not add nodes, rows, or data points that were not there. If a value is unknown, label it clearly rather than guessing.
- Label everything: title the diagram, name the axes, key the legend.
- After rendering, add one plain-language line telling the user what they are looking at, and offer to switch form ("Want this as a table instead, or a shareable HTML version?").

## Writing rules

Any text inside the visual follows the house rules: full sentences where sentences appear, no em dashes, no "--", everyday American / Southeast Asian vocabulary.
