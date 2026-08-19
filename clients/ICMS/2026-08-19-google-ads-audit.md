---
client: icms
platform: google-ads
account_id: 255-593-6693
account_name: "Google Ads account (ICMS, International University College of Management and Sports)"
audit_date: 2026-08-19
data_window: 2026-07-20 to 2026-08-18 (last 30 days, GMT+8 Malaysia)
currency: MYR
auditor: Toggle Solutions
access_level: Google Ads reports only (read-only)
rounds: 2 (round 1 collection, round 2 verification)
---

# Google Ads audit: ICMS (255-593-6693)

## How to read this

This audit covers the last 30 days of data (20 July to 18 August 2026). The account is young. The Search campaigns started on 18 July 2026, so this window is close to the full life of the account. Findings are graded by how much money they are costing right now.

Two things to note before the findings. First, Toggle (media@audaura.my) was granted access on 18 August 2026 at 18:15 with the permission level "Google Ads reports only", which is read-only. None of the fixes below can be applied by us until ICMS upgrades that access to Standard or Admin. Second, several numbers in the account interface are misleading because conversion tracking is broken, and that is finding number one.

## Headline numbers (last 30 days)

| Metric | Value |
|---|---|
| Impressions | 10,592 (down 31,734 versus the prior 30 days) |
| Clicks | 752 |
| CTR | 7.10% |
| Average CPC | MYR 3.78 |
| Cost | MYR 2,840.13 (up MYR 2,207.04 versus the prior 30 days) |
| Reported conversions | 12.00 (down 1,422 versus the prior 30 days) |
| Reported cost per conversion | MYR 236.68 |
| Verified lead form submissions | 0 |
| Daily budget across enabled campaigns | MYR 130.00 |
| Optimisation score | 63.9% |

| Campaign | Type | Status | Budget/day | Cost | Clicks | CTR | Avg CPC | Conv | CPA |
|---|---|---|---|---|---|---|---|---|---|
| ICMS - DEM - Working Adults - Search | Search | Enabled | MYR 60 | MYR 1,161.31 | 438 | 9.78% | MYR 2.65 | 0.00 | n/a |
| ICMS - DEM - School Leavers - Search | Search | Enabled | MYR 70 | MYR 1,678.82 | 314 | 5.14% | MYR 5.35 | 12.00 | MYR 139.90 |
| Penguatkuasaan Undang-Undang | Performance Max | Paused | MYR 100 | MYR 0.00 | 0 | n/a | n/a | 0.00 | n/a |

## Critical findings

### 1. Every lead form conversion action is misconfigured and reports zero

The account default goal "Submit lead form" is flagged **Misconfigured** by Google, with the explanation: this goal cannot be used in optimisation or shown in results reporting. That goal is applied to all three campaigns. Inside it sit four conversion actions:

