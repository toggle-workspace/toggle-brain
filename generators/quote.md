# /quote

Generate a client quote anchored to current pricing and past quotes.

## READS
- brain/pricing/rate-card-<geo>.md       # geo from clients/<slug>/CLIENT.md
- brain/pricing/bundles.md
- brain/pricing/line-items.md
- brain/pricing/discount-rules.md
- clients/<slug>/CLIENT.md               # for geo, scope context, billing
- archive/quotes/                         # 2 nearest past quotes for this client OR for same scope

## WRITES
- clients/<slug>/quotes/YYYY-MM-DD-<scope>.md
- (on send) archive/quotes/YYYY-MM-DD-<slug>-<scope>.md     # MANUAL — remind the user

## INPUTS
- $slug — the client slug under clients/
- $scope — short scope name (e.g. "tiktok-q3", "monthly-seo", "web-rebuild")
- --accept-stale (optional) — override the 90-day rate card staleness warning

## STEPS

1. Resolve the geo: read `clients/$slug/CLIENT.md`, extract `geo:` from frontmatter.
   If missing, ASK the user before proceeding.

2. Read the rate card for that geo. Check the `last_reviewed:` frontmatter:
   - If 90+ days stale and `--accept-stale` NOT passed: warn the user and stop.
     Show the date, suggest a refresh, allow override via flag.
   - If stale and `--accept-stale` IS passed: warn and continue.

3. Read bundles.md, line-items.md, discount-rules.md.

4. Confirm scope with the user: services included, duration, key deliverables.
   Surface the relevant case studies from brain/case-studies/_index.md for the same vertical.

5. Look up the 2 nearest past quotes from archive/quotes/:
   - First preference: same client (any scope).
   - Second preference: same scope (any client) in the same geo.
   - Surface them as "Anchors:" so the human can sanity-check the new quote against history.

6. Apply discount rules (multi-month, NGO, partner-referral, etc.).
   List which rules applied and why.

7. Render the quote into `templates/quotations/quotation.md` shape.
   Write to `clients/$slug/quotes/YYYY-MM-DD-$scope.md`.

8. End with a reminder:
   "When you send this quote, copy the final version to archive/quotes/YYYY-MM-DD-$slug-$scope.md
   so the next quote in this scope can anchor against it."

## NOTES
- Never inline a price from your head. Every figure traces back to a file in brain/pricing/.
- If a price is `TBD` in the rate card, surface that and ask the user.
- Quote format is markdown; PDF rendering happens downstream (out of scope here).
