---
client: voicerun
platform: google-ads
audit_date: 2026-08-27
last_updated: 2026-08-27
data_window: "2026-07-15 to 2026-08-27 (44 days)"
currency: USD
auditor: Toggle Solutions
access_level: Report exports and account screenshots. No live account access.
status: internal working layer, not client facing
completeness: "Google Ads complete. LinkedIn Ads pending, so the full paid audit is roughly 50 percent done."
sources:
  - "[Voicerun.ai] Observation and Insights into Ad Account.pdf (internal first pass, includes Lawrence's brief and five embedded account screenshots)"
  - "Voice Run Responsive Search Ads Performance.xlsx (10 ad rows plus totals)"
  - "Voicerun Search Keywords Data.xlsx (96 keyword rows, includes Quality Score components)"
  - "Voicerun Search terms report.xlsx (2,547 search term rows plus 4 total rows)"
  - "Account interface screenshots extracted from the PDF: campaign table, campaign impression share, ad group table, ad group impression share, auction insights (Jul 15 to Aug 27 2026)"
---

# VoiceRun Google Ads: verified data layer

## Purpose of this file

This is the arithmetic behind the client facing audit, not the audit itself. Every
number was recomputed from the three Excel exports and read off the five account
screenshots, rather than copied from the internal observation deck. The deck stays
internal, so where it differs from the account the difference is recorded here as a
position the client facing audit needs to take, not as an edit to the deck.

## Which denominator to use

Three sources report account impressions differently, so fix this before anyone
quotes a CTR.

| Source | Cost | Clicks | Impressions | CTR |
|---|---|---|---|---|
| Campaign table in the interface (authoritative) | $2,377.56 | 903 | 9,890 | 9.13% |
| Keyword and ad level export rows summed | $2,377.56 | 903 | 9,922 | 9.10% |
| Search terms export total row | $2,377.56 | 903 | 9,931 | 9.09% |

Cost and clicks reconcile exactly across all three. Use the interface figures,
9,890 impressions and 9.13 percent CTR, since that is what anyone opening the account
will see.

**Data limitation to state openly in the audit.** Google withholds the search term
for $887.85 of spend, which is 37.3 percent of the total, along with 24 of the 61
secondary conversions. Any claim about search term quality covers 62.7 percent of the
money at most.

## The single most important reframe

The account looks healthier than it is because one paused campaign supplies most of
the clicks and almost none of the cost.

| Campaign | Cost | Share of cost | Clicks | Share of clicks | Impressions | CTR | Avg CPC | Secondary conversions |
|---|---|---|---|---|---|---|---|---|
| VoiceRun - Bundled Tool | $1,217.36 | 51.2% | 64 | 7.1% | 916 | 6.99% | $19.02 | 20 |
| VoiceRun - Code-First Builder | $607.59 | 25.6% | 66 | 7.3% | 1,580 | 4.18% | $9.21 | 41 |
| Campaign #1 (paused) | $552.61 | 23.2% | 773 | 85.6% | 7,394 | 10.45% | $0.71 | 0 |
| Account total | $2,377.56 | 100% | 903 | 100% | 9,890 | 9.13% | $2.63 | 61 |

Strip out Campaign #1 and the intent traffic reads as follows: $1,824.95 spent, 130
clicks, 2,496 impressions, a CTR of 5.21 percent and an average CPC of $14.04.

So the account is not running at 9.13 percent CTR and $2.63 CPC. On the traffic that
could ever produce an enterprise meeting it is running at 5.21 percent CTR and $14.04
CPC, and it has produced 130 clicks in 44 days.

## Ad group table as the interface shows it

