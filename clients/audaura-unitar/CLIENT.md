---
client: Audaura (UNITAR)
slug: audaura-unitar
geo: my
status: active
stage: won
practice: acquisition          # lead-gen for university enrolment
currency: MYR
mrr: TBD            # complex — Toggle earns 55% of media fees + creative retainer; see account-knowledge-base §1
credit_pending: TBD # outstanding receivables in MYR; 0 if none
account_lead: Jordan (Kelvin co-lead; Viknesh commercial)
last_reviewed: 2026-06-30
---

# Audaura (UNITAR)

> **Three-tier engagement.** UNITAR (university, the advertiser) → **Audaura Digital** (brand/intermediary, our direct contracting client) → **Toggle** (delivery). Toggle earns **55% of media fees**. Full history, economics, performance and contradictions: **`01-strategy/account-knowledge-base.md`**.

## Contacts
- **Client decision-maker (UNITAR):** Nikki Poh · marketing lead / day-to-day decision-maker · nikki.poh@unitar.my · +60 17-570 2039
- **Client (UNITAR, strategic):** Tim · senior stakeholder (business-goal lens; "19 programmes drive 70% of students") · Janice · marketing team
- **Billing / intermediary (Audaura):** Kelvin Lim · info@audaura.my · +6016-676 7596
- **Toggle:** Viknesh Sivanandan · Sales Director · +60 12-568 8681 · marketing@toggle.solutions · | account/performance: Jordan, Kelvin | strategy & tracking: Zaid

## Scope
- **Services:** performance-marketing, creative-production, seo, content-marketing, reporting-analysis, web-development (all under `brain/services/<service>.md`)
- **Engagement model:** `brain/process.md`
- **Channels:** Google (Search + PMax), Meta, TikTok. Segmented by intake cycle × geo tier × language (EN/BM) × funnel × campus tree.
- **Start date:** 1 Apr 2025 (MSA v2/R2; R0 draft says 1 Mar 2025). RFP service period **1 Jul 2025 – 30 Jun 2026**.
- **Renewal / review date:** 1-year term, rolling per cycle.

## Billing
- **Commercial structure:** Toggle = **55% of media fees** (payable only after Audaura receives from UNITAR). Toggle acts as principal with media owners. ⚠️ MSA exists in 3 versions (R0 / v2 / R2) — **all unsigned**, Schedules 3–5 (KPIs/Deliverables) blank. Confirm the executed version.
- **Payment terms:** Toggle→Audaura Net 30 (QT-240); Audaura→UNITAR 7-day (creative); media-fee invoices only after Audaura confirms receipt from UNITAR.
- **Currency:** MYR
- **Quotes on file:** QT-240 (SEO + Content, **RM 12,000** one-off, 25 Apr 2025); Creative "Tier 2 Max-Velocity" (**RM 15,750/mo**, 12 Nov 2025). Neither yet copied to `archive/quotes/` — **TODO: add price anchors.**

## Access
- **Tools:** Google Ads (account "UNITAR - MY - Degree", 905-920-2225), GA4, Meta Business, Salesforce CRM, Zapier, TikTok Ads.
- **Credentials location:** ⚠️ currently a **plaintext doc in the source archive** — migrate to a 1Password vault (name TBD) and **rotate**. Never paste creds in this repo.

## Branding — white-label (binding)

**Never put the Toggle logo on a UNITAR deliverable, and never write the words "Toggle" or "Madcrack" anywhere in one.** This covers every artifact type: reports, decks, HTML, PDFs, ad copy, briefs, emails, roadmaps. The engagement is white-labeled through Audaura, so the client-facing brand is Audaura's, not ours.

Before delivering anything for this account, check the cover, header, footer, and body for a Toggle logo file or either word, and strip them. Templates copied out of `templates/` ship with Toggle branding by default — remove it on the copy. If you are unsure which brand mark belongs there instead, ask Kelvin (Audaura) rather than guessing.

**Grepping for "Toggle" will not find the logo.** Our HTML decks inline the wordmark as an SVG sprite — `<symbol id="wm" viewBox="0 0 1432 392">` (the path from `assets/logos/toggle-wordmark.svg`), drawn via `<use href="#wm"/>` on every slide. No brand text is involved. Audit HTML with `grep -E '#wm|1432 392|M1166.39 1.57487'` as well as the brand words.

## Notes — quirks, politics, history
- **Audaura is a 2025-incorporated intermediary** (Co. 202501006752) sitting between an established university and Toggle. UNITAR is *not* an MSA signatory.
- **Won against incumbent Mindshare (GroupM)** via the 2025 RFP "Road to 10K" (goal 10,000 enrolments; later raised to 11,000). Mindshare fired for poor reporting / delayed launches / scope not delivered — hence the self-warning to be careful agreeing scope.
- **The defining problem:** platform-reported CPL (~RM95) hides a Salesforce-attributed cost-per-real-lead **5–18× higher** (RM700–1,747). CAPI / EC4L / downstream-Salesforce bidding all exist to close this gap (account-knowledge-base §7).
- **Live tension:** Tim's recurring strategic-alignment challenge. **Expansion appetite:** Indonesia (lead market) then Pakistan (fast-follow) — both still proposals.
- **Entity/compliance trap:** RM12K MBA promo is **UUCKL-only** (UIU's is RM19K) — must be stated in ads.
- 2026 results repeatedly disrupted by website/tracking failures (Dec hack, Jan reCAPTCHA, Feb tracking pause); **April 2026 best month** (14,958 leads @ RM59.52, SPM window).
