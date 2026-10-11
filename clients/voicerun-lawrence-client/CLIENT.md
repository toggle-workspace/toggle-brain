---
client: VoiceRun
slug: voicerun-lawrence-client
geo: us
status: active
stage: won
practice: acquisition
currency: USD
mrr: TBD            # USD 2,000 on the quotation vs USD 1,000 in Lawrence's plan; set once settled
credit_pending: 0
account_lead: Jordan
last_reviewed: 2026-10-11
---

# VoiceRun

Enterprise voice AI infrastructure company, Cambridge Massachusetts. Introduced
through Lawrence (Kuota) as a partner referral. Confirmed as a client on 9 October
2026, after the paid media audit and proposal. The folder is named
`voicerun-lawrence-client` to mark the Lawrence referral; his other referrals are
SignWell (`clients/signwell/`) and Kojo (`clients/kojo/`).

## Contacts
- **Primary:** Lawrence Quan · Kuota · referring partner (LinkedIn: lawrencenquan)
- **Client side:** Nick Leonard, co-founder and CEO. Derek Caneja, CTO (per TechCrunch).
- **Decision-maker:** Nick Leonard (nick@voicerun.com), addressed as signatory on the
  quotation and SOW.
- **Also named in Lawrence's plan:** Doug, who sets up VoiceRun's outbound sequences in
  Reply.io. Surname and role not yet confirmed. He is arranging Toggle's LinkedIn
  Campaign Manager access.
- **Kuota:** Octavio, Lawrence's growth strategist. He wrote the VoiceScore Insurance Q4
  media plan, messaging and creative. Prefers WhatsApp.
- **Cadence:** weekly sync every Thursday at 10am ET (10pm MYT, 11pm MYT from 5 November
  2026 after US clocks change). Octavio sends the invite.

## Current plan (from the 8 October 2026 call)
- First campaign: VoiceScore for US insurance call centers, on LinkedIn and Google
  Search, offer is the Free 10-Call Evaluation. Target launch: week of 12 October 2026.
- Jordan's internal next steps deck, 12 October to 13 November 2026 (tracking, Google
  Search, LinkedIn, weekly timeline, open questions):
  `01-strategy/2026-10-09-next-steps-plan-12oct-to-13nov.pptx`

## Tracking (Google Tag Manager)
- **Build guide:** `01-strategy/2026-10-10-gtm-tracking-setup-guide.docx`, a step-by-step
  Word guide in five parts. Part 0 splits and renames demo_request. Part 1 covers the
  VoiceScore leads, CTA clicks, form starts and audiences. Part 2 covers the nice to have
  events, Part 3 fixes the existing tags, and Part 4 builds the shared GA4 exploration.
  Jordan's audit of the existing tags, which the guide builds on, is on the Desktop as
  `Voicerun Tracking Findings (10-10-2026).docx`.
- **Container:** GTM-NT2B5VRZ. It loads only on voicerun.com and www.voicerun.com.
  GA4 is G-CY1WV9Z7WC, the Google Ads tag is AW-18326377293, and the LinkedIn
  Insight Tag is 9394978.
- **How the forms report a lead:** the forms are custom code, not HubSpot embeds. Every
  form sends the visitor to `/contact/thank-you/?topic=<topic>`, and that page pushes
  `generate_lead` with `source` set to the topic, once per topic per browser session.
  The VoiceScore topics are `voicescore-evaluation` and `voicescore-demo`. Every lead
  conversion in the guide is built on this event, so no developer ticket is needed.
- **Event names:**

  | Event | GA4 | Google Ads | LinkedIn |
  |---|---|---|---|
  | `voicescore_evaluation_request` | Key event | Primary, the VoiceScore campaign goal | Conversion |
  | `voicescore_demo_request` | Key event | Primary | Conversion |
  | `contact_request` (was demo_request), split by `form_topic` | Event | Contact Request | Contact Request |
  | `voicescore_cta_click` (`cta_name`), `voicescore_form_start` (`form_name`) | Event | No | No |
  | `site_link_click` (`link_name`), `scroll_depth`, `video_start` / `video_progress` / `video_complete` | Event | No | No |

- **Known quirk:** the site's event helper pushes each custom event twice (as a data
  layer event and through gtag). Confirmed in Preview on 11 October 2026. Custom Event
  triggers on those events need **Once per page**. `generate_lead` is a single push.
- **Enhanced Conversions:** email only. Google needs country and postal code before it
  accepts first and last name, and the forms collect neither.

