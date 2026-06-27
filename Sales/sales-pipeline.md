---
tracker: sales-pipeline
mechanism: hybrid
generated_by: /sales-trackers   # regenerates the "Pipeline" table only
reads: clients/*/CLIENT.md (status, stage) + git mtime
last_generated: never   # set to YYYY-MM-DD on first /sales-trackers run
hand_edited_section: "Activity log"
---

# Sales Pipeline

> **Hybrid tracker.** The **Pipeline** table below is *generated* from each
> `clients/<slug>/CLIENT.md` (`status:` + `stage:`) — don't hand-edit it. The
> **Activity log** is *hand-written* and is **never** overwritten by
> `/sales-trackers`. Record what happened on each deal there.

Stages: `lead → qualified → proposal-sent → negotiation → won | lost`
(`n/a` for active retainer clients no longer in the deal funnel).

## Pipeline  <!-- generated: do not hand-edit below this line -->

| Client | Status | Stage | Last activity |
|---|---|---|---|
| _run /sales-trackers_ | | | |

<!-- /generated -->

## Activity log  <!-- hand-written: /sales-trackers never touches this -->

> One subsection per active deal. Newest entry on top. Plain prose — calls made,
> proposals sent, objections, next step + owner + date.

### _example — delete when first real deal lands_
- **2026-06-21** — Sent v1 proposal. Awaiting feedback by EOW. Owner: Viknesh.
- **2026-06-18** — Discovery call. Budget ~RM8k/mo. Decision-maker: TBD.
