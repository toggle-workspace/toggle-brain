# Meeting notes — July monthly report and marketing updates

**Date:** 2026-08-05
**Location:** Google Meet
**Recording:** Gemini meeting notes (link in the source doc)

## Attendees

- Anna, SolDevelo
- Ewa, SolDevelo (appears as "Eva" in the Granola transcript; same person)
- Pawel, SolDevelo
- Sebastian, SolDevelo
- Jordan Pinto, Toggle Solutions

## Agenda

1. July monthly report
2. Pillar Page #1 updates
3. Insights from the SolDevelo team on QAlity Plus
4. The Atlassian "similar apps" tab
5. Next steps

## Discussion

### July performance

Conversions fell from 30 in June to 9 in July. Both sides treated this as an expected reset rather than a performance problem, for four stacked reasons:

- Generic search terms were excluded, for example "Jira for free" and "Jira login".
- Keywords driving volume but low-quality traffic were paused.
- A full ads refresh put the new ads back into the learning period.
- The daily budget was reduced, so visibility dropped and cost fell about 42%.

The mid-July campaign split is complete. Three keyword groups now sit in separate campaigns:

| Campaign | July read |
|---|---|
| Jira Test Management | Highest spend, most conversions, healthiest CPA |
| Agile / Jira QA | Best ad engagement, low conversions |
| Jira Test Case | Weakest converter, high spend, high CPA, CTR at 10% which is above benchmark |

On geography, the US remains the top market with France and Canada showing early traction. Australia, Germany, Italy, Netherlands, Portugal and the UK are all at zero conversions. Tiering countries into strong and exploratory groups was parked as a later-phase idea.

### Product positioning and keyword strategy

Sebastian flagged the "test cases" keywords as worth dropping, because searchers for test case tools increasingly want AI generated test cases and QAlity Plus does not offer that.

Ewa and Sebastian named three QAlity Plus differentiators:

- An execution page carrying the full history of previous test runs, shown inline with the current test.
- Unresolved bugs surfaced during re-execution, so testers do not re-report known issues.
- Auto-filled bug descriptions on creation.

The positioning underneath all three: QAlity Plus actively helps testers find defects rather than recording pass or fail.

The Agile / Jira QA keyword group was flagged as informational intent rather than purchase-ready. Sebastian suggested routing that traffic to a landing page covering QA process topics instead of the marketplace listing. Jordan proposed ad-specific landing pages carrying two CTA options: book a demo for higher intent, and click through to the marketplace for informational visitors.

Budget holds at current levels until the foundation is cleaner. It increases only once the ad landing page flow is ready.

### Atlassian evaluation ID in GA4

Atlassian now passes an evaluation ID to GA4 when a user clicks "Review" as an admin or "Request" as a non-admin after the trial. That opens up retargeting audiences of high-intent users who reached the evaluation step.

Most of that traffic currently lands under direct and referral, with organic and paid search not yet separating, because privacy consent limits what GA4 can capture. Sebastian noted the ID format resembles a license number, so verification against their internal evaluation report should be quick.

### Pillar Page #1

Toggle sent the pillar page draft on WordPress. Ewa will review it once her colleague returns from vacation. Jordan flagged that the Resources dropdown menu can only be created after the page is published.

## Decisions

- Keep the three-way campaign split from mid-July.
- Drop the AI-oriented test case keywords. Sebastian's intent-mismatch argument was accepted.
- Route Agile / Jira QA traffic to QA process content rather than the marketplace listing.
- Hold budget flat until the landing page flow ships.
- Defer country tiering to a later phase.

## Action items

| Owner | Action | Status |
|---|---|---|
| Jordan | Share the updated deck with the GA4 evaluation ID screenshot in Slack | Done |
| Jordan | Flesh out the ad landing page flow proposal, mapping keyword groups to landing page routes and CTA options | Delivered 2026-08-11, see `../01-strategy/2026-08-landing-page-flow-and-keyword-strategy.md` |
| Jordan | Research keywords around the QAlity Plus differentiators, using them as messaging direction if no viable keywords exist | Delivered 2026-08-11, same doc. Data pulled, Group B is the only group that earns a budget |
| Ewa | Review Pillar Page #1 on WordPress and give feedback | Done. Publishing and the Resources dropdown moved to Toggle |
| SolDevelo | Cross-check GA4 evaluation IDs against the internal evaluation report | Open |

## Open question carried forward

Whether the SolDevelo team has any insight into how the Atlassian "similar apps" tab is affecting them or other marketplace partners. This was on the agenda and the notes record no answer. Re-ask at the next call.

## Next meeting

- **Topic:** August monthly report, plus the landing page flow proposal and differentiator keyword data
- **Toggle brings:** the filled keyword tables from Google Ads Keyword Planner and the routing map for sign-off
