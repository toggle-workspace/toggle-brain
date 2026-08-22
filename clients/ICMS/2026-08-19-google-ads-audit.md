---
client: icms
platform: google-ads
account_id: 255-593-6693
account_name: "Google Ads account (ICMS, International University College of Management and Sports)"
audit_date: 2026-08-19
last_updated: 2026-08-22
data_window: "Part 1: 2026-07-20 to 2026-08-18. Part 2: 2026-07-23 to 2026-08-21 (GMT+8 Malaysia)"
currency: MYR
auditor: Toggle Solutions
access_level: Google Ads reports only (read-only)
rounds: 3 (round 1 collection, round 2 verification, round 3 business and website context)
sources:
  - Google Ads account 255-593-6693 (live, read-only)
  - Discovery call transcript, ICMS management (text-FD55BF683D77-1.txt)
  - icms.edu.my (live page source inspected 2026-08-22)
---

# Google Ads audit: ICMS (255-593-6693)

## How to read this

This audit covers the last 30 days of data (20 July to 18 August 2026). The account is young. The Search campaigns started on 18 July 2026, so this window is close to the full life of the account. Findings are graded by how much money they are costing right now.

Two things to note before the findings. First, Toggle (media@audaura.my) was granted access on 18 August 2026 at 18:15 with the permission level "Google Ads reports only", which is read-only. None of the fixes below can be applied by us until ICMS upgrades that access to Standard or Admin. Second, several numbers in the account interface are misleading because conversion tracking is broken, and that is finding number one.

> **Part 2 added 22 August 2026.** Part 1 below is the platform audit on its own. Part 2 starts at "Part 2: the business behind the account" and adds three things Part 1 did not have: refreshed numbers to 21 August, the proven root cause of the tracking failure read from the live page source, and the gap between what ICMS actually sells and what this account advertises. Read Part 2 before quoting anything to the client, because it changes the recommendation.

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

## Bottom line on the account

ICMS spent MYR 2,840 in 30 days and can prove zero enquiries from it. The account is not underperforming because of bids, budget, or copy. It is underperforming because the conversion tracking has never worked, the bid strategy has been optimizing against a goal Google itself marks as unusable, and one generic keyword set points at a single-programme page.

The good news is that the one keyword aligned with the actual offer, "law enforcement course malaysia", delivered leads at MYR 48.87 against an account average of MYR 236.68. There is a working campaign inside this account. It needs measurement first, structure second, and only then more budget.

---

# Part 2: the business behind the account

Added 22 August 2026. Sources for this part are the ICMS discovery call transcript, the live icms.edu.my page source, and a refreshed pull of the Google Ads account covering 23 July to 21 August 2026.

## 13. Refreshed numbers: reported conversions are now zero

| Metric | 20 Jul to 18 Aug | 23 Jul to 21 Aug | Change |
|---|---|---|---|
| Impressions | 10,592 | 10,996 | Up 404 |
| Clicks | 752 | 793 | Up 41 |
| CTR | 7.10% | 7.21% | Up |
| Average CPC | MYR 3.78 | MYR 3.96 | Up MYR 0.18 |
| Cost | MYR 2,840.13 | MYR 3,137.17 | Up MYR 297.04 |
| Reported conversions | 12.00 | **0.00** | Down 12 |

| Campaign | Cost | Clicks | Interaction rate | Avg cost | Conv | Conv rate |
|---|---|---|---|---|---|---|
| ICMS - DEM - Working Adults - Search | MYR 1,365.50 | 484 | 9.97% | MYR 2.82 | 0.00 | 0.00% |
| ICMS - DEM - School Leavers - Search | MYR 1,771.68 | 309 | 5.03% | MYR 5.73 | 0.00 | 0.00% |
| Penguatkuasaan Undang-Undang (paused) | MYR 0.00 | 0 | n/a | n/a | 0.00 | 0.00% |

Shifting the window forward by three days took the account from 12 reported conversions to zero. The most likely explanation is that all 12 fell in the 20 to 22 July period that dropped out of the window, which matches the impression spike visible at the left edge of every chart in the account. Confirm this in change history before repeating it to the client, because the alternative explanation is that someone changed the goal configuration in the last three days.

