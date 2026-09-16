# SignWell x Toggle: Discovery Call (2026-09-14)

**Attendees.** SignWell: Lawrence Quan, Henry Brown. Toggle: Jordan Pinto, Zaid, Yi Yang Tee.
**Source.** Gemini meeting notes, the Prosomo August 2026 one-pager (`../assets/2026-08-prosomo-onepager.pdf`), and follow-up numbers from the client.

## Why they are talking to us

Prosomo, their current agency, runs SignWell's ads from Prosomo-owned accounts. SignWell gets dashboards but has no direct access to the accounts and does not own the data. Prosomo also cannot run a proper change review process in GTM. Lawrence wants a new partner chosen by the start of Q4 so the accounts can be rebuilt quickly.

## How SignWell acquires customers

- The funnel is product-led. Users sign up in the app on a free trial, and sales steps in later.
- A qualified sign-up is a user who picks business use (not personal) at sign-up. The onboarding questionnaire also asks about volume, use case, and company size.
- SEO is the historical engine, and an outside agency now handles SEO and AEO. Nobody tracks which AI platforms send conversions.
- Paid spend sits almost entirely in Google Search. They ran small tests on ChatGPT ads, LinkedIn, and Reddit.
- The team targets bottom-of-funnel demand only. The audience is finite and competition keeps rising.
- The free tools in the footer (online signature, contract templates) serve as SEO lead magnets. Nobody measures their effect on pipeline. Henry will ask Ruben.
- SignWell wants to serve low-volume users for free and spend paid budget on high-volume switchers from competitors.
- Technical and API buyers want clear pricing and docs, and they avoid sales calls. Outbound that sent prospects to a trial beat outbound that sent them to sales.
- Email nurture is an afterthought. In-app notifications carry product updates only.

## Customers and markets

- Plans list at $12 and $30 a month. ACV is $750 to $800. The main goal is to raise ACV.
- The best customers are API embedders and non-API accounts with many seats or high usage, such as home care agencies.
- Solopreneurs and small businesses make up a large share of pipeline, and search acquires them cheaply.
- SignWell positions against DocuSign on price and on compliance (HIPAA, BAAs). Healthcare is the focus vertical this quarter.
- The US is the largest market. The company also has organic reach abroad and a Latin America push staffed by Spanish-speaking reps.

## Conversion benchmarks (client-supplied)

| Metric | Value |
|---|---|
| Trial to paid, same day | about 1.7% |
| Non-trial qualified to paid, same day | about 4% |
| Non-trial qualified to paid, 14 days | about 6.3% |
| Non-trial qualified to paid, overall baseline | about 7% |

## Tracking

SignWell tracks three core events: app sign-ups (volume), qualified app sign-ups (passed through as a separate event), and purchases. The app is a single-page application, which makes GTM hard. Lawrence wants an agency that audits the setup and writes one tracking spec with their engineers. He does not want more one-off tags.

## August 2026 performance (Prosomo one-pager)

| Campaign | Spend | Share of spend | Qualified sign-ups | Cost per sign-up | ROAS |
|---|---|---|---|---|---|
| Google Brand Search | $3,981.44 | 23.0% | 1,044 | $3.81 | 3.67x |
| Google Non-Brand PMax | $1,930.22 | 11.1% | 222 | $8.69 | 1.60x |
| Google Non-Brand Search | $9,088.20 | 52.4% | 24 | $378.68 | 0.04x |
| LinkedIn Ads | $2,341.70 | 13.5% | 0 | n/a | 0.00x |
| Recovered by Prosomo (not assigned to a campaign) | n/a | n/a | 481 | n/a | n/a |
| **Total** | **$17,341.55** | 100% | **1,771** | **$9.79** | **1.43x** |

The platforms reported 1,290 sign-ups and a 1.04x ROAS. Prosomo added 481 sign-ups ($6,734) from `accounts.google.com` referral sessions that it credits to paid search. The campaign rows add up to 1,290, so the report never assigns the 481 to a campaign. Its "share of conversions" column (81% for brand) also uses 1,290 as the base.

## What we see in the numbers (our analysis, to verify in the audit)

1. **Non-brand search is the problem.** It takes 52% of spend and returns 24 qualified sign-ups at $379 each. At the 7% baseline, one paying customer from this campaign costs about $5,400, which is roughly seven times first-year ACV.
2. **The 481 recovered sign-ups need a second look.** The `accounts.google.com` referrer comes from "Sign in with Google". GA4 lists it as a referral when nobody has added it to the referral exclusion list. Those users could come from brand search, organic, or direct traffic. Prosomo's 1.43x ROAS rests on crediting all of them to paid search.
3. **The conversion value looks too low.** Every qualified sign-up carries a flat $14 value ($24,794 across 1,771). That figure matches the 1.7% trial rate times ACV. At the 7% qualified baseline, a qualified sign-up is worth about $52 to $56. If value-based bidding uses the $14 figure, Google under-bids on the best traffic.
4. **PMax may be taking brand traffic.** PMax books sign-ups at $8.69 each. We should check the search term and brand exclusion setup before anyone credits PMax with new demand.
5. **LinkedIn ran live in August with no conversions.** It spent $2,342, so it went beyond a small test. The client described it as a test.
6. **Prosomo's fix does not grow the business.** Prosomo recommends moving budget into Brand Search and PMax. Brand demand is finite, and Lawrence named the finite audience as his main problem.
7. **The spend figures disagree.** Henry quoted $20,000 to $25,000 a month, but August shows $17,342. The gap may be Prosomo's fee. Confirm this before we price anything.
8. **Brand share is higher than Henry's estimate.** He said brand takes less than 20% of spend and drives more than 80% of conversions. August shows 23% of spend and 81% of platform-reported sign-ups. Against the 1,771 total, brand drops to 59%.

## Corrections to the Gemini notes

- "Zed" is Zaid.
- "Unita" is UNITAR.
- "Solve Code 49" is probably CodeFortyNine (`clients/codefortynine/`).
- "Marvel Elements" and "Cekom" could not be matched to any client in the repo. Confirm with Jordan before these names appear in a proposal.
- The "Google 360 shop" agency is Prosomo, per the one-pager.
- Henry put brand at "less than 20%" of spend. The August report shows 23%.

## Next steps

| Owner | Action | Status |
|---|---|---|
| Jordan | Send the full company presentation to Lawrence | open |
| Henry | Ask Ruben how the free tools affect the conversion pipeline | open |
| Lawrence | Send the Prosomo dashboard and one-page reports to Jordan by WhatsApp | August one-pager received |
| Lawrence | Grant access to GA4, GTM, and Search Console | open |
| Jordan, Zaid | Run the data audit and competitor analysis, then write the growth proposal | open |
| Jordan | Deliver the proposal the week of 2026-09-21, after internal review | open |

## Questions for the audit and proposal

- Does SignWell send qualified sign-ups and purchases back to Google Ads as offline or enhanced conversions, and with what values?
- Is `accounts.google.com` in the GA4 referral exclusion list?
- Which non-brand keywords get the $9,088, and do any of them target competitor names from the Tier 2 set or Dropbox Sign?
- How do the healthcare (HIPAA/BAA) and Spanish-language segments convert compared with the account average?
- What share of paying customers are API embedders, and which channel brought them in?
