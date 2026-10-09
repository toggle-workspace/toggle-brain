---
client: voicerun
platform: linkedin-ads, ga4
audit_date: 2026-08-28
data_window: "LinkedIn: campaigns created 2026-08-08, first delivery 2026-08-12, report through 2026-08-27 (16 days of delivery). GA4: 2026-07-15 to 2026-08-27."
currency: USD
auditor: Toggle Solutions
access_level: Report exports and account screenshots. No live account access.
status: internal working layer, not client facing
sources:
  - "[Voicerun.ai] Observation and Insights into Ad Account and GA4.pdf (internal, 17 embedded screenshots extracted)"
  - "LinkedIn Ads Report (8 - 27 Aug 2026).csv (95 daily ad rows, UTF-16, 102 columns)"
  - "LinkedIn Ads Demographic Report (8-27).csv (11 segments, top 25 rows each)"
  - "GA4 screenshots: recent events, traffic acquisition, user acquisition, country, event breakdown (2 screens), landing pages"
related: 2026-08-27-google-ads-audit-verified-data.md
---

# VoiceRun LinkedIn Ads and GA4: verified data layer

Companion to the Google Ads file. Same rule applies: every figure recomputed from the
exports and screenshots, and the internal deck stays internal.

## Combined paid picture

| | Google Ads | LinkedIn Ads | Total |
|---|---|---|---|
| Window | 15 Jul to 27 Aug (44 days) | 12 Aug to 27 Aug (16 days) | |
| Spend | $2,377.56 | $1,101.89 | $3,479.45 |
| Impressions | 9,890 | 21,258 | 31,148 |
| Clicks | 903 (130 on intent traffic) | 47 | 950 |
| Cost per site visit | $14.04 on intent traffic | $38.00 per landing page click | |
| Platform-reported conversions | 0 | 0 | 0 |
| Daily budget now | $49 | $67 | $116, about $3,480 a month |

Against Lawrence's $5,000 to $7,500 monthly envelope, the two accounts together run at
roughly 46 to 70 percent of budget. That is a better position than Google alone
suggested, and it means the money is available to act on the findings below.

## LinkedIn account totals

$1,101.89 spent, 21,258 impressions, 47 clicks, 0.22 percent CTR, $51.83 CPM, $23.44
CPC, 18,732 people reached at a frequency of about 1.1. Twenty nine clicks reached the
landing page, at $38.00 each. Zero conversions and zero leads.

The account holds three campaigns. Only two spent anything, so there is a third to ask
about.

## Finding 1: the objective choice created a 5.3 times CPM gap

| | Enterprise \| Cold \| 2026-Q3 | Graduation \| Cold \| 2026-Q3 |
|---|---|---|
| Objective | Website visits | Video views |
| Bid strategy | Maximum Delivery, CPM billing | Maximum Delivery, CPM billing |
| Daily budget | $40 | $27 |
| Audience | Ops-NA: contact center directors, VP CX, VP Ops, COO, Director of Ops. 201 to 10k+ employees. About 180,000 people. | TechBuyer-NA: CTO, heads, managers, principal engineers, directors, VPs, AI engineers. 11 to 10k+ employees. About 350,000 people. |
| Spend | $659.45 | $442.45 |
| Impressions | 4,687 | 16,571 |
| Clicks | 23 | 24 |
| CTR | 0.49% | 0.14% |
| CPM | $140.70 | $26.70 |
| CPC | $28.67 | $18.44 |
| Landing page clicks | 23 | 6 |
| Cost per landing page click | $28.67 | $73.74 |
| Video views | 1,847 | 6,065 |
| Cost per video view | $0.36 | $0.07 |
| Conversions | 0 | 0 |

Enterprise took 60 percent of the money for 22 percent of the impressions. Two causes
run together: the Website visits objective buys more expensive inventory than Video
views, and the operations audience costs more per impression than the engineering one.
Both are worth knowing, and the second is a structural cost of selling to ICP 1.

One fairness note for the client facing version. Judging the Graduation campaign on
CTR judges it on a metric it was not buying. It bought views at $0.07 each, which is
cheap. The real question is whether those views are worth anything, and Finding 2
answers that.

## Finding 2: the average person watched 2.6 seconds of a 21 to 32 second video

