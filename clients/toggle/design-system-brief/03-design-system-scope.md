# Design system scope — what we're shipping

> Full spec of deliverables. This is the checklist the design system must satisfy at the end of all 10 stages.

## The five layers

```
┌─────────────────────────────────────────────────┐
│  5. APPLICATIONS                                │
│     Proposals · Decks · Reports · Ads · Social  │
│     Video · Email · Web pages                   │
├─────────────────────────────────────────────────┤
│  4. PATTERNS / TEMPLATES                        │
│     Page layouts · Slide layouts                │
│     Asset templates · Video bumpers             │
├─────────────────────────────────────────────────┤
│  3. COMPONENTS                                  │
│     Buttons · Inputs · Cards · Stats · Tables   │
│     Navigation · Hero blocks · Data viz         │
├─────────────────────────────────────────────────┤
│  2. SYSTEM PRIMITIVES                           │
│     Icons · Illustration system · Imagery rules │
│     Motion · Charts                             │
├─────────────────────────────────────────────────┤
│  1. FOUNDATIONS / TOKENS                        │
│     Color · Type · Space · Radius · Shadow      │
│     Border · Motion · Z-index                   │
└─────────────────────────────────────────────────┘
```

Each layer below depends on every layer above being locked. Don't skip ahead.

## Layer 1 — Foundations / tokens (complete taxonomy)

Three-tier semantic naming: `category.role.variant[.state]`. Every color token MUST have explicit `.dark` and `.light` siblings.

- **`color.brand`** — primary blue (locked in pre-flight), wordmark white/black.
- **`color.surface`** — 4 tints per mode (canvas / card / raised / overlay). Dark mode uses **tint elevation**, not shadow.
- **`color.text`** — primary / body / secondary / muted / inverse / link / link-visited.
- **`color.border`** — subtle / default / strong / focus.
- **`color.state`** — hover / active / disabled / focus-ring / error / success / warning / info. Orthogonal to accents — forms need these regardless of the "categorical-not-good/bad" accent rule.
- **`color.accent`** — categorical (`cat-1` through `cat-5`: blue / teal / pink / purple / orange / slate). Both dark and light hex pairs required — the Sunway proposal proves light; dark mode pairs must be verified for contrast.
- **`color.dataviz`** — 5-categorical palette + gridline + axis + banding. Feeds the architectural data primitives (Layer 2).
- **`color.print`** — CMYK equivalents for brand + accents (PDF and printed leave-behinds).
- **`opacity`** — 12-step alpha scale (0–100).
- **`typography`** — ONE family (locked in pre-flight). Full weight set. Scale: display / h1 / h2 / h3 / h4 / body-lg / body / small / caption / overline / numeric-display. Italic wordmark is a separate brand mark.
- **`space`** — 4pt baseline, 12 steps: 4/8/12/16/24/32/48/64/96/128/160/192.
- **`radius`** — 0 / 4 / 8 / 12 / 16 / pill. Rule mapping radius → component class.
- **`border-width`** — 0 / 1 / 2.
- **`elevation`** — light mode shadow tokens (3 levels max); dark mode uses `color.surface` tint references.
- **`motion`** — 3 durations (fast 150 / base 250 / slow 400 ms), 1 base easing `cubic-bezier(0.22, 1, 0.36, 1)`, 1 reserved "toggle flip" curve, reduced-motion fallbacks per duration.
- **`z-index`** — base / dropdown / sticky / overlay / modal / toast / tooltip.
- **`breakpoint`** — 375 / 768 / 1024 / 1440.
- **`focus-ring`** — color / width / offset / style.
- **`print`** — page margins, bleed 3mm, safe area, gutter (for proposal PDF master + business card).

Contrast ratios documented for every text-on-surface pairing. WCAG AA minimum (≥ 4.5:1 body, ≥ 3:1 large text).

## Layer 2 — System primitives

