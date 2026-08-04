# Doctor Anywhere — Performance Marketing Strategy & Reference

**Owner (through June 2026):** Jordan Pinto, Digital Marketing Manager
**Scope:** Regional — Singapore (largest/most mature), Malaysia, Thailand, Indonesia, Philippines
**Purpose of this doc:** Single reference for strategy, structure, historical data, and reporting logic. Excludes campaign-by-campaign media plans/execution detail — those live in their own working documents.

---

## 1. Business & Strategic Context

**Vision:** Largest tech-led healthcare company in Asia that people can trust with their lives.
**Mission:** Use technology and innovation to transform access to healthcare, integrating online and offline experience seamlessly.
**Ecosystem:** Three stakeholders — Patients, Providers, Payers — served through a decentralised, borderless, personalised model.

### 2026 Marketing Objectives (the lens every recommendation ties back to)
- **O1 — Grow the Healthcare Ecosystem** (Demand, Movement, Revenue) across the care continuum: Primary → Specialist → Tertiary → Step-Down → Preventive
- **O2 — Scale Soda** as the #1 Employee Wellbeing Platform in SEA
- **O3 — Build DA into the most trusted, AI-enabled InsureHealthTech brand in SEA**
- **O4 — Build a high-performing, AI-enabled Marketing organisation**

**North Star metrics:** Brand Trust Index 80 · Top 3 Most Trusted Healthcare Brand · 3M lives covered by 2028

Strategy should orchestrate movement across the care continuum, not just acquire at the entry point — this is the standing frame for any funnel or channel decision.

---

## 2. Business Unit Structure

| BU | What it is | Primary conversion event | Revenue basis |
|---|---|---|---|
| **VC (Virtual Consult)** | Core acquisition engine — telehealth entry point | Joined VC (Google only); App Install elsewhere | Conversions × $40.26 avg bill (single-transaction) |
| **MedSuites** | Premium health screening / longevity packages | Purchase/booking | Conversions × $445.80 avg bill |
| **MOBS** | Mobile/home-based medical services (house calls, vaccination, phototherapy, health screening) | Booking | Conversions × $185.03 avg bill — **house-calls-only figure, understates true MOBS scope** |
| **SODA** | B2B employee wellbeing & benefits platform | Form submission → sales-qualified MQL → closed deal | Deal-based, no ad-platform revenue feed |

