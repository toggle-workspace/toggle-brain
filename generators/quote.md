# /quote

Generate a client quotation that renders **exactly** like Toggle's sent quotes
(see the QT-195 / QT-226 house format), as a print-faithful HTML file you can
edit, print, or export to PDF. Anchored to current pricing and past quotes.

## READS
- templates/quotations/quotation.html      # the print-faithful shell (DO NOT edit in place)
- brain/pricing/rate-card-<geo>.md         # geo from clients/<slug>/CLIENT.md
- brain/pricing/bundles.md
- brain/pricing/line-items.md
- brain/pricing/discount-rules.md
- clients/<slug>/CLIENT.md                  # geo, contact, address, currency, billing
- archive/quotes/                           # past quotes: price anchors + last QT number
- clients/*/quotes/                         # draft quotes (also a source of the last QT number)

## WRITES
- clients/<slug>/quotes/YYYY-MM-DD-<scope>.html   # the ONLY client-facing deliverable (print/export to PDF from here)
- clients/<slug>/quotes/YYYY-MM-DD-<scope>.md     # NOT a deliverable — a minimal frontmatter tracker stub for /sales-trackers + anchor memory
- (on send) archive/quotes/YYYY-MM-DD-<slug>-<scope>.{html,md}   # MANUAL — remind the user

> **HTML-only deliverable.** The `.html` is the only thing a client ever sees.
> The sidecar `.md` is infrastructure (tracker feed + price-anchor memory), NOT a
> rationale/companion doc — keep it minimal (frontmatter + a one-line scope
> summary). Do not write a verbose blockers/provenance markdown alongside the quote.

## INPUTS
- $slug — client slug under clients/ (ask if omitted; show the list to pick from)
- $scope — short scope name (e.g. "web-dev", "monthly-meta", "shopify-rate-card")
- --accept-stale (optional) — override the 90-day rate-card staleness warning

## INTERACTIVE INTAKE (ask every generation, in easy-to-pick format)

Run this as a short Q&A. Offer pickable options wherever possible; let the user
type custom answers. Confirm a summary before rendering.

**Q1 — Which client?**
List the folders under `clients/` (exclude `_TEMPLATE`) as numbered options.
The pick resolves `$slug`, then read `clients/$slug/CLIENT.md` for geo, contact
name, address, tel, currency. If any of those are missing, ask inline.

**Q2 — Quote type?** (sets the price-column header + whether there's a Total)
- (a) **Fixed / monthly** — column header `Price (<cur>)`, includes a **Total** row.
      (Meraaki QT-226 style: monthly retainer with line totals.)
- (b) **Hourly / rate card** — column header `Price / Hour (<cur>)`, **no Total** row,
      prices may read `150.00`, `250/Per Page`, `Starting from 500.00`.
      (JOT QT-195 style.)

  `<cur>` is the currency from `clients/$slug/CLIENT.md` geo: `RM` for MY,
  `S$` for SG. Don't hardcode RM for an SG client.

**Q3 — Which services, and the price for each?**
Build the line items one by one. For each service collect:
  - **Category** it sits under (the dark band — e.g. "Digital Package - Monthly
    Service Fee", "Website Development"). Group services under shared categories.
  - **Sub-header** (optional grey band — e.g. "Day to Day Facebook & Instagram
    Ads Campaign Management"). Omit if not needed.
  - **Service name** (the bold left cell — e.g. "Meta Platform Management").
  - **Description** + bullets (pull canonical wording from `brain/services/` and
    the rate card where it exists; never invent scope).
  - **Remark** (optional — e.g. lead-time / ad-spend cap notes).
  - **Price** — offer the rate-card value as the default; allow override. Accept
    `FOC`, `Starting from <n>`, `<n>/Per <unit>` as valid price strings.

Present rate-card / line-item / bundle options as a numbered pick list so the
user just selects, then confirms or edits the price. **Never inline a price from
your head** — every default traces to `brain/pricing/`. If a price is `TBD`,
surface it and ask.

**Q4 — Meta fields** (offer house defaults; confirm):
  - QT number — **auto-suggest the next one**: scan `qt:` frontmatter across
    `archive/quotes/` and `clients/*/quotes/*.md`, take the max `QT-###`, add 1.
    If none found, ASK for the last issued number (samples on hand: QT-226). Let
    the user override.
  - Date (default today, `DD/MM/YYYY`), Validity (default `1 month`),
    Payment Term (default `7 days`), Page (default `1 of 1`).
  - Signatory (default `Viknesh Sivanandan`), Toggle email
    (default `marketing@toggle.solutions`). Two tel numbers, don't conflate them:
    letterhead `{{TOGGLE_TEL}}` (default `012-5688681`) and the closing
    sign-off `{{SIGNOFF_TEL}}` (default `012-370 0775`).
  - Notes — default to the house notes for the chosen type:
      * Fixed/monthly: payment to Toggle Solutions bank account; Bank Account No
        (5622 2739 2962, Maybank).
      * Hourly/rate card: the 3 JOT-style notes (hourly min-charge + fixed-package
        scope; out-of-scope billed separately with approval; timelines depend on
        client inputs).
    Let the user edit.

## STEPS

1. Resolve `$slug` (Q1). Read `clients/$slug/CLIENT.md`; extract `geo:`,
   contact, address, currency. If `geo:` missing, ASK.

2. Read the rate card for that geo. Check `last_reviewed:`:
   - 90+ days stale and `--accept-stale` NOT passed → warn (show the date,
     suggest refresh) and stop.
   - stale and `--accept-stale` passed → warn and continue.

3. Read `bundles.md`, `line-items.md`, `discount-rules.md`, and
   `brain/services/` for canonical descriptions.

4. Run the interactive intake (Q2–Q4). Surface the relevant case studies from
   `brain/case-studies/_index.md` for the same vertical as supporting context.

5. Look up the 2 nearest past quotes from `archive/quotes/` as **Anchors:**
   - First preference: same client (any scope).
   - Second: same scope (any client) in the same geo.
   - Show them so the human can sanity-check the new quote against history.

6. Apply discount rules (multi-month, NGO, partner-referral, etc.). List which
   applied and why. For fixed/monthly, compute the **Total**.

7. **Render the HTML deliverable.** Copy `templates/quotations/quotation.html`,
   then fill it:
   - Replace every `{{TOKEN}}` (letterhead, client block, meta, signatory).
   - Set `{{PRICE_HEADER}}` per Q2; keep the `.total` row for fixed/monthly,
     **delete it** for hourly rate cards.
   - Build the `<tbody>`: one `.cat` band per category, optional `.sub` band,
     one `.item` row per service (duplicate/delete the commented blocks). Drop
     the `.remark` div when there's no remark; drop empty `<ul>` when no bullets.
   - **DRAFT vs send-ready (decide per quote):**
     * **Any price unconfirmed / `TBD`** (e.g. rate card still `TBD`, or a
       pre-generated batch draft) → KEEP the `.draftbar`, set `{{DRAFT_NOTE}}`
       to what's missing (e.g. "DRAFT — prices [TBD] pending rate-card-<geo>.md;
       confirm content tier + discounts before sending"), and wrap every
       unconfirmed price as `<span class="tbd">[TBD]</span>` (incl. the Total).
       Set frontmatter `status: draft`.
     * **Fully priced + send-ready** → DELETE the `.draftbar` line entirely and
       use plain price strings. A send-ready quote shows NO draft bar and NO
       `[TBD]`. Never fabricate a number to clear a `[TBD]` — leave it draft.
   - Fill `<ol>` notes from Q4. Add the geo tax-exclusion note (MY: "exclude SST"
     per `brain/geos/malaysia.md`; SG: "exclude GST" per `brain/geos/singapore.md`)
     and the "ad spend is pass-through" note when the scope involves paid media.
   - Keep the acceptance column for fixed/monthly; delete it for a simple rate card.
   Write to `clients/$slug/quotes/YYYY-MM-DD-$scope.html`.

8. **Write the tracker record** `clients/$slug/quotes/YYYY-MM-DD-$scope.md` with
   frontmatter read by `/sales-trackers` → `Sales/quotation-tracker.md`:

   ```yaml
   ---
   client: $slug
   scope: $scope
   qt: QT-###
   date: YYYY-MM-DD
   amount: <total>           # 0 for hourly rate cards
   pricing_type: fixed | hourly
   currency: <from clients/$slug/CLIENT.md>
   status: draft            # → sent → accepted | declined | expired
   deliverable: YYYY-MM-DD-$scope.html
   ---
   ```
   (This matches `archive/quotes/README.md`. Hourly quotes use `amount: 0` +
   `pricing_type: hourly` so `/sales-trackers` value rollups don't choke on a
   non-numeric amount.)
   Body: a one-line scope summary + the line-item list (so the record is
   human-readable without opening the HTML).

9. **Tell the user how to export:** open the `.html` in Chrome → Print → A4,
   "Background graphics" ON, "Headers and footers" OFF → Save as PDF. Or headless:
   `chrome --headless --print-to-pdf=quote.pdf --no-pdf-header-footer <file>.html`
   (verified: a dense full-page quote like QT-226 fits on one A4 page.)

10. End with the send reminder:
    "When you send this quote: (1) set `status: sent` in the `.md` frontmatter,
    (2) copy BOTH the final `.html` and `.md` to
    `archive/quotes/YYYY-MM-DD-$slug-$scope.*` so the next quote can anchor
    against it and the QT counter advances, (3) run `/sales-trackers`."

## NOTES
- Output must match the house format (QT-195 / QT-226): dark category bands,
  grey sub-headers, right-aligned prices, dark Total row (fixed/monthly only),
  numbered notes, "Yours faithfully" + acceptance block.
- Never inline a price from your head. Every figure traces to `brain/pricing/`.
- If a price is `TBD` in the rate card, surface it and ask.
- Two quote types only — don't add more mode flags; if a new output shape is
  needed, that's a new template, not a branch here.
- **Single client per run.** To pre-generate ready-to-send HTML drafts for the
  whole client book each month, use `generators/monthly-quotes.md` (`/monthly-quotes`)
  — it batches this same render across every active client. Don't add a `--all`
  flag here.