- **Iconography** — full grid math locked (24px primary; scale 16/20/24/32 with use-case per size). ONE stroke weight (pick 1.5 OR 2 with rationale). Endcap + join locked. Chip wrap math locked (40px outer, 8px padding, 12px radius). Optical centering rule for asymmetric glyphs. Set of 12 service icons (matching live site) + ~18 utility icons.
- **Isometric illustration system** — the signature 3D wireframe blocks codified with full construction grammar: true 2:1 isometric projection (30°/30° angles), butt endcap, miter join, no hidden-line occlusion, lowest-front-face fills solid in primary blue, strokes merge cleanly at junctions, stroke width scales metrically with artwork. THREE canonical composite forms (cut from earlier 6): step-form, loop-form, channel-stack-form. Construction grammar lets the team build more as needed.
- **Architectural data primitives** — the layer that makes the architecture motif a **system** instead of a sticker. Every chart primitive has both a flat rendering AND an architectural rendering (see Layer 2 charts below). Stat blocks render as load-bearing columns; channel mixes as stacked blocks; funnels as stepped axonometric; loops as 4-block circuits. **Architectural is default; flat is fallback.**
- **Photographic imagery** — ONE treatment rule (locked in pre-flight; recommended: duotone for hero/marketing, untreated for in-context operator portraits). Portrait framing rule: rectangular not circular for sales-critical surfaces; editorial / HBR-profile lighting; subjects in context (architect's desk, ledger, monitors). Captions carry tenure markers.
- **Charts & data-viz** — full primitive set: bar (vertical + horizontal) / grouped bar / stacked bar / line / area / donut / funnel / stat block / sparkline / comparison table with accent stripe / lead-quality loop / channel-mix stacked-blocks / before/after stat pair. Specify gridline rule (color + opacity, dark + light), axis line rule, tick treatment, label placement, legend pattern, donut center, line markers, area-fill opacity, sparkline simplifications, number formatting (RM prefix, K/M thresholds, decimal precision), empty-state, loading-state.

## Layer 3 — Components

- **Buttons** — primary / secondary / ghost / icon-only. Sizes: sm / md / lg. With/without arrow.
- **Inputs** — text / email / phone / select / textarea / file / checkbox / radio. Dark + light.
- **Cards** — base / stat / service / case study / persona-segment / testimonial / team-member.
- **Tags / chips** — neutral / accent / status.
- **Stat / metric block** — single hero / 3-up / 4-up grid. Number formatting rules.
- **Tables / data grids** — for proposals + reports. Header style, row banding, total row, accent-stripe row.
- **Navigation** — top nav (web), section nav (deck), footer.
- **Hero blocks** — homepage hero (with strikethrough device), case study hero, page hero.
- **Section headers** — with bracket device, with kicker, without.
- **FAQ accordion**.
- **Form** — multi-step + single-step.
- **Testimonial card** — quote + attribution + logo.
- **Client logo wall**.

## Layer 4 — Patterns / templates

### Web

- Homepage (the existing layout, formalized)
- Service detail page
- Case study detail page (with the dot-timeline)
- About / team page
- Contact / consultation booking page

### Sales artifacts (the close-rate stack — highest leverage)

- **Proposal master** (light mode, ~14-slide structure from Sunway TES) + **Contrarian Slide Library** (strikethrough framing, disqualifier, assumption-buster table). The canonical worked example — produced in Stage 2, BEFORE tokens. Tokens are extracted from this artifact, not the other way around.
- **Company deck master** (dark mode, ~13-slide structure from current Company Profile, with architectural data primitives wherever data appears)
- **Audit deliverable master** (the Free Brand Audit output that converts top-of-funnel — prospects upgrade to paid based on this artifact's quality)
- **Case study one-pager** (dark mode, dense) + ONE populated per existing client: UNITAR, CIMB, Singlife, Kualesa, Al Hidayah, EduKids
- **Pricing & packages table** (5 engagement models — Growth Audit / Integrated Partnership / Campaign Intensive / Market Entry / Creative Performance Lab — with pricing anchor logic, even if specific prices stay TODO)
- **Pre-meeting + post-meeting email sequences** (3 templates each — set context, recap, next steps)

### Reports

- **Monthly client report master** (light mode — KPI dashboard, channel breakdown, learnings, next moves)
- **Weekly leads breakdown** (UNITAR-style — codify what Zaid already does manually)

### Marketing assets (LinkedIn-primary — Toggle's top-of-funnel)

**v1 (MVP):**
- LinkedIn stat card (1080×1080, 1080×1350) — 3 variants (single big stat, 3-stat hero, before/after) — uses Layer 2 architectural primitives
- LinkedIn carousel (10-slide template — hook / problem / 3-point insight / proof stat / micro case / CTA)
- Meta + Google ad creative templates (3 sizes each: 1080×1080, 1080×1350, 1200×628) × 3 hook formats
- Email signature (3 variants — Zaid, Viknesh, generic team)
- OG image / favicon / Twitter/X card for toggle.solutions
- Business card (digital + print spec)

**v2 (post-MVP — unless TikTok/IG becomes a primary channel):**
- Instagram square + story templates
- TikTok / Shorts thumbnail + lower-thirds

### Video

- 5s intro bumper (isometric blocks assembling)
- 3s outro bumper (CTA card)
- Talking-head lower-thirds
- Stat-reveal motion for data-driven shorts
- Transition wipes

### Internal documents

- Pitch deck slide library (for ad-hoc decks beyond the Company Profile)
- Internal SOP doc style (for the Toggle team's own playbooks)
- Quote / invoice design

## Layer 5 — Applications

Document at least one worked example per template above, using real Toggle copy (UNITAR, CIMB, Singlife, Kualesa, Al Hidayah, EduKids). No Lorem Ipsum.

## Cross-cutting

- **Voice-in-design playbook** — the 1-pager mapping voice adjectives to design decisions.
- **Anti-patterns gallery** — concrete examples of what NOT to do.
- **Governance** — file/folder structure, naming conventions, who can edit, deprecation policy, 30-60-90 rollout plan.
- **Accessibility** — WCAG AA minimum for web; AA color contrast for all text; keyboard navigation specced.
- **Localization** — Malay (BM) text considerations (longer strings than English in ~20% of cases) — type scale must absorb this without breaking layout. Tamil/Mandarin out of scope for now.

## Out of scope (do NOT design these in v1)

- **Toggle Bespoke sub-brand identity.** Bespoke is the anti-retainer wing (different buyer, different sale, different promise) — needs its own identity work as a separate engagement. The spine designed here is Toggle Solutions only. Do NOT pre-allocate accent shifts, type ramps, or sub-brand variants.
- **Style Dictionary / automated Figma↔Token sync.** Defer to v2. v1 ships token JSON the team can manually paste into Figma Variables.
- **Storybook / live component playground.** Defer to v2.
- **Deprecation policy + semver + 30-60-90 client migration plan.** Defer to v2. v1 governance is a single page.
- **After Effects keyframe-table video specs.** Defer until a dedicated video editor is engaged. v1 ships cubic-bezier + duration + dimension specs sufficient for a freelance editor.
- **Internal product UI** (Toggle's own SaaS — not on roadmap)
- **Merchandise / physical environment / signage / trade-show booth**
- **Long-form ebook / whitepaper master** (post-MVP)
- **RTL / Arabic / Tamil / Mandarin localization** — out of scope for v1 (Al Hidayah client work uses Arabic script in their logo only; doesn't require full RTL design system support yet)

## Success criteria (judged at the end of all stages)

1. A new designer on the Toggle team could ship a new proposal in < 4 hours using the templates.
2. A client receiving a Toggle proposal can tell — visually — that it's Toggle within 3 seconds.
3. Every artifact answers the sales question: *"Does this make a senior B2B prospect more likely to sign?"*
4. The system covers 90% of Toggle's current and 12-month-projected artifact needs. The remaining 10% has documented escape hatches.
5. Dark and light mode both feel native — not one designed first with the other bolted on.
