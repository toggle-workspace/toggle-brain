# SignWell Marketing Audit (September 2026)

**Prepared by Toggle for internal use ahead of the SignWell proposal.** Evidence was gathered on 2026-09-16 from signwell.com, both Google Tag Manager containers, the Google Ads Transparency Center, public social pages, the Prosomo August 2026 one-pager, and two rounds of client context. Two analysis rounds and two audit rounds were run: round 1 cast a wide net across four lenses (website and funnel, paid ads, organic social, unit economics), and round 2 tried to refute those findings and sized the growth levers. Anything marked **unverified** needs GA4, GTM, or ad account access before it goes in front of the client.

## Summary

1. **Prosomo controls the ad account, and the history sits elsewhere.** All 23 live SignWell ads first appeared between 7 and 24 May 2026 under a new advertiser ID. Round 1 read "Prosomo Inc." as the payer on every one; round 2 could not re-check this because Google rate-limited the lookup. The older "Docsketch LLC (DBA SignWell)" account, which served Canada, India, Mexico, Brazil, the UK, and Australia, stopped on 2026-05-06 (its oldest ad ran from 2021 to December 2025). The new ads found so far all target the US.
2. **Non-brand search wastes most of the budget.** It takes 52% of spend and returned 24 qualified sign-ups in August at $379 each. At the confirmed 9.4% trial-to-paid rate, one paying customer costs about $4,000, which is more than five times ACV. The ad copy ("No account needed", "Sign your document for free and move on with your day") attracts one-off personal signers, the exact users SignWell wants to serve for free.
3. **The ads never say what SignWell says.** The positioning is "paying too much for DocuSign" plus HIPAA and BAA compliance. No live ad names DocuSign, leads with HIPAA, targets healthcare, or runs in Spanish. HIPAA and SOC 2 appear only as trailing tags.
4. **The tracking needs a rebuild, which is what Lawrence asked for.** The site runs two GTM containers and two GA4 properties. The Meta pixel fires from three places. One container still runs a dead Universal Analytics tag and carries Bing tags labeled `uetqProsomo` with Canadian dollar currency, which look copied from another Prosomo client. The container has no Google Ads conversion tag.
5. **Prosomo's 1.43x ROAS is a ceiling, not a fact.** The homepage sign-up runs through Google sign-in, so `accounts.google.com` shows up as a referrer on sign-ups from every channel. Prosomo credited all 481 of those sign-ups to paid search. The true blended ROAS sits between 1.04x and 1.43x.
6. **Retargeting audiences exist but nobody uses them.** Pixels for Google Ads, Meta, LinkedIn, Reddit, X, Bing, and OpenAI load on the site. The client confirms no retargeting runs anywhere.
7. **Lifecycle is the cheapest lever.** SignWell sends one email after sign-up and shows upgrades only in a top-bar banner, even though Userlist (a lifecycle email tool) is installed and 43% of eventual conversions happen after day 0.
8. **Organic social is small and off-strategy.** LinkedIn has 594 followers and posts about once every 1.5 weeks, mostly product launches. Instagram has 19 followers, Facebook 330, and YouTube one video from 2023. None of the content covers healthcare, DocuSign switching, developers, or Spanish.

## 1. Unit economics

All figures use the August one-pager and the benchmarks Lawrence confirmed by email on 2026-09-18: qualified sign-ups and trial sign-ups are one population (qualified users enter a 7-day reverse trial with full paid features and no card), self-serve trials convert to paid at about 9.4% over the last two months, and ACV is about $750. Those figures replace the 1.7%, 4%, 6.3% and 7% rates used in the first draft of this audit, and they settle the population question round 2 raised.

| Campaign | Spend | Qualified sign-ups | Cost per sign-up | Cost per customer at 9.4% | Multiple of $750 ACV |
|---|---|---|---|---|---|
| Brand Search | $3,981 | 1,044 | $3.81 | $41 | 0.05x |
| PMax | $1,930 | 222 | $8.69 | $92 | 0.12x |
| Non-Brand Search | $9,088 | 24 | $378.68 | $4,029 | 5.4x |
| LinkedIn | $2,342 | 0 | n/a | n/a | n/a |
| Blended (1,290 platform) | $17,342 | 1,290 | $13.44 | $143 | 0.19x |

