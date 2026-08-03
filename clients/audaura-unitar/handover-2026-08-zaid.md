# UNITAR x Audaura: Zaid's handover context

> **Path update 2026-08-02.** Everything below that refers to `assets/` scripts
> (`pull_meta.py`, `build_ads_dashboard.py`, `build_leadform.py`,
> `refresh-dashboard.sh`, the plist) now lives in
> `~/Desktop/Code/toggle-unitar-ads-dashboard` (GitHub `zsaaad/toggle-unitar-ads-dashboard`,
> private). The daily launchd job was repointed and reloaded the same day. The
> built dashboard still lands in `clients/audaura-unitar/04-reports/`.


**Prepared 27 July 2026.** Full reference behind the Google Doc "Unitar x Audaura - Context from Zaid for Unitar (27/7/2026)."
Internal Toggle document. Handing to Jordan, with Shaun involved.

**Cover period.** Zaid is away 21 August to 11 September 2026, hard-unavailable on 22 August and from 2 to 9 September, and reachable on other days in the window. Jordan joins the 9am UNITAR calls on Friday 21/8, 28/8, 4/9 and 11/9.

Sources: the six meeting WIP notes in `meetings/`, the live UNITAR reporting doc in Drive (weekly sections through 13 to 19 July), `CLIENT.md`, `KPI.md`, `WEEKLY-REPORT-FORMAT.md`, `CAMPAIGN-NAMING.md`, `01-strategy/account-knowledge-base.md` (cited below as the knowledge base), `media/c2-2026/`, `creative/copy/`, and the three decks in `01-strategy/`.

---

## Two things that outrank every campaign

**1. Most of this account's July work exists only on Zaid's laptop.** The whole ads-dashboard pipeline, the runbook, five of six meeting notes, both EIS copy sets, the newest strategy deck and the current dashboard HTML are untracked in git. A clean clone gets none of it.

**2. The committed versions of two pitch decks still carry the Toggle wordmark.** `git show HEAD` on `programmatic-pitch-2026-06-30.html` and `retargeting-pitch-2026-06-30.html` returns nine matches on the SVG sprite id and three on the word Toggle in each. The working-tree versions are clean. Anyone who clones and sends either deck breaches the binding white-label rule.

One commit fixes both. Do it before 21 August.

---

## The calendar matters more than anything else here

**The away window sits inside C3, the largest intake cycle of the year, and covers the run-up to the main September intake.** The cycle calendar in the knowledge base runs C1 (January intake), C2 (March and May), and C3 (July, September main, October) with a June to October window described as the largest on the post-SPM push. The live lead form offers January, May and September only, so September is a real registration deadline. The equivalent period in 2025 was the account's highest-spend month at roughly RM940k and 8,973 leads.

The practical consequence: through early September, **volume outranks CPL**. A CPL rise during the intake run-up may be the correct price of volume. Pulling budget back to protect a CPL number could cost the main intake. The 12 June note makes the timing point directly, that degree ads should launch ahead of SPM results rather than re-entering the learning phase when demand spikes.

Get the September intake registration cut-off date from Nikki before 21 August, so spend can be front-loaded ahead of it.

**Dates inside or just after the window:**

| Date | What lands |
|---|---|
| Mon 24 Aug | Weekly report due. Zaid reachable. |
| Mon 31 Aug | Merdeka Day, a Monday in 2026. Weekly report deadline collides with a public holiday. Agree with Nikki beforehand whether it moves to Tuesday. |
| Early Sep | August monthly performance report falls due. Contracted cadence includes a monthly, not only the weekly. |
| Wed 2 to Wed 9 Sep | Zaid hard-unavailable. |
| Mon 7 Sep | Weekly report due, inside the hard-unavailable block. This one is fully Jordan's. |
| 16 Sep | Malaysia Day, just after the window. |
| 15 Nov | Campaign naming convention deadline. |

Expect soft weeks around Merdeka. In the equivalent 2025 week the reporting doc records blended CPL rising from RM111 to RM130 and attributes it to the long weekend expanding the usual weekend dip. Report that as seasonal rather than as a performance failure. Confirm Maulidur Rasul's exact 2026 date against an official calendar, since it also falls in late August.

**Note the cadence mismatch.** The weekly report is due Mondays. Jordan is booked for Fridays. The Mondays in the window are 24 and 31 August and 7 September, and nobody is currently scheduled on them.

---

## Unitar Current Performance

### Latest full week on record, 13 to 19 July

| Channel | Spend | Leads | CPL |
|---|---|---|---|
| Meta | RM71,418.12 | 1,383 | RM51.64 |
| Google | RM74,246.90 | 714 | RM103.94 |
| TikTok | RM33,089.63 | 149 | RM222.08 |
| **Total** | **RM178,754.65** | **2,246** | **RM79.59** |

June month close: RM715,080.91 spend, 7,642 leads, RM93.57 blended CPL. Month on month that was spend up 15%, leads up 14%, blended CPL up 2%.

Spend is being held rather than scaled, in a RM172k to RM185k weekly band since mid June. Leads stepped up in early July on Pakistan volume, reached 2,415, then fell 7% to 2,246. Blended CPL improved from the June range into the low RM70s, then regressed to RM79.59 as Pakistan pulled back. For context, the account has run hotter than this: 13 to 19 April delivered 2,946 leads.

