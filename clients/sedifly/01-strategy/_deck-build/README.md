# Sedifly Meta plan deck (4 Nov 2026)

Builds `Desktop\Sedifly\Sedifly - Meta Plan and Creative Review - Nov 2026.pptx` on the Toggle dark deck master (same theme as the SignWell deck).

1. `npm i pptxgenjs@3.12.0 jszip` in this folder
2. `node check.js` (must report 0 layout problems)
3. `node build.js` then `node fix-bullets.js "<path to pptx>"` (colors the list numbers blue)

`meta-data/` holds the read-only pull of act_803550292448381 (TOGGLE token, 5 Nov 2025 to 3 Nov 2026). Re-run `meta-data/pull.js` after `source .env` at the repo root.

## 5 Nov 2026: launch plan deck + ad tracker

- Deck: `Sedifly Plans\Sedifly - Meta Launch Plan - 5 Nov 2026.pptx`. Edit `slides3.js` (slides) or `prim.txt` (primitives), then run `rebuild3.ps1` (concat to `build3.js`, build, color bullets with `fix-bullets3.js`). `rebuild3.ps1 -render <dir>` also checks overflow and exports PNGs via `render3.ps1`. Fonts were embedded afterwards with PowerPoint COM `SaveAs(path, 24, -1)`; redo that after a rebuild.
- Tracker: `Sedifly Plans\Sedifly - Meta Ads Tracker.xlsx`, built by `node tracker.js <pull folder>`. Rebuilding overwrites anything Sedifly typed into it, so only rebuild before it is shared.
- Inventory data: read-only pull of act_803550292448381 on 4 Nov 2026 about 6pm SGT (s_campaigns, s_adsets, s_ads, s_ins_ad_30d JSON).

## In the repo (5 Nov 2026)

This folder is a copy of `Desktop\Sedifly\Sedifly Plan Nov 2026\_deck-build` without `node_modules`. The scripts write to the Desktop paths above; run `npm i` here first. The decks they produced live one level up in `clients/sedifly/01-strategy/`, and the tracker in `clients/sedifly/03-media/`.
