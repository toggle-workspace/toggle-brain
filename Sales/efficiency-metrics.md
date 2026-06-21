---
tracker: efficiency-metrics
mechanism: hand-maintained
generated_by: none
reads: nothing — filled directly
companion: profitability-dashboard.html
cadence: monthly
last_reviewed: 2026-06-21
---

# Efficiency Metrics

> **Hand-maintained.** No per-client source — these are agency-wide operating
> KPIs. `/sales-trackers` does **not** touch this file. Set a cadence (monthly is a
> sensible default) and fill the row each period.

> **Companion dashboard:** `Sales/profitability-dashboard.html` — the visual
> "real cost of time" view (KPI strip, net P/L per client, cost-of-time split,
> net-profit concentration, full breakdown). Open it in a browser; the monthly
> snapshot below is its numbers, frozen per period. The dashboard's client data
> is currently inline in that file — when a client edits hours/revenue, update
> both the dashboard's `raw[]` array and the next snapshot row here.

## How to use this

Track the handful of metrics that drive decisions. The two tables below split into
**(A) the cost-of-time profitability KPIs we compute today** (live, from the
dashboard) and **(B) delivery/ops KPIs we don't yet instrument** (kept as the
backlog of what to start measuring). Fill table A every month; promote a metric
from B to A once it's actually tracked.

## A · Cost-of-time snapshot (live)

| Month | Clients | Costed rev/mo (RM)¹ | Cost of time (RM) | Net profit (RM) | Net margin | Profitable | Founder load (h/wk) | Net / founder-hr (RM) | Top-client concentration | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| 2026-06 | 13 (12 costed) | 70,350 | 19,723 | 50,627 | 72% | 11/12 | 23 | 508 | 47% (UNITAR) | Baseline, synced to the Client Profitability sheet (cost-of-time tab). Sourceflow (RM5,000/mo) hours not yet entered → **HOURS PENDING**, excluded from cost/net/margin/concentration. IOTA (−936) is the only loss-maker. Rates F150/Fl50/P90 × 4.33. |

¹ Costed clients only (12). + RM5,000 Sourceflow pending = **RM75,350 gross revenue**. Net margin is over costed revenue.

## B · Delivery / capacity KPIs (not yet instrumented)

| Metric | Status | Why it matters |
|---|---|---|
| Revenue / head | TBD | Total revenue ÷ delivery headcount — capacity efficiency. |
| Avg delivery time | TBD | Brief-approved → first deliverable shipped, in days. |
| On-time % | TBD | Deliverables hitting committed date ÷ total deliverables. |
| Utilization | TBD | Billable hours ÷ available hours. Founder load (23 h/wk costed, + Sourceflow pending) is the partial proxy until tracked properly. |

## Metric definitions

- **Revenue/mo** — total monthly billings across all clients (retainers + project
  fees). **Not** the formal recurring figure — see caveats. Source of recurring-only
  truth: `mrr-tracker.md`.
- **Cost of time** — Σ (hours/week × role rate × 4.33 weeks). Rates: founder
  `RM 150/hr` · freelancer `RM 50/hr` · partner `RM 90/hr`.
- **Net profit** — Revenue − Cost of time. **Net margin** = Net ÷ Revenue.
- **Profitable** — clients with net > 0, of costed total. (June: 11/12 costed; Sourceflow pending.)
- **Founder load** — total founder hours/week committed across the book. The
  binding capacity constraint for a founder-led agency; watch it, not just revenue.
- **Net / founder-hr** — agency net ÷ monthly founder hours. The blended return on
  the scarcest resource. Per-client, it flatters work offloaded to partners/
  freelancers — read it beside the cost-of-time split, never alone.
- **Top-client concentration** — largest client's share of total net profit.
  A risk metric: at 47%, losing UNITAR nearly halves the bottom line.

## Caveats (carried from the dashboard)

- **Hours are operator estimates, not timesheet-tracked** — treat the cost side as
  directional until time is logged.
- **Revenue mixes retainers and project fees**, so the concentration figure inherits
  that mix. For recurring-revenue truth use `mrr-tracker.md` (MRR counts only
  `status: active` clients); this view is profitability-of-effort, a different lens.
- **Sourceflow is HOURS PENDING.** It bills RM5,000/mo but no hours are entered in the
  source sheet, so it's excluded from cost/net/margin/concentration until filled —
  shown for revenue only. Enter its hours to close the gap; it could be a strong
  retainer or a hidden sink, and right now we can't tell.

## Notes

<!-- What changed this period and why. Anomalies, one-offs, capacity changes. -->

- **2026-06 (baseline, synced to the Client Profitability sheet).** Costed book:
  RM50,627 net at 72% margin across 12 clients. Decisions surfaced: (1) **Enter
  Sourceflow's hours** — RM5,000/mo is billed but uncosted, so it's neither a
  confirmed star nor a sink. (2) **De-risk UNITAR** (47% of net; lose it and net
  nearly halves). (3) IOTA is the only loss-maker (−RM936) and the highest-cost
  client — review the 6 partner hours/wk. Long tail to watch: Al-Shah, Mr. Hardbox,
  TPL each net < RM600.
- **Prior baseline (pre-sync)** had Sourceflow at 10F/11Fl hrs → −RM3,877 loss, giving
  RM46,750 net / 62% margin / 51% concentration / 33 founder h/wk. The sheet's blank
  Sourceflow hours replaced that; the swing is entirely the Sourceflow re-classification.