Google's printed CPL of RM103.94 does not match its own spend and lead figures, which divide to RM103.99. The reporting doc carries small arithmetic slips like this. Quote the table as printed and do not rebuild it.

### The number to watch weekly

**Meta Instant Form CPL has moved from RM51.76 (8 to 14 June) to RM89.05 (13 to 19 July).** The blended Meta figure of RM51.64 looks healthy only because Pakistan leads arrive at RM5.92. The core Malaysia engine is getting more expensive, and the blend hides it. If Jordan checks one thing each week, check Malaysia Instant Form separately from the blend.

Three honest caveats on that series, because the underlying data is messier than the headline:

- Only the last two weeks are explicitly labeled Malaysia-only in the source. Pakistan launched 18 June, so the 14 to 21 June and 22 to 28 June figures include Pakistan volume, which means true Malaysia-only CPL in those weeks was higher than printed.
- The reporting doc has **no 29 June to 5 July section**, so the run is not consecutive. Section boundaries also overlap, with 14 June appearing in two headings.
- The 1 to 7 June week reads RM66.61. Measured from there the rise is about 34%, not a doubling.

The direction is real and worth acting on. The clean five-week series is not, so do not present the numbers as a tidy progression to the client.

Same pattern on the volume driver: C1 Scale Up Retargeting Instant Form has moved from a RM53 to RM66 band into the high RM80s and low RM90s. A note in the 15 to 21 June week says to cap further increases if CPL passes about RM60. That was an internal agency action step, not a commitment agreed with UNITAR, so do not raise it as an agreed cap.

### Channel by channel, decision rules only

**Meta.** Instant Form carries the channel. Website Conversion is off and should stay off. Message Generation is a poor lead line, ranging from roughly RM279 to a worst week of RM891, and is worth keeping only as a cheap conversation source. Best Malaysia campaign is C2 Main Campus Prospecting in the RM47 to RM67 range.

**Google.** CPL improved for the first time in weeks, from RM112.90 to RM103.94, with leads up 20%. Standing instruction is to keep spend disciplined until blended CPL returns toward the RM90s, which is the clearest active ceiling on the account. PMax stays off, on the record of 0.96% lead-to-application and RM10,513 per application. Brand, competitor and SPM T1b BM are the efficient campaigns. Generic keywords are where money leaks.

**TikTok.** Three consecutive weeks in the RM215 to RM228 band with spend climbing and leads flat at 149. The single A1_tt_ONE_ABO creator creative has decayed from a RM43 to RM70 baseline through RM99 to RM131. TOF Awareness spends roughly RM10k a week for zero direct leads and needs a justify-or-reallocate decision. BOF retargeting currently sits at RM0, though it has run in earlier weeks and produced almost nothing, so treat it as a documented failure rather than untested upside.

**Geography.** Johor is the clearest case for following the winning channel per state: Meta runs at RM314 CPL there while Google leads volume at RM101. Melaka is the inverse.

### The ceiling is validation, at 50% against a 71% baseline

The 26 June note records that only about 50% of leads validate through to an appointment, against roughly 71% across the last full year. That is 21 points of warm demand leaking, and the root cause remains unidentified. The question sits with Shifa, Head of Digital Asia, and has been open since late June. It is the highest-value open question on the account.

The commercial version of the same gap, from 2024 figures in the knowledge base: platform CPL read about RM95 while Salesforce-attributed cost per outcome was RM926.80, or RM721.03 on a late-attribution basis, and RM1,747 for Google SEM. Those are two different attribution bases from two years ago rather than a current range, so use them to make the point about scale, not as live numbers.

Year on year spend is up 44%, RM9.1M against RM6.3M, with enrollment uplift not proportional.

The agreed response is to fix the leak before adding volume, which is why retargeting was prioritized. Three remedies are on the table, each with a cost: switching optimization to the validating event, which raises CPL by roughly 300%; multi-step lead forms with OTP; and a retargeting layer once validation improves. A nurturing team is being set up client-side, and nobody in the repo is named as its owner.

---

## Next cycle's plans

**Framing first.** The account is in C3, running June to October, with intakes in July, September and October. The September intake is the main one and it opens inside the away window. Everything below is C3 execution, so the priority through 11 September is protecting September volume rather than opening new lines. C1 2027 planning starts in the November to February window, so it needs scoping in late September rather than during the absence.

### Retargeting is approved and blocked on one extract

The pool is C1 and C2 leads that showed interest but did not convert, now rolled to C3 in Salesforce. Roughly 29,000 leads were created this year against 52.8k total since 2019, with about 47% carrying over each cycle.

**The pool extract, split by campus and validated, sits with Ron. Target date was 28 July.** The 29k needs validating before the ad sets are sized, because it may include carry-over duplicates.

Budget as planned: **about RM5k per month across four ad sets, roughly RM15k total over three months.** The four splits are main campus recent (2025 onward), main campus older (2019 to 2025), UC recent, and UC older. Agreed CTA is "send us a message for a chance to win a MacBook Neo," in WhatsApp format because fast first response time is critical. Same angle across segments with different visuals. Partner school leads split out separately, since they historically convert worse.

