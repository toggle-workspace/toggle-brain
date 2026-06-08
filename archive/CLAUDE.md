# `archive/` — closed engagements and pricing memory

Move-don't-delete. Once an engagement closes or a quote is sent, the artifact comes here.

---

## The rules of this zone

1. **Append-only in spirit.** Edits to archive entries should be rare — they reflect what was *true at the time*.
2. **`archive/quotes/` is the most valuable folder in this repo.** Every sent quote goes here. `/quote` reads it as price-anchor memory. **Feed it.**
3. **Don't move active client folders here.** Only closed engagements (relationship ended, project shipped + parked).

---

## What's in here

| Folder | Holds |
|---|---|
| `quotes/` | All sent quotes, all clients, all years. `YYYY-MM-DD-<client>-<scope>.md`. |
| `clients/` | Closed client engagements moved out of `clients/`. `YYYY-<slug>/` prefix preserves chronology. |
| `projects/` | Closed one-off projects that weren't tied to a single ongoing client. |

---

## The `archive/quotes/` price-anchor protocol

When a quote is sent:

1. Take the final version from `clients/<slug>/quotes/`.
2. Copy it to `archive/quotes/YYYY-MM-DD-<client>-<scope>.md`.
3. Commit. Done.

When `/quote` runs, it pulls the 2 nearest matches by `(client, scope)` as anchors so the new quote stays anchored to what was actually sent before. Good quotes compound. Skip this step and pricing drifts.
