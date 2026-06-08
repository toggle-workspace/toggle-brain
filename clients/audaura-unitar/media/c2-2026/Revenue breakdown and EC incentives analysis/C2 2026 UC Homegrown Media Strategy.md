# C2 2026 — UC Homegrown Digital Media Strategy
**Objective**: Fill per-campus C2 2026 lead gap at lowest possible CPL. The operative KPI is **net leads still needed per campus** (total target minus leads on hand), not total volume or blended CPL. Per-campus targets from `C2 Target by UC Campus_9Mar26.xlsx` are the source of truth.

**Total net lead gap as of 9 March 2026: 4,273 leads across 10 campuses.**

---

## The Single Most Important Structural Change

**Switch all UC homegrown campaigns from CBO (Campaign Budget Optimisation) to ABO (Ad Set Budget Optimisation).**

This is non-negotiable. CBO lets the algorithm distribute budget freely — it will send everything to Selangor at RM36 CPL and ignore Kelantan, Kedah, and Terengganu. ABO gives you a fixed daily budget per ad set, meaning each UC location gets guaranteed spend regardless of relative CPL. Every other recommendation below sits on top of this.

---

## Platform Budget Allocation

The current split (Google 30% / Meta 55% / TikTok 15%) was built for volume. For UC homegrown leads it should be:

| Platform | Current | Proposed | Rationale |
|---|---|---|---|
| Google SEM | 30% | 38% | Highest-intent channel; UC-bound students actively search by program + location |
| Meta LG (ABO) | 55% | 52% | Maintain as primary volume driver but fully restructured |
| Meta Retargeting | — | 5% | New layer; 40–60% lower CPL on warm audiences |
| TikTok TOF | 15% | 5% | Brand awareness only; kill LG entirely |
| TikTok LG | included above | 0% | RM213–244 CPL is 2.5–3x Meta; remove from homegrown lead plan |

TikTok at RM213–244 CPL is inefficient for homegrown leads. Keeping 5% for brand TOF in high-priority states maintains algorithm awareness without wasting lead budget. The freed 10% goes to Google (higher intent = better lead quality = lower cost-per-enrolment even if CPL is nominally higher).

---

## Campaign Architecture

### The Core Rule: UC Campaigns Never Compete With Online/Selangor Campaigns

Run two completely separate campaign trees. They share no budget, no audiences, no creatives, and no reporting.

```
TREE A — UC Homegrown (all platforms)
  → 10 UC locations, homegrown programs only
  → ABO, geo-fenced per state
  → KPI: CPL per UC location + lead-to-NE conversion rate

TREE B — Online UIU + KL/Selangor (all platforms)
  → National reach, online programs
  → CBO allowed (algorithm can optimise freely)
  → KPI: total lead volume, CPL
```

Never merge these trees. If they run in the same campaign, Tree B wins on CPL every time and Tree A gets starved.

---

### META Campaign Structure (ABO)

Group UC locations into regional campaigns to pool learning data. Individual small-state campaigns (Terengganu: ~1.6 leads/day historically) will never exit the learning phase and will have higher CPL permanently. Regional grouping solves this.

Budget weight per location is determined by the lead gap proportion in the **Budget Allocation by Campus** table below. Size each ad set's daily budget accordingly — do not equalise across ad sets.

```
Campaign 1: UC East Coast Homegrown [ABO]
  Ad Set 1a: Kelantan — DECE
  Ad Set 1b: Kelantan — Business Dip
  Ad Set 1c: Terengganu — DECE          ← maintenance only (6 leads remaining as of 9 Mar)
  Ad Set 1d: Terengganu — Business Dip  ← maintenance only
  Ad Set 1e: Pahang — Business Dip
  Ad Set 1f: Pahang — DECE

Campaign 2: UC North Homegrown [ABO]
  Ad Set 2a: Kedah (SP) — DECE          ← highest weight; 1,528 lead gap
  Ad Set 2b: Kedah (SP) — Business Dip  ← highest weight
  Ad Set 2c: Perak (Ipoh) — DECE
  Ad Set 2d: Perak (Ipoh) — Business
  Ad Set 2e: Penang — DHRM/Logistics    ← product not fully ready; test only

Campaign 3: UC South & East Malaysia Homegrown [ABO]
  Ad Set 3a: Johor (JB) — DECE
  Ad Set 3b: Johor (JB) — Business Dip
  Ad Set 3c: Sabah (KK) — DECE
  Ad Set 3d: Sabah (KK) — Business Dip
  Ad Set 3e: Sarawak (Kuching) — RC     ← RC-focused, not UC
  Ad Set 3f: Malacca — Business Dip     ← minimal; Cosmo decision pending
```

