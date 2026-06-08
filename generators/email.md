# /email

Generate email copy for one client (lifecycle, broadcast, or outreach).

## READS
- brain/voice/                             # house voice + tone-by-channel
- clients/<slug>/style-pack.md             # client voice overrides

## WRITES
- clients/<slug>/02-creative/copy/email-YYYY-MM-DD.md

## INPUTS
- $slug — the client slug
- $type — lifecycle / broadcast / outreach / nurture
- $goal — what the email should drive
- $count — number of subject lines / body variants (default 3)

## STEPS
1. Read brain voice rules.
2. Read the client's style-pack for overrides.
3. Generate subject lines, preview text, body variants.
4. Note send-time and segment recommendations where relevant.
5. Write to `clients/$slug/02-creative/copy/email-YYYY-MM-DD.md`.

## STATUS
scaffold — flesh out under demand
