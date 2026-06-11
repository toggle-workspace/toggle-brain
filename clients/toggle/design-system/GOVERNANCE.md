# Governance & Rollout — MVP (Stage 12)

> One page, sized for 12 people. Deferred to v2 by design: Style Dictionary, deprecation policy, semver, 30-60-90 client-migration plans, Storybook.

## Where the masters live

| Surface | Location | Status |
|---|---|---|
| **Source of truth (all specs + tokens + artifacts)** | `Toggle Brain/clients/toggle/design-system/` — moves to `brain/design-system/` on Zaid's final approval of the system (treat as canonical from that day; add `last_reviewed:` frontmatter and join the quarterly brain-sync) | built |
| Brand assets (wordmark, icons, illustrations) | `Toggle Brain/assets/{logos,icons,illustrations}/` | filed |
| **Team-facing mirror (pre-flight #4: Google-suite-first)** | Drive: `Toggle Design System / 01 Identity / 02 Tokens / 03 Components / 04 Sales Templates / 05 Marketing Assets / 06 Voice & Governance` — Docs for the .md files, Slides for proposal/deck/one-pager/report masters, **Sheets for the token tables** (hex + pt columns; "shape color — NEVER text" labeling per TOKENS) | to build on approval |
| Figma library | v2 — tokens.json imports via the collapse script (TOKENS consumption notes) | deferred |
| Web CSS variables | one file generated from tokens.json (generators skip `print`; hand-write reduced-motion) | with next site touch |

## Who owns what

| Role | Owner |
|---|---|
| System owner (final call on amendments, device budget, canon) | **Zaid** |
| Sales masters in use (proposal, deck, one-pagers, audit) | **Viknesh** — copies per deal, never edits masters |
| Token edits | Zaid only; every change = tokens.json + TOKENS.md + a line in the TOKENS §8 register |
| Pricing numbers (the TBDs) | Viknesh + Zaid, per `brain/pricing/CHANGELOG.md` rules |
| Quarterly review | brain-sync ritual — `last_reviewed:` refresh, drift check against the live site |

## How new things get made

1. **Need a new instance** (proposal, post, report)? Copy the master, follow the in-file recipes, run `VOICE-IN-DESIGN.md` before sending. Never edit a master to make an instance.
2. **Need a new component/variant?** Say so in the team channel with the use case → Zaid accepts/rejects → built on the template (`07-component-spec-template.md`), tokens only, registered in TOKENS §8 if anything is minted. A fourth signature device requires a v2.
3. **Found drift** (off-hex, off-type, strikethrough sprawl)? Flag it; the drift table in BRAND-IDENTITY §4 is the ledger.

## Current version pointer

**v1.0-rc — 2026-06-11.** All 12 stages built. Pending for v1.0 final: Zaid's batch sign-off list (see the Stage-12 wrap-up message), the deferred adversarial QA passes (6d–12), the loop-form trace, pricing TBDs, and the Drive mirror build.

## Onboarding a teammate

30 minutes: read `VOICE-IN-DESIGN.md` (5 min) → walk the Drive folder (10) → rebuild one LinkedIn stat card from the master (15). Done.
