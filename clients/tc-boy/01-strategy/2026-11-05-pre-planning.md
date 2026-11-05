---
client: TC Boy
slug: tc-boy
doc: pre-planning ahead of the 2027 proposal deck
date: 2026-11-05
status: internal working draft
---

# TC Boy 2027: pre-planning

This is the internal groundwork for the 2027 proposal deck. It covers what TC Boy asked for, what their digital presence looks like today, the market they want to enter, the plan shape we would pitch, a budget frame for RM200,000, and the questions we need answered before we commit to numbers. All findings are as of 5 November 2026. Items marked **[unverified]** still need a manual check.

---

## 1. Headline findings

1. **Nobody in Malaysian canned fish owns fitness.** Ayam Brand calls its tuna "an excellent and affordable source of lean protein", but it has no gym, athlete or race partnership. Yeo's is pushing flavor (Teriyaki Tuna, October 2026). The fitness lane is open.
2. **TC Boy's online store is built for wholesale buyers.** Tuna and sardines sell only by the carton (48 × 150g tuna at RM326.40, 24 × 425g sardines at RM199.20). Shoppers must register with an OTP before they can add anything to the cart. A gym-goer who wants to try six cans has no way to buy them.
3. **TC Boy has no official marketplace presence we could find.** We found no Shopee Mall, LazMall or live TikTok Shop storefront. One Lazada reseller sells the 150g spring water tuna at RM15.99, more than twice TC Boy's own RM6.80 per can. The TikTok account is already flagged as a seller account, so TikTok Shop is close to ready.
4. **There is no ad tracking.** The site has GA4 only. It has no Meta Pixel, no TikTok pixel and no tag manager, so any paid media we run today cannot be optimized for sales.
5. **The protein story has no proof on the page.** Product pages say "high in protein" but show no grams and no nutrition panel. The site has seven articles in total, and none of them are about fitness.
6. **Their social audience is small and quiet.** Instagram has 4,262 followers, and TikTok has 7,653 followers across 429 videos at about 45 likes per video. The YouTube channel has been dormant for about three years.
7. **Threads is an open lane for a canned-food voice.** Watsons, Lotus's, KFC, Mydin and other Malaysian brands have turned Threads into a banter channel, but we found no canned-fish brand active there. Malaysians are already talking about canned sardines as "broke guy protein". Threads ads reach only 3.6 million Malaysians and must run alongside Instagram, so the play is organic voice first, with a small paid test. See `2026-11-05-threads-playbook.md`.

---

## 2. The brief as we understand it

| Item | What we know | Still to confirm |
|---|---|---|
| Ask | Online marketing, plus getting their e-commerce up to speed (own site and marketplaces) | Whether "up to speed" means fixing the current site or rebuilding it |
| Horizon | Calendar year 2027 | Start date. Ramadan and CNY both land in February 2027, so a January start is tight. |
| Budget | RM200,000 for the year, with a mid-year checkpoint to decide on an increase | Whether the figure includes media spend, creator fees and production |
| Direction | Shift the brand toward a healthier, high-protein lifestyle and the fitness market | Whether this applies to the whole brand or to a sub-line, and whether new SKUs are planned |
| Why Toggle | Our online marketing expertise | Who referred them, and who else is pitching |

---

## 3. Where TC Boy stands today

### Company
TC Boy Marketing Sdn Bhd sits in Bukit Mertajam, Penang, under Tropical Consolidated Corporation (Tropical Group), which owns the TC BOY trademark. The brand's founding story is inconsistent. The site says "since the 1990s", Instagram says "Since 1991", and the company registration points to 1973. They distribute to Malaysia, China, Hong Kong and "the Far East", and their TikTok bio reads "Homegrown Halal Canned Food".

