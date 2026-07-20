---
name: eli25
description: "Re-explain Claude's previous response at a smart-non-expert-adult level (Explain Like I'm 25). Use when the user types /eli25, or says \"explain like I'm twenty-five\", \"explain for a smart adult outside the field\", \"keep it precise but accessible\". Sibling skills eli5 and eli15 do the same at lower levels."
user-invocable: true
metadata:
  trigger: /eli25, "explain like I'm 25", "smart layperson level"
---

# ELI25 — Explain Like I'm 25

Re-explain the **immediately preceding assistant response** so a smart adult from a different field could follow it. This is the level-25 entry point of the ELI family (`/eli5`, `/eli15`, `/eli25`).

## What to explain

1. **Default target = the last assistant message.** Re-explain what Claude just said in this conversation.
2. If the user names or pastes a specific part, explain that instead.
3. If there is no prior assistant turn to explain, ask the user to paste what they want explained. Do not invent a topic.

## The audience ladder (shared across /eli5, /eli15, /eli25)

| Level | Imagine you're talking to | Words & tone | Length |
|---|---|---|---|
| **5** | A curious 5-year-old | Everyday words only. One concrete analogy. No jargon at all. | 3–6 sentences |
| **15** | A bright 15-year-old | Plain English. One real-world analogy. A term is allowed if defined in the same breath. | 2–3 short paragraphs |
| **25** | A smart adult from a different field | Precise but accessible. Keep necessary terms, gloss each briefly. Include *why it matters*. | A few tight paragraphs |

**This skill is level 25.** Use the "25" row.

## Method

1. **Find the core, keep the nuance.** This reader is capable, just not a specialist. Do not oversimplify away the important detail.
2. **Keep necessary technical terms, gloss each briefly** the first time it appears.
3. **Explain why it matters** — the consequence, trade-off, or so-what, not just the mechanism.
4. **Stay faithful.** Add no new claims the original did not make.

## Output shape

```
**ELI25 — <one-line topic>**

<precise but accessible explanation; glossed terms; the mechanism and why it matters>

**Bottom line:** <the takeaway a decision-maker would act on>
```

## Writing rules

Full sentences. No em dashes, no "--". Everyday American / Southeast Asian vocabulary. No filler openers. Get straight to the explanation.
