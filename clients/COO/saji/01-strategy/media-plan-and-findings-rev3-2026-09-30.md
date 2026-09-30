# Saji x Bulan Bintang, RaRa 2027: media plan, model and findings (rev3)

> **Internal to Toggle and COO. Do not send this document to the client.**
> It carries the working media and service fee split, which the decks deliberately do not.

Prepared 30 September 2026. This document carries the working behind
`Saji x Bulan Bintang - Digital Advertising Proposal - rev3-cleaned.pptx`, the 14 slide internal
deck. It supersedes `media-plan-and-findings-rev2-2026-09-15.md`, which stays in place as the record
of the position it replaced.

**What changed from rev2.** rev2 kept the client's briefed mechanic and removed the friction with a
Saji pop-up counter inside all 14 Bulan Bintang boutiques. Two meetings killed that. The 22 September
joint meeting priced Bulan Bintang's participation at a title sponsorship of at least RM1.5 million.
The 24 September COO internal then recorded that Saji is unlikely to take even the Gold tier, that
the collaboration will be minimal, and that the mechanic has to work with or without the partner.
rev3 replaces the pop-up with a point system that runs on Saji alone. The prize pool then halved
from RM145,000 to RM70,000 on 30 September.

---

## 0. Read this first: the forecast does not reconcile

**The rev3 decks plan 12,000 sign-ups and 5,040 entrants. On this account's own media model those
numbers are about 41% too high.** Nobody should quote them in the 14 October session until the team
settles the item below.

The rev3 forecast derived contest traffic from 40% of the full RM145,000 campaign investment, which
is RM58,000 and about 160,000 clicks. The model established in rev2 puts the contest line at 40% of
the **RM100,000 working media**, which is RM40,000.

| Basis | Contest line | Clicks | Sign-ups at 7.5% | Entrants at 42% |
|---|---|---|---|---|
| What the rev3 decks assume | RM58,000 | 160,000 | 12,000 | 5,040 |
| rev2's working media model | RM40,000 | 113,333 | 8,500 | 3,570 |

Clicks are derived at the published CPCs, Meta RM0.45 and TikTok RM0.30, split 45/55 within the
contest line.

On the correct basis the plan **misses the 4,000 entrant target at the planned sign-up rate**. It
needs an **8.4% sign-up rate** to reach 4,000, against the 7.5% the deck plans and inside the
5.0% to 11.0% band the deck already publishes. So the target is reachable, but it sits above the
planning case rather than below it, which is the opposite of what the deck currently implies.

**Three ways out, and the team has to pick one.**

1. **Re-cut the forecast onto RM40,000** and present 8,500 sign-ups and 3,570 entrants, then argue
   the 4,000 target needs the upside case. Honest, and it weakens the headline.
2. **Move working media up.** The prize pool fell by RM75,000. If any of that returns to the
   campaign, a contest line near RM58,000 makes the current deck numbers correct as published.
3. **Hold the deck and change the split.** RM145,000 with a smaller fee raises working media and
   closes part of the gap.

Option 2 is the one worth raising with COO, because the client has just freed RM75,000 and the
campaign investment has not been renegotiated.

This was found on 30 September while filing rev3 into the repo, by reconciling the deck against
rev2's internal model. It was not caught when rev3 was built, because rev3 was built without that
model in hand.

---

## 1. The budget structure

### The two figures are no longer the same

rev2 ran two separate RM145,000 figures. The prize pool is now RM70,000, so that coincidence is gone
and the documents get easier.

| | Amount | Who funds it | Changed? |
|---|---|---|---|
| Contest prize pool | RM70,000 | The client, directly | **Yes, was RM145,000** |
| Campaign investment | RM145,000 | The client, to Toggle and COO | No |
| **Total client outlay** | **RM215,000** | | Was RM290,000 |

### Inside the campaign investment, unchanged

| Component | Amount |
|---|---|
| Working media | RM100,000 |
| Toggle and COO service fee | RM45,000 |
| **Total** | **RM145,000** |

**The withholding rule from rev2 still stands and rev3 still obeys it.** No deck states a working
media figure, and none publishes cost per entry, blended CPM or any per-line ringgit figure.
Allocation appears as percentages only. The `_build` script header carries the rule.

The residual rev2 recorded is unchanged: slide 11 of the cleaned deck publishes the rate card and
the allocation percentages, so a determined reader can solve for a media base. That trade was
accepted in rev2 because the rate card is the deck's strongest credibility slide.

---

## 2. The mechanic: Mata Raya

One balance and four rules. The points are called **Mata**.

| Rule | Detail |
|---|---|
| Earn | Every RM1 of Saji earns 1 Mata |
| Qualify | Every 25 Mata is one chance in that week's draw |
| Keep | The balance never resets across the ten weeks |
| Unlock | Milestones at 50, 150 and 300 Mata pay guaranteed rewards |

**The rule that protects the commercial logic: receipts qualify you, codes accelerate you.** No draw
chance exists without at least one verified Saji receipt behind it.

### Four earn routes

