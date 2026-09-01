---
last_reviewed: 2026-08-31
owner: Zaid
prospect: CDC Management Development (M) Sdn Bhd
meeting: 2 September 2026, with the CEO
status: pre-call research, public sources only
---

# CDC Management, Strathclyde MBA Malaysia

## Who they are

CDC Management Development (M) Sdn Bhd, Petaling Jaya, founded 1999, is the University of Strathclyde's Malaysian MBA delivery partner. Strathclyde awards the degree and CDC operates and markets the program in Malaysia. Strathclyde has been present in Malaysia since 1988 and CDC took over delivery in 1999. Confidence in this identification is high.

CDC owns every tag, account and registration link we found, so this audit is of CDC rather than of the university.

**The number that should shape the whole conversation.** Two intakes a year, October and April, at roughly 35 students each. The business needs about 70 enrollments annually. Entry requires age 25 or above, a degree, and three years of managerial experience. This is a small volume, high consideration, executive audience. Google search intent leads, LinkedIn is second, and TikTok is the wrong channel.

## The three findings

**1. The October intake registration is invisible to every channel.**

Registration runs through Linktree at `linktr.ee/cdcmd`, then TinyURL at `tinyurl.com/EDINMY`, then a Microsoft form at `forms.cloud.microsoft/r/ncGK9QAdfB`. That chain was verified by resolving the redirects. There is no tracking on any hop. Their own website never links to this path either: the homepage, the MBA page and the events archive return zero matches for linktr.ee, tinyurl and forms.cloud.microsoft.

Meanwhile a Google Ads conversion tag, `AW-959349002`, sits in their published tag container and on every page, with nothing to measure.

Sayable version: "Your October registration runs Linktree, then TinyURL, then a Microsoft form, with no tracking on any hop, and your own site never links to that path. Your Google conversion tag sits on every page and cannot see a single registration."

**2. The MBA page has no way to say yes.**

`cdc.edu.my/international-mba-strathclyde-malaysia/` contains exactly one form element and it is the site search box. There is no enquiry form, no brochure download, and no WhatsApp link, despite the page carrying "Talk to us" text. The only contact routes are a mailto and a telephone number. The fallback contact page is a stock Contact Form 7 asking for name, email, subject and message, with no field for phone, program or intake.

For an audience that researches an MBA for months before committing, there is no way to raise a hand early.

**3. The site is slow, and it degrades under exactly the traffic paid media creates.**

Five spaced tests of the homepage on 31 August 2026 returned totals of 24.6s, 24.5s, 15.5s, 9.6s and 16.7s, with a median of 16.7 seconds and 446KB of HTML. First byte ranged from 2.4s to 10.7s. The variance points at hosting rather than page weight.

## Corrections made in round two, read these before the meeting

**The MBA page is not slow. Do not say that it is.** Round one reported 8.4 seconds for that page. Five re-tests returned a median of 2.3 seconds total with first byte at 1.6 seconds. The homepage is the slow one. Saying otherwise in front of a CEO whose team can open the page is an unnecessary risk.

**The 44 second figure from round one was an outlier.** The honest sentence is "between 10 and 25 seconds across five tests," not "44 seconds."

## What is verified, and what is not

Verified from their published tag container `GTM-PJQ5FMD`: zero occurrences of `fbq`, `fbevents` and `connect.facebook.net`, so there is no Meta pixel. No TikTok pixel. The Google Ads tag `AW-959349002` is present. LinkedIn strings appear in the container but no Insight Tag was confirmed firing.

Not verified, and each of these has a safe phrasing attached:

- **Whether they have ever run Meta ads.** Five Ad Library queries across Malaysia, Great Britain and Singapore returned nothing attributable, but their numeric Facebook page ID could not be retrieved, so the definitive query never ran. Say "we could not find a single Meta ad," not "you have never run Meta ads."
- **Whether their Google Ads account is spending.** The conversion tag proves an account exists. The Transparency Center is JavaScript only and returned nothing. Ask the CEO what `AW-959349002` counts as a conversion. That question is stronger than any claim.
- **What their tag container does at runtime.** The container was read as published. Do not claim that no conversions are tracked.
- **LinkedIn ad history**, which is not publicly checkable. Their showcase page `strathmy` has 909 followers and posts weekly, so content is being made and distribution is not happening.
- **TikTok.** An account exists at @cdcmdmy and its metrics are not readable. Recommend against paid TikTok for this audience and say why rather than presenting it as an opportunity.

## How to run the room

An audit and proposal are described as already prepared, so this research is the independent check on it rather than a replacement.

Lead with Kith and Kin, which has the right shape for a business that needs 70 enrollments. Keep UNITAR to a single sentence about method. Do not open with 32,000 leads or RM11m a month, because against 70 seats a year it reads as not having read their business.

The conflict with MMU is narrow and can be handled by carving out the executive MBA in writing.

The strongest close available is the registration chain. It costs them nothing to verify, they can click it themselves in the meeting, and it explains why their marketing feels unmeasurable without blaming anyone in the room.