Either way the practical position is worse than Part 1 described. The School Leavers campaign no longer shows even the misleading local-action conversions that produced the MYR 139.90 figure. The account now reports a flat 0.00 conversions against MYR 3,137.17 of spend, and both campaigns still run Maximise conversions.

Google's own account banner changed to match. It now reads "Measure conversions to get the most from your spend" with a "Get started" link, alongside "Add sitelinks to your account". Google is telling ICMS the same two things this audit found first.

## 14. Root cause of the tracking failure, proven in the page source

Part 1 said the tracking was broken. Reading the live page source for `https://icms.edu.my/diploma-in-enforcement-management/` on 22 August 2026 shows exactly why:

| What was checked | Result |
|---|---|
| Google Ads tag present | Yes, `AW-18326335266` |
| GA4 tag present | Yes, `G-K9NB9HZDHE` |
| Meta pixel present | Yes, `connect.facebook.net` |
| Google Tag Manager container | **None.** Tags are installed through the Google Site Kit WordPress plugin |
| Google Ads conversion event fired anywhere on the page | **None.** `AW-18326335266` appears once, on the tag load line, with no matching `gtag('event', 'conversion', ...)` call |
| Form technology | Contact Form 7, form ID `wpcf7-f3414-p3114-o1` |
| Form action | `action="/diploma-in-enforcement-management/#wpcf7-f3414-p3114-o1"`, an AJAX submit that never leaves the page |
| Thank-you page or redirect | **None.** No "thank you" or "terima kasih" URL exists |
| `wpcf7mailsent` success event | Present, but nothing is hooked to it |

The chain is now complete and provable. The Google Ads tag loads on every page and fires a page view. Nothing ever fires a conversion event. Contact Form 7 submits over AJAX, the URL never changes, and no thank-you page exists, so there is no page load for a URL-based rule to catch and no event for an event-based rule to catch.

That single fact explains every symptom in Part 1. The auto-created "Page load icms.edu.my" action counts 732 conversions because a page view is the only thing the tag ever reports. All three "form submission" actions report zero because a form submission is never reported at all. Google Site Kit is also the reason those junk actions and the GA4 "Form" import appeared without anyone creating them.

There is a second, separate error stacked on top. The form-submission conversion action was keyed to the single URL `https://icms.edu.my/contact-us/contact-us/`. Forms sit on **every** programme page, each with its own Contact Form 7 instance. Even if URL detection had worked, it would have watched one page out of roughly forty.

**Fix, stated precisely so a developer can action it:** add a `gtag('event', 'conversion', {'send_to': 'AW-18326335266/<label>'})` call bound to the `wpcf7mailsent` event, site-wide, passing the selected programme as a parameter. That is a 30-minute job for whoever maintains the WordPress site. Building a real thank-you page is the better long-term answer because it also unlocks GA4 funnels and Meta tracking, but the event hook fixes Google Ads today.

## 15. The account advertises one programme out of eight the client is selling

In the discovery call, ICMS management named the programmes they are actively pushing this year:

| Level | Focus programmes named by ICMS |
|---|---|
| Diploma | Enforcement Management, Football Studies, Sports Science, Business Administration |
| Bachelor | Business Management, Law Enforcement |
| Postgraduate | MBA, Master of Management, DBA and PhD |

The Google Ads account advertises exactly one of these, the Diploma in Enforcement Management. Both campaigns, both ad groups, both ads and every keyword point at that one programme.

This is the single largest strategic finding in the audit, and it gets worse when you look at which programme is missing.

## 16. Football and sports, the flagship product, is actively blocked in Google Ads

ICMS says on its own homepage that it is "the only college in Southeast Asia to offer our signature Diploma in Football Studies". The homepage tagline is "Transforming Communities through Education and Sports". In the discovery call, when asked directly what the differentiator is, management answered sports. They also reported a Meta cost per lead of **MYR 2.13** for football against **MYR 7** for enforcement management, roughly a third of the price.