| Route | Pays | Where | What Saji gets back |
|---|---|---|---|
| Saji receipt | RM1 = 1 Mata | Any shop that sells Saji | Basket size and product mix |
| Featured product | 2x or 3x Mata | Saji picks one product each Monday | New product trial with no price cut |
| Bonus QR code | 25 to 50 Mata | Roadshows, bazaars, packs, shelves | Footfall turned into a reachable contact |
| Streak and referral | 25 Mata | The contest page | Repeat visits and free reach |

The featured product multiplier is the part worth selling hardest. Saji runs about 100 consumer SKUs
and told us on 24 September that the objective is new product sampling. A 3x Mata week moves units
without touching shelf price, needs no trade renegotiation, and can be switched every Monday.

### Why a spend leaderboard alone was rejected

Yang's idea was a leaderboard where the highest spender wins. Taken literally it breaks three ways.
It concentrates the prize among a few people buying in bulk, when Saji already reaches half the
households in Malaysia and needs breadth. It tells everyone outside the top twenty to stop, which is
the exact objection COO raised. And a spend ranking sitting next to a random draw is two games of
chance inside one contest.

Mata Raya keeps the part that works, which is that more spend means more chance, and removes the
part where the chance falls to zero.

---

## 3. Why the leaderboard is national and not per state

rev3 as first built ran a leaderboard per state. That was wrong and it was corrected on 30 September.

At 12,000 sign-ups split 30% KL and Selangor and 70% other states, with 42% of registrants uploading
a receipt:

| State | People earning Mata | Active in week 1 |
|---|---|---|
| Selangor | 1,176 | 141 |
| Johor | 584 | 70 |
| Kedah | 321 | 39 |
| Melaka | 146 | 18 |
| Perlis | 38 | 5 |

Three problems follow.

1. **It is unfair.** A Selangor champion beats 1,176 people. A Perlis champion beats 38. That is 31
   times harder for the same Campaign Pack.
2. **It is gameable.** Perlis has about five active collectors in week one. One person buying RM60 of
   Saji wins that state every week for ten weeks.
3. **It costs too much.** Fourteen states across ten weeks is 140 Campaign Packs and 140
   verifications. A national top ten at the close is 10 packs.

**The design error underneath it.** The state board was built to solve "top of Malaysia feels
unwinnable". The milestone ladder at 50, 150 and 300 Mata already solves that, because every shopper
collects those without luck. The same problem was solved twice, and the second solution added cost
and a fairness hole.

**What replaced it.** One national board showing the top five, the reader's own rank, and the exact
Mata gap to the person one place above them. The top ten at the close win the Campaign Pack. A
leaderboard does not have to be winnable, it has to show the next step, and the gap line works at
rank 12 and at rank 3,847 equally. State is still captured at registration for reporting, media
weighting and prize delivery.

---

## 4. The prize pool at RM70,000

COO confirmed RM70,000 on 30 September, down from RM145,000.

| | Amount |
|---|---|
| 40 weekly winners at RM1,400 | RM56,000 |
| One grand draw | RM14,000 |
| **Total** | **RM70,000** |

**41 winners in total.** Four winners every week for ten weeks, plus one grand draw on 9 April drawn
from every entrant's full ten week Mata balance. The grand draw is worth exactly ten weekly prizes,
which keeps the line the deck uses.

**Each weekly prize is RM500 duit raya plus RM900 of Saji products for a year.** The winner count was
held and the prize value cut, rather than the other way round, for three reasons. The mechanic exists
to fix perceived odds, so halving the winner count works against it. Four a week keeps the weekly
draw rhythm and the winner wall. And holding the cash half at RM500 protects the "RM500 duit raya"
headline already built into the landing page hero and the creative.

The alternatives priced on the same pool were 30 winners at RM1,750 plus a RM17,500 grand draw, and
20 winners at RM2,500 plus a RM20,000 grand draw.

**The milestones sit outside this pool.** COO confirmed on 30 September that the Mystery Gift, the
Campaign Pack and the Roda Rezeki stock stay as product and on-ground costs.

**What this does to the forecast, and nobody has modelled it.** The 5,040 entrant projection was
built when the weekly prize was RM2,900. It is now RM1,400. The 7.5% sign-up rate, already the
softest number in the plan, now sits on roughly half the incentive. No relationship between prize
value and entry rate has been measured on this account, so the numbers were left alone rather than
adjusted by guesswork. Say this out loud in the session.

---

## 5. The optimization argument

This is the technical reason the landing page matters, and it is worth keeping in any version of the
deck.

4,000 entries across ten weeks is 400 a week. Split across two geo campaigns on two platforms and
several ad sets each, most ad sets land under the roughly 50 weekly conversion events Meta needs to
leave the learning phase. An ad set stuck in learning keeps exploring instead of exploiting, so the
buy pays discovery prices for the whole campaign.

Pointing the buy at **registration** rather than at receipt upload raises the event count by roughly
ten times. Every ad set clears the threshold and the receipt stays the reported outcome. The change
costs nothing.

This is also why registration on the page is free and needs no purchase. It widens the funnel and it
feeds the pixel weeks before any receipt exists.

---

## 6. The online to offline loop

