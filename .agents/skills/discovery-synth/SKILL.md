---
name: discovery-synth
description: Synthesize customer / user / advisor interviews into evidence-grounded themes for product, positioning, and pricing decisions. Triggers on "synthesize these interviews", "what did I learn from these calls", "themes from this batch", "what's the pattern across these conversations". Insists on small-N caveats, anchors every theme in verbatim quotes, and separates frequency from intensity.
---

# discovery-synth

## Step 1 — characterize the sample

Before any themes, name the sample:

- **N** (how many interviews).
- **Who** (titles, companies, segments — anonymize names if asked).
- **When** (date range).
- **How recruited** (warm intros, cold, existing users, target ICP, etc.). This drives bias.

State sample bias explicitly. e.g. "All 7 from warm intros via your network — likely friendlier-than-average about the problem."

**If N < 5,** surface that immediately: "5 interviews isn't a trend, it's a hypothesis-generator. I'll write themes as 'patterns worth testing', not findings."

## Step 2 — for each theme

```
THEME [name in plain language, no jargon]
Frequency: N of [total] mentioned this.
Intensity: low / medium / high — based on language strength.
  • "annoying" = low.
  • "I gave up on this" = high.

What they said (verbatim):
  • "quote" — [P1]
  • "quote" — [P3]
  • "quote" — [P5]

Implication: what this theme suggests for product / pricing / positioning. Tentative phrasing.

Counter-evidence: anyone in the sample who pushed back on this? Cite them.
```

**Inclusion bar:** a theme needs ≥3 mentions OR 1 mention at high intensity to qualify. Otherwise it's a "single signal worth following up on", listed separately.

## Step 3 — anti-themes

What you expected to hear but didn't. These are often more decision-useful than the themes themselves.

> e.g. "Nobody mentioned pricing as a blocker. If pricing were a top objection we'd expect to hear it here. Either it isn't, or these users self-selected past it."

## Step 4 — what this evidence does NOT support

Name the limits. Examples:

- "This sample tells you nothing about [adjacent segment] — recruit there next."
- "These users are post-purchase. For 'why didn't you buy', you need lost-deal interviews."
- "All US-based. No signal on [region]."

## Step 5 — what to test next

A short list:

- The 2–3 strongest hypotheses worth validating.
- The 2–3 outstanding questions to pursue in the next batch.
- Who to recruit next to reduce sample bias.

## Calibration rules

- **Every theme cites verbatim quotes.** No paraphrasing in the theme itself — that's where bias smuggles in.
- **Frequency and intensity reported separately.** Never collapsed into "lots of people really cared about X."
- Default to anonymized handles ([P1], [P2]) unless the user wants real names.
- **Refuse to synth thin material.** Fewer than 3 substantive transcripts → tell the user to do more interviews first.
- If the user asks for a single "what should I do" answer, give one — but caveat with the sample limit. Honest synthesis, not artificial certainty.

## Defaults

- Output as a markdown document the user can save. Offer to save to a path on request.
- For ongoing programs, suggest a rolling synthesis cadence (e.g. re-synth every 5 new interviews).
