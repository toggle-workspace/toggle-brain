# Paste-ready: UNITAR handover Google Doc

> **Path update 2026-08-02.** Everything below that refers to `assets/` scripts
> (`pull_meta.py`, `build_ads_dashboard.py`, `build_leadform.py`,
> `refresh-dashboard.sh`, the plist) now lives in
> `~/Desktop/Code/toggle-unitar-ads-dashboard` (GitHub `zsaaad/toggle-unitar-ads-dashboard`,
> private). The daily launchd job was repointed and reloaded the same day. The
> built dashboard still lands in `clients/audaura-unitar/04-reports/`.


One block per table row in "Unitar x Audaura - Context from Zaid for Unitar (27/7/2026)." Copy each block into its matching cell. Full detail lives in `clients/audaura-unitar/handover-2026-08-zaid.md`.

---

## ROW: Zaid's away dates

Away 21 August to 11 September 2026. Hard-unavailable 22 August and 2 to 9 September, reachable on other days in the window.

The weekly report is due Mondays, and Jordan is booked for Fridays. Report Mondays are 24 August, 31 August and 7 September. Zaid is reachable for the first two. 7 September falls inside the hard-unavailable block, so that week is fully Jordan's, with Kelvin as backup.

---

## ROW: Unitar Current Performance

**Latest full week, 13 to 19 July**

| Channel | Spend | Leads | CPL |
|---|---|---|---|
| Meta | RM71,418.12 | 1,383 | RM51.64 |
| Google | RM74,246.90 | 714 | RM103.94 |
| TikTok | RM33,089.63 | 149 | RM222.08 |
| Total | RM178,754.65 | 2,246 | RM79.59 |

June close: RM715,080.91 spend, 7,642 leads, RM93.57 blended CPL. Spend is being held in a RM172k to RM185k weekly band rather than scaled.

**The number to watch weekly.** Meta Instant Form CPL has moved from RM51.76 (8 to 14 June) to RM89.05 (13 to 19 July). The blended Meta figure of RM51.64 looks healthy only because Pakistan leads arrive at RM5.92. The Malaysia engine is getting more expensive and the blend hides it, so check Malaysia Instant Form separately from the blend. Caveat before quoting the series to anyone: only the last two weeks are explicitly Malaysia-only in the source, the reporting doc has no 29 June to 5 July section, and measured from the 1 to 7 June week (RM66.61) the rise is about 34% rather than a doubling. The direction is real, the tidy progression is not.

**The ceiling is validation.** About 50% of leads now validate through to an appointment, against roughly 71% across the last full year. The root cause is still unidentified and sits with Shifa, open since late June. It is the highest-value open question on the account. Year on year spend is up 44%, RM9.1M against RM6.3M, with enrollment uplift not proportional.

**Decision rules per channel.** Meta: Instant Form carries the channel, Website Conversion stays off, Message Generation is a conversation source rather than a lead line. Google: keep spend disciplined until blended CPL returns toward the RM90s, and PMax stays off (0.96% lead-to-application, RM10,513 per application). TikTok: three straight weeks at RM215 to RM228 with leads flat at 149, the single ONE creative has decayed from a RM43 to RM70 baseline to RM131, and TOF Awareness spends about RM10k a week for zero direct leads and needs a justify-or-reallocate call. Johor: follow the winning channel per state, since Meta runs RM314 there while Google leads volume at RM101. Melaka is the inverse.

---

## ROW: Next cycle's plans

**Framing.** The account is in C3, June to October, with intakes in July, September and October. **The September intake is the main one and it opens inside the away window.** The equivalent 2025 period was the account's highest-spend month at roughly RM940k and 8,973 leads. Through early September, volume outranks CPL, and a CPL rise during the run-up may be the correct price of volume. Get the September registration cut-off from Nikki before 21 August. C1 2027 planning starts in the November to February window, so it needs scoping in late September rather than during the absence.

