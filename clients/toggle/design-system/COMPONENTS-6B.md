# Components 6b — Containers & Data (Stage 6b)

> Four specs on the binding `07-component-spec-template.md` format: **Card family**, **Tag/Chip**, **Stat block**, **Table**. Live artifact, both modes, all variants: **`components-6b.html`**. Architectural stat variants (stat-as-column, channel-mix-as-blocks) included per the Stage 4 hooks. Hexes in §5 tables = token values as of 2026-06-10; `tokens.json` is truth.

---

# Card family (base · stat · service · case-study · persona-segment · testimonial · team)

> **Purpose:** cards are where Toggle's receipts live — each variant pairs one claim with its evidence in a single visual unit (*Experienced*: stat next to claim, name next to expertise).

## 1. Anatomy

```
 base:        [ surface.card · radius.lg · padding space.5 ]
 stat:        + 7px top bar (brand/accent) · numeral · label · receipt line
 service:     + 40px icon chip · h4 · 2-sentence body · arrow-up-right bottom-right (live-site pattern)
 case-study:  + duotone image area (140px) · kicker CLIENT · VERTICAL · h4 title · body · stat-line · "Read more"
 persona:     + callout bg · 6px left stripe (accent) · budget chip (accent border, INK text) · dot bullets
 testimonial: + 17/700 quote with blue “ · attribution (name bold · org) · logo line
 team:        + 4:5 duotone rectangular portrait · name · role · tenure caption (border-top)
```

## 2. Token references (no hex)

| Property | Token |
|---|---|
| Background | `color.surface.card.[mode]` (persona: `surface.callout.[mode]`) |
| Radius / padding | `radius.lg` / `space.5` |
| Title / body / receipt | `text.primary` / `text.body` / `text.body` (small) |
| Kicker | `brand.primary-deep.[mode]`, `scale.overline` |
| Stat top bar / persona stripe | `brand.primary` or `accent.cat-N` **fill** |
| Stat numeral | `text.primary`; focal → `brand.primary` (ONE per surface) |
| Icon chip | `ICONOGRAPHY.md` chip math (40/24/8/`radius.lg`) with the **contextual background rule**: chip surface = one step above its container — on canvas → `surface.card` chip (the ICONOGRAPHY lock); on a card → `surface.canvas` light / `surface.raised` dark (registered in ICONOGRAPHY §1) |
| Budget chip | accent **border** `border-width.2`(1.5 optical) + **ink text** (accent discipline) |
| Portrait / image | `color.duotone.*` treatment (BRAND-IDENTITY §7); rectangular 4:5, never circular |
| Hover (interactive) | `state.hover` wash over the card tint (6% light / 8% dark); arrow translate 2px (reduced-motion: none) |
| Focus | `focus-ring.*` on the card container |
| Tenure divider | `border.subtle`, `border-width.1` |

## 3. Variants

Seven (above). Interactive variants (service, case-study, linked base) are a single `<a>` — whole card is one target, one destination (*Direct*).

## 4. Sizes

Cards size by grid, not by variant: 340px nominal in 3-col grids (the live-site service grid), full-width < 768. Team 260px (4:5 portrait). Persona 360px. No sm/lg variants — fewer variants.

## 5. States (dark + light — rendered)

| State | Light | Dark | Notes |
|---|---|---|---|
| default | `#F2F3F6` card | `#121C33` tint (no shadow — tint elevation) | |
| hover (interactive only) | +6% ink wash (`state.hover`) | +8% white wash (`state.hover.dark`) | arrow nudges 2px ↗; `duration.fast` |
| focus-visible | 2px `#3056C9` ring on container | `#6E95F9` ring | |
| active | +12% wash (`state.active`) | +16% (`state.active.dark`) | |
| disabled | n/a — cards don't disable; remove them instead | | *Unpretentious* |
| loading | skeleton: title + 2 body lines in `border.subtle` blocks, static | same | no shimmer |

