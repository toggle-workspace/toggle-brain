---
last_reviewed: 2026-11-04
owner: Yi Yang
source: Zaid's "Industry Focus: Education" deck and Toggle's call planner (playbooks/education-proposal-deck.md, playbooks/education-proposal-deck-interactions.md)
use: paste the block below into Claude, then add the brief at the bottom
note: inlines the essentials of brain/voice/writing-standards.md on purpose, because it is pasted outside the repo. That file stays the source; update this prompt when it changes.
---

# Prompt: interactive proposal deck (Toggle house format)

```text
You are building a Toggle Solutions proposal deck for a short sales conversation (20 to 30 minutes) with one prospect. The format is a single self-contained HTML file that behaves like a presentation: fixed slides, keyboard navigation, and interactive exhibits the prospect can click, drag and play with during the call. Follow every rule below.

WORKING ORDER
1. Read my brief at the bottom. If a fact you need is missing (a number, a date, a client name), ask me. Never invent a number, a result, a quote or a client.
2. Before writing code, send me the outline: every slide with its kicker, its title and, for exhibit slides, which interaction it uses. Wait for my approval.
3. Build the full file. No placeholders, no "rest of the slides here".
4. Run the quality checklist at the end and tell me what you checked.

THE ARGUMENT (the deck's spine)
The deck makes one argument in two halves, joined by an honest admission.
- Cover: Toggle wordmark (plus a partner lockup only if I say so) and a short title such as "Industry Focus: <em>Education</em>". Nothing else, except a "Prepared for <prospect>" line once a name is set.
- The work: a carousel of our real ads for this industry. Show the work before any claim.
- The evidence base: one table of the accounts behind the claims (account, platforms, spend, results, period).
- Proof at scale: three or four big numbers from our strongest account, counting up when the slide opens, plus client logos.
- The findings index: three to five numbered findings, each with one line of evidence and the accounts it came from.
- One slide per finding: a controlled head-to-head. The benchmark ad and the winning ad sit side by side, from the same account and period, with one variable changed and named in the copy ("Only the first caption differs."). The cost per result sits under each ad, with a bar and a tag: "Benchmark" in grey, "Winner · 3.5x" in the accent.
- The through-line: one sentence on a dark slide that sums up what every finding has in common.
- The honest limit: a slide that names what our numbers cannot prove (for example, "Every number so far stops at the lead.") and bridges to the system. It carries a clickable agenda of the system slides.
- The system: interactive exhibits showing how we carry a lead to a sale, matched to this prospect's gaps.
- Next step: ask for one working session. Say what they bring, what we bring and what the session produces (for example, a pilot plan, a budget range and the three numbers we will be judged on). Never end on a thank-you slide.

COPY RULES (binding)
- Full sentences everywhere. No dramatic fragments ("Speed. Precision. Results.").
- American spelling, plain words a reader in Kuala Lumpur or New York uses daily. No "utilize", "leverage", "whilst".
- Never write an em dash or a double hyphen anywhere, including HTML text, alt text and data strings. Use a comma, a colon, parentheses or a new sentence.
- No adverb crutches (really, just, actually, truly, simply), no "it's not X, it's Y" contrasts, no throat-clearing ("Here's the thing").
- Every slide title is an arguable claim written as a sentence ending in a period. Its second half is italic in the accent color and carries the turn: "The course is <em>not the hook</em>." / "Ask, or reach is <em>worth nothing</em>."
- Above every title, a kicker in mono capitals: Section · Client · Platform (for example, "FINDING 01 · IJN UNIVERSITY · TIKTOK").
- Every number states its window, its denominator and its source ("RM10.24 per lead · 35 leads · March to July 2026"). Every exhibit ends with a source line.
- Every exhibit carries one badge: Verified, Illustrative model, Mockup, or Sample data. If a figure is a placeholder, it keeps the Sample data badge until I give you the real number.
- Body copy is one or two short paragraphs per slide with one bolded sentence that carries the point. No bullet lists on argument slides.
- Write to the person who pays and decides, and name them (in education this is often the parent).

VISUAL SYSTEM
- Canvas: every slide is a 1600 x 900 stage, scaled to fit the window (scale = min(available width / 1600, height / 900)). The layout never reflows; it only scales.
- Fonts: Instrument Serif for titles and hero numbers, Instrument Sans for body text, JetBrains Mono for kickers, labels, tags and table heads. Embed them as base64 woff2 so the file works offline.
- Sizes: cover title 132px, closing title about 90px, slide titles 60 to 72px, exhibit titles 50 to 52px, body 17 to 19px, kicker 13px, source line 13.5px, hero numbers 104 to 200px.
- Colors (CSS variables): paper #F4F8FD, white #FFFFFF, deep paper #E6EFFA, ink #0E1B33, ink-2 #4A5A75, ink-3 #5F6B82, line #D5E2F0, accent #2A6BE0, accent-deep #1B4CB0, accent wash #E3EDFC, sky #7FB3EE, aqua #8CE0EC (the accent on dark slides), amber #D2971E (the decision-maker), alert #DB4A45 (the problem), electric #2563FF, midnight #070B1A, pop pink #FF4F9A.
- Color jobs: blue is Toggle and the winner, grey is the benchmark, red is the problem, amber is the decision-maker. Pink appears once per slide at most and only on the winner or the best option.
- Light slides argue; dark slides (midnight with a soft electric-blue glow) deliver evidence: the video head-to-heads, the through-line and the close. Rotate light slide backgrounds between paper, white and deep paper.
- Mockups wear their real clothes: a WhatsApp screen looks like WhatsApp, a Facebook group like Facebook, an AI chat like an AI assistant. That contrast makes them read as real tools.
- Charts argue rather than decorate: no gridlines, no chart titles inside charts, values written on or beside each bar.
- Footer on every slide: Toggle wordmark, the deck name, and "n / N". Keep the bottom 84px of every slide clear of content so nothing sits under the footer or the floating controls.
- Never use AI-purple gradients, glassmorphism everywhere, three identical feature cards, or Inter on slate.

THE DECK ENGINE (build it this way)
- Slides live in one JavaScript array of HTML template strings; exhibit slides are built from records with title, kicker, body and source. Each slide has data-title.
- go(n) cross-fades slides (opacity, 0.45s), marks hidden slides inert, updates the URL hash (#7), a progress bar at the top, and a bottom pill nav (prev, "05 / 12", slide title, next) that fades out after 2.6s without mouse movement.
- A 56px left rail lists every slide by number, grouped into sections (The proof, The system, Close), and widens on hover to show titles.
- Keys: arrows, Page Up and Down, space, Home, End, F for fullscreen.
- Replace window.IntersectionObserver with a stand-in that reports an element as visible only while its slide is the current one, and ping it on every slide change. Every animation then starts when its slide opens and replays on the next visit.
- Each exhibit body auto-scales (between 0.6 and 1.2) to fill the space under its title, with a ResizeObserver to refit after interactions.
- Printing gives one 1600 x 900 page per slide, with every animation in its finished state.
- Respect prefers-reduced-motion: no transitions, and every Play button jumps to the end state.

MOTION
- One easing curve everywhere: cubic-bezier(.16, 1, .3, 1).
- Bars grow from zero over about 1s with a 0.3s delay. Big numbers count up over 1.4s. Both reset when the slide is left and play again on return.
- Each exhibit plays once when its slide opens, then hands control to the viewer and stops the moment they touch anything.
- Only three things may loop: a slow wave or glow on the cover, a "live" dot on a dashboard, and a flowing line on a loop diagram.

INTERACTION KIT (pick the ones that fit; each exhibit has one control and one obvious result, explained in the line under the title, such as "Drag the day" or "Press play")
- Ad carousel: real ads fanned like a hand of cards (each card offset, scaled down 7.5% and rotated 1.6 degrees per step away from the active card), true aspect ratios, drag, swipe, arrows, auto-advance every 2.6s.
- Head-to-head cards: two ads with cost per result, growing bars and Benchmark and Winner tags.
- Count-up proof numbers, and a pie drawn with an SVG stroke as wide as its radius.
- Flip card: a 3D flip from the problem (dark) to the fix (light); the hidden face is inert; it resets to the problem when the slide is left.
- Segmented toggles: before and after views (for example, an AI answer before and after search optimization, with the prospect's name written in).
- Timeline scrubber: drag from three weeks before an event to two weeks after; each activity lane lights up when active, with a Play button.
- Budget simulator: sliders that rebalance to 100% using real cost per result, with a diminishing-returns curve so piling everything onto the cheapest line stops paying.
- Loop player: press play to run 12 weeks of sales data flowing back to the ad platforms, with cost per lead rising while cost per customer falls.
- Native mockups: a phone with a message sequence you step through by day, a community thread with numbered pins tied to a rules list.
- Tier slider: Bad, Okay and Best layers on one slide, showing what the prospect sees with no agency, another agency and Toggle.
- Live dashboard: a mock morning screen whose numbers tick while the slide shows, or a real account table (sortable, searchable) with sensitive figures blurred after the first digit.

THE CALL PLANNER (include it)
A "Set up this call" panel opened with the S key, a button in the pill nav and a button at the top of the rail.
- "Prepared for" field: writes the prospect's name into every element with class uni-n and shows "Prepared for <name>" on the cover.
- Full deck or Short call. A short call keeps the core slides (cover, the work, evidence, proof, findings index, through-line, honest limit, next step) plus at least two findings and two system slides.
- Audit ticks: plain statements about the prospect ("Their ads send people to a website instead of a lead form"), each adding the slide that answers it.
- A checklist of every slide for manual edits.
- When presenting, the arrows step only through picked slides, and the counter and footers renumber ("05 / 12"). Unpicked slides stay in the rail, dimmed as extras, and the next arrow press returns to the sequence.
- Printing outputs only the picked slides. "Copy setup link" produces ?for=Name&slides=1.2.3. The setup is saved in localStorage.

FILE SIZE
Embed every image as WebP (about quality 82, no wider than 1200px) so the file stays near 4 to 5MB and can be sent on WhatsApp or email.

QUALITY CHECKLIST (run it and report)
- No em dash or double hyphen anywhere in visible text, alt text or data.
- Every number traces to my brief; placeholders carry the Sample data badge.
- No content in the bottom 84px of any slide.
- Every interaction works by mouse and keyboard, auto-plays once, stops on touch, and has a finished print state.
- The planner's short call steps correctly, and printing it gives only the picked slides.
- No console errors.

MY BRIEF
Prospect: <name, industry, location>
Meeting: <length, who is in the room, first or second conversation>
Partner on the deck: <none, or partner name and what they deliver>
Proof I can use: <accounts, platforms, spend, results, periods, and which numbers are confirmed>
Head-to-head examples: <for each finding: benchmark ad, winning ad, the one variable that changed, cost per result for each>
What the pre-call audit found: <their gaps, in plain statements>
Ad images: <attached files or folder>
What we want from the meeting: <the ask>
```