- **Break-even cost per qualified sign-up** is $70.50 (9.4% of $750, 12-month payback). At today's 24 sign-ups, non-brand search justifies about $1,700 a month, against $9,088 spent. Break-even on its current budget needs 129 sign-ups a month.
- **The conversion value is set too low.** Every qualified sign-up is valued at a flat $14, against a true $70.50. Google therefore bids on a fifth of what a sign-up earns. Raising values without raising tROAS targets by the same factor (about 5x) would cause overspend. The better fix is value rules keyed to the onboarding questionnaire plus offline import of purchases.
- **What remains uncertain.** The 9.4% rate is an account-wide average over two months. Brand sign-ups probably convert above it and non-brand below it, and ACV of $750 is lifted by API and multi-seat accounts against list prices of $120 to $432 a year per seat. Ask SignWell to split conversion rate and ACV by channel and plan before any single campaign is judged on $70.50.
- **The decision window.** Every qualified sign-up holds full paid features for 7 days, so the upgrade decision lands inside that week and shortly after it. Ask for the day-by-day curve across those 7 days, because it sets the email and retargeting cadence.

### Data conflicts to resolve with the client

| Topic | Conflict |
|---|---|
| Spend | Henry quoted $20,000 to $25,000 a month; August shows $17,342. |
| Sign-ups | The headline total is 1,771; campaign rows add to 1,290. The 481 are unassigned. |
| Brand share | Henry said under 20% of spend; August shows 23%. Brand is 81% of 1,290 but 59% of 1,771. |
| Trial vs free plan | Settled on 2026-09-18: the public site sells a free plan, and qualified sign-ups are placed in a 7-day reverse trial inside the app. |
| ACV vs list price | $750 to $800 ACV against $144 to $432 a year per seat implies multi-seat or API revenue. |
| LinkedIn | Described as a small test; it spent $2,342 in August with zero sign-ups. |
| Social proof | "81,000+ businesses" on the homepage; "65,000+" on the healthcare and Spanish pages. |

## 2. Website and funnel

- **Pricing** (live on /pricing/): Free at $0 (1 sender, 1 template, 3 documents a month); Light at $10 annual or $12 monthly; Business at $30 or $36 (3 senders); Enterprise custom for 50+ seats. Every CTA says "Sign Up for Free."
- **API** (/api-pricing/): a $275 a month tier at $0.66 per document, 25 free API documents a month with a card on file, usage pricing from $0.85 down to $0.20, and a free developer account. The site also has CLI and MCP pages.
- **Sign-up** posts to Google OAuth from the homepage hero. An email path (/sign_up/register/) also exists. The onboarding questions appear to live inside the app.
- **Healthcare page** (/industries/healthcare/) is strong: it offers a signed BAA and "Start for free, no sales call required."
- **Spanish** has one page, /firmas-electronicas-nom-151/ (Mexico), with a "book a demo" CTA, no /es/ section, and no hreflang tags.
- **Competitor pages** exist for DocuSign, HelloSign, Adobe Sign, SignNow, Signable, and DocHub. None exist for BoldSign, Signeasy, or Signaturely.
- **Free tools.** Contract templates (/contracts/) capture a work email and ask "Which e-signing software do you use?", which is ready-made switcher data. The online signature and sign-PDF tools capture nothing, so retargeting is the only way to recover those visitors.
- **Blog** (/resources/blog/) has no newsletter sign-up.
- **Other assets:** a startup program (up to $500 in credits), native QuickBooks Online and Xero integrations, and "Summarize SignWell" links to ChatGPT, Claude, Perplexity, Grok, and Google AI Mode on the homepage.
- **Dead URLs:** /healthcare/, /es/, /templates/, /blog/, and /integrations/ return 404.

## 3. Tracking and measurement

| Item | Finding | Confidence |
|---|---|---|
| GTM containers | `GTM-MV48XB3B` (ads pixels) and `GTM-MHKC8Q4` (Amplitude, Hotjar, Meta) | High |
| GA4 | Two IDs: `G-XSY8RPYZ51` in page source, `G-Y0EECG1QCH` in GTM | High |
| Meta pixel 1863429393921803 | Fires from page source, from MHKC8Q4 (PageView), and from 5 tags in MV48XB3B (Lead) | High; Events Manager check needed |
| Google Ads | Tag `AW-18054122986` and conversion linker present; no Google Ads conversion tag, so conversions likely come from GA4 import or the app | Medium |
| Other pixels | LinkedIn Insight (partner 8382442), Reddit (`a2_h2pr2j9hldss`), X, Bing UET, OpenAI, HubSpot (45190812), Rewardful, Fathom, Userlist on /sign_up/ | High |
| Stale tags | Active Universal Analytics tag; 21 paused tags; Bing tags named `uetqProsomo` with CAD currency and events like `click_to_google_map` | High |
| Referral exclusion | `accounts.google.com` exclusion cannot be seen from the browser | Needs GA4 admin |

