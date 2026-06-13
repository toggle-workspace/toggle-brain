# Toggle Solutions — Design System Master Prompt

> **What this is.** A single, self-contained prompt to paste into Claude (claude.ai with Artifacts on, or Claude Code) once you've uploaded the context pack alongside. Generates a full design system for Toggle Solutions in stages.
>
> **Before you paste.** Resolve the four items in `06-pre-flight-resolutions.md`. Then upload these to the same conversation:
> - `01-brand-dna-snapshot.md`
> - `02-voice-and-positioning-distilled.md`
> - `03-design-system-scope.md`
> - `04-references-and-anti-patterns.md`
> - `06-pre-flight-resolutions.md` (with your answers filled in)
> - `07-component-spec-template.md`
> - `screencapture-toggle-solutions-…pdf` (live site)
> - `Company Profile Deck - Toggle Solutions.pdf`
> - `Sunway TES Marketing Proposal.pdf` (light-mode reference)
> - `screencapture-linkedin-company-toggle-solutions-posts-…pdf`
>
> **Then run the stages in order** (see `05-order-of-operations.md`). Don't ask Claude to do everything in one turn — the output collapses into vague slop. Each stage produces an artifact the next stage builds on.

---

## The prompt

You are designing the official design system for **Toggle Solutions** — a Malaysia/ASEAN digital growth partner positioned as a *Technical Growth Architecture* firm, not a marketing agency. Your job is to produce a system that helps Toggle close more deals (proposals first, decks second, LinkedIn third, website fourth) with senior B2B operators in higher-ed, banking, fintech, healthcare, and e-commerce.

You have been given a context pack. **Read it before designing anything.** The attachments contain the existing brand DNA, voice, positioning, pre-flight decisions Zaid has already locked, the current website, the current company deck, the current proposal aesthetic (Sunway TES — already converting), and the current LinkedIn content. Treat the existing visual language as canonical and your job as **codifying + sharpening**, not reinventing.

### Operating principles (binding)

1. **Codify, don't reinvent.** Toggle already has a signature visual hook: the isometric 3D wireframe blocks in electric blue, the italic lowercase `toggle` wordmark (**Alliance No 1 Extra Bold Italic** from Pangram Pangram — confirmed in pre-flight; brand mark only, never body type), the `[ bracket ]` device, the strikethrough rewrite hero, the dark-navy primary mode + clean light mode for proposals. Your design system formalizes these. Do not invent a new visual identity from scratch.
2. **Sales is the success metric — name the belief.** For every artifact, name **the single sentence the prospect must believe by the end of consuming it**. Design backwards from that belief. If a design decision doesn't increase the probability of that belief, cut it. The proposal master is the canonical worked example — every slide has a named belief in writing in the spec.
3. **Dual mode is non-negotiable.** The system must work in both **dark mode** (web, deck, social, ads) and **light mode** (proposals, reports, contracts). Every color token MUST have an explicit `.dark` and `.light` sibling — missing pairs fail the stage. The Sunway TES proposal proves light mode works; codify the rules.
4. **The architecture motif is a system, not decoration.** The isometric blueprint vocabulary applies to **functional components** — stat blocks rendered as architectural columns, channel-mix as stacked blocks, funnel as stepped axonometric, lead-quality loop as a 4-block circuit. The blueprint becomes the data viz language; flat charts are the fallback, not the default. By end of Stage 4 every chart primitive must have both a flat and an architectural-primitive rendering.
5. **The strikethrough rewrite is Toggle's signature rhetorical pattern.** Codify it across surfaces — hero, service descriptions ("ad agency" → "growth partner"), pricing ("retainer" → "performance-only"), team framing ("account manager" → "senior operator"), case-study challenge statements. Any time Toggle defines itself against the category default, the strikethrough pattern is the official device. Produce ≥ 6 worked examples in Stage 1.
6. **Senior-operator voice translates visually — 5 positive rules.** Direct → one CTA per surface; one decision per screen. Honest → strikethrough rewrite is the signature device. Sharp → numerals at display weight, specific over vague. Experienced → every assertion carries its receipt inline (stat next to claim, source next to quote, named operator next to expertise claim — no decoupled "trust us" copy). Unpretentious → no element exists purely for decoration; if it isn't load-bearing, delete it (functional minimalism, like architectural drawings — every line means something).
7. **One unified spine. Bespoke is out of scope here.** Do NOT pre-allocate accent shifts, type ramps, or sub-brand variants for Toggle Bespoke. The spine designed here is *Toggle Solutions only* — Bespoke gets its own identity work in a separate engagement.
8. **Don't borrow the SaaS-aesthetic median.** If a finished asset could plausibly ship from Linear, Vercel, Stripe, Mercury, or Ramp with the logo swapped, it is wrong. Default to the existing Toggle pattern where Toggle is distinctive (architecture, strikethrough, brackets, italic wordmark). For commodity patterns (service grid, CTA button, FAQ accordion), default to *inverting* the SaaS-aesthetic median, not codifying it. See `04-references-and-anti-patterns.md`.

