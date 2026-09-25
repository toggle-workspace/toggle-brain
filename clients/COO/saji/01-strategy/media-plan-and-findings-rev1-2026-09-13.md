# Saji x Bulan Bintang, RaRa 2027: media plan, model and findings (rev1)

Prepared for COO, 13 September 2026. This document carries the working behind
`Saji x Bulan Bintang - Digital Advertising Proposal - rev1 (2026-09-13).pptx`. Every figure in the
deck can be reconciled from here.

**What changed from rev0.** The first version argued that the client's briefed mechanic was the
problem and recommended replacing it with weighted entries, where one purchase qualified and both
brands earned five entries. Toggle met internally on 14 September and took a different position.
The mechanic stays exactly as the client wrote it, RM25 of Saji plus RM150 of Bulan Bintang across
two receipts, and the friction is removed by changing where the shopper stands when she buys. The
media model is also re-costed at a conservative RM18 per entry instead of RM9. The rev0 document
sits alongside this one at `media-plan-and-findings-2026-09-13.md` as the record of the earlier
position.

---

## 1. The diagnosis

Contest entries have fallen five years running while media output climbed.

| Year | Impressions | Views | Reach | Engagement | Entries | Entries per 1M reached |
|---|---|---|---|---|---|---|
| 2022 | 15.06M | 3.40M | 4.46M | 0.94M | 11,834 | 2,653 |
| 2023 | 40.03M | 13.81M | 15.61M | 17.35M | 8,464 | 542 |
| 2024 | 50.40M | 10.43M | 15.66M | 6.85M | 7,576 | 484 |
| 2025 | 51.60M | 11.21M | 20.12M | 1.88M | 4,179 | 208 |
| 2026 | 51.00M | 38.82M | 13.80M | 0.04M | 3,765 | 273 |

Source: RARA 2025 deck (per platform actuals and the weekly entry table) and RARA 2026 deck (the
2022 to 2026 series).

In 2026 the campaign delivered 3.5 times the video views of 2025 and posted the lowest entry count
on record. Media was bought against impressions, and impressions is what it returned. Entries were
never the optimization target, because entries arrived by WhatsApp receipt photo, which neither Meta
nor TikTok can see.

**The 2027 tension.** The brief asks for roughly 6% more entries than 2026 while raising the cost of
entry from RM25 in one receipt to RM175 across two brands and two receipts. Every year of this
contest before 2027 asked the shopper to buy from one brand. That is the single fact this revision
is built around, and it is why the cost per entry in section 2 doubles.

---

## 2. The rate card, and what is actually known

### Derived from the 2025 deck (hard)

2025 per platform delivery, the only per platform data either past deck contains:

| Platform | Impressions | Reach | Views | Clicks | Frequency | View rate | CTR |
|---|---|---|---|---|---|---|---|
| Google | 13,171,108 | not reported | 1,644,866 | 34,898 | n/a | 12.5% | 0.26% |
| Meta | 26,373,035 | 14,170,818 | 2,310,408 | 34,400 | 1.86 | 8.8% | 0.13% |
| TikTok | 11,523,177 | 5,957,220 | 7,258,989 | 1,224,367 | 1.93 | 63.0% | 10.6% |

These sum to 51.07M impressions and 11.21M views, matching the reported 2025 totals, and Meta plus
TikTok reach sums to 20.13M against the reported 20.12M. The client sums platform reach without
de-duplicating, so this plan does the same and says so.

### Assumed (in no document)

**Every CPM and both CPCs.** Neither past deck contains a single spend figure, so no CPM is
calculable from them. These are planning estimates for Malaysian auction prices with festive
inflation applied. The rate card is unchanged from rev0.