**Four decisions sit behind Ron's number**, which makes it the thread to pull:

1. **Salesforce duplicate handling.** Retargeted leads must bypass dedup filters, skip redundant pipeline stages, and be flagged highest priority. Amy, Ron and Shifa need to agree the process. A related constraint from 12 June is that Sales Cloud overwrites lead status rather than storing history.
2. **MacBook Neo eligibility.** Confirm whether the foundation cohort is excluded before the CTA is final.
3. **Chatbot allocation.** If the pool is small, around 5k, a chatbot across Facebook, WhatsApp, TikTok and Instagram may beat ads. The argument is that appointment rate lags enrollments, so reverse-calculate the appointments needed for 2,800 NE and optimize to appointments.
4. **Central College Penang.** Deferred until retargeting is settled.

The current deck is `01-strategy/retargeting-validating-cold-2026-07-09.html`, which narrows the June version to one cohort: students who submitted, entered Validating in Salesforce, then went quiet. Phase 2 widens to form abandoners, site visitors and social engagers once the economics hold. All three decks in `01-strategy/` are marked "PRELIM, internal draft for discussion" and none has been sent.

### Perkeso EIS is the biggest untapped line

Perkeso EIS brings in roughly RM800k a year at strong margins, and it has never been actively marketed. Students find it on the Perkeso website and self-enroll. Eligibility requires being unemployed for six months or more. The programs all run online. Targeting covers 16M Malaysians with unemployed or job-seeking interest, across 11 ads in four program buckets.

**Status: paused, waiting on Advertica to map the new one-question lead form.** The landing page is finalized with the URL confirmed, and the artwork still needs updating. The creatives that were shared contain incorrect information and must be resent to UNITAR for correction before launch. Adora's ads take priority over the UNITAR-side placeholder versions. A Canva outage delayed export.

Two source files disagree on flight length, seven days in the 24 July note against 10 days in the June Meta set. Confirm which before launch.

Creative direction from the live reporting doc, which the local repo copy is too stale to show: more fear-based, use testimonials, put program value in the ads, create scarcity with limited seats, and lead on unemployment. The stub in the doc reads "ARE YOU UNEMPLOYED? RM200/day."

**Compliance here is strict and load-bearing.** Every ad and the lead form must carry the exact disclaimer `*EIS funding subject to PERKESO eligibility. T&Cs apply.` Never write "government-supported," write "under the PERKESO EIS initiative." Never write "fully funded," because the landing page says up to RM4,000 subject to eligibility, approval and ESO referral. No job guarantees. Safe claims only.

**The account-level risk nobody has mitigated.** The June set deliberately asserts employment status, with lines like "Unemployed?" and "Lost your job?" The copy file states plainly that this is a top Meta auto-disapproval trigger which can restrict the ad account, that the client chose this knowingly, and that the mitigation is to keep a softer backup variant ready to swap in. **That backup variant has never been written.** There is one Meta ad account on this engagement, `act_1034316391892752`, carrying roughly RM71k a week of all Meta spend, and no Meta rep is named anywhere in the repo. A restriction takes down Meta entirely, not only the Perkeso line.

Since the plan is to push Perkeso live during the window, either write the softer variant before 21 August or hold the launch until after 11 September. If disapprovals start, pause the Perkeso ad set first, then escalate to Kelvin Lim at Audaura.

### Two campaigns went quiet rather than closing

- **Singapore.** The team agreed a test on 12 June. It had not launched by 26 June, because the Advertica lead form hard-codes campus to Johor with no online option. Neither the 10 July nor the 24 July note mentions it, and no file records a cancellation. The hypothesis was that Singaporeans are likelier to take online programs than travel to UCJB. If it revives: Malaysian and Singapore IPs cannot be mixed, so it needs separate campaigns, and pricing shows in RM.
- **Mandarin and Chinese postgrad.** One of three named RM300k problem areas. MBA leads are growing while the Chinese segment declines, Mandarin ads are not running, and existing translations are poor. Zaid proposed a Mandarin explainer with English subtitles on 12 June. Nobody has raised it since, and no file records a decision.

### Other live items

**Pakistan online MBA.** Toggle launched it on 18 June and paused it on 23 June, after roughly 200 leads in five days at RM11 CPL, with the price angle winning. Then the quality problem landed: **82% uncontactable on WhatsApp.** The numbers appear valid, which points to non-response rather than fake numbers, and confirming that with the sales team is still an open action from 10 July. OTP will not fix non-response. Agreed fixes, none confirmed done: add "up to 20% scholarship available" to the headline as filter and hook, since most contactable leads expect a full scholarship; promote "100% online" to a primary headline, because people are confused about attending in person; add a short "why do you want to apply?" field as friction; and consider a Pakistan-based outbound number. UTM tracking is live. Every weekly report carries the same caution, which is to verify downstream conversion before scaling on a RM6 to RM8 CPL.

**TikTok One creator program.** The best-performing thing on TikTok. Six creators ran RM14k for 243 leads at roughly RM62 CPL, about half the cost of standard TikTok ads. The account upgraded from Essential to Classic, so 50 creators instead of 10. Premium requires USD50k spend and the account is at 10k. Submitted so far: Diploma in EC, MED, and MBA Online ODR. The MBA submission from 18 June returned one video and it came back disabled, and no file records whether TikTok or UNITAR disabled it. **Seven of ten program slots are free and UNITAR still owes the program list.** Video generation is slow and is a standing complaint.

