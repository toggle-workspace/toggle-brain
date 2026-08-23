# BRU. × HWC — Design System

Brief design system extracted from the BRU × HWC creative-proposal deck. Use it to produce
**PDFs (slides, one-pagers) and HTML pages** that look like they came from the same brand hand.

Source: `Test.pdf` (45pp proposal). Colors sampled from pixels, fonts from embedded font table.

---

## 1. The three layout modes

Every page/slide is one of three modes. Don't mix modes on one page.

| Mode | When | Look |
|---|---|---|
| **A · Photo** | Covers, section dividers, "mood" moments | Full-bleed dark coffee photography, white text, gold sub-line |
| **B · Statement** | One idea per page, narrative build-up | Cream canvas, big purple sentence, neon-yellow highlighter on the key phrase |
| **C · Structured** | Data, plans, comparisons, anything with ≥3 facts | Cream canvas, Archivo Black headline (purple + one red phrase), 3-card grid, black footer bar |

Deck structure is **two acts**: a narrative first half (A section openers + B statement pages that build the argument) and a structured back half (C pages that land the plan, numbers and timelines). A and B interleave; C pages run together as a block. Don't scatter C pages through the narrative act.

---

## 2. Color tokens

| Token | Hex | Role |
|---|---|---|
| `--cream` | `#FCE5CD` | Canvas background (modes B + C) |
| `--card` | `#FDF2DF` | Card fill on cream |
| `--purple` | `#351C75` | Primary text on cream (mode B) |
| `--purple-2` | `#3B2478` | Primary text / card headlines (mode C) |
| `--purple-muted` | `#746096` | Kicker labels, running headers, small caps |
| `--brick` | `#B5330F` | Headline accent phrase, card rule #1, alert bars |
| `--orange` | `#F6B26B` | Circle badges, photo-overlay panels |
| `--orange-rule` | `#F2A25C` | Card rule #3 |
| `--highlight` | `#EEFF41` | Highlighter behind key phrases (mode B only) |
| `--gold` | `#FFD966` | Sub-lines / accent text on dark photo (mode A only) |
| `--maroon` | `#660000` | Text inside orange badges |
| `--ink` | `#1C120B` | Footer bars, card rule #4, text on orange panels' scrim |
| `--white` | `#FFFFFF` | Text on photo / on brick / on footer bars |

**Pairing rules**
- Highlighter `#EEFF41` only carries `--purple` text, only on cream, only in mode B. Never on photos, never in cards.
- Gold `#FFD966` lives only on dark photography — as sub-lines AND as the mode-A payoff device: on photo statement pages, the key phrase goes bold gold (the photo-mode equivalent of the yellow highlighter). Never on cream (fails contrast).
- Orange `#F6B26B` fills carry `--maroon` or `--white` text — never purple.
- Footer bars: `--ink` default, `--brick` for warnings, `--purple-2` allowed on purple-themed pages; text white, optional `--highlight` lead-in word (see §5).

## 3. Typography

Two font pairs, keyed to mode. All on Google Fonts.

**Modes A + B — narrative:**

| Style | Font | Size (1000×563 slide / rem) | Notes |
|---|---|---|---|
| Kicker ("Objective", "Strategy") | Lexend 300 | 34px / 2.1rem | Sentence case, purple, sits directly above the statement |
| Statement | Montserrat 700 | 34px / 2.1rem | 1.35 line-height; highlight key phrase |
| Statement (quiet lead-in) | Lexend 300 | 34px / 2.1rem | Mixed inline with bold — light for setup, bold for payoff |
| Photo title | Lexend 700 | 44px / 2.75rem | White |
| Photo sub | Lexend 300 | 24px / 1.5rem | White or gold |
| Section number | Lexend 700 | 30px / 1.9rem | `01.` style, white on photo |
| Running header | Lexend 400 | 12px / 0.75rem | Top-right, `--purple-muted` |

**Mode C — structured:**

