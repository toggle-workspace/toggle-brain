---
title: TikTok One creator-brief binding rules
last_reviewed: 2026-06-08
authority: TikTok platform (binding — non-negotiable)
applies_to: every TikTok One creator brief Toggle submits, for any client
---

# TikTok One — binding creator-brief rules

TikTok rejected Toggle's first creator briefs as **too complex**. These rules
are the corrective doctrine. Any brief that violates them gets re-rejected.

> Citation source: TikTok One platform feedback to Toggle (2026, UNITAR engagement).
> Memory carried over from `~/.claude/.../memory/tiktok-one/` archive.

---

## The four binding rules

1. **One product per brief.** Never bundle two products or two programs into
   one brief. If the campaign needs two products, write two briefs.
2. **Two to three plain-language USPs.** No more, no less. USPs are **plain
   English** — no jargon, no internal acronyms, no marketing-speak. A 17-year-old
   reading the brief must understand every word without context.
3. **Six-section structure.** Every brief follows the six sections in the
   exact order below. No additional sections. No reorderings.
4. **Pitch only ONE creator persona / archetype per brief.** Cross-archetype
   briefs got rejected. If three personas are needed, write three briefs.

---

## The six sections (mandatory order)

| # | Section | Contains |
|---|---|---|
| 1 | **Hook & message** | The opening 2 seconds. Plain-language hook. What stops the scroll. |
| 2 | **Product / program** | The ONE product or program. Name + 1-sentence what-it-is. |
| 3 | **USPs (2–3)** | Bulleted, plain-language unique selling points. No jargon. |
| 4 | **Creator vibe** | Persona / archetype the creator should embody. Tone, energy, look. |
| 5 | **Scenes / structure** | 3–5 scene beats. What happens visually. Pacing notes (hook in 2s, payoff before 6s, CTA before end card per TikTok pipeline doctrine). |
| 6 | **CTA & deliverables** | The call-to-action exact wording. Format specs (9:16, duration, deliverable count). |

---

## Common rejection causes (avoid)

- **More than 3 USPs.** Exact range is 2 or 3. Not 1, not 4.
- **Jargon in USPs.** Including but not limited to: "synchronous /
  asynchronous learning", "ecosystem", "stack" (as a verb),
  "credential-stacked", "outcome-aligned", "competency-based",
  "industry-aligned", "engagement loop", "behavioral trigger",
  "conversion funnel", "velocity", "user cohort", "optimization lever",
  "attribution window", "platform" (when used vaguely). The list is not
  exhaustive — the principle is the **17-year-old test**: would a 17-year-old
  with no industry context understand this phrase on first read without
  Googling? If not, it's jargon. Reject.
- **Two products mentioned even briefly** — including via `+`, `and`, `or`,
  `also consider`, `bundled with`. "MBA + Career Services" reads as two
  products to TikTok review.
- **A "Brand guidelines" section** (TikTok briefs don't carry brand
  guidelines — those live in the `style-pack.md`).
- **A "Background context" preamble over 3 sentences** before section 1.
  Including such a preamble at all is risky; if present, cap at 3 sentences.
- **Music / sound rights notes embedded in the brief** (those belong in the
  shot list, not the brief). Scene descriptions name visual beats, not audio cues.
- **Compound persona** ("a student OR a working parent", "Gen Z and
  millennial", "creator who codes and creates TikToks"). One persona = one
  archetype, expressed in singular voice. No `or`, `and`, or slash phrases
  in the persona section.
- **Extra sections** beyond the six. No `## 7. Notes`, no `## Appendix`,
  no `## Brand`. Six headers, in the canonical order, period.

## Filename convention (binding)

TikTok One briefs MUST be saved at:
```
clients/<slug>/00-brief/YYYY-MM-DD-<campaign>-tiktok-one.md
```

The `-tiktok-one` suffix distinguishes them from generic TikTok briefs (which
follow `playbooks/tiktok-production.md` and use `-tiktok.md`). The validator
refuses to validate a file that doesn't carry the `-tiktok-one` suffix.

---

## Where this applies

- `/tiktok-brief-writer` skill enforces these rules at draft time.
- `brief-validator` subagent flags violations adversarially before submission.
- `playbooks/tiktok-production.md` step 2 ("Brief.") delegates here for the
  structure.

---

## Where briefs are written

`clients/<slug>/00-brief/YYYY-MM-DD-<campaign>-tiktok-one.md`

Use `templates/briefs/tiktok.md` as the shell. The six-section structure above
overrides any wider TikTok pipeline brief shape — this is TikTok One specifically.
