---
client: kynare
title: Intake brief and verified economics
date: 2026-08-12
source: client brief received verbally and written up by Jordan, arithmetic checked by Toggle
last_reviewed: 2026-08-12
---

# Kynare — intake brief (2026-08-12)

## What the client told us

- Hybrid PT and physio clinic. Education-first model. Clients come in, get educated, and the team is confident they sign off after a walk-in assessment.
- Team of 3 (PT and physio) managing clients. Site: kynare.com
- Locations: PJ Section 13 and Mont Kiara.
- Intake: about **10 new clients a week**. Flagged as unconfirmed whether this is a leads or a sign-ups target.
- Pricing: RM250 one-time sign-up, 12-session package at RM205 a session, about 20% of clients take a 24-session package.
- Cadence: 2 sessions a week for 6 weeks, roughly a 1.5-month client cycle.
- Contract: 3 months.
- Capacity target: 20 active clients. About 130 client-hours a week available, so the real ceiling is around 50 to 65 clients.
- Demographic currently skews older.
- Two arms launching: the PT Hybrid program (immediate) and a doctor arm in November (in-house doctor doing treatments and referring into the hybrid PTs, plus add-ons such as bone density).
- Ad spend already modeled: PT Hybrid at RM3,000 to RM4,500 a month, which is RM10,000 to RM13,500 over the first three months. Doctor arm from November at an extra RM3,000 to RM5,000 a month as a separate campaign, with nothing official agreed yet.
- Economics: CAC around RM180 to RM250 against a blended LTV around RM2,950, so 12x to 16x. The constraint is capacity, not ad economics.

## Arithmetic check

The client's numbers hold up. Details, because they get quoted in decks:

| Check | Result |
|---|---|
| 12-session package | 12 × RM205 = **RM2,460** |
| 24-session package | 24 × RM205 = **RM4,920** |
| Blended at an 80/20 split | 0.8 × 2,460 + 0.2 × 4,920 = **RM2,952** |
| Reconciliation | RM2,952 matches the quoted RM2,950 LTV, which means **the sign-up fee is excluded**. Including it, blended revenue per client is **RM3,202**. |
| LTV to CAC | RM2,952 ÷ RM250 = 11.8x, ÷ RM180 = 16.4x. The quoted 12x to 16x is right, and slightly conservative once the sign-up fee counts. |
| Capacity at 20 active | 20 × 2 sessions = 40 of 130 hours, **31% utilization** |
| Theoretical ceiling | 130 ÷ 2 = **65 clients**. The client's 50 to 65 estimate is consistent. |
| Steady state for 20 active | 20 ÷ 6 weeks = **3.3 sign-ups a week** |
| What 10 sign-ups a week builds to | 10 × 6 = **60 active**, which matches the client's own flag |
| Budget sizing | RM3,000 to RM4,500 a month at RM180 to RM250 CAC buys 12 to 25 sign-ups a month, or **2.8 to 5.8 a week**. Correctly sized for the 20-active target. |
| Filling capacity | About 43 sign-ups a month at RM180 to RM250 = **RM7,700 to RM10,800 a month**, matching the client's RM7,000 to RM10,000 estimate. |

**One small inconsistency to fix before it appears in a client-facing document.** The brief quotes RM10,000 to RM13,500 over the first three months, but three months at RM3,000 is RM9,000, not RM10,000. The upper bound is correct.

## The commercial argument this brief contains

Moving from 20 active clients to roughly 60 is about **RM92,000 a month of additional package revenue for about RM4,500 a month of additional media**. At 20 active the clinic uses under a third of its capacity. This is the point to lead with when the client revisits budget.

Caution on the ceiling: 130 hours already assumes each of three people bills about 43 hours a week with nothing left for admin, and unbilled walk-in assessments draw from the same pool. At ten sign-ups a week the team is also absorbing 15 to 25 assessment slots once no-shows are counted. The practical ceiling is likely closer to 45 or 55 than 65.

## Open items with the client

1. Is "10 a week" a lead target or a sign-up target? Ten sign-ups a week is about 60 active, three times the stated target.
2. Is 20 active the goal or the floor? Filling capacity still works economically at roughly RM7,000 to RM10,000 a month.
3. Two locations: split the budget or start with one? The recommendation is to prove CAC in one and then clone. Note that both currently sit in a single ad set.
4. **The three-month contract contradicts the six-week cycle.** A 12-session package runs six weeks. If clients genuinely stay 12 weeks, holding 20 active needs only 1.7 sign-ups a week, and ten a week would imply 120 active, roughly double the ceiling. Either repurchase is unaccounted LTV upside, or the contract is nominal. This was not in the original brief and matters as much as item 1.
5. **Nobody has the show-up rate.** See `KPI.md`. This is the single most important missing number on the account.

## What the brief does not cover

- Existing ad accounts, pixel or GA4 state, and how leads are handled once they arrive.
- The state of kynare.com and whether it can convert traffic.
- Whether the three practitioners will appear on camera. For an education-first clinic this is the obvious creative engine, and losing it forces generic stock-led ads that will struggle to hold CAC at RM180.
- Toggle's own fee. The brief models media only, and `brain/pricing/rate-card-my.md` is entirely TBD, so no retainer number can be anchored from the repo.
