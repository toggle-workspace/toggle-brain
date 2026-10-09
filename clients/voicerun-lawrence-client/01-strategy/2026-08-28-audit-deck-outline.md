---
client: voicerun
artifact: "VoiceRun - Paid Media Audit and Growth Plan (2026-08-28).pptx"
delivered: 2026-08-28
location: "Jordan's Desktop. Build script stays in the session scratchpad and is not committed."
audience: "Lawrence (Kuota), who forwards to VoiceRun. Written fully client facing."
slides: 33
data_sources:
  - clients/voicerun/01-strategy/2026-08-27-google-ads-audit-verified-data.md
  - clients/voicerun/01-strategy/2026-08-28-linkedin-and-ga4-verified-data.md
---

# VoiceRun audit deck: what shipped and why

## Revision, 29 August 2026

`VoiceRun - Paid Media Audit and Growth Plan (2026-08-28)-rev.pptx` supersedes the
original. Three changes, all requested by Jordan:

1. **Speaker notes removed.** pptxgenjs writes an empty notes part per slide even when
   no notes are added, so the build strips `ppt/notesSlides/`, `ppt/notesMasters/`, the
   content-type overrides and the slide relationships. Confirmed at zero notes parts and
   reopened in PowerPoint to check the file is still valid.
2. **LinkedIn ad codes dropped.** The `D1`, `D3`, `A2`, `A3`, `B1`, `B2` prefixes are
   LinkedIn's internal ad names from the export and mean nothing to a reader. Ads are now
   identified by headline everywhere, across 11 references on slides 14, 24, 25 and 32.
3. **Charts carry axis titles and legends.** Every chart names its category axis, its
   value axis and its unit. Legends appear on the seven charts where they add
   information. On the three single-series charts with per-point colors (slides 8, 11 and
   18) the legend only repeated the category axis labels, so it was left off and the axis
   titles carry the meaning instead.

Value axes that were hidden are now shown with three or four gridlines, per `CHARTS.md`.

### Second pass: name the actual evidence

The deck referred to ad groups, audiences and creative without showing what was in them,
which asked the reader to take each abstraction on trust. Every reference is now backed
by the verbatim item from the export. Two slides were added, taking the deck to 35.

| Slide | What it now shows |
|---|---|
| 6, Quality Score | The keywords sitting at Quality Score 1, named. Every competitor brand term is one of them |
| 8, competitor against generic | Both sides named. The three competitor terms that failed, and the three generic terms that worked |
| 9, structure | The headlines the six identical ads share, quoted |
| **14, new** | LinkedIn targeting as it was set, against the nine job titles that actually saw the ads |
| 15, LinkedIn creative | The body copy of the best performing ad, in full |
| 23, Google structure | The three proven expansion keywords, named |
| 24, Google messaging | Real headlines quoted rather than paraphrased |
| **25, new** | The Google ads word for word: the two that convert, and the six that share one script |
| 26, LinkedIn structure | The three job titles worth weighting toward, with their click rates |

One correction caught during the build: the six identical comparison ads spent **$120.39**
between them, not $170.06. The Alternatives ad group has its own copy and does not belong
in that group. The lint script now checks this sum, along with the 44.1% engineering title
share and the 5.0% share held by the two best clicking titles.

The deck the two verified data layers were built for. This file records the decisions so
the next version does not have to rediscover them.

## Decisions locked with Jordan

| Decision | Setting |
|---|---|
| Commercials | Budget allocation only. No fee slide. Toggle's fee handled with Lawrence separately. |
| Illustration | Toggle isometric motif. step-form on the cover, channel-stack on both section openers, loop-form on the closing. |
| Charts | Flat, not architectural, because an audit is data being read rather than announced. |
| Tracking scope | `demo_request`, `demo_call_start`, `demo_build`. LinkedIn Insight Tag, Customer Match and GA4 hygiene proceed. Server-side tagging and Consent Mode dropped. Meeting import, subdomains, pricing tier and CLI install are questions rather than commitments. |
| Currency | USD |

## Structure

| Slides | Section |
|---|---|
| 1 to 3 | Cover, scope and limits, executive summary |
| 4 | Section opener, the audit |
| 5 to 10 | Google Ads: the reframe, Quality Score, spend, competitor versus generic, structure and creative, auction insights |
| 11 to 14 | LinkedIn Ads: the CPM gap, video completion, audience delivery, creative and destination |
| 15 to 16 | The site: GA4 channel evidence, the uncounted signal |
| 17 to 18 | Two ICPs and two channels, then the $500 arithmetic |
| 19 | Section opener, the plan |
| 20 to 26 | Three levers and ninety days, phase 1, Google structure, Google messaging, LinkedIn structure, LinkedIn video angles, budget |
| 27 to 29 | Tracking: what is counted, what we set up, four questions |
| 30 to 32 | Reporting: cadence, a filled example, Keep Start Stop |
| 33 | Close |

## The five arguments the deck makes

1. **The headline numbers describe a paused campaign.** Campaign #1 took 85.6% of clicks
   for 23.2% of cost, so the account runs at $14.04 a click and 5.21% on intent traffic,
   not $2.63 and 9.13%.
