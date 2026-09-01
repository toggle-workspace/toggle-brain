---
last_reviewed: 2026-08-27
owner: Zaid
---

# Toggle sales pages

Two HTML pages and one shared data file. No build step, no dependencies beyond Google Fonts. Double-click either page and it runs.

| File | Use it for | Prospect-specific? |
|---|---|---|
| `index.html` | **The company profile.** The first call, the intro meeting, the link you send to someone who asked what Toggle does. Ends in a BANT qualification the prospect answers on screen. | No, fully generic |
| `diagnosis.html` | **The post-audit page.** A second conversation, after you have researched one named prospect. Carries their name, three findings you pulled before the call, and their arithmetic. | Yes, one prospect at a time |
| `sales-data.js` | The client roster and the nine published cases, shared by both pages. | Edit here once |

They cross-link in the header, so you can move between them mid-call.

The call script that goes with both is `playbooks/sales-play.md`. Read that before you use these.

## Running them

**Company profile.** Open `index.html`. Nothing to fill in. On a call, scroll it and let them react. The arithmetic section is live, so you can type their numbers in while they watch.

**Diagnosis page.** Open `diagnosis.html`, click **Set up**, enter the company, market, date and the three pre-call findings. Then type their four numbers into the arithmetic section on the call.

**Save as PDF** on either page prints everything with the inputs baked in. That is the leave-behind. Anything typed stays in that browser's local storage, never leaves the machine, and is not shared with the prospect when you send them a link. If you want the numbers preserved in what you send, send the PDF.

## Identity

