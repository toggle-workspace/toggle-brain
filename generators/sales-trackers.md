# /sales-trackers

Regenerate the agency rollup trackers in `Sales/` from per-client source of truth.
Three trackers are fully generated; the sales pipeline's table is refreshed while
its hand-written activity log is preserved; efficiency metrics is never touched.

## READS
- clients/*/CLIENT.md                      # status, stage, mrr, currency, credit_pending, last_reviewed
- archive/quotes/*.md                       # sent quotes: status, client, scope, amount, date
- clients/*/quotes/*.md                     # draft quotes: same fields
- git log mtime per clients/<slug>/         # for "last activity" in the pipeline table

## WRITES
- Sales/mrr-tracker.md                         # full overwrite
- Sales/quotation-tracker.md                   # full overwrite
- Sales/credit-pending.md                      # full overwrite
- Sales/sales-pipeline.md                      # ONLY the block between `## Pipeline` and `<!-- /generated -->`
- (never) Sales/efficiency-metrics.md          # hand-maintained — do not touch

## INPUTS
- (none) — operates on the whole client book
- --dry-run (optional) — print the rollups without writing files

## STEPS

1. **Collect.** Read the frontmatter of every `clients/*/CLIENT.md`. Build one
   record per client: `slug, client, status, stage, currency, mrr, credit_pending,
   last_reviewed`. Skip `_TEMPLATE`. Note any client missing a `CLIENT.md`.

2. **Validate.** Flag (don't fail on) records where:
   - `status:` or other fields are still raw placeholders (`<prospect | …>`).
   - `mrr` / `credit_pending` is `TBD` (count as "unknown", not 0).
   - `currency` is missing but `mrr`/`credit_pending` is a number.
   Collect these into the "Needs a number" / "Needs attention" sections.

3. **MRR tracker.** Filter to `status: active`. Sum `mrr` per `currency` (ignore
   `TBD`). Write `Sales/mrr-tracker.md`: totals-by-currency, by-client table, and a
   "Needs a number" list of active clients with `mrr: TBD`.

4. **Credit pending.** Across ALL statuses, take clients with a numeric
   `credit_pending > 0`. Sum per currency. Write `Sales/credit-pending.md`:
   totals-by-currency, by-client table, and the `credit_pending: TBD` list.

5. **Quotation tracker.** Glob `archive/quotes/*.md` and `clients/*/quotes/*.md`.
   From each quote's frontmatter read `status, client, scope, amount, date`. Write
   `Sales/quotation-tracker.md`: all-quotes table, an "Open (sent, awaiting
   decision)" table with days-open, and a win-rate summary (accepted ÷ decided).

6. **Sales pipeline.** Filter to clients whose `status` is `prospect` OR whose
   `stage` is not `n/a`/`won`/`lost`. Build the table `Client | Status | Stage |
   Last activity` (last activity = git mtime of the client folder). Replace ONLY
   the lines between `## Pipeline` (after the comment marker) and `<!-- /generated
   -->` in `Sales/sales-pipeline.md`. **Leave the `## Activity log` section exactly
   as-is.**

7. **Stamp.** Set `last_generated:` in each written tracker's frontmatter to
   today's date (ask the user for the date or read it from the environment — do
   not invent one).

8. **Report.** Print a short summary: clients processed, active MRR per currency,
   total credit pending, open quotes, pipeline count, and the full "needs
   attention" list (missing CLIENT.md, placeholder frontmatter, TBD numbers).

## NOTES
- **Single source of truth.** Never write a per-client number into a tracker by
  hand — edit `clients/<slug>/CLIENT.md` and re-run. See `Sales/CLAUDE.md`.
- `--dry-run` is the safe way to preview before overwriting.
- This generator only reads `brain/` indirectly (none required) — it's a pure
  rollup over `clients/` and `archive/quotes/`.
