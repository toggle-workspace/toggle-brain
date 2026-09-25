---
client: The new silk house (via COO)
slug: coo-new-silk-house
geo: my
status: prospect
stage: research
practice: strategy
currency: MYR
mrr: TBD
credit_pending: TBD
account_lead: TBD
last_reviewed: 2026-09-02
---

# The new silk house (via COO)

Toggle works through COO on this account. The client is not a direct Toggle client, so every
deliverable here ships to COO.

The client is a new Malaysian silk scarf venture. It has no brand name yet, so this folder and every
deliverable in it say "the house" throughout. Swap the name in once it lands. The client wants the
brand to read as high end, exclusive and locally designed, and its silk is woven in China. COO is
pitching branding services and asked Toggle for the market and commercial research underneath it.

**Arzu is a reference, not the client.** COO confirmed on 2 September 2026 that the client pointed to
[Arzu](https://arzuscarf.com/) as the brand it wants to be like. Arzu appears throughout the research
as a reference case and as a competitor. Toggle has no relationship with Arzu.

## Contacts
- **Primary:** COO · agency partner
- **Billing:** TBD
- **Decision-maker:** unnamed, through COO

## Scope

- **COO owns:** the client relationship, branding and creative.
- **Toggle owns:** competitor mapping, market sizing, audience definition, positioning
  recommendation, talking points and the online sales method.

Requested by COO: competitors (local and international), market size, talking points, target
audience, marketing angle, and a method for online sales.

- **Engagement model:** see `brain/process.md`
- **Start date:** 2026-09-01
- **Renewal / review date:** after the COO pitch outcome

## The brief as received

The client wants to sell silk squares in 90x90cm and 110x110cm formats to Malaysian T20 buyers,
positioned as expensive and exclusive. Stock is sourced from Chinese mills and the client wants the
product to read as locally made, following the angle it sees in Arzu.

## What the research changed

The client picked a good reference for the wrong reason. Arzu is worth studying for what it took to
build, not for what it looks like finished.

1. **Arzu's price is carried by time, an address and a founder.** Thirty years of trading, a KLCC
   store, and a Turkish-born founder with a story no competitor can copy. A brand launching in 2026
   can buy none of the three.
2. **Even with all of that, Arzu stops at RM899** and sells Buy 1 Free 1 at RM69 on the same site.
   Heritage on its own does not set a price.
3. **The blocker for a launch is permission, not sourcing.** Nothing about a brand nobody has heard
   of gives a T20 buyer a reason to spend four figures.
4. **Nobody in this market has launched at four figures.** dUCk took four years to reach RM800 and
   five to reach RM1,000. Naelofar was still selling RM73 turbans four years in. Buttonscarves
   started from a home office on roughly RM11,000. All three built an audience first and raised the
   price second.
5. **On origin, say designed in Malaysia and make it true.** A "made in Malaysia" claim carries
   Trade Descriptions Act 2011 exposure of up to RM15,000 per item for a company.

## Recommendation on the table

Launch narrow and cap the first edition. One silk line in 90x90cm and 110x110cm, hand rolled, momme
published, every piece numbered, priced RM1,200 to RM1,800 in the gap between the RM899 Malaysian
ceiling and Ferragamo's RM1,002 local entry point. Cap the run at 100 to 150 pieces, publish the
number, never restock. At that size the house needs 150 buyers rather than a market, which is what
makes an opening price no local brand has launched at defensible.

Underneath it sits the proof stack: an original print archive, a published edition cap, a named
designer, and one physical room. Those four replace the equity Arzu accumulated over thirty years.

## Deliverables

- `01-strategy/new-silk-house-market-and-positioning-research-2026-09-02.pptx`: 19 slide research
  deck for COO, built on the `bru-hwc` design system. Source links and check dates sit in the
  speaker notes of every slide.
- `01-strategy/research-notes-2026-09-02.md`: the findings and every source.
- `01-strategy/_build/build-deck.js`: pptxgenjs build script. The .pptx is the master and is
  hand-editable. The script exists for regeneration only, and needs `pptxgenjs` available on
  `NODE_PATH`.
- `01-strategy/new-silk-house-social-plan-2026-09-23.pptx`: 12 slide paid and organic social plan
  for year one, requested by COO on 23 September 2026. It recommends RM108K in media (Meta 50%,
  TikTok 30%, Google Search 20%) across 3 awareness, 3 consideration and 6 conversion months. The
  client chose ongoing sales, so the plan replaces the research's single capped edition with
  numbered batches for each print. Conversion campaigns send buyers to the website to buy online,
  replacing the research's WhatsApp sales route. The master copy went to Jordan's Desktop. It is rebuilt by
  `01-strategy/_build/build-social-plan.js`, which needs `pptxgenjs` and `@resvg/resvg-js` on
  `NODE_PATH`.

## Open items

- **Confirm the design work genuinely happens in Malaysia.** The whole origin recommendation rests
  on it. If the prints also come off a mill catalog then "designed in Malaysia" has nothing true
  underneath it and the first pillar of the proof stack disappears.
- The brand has no name, founder story, unit cost or launch date. Each one moves the plan.
- Buttonscarves silk square pricing in ringgit is unverified. Their collection pages returned errors
  on every attempt.
- Confirm with COO whether the house gets its own design system or continues on `bru-hwc`.
- Rename this folder from `new-silk-house` once the brand name is confirmed.