| Stage | Count | Share of plays |
|---|---|---|
| Video plays | 23,106 | 100% |
| Video views (LinkedIn counts a view early) | 7,912 | 34.2% |
| Reached 25% | 1,825 | 7.9% |
| Reached 50% | 759 | 3.3% |
| Reached 75% | 468 | 2.0% |
| Completed | 335 | 1.4% |

Total watch time was 59,959 seconds across 23,106 plays, so 2.6 seconds per play.
Cost per completed view was $3.29.

So the 6,065 "views" the Graduation campaign bought at $0.07 are mostly a fraction of
a second of a muted autoplay in a feed. The view metric flatters the campaign, and the
completion funnel is where the honest number sits.

## Finding 3: GA4 says LinkedIn traffic spends 2 seconds on the site

From the GA4 user acquisition report for 15 July to 27 August:

| First user channel | Users | Avg engagement time per user | Engaged sessions per user | Returning users |
|---|---|---|---|---|
| Email | 6,443 | 11s | 0.62 | 1 |
| Direct | 1,268 | 1m 59s | 0.92 | 113 |
| Paid Search | 743 | 11s | 0.37 | 22 |
| Organic Search | 275 | 59s | 0.80 | 71 |
| Organic Social | 122 | 55s | 0.63 | 15 |
| Referral | 63 | 1m 30s | 1.03 | 7 |
| **Paid Social** | **41** | **2s** | **0.05** | **0** |
| Paid Other | 13 | 0s | 0.08 | 0 |

Site averages are a 54.32 percent engagement rate and 29 seconds per user. Paid Social
sits at an 8.33 percent engagement rate and 2 seconds, with four engaged sessions out
of 48, and not one returning visitor.

Stated plainly: $1,101.89 of LinkedIn spend bought 41 site visitors who stayed two
seconds each.

## Finding 4: every LinkedIn ad points at the homepage

All six ads use `https://voicerun.com/` as the click URL. There is no matched landing
page for either audience, no lead form, and no page that answers what the ad promised.
The UTM tagging is clean, which is the part the deck credits correctly.

Combined with Finding 3, this is the whole explanation for zero LinkedIn conversions.
The ads are asking a contact center director to land on a generic homepage and find
their own way to a demo request.

## Finding 5: at $28.67 a click, LinkedIn cannot reach $500 a meeting through the homepage

The break-even arithmetic, using Lawrence's confirmed $500 ceiling:

| Channel | Cost per site visit | Click to meeting rate needed |
|---|---|---|
| Google Ads, intent traffic | $14.04 | 2.81% |
| LinkedIn, Enterprise campaign | $28.67 | 5.73% |
| LinkedIn, Graduation campaign | $73.74 | 17.5% |

Cold LinkedIn traffic landing on a homepage does not convert at 5.73 percent, let
alone 17.5. So the structural fix is to stop routing LinkedIn through the website at
all for the bottom of the funnel. LinkedIn Lead Gen Forms convert on platform and
remove the homepage from the path entirely. At a typical 5 to 15 percent form
completion rate on clicks, the Enterprise campaign's 23 clicks would have produced 1
to 3 leads for $659.45, which lands inside the $500 ceiling at the top of that range.

That is a hypothesis to test rather than a promise, and it should be framed that way.

## Finding 6: broad audience plus Maximum Delivery sent the budget to the wrong people

This is the mechanism behind every targeting problem below. Both ad sets pair a large
audience (180,000 and 350,000) with Maximum Delivery bidding. Maximum Delivery buys
the cheapest impressions inside whatever audience it is given, and the cheapest
impressions on LinkedIn belong to junior people in secondary markets. The targeting was
set correctly and the delivery drifted.

**Job function.** Operations is three times more responsive per impression than
Engineering, on a third of the impressions.

| Job function | Impressions | Share | Clicks | Share of clicks | CTR |
|---|---|---|---|---|---|
| Engineering | 13,014 | 61.2% | 19 | 40.4% | 0.146% |
| Operations | 4,535 | 21.3% | 20 | 42.6% | 0.441% |
| Information Technology | 2,154 | 10.1% | 0 | 0% | 0% |
| Business Development | 1,851 | 8.7% | 0 | 0% | 0% |

**Job seniority.** Entry level absorbed a fifth of all impressions and produced the
worst CTR in the account. Directors produced the most clicks.

