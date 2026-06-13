# Components 6a — Inputs & Forms (Stage 6a)

> Three specs on the binding `07-component-spec-template.md` format: **Button**, **Input family**, **Consultation form composition**. Live artifact with every variant/state in both modes: **`components-6a.html`** (semantic CSS classes whose values map 1:1 to tokens; the Code sections below give the equivalent HTML+Tailwind contract — Tailwind arbitrary values over the same CSS variables).

---

# Button

> **Purpose:** the one decision per surface. A Toggle button exists so the prospect can name the next action in under 3 seconds (*Direct*) — which is why most surfaces get exactly one primary.

## 1. Anatomy

```
        ┌──────────────────────────────┐
        │  [label]  [trailing icon 18] │   pill container (radius.pill)
        └──────────────────────────────┘
   icon-only: square pill, single 18px glyph, aria-label mandatory
```

## 2. Token references (no hex)

| Property | Token |
|---|---|
| Fill — primary | `color.brand.primary-deep.[mode]` (**never** `brand.primary` — white label fails AA on it) |
| Label — primary | `color.text.inverse.light` / `color.surface.canvas.dark` (navy label on the lighter dark-mode blue) |
| Border — secondary | `color.brand.primary-deep.[mode]` at 1.5 px — optical weight between `border-width.1` and `.2` (disclosed deviation; pill outlines at 2 px read heavy) |
| Label — secondary/ghost | `color.brand.primary-deep.[mode]` |
| Hover | primary: `state.hover-fill` (10% wash — minted Stage 6a; the 6% surface wash is imperceptible on saturated fills) · secondary: `surface.callout` fill · ghost: `state.hover` wash |
| Active | primary: `state.active-fill` (16%) · ghost: `state.active` |
| Radius | `radius.pill` — buttons and budget pills only |
| Focus ring | `focus-ring.*` (2px solid, 2px offset) |
| Disabled | `opacity.40`, pointer-events none |
| Motion | `motion.duration.fast` + `motion.easing.base`; reduced-motion: no transition |
| Type | `typography.scale.body`/`small` at `font-weight.bold` |

## 3. Variants

| Variant | When |
|---|---|
| `primary` | THE action of the surface. One per surface, no exceptions |
| `secondary` | The reversible alternative beside a primary (back, download, view) |
| `ghost` | Tertiary/inline actions inside cards and tables |
| `icon-only` | Pagination, carousel, dismiss — `aria-label` mandatory |
| `+ arrow` | Any variant takes a trailing 18px utility icon (`arrow-right`, `download`) — trailing only, never leading |

## 4. Sizes

| Size | Height | Padding-x | Type |
|---|---|---|---|
| `sm` | 32 | 16 | 13 bold |
| `md` (default) | 40 | 22 | 14 bold |
| `lg` | 48 | 28 | 15 bold — heroes + form submits |

## 5. States (dark + light — all rendered in `components-6a.html`; hexes below = token values as of 2026-06-10, `tokens.json` is truth)

| State | Light | Dark | Notes |
|---|---|---|---|
| default | deep blue `#3056C9` fill, white label (6.4:1) | `#6E95F9` fill, navy label (6.5:1) | |
| hover | fill +10% ink | fill +10% white | `duration.fast` |
| focus-visible | 2px `#3056C9` ring, 2px offset | 2px `#6E95F9` ring | ring never replaces the fill change |
| active | fill +16% ink | +16% white | |
| disabled | `opacity.40`, no pointer events | same | never hide — show why elsewhere |
| loading | 16px stroke spinner + label "Sending…", `aria-busy` | same | reduced-motion: spinner static at 50% opacity, label carries the state |

## 6. Accessibility

- `<button>` (or `<a>` styled identically for navigation — never a `div`).
- Icon-only: `aria-label` required. Loading: `aria-busy="true"`, label text changes.
- Keyboard: Tab focus, Enter/Space activate. Focus ring per `focus-ring` tokens, visible on **both** modes.
- Contrast: primary 6.4:1 / 6.5:1 (label), secondary label 6.4:1 on canvas — all ≥ 4.5:1.
- Reduced motion: transitions and spinner animation off.

## 7. Responsive

| Breakpoint | Behavior |
|---|---|
| 375 | Form-submit and hero primaries go full-width; `lg` size |
| 768+ | Intrinsic width; never full-width outside forms |

## 8. Do / Don't

| ✓ Do | ✗ Don't | Why |
|---|---|---|
| One primary per surface | Two competing primaries | *Direct* — one decision per screen |
| Verb labels with the outcome ("Book a Consultation") | "Submit", "Click here" | *Sharp* — specific over vague |
| Fill = primary-deep | Fill = `#4A7BF7` | *Experienced* — the AA receipt is in TOKENS §8 |
| Trailing arrow for forward motion | Decorative icons both sides | *Unpretentious* — the icon is load-bearing or absent |

## 9. Code

