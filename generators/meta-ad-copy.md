# /meta-ad-copy

Generate Meta (Facebook + Instagram) ad copy variants for one client.

## READS
- brain/voice/                             # house voice + tone-by-channel
- prompts/platforms/meta.md                # format variants, ad copy structure, CTA library
- clients/<slug>/style-pack.md             # client voice overrides

## WRITES
- clients/<slug>/02-creative/copy/meta-ad-copy-YYYY-MM-DD.md

## INPUTS
- $slug — the client slug
- $objective — campaign objective (awareness / consideration / conversion)
- $offer — what the ad is selling
- $count — number of variants per format (default 5)

## STEPS
1. Read brain voice rules and the Meta platform prompt.
2. Read the client's style-pack for overrides.
3. Generate $count variants across primary text, headline, description, CTA.
4. Note placement notes (feed vs reel vs story).
5. Write to `clients/$slug/02-creative/copy/meta-ad-copy-YYYY-MM-DD.md`.

## STATUS
scaffold — flesh out under demand
