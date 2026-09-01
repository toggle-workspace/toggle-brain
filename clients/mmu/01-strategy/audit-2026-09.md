---
last_reviewed: 2026-08-31
owner: Zaid
prospect: Multimedia University (MMU)
meeting: 4 September 2026, first meeting
status: pre-call research, public sources only
---

# Multimedia University

Facebook page ID 177972935645757. Website mmu.edu.my.

## Read this first, a round one finding was wrong

Round one concluded that MMU's enquiry page carries no Meta pixel and that no Lead event exists anywhere, and therefore that Meta cannot see a single enquiry. **That conclusion is refuted and it must not be said in the meeting.**

The error came from reading page source with a tool that runs no JavaScript. Their published tag container `GTM-5DF7DL5` was fetched directly and it contains:

- Two Meta pixels initialized, `589023888929942` and `1992291011146383`. Round one only ever saw the first one.
- Twelve custom conversion events, including `GO_MMU_LeadSubmit`, `GO_MMU_LeadMain`, `GO_MMU_LeadBrochure`, `GO_MMU_OriginalFormSubmit` and `GO_MMU_BrochureDownload`.
- A TikTok pixel, `D85AJ2JC77U42GL90CCG`.
- A Google Ads tag, `AW-862477989`, and GA4 property `G-V1HWR1R138`.

The enquiry page at `mmu.edu.my/intake_enquiry/` loads `GTM-5DF7DL5`, confirmed twice in source. The container is present, so the pixels it initializes load on that page even though no pixel is hardcoded inline there.

Had we walked in and said Meta cannot see their leads, their team would have opened Tag Manager and shown twelve tracked events. This is the kind of error that ends a first meeting.

## What survives as a real finding

**1. They track conversions as custom events rather than standard ones.**

Every lead action fires through `trackCustom` and `trackSingleCustom`. The only standard Meta event in the container is `PageView`. Meta's optimization models are trained on the standard event set, and the standard `Lead` event is what the delivery system reads most reliably. Custom events can be turned into custom conversions and optimized against, so this is a tuning point rather than a failure, and it should be raised as a question rather than an accusation.

Sayable version: "Your container fires twelve custom events for lead actions and the only standard event you send is PageView. Are your campaigns optimizing against custom conversions built on those, or against landing page views? The answer changes what your cost per enquiry means."

**2. Fifty six live ads carrying four ideas.**

The fifty ads returned collapse into four message concepts: a journey concept running in both English and Malay across 18 ads, scholarships across 11, an "AI. Tech. Creativity." line across 8, and a six card carousel stacking all of them across 11, plus two strays. That is roughly 12 to 13 duplicates per idea competing in the same auction and splitting the conversion signal. Several carousels repeat one identical headline on every card.

No live ad names a faculty, a program, a campus or an intake month, even though their website already has a complete program tree split along exactly those lines.

**3. They are the only university in the auction not naming a number.**

Competitor headlines pulled the same day: Universiti Malaya-Wales ran "50% Off Your Child's Degree Tuition!" and "Fast-Track Your Degree in 1 Year", INTI ran "Get a *FREE Degree at INTI", Nilai ran "WHAT'S YOUR FOUNDATION OR DIPLOMA CGPA?", and Quest ran "October intake is now open!". Eleven of thirteen competitor headlines name a percentage, a ceiling, a duration, an intake month or a deadline. Zero of MMU's fifty do. Their scholarship angle runs on 22% of inventory without a single amount or date attached.

This finding is independent of any tracking question and it is the safest one to lead with.

## Site behavior

Homepage: 3.2s first byte, 5.4s total, 89KB. Enquiry page: 1.4s first byte, 4.1s total, 168KB. Apply Now page: 0.3s first byte, 0.4s total. Speed is not their problem and should not be raised as one.

The homepage and the Apply Now page carry the pixel inline as well as through the container, which risks duplicate PageView counting. Worth a question, not a headline.

Note that the Apply Now page contains no form element, while the intake enquiry page holds three. Paid traffic pointed at Apply Now has to make a second hop to reach the form.

## What is not verified

- **Google Ads activity.** The tag `AW-862477989` proves an account exists. The Transparency Center is JavaScript only and returned an empty document, so we cannot say whether it is spending or on what.
- **TikTok ads.** The pixel proves they measure TikTok traffic, which strongly suggests they buy it. Malaysian TikTok ads are not in any public archive, so this cannot be confirmed. Ask rather than assert.
- **Ad body copy and landing URLs.** The Ad Library returns link titles to automation and the ad snapshots return 403. The four concept groups above are built on link titles, which is solid for counting duplication and weaker for judging the copy itself.
- **Their ad history.** Queries for all statuses and for active only both returned 56, because the library publishes only currently delivering ads. Do not claim they launched 18 days ago.
- **Whether Conversions API runs server side**, which no external check can see.

## How to run the room

Disclose the UNITAR relationship in the first five minutes. MMU competes with UNITAR directly and our case file claims 77% impression share of that category.

Lead with the creative finding, which is checkable on their phone in ten seconds and blames nobody. Raise the custom event question second, framed as a question. Keep Mindvalley and every ecommerce case out of the room.

Universiti Malaya-Wales, whom we meet on 2 September, is bidding against MMU in the same auction. If both want to proceed, the first signature takes the segment.
