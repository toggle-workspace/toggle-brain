---
last_reviewed: 2026-11-01
owner: Yi Yang
source: Zaid's "Industry Focus: Education" deck (Toggle × iWisers, October 2026), studied slide by slide
status: v1, for review by Zaid
---

# Education proposal decks

How to build a proposal deck for a short conversation with a university, college or school, written from Zaid's Toggle × iWisers education deck. That deck is the reference build: a single self-contained HTML file, 30 slides on a 1600 × 900 stage. The original sits at `~/Desktop/Toggle_Claude/toggle-iwisers-education-growth-deck.html` until it is filed in `clients/toggle/decks/`.

Read `brain/voice/writing-standards.md` first. Every rule there applies, and Zaid's deck follows all of them.

---

## The idea the deck is built on

The deck argues one thing in two halves.

1. **The proof.** Across three education accounts, the cheapest lead always came from a creative decision. Each finding is shown as a controlled head-to-head from a real account.
2. **The system.** Every number in the proof stops at the lead. The second half is the system that carries a lead to an enrolment, with the parent who pays the fees inside it.

The hinge between the halves is a slide that admits a limit ("Every number so far stops at the lead"). Admitting the limit is what earns the right to sell the system.

## The arc (full build, 30 slides in the October version)

Zaid's 2 November export adds two system slides, "Why leads are lost" (a Bad, Okay, Best slider over 1,000 sample leads) and "Live ads dashboard" (a real UNITAR Meta account with figures blurred), for 32 in total, plus a new theme layer. Each new export goes through `tools/edu-deck-patch/` to reapply our fixes and the call planner.

| # | Slide | Job |
|---|---|---|
| 1 | Cover | Toggle × partner lockup and "Industry Focus: *Education*". Nothing else. |
| 2 | The work | A carousel of 30 real ads across three universities. Show the work before any claim. |
| 3 | The evidence base | One table: account, platforms, spend, leads, period. Tells the prospect how much data sits behind what follows. |
| 4 | Proof at scale | Four count-up numbers from the largest account (78,000+ leads, RM7m+ managed, best month, 77% impression share), plus client logos. |
| 5 | Five findings | The index: five numbered findings, each with one line of evidence and the accounts it came from. |
| 6 to 12 | One finding per slide | Benchmark ad against winning ad, same account, same period, one variable changed. Cost per lead under each, multiplier on the winner. Finding 01 gets three slides because it held in all three accounts. |
| 13 to 14 | Training and workshops | The problem (creative runs out, cost doubles) flips to the fix (campus teams make their own content). |
| 15 | New work in market | New ads built on the findings, with the honest note that they launched this month and there is nothing to measure yet. |
| 16 | The through-line | One sentence on a dark slide: "The cheapest lead in every account came from *a creative decision*." |
| 17 | The honest limit | "Every number so far *stops at the lead*." Bridges to the system and carries a clickable agenda. |
| 18 to 29 | The system | Twelve interactive exhibits (list below). |
| 30 | Next step | One working session to plan their next intake. What they bring, what we bring, what the session produces. |

### The twelve system exhibits

Each one is a working toy, not a picture. The prospect clicks, drags or presses play.

| Exhibit | Interaction | Badge |
|---|---|---|
| Partnership split | Table: stage × Toggle × partner, one lead per stage | Illustrative |
| Platform jobs | Click a platform to see its one job, who it reaches and what it is measured on | Verified |
| GEO mockup | AI assistant answers a parent's 11pm question, before and after GEO, with the prospect's name dropped in | Mockup |
| Parent group thread | Seeded reply in a parents' Facebook group, with numbered pins for the four disclosure rules | Mockup |
| Intake planner | Toggle intake months and the year's lanes (seeding, search, open day, final call, nurture) replan themselves | Illustrative |
| WhatsApp nurture | Phone mockup; switch between a student track and a parent track and step through days 0 to 14 | Mockup |
| Open day command center | Drag from T minus 21 to T plus 14 and the active lanes light up | Illustrative |
| Open day turnout | Three people decide on a visit: the student, the parent, the one who went quiet | From a past proposal |
| Five messages | The five messages between booking and the morning of the open day | From a past proposal |
| Budget pivot | Sliders move budget between programmes using real cost per enquiry, with a diminishing-returns curve | Illustrative |
| CRM loop | Play 12 weeks of enrolment data flowing back to Google and Meta; cost per student falls while cost per enquiry rises | Illustrative |
| Dashboard | The admissions team's morning screen, numbers ticking, with a "pivot suggested" alert | Mockup |

## The short-conversation cut (10 to 12 slides, 20 to 30 minutes)

The full build is a library, not a script. The deck has a built-in call planner: press `S` (or the sliders button in the slide controls or at the top of the rail), type the prospect's name, pick **Short call**, and tick what the pre-call audit found. The arrow keys then step through only the picked slides, the counter and footers renumber ("05 / 12"), and the other slides stay in the rail as dimmed extras you can open if the prospect asks. Printing gives a PDF of only the picked slides, and **Copy setup link** produces a `?for=Name&slides=1.2.3` link that opens the same cut. The audit ticks follow the rules below.

