---
client: SignWell
slug: signwell
geo: us
status: prospect
stage: qualified
practice: mixed
currency: USD
mrr: TBD            # monthly recurring revenue in `currency`; TBD until set, 0 if none
credit_pending: 0   # outstanding receivables in `currency`; 0 if none
account_lead: Jordan
last_reviewed: 2026-09-18
---

# SignWell

SignWell sells e-signature software through a product-led, free-trial funnel. The company started bootstrapped and competes with DocuSign on price and on compliance (HIPAA, BAAs). They are replacing their current paid media agency, Prosomo, and want a partner in place by the start of Q4 2026.

The company is based in Portland, Oregon, and operates as Docsketch LLC after renaming from Docsketch. Ruben Gamez founded it in 2019. It had 17 employees and was growing 36.4% year over year as of March 2026, per Crustdata. A third-party snapshot put revenue near $5M ARR in 2024; that figure is unconfirmed and must not be repeated to the client as fact. Toggle came in through Lawrence Quan as one of three agencies on a shortlist.

> **History:** `README.md` is the 13 September 2026 brand audit write-up from before the first call. It covers the pre-call findings, the competitor ad library counts, the mistakes made during the audit and how to rebuild that deck from `_deck-build/`. Where it disagrees with this file, this file is newer and wins.

## Contacts
- **Primary:** Lawrence Quan · marketing lead (runs the agency evaluation) · lawrence@signwell.com. He also referred VoiceRun through Kuota (`clients/voicerun-lawrence-client/CLIENT.md`) and Kojo (`clients/kojo/CLIENT.md`).
- **Paid media:** Henry Brown · henry@signwell.com
- **Founder:** Ruben Gamez (also founded Bidsketch). Henry is asking him whether the free tools convert to paid or take sign-ups from it.
- **Decision-maker:** TBD, confirm whether Lawrence signs off alone
- **Toggle side:** Jordan (lead, head of performance marketing), Zaid (AI and performance), Yi Yang (on the invite)

## Scope (proposed, not agreed)
- Tracking audit and a written tracking spec, built with SignWell's engineering team (GA4 + GTM on a single-page app)
- Paid search rebuild in SignWell-owned accounts, with non-brand search as the main problem
- Paid social tested with a real plan and a committed budget
- Retention: email nurture, in-app and push notifications
- Services: `brain/services/` (link the specific files when the proposal is scoped)
- **Engagement model:** see `brain/process.md`

## Key numbers (from the client, 2026-09-14)
- **ACV:** about $750 a year (Lawrence, 2026-09-18). Plans list at $12 and $30 a month. Deals range from $600 to a couple thousand dollars a year.
- **Qualified sign-up:** the user selected business use (not personal) at sign-up. Qualified sign-ups and trial sign-ups are the same population.
- **Reverse trial:** every qualified user gets 7 days of full paid features during onboarding, with no card.
- **Trial to paid:** about 9.4%, on self-serve automatically granted trials over the last two months (Lawrence, 2026-09-18). This supersedes the earlier 1.7%, 4%, 6.3% and 7% figures.
- **Value of one qualified sign-up:** about $70.50 (9.4% of $750), against the $14 Google receives today.
- **Monthly ad spend:** $20,000 to $25,000 per Henry. The August report shows $17,341.55.
- **Largest market:** United States, then organic international, with a Latin America push (Spanish-speaking reps).
- **Focus vertical this quarter:** healthcare.

## What SignWell sells (published pricing, read 2026-09-13)
- **Free:** 3 documents a month, 1 sender, 1 template.
- **Light:** $12 per user monthly, or $10 billed annually.
- **Business:** $36 per user monthly, or $30 billed annually.
- **API:** $275 a month base, then $0.85 falling to $0.20 per document.
- **Enterprise:** custom pricing, gated behind sales.
- **Claimed proof:** 65,000 plus businesses, 20 million plus documents signed, 4.9 on Capterra and 4.8 on G2. SOC 2 Type II, HIPAA, GDPR, eIDAS, ESIGN, UETA and Mexican NOM 151 compliance are included on every plan, including free. That is their stated wedge against competitors who keep compliance for higher tiers.

## Competitors
- **Tier 2 SMB set (same audience):** BoldSign, SignEasy, Signable, SignRequest, Signaturely, Eversign
- **Closest big-name overlap:** Dropbox Sign
- **Displacement target:** DocuSign (price-sensitive switchers and compliance-driven buyers)

## Billing
- **Payment terms:** TBD
- **Currency:** USD
- **Quote on file:** none yet

## Access
- **Requested 2026-09-14:** Prosomo dashboard, GA4, Google Tag Manager, Google Search Console. Lawrence sends the dashboard and the one-page reports by WhatsApp to Jordan.
- **Received:** August 2026 one-pager (`assets/2026-08-prosomo-onepager.pdf`)
- **Credentials location:** TBD (never paste credentials here)

## Timeline
- 2026-09-13: pre-call brand audit and the 35-slide brand audit deck (`README.md`, `01-strategy/2026-09-13-*.md`)
- 2026-09-14: discovery call (`05-meetings/2026-09-14-discovery-call.md`)
- Week of 2026-09-21: Toggle sends the proposal after internal review
- Start of Q4 2026: SignWell picks a partner

## Notes
- SignWell was bootstrapped until about 1.5 years ago, with the founder, a couple of engineers, and one PM/CS person. Engineering time is the tightest constraint on anything we propose.
- Lifecycle today: one email after sign-up and a top-bar upgrade banner. No retargeting runs anywhere.
- Account ownership: Reddit and ChatGPT ad accounts belong to SignWell. Google Ads is controlled by Prosomo and access may not be possible. Meta and LinkedIn ownership is unknown.
- SEO and AEO sit with a separate agency and are out of scope for us.
- The next vertical after healthcare (Q4) is undecided. Our audit recommends accounting and bookkeeping firms.
- Lawrence and Henry inherited Prosomo and dislike its one-page monthly PDF. They are meeting several agencies this week and next.
- Audit: `01-strategy/2026-09-marketing-audit.md`
- Pre-call evidence file: `01-strategy/2026-09-13-brand-audit-verified-data.md`. Nothing in a deck may assert a number that does not trace to a line in that file or the audit above.
- Eleven industry pages are live on the site with no visible tiering.
- They are further along on answer engine optimization than most companies their size. They have Perplexity and Google AI Mode deep links on the page, an `/mcp/` page for signing inside AI chat, and `ai-train=yes` in robots.txt.
- They have no TikTok or YouTube presence. LinkedIn, X, Instagram and Facebook accounts exist.
- Prosomo runs the ads out of its own accounts. SignWell sees dashboards but does not own the accounts or the data. Account ownership is a selling point for us.
- Prosomo has trouble running a change review process in GTM.
- Technical and API buyers want clear pricing and docs, and do not want a sales call. Outbound that pushed prospects to a trial beat outbound that pushed them to sales.
- Past paid social tests failed from lack of a plan. Henry cited a $400 Reddit test that they cancelled right away. Bring a plan with a fixed budget and a fixed test window.
- Organic social (Facebook, Instagram, LinkedIn) is in-house. SEO and AEO sit with a separate agency.