| Line | Platform | Objective | CPM | Freq | Per 1,000 reached | View rate | Per view / CPC |
|---|---|---|---|---|---|---|---|
| Contest | Meta | Conversions | RM22.00 | 1.8 | n/a | n/a | CPC RM0.45 |
| Contest | TikTok | Conversions | RM15.00 | 1.8 | n/a | n/a | CPC RM0.30 |
| Video | TikTok | Video views | RM2.20 | 1.9 | RM4.18 | 70% | RM0.0031 |
| Video | Meta | Reels video | RM3.50 | 1.8 | RM6.30 | 55% | RM0.0064 |
| Video | YouTube | In-stream and Shorts | RM3.80 | 1.7 | RM6.46 | 32% | RM0.0119 |
| Engage | TikTok | Spark Ads on KOL | RM2.60 | 1.8 | RM4.68 | 65% | RM0.0040 |

Meta's observed 8.8% view rate in 2025 reflects a mostly static reach buy, so the 55% Reels figure
is a different buy rather than a contradiction.

**The single question that fixes this column:** what did the 2026 campaign spend on digital, by
platform. One answer turns most of these assumptions into facts.

### Entry conversion, and why RM18

In 2025, Meta delivered 34,400 link clicks against 4,179 total entries, so **12.1% is the ceiling**
if Meta carried the digital route. Counting TikTok's 1,224,367 clicks drops it to **0.33%**, but
TikTok counts taps that are not link clicks. The band is that wide because there has never been a
landing page to measure against.

**rev0 planned on 4.0%. This revision plans on 2.0%, which is RM18 per entry.** The reason is the
mechanic. rev0's 4.0% belonged to a proposal where one purchase qualified. This proposal keeps the
client's two-purchase, two-receipt requirement, and 2027 is the first year of this contest to ask
for that. There is no Saji data point for a two-receipt entry rate, and none of the five Malaysian
benchmarks in section 4 required two receipts either, so there is nothing to borrow. Halving the
rate is a safety margin rather than a forecast.

Both budget options in section 3 buy the same 200,000 contest sessions, so entries turn on
conversion alone.

| Landing page conversion | Entries | Cost per entry, contest line | Read |
|---|---|---|---|
| 1.5% | 3,000 | RM24.00 | Deeper friction than we have planned for |
| **2.0%** | **4,000** | **RM18.00** | **What the plan is built on** |
| 3.0% | 6,000 | RM12.00 | If the pop-up does its job |
| 4.0% | 8,000 | RM9.00 | The single brand rate, which is not what 2027 asks for |

The pop-up in section 4 is what should pull the real number above 2.0%. We have not credited it in
the forecast, because it depends on a partner agreement that has not been given yet.

### The view definition problem

2026 reported 38.82M views against 51M impressions, a **76% view rate**. No paid buy across Meta,
TikTok and YouTube reaches 76%. That number almost certainly includes KOL and organic views from the
50 influencers and the dance challenge.

40M **paid** views on TikTok alone would cost about RM124,000 at RM0.0031 per view, before the
contest engine exists. This plan therefore treats 40M as a campaign wide target that the paid buy
contributes toward, and flags the assumption.

---

## 3. The two budget options

### Why the contest line grew

At RM9 per entry, 4,000 entries cost RM36,000 and the contest line comfortably fit inside RM45,000.
At RM18 it costs **RM72,000**, and that number is fixed in both options below. Everything else is
what is left over.

**On the RM90,000 discussed on 11 September.** Priced at RM18 an entry, RM90,000 returns 2,083
entries against a 4,000 target and 11.4M reach against a 15M target, so it clears neither. It is not
presented as an option in the rev1 deck for that reason. The number was right for the rev0 mechanic
and is not right for this one.

### Option 1: RM135,000 (recommended)

Google gets RM12,000, Meta and TikTok share RM123,000. The split is 53% contest, 40% video and
reach, 7% engagement.

| Line | Spend | Delivers |
|---|---|---|
| Contest, Meta | RM36,000 | 80,000 sessions, 1.64M impressions, 0.91M reach |
| Contest, TikTok | RM36,000 | 120,000 sessions, 2.40M impressions, 1.33M reach |
| Video, TikTok | RM30,000 | 9.55M views, 7.18M reach, 13.64M impressions |
| Video, Meta | RM12,000 | 1.89M views, 1.90M reach, 3.43M impressions |
| Engagement, TikTok Spark | RM9,000 | 2.25M views, 1.92M reach, 3.46M impressions |
| YouTube | RM12,000 | 1.01M views, 1.86M reach, 3.16M impressions |