| Seniority | Impressions | Share | Clicks | CTR |
|---|---|---|---|---|
| Senior | 5,394 | 25.4% | 10 | 0.185% |
| Entry | 4,047 | 19.0% | 3 | 0.074% |
| Director | 3,195 | 15.0% | 11 | 0.344% |
| CXO | 2,363 | 11.1% | 3 | 0.127% |
| Manager | 2,145 | 10.1% | 6 | 0.280% |
| VP | 1,864 | 8.8% | 0 | 0% |
| Owner | 930 | 4.4% | 0 | 0% |

**Job title.** Individual contributor engineers took 44.1 percent of impressions.
Operations leaders produced the best click rates in the account.

| Job title | Impressions | Share | Clicks | CTR |
|---|---|---|---|---|
| Staff Software Engineer | 3,453 | 16.2% | 5 | 0.145% |
| Artificial Intelligence Engineer | 3,405 | 16.0% | 5 | 0.147% |
| Machine Learning Engineer | 2,521 | 11.9% | 3 | 0.119% |
| Director of Operations | 1,695 | 8.0% | 7 | 0.413% |
| Chief Technology Officer | 1,100 | 5.2% | 0 | 0% |
| Chief Operating Officer | 1,085 | 5.1% | 0 | 0% |
| Vice President Operations | 800 | 3.8% | 4 | 0.500% |
| Regional Director of Operations | 249 | 1.2% | 3 | 1.205% |

**Company size.** Just over a quarter of impressions went to companies that cannot
afford the cheapest VoiceRun tier.

| Company size | Impressions | Share | CTR |
|---|---|---|---|
| 10001+ employees | 4,778 | 22.5% | 0.167% |
| 11-50 employees | 4,241 | 20.0% | 0.165% |
| 51-200 employees | 2,828 | 13.3% | 0.141% |
| 1001-5000 employees | 2,583 | 12.2% | 0.271% |
| 201-500 employees | 2,254 | 10.6% | 0.311% |
| 501-1000 employees | 1,636 | 7.7% | 0.367% |
| 2-10 employees | 1,207 | 5.7% | 0% |
| 5001-10000 employees | 1,067 | 5.0% | 0.562% |
| 1 employee | 171 | 0.8% | 0% |

Companies of 50 people or fewer took 26.4 percent of impressions. VoiceRun's entry
price is a $25,000 twelve week pilot. The Graduation ad set targets 11 employees and
up, which is why.

**Industry.** The named verticals barely delivered.

| Industry | Impressions | Share | Clicks | CTR |
|---|---|---|---|---|
| Technology, Information and Internet | 12,617 | 59.4% | 20 | 0.159% |
| IT Services and IT Consulting | 5,308 | 25.0% | 11 | 0.207% |
| Hospitals and Health Care | 2,112 | 9.9% | 4 | 0.189% |
| Financial Services | 1,532 | 7.2% | 0 | 0% |
| Transportation, Logistics, Supply Chain and Storage | 973 | 4.6% | 0 | 0% |
| Insurance | 566 | 2.7% | 0 | 0% |
| Rail Transportation | 377 | 1.8% | 3 | 0.796% |
| Media and Telecommunications | 769 | 3.6% | 4 | 0.520% |

Insurance is VoiceRun's only named reference vertical, thanks to Tivly, and it received
2.7 percent of impressions and zero clicks. Caveat for the client facing version: these
industry percentages sum well above 100 percent because a company can carry several
industry tags, so treat this table as directional rather than exact.

**Companies reached.** The top 25 companies by impressions produced zero clicks
between them. The list is Google 266, Meta 263, Shopify 108, Apple 91, Stealth Startup
90, Outlier 86, Wealthsimple 80, Microsoft 71, and on down through Intuit, Walmart
Global Tech, AWS, IBM, ServiceNow, NVIDIA and Deloitte. Every one of the big names
builds voice infrastructure in house.

**Geography.** Canada took 42.1 percent of impressions and produced 2.5 percent of the
site's users.

| | Impressions | Share | Clicks | CTR |
|---|---|---|---|---|
| United States | 9,164 | 43.1% | 22 | 0.240% |
| Canada | 8,947 | 42.1% | 16 | 0.179% |

Greater Toronto alone took 3,281 impressions, 15.4 percent of the account and the
single largest location, at a 0.122 percent CTR. Add Montreal, Vancouver, Calgary,
Ottawa, Kitchener-Waterloo, Edmonton and Quebec City and Canadian metros account for
roughly a third of all impressions. GA4 puts Canada at 221 of 8,976 site users, which
is 2.5 percent, behind India.