**Standing scope caveats (repeat these wherever the relevant BU's numbers appear):**
- MOBS ROAS/AOV reflects **home care only**; it excludes form-submission conversions and the wider MOBS service scope. True performance is understated.
- MedSuites EHS revenue must isolate the B2C share (confirmed ~30%) before comparing against a consumer-only target — blending in B2B/corporate revenue inflates attainment artificially (this caused a false 170% vs a true ~51% in one internal read).
- SODA closed-deal attribution is sales-team-tagged, not UTM-based — channel-level deal attribution does not exist yet.

---

## 3. Campaign Taxonomy & Naming Conventions

**SODA (confirmed, own ad accounts):**

`[BU] | [Market] | [Channel] | [Objective] | [Product/Theme] | [Audience Type] | [Period]`

- **BU:** SODA, GHS, MEDSUITES, VAX
- **Market:** SG, MY, TH, ID, PH
- **Channel:** GS (Google Search), PMAX, META, LI (LinkedIn), ASA, TT (TikTok), TAB (Taboola)
- **Objective:** CONV, LG (lead gen), INST (app install), AWA (awareness), RTG (retargeting)
- **Product/Theme:** Brand, EmpBenefits, SodaPacks, SodaFlex, AdminFree, CostControl, Testimonial
- **Audience Type:** Cold, RTG, LAL (lookalike), ABM
- **Period:** e.g. 2026Q3

Ad set/ad level mirrors the campaign name with audience or creative variant appended. **UTM parameters must match campaign names exactly** — SODA MQLs are tracked via website form submission, so this is non-negotiable for attribution.

**GHS BUs (VC, MedSuites, MOBS): ⚠️ open item.** No consistent, confirmed naming convention has been documented for these BUs the way SODA's was. This needs to be confirmed before it can be treated as a reliable filter in Looker/Tableau — see Section 9.

---

## 4. Measurement & Attribution Framework

**How conversions are currently attributed (three layers):**

1. **Platform-level** — Each platform (Google, Meta, ASA, TikTok) attributes on its own last-click logic, independently. No cross-platform deduplication exists, so a user touched by two platforms before converting gets counted by both.
2. **Singular (MMP)** — Connected via S2S but only partially configured. iOS app events (Sign Up, Log In, Book Appointment, Complete VC) are live. Cross-channel Joined VC attribution is **not** live — Google is the only channel where Joined VC fires as the conversion event; every other channel reports App Install only, so channel-level ROAS beyond Google cannot be confirmed for VC.
3. **Revenue (manual)** — No live product revenue feed into ad platforms. Revenue = conversions × average bill size (ABS) per BU, recalculated manually. Any ABS change has to be propagated by hand across every report.

**Standing metric-layer rule:** Awareness proxies (video views, LPVs, impressions) and business outcomes (bookings, MQLs, Joined VCs) must always be presented as **separate layers**, never aggregated into one "conversions" number. Doing so is what previously produced a misleading ~39,250 "conversions" figure against a real bookings target of 250 on one campaign.

**Standing CAC rule:** Paid-only CAC and blended all-channel CAC are never conflated in forecasts or investment cases.

---

## 5. Known Issues & Data Integrity Flags (consolidated, living list)

**Tracking**
- Singular not fully configured — Joined VC only fires on Google; Meta, ASA, TikTok report app installs only
- Meta pixel not fully implemented across all pages
- Booking/purchase journeys are not tracked through to transaction completion (conversion fires before final confirmation)
- Lead-gen form tracking fires at initial click, not the thank-you page — overstates submissions vs. qualified completions
- SODA has no UTM-to-CRM lead source mapping — closed deals can't be tied to a channel

**Reporting & data**
- No automated cross-channel dashboard — data across Google, Meta, ASA, TikTok, LinkedIn is manually pulled and compiled
- Revenue is manually calculated (conversions × ABS), not pulled from a live feed
- Taboola cannot connect to Looker Studio via API — must be pulled directly from platform
- MOBS revenue in Looker reflects the Home Care dashboard only, not the full service scope (vaccines, health screening, phototherapy)
- Looker Studio runs on the 2Minute Reports connector — a single point of failure; if disconnected, historical data becomes inaccessible

**Infrastructure**
- No dedicated data support for paid media — a data puller/automated pipeline (or data-team support) would materially reduce manual effort and improve consistency; flagged as a priority ask, not yet resourced

**Budget/scope flags (from H2 planning work)**
- April–December YTD budget figures in the master workbook appear to be repeated plan placeholders rather than true actuals — needs validation before being used as a baseline
- MOBS "Home Care dashboard" figure (~$41K Jan–May) sits far below its labeled target (~$4.37M) — this is a scope-sourcing mismatch, not a performance failure, and should be framed that way upward

---

## 6. Reporting Structure & Cadence

| Report | Covers | Use for |
|---|---|---|
| **Biweekly Detailed Report** | Performance by pillar — Paid Ads, Social, CRM, Organic | Deep channel-level analysis, optimization calls |
| **Biweekly Highlights Report** | Campaign performance summary + team activity | Context on what's live and who owns it |
| **Monthly Report Deck** | Consolidated 2025+2026 trend view | Trend analysis, benchmarking, seasonality across markets |
| **H1/H2 Audit Deck** | Half-year roll-up per BU (this doc's Section 7) | CEO/BU-head review, scenario planning input |

**Current cadence:** Reports are pulled and compiled manually (see Section 5). A **monthly cross-BU reporting cadence with BU leaders** (VC, MedSuites, MOBS, SODA) has been proposed as the primary forum going forward for budget reviews, channel recommendations, and creative performance updates — not yet formalised as a standing meeting at the time of handover.

**Dashboards:** Looker (primary), plus platform-native dashboards (Google, Meta, etc.) as secondary reference.

---

## 7. H1 2026 Audit — Key Findings (Jan–June 2026, paid only)

### GHS (VC + MedSuites + MOBS) — Executive Summary
| | Spend | Conversions | Revenue | ROAS | CVR |
|---|---|---|---|---|---|
| **VC** | $376,737.92 | 45,294 | $864,462.72 | 2.29x | 15.21% |
| **MedSuites** | $39,642.00 | 529 | $235,828.20 | 5.95x | 0.98% |
| **MOBS** | $126,946.47 | 562 | $103,986.86 | 0.81x | 0.39% |
| **Total GHS** | **$543,326.39** | — | **$1,204,277.78** | **2.22x** | — |

**Headline:** VC is the volume engine, MedSuites is the highest return per dollar spent, but MOBS is spending more than it generates. Resolving MOBS is the single biggest lever on portfolio ROAS.

### VC — Channel Detail
| Channel | Spend | Conv | Cost/Conv | ROAS |
|---|---|---|---|---|
| Google | $300,915.67 | 21,472 | $14.01 | 2.87x |
| Meta | $47,563.37 | 4,822 | $9.86 | N/A (installs only) |
| Apple Search Ads | $17,270.03 | 19,555 | $0.88 | N/A (installs only) |
| Taboola | $5,573.54 | 4 | $1,393.39 | dead spend |
| TikTok | $2,824.04 | 71 | $39.78 | N/A |
| LinkedIn | $2,591.27 | N/A | N/A | N/A |

Google is the only channel with confirmed Joined VC revenue tracking; all other channels' true ROAS is unconfirmable under current attribution.

### MedSuites — Channel Detail
| Channel | Spend | Conv | Cost/Conv | ROAS |
|---|---|---|---|---|
| Google | $17,119.68 | 127 | $134.80 | 3.31x |
| Meta | $22,522.32 | 402 | $56.03 | 7.96x |

Meta is MedSuites' strongest channel by a wide margin — the inverse of MOBS (below).

### MOBS — Channel Detail
| Channel | Spend | Conv | Cost/Conv | ROAS |
|---|---|---|---|---|
| Google | $81,867.66 | 445 | $183.97 | 1.00x (breakeven) |
| Meta | $40,533.56 | 117 | $346.44 | 0.53x |
| LinkedIn | $2,300.00 | N/A | N/A | N/A |
| TikTok | $2,245.25 | N/A | N/A | N/A |

Meta is MOBS' weakest channel — same platform, opposite outcome to MedSuites. This is the single clearest reallocation signal in the portfolio: **shift Meta budget from MOBS toward MedSuites.**

### SODA — Executive Summary
| | Spend | Leads | Cost/Lead | Closed Deals |
|---|---|---|---|---|
| Google | $24,955.40 | 120 | $207.96 | 25 (all sales-tracked deals) |
| Meta | $18,545.47 | 95 | $195.22 | — (no CRM source tracking) |
| LinkedIn | $10,374.35 | 19 | $546.02 | — |
| **Total** | **$53,875.22** | **234** | **$230.24** | **25** |

**Headline:** Paid contributed to 25 closed deals in H1, but without CRM source attribution or validated deal values, the business is closing revenue without knowing which channel or message drove it. Fixing CRM attribution is the single highest-leverage action for H2.

### Top-Performing Creative (H1)
| BU | Angle | ROAS | Why it worked |
|---|---|---|---|
| MOBS – Public Health Screening | Customisation ("Customisable Packages/Add-Ons") | 2.97x | Pre-answers "does this cover what I need?" before the click — reduces the real barrier (relevance, not price) |
| VC – "Doctor in 5 mins" | Speed / 24-7 access | 3.38x | Reframes healthcare as instant and frictionless — resonates with time-poor urban users |
| MedSuites – Health Screening | Lifestyle / aspiration (calm imagery, "stay strong, stay sharp") | 24.49x | For a premium, considered purchase, emotional resonance outperforms clinical/transactional framing |

### Portfolio-Level Learnings (H1 2026)
1. **Data foundations need work before bigger calls are made.** Several "weak" numbers (Meta/ASA on VC, SODA beyond Google, MOBS AOV) may reflect tracking/scope gaps rather than real underperformance — spend is being held steady on those channels while tracking gets fixed.
2. **Creative angle matters more than channel.** Every top performer won on one specific concern (speed, lifestyle, customisation, loss-aversion) rather than a generic pitch — this is now being extended from MedSuites to VC's still-transactional Meta creative.
3. **Meta's performance is product-dependent, not universally good or bad** — MedSuites' strongest channel, MOBS' weakest.
4. **LinkedIn hasn't found its fit** — high cost, no confirmed return in MOBS or SODA; paused in both.
5. **H1 2026 was a deliberate testing period**, shifting from 2025's Google-heavy bottom-funnel focus to full-funnel testing across new channels — some softness reflects early-stage learning, not steady-state failure. TikTok (small, awareness) was kept running despite soft ROAS; Taboola (genuinely dead) was cut.

---

## 8. Historical Learnings & Best Practices (Platform / BU-Specific)

*(Diagnosis → response framing; sourced from H1 audit, Feb–Apr media optimization review, and biweekly reports. Anything predating June 2026 is inherited/audit-sourced, not firsthand.)*

- **VC – Apple Search Ads:** Branded-keyword traffic drives most ASA volume — scaled results reflect existing intent, not incremental demand. → Segment branded vs. generic keyword groups before scaling further.
- **VC – Google Search/App:** Bid reduction trades away Join VC volume near-linearly, not with diminishing returns. → Use small, reversible bid tests rather than large cuts.
- **VC – Meta:** Creative exhaustion, not channel strategy, was the primary driver of CPL spikes. → Treat as a refresh-cadence problem, not a targeting problem.
- **MedSuites – Meta:** Lifestyle/aspiration framing consistently outperforms clinical/transactional messaging for premium/considered purchases.
- **MOBS – Meta vs Google:** Same channel, opposite return profile to MedSuites — a platform's effectiveness is product-specific, not fixed.
- **SODA – Creative (validated, not hypothesis):** Loss-aversion / inefficiency-exposure framing ("Outdated SME Plans cost 3x More," "You're Paying for Perks Employees Don't Use") consistently outperforms solution-forward messaging ("Get better benefits today") in the SME segment. This should anchor all future SODA creative, including brand video — do not revert to solution-forward messaging.
- **SODA – Google Search:** The consistently efficient, highest-growth channel; earns budget protection and incremental allocation ahead of other channels.
- **SODA – LinkedIn:** High CPL relative to B2B benchmarks, unvalidated against actual deal outcomes in both MOBS and SODA context — correctly paused.
- **Cross-BU:** Taboola is confirmed dead spend for VC (4 conversions on $5.5K); not worth carrying forward without a fundamentally different creative/targeting approach.
- **Cross-BU:** PMax/Google shifts that move budget toward a new theme (e.g. Women's Health) can spike CTR without producing conversions in the near term — monitor before reallocating further, don't chase CTR alone.

### What Didn't Perform Well (lessons, not just outcomes)
- Reducing SODA's LinkedIn spend without a validated replacement channel initially left ~$1–1.5K under-deployed rather than reallocated — pausing a channel is only half the fix; the freed budget needs an active redeployment plan, not just removal.
- Running Meta creative on a single "always-on" set without a refresh trigger produces the classic fatigue signature (simultaneous volume decline + CPL rise) — this has recurred across BUs (SODA Facebook, VC Meta) and points to needing a standing refresh cadence, not one-off fixes.
- Blended CPA/ROAS reporting without channel-level attribution caveats invites the appearance of failure where the real issue is a tracking or scope gap (MOBS AOV, SODA CRM) — this has repeatedly required after-the-fact clarification to leadership.

### Seasonality
- **SODA / B2B renewals:** Employee benefits renewals in Singapore cluster around **Q1 (Jan–Mar)** and **Q4 (Oct–Dec)**, when companies renew group insurance or annual wellness budgets. An always-on approach does not currently account for this — Q4 in particular is the highest-intent window and should carry a dedicated push with higher budget and decision-stage messaging, not the same awareness creative running year-round.

---

## 9. Budget & Scenario Planning Framework

**H2 2026 GHS monthly scenarios (from budget revision work):**

| Scenario | Monthly GHS budget | Notes |
|---|---|---|
| BAU | $76,667 | Business-as-usual run rate |
| **S1 (selected)** | $63,334 | VC 55.79% / MedSuites 30% / MOBS 14.21% |
| S2 | $50,000 | Deeper cut scenario |

SODA runs as a separate budget bucket (~$5–10K/month), distinct from the GHS cap (~SGD 80K/month).

**Revenue Comparison (annual, total paid):**
- Target: $7.16M
- BAU projection: $4.76M (66% of target; 81% ex-MOBS)
- S1 projection: $4.13M
- S2 projection: $3.76M

**Structural issue to carry forward:** the Conversion Impact tab (bottom-up from spend) and the Revenue Comparison tab (top-down from Looker actuals) diverge and need to be read as two different lenses, not reconciled into one number — cross-reference rather than override either.

---

## 10. Vendor & Tooling Notes

- **Smartly.io** — evaluated for creative automation and cross-channel budget optimization; assessed as better suited to higher volume/spend than DA's current scale. Not adopted.
- **Design system (Gravity):** primary blue #0D39D8, navy #0A1E89 (DA core); SODA sub-brand uses Epilogue typeface with celadon/pink/moonstone/black palette and a "fizz dot" motif.
- **Stack in active use:** Google Ads, Meta, TikTok, LinkedIn, Apple Search Ads (channels); MoEngage (CRM/engagement — limited nurture flows active); Looker Studio + Tableau (reporting); Google Tag Manager (tracking); Google Sheets (source-of-truth planning).

---

## 11. Open Items to Confirm

1. **GHS campaign naming taxonomy** (VC, MedSuites, MOBS) — SODA's convention is confirmed and documented (Section 3); the other three BUs are not. Needed to reliably filter Looker/Tableau data by BU, market, and funnel stage.
2. **Data puller / automation support** — no dedicated data support currently exists for paid media; flagged as a standing ask to the data team.
3. **MOBS blended AOV across full service scope** — current ABS reflects house calls only; needs to be rebuilt across all MOBS service lines (vaccines, health screening, phototherapy) before ROAS figures can be treated as representative.
4. **SODA UTM-to-CRM mapping** — required before any channel can claim credit for a closed deal with confidence.
5. **Formal monthly cross-BU reporting cadence** — proposed but not yet locked in as a standing forum with BU leaders.

---

*Compiled from H1 2026 audit documentation, biweekly reports, SODA strategy review, and H2 budget planning work. Firsthand (June 2026 onward) vs. inherited (pre-June) sourcing distinctions are preserved from the original handover documentation where noted.*
