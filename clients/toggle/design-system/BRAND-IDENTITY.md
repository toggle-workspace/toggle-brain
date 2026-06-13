# Toggle Solutions — Brand Identity

> **Stage 1 of the design system.** Codifies the identity that already exists across toggle.solutions, the Company Profile deck, the Sunway TES proposal, and LinkedIn — it does not invent a new one. Companion doc: `SIGNATURE-DEVICES.md`.
>
> Status: Stage 1 · for Zaid's approval · Sources: live site HTML/CSS/SVG (sampled 2026-06-10), Sunway TES proposal (vector-sampled from the PDF), LinkedIn page capture (2026-06-09), context pack `clients/toggle/design-system-brief/`.
>
> **Legend:** values marked **(measured)** were sampled from a shipped artifact; values marked **(minted)** fill a gap the artifacts don't answer and are open to Zaid's override. Interim locks bind all new artwork until Stage 3 tokens supersede them.

---

## 1. Brand essence

Toggle Solutions is a **Technical Growth Architecture** firm — a Malaysia/ASEAN digital growth partner that diagnoses the whole revenue system before spending a ringgit on any channel, staffed only by senior operators who show their receipts. The brand looks the way the firm works: like an engineering document, not an ad. Every line is load-bearing, every claim sits next to its number, and every surface is designed backwards from one sentence the prospect must believe.

## 2. Three brand pillars

| Pillar | One-line evidence |
|---|---|
| **Diagnosis before prescription** | Toggle refuses the retainer when the real problem isn't marketing — and says so publicly: "We refused a retainer last month because the client's real problem wasn't marketing." (LinkedIn, Toggle Solutions page, May 2026 — verified in capture.) |
| **Senior operators, no junior layer** | Every practice is led by a named operator who works directly with the client — Viknesh signs the Sunway TES proposal with his own phone number on the Thank You slide. |
| **One unified growth engine** | 32,000+ leads and a 47% CPL drop for UNITAR came from acquisition, conversion, and retention running on the same team, same data, same accountability — not from a media-buying silo. |

## 3. The wordmark

**Belief it builds:** *"This firm has a settled identity — it isn't redesigning itself for every pitch."*

