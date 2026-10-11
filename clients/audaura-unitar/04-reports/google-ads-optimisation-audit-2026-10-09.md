---
client: audaura-unitar
title: Google Ads optimization audit, UNITAR - MY - Degree
account: 905-920-2225 (manager 689-508-2001)
date_range: 2026-09-09 to 2026-10-08 (last 30 days)
pulled: 2026-10-09, Google Ads UI, read-only
scope: the 69 campaigns with spend (all Search)
method: 2 rounds. Round 1 data pull and draft; round 2 three parallel critics (budget economics, query and structure, measurement and bidding), each defaulting to "refuted" unless the data supported the claim.
audience: internal. Strip any agency branding before this reaches UNITAR (white-label rule, CLIENT.md).
---

# Google Ads optimization audit: UNITAR - MY - Degree

The account spent MYR 344,880 across 69 Search campaigns for 2,797 conversions (CPA MYR 123.30). Raw data is in `google-ads-audit-2026-10-09-data/`.

| Segment | Campaigns | Spend | Share | Conv | CPA |
|---|---|---|---|---|---|
| Brand | 4 | 103,443 | 30.0% | 636 | 162.6 |
| Programme (Jun 2025 build) | 17 | 78,257 | 22.7% | 699 | 111.9 |
| Low intent (Level of study, Area of study) | 2 | 49,382 | 14.3% | 445 | 111.0 |
| SPM | 6 | 46,383 | 13.4% | 425 | 109.1 |
| Postgrad | 6 | 40,925 | 11.9% | 371 | 110.3 |
| City campaigns (Mar 2026) | 10 | 17,429 | 5.1% | 166 | 104.9 |
| New programme campaigns (10 Aug 2026) | 21 | 5,986 | 1.7% | 0 | none |
| Competitor | 3 | 3,076 | 0.9% | 55 | 56.4 |

Daily budgets total MYR 30,839, while spend runs at MYR 11,496 a day (37%). Only 3 of 69 campaigns are limited by budget. Budget is not what holds this account back; targets, goals and query control are.

## Do this week

**1. Point the 21 campaigns launched on 10 Aug at the right goal, or fold them in.** All 21 use the account-default goal (Engagements, Leads from messages, YouTube follow-on views), so they record zero conversions on MYR 5,986 and bid blind. I verified this on SEM_Accounting_T1a+T2_EN, and the September report flagged the same symptom. All 21 also run with Display Network on, location set to all of Malaysia, and English as the language on the 10 BM campaigns.
- Set the goal to the custom goal **generate_lead**. Do not use the "Submit lead form" goal: it holds 3 primary actions and would count one form fill up to three times.
- Turn Display Network and Search partners off.
- Copy the older campaigns' locations (13 states, 8 exclusions) and set the BM campaigns to Malay.
- Better option: these duplicate existing ad groups (Education, Accounting, PGDE, MBA, ECE), so move their keywords into those campaigns and pause the 21.

**2. Merge Brand_T2 and Brand_T2_Test.** Both target the same states with the same 13 keywords, at tCPA 200 and tCPA 100 respectively. Brand_T2 uses 99% of its budget and spills auctions into the Test campaign, so the "test" has no clean read. On the core "unitar" exact term they perform the same (CPA 91.8 and 89.1), but Brand_T2 pays MYR 4.00 per click against MYR 3.08. Keep the tCPA 100 campaign and pause Brand_T2, and expect the surviving campaign's CPA to rise as it absorbs the volume.

**3. Lower Brand_T1a from tCPA 200 to 100 to 120.** The T1a and T2 brand campaigns spend MYR 39.5k on searches other than "unitar" itself, at CPA 314, against 168 in T2_Test and 142 in T1b, which both run at tCPA 100. A realistic saving is about MYR 9k a month, with a ceiling of about MYR 18k.

**4. Reject Google's three budget recommendations** (Brand_T1a to MYR 2.7k a day, Brand_T2 to MYR 2k, diploma_T1a_BM to MYR 350). Google's own estimates put the extra conversions at MYR 253, 220 and 343 each. Both brand campaigns already run at or above their target over 30 days, so they are not over-performing it. A bigger Brand_T1a would also take brand auctions that SPM_T1a_EN currently wins at CPA 48.

**5. Add the account-level negative list.** Add these as phrase match unless shown in brackets as exact:
- "login"
- "portal"
- "auth unitar"
- [cn unitar]
- "international students"
- "international scholarship"
- [scholarships for women over 50]

Student-login searches alone cost MYR 461 with zero conversions. Leave "phd" and "results" off the account list, because there is a live PhD in Education ad group and SPM leavers search for results.

## Do in the next two weeks

