---
client: SolDevelo
slug: soldevelo
geo: PL                # HQ Gdynia, Poland; US office Seattle. Ad targeting is US-led, see Markets below
status: active
stage: won
practice: acquisition
currency: TBD          # billing currency unconfirmed. The Google Ads account reports in PLN
mrr: TBD               # confirm
credit_pending: TBD    # confirm
account_lead: Jordan Pinto
last_reviewed: 2026-08-11
---

# SolDevelo

Polish software house running paid search and content for **QAlity Plus**, their test management app for Jira on the Atlassian Marketplace. The engagement is product marketing for a Marketplace app, not lead generation for their services business. Keep the two separate: anything Toggle produces here points at QAlity Plus, never at their custom software development services.

## Contacts

- **Sebastian** · SolDevelo · the sharpest voice on product and keyword intent. Raised the AI test case mismatch and the informational-intent argument on 2026-08-05. Treat his product reads as authoritative.
- **Ewa** · SolDevelo · owns the Pillar Page review on WordPress. Appears as "Eva" in Granola transcripts; same person. Use "Ewa" in client-facing work.
- **Anna** · SolDevelo · also the listed author on much of the QAlity blog content.
- **Pawel** · SolDevelo
- **Roles:** not yet confirmed for any of the four. Ask on the next call and fill in.
- **Billing contact:** TBD

## Scope

- **Services:** paid search on Google Ads, plus SEO and content (pillar pages). See `brain/services/` for the canonical service definitions.
- **Product marketed:** QAlity Plus, test management for Jira. Free tier (QAlity), Core and Advanced paid tiers, billed on total active users on the Jira instance.
- **Product page:** https://soldevelo.com/our-products/qality-plus-test-management-for-jira/
- **Cadence:** monthly performance report call.
- **Reporting style:** B2B Atlassian Marketplace. See `/client-report`.

## Markets

US is the top converting market. France and Canada showed early traction in July 2026. Australia, Germany, Italy, Netherlands, Portugal and the UK all sat at zero conversions. Country tiering into strong and exploratory groups was discussed on 2026-08-05 and deferred to a later phase.

## Campaign structure (as of 2026-08-11)

Three campaigns after the mid-July split, moving to five under the routing map in `01-strategy/2026-08-landing-page-flow-and-keyword-strategy.md`:

| Campaign | State |
|---|---|
| Jira Test Management | Best performer. Healthiest CPA, most conversions. |
| Agile / Jira QA | Best ad engagement, near-zero conversions. Being re-routed to QA process content. |
| Jira Test Case | 10% CTR, worst conversion rate. Being rescoped: AI test case terms cut, management terms kept. |
| Tool Comparison | New, planned. |
| Differentiators | New, pending Keyword Planner data. |
| Conquest | Planned but on hold until the vs Xray vs Zephyr page is rebuilt. |

## Access

- **Tools we have access to:** Google Ads, GA4, WordPress (pillar page drafts land there).
- **Google Ads account currency: PLN.** All Keyword Planner bid data returns in Polish złoty. Convert before quoting CPCs in any MYR or SGD context.
- **Atlassian evaluation ID:** Atlassian now passes an evaluation ID into GA4 on post-trial "Review" and "Request" clicks. SolDevelo is cross-checking those IDs against their internal evaluation report. Privacy consent limits GA4 capture, and most traffic still lands under direct and referral.
- **Credentials location:** TBD (1Password vault name; never paste credentials in this file)

## Notes

- **The relevancy chain is the account's whole problem.** Ads earn clicks and the destinations cannot convert them. Every landing page except the product page carries only soft mid-content CTAs. Fixing destinations, not ads, is where the gains are.
- **Their blog is a real asset.** Nine QAlity Plus pages already cover the ground the ads need. Audited 2026-08-11, all returning 200. The audit table lives in the strategy doc.
- **The best keyword in the account is "defect tracking tool jira":** 1,600 monthly searches, Low competition, PLN 9.75 floor bid. Found in the differentiator research. Build the Differentiators campaign around it.
- **The differentiators do not have search demand in their own words.** Every literal feature phrase came back at zero volume. Demand sits one level up, in the category term. Full analysis in `01-strategy/2026-08-landing-page-flow-and-keyword-strategy.md` section 8.
- **CTA wording is locked:** "Try for free" and "Book a demo". Use those exact strings in ads, on-page buttons and decks.
- **Client-facing writing rule:** attribute observations to "SolDevelo" rather than to individual team members. Jordan edits individual names out of sent decks.
- **Budget gate:** spend holds flat until hero CTAs are live on the four priority landing pages. Agreed 2026-08-05, though the language was cut from the sent deck. Raise it verbally, not in writing.
- **Pillar Page #1:** Ewa's review is done as of the August deck. Publishing it, and then building the Resources dropdown, now sits with **Toggle**, not SolDevelo. It remains the blocker for the dropdown.
- **Geo prefix:** this folder is unprefixed. Per `clients/CLAUDE.md`, confirm before batch-prefixing. HQ is Poland, so `pl-soldevelo` would follow the convention, though the ad targeting is US-led.
