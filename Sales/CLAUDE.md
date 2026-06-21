# `Sales/` — agency business state

Cross-client operational and financial state for Toggle Solutions. This is the
**rollup zone**: pipeline, recurring revenue, receivables, and efficiency — the
numbers that span the whole book of business, not any single client.

---

## The rules of this zone

1. **Agency-grain only.** Everything here aggregates *across* clients. If a fact
   belongs to one client, it lives in `clients/<slug>/CLIENT.md`, not here.
2. **Single source of truth.** Per-client facts (MRR, credit pending, pipeline
   stage, quotes) live in `clients/<slug>/CLIENT.md` and `archive/quotes/`. The
   trackers here are **rollups of that truth** — they read it, they don't own it.
3. **Don't hand-edit a generated tracker.** Three of these are produced by
   `/sales-trackers` from per-client frontmatter. Edit the client file, then
   regenerate. Hand-edits get overwritten and cause drift.
4. **Never write back into `brain/` or `clients/`.** Outputs and rollups only.

---

## What's in here

| File | Grain | Mechanism | Source of truth |
|---|---|---|---|
| `mrr-tracker.md` | active clients × MRR, summed | **generated** | `CLIENT.md` `mrr:` + `currency:` |
| `quotation-tracker.md` | every quote × status | **generated** | `archive/quotes/` + `clients/*/quotes/` frontmatter `status:` |
| `credit-pending.md` | outstanding receivables | **generated** | `CLIENT.md` `credit_pending:` |
| `sales-pipeline.md` | prospects × stage + activity | **hybrid** | `stage:` columns from `CLIENT.md`; activity log hand-written here |
| `efficiency-metrics.md` | agency ops KPIs | **hand-maintained** | filled directly — no per-client source |

---

## The per-client frontmatter contract

These trackers depend on `clients/<slug>/CLIENT.md` carrying this frontmatter
(see `clients/_TEMPLATE/CLIENT.md` for the canonical block):

```yaml
status: prospect | active | paused | closed
stage: lead | qualified | proposal-sent | negotiation | won | lost | n/a
currency: MYR | SGD | …
mrr: <number> | TBD          # monthly recurring revenue, in `currency`
credit_pending: <number> | 0 # outstanding receivables, in `currency`
```

And on each quote file (`clients/<slug>/quotes/*.md` and `archive/quotes/*.md`)
— full contract canonical in `archive/quotes/README.md`:

```yaml
client: <slug>
scope: <short-scope>
date: YYYY-MM-DD
amount: <number>
currency: MYR | SGD | …
status: draft | sent | accepted | declined | expired
```

`TBD` is a valid placeholder — the generator counts it as "unknown" and surfaces
it rather than treating it as zero. Fill the real number when you have it.

> **Empty trackers are expected until CLIENT.md frontmatter is populated.** Today
> every client carries placeholder `status:`/`currency:`/`stage:` and `TBD`
> numbers, so a first `/sales-trackers` run yields empty tables plus a long "needs
> attention" list. That's the tool working, not broken — fill the client files and
> re-run.

---

## Regenerating

Run `/sales-trackers` (recipe in `generators/sales-trackers.md`). It reads every
`CLIENT.md` and the quotes folders, then overwrites the three generated trackers
and refreshes the **Pipeline table** of `sales-pipeline.md` (leaving its activity
log untouched). It does **not** touch `efficiency-metrics.md`.

**Status scoping (deliberate asymmetry):** MRR counts only `status: active`
clients (recurring revenue you're currently earning). Credit pending counts
clients of **any** status with a non-zero balance (a closed client can still owe
you). The pipeline lists prospects + any deal whose `stage` isn't `won`/`lost`/`n/a`.