### Sequence (run each as a separate turn — sub-stages too)

Do NOT attempt multiple sub-stages in one go. After each, I'll review and approve or push back. Then we move on.

**Stage 1 — Identity + Signature Devices.** Produce `BRAND-IDENTITY.md` + `SIGNATURE-DEVICES.md`.
- `BRAND-IDENTITY.md`: brand essence in one paragraph; three brand pillars (with one-line evidence each); the wordmark rules (lock the font Zaid has resolved in pre-flight); the `[ bracket ]` device rules; anti-patterns (what Toggle is NOT); the voice → design table mapping all 5 adjectives to specific, testable design decisions (use the rules from Operating Principle 6 verbatim, then extend each with 2 worked examples).
- `SIGNATURE-DEVICES.md` covers exactly three: (a) the **isometric architecture motif as system** — construction rules (true 2:1 isometric projection, axonometric angles 30°/30°, stroke endcap butt, miter join, no hidden-line occlusion, lowest-front-face fills solid in primary blue, strokes merge cleanly at junctions), the canonical 3 composite forms (step-form, loop-form, channel-stack-form) — fewer than the 6 in earlier drafts; (b) the **strikethrough rewrite device as cross-surface rhetorical pattern** with 6 worked examples (hero, service description, pricing, team, case-study challenge, OOH/print); (c) the **wordmark + `[ bracket ]` sealed utterance device** — wordmark sits inside the brackets or alongside as the primary mark.

**Stage 2 — Proposal Master (the canonical worked example — light mode).** Before tokens. Produce the master template for Toggle's highest-converting artifact, modeled on Sunway TES. For each of the ~14 slides — Title, Market Opportunity, Audience, Strategy at a Glance, Channel Strategy (Google / Meta / LinkedIn), Bidding & KPI Targets, Creative Strategy, Messaging by Persona, Testing Framework, Lead Form Strategy, KPIs & Measurement, Lead-Quality Loop, Thank You — document: (1) the single sentence the prospect must believe by the end of this slide; (2) the layout pattern; (3) the data primitive used; (4) any contrarian/strikethrough moment. **Plus add a Contrarian Slide Library** (3 templates): the strikethrough framing slide ("Most agencies do X. We do Y."), the disqualifier slide ("We're not a fit if…"), the assumption-buster table ("You'll be told X. Here's what the data says."). Output as HTML+CSS artifact (one full proposal rebuild using real UNITAR or Sunway TES copy — no Lorem Ipsum) AND a Google Slides–shaped spec (because the team builds in Slides).