### Own site (tcboy.com)
| Area | Finding |
|---|---|
| Platform | Custom Next.js front end on nginx, with a separate admin and API at admin.tcboy.com that looks like Laravel. It is not Shopify or WooCommerce. |
| Catalog | 43 SKUs, about 20 of them third-party brands they distribute (Bumble Bee, Roda, Victoria, Rose and Banana syrups). There is no mackerel SKU even though the homepage mentions mackerel. |
| Pack sizes | Tuna and sardines sell by the carton only. Sea coconut (RM11.50 to RM11.90) and pineapple (RM6.80) sell as single cans. |
| Stock | Thin. EVOO tuna shows zero, and most tuna flavors show 10 to 30 cartons. |
| Checkout | OTP registration is required before add to cart. Payment goes to an external gateway we have not identified. Shipping takes 7 to 8 days to Peninsular Malaysia and 8 to 10 days to East Malaysia, priced by weight. No self-collection and no refunds. |
| SEO | Every page carries the same title ("TCBOY") and the same meta description, although the back end already stores per-product meta titles. There is no schema, no canonical tag and no working robots.txt (it returns a 404 page marked noindex). Listing and article pages render "Loading..." to crawlers. The site is English only. |
| Legacy | The 2018 site is still live at tcboy.tropicalgrp.com, which duplicates content and splits search signals. |
| Tracking | GA4 (G-NKS2R9JRTS) only. No GTM, Meta Pixel or TikTok pixel. |
| Speed | The server responds fast (about 0.3s to first byte), and the page loads about 1MB of JavaScript. We have not run a lab test yet. |

### Marketplaces
| Channel | Finding |
|---|---|
| Shopee | We found no official store. Shopee blocked automated checks. **[unverified, check in app]** |
| Lazada | A third-party seller, "Emporium Mall", lists 150g tuna at RM15.99. A trending listing shows mineral water tuna at RM6.90 with 122 sold in 30 days, seller unknown. We found no LazMall store. **[partly verified]** |
| TikTok Shop | The @tcboy.official account is flagged as a seller account. We have not confirmed whether a storefront is live. **[unverified]** |
| Grab, PandaMart, Lotus's, AEON, Jaya Grocer, Mydin online | No indexed listings found. **[unverified]** |

### Social
| Channel | Followers | Activity |
|---|---|---|
| Instagram @tcboymalaysia | 4,262 | About weekly. Hampers, giveaways, recipes, toast and sandwich clips. No fitness content. |
| TikTok @tcboy.official | 7,653 (19.4K total likes) | 429 videos, about 45 likes each. |
| YouTube TCBoyMalaysia | 143 | 69 videos, last upload about three years ago. |
| Facebook | Two pages: an older facebook.com/TCBoyMalaysia and a 2024 profile | Follower counts not verified. **[unverified]** |

---

## 4. Market and competition

### Competitors
| Brand | Position | Protein or fitness angle | Marketplace |
|---|---|---|---|
| Ayam Brand | Category leader in sardines and tuna since 1892 | Uses "lean protein" language and pitched its 2024 canned chicken for "a fitness journey". Fitness appears only in CSR workshops. | Official Shopee and Lazada stores |
| Yeo's | Flavor innovation (Teriyaki Tuna, Oct 2026) | None | Not checked |
| King Cup | Claimed about 30% of local sardine and mackerel in 2018 | None found | Not checked |
| Adabi | Heritage spice brand with sardine curry | None | Not checked |
| Rex | Penang rival in tuna, halal certified | None found | Not checked |

The Philippine precedent is Century Tuna, which built "Superbods", a fitness contest, and turned canned tuna into a gym food over many years. Ligo did a similar ambassador play in the Philippines. Neither brand runs this in Malaysia.

### The fitness audience
- Gym membership in Malaysia remains low. Statista models user penetration at 16.5% in 2025, rising to 19.4% by 2030, and Anytime Fitness describes penetration as "single digits".
- The growth signals are strong. Anytime Fitness opened its 100th Malaysian club in January 2026 and targets another 100. The KL Standard Chartered Marathon drew a record 42,000 registrations in 2025 and sold out in under four hours. HYROX holds its first Kuala Lumpur race on 12 and 13 December 2026 at MITEC.
- Protein is going mainstream in Malaysian FMCG. Recent examples are Dutch Lady Protein+, Marigold HL Advance, Farm Fresh high-protein malt and Starbucks Protein Cold Foam (June 2026).
- Our working read: the core buyer is a wider group than gym members. It is the active Malaysian who runs, plays futsal or badminton, or is cutting weight, and who wants protein without cooking or spending RM8 on a protein bar.

