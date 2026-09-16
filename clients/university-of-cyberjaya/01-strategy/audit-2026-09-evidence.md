---
last_reviewed: 2026-08-31
owner: Zaid
prospect: University of Cyberjaya
meeting: 3 September 2026, first meeting
status: pre-call research, public sources only
---

# University of Cyberjaya

Facebook page ID 334653953275096. Website cyberjaya.edu.my. A health sciences heavy private university covering medicine, pharmacy and psychology, which shapes both the audience and the competitive set.

**A note for future audits.** The Ad Library tool rejects the modern profile ID format, so seven competitor profile IDs returned nothing. Each institution needs its own keyword search to surface the legacy numeric page ID. Recording the ID once, as above, saves that work next time.

## The frame for this meeting

Cyberjaya is the only prospect of the five doing genuinely good marketing work. Ten faculties carry bespoke creative, the creative was refreshed through August, and there was a strong campus tour campaign on TikTok in April. They are then discarding almost every signal that would tell them which of it works.

Run this meeting as "you are producing more than your measurement can account for," not as a list of defects.

## The three findings

**1. Every web enquiry is filed under one hardcoded campaign.**

On `/register-interest`, the Salesforce Web-to-Lead form carries `Campaign_ID` as a select element with exactly one option, `7017F000000QpGZ`, labeled "CUCMS-FB-General English". The `lead_source` field is likewise fixed to "Online". There is no `gclid`, `fbclid` or `utm_` field anywhere in the form, and no JavaScript reads URL parameters.

The arithmetic: 51 live Meta ads across 25 angles and 10 faculties, plus a live Google Ads account, plus TikTok activity, all collapse into a single CRM source value. Every enquiry arrives stamped as Facebook regardless of where it came from.

Sayable version: "Your register interest page posts into Salesforce with the campaign field fixed to one value, so every enquiry arrives stamped as Facebook whatever the source. Fifty one live ads across twenty five angles, one reportable source. Search your own page source for Campaign_ID. Five hidden fields and you have your reporting back in half a day."

Leave out the detail that the form still hardcodes the pre-2019 institution name. It is true and it tells the room that nobody has looked at that form in seven years, which makes somebody defensive for no gain.

**2. Three Meta pixels, and the one that records a lead never sees the site.**

Their tag container `GTM-T58FVXB` is public and requires no login. Pixel `1243295990094483` fires PageView site wide with zero Lead events. Pixels `1270379337960925` and `2275301946342197` initialize only on thank you URLs. The container's only Lead event goes to `2275301946342197`.

So the pixel with the traffic has no conversions, and the pixel with the conversions has no traffic. Neither can build an optimization model.

The same bug affects Google: the Conversion Linker fires only on the thank you page, which is the one page where the `gclid` has already been lost.

**3. No program page has an enquiry form, and 28% of live ads leave the funnel.**

The pharmacy, psychology and open day pages all return HTTP 200 and contain zero references to `webto.salesforce.com`. Separately, 14 of 50 live ads carry the link title "Chat with us" and route to Messenger or WhatsApp on 601111123344, where nothing is tracked.

A student who clicks "Start Your Career in Pharmacy" lands on a page with no form, then has to find the register interest page and re-select pharmacy from a 49 option dropdown.

## What is not verified

- **Where the ads actually land.** The Ad Library returns link titles rather than destination URLs to automation. We can prove that program pages carry no form. We cannot prove that program ads point at them. Open two ad snapshots in a browser before the call and this becomes airtight. This is the single highest value fifteen minutes available before 3 September.
- **Google Ads creative.** Account existence is proven through the tag `AW-811469858` in their container. The Transparency Center is JavaScript only and returned nothing, so no ad was seen.
- **All TikTok paid activity.** Malaysia has no public archive. Their April campus tour was observed organically.
- **Competitor counts.** Only Taylor's is confirmed, at 180 live ads against Cyberjaya's 51. IMU, MSU, Perdana and Lincoln still need their page IDs pulled, so present the Taylor's comparison as the one datapoint it is rather than as a market picture.
- **First response time.** Nobody has submitted a test enquiry. That remains the cheapest fourth finding available and it needs a human to send it.

## How to run the room

Disclose the UNITAR relationship in the first five minutes. Cyberjaya competes with UNITAR for the same students.

Lead with UNITAR on method rather than volume. Keep Mindvalley and the ecommerce cases out.

The conflict with MMU is partial and workable, because the faculty mix differs. If both proceed, put the boundary in writing.

Open on the compliment, which is true and checkable: ten faculties with bespoke creative is more production discipline than any other prospect in this set. Then show them that their CRM cannot tell them which of it worked.