**Retargeting, approved and blocked.** Pool is C1 and C2 non-converters rolled to C3, roughly 29,000 leads this year. The extract split by campus, and validated, sits with Ron. Target date was 28 July. Budget is about RM5k per month across four ad sets, roughly RM15k over three months, split main campus recent, main campus older, UC recent, UC older. CTA agreed: "send us a message for a chance to win a MacBook Neo," WhatsApp format for fast first response. Four decisions are stacked behind Ron's number: Salesforce dedup bypass (Amy, Ron, Shifa), MacBook Neo eligibility for the foundation cohort, chatbot allocation if the pool is small, and Central College Penang.

**Perkeso EIS, the biggest untapped line.** Roughly RM800k a year, never actively marketed, currently paused waiting on Advertica to map the one-question lead form. Landing page is final, artwork pending, and the shared creatives contain errors and need resending. Compliance is strict: exact disclaimer `*EIS funding subject to PERKESO eligibility. T&Cs apply.` on every ad and the lead form, never "government-supported" or "fully funded," no job guarantees. **Open risk:** the June copy asserts employment status, which is a top Meta auto-disapproval trigger that can restrict the whole ad account. The client accepted this knowingly on the assumption a softer backup variant exists. It has never been written. There is one Meta account carrying all Meta spend, about RM71k a week, and no Meta rep is named anywhere. Write the variant before 21 August or hold the launch.

**Pakistan online MBA.** Roughly 200 leads in five days at RM11 CPL, then 82% uncontactable on WhatsApp. Numbers appear valid, so this is non-response rather than fake numbers, and OTP will not fix it. Agreed fixes, none confirmed done: "up to 20% scholarship" in the headline, "100% online" promoted to primary, a "why do you want to apply?" friction field, and a Pakistan-based outbound number.

**TikTok One.** Best performer on TikTok at roughly RM62 CPL, about half standard TikTok ads. Now on Classic tier, so 50 creators. Seven of ten program slots are free and UNITAR still owes the program list. Note the reversal: on 12 June the instruction was to tighten creator demographics, and on 10 July that was reversed. Remove age and description restrictions, use the "work and education" category filter, and accept that creators need not match the persona. The 10 July position governs.

**Two campaigns went quiet rather than closing.** Singapore, agreed 12 June, blocked on the Advertica lead form hard-coding campus to Johor, unmentioned since 26 June. Mandarin and Chinese postgrad, one of three named RM300k problem areas, dropped after 12 June. Neither is recorded as canceled.

**Dormant.** Programmatic (Brand New never quoted, Toggle never sent the brief), GEO progress report (promised for the week after 10 July, never delivered), TikTok Live (account suspended, revival via Stephanie and Jackie).

---

## ROW: Creative process

**Copy** lives in `creative/copy/`, one file per intake cycle plus one per special program. The two EIS files open with a "Rules (before running)" compliance block. The four cycle files do not, so do not assume the gate exists everywhere. TikTok creator briefs are in `brief/tiktok-one-briefs/`, generated with `/tiktok-brief-writer`. A second client folder, `clients/audaura-unitar-creatives/`, holds live MED creative files and the C2/C3 creative proposal deck.

**Do not open `style-pack.md`, it is an unfilled template.** The real guidelines are in `01-strategy/account-knowledge-base.md`: colors Orange #f59228, Blue #064a75, Grey #bbbcbe; Poppins and Barlow only; CTAs limited to "Learn More" and "Apply Now"; talent casting rules including one specifically banned talent; six approved logo lockups. Use that section as the internal brief-validation checklist, because it is the only one that exists.

**Learnings that should shape every brief.** Native and creator-style beats high production by roughly 20 times on TikTok Instant Form submission rate (0.62% against 0.03%). Refresh cadence is two weeks or less, because slow refresh is the top cause of CPL spikes and it is the thing most likely to slip during an absence. Hyper-specific program level and field of study beats generic.

