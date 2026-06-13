# Toggle Solutions — Design Tokens (Stage 3)

> **Extracted where Stages 1–2 shipped a value; minted where the canon is silent** — every minted value carries `(minted)` in its `tokens.json` description and is open to Zaid's override. Machine source of truth: **`tokens.json`** (W3C DTCG format · 193 leaves · every color with explicit `.light`/`.dark` siblings · 31 aliases, all resolving — validated).
>
> Naming: `category.role.variant[.state]` — e.g. `color.surface.card.dark`, `color.accent.cat-2.text.light`.
>
> **Consumption (Google-suite-first, pre-flight #4):** (1) this doc for humans; (2) `tokens.json` for Figma Variables / Style Dictionary (v2 — the `.light`/`.dark` leaf-sibling format collapses to Figma modes with one ~30-line script; elevation ships as effect styles, typography as text styles with tabular figures set in OpenType features); (3) a Google Sheets mirror for the team — **color columns labeled "shape/stripe color — NEVER for text" vs "text color"**, contrast ratios on a second tab; (4) one CSS variables file for toggle.solutions (generators: skip the `print` group; hand-write the `prefers-reduced-motion` block; tabular-nums needs a custom transform).

---

## 1. Color

### 1.1 Brand

| Token | Light | Dark | Notes |
|---|---|---|---|
| `color.brand.primary` | `#4A7BF7` | `#4A7BF7` | Blueprint blue (locked 2026-06-10). Display ≥18.66px bold / numerals / illustration only on light — 3.84:1 |
| `color.brand.primary-deep` | `#3056C9` | `#6E95F9` | **Canonical** text-safe blue — link, focus-ring, info, cat-1.text all alias here. 6.36 / 6.52:1 |
| `color.brand.wordmark` | `#0F0F0F` | `#FFFFFF` | "Black" = system ink, not #000000. Only from `assets/logos/toggle-wordmark.svg` |

### 1.2 Surfaces (canvas/card/raised/overlay + callout; dark elevates by tint, never shadow)

| Token | Light | Dark |
|---|---|---|
| `color.surface.canvas` | `#FFFFFF` | `#0A1224` |
| `color.surface.card` | `#F2F3F6` | `#121C33` |
| `color.surface.raised` | `#FFFFFF` + `elevation.2.light` | `#1A2540` |
| `color.surface.overlay` | `#FFFFFF` + `elevation.3.light` | `#232F4D` |
| `color.surface.callout` | `#DDE5FE` | `#18254A` |

### 1.3 Text (ratios = on canvas / on card)

| Token | Light | vs white/card | Dark | vs navy/card | Role |
|---|---|---|---|---|---|
| `color.text.primary` | `#0F0F0F` | 19.2 / 17.3 | `#FFFFFF` | 18.7 / 16.9 | Headings, stat numerals |
| `color.text.body` | `#4A4A4A` | 8.9 / 8.0 | `#B0B8C9` | 9.4 / 8.5 | Body copy |
| `color.text.secondary` | `#6B7280` | 4.8 / **4.4**¹ | `#9CA3B5` | 7.4 / 6.7 | Supporting text; struck-line color (§B1) |
| `color.text.muted` | `#9AA0A8` | 2.6 — **decorative only, both modes** | `#6B7689` | 4.1 | Watermarks, seals — never content |
| `color.text.inverse` | `#FFFFFF` | 6.4 on primary-deep fills | `#0F0F0F` | per fill | Text on filled bands/headers |
| `color.text.link` | → primary-deep | 6.4 | → primary-deep | 6.5 | Links |
| `color.text.link-visited` | `#6D46C2` | 6.4 / 5.7 | `#A78BFA` | 6.9 / 6.2 | Visited |

¹ 4.36:1 on card.light — at body size keep secondary on canvas; on card require ≥18.66px bold.

### 1.4 Border

| Token | Light | Dark | Note |
|---|---|---|---|
| `color.border.subtle` | `#E4E6EE` | `#1F2A44` | Hairlines — decorative delineation |
| `color.border.default` | `#D2D6E2` | `#2A3756` | Component borders — decorative; input-boundary strategy → Stage 6a (§8) |
| `color.border.strong` | `#9AA0A8` | `#44537A` | Table outer rules, emphasis |
| `color.border.focus` | → state.focus-ring | | → state.focus-ring | |

### 1.5 State (semantic — orthogonal to accents; hexes deliberately distinct from accent text variants)

| Token | Light | Dark | Ratio (canvas) |
|---|---|---|---|
| `color.state.hover` | ink @ alpha 0F (5.9%) | white @ 14 (7.8%) | wash over resting surface |
| `color.state.active` | ink @ 1F (12.2%) | white @ 29 (16.1%) | |
| `color.state.disabled` | `#9AA0A8` + opacity.40 | `#6B7689` | WCAG-exempt |
| `color.state.focus-ring` | → primary-deep `#3056C9` | → `#6E95F9` | 6.4 / 6.5 |
| `color.state.error` | `#C03028` | `#FF7A70` | 5.7 / 7.4 |
| `color.state.success` | `#0B6B4D` | `#3DD6A3` | 6.5 / 10.1 |
| `color.state.warning` | `#A4541C` | `#F5B07A` | 5.4 / 10.1 |
| `color.state.info` | → primary-deep | → primary-deep | 6.4 / 6.5 |
| `color.state.scrim` | navy @ 99 (60%) | black @ A6 (65%) | modal backdrop |

**For Slides users (no alpha hex):** hover-on-canvas light `#F1F1F1` · hover-on-card light `#E5E6E8` · active-on-canvas light `#E2E2E2` · hover-on-canvas dark `#1D2535` · active-on-canvas dark `#313847` — precomputed flat equivalents.

### 1.6 Categorical accents

**Binding (unchanged from Stage 2 QA):** on proposal/Slides surfaces, accent-coded **text is ink or body gray** — accents are fills (stripes, top bars, chip borders, bullets, segments). The `.text` variants below are scoped to **dataviz labels and web UI only** (a disclosed Stage 3 amendment — §8.2, needs Zaid's sign-off).

| Token | Fill light | Fill dark | Text light (dataviz/web) | Text dark |
|---|---|---|---|---|
| `cat-1` blue | `#4A7BF7` | `#4A7BF7` | → primary-deep 6.4 | → 6.5 |
| `cat-2` teal | `#2ECC9B` ² | `#2ECC9B` | `#0E7A57` 5.3 | `#2ECC9B` 9.1 |
| `cat-3` pink | `#F59EC9` ² | `#F59EC9` | `#B0457E` 5.3 | `#F59EC9` 9.4 |
| `cat-4` purple | `#8E6BE6` | `#8E6BE6` | `#6D46C2` 6.4 | `#A78BFA` 6.9 |
| `cat-5` orange | `#F28B4C` ² | `#F28B4C` | `#B05A1F` 4.9 ³ | `#F2A35C` 9.0 |
| `cat-6` slate | `#2C2C36` | `#6B7489` | `#2C2C36` 13.8 | `#9AA3B8` 7.4 |

² Below 3:1 on white — banding/stripe beside labeled text only, never a standalone meaning-carrying mark. ³ 4.37:1 on card.light — canvas-only at body size. Slate's dark fill re-minted (light slate is 1.35:1 on navy). cat-6 exists because the brief's own list has six colors (§8.1).

### 1.7 Duotone (imagery treatment — finalizes the Stage 1 interim locks)

| Token | Light surfaces | Dark surfaces |
|---|---|---|
| `color.duotone.shadow` | → brand.primary `#4A7BF7` | → canvas.dark `#0A1224` |
| `color.duotone.highlight` | `#FAFAFA` paper-white | → brand.primary `#4A7BF7` |

### 1.8 Dataviz

`dataviz.cat-1…5` → accent fills · `gridline` → border.subtle · `axis` → border.strong · `banding` → surface.card · `tint-1` `#B7CBFB`/`#27406F` (minted Stage 4 — paired-member/terrain tint). Chart rules: `CHARTS.md`.

### 1.9 Print (CMYK in `tokens.json` → `print.$extensions` — naive uncoated conversion, **vendor-proof before paid runs**)

Blue C70 M50 Y0 K3 · Deep blue C76 M57 Y0 K21 · Ink 0/0/0/94 · Navy C72 M50 Y0 K86 · Teal C77 M0 Y24 K20 · Pink C0 M36 Y18 K4 · Purple C38 M53 Y0 K10 · Orange C0 M43 Y69 K5 · Slate C19 M19 Y0 K79.
Geometry: A4 margin `12mm` · bleed `3mm` · safe `6mm` · gutter `5mm` · iso stroke at A4 `0.6pt` (floor `0.4pt`).

## 2. Opacity

`0 · 5 · 10 · 20 · 30 · 40 · 50 · 60 · 70 · 80 · 90 · 100` (%). `opacity.40` = disabled convention.

## 3. Typography

**Inter Tight** (locked) · weights 400/500/700/800 (4 of 9 — decision rule 3, §8.4) · **no italics in v1** · wordmark = Alliance No 1, brand mark only.

> **Building in Slides? Use the pt column. Never type the px number into a pt field.**

| Token | px (1280 ref) | **Slides pt** | Weight | Line | Use |
|---|---|---|---|---|---|
| `scale.display` | 64 | 36 | 800 | 1.05 | Cover names, heroes |
| `scale.h1` | 38 | 21.5 | 800 | 1.1 | Slide titles (brand blue on light) |
| `scale.h2` | 28 | 16 | 800 | 1.15 | Section headings (minted) |
| `scale.h3` | 22 | 12.5 | 700 | 1.25 | Panel titles |
| `scale.h4` | 17 | 9.5 | 700 | 1.3 | Card titles |
| `scale.body-lg` | 15 | 8.5 | 400 | 1.5 | Kickers — max 72ch |
| `scale.body` | 14 | 8 | 400 | 1.5 | Default body |
| `scale.small` | 13 | 7.5 | 400 | 1.45 | Bullets, cells — projected floor |
| `scale.caption` | 13 | 7.5 | 500 | 1.4 | Decorative (muted color only) |
| `scale.overline` | 13 | 7.5 | 700 | 1.2 | Uppercase kickers |
| `scale.numeric-display` | 44 | 25 | 800 | 1.0 | Stats — **always tabular** |
| `scale.numeric-hero` | 56 | 31.5 | 800 | 1.0 | Hero stats |
| `scale.numeric-mid` | 30 | 17 | 800 | 1.0 | Channel-slide stats (34px → 30, §8) |
| `scale.numeric-compact` | 29 | 16.5 | 800 | 1.0 | KPI grids |

Stat color: ink by default, `brand.primary` for the single focal stat per surface.

## 4. Space, radius, borders, icons

- **`space.1–12`**: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160 · 192` px (Stage 2's off-scale gaps normalize on next touch, §8).
- **Radius → component class:** `none 0` tables/bars/iso artwork · `sm 4` tags · `md 8` mini-cards/bands/inputs (Slides 4.5pt) · `lg 12` cards/callouts/chips (supersedes Stage 2's 10px — Slides 6.75pt) · `xl 16` heroes/modals · `pill 999` buttons + budget pills only.
- **`border-width`**: 0 / 1 / 2 px.
- **`icon-size`**: sm 16 · md 20 · lg 24 (primary) · xl 32 (minted; grammar lands Stage 5).

## 5. Elevation

Uniform type per level: `elevation.1/2/3.light` = shadows (0 1 3 @10% · 0 4 12 @12% · 0 12 32 @16%, all `#0A1224`-based); `elevation.1/2/3.dark` = **none** — dark elevates by surface tint (`surface.card/raised/overlay.dark`). Figma: ship as effect styles.

## 6. Motion

fast 150 / base 250 / slow 400 ms · reduced fallbacks 0ms each (hand-written `prefers-reduced-motion` block) · `easing.base` `cubic-bezier(0.22, 1, 0.36, 1)` · `easing.toggle-flip` `cubic-bezier(0.45, 0, 0.25, 1)` **provisional until Stage 10**.

## 7. Z-index, breakpoints, focus ring

z-index: base 0 · dropdown 1000 · sticky 1100 · overlay 1200 · modal 1300 · toast 1400 · tooltip 1500. Breakpoints: 375 / 768 / 1024 / 1440. Focus ring: color → state.focus-ring · 2px · offset 2px · solid (strokeStyle).

## 8. Day-1 component mappings + disclosed deviations

**Day-1 mappings (Stage 6 builders, read first):**
- **Button primary fill = `brand.primary-deep`, never `brand.primary`** (white label on #4A7BF7 = 3.84:1, fails at label size).
- **Placeholder text = `text.secondary`, never `text.muted`** (muted is decorative-fenced at 2.6:1).
- **Selection (::selection)**: `surface.callout.light` bg + `text.primary.light`.
- **Modal backdrop = `state.scrim`**.

**Stage 6a mints:** `color.border.control` (checkbox/radio boundary, ≥3:1 — `#6B7280`/`#6B7689`) · `color.state.hover-fill` / `active-fill` (10%/16% washes over colored fills).

**Stage 6b registrations:** table header band = `primary-deep.light` `#3056C9` + white in **both modes** (brand-stable header; the dark sibling fails white text) · status tags restricted to canvas/raised surfaces (on-card wash fails AA) · 38px grid-fitted stat numeral (between numeric-mid and numeric-display) · accent-tag borders cat-2/3 are sub-3:1 decorative boundaries (label carries identity — token-review watch item).

**Deviations register:**
1. `cat-6` slate beyond "cat-1–5" — the brief's own list has six colors.
2. **Accent `.text` variants** for all six cats — amends Stage 2's "ink or body gray" rule, scoped to dataviz labels + web UI only; proposal surfaces unchanged. **Needs Zaid's sign-off.**
3. `surface.callout` = 5th surface tint beyond the brief's four (shipped in Sunway; measured).
4. 4 of Inter Tight's 9 weights shipped (decision rule 3 — fewer variants).
5. Normalizations on next touch: HTML 13.5→13px, 14.5→14px, 34→30px stats, 10px→12px card radius (PROPOSAL-MASTER §4 recipes updated), off-scale gaps → 4pt scale, h1 line-height 1.08→1.1.
6. `color.print` shipped as `print` group + `$extensions` CMYK (W3C has no CMYK/mm types).
7. CMYK unproofed; `toggle-flip` provisional; deck black→navy migration on touch.
8. Input-border contrast strategy (default border is 1.4:1 decorative) decided in Stage 6a.
9. State hexes deliberately one step off the accent text variants (success ≠ teal, warning ≠ orange) so semantic and categorical colors never collide.