**6. Lock down the Psychology campaign (MYR 22.5k).** 94% of its spend in the sample went on searches that have nothing to do with psychology. MYR 4,035 of that went on scholarship hunting, such as "full scholarships for international students" and "scholarships for women over 50". Its CPA (about 114) looks normal, so these leads may never validate. The CTRs of 35 to 68% and CPMs of MYR 2,000 to 3,100 on those terms also point to Search partner or invalid traffic.
- Add phrase negatives: "scholarship", "scholarships", "phd", "upu", "oum", "unikl". Add [training and certification] as exact.
- Move the campaign off broad match.
- Check the location option is set to "Presence" only.

**7. Add per-group negatives selectively, because some public-institution searches convert.** In SPM campaigns, UPU, politeknik and UiTM application searches cost MYR 9,320 at CPA 105, which matches the account average, so keep them. Outside SPM the same theme runs at CPA 173.
- **SPM**, exact: [scholarship], [schola], [mohon tvet gov my], [tvet], [upu 2026], [universiti tunku abdul rahman]. Phrase: "tvet madani", "politeknik kota kinabalu".
- **Postgrad and every PGDE/DPLI ad group**, phrase: "upu", "uitm shah alam", "politeknik", "spm". The PGDE broad ad group inside Area of study spent MYR 1,526 on "upu" searches at CPA 130 to 268.
- **Diploma, Business, Level of study, Area of study and Conventional Degree**, phrase: "up_tvet", "polycc", "upu online". Add "politeknik" in the diploma ECE ad groups only.
- **Do not negate these, because they convert:**
  - upu online, upu, permohonan upu, politeknik and permohonan politeknik (inside SPM)
  - uitm permohonan, https mohon tvet gov my, selangkah uitm
  - utar, unirazak and uts sibu (inside SPM)
  - kolej komuniti (CPA 127 for the certificate audience)
  - the DPLI competitor variants (MYR 3,650 at CPA 88)
  - unitar mba and mba unitar (in Postgrad)
- **Pause, do not negate:** "university near me" is one of our own exact keywords (MYR 65, 0 conversions).

**8. Move competitor names into the Competitor campaigns.** Competitor-name searches run through generic campaigns cost MYR 6.5k at CPA 121 to 154. Inside the Competitor campaigns they cost CPA 56 to 72, but those campaigns use only 16 to 18% of their budgets.
- Add the converting competitor names to the Competitor campaigns as exact keywords: OUM, UniKL, UNIRAZAK, City University, Lincoln, Monash, Sunway, APU, Al Bukhari.
- Then add those names as phrase negatives in the generic campaigns.
- Drop "open university malaysia" and "unirazak" from the Competitor_T1a EN ad group, since neither has converted there.

**9. Check Search partners.** Search partners are on in 65 of 69 campaigns, covering MYR 317k (92% of spend). Segment by network for the same 30 days and switch partners off wherever partner CPA is worse. Google's own advice at the April 2025 handover was "no Search Partners, no Display".

**10. Clean up duplicates inside campaigns (MYR 7.2k).**
- The Competitor EN and BM ad groups carry identical exact keywords, and language is set per campaign, so the two ad groups compete with each other.
- The PGDE and "PGDE Broad Match" ad groups need negatives against each other.
- masters_mba and masters_mba_updated both serve "unitar mba", at CPA 32 in one and 341 in the other. Keep the first.
- Pause the Brand_T1b Open Day ad group: MYR 179, zero conversions.

**11. Clear Google's hygiene list.**
- Remove the 17 conflicting negatives that block our own keywords, including "unitar master", "unitar diploma courses", "unitar doctorate" and "unitar diploma in psychology".
- Add ads to the 2 ad groups that have none: Unitar_Pre-U_SEM_Broad Match and T1a_EN_Conventional_phd_in_education.
- Lift the 172 RSAs that sit below Good ad strength.
- Refresh the Customer Match lists, which are 90+ days old.
- Review the disapproved ads in 16 campaigns in Policy manager. They don't measurably raise CPA (those campaigns run at 109 against 126 for the rest), but they limit rotation.

## The structural fix: bid on lead quality (8-week experiment)

The Salesforce stages already reach Google Ads and work, but all of them are Secondary:
- validating: 1,556
- appointment: 1,203
- engagement: 432
- Applied + Enrolled: 210

Bidding therefore optimizes to a one-count Thank You Page with value 0. The knowledge base (section 15, item 3) calls downstream Salesforce bidding the single highest-leverage fix, and the 26 Jun and 24 Jul WIPs both raised it. Nobody has rejected it. This fixes lead quality. It does not close the attribution part of the "5 to 18x" gap.

