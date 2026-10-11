# UNITAR - MY - Degree (905-920-2225): conversion setup, Google recommendations, and observations

Pulled from the Google Ads UI on 2026-10-09 by browser, read-only. Date range "Last 30 days" = 9 Sep to 8 Oct 2026.

## A. Conversion goals (Goals > Summary)

Conversion goals and actions are owned by the manager account UNITAR - MY (689-508-2001); changes must be made there.

| Goal | Campaigns using it | Primary actions | Status |
|---|---|---|---|
| Purchase | 0 of 178 | 0 | Misconfigured |
| Shop visit | 0 of 178 | 1 | Needs attention |
| Submit lead form | 0 of 178 | 3 | Needs attention |
| Contact | 0 of 178 | 1 | Active |
| Get directions | 0 of 178 | 1 | Active |
| **Download** (Account default) | 86 of 178 | 0 | Misconfigured |
| **Engagement** (Account default) | 86 of 178 | 2 | Active |
| Page view | 0 of 178 | 3 | Active |
| Qualified lead | 0 of 178 | 0 | Misconfigured |
| **Converted lead** (Account default) | 86 of 178 | 0 | Misconfigured |
| **Leads from messages** (Account default) | 86 of 178 | 1 | Active |
| **YouTube follow-on views** (Account default) | 86 of 178 | 1 | Active |
| Custom goal **"generate_lead"** | 92 campaigns | 1 action (Website) | n/a |

So: 92 campaigns optimise to the custom goal "generate_lead" (one website action). The other 86 campaigns use the ACCOUNT DEFAULT goals, which are Engagement + Leads from messages + YouTube follow-on views (+ two misconfigured goals with zero actions). "Submit lead form" is NOT an account-default goal.

**Verified on one campaign:** SEM_Accounting_T1a+T2_EN (launched 10 Aug 2026) shows "Your Search campaign is optimised to drive Engagements, Leads from messages + 1 more", Conversion goals = "Account default: Engagements, Leads from messages and 1 more", Bidding = Maximise conversions (no target), Networks = Google Search Network, Search partners, Display Network, AI Max = off. It is inferred (not verified one by one) that all 20 campaigns launched 10 Aug 2026 (IDs 24120843xxx) are on the account default goal, because all 20 show 0.00 conversions over 30 days on ~RM 5.9k combined spend, and all share the same settings. The September monthly report (clients/audaura-unitar/04-reports/monthly-report-2026-09.md line 141) independently noted "Foundation in InfoTech_BM: RM5,938.55 with 0 conversions ... Google flags its goal as missing a primary conversion action".

## B. Conversion actions (Goals > All conversions), All conv. last 30 days, sorted by volume

Source "[MCC]" = owned by manager 689-508-2001.

| Action | Source | Tracking status | Primary/Secondary | Count | Window | All conv. |
|---|---|---|---|---|---|---|
| Local actions - Other engagements | Google hosted [MCC] | Active | Primary | Every | 30d | 9,527 |
| Store visits | Store [MCC] | Needs attention | Primary | Every | 30d | 3,731.85 |
| Local actions - Directions | Google hosted [MCC] | Active | Primary | Every | 30d | 2,995 |
| **Unitar Website - Thank You Page** | Website [MCC] | Active | Primary | One | 30d | 2,985.98 (value 0) |
| step2_validating | Website (Salesforce.com) [MCC] | Active | **Secondary** | Every | 90d | 1,556.21 |
| step4_appointment | Website (Salesforce.com) [MCC] | Active | **Secondary** | Every | 90d | 1,202.57 |
| Clicks to call | Google hosted [MCC] | Active | Primary | Every | 30d | 724 |
| step5_engagement | Website (Salesforce.com) [MCC] | Active | **Secondary** | Every | 90d | 432.33 |
| Unitar - New Website - GA4 (web) generate_lead | GA4 [MCC] | No recent conversions | Primary | Every | 90d | 429.38 |
| step1_generate_lead | Website [MCC] | Needs attention | Primary | One | 30d | 410.88 |
| Local actions - Website visits | Google hosted [MCC] | Active | Primary | Every | 30d | 275 |
| Opportunity - Opportunity Stage becomes Applied + Enrolled | Import from clicks [MCC] | Active | **Secondary** | One | 90d | 210.19 |
| step6_applied | Website (Salesforce.com) [MCC] | Active | **Secondary** | Every | 90d | 79.11 |
| Unitar - GA4 (web) click_to_call | GA4 [MCC] | Active | Secondary | Every | 90d | 75 |
| Unitar - GA4 (web) click_to_email | GA4 [MCC] | Active | Secondary | Every | 90d | 60 |
| Unitar - GA4 (web) download_program_brochure | GA4 [MCC] | Active | Secondary | Every | 90d | 58 |
| Conversation started | Google hosted [MCC] | Active | Primary | One | 30d | 9 |
| step3_contact | Website (Salesforce.com) [MCC] | No recent conversions | Secondary | Every | 90d | 4 |
| step7_appliedv2 | Salesforce [MCC] | No recent conversions | Secondary | Every | 90d | 0 |
| step2..step7 (Import from clicks, account-level duplicates) | Import from clicks | Needs attention | Secondary | Every | 90d | 0 each |
| ~25 further legacy actions (UA goals, Smart campaign actions, removed tests, duplicated GA4 actions, Android installs, YouTube subscriptions) | various | No recent conversions / Removed / Inactive | mixed | | | 0 |