| Ad group | Campaign | Status | Max CPC | Cost | Clicks | Impr | CTR | Avg CPC | Secondary conv | Click share | Search IS | Lost IS (rank) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pricing | Bundled Tool | Eligible | $25 | $1,047.30 | 55 | 527 | 10.44% | $19.04 | 20 | 14.28% | 18.67% | 5.18% |
| Code-First Builder | Code-First Builder | Eligible | $10 | $607.59 | 66 | 1,580 | 4.18% | $9.21 | 41 | 20.57% | 14.65% | 49.43% |
| Ad group 1 | Campaign #1 | Not eligible, campaign paused | n/a | $552.61 | 773 | 7,394 | 10.45% | $0.71 | 0 | under 10% | 10.05% | 12.64% |
| Head-to-Head | Bundled Tool | Paused | $25 | $73.02 | 3 | 32 | 9.38% | $24.34 | 0 | under 10% | 16.48% | 4.40% |
| Alternatives | Bundled Tool | Paused | $25 | $49.67 | 2 | 182 | 1.10% | $24.83 | 0 | 15.96% | 10.27% | 20.98% |
| Retell | Bundled Tool | Eligible | $12 | $35.46 | 3 | 38 | 7.89% | $11.82 | 0 | 13.96% | 23.85% | 22.31% |
| Bland | Bundled Tool | Eligible | $12 | $11.91 | 1 | 18 | 5.56% | $11.91 | 0 | 12.78% | under 10% | 37.04% |
| Vapi | Bundled Tool | Eligible | $12 | $0.00 | 0 | 116 | 0.00% | n/a | 0 | n/a | 11.22% | 22.95% |
| Synthflow | Bundled Tool | Eligible | $12 | $0.00 | 0 | 3 | 0.00% | n/a | 0 | n/a | under 10% | 43.32% |

Two ad groups carry 69.6 percent of all spend and produce all 61 secondary
conversions. Six ad groups produced none.

## Finding 1: landing page experience is the root cause, and it is nearly universal

Of the 96 keyword rows, 73 carry Quality Score components. The landing page
experience column reads Below average on 69 of those 73 and Average on the remaining
four. Not one keyword in the account scores Above average on landing page experience.

| Component | Below average | Average | Above average |
|---|---|---|---|
| Landing page experience | 69 | 4 | 0 |
| Ad relevance | 51 | 12 | 10 |
| Expected CTR | 45 | 9 | 19 |

Quality Score distribution across the 73 scored keywords: 25 keywords at 1, nine at
2, 16 at 3, two at 4, 19 at 5, one at 6 and one at 7. That puts 50 of 73 keywords,
or 68.5 percent, at a Quality Score of 3 or below. Thirty four of the 96 rows carry
the status reason "low quality" and nine carry "below first page bid".

This one finding explains both symptoms separately. A Quality Score of 1 against a
$25 maximum CPC is what produces $19 to $25 clicks, and a landing page Google rates
Below average is what produces zero demo requests. The expensive clicks and the
missing conversions are the same problem measured twice.

Campaign settings are genuinely clean, which is worth saying. The destination is not,
and the two verdicts have to be separated so the good news does not read as a clean
bill of health for the account.

## Finding 2: zero primary conversions, and the easy explanations are already ruled out

The primary conversion action across all campaigns is Submit Lead Form (Demo Request
Web), implemented through a Google tag with data driven attribution. It recorded 0
across the full 44 days and $2,377.56. Jordan tested the demo request form by hand on
27 August 2026 and found it straightforward and working.

That matters, because it removes the two comfortable explanations. Tracking is not
broken, and the form is not broken. The 130 intent clicks that arrived did not ask for
a demo.

One footnote on attribution. Data driven attribution needs conversion volume to model
anything, and the primary action has none, so the setting is harmless today and does
nothing. It is not a finding, and it should not be presented as one.

The 61 all conversions are secondary actions, and they split as follows.

| Ad group | Cost | Secondary conversions | Composition | Cost per secondary conversion |
|---|---|---|---|---|
| Bundled Tool / Pricing | $1,047.30 | 20 | 20 Viewed Pricing Page | $52.37 |
| Code-First Builder | $607.59 | 41 | 1 Viewed Pricing Page, 40 Viewed Platform Page | $14.82 |
| Everything else | $722.67 | 0 | none | n/a |

The developer facing ad group produces engagement at 3.5 times the efficiency of the
competitor pricing ad group, on 42 percent less spend. This matters for the proposal
because ICP 2, developers and technical leaders, is the audience actually responding,
while 51.2 percent of the budget chases ICP 1 through competitor comparison keywords.

## Finding 3: competitor brand keywords cost twice as much per engagement as generic ones