**The 481 "recovered" sign-ups.** Google Ads' own click ID should survive the Google sign-in hop because the app sits on the same domain. GA4 is different: without a referral exclusion, the return from Google sign-in takes credit for the sign-up. If Google Ads imports conversions from GA4, some paid sign-ups really are missing from the 1,290. The same referral appears on sign-ups from organic, direct, and brand traffic, though, so crediting all 481 to paid search is not supported. Split them by the source of the session before the sign-in hop.

**Tests that settle it (week 1 with access):**
1. Check the unwanted-referrals list on both GA4 data streams.
2. In GA4 Explore, break `qualified_sign_up` down by first-user source and session source, and trace the pre-sign-in session for users who arrived from `accounts.google.com`.
3. Click a test ad (or add `?gclid=TEST`), sign up with Google, and confirm the `_gcl_aw` cookie survives and the conversion reaches Google Ads.
4. Confirm where Google Ads conversions come from, their values, windows, and bid strategies.
5. Check Meta Events Manager for duplicate PageView and Lead events.
6. Confirm the Reddit and OpenAI pixel IDs match SignWell's own ad accounts before reusing their audiences.

## 4. Paid ads

**Account.** Advertiser AR14115354226678824961 has 23 creatives (19 text, 1 image, 3 video), all first seen 2026-05-07 to 2026-05-24 and all found under a US filter (round 2 confirmed). Round 1 read "Prosomo Inc." as the payer on all 23; round 2 was rate-limited and could not re-check. "Payer" means the entity that pays Google, not the account owner, so the proposal should say Prosomo controls the account rather than claim Prosomo owns it. The videos are 17-second cuts (Overview, QuickBooks, API). The only image ad promotes the QuickBooks integration. No creative reads as retargeting.

**What the copy says.** The copy leans on "free", "no credit card", and "no account needed". Examples: "Start Signing for Free Today - No Credit Card Required", "No subscription needed. Sign your document for free and move on with your day.", and a price extension showing "from $0.00/mo". The API ads are sharper ("No seat limits, no monthly minimums", "REST API + Webhooks. Full Documentation."). A login ad ("SignWell Login – Sign In Now") runs too. It inflates brand clicks and spend from existing users. It inflates brand conversions only if the qualified sign-up event fires on login or on the Google sign-in return, which the GTM trigger will show.

**Why non-brand fails is not proven yet.** The copy fits one-off signers, but broad or "free PDF" keywords, free-tool landing pages that fire no sign-up event, or expensive competitor terms would produce the same result. The search terms report, spend by final URL, and the business vs personal split per campaign will settle it.

**What the copy leaves out.** No headline names DocuSign or offers a switch. No headline mentions HIPAA or a BAA. No ad targets healthcare, runs in Spanish, uses a proof point such as ratings or the customer count, or re-engages past visitors.

**Competitors in the Transparency Center.** DocuSign (US), PandaDoc, and Dropbox each run about 2,000 to 3,000 ads. Syncfusion (BoldSign) runs about 1,000 to 2,000. Signeasy shows one, and Signaturely shows none under its own name. SignWell's 23 generic creatives compete against far larger budgets on the same generic terms.

**Competitor angles** (from the Meta Ad Library and competitor pages, because Google rate-limited the Transparency Center lookups):

| Competitor | Angle | Verbatim or fact |
|---|---|---|
| BoldSign | Cost cut and free migration | "Slash Your E-Signature Costs"; "Docusign Alternative with Unlimited Envelopes"; "save up to 60%"; free plan of 25 envelopes a month; HIPAA needs an annual plan |
| Dropbox Sign | API | "Embed eSignature into your application in days"; API from $75 a month for 50 requests; test mode builds only |
| Signeasy | Risk reversal | "Flexible plans and pricing. No surprises."; 100-day money-back guarantee; HIPAA is a paid add-on |
| DocuSign | Embedded signing, no defensive ads found | "No Redirects Required"; "Don't Break the Flow" |
| PandaDoc | Free plan | 5 documents a month free; $19 and $49 per user; HIPAA on higher plans only |
| Small entrants | Price anchors | "Your $10/mo Docusign Alternative" (Signclad); "Everything DocuSign does. $49, once." (Manila Docs) |
| Signaturely | Absent | No ads found on Google or Meta |

