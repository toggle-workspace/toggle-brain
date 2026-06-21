# `archive/quotes/` — quote ledger

Every quote Toggle has sent. `/quote` reads this directory to anchor new quotes against past ones.

## Filename convention

```
YYYY-MM-DD-<client-slug>-<scope>.md
```

Examples:
- `2026-06-08-audaura-unitar-tiktok-q3.md`
- `2026-06-10-ocean-flair-monthly-seo.md`
- `2026-06-12-ij-solutions-web-rebuild.md`

## Required frontmatter

Every quote file (drafts in `clients/<slug>/quotes/` and finals here) carries:

```yaml
---
client: <slug>
scope: <short-scope>          # e.g. tiktok-q3, monthly-seo, web-rebuild
qt: QT-###                    # the quotation number printed on the document
date: YYYY-MM-DD
amount: <number>              # total in the client's currency; 0 for hourly rate cards
pricing_type: fixed | hourly  # fixed/monthly (has a Total) | hourly rate card (no Total)
currency: MYR | SGD | …
status: draft | sent | accepted | declined | expired
deliverable: <file>.html      # the print-faithful HTML (export to PDF from this)
---
```

The `Sales/quotation-tracker.md` rollup (`/sales-trackers`) reads these fields to
build the all-quotes table, the open-quotes list, and the win-rate summary. Keep
`status:` current — it's the only signal of whether a quote is still live. For
`pricing_type: hourly`, treat `amount: 0` as "rate card / n/a" in value rollups.

**QT numbering.** `/quote` auto-suggests the next number by taking the max `qt:`
across this folder + `clients/*/quotes/*.md` and adding 1. The highest sent so
far is **QT-226** (see backfilled anchors below), so the next new quote is QT-227.

## Why this matters

When the team prices a new engagement, the strongest signal is *what we actually charged the last comparable client*. Stale or missing anchors → drift. **Always copy the final sent version here on send.** Don't wait, don't batch — do it the same hour.