2. **The landing page is the root cause on both platforms.** Below average on 69 of 73
   scored keywords, corroborated independently by GA4 showing paid traffic leaving in 11
   seconds.
3. **Each channel already reaches one of the two ICPs.** Google reaches developers,
   LinkedIn reaches operations leaders, and both currently chase both.
4. **133 product actions fire and none are counted.** `demo_call_start` and `demo_build`
   against 6 demo requests. This is the tracking argument.
5. **The accounts cannot reach a verdict at this budget.** More than nine months to the
   conversion volume automated bidding needs.

## Two things worth carrying into the next version

**The strikethrough sits on slide 21.** It strikes "Raise the budget" and rewrites it as
"Fix the destination first". The canon allows exactly one per artifact, and this one
qualifies because it declines a budget increase Toggle could bill on. Do not add another.

**The strongest creative finding is cross-channel.** The transparent pricing angle is the
top performer on Google and on LinkedIn independently. Two channels, two audiences, one
message. That belongs at the front of any creative brief that follows.

## Deliberate deviations from the design canon

| Deviation | Reason |
|---|---|
| Chart tags read `[ STAGE DIAGRAM, not to scale ]` and `[ MODELED, not actuals ]` with commas | `CHARTS.md` writes them with em dashes, which `brain/voice/writing-standards.md` never permits |
| Slide 10 is a table where a chart would sit | Auction insights discloses exact impression share for only two of seven domains. Bars for an undisclosed value would invent length, which the canon forbids |
| Slide 26 is a clustered platform chart rather than a six-segment stack | Six segments at that width cannot carry legible labels, and the table beside it holds every line |
| The closing uses `loop-form-PLACEHOLDER.svg` | The canonical loop-form still has to be traced from the Sunway artwork by a designer. The canon sanctions the placeholder until then, and it is disclosed in that slide's speaker notes |

## Verification that ran before delivery

- 33 slides, 33 notes pages, every slide carrying an update checklist.
- Every `srgbClr` value is one of the 17 legal hexes.
- Zero em dashes and zero double hyphens across slides and notes.
- Exactly one strikethrough, on slide 21.
- All 10 charts carry visible value labels.
- Arithmetic reconciled: intent plus paused equals $2,377.56, Google plus LinkedIn
  equals $3,479.45, both budget columns sum to their stated totals, and the Quality
  Score distribution sums to 73.
- PowerPoint PNG export read slide by slide for collisions. Note that the export
  duplicates the trailing word of wrapped text boxes, which is a rendering bug in
  PowerPoint and not present in the file. Confirmed against the slide XML.

## Known limitation on this machine

Inter Tight is not installed, so local PowerPoint substitutes a fallback and metrics
shift. Text boxes were sized with slack for this. Install Inter Tight free from Google
Fonts for local fidelity, or open the deck in Google Slides where it renders correctly.

---

## Audit-only cut, 6 September 2026

`VoiceRun - Paid Media Audit (2026-08-28).pptx` sits alongside the 35-slide original. It is
the deck to send VoiceRun if they ask to see the audit itself, without the commercial plan
riding along. 20 slides, derived from the original rather than rebuilt, so every chart and
table is the same object.

### What was cut

Slides 20 to 34, the entire plan section: the three levers, phase one, the Google and
LinkedIn change lists, the word-for-word ad copy slides, the budget split, the measurement
setup, the four questions, and the two example report slides. That material now lives in the
growth partnership proposal.

Slides 1 to 19 carry over untouched except for the edits below, and the original slide 35
becomes slide 20.

### What was edited

| Slide | Change |
|---|---|
| 1 | Title reads "Paid Media Audit" rather than "Paid Media Audit and Growth Plan" |
| 2 | "Recomputed from the raw account exports" becomes "recomputed from the data in the ad accounts". The what-we-read list says reports rather than exports, and the sources line credits the accounts and their reporting |
| 3 | Kicker becomes "Five findings, and what they point at". The right hand block is retitled "Where this points", and item 2's sub-line now reads "Google at the bottom of the funnel, LinkedIn at the top and middle" |
| 18 | The closing band carries the funnel roles: "Give Google the bottom of the funnel and the developer, and LinkedIn the top and middle and the operations leader" |
| 20 | Retitled "What this audit does not cover". Left panel is now the review's limits, right panel points at the proposal, contact updated to jordan@toggle.solutions |

### Why slides 3 and 18 changed

The original deck assigned one buyer per channel and stopped there. The 2 September call with
Lawrence set funnel roles on top of that: Google at the bottom of the funnel, LinkedIn at the
top and middle expanding to full funnel. The audit-only cut carries the same framing as the
proposal so the two documents cannot be read against each other.

### Build note

Driven through PowerPoint COM (`audit-only.ps1` in the session scratchpad) rather than
pptxgenjs, because reusing the original file preserves every chart, table and layout object.
Slides deleted highest index first. `TextRange.Replace` takes `(FindWhat, ReplaceWhat)`
positionally; passing `[Type]::Missing` for the optional arguments throws.

Verified: 20 slides, zero notes parts, zero em dashes, opens clean in PowerPoint. Slide 20's
left panel was trimmed from four bullets to three because the fourth overflowed the card.
