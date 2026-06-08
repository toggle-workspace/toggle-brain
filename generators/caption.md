# /caption

Generate post captions for one client across organic channels.

## READS
- brain/voice/                             # house voice + tone-by-channel
- clients/<slug>/style-pack.md             # client voice overrides

## WRITES
- clients/<slug>/02-creative/copy/captions-YYYY-MM-DD.md

## INPUTS
- $slug — the client slug
- $platform — instagram / linkedin / tiktok / threads / twitter
- $topic — what the post is about
- $count — number of caption variants (default 5)

## STEPS
1. Read brain voice rules.
2. Read the client's style-pack for overrides.
3. Generate $count caption variants tuned to $platform norms.
4. Include hashtag pack where platform-relevant.
5. Write to `clients/$slug/02-creative/copy/captions-YYYY-MM-DD.md`.

## STATUS
scaffold — flesh out under demand