## 6. Accessibility

- Interactive card = one `<a>` wrapping the whole card; heading inside keeps its level; decorative arrows `aria-hidden`.
- Image areas carry `role="img"` + `aria-label` naming client + treatment; duotone placeholders ship labeled until real photography lands.
- Testimonial: `<figure>/<blockquote>/<figcaption>`. Team tenure is text, not title-attribute.
- Contrast: title 17.3:1/16.9:1 on card; body 8.0/8.5; kicker 5.7/5.9; stat-line 5.7/5.9 — all AA.
- **Testimonial honesty rule:** ships only with a client-approved quote; the demo composite is labeled as such in-artifact (*Honest* outranks polish).

## 7. Responsive

375: single column, full-width, image areas keep ratio. 768: 2-up. 1024+: 3-up (service grid = the live-site 3×4).

## 8. Do / Don't

| ✓ Do | ✗ Don't | Why |
|---|---|---|
| Receipt line on every stat/case card | A number with no client/year | *Experienced* |
| One focal blue numeral per surface | Every stat blue | *Sharp* — the eye needs one anchor |
| Whole card = one link | Buttons + links + card-link nested | *Direct* |
| Rectangular duotone portraits + tenure caption | Circular avatar crops | BRAND-IDENTITY §7 — editorial, not WeWork |

## 9. Code

```html
<a href="/work/unitar" class="block max-w-[340px] overflow-hidden rounded-[var(--radius-lg)]
   bg-[var(--color-surface-card)] hover:bg-[color-mix(in_srgb,var(--color-surface-card),var(--color-text-primary)_6%)]
   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-state-focus-ring)]">
  <div class="h-[140px] bg-cover" role="img" aria-label="UNITAR campaign imagery, duotone treatment"></div>
  <div class="p-6">
    <span class="text-[13px] font-bold tracking-[.06em] uppercase text-[var(--color-brand-primary-deep)]">UNITAR · Higher-Ed</span>
    <h3 class="text-[17px] font-bold text-[var(--color-text-primary)] mt-2">From Moonshot to Milestone</h3>
    <p class="text-[14px] text-[var(--color-text-body)] mt-1">…</p>
    <div class="text-[13px] font-bold text-[var(--color-brand-primary-deep)] mt-2 tabular-nums">32,000+ leads · −47% CPL</div>
  </div>
</a>
```

## 10. Belief check

> "Every claim on this card comes with its receipt — these people document what they ship."

---

# Tag / Chip

> **Purpose:** compact classification — vertical, channel, persona, or report status — without stealing hierarchy from the content it labels.

## 1. Anatomy

`[ (dot) label ]` — 24px tall, `radius.sm`, 13px text, padding 0 10px. Status variant adds a 7px `currentColor` dot.

## 2. Token references (no hex)

| Variant | Background | Border | Text |
|---|---|---|---|
| neutral | `surface.card` (`surface.raised` on dark cards) | none | `text.body` |
| accent | transparent | `accent.cat-N` 1.5px | `text.primary` — **ink, never the accent** (accent discipline) |
| status | state color @ 10% mix | none | `state.success/warning/error/info` + dot |

## 3. Variants

neutral · accent (cat-2/3/4 shown) · status (ok/watch/off-target/new — **reports and dashboards only**, never proposals: status colors are semantic and proposals rank claims with words).

## 4. Sizes

One: 24px. A tag that needs to be bigger is a heading.

## 5. States (dark + light — rendered)

| State | Light | Dark | Notes |
|---|---|---|---|
| default | per §2 | per §2 (status colors use dark siblings — `#3DD6A3`/`#F5B07A`/`#FF7A70` on 10% washes) | |
| interactive states | none — tags are read-only in v1 | | filtering chips are a v2 component |

## 6. Accessibility

