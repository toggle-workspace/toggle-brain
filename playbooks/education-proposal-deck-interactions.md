---
last_reviewed: 2026-11-01
owner: Yi Yang
source: Zaid's "Industry Focus: Education" deck (toggle-iwisers-education-growth-deck.html), read in full and driven in Chrome on 2026-11-01
companion: playbooks/education-proposal-deck.md (structure and copy)
---

# Education deck: design, interactions and motion

The reference for rebuilding the interactions and animations in Zaid's education deck. Structure and copy rules live in `education-proposal-deck.md`; this file covers how the deck looks, moves and responds.

---

## 1. The deck engine

The whole deck is one HTML file with one script. Nothing is framework code.

| Part | How it works |
|---|---|
| Slides as data | A `SLIDES` array of HTML template strings. A string like `"@ex:geo"` is a token that expands into an exhibit slide built from the `BODY.geo` record (`title`, `kicker`, `body`, `src`). Adding an exhibit means adding one record and one token. |
| Stage | Every slide is an absolutely positioned `section.slide` inside a 1600 × 900 `#stage`. The stage scales with a CSS variable: `--s = min((innerWidth − rail) / 1600, innerHeight / 900)`. The layout never reflows; it only scales. |
| Showing a slide | `go(n)` removes `.on` from the old slide, adds it to the new one, marks hidden slides `inert`, updates the rail, the pill nav, the progress bar and the URL hash (`#7`). Slides cross-fade over 0.45s. |
| Footer and rail | Injected by script after render: a footer on every slide (wordmark, deck name, `n / N`) and a left rail built from each slide's `data-title`, with section labels (The proof, The system, Close). The rail is 56px wide and opens to 330px with titles on hover. |
| Navigation | Arrow keys, Page Up/Down, space, Home/End, `f` for fullscreen, clickable rail, bottom pill with prev/next and the slide title. The pill fades out after 2.6s without mouse movement so it never sits on a slide while presenting. |
| Agenda links | The "honest limit" slide builds its agenda from the system exhibit list, and each card links to `#n`. |
| Auto-fit | `fitOne()` measures each exhibit body and scales it (between 0.6 and 1.2) to fill the space under the title, iterating because a narrower scale changes wrapping. A `ResizeObserver` refits when an interaction makes content taller. |
| Print | `beforeprint` sets every animation to its finished state (bars full, counters final, ladder at Q4, CRM loop at week 12), and the print CSS outputs one 1600 × 900 page per slide. Printing to PDF gives a clean static deck. |
| Personalization | The "Prepared for" input in the call planner writes the prospect's name into every `.uni-n` span and re-renders the GEO answer. It saves to `localStorage` under `edu-uni`, shared with the idea lab page. |
| Call planner (added 2026-11-01) | `#plan` panel opened with `S`. State `{mode: full or short, audit, add, del}` saved under `edu-plan`; `SEQ` holds the picked slide indices; `step()` replaces `go(cur±1)` so arrows walk `SEQ` and return to it from an extra; `applyPlan()` renumbers footers, the pill, the rail and the agenda, and marks unpicked slides `.skip` so print drops them. A short call is the 8 core slides plus at least two findings and two system slides from the audit ticks. The panel zooms down to 72% to fit short windows. |
| Self-contained | Fonts (Instrument Serif, Instrument Sans, JetBrains Mono) and all 40 images are base64 inside the file, so it works offline. Encode photos as WebP (`cwebp -q 82 -m 6 -sharp_yuv`, max 1200px wide) before embedding: this took the reference deck from 9.1MB of JPEGs to 3.9MB with no visible loss. |
| Bottom band | Keep the lowest 84px of every slide clear of content. The footer sits there and the floating slide controls cover about the bottom 66px. Source lines use `margin-bottom: 84px`. |

### The trick that makes per-slide animation work