One reversal to respect: on 12 June the instruction was to tighten creator demographics, MED to 35+ and MBA to 27 to 30. On 10 July that was reversed. Remove age and description restrictions from briefs, use the "work and education" category filter instead, and accept that creators need not match the target persona. **The 10 July position governs.**

**Central College Penang.** An RC partner in Georgetown rather than a UC, carrying UIU bachelor programs with no UC overlap. It gets no enrollments and wants dedicated lead generation. The unresolved concern is that ads would run under the UNITAR page but land on the CCP site, which reads as a brand disconnect. The proposed fix is UNITAR-page ads that name Central College Penang in the headline. RC enrollments do count as NE in Salesforce. Deferred until retargeting settles.

**Programmatic.** Brand New, an ex-WPP outfit also working on Tiger and Taylor's open day, pitched on a CPL model. The team is skeptical on three grounds: the targeting is inference-based rather than logged-in, stacked DSP and data fees compress margin, and nothing in the pitch is capability we cannot already buy. Their agency background does mean preferential inventory rates. **Toggle never sent the brief, and Brand New never quoted a price.** Toggle's counter-deck proposes three sequential RM10k phases capped at RM30k, each answering one question with kill criteria at each gate. Dormant since 26 June, and the next step costs nothing: get the price, then decide whether the test is worth running.

**GEO.** Toggle promised UNITAR a progress report on keyword visibility in ChatGPT and Gemini for the week after 10 July. No GEO artifact exists in the repo and the 24 July call did not mention it. Treat it as an outstanding promise.

**TikTok Live and Shopee Live.** The account was created and then suspended. Revival runs through Stephanie and Jackie. Nobody has moved it since 26 June, and the UTM for a one-month paid test is still undefined.

---

## Creative process

### Where things live

Ad copy sits in `creative/copy/`, one file per intake cycle plus one per special program: `c1-ad-copies.md`, `c2-ad-copies.md`, `c3-ad-copies.md`, `c3-pakistan-mba-ad-copies.md`, `eis-perkeso-ad-copies.md`, `eis-perkeso-june-meta-set.md`. This account uses `creative/copy/` rather than the repo-standard `02-creative/`.

The two EIS files each open with a "Rules (before running)" block that works as a compliance gate. The four cycle files do not, so do not assume the gate exists everywhere.

TikTok creator briefs sit in `brief/tiktok-one-briefs/`, five programs so far, generated through `/tiktok-brief-writer` against `brain/tiktok-one-rules.md`, with an audit at `04-reports/tiktok-one-brief-audit-2026-06-09.md`. The 1,000-character project limit comes from the 25 April note rather than from the rules file.

**There is a second client folder.** `clients/audaura-unitar-creatives/` holds live Master of Education creative files and `UNITAR_Creative_Proposal_C2_C3_2026.pptx`, the C2/C3 creative proposal. Its `CLIENT.md` is an unfilled template.

### Do not open style-pack.md, it is empty

`style-pack.md` is an unfilled template with every field blank. The real guidelines live in the knowledge base: colors Orange #f59228, Blue #064a75, Grey #bbbcbe; fonts Poppins and Barlow only; approved CTAs limited to "Learn More" and "Apply Now"; talent casting rules including one specifically banned talent; and six approved logo lockups. **Use that section as the internal brief-validation checklist,** because it is the only one that exists.

### Creative learnings that should shape every brief

- **Native and creator-style beats high production by roughly 20 times** on TikTok Instant Form submission rate, 0.62% against 0.03%, with CTR 3.16% against 0.24%. This is the strongest creative finding on the account.
- **Refresh cadence is two weeks or less.** Slow refresh is the number one root cause of CPL spikes, and it is the thing most likely to slip during an absence. TikTok is already showing it.
- Ads carrying pricing were top performers through a full month, though that finding dates from June 2025. Hyper-specific program level and field of study beats generic. Bottom performers are either too broad, such as generic_certificate, or too niche, such as interior design and logistics.

### The brief-validation gate is not holding

On 12 June a Masters of Education influencer brief reached a creator with the wrong program, Masters by Research instead of coursework, and an unvalidated creator profile. The call named it a process gap and adopted a standing rule: all influencer briefs get validated internally before reaching a creator. On 24 July the Perkeso creatives went out containing incorrect information and had to be recalled for correction. **No single person owns this gate today, which is why it recurred.** Whoever runs the account through the window should treat internal validation as a hard gate.

### Naming conventions

Campaign level is specified in `CAMPAIGN-NAMING.md` as `<TREE>_<CAMPUS>_<OBJECTIVE>_<FUNNEL>_<CREATIVE-PACK>_<YYYY-MM>`, for example `UC_JOHOR_LEAD_TOFU_B3_2026-06`. It is still a stub pending Zaid, Shaun and Tiffany locking it, with the 10 campus codes unconfirmed, against a hard deadline of 15 November 2026.