**Locked (pre-flight #1):** the italic lowercase `toggle` wordmark is set in **Alliance No 1 Extra Bold Italic** (Pangram Pangram). It is a **brand mark, not a typeface** — Alliance No 1 never appears in headlines, body copy, captions, or UI; everything else is set in Inter Tight (§4). The only canonical artwork is the outlined vector:

> **Source of truth:** `Toggle Brain/assets/logos/toggle-wordmark.svg` (outlined paths pulled from the live site, filed 2026-06-10). All reproductions trace to this file. Never re-typeset the wordmark from the font.
>
> **Production TODO:** derive and file the canonical export set — `toggle-wordmark-{black,white}.{svg,png@2x,pdf}` plus seal rasters at 48 px — under `assets/logos/`. (Google Slides can't place SVG; decks need transparent PNG @2x.)

### Usage rules

| Rule | Spec |
|---|---|
| Color on dark | White `#FFFFFF` only |
| Color on light | Black `#0F0F0F` (measured — Sunway cover, live favicon). Primary blue is **not** a wordmark color; blue belongs to the brackets and headings around it |
| Never | Gradients, outlines, shadows, accent colors, rotation, stretching, re-typesetting |
| Clearspace | ≥ 1× the height of the lowercase `o`, on all four sides, measured from the outermost element (in the seal, that's the bracket arms) (minted) |
| Minimum size — standalone wordmark | 80 px wide digital · 20 mm print (minted). This minimum does **not** apply to the wordmark inside the seal, which has its own minimum (`SIGNATURE-DEVICES.md` §C2) |
| Position — web/deck | Top-left of canvas: 32 px from edges at ≥ 1024 px canvases, 16 px below 768 px (measured ~32 px; breakpoint rule minted). On slide canvases (proposals/decks) the wordmark sits on the slide margin grid instead — 64 px at a 1280-wide canvas (amended after Stage 2 QA) |
| Position — social cards | Bottom-left (measured — LinkedIn stat cards) |
| Position — proposal covers | Top-left, black (measured — Sunway cover) |

**v1 scope lock (pre-flight #5):** the current wordmark is locked for v1. A formal wordmark audit (does the italic warmth still fit the architecture positioning?) is deferred to v2. Do not redraw, "modernize," or straighten it in any asset.

## 4. Type and color — interim locks

### Primary type family — locked (pre-flight #2)

**Inter Tight** — for all display, headings, body, numerals, and UI. Free and open-source (Google Fonts), full weight range. Working weight set until Stage 3 mints the full scale: Regular 400 (body) · Medium 500 (UI/labels) · Bold 700 (headings) · ExtraBold 800 (display/numerals). Fallback stack: `"Inter Tight", Inter, -apple-system, "Segoe UI", sans-serif`. **Numerals are always set tabular (`font-variant-numeric: tabular-nums`)** so stat columns align — mono-numeric stats, never animated counters.

### The primary blue — interim lock `#4A7BF7` (blueprint blue)

**Provenance, stated plainly:** pre-flight #6 says to sample the hex from the isometric blocks on the **live-site hero** — but the current live hero has no isometric blocks (it ships a wave-gradient SVG; the motif survives only in the deck and proposals). The hex was therefore sampled from the closest canonical reference that exists: the Sunway TES proposal vectors, where `#4A7BF7` paints the isometric block strokes and fills, the headings, and the stat numerals (108 occurrences, measured). **Confirmed by Zaid 2026-06-10 — `#4A7BF7` is the locked primary.**

**Why this blue (the only acceptable rationale):** it is the blue of architectural drawings, drafting pens, and engineering documentation — the chromatic anchor of *Technical Growth Architecture*. Toggle's blue is the blue of a working draft, not a startup CTA. It is **never** justified as "tech blue reads trustworthy" or "it matches contemporary B2B platforms."

**Contrast note for downstream stages:** `#4A7BF7` on white ≈ 3.8:1 — passes WCAG AA for **large/display text only**. It is a display, numeral, and illustration color. On light surfaces, stat numerals default to ink `#0F0F0F` with blue reserved for the **single focal stat** per surface — on a washed-out boardroom projector, the receipt numerals must fade last.

**Accent discipline (binding, added after Stage 2 QA):** accents — including the primary blue — are **fills, never glyph color at body size**. Stripes, top bars, chip borders, bullets, and bar segments carry the category; the text stays ink or body gray. Every contrast failure in the Stage 2 QA traced to this one violation. For small text that must be blue (table headers, bands, pills, labels ≤ 17 px), use the text-safe deep blue **`#3056C9`** (6.4:1 on white) — tokenized as `color.brand.primary-deep` (Stage 3). Stage 3 also mints scoped text-safe variants for the other accents, valid in dataviz labels and web UI only — proposal surfaces keep this rule unchanged.

### Dark canvas — interim lock `#0A1224` (deep navy)

The deck uses pure black; the web uses deep navy (live CSS theme ≈ `#0F1729`). The positioning names "dark-navy primary mode," so the interim lock is navy: **all new dark-mode artwork uses `#0A1224`** until Stage 3 locks the final value and migrates the deck off pure black. (Flagged in drift, below.)

### Known drift to repair (flagged, not yet fixed)

| Drift | Detail |
|---|---|
| Three blues in production | `#4A7BF7` (proposal) · `#487DE7` (live-site wave SVG + glows) · Tailwind defaults `#2563EB`/`#3B82F6` (live-site theme variables). Stage 3 consolidates to the locked primary |
| Two dark canvases | `#000000` (deck) vs ~`#0F1729` (web). Interim lock `#0A1224`; Stage 3 finalizes |
| Hero trust strip | The live hero's star-rating + circular client avatars ("4.9/5 · Trusted by 50+ clients") is the most SaaS-median element on any Toggle surface, and circular avatars contradict the rectangular-portrait rule. **Confirmed (Zaid, 2026-06-10): replace with the monochrome client logo wall** when the site is next touched |
| Stock imagery | The live site's GA-dashboard screenshot and stock team-at-laptop photo (`/images/decorative/`) fail the duotone rule. Real-team portraits stay usable under duotone (no reshoot needed, per the locked imagery direction); only non-team stock is replaced |

### Supporting palette (measured, to be tokenized in Stage 3)

| Role | Hex | Source |
|---|---|---|
| Categorical accent — teal | `#2ECC9B` | Sunway segment 2 (Meta / UAE / Fresh Grad) |
| Categorical accent — pink | `#F59EC9` | Sunway segment 3 (Pakistan / Final-Year) |
| Categorical accent — purple | `#8E6BE6` | Sunway Phase 3 |
| Categorical accent — orange | `#F28B4C` | Sunway Phase 1 |
| Categorical accent — slate | `#2C2C36` | "Other"/neutral segment (per brand DNA; distinct from ink) |
| Ink (light-mode text/wordmark) | `#0F0F0F` | Sunway body ink (measured) |
| Light surface — card | `#F2F3F6` | Sunway stat cards (measured) |
| Light surface — callout | `#DDE5FE` | Sunway periwinkle data panels (measured) |
| Light text — body / captions | `#4A4A4A` / `#9AA0A8` | Sunway (measured). `#9AA0A8` is decorative-caption only — it fails AA on white and never carries content |

Accents are **categorical** (which thing this is), never semantic (good/bad). Never more than one accent on a single artifact's hero element.

## 5. The `[ bracket ]` device

**Belief it builds:** *"This firm signs its work."*

The square brackets seal short utterances — taglines, URLs, section labels — the way a drawing's title block seals a blueprint. Full construction grammar lives in `SIGNATURE-DEVICES.md` §C. Identity-level rules:

- Brackets frame **≤ 5 words or a bare domain** — never body copy, never headlines.
- Canvas-edge positions only: bottom-left / bottom-right of covers, top-right watermark on interior pages (`[ toggle.solutions ]`, muted gray, caption scale — decorative by declaration, exempt from AA).
- Maximum two bracket devices per surface (measured — Sunway cover: tagline + URL anchoring opposite corners).
- Primary blue on covers and closings; muted gray `#9AA0A8` as interior watermark; white on dark.

*Note:* the brand DNA calls the brackets "asymmetric." Measured against the Sunway artwork, the bracket glyphs themselves are symmetric; the asymmetry is in **placement** (two seals anchoring opposite corners). Codified that way; flag if Zaid remembers it differently.

## 6. Voice → design — the five testable rules

Binding. Each adjective produces ONE rule (Operating Principle 6, verbatim) the team applies before shipping anything, plus two worked examples.

| Adjective | Binding rule (verbatim) | Worked example 1 | Worked example 2 |
|---|---|---|---|
| **Direct** | One CTA per surface; one decision per screen. If the prospect can't name the next action in under 3 seconds, redesign. | Homepage hero: exactly one pill button ("Book a Consultation →"). | Proposal Thank You slide: one named person, one phone number, one URL — no "follow us on five platforms" footer. |
| **Honest** | The strikethrough rewrite is the signature device — strike the category default, write the truth over it (`SIGNATURE-DEVICES.md` §B). | Hero: ~~YOUR MARKETING AGENCY~~ → **YOUR DIGITAL GROWTH PARTNER** (live today). | Disqualifier slide: "We're not a fit if…" — equal visual weight given to reasons *not* to hire Toggle. |
| **Sharp** | Numerals at display weight, specific over vague; mono-numeric (tabular) stats, never animated counters. | Sunway stat row: `RM 15,000 · 160–210 · 2 · 3` at display size, quiet labels beneath — the numbers are the headline. | LinkedIn stat card: `300% / 200% / 11.5x` is the visual; the caption does the explaining (measured — LinkedIn capture). |
| **Experienced** | Every assertion carries its receipt inline — stat next to claim, source next to quote, named operator next to expertise claim. No decoupled "trust us" copy. | "32,000+ leads" never appears without "UNITAR · 2023–2026" in the same visual unit. | Team card caption carries the tenure marker: "Viknesh · Sales & Partnership Director · CIMB / UNITAR / Singlife portfolio" — the caption does the credibility work. |
| **Unpretentious** | No element exists purely for decoration; if it isn't load-bearing, delete it — functional minimalism, like architectural drawings: every line means something. | Isometric blocks appear only where they mark a threshold (cover, closing) or encode data (Stage 4) — never as filler behind text. | The Sunway deck's slide chrome is one watermark + one heading color + one accent per slide, across 15 slides. That restraint is the spec. |

**Reviewer's test for Unpretentious:** the reviewer states each element's function aloud; any element with no statable function is deleted before ship.

## 7. Imagery — the duotone rule (locked, pre-flight #3)

**Belief it builds:** *"Even their photographs are engineering documents — nothing here is borrowed clip-art."*

**Every photographic surface receives duotone.** No exceptions — hero photography, case-study context shots, operator portraits.

| Rule | Spec |
|---|---|
| Light-mode map | Shadows → primary blue `#4A7BF7` · Highlights → paper-white `#FAFAFA` (interim lock until Stage 3) |
| Dark-mode map | Shadows → deep navy `#0A1224` · Highlights → primary blue `#4A7BF7`. (This corrects the brief's wording, which inverted the tonal order — highlights must stay lighter than shadows; blue's luminance ≈ 0.22 vs navy ≈ 0.01.) |
| Method | Gradient map, two stops only, linear interpolation (Photoshop Gradient Map / Figma duotone plugin) — **not** a multiply overlay |
| Pre-treatment | Normalize the photo to full tonal range first (set black/white points). After mapping, both endpoint tones must be present; if a flat or too-dark source can't span the range, reject the photo |
| Portraits | **Rectangular crop, never circular.** 4:5 ratio, eye-line in the upper third, subject 60–75% of frame height (minted). Default surface: dark canvas; in light-mode artifacts, portraits sit on a dark inset panel |
| Captions | Carry the warmth the photo no longer does: name · role · tenure marker ("7+ years media buying · Toyota / CIMB / UNITAR portfolio") |

Duotone exposes generic stock — that is a feature: it forces commissioned or captured photography. Existing real-team portraits remain usable under duotone; the system does not block on a reshoot.

## 8. What Toggle is NOT (anti-patterns)

The binding test: **if a finished asset could plausibly ship from Linear, Vercel, Stripe, Mercury, or Ramp with the logo swapped, it is wrong.** The objective gate is this list:

- No neon-purple agency gradients, no radial-orb heroes, no sparkles.
- No stock photography of diverse-teams-smiling-at-laptops. (Duotone makes this structurally impossible.)
- No mascots, characters, blob shapes, or hand-drawn whimsy.
- No emoji on any marketing surface.
- No bento grids for variety's sake — Toggle has a real grid (3-col service cards); codify it, don't pile on.
- No glossy 3D renders or Spline shaders — the isometric blueprint lives in a different tradition entirely.
- No isometric scene illustration, gradient-filled iso, or decorative iso dashboards (the 2017–19 Dribbble trend) — isometric exists in this system only as stroke-built data or threshold compositions per the A1 grammar.
- No assembly-pop or bouncy motion — Toggle's motion vocabulary is *drawing-in* (line-trace, draftsman's hand).
- No decorative regional cues (batik accents, mixed-script display flair). Regional credibility comes from **named work, named operators, named ringgit numbers, named cities** — globally legible aesthetic, locally specific proof.
- No animated counters, progress-bar theatrics, or star-ratings-with-avatar-rows (see drift table, §4).

**Live exhibit of the failure mode:** the warm/earthy Canva branding deck currently in circulation ("Want To Make Your Business Look Professional?") shares zero DNA with this system — wrong palette, wrong type, decorative leaf ornaments, no receipts. It is the canonical example of what shipping without a system produces.

## 9. The two standing tests

Run both before any asset ships:

1. **Tone test (operationalized).** Show the asset to three people outside the team for 5 seconds each, forced choice: *"engineering firm that does growth"* vs *"B2B startup marketing site."* ≥ 2 of 3 must pick the first, or cut.
2. **Aging principle.** Picture it in 2028. Drawing-tradition / engineering-doc vocabulary ages well because it's older than tech; SaaS-2024 tropes date in 24 months. The enforceable proxy: anything matching the §8 list fails now, not in 2028.