## Finding 7: the ad-level read in the deck is accurate

Every ad-level figure in the internal deck checks out against the export.

| Ad | Campaign | Spend | Impr | Clicks | CTR | LP clicks | Cost per LP click | Views |
|---|---|---|---|---|---|---|---|---|
| D1 stalled-pilot, "Most voice pilots stall before production." | Enterprise | $403.33 | 2,749 | 13 | 0.473% | 13 | $31.03 | 1,067 |
| D3 transparent-pricing, "Bring your own keys. Pay for what actually runs." | Enterprise | $256.11 | 1,938 | 10 | 0.516% | 10 | $25.61 | 780 |
| A2 prompt-and-pray, "Your agent should be a software artifact, end to end." | Graduation | $165.23 | 6,216 | 7 | 0.113% | 2 | $82.62 | 2,390 |
| A3 haiku-on-the-mic, "Pick the model per turn, not per project." | Graduation | $119.33 | 4,447 | 9 | 0.202% | 2 | $59.66 | 1,632 |
| B2 screen-aware-call, "Your call-me button should know the screen it came from." | Graduation | $111.95 | 4,188 | 7 | 0.167% | 2 | $55.98 | 1,469 |
| B1 production-lifecycle, "Debug in minutes, not days." | Graduation | $45.91 | 1,720 | 1 | 0.058% | 0 | n/a | 574 |

One addition the deck does not make: B1 is the clear loser at $45.91 for a single
click, a 0.058 percent CTR and zero landing page clicks. It should be cut before
anything new is added.

## GA4: site totals for 15 July to 27 August

10,537 sessions, 9,002 users of whom 8,968 are new and 231 returning, a 54.32 percent
engagement rate, 24 seconds average engagement per session, 56,095 events, 21 key
events, and a 0.09 percent session key event rate.

## Finding 8: email is 62 percent of the site's traffic and needs explaining

| Channel | Sessions | Share | Engagement rate | Avg engagement | Events per session |
|---|---|---|---|---|---|
| Email | 6,557 | 62.2% | 60.84% | 11s | 3.62 |
| Direct | 1,702 | 16.2% | 49.29% | 54s | 10.29 |
| Paid Search | 779 | 7.4% | 35.82% | 11s | 4.67 |
| Organic Search | 510 | 4.8% | 53.53% | 1m 04s | 7.02 |
| Organic Social | 338 | 3.2% | 57.10% | 1m 03s | 8.02 |
| Referral | 266 | 2.5% | 68.42% | 1m 32s | 15.56 |
| Unassigned | 106 | 1.0% | 14.15% | 1m 13s | 4.95 |
| Paid Social | 48 | 0.5% | 8.33% | 6s | 3.17 |
| Paid Other | 13 | 0.1% | 7.69% | 0s | 3.08 |
| Cross-network | 9 | 0.1% | 66.67% | 9s | 5.78 |

Email brought 6,443 first-time users and exactly one returning user, at 11 seconds
each. That shape looks more like a large cold send or link scanning than a nurtured
list. It is a question for VoiceRun, not a conclusion we can draw, and it matters for
two reasons. It dominates every site-wide average, and if VoiceRun is already running
outbound email at that volume, paid media is a smaller part of their acquisition than
the brief implies.

Organic Search is 510 sessions across 44 days, about 12 a day, which is negligible.
Referral is the highest quality traffic on the site at 1m 32s and 15.56 events per
session, on 266 sessions.

## Finding 9: paid search engages at two-thirds the site rate

Paid Search runs a 35.82 percent engagement rate against the 54.32 percent site
average, with 11 seconds per session and 0.37 engaged sessions per user. GA4's 779
sessions reconcile reasonably with Google Ads' 903 clicks.

This is independent corroboration of the Google Ads finding. Google rates landing page
experience Below average on 69 of 73 scored keywords, and GA4 separately shows that
traffic leaving in 11 seconds. Two systems, same conclusion, which makes the landing
page argument much harder to wave away.

## Finding 10: 86 percent of sessions land on the homepage, and the paid pages get almost nothing