Ad and campaign string examples for all three platforms are in the knowledge base, including the Meta ad pattern `a1_batch2_bachelor_..._static_v1_bm_20260612`. **The A-prefix is an audience code, not an angle:** A0 is MOF engagement and message, A1 is BOF prospecting, A2 is BOF retargeting, and A3 is opened-but-not-submitted within 30 days. What is missing is a full written grammar for the ad-level string. The only complete parser is the reverse-engineered one in `assets/build_ads_dashboard.py`, so if the parser and a new ad name disagree, the dashboard mis-labels the ad.

---

## Upcoming plans we should take note of

### The weekly report

`WEEKLY-REPORT-FORMAT.md` sets a binding format, agreed with the UNITAR side, due **every Monday covering the prior Monday to Sunday**. Generate it with `/client-report`, asking for the UNITAR weekly. Output goes to `04-reports/`, and the two spec files disagree on whether the filename is `YYYY-WW-weekly-leads.md` or `YYYY-Www-`, so match whichever the skill writes and stay consistent.

The report runs six sections in a fixed order: headline; net leads by split across national, outstation, online and conventional; per-campus net leads for all 10 campuses ranked worst gap first; channel mix; three to five creative learnings; and three next-week moves, each a scale, pause or test decision.

Hard rules: **never headline blended CPL**, because per-campus CPL is the conversation and blended CPL is an explicit anti-goal. Never invent a number, and write a TBD marker naming the platform instead. Never mix campaign trees, so Online UIU and Online/Selangor never share with UC homegrown. No emojis. Common pitfalls to watch: totals must reconcile, and the headline should surface the worst campus.

**What is actually missing, stated precisely.** Weekly reporting to this client has run for about twelve months, and it lives in the Drive reporting doc with 61 weekly and monthly sections. What has never been produced is a report in the **agreed net-leads-breakdown format**, and `04-reports/` contains no `weekly-leads` file. The P0 todo is open. So the gap is format compliance, not silence. Do not tell anyone Toggle has never reported, because the reporting doc disproves it.

**The blocker under it.** Section 3 needs per-campus net leads against 2026 targets. The only per-campus targets in the repo are in `media/c2-2026/Sources/C2 Target by UC Campus_9Mar26.xlsx`, and they are **C2 targets covering March to June**, so they expire before the window opens. `KPI.md` still defines the KPI against C2 targets. **No C3 per-campus target exists in the repo.** Get C3 per-campus net-lead targets from Nikki or Ron before 21 August, or the mandatory gap column has no denominator.

The report also cannot be written from the repo alone. It needs, per week: per-campus net leads from the CRM, de-duped and validated, which is not a platform number; the four-way split; and spend, leads and CPL per channel from each Ads Manager. There is no Salesforce API and no MCP, so every one of those numbers arrives as a manual export from the client side. **Confirm before 21 August who sends that export, in what format, and on what day, and agree a fallback for when it is late on a Monday.** Ron is the likely owner, and no file connects him to the weekly report.

### Other reporting obligations in the window

The contracted cadence in the knowledge base is weekly for ops and optimization, **monthly for performance, audience and spend**, a cycle review face to face, and a yearly review, with ad-hoc turnaround inside two working days. The reporting doc contains real monthly rollups, so the monthly is a live deliverable. **The August monthly falls due in early September, inside the window**, and there is no July monthly on file yet, so Jordan may inherit two.

There is also a **standing monthly Google rep meeting**, running unbroken from April 2025 through May 2026, currently with **Cheryl**. Standing instruction for it: PMax stays off, and no new channel or budget shift gets agreed without Zaid.

### Two recurring checks that are easy to miss

1. **Confirm whether the CBO to ABO restructure ever shipped.** The C2 UC homegrown strategy calls it non-negotiable and says every other recommendation sits on top of it, yet the todo is still open at P1 and recent TikTok campaign names still read `_CBO`.
2. **Audit UC ad sets monthly for Selangor, Putrajaya and KL bleed.** The same strategy doc says to exclude those geos from every UC ad set and to check monthly, because Meta sometimes re-expands geographic reach without notification. That quietly starves the outstation campuses the KPI is measured on. Two such checks fall inside the window.

### If leads drop, check the website before touching campaigns

This is the account's highest-frequency catastrophe, roughly one occurrence a quarter, and it presents as a CPL spike that looks like creative fatigue.

The record: a December 2025 website hack, a January reCAPTCHA form bug, a February tracking pause that cost about a week of Google, and on 3 May 2026 UC landing pages dropping to near-zero traffic with 404s on form submission, CPL up 55% week on week, and Meta paused. Root causes on file are CSS and CDN cache conflicts with no change log. Julian and Dax own reinstating the master change log. Landing pages Zain built are live but unmaintained. A January to March tracking gap went unnoticed for months, which is what prompted the 10 July instruction to monitor daily traffic.

**Runbook:** submit a test lead through the live form yourself, in a normal browser rather than incognito, then check that it landed in Salesforce, then escalate to Julian and Dax on the change log and CDN cache. There is no automated alert, so this check is manual and weekly. Zaid is the tracking owner and is unreachable for part of the window.

---

## Other notes

### Escalation and decision rights

Contacts from `CLIENT.md`: Nikki Poh, nikki.poh@unitar.my, +60 17-570 2039. Kelvin Lim at Audaura, info@audaura.my, +6016-676 7596. Viknesh, +60 12-568 8681.