1. Cover, with the prospect's name set in "Prepared for".
2. The work (let the carousel run while you introduce yourselves).
3. The evidence base.
4. Proof at scale.
5. Five findings, as the index.
6. and 7. The two findings that match what the pre-call audit found on their account. If their Ad Library shows syllabus-led ads, use Finding 01. If they send ads to a website, use Finding 02. If they run Chinese or Bahasa ads translated from English, use Finding 04.
8. The through-line.
9. The honest limit, with the agenda.
10. and 11. The two system exhibits that match their calendar. An intake within eight weeks means the open day or intake planner. Heavy parent influence (foundation, diploma, school) means the WhatsApp parent track or the parent thread. A postgraduate or online arm means the CRM loop.
12. Next step.

If you have not done the ninety minutes of pre-call research in `playbooks/sales-play.md`, you cannot choose slides 6, 7, 10 and 11. Do the research first.

## Copy rules seen in the deck

- **Titles are claims, set as full sentences ending in a period.** The second half of the title is in italic accent color and carries the turn: "The course is *not the hook*." / "Ask, or reach is *worth nothing*." / "Put a number *on the frame*."
- **Every slide has a kicker above the title** in mono capitals: `Section · Client · Platform`, for example `FINDING 01 · IJN UNIVERSITY · TIKTOK`.
- **Every finding is a controlled comparison.** Same account, same period, ideally the same shoot, with the one changed variable named in the body ("Only the first caption differs."). Label the pair `Benchmark` and `Winner · 3.5x`.
- **Every number carries its window, denominator and source.** "RM10.24 per lead · 35 leads", "March to July 2026", and a `Source:` line at the bottom of each exhibit.
- **Mark what is real.** Each exhibit carries one badge: `Verified`, `Illustrative model` or `Mockup`. Sample figures carry a `Sample data` badge until the real ones arrive. The source line says which parts are assumptions.
- **Say the limits out loud.** "Every number so far stops at the lead." "There is nothing to measure yet." These slides build trust; never cut them to look stronger.
- **Write to the parent.** The deck's education insight is that the parent pays and often decides. Name the parent in titles, exhibits and nurture copy ("A student track and a *parent track*", "the parent who pays the fees").
- **Use education-specific moments:** the SPM results window, three intake cycles a year, the open day as a three week campaign, scholarships and fee waivers, the graduate tracer study, parent WhatsApp groups and Facebook groups, PDPA consent.
- **Body copy is short and plain.** One or two short paragraphs per slide, one bolded sentence that carries the point. No bullets on argument slides.
- **The close is an ask for a working session**, never a thank-you slide. Say what the session produces: a one-intake pilot plan, a budget range and the three numbers we will be judged on.

## Visual system

| Element | Spec |
|---|---|
| Canvas | 1600 × 900 stage, scaled to the window. Left rail of slide numbers grouped into sections (The proof, The system, Close), bottom pill nav, top progress bar, arrow keys, `#n` in the URL for each slide. |
| Type | Instrument Serif for titles and big numbers, Instrument Sans for body, JetBrains Mono for kickers, labels and tables. Fonts are embedded as base64 so the file works offline. |
| Sizes | Cover title 132px, closing title 86 to 92px, slide title 60 to 72px, exhibit title 52px, body 17 to 19px, kicker 13px mono, source line 13.5px. Hero numbers 104 to 200px serif. |
| Palette | Paper `#F4F8FD`, white `#FFFFFF`, deep paper `#E6EFFA`, ink `#0E1B33`, ink-2 `#4A5A75`, accent `#2A6BE0`, aqua `#8CE0EC` (accent on dark slides), partner teal `#0E8C9C`, amber `#D2971E` (the parent), alert `#DB4A45`. |
| Rhythm | Rotate backgrounds between paper, white, deep paper and ink. Use ink (dark) for the video head-to-heads, the through-line and the close. |
| Evidence | Real ad creative in rounded cards with soft shadow. Cost per lead in large serif under each card, a bar that grows on entry, a mono tag (`BENCHMARK` in grey, `WINNER · 3.5X` in accent). |
| Motion | Bars grow and numbers count up when a slide opens. Respect `prefers-reduced-motion`. Print gives one finished slide per page. |
| Footer | Toggle wordmark, "Education growth · Toggle × iWisers", page n / N. |
| Personalization | A hidden "Prepared for" field on the cover writes the prospect's name into every `.uni-n` span (GEO answer, dashboard, nurture header, close). |

## Before you build one

1. **Run the conflict check.** UNITAR is a paying client and our 77% impression share figure describes share taken from other Malaysian universities. For any competing institution, disclose the UNITAR relationship in the first five minutes and offer category exclusivity terms. See `clients/toggle/higher-ed-meetings-sept-2026.md`.
2. **Check the proof is still current.** The findings come from the Education Creative Deck (October 2026) and the UNITAR, City University and IJN University account reports. Refresh numbers that are more than a quarter old, and check claims against `brain/case-studies/PROOF-GAPS.md`.
3. **Swap the partner if needed.** The reference deck is co-branded with iWisers (parent community seeding). Without iWisers, drop the partnership split and the parent thread, and recolor partner-owned lanes.
4. **Do the pre-call audit** (`playbooks/sales-play.md`) so the short cut can be chosen for this prospect.
5. **Run the writing standards pre-flight.** No em dashes in any HTML text node, alt text or data string.