| Landing page | Sessions | Share | Avg engagement | Key events | Key event rate |
|---|---|---|---|---|---|
| / | 9,104 | 86.4% | 16s | 12 | 0.05% |
| (not set) | 266 | 2.5% | 13s | 0 | 0% |
| /showcase/self-hosted-asr | 136 | 1.3% | 47s | 0 | 0% |
| /agents | 90 | 0.9% | 5m 04s | 0 | 0% |
| /pricing | 83 | 0.8% | 18s | 0 | 0% |
| /platform | 50 | 0.5% | 16s | 2 | 2% |
| /agents/<uuid>/sessions | 49 | 0.5% | 8m 36s | 0 | 0% |
| /developers/platform | 34 | 0.3% | 17s | 0 | 0% |

167 landing pages in total. The two pages Google Ads points at received 133 landing
sessions between them across six weeks, while the Pricing ad group alone spent
$1,047.30. The /pricing page recorded 18 seconds of engagement and zero key events.

## Finding 11: 93 percent of users never scrolled to the bottom of a page

The scroll event fired 3,093 times from 622 users, which is 6.9 percent of the 9,002
users. GA4's default scroll trigger is 90 percent page depth. So 93 percent of visitors
never reached the bottom of any page they landed on.

## Finding 12: the site produced 4 demo requests, which is not zero

This is the most important thing to reconcile before anything goes to Lawrence.

| Event | Count | Users |
|---|---|---|
| page_view | 22,993 | 8,987 |
| session_start | 10,230 | 8,992 |
| user_engagement | 9,355 | 5,410 |
| first_visit | 8,968 | 8,917 |
| scroll | 3,093 | 622 |
| view_search_results | 785 | 13 |
| contact_form_view | 312 | 158 |
| demo_build | 76 | 29 |
| app_click | 64 | 24 |
| demo_call_start | 57 | 12 |
| showcase_page_rail_click | 44 | 10 |
| form_start | 32 | 23 |
| showcase_page_cta | 29 | 11 |
| generate_lead | 26 | 16 |
| showcase_video_play | 14 | 14 |
| click | 9 | 7 |
| **demo_request** | **6** | **4** |
| contact_form_error | 1 | 1 |
| sign_up | 1 | 1 |

So the on-site funnel across 44 days reads: 158 users saw a contact form, 23 started
one, and 4 requested a demo. That is a 14.6 percent start rate and a 17.4 percent
completion rate among starters, on tiny numbers.

Meanwhile Google Ads reports 0 primary conversions and LinkedIn reports 0. Two
explanations are possible. Either none of those 4 people came from paid, which is
plausible given email is 62 percent of traffic, or there is a gap between the GA4 event
and what the ad platforms count. Jordan's own note that demo_request is not marked as a
key event in GA4 points at the second, because a non-key event cannot be imported to
Google Ads as a conversion or used to build an audience.

Until that is resolved, the audit should say "no demo requests attributable to paid
media" rather than "no demo requests". The stronger version is also the true one.

Also unresolved: which event the 21 key events actually are. It is not demo_request at
6, and generate_lead at 26 is the nearest candidate.

## Finding 13: the marketing site and the product share one GA4 property

The evidence is consistent across three screens. Landing pages include
`/agents/<uuid>/sessions` at 8m 36s and 2m 59s of engagement. `view_search_results`
fired 785 times from 13 users, 60 times each. `demo_build` (29 users),
`demo_call_start` (12 users), `app_click` (24 users) and `showcase_page_rail_click` (10
users) are all product interactions rather than marketing ones.

Two consequences. Event counts and engagement averages for the marketing site are
distorted by in-product usage, and any conversion rate calculated against total users
is wrong.

One more anomaly to check: Belgium shows 159 users generating 4,446 events, which is
7.9 percent of all events in the property from 1.8 percent of the users, at 28 events
per user and a 95.65 percent engagement rate. That looks like internal, QA or bot
traffic rather than a market.

## Finding 14: three GA4 configuration gaps, all confirmed

Jordan's three notes check out against the screenshots, and one has a consequence worth
stating.

1. `demo_request` exists as an event but is not marked as a key event. So it cannot be
   imported into Google Ads as a conversion, cannot seed a GA4 audience, and does not
   appear in key event reporting. This is the one with teeth.
2. Data collection settings are off, so Google signals and modeled data are unavailable.
3. Event data retention sits at the default two months rather than 14, which means
   analysis windows longer than two months will be impossible later.

## Positions the client facing audit must take on LinkedIn and GA4

1. **Reverse the geography read.** The deck says location is "ok for now" and that most
   impressions coming from Canada "should be ok". Canada is 42.1 percent of impressions
   and 2.5 percent of site users, and Toronto is the single largest location at the
   worst CTR of the major areas. Recommend US only, or Canada in its own campaign with
   its own budget so it cannot cannibalize.