**Jordan can act alone** on anything the documented rules already cover. The C2 guardrail says that if CPL deviates by more than 10% then pause, review and recalibrate. The ABO scaling rule says to scale up ad sets hitting CPL under target within two weeks, and to scale down or pause those that have not exited the learning phase by week three. Pulling spend on a decaying creative and refreshing creative are also his calls.

**Escalate** anything that changes total budget, opens a channel, or commits to new scope: Viknesh commercially, Nikki client-side, and Kelvin Lim at Audaura for anything touching brand marks or billing. Shaun is the internal fallback on strategy. Zaid is reachable outside 22 August and 2 to 9 September.

**Specific decisions to escalate rather than settle solo:** the chatbot budget allocation, whether Singapore revives or formally closes, whether programmatic gets the RM30k test, and anything touching the naming convention.

### Binding rules

**White-label is the severe one.** No Toggle logo on a UNITAR deliverable, and never the words "Toggle" or "Madcrack" in one. This covers reports, decks, HTML, PDFs, ad copy, briefs, emails and roadmaps. Templates ship Toggle-branded by default, so strip branding on the copy.

The obscure part worth memorizing: **grepping for "Toggle" will not find the logo**, because the decks inline the wordmark as an SVG sprite. Audit with `grep -E '#wm|1432 392|M1166.39 1.57487'` alongside the brand words. If unsure which mark belongs on something, ask Kelvin Lim rather than guessing.

**KPI rules.** The operative KPI is net-lead gap per campus across 10 campuses against 2026 targets, reported as the sum of outstanding gaps with the worst three named. Anti-goals: blended CPL as a headline, sharing budget or audiences or creatives across the UC-homegrown and Online/Selangor trees, and mixing Online UIU into the UC-homegrown tree.

**Compliance traps in copy.** The RM12K MBA promo is UUCKL-only, since UIU's is RM19K, and ads must say so. Special-needs B.Ed may only use the phrase "Slow Learner." The DOSH diploma is PTPTN-loanable but not DOSH-department accredited. Foundation in Arts is PTPTN-eligible at UIU only. Plus the full EIS set above.

**Approval gates.** Tim reviews briefs before anything goes live. All influencer briefs get validated internally before reaching a creator.

### Who is who

**UNITAR.** Nikki Poh is marketing lead and primary day-to-day decision-maker, owning the media split by cycle and acting as lead-quality gatekeeper. Tim is the senior stakeholder with the business-goal lens and the gate on briefs. Shifa is Head of Digital Asia and holds the validation-drop-off question. Ron functions as the data, CRM and reporting owner, though no file states his title, and he holds the retargeting pool. Janice handles UTM and PMax lead handoffs. Amy appears only on Salesforce duplicate handling. Julian covers SEO and, with Dax, the website change log. Adora produces Perkeso artwork.

**Advertica**, the CRM and Salesforce integration vendor: Fifi and Ellie are the named contacts for lead-form and field mapping.

**Audaura**, Toggle's contracting client: Kelvin Lim handles billing and escalation on brand marks.

**Toggle:** Viknesh is Sales Director, Jordan and Kelvin cover performance, Zaid covers strategy and tracking.

**Platform reps:** Cheryl is the current Google rep, after Elle/Ellen through mid to late 2025. No Meta rep is named anywhere.

No file states the roles of these people, so confirm rather than guess: Amy, Dax, Faisal, Genesis, Anjuma, Nelly, Zain, Forex, Stephanie, Jackie. "Forex" appears once, in a Granola-transcribed file, and is probably a mis-transcribed name.

**Working rule for the Kelvin ambiguity.** `CLIENT.md` uses "Kelvin" for both a Toggle performance co-lead and Kelvin Lim at Audaura, and never distinguishes them. Kelvin Lim is Audaura, and handles billing and brand marks. Kelvin on the Toggle side is performance. If an email says Kelvin without context, check the domain.

**Displaced incumbent:** UNITAR fired Mindshare (GroupM) for poor reporting and delayed launches, and Mindshare remains the booking media agency of record whose account Audaura executes inside. That history is why reporting discipline matters more here than on a typical account.

### The tooling is mostly not running

**The ads dashboard.** `04-reports/meta-ads-dashboard.html` is the client deliverable. Its footer says it rebuilds daily, and a badge reads LIVE DATA. Neither is true. The launchd job `com.toggle.unitar-ads-dashboard.plist` was never installed, so it has never run on a schedule, and `UNITAR_DRIVE_FOLDER_ID` in it is empty, so even a loaded job would build the HTML and skip the upload. The current file was pulled 20 July on a window ending 19 July, and all 100 ad cards render as "creative syncing" placeholders because the snapshot carries no ad copy or thumbnails. **The deliverable is half-built and overclaims its freshness in three places.**

Manual refresh, which needs no token and is the day-one path: pull through the Meta ads MCP tools, write `assets/meta_ads_snapshot.json`, download each thumbnail to `assets/creatives/<ad_id>.jpg` and repoint the snapshot at the local path, then run `python3 clients/audaura-unitar/assets/build_ads_dashboard.py`. Skip the thumbnail step and the cards stay as placeholders even on a good pull. The full runbook and go-live checklist is `generators/unitar-ads-dashboard.md`.