The Pricing ad group alone consumed $1,047.30, which is 44.0 percent of all account
spend. Splitting it by keyword type:

| Keyword type | Cost | Share of account | Secondary conversions | Cost per secondary conversion |
|---|---|---|---|---|
| Competitor brand pricing (elevenlabs, retell, vapi, synthflow, bland) | $706.62 | 29.7% | 10 | $70.66 |
| Generic pricing (voice ai pricing, voice ai cost, ai voice agent pricing, voice agent pricing) | $340.68 | 14.3% | 10 | $34.07 |

Same number of engagements from half the money. The recommendation to expand into
generic keyword groups now carries a specific multiple rather than a hunch.

Individual competitor keyword costs worth quoting: `[elevenlabs agents pricing]` at
$212.78 for 11 clicks and zero secondary conversions, `"retell ai pricing"` at
$195.15 for nine clicks, `[retell ai cost]` at $90.07 for four clicks and zero
secondary conversions. The single most expensive search term in the account is
"how much does eleven labs cost" at $49.52 for two clicks, a $24.76 CPC.

## Finding 4: the auction they are winning is the wrong auction

This is the finding the internal deck got backwards, and it is the most important new
one. Auction insights for 15 July to 27 August 2026, account level, lists seven
domains.

| Display URL domain | Impression share | Overlap rate | Position above rate | Top of page rate | Abs top of page rate | Outranking share |
|---|---|---|---|---|---|---|
| elevenlabs.io | 19.28% | 21.58% | 60.06% | 92.61% | 49.19% | 9.38% |
| **You (VoiceRun)** | **10.77%** | n/a | n/a | **63.84%** | **27.82%** | n/a |
| typecast.ai | under 10% | 15.07% | 41.86% | 75.31% | 7.22% | 10.09% |
| naturalreaders.com | under 10% | 20.63% | 35.92% | 72.22% | 18.22% | 9.97% |
| fish.audio | under 10% | 8.32% | 59.31% | 94.45% | 77.19% | 10.24% |
| speechify.com | under 10% | 9.68% | 58.54% | 74.93% | 23.93% | 10.16% |
| adobe.com | under 10% | 12.96% | 83.70% | 75.46% | 48.98% | 9.60% |

Read the domain list, not the ranking. Typecast, NaturalReaders, Fish Audio,
Speechify and Adobe are consumer and prosumer text to speech and voiceover tools.
ElevenLabs is the only name in the list that VoiceRun would recognize as a
competitor, and even then on the consumer side of its business.

Vapi, Retell, Bland, Synthflow, LiveKit, Sierra and PolyAI appear nowhere, because
the Bundled Tool campaign generated only 916 impressions across the whole window,
which is too little volume for any of them to surface.

So second place on impression share is second place in the consumer text to speech
auction, which Campaign #1 entered with 7,394 impressions, being 74.8 percent of all
account impressions. Reading that as "good sign of ad visibility" would tell VoiceRun
they are visible to enterprise buyers when the data says they were visible to people
looking for a free voice generator.

Two supporting numbers. ElevenLabs appeared above VoiceRun in 60.06 percent of shared
auctions and Adobe in 83.70 percent, so VoiceRun is outranked more often than not.
VoiceRun's top of page rate of 63.84 percent is the lowest of the seven, and its
absolute top of page rate of 27.82 percent ranks fifth of seven, so it should not be
described as decent.

## Finding 5: budget is the stated constraint, yet the account spends a fifth of what is available

Daily budgets: Bundled Tool $24, Code-First Builder $25, Campaign #1 $20 and now
paused. Enabled daily budget is therefore $49, or roughly $1,470 a month. Actual pace
across the window was $54.04 a day.

Impression share as the interface reports it for the same window:

| Campaign | Search impression share | Lost IS (rank) | Lost IS (budget) |
|---|---|---|---|
| VoiceRun - Bundled Tool | 13.31% | 16.91% | 69.79% |
| VoiceRun - Code-First Builder | 14.65% | 49.43% | 35.92% |
| Campaign #1 | 10.05% | 12.64% | 77.31% |
| Account total | 10.85% | 17.20% | 71.95% |

