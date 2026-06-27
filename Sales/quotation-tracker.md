---
tracker: quotation
mechanism: generated
generated_by: /sales-trackers
reads: archive/quotes/*.md + clients/*/quotes/*.md (status frontmatter)
last_generated: never   # set to YYYY-MM-DD on first /sales-trackers run
do_not_hand_edit: true
---

# Quotation Tracker

> **Generated — do not hand-edit.** One row per quote. Source of truth is the
> quote files themselves: drafts in `clients/<slug>/quotes/`, sent finals in
> `archive/quotes/`. Each quote carries `status:` frontmatter
> (`draft | sent | accepted | declined | expired`). Refresh with `/sales-trackers`.

## All quotes

| Date | Client | Scope | Amount | Status | File |
|---|---|---|---|---|---|
| _run /sales-trackers_ | | | | | |

## Open (sent, awaiting decision)

| Date sent | Client | Scope | Amount | Days open |
|---|---|---|---|---|
| _run /sales-trackers_ | | | | |

## Win rate

| Period | Sent | Accepted | Declined | Win % |
|---|---|---|---|---|
| _run /sales-trackers_ | | | | |
