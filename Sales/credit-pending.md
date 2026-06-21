---
tracker: credit-pending
mechanism: generated
generated_by: /sales-trackers
reads: clients/*/CLIENT.md (credit_pending, currency)
last_generated: never   # set to YYYY-MM-DD on first /sales-trackers run
do_not_hand_edit: true
---

# Credit Pending

> **Generated — do not hand-edit.** Outstanding receivables across all clients.
> Source of truth is each `clients/<slug>/CLIENT.md` (`credit_pending:` +
> `currency:`). When an invoice clears, set the client's `credit_pending:` and
> re-run `/sales-trackers`.

## Totals by currency

| Currency | Clients with balance | Total outstanding |
|---|---|---|
| _run /sales-trackers_ | | |

## By client

| Client | Currency | Credit pending | Last reviewed |
|---|---|---|---|
| _run /sales-trackers_ | | | |

## Needs a number

Clients carrying `credit_pending: TBD` (status unknown — confirm 0 or a value):

- _run /sales-trackers_