**Totals:** 200,000 sessions, **4,000 entries** at 2.0%, **14.69M paid views**, **15.10M paid
reach**, 27.72M impressions. Blended CPM RM4.87. Cost per entry RM18.00 against the contest line,
RM33.75 against the full budget.

**Verdict:** hits the entry target exactly, with no cushion. Clears the 15M reach KPI by 0.7%, which
is also no cushion. Paid views fall to 14.69M from the 20.07M that the same RM135,000 produced under
the rev0 model, so KOL and organic have to carry more of the 40M views target than they did in 2026.

### Option 2: RM160,000

The same RM72,000 contest line, with RM25,000 more behind video and reach. The split is 45% contest,
47% video and reach, 8% engagement.

| Line | Spend | Delivers |
|---|---|---|
| Contest, Meta | RM36,000 | 80,000 sessions, 1.64M impressions, 0.91M reach |
| Contest, TikTok | RM36,000 | 120,000 sessions, 2.40M impressions, 1.33M reach |
| Video, TikTok | RM40,000 | 12.73M views, 9.57M reach, 18.18M impressions |
| Video, Meta | RM18,000 | 2.83M views, 2.86M reach, 5.14M impressions |
| Engagement, TikTok Spark | RM12,000 | 3.00M views, 2.56M reach, 4.62M impressions |
| YouTube | RM18,000 | 1.52M views, 2.79M reach, 4.74M impressions |

**Totals:** 200,000 sessions, **4,000 entries** at 2.0%, **20.07M paid views**, **20.02M paid
reach**, 36.71M impressions. Blended CPM RM4.36. Cost per entry RM18.00 against the contest line,
RM40.00 against the full budget. Engagement lands around 2.3% on impressions and 4.2% on reach.

**Verdict:** the only tier that clears entries, reach and a real share of the views target on paid
alone. The extra RM25,000 buys 4.92M more reach and 5.38M more paid views. That is the price of
planning an entry at RM18 instead of RM9.

### Side by side

| | Brief target | RM135,000 | RM160,000 | 2026 actual |
|---|---|---|---|---|
| Contest entries | 4,000 | 4,000 | 4,000 | 3,765 |
| Paid reach | 15M | 15.1M | 20.0M | 13.8M |
| Video views, paid | 40M campaign wide | 14.7M | 20.1M | 38.8M campaign wide |
| Impressions | Not set | 27.7M | 36.7M | 51.0M |
| Engagement rate | 3% | 2.3% impr / 4.2% reach | 2.3% impr / 4.2% reach | 0.08% impr |
| Cost per entry | Not set | RM18.00 | RM18.00 | Unknown |

### Platform split

| Line | Meta | TikTok | Google | Total |
|---|---|---|---|---|
| **Option 1** Contest conversion | 36,000 | 36,000 | n/a | 72,000 |
| Video and reach | 12,000 | 30,000 | 12,000 | 54,000 |
| Engagement, Spark | n/a | 9,000 | n/a | 9,000 |
| **Option 1 total** | **48,000** | **75,000** | **12,000** | **135,000** |
| **Option 2** Contest conversion | 36,000 | 36,000 | n/a | 72,000 |
| Video and reach | 18,000 | 40,000 | 18,000 | 76,000 |
| Engagement, Spark | n/a | 12,000 | n/a | 12,000 |
| **Option 2 total** | **54,000** | **88,000** | **18,000** | **160,000** |

TikTok takes 56% of Option 1 and 55% of Option 2, Meta 36% and 34%, Google 9% and 11%. Google
carries no contest budget by design, because YouTube cannot optimize toward a receipt upload the way
Meta and TikTok can.

### The non-paid remark

Both forecasts are **paid media only**. They exclude KOL and organic views from the 30 influencers,
both brands' owned channels, entries walked in from 320 sampling days across 120 outlets and 96
roadshow days across 32 outlets, POSM and on pack QR codes, the Sampul Raya, and earned media (2026
got 10 publications at campaign launch and 10 more at the music video launch). Actual outcomes should
land above these numbers.