Five stages: reach, register, earn, return, prove. The fifth feeds the first, because roadshow
footfall that becomes a registered profile compounds instead of disappearing when the truck packs up.

Every code lands on the same page and carries its own tag.

| Touchpoint | Pays | Tag | Volume available in 2027 |
|---|---|---|---|
| Saji receipt, any shop | RM1 = 1 Mata | receipt | Every shop that sells Saji |
| Roadshow truck QR | 50 Mata and one spin | roadshow | 96 roadshow days at 32 shops |
| Shelf display QR | 25 Mata | posm | 320 sampling days at 120 shops |
| Sample pack code | 25 Mata | sampling | 300,000 packs |
| Campaign pack code | 50 Mata | pack | Limited run, volume to confirm |
| Weekly WhatsApp code | 25 Mata | crm | Everyone who registered |
| Bulan Bintang store QR | 50 Mata | partner | 14 stores, Config B only |

This is what 2026 was missing. Entries arrived by WhatsApp, which Meta and TikTok cannot see, so the
platforms optimized toward the only outcome visible to them, which was a view.

---

## 7. Two configurations

The 24 September instruction was that the mechanic has to work with or without Bulan Bintang.

**Config A, Saji only. This is what we build.** RM1 of Saji earns 1 Mata at any shop. Roadshow
trucks, bazaars, shelf displays and the 300,000 sample packs carry the codes. Prizes, draws and
milestones all run as planned. Nothing waits for a partner signature.

**Config B, with Bulan Bintang. This switches on the day they sign.** A boutique receipt earns capped
bonus Mata and each of the 14 stores carries a 50 Mata code. Their footfall and their roughly 400,000
data records come in as extra reach.

The structural change from rev2 is that the partner used to carry the mechanic and now only adds to
it. That is what lets the build lock in December without knowing the answer.

---

## 8. Deliverables

**Current, rev3:**

- `Saji x Bulan Bintang - Digital Advertising Proposal - rev3-cleaned.pptx`: 14 slides, **internal**.
  Written for the COO and Toggle team rather than for the client. Plain language throughout, measured
  at 239 sentences, 7.3 words average, longest 20, no passive voice.
- `_build/build-deck-rev3-cleaned.py`: the build script. **Python and python-pptx**, unlike the
  earlier `build-deck*.js` scripts which use pptxgenjs. Run it with
  `uv run --with python-pptx python build-deck-rev3-cleaned.py out.pptx`.
- `_build/validate-layout.py`: geometry checker. Fails the build on text overflowing its shape, any
  two text boxes overlapping, or content crossing the footer bar. Written after the client reported
  having to move overlapping boxes by hand in the 28 September deck.
- `../02-creative/tersaji-raya-2027-contest-landing-page-rev3.html`: the contest page rebuilt around
  the Mata balance, with the national leaderboard.

**Superseded, kept as the record:**

- `Saji x Bulan Bintang - Digital Advertising Proposal - rev3 (2026-09-28).pptx`: 34 slides,
  client-facing. **Carries the old RM145,000 prize pool and a per-state leaderboard. Do not send.**
  It was never presented, because the 14 October session had not happened when it was superseded.

---

## 9. Open items

**Opened by rev3, in priority order:**

1. **The forecast does not reconcile to the working media model.** Section 0. Settle this before
   14 October. It is the only item that changes what is said in the room.
2. **The prize pool halved and nobody re-modelled the entry rate.** The 7.5% sign-up rate was set
   against a RM2,900 weekly prize and now sits against RM1,400.
3. **Receipt verification is still unpriced.** 13,100 receipts at the deck's planning figure is
   roughly three times the 2026 workload. It appears as a risk on slide 14 and has no headcount or
   cost behind it.
4. **"Saji sepanjang tahun" now means RM900, about RM75 a month.** Confirm that covers a year for the
   target household, or reword the claim to a named product bundle. This is a Trade Descriptions
   exposure, not only a credibility one.
5. **Confirm the campaign investment is still RM145,000.** The RM50,000 mentioned on 24 September
   reads as the Bulan Bintang sponsorship tier rather than our budget, and the decks are built on
   RM145,000.
6. **One grand draw of RM14,000, or a smaller prize every week?** The 22 September note records one
   golden ticket per week, which does not fit inside RM70,000.
7. **Who owns the weekly featured product calendar**, and which SKUs get the first three weeks of
   Ramadan when basket sizes are largest.

**Carried over from rev2 and rev1, still open:**

- Is the 40M views KPI paid only or campaign wide? The whole media model turns on it.
- What counts as a view, and is engagement measured on impressions or reach?
- What did 2026 spend on digital, by platform? Every CPM is an estimate until this lands.
- Contest licensing under the Common Gaming Houses Act 1953. A draw plus any instant win is likely
  two games of chance under one permit. Allow three to four weeks.
- The landing page runs on placeholder data. The entry count, the winner count, the named winners and
  the leaderboard positions are all simulated and must read from the live database before launch.
- The landing page form posts nowhere. The submit handler, receipt storage and the Meta and TikTok
  conversion events all still need wiring.
- Pixel access and the domain are the critical path for the 15 January page date.
