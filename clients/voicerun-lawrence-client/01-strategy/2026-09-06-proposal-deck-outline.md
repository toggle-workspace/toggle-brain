---
client: voicerun
artifact: "VoiceRun - Growth Partnership Proposal (2026-09-06) - rev1.pptx"
previous: "VoiceRun - Growth Partnership Proposal (2026-09-06).pptx"
delivered: 2026-09-06
location: "C:\\Users\\Jordan\\Desktop\\Voicerun (Lawrence Client)\\. Build script stays in the session scratchpad and is not committed."
audience: "The VoiceRun founder, routed through Lawrence (Kuota). Written fully client facing."
slides: 16
supersedes: none
companion: "VoiceRun - Paid Media Audit and Growth Plan (2026-08-28)-rev.pptx, which ships as a separate deck"
data_sources:
  - clients/voicerun/01-strategy/2026-08-27-google-ads-audit-verified-data.md
  - clients/voicerun/01-strategy/2026-08-28-linkedin-and-ga4-verified-data.md
  - "Granola: Kuota.ai x Toggle Client Discussion, 2 September 2026"
  - "WhatsApp from Lawrence, 3 September 2026 (two screenshots)"
---

# VoiceRun proposal deck: what shipped and why

## Why this deck exists

The 35-slide audit was written for Lawrence, who needed the findings to be trustworthy
before he sold them internally. Nineteen of its thirty five slides are account diagnosis.

The founder is a different reader. On WhatsApp Lawrence named four things the founder
wants: focus, scope and strategy; the value and services Toggle provides; how Toggle
interfaces with, reports to and learns from the business; and the dependencies. He also
set the scope hierarchy: performance marketing leads, SEO sits behind it, and he reads
the SEO audit himself before anything formal reaches the client.

So the audit became evidence rather than subject, and five slides that have no equivalent
in the audit deck carry the part Lawrence actually asked for.

## Where each ask lands

| The founder wants | Slides |
|---|---|
| Focus | 4, 5 |
| Scope | 6, 7 |
| Strategy | 7, 8, 9, 10, 11 |
| The value and services Toggle provides | 3, 6, 12 |
| How Toggle interfaces, reports and learns | 13, 14 |
| Dependencies | 15 |

## The channel framing was corrected against the call

The audit deck assigned one buyer per channel: Google to the developer, LinkedIn to the
operations leader. The 2 September call recorded something different, and the call is what
the deck now carries.

- **Google Search is bottom of funnel, conversion focused.** It takes whoever is already
  searching, which the account says is mostly developers (Code-First Builder at $14.82 an
  engagement against $52.37 in Pricing) plus generic pricing researchers who could be
  either buyer.
- **LinkedIn starts top and middle funnel, then expands to full funnel.** Operations
  leaders carry the weight and builders get their own ad set. Lead Gen Forms take the
  bottom of the funnel once the top and middle are working (revised in rev1, see below).
- **Bottom of funnel lead generation is named as achievable and conditional.** Slide 7
  states what it needs: a matched page, an offer worth the form, and creative built for
  that offer. Today every ad lands on a page rated Below average on 69 of 73 keywords.

## What is out of scope for this deck

The contract, the SOW, the quotation and the SEO audit. The only money on a slide is
VoiceRun's own $5,000 to $7,500 media budget, labeled as media spend with Toggle's fee
quoted separately.

## Decisions taken during the build

1. **Landing pages.** Toggle writes the brief, VoiceRun's engineers build the page. Stated
   on slide 6, carried into the dependencies on 15 and the week-one plan on 16.
2. **Client names on slide 12.** Mindvalley Labs, LTSE, and the Atlassian Marketplace
   partners CodeFortyNine, Communardo, Ricksoft, Yasoon, Catapult Labs and IJ-Solutions.
   Names only. `brain/case-studies/_index.md` carries a verified figure for Mindvalley
   Labs alone, so it is the only logo with a number attached.
3. **The audit is not appended.** It ships as its own deck. Slide 16 says so.
4. **Slide 11 is not a team roster.** Jordan asked for a value slide instead: founder led,
   one named lead who also runs the account, and the B2B software track record.

## Corrections caught during the build

- **"133 vs 6" was framed wrong on the first pass.** The 133 product actions and the 6
  demo requests are separate events, and neither reaches a bidding platform: demo_request
  is not a GA4 key event. Slide 9's title was rewritten from "133 actions fire, and 6 of
  them are counted" to "133 product actions fire, and no platform counts them".
- **$28.67 is cost per site visit, not cost per click.** Fixed on slide 7.
- **The Atlassian Marketplace analogue does not extend to pricing model.** Marketplace apps
  are priced per user and VoiceRun is priced per minute, so the band on slide 12 claims
  only the buyer and the channel.

## Design system compliance