**They also exclude everything the pop-up costs.** Counter build, stock, staffing, the mystery gift
and the Golden Ticket packaging change are on-ground and client costs, not media costs. Not a
ringgit of either option pays for them.

### Geo

The contest runs as **two separate campaigns**, not two ad sets, so budget cannot leak to the
cheapest inventory. KL and Selangor take 30%, the other states take 70%. Inside each, a radius layer
around the 14 boutiques carries the pop-up message while the broad layer works the rest of the
state. The brand video runs national.

Inside a single campaign the algorithm spends where conversions are cheapest, which is KL, and the
outer states starve. That is why this is two campaigns rather than two ad sets.

**The 30/70 split needs revisiting.** It was set against Bulan Bintang's suburban skew before the
pop-up existed. Now that the boutiques carry the mechanic, the split should be set against the real
store list, which we do not have. It is question 4 in section 8.

---

## 4. Mechanics research

Five verified Malaysian benchmarks, checked 13 September 2026. Unchanged from rev0, because the
evidence did not change. What changed is the conclusion drawn from it.

| Campaign | What they did | The lesson |
|---|---|---|
| HeroMarket x Tyson x First Pride, 1 Aug to 30 Sep 2026 | Buy any two packs of either brand in a single receipt | Two brands works when both sit in the same basket |
| Guardian x BRAND'S x Christy Ng, 1 Sep to 31 Oct 2025 | Spend RM100 on BRAND'S, win a Christy Ng bag, 20 winners | The partner brand can be the prize rather than a second purchase |
| 100PLUS x SHALS, 17 Jan to 15 Apr 2026 | Limited edition baju raya by a Malaysian label, awarded to top spenders in TikTok Live | FMCG and fashion works when the baju is the reward |
| AEON Merdeka Shop and Win, 30 Jul to 31 Aug 2026 | RM80 single receipt, scan the QR at checkout, 69 prizes over four weekly draws | The QR lives at the till, and weekly draws hold a long window |
| Bulan Bintang Terrrpaling Raya Finale, live now | QR scan for a RM400,000 cash pool | Our partner already runs a bigger and simpler contest |

**The finding is the absence.** No Malaysian contest found required purchases from two separate
brands at two separate retailers for one entry.

**rev0 read that absence as a reason to change the mechanic. rev1 reads it as a reason to remove the
second retailer.** The HeroMarket lesson is that two brands work when both sit in the same basket. A
Saji counter inside a Bulan Bintang boutique is how you put them in the same basket without touching
a word of what the client wrote.

### The pop-up

A Saji pop-up counter inside every one of Bulan Bintang's 14 boutiques, running the full 10 week
contest window from 1 February to 5 April 2027.

**What it solves, in the order it solves it.**

1. **Customer experience.** The briefed journey runs nine steps across two retailers and two trips,
   with the first receipt held for days between them. With the counter it runs six steps in one
   shop, in one visit, with the two receipts printed minutes apart. The RM175 threshold and both
   receipts survive untouched.
2. **Accessibility and exclusivity at once.** Anyone can walk into a boutique, so nothing is gated.
   What is gated is the reward: the mystery gift, the campaign packaging and the Golden Ticket exist
   only in stock sold at the counters. Going to the boutique becomes the advantage rather than the
   obstacle.
3. **Data.** Saji is read as a B40 brand. Every pop-up receipt pairs RM25 of Saji with RM150 or more
   of apparel, which is first-party basket evidence for a higher-income shopper that Saji does not
   hold anywhere today.

**On the income claim.** Bulan Bintang sells at roughly RM289 a piece through 14 boutiques and skews
suburban rather than urban. That supports an **M40** read. It does not support T20, and the deck
does not claim it. Saying M40 and stopping there is the defensible version.

