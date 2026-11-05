---
client: Sedifly
slug: sedifly
geo: sg
status: active
stage: won
practice: acquisition
currency: SGD
mrr: TBD            # Viknesh handles fees; media budget is S$2,000 a month from Nov 2026
credit_pending: TBD
account_lead: Jordan Pinto
last_reviewed: 2026-11-05
---

# Sedifly

Sedifly Pte Ltd ([sedifly.com](https://sedifly.com)) is a Singapore admissions consultancy that helps students apply to US and UK universities. Toggle runs Meta lead generation for them, with Google Search proposed from mid-January 2027.

## Contacts
- **Founder:** Joash Lee
- **Day-to-day:** Ben (consolidates Sedifly's asks for Toggle)
- **Ads in the account before Toggle's plan:** Benedict (built the Roscoe webinar campaign on 16 Oct 2026)
- **Toggle:** Jordan (account lead), Viknesh (fees and admin)

## Scope
- **Services:** Meta lead generation (`brain/services/`), Google Search proposed after one month of Meta.
- **Media budget:** S$3,000 a month in the September proposal, cut to S$2,000 a month from November 2026 (confirmed 3 Nov 2026).
- **Launch:** week of 16 Nov 2026, earlier if Sedifly's copy reviews and revisions finish sooner.
- **Reporting:** a weekly one-pager every Tuesday, starting the week after launch.

## Access
- **Meta ad account:** act_803550292448381 (SGD, Asia/Singapore), readable with `ACCESS_TOKEN_TOGGLE`. Not on `installations/meta-ads/connection-card.md` yet.
- **Instant Forms:** the TOGGLE token cannot read them (error 100/33), so check form status in Ads Manager.
- **HubSpot:** view only for Toggle. Sedifly connects the Meta forms and updates deal stages.
- **Pixels:** three exist; only "Sedifly - CURRENT" fires.
- **Credentials:** never in this file.

## Files in this folder

| Path | What it is |
|---|---|
| `01-strategy/2026-09-meta-leadgen-proposal-sgd3k-rev3.pdf` | The signed September proposal (Revision 3, 24 slides, S$3K a month) |
| `01-strategy/2026-11-03-meta-plan-creative-review-forecast.*` | 9-page answer to Ben's 3 Nov asks. Superseded by the decks below |
| `01-strategy/meta-plan-and-creative-review-nov-2026/` | Meta plan and creative review deck, rev-1 to rev-4 (4 Nov 2026) |
| `01-strategy/2026-11-05-meta-launch-plan.pptx` | **Current client deck.** 13-slide launch plan answering Ben's 4 Nov asks |
| `01-strategy/_deck-build/` | Build source for the decks and tracker, plus the read-only Meta account pull. See its `README.md` |
| `02-creative/copy/` | October Meta ad copies and lead forms, October Search ad copies and keywords |
| `02-creative/briefs/2026-11-04-jeremy-podcast-meta-ad-copy-brief.docx` | Sedifly's brief for the Jeremy Galang podcast ads, with consultation forms |
| `03-media/2026-11-05-meta-ads-tracker-INTERNAL.xlsx` | Ad tracker (Ad requests, Campaign setup, Instant Forms, Naming, Inventory, Change log). Internal: do not share with Sedifly yet |
| `03-media/2026-10-28-digital-performance-tracker.xlsx` | 28 Oct tracker. Budget Sheet, Related sheets and Next steps tabs still carry IJN leftovers |
| `05-meetings/` | Sedifly's asks and the decisions behind each deck |

Kept out of git on purpose: the creative videos and the 10 MB Ke Yue Case Study Guide PDF (in `Desktop\Sedifly\Sedifly Ad Creatives\`), and `Sedifly x Toggle Leads.xlsx`, which holds lead names, emails and phone numbers.

## Current plan (5 Nov 2026)

Five ad sets on S$2,000 a month:

| Ad set | Audience | Offer | Creative | Budget |
|---|---|---|---|---|
| Readiness Check | Applicants 18 to 24 | Readiness Check | Ke Yue Reels | S$500 |
| Consultation | Applicants 18 to 24 | Free consultation | Jeremy podcast A and B | S$300 |
| Case study | Parents | Ke Yue case study | Ke Yue statics and carousel | S$600 |
| Consultation | Parents | Free consultation | Joash interview | S$300 |
| Retargeting | Warm audiences | Readiness Check | Ke Yue Reels only | S$300 |

The Readiness Check and the free consultation are separate offers with their own forms. Forecast: 21 to 35 requests a month. Google Search from mid-January at S$1,000 a month (estimates only, no Keyword Planner data). Our material never mentions a management fee; Viknesh handles fees.

## Notes
- Meta cannot target under-18s, so cold copy speaks to parents or to applicants aged 18 to 24.
- Sedifly writes and sends the ad copy and form copy; Toggle reviews it.
- Jordan edits the launch deck by hand. Diff the saved file against a fresh build (`_deck-build/diff.js`) and port his edits into `slides3.js` before rebuilding.
- Ad names follow the IJN convention used in Toggle's Meta account.
- Verify every number against the live site, the creative files and a fresh account pull before it goes into a client deck. Several earlier figures were wrong; see `05-meetings/2026-11-04-verification-and-roscoe-audit.md`.