- **Palette.** Thirteen hexes used, all inside the 17 legal proposal hexes in
  `clients/toggle/design-system/PROPOSAL-MASTER.md` section 0. Verified by reading
  `srgbClr` values out of every slide's XML.
- **Illustration.** One isometric composition in the whole deck: the filed `step-form.png`
  on the cover, placed and never redrawn, per `SIGNATURE-DEVICES.md` A2 and A3. The
  loop-form that canon wants on a closing slide is still a placeholder asset, so slide 16
  closes on the wordmark and seal instead of shipping a placeholder.
- **Strikethrough.** Exactly one in the artifact, on slide 5: "Raise the budget" struck,
  "Fix what a click costs first" written over it. A real category default, and one that
  costs Toggle money to say.
- **Prose.** Run against `brain/voice/writing-standards.md` and the stop-slop rules. Zero
  em dashes and zero double hyphens, verified by lint across all 16 slides.

## Build notes for the next version

- Built with pptxgenjs. The 38 empty notes parts pptxgenjs writes are stripped after the
  write, same as the audit deck.
- **Pass `rowH` as an array, never a number.** A scalar applies the body row height to the
  header too, which inflated the header and pushed the slide 8 and slide 9 tables into the
  panel and band below them.
- **Inter Tight is not installed on the Windows desktop.** The file names it anyway, which
  matches the audit deck. The consequence is that PowerPoint's `Export()` renderer
  duplicates words at wrap points in PNG previews. The XML is correct. Verify text by
  reading slide XML, not by exporting images.
- The lint script checks slide count, notes parts, illegal hexes, dashes, and every number
  on a slide against the two verified data files.

## Two lines Jordan should confirm before sending

1. **Slide 13, "Requests answered the same business day."** A service commitment written
   into the deck. Adjust it if the real standard is different.
2. **Slide 10, the day 90 commitments.** Under $10.00 a click on intent traffic, a tested
   account, and a stated cost per meeting. The weekly signal commitment came out in rev1.

---

## rev1, 6 September 2026

`VoiceRun - Growth Partnership Proposal (2026-09-06) - rev1.pptx` supersedes the original.
Same 16 slides. It folds in the ten edits Jordan made in PowerPoint plus five revisions he
asked for, so the build script and the sent file agree again.

### Jordan's edits, carried into the script

Cover date moved to 8 September. Slide 2 and slide 3 now say the numbers came from the ad
accounts. Slide 6 lost its landing page band. Slide 12 describes LTSE as cap table software.
Slide 15 asks for Editor access on GA4 and Search Console, reframes the history as what
worked and what did not, and drops the line naming Lawrence as the author of the targeting.
Slide 16 reads Co-Founder and jordan@toggle.solutions.

### The five revisions

1. **No more "raw files".** Slide 3's kicker, its first panel item and the equivalent line on
   slide 12 now say the data came from the ad accounts and their reporting. The underlying
   verification did not change, only how it is described.
2. **LinkedIn is no longer contradicted.** The deck said top and middle funnel in four places
   and then proposed Lead Gen Forms at the bottom. It now reads as a sequence: LinkedIn starts
   top and middle, and becomes full funnel once Lead Gen Forms and the content behind them are
   live. Changed on slides 2, 4 and 7, including the slide 7 pill and band.
3. **The two product events are gated on VoiceRun confirming them.** Lawrence cannot say what
   `demo_build` and `demo_call_start` track, so the deck no longer treats them as ready
   secondary conversions. Slide 9's stat cards say the definition is unconfirmed, its Secondary
   row and band make bidding conditional on confirmation plus a tracking check, slide 5's third
   lever asks for verification first, slide 10 adds event confirmation to the phase one work,
   slide 14 says the events join the bidding signal only after confirmation, and slide 15 adds
   "Confirm the product events" as a named ask on the engineers.
4. **Competitor campaigns are optimize-then-cut, and no competitor names in ad copy.** Slide 7
   now reads "Optimize competitor campaigns, or cut them", and states that Google policy keeps
   competitor names out of ad copy so the ads lead on why VoiceRun is the better option. Slide 8
   dropped "named competitor copy first" for "differentiation led copy that stays inside Google
   policy". Slide 11 adds a panel item saying the 15% competitor line is provisional and moves
   to developer intent if it does not pay.
5. **The weekly signal commitment is gone.** Slide 10's day 90 card is now "A tested account:
   three ads live in every ad group, with a named winner per intent cluster." Fully inside
   Toggle's control, and it answers the "nothing is being tested" finding directly. The phase
   two exit changed to match.

### Build note

Two patch scripts with asserting replacements (`patch-rev1.js`, 25 pairs, and
`patch-rev1b.js`, 10 geometry pairs) rather than hand edits, so any drift between the sent
file and the script fails loudly instead of silently. Slide 7's rows grew to 0.7in and slide
15's columns to 3.12in to hold the longer copy. Band text stays to one line, since a band is
a single 0.34in strip.