**The honest limitation.** The pop-up fixes the journey for anyone already heading to a boutique.
The Raya Household CFO, who does the grocery run first, still has to be persuaded through a boutique
door. That turns part of the contest media job into driving store traffic, which is why the radius
layer in section 3 exists.

**The step count, both ways.**

| As briefed | With the pop-up |
|---|---|
| 1. Sees the ad | 1. Sees the ad, or the poster at the boutique door |
| 2. Works out that two brands are needed | 2. Buys RM150 of baju at Bulan Bintang |
| 3. Buys RM25 of Saji at the grocer | 3. Buys RM25 of Saji at the counter behind her |
| 4. Keeps receipt one, for days | 4. Scans the counter QR, or taps the ad |
| 5. Travels to a Bulan Bintang boutique | 5. Uploads both receipts, taken minutes apart |
| 6. Buys RM150 of baju | 6. Submits |
| 7. Finds the entry route again | |
| 8. Uploads two receipts | |
| 9. Submits | |

The gain is not mainly the three steps. It is that steps four to six in the briefed journey span
days, and a receipt that has to survive days is a receipt that gets lost.

### Novelty: three reasons to walk into the counter

1. **Mystery gift above a higher spend.** RM50 at the counter, double the RM25 entry floor, and a
   wrapped gift goes in the bag. It lifts basket value on the spot and gives counter staff something
   to say. RM50 is our proposal; the client sets the real threshold.
2. **Campaign-specific packaging.** A Saji x Bulan Bintang pack sold only through the pop-ups. It is
   the collaboration made physical and it is the thing shoppers photograph without being asked.
3. **The Golden Ticket.** One ticket hidden at random in pop-up stock wins RM29,000 outright,
   outside the weekly draw. One shopper walks out of a boutique holding it.

**Two production constraints on the Golden Ticket.** A ticket cannot go inside a bottle of cooking
oil. It has to sit under the cap, on a neck tag or inside the outer carton, and that is a packaging
line change with its own lead time, so it locks in mid December with the permit. Separately, a
randomized ticket is a second game of chance alongside the weekly draw, and counsel should confirm
whether both can be named in one permit under the Common Gaming Houses Act 1953.

### The prize

The briefed prize is RM500 cash plus RM2,400 of Saji products, 50 winners, RM145,000.

**The total does not move.** RM145,000 is the client's number and this plan spends exactly that. The
shape changes so the contest has a headline prize.

| Tier | Count | Value each | Subtotal |
|---|---|---|---|
| Weekly winners, 4 a week across 10 weeks | 40 | RM2,900 (RM500 cash + RM2,400 Saji products) | RM116,000 |
| Golden Ticket grand prize | 1 | RM29,000 | RM29,000 |
| | | **Total** | **RM145,000** |

The Golden Ticket is worth exactly ten weekly prizes, which is a line the creative can use without
exaggerating anything. **The one trade is the winner count, 50 down to 40.** If the client will not
give up ten winners, the alternative is to keep all 50 and ask Bulan Bintang to fund the Golden
Ticket, which folds into the partner conversation below.

Ten weekly draws survive, so no week of the contest passes without a visible winner. COO's working
deck proposes four draws across a 10 week window, which would leave six weeks with no winning
moment. The reason for many winners rather than few: in 2025 the contest had roughly 2,000 winners
against 4,179 entries, close to a one in two chance, and entries held up better that year than any
since. Confirm the 2025 figure against the source deck before quoting it, since the PDF column
alignment is loose.

**Optional, and framed as a question rather than a recommendation:** adding a RM600 Bulan Bintang
family baju set to each weekly prize would take it to RM3,500 per winner, with Saji's RM145,000
untouched and Bulan Bintang funding the difference. It is worth asking because the partner appears
in the mechanic, the pop-up and the Golden Ticket but contributes nothing to what a winner receives.
The client and the partner decide, not us.

---

## 5. QR code versus landing page

Over 90% of Meta and TikTok impressions in Malaysia are mobile in feed. **A QR code in that ad cannot
be scanned by the device showing it.** The viewer has to screenshot it and find a scanner that reads
from the gallery, or find a second device.