**Stage 3 — Design tokens (extracted from Stages 1 + 2).** Produce `TOKENS.md` + `tokens.json` (W3C Design Tokens format). Use three-tier semantic naming: `category.role.variant[.state]` (e.g. `color.surface.card.dark`, `color.text.body.light`). Every color token MUST have an explicit `.dark` and `.light` sibling — missing pairs fail the stage. Required categories:
- `color.brand` (primary blue — the one Zaid resolved in pre-flight; wordmark white/black)
- `color.surface` — 4 tints per mode (canvas / card / raised / overlay). Dark mode uses **tint elevation**, not shadow.
- `color.text` (primary / body / secondary / muted / inverse / link / link-visited)
- `color.border` (subtle / default / strong / focus)
- `color.state` (hover / active / disabled / focus-ring / error / success / warning / info — orthogonal to accents)
- `color.accent` (categorical: `cat-1` through `cat-5` — blue / teal / pink / purple / orange / slate — NEVER good/bad). Dark + light mode pairs MUST be specified — the Sunway proposal is light-mode only; you must verify each accent on dark canvas and adjust hex if contrast fails.
- `color.dataviz` (5-categorical palette + gridline + axis + banding — for the architectural data primitives in Stage 4)
- `color.print` (CMYK equivalents for brand + accents — proposals print to PDF and sometimes paper)
- `opacity` (12-step alpha scale 0–100)
- `typography` — primary family **Inter Tight** (confirmed in pre-flight; free, open-source, wide weight range) for display + body; **Alliance No 1 Extra Bold Italic** reserved as the wordmark brand mark only. Full Inter Tight weight set, full scale: display / h1 / h2 / h3 / h4 / body-lg / body / small / caption / overline / numeric-display
- `space` (4pt baseline, 12 steps)
- `radius` (0 / 4 / 8 / 12 / 16 / pill — with a rule mapping radius → component class)
- `border-width` (0 / 1 / 2)
- `elevation` — light-mode shadow tokens (3 levels max); dark-mode surface tint references
- `motion` — 3 durations (fast 150 / base 250 / slow 400 ms), 1 base easing `cubic-bezier(0.22, 1, 0.36, 1)`, 1 reserved "toggle flip" curve, reduced-motion fallbacks per duration
- `z-index` (named scale: base / dropdown / sticky / overlay / modal / toast / tooltip)
- `breakpoint` (375 / 768 / 1024 / 1440)
- `focus-ring` (color / width / offset / style)
- `print` (page margins, bleed 3mm, safe area, gutter for proposal PDF master)

Every token includes a `$description` and, where it's a color, a documented WCAG contrast ratio against its intended companion token.

**Stage 4 — Charts & data-viz primitives (the architectural data layer).** Before generic web components. Produce `CHARTS.md` + inline SVG examples for: bar (vertical + horizontal), grouped bar, stacked bar, line, area, donut, funnel, stat block, sparkline, comparison table with accent stripe, the **lead-quality loop** 4-block circuit, **channel-mix** stacked-blocks bar, **before/after** stat pair. For each primitive, produce BOTH a flat rendering AND an architectural-primitive rendering (per Operating Principle 4). Specify: categorical palette, gridline rule (color + opacity, dark + light), axis line rule, tick treatment, label placement, legend pattern, donut center treatment, line-chart point markers, area-fill opacity, sparkline simplifications, number formatting (RM prefix, K/M thresholds, decimal precision), empty-state, loading-state.

**Stage 5 — Iconography & illustration.** Produce `ICONOGRAPHY.md` + inline SVGs for 12 service icons (matching live site: Performance Marketing, Content Marketing, Branding, Web Dev, Conversion Optimisation, Creative Production, CRM/Email, SEO, Reporting, OOH, Store Mgmt, BI). Lock:
- Icon scale: 16 / 20 / 24 / 32 with use-case per size.
- One stroke weight (pick 1.5 OR 2 — not "or"). Rationale required.
- Endcap (square / round / butt), join (miter / round / bevel) — pick.
- Chip wrap math: chip 40px, icon 24px, padding 8px, radius 12px (lock exact numbers).
- Optical vs metric centering for asymmetric glyphs.

**Stage 6 — Component library (web). Run as sub-stages, each in a separate turn:**

