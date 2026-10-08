# Meeting notes: July monthly report

**Date:** 2026-08-06, 21:00 GMT+8
**Location:** Google Meet
**Duration:** 30 minutes
**Recording:** Gemini meeting notes and transcript, source PDF on Jordan's Desktop

## Attendees

- Jonas Möhringer, IJ Solutions
- Jordan Pinto, Toggle Solutions

## Agenda

1. July Google Ads performance
2. The Atlassian evaluation ID in GA4
3. August budget
4. Marketplace ecosystem conditions

## Discussion

### July performance

Performance fell from June to July across conversions, cost per conversion and conversion rate, while cost per click rose on the keyword combinations pairing Jira or Confluence with what the app does. We are seeing the same pattern across our other Atlassian partners, so we treated it as a market-wide shift rather than an account fault.

Three changes were made during July:

- Removed the low quality search terms.
- Paused the Search Network placement. Reach was good and engagement on the marketplace listing was poor, so the trade was less volume for higher intent.
- Paused the Search AI Max ad group after roughly two months. Cost was high, the trailing 7 and 14 days returned no conversions, and the search terms were weak.

The UAP campaign was already paused across May and June.

The demo page campaign is live and has not converted. Its click-through rate is 0.99%, below the product keywords. GA4 shows engaged visitors, meaning sessions of 30 seconds or more, so people are reading the page and leaving without booking. Our read is that the account has historically been trained on try-and-buy clicks rather than demo intent, so the algorithm faces a steep learning curve.

On ad groups, Search AI Max had been the main conversion driver but at a high cost per conversion compared with Bulk Clone and Jira Template. With it paused, those two ad groups should now get budget and gather data.

### Geography

The United States remains the strongest market. Germany and Australia both converted in July, and the two have swapped position: Germany now carries the lower cost per acquisition where earlier reports had it higher than Australia. Switzerland is also performing well on CPA.

Canada and the United Kingdom have taken steady spend without converting. Either the addressable audience in those markets is small or it is a weak fit for Epic Clone.

### Landing page direction

Jonas has already published a body of blog content. We proposed routing informational keyword traffic to those posts, then moving the reader toward booking a demo or clicking through to the marketplace listing, rather than sending an informational search straight to a listing. Jonas found it interesting and asked to see it fleshed out.

The framing we set for August: the limit on what can be fixed inside the platform has been reached, so the work moves to what happens after the click. Landing page experience is the August goal.

### Atlassian evaluation ID in GA4

Atlassian released what they call full funnel marketing attribution. The evaluation ID, previously visible only in the evaluation report, now appears in GA4.

The custom dimension is implemented across every IJ Solutions app property. The event fires when a user clicks Try and then either "Review for admins" as an admin or "Request app" as a non-admin. It does not distinguish admin from non-admin, and either click signals high intent, so it gives an indirect route to admins.

Two uses: build retargeting audiences of high intent visitors once volume grows, and cross-reference incoming evaluations against the GA4 evaluation ID to identify the traffic channel behind them. Consent rejection still blocks capture, so the number is a floor rather than a full count.

Viewing path in GA4: Reports, then Acquisition, then Traffic acquisition, then add the Atlassian custom dimension. Nothing was showing on the Project Milestones property during the call because the setup had only just been applied.

### The single July evaluation

Jonas noted one new evaluation in July and asked whether the install click in the report was that person. Attribution cannot be confirmed from our side. If the detailed evaluation report carries campaign UTM values, and they trace back to the campaign, then the evaluation came through paid.

### Ecosystem conditions

Jonas hears from many partners that evaluations are down. Possible causes discussed:

- More partners advertising the same Jira and Confluence keyword space, pushing click costs up.
- Companies mid-migration to cloud, which is not when teams evaluate new apps. Data Center sunsets in 2029, though Atlassian has signaled some customers may be allowed to run it longer.
- Economic conditions in some countries.
- Atlassian telling large enterprises they can rely on standard products instead of marketplace apps.

Jonas believes Atlassian knows, since large vendors have direct contacts and raise it, and some corrective measures have been taken. He also noted the incentive is weak: Forge apps pay zero revenue share until they reach 1 million in revenue, so Atlassian earns nothing from a smaller partner's app sales. On why Atlassian is moving everything to cloud, his view is that subscription business suits shareholders and access to customer data matters more than cost.

## Decisions

- Reduce the initial Epic Clone campaign by €300, to €700 per month. The demo campaign holds at €500. Total monthly spend becomes €1,200.
- Treat the reduction as a one-month summer measure. Revisit at the start or middle of September, ahead of the October Teams event, which is when partner activity picks up.
- Keep the Search Network placement paused.
- Keep the Search AI Max ad group paused and rebuild a strategy for that space rather than waiting longer.
- Limit Canada and United Kingdom targeting and budget, letting the system move spend to the United States, Germany, Australia and Switzerland.
- Keep the product keywords, and lean on the Bulk Clone and Jira Template ad groups now that they are not competing with Search AI Max for budget.

## Action items

| Owner | Action | Status |
|---|---|---|
| Toggle | Audit the demo page and its campaign landing page to find what blocks conversion | Open. Findings recorded in `../01-strategy/2026-08-landing-page-flow-and-keyword-strategy.md` under open items |
| Toggle | Update the demo campaign ad copy and keywords | Open |
| Toggle | Reduce the initial campaign budget and limit Canada and UK targeting | Open |
| Toggle | Flesh out the landing page strategy, directing traffic to relevant pages instead of the marketplace listing | Delivered 2026-08-12, see `../01-strategy/2026-08-landing-page-flow-and-keyword-strategy.md` |
| Jonas | Check the detailed evaluation report for campaign UTM values, to see whether the July evaluation is attributable to the campaign | Open |

## Notes carried forward

- Jonas does not run a dedicated booth at Atlassian Team events. The cost is high and he does not expect new customers from it, so he attends alone and uses the time for existing partner relationships and feedback.
- Ask whether the Project Milestones property has started recording evaluation ID values, since it was empty during the call.
- Volume and bid data for the keyword groups is pulled after Jonas approves the landing page plan.

## Next meeting

- **Topic:** August monthly report, plus approval of the landing page flow and keyword plan
- **Toggle brings:** the landing page deck, and the keyword sizing data once the plan is approved
