# /monthly-quotes

Pre-generate this month's **ready-to-send HTML quotes for the whole client book**,
so the sales team starts the month with a drafted quote per client instead of
building each one from scratch. It is `/quote` run in batch: same house format,
same print-faithful HTML, one draft per active client — anchored to that client's
own past quotes.

> **Relationship to `/quote`.** `/quote` = one client, interactive. `/monthly-quotes`
> = every active client, non-interactive, anchored to history. Both render the
> identical `templates/quotations/quotation.html` shell. Fix the render in
> `quote.md`; this generator inherits it.

## READS
- clients/*/CLIENT.md                       # who's active, geo, currency, contact, recurring scope, mrr
- clients/<slug>/quotes/*.{md,html}         # each client's prior quotes (latest = the scope to re-issue)
- archive/quotes/*.md                        # sent-quote anchors per client (price memory + last QT number)
- brain/pricing/rate-card-<geo>.md           # per client geo
- brain/pricing/bundles.md, line-items.md, discount-rules.md
- templates/quotations/quotation.html        # the print-faithful shell (DO NOT edit in place)

## WRITES
- clients/<slug>/quotes/YYYY-MM-<scope>.html # one HTML draft per active client (the deliverable)
- clients/<slug>/quotes/YYYY-MM-<scope>.md   # minimal tracker stub (frontmatter for /sales-trackers; NOT a deliverable)
- (never) archive/                            # batch never archives — archiving happens on send, per quote
- prints a run summary (drafted / skipped / needs-attention) to the user

## INPUTS
- --month YYYY-MM (optional) — billing month to generate for; default = current month (ASK for it; don't invent a date)
- --client <slug> (optional, repeatable) — limit to specific clients instead of the whole book
- --status <status> (optional) — which clients to include; default `active`
- --accept-stale (optional) — pass through `/quote`'s 90-day rate-card staleness override
- --dry-run (optional) — list what WOULD be generated (per-client scope + price source) without writing files

## STEPS

1. **Resolve the month.** Read `--month`, else ASK the user for `YYYY-MM` (do not
   invent a date). All deliverables this run share that month in the filename and
   the quote `Date:`.

2. **Select clients.** Read every `clients/*/CLIENT.md` frontmatter (skip
   `_TEMPLATE`). Keep those matching `--status` (default `status: active`), or the
   `--client` allow-list if given. For each, capture: `slug, client, geo, currency,
   contact, recurring scope, mrr`.

3. **Per client — find the scope to re-issue.** This is a *recurring* quote, so the
   scope comes from history, not invented:
   - Latest quote in `clients/<slug>/quotes/` or `archive/quotes/` for this client
     → re-issue the same line items / bundle as the new month's draft (it's the
     anchor). Advance the date; keep the structure.
   - No prior quote AND a clear recurring engagement in `CLIENT.md` (e.g. a retainer
     bundle) → draft from that scope + the rate card.
   - No prior quote AND no clear recurring scope → **SKIP**, add to "needs
     attention: no scope to re-issue (give me a past quote or set the retainer
     scope in CLIENT.md)". Never guess a scope.

4. **Per client — price it.** Pull defaults from the geo rate card / bundles, same
   rules as `/quote` step 6 (apply multi-month, first-month waiver, etc.; list
   which fired). Carry forward the *price* from the client's last quote as the
   anchor default when the rate card is still `TBD`. **Never inline a price from
   your head.**

5. **Per client — render the HTML** via `quote.md` step 7 into
   `clients/<slug>/quotes/YYYY-MM-<scope>.html`:
   - **All prices confirmed** → send-ready: DELETE the `.draftbar`, plain prices.
     The sales team can send as-is.
   - **Any price `TBD`/unconfirmed** → KEEP the `.draftbar` with `{{DRAFT_NOTE}}`
     naming what's missing, and `<span class="tbd">[TBD]</span>` on each open price.
     `status: draft` in the stub. (Today, with `brain/pricing/` all `TBD`, expect
     most clients to land here until the rate cards are filled.)
   - Write the minimal `.md` tracker stub (same frontmatter schema as `quote.md`
     step 8: `client, scope, qt, date, amount, pricing_type, currency, status,
     deliverable`). QT number: continue the global counter — max `QT-###` across
     `archive/quotes/` + `clients/*/quotes/*.md`, +1 per quote generated this run.

6. **Honor `--dry-run`.** If set, print the per-client plan (scope source, price
   source, draft-vs-send-ready, QT to assign) and write nothing.

7. **Run summary.** Print a table: `Client | Scope | Send-ready? | QT | Price source`,
   then three lists — **Drafted** (send-ready), **Drafted (needs prices)** (draft
   bar + TBD), and **Skipped / needs attention** (no scope, missing geo, stale
   rate card without `--accept-stale`). End with: "Review the draft-bar quotes,
   fill the `[TBD]`s, then the sales team can send. On send, per quote: set
   `status: sent`, copy `.html`+`.md` to `archive/quotes/`, run `/sales-trackers`."

## NOTES
- **Drafts, not sends.** This generator only *prepares*. Nothing is sent, nothing
  is archived. A human reviews each draft and sends it; archiving + QT advance
  happen at send time (same protocol as `/quote`).
- **History is the anchor.** The quality of the batch is only as good as
  `archive/quotes/` — the more past quotes per client on file, the more drafts come
  out send-ready instead of `[TBD]`. Feed the archive.
- **Idempotent per month.** Re-running for the same `--month` overwrites that
  month's drafts in place (same filenames). Safe to re-run after filling prices.
- **One render path.** Don't reimplement the HTML here — defer to `quote.md` step 7
  and the shared template so the house format stays identical across both.
- Reads `brain/` only for pricing; it's otherwise a loop over `clients/` +
  `archive/quotes/`, like `/sales-trackers`.