| Style | Font | Size | Notes |
|---|---|---|---|
| Headline | Archivo Black | 40px / 2.5rem | Purple, with ONE phrase in `--brick` |
| Standfirst | Archivo 700 | 15px / 0.95rem | Purple, 2 lines max, sits under headline |
| Card title | Archivo 700 | 18px / 1.1rem | `--purple-2` |
| Card label | Archivo 700 | 11px / 0.7rem | UPPERCASE, letter-spacing 0.08em, `--purple-muted` or `--brick` |
| Card body | Archivo 400 | 13px / 0.85rem | `--purple-2` |
| Big stat | Archivo Black | 34px / 2.1rem | Colored per column (brick / purple / orange) |
| Footer bar | Archivo 700 | 13px / 0.85rem | White; lead-in word in `--highlight` |

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,700;1,400;1,700&family=Archivo+Black&family=Lexend:wght@300;400;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## 4. The headline formula (mode C)

> **Purple statement. <span style="color:#B5330F">Red accent phrase.</span>**

- Short, declarative, full stop at the end. "One story. **Three content engines.**" / "**RM 100K** — every ringgit on attention."
- At most one red phrase per headline — the part you'd say louder. Position is free (start, middle or end); some headlines are all-purple.
- A small brick dash (24×8px) sits top-left of the page above the headline block.

Mode B equivalent: light Lexend for the setup, bold Montserrat + yellow highlight for the payoff.
"Let's say we remove the coffee — <mark>what would people still discuss?</mark>"
Mode A equivalent: white bold statement, payoff phrase in bold **gold**.

## 5. Components

Class names below refer to `tokens.css`.

**Highlight** (mode B) — `<mark>` or `.hl`: background `--highlight`, text `--purple`, no radius, ~4px padding, applied per-line (box-decoration-break: clone).

**Statement page** (mode B) — `.page--statement` > `.statement`; vertically centered by default. `.kicker` for the light header line, `.quiet` for light inline lead-ins.