- **6a. Inputs & forms.** Button (primary/secondary/ghost/icon-only, with arrow variant, sizes sm/md/lg), input (text/email/phone/select/textarea/file/checkbox/radio), form composition (the consultation booking form).
- **6b. Containers & data.** Card (base / stat / service / case-study / persona-segment / testimonial / team), tag/chip, table with accent stripe.
- **6c. Structure.** Navigation, footer, section header (with bracket device), hero blocks (with strikethrough device). Specifically include the **architectural component variants** — stat-card-as-column, channel-mix-as-stacked-blocks — that came out of Stage 4.
- **6d. Disclosure & supplementary.** FAQ accordion, modal/dialog, toast/notification, tooltip, breadcrumb, pagination, empty state, loading skeleton, avatar, divider, dot-timeline node.

Each component MUST use the Component Spec Template in `07-component-spec-template.md` — no exceptions. Spec template requires: purpose (the sales question it answers), anatomy, token references (no hex), variants, sizes, states (default/hover/focus-visible/active/disabled/loading/error — dark + light), accessibility (semantic HTML, ARIA, keyboard, contrast), responsive behavior, do/don't (3 each tied to voice adjectives), code (HTML+Tailwind, CSS variables).

**Stage 7 — Layout & page patterns (web).** Sub-stages:
- **7a.** Homepage (formalize the existing hero+strikethrough+service-grid+case-study layout). Service detail page. Case study detail page (with the dot-timeline + architectural data viz).
- **7b.** About/team page (with the senior-operator portrait treatment from Operating Principle 6 / `04-references-and-anti-patterns.md`). Contact / consultation booking page. FAQ page. Responsive at 375 / 768 / 1024 / 1440.

**Stage 8 — Remaining sales artifact templates (the rest of the close-rate pile).** Sub-stages:
- **8a.** Company deck master (dark mode, modeled on Company Profile — Cover / Who We Are / Problem We Solve / We Solve This By / What We Do / Why Partner / 5 Case Study slides / How We Engage / Clients / Close). Use Stage 4 architectural primitives wherever data appears.
- **8b.** Audit deliverable master (the Free Brand Audit output that converts top-of-funnel — gets prospects to upgrade to paid).
- **8c.** Case study one-pager (dark mode, dense). Produce templates AND populate ONE per existing client: UNITAR, CIMB, Singlife, Kualesa, Al Hidayah, EduKids — using real numbers from the Company Profile case study slides.
- **8d.** Monthly client report master (light mode — KPI dashboard, channel breakdown, learnings, next moves) AND weekly leads breakdown (UNITAR-style — codify what Zaid already does manually).
- **8e.** Pricing & packages table (5 engagement models from agency-profile.md — Growth Audit / Integrated Partnership / Campaign Intensive / Market Entry / Creative Performance Lab — with pricing anchor logic, even if specific prices remain TODO).
- **8f.** Pre-meeting + post-meeting email sequences (3 templates each — set context, recap, next steps).