The internal deck quotes 11.64 percent average impression share, 30.46 percent lost
to rank and 57.91 percent lost to budget. Those came from a different date range,
almost certainly the default last 30 days rather than this custom window. Use the
Total row above. Do not use an average of the three campaigns either, weighted or
otherwise: unweighted averaging treats Campaign #1 as one third of the account when it
carries 7,394 of the 9,890 impressions, and Google already computes the correctly
weighted account figure.

The correction is not cosmetic. Budget loss at account level is 71.95 percent rather
than 57.91 percent, and rank loss is 17.20 percent rather than 30.46 percent. So the
account level constraint is budget more than bidding, which strengthens the
self-throttling argument. The rank problem is real and it lives inside one campaign,
Code-First Builder at 49.43 percent, which is where the Quality Score argument
belongs.

The pattern the deck identified does hold, and the corrected numbers make it sharper.
The competitor campaign loses 69.79 percent of its impression share to budget, and
the developer campaign loses 49.43 percent to rank. Different problems, different
fixes. The competitor campaign is starved. The developer campaign is outbid, which
loops back to Quality Score.

Lawrence's stated envelope is $5,000 to $7,500 a month across all channels, and
current spend is described as under $10,000 a month. So the account is throttling
itself at roughly 20 to 29 percent of the budget it has, then reporting budget as its
largest source of lost impression share. Raising budget before fixing Quality Score
buys more $19 clicks, which is why sequencing belongs in the proposal.

## Finding 6: creative is one ad per ad group, and six of them are the same ad

The account holds 10 responsive search ads across nine ad groups. The Head-to-Head ad
group holds two, everything else holds one.

Ad strength: Poor on six, Average on two, Good on two. Every ad carries the
recommendations "Try including more keywords in your headlines" and "Try including
more keywords in your descriptions".

Inside the Bundled Tool campaign, eight ads run across seven ad groups, and six of
those eight are identical. The Bland, Retell, Vapi, Synthflow and both Head-to-Head
ads share the same 15 headlines and the same four descriptions, opening with "See The
Full Comparison" and "Compare Them Side By Side". Each of those ad groups points at a
different competitor comparison URL, so the landing pages are specific while the copy
that sells the click is generic. A person searching "vapi alternative" sees no mention
of Vapi.

The two ads with their own copy, Pricing and Code-First Builder, are also the only two
rated Good and the only two producing secondary conversions. That correlation is the
argument for the creative workstream.

Campaign #1's ad is the weakest asset in the account: five headlines, two
descriptions, Ad strength Poor, and one of its two descriptions contains an em dash,
which Google renders as written.

## Finding 7: the Alternatives ad group cannibalizes every brand ad group

Eighteen keywords sit in two ad groups at once, all inside the Bundled Tool campaign.
The Alternatives ad group duplicates keywords held by the Vapi, Retell, Bland and
Synthflow ad groups, and the Vapi ad group duplicates keywords held by Head-to-Head.

The clearest case is the phrase keyword `"vapi alternative"`, which sits in both
Alternatives and Vapi, carries a Quality Score of 1 in both, and produced 158
impressions and zero clicks between them. `"retell ai alternative"` sits in both
Alternatives and Retell and spent $24.97 and $35.46 respectively, so the account paid
twice to reach the same query. `"bland ai alternative"`, `"vapi vs retell"` and
`[vapi vs livekit]` show the same pattern.

Zero clicks on 158 impressions of a query as intent-heavy as "vapi alternative" is a
message match failure, not a bid failure.

## Finding 8: Campaign #1 bought consumer text to speech traffic, not enterprise buyers

Campaign #1 ran 25 broad match keywords such as `voice ai`, `text to audio`,
`type to voice` and `free ai text to speech`. It is paused now, so this is a
historical finding, and it is the cleanest illustration of what broad match does to
this account. It is also the direct cause of the wrong-auction problem in Finding 4.

Traced search terms inside it total $468.08 across 347 terms. What the money bought:
"text to speech" at $36.34 and $29.67 across two keywords, "elevenlabs" at $22.91 for
35 clicks plus a further $9.05, $4.58 and $3.59 on brand variants, "speechma" at
$13.33, "fish audio" across four rows, "kits ai", "voicemod", "voice changer", "sound
of text", "bruce buffer ai voice generator free" and "tetyys com sapi4".

