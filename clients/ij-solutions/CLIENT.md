---
client: IJ-Solutions
slug: ij-solutions
geo: TBD            # reports in EUR, contact is German speaking, so likely DACH. Confirm before adding a geo prefix.
status: active
stage: won
practice: acquisition
currency: EUR
mrr: TBD            # management fee not recorded in any source available to this repo
credit_pending: TBD # outstanding receivables in `currency`; 0 if none
account_lead: Jordan Pinto
last_reviewed: 2026-08-12
---

# IJ-Solutions

Atlassian Marketplace vendor. We run Google Ads for their Jira apps, with Epic Clone as the focus product.

## Contacts

- **Primary:** Jonas Möhringer · jonas.moehringer@ij-solutions.com
- **Billing:** TBD
- **Decision-maker:** Jonas Möhringer (approves budget changes directly on monthly calls)

## Scope

- **Services:** Google Ads management (see `brain/services/`)
- **Engagement model:** monthly retainer with a monthly report call (see `brain/process.md`)
- **Start date:** TBD, predates 2026-06
- **Renewal / review date:** TBD

## Products advertised

| App | Marketplace | Status in ads |
|---|---|---|
| Epic Clone for Jira | `marketplace.atlassian.com/apps/1222030` | Active, the focus product |
| Project Milestones for Jira | Live | GA4 evaluation ID implemented, not advertised |
| User Absence Planner | Live | UAP campaign paused across May and June 2026 |
| Duplicate for Jira | Live | Not advertised |

## Media spend

Client ad spend, not Toggle revenue. Do not read these figures as MRR.

| Campaign | Monthly budget | Note |
|---|---|---|
| Epic Clone initial (try and buy) | €700 | Cut by €300 on 2026-08-06 as a one-month summer measure |
| Epic Clone demo page | €500 | Holds |
| **Total** | **€1,200** | Revisit at the start or middle of September, ahead of the October Teams event |

Live ad groups: Bulk Clone, Jira Template. Paused: Search AI Max (2026-08), Search Network placement (2026-07), UAP campaign (2026-05).

Targeting: strongest in the United States, then Germany, Australia and Switzerland. Canada and the United Kingdom limited on 2026-08-06 after steady spend without conversions.

## Billing

- **Payment terms:** TBD
- **Currency:** EUR
- **Quote on file:** none in this repo

## Access

- **Tools we have access to:** Google Ads, GA4 (every app property)
- **Credentials location:** TBD, do not paste credentials in this file

## Measurement

The Atlassian evaluation ID custom dimension is implemented across every app property in GA4. It fires when a user clicks Try and then "Review for admins" or "Request app". It does not separate admin from non-admin, and consent rejection blocks capture, so treat it as a floor rather than a full count. View it under Reports, then Acquisition, then Traffic acquisition, adding the Atlassian custom dimension.

## Notes

- Jonas does not run a booth at Atlassian Team events. He attends alone and uses the time for existing partner relationships rather than new business, so event-timed campaign pushes should not assume booth support.
- He tracks the marketplace ecosystem closely and raised the partner-wide evaluation decline himself. His read is that Atlassian has weak incentive to fix it, since Forge apps pay zero revenue share until 1 million in revenue.
- Budget conversations happen live on the monthly call and get agreed in the same meeting. Bring a recommendation rather than options.
- Reporting language: attribute observations to IJ Solutions rather than to Jonas by name in any client-facing document.
