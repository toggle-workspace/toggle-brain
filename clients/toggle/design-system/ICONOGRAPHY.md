# Toggle Solutions — Iconography & Illustration (Stage 5)

> The icon system + the canonical isometric illustration assets. Gallery with every glyph at every size, in chips, both modes: **`icons.html`**. Master SVGs: `assets/icons/*.svg` (30 files, stroke `currentColor`). Canonical forms + PNG exports: `assets/illustrations/`. Wordmark exports: `assets/logos/toggle-wordmark-{black,white}.png` (@2x, transparent).
>
> **Stage 2 Slides dependency status:** wordmark PNGs ✓ · step-form svg+png ✓ · channel-stack svg+png ✓ · **loop-form still a placeholder** — the true form must be traced from the Sunway Thank-You artwork by a designer (the one remaining blocker for the Slides master's closing slide; everything else can be assembled now).

---

## 1. The locks

| Decision | Lock | Rationale |
|---|---|---|
| Grid | **24 × 24** viewBox, 2 px safe margin (content within 20 × 20). Anchor points snap to the 0.5 grid; circle radii and arc parameters are exempt (compass values land where the geometry lands). Sanctioned overshoots: miter tips of arrowheads/funnels may enter the margin but never within 1.5 px of the viewBox edge | Primary size everywhere icons do real work (chips, cards, nav) |
| Stroke weight | **2 px — one weight, no exceptions** | The blueprint-pen ratio: 2/24 matches the iso motif's stroke-to-mass weight at deck scale; 1.5 px disappears on the dark navy chips. Icons scale geometrically — at 16 px the effective 1.33 px stays crisp on 2× screens; we do NOT redraw per size. (§A1's canvas-keyed stroke formula and 1.5 px floor govern the isometric **motif**, not glyphs — consumers resize via CSS width/height; the intrinsic 24px attrs are defaults) |
| Endcap | **Butt** | Matches `SIGNATURE-DEVICES.md` §A1 — one drafting hand across icons and isometrics |
| Join | **Miter** | Same |
| Color | `stroke="currentColor"`, `fill="none"` — color comes from context, never baked in | One SVG per glyph serves every mode |
| Fills | None. Stroke-only glyphs | Drawn things, not stickers |
| Curves | Circles and arcs permitted (the drafting compass); **no freeform/organic curves, no blobs** | Icons live in the drafting tradition; the no-curves rule in §A2 governs isometric compositions, not glyphs |

### Icon scale — use-case per size

| Token | Size | Use |
|---|---|---|
| `icon-size.sm` | 16 | Inline with `scale.small` text, table cells, tags |
| `icon-size.md` | 20 | Inline with body/UI text, buttons, inputs |
| `icon-size.lg` | **24 — primary** | Service chips, cards, nav |
| `icon-size.xl` | 32 | Feature/hero slots, empty states |

### Chip wrap math (locked)

**Chip 40 px square · icon 24 px · padding 8 px each side (24 + 8 + 8 = 40) · radius 12 px (`radius.lg`).** **Contextual background (added Stage 6b):** the chip surface sits one step above its container — on canvas, the chip is `surface.card` (the lock as written); on a card, the chip is `surface.canvas` (light) / `surface.raised` (dark), or a card-colored chip would vanish. Light mode: icon in `brand.primary-deep` `#3056C9` on `surface.card` `#F2F3F6`. Dark mode: icon in `brand.primary` `#4A7BF7` on `surface.card.dark` `#121C33` (the live-site pattern). Never scale the icon to fill the chip; the 8 px is load-bearing.

### Optical vs metric centering

Symmetric glyphs center metrically (bbox center = 12,12). Asymmetric glyphs (tag, cart, magnifier, play) center **optically**: shift so the glyph's visual mass centroid sits at 12,12 — **maximum shift 1 px**, applied inside the path data (never via transform on the consumer side), and noted in the SVG file when applied. Test: at 40 px chip scale, flip the icon horizontally — if it suddenly looks off-center, the original needed optical correction. *v1 status: all 30 glyphs verified within the 1 px tolerance — no shifts applied (noted in each file).*

## 2. The set

### Service icons (12 — matching the live-site service grid)

`performance-marketing` (ascending bars + up-right vector) · `content-marketing` (document) · `branding` (tag) · `web-development` (browser + code chevrons) · `conversion-optimisation` (funnel) · `creative-production` (media frame + play) · `crm` (3 connected nodes) · `email-marketing` (envelope) · `store-management` (cart) · `out-of-home` (billboard + trend) · `reporting-analysis` (framed line chart) · `seo` (magnifier).

**Disclosed deviation from the brief — needs Zaid's confirmation:** the brief's list said "CRM/Email" combined plus "BI"; the **live site** (verified 2026-06-10 capture) ships CRM and Email Marketing as separate services and has no BI service. Codify-don't-reinvent wins: the set matches the live site. If BI becomes a service, its glyph is a framed donut-gauge, built on this grid.

### Utility icons (18)

`arrow-right` · `arrow-up-right` (the service-card arrow) · `arrow-left` · `chevron-down/up/right` · `plus` / `minus` (FAQ accordion) · `close` · `check` · `external-link` · `download` · `calendar` · `clock` · `phone` · `location-pin` · `menu` · `info`. (`seo`'s magnifier doubles as utility search — one glyph, both jobs.)

### Adding a new icon (the gate)

24-grid, 2 px stroke, butt/miter, stroke-only, compass-curves only, optical centering rule, reads at 16 px. If a concept needs more than ~4 strokes to read, it's not an icon — it's an illustration; take it to the isometric grammar instead.

## 3. Canonical isometric forms (filed)

| Asset | Status |
|---|---|
| `assets/illustrations/step-form.{svg,png}` | **Canonical** — generated from the 30° math, one filled face per A1 (leading mass). Mass B corrected after Stage 5 QA: the Stage 2 cover's notched-back slab self-occluded (drew hidden shelf edges); the canonical B is now a 2×2×2 slab with a 1×2×1 **front** shelf — every edge visible. The Stage 2 HTML cover has been updated to match |
| `assets/illustrations/channel-stack-form.{svg,png}` | **Canonical** — 3 segments at 50/30/20; seams render as visible edges only (no hidden top faces); **left** face of the lowest segment filled per the A1 tie-break |
| `assets/illustrations/loop-form-PLACEHOLDER.svg` | **Placeholder** — the true loop-form must be traced from the Sunway Thank-You artwork (§A2: "never redrawn freehand"). The placeholder is disclosed in-file and ships only until a designer traces the canon and files it as `loop-form.svg` |

Construction grammar lives in `SIGNATURE-DEVICES.md` §A — these files are the reference renderings; regenerate from the math (`charts-generator.py` shares the projection), never nudge points.

## 4. Production notes

- Slides/deck use: place the SVGs directly (web) or the filed PNG @2x exports (transparent — Chrome headless `--default-background-color=00000000`). **Illustration export rule:** the filed SVGs carry stroke-width 2 at their intrinsic size; for a different shipping canvas, regenerate at that canvas size so the stroke obeys §A1 (canvas short edge ÷ 540) rather than scaling the file.
- Icons inherit text color (`currentColor`) — in chips, set the chip's `color` property; never hardcode hex inside an icon file.
- Accessibility: decorative icons get `aria-hidden="true"`; meaningful ones get `role="img"` + `aria-label`. An icon is never the only carrier of meaning next to its label.