**How it reaches the client.** The delivery mechanism is one stable Drive file named `UNITAR-Meta-Ads-Dashboard.html`, so the client's link never changes. The folder ID and the client-facing link are recorded nowhere. Confirm with Kelvin whether UNITAR already holds that link, because if they do it is currently serving 19 July data with 100 placeholder cards.

**The reporting-doc sync fails every week.** `solutions.toggle.unitar-docsync.plist` is loaded and runs Saturdays at 08:00 to pull the Drive reporting doc into `04-reports/unitar-reporting-doc.md`. It exits 126 with "Operation not permitted," which is macOS denying launchd access to the Desktop tree. **Last successful sync was a manual test on 19 June 2026,** so the local copy stops at the 8 to 14 June section while the live doc runs through 19 July. Nothing alerted anyone. The fix is Full Disk Access for the launchd context, or moving the repo off `~/Desktop`. The same failure will hit the dashboard job the moment it loads, so fix this first. Until it is fixed, **read the reporting doc in Drive, not the local copy.**

**One number under the dashboard has never been verified.** `pull_meta.py` carries a hand-maintained list of which Meta action types count as a lead, with a comment saying to sanity-check it on first run. No evidence exists that anyone did. If it is wrong, every lead and CPL figure on the dashboard is wrong. Check it against Ads Manager before the dashboard goes anywhere.

**Portability.** `refresh-dashboard.sh`, `build_leadform.py` and the plist hard-code `/Users/zaidsaad/...` paths. The Drive upload shells out to the headless Claude CLI on Zaid's machine with permission checks bypassed, against an interactively authenticated Drive session. The two Python scripts themselves are path-clean. **Treat the dashboard as a manual deliverable for the three weeks Zaid is away.**

`assets/build_ad_creative_tracker.py` generates the creative tracker workbook as a scaffold of formatted rows, so re-running it overwrites hand-entered data. Its campus roster is derived from the knowledge base, which remains the authority.

`assets/Audaura_LeadForm_v3_EN.csv` and `_BM.csv` are the field-level lead-form specification. **Send these to Advertica when chasing the Perkeso mapping,** since they are the artifact the blocker is waiting on.

### Access the incoming person needs

Nothing here runs on Toggle-owned service accounts, so most of these are new grants.

| System | State | Action |
|---|---|---|
| Meta Ads (`act_1034316391892752`, MYR) | MCP works interactively per session | Jordan needs his own auth with Manage access |
| Meta System User token | `tools/meta-ads-cli/.env` does not exist | Only needed for unattended runs. Skip if refreshing manually |
| Google Ads (905-920-2225) | MCP configured but all three env values are placeholders, so it is broken for everyone | Needs a GCP service-account JSON, project ID and developer token |
| Salesforce | No API, no MCP. Every number is a manual export | Client-side login. Hard dependency for the weekly report |
| BigQuery | Access reported available in the 24 July call. No project, dataset or query recorded | Ask Ron what was granted and to which identity |
| TikTok Ads Manager | No tooling at all, fully manual | Client-side access |
| Granola | MCP configured. All meeting notes come from it | Own OAuth, and must be an attendee for transcripts to exist. Historic transcripts under Zaid's account may be unreachable |
| Google Drive | Via the claude.ai connector, tied to Zaid's session | Own connector auth. **The biggest portability gap:** both the master creative files and the live reporting doc exist only in Drive, and the local reporting copy is stale, so neither source is currently reachable without this |
| Advertica | A vendor Toggle waits on, not a system to log into | Assign a named owner for chasing them |

**Credential hygiene, open item.** `CLIENT.md` and the knowledge base both record that Google Ads and GA logins sit in a plaintext doc in the source archive, flagged for migration to 1Password and rotation. Treat rotation as part of the handover.

### Commercials, and two contractual risks

Three tiers: UNITAR pays media fees to Audaura Digital Sdn Bhd, and **Toggle is entitled to 55% of those fees, payable only after Audaura has received payment from UNITAR.** Toggle acts as principal rather than agent with media owners. UNITAR is not an MSA signatory. Currency is MYR.

Two quotes are on file. QT-240 covers SEO and content at RM12,000 one-off on 30-day terms. Creative "Tier 2 Max-Velocity" runs RM15,750 a month on 7-day terms, covering 45 creatives a month with bi-weekly diagnostics and a maximum of five revisions per asset. Nobody has copied either into `archive/quotes/` as a price anchor. `mrr` and `credit_pending` in `CLIENT.md` are both TBD, so revenue and receivables are recorded nowhere.

Budget context: the RFP totals RM9.5M to RM11.5M across six scopes, with targets of CPL under RM80, CPA under RM1,000, and 10% lead-to-enrollment. C3 has roughly RM3M remaining, with a proposal to ring-fence about RM300k for the three problem areas.

**Risk one.** The RFP service period ran 1 July 2025 to 30 June 2026. `CLIENT.md` describes the term as one year, rolling per cycle, and **no executed renewal document is on file.** Worth confirming before the away window.

