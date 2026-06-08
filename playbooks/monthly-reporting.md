---
playbook: Monthly reporting
owner: Account lead
last_reviewed: 2026-06-08
---

# Monthly reporting

## Purpose
Deliver a consistent monthly performance report to every active client by working day 5, without surprises and without re-inventing the format each month.

## When to use it
For every client with `status: active` in `CLIENT.md`. Runs monthly on a fixed cadence regardless of campaign state.

## Preconditions
- Active client with at least one full reporting period of data.
- Tracking known good (pixels, GA4, platform reporting).
- Reporting template available at `templates/reports/monthly-performance.md`.

## Steps
1. **Day 1 of month — pull data.** Lock the prior month's data from each platform (Meta, Google, GA4, Shopify, CRM, whatever applies). Export raw to `clients/<slug>/04-reports/raw/YYYY-MM/` if needed for audit.
2. **Day 1–2 — draft the report.** Copy `templates/reports/monthly-performance.md` into `clients/<slug>/04-reports/YYYY-MM.md`. Fill: executive summary, KPI table vs target, channel breakdown, creative learnings, spend, next month's plan.
3. **Day 2 — sanity check the numbers.** Reconcile platform totals against GA4 / server-side. If discrepancies > 10%, investigate before sending. Note known variances in the report itself.
4. **Day 3 — internal review.** Account lead reads the draft. Strategy lead reads the recommendations section. Both sign off before client review.
5. **Day 4 — send to client.** Email or share via the agreed channel. Reference the file path in the comms log under `clients/<slug>/05-meetings/` if a meeting follows.
6. **Day 5 — review call (if cadence requires).** Use `templates/meeting-notes.md`. Save filled note to `clients/<slug>/05-meetings/YYYY-MM-DD-monthly-review.md`. Capture decisions and next actions.
7. **Update CLIENT.md `last_reviewed`** if scope or contacts shifted during the review.

## Common pitfalls
- Pulling data mid-month "to get ahead" — late conversions get missed and numbers move.
- Copy-pasting last month's commentary. The recommendations section is the value; rewrite it.
- Burying bad news. Lead with what underperformed and what we're changing — clients respect candour, not polish.
- Sending the report without a recommended next step. Every report ends with a decision the client needs to make.

## Owner
Account lead drafts and owns delivery. Practice lead reviews the recommendations.