**Budget floors are starting points.** Scale up ad sets that achieve CPL under target within the first 2 weeks. Scale down or pause those that don't exit learning phase by week 3.

**Why Sungai Petani and Kelantan carry the highest ad set weight:**
- Sungai Petani: 1,528 leads still needed — the single largest unmet gap in the portfolio. Only 79 leads on hand against a 1,120-lead target. UNITAR is already market leader here; the gap is a media investment gap, not a structural one.
- Kelantan: 501 leads still needed, RM80 CPL, 180% NE growth. The algorithm will always de-prioritise it versus Selangor; ABO with proportionally high weight is the fix.
- Terengganu: target virtually met. Maintain minimal presence to capture any remaining demand; do not increase.

---

### GOOGLE Campaign Structure

One campaign per UC state. Google campaigns do not have the same minimum-learning constraint as Meta — keyword-level control is sufficient. Use exact + phrase match only. No broad match, no Performance Max for UC campaigns (PMax will bleed into Selangor and national terms).

```
Google Campaign — UC Kelantan Homegrown
  Ad Group 1: DECE / ECE keywords (BM + EN)
    ["diploma pendidikan awal kanak kanak kota bharu", "diploma ECE kelantan", etc.]
  Ad Group 2: Business Diploma keywords
    ["diploma perniagaan kota bharu", "diploma pengurusan perniagaan kelantan", etc.]
  Location: Kelantan only (+30% bid adjustment within 20km of UC campus)

[Repeat for each UC state]
```

Budget weight per Google campaign mirrors the same location proportions as Meta — see **Budget Allocation by Campus** table. States with the largest lead gaps get proportionally more of the 38% Google allocation.

**BM keywords are mandatory for outstation states.** Kelantan, Terengganu, Kedah, Pahang, Perak — the majority of SPM leavers search in BM. Running English-only keywords misses 50–70% of search volume in these states.

**Use RLSA (Remarketing Lists for Search Ads)** for anyone who visited a UC campus-specific landing page. Bid 50% higher for these — they already showed intent.

---

### Retargeting Layer (New — 5% of Total Budget)

This is the highest-ROI addition to the current plan. Run on Meta and Google Display.

| Audience | Channel | Expected CPL reduction |
|---|---|---|
| Video viewers (30s+) from UC awareness ads | Meta | 40–50% lower CPL vs cold |
| Lead form openers (did not submit) | Meta | 50–60% lower CPL |
| UC campus page visitors (30 days) | Google Display | 35–45% lower CPL |
| Prospectus/program page visitors | Google Display | 45–55% lower CPL |

Geo-fence retargeting to within each state — don't retarget a Kelantan visitor with Penang ads.

---

## Geographic Targeting Rules

| Rule | Detail |
|---|---|
| All UC homegrown ad sets: state-only geo | No cross-state bleed; Penang campaign targets only Penang |
| Exception: Terengganu ↔ Pahang border | These two states can share a combined ad set |
| Selangor and KL: excluded from UC campaigns | Selangor leads at RM36 CPL are not homegrown UC leads; exclude explicitly from Tree A |
| Sabah + Sarawak: separate campaigns | East Malaysia audience behaviour differs from Peninsular; do not group with mainland states |
| Radius targeting within state | Add +30–40% bid adjustments for postcodes within 20km of UC campus |

---

## Creative Strategy

### Structure: 1 Base × 6 Location Variants × 3 Program Variants = 18 Core Creatives

| Dimension | Variants |
|---|---|
| Location | Campus city/state name, state-relevant imagery or state flag |
| Program | DECE/ECE, Business Diploma, Multimedia/IT (match what each campus actually offers) |
| Language | BM version for Kelantan, Terengganu, Kedah, Pahang / Bilingual for Penang, Johor, Sabah, Sarawak |