58 conversion actions in total.

Observations:
- Campaign "Conversions" total (2,796.98) ≈ "Unitar Website - Thank You Page" (2,985.98) → the custom goal "generate_lead" is almost certainly the Thank You Page action. It is One-count with value 0, so tCPA bids treat every form fill as equal.
- Salesforce funnel stages ARE flowing back into Google Ads (validating 1,556; appointment 1,203; engagement 432; applied 79; opportunity Applied+Enrolled 210) but every one is Secondary, so Smart Bidding never sees lead quality. Ratio vs Thank You Page leads: validating ≈ 52%, appointment ≈ 40%, applied+enrolled ≈ 7%.
- The "Qualified lead" and "Converted lead" goal categories are Misconfigured (no actions assigned) even though the Salesforce stages exist; they are filed under other categories.
- Multiple duplicate step2..step7 actions exist in both MCC and account level; account-level copies all "Needs attention" with 0.
- Local actions (Business Profile) are Primary and very large (9.5k engagements, 3k directions, 3.7k store visits) but are only counted for campaigns on the account-default goal; for those campaigns they could distort bidding if location assets exist.

## C. Google recommendations (Recommendations page)

Optimisation score 48.9% (down 7%). Category uplifts: Repairs +0.5%, Bidding & budgets +7%, Keywords & targeting +15%, Ads & assets +11%, Automated campaigns +19%.

- Turn on AI Max for Search (+10.3%, 42 recs)
- Create a Performance Max campaign (+10.1%)
- Add broad match keywords (+8.4%, 47 recs). Top bid signals Google cites: Device Desktops, Location Petaling Jaya, Weekdays before 6am, query "unitar mba online" on mobile.
- Improve responsive search ads (+6.6%): **172 RSAs have ad strength below "Good"**
- Add a Demand Gen campaign (+6.6%)
- Portfolio strategy with shared budget (+4.8%)
- Move unused budgets / Optimise budgets (+2% each): Brand_T1a (+49.8 conv/week est. at MYR 2.7k/day), Brand_T2 (+25.8 conv/week at MYR 2k/day), diploma_T1a_BM (+3.06 at MYR 350/day). Google says these are "over-performing in CPA" vs target.
- Refresh Customer Match lists (+1.5%, 12 recs): lists used for observation/targeting/exclusion not updated in 90+ days
- Add images to ads (+1.1%, 21 recs)
- **Remove conflicting negative keywords (+0.9%, 17 recs): negatives are blocking own keywords incl. "unitar diploma courses", "unitar diploma in psychology", "unitar doctorate", "unitar master"**
- Display Expansion (+0.7%, 45 recs)
- **Remove redundant keywords (+0.7%, 883 recs)**: same ad group, destination and bid strategy
- Add new keywords (+0.7%, 99 recs): psychology programs, management degree, adult courses near me, leadership and management training courses
- Add RSAs (+0.6%, 33 recs): ad groups with fewer than 3 RSAs
- **2 ad groups have no ads**: Unitar_Pre-U_SEM_Broad Match; T1a_EN_Conventional_phd_in_education
- AI Max with brand inclusions (3 recs); add business logo (none attached); opt in to search partners (+0.3%)

## D. Gaps (not collected; browser too slow or would require changing the shared UI view)

- Impression share / lost IS (budget, rank) per campaign: not a default column; adding columns would change the team's saved view.
- Disapproval reasons per ad: the shared Ads view carries a team filter (Ad status Enabled, Cost > MYR1, Ad text contains "self"); not altered. Campaign-level status shows which campaigns have disapproved/limited ads (see 01-campaigns-last30d.csv).
- Change history (budget/tCPA edits in the window): page timed out.
- Auction insights for brand campaigns, device/location/hour breakdowns, landing page report, Search partners vs Google split, keyword Quality Scores.