What a QR in the ad returns: no click, no pixel, no conversion event, no retargeting pool, no cost
per entry. The platforms never learn who converts, so they keep serving people who never enter. This
is precisely why 2026 bought views rather than entries.

What a landing page returns: the click is recorded, the pixel fires, the conversion event trains the
algorithm, a retargeting pool builds, and cost per entry becomes reportable daily. It also lets us
chase the people who started an entry and never finished.

**QR codes keep their place offline**, where the shopper is looking at a physical surface. Under
this revision the most important of those surfaces is new: **the pop-up counter itself**. A code at
the counter catches the shopper at the exact moment both receipts are in her hand, which is the
highest intent moment the whole campaign has. It gets its own tracking tag and should be reported
separately from every other offline code.

The rest stand as before: shelf talkers, neck tags, A-boards, block displays, posters and on pack
stickers (the 2025 campaign printed 10,000 shelf talkers, 7,000 posters and 40,000 neck tags),
Bulan Bintang boutique counters and packaging inserts, the 150,000 Saji sample packs, the launch at
Wisma FGV, the sampling and roadshow days, and the Sampul Raya. Every code carries its own tracking
tag so we can report which touchpoint produced entries. This is the AEON model.

---

## 6. Flighting

| Window | What runs |
|---|---|
| 17 Oct 2026 | Project award |
| Nov to mid Dec 2026 | Bulan Bintang floor space agreement negotiated and signed |
| Mid Dec 2026 | Permit filed (weekly draw and Golden Ticket), campaign packaging locked for the production line |
| 15 Jan 2027 | Landing page live, pixels and tracking tested, load tested. Pop-up counters built, stocked and staffed |
| 25 Jan 2027 | Campaign launch event, teaser burst, awareness only |
| Weeks 1 to 3, 1 to 23 Feb | Contest engine alone, no film yet. Pop-ups open 1 Feb. Chinese New Year 6 Feb, so hold bid caps and cut weight about 30% for three days. Ramadan opens 8 Feb and the contest ramps. First winners announced 19 Feb |
| Weeks 4 to 6, 24 Feb to 9 Mar | Teasers 17 and 22 Feb, film launches 24 Feb. Both engines at full weight. Retarget video viewers into the contest, which will be the highest converting audience the campaign has |
| Weeks 7 to 10, 10 Mar to 5 Apr | Raya 10 Mar, so pull contest spend for three days and let the film carry emotional reach. Balik kampung and open house through Syawal. Last chance creative from 29 Mar |
| 5 Apr 2027 | Contest closes, pop-ups close, final draw |
| By 17 Apr 2027 | Winner fulfilment and post campaign report |

The contest runs **24 days before the brand film exists**, so contest creative has to carry weeks 1
to 3 on its own. Mid December now carries three locks rather than one, and the packaging line has
the longest lead time of the three, so it sets the date.

---

## 7. Caveats

1. Is the 40M views KPI paid only or campaign wide? The model assumes campaign wide. Paid only
   roughly doubles the budget.
2. What counts as a view? 2026's 76% view rate implies a 2 second definition, not 30 seconds.
3. Engagement measured on impressions or on reach? The same campaign reads 2.3% or 4.2%.
4. The 2026 spend is unknown, so every CPM in section 2 stays an assumption until the client shares
   it.
5. **The pop-up rests on a partner decision we do not control.** Bulan Bintang has to agree to host
   a Saji counter in all 14 boutiques for 10 weeks. If the answer is no, the mechanic reverts to the
   nine step journey and the 2.0% conversion rate is optimistic rather than cautious.
6. **No budget option includes pop-up cost.** Counter build, stock, staffing, the mystery gift and
   the packaging change sit with on-ground and with the client.
7. **Golden Ticket feasibility.** A ticket cannot go inside a bottle of oil, and a neck tag,
   under-cap or carton insert adds packaging lead time.
8. **Permit scope.** The weekly draw and the Golden Ticket are two games of chance. Both likely need
   naming in one permit under the Common Gaming Houses Act 1953. Allow three to four weeks.