**The single highest-impact creative element is making the campus location immediately visible.** A student in Kota Bharu who sees "UNITAR College Kota Bharu" with a local reference converts at far higher rates than a generic UNITAR ad.

### Creative Priority by Impact on CPL
1. **DECE/ECE creative** — largest addressable segment in 7 of 10 UC states; make this the lead creative, not one of three equal options
2. **PTPTN eligibility callout** — critical for B40 states (Kelantan, Terengganu, Kedah, Pahang, Perak); this reduces friction and increases CTR significantly
3. **Business Diploma in BM** — second-largest segment across all states; BM version captures audiences the English creative misses
4. **Multimedia/IT** — smaller segment; run as secondary; don't use budget to test this until DECE and Business are performing

### What to Stop Doing
- Generic UNITAR brand ads in UC campaigns (low relevance score → higher CPL)
- English-only creative in BM-dominant states
- MBA/PG creatives in UC homegrown campaigns — this is an online UIU objective, keep it in Tree B

---

## Landing Pages (CPL Is Not Just a Media Problem)

A significant portion of "high CPL" in UC states is not the ad — it's the post-click experience. If a lead from Kelantan clicks an ad and lands on a national UNITAR page with 15 programs and no mention of Kota Bharu, the conversion rate drops by 40–60%, which functionally doubles your real CPL.

**Each UC location needs a dedicated landing page with:**
- Campus name + city in the H1 (not just UNITAR logo)
- Only the homegrown programs available at that campus listed (not the full UIU catalogue)
- PTPTN eligibility callout above the fold (for B40 states)
- Form pre-fills: state, programme interest pre-selected
- One local student testimonial or image from that state
- WhatsApp direct link to that campus's EC (not a national number)

This is not optional. Without it, CPL improvements from restructuring the campaigns will be partially offset by poor landing page conversion.

---

## Lead Quality Filter

> **March launch: volume-first.** Internal direction confirmed (mirrors C1 strategy): generate volume in March, review quality after. Do not gate March launch on implementing these filters — launch clean forms and add filters once ad sets exit the learning phase.

**Target rollout: April.** Once Tier 1 campaigns are stable and learning phase complete, add the following form-level filters:

1. **Programme selection required** — dropdown showing only homegrown programs for that campus (no UIU online options). This self-selects intent.
2. **Intake year field** — captures SPM leavers vs working adults early; routes to right EC
3. **"Are you applying for on-campus study?" checkbox** — simple homegrown vs online intent signal

This will reduce total lead volume but increase lead-to-NE conversion rate. Accept the volume drop — by April we will have enough data to know which ad sets are generating junk leads vs genuine interest.

---

## Budget Allocation by Campus (UC Homegrown Only)

Based on: **net lead gap** (leads still needed as of 9 Mar), current CPL, NE trajectory, IPTA competition level, and market structural advantage. These proportions govern ad set weighting across both Meta and Google.

| Priority | Campus | Net Lead Gap | Basis | Share of UC Budget |
|---|---|---|---|---|
| **Tier 1** | Kedah / Sg Petani | 1,528 | Largest gap in portfolio; UNITAR market leader, UUM declining, only 79 leads on hand | **23%** |
| **Tier 1** | Kelantan | 501 | RM80 CPL, 180% NE growth, low IPTA competition, massive ECE demand | **18%** |
| **Tier 1** | Perak / Ipoh | 334 | Foundation PTPTN advantage, no dominant non-science competitor | **13%** |
| **Tier 2** | Sabah / KK | 423 | Strong ECE demand (2,130 IPTS enrolment), medium CPL, growing market | **12%** |
| **Tier 2** | Johor / JB | 547 | Large gap but high CPL; invest in brand + retargeting, not cold leads | **10%** |
| **Tier 2** | Pahang / Kuantan | 252 | UMPSA contracting, manageable CPL, MARA competition but gap exists | **9%** |
| **Tier 3** | Penang | 307 | High gap but product (DHRM/Logistics) not yet launched; test only once ready | **5%** |
| **Tier 3** | Sarawak / Kuching | 226 | RC-only play; capped until Cosmo/closure decision is made | **5%** |
| **Tier 3** | Malacca | 149 | College closure pending; minimal spend until footprint confirmed | **3%** |
| **Maintenance** | Terengganu | 6 | Target virtually met (44 of 48 online leads in hand); maintain presence only | **2%** |

