---
name: account-brief
description: Pre-meeting brief OR post-meeting followups for sales / investor / partnership / hiring calls. Triggers on phrases like "prep me for [meeting]", "research [company or person] before [meeting]", "what should I know before meeting X", "draft followups from this transcript", "recap this call into an email and notes". Pulls from email threads, attached transcripts, web, LinkedIn, and any MCP tools the user has connected. Always flags gaps instead of fabricating.
---

# account-brief

Two modes — ask which if it isn't obvious from context.

## Mode 1 — Pre-meeting brief

### Gather (in this order, stop when you have enough)

1. The user's framing of the meeting (who, what they want out of it).
2. Any pasted/attached material — email thread, notes, LinkedIn screenshot, recording transcript.
3. Public web on the person and the company — recent posts, role, funding, launches, current focus. Use WebSearch / WebFetch.
4. MCP tools if connected (CRM, Gmail, calendar, Slack). Silently check the available tool list before reaching — never assume.

### Brief skeleton — render in this exact order

```
CONFIDENCE: [low | medium | high]   — Built from: [list sources]

HEADLINE (2-3 lines)
• Who you're meeting and why this call is happening
• What they likely care about most
• The single thing to push for

WHO'S IN THE ROOM
• [Name], [Role]. One concrete fact from the last 30 days or their stated focus.
• (One bullet per attendee.)

THEIR WORLD
• What the company does, plain English, one line.
• Stage / size signal (employees, funding, customer count — pick the most public).
• A momentum signal from the last 60 days, dated.

WHAT THEY CARE ABOUT (in this meeting)
• 2-4 bullets. Quote or cite where possible. Label inference: "Likely: …"

YOUR ASK
• The clear single next step.
• A smaller fallback if the first is too big.

QUESTIONS TO ASK
• 3-5 questions, each testing a specific hypothesis (not small talk).
• Mark the most important one — lead with it if time runs short.

FACTS TO DROP
• 2-3 specifics that prove you did the work. Each cites source + date.

GAPS
• What you couldn't find. Name them. Do not paper over with guesses.
```

### Calibration rules

- Every fact in **THEIR WORLD** and **FACTS TO DROP** has a source you can name + a date. If not, it moves to **GAPS**.
- Confidence label is mandatory and goes at the top.
- Never invent quotes, numbers, or events. Labeled inference ("Likely: …") is fine.
- If a load-bearing assumption drives the ask, surface it as a question before finalizing: "I'm assuming X — confirm?"

## Mode 2 — Post-meeting

### Inputs

- Transcript, notes, or summary (user pastes/attaches).
- Original brief if they have one.

### Outputs — in this order

1. **Recap email draft** — 2–3 short paragraphs, addressed to whoever was in the room. Ends with one clear next step. No "Hope this finds you well." No filler greetings.
2. **Followups checklist** — every "I'll send X" / "we should look at Y" pulled out, tagged with owner. Distinguish the user's items vs the other side's.
3. **Notes entry** — one factual paragraph: what was decided, what's outstanding, expected next contact. Fact-only, no opinion.
4. **Open questions** — anything from the brief that didn't get a clear answer in the call.

### Calibration rules

- A vague commitment ("yeah we could look at that") does NOT become a followup. Put it in open questions or drop it.
- If the user wasn't in the meeting (handing you someone else's transcript), the email becomes a status-update draft addressed to them, not a sent-style message.
- Quote sparingly — one verbatim line per recap paragraph max.

## Defaults

- Output to chat unless the user asks to save it.
- Assume solo-founder setup: email + LinkedIn + web + whatever's pasted. No enterprise CRM unless an MCP is connected.
- If a key assumption is doing a lot of work, surface it as a question before committing.
