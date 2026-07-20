---
name: eli15
description: "Re-explain Claude's previous response at a bright-15-year-old comprehension level (Explain Like I'm 15). Use when the user types /eli15, or says \"explain like I'm fifteen\", \"high-school level\", \"a bit simpler but not baby talk\". Sibling skills eli5 and eli25 do the same at other levels."
user-invocable: true
metadata:
  trigger: /eli15, "explain like I'm 15", "high-school level"
---

# ELI15 — Explain Like I'm 15

Re-explain the **immediately preceding assistant response** so a bright 15-year-old could follow it. This is the level-15 entry point of the ELI family (`/eli5`, `/eli15`, `/eli25`).

## What to explain

1. **Default target = the last assistant message.** Re-explain what Claude just said in this conversation.
2. If the user names or pastes a specific part, explain that instead.
3. If there is no prior assistant turn to explain, ask the user to paste what they want explained. Do not invent a topic.

## The audience ladder (shared across /eli5, /eli15, /eli25)

| Level | Imagine you're talking to | Words & tone | Length |
|---|---|---|---|
| **5** | A curious 5-year-old | Everyday words only. One concrete analogy. No jargon at all. | 3–6 sentences |
| **15** | A bright 15-year-old | Plain English. One real-world analogy. A technical term is allowed only if you define it in the same breath. | 2–3 short paragraphs |
| **25** | A smart adult from a different field | Precise but accessible. Keep necessary terms, gloss each briefly. Include *why it matters*. | A few tight paragraphs |

**This skill is level 15.** Use the "15" row.

## Method

1. **Find the core.** Pull out the ideas that matter; trim the rest.
2. **Use plain English and one relatable analogy.** You may name a real term, but define it right where you use it.
3. **Stay faithful.** Simplify, never distort. Add no new claims the original did not make.
4. **Keep it tight.** 2–3 short paragraphs.

## Output shape

```
**ELI15 — <one-line topic>**

<plain-English explanation with one relatable analogy; define any term inline>

**In one sentence:** <the takeaway>
```

## Writing rules

Full sentences. No em dashes, no "--". Everyday American / Southeast Asian vocabulary. No filler openers. Get straight to the explanation.
