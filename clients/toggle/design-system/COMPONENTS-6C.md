# Components 6c — Structure (Stage 6c)

> **Disclosed deviations (Stage 6c — queued for Zaid's batch sign-off):** (1) the **kicker-seal** is a new bracket context — section-label seals at a section header's content edge and as a page-hero kicker, beyond §C3's cover/watermark canon (max one per page); (2) web text seals use **typed brackets** as an approved approximation of §C1's drawn construction; (3) seal color on web = `brand.primary-deep` per the accent-discipline rule, extending §C1's color set. SIGNATURE-DEVICES §C carries matching amendment notes. Also: the deck section nav from the scope doc lands in Stage 8a; the client logo wall is specced inside Hero §2.

> Four specs on the binding `07-component-spec-template.md` format: **Navigation**, **Hero blocks** (homepage/strikethrough · page · case-study), **Section header**, **Footer**. Live artifact, both modes: **`components-6c.html`**. The architectural component variants the 6c brief names (stat-as-column, channel-mix-as-blocks) shipped in Stage 6b — cross-referenced, not duplicated. Hexes in §5 = token values as of 2026-06-11; `tokens.json` is truth.

---

# Navigation

> **Purpose:** get the prospect from anywhere to "Book a Consultation" in one move — the nav exists to carry the site's single standing CTA (*Direct*).

## 1. Anatomy

```
 [ wordmark 26px ]  ……  [ Our Work ][ Services ][ About ⌄ ][ Contact ]  [ Book a Consultation ]
 72px bar · 32px side padding (BRAND-IDENTITY §3 web rule) · border.subtle bottom rule
 ≤860px: links + CTA collapse into the menu panel; burger (system `menu` icon) appears
```

## 2. Token references (no hex)

| Property | Token |
|---|---|
| Bar background / rule | `surface.canvas.[mode]` / `border.subtle` |
| Wordmark | `brand.wordmark.[mode]` — the canonical SVG via `currentColor`, 26px tall, 32px from the edge |
| Links | `text.body`; hover → `text.primary` + `state.hover` wash; current page → `text.primary` 700 + wash |
| CTA | Button spec primary md (`brand.primary-deep` fill) — the ONLY primary in the bar |
| Mobile panel | `surface.canvas`, 16px link rows, full-width pill CTA lg |
| Focus | `focus-ring.*` |

## 3. Variants

One nav. Dark on the site (web default), light available for light-mode surfaces. The About item may carry a chevron + dropdown (dropdown panel itself is Stage 6d disclosure territory — `z-index.dropdown`).

## 4. Sizes

72px desktop bar · 64px below 860 · mobile menu rows 48px touch targets.

## 5. States (dark + light — rendered)

| State | Light | Dark | Notes |
|---|---|---|---|
| link default | `#4A4A4A` | `#B0B8C9` | 8.9 / 9.4:1 |
| link hover | `text.primary` + 6%/8% wash | same | `duration.fast` |
| current page | `text.primary` 700 + wash | same | never color-only — weight + wash together |
| focus-visible | 2px ring | 2px ring | |
| burger expanded | `aria-expanded="true"` + panel | same | panel shown in artifact at ≤860px |

## 6. Accessibility

`<nav aria-label="Main">`; wordmark link has `aria-label="Toggle Solutions — home"` (the SVG is `aria-hidden`); current page = `aria-current="page"`; burger = `<button aria-expanded aria-controls>`; menu rows 48px; dropdown trigger carries `aria-expanded`. Link contrast 8.9/9.4:1; CTA per Button spec (6.4/6.5:1).

## 7. Responsive

≥861: full bar. ≤860: burger + panel (links stack, CTA full-width last — the one action survives the collapse). Wordmark never shrinks below 80px wide (BRAND-IDENTITY §3 minimum).

## 8. Do / Don't

| ✓ Do | ✗ Don't | Why |
|---|---|---|
| One CTA in the bar | CTA + phone + WhatsApp + search | *Direct* |
| ≤ 5 links | Mega-menus of 12 services | *Unpretentious* — the service grid is one click away |
| Weight + wash for current page | Color-only state | a11y |

## 9. Code

```html
<nav aria-label="Main" class="flex items-center gap-8 h-[72px] px-8 bg-[var(--color-surface-canvas)] border-b border-[var(--color-border-subtle)]">
  <a href="/" aria-label="Toggle Solutions — home" class="h-[26px] text-[var(--color-text-primary)]"><svg aria-hidden="true"><!-- wordmark --></svg></a>
  <ul class="flex gap-2 ml-auto">
    <li><a aria-current="page" class="flex items-center h-[38px] px-3.5 rounded-full font-bold text-[var(--color-text-primary)] bg-[var(--hover-wash)]" href="/work">Our Work</a></li>
  </ul>
  <a class="btn btn-primary btn-md" href="/contact">Book a Consultation</a>
</nav>
```

## 10. Belief check

> "I always know where I am, and there's exactly one obvious next step."

---

# Hero blocks (homepage · page · case-study)

> **Purpose:** the homepage hero is Toggle's standing utterance — the strikethrough rewrite that tells the prospect, before anything else, what Toggle refuses to be.

## 1. Anatomy

```
 homepage:  struck line (secondary, 0.12em strike) → H1 rewrite (white/ink, larger)
            → sub ≤62ch → ONE pill CTA lg + arrow → logo wall (border-top rule, muted text logos)
 page:      [ Section ] bracket seal kicker → H1 → sub ≤62ch
 case-study: KICKER (client · vertical) → H1 → sub → stat row (focal first, receipts) | duotone image 4:3
```

## 2. Token references (no hex)

| Property | Token |
|---|---|
| Struck line | `text.secondary.[mode]`, `<s>` at 0.12em thickness, ~87% of H1 size (SIGNATURE-DEVICES §B1) |
| H1 rewrite | `text.primary`, `scale.display` fluid (clamp 34→64px) |
| Sub | `text.body`, 17px, max 62ch |
| CTA | Button primary lg + trailing arrow — the surface's one primary |
| Logo wall | `text.secondary` 15/800 tracked text-logos + `border.subtle` top rule; caption `text.body` |
| Bracket seal kicker | `brand.primary-deep` + `kicker-seal` construction (SIGNATURE-DEVICES §C) |
| CS stat row | numerals `text.primary` 30/800 tabular; focal → `brand.primary`; labels `text.body` |
| CS image | `color.duotone.*` 4:3, `radius.lg` |

## 3. Variants

homepage (strikethrough — **one per site**, the standing utterance) · page (service/about — bracket-seal kicker, no strikethrough) · case-study (split grid, receipts in the hero). The homepage hero is B1's standing-utterance exemption; **no other web hero takes the device** (6c rule — stricter than B1's floor).