```html
<button class="inline-flex items-center gap-2 h-10 px-[22px] rounded-full font-bold text-[14px]
  bg-[var(--color-brand-primary-deep)] text-[var(--color-text-inverse)]
  hover:bg-[color-mix(in_srgb,var(--color-brand-primary-deep),#0F0F0F_10%)]
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
  focus-visible:outline-[var(--color-state-focus-ring)]
  disabled:opacity-40 disabled:pointer-events-none
  transition-colors duration-150 motion-reduce:transition-none">
  Book a Consultation
  <!-- dark mode: label becomes var(--color-surface-canvas) — navy on the lighter dark-mode blue -->
  <svg class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter" aria-hidden="true">
    <path d="M3 12h16.5M14 5.5l6.5 6.5L14 18.5"/></svg>
</button>
```

## 10. Belief check

> "I know exactly what happens when I press this — and there's only one thing to press."

---

# Input family (text · email · phone · url · select · textarea · file · checkbox · radio)

> **Purpose:** the consultation form is Toggle's top-of-funnel conversion surface — every input exists to make giving Toggle your contact details feel as engineered as the campaigns being sold.

## 1. Anatomy

```
  Label 13/500 body-gray        ← always visible, never placeholder-as-label
  ┌────────────────────────┐
  │ value / placeholder    │   44px control, radius.md, 1px border
  └────────────────────────┘
  helper / error message 13px   ← reserved line; error replaces helper
  select: + trailing chevron-down 20  ·  textarea: min 96px, resize-y
  file: dashed border zone + secondary sm "Choose file" + filename text
  checkbox 20px radius.sm / radio 20px circle + 14px label, 10px gap
```

## 2. Token references (no hex)

| Property | Token |
|---|---|
| Control background | `color.surface.canvas.light` / `color.surface.card.dark` |
| Border | `color.border.default.[mode]`; hover → `border.strong`; focus → `state.focus-ring` + ring; error → `state.error`. **Checkbox/radio boundary: `color.border.control`** (minted Stage 6a — the boundary IS the component, ≥3:1) |
| Value text | `color.text.primary.[mode]` |
| **Placeholder** | `color.text.secondary.[mode]` — **never `text.muted`** (TOKENS §8 day-1 mapping) |
| Label | `color.text.body.[mode]`, `scale.small` @ 500 |
| Helper / error message | `text.body` (secondary fails 4.36:1 on card surfaces) / `state.error`, `scale.small`; the message line is **reserved** (min-height) so errors never shift layout |
| Required marker | `state.error` asterisk, `aria-hidden` (requiredness lives on the input) |
| Radius | `radius.md` (8) — inputs are workbenches, not CTAs |
| Checked fill (checkbox/radio) | `color.brand.primary-deep.[mode]` |
| File zone border | `border.strong` dashed |
| Disabled | `opacity.40` |

## 3. Variants

text / email / phone (`inputmode="tel"`) / url / select (native, chevron overlay) / textarea / file / checkbox / radio. One visual system — type differences are semantic attributes, not styles.

## 4. Sizes