## Scope
- **Services:** performance marketing (Google Ads, LinkedIn Ads), website tracking,
  reporting, and a live dashboard. Nothing else: creative production, landing page
  builds, SEO, outbound and CRM configuration are out of scope.
- **Engagement model:** audit first, partnership if it converts (see brain/process.md)
- **Start date:** audit work began 2026-08-27. Engagement start date not yet set on the SOW.
- **Renewal / review date:** end of the 3-month term, once a start date is agreed

## Commercials (as issued, not yet signed)
- **Quotation TG-2026-001, 24 September 2026:** USD 2,000 a month for 3 months,
  invoiced monthly in arrears. Dashboard included. Tracking implementation (USD 1,500)
  waived for the full term. Media paid by VoiceRun directly, no markup. Valid until
  24 October 2026.
- **SOW-2026-001 and Digital Marketing Services Agreement, 24 September 2026:** signed
  by Toggle, awaiting Nick Leonard.
- **Open issue:** Lawrence's Q4 plan budgets the agency at USD 1,000 a month. Settle
  which figure VoiceRun approved before kickoff.
- Earlier drafts: `quotes/2026-09-07-performance-marketing-6mo-rev1.html` and
  `quotes/2026-09-09-performance-marketing-3mo-rev2.html`. Signed PDFs live in
  `Desktop\Voicerun (Lawrence Client)\Voicerun Finalized Documents\`.

## Lawrence's Q4 plan (captured 26 September 2026)
Lawrence narrowed the Q4 motion to VoiceScore, insurance contact centers, and the
CX and QA buying committee, run as a 30-day readiness sprint. Media rises to USD 10,000
a month for the campaign (LinkedIn 7,000, Google 3,000) plus USD 1,800 of other Google
spend. Kuota owns strategy, messaging, creative, copy, the landing page and outbound.
The agency builds, runs, optimizes and reports on the campaigns.
- Record of his Notion pages: `01-strategy/2026-09-26-lawrence-q4-gtm-plan.md`
- Our comparison against the proposal, plus questions for Lawrence:
  `01-strategy/2026-09-26-lawrence-gtm-plan-review.html` (internal)

## Brief from Lawrence (verbatim points)
- Ad spend today: under $10,000 per month.
- Proposed budget: $5,000 to $7,500 per month across all channels.
- ICP 1: operators and decision makers at enterprise companies adopting voice AI agents.
- ICP 2: developers and technical leaders who want more control of their voice AI stack.
- Deliverables he named: tracking and reporting set up, plus a brief proposal.

## Access
- **Google Ads:** reports received as exports (15 July to 27 August 2026). Direct
  account access not confirmed.
- **LinkedIn Ads:** pending. The audit is roughly half complete until this lands.
- **GA4 / Search Console / CRM:** screenshots only so far. The proposal asks for Editor
  access to GA4 and Search Console, plus HubSpot access for the dashboard and
  meeting imports.
- **Not yet seen:** the VoiceScore (Search) and Enterprise Executives (Search)
  campaigns Lawrence's plan builds on. Neither was in the 15 July to 27 August exports.
- **Credentials location:** none held.

## What VoiceRun sells
Three products on one platform. A code-first voice agent platform (Python SDK and
`vr` CLI, agents version controlled in Git, simulated and adversarial call testing,
canary rollouts). An audio control plane (one call ID from first ring to hang up,
multi vendor failover across 25 or so STT, LLM, TTS and telephony providers).
VoiceScore, an AI quality assurance grader for call centers that claims up to 70
percent QA cost saving. Published pricing runs from a $25,000 twelve week pilot to
$2,000,000 a year, priced per minute rather than per seat.

Funding: $5.5 million seed announced 14 January 2026, led by Flybridge Capital
Partners with RRE Ventures and Link Ventures. Formerly Prim AI, graduated from
Link Studio. Named verticals: restaurant technology, insurance, banking,
telecommunications. Only named customer to date is Tivly, an insurance marketplace.

## Notes
- Direct competitors in the ad auction are Vapi, Retell, Bland, Synthflow and
  ElevenLabs. ElevenLabs outranks VoiceRun on impression share and top of page rate
  per the account auction insights.
- Kuota's domain (kuota.ai) did not resolve on 27 August 2026. Confirm the correct URL.
- Aggregator articles wrongly name Chad Jaquays as a VoiceRun co-founder. He is COO
  and co-founder of Tivly, the customer.