1. **Manager account.** Confirm that generate_lead is the Thank You Page action (knowledge base section 8 says so). Confirm with Advertica what triggers step2 and step4 in Salesforce, since status overwrites may skip stages: step3 shows 4 against 1,203 appointments. Pull the conversion lag for step2 and step4.
2. **Client account, no changes yet.** Segment All conversions by conversion action for each campaign, and compute step2 ÷ Thank You Page and cost per step4. That gives quality per campaign today without a Salesforce export, and it answers the Psychology, competitor and city-brand questions above.
3. **Manager account.** Set step2, step4 and step6 to count One. Assign them to the empty "Qualified lead" and "Converted lead" categories. Keep them Secondary account-wide.
4. **Manager account.** Set values from the funnel, anchored on Applied + Enrolled (7.0% of leads): Thank You Page 10, step2 +9, step4 +6. Add Applied + Enrolled (+117) in phase 2 only, since 210 a month is too thin and too delayed to bid on.
5. **Manager account.** Create a custom goal, quality_lead_value, holding Thank You Page, step2 and step4.
6. **Client account.** Run a Google Ads experiment with a 50/50 split. The trial arm uses quality_lead_value with Maximize conversion value at a target ROAS of about 90% of the control's value per cost (about 14% for Level of study).
   - **First wave:** Level of study, Psychology (after step 6 of this plan), and postgrad_T1a_EN, each with roughly 44 to 93 validating leads per arm per month.
   - **Keep out:** Brand, and anything under about 30 a month.
7. **Duration and reading.** Run 8 weeks: 2 learning, 4 reading, 2 for step4 to mature. Read by click-date cohort and freeze structural edits during the test.
8. **Success and stop rules.**
   - **Success:** cost per validated lead at least 10% better, and cost per appointment no worse.
   - **Stop if:** from week 3 cost per validated lead is more than 15% worse; trial spend falls below 70% of control; or imports show zero for 3 or more days.
   - **Agree up front:** Nikki must judge this on cost per validated lead, because the trial arm will look worse on blended CPL.

The manager account's default goals (Engagement, messages, YouTube views) will capture any new campaign, and any PMax campaign if someone follows Google's PMax recommendation. Fix them in the same pass.

## What the critics changed from round 1

- **Do not negate "unitar" in non-brand campaigns yet.** Brand queries there cost MYR 7,828 at CPA 52, the cheapest brand leads in the account. Moving them to Brand at tCPA 200 would add about MYR 6.5k a month for the same leads. Route them to Brand only after item 3. Report SPM_T1a_EN without brand, though: its CPA is about 191, not 98.
- **Do not cut city-name brand terms.** The C2 plan ranks Sungai Petani first by net-lead gap and Kota Bharu also high. Walk-ins, calls and directions are not in the bidding goal, so city-term CPA is probably understated. Fix the T2 overlap first, then judge city terms on the campus KPI. Separately, All_kedah uses 10% of its budget and All_KotaBharu 4%. Testing tCPA 130 to 150 on those two and All_Johor fits KPI.md better than any CPL cut. Confirm that the C2 gap figures still apply to C3.
- **Disapproved ads** are hygiene, not a spend leak.
- **Competitor campaigns** have little upside on their own, about MYR 3k. The gain comes from routing competitor names correctly.

## Missed in round 1, flagged by the critics

- **Brand CPL jumped in a month.** It rose from MYR 109 to 162 between August and September, including in the two brand campaigns at tCPA 100. tCPA 200 explains the level gap but not the jump. Change history and brand auction insights should explain it.
- **Per-campus budgets are broken.** The T1a+T2 campaigns (Level of study, Psychology, Conventional Degree, Area of study, and the 21 new ones) mix Selangor/KL with T2 campuses in one budget. That breaks the per-campus rule in KPI.md.
- **PGDE is spread over at least 5 campaigns.**
- **Location exclusions are inconsistent.** Brand and Competitor exclude 159 locations while the rest exclude 8, and nobody has documented why.
- **Spend is concentrated.** The top 10 campaigns take 62.5% of spend, and 21 campaigns spend under MYR 300 a month, which is too thin for tCPA to learn.
- **Pause or merge candidates.** Four campaigns run at 1.6 to 2.2 times target, about MYR 7.5k combined: business_T2_EN (CPA 203), postgrad_T1a_BM (218), Education_T1a (180) and Education_T2 (158).

## Limits of this audit

- **Search terms:** only the top 180 of 167,444 were read, covering 23% of spend, so the theme CPAs are directional.
- **Not pulled:** impression share, the network split, Quality Score, change history, disapproval reasons, auction insights, and device, geo and hour breakdowns. Some of these needed column changes to the team's shared view. The change history page timed out.
- **Lead quality:** no per-campaign Salesforce data was available, so every CPA here is a platform form-fill CPA. Step 2 of the experiment plan fixes that for free inside Google Ads.
