# UNITAR Weekly Leads Breakdown — binding format

This is a **special-case cadence** that overrides the generic monthly/slide flow.
It is the recurring weekly leads breakdown Toggle owes UNITAR (Audaura) every
Monday for the prior Mon–Sun. The format is **binding** — agreed with the UNITAR
side — so week-on-week comparisons hold.

> Canonical source of truth: `clients/audaura-unitar/WEEKLY-REPORT-FORMAT.md`.
> Read it at generation time in case it has been amended. This file mirrors it so
> the unified skill can route without a second lookup, but the client folder spec
> wins if they ever diverge. If the format genuinely needs to change, edit
> `WEEKLY-REPORT-FORMAT.md` first in its own commit, then regenerate.

## When this reference applies

- Client is `audaura-unitar` **and** the cadence is weekly, OR
- The user says "UNITAR weekly", "leads breakdown", "weekly report for UNITAR / Audaura".

For a UNITAR **monthly** performance report, use the normal B2C slide flow instead.

## Before writing

1. Read `clients/audaura-unitar/WEEKLY-REPORT-FORMAT.md` (binding spec).
2. Read `clients/audaura-unitar/KPI.md` — confirms net-lead-gap, per-campus framing
   (NOT blended CPL).
3. Compute the report week: default = ISO week of last Sunday
   (`date -v-Sun +%G-W%V` on macOS → e.g. `2026-W26`). If the user names a
   week/date, use that. Derive the `period:` Mon–Sun range from that week
   (Sunday = last Sunday; Monday = that Sunday minus 6 days).
4. **Source the numbers.** If per-campus net leads and channel spend aren't
   available from a connected source (Meta / Google / TikTok Ads Manager / CRM),
   **ask the user for them in one message before writing.** The binding format
   does **not** waive this — never silently emit an all-`TBD` table. Use
   `TBD — source: <platform>` only for individual rows still unavailable after asking.

## Output destination

`clients/audaura-unitar/04-reports/YYYY-Www-weekly-leads.md`, using the ISO week
verbatim from the `date` command — e.g. `2026-W26-weekly-leads.md` (keep the `W`;
matches the `week: 2026-W26` frontmatter field). Run `mkdir -p` on the folder first
(idempotent).

## Mandatory sections (exact order, all binding)

Render as markdown (this report is delivered as a doc, not slides), with this
frontmatter + structure:

```markdown
---
client: audaura-unitar
report: weekly leads breakdown
week: YYYY-WW
period: YYYY-MM-DD → YYYY-MM-DD
generated: YYYY-MM-DD
authority: see clients/audaura-unitar/WEEKLY-REPORT-FORMAT.md
---

# UNITAR weekly — week WW, <year>

## Headline
<one sentence: total net leads, WoW %, MoM %, CPL trend, best campus, worst campus. No emojis.>

## Net leads by split
| Segment | Net leads | % of total | WoW Δ |
|---|---:|---:|---:|
| National | … | …% | …% |
| Outstation | … | …% | …% |
| Online | … | …% | …% |
| Conventional | … | …% | …% |
| **Total** | … | 100% | … |

## Per-campus net leads
| Campus | This week | Cumulative | 2026 target | Gap remaining | CPL this week |
|---|---:|---:|---:|---:|---:|
| <worst campus first> | … | … | … | … | RM… |
| … (all 10 rows, ranked by gap remaining) | | | | | |

## Channel mix
| Channel | Spend | Leads | CPL | WoW Δ |
|---|---:|---:|---:|---:|
| Meta | RM… | … | RM… | …% |
| Google | RM… | … | RM… | …% |
| TikTok | RM… | … | RM… | …% |

## Creative learnings
- <creative or campaign> — <what happened> — <decision>
- … (3–5 max; only learnings that change next week's decisions)

## Next week's moves
- <scale / pause / test decision 1>
- <scale / pause / test decision 2>
- <scale / pause / test decision 3>
```

## Hard rules (binding)

- **No blended CPL as the headline.** Per-campus CPL drives the conversation
  (per `clients/audaura-unitar/KPI.md`). Surface the worst campus in the headline.
- **No invented numbers.** If a row can't be sourced from Meta Ads Manager /
  Google Ads / TikTok Ads Manager / CRM at generation time, write
  `TBD — source: <platform>` literally. Do not extrapolate from prior reports.
- **No leads from outside the operative campaign trees.** Online UIU and
  Online/Selangor never share with UC homegrown; segment them if both appear.
- **Totals must reconcile.** Sum of split rows = Total. If not, flag it inline.
- **One page when possible, two max.** Stakeholders scan.
- **MoM Δ on per-campus only with ≥4 weeks of history** — otherwise write
  "insufficient history".

## Common pitfalls

- Pulling data mid-week — late conversions inflate the next report's headline.
- "Total" row sum != sum of split rows (rounding / de-dup error).
- Burying the worst campus instead of leading with it.

## After writing

- **Echo the output path and the one-sentence headline** back to the user so they
  can confirm the right week generated.
- Append the week's headline + what was recommended to the UNITAR client log
  (see `client-log-template.md`), so the monthly report can reference the weeks.
- The file is **not committed.** Remind the user to run `/git-commit` (the legacy
  skill auto-committed `feat(audaura-unitar): weekly leads breakdown <YYYY-Www>`;
  this unified skill defers to the repo's `/git-commit` / `/git-contribute`
  workflow instead of committing silently).
- The legacy `/unitar-weekly-report` skill produced this exact shape; this unified
  skill supersedes it. Keep the binding spec file as the authority.