The exhibits were first built for a scrolling page, where `IntersectionObserver` starts each animation when it scrolls into view. In a deck every slide is stacked in the same place, so a real observer would see all of them at once. Zaid replaces `window.IntersectionObserver` with a small stand-in that reports an element as visible only while its slide has `.on`. `go()` pings every observer on each slide change. The result is that every animation starts when its slide opens, stops when it leaves, and replays on the next visit, with no change to the exhibit code. Slides that are not showing also get an `.offscreen` class that pauses their CSS animations.

Reuse this whenever you lift a component from a scrolling page into a deck.

## 2. Motion system

| Rule | Value |
|---|---|
| One easing curve for everything | `cubic-bezier(.16, 1, .3, 1)`, a fast start with a long soft landing |
| Slide change | Opacity cross-fade, 0.45s |
| Bars | Width from 0 to target over 1 to 1.1s with a 0.3s delay, so the slide settles before the data moves |
| Count-up numbers | 1.4s, cubic ease-out, formatted with thousands separators |
| Smaller number changes | 0.7s tween (the training ladder) |
| Auto-advance | Carousel every 2.6s, five-messages walkthrough every 2.2s, ladder every 1.5s, CRM loop every 0.65s per week |
| Replay | Bars reset to 0 when a slide is left and grow again on the next visit (`grow(slide, on)` reads `data-w` and `data-l`) |
| Stop on touch | Every auto-play stops the moment the viewer clicks, drags or picks a step |
| Reduced motion | `prefers-reduced-motion` disables transitions, and every Play button jumps to the end state instead |

Only three things loop forever: the cover waves, the green "live" dot on the dashboard, and the flowing dashed line on the CRM loop. Everything else moves once, with purpose, and then waits for the viewer.

## 3. The interactions, slide by slide