Read-only `<span>`; the dot is `aria-hidden` (color+dot never the sole carrier — the label text says the status). Status text on its 10% wash composited over **canvas** (computed): success 5.61 light / 8.46 dark · warning 4.74 / 8.52 · error 4.87 / 6.51 · info 5.49 / 5.70 — AA. **Binding: status tags sit on canvas/raised surfaces only** — composited over `surface.card.light` warning drops to 4.29 and error to 4.43 (below AA). On a card, raise the wash to 14% or use the neutral tag + words.

## 7. Responsive

No change; wraps inline.

## 8. Do / Don't

| ✓ Do | ✗ Don't | Why |
|---|---|---|
| "Off target" in words + color | Color-only severity | *Honest* — say it, don't hint it |
| Accent border + ink text | Accent-colored text | Accent discipline (BRAND-IDENTITY §4) |
| ≤ 2 tags per card | Tag clouds | *Unpretentious* |

## 9. Code

```html
<span class="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-[var(--radius-sm)] text-[13px] font-bold
  text-[var(--color-state-success)] bg-[color-mix(in_srgb,var(--color-state-success),transparent_90%)]">
  <span class="w-[7px] h-[7px] rounded-full bg-current" aria-hidden="true"></span>On target</span>
```

## 10. Belief check

> "Status is stated, not decorated — I can read the report without a legend."

---

# Stat block (single · 3-up · 4-up · architectural)

> **Purpose:** the receipt as a component — the number a buyer remembers after the tab closes.

## 1. Anatomy

Stat card (§Card) composed into grids: single hero · 3-up · 4-up. Architectural variants per `CHARTS.md`: **stat-as-column** (stroke-only — fixed height encodes nothing) and **channel-mix-as-blocks** (heights = real shares) — both rendered in the artifact.

## 2. Token references

Inherits Card stat tokens. Numerals: `scale.numeric-display` (44) / `-hero` (56) / grid-fitted 38 with `white-space:nowrap` for wide values (`RM 15,000`, ranges). Number formatting per `CHARTS.md` §3.

## 3. Variants

single (focal by default) · 3-up · 4-up (max — 5+ stats is a table) · architectural (threshold moments only).

## 4. Sizes

Numeral steps: 56 hero / 44 default / 38 wide-value. Grid gap `space.4`.

## 5. States

Static content — no interactive states. Loading: skeleton numeral bar; empty: **never render a placeholder number** (CHARTS.md empty-state rule).

## 6. Accessibility

Numeral + label + receipt are one reading unit (single container, source order: number → label → receipt). Architectural SVGs carry `role="img"` + `aria-label` with the value. Contrast: ink numerals 17.3/16.9 on card; **focal `#4A7BF7` on card 3.46 light / 4.41 dark** — passes the 3:1 large-text bar at ≥38px/800 only (never focal below 38px on card); receipt 8.0/8.5.

## 7. Responsive

4-up → 2×2 at 768 → stacked at 375 (focal stat first in source order).

## 8. Do / Don't

| ✓ Do | ✗ Don't | Why |
|---|---|---|
| One blue focal per surface | All-blue grids | *Sharp* |
| Receipt under every numeral | Bare numbers | *Experienced* |
| `tabular-nums`, static | Animated counters | *Sharp* — TOKENS §3 |

## 9. Code

See Card §9; grid: `grid gap-4 md:grid-cols-2 lg:grid-cols-4`.

## 10. Belief check

> "The result is real, attributed, and they'll show it to me the same way twice."

---

# Table (accent stripe · banding · total row)

> **Purpose:** where the numbers ARE the argument — proposals and reports. The flat table outranks every decorated alternative at precision moments (CHARTS.md §4.11).

## 1. Anatomy

```
 caption (13, text.body, top-left)
 header row — primary-deep fill, white 700
 body rows — banding: odd canvas / even surface.card; 5px accent stripe on categorical rows
 numeric columns — right-aligned, tabular, primary-deep 700
 total row — 2px border.strong top, text.primary 700
```

