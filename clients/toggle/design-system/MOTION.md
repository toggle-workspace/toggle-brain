# Toggle Solutions — Motion & Video (Stage 10)

> Motion vocabulary: **drawing-in** — the architectural line-trace of CAD demos, draftsman reels, and Bauhaus instructional film. **Never assembly-pop** (blocks popping into existence, bounce, sparkle — the 2022–2025 SaaS bumper signature, banned in BRAND-IDENTITY §8). Easing is linear-then-decelerate, never bouncy. Specs are sufficient for a freelance editor: curves, durations, dimensions — no AE keyframe tables (deferred per the brief).

---

## 1. Micro-interaction principles (web)

| Token | Value | Used for |
|---|---|---|
| `motion.duration.fast` | 150 ms | hovers, washes, color shifts |
| `motion.duration.base` | 250 ms | disclosure (FAQ, menu), toasts in |
| `motion.duration.slow` | 400 ms | section reveals, modal in |
| `motion.easing.base` | `cubic-bezier(0.22, 1, 0.36, 1)` | everything above |
| `motion.easing.toggle-flip` | **finalized: `cubic-bezier(0.45, 0, 0.25, 1)`** | the signature flip only |
| reduced-motion | all durations → 0 (opacity-only crossfade ≤ 100 ms permitted) | mandatory media query |

**The toggle flip (THE micro-interaction — one per page, the budget):** a binary state change (theme switch, pricing period, before/after) renders as a **flat plate flipping 180° on its long axis** — `transform: rotateX(180deg)`, 250 ms, toggle-flip curve, `backface-visibility: hidden`, the two faces are the two states. What flips: the control plate only. What never flips: content, cards, pages. Reduced motion: instant swap.

**What is banned in micro-interactions:** scale-bounces, springs with overshoot >0, parallax, marquee scrollers, blob morphs, hover lifts with growing shadows (dark mode has no shadows), skeleton shimmer.

## 2. The ONE scroll reveal

**Draft-in:** content blocks enter with `opacity 0→1` + `translateY(12px→0)`, 400 ms, easing.base, staggered 60 ms per sibling (max 5 staggers, then simultaneous). Charts and isometric forms instead **draw**: `stroke-dashoffset` animates from path-length→0 over 600 ms (strokes first, the one fill fades in last 150 ms) — the draftsman finishing the line. One reveal pattern site-wide; sections already in viewport on load never animate. Reduced motion: everything in final position, opacity-only.

## 3. Video — the bumper kit

All cubic-bezier values below = `(0.45, 0, 0.25, 1)` (toggle-flip curve) unless noted. Canvas navy `#0A1224`, strokes `#4A7BF7` at 2 px @1080p (4 px @4K — the §A1 canvas rule). Inter Tight for any type; wordmark from the filed PNGs/SVG only.

### 5 s intro bumper — "the line draws the firm"

| t | Action |
|---|---|
| 0.0–0.4 s | Black-to-navy canvas settles (opacity) |
| 0.4–2.6 s | **Step-form line-traces in**: strokes draw at constant speed (the linear phase — like a pen), back-to-front mass order, 2.2 s total |
| 2.6–3.0 s | The one filled face fades in (opacity 0→1, 400 ms) |
| 3.0–4.2 s | Wordmark **traces** beneath: paths draw left-to-right 900 ms, then fill snaps in 150 ms (decelerate phase) |
| 4.2–5.0 s | Hold. `[ Your Digital Growth Partner ]` seal types on in the final 500 ms (no cursor, no typewriter clicks) |

Dimensions: 3840×2160 master, 1920×1080 + 1080×1080 + 1080×1920 crops (step-form anchored right-third in 16:9, centered in 1:1/9:16). Audio: a single pen-on-paper stroke sound is permitted; no whoosh, no riser.

### 3 s outro bumper

Loop-form already on screen (static) → wordmark + contact line fade up (400 ms) → seal `[ toggle.solutions ]` draws its brackets (left bracket, text fades, right bracket — 600 ms total) → hold 1.5 s. Same crops.

### Talking-head lower-third

Geometry: bottom-left, safe-area aware (5% margins). A 2 px blueprint-blue rule **draws** left-to-right (400 ms), name (17 px eq. @1080: 36 px) rises 12 px behind it (250 ms, 100 ms offset), role + tenure line follows (250 ms, 180 ms offset). Background: none on clean footage; `#0A1224` @ 85% plate only when footage is busy. Exit: reverse, faster (200 ms). On screen ≥ 4 s. Text: name 700, role 400 `#B0B8C9`, receipt style ("Yi Yang · Performance · UNITAR account") — the lower-third carries the tenure receipt like the team card.

### Stat-reveal (for data-led shorts)

The number **counts are banned** (Sharp: no animated counters) — instead the stat **draws**: the numeral appears whole (opacity 150 ms) while a 2 px underline rules itself beneath (300 ms) and the receipt line fades up after (150 ms, 100 ms offset). For chart moments: contour-step columns draw bottom-up, 120 ms per column, strokes-then-face per §A1.

### Transition wipes

One wipe: a vertical 2 px blue rule travels left→right (300 ms, linear) revealing the next shot behind it — the drafting straightedge. No cross-dissolves between data shots (reads as blur); hard cuts otherwise.

## 4. Aging test

Line-trace vocabulary is older than television — it will look at home in 2030. Anything that feels like a software demo template (pop, bounce, gradient sweeps, particle dust) fails BRAND-IDENTITY §8 and doesn't ship.