**Five angles SignWell is not using** (each passes the visualize, falsify, ownable test; confirm the flagged facts first):

| Angle | Headline | Description | SignWell fact |
|---|---|---|---|
| Live API documents free | 25 Live API Docs Free Monthly | Real signed documents, not a sandbox. Then from $0.85 each. REST API and webhooks. | 25 free API documents a month with a card; rivals offer test mode or watermarked sandboxes |
| Team price | 3 Senders for $30 a Month | One flat plan for your team. Unlimited documents, unlimited templates, no contract. | Business plan has 3 senders at $30; Signeasy charges $30 per user and PandaDoc $49 |
| BAA without lock-in | Signed BAA, Month to Month | HIPAA eSignatures with a signed BAA and SOC 2 Type II. Built for home care teams. | Healthcare page offers a signed BAA; BoldSign and PandaDoc tie HIPAA to annual or higher plans. **Confirm which plans include the BAA.** |
| Switch from DocuSign | No Envelope Limits From $10 | Leaving DocuSign? Send unlimited documents for $10 a month. Cancel anytime. | Light plan has unlimited documents. **Verify DocuSign's current envelope limits.** |
| Mexico | Firma Electrónica NOM-151 | Firma contratos con validez legal en México. Empieza gratis, sin tarjeta. | NOM-151 page exists; no competitor ads mention NOM-151 |

A reserve angle is the startup program (up to $500 in credits) for API embedders. The API, BAA, and Mexico angles need new campaigns, geos, or conversion actions, so they depend on a SignWell-owned Google Ads account. The team-price and DocuSign angles could run as new ads in the current campaigns if Prosomo cooperates, and the API and DocuSign angles can start now on SignWell's own Reddit and ChatGPT accounts.

**Account ownership.** Google Ads access may not be available to us, and the account history sits with Prosomo and the old Docsketch account. The proposal should plan for a new SignWell-owned Google Ads account, linked to SignWell's GA4, with the old Docsketch account reviewed for history. Reddit and ChatGPT ad accounts already belong to SignWell. Ask who owns Meta and LinkedIn.

## 5. Organic social

| Platform | Handle | Followers (2026-09-16) | Activity |
|---|---|---|---|
| LinkedIn | /company/signwellapp | 594 (11 to 50 staff) | 8 posts from 18 June to 9 September; product and integration launches; 3 to 44 reactions |
| Instagram | @signwell_official | 19 | 36 posts; activity behind login |
| Facebook | /SignWellApp | 330 | Activity behind login |
| YouTube | @SignWellApp | 5 | 1 video (July 2023, 838 views) |
| X | @SignWellApp | Not visible | Behind login |

For comparison, Signeasy has 124,244 LinkedIn followers, DocuSign has 607,540, and BoldSign has 201 on Facebook. Instagram is weak across this mid-market tier; LinkedIn is where SignWell falls furthest behind.

**The founder is the strongest unused organic asset.** Ruben Gamez (also the founder of Bidsketch) has appeared on Startups For the Rest of Us, The Bootstrapped Founder (episode 248), Fathom's podcast, Rogue Startups, and an Appcues podcast about how SignWell raised activation. His X account is linked in the site footer, but he does not post on LinkedIn for the company.

**Gaps.** The posts ignore this quarter's priorities (healthcare, switchers, LatAm). Employees do not amplify company posts. YouTube is idle even though API buyers look for demos. There is no Spanish content and no tie between social and the free tools.

## 6. Growth levers for the proposal (on top of paid ads)

Upside ranges use the 1,290 platform-reported sign-ups and $750 ACV. One extra customer a month is worth about $9,000 in new ARR a year. Every range is a scenario, not a forecast, and vendor benchmarks were not used as proof.

### 6.1 Email nurturing and in-app upgrades
- **Today:** one email after sign-up and a top-bar banner. Userlist and HubSpot are already installed, so the gap is content and product events, not tooling.
- **Plays:**
  - A behavior-triggered track on day 0, 1, 3, 7, and 14 that stops once the user sends a first document.
  - An upgrade prompt, by email and in-app modal, when a user hits the 3-document, 1-template, or 1-sender limit. The messaging pushes upgrades, since the public model is a free plan.
  - Segment tracks keyed to the onboarding questionnaire: API developers (sandbox, docs, MCP), healthcare (BAA, home care proof), high-volume teams (seat math and a sales offer), and switchers identified from the template form's "which software" field.
  - A Spanish track, and a slot for the Q4 vertical track.
  - A 10% holdout group so the lift can be measured.
