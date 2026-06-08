# `brain/pricing/` — canonical pricing

The most-cited and most-load-bearing files in the repo. Quotes flow from here.

---

## The rules of this zone (extra strict)

1. **`CHANGELOG.md` is mandatory on any edit.** PRs are blocked by the template otherwise.
2. **Update `last_reviewed: YYYY-MM-DD` on the file you touched.** Stale prices ship wrong quotes.
3. **CODEOWNERS hard-gates this folder.** PR + 1 reviewer required (see `.github/CODEOWNERS`).
4. **Currency is in the filename.** `rate-card-sg.md` = SGD. `rate-card-my.md` = MYR. Never mix currencies inside a file.
5. **`/quote` warns if a rate card is 90+ days stale.** It does not refuse — pass `--accept-stale` after a human glance.

---

## What's in here

| File | Holds |
|---|---|
| `rate-card-sg.md` | Singapore rate card in SGD |
| `rate-card-my.md` | Malaysia rate card in MYR |
| `bundles.md` | Named packages ("TikTok Starter 8/mo", "Growth Audit", etc.) |
| `line-items.md` | Atomic units: 1 reel, 1 static, 1 ad set, 1 landing page, 1 audit hour |
| `discount-rules.md` | Retainer %, multi-month, NGO, edu, first-month, partner referrals |
| `CHANGELOG.md` | Mandatory audit trail for every pricing edit |

---

## Adding a new geo

When Toggle starts pricing in a new currency:

1. Create `rate-card-<geo>.md` (e.g. `rate-card-id.md` for Indonesia in IDR).
2. Add an entry to `CHANGELOG.md`.
3. Update `generators/quote.md` `READS:` manifest to know the new geo exists.
4. Update `brain/geos/<geo>.md` with channel mix and regulatory notes.

---

## When you read pricing from a generator

Always read the geo-specific rate card based on `clients/<slug>/CLIENT.md`'s declared geo. If the client geo is missing, ask the user before guessing.