**Risk two.** The MSA exists in three versions, all unsigned, with the deliverables, milestone reviews and advertiser KPI schedules blank, which means contractual KPIs are undefined. The versions disagree on minimum period, termination fee, non-compete duration and SST treatment. The IP clause assigns rights in "deliverables" but defines them narrowly as agreed media plans, so **creative-asset IP is not clearly covered.**

### Long-running items that have gone stale

| Item | State |
|---|---|
| Program acronym sheet and campus codes from operations | Asked 15 May 2026, still TBD. Blocks the naming rollout due 15 November |
| Daily leads and website traffic tracker | Asked 15 May 2026, re-asked 10 July. Never built, and its absence is why the January to March traffic gap went unnoticed |
| RC program list and Johor enrollment demographics | Asked 26 June 2026, outstanding |
| MBA TikTok video funnel quality, roughly 150 leads | Assigned to Ron 25 April 2026, re-raised unchecked 12 June, absent since |
| Website dropdown UI problem | Logged in the earliest reporting-doc section and still an open question in the most recent monthly |
| CBO to ABO restructure | Called non-negotiable in the C2 strategy, never confirmed shipped |

Five further items are stale by one to three months and lower stakes: the pink book of MoHE enrollment data, the payday hypothesis (that intent spikes from the 25th to the 5th, untested and needing data before anyone acts on it, since education is a considered purchase), the SimilarWeb competitor comparison, the roughly 40-ad audit session with Forex, and the KK message-versus-form-fill check.

### Answers to keep handy

**If UNITAR asks again why website traffic fell year on year:** traffic was higher in April to June 2025 than 2026 because of the gold and car giveaway campaigns, a higher share of spend on Google, and almost no TikTok spend that year. Current campaigns are built for lead volume and quality, and no campaign runs to drive website traffic. Paused CTW and PMax explain about 15% of the gap, with the rest from reduced above-the-line spend. Organic decline is also partly on-platform conversion, since fewer people click through when leads are captured natively.

**Two data errors in the source files.** The 25 April note reads "weekly spend RM155k generating ~203k leads," which implies a sub-RM1 CPL and is almost certainly a transcription error, so do not quote it. And the contactable rate appears as about 80% on 25 April against about 71% as the prior-year figure on 26 June. Treat 71% as the baseline.

---

## Next Steps

### Before 21 August, on Zaid

1. **Commit the working tree** with `/git-contribute`. The dashboard pipeline, the runbook, five meeting notes, both EIS copy sets, the newest strategy deck and the dashboard HTML are untracked and exist on one laptop.
2. **Commit the de-branded pitch decks specifically.** The committed versions carry the Toggle wordmark and would breach white-label if sent.
3. **Write the softer Perkeso backup copy variant**, or hold the launch until after 11 September. The account-restriction risk was accepted on the assumption this variant exists, and it does not.
4. **Get C3 per-campus net-lead targets** from Nikki or Ron. Without them the weekly report's mandatory gap column has no denominator.
5. **Confirm the weekly CRM export**: who sends it, in what format, on what day, and the fallback when it is late.
6. **Fix the launchd Full Disk Access problem**, or accept that both jobs stay off and the dashboard is manual through September.
7. **Verify the lead-action mapping** in `pull_meta.py` against Ads Manager, so the dashboard's numbers are trustworthy.
8. **Get the September intake registration cut-off date** from Nikki, so spend front-loads ahead of it.
9. **Hand over access**: Salesforce, TikTok Ads Manager, Google Ads, Meta, Drive connector. Name an owner for chasing Advertica.
10. **Agree with Nikki** whether the 31 August report moves to Tuesday, since Merdeka falls on that Monday.
11. **Write down the ad-level naming grammar** and resolve the Kelvin ambiguity in `CLIENT.md`.

### For Jordan during the window

1. **Protect September volume.** The main intake opens inside the window and it is the largest of the year. Volume outranks CPL until it closes.
2. **Produce the weekly report** on 24 August, 31 August and 7 September using `/client-report`. The 7 September one is fully his, since Zaid is hard-unavailable 2 to 9 September. Week one is a from-scratch build in the agreed format.
3. **Chase Ron on the retargeting pool**, split by campus and validated. Four decisions are stacked behind it.
4. **Watch Malaysia Instant Form CPL weekly**, separately from the blend. Pakistan at RM5.92 masks a real rise in the Malaysia engine.
5. **If leads drop or CPL jumps with no creative or budget change, check the website and tracking first.** Submit a test lead yourself. This has broken the account four times in eight months.
6. **Pull A1_tt_ONE_ABO spend back** until fresh creator videos land, and get UNITAR to send the seven remaining program names.
7. **Chase Advertica on the Perkeso mapping**, sending the lead-form CSVs, and get the corrected creatives and landing-page artwork over the line.
8. **Refresh the dashboard manually** before it goes anywhere, including the thumbnail step, and confirm the client's Drive link is not serving stale data.
9. **Keep creative refresh at two weeks or less.** Fatigue is the top cause of CPL spikes here and TikTok is already showing it.
10. **Deliver the August monthly** in early September, and hold the line at the monthly Google rep meeting with Cheryl: PMax stays off.
11. **Run the two recurring checks**: whether CBO to ABO shipped, and the monthly Selangor, Putrajaya and KL bleed audit on UC ad sets.