- **Upside:** Email alone adds 0.3 to 0.75 points (about $36,000 to $90,000 in new ARR a year). The limit-hit modal adds 0.21 to 0.56 points (about $25,000 to $67,000). The two overlap, so the combined gain is capped at 0.5 to 1.0 points: 6.5 to 12.9 extra customers a month, or about $60,000 to $120,000 in new ARR a year.
- **KPI in 90 days:** free-to-paid conversion within 30 days for the treated group against the holdout, plus first document sent within 24 hours.
- **We need:** Userlist and HubSpot admin access, about one engineering day a week in month 1 for three events (document sent, limit hit, plan changed), questionnaire fields passed to Userlist, and a copy approver.

### 6.2 Retargeting
- **Today:** none, although pixels on seven platforms are already collecting visitors. PMax, Display, and YouTube may already remarket implicitly, so check before calling this net new.
- **Audiences, in priority order:**
  1. Users who signed up but have not paid, split by questionnaire segment.
  2. Visitors to the pricing and API pricing pages, with higher bids on non-brand search (RLSA).
  3. Visitors to the competitor alternative pages, shown switcher proof.
  4. Free-tool users who did not sign up, with a frequency cap and only after Ruben confirms the free tools do not take sign-ups from paid.
  - Exclude paying customers and personal-use sign-ups.
- **Platforms:** Reddit first (SignWell owns the account), then Meta and LinkedIn if SignWell owns them, then Google once a SignWell-owned Google Ads account exists. Build GA4 audiences in week 1 so they are ready to link.
- **Upside in 90 days:** $1,000 to $1,500 a month should yield 20 to 60 qualified sign-ups. Half may have returned through brand search anyway, so 10 to 30 are incremental, which means 0.7 to 2.1 customers a month.
- **KPI:** incremental qualified sign-ups against an audience holdout, at a cost under the $52 to $56 break-even.
- **Risks:** small audiences cause ad fatigue, retargeting can steal credit from brand search, duplicate Meta firing will corrupt optimization, and HHS guidance on online tracking means no pixels inside the logged-in app or on patient-facing flows.

### 6.3 Organic growth
- **Plays:**
  - **Signer-to-sender loop.** Every document reaches at least one signer. Audit what signers see and test a "Send your own for free" CTA with UTMs, inside the product and its emails only.
  - **Founder-led LinkedIn** built on Ruben's bootstrapped story, plus two or three employee voices, with employees resharing company posts.
  - **Content series** on healthcare and BAA workflows, DocuSign price comparisons, and ACV-raising stories about teams and integrations.
  - **Developer video** on YouTube and X: short API and MCP tutorials that link to docs and pricing. AI answer engines cite YouTube heavily, which helps AEO without touching the SEO agency's pages.
  - **Spanish LinkedIn content** voiced by the LatAm reps.
  - **Affiliate recruiting** among bookkeepers and agencies (Rewardful is installed).
  - **Instagram and Facebook** get minimal upkeep only. The Meta pixel stays for paid retargeting.
- **Guardrails with the SEO/AEO agency:** we do not touch blog posts, free-tool pages, alternative pages, schema, or AI-answer content, and we agree on UTM rules with them.
- **KPI in 90 days:** sign-ups carrying signer-referral and social UTMs, plus the signer-to-sender rate. LinkedIn follower growth is secondary.
- **Upside:** a signer CTA converting 0.1% to 0.3% of signers could add 50 to 300 sign-ups a month, but signer volume is unknown. Founder and social content will show little attributable revenue within 90 days.
- **We need:** about two hours a month of Ruben's time, access to signer email templates, and affiliate data.

## 7. Recommended Q4 vertical: accounting and bookkeeping firms

| Vertical | Score (out of 30) |
|---|---|
| Accounting and bookkeeping | 25 |
| LatAm SMB (Mexico, NOM-151) | 21 |
| Staffing, HR, and payroll | 19 |
| Home services and construction | 18 |
| Insurance agencies | 16 |
| Real estate | 15 |

