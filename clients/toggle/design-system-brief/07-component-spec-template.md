# Component Spec Template

> Every component shipped in Stage 6 MUST use this template — no exceptions. The brief enforces this so we don't get a thorough Button spec and a screenshot for FAQ accordion. Designed for a 12-person team: lean enough to actually fill in, rigorous enough that the next designer can implement without DMs.

---

## Template (Claude fills this in once per component)

```markdown
# [Component name]

> **Purpose** (one sentence — what sales question does this component answer? e.g. "Stat card: helps the prospect believe the result is real, not aspirational, by anchoring an outcome to a named client.")

## 1. Anatomy

[ ASCII/SVG diagram with labeled parts: container · slot 1 · slot 2 · icon · arrow · etc. ]

## 2. Token references (no hex — only `category.role.variant[.state]`)

| Property | Token |
|---|---|
| Background | `color.surface.card.[mode]` |
| Border | `color.border.subtle.[mode]` |
| Text — heading | `color.text.primary.[mode]` |
| Text — body | `color.text.body.[mode]` |
| Padding | `space.6` |
| Radius | `radius.lg` |
| Border width | `border-width.1` |

## 3. Variants

| Variant | Visual | When to use |
|---|---|---|
| base | (image) | Default case |
| accent | (image) | When the card belongs to a categorical segment (per `color.accent.cat-*`) |
| outline | (image) | When sitting on a colored hero background |

## 4. Sizes

| Size | Width | Padding | Type scale |
|---|---|---|---|
| sm | 240px | `space.4` | `typography.body` |
| md (default) | 320px | `space.6` | `typography.body` |
| lg | 480px | `space.8` | `typography.body-lg` |

## 5. States (dark + light, every state)

| State | Dark | Light | Notes |
|---|---|---|---|
| default | (image) | (image) | |
| hover | (image) | (image) | `motion.duration.fast`, `motion.easing.base` |
| focus-visible | (image) | (image) | `focus-ring` token applied |
| active | (image) | (image) | |
| disabled | (image) | (image) | `opacity.40`, no pointer events |
| loading | (image) | (image) | Skeleton or spinner |
| error | (image) | (image) | If applicable — for form components |

## 6. Accessibility

- **Semantic HTML:** `<button>` / `<a>` / `<article>` / etc.
- **ARIA roles & attributes:** [list]
- **Keyboard interaction:** Tab order, Enter/Space behavior, Esc behavior, arrow-key behavior if applicable.
- **Focus order in compound components:** specify if children take focus.
- **Contrast ratios:** Body text vs. background dark = X:1, light = X:1. Both must be ≥ 4.5:1 for body, ≥ 3:1 for large text.
- **Reduced-motion:** Specify fallback if component animates by default.

## 7. Responsive behavior

| Breakpoint | Behavior |
|---|---|
| 375 (mobile) | Full-width, padding reduces to `space.4` |
| 768 (tablet) | Switches from full-width to grid 2-up |
| 1024 (laptop) | Grid 3-up |
| 1440 (desktop) | Grid 3-up, max-content width applies |

## 8. Do / Don't (tied to voice adjectives)

| ✓ Do | ✗ Don't | Why |
|---|---|---|
| Pair the stat with a named client | Use the stat without attribution | *Experienced* — every claim carries its receipt |
| Use one primary accent + neutral | Use 3 accents on the same card | *Direct* — one decision per surface |
| Keep numeric to ≤ 4 characters | Pad with trailing decimals | *Sharp* — numbers earn their space |

## 9. Code

```html
<!-- HTML + Tailwind, using CSS variables that map to tokens -->
<article class="bg-[var(--color-surface-card)] border border-[var(--color-border-subtle)] rounded-[var(--radius-lg)] p-[var(--space-6)]">
  <div class="text-[var(--color-text-secondary)] text-[var(--typography-overline)]">...</div>
  <div class="text-[var(--color-brand-primary)] text-[var(--typography-numeric-display)]">...</div>
  <div class="text-[var(--color-text-body)] text-[var(--typography-body)]">...</div>
</article>
```

## 10. Belief check (the sales rule)

> The single sentence the prospect must believe after seeing this component: "[written out]"

```

---

## Why this template (and why this much)

- **Purpose + Belief check** force every component to answer the sales question, not just the design question.
- **Token references** prevent hex leakage. Anyone editing the system later changes one token and everything updates.
- **States table** is the single thing every design system gets wrong. Most show default + hover and call it done. Toggle's components ship in real client work — they need disabled, loading, error states for forms, focus-visible for accessibility.
- **Do/Don't tied to voice adjectives** is the gut-check the team needs when a new variant tempts. Reference the actual brand voice; don't write generic UI rules.
- **Code** is the implementer's contract. Without it the spec is design fiction.

## When NOT to use this template

- For primitives that aren't components (tokens, motion curves) — those have their own format.
- For one-off illustrations (the isometric step-form etc.) — those go in `SIGNATURE-DEVICES.md` instead.
- For sales artifact templates (proposal slides, ad creative) — those use a similar shape but include layout-level concerns the component template skips.

## Output discipline

If Claude produces a component spec that's missing sections 2, 5, 6, or 10 — reject the output and ask for the missing sections. Those four are non-negotiable. The others can be lighter if the component is truly simple (e.g., a divider component genuinely doesn't have variants).
