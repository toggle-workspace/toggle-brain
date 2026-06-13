# Components 6d — Disclosure & Supplementary (Stage 6d)

> Eleven small components, lighter spec per the cadence rule ("lighter spec acceptable for genuinely simple components") — but the four non-negotiable template sections (tokens, states, accessibility, belief) are present for every one. Live artifact, both modes: **`components-6d.html`**. Hexes = token values as of 2026-06-11; `tokens.json` is truth.
>
> Shared belief check for the set: *"Even the furniture is considered — nothing here was left to a library default."*

---

## FAQ accordion

- **Purpose:** answer the objection before the call — the live site's FAQ is pre-sales objection handling.
- **Anatomy/tokens:** native `<details>/<summary>` · `border.subtle` 1px + `radius.lg` · question `scale.body-lg` 700 `text.primary` · answer `scale.body` `text.body`, ≤66ch · `plus`/`minus` system icons in `brand.primary-deep`, right-aligned · summary hover `state.hover` wash · dark: `surface.card` panels.
- **States:** closed / open (icon swaps + answer) / hover / focus-visible (ring on summary). Both modes rendered.
- **A11y:** native disclosure semantics for free; summary is the single interactive element; icons `aria-hidden`. Question contrast 19.2/16.9:1.
- **Do/Don't:** answers are answers, not links to pages (*Direct*) · one `open` by default at most · honest copy — the retainer question states the 3-month minimum plainly (*Honest*).
- **Belief:** "They answer the awkward questions before I ask."

## Modal / dialog

- **Purpose:** the one interruption Toggle permits — confirm a destructive/leaving action. Never marketing.
- **Anatomy/tokens:** `state.scrim` backdrop (`z-index.overlay`) · panel `surface.overlay` + `radius.xl` + `elevation.3.light` (dark: tint, no shadow) · `z-index.modal` · title `scale.h3` · body `scale.body` `text.body` · one primary (Button spec) + ghost alternative · 40px close (`close` icon, `aria-label`).
- **States:** open (rendered both modes) / closing (fade `duration.base`; reduced-motion: instant).
- **A11y:** `role="dialog" aria-modal="true" aria-labelledby` · focus trapped, Esc closes, close button last in tab order · returns focus to the opener. (Production: prefer native `<dialog>`.)
- **Do/Don't:** never for newsletters/exit-intent offers (*Unpretentious* — interruption is a cost) · the primary is the safe action.
- **Belief:** "They interrupt me only to protect my work."

## Toast / notification

- **Purpose:** confirm an action's outcome without stealing the page.
- **Anatomy/tokens:** `surface.overlay` + `border.default` + 4px **left accent border** in `state.success`/`state.error` + `radius.md` + `elevation.2.light` · icon (check / info) in the state color · text `scale.small` `text.body`, bold lead `text.primary` · `z-index.toast`, bottom-left, max 360px.
- **States:** success (`role="status"`) / error (`role="alert"`) — both modes rendered. Auto-dismiss 6s, hover pauses; reduced-motion: no slide, fade only.
- **A11y:** live regions as above; error toasts carry the escape hatch in text ("Email hello@toggle.solutions"), never just "failed".
- **Belief:** "When something goes wrong, they hand me the fix."

## Tooltip

- **Purpose:** expand an abbreviation or metric definition (CPL, CAPI) — never essential content.
- **Anatomy/tokens:** inverted panel — `text.primary` as background, `surface.canvas` as text (max contrast both modes) · `scale.small` 500 · `radius.sm` · 8px offset + caret · anchor styled `border.strong` dashed underline + `cursor:help` · `z-index.tooltip`.
- **States:** hidden / shown on hover **and focus** (anchor `tabindex="0"`); Esc dismisses.
- **A11y:** `role="tooltip"` + `aria-describedby` on the anchor; never put actions inside.
- **Do/Don't:** definitions only — if it matters to the sale, it goes in the copy (*Direct*).
- **Belief:** "Jargon is explained where it stands."

## Breadcrumb

- **Tokens:** `scale.small` · links `text.body` (hover: primary + underline) · current `text.primary` 700 + `aria-current="page"` · `chevron-right` 14px separators in `text.secondary`, `aria-hidden`.
- **A11y:** `<nav aria-label="Breadcrumb"><ol>` — separators are decorative SVGs, not characters.
- **Belief:** "I know exactly where I am."

## Pagination

- **Tokens:** 38px pill targets · default `text.body`, hover wash · current page **filled `brand.primary-deep` + inverse text** + `aria-current` · prev/next = system arrows with `aria-label` · ellipsis `aria-hidden`.
- **States:** default / hover / current / focus-visible — both modes.
- **Belief:** "Browsing the work is effortless."

## Empty state

Per `CHARTS.md`: 1.5px dashed `border.strong` panel + `radius.lg` · title `scale.body-lg` 700 · body `scale.small` `text.body` naming **when real data lands** — never projections styled as data. Both modes. **Belief:** "They'd rather show me nothing than show me theatre."

## Loading skeleton

Static blocks in `border.subtle` (`radius.sm`), title + 2–3 lines at realistic widths · `aria-hidden` (the *container* announces loading via `aria-busy`) · **no shimmer** — none needed under reduced motion either. Both modes. **Belief:** "Even waiting looks deliberate."

## Avatar

- **Rounded-square (`radius.md`), never circular** — extends BRAND-IDENTITY §7's rectangular-portrait rule down to avatar scale; 40px default / 32px sm; duotone mini-portrait or initial on the duotone gradient; pairs with name (`scale.body` 700) + role (`scale.small` `text.body`).
- **A11y:** `role="img"` + `aria-label` with the name; initial is presentational.
- **Belief:** "Named operators, even at 32 pixels."

## Divider

1px `border.subtle` `<hr>`. No ornamental variants — if a divider needs decoration, the layout needs hierarchy instead (*Unpretentious*).

## Dot-timeline

- **Purpose:** the case-study spine — challenge → solution → result (and deck "We Solve This By" steps).
- **Anatomy/tokens:** vertical 2px rule `border.subtle` · 16px nodes: `border-width.2`(2.5 optical) ring in `brand.primary`, **filled when the step is done**, canvas-filled when pending · kicker `scale.overline` `brand.primary-deep` · step title `scale.body` 700 · body `scale.small` `text.body` · 36px text indent.
- **States:** done (filled node) / pending (ring node). Both modes rendered.
- **A11y:** `<ol>` — the order is semantic; nodes `aria-hidden`; the result step carries the receipt ("32,000+ leads · −47% CPL").
- **Belief:** "The engagement has a shape: diagnose, rebuild, compound."
