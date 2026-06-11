# Pre-flight resolutions — Zaid fills in before Stage 1

> These four decisions must be locked before pasting the master prompt. Leaving them as TODO means Stage 1 outputs placeholders instead of a system. Each comes with a recommendation and a rationale — Zaid chooses or overrides.

---

## 1. Wordmark font origin

**The question:** What font is the italic lowercase `toggle` wordmark actually built from? Custom-drawn from scratch, modified existing font, or unmodified existing font?

**Why it matters:** Without this lock, every future inline use (email signature, OG image, video lower-thirds, business card) drifts from the canonical artwork. The deck/site use the same artwork; that artwork's source must be known.

**Recommendation if unknown:** Pull the SVG/vector from the live site or Toggle's design files. Identify glyph by glyph using WhatTheFont or by matching to known foundries (Recoleta Italic, Cooper, Romie, Tobias). If the wordmark turns out to be custom-drawn, file it as `assets/logos/toggle-wordmark.svg` in the brain repo and treat as the only source-of-truth.

**Alliance No 1 Extra Bold Italic:**
```
[ Font name / foundry, OR "custom-drawn — original file at <path>" ]
```

---

## 2. Primary type family

**The question:** Switzer, Inter Tight, Aeonik, or other? Pick ONE primary family — not two, not three.

**Why it matters:** Stage 3 (tokens) hard-codes the type stack into every component. Multiple options compound across the system and produce inconsistency. The current Sunway proposal and live site already converted with whatever they currently use — that's the strongest data we have.

**The honest first move:** Inspect the live site's CSS and the Sunway proposal's font metadata. **What is already being used?** Default to that unless there's a real blocker (licensing, rendering, accessibility).

**Recommendation if a real choice is needed:**
- **Switzer** (Indian Type Foundry, free) — geometric grotesque, friendly-but-pro, complete italic system, free. Strong default.
- **Inter Tight** — open-source workhorse, slightly more neutral, very wide weight range, free.
- **Aeonik** (CoType, paid) — more distinctive, premium. Only justify the cost if Toggle wants a clearer differentiator than Switzer provides.

The system uses ONE family for display + body. The italic wordmark is a separate brand mark (not body type).

**Zaid's answer:**
```
Inter Tight
```

---

## 3. Imagery treatment rule

**The question:** Photographs (team portraits, case study contexts, hero imagery) — one rule for all surfaces.

**Why it matters:** The current state is inconsistent across the deck (stock-looking case study photos, casual team portraits, mock dashboard screenshots — no unified treatment). Stage 1 needs one rule.

**Options:**
- **A. Untreated.** Photos as-is.
- **B. Subtle 6–8% primary-blue overlay** (multiply blend mode).
- **C. Duotone** (blueprint-blue + paper-white).

**Recommendation:** **C for hero/marketing imagery, A for in-context operator portraits.** Treats marketing photography as system illustration (like engineering manuals); treats portraits with editorial dignity (closes the "senior operator gap" — see `04-references-and-anti-patterns.md`).

**Zaid's answer:**
```
C
```

---

## 4. Documentation platform

**The question:** Where does the design system actually LIVE for the team to consume after delivery? Markdown alone is not enough — designers need Figma, the dev team needs CSS variables, the sales team needs Google Slides masters.

**Why it matters:** Without a primary consumption surface, the system becomes shelfware — the team reverts to ad-hoc Google Slides because the activation energy to use the system exceeds the activation energy of starting from last month's deck.

**Recommended stack (MVP):**
- **Figma library** — primary design surface. Components, tokens as Figma Variables, illustration library.
- **Google Slides master file** — proposal + deck masters live here as `.gslides` files the team can copy and edit.
- **Notion page (or this Markdown in `Toggle Brain/brain/design-system/`)** — written documentation, voice-in-design playbook, governance.
- **One CSS variables file** — for `toggle.solutions` web dev work.
- **Deferred to v2:** Style Dictionary, automated Figma↔Token sync, Storybook.

**Zaid's answer:**
```
Google Slides master file and mainly google suite
```

---

## Optional but useful — bonus pre-flight calls

### 5. Wordmark audit

**The question:** Does the current italic lowercase `toggle` wordmark still serve Toggle in 2026, given the positioning sharpening to *Technical Growth Architecture*?

- The italic warmth currently softens the "growth architecture" angularity. There's a possible mismatch.
- A more structural/architectural wordmark would tighten the positioning.
- BUT: rebrands are expensive and the existing wordmark is recognized.

**Recommendation:** Lock current wordmark for v1 of the design system. Audit it formally in v2 (post-MVP) — if the positioning has clearly outgrown it, redraw then. Don't conflate the design system rollout with a rebrand.

**Zaid's answer:**
```
Lock current for v1
```

### 6. Primary brand blue — confirmed hex

The live site and deck use slightly different blues (~#2D5FFF on site, slightly punchier on the Sunway proposal). Lock ONE hex.

**Recommendation:** Sample the actual hex from the SVG isometric blocks on the live site hero. That's the most-seen surface and the canonical reference. Lock that.

**Zaid's answer:**
```
Sample the actual hex from the SVG isometric blocks on the live site hero. That's the most-seen surface and the canonical reference. Lock that.
```

---

Once 1–4 are answered (and ideally 5–6 too), this file goes into the context-pack upload and the master prompt can run cleanly.