One size: **44px** control height (12px above the 32px touch floor; matches the live form's weight). Textarea min-height 96px. No size variants — decision rule: fewer variants.

## 5. States (dark + light — all rendered)

| State | Light | Dark | Notes |
|---|---|---|---|
| default | white bg, `#D2D6E2` border | `#121C33` bg, `#2A3756` border | |
| hover | border → `#9AA0A8` | border → `#44537A` | |
| focus-visible | border + 2px ring `#3056C9`, offset 2 | ring `#6E95F9` | ring + border both move — the border alone is sub-3:1 (TOKENS §8.8) |
| error | border `#C03028` + message + `aria-invalid` | border `#FF7A70` | message says **what to do**, not "invalid" |
| disabled | `opacity.40` | same | keep value readable |
| checked (box/radio) | `#3056C9` fill, white check · radio: primary-deep fill with knocked-out canvas dot | `#6E95F9` fill, **navy** check (white fails 2.9:1 on the dark fill) | check glyph = the system `check` icon at 3.2 stroke |
| active | n/a — text inputs have no pressed state distinct from focus | | |
| loading | handled at composition level (Form §5 submitting) | | |

## 6. Accessibility

- Real `<label for>` on every control — placeholder is never the label. Error: `aria-invalid="true"` + `aria-describedby` → message id.
- Native `<select>`, native checkbox/radio (`appearance:none` restyle) — keyboard and screen-reader behavior stays free.
- `autocomplete` (name/email/tel/url) and `inputmode` set — mobile keyboards matter at 375px.
- Contrast: value 19.2:1 / 16.9:1; placeholder 4.8:1 / 6.7:1; error 5.7:1 / 7.4:1; focus ring ≥ 3:1 non-text. The default border is decorative (1.4:1) — the **label + focus ring** carry the boundary (the Stage 6a answer to TOKENS §8.8).
- Error messages are sentences with a fix ("Enter a complete email address — we reply here within 24 hours").

## 7. Responsive

| Breakpoint | Behavior |
|---|---|
| 375 | Fields full-width, stacked; 16px font on iOS-critical fields to suppress zoom |
| 768+ | Two-column grids permitted outside the consultation form; the form itself stays single-column always |

## 8. Do / Don't

| ✓ Do | ✗ Don't | Why |
|---|---|---|
| Label every field, always visible | Placeholder-as-label | *Direct* — the field's job stays visible after typing |
| Error text says the fix + the why | "Invalid input" | *Honest* — tell them what you need and why it matters |
| Ask for what the diagnosis needs | Add fields because CRM has columns | *Unpretentious* — every field is load-bearing |
| Reserve the message line | Layout-shift on error | *Experienced* — the form behaves like it's been shipped before |

## 9. Code

```html
<div class="flex flex-col gap-1.5">
  <label for="email" class="text-[13px] font-medium text-[var(--color-text-body)]">
    Email <span class="text-[var(--color-state-error)]" aria-hidden="true">*</span></label>
  <input id="email" type="email" required autocomplete="email"
    class="h-11 px-3.5 rounded-lg text-[14px] w-full
      bg-[var(--color-surface-canvas)] text-[var(--color-text-primary)]
      border border-[var(--color-border-default)]
      placeholder:text-[var(--color-text-secondary)]
      hover:border-[var(--color-border-strong)]
      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
      focus-visible:outline-[var(--color-state-focus-ring)]
      aria-[invalid=true]:border-[var(--color-state-error)]
      disabled:opacity-40" placeholder="you@company.com">
  <span class="text-[13px] text-[var(--color-text-secondary)]">We reply here within 24 hours.</span>
</div>
```

## 10. Belief check

> "If their own form is this considered, my campaign data will be too."

---

# Consultation form (composition)

> **Purpose:** the conversion surface of toggle.solutions — pairs the live site's promise copy with exactly the fields the first call needs, and one CTA.

## 1. Anatomy

```
  card (surface.card, radius.xl, padding space.6)
  ├─ heading scale.h3 22/700: "Get a Free 30-Minute Consultation"
  ├─ sub 14 body: the 24-hour promise (live-site copy)
  ├─ fields, single column: Name* · Email* · Contact Number · Website URL
  │                         · Services select · "How can we help?" textarea
  ├─ btn-primary lg, full-width, arrow: "Book a Consultation →"
  └─ fine print 13 secondary: "Free brand audit · no sales pitches, no pressure · clear plan after the call"
```

## 2. Token references

Container `surface.card.[mode]` + `radius.xl` · heading `scale.h3` (22/700) · fine print `text.body` (secondary fails AA on card) · everything else inherits the Button/Input specs above · vertical rhythm `space.4` (16px) between fields, `space.5` (24px) before the CTA — honored in the artifact.

## 3. Variants

One. The form is the same on the homepage, contact page, and proposal-linked landing pages — recognition is the point. (Multi-step variant deferred to the booking-page pattern, Stage 7b.)

## 4. Sizes

Max-width 480px. Full-width below 768.

## 5. States

Composition-level: **submitting** (button → loading, fields disabled), **submitted** (form swaps to a confirmation: "Done — check your inbox. We reply within 24 hours." + nothing else), **failed** (inline banner `state.error`: "That didn't send — email us at hello@toggle.solutions" — give the escape hatch, never a dead end). Field states per the Input spec.

## 6. Accessibility

`<form>` with real submit and `name` on every field; required fields marked in label + `required`; radio/checkbox groups wrapped in `<fieldset>/<legend>`; file control = visible `<label for>` styled as a secondary button over a visually-hidden input (never the `hidden` attribute — it must stay focusable); error summary focuses the first invalid field; the confirmation swap moves focus to the confirmation heading (`tabindex="-1"`). 375px: 16px control font (iOS zoom suppression), viewport meta mandatory.

## 7. Responsive

Single column at every width; card padding drops `space.6` → `space.4` below 768; CTA already full-width.

## 8. Do / Don't

| ✓ Do | ✗ Don't | Why |
|---|---|---|
| Keep the 24-hour promise next to the email field | Bury the promise in fine print | *Experienced* — receipt beside the ask |
| 6 fields, 2 required | Budget dropdowns + referral source at first touch | *Unpretentious* — diagnosis needs, nothing else |
| One CTA | "Or follow us on…" under the button | *Direct* |
| "No sales pitches, no pressure" fine print | Urgency theatre ("only 3 slots left!") | *Honest* |

## 9. Code

```html
<form class="consult" method="post" action="/api/consult">
  <h4>Get a Free 30-Minute Consultation</h4>
  <p class="sub"><!-- the 24-hour promise --></p>
  <!-- fields per the Input spec: name, email, tel, url, select, textarea — each with name= -->
  <button class="btn btn-primary btn-lg" type="submit">Book a Consultation <!-- arrow-right 18 --></button>
  <p class="fine">Free brand audit · no sales pitches, no pressure · clear plan after the call</p>
</form>
```

Submitted and failed states are rendered in `components-6a.html` (both modes): the confirmation card swaps the form and takes focus; failure shows a `role="alert"` banner with the escape hatch (hello@toggle.solutions).

## 10. Belief check

> "Booking the call is low-risk, takes a minute, and a real person answers within 24 hours."
