# Toggle Solutions — Proposal Master (Stage 2)

> **The canonical worked example.** Light mode, modeled on the Sunway TES proposal (the artifact that already converts), rebuilt with the Stage 1 identity locks. Stage 3 extracts tokens FROM this artifact — not the other way around.
>
> Companion artifact: `proposal-master.html` (full 15-slide rebuild with real Sunway TES copy + the 3-slide Contrarian Library — open in a browser to preview; each slide is annotated with its belief). Hand-rolled CSS variables rather than Tailwind, deliberately: this artifact doubles as the Stage 3 token source, so the variables ARE the draft tokens. (Deviation from the brief's "HTML+Tailwind" format line, disclosed here; Stage 6 components ship HTML+Tailwind as specified.)
>
> **Copy fidelity note:** the copy is the real Sunway TES proposal copy, with the original's arithmetic and consistency errors corrected (the original said "3 markets" while budgeting four geos; claimed 160–210 leads when the channel math sums 155–195; and had a daily-budget multiplication error on the India search campaign). The master models the corrected math. Zaid: spot-check 3–4 numbers against the source PDF.

---

## 0. Legal hexes (the drift guard list)

Slides has no tokens — hexes are entered by hand. **The only legal hexes inside a proposal surface are these 17.** Anything else fails review. (Preview chrome in the HTML — gray annotation labels between slides — is exempt; it never ships.)

| Hex | Role | | Hex | Role |
|---|---|---|---|---|
| `#4A7BF7` | primary blue — display/headings/illustration only | | `#2ECC9B` | accent teal (fills only) |
| `#3056C9` | deep blue — small text, bands, pills, table headers | | `#F59EC9` | accent pink (fills only) |
| `#0F0F0F` | ink — headings, stat numerals | | `#8E6BE6` | accent purple (fills only) |
| `#4A4A4A` | body text | | `#F28B4C` | accent orange (fills only) |
| `#9AA0A8` | decorative captions/watermark only — never content | | `#2C2C36` | accent slate (fills + dark segment) |
| `#6B7280` | struck text (strikethrough device) | | `#F2F3F6` | card surface |
| `#0A1224` | dark navy (dark-mode artifacts) | | `#DDE5FE` | callout surface |
| `#FFFFFF` | white — inner mini-cards, text on deep blue | | `#E4E6EE` | borders/dividers |
| `#FAFAFA` | paper-white (duotone highlight) | | | |

**Accent discipline (binding):** accents are **fills** — stripes, top bars, chip borders, bullets, bar segments. Accent-coded *text* is ink or body gray. See `BRAND-IDENTITY.md` §4.

**Scope note (Stage 3):** token families minted in Stage 3 (state colors, border ladder, accent `.text` variants) are **web/report scope — not legal on proposal slide surfaces** except where this list already includes them. The 17 above remain the Slides law.

## 1. The artifact-level belief

> **"If we hand Toggle RM15,000 a month, a senior team will run it like an engineering project — and we will know, in numbers, whether it's working."**

Every slide contributes one sub-belief. If a design decision doesn't increase the probability of its belief, cut the decision. And because the thesis is "engineering project": **arithmetic is brand** — a budget line that doesn't multiply, or a market count that doesn't match the channel slides, refutes the whole artifact. The rebuild flow ends with a calculator pass for exactly this reason.

## 2. The spine — slide-by-slide spec

**Strikethrough budget: ONE per artifact (`SIGNATURE-DEVICES.md` §B1) — spent on Library C1.** Every other contrarian moment is stated plainly.

| # | Slide | The belief (one sentence) | Layout pattern | Data primitive | Contrarian moment |
|---|---|---|---|---|---|
| 1 | **Title** | "This was built for us by a firm with a settled identity." | Cover: wordmark top-left · client name in blue + artifact name in ink, left third · isometric **step-form** right · two seals anchoring bottom corners | — | None — the cover earns trust by restraint |
| 2 | **Market Opportunity** | "There is a real, quantified pool of demand we are not capturing." | Title + kicker · 2 hero stat-callout cards (one blue focal, one ink) + 1 quiet expansion-tier panel | **Stat-callout card** | Ranges, not inflated points; expansion markets sized by budget share, not invented student counts |
| 3 | **Who We're Talking To** | "They know our buyers better than we've articulated them ourselves." | 3-up **persona stripe-cards** with budget chips | Persona card (accent stripe + % chip + pain/trigger/hook bullets) | Budget % printed on each persona before they ask |
| 4 | **Strategy at a Glance** | "RM15,000/month converts to a predictable lead machine — the whole plan fits on one slide." | 4-up stat cards (top blue bar; **leads = the blue focal stat**, budget in ink) · full-width **channel split bar** · geo line | Stat card · 100% stacked split bar (blue/teal/slate) | The headline lead range is the literal sum of the per-channel math below it |
| 5 | **Google Search Strategy** | "Every ringgit on Google has a named job and a CPL ceiling." | Title + **budget pill** · 3 campaign cards with categorical top stripes | Campaign card (stripe + RM display + CPL line + keyword list) | CPL ceilings printed per campaign — accountability before launch |
| 6 | **Bidding & KPI Targets** | "They match tactics to data maturity instead of promising autopilot." | Split: phase timeline panel (callout) left · CPL table right | **Phase row** · **Accent-header table** | "Don't ask automation to optimise on signals it doesn't have." |
| 7 | **Meta Ads Strategy** | "Each market gets its own message and budget — not a copy-paste campaign." | Title + budget pill · 3 market **stripe-rows** · bottom **spec band** | Stripe-row · deep-blue spec band | Pakistan/BD framed honestly: "price-sensitive but proud-of-international-brand" |
| 8 | **LinkedIn Ads Strategy** | "They can reach exactly the professionals we want, at the firms we want." | 3 stat cards (top stripes) · callout panel with 2×2 targeting grid · spec band | Stat card · **targeting matrix** (white mini-cards) | "Higher CPL, higher intent" — defends the expensive channel with its job |
| 9 | **Creative Strategy** | "Creative here is engineered, not guessed — one positioning, tested three ways." | Positioning band (callout) · 3 angle cards with stripes | Positioning band · angle card | The positioning statement is a falsifiable claim, not a slogan |
| 10 | **Messaging by Persona** | "Every persona sees a message built for their moment in the funnel." | Full-width **data table**, deep-blue header, banded rows | Data table | Headlines shown verbatim before launch — veto now, not after spend |
| 11 | **Testing Framework** | "Optimisation is a standing cadence, not a promise." | 6 numbered test cards (2×3) · cadence panel with 4 white mini-cards | **Numbered card** · cadence strip | Kill rules printed (pause at CTR < 1%, CPL > 50% over target) |
| 12 | **Lead Form Strategy** | "Lead quality is engineered inside the ad, before sales ever touches it." | Split: form-logic panel (callout) left · 4 numbered benefits right | Form-logic spec list · numbered list | "We rewrite the creative or the targeting, not just the form" |
| 13 | **KPIs & Measurement** | "We will know if this is working — by numbers we can hold them to." | 8 stat-callout cards (4×2, ink stats; **one blue focal**: Lead → Enrolment) · reporting band | Stat-callout grid | "The only number that matters" — ranks its own KPIs honestly |
| 14 | **The Lead-Quality Loop** | "Toggle optimises to enrolment revenue — most agencies stop at form submit." | 4 **loop-step cards** (categorical top stripes, numbered, arrowed) · result band | Loop-step sequence (flat; Stage 4 mints the architectural circuit) | Category default named plainly in the kicker — no strikethrough |
| 15 | **Thank You** | "A named senior operator picks up when I call." | Wordmark · display thank-you in blue · contact block (name — role, mobile, URL) · isometric **loop-form** right | — | A personal mobile number instead of an info@ inbox |

### Optional spine extensions (documented escape hatches — build in Stage 8)

Three slides the Sunway original lacked and serious buyers ask for. Templates to be built in the Stage 8 pitch library; until then the spec'd belief + pattern is the guide:

| Extension | The belief | Pattern |
|---|---|---|
| **Commercials** | "I know exactly what I pay, what's media, what's fee, and for how long." | Two-column: media vs fee split, billing cadence, minimum term (the week-6 CAPI promise implies ≥ 3 months — say it), what's included |
| **Who runs this** | "The seniors who pitched are the seniors who deliver." | 2–3 duotone rectangular portraits + tenure-marker captions (`brain/team/roster.md`) |
| **Month 1** | "They have a first-week plan, and they know what they need from us." | Week-by-week strip: access checklist (CRM, ad accounts, CAPI), setup milestones, first read-out date |

## 3. The Contrarian Slide Library (3 templates)

**Insertion rules (binding):** maximum **two** library inserts per deal. Disqualifier (C2) earns its place early — after slide 3. C1 + C3 belong **after slide 14**, where the loop mechanics that C1 references have been earned. **When C1 ships, slide 14 drops its result band** — the same point made twice stops being stated and starts being performed.

| Template | The belief | Pattern | Rules |
|---|---|---|---|
| **C1 — Strikethrough framing** | "These people have already rejected the mistake everyone else makes." | Centered display: struck category default above, rewrite below, one supporting line with the receipt | The artifact's ONE strikethrough. Struck line `#6B7280`, thickness 0.12×font-size, native line-through position. Strike a real category default only (§B2) |
| **C2 — Disqualifier** | "They turn money away — so their yes means something." | Title + 4 plain rows, vertically centered, generous spacing | Each row must be a **real declination criterion with a cost to Toggle** (CRM access, no day-1 guarantees, walk when it's not marketing). No humble-brags — "we're not a fit if you don't like excellence" is a compliment in a costume |
| **C3 — Assumption-buster table** | "Their advice comes from spend data, not opinion." | 2-column table, vertically centered: "You'll be told" (body gray) vs "What the data says" (ink + blue numeral + source), 3 rows max | Every right-hand cell carries a real number **with a named source and year**. Exact figures beat rounded ones (RM 154 reads as data; RM 150+ reads as marketing). If a receipt seems to contradict a promise elsewhere in the deck (e.g. Malaysian CPLs vs IN/PK targets), reconcile it in-cell |

## 4. Google Slides build spec (the team builds in Slides)

> **Dependency status (updated Stage 5):** wordmark PNGs ✓ filed · `step-form.{svg,png}` ✓ filed (mass B corrected — see `ICONOGRAPHY.md` §3; this HTML's cover updated to match) · `channel-stack-form.{svg,png}` ✓ filed · **loop-form: placeholder only** (`loop-form-PLACEHOLDER.svg`) — the true form must be traced from the Sunway Thank-You artwork by a designer. The Slides master can be assembled now except the closing slide's artwork.

### Page setup & conversion basis

- File → Page setup → Custom: **10 × 5.625 in** (16:9) = 720 × 405 pt.
- **The HTML preview (1280 × 720 px) is the visual reference. Slides values = px × 0.5625, rounded to the nearest 0.5 pt.** Proportions are binding; absolute pt is not — if the team finds the scale fiddly in the editor, multiply every value uniformly and say so in the deck's notes.
- Margins: 36 pt all sides (= 64 px). Watermark `[ toggle.solutions ]` top-right at the margin, 7.5 pt, `#9AA0A8`.
- Install **Inter Tight** via the Slides font menu (Google Fonts). **No italics** (the artifact uses none; Slides would synthesize them). Numerals: never a different family.

### Type scale (pt = px × 0.5625)

| Role | HTML px | Slides pt |
|---|---|---|
| Cover client/artifact name | 64 / 54 | 36 / 30.5 |
| Slide title (`#4A7BF7`) | 38 | 21.5 |
| Kicker | 15 | 8.5 |
| Hero stat (slide 2) | 56 | 31.5 |
| Display stat (slide 4) | 44 | 25 |
| Mid stat (slides 5–8) | 30 (34 normalizes here — Stage 3) | 17 |
| Compact stat (slide 13) | 29 | 16.5 |
| Card title | 17 | 9.5 |
| Body / bullets | 13.5–14 | 7.5–8 |
| Small / captions / chips | 13 | 7.5 |
| Band text (white on `#3056C9`) | 14.5 | 8 |

Stat color rule: **ink by default; one blue `#4A7BF7` focal stat per slide** (the number the buyer must remember). Categorical stripe/top-bar carries segment identity — never the numeral color.

### Component recipes (Slides shapes)

| Component | Recipe |
|---|---|
| Stat card | Rounded rect (r 6.75 pt = `radius.lg` 12px — Stage 3 supersedes the earlier 6 pt) fill `#F2F3F6`; top bar = 4 pt rect flush top, `#4A7BF7` or accent variant (t-teal/t-pink/t-purple/t-slate); stat 25 pt ink (focal: blue); label 8 pt |
| Stat-callout card | Rounded rect fill `#DDE5FE`; stat **ink** (blue only when focal); bold label; 2-line body |
| Persona / stripe card | Rounded rect fill `#DDE5FE` (persona) / `#F2F3F6` (market row); stripe = 3.5 pt rect flush left, full height, accent hex; budget chip = white rounded rect, **ink text**, accent border 1 pt |
| Channel split bar | Full-width bar, h 32 pt, segments = proportional rects (blue / teal / slate), 11 pt bold % labels — white on blue/slate, **ink on teal** (contrast), r 4.5 pt on outer corners only; channel name + RM + leads caption row beneath, aligned to segment centers |
| Budget pill | Pill shape fill `#3056C9`, white Bold 9.5 pt |
| Spec band | Full-width rect fill `#3056C9`, white Bold 8 pt, single line, items separated by `\|` |
| Data table | Header row fill `#3056C9` white Bold 7.5 pt; rows alternate white / `#F2F3F6`; number column Bold `#3056C9` |
| Phase row | Inside callout panel: 3.5 pt accent stripe rect + title Bold 8 pt + label Bold 7.5 pt body-gray + 2-line body 7.5 pt |
| White mini-card | White rounded rect (r 4.5 pt = `radius.md` 8px) nested inside a card/callout panel; title Bold 7.5 pt `#3056C9`; body 7 pt — used for targeting matrix + cadence strip |
| Accent-dot bullet | 3.5 pt circle, accent hex matching the card's stripe, 9 pt left of text; 7.5 pt body text |
| Numbered circle | 19 pt circle fill `#3056C9`, white Bold 7.5 pt two-digit number |
| Loop arrows (slide 14) | `→` glyph, 11 pt Bold `#4A7BF7`, vertically centered between cards |
| Seal | `[ caption ]` typed with the text, same color, space inside brackets. Never autoshape brackets |
| Wordmark | Insert → Image → `toggle-wordmark-{black,white}.png` from `assets/logos/` |
| Isometric forms | Place exported PNGs from `assets/illustrations/`. Never rebuild from Slides shapes |
| C1 strikethrough | Two stacked text boxes: struck line `#6B7280` with Slides strikethrough; rewrite below, larger, ink + one blue word |
| C2 disqualifier row | 12 pt bold ink line + 8 pt body-gray sub-line, 0.75 pt `#E4E6EE` divider, block vertically centered on slide |
| C3 table | Data-table recipe + body-gray left column; right column ink with bold `#3056C9` numerals + parenthetical source at 7.5 pt body-gray |

### The < 4-hour rebuild flow (success criterion #1)

0. Open the master deck (Google Drive → `Toggle Design System / 04 Sales Templates / Proposal Master` — location per Stage 12 governance). Confirm Inter Tight renders (copied decks keep fonts; rebuilt ones don't). ~5 min.
1. File → Make a copy. ~2 min.
2. Find & replace client name; cover client name swap. ~10 min.
3. Slides 2–3: markets + personas (edit text inside existing frames only). ~45 min.
4. Slides 4–8: budget, split %, channel slides — delete channels that don't apply; duplicate the campaign-card slide for extras. ~55 min.
5. Slides 9–13: positioning, messaging table, KPI targets. ~55 min.
6. Pick ≤ 2 contrarian inserts; write this prospect's ONE strikethrough; if C1 ships, delete slide 14's result band. ~20 min.
7. Gut-checks: one blue focal stat per slide · every claim has its receipt · one strikethrough total · accent-as-fill scan · anti-pattern scan (`BRAND-IDENTITY.md` §8). ~10 min.
8. **Calculator pass** (sums, daily × 30, market counts consistent across slides 2/4/13) · swap the closer's name + mobile on slide 15 · export PDF and flip through at 100% checking page breaks. ~15 min.

Total ≈ 3 h 40 m. If a step balloons, the template — not the operator — is at fault; file it against the system.

## 5. Architectural upgrade path (Stage 4 hooks)

These flat primitives get architectural twins in Stage 4 — the master is built so the swap is per-slide, not structural:

- Slide 4 channel split bar → **channel-stack-form** (block heights = budget %).
- Slide 13 focal stat → **stat-as-column** variant.
- Slide 14 loop-step cards → **4-block circuit** rendering of the loop-form.

Flat remains the fallback for dense or print-degraded contexts.