Here is what this Google Ads account does with that product:

| Item | Status in the account |
|---|---|
| Keyword `diploma sukan malaysia` | **Paused** (had 2,694 impressions, the highest of any keyword) |
| Negative keyword `bola sepak` | **Active** in the Working Adults campaign |
| Keywords `diploma lepas spm sukan` and `diploma bola sepak malaysia` | Blocked by the account's own negatives, flagged by Google |
| Football or sports campaign | None |
| Football or sports ad | None |

ICMS is paying Google to suppress its own flagship programme. Part 1 recorded the paused keyword and the negative conflict as housekeeping errors. With the business context they are not housekeeping, they are the account working against the commercial strategy.

The opportunity is also unusually clean. Toggle's own observation in the discovery call was that nobody is bidding on football and sports diploma terms in Malaysia on Google. Combine that with a stated MYR 2.13 Meta cost per lead and a programme with a genuine "only one in Southeast Asia" claim, and this is the highest-return single action available on the account.

## 17. No brand campaign, no competitor defense, no international campaign

Three more absences, each tied to something the client said matters.

**Brand.** The term "icms malaysia" took 24 clicks at MYR 4.69 each inside a generic campaign. There is no brand campaign. ICMS is a college fighting a perception problem, so paying MYR 4.69 to defend its own name with no dedicated budget or messaging is a straightforward loss.

**Competitors.** Management named Unicom or Unikop as the direct threat: a cooperative police college with roughly 4,000 students, a large Cyberjaya campus, and a direct-mail programme to SPM leavers using envelopes that resemble PDRM correspondence. They charge a RM1,900 registration fee against ICMS at RM300. Management also stated plainly that the police association is misleading, since no study route guarantees entry to PDRM. There is no competitor conquest campaign in the account, and "city university" is the only competitor term negated.

**International.** Management said roughly half of recent new enrollment is international, drawn from Bangladesh, Pakistan, Sri Lanka, India and China, with a Meta cost per lead of about MYR 19 on a Middle East test. Google Ads targets Malaysia only, so this entire half of the funnel has no search presence at all.

## 18. The ad copy contradicts the website in five places

Comparing the two responsive search ads against the live site:

| Ad claim | What the site says | Problem |
|---|---|---|
| "Diploma separuh masa 2.5 tahun" (part-time, 2.5 years) | The DEM page lists only "Full-time = 2 years 6 months" | The ad sells a part-time duration equal to the site's full-time duration. Either the page is incomplete or the ad is wrong |
| "PTPTN disediakan" | The DEM programme page never mentions PTPTN or fees | The visitor clicks a financing promise and lands on a page that does not mention financing |
| "Yuran Berpatutan" (affordable fees) | No fee figure appears anywhere on the site | Unverifiable by the visitor, and management confirmed fees sit at the PTPTN cap of about RM21,000 like every competitor, so affordability is parity rather than a differentiator |
| "Belajar di Kampus atau Online" (study on campus or online) | The DEM page lists no online delivery mode | Needs verification before it keeps running, because an unsupported delivery claim is a policy risk as well as a conversion killer |
| "Ambilan 2026" plus callout "Intake Julai 2026" | Programme pages say intakes are "January, May and September" | The July intake advertised has passed, and the site contradicts it anyway |

The intake story is the messiest part. The account, the site and the client give five different answers: the callout says July 2026, the disapproved lead form says August 2026, the programme pages say January, May and September, the Apply Now page sells a March 2026 intake, and management said in the call that "every month is an intake". A prospect who checks two of these sources will find them inconsistent.

## 19. Ad strength is capped by two things Google has already named

The responsive search ad editor rates both ads **Average** and gives a checklist. Two items are unresolved:

- **"Include popular keywords in your headlines"** is not done. Google lists six popular keywords for the ad group (`diploma kemahiran`, `diploma programmes`, `without SPM diploma`, `diploma separuh masa`, `diploma kerajaan`, `diploma part time`) and marks only two of the six as used, `diploma separuh masa` and `diploma kerajaan`.
- **"Add more sitelinks"** is not done, which independently confirms the Part 1 finding that the account has zero advertiser sitelinks.