Fifty nine search terms containing the word "free" cost $69.33 across 75 clicks.
Non-English queries were served despite English-only language targeting, including
"texto a voz", "voz ia", "generador de voz ia", "texto a voz ia gratis",
"текст в ии голос" and "صوت ai". The Arabic query took a click at $9.88 and produced a
secondary conversion.

Campaign #1 delivered 85.6 percent of the account's clicks and 0 of its 61 secondary
conversions. It is the reason the blended CTR looks good and the reason the auction
insights list reads like a consumer voiceover market.

## Finding 9: no search term was excluded as a negative during the window

The Added or Excluded column across 2,547 search term rows reads Added on 73 rows and
None on 2,474. Zero rows read Excluded. The 73 Added rows are search terms matching
keywords already in the account, so they are not additions made during the window.

Negative keyword lists do exist at campaign level. What did not happen is any pruning
from the observed data across six weeks. The consumer text to speech queries in
Campaign #1 were visible the whole time and none were blocked.

## Finding 10: the account cannot reach a verdict at this budget

This is the finding that should drive the proposal, and it is arithmetic rather than
opinion. Lawrence has confirmed the $500 per meeting ceiling is real, so it can be
used as a hard constraint.

At the intent CPC of $14.04, the account needs a click to meeting rate of 2.81 percent
to hit that ceiling. It has delivered 130 intent clicks and zero meetings. If the true
rate were exactly 2.81 percent, you would expect about 3.7 meetings from 130 clicks,
and seeing zero carries roughly a 2.5 percent likelihood. With tracking confirmed
working and the form confirmed usable, the evidence points at the page, the offer or
the traffic quality rather than at a measurement fault. The 130 click sample is still
thin and should be described that way.

The forward problem is worse than the backward one. At $49 a day and $14.04 a click,
the account generates about 3.5 intent clicks a day, or 105 a month. Smart bidding
wants somewhere near 30 conversions in 30 days. At a 3 percent conversion rate that
needs roughly 1,000 clicks, or about $14,000 of intent traffic. At the current pace
that is more than nine months away.

Three levers change that arithmetic and the proposal should price all three: cut CPC
by fixing landing page experience and Quality Score, raise the conversion rate by
fixing the page and the offer, or lower the conversion threshold by promoting a
genuine mid-funnel action to primary. Budget alone does not fix it.

## Positions the client facing audit must take

The observation deck stays internal. These are the seven places where the client
facing version has to say something different from the internal first pass, and the
reason for each.

1. **Lead with intent traffic, not the blend.** The 9.13 percent CTR and $2.63 CPC
   describe an account dominated by paused consumer traffic. Lead with 5.21 percent
   and $14.04, then show the blend as context. Anyone who opens the account will see
   this within a minute, so we should be the ones to point it out.

2. **Separate the settings verdict from the account verdict.** Campaign settings are
   clean and worth crediting. Landing page experience is Below average on 69 of 73
   scored keywords. Both statements are true and they cannot sit in the same sentence.

3. **Do not recommend Maximize conversions as the next step.** It needs conversion
   volume and the primary action has zero. The honest sequence is to hold Manual CPC
   with tighter caps, promote a real mid-funnel action to primary so a signal exists,
   accumulate 15 to 30 conversions a month, then move to Maximize conversions or a
   target CPA. Right destination, missing middle.

4. **Reverse the auction insights read.** Second place on impression share is second
   place among Typecast, NaturalReaders, Fish Audio, Speechify and Adobe. That is
   evidence of competing in the wrong market, not evidence of enterprise visibility.
   VoiceRun also has the lowest top of page rate of the seven domains, so the
   "decent absolute top of page rate" line has to go.

5. **Fix the language targeting framing.** English-only targeting is correct for an
   English site. The real issue is that Spanish, Russian and Arabic queries were
   served anyway, which is a match type and negative keyword problem. Framed as a
   language settings problem it reads as advice to add languages.

