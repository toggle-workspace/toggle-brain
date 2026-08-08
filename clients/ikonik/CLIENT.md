# Ikonik Eye Specialist Centre — CLIENT.md

- **Slug:** `ikonik` (geo `my-` pending batch prefix)
- **Status:** Prospect — **pitch Thu 16 Jul 2026** (pre-read to client Tue 14 Jul evening; CEO/founder reviews first)
  - ⚠️ **STALE as of 2026-08-04.** The pitch date passed and the outcome is not recorded anywhere in this repo. Ikonik also does not appear in `Sales/sales-pipeline.md` or `cockpit/`. Update this line with won, lost, or still pending.
- **Pitch deck:** `01-strategy/IKONIK-Pitch-Deck-Full-Media-Plan-July-2026.html` (16 slides, full TikTok/Google/Meta media plan)
- **Meeting notes:** `05-meetings/2026-07-pre-proposal-meeting.md`
- **Website:** https://ikonik-eyecentre.com/
- **TikTok:** https://www.tiktok.com/@ikonikeyespecialist (main traffic source — livestreams of minor eye surgeries)
- **Location:** Residensi Park Bukit Jalil, Kuala Lumpur · single centre
- **Geo target:** Klang Valley

## Scope (proposed)
- Patient lead generation — TikTok + Meta paid, WhatsApp-first capture, full-funnel tracking
- **Pricing:** RM3,000/month retainer × 6-month contract (RM18,000 total, ex-SST); ad spend separate, billed direct to client
- Proposal: `01-strategy/IKONIK-Proposal-Lead-Generation-RM3K-x-6-Months.html`

## Facts (from site, verified 2026-08-04)

> **Full website audit:** `01-strategy/website-audit-2026-08-04.md`, every URL pulled and read, then adversarially re-verified. Read it before any campaign build. Sections 12 and 13 are the actionable ones.

- Legal entity: `IKONIK EYE SPECIALIST AND GENERAL HEALTH CENTRE SDN BHD`. No SSM number published.
- Services: Flapless Smart Signature™ (flagship, "up to -1200 power"), Flapless Trust™ (value tier, price never stated), conventional LASIK, IPCL, RLE, cataract, Ortho-K (kids 5–17), plus a disease cluster (dry eye, diabetic eye, glaucoma, ARMD, pterygium, chalazion) and a five-service aesthetics arm
- Site structures everything by age band: 5–17 Ortho-K · 18–49 laser/IPCL · 50+ cataract/RLE. The lead form's Service dropdown uses the same segments.
- **CEO: Muhammad Addaem Mikhail Chandran** (Founder & CEO). Business background, INSEAD MBA, not a clinician. Clinical authority sits with Medical Director **Dr. Noor Aniah Azmi**. 8 named doctors, including **Datuk Prof. Dr. Muhaya** (confirms the lineage), each with one credential line and no bio.
- **Patient-count claims conflict on the site itself: 152,000++, 110,000++, and 12,000++ all appear as patient figures, two of them on the same page.** Do not use any patient count in creative until the client confirms one. Other stats: 62,000++ procedures, 32,000++ laser eye surgeries, 13,000++ cataract & retina, 12.5% international.
- **Site says "Since our founding in 2014" and footers `© 2014-2024`, which conflicts with the meeting note's "established 2021".** Ask the client which date to use publicly before claiming years in market.
- Price anchor "serendah RM2,500/satu mata" is **confirmed on the website too**, but only as pixels inside the homepage popup JPEG, so it is invisible to search and to ad platforms. The only price stated in text anywhere on the site is the RM660 Comprehensive Eye Check Up (from RM1500), which is the real top of funnel.
- KKLIU:1537/EXP **31.12.2026**, which expires inside a six-month engagement starting now. Track the renewal.
- Contact: (+603) 9765 1368 · 011-2516 6926 (aesthetics) · appointment@ikonik.com.my · Mon–Sat 7:30am–8pm · single centre, Bukit Jalil

