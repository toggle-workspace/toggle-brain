# `generators/` — slash-command recipes

Generators are the entry points. They are *recipes Claude executes*, not content.

---

## The rules of this zone

1. **Every generator opens with a `READS:` manifest** listing only the files it needs. Surgical context, not bulk.
2. **Generators ≠ prompts.** A generator is a *recipe*; a prompt is *library content*. Don't put reusable snippets here — put them in `prompts/`.
3. **Generators read from `brain/` and write to `clients/<slug>/`.** They never write back into `brain/`.
4. **One generator per output type.** `/quote`, `/proposal`, `/tiktok-hooks`, `/caption`, etc. If you find yourself adding mode flags to bend a generator, split it.

---

## Anatomy of a good generator

```markdown
# /quote

## READS
- brain/pricing/rate-card-<geo>.md            # geo from clients/<slug>/CLIENT.md
- brain/pricing/bundles.md
- brain/pricing/line-items.md
- brain/pricing/discount-rules.md
- clients/<slug>/CLIENT.md
- archive/quotes/                              # 2 nearest past quotes for the client/scope as anchors

## WRITES
- clients/<slug>/quotes/YYYY-MM-DD-<scope>.md

## STEPS
1. Read READS manifest. Refuse if rate card is 90+ days stale (override: --accept-stale).
2. Confirm scope with the user (services + duration + geo).
3. Look up the 2 nearest past quotes for this client (or for similar scope) as anchors.
4. Apply discount rules.
5. Render via templates/quotations/quotation.md.
6. Write to clients/<slug>/quotes/.
7. Remind the user to copy the final into archive/quotes/ on send.
```

---

## What's in here

- `quote.md` — fully fleshed; first generator stood up.
- `proposal.md`, `tiktok-hooks.md`, `meta-ad-copy.md`, `caption.md`, `email.md`, `landing-page.md`, `image-prompt.md`, `video-prompt.md`, `monthly-report.md` — scaffolded; build out under demand.

Don't pre-build generators no one is calling. **Build under demand.**