### E-commerce context
- Ipsos (2026) puts Shopee at 71% of online shoppers and TikTok Shop at 62%, up from 43% in 2024. 47% of online shoppers now buy groceries online, up from 34%.
- E-commerce is still only about 3% of Malaysian FMCG value (Bain and NIQ). Most canned fish volume will keep moving through modern and general trade. Online is where TC Boy can rebuild the brand and test new packs. It will not replace their retail volume in 2027.

### Product economics (our estimates, to confirm with TC Boy)
- A 150g can of tuna in water drains to roughly 105 to 110g and should carry about 25g of protein. We need TC Boy's nutrition panels to confirm per-SKU figures.
- At RM6.80 a can, that is about RM0.27 per gram of protein. A RM8 protein bar with 20g works out to about RM0.40 per gram. Raw chicken breast costs less per gram, so price is the wrong fight. Convenience is the better claim: no cooking, no fridge, ready to eat in the gym bag.
- Cans are heavy. Shipping single cans by weight kills the margin, so the online offer should be multi-packs (6, 12 and 24 cans) with an average order value around RM40 to RM80.

---

## 5. Strategic thesis (draft)

**TC Boy becomes the everyday protein of active Malaysians: halal, homegrown, and ready the moment you open the can.**

We should build the year on four moves.

1. **Fix the shop before buying traffic.** Install tracking, open official stores on Shopee, Lazada and TikTok Shop, and add consumer pack sizes. Q1 work.
2. **Give the protein claim a number and a product.** Put protein grams on every listing, and launch a "protein pack" bundle (for example, a 12-can mix of mineral water, EVOO and lemon pepper tuna plus sardines). The tuna range is the hero. Sea coconut, pineapple and the distributed brands stay out of the fitness story.
3. **Borrow credibility from people who train.** A tiered creator program of mid-size fitness creators, running clubs and HYROX athletes, paid partly through TikTok Shop affiliate commission so spend tracks sales.
4. **Keep the family buyer.** The existing audience buys hampers for Ramadan and CNY. The fitness push sits on top of that base and does not replace it.

### Audiences
| Segment | Who | Job TC Boy does | Main channels |
|---|---|---|---|
| Active Malaysians (new) | 20 to 35, gym, running, futsal, weight loss | Quick, no-cook protein for meal prep and after training | TikTok, TikTok Shop, Instagram, Shopee |
| Home cooks (core) | 30 to 50, family meal planners | Pantry staple, festive hampers | Facebook, Shopee, Lazada, retail |
| Students and young workers (bridge) | 18 to 25 on tight budgets | Cheap protein for hostel and office lunches | TikTok, Shopee |

### Hero SKUs for the fitness story
Tuna in mineral water, brine, EVOO and sunflower oil, plus lemon pepper and garlic herb tuna as the flavor options. Sardines carry the omega-3 story. We should avoid the mayo tuna variants and baked beans in fitness messaging until we see their nutrition panels.

---

## 6. Compliance guardrails (Malaysian Food Regulations 1985)

These shape every caption, creator script and listing, so they belong in the deck as a sign that we have done the homework.

- **"Source of protein"** needs at least 10% of the NRV per 100g. **"High in protein"** needs at least twice that. Under a 50g NRV this works out to roughly 5g and 10g per 100g; we still need to confirm the figure against the Fifth A Schedule text. Plain tuna clears this easily. Sauced sardines and baked beans may qualify only as "source of", so each SKU needs checking.
- **Permitted protein function claims** (Reg 18E) are limited to wording such as "Protein helps build and repair body tissues" and "Protein is essential for growth and development". Muscle gain, recovery and performance claims are not on the permitted list and would need Reg 18F approval. Creators must stay inside the same limits.
- The word "health" cannot appear on labels (Reg 18(3)), and no disease prevention claims are allowed anywhere.
- Comparative claims such as "more protein than X" need at least a 25% difference (Reg 18D).
- Ads need no pre-approval, but the Ministry of Health polices misleading health claims on social media. We follow the ASA Malaysian Code of Advertising Practice.

---

## 7. The year in four quarters (draft)

Key dates for 2027: CNY around 6 February. Ramadan runs from about 8 February to 9 March, with Raya about 10 March. Monthly double-date sales (3.3 through 12.12) and payday around the 25th. Merdeka is 31 August.