9. Chinese New Year on 6 February inflates the auction in contest weeks 1 and 2. A 20 to 40% CPM
   lift in that window is outside our control.
10. Bulan Bintang runs its own QR contest with a RM400,000 cash pool. Confirm whether it overlaps.
11. The client's own slides disagree on the launch date (25 or 28 January) and the winner count (50
    or 53). This plan reads 50 as the briefed figure and proposes 40 plus the Golden Ticket.
12. Website readiness. The landing page must absorb a weekly announcement spike, so we need to own
    or co-own the hosting and the load test.

---

## 8. Questions for the client

1. Are the three KPIs for paid media alone, or for the whole campaign including KOL and organic?
2. What did the 2026 campaign spend on digital, by platform?
3. Will Bulan Bintang host a Saji counter in all 14 boutiques, and on what commercial terms?
4. Where are the 14 boutiques? The 30/70 geo split should be set against the real store list.
5. Who owns the landing page, the domain, the hosting and the entry database, and who is the PDPA
   data controller?
6. Does the client accept 40 weekly winners plus one RM29,000 Golden Ticket in place of 50 weekly
   winners, inside the same RM145,000?
7. Would Bulan Bintang co-fund a RM600 baju component per weekly winner, on top of the briefed
   RM145,000?
8. What is the mystery gift threshold, and who funds the gift?
9. Can the permit, the packaging change and the floor space agreement all be locked by mid December?
10. Do we get Meta and TikTok pixel access on Saji properties, plus customer lists for lookalikes?
11. Which Saji SKUs count toward the RM25 threshold, and which ones carry the Golden Ticket?
12. Does a Bulan Bintang online purchase qualify, or does entry require a boutique receipt because
    the Saji counter is inside the store? The landing page currently says the boutique.
13. Who verifies receipts and fulfils prizes, and what turnaround do they commit to?

---

## 9. Sources

Client material, held on the Desktop at `C:\Users\Jordan\Desktop\COO (Saji)\`:

- `SAJI Discussion with COO.pdf`: internal meeting notes, 11 September 2026
- `Past campaign decks/RARA 2025 Deck.pdf`: 49 slides, per platform actuals and the weekly entry table
- `Past campaign decks/RARA 2026 Deck.pdf`: the 2022 to 2026 series, Kak Ji, the dance challenge
- `2027 Marketing campaign/`: 13 brief slides plus COO's 36 slide blank canvas working deck

Internal:

- `../05-meetings/2026-09-11-coo-internal.md`: the COO discussion
- `../05-meetings/2026-09-14-toggle-internal.md`: the Toggle discussion that produced this revision

External, all checked 13 September 2026:

- [FGV Delima, Saji brand](https://fgvdelima.com/brand/saji/)
- [FGV, new Saji product range](https://www.fgvholdings.com/press_release/fgv-unveils-new-saji-product-range/)
- [Bernama, FGV food products](https://www.bernama.com/en/news.php?id=2156054)
- [Bulan Bintang HQ](https://bulanbintanghq.com/) and [Bulan Bintang Malaysia](https://www.bulan-bintang.com.my/)
- [Bulan Bintang founder profile](https://wargabiz.com.my/2023/03/29/bulan-bintang-a-zero-to-hero-local-brand-in-malaysia/)
- [StoreHub on Bulan Bintang](https://www.storehub.com/my/blog/bulan-bintang-menjulang-baju-melayu-tradisi-ke-mata-dunia/)
- [AEON Merdeka Shop and Win](https://www.syioknya.com/promotion/aeon-merdeka-shop-and-win-contest-august-2026)
- [100PLUS x SHALS](https://www.brandinginasia.com/a-wearable-raya-experience-dentsu-creative-malaysia-transforms-100plus/)
- [Consumer promotion types in Malaysia](https://www.claim.my/types-of-consumer-promotions-in-malaysia/)
- [Donovan & Ho on contest licensing](https://dnh.com.my/running-promotional-activities-contests-competitions-and-lucky-draws-in-malaysia-heres-what-you-need-to-know-about-licensing/)
