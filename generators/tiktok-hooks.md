# /tiktok-hooks

Generate a batch of TikTok hooks for one client, on-brand and platform-correct.

## READS
- brain/voice/                             # house voice + tone-by-channel
- prompts/platforms/tiktok.md              # hook patterns, format rules, CTA library
- clients/<slug>/style-pack.md             # client voice overrides + visual rules

## WRITES
- clients/<slug>/02-creative/copy/tiktok-hooks-YYYY-MM-DD.md

## INPUTS
- $slug — the client slug
- $topic — what the hooks are pitching (product, offer, theme)
- $count — number of hook variants (default 10)

## STEPS
1. Read brain voice rules and the TikTok platform prompt.
2. Read the client's style-pack for overrides.
3. Generate $count hooks, mixing patterns from `prompts/platforms/tiktok.md`.
4. Tag each hook with its pattern (curiosity / contrarian / stat / demo / etc.).
5. Write to `clients/$slug/02-creative/copy/tiktok-hooks-YYYY-MM-DD.md`.

## STATUS
scaffold — flesh out under demand