**Stage 9 — Marketing asset library.** Sub-stages:
- **9a. LinkedIn (primary).** Stat card (1080×1080 + 1080×1350) in 3 variants (single big stat, 3-stat hero, before/after). 10-slide carousel template (hook / problem / 3-point insight / proof stat / micro case / CTA). Use Stage 4 architectural primitives for stats.
- **9b. Meta + Google ads.** 3 sizes each (1080×1080, 1080×1350, 1200×628) × 3 hook formats (stat-led, quote-led, before/after-led).
- **9c. Utility.** Email signature (3 variants — Zaid, Viknesh, generic team). OG image / favicon / Twitter/X card for toggle.solutions. Business card (digital + print spec).
- **9d. Defer to v2:** Instagram square + story templates, TikTok / Shorts thumbnail + lower-thirds (we'll do these post-MVP unless TikTok/IG becomes a primary channel).

**Stage 10 — Motion & video.** Produce `MOTION.md`. Lock micro-interaction principles — the literal "toggle flip" mechanic (what flips, what doesn't, the easing curve). Page transitions. ONE signature scroll reveal pattern, not five. **Motion reveal style is *drawing-in* (architectural-line trace, CAD/draftsman/Bauhaus instructional-film vocabulary), NOT assembly-pop. Easing is linear-then-decelerate, not bouncy.** Then for video: 5s intro bumper (line-trace draws the isometric step-form, then traces the wordmark), 3s outro bumper, talking-head lower-thirds, stat-reveal motion. Provide cubic-bezier values, durations, and dimensions — sufficient for a video editor to build, NOT a full After Effects keyframe table.

**Stage 11 — Voice-in-design playbook.** Produce `VOICE-IN-DESIGN.md` — a 1-pager mapping the 5 voice adjectives (using the positive rules from Operating Principle 6) to specific design decisions across the system. The team's gut-check doc before shipping any new asset.

**Stage 12 — Governance & rollout (MVP only).** Produce `GOVERNANCE.md` as a single page: where master files live (Figma library + Notion docs + this Markdown in `Toggle Brain/`), who owns updates, how a new component gets requested, current-version pointer. **Defer to v2:** Style Dictionary integration, deprecation policy, 30-60-90 client-migration plan, semver rules. Toggle is 12 people; MVP governance is minimal.

### Output format expectations

- **Markdown docs** for everything reference — tight, scan-friendly, table-heavy. Final consumption surface is **Google Suite** (confirmed in pre-flight): Google Docs for written documentation, Google Slides for proposal/deck/case-study masters, Google Sheets for the token reference table. Markdown is the source-of-truth; the team consumes via Google.
- **Live HTML+Tailwind artifacts** for the proposal master (Stage 2), components (Stage 6), layouts (Stage 7), and asset templates (Stages 8–9) so I can preview in Claude's Artifacts pane — these become reference for engineering the Slides/Docs masters.
- **JSON** for tokens (W3C Design Tokens spec — kept lean; mirrored as a Google Sheet for non-eng team consumption).
- **SVG (inline)** for icons (Stage 5) and charts/architectural primitives (Stage 4) — exported to Slides-compatible vectors so the team can drop them into Google Slides masters.
- **Imagery treatment: duotone (blueprint-blue + paper-white) everywhere** — confirmed in pre-flight. All photographic surfaces — operator portraits, case study photos, hero imagery — use this treatment. The team-page warmth trade-off is accepted in exchange for system coherence.
- **No Lorem Ipsum.** Use real Toggle copy — taglines, service descriptions, real client names (CIMB, Singlife, UNITAR, Kualesa, Al Hidayah, EduKids, Sunway TES), real stats (32,000+ leads / 47% CPL drop / 300% revenue / 11.5x ROI / 6x ROAS).

### Decision rules when something isn't specified

1. **Default dark.** When unsure whether something is light or dark mode, design dark first — that's where 70% of Toggle's surface area lives (web + deck + social + ads).
2. **Default to the existing Toggle pattern only where it's *distinctive Toggle*** (architecture, strikethrough, brackets, italic wordmark). For commodity patterns (service grid, CTA button, FAQ accordion), default to *inverting the SaaS-aesthetic median*, not codifying it.
3. **Default to fewer variants.** Two button sizes beat four. One shadow elevation beats three. The system is for a 12-person agency, not Figma's design org.
4. **Default to data + receipt.** When in doubt about hierarchy, give the data more space, the decoration less, and put the receipt next to the claim.
5. **Flag, don't fabricate.** If you can't determine something from the context pack, say "TODO — confirm with Zaid: [question]" rather than guessing. We resolve these together.

### When you're done with a stage

End each stage with three sections:
- **What you produced** — bullet list of artifacts in this turn.
- **The belief check** — for any sales artifact in this stage, restate the single sentence the prospect must believe.
- **Open questions for Zaid** — anything blocking the next stage that needs his call.

Then wait for approval before moving to the next stage.

---

**Begin with Stage 1.**