## Pre-launch blockers found on the site (2026-08-04)
1. **No lead/conversion event fires on any pixel** in the page source. GA4, Meta (`431642605237146`), TikTok (`CGN904BC77UCKR526JO0`), and Google Ads (`AW-801169026`) all track pageviews only. Three GTM containers could be firing events at runtime, so this must be confirmed live in Tag Assistant before we diagnose it. First job at kickoff.
2. **No WhatsApp link exists anywhere on the site**, which contradicts the "WhatsApp-first capture" scope below. Build it or change the scope.
3. **Ortho-K's main "Book Appointment" button points at a dead URL** (`/service/flapless-smart/`, a 302 to the homepage). The whole kids segment has a broken CTA.
4. **The RM2,500 homepage popup has no working click-through** (the link was coded as an `<img src>` instead of an anchor).
5. **No PDPA consent checkbox** on the appointment form, and the privacy policy does not authorize patient-list uploads for custom or lookalike audiences.
- Also: zero structured data, canonical tags carry a stray `:443`, and 14 live pages (a BM LASIK landing page, a BM cataract page, and 12 blog posts) are missing from the sitemap. A BM landing page for Malay ad sets already exists at `/rawatan-lasik-mata-malaysia/`.
- **CONFIRMED in pre-proposal meeting:** rebranded from Prof Muhaya's centre, est. 2021. Three segments: eye surgery (LASIK focus) · eye wellness "iSpa" · aesthetics. Eye segment first; others deferred.
- Scope agreed direction: 6-month, RM3K/month ex ad spend, content creation NOT included; target = double online patient volume (client promise-averse after prior agency's failed 100K-traffic pledge). TikTok contact: Marcus (LIVE-ads whitelisting = key unlock). No KOL strategy.

## Report history

> Reporting cadence is **weekly**. Deck master: `[Ikonik] Toggle Weekly Report (...).pptx` on Jordan's Desktop, hand-edited each week (nine slides, speaker notes carry the per-slide update checklist). Full write-ups live in `04-reports/`.

### 2026-W31 — reporting period 27 July to 2 August 2026 (first week)
- **Platforms reported:** TikTok, Meta, Google. Full detail: `04-reports/2026-W31-weekly.md`
- **Headline results:** RM3,312.21 spend, 379 messages at RM5.78, 50 form leads at RM11.36, blended RM7.72 per enquiry. TikTok RM3,106.32 / 391 enquiries / RM7.94 each. Meta RM105.34 / 38 enquiries / RM2.77 each. Google RM100.55 / 0 form submissions / 5 calls and directions.
- **What drove performance:** TikTok DMs alone produced 354 of 379 messages. Malay language ad sets led on messages, testimonial ads led on form leads. Meta launched 1 Aug and undercut TikTok's cost per enquiry on two days of data.
- **Growth observation raised:** Google's zero conversions trace to tracking, not performance. No lead event fires on any pixel (blocker 1 above). This gates Google scaling and degrades Meta and TikTok optimization signals too.
- **Client actions requested:** monthly TikTok and Meta LIVE calendar; the qualifying question for the lead form and message template; a decision on adding Messenger and Instagram as Meta LIVE messaging destinations alongside WhatsApp.
- **To watch next week:** whether Meta's RM2.77 holds past the learning phase (decides a budget shift off TikTok); whether the Google conversion event goes live; first Meta LIVE boosting numbers from 3 Aug.

## Competitor landscape (researched July 2026)
- **Tier 1 — refractive chains (direct):** OptiMax (market leader, 24 centres, public-listed, RM1500-entry promos on TikTok, rack rate RM10.6K LASIK/RM13.8K SMILE) · VISTA Eye Specialist ("Top #1 LASIK" positioning, iLASIK, multiple KV centres) · TOP Vision (value chain, Malay-market, Ikonik already tags #topkleyespecialist)
- **Tier 2 — premium/tertiary:** ISEC Mid Valley (insurance-panel strength), OasisEye, hospital ophthalmology (KPJ/Sunway/Pantai)
- **Tier 3 — single-centre locals:** Advance Vision, Ranu, USJ Eye Specialist, My Vision
- Market pricing: LASIK both eyes ~RM5–12K; Ikonik's RM2,500/eye is aggressive-affordable end
- Strategic read: can't outspend the chains; live-surgery content is the moat (chains won't copy — medico-legal caution); price is closer, not hook. Consumer TikTok frames the category as "Optimax vs Vista" — Ikonik absent from that conversation.