| Slide | What the viewer does | What happens | How it is built |
|---|---|---|---|
| Cover | Nothing | Three layered blue waves drift slowly behind the title | SVG paths with SMIL `<animate>` on the `d` attribute, spline easing, 9s, 12s and 15s cycles so they never sync. Paused when the cover is not showing. A gradient mask fades them in from the top. |
| Our top performing ads | Click, drag, swipe, scroll sideways or use the arrows | 30 real ads fan out like a hand of cards; the active card is lifted with an accent ring and the caption shows client and programme | Each card is positioned with `translateX`, `scale(1 − 0.075 × distance)` and `rotate(1.6° × distance)`, with saturation dropping as cards move away. Card widths follow each ad's real ratio (1:1, 4:5, 9:16). Ads are ordered so no two from one client sit together. Auto-deals every 2.6s while visible. |
| Proof at scale | Nothing | Four numbers count up, and a pie fills to 77% | `countUp()` on `data-count`. The pie is a circle whose stroke is as wide as its radius, so `stroke-dasharray` draws a solid wedge that animates to 77%. |
| Finding head-to-heads | Nothing | The cost-per-lead bar under each ad grows; the winner's bar and tag are in accent | `vcard()` builds each column; bars use `data-w` relative to the benchmark. |
| Finding 02 | Nothing | Split slide: copy on paper, a giant "29x" and two bars on ink | Half-width dark panel positioned absolutely on the right |
| Finding 03 | Nothing | A range bar (RM149 to RM367, hatched) against two short accent bars | `data-l` sets the bar's left edge and `data-w` its width, so a range draws as a floating bar |
| Finding 05 | Nothing | Five monthly columns rise; June in aqua, September in red with an annotation | Hand-built SVG; each `rect` animates `height` and `y` from the baseline |
| Training ladder | Press Play the year, or click a quarter | Four stacked bars fill to 15%, 35%, 55% and 70%; future quarters are hatched; the big number and the two mini stats tween; the step list ticks off done quarters | Flex-grow on two spans inside each bar animates the split. Auto-plays once on entry. |
| Campus workshops | Click See the fix | The whole card flips in 3D from the problem (dark) to the fix (light, with workshop photos) | `perspective` on the wrapper, `rotateY(180deg)` with `preserve-3d` and hidden backfaces. The hidden face is set `inert` so keyboard focus cannot land on it. Resets to the problem side when you leave the slide. |
| Channels | Click a platform card | The card lifts; the panels below show who it reaches, what it is measured on, and the before-cost bars with that platform highlighted | Re-renders the panel from the `JOBS` array |
| Search and AI | Toggle Before GEO / After GEO, or Replay | A mock AI chat answers a parent's question; after GEO the prospect's name appears first with highlighted citations; the score counts from 4 to 31 of 50 | Answer fades in with a blinking block caret, then the caret is removed. The name comes from the Prepared for field. |
| Parent communities | Click a numbered pin in the thread, or a rule in the list | The pin and its rule highlight together | Pins and rules share `data-p`, so either side selects both |
| Intake planning | Click month headers to toggle intakes | Six lanes (seeding, awareness, search, open day, final call, nurture) recompute across 12 months; cell darkness shows budget weight | Each lane is a function of the selected months, for example seeding runs 9 to 11 months after an intake |
| Lead nurturing | Switch Student / Parent track, click a day | A WhatsApp phone fills with messages up to that day, each with its call-to-action button | Native WhatsApp styling (green header, beige chat, tick bubbles) built in CSS; messages pop in with a short rise |
| Open days | Drag the day slider or press Play the campaign | Day counter runs from T minus 21 to T plus 14 with a phase name; eight lanes light up when active; the list below says who does what that day, tagged Toggle, iWisers or Joint | `requestAnimationFrame` loop advances one day every 180ms |
| Open day nurture | Click a step | Auto-walks through the five messages once on entry; the card shows timing, audience and channel | Parent-addressed steps are ringed in amber |
| On-demand pivots | Drag any programme slider, or pick As it ran / Tilt to cheapest / Even split | The other sliders rebalance so the total stays 100%; enquiries, change against the original mix and blended cost update live | Real cost per enquiry from City University. A diminishing-returns curve (`cost × (spend / original)^0.35`) stops "all on the cheapest" from looking free. Percentages use largest-remainder rounding so they always sum to 100. |
| Sales and marketing (CRM loop) | Press Play 12 weeks or drag the week slider | Three dot grids (enquiries, calls, enrolled) brighten as more fit students arrive; the return path lights up and flows; cost per enquiry rises while cost per student falls on a mini line chart; a CRM log shows statuses being sent | SVG waffle of 100 dots per stage, an exponential learning curve `1 − e^(−week / 3.5)`, an animated `stroke-dashoffset` on the return path |
| Reporting | Nothing | A dark dashboard whose numbers and bars tick up every 1.6s, with a "pivot suggested" alert | `setInterval` that only runs while the slide is showing and the browser tab is visible |

## 4. Visual language

- **Editorial, not corporate.** A large serif for every title and hero number, with the second half of the title in italic accent. Mono capitals for kickers, labels, table heads and tags. Plain sans for reading text.
- **Mockups wear their own clothes.** The AI chat, the Facebook group, WhatsApp and the dashboard each use their native look instead of the deck palette. That contrast is what makes them read as real tools.
- **Light and dark carry meaning.** Paper and white slides argue; ink slides deliver the evidence (video head-to-heads, the through-line, the close). Aqua replaces blue as the accent on ink.
- **Color has jobs.** Blue is Toggle and the winner. Teal is iWisers. Amber is the parent. Red is the problem month. Grey is the benchmark.
- **Data marks are quiet.** No gridlines, no chart titles inside charts, values written directly on or beside each bar, the slide title doing the arguing.
- **Every exhibit has the same frame.** Kicker with badge, claim title, one paragraph of instruction ("Drag the day", "Press play"), the exhibit, a source line.

## 5. Rules for building new interactions

1. Give the viewer one control and one obvious result. Tell them what to do in the paragraph under the title.
2. Auto-play once when the slide opens, then hand control to the viewer and stop on their first touch.
3. Use real numbers where we have them and say in the source line which parts are a model.
4. Build the print state for every interaction so the PDF shows the finished picture.
5. Use the shared easing, the `grow()` attributes and the observer stand-in rather than writing new timing code.
6. Mark buttons with `aria-pressed`, announce changing numbers with `aria-live`, and keep `prefers-reduced-motion` working.
