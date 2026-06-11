# Toggle Brand DNA — what already exists

> Extracted from toggle.solutions live site, Company Profile Deck, Sunway TES proposal, and recent LinkedIn posts. This is the canonical visual language the design system must **codify**, not reinvent.

## 1. The wordmark

- **`toggle`** — all lowercase, italic, custom sans-serif (geometric with a soft warmth — looks adjacent to Recoleta Italic, Cooper, or a custom modification).
- Stroke is medium-bold. The italic angle gives momentum.
- White on dark backgrounds. Black or primary blue on light backgrounds. Never colored otherwise.
- Sits ~32px from canvas edges in deck/proposal headers; bottom-left of social cards.

## 2. The signature visual hook — isometric 3D architecture

This is THE Toggle visual. It maps directly to the positioning ("Technical Growth Architecture"). It is the strongest single asset Toggle owns visually and the system must lean into it.

- **Form vocabulary.** Cube-derived 3D blocks rendered in **wireframe outline** at primary blue, with **one face filled solid blue** for emphasis. Axonometric / isometric projection at ~30°/30°/90°.
- **Composition recurring forms observed.**
  - The "T" form (the company's mark rendered as 3D architecture) — used on title slides and the closing CTA.
  - A "step" form (two blocks at different heights) — used on the company profile cover.
  - A "loop/toggle switch" form — used on the closing slides (suggests the brand name visually).
- **Line weight.** ~2px outline at deck scale.
- **Where they appear.** Title slides, section openers, hero illustrations, closing CTAs. Never in dense body content or as decoration in stat-heavy pages.

## 3. The `[ bracket ]` device

- Asymmetric square brackets framing taglines, URLs, section labels.
- E.g., `[ Your Digital Growth Partner ]`, `[ toggle.solutions ]`.
- Used as a watermark at top-right of proposal pages and bottom of cover slides.
- Treat as a brand mark — never around body copy.

## 4. Color (extracted, hex-approximated — confirm in Stage 2)

### Dark mode (web, deck, social, ads — 70% of surface area)

| Role | Approx. hex | Notes |
|---|---|---|
| Canvas / base | `#000000` (deck) → `#0A1224` (web) | Deck uses pure black; site softens to deep navy. Lock one. |
| Surface (cards) | `#0F1830` – `#121B36` | Dark navy with slight transparency feel |
| Primary blue | `#2D5FFF` – `#3060FF` | Vibrant, slightly purple-tinted. The single accent. |
| Text — primary | `#FFFFFF` | |
| Text — secondary / body | `#9CA3B5` – `#B0B8C9` | Cool muted gray |
| Border / divider | `#1F2A44` – `#243150` | Subtle on dark |

### Light mode (proposals, reports, contracts)

| Role | Approx. hex | Notes |
|---|---|---|
| Canvas | `#FFFFFF` | Pure white |
| Surface (cards) | `#F3F4F8` – `#F5F6FA` | Cool off-white |
| Surface (highlighted/data panels) | `#E5E7FE` – `#E8EAFC` | Soft periwinkle/lavender — the "callout" tint from Sunway proposal |
| Primary blue | same `#2D5FFF` family | |
| Text — primary | `#0A1224` or `#000000` | |
| Text — secondary | `#5A6479` – `#6B7280` | |

### Semantic accent palette (from Sunway proposal — used for multi-segment data)

Each segment (channel, market, persona) gets its own consistent stripe color:

| Token | Approx. hex | Use |
|---|---|---|
| Accent — teal/green | `#22C098` – `#10B981` | Second segment (e.g., Meta, Fresh Grad, market 2) |
| Accent — pink | `#F4ABCB` – `#F472B6` | Third segment (e.g., LinkedIn, Final-Year, market 3) |
| Accent — purple | `#A78BFA` – `#8B5CF6` | Phase 3 / advanced segment |
| Accent — orange | `#F89D5C` – `#F97316` | Phase 1 / urgent segment |
| Accent — dark slate | `#2C2C36` | "Other" / neutral segment |

Treat accents as **categorical** (which thing this is), not semantic (good/bad). Use sparingly — never more than one accent on a single artifact's hero element.

## 5. Typography (observed — confirm in Stage 2)

- **Wordmark italic:** custom (see §1). Likely Recoleta Italic or a modified Cooper. **TODO — confirm exact font.**
- **Display + headings:** geometric sans-serif, heavy weight, slight condensed feel. Reads like **Switzer**, **Inter Tight**, **Manrope**, or **Aeonik**. Title case. Strong tracking on big headers.
- **Body:** same family at regular/medium weight. Plenty of line-height for scannability on dark.
- **Numbers/stats:** display weight, often colored primary blue or in semantic accent. Used at 64px+ in stat cards.
- **No serif** observed anywhere. No script. No mono in marketing surfaces (mono may be appropriate for case study code/data snippets — design system to decide).

## 6. Component patterns currently in use

| Pattern | Where it appears | What to codify |
|---|---|---|
| **Stat card** (huge number + label + caption) | LinkedIn carousels, Sunway proposal | Big numeric in primary blue or accent, secondary label below. Used in 3-up or 4-up grids. |
| **Color-stripe card** | Sunway proposal (personas, market segments) | Left or top stripe in semantic accent. Card body in light-surface tint. |
| **Service card** | Live site (3-col grid of 12) | Dark card, icon in rounded-square chip top-left, title + 2-sentence body. Subtle arrow bottom-right. |
| **Pill button** | Live site CTA | Fully rounded, primary blue, white text, right-pointing arrow icon. |
| **Icon-in-chip** | Live site service grid | Monochrome blue line icon inside a 40px rounded-square dark chip. |
| **Vertical timeline** | Case study slides, "We Solve This By" deck slide | Vertical line with circular nodes at each step. |
| **Bracket section marker** | Proposal headers, deck covers | `[ label ]` device at top-right corner or framing tagline. |
| **Isometric hero illustration** | Deck cover, closing slide, Sunway cover | Big 3D wireframe block(s) paired with headline. |
| **Client logo wall** | Deck "Our Clients" slide, live site partner band | Monochrome white logos in 4–5 column grid on dark. |
| **Strikethrough hero** | Live site headline ("YOUR MARKETING AGENCY" struck through → "YOUR DIGITAL GROWTH PARTNER") | A distinctive contrarian device that mirrors the voice's "we'll tell you what you don't want to hear" — formalize as a hero pattern. |

## 7. Photographic / imagery patterns

- **Team portraits:** circular crop on dark background, color photo, soft consistent lighting (deck "The Team" slide).
- **Case study imagery:** product/context photos (UNITAR student, CIMB bank, fertility centre interior) — fairly stocky, inconsistent treatment. **System needs a treatment rule** (duotone? subtle blue overlay? consistent grading?).
- **Hero imagery:** none on current site — the isometric illustration carries it. **Design system should preserve this** — avoid generic agency stock photography in hero positions.

## 8. What's MISSING / weak

These are the gaps the design system must fill:

- No documented tokens — every color/size/font lives in the designer's head or the Lovable export.
- No real component library — the live site has components but they're not specced for re-use.
- No iconography system — service icons exist but aren't on a documented grid.
- No motion system — site has hover states, no documented easing/duration.
- No data viz system — Toggle is data-led but has no chart style.
- No template library — proposals get rebuilt from scratch in Google Slides every time.
- No video templates — TikTok/Shorts strategy is mentioned in voice doc but no lower-thirds, no bumpers.
- No sub-brand handling rules — Toggle Bespoke exists but visually unspecified.
- No imagery direction — photographs are inconsistent across slides.
- No "voice in design" doc — voice rules exist for copy, not for layout/composition decisions.

## 9. Three strategic strengthening recommendations (preserve these in the brief)

### 1. The architecture motif must become a system, not a sticker

The isometric blocks are a defensible visual hook competitors don't have. But on the current site/deck they appear only on title slides, section openers, and closing CTAs — decorative real estate. The design system must extend the metaphor into **functional components**:

- **Stat cards** rendered as isometric load-bearing columns (the big number sits on top of the column)
- **Channel mix** rendered as stacked architectural blocks (each block height = budget %; each block color = channel)
- **Funnel diagrams** rendered as stepped axonometric forms
- **Lead-quality loops** rendered as 4-block circuits
- **Dot-timeline (case study challenge→solution→result)** rendered as architectural section drawings with annotation lines
- **Comparison tables** rendered with the structural-column metaphor on the left axis

**The binding rule:** any chart in the system must be expressible as both a flat chart AND an architectural primitive. If it can't, it doesn't enter the system. Flat is the fallback; architectural is the default.

### 2. The strikethrough rewrite is Toggle's system-level rhetorical pattern

"YOUR MARKETING AGENCY" struck through to "YOUR DIGITAL GROWTH PARTNER" is the single most distinctive hero on the live site. It captures the contrarian voice in one image. **Promote it from one-time hero device to system-level rhetorical pattern.** Six worked applications the design system must spec:

| Surface | Strikethrough rewrite |
|---|---|
| **Website hero** | `~~Your marketing agency~~` → **Your digital growth partner** |
| **Service description** | `~~Ad agency~~` → **Growth partner that diagnoses before prescribing** |
| **Pricing slide** | `~~Long-term retainer lock-in~~` → **Earned through performance, no contracts** |
| **Team framing** | `~~Junior account managers~~` → **Senior operators only** |
| **Case study challenge** | `~~"We need more ads"~~` → **"We need better diagnosis"** |
| **OOH / print leave-behind** | `~~Industry average~~` → **Cross-industry pattern transfer** |

The strikethrough is Toggle's fingerprint. Mailchimp has the wobble, Slack has the hashtag, Stripe has the gradient bar — Toggle has the rewrite. Every surface where Toggle defines itself against category default uses this device.

### 3. Voice → design needs positive rules for "Experienced" and "Unpretentious"

The current voice doc maps three adjectives sharply (Direct, Honest, Sharp) but lets two go fuzzy:

- "Experienced" → vague ("dense data tables") — every B2B brand claims this.
- "Unpretentious" → defined only by negation ("no neon, no shaders") — a reject list isn't a design decision.

**The system needs positive rules:**

- **Experienced → Every assertion carries its receipt inline.** Stat next to claim. Source next to quote. Named operator next to expertise claim. No decoupled "trust us" copy. This is how a senior strategist actually communicates — they show the data inline, not in an appendix.
- **Unpretentious → Nothing decorative survives review.** Every element load-bearing. If a line, shape, or color can be removed without losing meaning, remove it. Architectural-drawing discipline — every line means something.

These two rules, applied across the system, do more for differentiation than the three "easy" adjectives combined.