| Quarter | Theme | What happens | Commercial moments |
|---|---|---|---|
| Q1 (Jan to Mar) | Foundation and festive | Tracking (GTM, Meta Pixel and CAPI, TikTok pixel). Official stores live on Shopee, Lazada and TikTok Shop. Bundles and consumer packs. Quick SEO fixes on the site. Festive hampers for the core buyer. First creator seeding. Threads persona launched. | CNY, Ramadan and Raya, 3.3 |
| Q2 (Apr to Jun) | Protein launch | Launch the protein pack and the "everyday protein" campaign. Creator program scales. Run club and race partnerships. Fitness recipe content on the site and on TikTok. | 4.4, 5.5, 6.6. **Mid-year checkpoint at end of June.** |
| Q3 (Jul to Sep) | Scale what worked | Put H2 money behind the winning channels and creators. Merdeka "homegrown protein" angle. GMV Max on TikTok Shop. | 7.7, 8.8, Merdeka, 9.9 |
| Q4 (Oct to Dec) | Peak and proof | Mega sales. Year-end gym and hamper bundles. A possible HYROX KL 2027 tie-in if the event returns. Year-one results write-up. | 10.10, 11.11, 12.12 |

Q1 is the hardest quarter. The festive peaks arrive in February, just weeks after kickoff, so the marketplace stores and tracking matter more than the site rebuild in the first 60 days. Any deeper site work (guest checkout, BM version, server-rendered listings) runs in parallel and ships in Q2.

---

## 8. Budget frame

Our MY rate card (`brain/pricing/rate-card-my.md`) is still marked TBD for retainers, so the fee lines below are working assumptions for Viknesh and Zaid to price. They are not quotes.

### Revised 2026-11-06: paid media led, RM200,000 all-in
Yi Yang's direction on 6 November: paid media carries the plan, and everything fits inside RM200,000. Half the budget goes to working media.

| Bucket | RM | Share | Notes |
|---|---|---|---|
| Paid media | 100,000 | 50% | Working media across TikTok, Shopee, Lazada, Meta, Threads and Google |
| Agency management (12 months) | 48,000 | 24% | Strategy, paid media management, marketplace operations, Threads community management, monthly reporting. About RM4,000 a month. |
| E-commerce setup (one-off, Q1) | 18,000 | 9% | Tracking (GTM, Meta Pixel and CAPI, TikTok pixel), three official stores, listing content, priority site SEO fixes |
| Content and creative production | 18,000 | 9% | Two shoot days, recipe and fitness videos, marketplace visuals, ad variants |
| Creator seeding | 16,000 | 8% | Product packs and flat fees for fitness creators. TikTok Shop affiliate commission is paid out of each sale, so it never draws on this budget. |
| **Total** | **200,000** | | H1 about RM106,000, H2 about RM94,000 |

### Paid media by platform (RM100,000)
| Platform | RM | Share | Job |
|---|---|---|---|
| TikTok Ads, GMV Max and Spark Ads | 36,000 | 36% | Main sales and discovery engine. GMV Max drives TikTok Shop, and Spark Ads boost creator posts. |
| Shopee and Lazada ads | 26,000 | 26% | Search ads on "tuna", "high protein" and "makanan tin", plus sale-day boosts on the official stores |
| Meta: Facebook and Instagram | 22,000 | 22% | Family buyer and festive hampers, Advantage+ catalog, retargeting, and Collaborative Ads with Shopee and Lazada if available |
| Google Search and Shopping | 10,000 | 10% | Brand terms and protein search intent to the site and stores |
| Meta: Threads placement tests | 6,000 | 6% | Two tests, Q2 and Q4. See `2026-11-05-threads-playbook.md`. |
| **Total** | **100,000** | | |

By objective, about 60% goes to sales (GMV Max, marketplace ads, catalog), 25% to consideration (creator Spark Ads, video views among fitness audiences) and 15% to reach and tests.

### Monthly flighting (RM, paid media only)
| Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 5,000 | 10,000 | 9,000 | 8,000 | 6,000 | 8,000 | 6,000 | 8,000 | 9,000 | 9,000 | 12,000 | 10,000 |

H1 media totals RM46,000 and H2 RM54,000. February and March carry CNY, Ramadan and Raya. April carries the protein pack launch. November carries 11.11, the largest sale day of the year.