2. **Replace the age limit recommendation with a seniority exclusion.** LinkedIn infers
   age coarsely, and the actual field doing the damage is job seniority. Entry level
   took 19.0 percent of impressions at a 0.074 percent CTR. Exclude Entry and Training
   seniority, tighten the title list, and the age question resolves itself.

3. **Lead Gen Forms before conversion bidding.** The deck lists conversion bidding as
   the opportunity. It is the right destination and it has the same sequencing problem
   as Google: LinkedIn's Website Conversions objective needs conversion volume to
   optimize and there is none. Lead Gen Forms convert on platform, remove the homepage
   from the path, and start producing the signal that conversion bidding needs.

4. **Cut before adding creative.** The deck asks for at least five creatives per
   campaign. Graduation already runs four and B1 took $45.91 for one click at 0.058
   percent. On a $67 a day budget, adding five on top spreads delivery thinner across
   more assets. Cut B1, keep the two best angles, add two.

5. **Soften "good angle for ads" into a hypothesis.** The copy is genuinely strong and
   the two best angles (transparent pricing on the enterprise side, per-turn model
   choice on the developer side) are worth keeping. Forty seven clicks cannot support
   the word "good" as a finding. Say the angles are promising and name what would prove
   it.

6. **Correct the window.** Campaigns were created 8 August and first delivery was 12
   August, so LinkedIn has 16 days of delivery, not 20. Use 12 to 27 August for any
   rate calculation.

7. **Lead the GA4 section with the landing page evidence, not the config gaps.** The
   config items are real but small. The finding that matters is that 86.4 percent of
   sessions land on a homepage with 16 seconds of engagement, paid search engages at
   two-thirds the site rate, and paid social at 2 seconds.

## The strategic conclusion worth building the proposal on

Each channel already reaches a different one of Lawrence's two ICPs, and right now
both channels chase both.

- **Google Search reaches ICP 2, the developers.** The Code-First Builder ad group is
  the most efficient thing in either account, producing platform page views at $14.82
  against $52.37 for the competitor pricing ad group.
- **LinkedIn reaches ICP 1, the operations leaders.** Operations clicks at 0.441
  percent against Engineering at 0.146 percent, three times better per impression,
  while 61.2 percent of LinkedIn impressions go to engineers.

Assigning Google to developers and LinkedIn to operations leaders improves both
channels without asking for another dollar. That is the single highest leverage
recommendation available from this data, and it comes entirely from their own accounts.

## Numbers safe to quote

| Figure | Value |
|---|---|
| LinkedIn window | 12 to 27 August 2026, 16 days of delivery |
| LinkedIn spend | $1,101.89 |
| LinkedIn impressions | 21,258 |
| LinkedIn clicks | 47 |
| LinkedIn CTR | 0.22% |
| LinkedIn CPM | $51.83 |
| LinkedIn CPC | $23.44 |
| LinkedIn landing page clicks | 29 at $38.00 each |
| LinkedIn conversions and leads | 0 |
| Enterprise campaign CPM | $140.70 |
| Graduation campaign CPM | $26.70 |
| Average video watch time | 2.6 seconds per play |
| Video completion rate | 1.4% of plays, 335 completions |
| Cost per completed view | $3.29 |
| Canada share of LinkedIn impressions | 42.1% |
| Canada share of GA4 site users | 2.5% |
| Entry level share of LinkedIn impressions | 19.0% at 0.074% CTR |
| Engineering vs Operations CTR | 0.146% vs 0.441% |
| Companies of 50 or fewer employees | 26.4% of impressions |
| Combined paid spend, both platforms | $3,479.45 |
| GA4 sessions | 10,537 |
| GA4 users | 9,002 (8,968 new, 231 returning) |
| Site engagement rate | 54.32% |
| Homepage share of landing sessions | 86.4% at 16s engagement |
| /pricing landing sessions | 83, zero key events |
| Paid Search engagement rate | 35.82% at 11s |
| Paid Social engagement | 41 users, 2 seconds, 0 returning |
| Users who scrolled to 90% depth | 622 of 9,002 (6.9%) |
| demo_request events | 6 from 4 users |
| generate_lead events | 26 from 16 users |
| contact_form_view to form_start | 158 users to 23 users |