## 2. Token references (no hex)

| Property | Token |
|---|---|
| Header fill / text | `brand.primary-deep.light` **both modes** + `text.inverse.light` — the cross-mode header rule, registered in TOKENS §8: the header band stays one blue across artifacts (Stage 4 charts use it too); ratios in §6 |
| Banding | `surface.card.[mode]` even rows |
| Stripe | `accent.cat-N` fill, 5px, categorical (stable channel identities per CHARTS.md §2) |
| Numbers | `brand.primary-deep.[mode]`, 700, tabular, right-aligned |
| Total rule | `border.strong`, `border-width.2` |
| Caption | `text.body`, `scale.small` |

## 3. Variants

base · striped (categorical rows) · with-total. Dense report variant (32px rows) deferred to Stage 8d.

## 4. Sizes

Row 42px nominal; min-width 520 with horizontal scroll wrapper below that.

## 5. States (dark + light — rendered)

| State | Light | Dark | Notes |
|---|---|---|---|
| default | banding `#F2F3F6` | banding `#121C33` | |
| header | `#3056C9` + white | `#3056C9` + white (deliberate — see §2) | |
| row hover (web reports) | `state.hover` wash | `state.hover.dark` wash | optional, report contexts |
| loading / empty | skeleton rows / CHARTS.md empty-state | same | |

## 6. Accessibility

Real `<table>` + `<caption>` + `<thead>/<th scope="col">`; numeric `<td>` right-aligned with `tabular-nums`; stripes are supplementary (the first column names the category in words); scroll wrapper gets `tabindex="0"` + `role="region"` + `aria-label` + a focus ring so keyboard users can scroll it. Contrast (computed): header white on `#3056C9` 6.36 both modes · numbers 5.73 banded / 6.36 plain light, 5.91 / 6.52 dark · total-row ink 17.3/16.9.

## 7. Responsive

Horizontal scroll inside `.tablewrap` below 520px content width — **never** card-ify rows (re-layout breaks column comparison, the table's whole job).

## 8. Do / Don't

| ✓ Do | ✗ Don't | Why |
|---|---|---|
| Caption states the claim + unit | "Table 1" | *Sharp* |
| Right-align + tabular numerals | Centered numbers | *Experienced* — column comparison is the job |
| Total row when columns sum | Implied totals | *Honest* — show the arithmetic (Stage 2 lesson) |
| Stripe + named category | Stripe-only meaning | a11y — color never sole carrier |

## 9. Code

```html
<div class="overflow-x-auto" role="region" aria-label="Monthly budget by channel" tabindex="0">
<table class="border-collapse text-[13.5px] min-w-[520px]">
  <caption class="text-left text-[13px] text-[var(--color-text-body)] pb-2">Monthly budget by channel — Sunway TES plan (RM)</caption>
  <thead><tr>
    <th scope="col" class="bg-[#3056C9] text-white font-bold text-left px-3.5 py-2.5">Channel</th>
    <th scope="col" class="bg-[#3056C9] text-white font-bold text-right px-3.5 py-2.5">Budget</th></tr></thead>
  <tbody>
    <tr><td class="relative pl-[19px] px-3.5 py-2.5 before:absolute before:left-0 before:inset-y-0 before:w-[5px] before:bg-[var(--color-brand-primary)]">Google Search</td>
        <td class="text-right font-bold tabular-nums text-[var(--color-brand-primary-deep)] px-3.5 py-2.5">RM 7,500</td></tr>
    <tr class="font-bold"><td class="border-t-2 border-[var(--color-border-strong)] px-3.5 py-2.5">Total</td>
        <td class="border-t-2 border-[var(--color-border-strong)] text-right tabular-nums px-3.5 py-2.5">RM 15,000</td></tr>
  </tbody>
</table></div>
```

## 10. Belief check

> "The columns add up, the totals are shown, and nothing is hiding in a chart."