**The brief-validation gate is not holding.** On 12 June a MED influencer brief reached a creator with the wrong program, and the call adopted a standing rule that all influencer briefs get validated internally first. On 24 July the Perkeso creatives went out with incorrect information and had to be recalled. No single person owns this gate today, which is why it recurred. Treat internal validation as a hard gate.

**Naming.** Campaign level is specified in `CAMPAIGN-NAMING.md` but still a stub, with the 10 campus codes unconfirmed, against a 15 November deadline. The A-prefix on ad names is an **audience** code, not an angle: A0 MOF engagement, A1 BOF prospecting, A2 BOF retargeting, A3 opened-but-not-submitted within 30 days. A full written grammar for the ad-level string does not exist, and the only complete parser is the reverse-engineered one in `assets/build_ads_dashboard.py`.

---

## ROW: Upcoming plans we should take note of

**The weekly report, due every Monday for the prior Monday to Sunday.** Generate with `/client-report`, asking for the UNITAR weekly. Six sections in fixed order: headline, net leads by split, per-campus net leads for all 10 campuses ranked worst gap first, channel mix, three to five creative learnings, three next-week moves. Hard rules: never headline blended CPL, never invent a number, never mix campaign trees, no emojis, one page.

**Stated precisely, so nobody repeats it wrongly to the client:** weekly reporting has run for about twelve months and lives in the Drive reporting doc with 61 sections. What has never been produced is a report in the **agreed net-leads-breakdown format**, and the P0 todo is open. The gap is format compliance, not silence.

**The blocker under it.** Section 3 needs per-campus net leads against 2026 targets. The only per-campus targets in the repo are **C2 targets covering March to June**, so they expire before the window opens, and no C3 per-campus target exists anywhere. Get C3 targets from Nikki or Ron before 21 August. The report also cannot be built from the repo: it needs per-campus net leads from the CRM, de-duped and validated, and there is no Salesforce API, so it arrives as a manual client-side export. Confirm who sends it, in what format, on what day, and the fallback when it is late on a Monday.

**Other obligations landing in the window.** Contracted cadence is weekly, **monthly** for performance and spend, plus a face-to-face cycle review. The August monthly falls due in early September, and there is no July monthly on file yet, so Jordan may inherit two. There is also a standing monthly Google rep meeting, currently with Cheryl. Standing line for it: PMax stays off, and no new channel or budget shift without Zaid.

**Calendar.** Merdeka Day, 31 August, is a Monday in 2026, so the report deadline collides with a public holiday. Agree with Nikki beforehand whether it moves to Tuesday. Expect soft weeks either side: the same week in 2025 saw blended CPL rise from RM111 to RM130 on the long weekend alone, so report it as seasonal. Confirm Maulidur Rasul's 2026 date, which also falls in late August. Malaysia Day is 16 September.

**Two recurring checks that are easy to miss.** Confirm whether the CBO to ABO restructure ever shipped, since the C2 strategy calls it non-negotiable, the todo is still open, and recent TikTok campaign names still read `_CBO`. And audit UC ad sets monthly for Selangor, Putrajaya and KL bleed, because Meta silently re-expands geography and that starves the outstation campuses the KPI measures. Two such checks fall in the window.

**If leads drop or CPL jumps with no creative or budget change, check the website and tracking before touching campaigns.** This has broken the account four times in eight months: the December 2025 hack, the January reCAPTCHA bug, the February tracking pause, and the 3 May UC landing-page 404s that pushed CPL up 55%. Submit a test lead yourself in a normal browser, confirm it reached Salesforce, then escalate to Julian and Dax on the change log and CDN cache. There is no automated alert, so this is a manual weekly check.

---

## ROW: Other notes

**Escalation and decision rights.** Nikki Poh, nikki.poh@unitar.my, +60 17-570 2039. Kelvin Lim at Audaura, info@audaura.my, +6016-676 7596. Viknesh, +60 12-568 8681.