6. **Demote the age exclusions to housekeeping.** Excluding 18-24 and 65+ on Search
   moves little, because most search impressions fall into the Unknown demographic
   bucket, and it carries a small risk of cutting the developers who are ICP 2. Keep
   the action, drop it out of the improvement areas, and keep Unknown included.

7. **Sequence the Canada expansion after the fixes.** With 71.95 percent of account
   impression share already lost to budget at $49 a day, widening geography spreads
   the same money thinner.

## Gap register

Resolved as of 27 August 2026:

- **Demo request form.** Tested by hand, straightforward and working. Not a cause of
  the zero conversions.
- **Conversion setup.** Google tag implementation, data driven attribution, Google's
  own recommendation. No finding here, and no benefit either until conversions exist.
- **Auction insights.** Extracted from the deck screenshot, covering the same 15 July
  to 27 August window. See Finding 4.
- **CPA ceiling.** $500 per meeting confirmed by Lawrence as a real ceiling, so it can
  carry weight in the proposal.

Resolved as of 28 August 2026:

- **LinkedIn Ads.** Received. See `2026-08-28-linkedin-and-ga4-verified-data.md`.
- **GA4.** Received as screenshots. GA4 independently corroborates Finding 1: Paid
  Search runs a 35.82 percent engagement rate against a 54.32 percent site average, at
  11 seconds a session. Two systems, same verdict on the landing page.
- **Zero conversions, qualified.** GA4 recorded 6 `demo_request` events from 4 users in
  the same window. So the correct claim is "no demo requests attributable to paid
  media", not "no demo requests". Revise Finding 2 and Finding 10 wording before
  publishing.

Still open:

- **Reconciling the 4 demo requests.** Either none came from paid, or the GA4 event
  does not reach Google Ads because it is not marked as a key event. Resolve before
  quoting either number.
- **Search Console.** Not requested yet. Worth having, because the organic query set
  will show whether the informational demand VoiceRun is paying for is already
  reachable for free.
- **Impression share discrepancy.** Resolved. The deck's 11.64 / 30.46 / 57.91 set
  came from a different date range, most likely the default last 30 days rather than
  the 15 July to 27 August custom range. Confirmed by Jordan on 27 August 2026. Use
  Google's Total row, 10.85 / 17.20 / 71.95, and never an average of the three
  campaigns, since unweighted averaging treats Campaign #1 as one third of the account
  when it carries 7,394 of 9,890 impressions.
- **Sales reality.** Pipeline volume, what a qualified meeting is worth, and sales
  cycle length. The $500 ceiling is confirmed, the economics behind it are not.
- **Which product the media should sell.** The account sells the platform. VoiceScore
  is a different buyer with a different funnel, and Lawrence has not said which leads.

## Numbers safe to quote

| Figure | Value |
|---|---|
| Window | 15 July to 27 August 2026, 44 days |
| Total spend | $2,377.56 |
| Total clicks | 903 |
| Total impressions | 9,890 |
| Blended CTR | 9.13% |
| Blended CPC | $2.63 |
| Intent-only spend | $1,824.95 |
| Intent-only clicks | 130 |
| Intent-only impressions | 2,496 |
| Intent-only CTR | 5.21% |
| Intent-only CPC | $14.04 |
| Primary conversions (demo requests) | 0 |
| Secondary conversions | 61 (20 pricing page, 41 pricing and platform page) |
| Spend with no visible search term | $887.85 (37.3%) |
| Keywords at Quality Score 3 or below | 50 of 73 scored |
| Keywords with Below average landing page experience | 69 of 73 scored |
| Responsive search ads in the account | 10 across 9 ad groups |
| Identical ads inside Bundled Tool | 6 of 8 |
| Duplicated keywords across ad groups | 18 |
| Enabled daily budget | $49 |
| Account search impression share | 10.85% |
| Lost IS (rank) | 17.20% |
| Lost IS (budget) | 71.95% |
| VoiceRun impression share in auction insights | 10.77%, second of seven domains |
| VoiceRun top of page rate | 63.84%, lowest of seven domains |
| Stated CPA ceiling | $500 per meeting, confirmed by Lawrence |
| Break-even click to meeting rate at $14.04 CPC | 2.81% |