**Note on Johor**: Gap of 547 is real but CPL is the highest in the portfolio. Filling it through cold lead gen alone is expensive. Prioritise retargeting and brand; push walk-in and referral channels to close the remainder.

---

## Metrics: What to Track (And What to Stop Tracking)

| Metric | Action |
|---|---|
| **Net lead gap per campus** (target minus on hand minus generated) | **Primary planning KPI** — track weekly against `C2 Target by UC Campus` targets; drives budget reallocation decisions |
| **CPL per UC location** | Primary media efficiency KPI — replace blended national CPL |
| **Lead-to-NE conversion rate per campus** | Weekly review; if a location has good CPL but poor conversion, it's a sales/product problem |
| **Homegrown program lead share** (% of leads from homegrown programs) | Must trend upward; target >90% of Tree A leads are homegrown program enquiries |
| **Ad set learning phase status** | Any ad set stuck in learning >2 weeks → merge with regional group or pause |
| **Blended UC CPL** | Target: RM95–120 (accept this is higher than the old RM99 national blended) |
| ~~Total lead volume~~ | Remove as primary KPI |
| ~~National blended CPL~~ | Misleading when Selangor is in the mix; replace with UC-only CPL |

---

## Launch Sequencing

The current media plan has 20% of budget in March. Given the structural changes required, do not try to launch everything on day 1.

**Before launch (now): account for leads on hand**
- Pull the current "on hand" count per campus from `C2 Target by UC Campus_9Mar26.xlsx` before setting budgets
- Size the campaign to fill the **net gap only**, not the full target
- Terengganu: do not launch actively — 6 leads remaining; set to maintenance and monitor

**Week 1–2 (March): Sungai Petani, Kelantan, Perak**
- Tier 1 states with the largest absolute lead gaps — learn fast here
- Confirm Sungai Petani campus name and EC WhatsApp number for landing page
- Validate ABO structure and state-specific landing pages before wider rollout

**Week 3–4 (March): Add Sabah, Pahang**
- Roll in Tier 2 states once Tier 1 is stable
- Use creative learnings from Tier 1 before producing new assets
- *Terengganu excluded from active launch — maintenance only*

**April onwards: Johor, Sarawak, Malacca, Penang**
- Johor and Sarawak need custom landing pages and RC-specific creative before launch
- Malacca and Penang: low-budget test only; await Cosmo footprint decisions
- **April is also when lead quality filters go live** — add form-level programme dropdowns once Tier 1 ad sets have exited learning phase

**Do not run Malacca or Penang at meaningful budget until:**
- Cosmo restructure timeline is confirmed (Malacca college closure)
- DHRM/Logistics program is launched and has a landing page (Penang)

---

## Channel Mix by State (Pending Data)

Preliminary internal insight (Nikki Poh, 10 Mar): **Meta LG lead form works badly in some states** — local audiences in certain areas don't trust online lead forms. Ron is conducting a state-level channel performance breakdown.

**Action until that analysis is ready:**
- Do not assume Meta LG is the right primary format in every state
- Keep Google SEM running in parallel across all states — search intent is channel-agnostic
- When Ron's analysis is available, adjust the Meta LG vs Google proportion per state. Some states may shift to Google-heavy (60%+) if Meta LG conversion rates are structurally poor

**States most likely to show Meta LG underperformance:** Johor (high CPL despite large market), Terengganu (low CPL but historically low enrolment conversion). Flag these first when data is available.

---

## The One Risk to Manage

**Selangor re-entering UC campaigns through audience overlap.**

Meta's broad targeting and lookalike audiences can bleed across state lines. Explicitly exclude Selangor, Putrajaya, and KL postcodes from every UC homegrown ad set. Check this monthly — Meta sometimes re-expands geographic reach without notification, especially on Advantage+ placements.

If you use Meta Advantage+ audience targeting anywhere in Tree A, turn it off. It will route budget to Selangor because that audience is larger and converts cheaper. Manual audience targeting only in UC campaigns.