### What RM100,000 of media should return (illustrative)
These ranges assume a blended return of 3x to 5x on spend that is measured against sales. That spend is about RM60,000 of the RM100,000. It points to RM180,000 to RM300,000 of attributable online sales in 2027. We will replace this with a forecast once TC Boy shares its 2026 online baseline, margins and average order value.

### If the RM200,000 excludes media
Media would sit on top at RM8,000 to RM12,000 a month. The RM100,000 freed inside the budget would fund a larger creator program, more content volume and a deeper site rebuild (guest checkout, BM version, server-rendered listings).

### Mid-year checkpoint (proposed)
Review in the first week of July on January to June data. We should agree the gates with TC Boy upfront, so the extra budget becomes a decision rule rather than a negotiation.

| Gate | Indicative target (set once we have their baseline) |
|---|---|
| Foundation | Official stores live on three platforms by end of February. Tracking verified by end of January. |
| Commercial | Online GMV run-rate versus baseline. Marketplace ads ROAS at or above an agreed floor. |
| Product | Protein pack share of online orders. Repeat purchase rate. |
| Brand | Share of TikTok and Instagram content tagged fitness. Creator content views and engagement. |

**Proposed rule:** if TC Boy hits the foundation gate and two of the other three, they add RM30,000 to RM60,000 of paid media to H2 for 9.9 through 12.12, with no change to fees. If not, H2 runs at base and we move media toward the channels that cleared the gates.

---

## 9. Proof we can bring, and the gap

- **Strong fits:** Al Hidayah (TikTok Shop, 11.5x ROI, +300% revenue in four months through GMV Max and affiliates), EduKids (6x TikTok ROAS, a new website taken to RM14,000 a month at a 5.5% conversion rate) and Kualesa (test-before-scale, +45% ROAS). See `brain/case-studies/`.
- **The gap:** `brain/case-studies/PROOF-GAPS.md` records that we have no FMCG case. TC Boy is FMCG. We should frame the pitch around the parts of their problem that look like our e-commerce cases (marketplace stores, TikTok Shop, a new DTC site) and stay honest that brand-lift measurement in retail is new for us. HWC is the nearest F&B reference if that work has gone live; check its status before citing it.

---

## 10. Risks

1. **Channel conflict with retail.** Cheaper online bundles could upset modern trade partners and distributors. We need TC Boy's price policy before we design offers.
2. **Fulfillment.** Who packs marketplace orders, and can stock hold? Thin carton stock today suggests operations may be the bottleneck.
3. **Site control.** A custom build means every fix depends on their developer, so we need to know who that is and how fast they move.
4. **Claim compliance.** One creator saying "builds muscle" puts the brand at risk, so creators need scripts and approval.
5. **Budget stretch.** RM200,000 all-in across five workstreams spreads thin. We may need to sequence workstreams rather than run all of them from January.
6. **Brand split.** A fitness push could alienate the core family buyer if we push too hard. We keep both lanes running.

---

## 11. Questions for TC Boy (discovery call)

**Budget and goals**
1. Does RM200,000 include media spend, creator fees and production?
2. What would make 2027 a success for you: online revenue, brand perception, retail sell-through, or something else?
3. What would you need to see at the mid-year checkpoint to increase the budget, and by how much?

**Channels and sales**
4. What are your current sales by channel (modern trade, general trade, export, marketplace, own site)? What did online bring in during 2026?
5. Do you run any official marketplace stores today? Who is the RM6.90 Lazada seller, and do you have authorized resellers?
6. What is your online price policy relative to retail?

**E-commerce and operations**
7. Who built and maintains tcboy.com, and will we get developer access? Which payment gateway do you use?
8. Why does the site sell tuna by the carton only? Is that deliberate (B2B buyers) or a stock decision?
9. Who will fulfill marketplace orders, and from which warehouse? What is your stock buffer for sale days?
10. Are the distributed brands (Bumble Bee, Roda, Victoria) in scope for us?

**Product and brand**
11. Can you share nutrition panels and lab data for each SKU (protein grams per can)?
12. Are new SKUs planned for the protein push (pouches, ready-to-eat bowls, high-protein variants)?
13. Is the fitness direction for the whole brand or for a sub-line? Do you have brand guidelines?
14. Is your halal certification current across all SKUs? Should we lead with it?

**Process**
15. Who decides, what is the timeline, and who else is pitching?
16. Are export markets (China, Hong Kong) in scope, or only Malaysia?

