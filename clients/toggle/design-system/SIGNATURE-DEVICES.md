# Toggle Solutions — Signature Devices

> **Stage 1 of the design system.** The three devices that make an artifact unmistakably Toggle: the isometric architecture motif, the strikethrough rewrite, and the wordmark + bracket seal. Companion doc: `BRAND-IDENTITY.md` (which also carries the measured/minted legend and the interim color locks used below).
>
> Mailchimp has the wobble, Slack has the hashtag, Stripe has the gradient bar — **Toggle has these three.** Exactly three. A fourth device needs Zaid's sign-off and a v2.

---

## A. The isometric architecture motif — a system, not a sticker

**Belief it builds:** *"These people design growth the way engineers design structures — deliberately, with every part load-bearing."*

This is THE Toggle visual, and it maps literally to the positioning (*Technical Growth Architecture*). Today it appears only on covers and closings — decorative real estate — and has fallen off the live site entirely. The system promotes it to a **construction grammar** that also renders data (Stage 4 makes it the default data-viz language; flat charts are the fallback).

### A1. Construction grammar (binding)

| Rule | Spec |
|---|---|
| Projection | True isometric: receding axes at **30°/30°** from horizontal, verticals stay vertical. (The brief's "true 2:1" and "30°/30°" conflict — 2:1 pixel iso is 26.57°; resolved to 30° true, matching the Sunway artwork. The 2:1 approximation is permitted only for Stage 5 icon glyphs at 16/20/24/32 px raster — never for the motif itself.) |
| Unit | Everything is built from unit cubes on the 30° grid. Composites are stacks and cuts of whole units — no free-form masses. (Single exception: the loop-form, a traced canonical asset — see A2.) |
| Stroke | Primary blue `#4A7BF7`. **Butt endcaps, miter joins.** Strokes merge cleanly at junctions — one line per visible edge, no overshoot, no doubled paths. |
| Stroke weight | Keys on the **canvas the composition ships on** (this overrides the brief's "scales with artwork"), in CSS/layout px at 1× (export scale multiplies it): **canvas short edge ÷ 540** → 2 px on a 1920×1080 deck, 2 px on 1080-square social; minimum 1.5 px. Print: 0.6 pt at A4, never below 0.4 pt. |
| Hidden lines | **Visible edges only** — no dashed back edges, no x-ray wireframe. Codified from the Sunway cover artwork; confirmed by Zaid 2026-06-10. |
| The filled face | **Exactly one face per composition fills solid `#4A7BF7`.** Which one: the fill belongs to the **leading mass** — the leftmost mass of the composition (matches the Sunway canon, where the left block's seat face is filled; corrected against the canon after Stage 2 QA). Within that mass: among its receding-plane faces (side faces, not tops), fill the lowest; tie → the larger; still tied → the leftmost. The face "under load." One filled face = one focal point = one decision per surface. **Data primitives follow the scoped variant in `CHARTS.md` §1 — one data face per block, filled with the series' categorical color.** |
| Background | Open whitespace (light mode) or the dark canvas `#0A1224` (strokes stay `#4A7BF7`, fill unchanged). Never behind text, never tiled, never cropped so the form is unreadable. |
| Count | One composition per surface. |

**Ship test (operationalized):** a second designer redraws the composition from the spec text alone, without seeing the original; the overlay must match within one grid unit. If it can't, the spec — not the designer — is at fault.

### A2. The three canonical composite forms

Cut from six in earlier drafts to three. Each form has a fixed meaning — vocabulary, not clip-art. The ≤ 3-mass cap (A1) applies to **new** composites; canonical forms carry their own counts.

| Form | Construction | Means | Canonical placement |
|---|---|---|---|
| **Step-form** | Two masses on the shared grid: mass A (left, leading) an L-section — 2×2 footprint, 3 units tall, with a 1×2×2 cut opening front-right, **filled face on the seat** per A1; mass B (right, back) a slab with front shelf — 2×2×2 slab + 1×2×1 shelf at its front-right (corrected after Stage 5 QA: the Sunway cover's notched-back slab self-occluded — drew hidden edges; the canonical B keeps every edge visible). **Filed: `assets/illustrations/step-form.{svg,png}`** — generated from the 30° math, regenerate never redraw. | Staged growth: phases, before/after, the climb | Proposal & deck covers; Stage 4 funnel/phase primitives |
| **Loop-form** | A flattened rounded circuit threading a block (the Sunway Thank-You artwork — reads as a toggle switch). **Traced canonical asset, exempt from the unit-cube rule — the only curves in the system.** Never redrawn freehand; `assets/illustrations/loop-form-PLACEHOLDER.svg` ships (disclosed) until a designer traces the Sunway artwork and files `loop-form.svg`. | The feedback loop: lead-quality loop, retention, compounding | Closing/CTA slides; Stage 4 lead-quality-loop primitive |
| **Channel-stack-form** | 3–5 unit blocks stacked column-wise on the grid; block heights proportional to real values when encoding data. Segment seams render as visible edges only — only the topmost block draws its top face. **Filed: `assets/illustrations/channel-stack-form.{svg,png}`** (50/30/20 reference proportions, left face of the lowest segment filled per the A1 tie-break). | The mix: channels, budget split, service stack | Section openers for strategy; Stage 4 channel-mix primitive |

New composites may be built **only** from the A1 grammar: unit cubes on the 30° grid, ≤ 3 distinct masses, exactly one filled face, no curves. If a concept can't be said in that grammar, it isn't said isometrically. (Data primitives are exempt from the mass cap and filled-face count — they follow `CHARTS.md` §1: one data face per block, ≤ 8 data points.)

**Disposition of the observed "T" form** (the company mark as 3D architecture, seen on current title/closing slides): retired as a standalone canonical form per the brief's cut to three (confirmed by Zaid 2026-06-10). Existing artwork remains valid until each asset is next touched; the T-form is reconsidered as a lettermark in the v2 wordmark audit.

### A3. Where the motif may and may not appear

- **May:** covers, section openers, closing CTAs, hero illustration slots, Stage 4 data primitives (where block heights/counts encode real, labeled values).
- **May not:** behind or beneath body text, in dense stat pages as garnish, as a repeating background texture, in more than one composition per surface, or below **120 px wide** — the motif never shrinks to icon or favicon scale (the seal owns those slots, §C2).
- When a block encodes data (Stage 4), the data is labeled with real numbers — an unlabeled "data-looking" block violates the *Honest* rule.

---

## B. The strikethrough rewrite — the cross-surface rhetorical pattern

**Belief it builds:** *"They'll tell me the truth even when it costs them — starting with what they refuse to be called."*

The single most distinctive thing on the live site, promoted from one-time hero to **system-level device**: any time Toggle defines itself against the category default, the official move is strike the default, write the truth over it.

### B1. Construction rules

| Rule | Spec |
|---|---|
| Structure | Struck line above when stacked display type (heroes, slides); inline-before only in running copy at ≤ body-lg. The rewrite always carries ≥ the struck line's visual weight. |
| Struck text color | Muted but readable: `#6B7280` on light (≈ 4.4:1), `#9CA3B5` on dark — tokenized as `color.text.secondary` (Stage 3). The strike stroke matches the struck text color. The rhetoric only works if the prospect can read what was negated. |
| Rewrite color | Full-strength — white on dark, ink `#0F0F0F` on light, primary blue only when it is the surface's single blue moment. |
| Strike geometry | Thickness = **0.12 × font-size**, rounded to the nearest 0.5 px, minimum 2 px. Vertical position = the font's native strikeout metric (CSS `line-through`; Inter Tight ≈ mid x-height) — native behavior is binding because per-line wrapping depends on it (amended after Stage 2 QA; CSS offers no line-through offset control). Full width of the struck text, no overhang. Single horizontal stroke — no scribbles, no diagonal slashes. |
| Wrap behavior | Prefer no-wrap: at 375 px, reduce the struck line's size before allowing a second line; hard cap 2 lines, each wrapped line carries its own full-width strike (native `line-through` behavior). |
| Typography | Both lines in Inter Tight. Struck line at 60–100% of the rewrite's size, never larger. |
| Frequency | **One strikethrough per surface — and one per artifact** (proposal, deck, meeting sequence). The website hero is exempt as the standing brand utterance. The first strikethrough is arresting; the third is a template. Pick the single highest-stakes negation; state the rest plainly. |
| Semantics (web) | Mark up as `<s>` with a visually-hidden clarifier ("not X — Y") so screen readers hear the rhetoric, not noise. |

### B2. When NOT to use it

Only strike a **real category default** — something prospects are actually told or sold. Never strike: a competitor's name, a client's brand **or a client's words** (even a quoted brief — crossing out a client's sentence in front of a prospect invites them to imagine their own brief struck on someone else's slide), a legal or pricing fact, or a strawman invented for the slide. If there's no genuine default to negate, there is no strikethrough — manufacturing one violates *Honest*.

### B3. Six worked examples (the canon)

| Surface | Struck | Rewrite |
|---|---|---|
| **Website hero** | ~~YOUR MARKETING AGENCY~~ | **YOUR DIGITAL GROWTH PARTNER** |
| **Service description** | ~~An ad agency that takes the brief~~ | **A growth partner that diagnoses before prescribing** |
| **Pricing slide** | ~~Judged on activity reports~~ | **Judged on revenue, qualified pipeline, cost-to-acquire** |
| **Team framing** | ~~A junior account-manager layer~~ | **Senior operators, working directly with you** |
| **Case-study challenge** | ~~More ads~~ | **Better diagnosis — the brief we actually wrote** (strikes the category's default prescription, not the client's words; the incoming brief is shown unstruck beside it, labeled "the brief as it arrived") |
| **Print leave-behind** | ~~Industry benchmark~~ | **Your benchmark — cross-industry patterns, applied** |

*Changes from the brand-DNA draft canon (approved by Zaid 2026-06-10):* the pricing row previously struck "long-term retainer lock-in" — **untrue** (Toggle's rate card is monthly retainers with a 3-month minimum; striking it violates B2's pricing-fact rule and detonates at contract review). The case-study row previously struck the client's quoted brief — softened per B2. *OOH note:* at roadside distance a muted struck line is illegible; the device is scoped to print leave-behinds, and any true OOH use needs a distance-test variant (struck line at full contrast, two-line max).

---

## C. The wordmark + `[ bracket ]` sealed utterance

**Belief it builds:** *"This firm signs its work — every page leaves the shop stamped."*

The brackets seal short utterances the way a drawing's title block seals a blueprint. Combined with the wordmark they form Toggle's mark system.

### C1. Bracket construction

| Rule | Spec |
|---|---|
| Form | Square brackets: vertical stem + two horizontal arms, arm length = **25% of bracket height** (minted — measure once against the Sunway vector and correct here if it differs). Glyphs are symmetric; the device's observed asymmetry is in placement (C3). |
| Stroke | Matches the isometric stroke rule (canvas short edge ÷ 540, min 1.5 px). Butt caps, miter joins. |
| Height | 1.4× the cap height of the sealed text (minted). For the wordmark seal, "cap height" = the ascender height of the `l`/`gg` stems in `toggle-wordmark.svg` — measure once from the filed vector, record the number here (interim: 0.75 × wordmark bounding-box height). |
| Padding | Gap between bracket and content = 0.5× cap height each side. Brackets vertically centered on the content's cap height. |
| Content | ≤ 5 words, a bare domain (`toggle.solutions` — never paths, never > 28 characters), or the wordmark. Lowercase, sentence case, or the canonical Title Case tagline as filed. **Never headlines, never body copy. Seals never wrap** — if it doesn't fit at the surface's caption size, drop the seal (device discipline: subtract). |
| Color | Primary blue (covers/closings) · muted gray `#9AA0A8` (interior watermark — decorative by declaration, caption scale ~11–12 pt at A4, exempt from AA) · white (dark surfaces). Bracket and text share one color. |

### C2. The three lockups

| Lockup | Construction | Use |
|---|---|---|
| **Wordmark** | `toggle` alone (canonical SVG — `assets/logos/toggle-wordmark.svg`) | Default mark everywhere, ≥ 80 px wide |
| **Seal** — `[ toggle ]` | Wordmark inside brackets per C1 math | Stamp and sign-off slots ≥ **48 px** wide: report sign-offs, avatar at 48+, footer marks. (The standalone 80 px minimum doesn't apply inside the seal.) |
| **Tagline lockup** | Wordmark top-left + `[ Your Digital Growth Partner ]` at canvas base | Covers and closings only |

**Below 48 px (favicon 16/32, tiny avatars):** the bracketed wordmark is physically illegible. The live favicon today is the full wordmark on a white rounded tile (measured) — functional but mushy at 16 px. The honest small-mark candidates are a `t` lettermark cut from the wordmark vector, or the retired T-form as a drawn glyph. **Confirmed (Zaid, 2026-06-10): the current favicon stays for v1; the lettermark decision folds into the v2 wordmark audit.**

### C2b. Web kicker-seal context (amended Stage 6c — pending Zaid sign-off)

On web surfaces, section-label seals may also appear (a) at a section header's content right edge and (b) as a page-hero kicker — max one per page, content ≤ 5 words, never around headlines. Web text seals use **typed brackets** (Inter Tight `[ ]` at weight 400) as the approved approximation of C1's drawn construction, in `brand.primary-deep` per the accent-discipline rule (text ≤ 17 px).

### C3. Placement canon (measured — Sunway artifact)

- Interior pages: `[ toggle.solutions ]` top-right, muted gray, caption scale — the running header that says *this page is signed*.
- Covers: tagline seal bottom-left, URL seal bottom-right — two seals anchoring opposite corners (the device's asymmetry).
- The seal never floats mid-layout and never decorates a chart.

---

## The device discipline

Per surface: **one isometric composition + one strikethrough + two seals, maximum** — and per artifact, one strikethrough total (B1). Most surfaces use one device, not all three. A cover uses isometric + seals; a hero uses strikethrough + wordmark; a stat card uses neither — the number is the device. When in doubt, subtract — *Unpretentious* outranks brand presence.
