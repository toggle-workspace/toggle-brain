---
name: eli5
description: "Re-explain Claude's previous response at a 5-year-old comprehension level (Explain Like I'm 5). Use when the user types /eli5, or says \"explain that like I'm five\", \"ELI5\", \"dumb that down\", \"simpler\". Sibling skills eli15 and eli25 do the same at higher levels."
user-invocable: true
metadata:
  trigger: /eli5, "explain like I'm 5", "ELI5", "dumb it down"
---

# ELI5 — Explain Like I'm 5

Re-explain the **immediately preceding assistant response** so a curious 5-year-old could follow it. This is the level-5 entry point of the ELI family (`/eli5`, `/eli15`, `/eli25`).

## What to explain

1. **Default target = the last assistant message.** Re-explain what Claude just said in this conversation.
2. If the user names or pastes a specific part ("the second paragraph", "the auth bit", quoted text), explain that instead.
3. If there is no prior assistant turn to explain, ask the user to paste what they want explained. Do not invent a topic.

## The audience ladder (shared across /eli5, /eli15, /eli25)

| Level | Imagine you're talking to | Words & tone | Length |
|---|---|---|---|
| **5** | A curious 5-year-old | Everyday words only. One concrete analogy (toys, animals, food, playground). No jargon at all. Short sentences. | 3–6 sentences |
| **15** | A bright 15-year-old | Plain English. One real-world analogy. A technical term is allowed only if you define it in the same breath. | 2–3 short paragraphs |
| **25** | A smart adult from a different field | Precise but accessible. Keep necessary terms, gloss each briefly. Include *why it matters*. | A few tight paragraphs |

**This skill is level 5.** Use the "5" row.

## Method

1. **Find the core.** Pull out the one or two ideas that actually matter. Drop incidental detail.
2. **Swap every hard word** for an everyday one, or an analogy a small child knows.
3. **Stay faithful.** Simplify, never distort. Do not add new claims the original did not make. If something genuinely cannot be made accurate at this level, say so in one plain line rather than lying.
4. **Keep it short.** 3–6 sentences.

## Output shape

```
**ELI5 — <one-line topic>**

<the plain explanation, using a simple analogy>

**In one sentence:** <the single-breath takeaway>
```

## Writing rules

Full sentences. No em dashes, no "--". Everyday American / Southeast Asian vocabulary. No filler openers ("Basically,", "Essentially,"). Get straight to the explanation.