---

## 12. Our to-do before the deck

- [ ] Check Shopee, Lazada and TikTok Shop in the apps for official stores, resellers, prices and sold counts.
- [ ] Check both Facebook pages for followers and activity, and check the Meta Ad Library for any live TC Boy ads.
- [ ] Check Meta Ad Library and TikTok Creative Center for Ayam Brand and Yeo's creative.
- [ ] Run a PageSpeed test on tcboy.com on mobile.
- [ ] Confirm the Fifth A Schedule protein NRV figure on the MOH food safety site.
- [ ] Shortlist 10 to 15 fitness creators (Modash list as a start: @kesavan70, @rayneeshwaran, @dr.hanujah, @darrentheho__, @dineshnair) and check them for halal and food-brand fit.
- [ ] Viknesh and Zaid to price the fee lines in section 8.
- [ ] Book the discovery call to answer section 11, at least questions 1, 4, 5, 7 and 11.
- [ ] Run the Threads checks in `2026-11-05-threads-playbook.md`, section 7 (competitor handles, live protein conversations, Ads Manager options).

---

## 13. Draft deck storyline

Built to the house style for short client decks, with one claim per slide.

1. TC Boy has the protein, but nobody online knows it yet.
2. Nobody in Malaysian canned fish owns fitness, and Ayam Brand has not taken it either.
3. Active Malaysians are a growing audience that wants protein without cooking.
4. Today a gym-goer cannot buy six cans of TC Boy online.
5. Resellers set TC Boy's marketplace price, and some charge more than double.
6. Without tracking, every ringgit of ads would run blind.
7. Our thesis: the everyday protein of active Malaysians.
8. The year in four quarters, starting with the shop.
9. The protein pack and the creator program.
9a. Malaysians already call canned sardines "broke guy protein" on social, and TC Boy should be the brand that answers them on Threads.
10. Staying inside Malaysian food claim rules.
11. How RM200,000 splits, and what the mid-year checkpoint decides.
12. What we have done for e-commerce brands like this.
13. The first 90 days.

---

## Sources

- TC Boy site and product feed: https://tcboy.com/en, https://tcboy.com/en/shipping-return
- Trademark owner: https://trademarks.justia.com/owners/tropical-consolidated-corporation-sdn-bhd-804644
- Lazada reseller listing: https://www.lazada.com.my/products/tc-boy-tuna-solid-in-spring-water-150g-i1418964718.html
- Lazada trending page: https://www.lazada.com.my/trending/Canned-Fish-Seafood-Top-Deals-This-Month/17979664
- Ayam Brand protein positioning: https://www.malaysianfoodie.com/2024/11/ayam-brand-introduces-first-canned-ayam-carik-or-quicktasty-healthy-meals.html
- Ayam Brand 2025 contest: https://www.malaysianfoodie.com/2025/09/ayam-brand-brings-abundance-with-peraduan-menang-lain-macam.html
- Yeo's Teriyaki Tuna: https://www.thestar.com.my/aseanplus/aseanplus-news/2026/10/03/039itadakimasu---tuna-with-a-twist039-malaysias-first-ever-teriyaki-tuna-takes-flavours-beyond-the-familiar
- Century Tuna Superbods: https://brandwiki.lazada.com.ph/century/
- Anytime Fitness growth: https://www.freemalaysiatoday.com/category/leisure/2026/01/26/anytime-fitness-accelerates-growth-in-malaysia
- KLSCM 2025: https://thesun.my/home-news/klscm-2025-draws-record-number-of-runners-AH15034602
- HYROX Kuala Lumpur: https://says.com/my/lifestyle/hyrox-is-coming-to-malaysia-this-december
- Ipsos 2026 platform usage: https://www.malaymail.com/news/money/2026/07/16/tiktok-shop-closes-in-on-shopee-as-usage-rises-to-62pc-among-malaysian-online-shoppers-ipsos-survey-finds/227842
- E-commerce share of FMCG: https://marketingmagazine.com.my/?p=140853
- Food Regulations 1985 (WTO copy): https://www.importlicensing.wto.org/sites/default/files/members/91/Regulation%20No.437%20-%20Food%201985_01.01.2014.pdf
- Malaysian fitness creators: https://www.modash.io/find-influencers/malaysia/fitness
