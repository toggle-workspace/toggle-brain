---
client: audaura-unitar
title: Weekly leads breakdown — format spec
last_reviewed: 2026-06-08
cadence: weekly (delivered every Monday for prior Mon–Sun)
authority: binding format (agreed with UNITAR side)
---

# UNITAR — weekly leads breakdown format

The recurring weekly leads breakdown report Toggle owes UNITAR. The format is
**fixed** so week-on-week comparisons hold; the `/unitar-weekly-report` skill
generates this exact shape.

## Output destination

`clients/audaura-unitar/04-reports/YYYY-WW-weekly-leads.md` (where `WW` is ISO
week number).

## Mandatory sections (in order)

### 1. Headline

One sentence: total net leads for the week, % change vs last week, % change
vs same week last month. No emojis.

> _Example: "Week 24: 1,284 net leads delivered (+12% WoW, +47% MoM). CPL
> RM38 (-9% WoW). Best campus: Johor (RM29). Watchlist: Shah Alam (RM61)."_

### 2. Net leads by split

A single table. Four rows: **national / outstation / online / conventional**.
Three columns: absolute leads / % of total / WoW delta.

| Segment | Net leads | % of total | WoW Δ |
|---|---:|---:|---:|
| National | … | …% | …% |
| Outstation | … | …% | …% |
| Online | … | …% | …% |
| Conventional | … | …% | …% |
| **Total** | … | 100% | … |

### 3. Per-campus net leads

Table of all 10 campuses, ranked by net-lead gap remaining (worst first).
Columns: campus / leads this week / cumulative leads / 2026 target /
**gap remaining** / CPL this week.

### 4. Channel mix

Three-row table: **Meta / Google / TikTok**. Columns: spend / leads / CPL /
WoW Δ on each.

### 5. Creative learnings

3-5 bullets max. Only learnings that *change next week's decisions* — not
log entries. Format: `<creative or campaign> — <what happened> — <decision>`.

### 6. Next week's moves

3 bullets max. Each is a specific decision: scale / pause / test. No vague
"continue monitoring".

---

## Hard rules

- **No blended CPL as headline.** Per-campus CPL is what drives the
  conversation (per `clients/audaura-unitar/KPI.md`).
- **No leads from outside the operative campaign trees.** Online UIU and
  Online/Selangor never share with UC homegrown; if both appear in raw data,
  segment them.
- **Numbers come from the platforms, not memory.** If a number can't be
  sourced from Meta Ads Manager / Google Ads / TikTok Ads Manager / CRM at
  generation time, leave it as `TBD — source: <platform>` rather than guessing.
- **One page when possible.** Two pages absolute max. Stakeholders scan.

## Common pitfalls

- Pulling data mid-week — late conversions inflate the next report's headline.
- Letting "Total" row sum != sum of split rows (rounding error or de-dup).
- Including "MoM Δ" on per-campus when only 4 weeks of data exists — say
  "insufficient history" instead.
- Burying the worst campus. Surface it in the headline.

## Where the skill lives

Global skill: `/unitar-weekly-report` (callable from any project). Reads this
file as the canonical format spec.