The 10 visible headlines are: "Diploma Penguatkuasaan ICMS", "Program Untuk Lepasan SPM", "Yuran Berpatutan & Diiktiraf", "Daftar Sekarang, Tempat Terhad", "Diploma Enforcement Management", "Belajar di Kampus atau Online", "Sijil Diiktiraf Kerajaan", "Kerjaya dalam Penguatkuasaan", "ICMS, Kolej Bertauliah" and "Biasiswa & Pinjaman Tersedia".

Two notes on the set. "Diploma Enforcement Management" is English inside an otherwise Malay ad, which will read as filler to a Malay searcher. More importantly, not one headline carries a checkable number. The strongest, most ownable fact ICMS has is a **RM300 registration fee against Unicom's RM1,900**, and it appears in no headline, no callout, and nowhere on the website.

The first three headline fields are labeled "Required" in the editor, which is Google's minimum-three requirement rather than evidence of pinning. Whether any asset is pinned could not be confirmed from the read-only view, so check it when edit access arrives, because pinning would cap ad strength on its own.

## 20. The website cannot convert the traffic the account is buying

| What was checked | Finding |
|---|---|
| "APPLY NOW" in the main navigation | Points to a **stale Career Seminar page for 28 Februari 2026**, promoting priority enrollment for the "Mac 2026" intake. It has been dead for roughly six months and is still the site-wide primary call to action |
| WhatsApp click to chat | **None.** No `wa.me` or `api.whatsapp.com` link exists on the homepage or the programme page, confirming what management said in the call |
| Form placement | Sits in the lower third of every programme page, below the full syllabus and entry requirements |
| Form fields | Name, Email, Contact No, City, Programme, Message. Six fields for a first-touch enquiry |
| Fees | Published nowhere, on any programme page |
| Registration fee of RM300 | Published nowhere |
| Landing page language | English by default, while 100% of the ad copy and most of the converting keywords are Malay |
| Dedicated paid landing page | None. Paid traffic goes to a standard organic programme page |
| GA4 ownership | Installed and unattended. Management said in the call that nobody watches it |

Management described the site accurately in their own words: content gets added without a plan, nobody manages it, and there is no WhatsApp button on all pages. That assessment is correct and it is measurable. Sending Malay-language paid traffic to an English page whose main call to action links to a six-month-old seminar is enough on its own to produce a zero-conversion account, even before the tracking failure.

## 21. Operations will cap paid performance even after the fixes land

Three items from the discovery call that no amount of media buying will fix:

1. **No CRM.** Leads land in a Google Sheet that all staff can open. A previous Sales Candy and LeadSquared subscription went unused.
2. **No lead response SOP.** Asked how fast a lead gets called, management answered that a process existed and was never followed. For monthly intakes with short lead maturity, speed to first contact is the largest single lever on close rate.
3. **Lead to enrolment sits at 2 to 3%,** by management's own estimate.

That last number sets the arithmetic for the whole engagement, and it should go in the proposal.

## 22. The volume arithmetic, stated plainly

Management's stated target is roughly 600 enrollments for the calendar year against about 150 paid applications so far, with total student population around 310 falling to about 290 after graduations. Discussion in the call settled on roughly **300 additional enrollments** coming from ICMS-side marketing, with international agents covering a further chunk.

At the client's own 2 to 3% lead-to-enrolment rate, 300 enrollments needs **10,000 to 15,000 leads**.

| Scenario | Cost per lead | Media needed for 12,000 leads |
|---|---|---|
| Client's reported football CPL on Meta | MYR 2.13 | About MYR 25,600 |
| Client's reported enforcement CPL on Meta | MYR 7.00 | About MYR 84,000 |
| Client's reported international CPL | MYR 19.00 | About MYR 228,000 |
| Current Google Ads, measured | No measurable leads | MYR 3,137 spent in 30 days for zero recorded leads |