- **Why accounting:** SignWell already has /industries/accounting/, native QuickBooks Online and Xero integrations (press in July 2025 called it the first native QuickBooks e-sign integration), accounting templates, and a QuickBooks video and image ad. Firms send engagement letters for every client, which points to multi-seat plans and higher ACV. LinkedIn can target owners and partners by title and firm size.
- **Compliance caveat:** the IRS allows e-signing of Form 8879 only with identity verification such as knowledge-based authentication. We found no sign that SignWell offers it. Lead with "audit-ready engagement letters inside QuickBooks and Xero" and confirm with Ruben before any tax-form claim.
- **Test (about $3,000 a month, 15% of spend):** $1,400 on non-brand search ("QuickBooks e-signature", "Xero e-signature", "engagement letter e-signature", "DocuSign alternative for accountants"), $1,000 on LinkedIn, and $600 on retargeting accounting and integration page visitors. Add a paid variant of the accounting page, a four-email accounting track, and two LinkedIn posts a week.
- **KPI:** cost per paid customer at or below $140 (break-even at a $2,000 ACV), qualified sign-up cost at or below $56, multi-seat share, and integration connection rate.
- **Kill or scale:** at day 30, cut LinkedIn if cost per lead exceeds $150 with fewer than 5 qualified sign-ups. At day 60, cut to $1,000 a month if accounting sign-ups convert below 7% against the 9.4% baseline, or show no ACV lift. At day 90, scale to 25% of spend if cost per qualified sign-up is at or below $188 and ACV is at or above $2,000; otherwise switch to LatAm.
- **Runner-up:** Mexico (NOM-151) in Q1, after a localization sprint adds a Spanish self-serve page, geo-targeted ads, and rep capacity.

## 8. Ninety-day plan

| Month | Paid | Lifecycle | Organic | Measurement |
|---|---|---|---|---|
| 1 | Open a SignWell-owned Google Ads account; restructure non-brand search; launch Reddit retargeting of non-payers and pricing visitors; add Meta and LinkedIn if SignWell owns them | Replace the single email with the day 0 to 14 track and a holdout | Start founder posts on LinkedIn | Write the tracking spec; remove duplicate and stale tags; build GA4 audiences; launch a live weekly dashboard to replace the PDF |
| 2 | Launch switcher, healthcare, and accounting campaigns; Google retargeting and Customer Match | Ship the limit-hit modal; add healthcare, API, and switcher tracks | Test the signer CTA; start developer videos | Fix conversion values and import purchases offline |
| 3 | Read results and move budget; test ChatGPT ads if audiences allow | Add Spanish and accounting tracks; read the holdout | Spanish LinkedIn content; free-tool retargeting if cleared | Channel and plan split of conversion rate and ACV |

**Top risk:** engineering capacity. The team was the founder, a couple of engineers, and one PM until about 1.5 years ago. If the three product events slip, the in-app and segment plays slip with them.

## 9. Open questions for SignWell

1. What is true monthly ad spend, and does the $20,000 to $25,000 figure include Prosomo's fee?
2. Answered on 2026-09-18: qualified and trial sign-ups are one population, the reverse trial runs 7 days with no card, self-serve trials convert at about 9.4%, and ACV is about $750. Still open: the day-by-day upgrade curve across those 7 days.
3. What are conversion rate, ACV, and churn by channel, plan, API vs non-API, healthcare, and Spanish-language users?
4. How do conversions reach Google Ads, with what values, windows, and bid strategies?
5. Who owns the Meta and LinkedIn ad accounts, and can we get into the old Docsketch Google Ads account?
6. Does SignWell offer knowledge-based authentication or ID verification?
7. Do the free tools convert to paid, or take sign-ups away from it? (Henry is asking Ruben.)
8. How many signers does SignWell reach each month, and what do signer emails show today?
9. Is there an accounting-firm customer story we can use?

## Sources
- Prosomo one-pager: `../assets/2026-08-prosomo-onepager.pdf`; discovery call: `../05-meetings/2026-09-14-discovery-call.md`
- signwell.com pages: /pricing/, /api-pricing/, /industries/healthcare/, /industries/accounting/, /quickbooks/, /xero/, /firmas-electronicas-nom-151/, /contracts/, /resources/blog/, /signwell-for-startups/
- Google Tag Manager: GTM-MV48XB3B, GTM-MHKC8Q4
- Google Ads Transparency Center: advertisers AR14115354226678824961 (SignWell) and AR10325768233386246145 (Docsketch LLC)
- Founder interviews: [The Bootstrapped Founder ep. 248](https://thebootstrappedfounder.com/248-ruben-gamez-cracking-the-e-signature-market/), [Fathom podcast](https://usefathom.com/podcast/ruben-gamez), [Appcues](https://goodux.appcues.com/behind-the-experience/how-signwell-increased-their-activation)
- IRS: [e-file signature FAQ](https://www.irs.gov/e-file-providers/frequently-asked-questions-for-irs-efile-signature-authorization)