These pages do **not** use `clients/toggle/design-system/` (blueprint blue #4A7BF7, Inter Tight). Zaid superseded that for sales material on 2026-08-27.

The **structure** comes from a NewForm showcase reel of the Pallet Ross site: physical card metaphor, mixed-treatment serif headlines that switch color and style mid-sentence, full-bleed color panels, scattered constellations.

The **colorway** is Toggle's own, sampled from toggle.solutions: navy ink, royal blue action, and the sky-to-aqua wave field behind the hero.

| Role | Value |
|---|---|
| Paper | `#F4F8FD`, white lift `#FFFFFF`, blue-tinted deep `#E6EFFA` |
| Ink | `#0E1B33` navy, secondary `#4A5A75`, tertiary `#8794AC` |
| Accent | Royal blue `#2A6BE0`, deep `#1B4CB0`, wash `#E3EDFC` |
| Wave field | Sky `#7FB3EE` into aqua `#8CE0EC` |
| Second dark | `#0F2A47`, used once, on the honest-limits panel |
| Semantic only | Alert `#DB4A45`, amber `#D2971E`, on the 7px severity dots |
| Display | Instrument Serif, roman and italic mixed inside one sentence |
| Body | Instrument Sans |
| Labels and numerals | JetBrains Mono, uppercase, wide tracking |

The wave field is inline SVG: three sky-to-aqua bands behind each hero, two navy bands behind each close. Both are masked with a top fade so type always lands on flat ground.

Light theme only, locked, per `brain/voice/writing-standards.md`.

**The CSS is duplicated between the two pages on purpose,** so either one can be opened or sent on its own. A palette change means editing the `:root` block in both. The facts are not duplicated: they live in `sales-data.js`.

## What the profile is built to do

Five beats, in this order, set by Zaid on 2026-08-27:

| # | Section | Beat |
|---|---|---|
| 1 | `#hero` and `#who` | **Introduce Toggle.** What the firm is, the three practices, the twelve services, the named team, and the no-junior-account-manager claim made structurally. |
| 2 | `#authority` | **Toggle is the market authority.** Four claims on the full-bleed accent panel, each with the figure that proves it and the case it traces to. |
| 3 | `#book` | **How many clients.** 34 accounts in moving rows, clickable into cases, with the proof depth and the proof limits stated side by side. |
| 4 | `#doing`, `#math`, `#engage` | **What Toggle will do for you.** The fixed four-step method, what it is worth in their own numbers, and the five ways to start. |
| 5 | `#bant` | **Are they ready.** Budget, Authority, Need and Timing, answered on screen, scored live. |

### The BANT section

Four questions, four options each, defined in the `BANT` array at the top of the script. Each option carries a `v` of `g`, `a` or `r`, and the verdict card computes one of four states:

- **Nothing answered:** an invitation.
- **Partly answered:** a nudge with the count remaining.
- **All green:** "You clear all four. The next step is the audit."
- **Any amber:** names the specific condition to settle and says the audit resolves it.
- **Any red:** "We would decline this brief today," and names which condition and why.

The four conditions are the fit criteria from `brain`, turned into questions the prospect answers rather than a checklist the rep fills in privately. That flip is the point: it puts Toggle in the position of qualifying them.

It doubles as the rep's BANT capture. Answers persist in that browser, so a presenter can fill it in during the call and screenshot the verdict for the CRM.

## The team grid (hidden)

**This section is switched off.** `<section id="team" hidden>` in `index.html`, hidden on 2026-08-29 at Zaid's request while the names are still unmapped. Delete the `hidden` attribute to bring it back; `buildTeam()` checks for it and skips building, the nav never linked to it, and nothing else on the page depends on it. The rest of this section describes what returns when you do.

`index.html` opens its second section on a 4 across, 2 down grid of the individual head cutouts, over the wave field. Each tile rests at 55 percent grayscale; hovering brings that one head back to full color, scales it up and lifts the tile. Clicking opens the sitter's profile in the shared modal, which carries Previous and Next through all 8.

**Assets.** `heads/h1.webp` through `h8.webp` are the 8 individual cutouts, numbered left to right in the order the sitters appear in the `TEAM` array (339KB in total). `team.webp` is the full group shot with the studio background knocked out (217KB). The grid does not load it, and it is kept as the source the cutouts came from.

Both were cut from the supplied files, which arrived on baked white with no alpha. The knockout keeps only pure neutral white that connects to the border, so the white t-shirt survives; a plain white key punches straight through it.

**The bottom fade.** Every cutout ends flat at the neck. `.tim` carries a `mask-image` that dissolves the last quarter of the image into the tile, so the tiles read as portraits rather than as heads cut off at the throat. Remove it and the cut line comes back.

**The old photo geometry.** Each `TEAM` entry still carries `x`, `y`, `d` (the circular hotspot over the face) and `l`, `t`, `w` (that person's cutout registered on their own neck), both as percentages of the photo box. The grid reads none of them. They are kept so the full-photograph layout can be restored without re-measuring 8 faces.

**Mobile.** Below 820px the grid drops to 2 columns. Every tile is a full button, so touch and keyboard reach the same profiles the mouse does.

**Names are not mapped.** See the comment above `TEAM`. 8 sitters, 11 people on the roster, and no way for anyone outside Toggle to tell which is which. Each tile shows its position in the studio photograph until someone fills in `name`, `role`, `practice` and `owns`.

## The book (the client rows)

Three horizontal rows scroll in alternating directions, one chip per account. Hover a row and it stops, so a moving name is still clickable. Click any name and a modal opens with that account's case. Arrow keys move between accounts inside the modal, Escape closes it.

The roster is the `BOOK` array in `sales-data.js`. Each entry either carries a `caseId` that pulls a published case out of `CASES`, or its own fields.

**The honesty rule this section runs on:** an entry gets a `line`, `stats` or `method` only where this repo documents it. Everything else falls through to a card that says there is no published result, because a client wall that implies a result for every name is the kind of thing a prospect checks. 9 of the 34 currently have a published result. Fill in a client's `CLIENT.md` and write the case into `brain/case-studies/`, and the card upgrades itself.

The four counters above the rows and the count in the headline are computed from `BOOK` at load, so adding or removing an account renumbers everything. Quantities render as numerals (34, not "thirty four") everywhere on both pages, because a digit stands out in a sentence and a spelled-out word does not.

**Logos.** There are none in this repo yet, so every chip renders the client name typographically. See `assets/logos/clients/README.md` for how to drop a real logo in, which is one field per client and no other change. Get permission before you add one.

## Editing content

- **Case studies and the roster:** `sales-data.js`. Every number traces to a file in `brain/case-studies/`. Edit the case file first, then this array. Nothing here is invented.
- **The constellation numbers** on `diagnosis.html` are the `STARS` array in the same file.
- **The honest-limits section** is hand-written HTML in `#limits` on both pages and mirrors `brain/case-studies/PROOF-GAPS.md`. When a proof gap closes, update all three.
- **Services and practices** on the profile come from `brain/services/` (twelve files) and `brain/team/roster.md` (three practices).
- **Engagement models** come from `brain/process.md`.

## Guards built in

- The improvement slider prints an on-screen warning above 50 percent, because a reduction that size comes from a structural change rather than from tuning an ad account.
- A close rate under five percent makes the page say the constraint sits after the click. That is deliberate and it is the most credible thing we can say in a first call.
- Prices appear nowhere. Quote from `brain/pricing/` after the call, anchored to the two nearest quotes in `archive/quotes/`.

## Known limits

- Desktop-first. Below 1040px the hero card fan becomes a swipeable row, the constellation stacks, and the profile's section nav hides. Verified with no horizontal overflow at 390px, 820px and 1512px.
- Print output is the full scroll, not paginated slides. The leave-behind is a document rather than a deck.
- `brain/team/bios/*.md` all carry `role: TBD`. The profile shows practice membership only, which is what `brain/team/roster.md` actually documents. Fill in the bios and the profile can name roles.