| Conversion action | Optimisation | Source | Conversions | Status |
|---|---|---|---|---|
| Form | Primary | Website (Google Analytics 4) | 0.00 | Misconfigured |
| Submit Lead Form | Primary | Website | 0.00 | Misconfigured |
| Submit lead form (Form submission https://icms.edu.my/contact-us/contact-us/) | Primary | Website | 0.00 | Misconfigured |
| Submit lead form (Page load icms.edu.my) | Secondary | Website | 732.00 | Active |

Three separate primary actions all intended to count the same lead, all recording zero. The only action firing is a page load on icms.edu.my, which recorded 732 conversions against 752 clicks. That action counts a landing page view, not a lead.

The consequence is severe. Both Search campaigns run the **Maximise conversions** bid strategy against a goal that Google says cannot be used for optimisation. Smart Bidding has been spending MYR 2,840 in 30 days with no valid conversion signal to learn from.

The URL registered on one of the actions is `https://icms.edu.my/contact-us/contact-us/`, a doubled path that redirects to `https://icms.edu.my/contact-us/`. A conversion rule keyed to a URL that redirects is a likely reason the trigger never fires. Google's account banner also reports "Enhanced conversions not recording".

**Fix:** stop all optimisation work until one clean lead conversion action exists. Build a single server-side or thank-you-page conversion for the enquiry form, mark it Primary, mark everything else Secondary, delete the duplicates, and confirm with Google Tag Assistant that it fires. Nothing else in this audit matters until this is done.

### 2. The reported 12 conversions are not leads

Because the lead form actions all report zero, the 12 conversions shown at campaign level come from the remaining primary actions in the account, which are all Google-hosted local actions from the linked Business Profile:

| Conversion action | Optimisation | Source | Conversions | Status |
|---|---|---|---|---|
| Clicks to call | Primary | Google hosted | 2.00 | Active |
| Local actions, Directions | Primary | Google hosted | 8.00 | Awaiting conversions |
| Local actions, Other engagements | Primary | Google hosted | 21.00 | Active |
| Local actions, Website visits | Primary | Google hosted | 3.00 | Active |

Someone tapping "Get directions" or "Website visit" on a Business Profile is not an admissions enquiry. Setting those as Primary inflates the conversion count and, worse, feeds Smart Bidding a signal that has nothing to do with enrolment. The reported MYR 139.90 cost per conversion for the School Leavers campaign describes a mix of directions taps and profile engagements, so it should not be quoted to the client as a cost per lead.

The prior 30-day period reported 1,434 conversions against this same account. That number was almost certainly the page-load action counting every visit. Any historical performance claim built on it is worthless.

**Fix:** demote all four local actions to Secondary. Keep them visible for reporting, keep them out of bidding.

### 3. The Working Adults campaign has spent MYR 1,161 for zero conversions

438 clicks, a 9.78% click-through rate, and nothing recorded. The CTR says the ads are relevant to the query. The zero says either the tracking is broken (finding 1) or the landing page cannot convert this audience, or both.

The keyword data points at a second problem. Every top keyword in this campaign is a generic diploma query:

| Keyword | Match | Campaign | Impr | Clicks | CTR | Cost | Conv |
|---|---|---|---|---|---|---|---|
| diploma kemahiran | Broad | Working Adults | 1,255 | 187 | 14.90% | MYR 496.97 | 0 |
| diploma programmes | Broad | Working Adults | 714 | 48 | 6.72% | MYR 124.62 | 0 |
| diploma separuh masa | Broad | Working Adults | 420 | 41 | 9.76% | MYR 107.61 | 0 |
| without SPM diploma | Broad | Working Adults | 445 | 38 | 8.54% | MYR 81.48 | 0 |
| diploma part time | Broad | Working Adults | 393 | 36 | 9.16% | MYR 105.71 | 0 |
| "diploma selepas spm" | Phrase | School Leavers | 711 | 57 | 8.02% | MYR 499.92 | 1 |
| "law enforcement course malaysia" | Phrase | School Leavers | 535 | 51 | 9.53% | MYR 293.25 | 6 |
| "diploma awam malaysia" | Phrase | School Leavers | 630 | 44 | 6.98% | MYR 265.75 | 0 |
| [icms college malaysia] | Exact | School Leavers | 408 | 37 | 9.07% | MYR 203.43 | 0 |
| diploma sukan malaysia | Broad | School Leavers | 2,694 | 66 | 2.45% | MYR 172.48 | 0 (paused) |

Both ads in the account promote one programme, the Diploma Penguatkuasaan (law enforcement). Someone searching "diploma kemahiran" or "diploma programmes" wants a course catalogue. They land on a single-programme page. The one keyword that matches the offer, "law enforcement course malaysia", produced 6 of the 12 recorded conversions at MYR 48.87 each, roughly a fifth of the account average.

**Fix:** cut the generic diploma keywords or move them to a campaign that points at a programme listing page. Concentrate spend on law enforcement and enforcement-adjacent intent, which is the only intent the current creative and landing page can serve.

### 4. Search terms show untargeted spend and a large hidden tail

Only 503 of 752 clicks (67%) appear in the search terms report. "Other search terms" absorbed 249 clicks and MYR 1,083.68, which is 38% of total spend, at a reported MYR 541.84 per conversion. That hidden tail is a direct consequence of running broad match on a low-volume account.

Terms that should never have been paid for and are not excluded:

| Search term | Match | Campaign | Clicks | Cost | Excluded |
|---|---|---|---|---|---|
| https penajaan jpa gov my | Broad | Working Adults | 6 | MYR 10.09 | No |
| mara scholarship | Broad | Working Adults | 4 | MYR 8.18 | No |
| lepasan spm | Broad | Working Adults | 5 | MYR 10.21 | No |
| city university malaysia | Broad | School Leavers | 8 | MYR 22.41 | No |

The first two are government scholarship searches, not course searches. The fourth is a competitor brand.

Separately, the brand term "icms malaysia" took 24 clicks and MYR 112.64 at MYR 4.69 per click with zero conversions. Paying MYR 4.69 for your own brand name is high, and brand traffic sits inside the same generic campaign as everything else, so there is no way to control brand spend or read brand performance on its own.

**Fix:** build a scholarship and financing negative list, exclude competitor brands, split brand into its own campaign, and move the volume keywords from broad to phrase until the conversion signal is trustworthy.

## Structural findings

### 5. One ad group per campaign, both named "Ad group 1"

The account holds 80 keywords across exactly two ad groups. Both are named "Ad group 1", which tells you nobody planned the structure. Ten keywords carry 10,205 of 10,592 impressions, so about 70 keywords delivered under 400 impressions between them in a month.

Broad, phrase, and exact match sit in the same ad group with no theme separation. That makes it impossible to write ad copy that matches the query, and impossible to read performance by theme.

**Fix:** rebuild into themed ad groups (law enforcement, part-time and working adult, brand, competitor conquest) with 5 to 15 tight keywords each, and delete the long tail that has never served.

### 6. One responsive search ad per ad group, both rated Average

The account contains two ads in total. Google rates both **Average** ad strength, and the account carries an open recommendation titled "Improve your responsive search ads" for ads below Good.

Running a single ad per ad group means there is no test running, and there never has been. Ad rotation is set to "Optimise: prefer best performing ads", which has nothing to choose between.

**Fix:** add a second RSA per ad group with different angles (fees and PTPTN, accreditation, career outcome, intake deadline), pin nothing that is not legally required, and push both ads to Good or Excellent.

### 7. Assets are almost entirely missing

The account has six advertiser-created assets in total:

| Asset | Type | Campaign | Status |
|---|---|---|---|
| Intake Julai 2026 | Callout | Working Adults | Eligible |
| Daftar Online 24/7 | Callout | Working Adults | Eligible |
| Sijil Diiktiraf Kerajaan | Callout | Working Adults | Eligible |
| PTPTN & Biasiswa Tersedia | Callout | Working Adults | Eligible |
| 0129828220 | Call | Penguatkuasaan Undang-Undang (paused) | Eligible |
| Pengambilan Ogos 2026 | Lead form | Penguatkuasaan Undang-Undang (paused) | **Disapproved: insufficient original content** |

Filtering the asset report to sitelinks returns "No assets match your filters". There are **zero advertiser sitelinks** in the account. The 1,216 sitelink impressions recorded come from Google's automated sitelinks, not from anything ICMS wrote.

The School Leavers campaign, which spends the most and holds the only converting keyword, has **no assets at all**: no callouts, no sitelinks, no structured snippets, no call asset.

For a college where the phone is the primary enquiry channel, there is no call asset on either live Search campaign. The only call asset sits on a paused Performance Max campaign.

The one lead form asset in the account is disapproved for insufficient original content and has never served.

**Fix, in priority order:** six sitelinks per campaign, a call asset on both Search campaigns, structured snippets for programme types, callouts copied to School Leavers, and either repair or remove the disapproved lead form.

### 8. Campaign settings are inconsistent and too loose

Verified on ICMS - DEM - School Leavers - Search:

| Setting | Current value | Assessment |
|---|---|---|
| Networks | Google Search Network plus Search partners | Search partners on, unproven, and not segmented in reporting |
| Locations | Malaysia | Reasonable for a national intake |
| Location option | Presence or interest | Should be Presence only |
| Languages | English and Malay | Correct |
| Bidding | Maximise conversions, no target CPA | Running against a broken goal |
| Conversion goals | Account default: Submit lead forms | The misconfigured goal from finding 1 |
| Start date | 18 July 2026 | Account is one month old |
| AI Max | Off | Correct for now |
| Broad match keyword setting | Off | Correct |
| Automatically created assets | Off | Defensible, but it removes a free asset source while real assets are missing |
| Ad schedule | All days, all hours | No dayparting, no review |
| Campaign URL options | None set | No tracking template, so no click-level attribution outside Google |

"Presence or interest" targeting means people who have merely shown interest in Malaysia, including searchers sitting outside the country, can see these ads. For a physical college in Petaling Jaya recruiting Malaysian students, that is a leak.

The account also carries a live Google recommendation to "Opt in to Google search partners network", which means at least one campaign is opted out while School Leavers is opted in. Two sibling campaigns built a day apart should not have different network settings. Whichever way the decision goes, make it the same on both.

### 9. Negative keywords are duplicated per campaign and are blocking real traffic

There are 53 negatives, every one of them added at campaign level. There is no shared negative list, so "city university" was added twice, once per campaign, and every future addition needs doing twice.

Google also flags two keywords currently blocked by the account's own negatives: "diploma lepas spm sukan" and "diploma bola sepak malaysia". The negative "bola sepak" is blocking sports diploma keywords that someone deliberately added. Either the keywords or the negatives are wrong, and right now both are sitting in the account cancelling each other out.

Three keywords are flagged as redundant duplicates within the same ad group: "intake diploma", [kursus penguatkuasaan undang-undang], and [diploma undang-undang malaysia].

**Fix:** create two shared negative lists (universal junk, and competitor and scholarship terms), apply both to every campaign, then remove the per-campaign duplicates and resolve the conflicts.

### 10. The landing page is a contact page, not a landing page

The enquiry destination is the site's Contact Us page. The form sits below the address block and a map, asks for name, email, phone, programme of interest, and a free-text message, and is gated by a reCAPTCHA checkbox before a "Get In Touch" button.

Three problems for paid traffic. The form is below the fold on a page whose main job is showing an address. The field count and the reCAPTCHA add friction to every submission. And the submission appears to complete without a distinct thank-you URL, which is exactly why a page-load conversion rule never fires.

**Fix:** build a dedicated landing page per campaign theme, with the form above the fold, three or four fields, and a real thank-you URL that the conversion action can key on.

### 11. Optimisation cadence has been thin, and nobody has touched the tracking

The full change history for the last 30 days is 37 entries. The substantive work happened on two days:

- 28 July: 20 negatives added to Working Adults, several broad match keywords paused, one budget increase.
- 10 August: 3 negatives added per campaign, one budget increase.

Nothing since 10 August, which is eight days of unmanaged spend at the time of this audit. There is not a single change in the "Conversion" category, meaning the broken tracking described in finding 1 has never been touched since launch. All changes were made by info@icms.edu.my through the web interface.

### 12. The Performance Max campaign is paused with a MYR 100 budget attached

"Penguatkuasaan Undang-Undang" holds the largest budget in the account (MYR 100 per day, against MYR 130 total for the two live campaigns) and has delivered zero impressions. It carries the only call asset and the disapproved lead form asset. Google's recommendation list includes "Fix low budget" and "Improve your Performance Max asset groups" (ad strength below Excellent) for it.

Leaving a paused Performance Max campaign with a larger budget than both live campaigns combined suggests it was launched, judged, and abandoned without a decision being recorded.

**Fix:** decide. Either remove it, or rebuild the asset group and relaunch it after conversion tracking is fixed. Do not relaunch Performance Max while the only working conversion signal is a page load.

## What Google is recommending, and why most of it should be refused

Optimisation score sits at 63.9%. That score is Google's, not a performance measure, and applying its suggestions blindly on this account would make things worse. The current recommendation list, with our position on each:

| Google recommendation | Uplift claimed | Our call |
|---|---|---|
| Turn on AI Max for Search campaigns | +12.4% | **Refuse for now.** AI Max widens matching. Widening matching against a broken conversion signal spends faster in the wrong places. |
| Add broad match keywords | +7.5% | **Refuse.** 38% of spend is already in the untraceable "other search terms" bucket. |
| Use Display Expansion | +0.9% | **Refuse.** Display traffic on a lead-gen account with no working tracking is a guaranteed leak. |
| Opt in to Google search partners network | +1.0% | **Hold.** Make both campaigns consistent, then test with segmented reporting. |
| Set a target CPA | +4.8% | **Hold.** A target CPA is meaningless until a real lead conversion exists. |
| Add sitelinks | +2.9% | **Apply.** Write six per campaign by hand. |
| Add structured snippets | +2.5% | **Apply.** Missing from both live campaigns. |
| Add callouts | +1.5% | **Apply.** Missing from School Leavers. |
| Add images to ads / dynamic images / business logo | +6.8%, +4.1% | **Apply.** Use ICMS assets, not auto-generated ones. |
| Remove conflicting negative keywords | +1.2% | **Apply after review.** Decide whether sports diplomas are in scope first. |
| Remove redundant keywords | +0.8% | **Apply** as part of the ad group rebuild. |
| Add lead form ads | +1.6% | **Hold** until the existing disapproved lead form is fixed. |
| Use a portfolio bid strategy | n/a | **Hold.** Two campaigns with different audiences and different CPCs should not share a budget yet. |
| Improve responsive search ads | +0.1% | **Apply.** Both ads are rated Average. |

## Priority action plan

### Week 1: stop the bleeding

1. Get Standard or Admin access for Toggle. Reports-only access blocks every item below.
2. Build one clean lead conversion action with a thank-you page or server-side event, mark it Primary, and verify it fires.
3. Demote the page-load action and all four local actions to Secondary.
4. Delete the two duplicate lead form actions and the broken GA4 "Form" import.
5. Pause the generic diploma keywords in Working Adults that have spent over MYR 80 with zero conversions.
6. Add scholarship and competitor negatives as shared lists applied to both campaigns.
7. Change location targeting from "Presence or interest" to "Presence" on both campaigns.

### Weeks 2 to 3: rebuild the foundation

8. Restructure into themed ad groups with real names, and split brand into its own campaign with its own budget.
9. Write six sitelinks, four callouts, and two structured snippet sets per campaign, and add a call asset to both live Search campaigns.
10. Add a second RSA per ad group and lift ad strength to Good or better.
11. Build a dedicated landing page per theme with the form above the fold and a real thank-you URL.
12. Resolve the negative keyword conflicts and remove the redundant keywords.

### Week 4 onward: optimize on real data

13. Let Maximise conversions relearn on the new signal for two to three weeks before touching bids.
14. Once 30 conversions accumulate in 30 days, move to Target CPA with a target set from actual data.
15. Decide the fate of the paused Performance Max campaign and release its MYR 100 budget either way.
16. Set a weekly optimisation cadence: search term review, asset performance, and a written change log.

## What this audit could not verify

Stating these plainly rather than guessing:

- **Impression share and lost impression share.** Adding competitive metrics columns needs table edits the reports-only role handled unreliably during this session. This matters because it decides whether budget or Ad Rank is the growth constraint, so pull it as soon as access is upgraded.
- **The exact final URL on both responsive search ads.** The visible display path is `icms.edu.my/diploma/penguatkuasaan`, which does not resolve on the live site, but a display path is not required to be a real URL. Read the true final URL from the ad editor once we have edit access.
- **Device and audience performance splits.** Not captured in this pass.
- **The Working Adults campaign settings panel.** It would not open during this session. Settings above are verified on School Leavers only, and the Google recommendation about search partners suggests the two campaigns differ.
- **Which specific conversion actions produced the 12 reported conversions.** The four local actions total 34 recorded conversions over this window, so the campaign-level figure of 12 is a subset. What is verified beyond doubt is that none of the 12 came from a lead form, because all three lead form actions report zero.

## Bottom line

ICMS spent MYR 2,840 in 30 days and can prove zero enquiries from it. The account is not underperforming because of bids, budget, or copy. It is underperforming because the conversion tracking has never worked, the bid strategy has been optimizing against a goal Google itself marks as unusable, and one generic keyword set points at a single-programme page.

The good news is that the one keyword aligned with the actual offer, "law enforcement course malaysia", delivered leads at MYR 48.87 against an account average of MYR 236.68. There is a working campaign inside this account. It needs measurement first, structure second, and only then more budget.