Jordan acts alone on anything the documented rules cover: pause, review and recalibrate any ad set whose CPL deviates by more than 10%; scale up ad sets hitting CPL under target within two weeks; scale down or pause anything that has not exited the learning phase by week three; pull spend on a decaying creative; refresh creative. Escalate anything that changes total budget, opens a channel, or commits new scope: Viknesh commercially, Nikki client-side, Kelvin Lim for brand marks or billing. Shaun is the internal strategy fallback. Specific items to escalate rather than settle: chatbot allocation, whether Singapore revives or closes, whether programmatic gets the RM30k test, and anything touching the naming convention.

**White-label is binding and severe.** No Toggle logo on a UNITAR deliverable, and never the words "Toggle" or "Madcrack" in one. The obscure part: grepping for "Toggle" will not find the logo, because the decks inline the wordmark as an SVG sprite. Audit with `grep -E '#wm|1432 392|M1166.39 1.57487'` as well as the brand words. If unsure which mark belongs on something, ask Kelvin Lim.

**Compliance traps.** RM12K MBA promo is UUCKL-only (UIU's is RM19K) and ads must say so. Special-needs B.Ed may only say "Slow Learner." The DOSH diploma is PTPTN-loanable but not DOSH-accredited. Foundation in Arts is PTPTN-eligible at UIU only. Tim reviews briefs before anything goes live.

**Who is who.** Nikki Poh is the day-to-day decision-maker and lead-quality gatekeeper. Tim is the senior stakeholder and brief gate. Shifa is Head of Digital Asia and holds the validation question. Ron is functionally the data and CRM owner, though no file states his title, and he holds the retargeting pool. Janice covers UTM and PMax handoffs. Julian covers SEO and, with Dax, the website change log. Adora produces Perkeso artwork. Advertica is the Salesforce integration vendor, contacts Fifi and Ellie. Cheryl is the current Google rep. No Meta rep is named anywhere.

**Kelvin ambiguity, working rule:** `CLIENT.md` uses "Kelvin" for both a Toggle performance co-lead and Kelvin Lim at Audaura. Kelvin Lim is Audaura, billing and brand marks. Kelvin on the Toggle side is performance. If an email says Kelvin without context, check the domain.

**The tooling is mostly not running.** The ads dashboard footer says it rebuilds daily and a badge reads LIVE DATA. Neither is true: the launchd job was never installed, its Drive folder ID is empty, the current file was pulled 20 July, and all 100 ad cards render as "creative syncing" placeholders. Manual refresh, no token needed: pull via the Meta ads MCP tools, write `assets/meta_ads_snapshot.json`, download each thumbnail to `assets/creatives/<ad_id>.jpg` and repoint the snapshot, then run `python3 clients/audaura-unitar/assets/build_ads_dashboard.py`. Skip the thumbnail step and the cards stay as placeholders. It reaches the client as one stable Drive file, `UNITAR-Meta-Ads-Dashboard.html`, whose folder ID and link are recorded nowhere, so confirm with Kelvin whether UNITAR already holds a link now serving 19 July data.

Separately, the Saturday reporting-doc sync has been failing since 19 June 2026 with a macOS permissions error, so **read the reporting doc in Drive, not the local copy**, which stops at 8 to 14 June. And the lead-action mapping in `pull_meta.py` has never been verified against Ads Manager, so treat every dashboard lead and CPL figure as unconfirmed until it is. Treat the dashboard as a manual deliverable for the three weeks.

**Access needed, none of it on Toggle service accounts:** Meta Ads (`act_1034316391892752`), Google Ads (905-920-2225, whose MCP config is placeholder-only and broken for everyone), Salesforce (no API, manual exports, and the hard dependency for the weekly report), BigQuery (reported available, no project or dataset recorded, ask Ron), TikTok Ads Manager (no tooling, fully manual), Granola, and the Google Drive connector, which is the biggest portability gap since master creative files and the live reporting doc exist only there. Assign a named owner for chasing Advertica. Also open: Google Ads and GA logins sit in a plaintext doc and need migrating to 1Password and rotating.

**Commercials.** UNITAR pays media fees to Audaura, and Toggle takes 55% of those fees, payable only after Audaura has been paid. Two quotes on file: QT-240 at RM12,000 one-off for SEO and content, and creative Tier 2 at RM15,750 a month for 45 creatives with max five revisions per asset. Neither is in `archive/quotes/`. RFP totals RM9.5M to RM11.5M with targets of CPL under RM80, CPA under RM1,000, and 10% lead-to-enrollment. C3 has roughly RM3M left.

**Two contractual risks.** The RFP service period ran 1 July 2025 to 30 June 2026 and no executed renewal is on file. And the MSA exists in three unsigned versions with the deliverables, milestone and KPI schedules blank, so contractual KPIs are undefined and creative-asset IP is not clearly covered.

**Stale items worth knowing.** Campus codes and the program acronym sheet (asked 15 May, blocks the 15 November naming rollout). Daily leads and traffic tracker (asked 15 May, re-asked 10 July, never built, and its absence is why the January to March traffic gap went unnoticed). RC program list and Johor demographics (asked 26 June). MBA TikTok funnel quality (assigned to Ron 25 April, never checked). Website dropdown UI (open roughly twelve months).

**If UNITAR asks again why website traffic fell year on year:** 2025 was higher because of the gold and car giveaways, a higher share of spend on Google, and almost no TikTok spend. Current campaigns run for lead volume and quality, and no campaign runs to drive website traffic. Paused CTW and PMax explain about 15% of the gap, the rest is reduced above-the-line spend, and organic decline is partly on-platform conversion.

---

## ROW: Next Steps

**Before 21 August, Zaid:**

1. Commit the working tree with `/git-contribute`. The dashboard pipeline, runbook, five meeting notes, both EIS copy sets, the newest strategy deck and the dashboard HTML are untracked and exist on one laptop only.
2. Commit the de-branded pitch decks. The committed versions carry the Toggle wordmark and would breach white-label if sent.
3. Write the softer Perkeso backup copy variant, or hold the launch until after 11 September.
4. Get C3 per-campus net-lead targets from Nikki or Ron.
5. Confirm the weekly CRM export: who, what format, what day, and the fallback.
6. Fix the launchd Full Disk Access problem, or accept both jobs stay off through September.
7. Verify the lead-action mapping in `pull_meta.py` against Ads Manager.
8. Get the September intake registration cut-off from Nikki.
9. Hand over Salesforce, TikTok, Google Ads, Meta and Drive access. Name an Advertica owner.
10. Agree with Nikki whether the 31 August report moves to Tuesday.
11. Write down the ad-level naming grammar and resolve the Kelvin ambiguity in `CLIENT.md`.

**During the window, Jordan:**

1. Protect September volume. The main intake opens inside the window and volume outranks CPL until it closes.
2. Produce the weekly report on 24 August, 31 August and 7 September. The 7 September one is fully his. Week one is a from-scratch build in the agreed format.
3. Chase Ron on the retargeting pool, split by campus and validated. Four decisions are stacked behind it.
4. Watch Malaysia Instant Form CPL weekly, separately from the blend.
5. If leads drop or CPL jumps with no creative or budget change, check the website and tracking first, and submit a test lead yourself.
6. Pull A1_tt_ONE_ABO spend back until fresh creator videos land, and get the seven remaining TikTok program names from UNITAR.
7. Chase Advertica on the Perkeso mapping, sending `assets/Audaura_LeadForm_v3_EN.csv` and `_BM.csv`, and close out the corrected creatives and landing-page artwork.
8. Refresh the dashboard manually before it goes anywhere, including thumbnails, and confirm the client link is not serving stale data.
9. Keep creative refresh at two weeks or less.
10. Deliver the August monthly in early September, and hold PMax off at the monthly Google rep meeting with Cheryl.
11. Run the two recurring checks: whether CBO to ABO shipped, and the monthly Selangor, Putrajaya and KL bleed audit.
