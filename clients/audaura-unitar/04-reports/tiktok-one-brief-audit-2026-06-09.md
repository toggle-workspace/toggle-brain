---
client: audaura-unitar
report: TikTok One creator-brief audit
generated: 2026-06-09
authority: brain/tiktok-one-rules.md
method: brief-validator subagent run in parallel against all 5 existing briefs
---

# TikTok One brief audit — 2026-06-09

## Headline

**All 5 existing briefs FAIL the binding rules.** Root cause: every brief
uses the legacy `Project Name / Project Description / Product Description /
Product Selling Points / Preferred Creator Description / Video Suggestions /
Avoid` template instead of the TikTok One six-section canonical structure
(Hook & message / Product / USPs / Creator vibe / Scenes / CTA & deliverables).

This template confusion is **the exact root cause of the original TikTok
rejection wave** Toggle is course-correcting from.

## Per-brief scoring

| Brief | Passes | Worst failure |
|---|---|---|
| 01-diploma-e-secretaryship | 1/8 | Wrong template + jargon (MQA, PTPTN) + compound persona + embedded audio cues |
| 02-postgraduate-diploma-in-education | 0/8 | Wrong template + explicit second product ("credit-transfer into Master of Education") + jargon + compound persona + embedded audio |
| 03-diploma-culinary-arts | 1/8 | Wrong template + 4 products bundled (pastry/Malaysian/Western/intl cuisine + Industrial Training) + 4 USPs + compound persona + ASMR audio cues |
| 04-master-of-education | 1/8 | Wrong template + jargon (MQA, EPF, KWSP, PA18395) + 5-archetype compound persona + embedded audio |
| 05-master-of-business-administration | 4/8 | Wrong template (despite passing on product, USP count, plain English, no preamble) + 7+ archetype persona + audio cues + extra "Avoid" section |

## Aggregate rule pass rate

| Rule | Pass rate |
|---|---|
| 1. One product | 1/5 (only MBA) |
| 2a. 2-3 USPs | 1/5 (only MBA) |
| 2b. Plain English | 1/5 (only MBA) |
| 3. 6-section canonical structure | **0/5** |
| 4. Singular-voice persona | **0/5** |
| 5. Scene timing 2s/6s/end-card | 0/5 |
| 6. No brand-guidelines section | 4/5 (MBA fails on `## Avoid`) |
| 7. Preamble ≤3 sentences | 1/5 (only MBA) |
| 8. Visual-only scenes (no music) | **0/5** |

## Three patterns that show up in 4–5 of 5 briefs

1. **Template inertia.** Every brief inherits the same legacy template
   structure. The fix isn't brief-by-brief edits; it's switching the source
   template the team copies from. Recommend retiring the legacy template
   and replacing with `templates/briefs/tiktok-one.md` shell.
2. **Audio cues in the brief.** Every brief embeds a music direction
   (Commercial Music Library, ASMR cooking SFX, lo-fi corporate track).
   Those belong in the shot list per `playbooks/tiktok-production.md`,
   never the brief.
3. **Compound personas via `or` / `and`.** Every brief lists multiple
   archetypes joined by `or` or `and`. The fix is one persona per brief,
   period — if three personas are needed, write three briefs.

## Recommended action

1. **Don't ship any of these as-is.** All 5 will be rejected by TikTok again.
2. **Rewrite priority order** (worst first):
   - 02 PG-Dip Education (0/8) ← being rewritten today as the demo
   - 03 Culinary Arts (1/8) ← also 4-product bundling, hardest to compress
   - 01 e-Secretaryship (1/8)
   - 04 M.Ed (1/8)
   - 05 MBA (4/8) ← only fixes needed: persona, audio, drop `## Avoid`, restructure into 6 sections
3. **For each rewrite:** run `/tiktok-brief-writer` → write fresh brief
   to `clients/audaura-unitar/00-brief/YYYY-MM-DD-<campaign>-tiktok-one.md`
   → validate with `brief-validator` subagent → only submit on PASS.
4. **Retire the legacy template.** The 5 legacy briefs stay in `brief/`
   as historical record. New briefs land in `00-brief/` with the
   `-tiktok-one.md` suffix.

## Demo rewrite shipped today

See `clients/audaura-unitar/00-brief/2026-06-09-postgraduate-diploma-education-tiktok-one.md`.
This is the validated rewrite of brief 02. Use it as the worked example
for the team when rewriting the other four.
