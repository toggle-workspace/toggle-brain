# Saji RaRa 2027: the rev3-cleaned decisions

**Date:** 30 September 2026
**Present:** Toggle, with COO input on the prize pool
**Outcome:** A 14 slide internal deck, a national leaderboard, and a RM70,000 prize pool.

---

## Decision 1: the prize pool is RM70,000

COO confirmed the total prize pool is **RM70,000**, down from RM145,000. The milestone rewards stay
outside it as product and on-ground costs.

**41 winners.** The winner count was held and the prize value cut.

| | Amount |
|---|---|
| 40 weekly winners at RM1,400 | RM56,000 |
| One grand draw | RM14,000 |
| **Total** | **RM70,000** |

Each weekly prize is **RM500 duit raya plus RM900 of Saji products for a year**. Four winners a week
for ten weeks, and the grand draw on 9 April is worth exactly ten weekly prizes.

**Why the winner count was held rather than the prize value.** The mechanic exists to fix perceived
odds, and COO's own objection was that the contest feels impossible to win, so halving the winner
count works against the thing we built. Four a week also keeps the weekly draw rhythm and the winner
wall. Holding the cash half at RM500 protects the "RM500 duit raya" headline already built into the
landing page hero and the creative, so only the product half moved.

Alternatives priced on the same pool: 30 winners at RM1,750 with a RM17,500 grand draw, and 20
winners at RM2,500 with a RM20,000 grand draw.

**The campaign investment is unchanged at RM145,000.** Total client outlay is now RM215,000 rather
than RM290,000, and the two RM145,000 figures that rev2 had to keep apart are no longer the same
number.

## Decision 2: the leaderboard is national, not per state

rev3 as first built ran a leaderboard per state. That was wrong.

| State | People earning Mata | Active in week 1 |
|---|---|---|
| Selangor | 1,176 | 141 |
| Kedah | 321 | 39 |
| Perlis | 38 | 5 |

A Selangor champion beats 1,176 people and a Perlis champion beats 38, so the same Campaign Pack was
31 times harder to win in one state than another. Perlis has about five active collectors in week
one, so one person buying RM60 of Saji could win that state every week for ten weeks. Fourteen
states across ten weeks also meant 140 Campaign Packs to fulfil, against 10 for a national top ten.

**The design error.** The state board existed to solve "top of Malaysia feels unwinnable". The
milestone ladder at 50, 150 and 300 Mata already solves that. The same problem was solved twice, and
the second solution added cost and a fairness hole.

**What replaced it.** One national board showing the top five, the reader's own rank, and the exact
Mata gap to the person one place above them. Top ten at the close win the Campaign Pack. State is
still captured at registration for reporting and prize delivery.

## Decision 3: a 14 slide internal deck

The 34 slide client-facing rev3 was cut to 14 for internal use. All five section dividers, the
closing slide and the standalone data slide were removed. Nothing else was dropped, only merged.

The language was rewritten to plain sentences and measured rather than judged: 239 sentences, 7.3
words average, longest 20, no passive voice, no banned filler. One real clarity fix came out of it,
where "sign-up" and "entrant" had been used loosely for two different numbers, 12,000 and 5,040.
The table now labels them.

## Decision 4: the deck builder validates its own geometry

The client reported having to move overlapping text boxes by hand in the 28 September deck.

**Root cause.** Each text block was placed at an estimated offset in its own text box. When
PowerPoint wrapped one line more than predicted, a box overran the one below it.

**Fix.** Each card is now a single text frame with flowing paragraphs, so blocks cannot overlap.
Title and kicker heights are measured rather than assumed. `_build/validate-layout.py` checks every
slide for text overflowing its shape, any two text boxes overlapping, and anything crossing the
footer bar. It caught three real overlaps on its first run, including two that were invisible but
would still have grabbed the wrong shape on click.

## Found while filing, and not yet resolved

**The rev3 forecast does not reconcile to this account's working media model.** The decks derive
contest traffic from 40% of the full RM145,000, which is RM58,000 and about 160,000 clicks. rev2's
model puts the contest line at 40% of the RM100,000 working media, which is RM40,000 and about
113,000 clicks. On the correct basis the plan lands at 8,500 sign-ups and 3,570 entrants rather than
12,000 and 5,040, and it needs an 8.4% sign-up rate to reach the 4,000 target.

This was found on 30 September while filing rev3 into the repo. It was not caught when rev3 was
built, because that work was done without the internal model in hand. Section 0 of
`../01-strategy/media-plan-and-findings-rev3-2026-09-30.md` carries the three options.

**Settle it before 14 October.** It is the only open item that changes what is said in the room.

## Open items this created

1. The forecast reconciliation above.
2. The prize pool halved and nobody re-modelled the entry rate. The 7.5% sign-up rate was set against
   a RM2,900 weekly prize and now sits against RM1,400.
3. Receipt verification is still unpriced, at roughly three times the 2026 workload.
4. "Saji sepanjang tahun" now means RM900, about RM75 a month. Confirm it covers a year for the
   target household or reword the claim.

## What was produced

- `../01-strategy/Saji x Bulan Bintang - Digital Advertising Proposal - rev3-cleaned.pptx`, 14 slides
- `../01-strategy/media-plan-and-findings-rev3-2026-09-30.md`, internal, carries the media split
- `../01-strategy/_build/build-deck-rev3-cleaned.py` and `_build/validate-layout.py`
- `../02-creative/tersaji-raya-2027-contest-landing-page-rev3.html`