Management described current total digital spend as "8,000, 9,000" and called it very small, without specifying whether that figure is monthly or annual. Clarify that before pricing anything.

Two warnings belong in the proposal. First, the low costs per lead quoted above come from spending roughly MYR 100 to MYR 300 a day, and they will not hold when spend scales by a factor of ten or more. Toggle already made this point in the call and should repeat it in writing rather than let the client anchor on MYR 2.13. Second, a 2 to 3% close rate is the constraint, not the media. Moving the close rate from 2% to 4% halves the media budget required for the same 300 enrollments, which makes the CRM, the response SOP and the WhatsApp route worth more than any bid adjustment in this document.

## 23. Revised priority order

Part 1's action plan stands, with these changes to sequence and scope.

**Do first, this week, in this order:**

1. Get Standard or Admin access. Everything below is blocked without it.
2. Have the ICMS web developer bind a Google Ads conversion event to the `wpcf7mailsent` event site-wide, and verify it with Tag Assistant. This is the only item that turns the account from unmeasurable to measurable.
3. Fix or replace the "APPLY NOW" destination. It is a six-month-stale seminar page sitting in the main navigation.
4. Unblock football and sports. Remove `bola sepak` from the negatives, unpause `diploma sukan malaysia`, and resolve the two conflicting negatives.
5. Pause the generic diploma keywords that have spent over MYR 80 with zero conversions.

**Then, weeks 2 to 4:**

6. Launch a Diploma in Football Studies campaign with its own ad group, ad and landing page. On the client's own numbers this is the cheapest lead source they have and it has no Google competition.
7. Launch a brand campaign and pull brand terms out of the generic campaigns.
8. Rewrite ad copy so every claim matches the site, and lead with the RM300 registration fee once it is published on the site.
9. Add six sitelinks, structured snippets, a call asset and a WhatsApp route per campaign.
10. Build dedicated Malay landing pages per programme with the form above the fold, three or four fields, and a real thank-you URL.

**Raise with the client as scope beyond media:**

11. A CRM or at minimum a WhatsApp routing tool with round-robin assignment, plus a written lead response SOP with a target time to first contact.
12. Publishing fees and the RM300 registration fee on the site, which is the only checkable, ownable claim ICMS currently has against Unicom.
13. A website rebuild. Toggle already framed this as a separate charge in the discovery call, and the evidence in sections 18 and 20 supports it.

## What Part 2 could not verify

- **Whether the drop from 12 conversions to zero came from the date shift or from a configuration change.** Check change history, filtered to the Conversion category, as soon as access allows.
- **The actual final URL on both responsive search ads.** The display path `icms.edu.my/diploma/penguatkuasaan` does not resolve, and the real programme page is `icms.edu.my/diploma-in-enforcement-management/`. A display path is not required to be a live URL, so this is not a policy breach, but the true destination still needs reading from the ad editor.
- **Whether any RSA asset is pinned.** The "Required" labels in the editor are Google's minimum-three requirement, not pins.
- **Whether the "Belajar di Kampus atau Online" claim is true.** The site does not support it. Ask ICMS before this ad keeps running.
- **Whether the reported "8,000, 9,000" digital spend is monthly or annual.**
- **Impression share and lost impression share,** still outstanding from Part 1.

## Bottom line

The Google Ads account is not underperforming. It is unmeasured, and it is selling the wrong product.

The tracking failure is now proven rather than suspected: the Google Ads tag sits on every page and no conversion event is ever fired, so a Contact Form 7 AJAX submit with no thank-you page can never be recorded. That is a half-day of developer work, and until it happens every number in this account is decoration.

The strategic failure is larger. ICMS sells eight focus programmes and advertises one. The programme management calls their differentiator, the one their homepage claims is unique in Southeast Asia, and the one that delivers a MYR 2.13 cost per lead on Meta, is not just absent from Google Ads. It is blocked by a paused keyword and an active negative that ICMS is paying to enforce.

Fix the measurement, unblock football, and repair the Apply Now link. Those three actions cost almost nothing and address more of the problem than any bidding or budget change in this document.
