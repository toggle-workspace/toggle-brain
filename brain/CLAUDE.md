# `brain/` — canonical knowledge

This is Toggle's single source of truth. Services, pricing, voice, positioning, case studies, team, process — every fact in this repo that gets cited more than once lives here, in exactly one file.

---

## The rules of this zone

1. **Cite the path; never inline values.** If a generator or client output needs a price, voice rule, or service description, it reads it from here by path — not by copy-paste. One edit propagates.
2. **One concept per file.** No `SERVICES.md` monoliths. One service per file. One case per file. One vertical per file.
3. **No client-specific content here.** Client overrides live in `clients/<slug>/style-pack.md` and `clients/<slug>/CLIENT.md`. The brain is generalised knowledge.
4. **No tactical artifacts here.** A hook, a draft ad, a draft email belongs in `prompts/` (reusable) or `clients/<slug>/02-creative/` (delivered). The brain holds *rules*, not *instances*.
5. **Volatile files carry `last_reviewed: YYYY-MM-DD` frontmatter.** Stale brain content is worse than missing brain content.

---

## What's in here

| Folder / file | Holds |
|---|---|
| `services/` | One file per service (performance marketing, SEO, content, web dev, creative production, etc.) |
| `pricing/` | Rate cards (SG, MY), bundles, line items, discount rules, mandatory `CHANGELOG.md` |
| `voice/` | House voice, tone-by-channel, do-say, never-say |
| `positioning/` | Elevator pitches, differentiators, competitors |
| `verticals/` | Higher-ed, healthcare, fnb, b2b-saas, insurance, banking, e-commerce, real-estate |
| `geos/` | Malaysia, Singapore — regulatory notes, channel mix, currency, cultural |
| `case-studies/` | One file per case + tagged `_index.md` |
| `team/` | `roster.md` + `bios/<name>.md` |
| `process.md` | Engagement models (audit, partnership, intensive, expansion, lab) |
| `partners-stack.md` | Tools, vendors, freelancers we work with |
| `glossary.md` | Acronyms, jargon — anything a new hire would Google |

---

## When you're not sure if it belongs here

Ask: **does more than one client / generator / prompt need to reference this fact?**

- Yes → it belongs in `brain/`.
- No → it belongs in the client folder or the prompt library.

If the same fact is showing up in 2+ client folders, promote it into `brain/` and reference it from both.
