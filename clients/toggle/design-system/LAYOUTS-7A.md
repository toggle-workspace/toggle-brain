# Layouts 7a — Homepage · Service detail · Case study detail (Stage 7a)

> The three sales-critical web layouts, composed entirely from Stage 6 components — no new primitives. Live artifact (all three pages, dark/web-default, responsive): **`layouts-7a.html`**. Web is dark-only (live-site canon); light variants of these pages are out of scope by design — light mode's home is proposals/reports.
>
> Grid: max content 1176px · section padding 72px top (56 at ≤640) · page margins 32px (20 at ≤640) · breakpoints per tokens (860 nav collapse inherited from 6c).

---

## Page 1 — Homepage (formalizes the live site)

**Belief:** *"In one scroll: what they refuse to be, what they do, who they did it for, and the one next step."*

| # | Section | Components | Rules |
|---|---|---|---|
| 1 | Nav | 6c nav | CTA = the page's standing primary |
| 2 | Hero | 6c homepage hero | THE strikethrough (site's only one) · sub ≤56ch · one CTA · logo wall (named clients, no stars) |
| 3 | Services | centered section header + 6c grid3 of 6b service cards | 6 cards above the fold of the section + "View all 12 services →" ghost link — never all 12 on the homepage (*Unpretentious*) |
| 4 | Case studies | kicker header + 3 case-study cards | Real clients, stat-lines as receipts |
| 5 | System rows | 2 split rows (image ↔ copy alternating) | "Built to Grow the Whole Business" / "Senior-Led, In-House Execution" — live-site copy; duotone imagery |
| 6 | FAQ | 6d accordion, 3–5 questions | Objection-handling only; the honest retainer answer stays |
| 7 | Consultation | CTA band (callout surface) — promise copy + checklist left, form card right | The 6a form embeds here on the real site; one primary |
| 8 | Footer | 6c footer | |

Order is binding: **proof before ask** — services and case studies always precede the consultation band.

## Page 2 — Service detail (worked example: Performance Marketing)

**Belief:** *"This service is a method with receipts, not a line item."*

| # | Section | Components | Rules |
|---|---|---|---|
| 1 | Nav | 6c | `aria-current` on Services |
| 2 | Page hero | 6c page hero with `[ Services ]` kicker-seal | The page's one seal |
| 3 | How we run it | kicker header + 6d dot-timeline (3 phases) | Phases carry real method copy (cold launch / conversion learning / efficiency scaling — the Sunway bidding phases generalized) |
| 4 | The receipts | 3-up stat grid (one focal) | Stats must belong to this service; receipts named |
| 5 | Proof + CTA | one case-study card + compact CTA band | "Where is growth stuck?" — the diagnostic ask, not "hire us" |
| 6 | Footer slim | 6c base bar | |

Every service page uses this skeleton — only copy, icon, stats, and the linked case study change (12 pages, one template).

## Page 3 — Case study detail (worked example: UNITAR)

**Belief:** *"I can retrace exactly what they did and what it produced — this is documentation, not bragging."*

| # | Section | Components | Rules |
|---|---|---|---|
| 1 | Nav | 6c | |
| 2 | CS hero | 6c case-study hero | Receipts in the hero (focal + 2); kicker = CLIENT · VERTICAL |
| 3 | Editorial open | prose block, 720px measure | **Editorial pacing**: 15.5/1.65 body, one idea per paragraph — Stripe-Press cadence, not landing-page bullets |
| 4 | The three moves | 6d dot-timeline (challenge → solution → result) | The result node carries the numbers |
| 5 | Architectural figure | Stage 4 before/after step-form (front-rank, indexed) | One architectural moment per case study — the threshold rule (CHARTS.md) |
| 6 | Quote | 6b testimonial (figure/blockquote) | Client-approved only; composite stays labeled until then |
| 7 | What compounds | prose close | The long-term-over-short-term value made concrete |
| 8 | Next/prev | nextcase nav | Keep the reader in the work |
| 9 | Footer slim | | |

Prose measure 720px; figures/quotes share it. No sidebars, no share buttons, no reading-time badges.

## Responsive (verified in artifact)

≤860: nav collapses (6c) · grids 3→2. ≤640: everything single-column, margins 20px, hero 64px top, cs-hero stacks image-below, stat rows wrap. The 500px headless floor approximates 375 — true-device check rides the Stage 7 QA pass.

## What 7a deliberately does NOT do

No carousels (the live site's case-study slider becomes a static 3-grid — motion is Stage 10's call), no exit-intent modals, no chat widgets, no newsletter capture. One form, one promise.