## 4. Sizes

Fluid type via clamp: H1 34–64 (homepage), 30–48 (page), 30–44 (case study). Padding 96/72px top → 64px at 375.

## 5. States (dark + light — rendered)

| State | Light | Dark | Notes |
|---|---|---|---|
| default | ink on white | white on navy | homepage hero rendered dark (web default — the site is dark-only; B1 specs the light struck color for non-web artifacts); page + case-study heroes rendered both |
| CTA states | per Button spec | per Button spec | |
| reduced-motion | static (heroes don't animate in v1; Stage 10 owns reveals) | | |

## 6. Accessibility

The struck line uses real `<s>` + a visually-hidden clarifier ("— not a marketing agency, but —") so screen readers hear the rhetoric (B1). One `<h1>` per page — the rewrite is the H1; the struck line is a `<span>` outside it. Logo wall is text (no alt-text debt). Contrast: struck `#9CA3B5` on navy 7.4:1; sub 9.4:1; CS focal `#4A7BF7` on navy 4.9:1 at 30/800 (large ✓).

## 7. Responsive

Struck line + H1 scale fluidly, never wrap past 2 lines at 375 (B1 wrap rule: each wrapped line carries its own strike — native `line-through`). CS grid stacks image-below at 767. Logo wall wraps.

## 8. Do / Don't

| ✓ Do | ✗ Don't | Why |
|---|---|---|
| One strikethrough, homepage only | Strikethrough on every page hero | §B1 — the third one is a template |
| Logo wall as trust strip | Star ratings + avatar rows | BRAND-IDENTITY §4 drift fix (confirmed) |
| Receipts in the CS hero | "Award-winning campaign" | *Experienced* |
| One CTA | CTA + "or scroll to learn more" | *Direct* |

## 9. Code

```html
<header class="px-8 pt-24 pb-18 bg-[var(--color-surface-canvas)]">
  <span class="block text-[clamp(28px,5vw,56px)] font-extrabold leading-[1.08] text-[var(--color-text-secondary)]">
    <s class="[text-decoration-thickness:.12em]">Your Marketing Agency</s>
    <span class="sr-only"> — not a marketing agency, but —</span></span>
  <h1 class="text-[clamp(34px,6vw,64px)] font-extrabold leading-[1.05] text-[var(--color-text-primary)] mt-1.5 tracking-[-0.01em]">Your Digital Growth Partner</h1>
  <p class="max-w-[62ch] text-[17px] leading-[1.55] text-[var(--color-text-body)] mt-5 mb-7">…</p>
  <a class="btn btn-primary btn-lg" href="/contact">Book a Consultation →</a>
  <div class="logowall">…</div>
</header>
```

## 10. Belief check

> Homepage: "These people define themselves by what they refuse to be — and back it with named clients, not stars." Case study: "the result is in the headline, with receipts."

---

# Section header

> **Purpose:** name the section's claim and move on — three lines maximum, then the content carries it.

## 1. Anatomy

```
 centered:  H2 → sub (homepage section openers, the live-site pattern)
 kicker:    KICKER overline → H2 → sub
 bracketed: H2 → sub, with [ Section Label ] seal anchored at the content edge (right) —
            canvas-edge placement per SIGNATURE-DEVICES §C3; stacks above the H2 at ≤767
```

## 2. Token references (no hex)

| Property | Token |
|---|---|
| H2 | `scale.h2` (28/800), `text.primary` |
| Kicker | `scale.overline`, `brand.primary-deep` |
| Sub | `scale.body-lg`, `text.body`, ≤72ch |
| Bracket seal | `brand.primary-deep`, §C1 construction (typed brackets + spaces), ≤5 words |

## 3. Variants

centered · kicker · bracketed (max one bracketed header per page — seals are punctuation, not wallpaper).

## 4. Sizes

One. H2 may step to 34px on marquee homepage sections — that's layout's call (Stage 7), not a variant.

## 5. States

Static. (All three variants rendered dark; centered/kicker/bracketed rendered light.)

## 6. Accessibility

Heading hierarchy is real (`h2` following the page `h1`); kicker/seal are spans, never headings. Kicker contrast 6.4/6.5:1; seal same.

## 7. Responsive

Bracketed seal: absolute right at ≥768, stacks above the heading below. Centered stays centered — subs ≤72ch keep measure sane.

## 8. Do / Don't

| ✓ Do | ✗ Don't | Why |
|---|---|---|
| Sub states the claim ("Real Brands. Real Revenue.") | Subs that re-say the heading | *Sharp* |
| One bracketed header per page | Sealing every section | §C — devices are punctuation |
| Sentence-length subs | Paragraph subs | *Direct* — the section body does the talking |

## 9. Code

```html
<div class="relative pr-[200px] md:pr-8">
  <span class="absolute right-8 top-7 text-[14px] font-bold text-[var(--color-brand-primary-deep)]">
    <span class="font-normal">[&nbsp;</span>How We Engage<span class="font-normal">&nbsp;]</span></span>
  <h2 class="text-[28px] font-extrabold leading-[1.15] text-[var(--color-text-primary)]">One Growth System Across Every Channel</h2>
  <p class="text-[15px] text-[var(--color-text-body)] mt-2.5 max-w-[72ch]">…</p>
</div>
```

## 10. Belief check

> "Every section opens with a claim I could quote back — not a label."

---

# Footer

> **Purpose:** the page's quiet close — wordmark, the four wayfinding columns, and the legal line. Nothing sells here; selling already happened.

## 1. Anatomy

```
 [ wordmark + one-line locator ] [ Services ] [ Company ] [ Case Studies ] [ Social ]
 base bar: © year · Terms · Privacy (border.subtle top rule)
```

## 2. Token references (no hex)

| Property | Token |
|---|---|
| Background / rules | `surface.canvas.[mode]` / `border.subtle` |
| Column heads | `scale.small` 700, `text.primary` |
| Links | `scale.small`, `text.body`; hover → `text.primary` + underline |
| Wordmark | canonical SVG, `currentColor`, 26px |
| Base bar | `scale.small`, `text.body` |

## 3. Variants

Full (web, 5 columns) · slim (light/report contexts — wordmark + Company + Social + base). No newsletter signup in v1 — the consultation form is the site's one capture surface.

## 4. Sizes

56px top padding; columns 2fr+1fr×4; 2-col at ≤767.

## 5. States (dark + light — rendered)

| State | Light | Dark |
|---|---|---|
| link default / hover | `#4A4A4A` → primary + underline | `#B0B8C9` → white + underline |
| focus-visible | ring | ring |

## 6. Accessibility

Each column is a `<nav aria-label>`; footer is `<footer>`; link contrast 8.9/9.4:1; hover adds underline (not color-only).

## 7. Responsive

5-col → 2-col ≤767 (wordmark block full-width first); base bar wraps, legal links keep 18px gap.

## 8. Do / Don't

| ✓ Do | ✗ Don't | Why |
|---|---|---|
| Case-study links by client name | "Portfolio" | *Sharp* — named work is the proof (BRAND-IDENTITY regional rule) |
| Two legal links | Sitemap dumps | *Unpretentious* |
| One locator line (KL, Malaysia) | Full address + map embed | the contact page's job |

## 9. Code

```html
<footer class="foot">
  <div class="cols"><!-- 2fr wordmark block + nav columns, each <nav aria-label> -->
    <div><a href="/" aria-label="Toggle Solutions — home"><!-- wordmark svg --></a>
      <p>Your Digital Growth Partner — Kuala Lumpur, Malaysia.</p></div>
    <nav aria-label="Services"><h4>Services</h4><ul>…</ul></nav>
  </div>
  <div class="base"><span>© 2026 Toggle Solutions. All rights reserved.</span>
    <span class="legal"><a href="/terms">Terms and Conditions</a><a href="/privacy">Privacy Policy</a></span></div>
</footer>
```

## 10. Belief check

> "Even the footer is tidy — nothing here is trying to catch me on the way out."