**Bullet list** (mode B — the deck's most common layout) — `.statement ul`: light Lexend lead-in line (`.quiet` — "Now BRU can have:", "Offline Experiences"), then round `●` bullets in bold Montserrat purple, generous line spacing (~1.7). No highlighter inside lists.

**Card** (mode C) — `.cards` grid > `.card`: fill `--card`, no border, no shadow, no radius, 6px solid **top rule**. Two coloring patterns:
- *Overview pages* (comparing different things): `.cards--positional` — rules colored by position: 1st `--brick`, 2nd `--purple-2`, 3rd `--orange-rule`, 4th `--ink`.
- *Single-topic pages* (e.g. one platform's three plays): `.cards--brick` / `.cards--purple` / `.cards--ink` — all rules, numbers + labels take the page's theme color (TikTok page all brick, Meta all purple, Google all ink).

Inside: `.no` or `.label` → `h3` title → labeled body blocks (`.label` caps + `p` pairs; `.label--hot` for brick). Optional final row: centered bold-italic quote — `.quote--row` ("Your next binge is 2 minutes away."). Big numbers: `.stat` (purple by default; wrap the grid in `.cards--compare` and use `.stat--vs` for per-column colored comparison rows). Grid of 3, `.cards--4` for 4, 20px gap.

**Footer bar** — `.footer-bar`: inset strip near the page bottom (side margins + a small cream gap below — not full-bleed), white Archivo text, one line. Fill `--ink` (default), `--brick` = `.footer-bar--alert` (warnings/deadlines) or `.footer-bar--purple`. Optional `--highlight` lead-in word + colon — `.lead` ("Cadence:", "One rule:", "Critical path:"). Max one per page. Quieter variants: `.footer-bar--strip` (cream stat-strip, purple text) and `.footnote` (plain italic footnote on cream). In flowing HTML docs use `.footer-bar--flow`. Structured slides reserve clearance for the bar automatically (`:has(.footer-bar)`).

**Panel pair** (mode C hero) — `.panel-pair` > `.panel.panel--brick` + `.plus` + `.panel.panel--purple`: two large solid panels, white text: big number (`.no` 01/02), title, body. Joined by a large purple "+". Used to state the two objectives up top.

**Circle badge** — `.circle-badge` (`--orange` circle, size via `--badge-size`, default 240px): centered stack `.no` (white 700), `.title` (white 700 larger), `.sub` (`--maroon` 700 smaller). Used in threes on photo backgrounds; optionally framed by a `.keyline` (thin white box) with a `.photo-headline` above.

**Orange panel** (mode A overlays) — `.orange-panel`: solid `--orange` rect on photo, white text, no radius. Thin white arrows connect panels in sequence.

**Mockup collage** (mode A) — dark phone-UI screenshots (social threads, polls) floated over the dark photo, with short white annotation labels beside them. Used to make seeded content feel real. *No component — compose manually from screenshots.*

**Running header** — `.running-header`: top-right, 12px `--purple-muted`: `01.&emsp;Conversation Talkability Strategy`. Carried by mode B pages inside a numbered section — not by mode A or mode C pages.

**Stat row** — `.label` (Archivo 700 small) + `.stat` Archivo Black number in `--purple-2` by default. Per-column coloring (brick / purple / orange) is opt-in via `.cards--compare` + `.stat--vs`, for comparison rows only ("Brew S1 14.7M" over "RM 100K plan ~7.7M paid").

**Timeline** — `.timeline` > `.stop` (add `.stop--below` on alternates) each holding `.tag` (`.when` date + `.what` description) + `.node` (`.node--milestone` = solid brick): horizontal 1px purple line, circle nodes (white fill + brick ring). Dates + descriptions alternate above/below the line.

**Split/budget bar** — `.split-bar` > `.seg`: segments filled `--brick` / `--purple-2` / `--ink` by position, white Archivo Black percentages inside, platform name via `.name` below each segment. Size each segment with inline `style="flex: <percent>"`.

## 6. Photography (mode A)

- Dark, moody, warm café/coffee imagery — low-key lighting, blacks crushed toward `#0a0805`.
- Two text placements: left block (section number + title + gold sub, image subject right) or a centered white headline over the full image (for badge rows and diagrams).
- If the image isn't dark enough, add a left-to-right black gradient scrim (60% → 0).
- Real drinks, real hands, real venues. No illustration, no stock-bright.

## 7. Page geometry

| Artifact | Size | Margins |
|---|---|---|
| Slides (PDF + HTML) | 16:9 — 1000×563px or 1920×1080 | 56px sides (≈5.6%), headline block starts ~12% from top |
| A4 one-pager | 210×297mm | 18mm sides |
| HTML page | fluid, max-width 1100px | tokens scale via rem |

- Whitespace is a feature: mode B pages are ~70% empty. Don't fill them.
- Footer bar is inset — side margins with a small cream gap below (not full-bleed).
- Card grids: equal heights, aligned top rules.

**Production notes**
- Print-to-PDF from the browser: `@page` is preset to 1000×563px, colors forced exact, one slide per page.
- Headless-Chrome screenshots/PDFs: pass `--virtual-time-budget=10000` so Archivo Black loads before capture — otherwise headlines render in fallback Helvetica.
- Photo sub-lines are gold by default (`.photo-block .sub`); override color inline for white.

## 8. Voice (so copy matches the visuals)

- Short declaratives with full stops. "Views are the currency of the drop."
- Honest framing is on-brand: "What RM 100K buys — honestly."
- Questions as section pivots: "Does BRU deserve to exist outside TONTON?"
- Malay/English code-switching is welcome in audience quotes — always inside quotation marks and highlighted or carded, never in system copy.

---

## Files

- `tokens.css` — all tokens + component classes, ready to import
- `sample.html` — one page per mode + component gallery (open in browser; print-to-PDF ready)
