# Toggle Solutions — Charts & Data-Viz Primitives (Stage 4)

> The architectural data layer — the system that makes the isometric motif load-bearing instead of decorative. **Architectural is the default at threshold moments — covers, pitch openers, closings, wherever data is *announced*. Flat is the working default wherever data is *read*** (dense dashboards, tables, print-degraded contexts, >8 data points). Every primitive in the system is expressible both ways; if a new chart can't be, it doesn't enter the system.
>
> Live gallery with inline SVG for all 13 primitives × both renderings × both modes: **`charts.html`**. All colors are Stage 3 tokens; all geometry follows `SIGNATURE-DEVICES.md` §A1 with the data amendment below.

---

## 1. The data amendment to the construction grammar (binding)

`SIGNATURE-DEVICES.md` §A1's **one-filled-face rule governs brand compositions** (covers, closings, section openers). Architectural **data primitives** follow a scoped variant:

| Rule | Data-primitive spec |
|---|---|
| Filled faces | The **data face** — each block's front-right receding face — fills with its series' categorical color. One filled face *per block*, not per composition: in data, the color IS the information. |
| Other faces | Top + front-left stay canvas-colored (the "filled terrain" area variant tints all faces with `accent.cat-N` light tint). |
| Strokes | Blueprint blue `brand.primary`, both modes. Butt caps, miter joins, canvas-short-edge ÷ 540, min 1.5 px — unchanged from §A1. |
| Projection | 30°/30° true isometric, unit-cube grid — unchanged. |
| Honesty | **Length/area encodings (bars, blocks, stacks, areas, contour steps) are linearly proportional to real values from a zero baseline — no exceptions.** Position encodings (flat line points) may baseline above zero with a labeled axis. Geometry that doesn't encode (funnel platforms, fixed stat columns) must visually declare it (see those rows). Every data block carries its number — an unlabeled data-looking block violates *Honest* (§A3). |
| Ground plane | **Comparisons share the front rank**: columns being compared sit on one screen baseline (placed along the x−y diagonal), never receding behind each other — receding placement shifts baselines and distorts the skyline read. Sequential forms (contour steps, block rows) may recede because they're read in order, not compared by endpoint. Ordering must never place a value deeper in the grid to flatter or compress a comparison. |
| Non-actuals | Targets, models, and illustrations carry an **in-plot tag** — `[ TARGET — not actuals ]` / `[ STAGE DIAGRAM — not to scale ]` — on the plot itself, not just the title. Projections are never styled as actuals. |
| Count limits | Architectural variants cap at **≤ 8 data points / ≤ 5 segments per stack**. Beyond that, flat is mandatory — the grid stops reading. |

## 2. Shared rules (both renderings)

| Concern | Rule |
|---|---|
| **Categorical palette** | `dataviz.cat-1…5` (blue / teal / pink / purple / orange) in listed order — assign by series order, never by meaning. Slate `accent.cat-6` is the overflow/"other" segment. **Exception — stable channel identities override series order:** Google = blue, Meta = teal, LinkedIn = slate (Stage 2 precedent), and markets keep one color across artifacts (India blue, Pakistan/PK&BD teal, UAE purple). `dataviz.tint-1` (`#B7CBFB`/`#27406F`) is the paired-member tint. Never reuse a color within one chart; never use `state.*` colors in charts (semantic ≠ categorical). |
| **Gridlines** | `dataviz.gridline` (`#E4E6EE` light / `#1F2A44` dark) at **100% opacity** (already faint — never add alpha), 1 px, **horizontal only**, max 3–4 lines, none at zero (the axis carries zero). |
| **Axis** | Baseline (x-axis) only: `dataviz.axis` (`#9AA0A8` light / `#44537A` dark), 1 px. **No y-axis line** — tick labels float. Architectural variants have no drawn axes; the grid floor is implied. |
| **Ticks** | No tick marks — gridlines replace them. Tick labels: `text.secondary`, 13 px (`scale.small`), right-aligned against the plot, max 4. **Tick labels always abbreviate** (2.5K not 2,500) — the §3 ≥10,000 threshold governs content numbers, not ticks. |
| **Point markers** | Line charts: filled circles, series color, **r 3.5 px, at every data point when ≤ 8 points** (none beyond 8). Sparklines: terminal dot only, r 3 px. |
| **Label placement** | Value labels ON or directly above/beside the data element, ink (`text.primary`), bold, tabular. Category labels below/left, `text.secondary`. **Never rotate labels** — if they don't fit, use the horizontal bar. In architectural variants, text always renders after (over) geometry. |
| **Legend** | Avoid: label series directly (at line ends, on segments, beside blocks). When unavoidable (donut, grouped): top-left or right column, 10 px square chips + 13 px `text.secondary` labels, no borders. Max 5 entries. |
| **Titles** | The chart title is a claim, not a caption: "CPL by channel — search wins" beats "CPL comparison". Source + year ride the title or footnote (*Experienced*: receipt inline). |

## 3. Number formatting

| Case | Rule | Example |
|---|---|---|
| Currency | `RM` + non-breaking space, comma thousands, **no decimals** at display scale | `RM 15,000` |
| Currency, axis ticks/dashboards/chart headlines | K/M abbreviation allowed: ≥ 10,000 → `K`, ≥ 1,000,000 → `M`, ≤ 1 decimal (ticks exempt from the threshold). Chart headline/center numbers follow this dashboard rule **except inside proposal body slides** | `RM 7.5K` |
| Currency in proposals | **Never abbreviated in body/table content** — full to the ringgit (Stage 2 rule) | `RM 4,500` |
| Counts | Full with separators below 100,000; `K`/`M` above, ≤ 1 decimal | `32,000+` · `1.4K orders` |
| Percentages | ≤ 1 decimal, drop trailing `.0` | `47%` · `8–15%` |
| Multipliers | Lowercase `x`, ≤ 1 decimal | `11.5x` · `20x` |
| Ranges | En-dash, no spaces | `155–195` |
| Deltas | Explicit sign, the direction word stays in the label not the number | `−47% CPL` |
| All numerals | Inter Tight **tabular-nums**, weight 700/800 | |

## 4. The thirteen primitives

Each row: what the gallery (`charts.html`) ships, with real Toggle/Sunway/UNITAR data — no lorem, no fake series (the one illustrative series, the CPL glide path, is labeled illustrative in its title).

| # | Primitive | Flat construction | Architectural construction | Architectural is default when |
|---|---|---|---|---|
| 1 | **Bar (vertical)** | Rects from zero baseline, gap ≈ 40% of bar width, value above, category below | **Block columns**: unit-footprint cuboids, height = value, 2.1-unit stride | ≤ 6 categories, hero/proposal context |
| 2 | **Bar (horizontal)** | For long labels; labels left-aligned, value at bar end | **Block rows**: cuboids extend along the right axis, length = value | ≤ 5 rows |
| 3 | **Grouped bar** | Pairs, second member = `--c1f` light tint of series color; legend chips | Paired columns sharing a footprint row, lighter tint = second member | 2 members only — 3+ groups go flat |
| 4 | **Stacked bar** | Segments bottom-up in series order, total labeled on top | **Channel-stack-form with data**: segment blocks stack on one footprint | ≤ 4 segments |
| 5 | **Line** | 2 px polyline, **no curve smoothing** (drawn things have corners), straight segments | **Contour steps**: adjacent columns trace the trend like a sectioned terrain model | ≤ 8 points, trend story |
| 6 | **Area** | Line + fill at **16% opacity** of series color | Contour steps with all faces tinted (`--c1f`) — the filled terrain | Volume emphasis |
| 7 | **Donut** | Ring thickness ≈ 30% of radius; starts 12 o'clock, clockwise, largest first; **center = headline number** at the largest size fitting 70% of the inner diameter (gallery: 22 px), ink + caption; legend right | **The channel-stack** — share-of-whole has ONE architectural form (curves are banned in the grammar, §A2, and 3D arcs are the most notorious magnitude lie in charting); the stack carries the whole's total as its headline | Always prefer the stack |
| 8 | **Funnel** | **Stage diagram, not a magnitude encoding**: tapered bars with stage name + count + conversion rate in **ink, outside the bar**; carries the `[ STAGE DIAGRAM — not to scale ]` tag (a true-scale funnel is 143:1 and unreadable; a flattering one is a lie — the rates are the data) | Stepped axonometric: equal-footprint descending platforms, counts + rates labeled, same tag | The signature pitch moment |
| 9 | **Stat block** | Stage 2 stat card (top accent bar, numeral, label, receipt) | **Stat-as-column**: numeral rests on a load-bearing column. Height encodes only where a comparison exists; **fixed-height columns render stroke-only — no data face** (a filled face claims an encoding that isn't there) | Hero stats, one per surface |
| 10 | **Sparkline** | ≤ 24 px tall inline: no axes, no gridlines, no labels; 1.5 px line; terminal dot + final value only | **Micro contour-steps** for hero/print use | Print/hero only — inline stays flat |
| 11 | **Comparison table** | Stage 2 data table + 5 px categorical **accent stripe** per row, numbers column `primary-deep` bold tabular | Value column as **block rows** — **rhetorical contexts only**; when the numbers ARE the argument, the flat table is strictly better and ships instead | Pitch moments only |
| 12 | **Lead-quality loop** | 4 cards with categorical top bars + arrows + dashed return path (Stage 2 slide 14) | **4-block circuit**: four blocks on the corners of a dashed iso ring | Closing/architecture moments |
| 13 | **Channel-mix** | 100% split bar (Stage 2 slide 4) — % labels white on blue/slate, **ink on teal** | **Stacked blocks**: heights = budget share, labels beside segments | This primitive is architectural-first by definition |

Plus the paired states:

- **Before/after stat pair** (gallery #14): flat = two display numerals with an arrow, "before" in `text.secondary`; architectural = **the step-form as data** — two columns, the drop is the architecture. Index to 100 when absolute numbers are confidential (UNITAR: 100 → 53).
- **Empty state** (#15): dashed `border.subtle` panel + `text.secondary` sentence naming when real data lands ("First read-out lands Friday Wk 1"). **Never render projections styled as data.**
- **Loading state** (#15): static skeleton blocks (flat: gray bars; arch: gray blocks at 55/75/65% heights, face and strokes in `border.subtle`). No shimmer — and none needed under reduced motion either.

## 5. Mode rules

Everything tokenized — `.light`/`.dark` siblings swap wholesale. Dark specifics: gridline `#1F2A44`, axis `#44537A`, banding `surface.card.dark`, slate segment re-mints to `#6B7489`, `dataviz.tint-1` darkens to `#27406F`, strokes stay `brand.primary` (4.86:1 on navy). Dark canvas = decks/web/social; light = proposals/reports.

## 6. Implementation notes

- The gallery SVGs are generated (30° math, not hand-drawn) — regenerate via **`charts-generator.py`** (filed beside this doc) rather than nudging points; geometry is the spec.
- In Slides/Sheets contexts where SVG can't ship: flat variants build from native shapes per `PROPOSAL-MASTER.md` §4 recipes; architectural variants place exported PNGs.
- Accessibility: every chart carries `role="img"` + a title/aria-label stating the claim and the key number; the architectural form is decoration-plus-data, so the label must carry the data alone.
