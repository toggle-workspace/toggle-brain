---
name: toggle-reporting-style
description: Apply Toggle's reporting style when writing, structuring, or drafting monthly performance marketing reports for clients. Use this skill whenever Jordan asks to write, draft, outline, review, or fill in content for a client report, monthly report, performance report, or campaign summary — even if they don't say "use my style". Also use when Jordan asks to write Key Points, Next Steps, or commentary for any ad platform (Meta, Google, TikTok). This skill covers both B2C and B2B reporting styles, continuously learns about each client by reading and updating their client docs in the repo, mirrors each client's existing report template, and outputs paste-ready slide-by-slide content. Always read the relevant reference file before producing any report content.
---

# Toggle Reporting Style

Jordan runs Toggle Solutions Group, a digital marketing agency. This skill defines how to write performance marketing reports in Jordan's established style. There are two distinct styles: **B2C** and **B2B**.

## The core philosophy: client-first, not platform-first

Reports are not just a platform performance dump. They are a strategic communication from Toggle to the client, positioning Toggle as a **growth partner** — not just an ads executor. This means:

- Think from the **client's goals outward**, then assess what each platform is contributing toward those goals
- Insights and next steps should go **beyond ad optimisations** where relevant — surface observations about landing pages, conversion funnels, creative strategy, organic content, CRM, seasonality, or any other lever that could impact the client's growth
- Ads are one lever. The report should reflect an agency that understands the full picture, even if they are only running ads today
- The tone should feel like a **strategic advisor reviewing the business**, not a vendor reporting on ad spend

This does not mean every slide needs a big strategic insight. It means that when the data points to something beyond the ad account, Toggle says so.

---

## Continuous client memory: use the repo's client docs (read this first, every time)

Toggle reports for the same clients month after month. The Toggle Claude repo already contains structured client documentation — typically one folder or file per client. This skill reads from and writes to those existing client docs so that knowledge compounds over time and intake questions are not repeated.

### At the start of every report

1. Locate the client's documentation in the repo. It is organised per-client and named after the client (e.g. a folder or file matching the client name). If the exact location is unclear, search the repo for the client's name to find their docs before proceeding.
2. **Read the client's docs fully before asking any intake questions.** They contain the client's industry, goals, platforms, branding, benchmarks, history, and prior report findings.
3. Use what you find to skip intake questions you already have answers to. Only ask for what is genuinely new or missing (typically just the new reporting period and the latest data).
4. Use any month-by-month history in the docs to reference past periods in the current report. When writing a June report, recall what was flagged in March, April, and May, whether past recommendations were acted on, and what the outcome was.

### After every report

Record the report's key findings back into the client's docs so the next report benefits. Append a concise entry for the period just covered (period, headline results, what was recommended, growth observations, what to watch next month), and update any durable client facts that changed (new platform, goal shift, new benchmark). Use the structure in `references/client-log-template.md` as a guide for what to capture, adapting it to fit how the repo's client docs are already organised. Do not overwrite past history — append to it.

Briefly confirm to Jordan that the client's docs have been updated.

### If a client has no existing docs

If the client is new and has no docs in the repo yet, run the full intake (Step 1), then create a client doc for them in the repo following the same structure as existing clients, using `references/client-log-template.md` as the starting point.

### Fallback outside the repo (e.g. claude.ai)

If repo file access is not available, fall back to the past-conversation search tools to retrieve prior reports for this client, and rely on the memory system for durable facts. The principle is unchanged: always pull prior context before writing.

---

## Step 1: Ask intake questions (only for what isn't already known)

For a new client, or for any detail not already in the client's docs, ask Jordan for the following. Ask all needed questions together in one message — do not start writing until answers are received. Skip anything the docs or conversation already answer.

1. **Client name** — What is the name of the client this report is for?
2. **Currency** — What currency is used in their ad accounts? (e.g. RM, EUR, USD)
3. **Ad platforms** — Which ad platforms is the client running? (e.g. Meta, Google, TikTok — list all that apply)
4. **Client type and industry** — Is this a B2B or B2C client, and what industry are they in? (e.g. B2C real estate, B2C healthcare, B2B Atlassian Marketplace)
5. **Campaign goals** — What is the client trying to achieve? What are the campaign objectives? (e.g. generate leads, drive online purchases, increase app evaluations, grow brand awareness, drive foot traffic). If there are goals beyond ads — such as increasing sales, growing a customer base, or entering a new market — capture those too.
6. **Reporting period** — What is the date range this report covers? (e.g. 1 May – 31 May 2026 for a monthly report, or 30th Apr – 13th May for a bi-weekly report)
7. **This period's data** — The dashboard screenshots or data export for the reporting period.
8. **Report structure** — Is the report structure the same as last month, or has anything changed this month? If the structure changed, ask Jordan to share the current month's empty template or describe what changed. If unchanged, the skill will mirror the previous report's structure.
9. **Last month's report** — If available and not already in the client docs, used as a reference for previous period numbers and formatting consistency.

If the client's goals are unclear or vague, ask a follow-up before writing — for example: "Is the primary goal to drive more leads, or is it to improve the quality of leads coming in?"

---

## Step 2: Build a client context summary before writing

Once intake and doc review are complete, internally form a picture of the client before touching any slide:

- What is the client's business and what do they sell?
- What are they trying to achieve this period, and how does that connect to their longer-term goals?
- Which platforms are running, and what role does each platform play toward the goal? (e.g. Meta for top-of-funnel awareness, Google Search for bottom-of-funnel intent, TikTok for content amplification)
- What does success look like for this client — volume, efficiency, revenue, or a mix?
- What was recommended in prior months, and what happened? Did the client act on it? Did it work?
- Are there any patterns across platforms or across months that tell a bigger story than any single platform or period can?

This context shapes which insights get surfaced and how next steps are framed.

---

## Step 3: Identify the client type and read the reference file

- **B2C** — Clients selling to consumers. Covers a wide range of industries: real estate, education, F&B, healthcare, e-commerce, veterinary, schools, etc. → read `references/b2c-style.md`
- **B2B** — Currently limited to **Atlassian Marketplace app partners** (software companies selling Jira/Confluence plugins). Reports are longer, more analytical, and more professionally toned. → read `references/b2b-style.md`

Do not write report content without reading the relevant file first.

---

## Step 4: Structure the report around the client, not the platforms

The report covers each platform the client is running — but the **framing, insights, and next steps should always connect back to the client's goals**, not just platform metrics.

When writing Key Points, always ask: "What does this mean for the client's business?" not just "What happened in the ad account?"

Reference past months where it strengthens the analysis. For example:
- "Following last month's recommendation to pause non-performing keywords, CPA has improved from €X to €Y"
- "This is the third consecutive month the US has driven the majority of conversions, reinforcing the case for consolidating budget there"
- "The landing page concern we raised in April appears to still be affecting conversion rate this month"

When writing Next Steps, go beyond ad account actions where the data supports it. Examples:
- If conversion rate is strong but CPL is rising, the insight might be about audience saturation — suggesting new creative angles or expanding to a new platform
- If a landing page is consistently underconverting across platforms, flag it as a landing page issue, not just an ads issue
- If one platform is generating high volume but low quality leads, suggest tightening qualification at the form or landing page level
- If a B2B client's top-performing keywords reflect a pain point the client hasn't addressed in their content, flag the content opportunity
- If an e-commerce client's ROAS is declining despite efficient ads, consider whether product mix, pricing, or seasonality is a factor worth raising

One or two well-placed strategic or cross-month observations per report is enough. They should not overwhelm the report.

---

## Step 4b: Match the client's report structure and produce paste-ready output

Each client has a slightly different report template tailored to their needs. Determine the structure to follow using this priority order:

1. **If Jordan provides the current month's template** (an empty deck, a structure outline, or a note describing this month's slides), follow that exactly. It is the source of truth and overrides anything from past reports. Always prefer this when available.
2. **If Jordan notes what changed this month** (e.g. "added a TikTok section, dropped the country slide"), start from the previous report's structure and apply those changes.
3. **Otherwise, fall back to the most recent prior report** in the client docs and mirror its structure exactly. Use this when the structure is unchanged from last month.

At the start of intake, if no current template is provided and it is not clear whether the structure has changed, ask Jordan: "Is the report structure the same as last month, or has anything changed this month?" This avoids replicating an outdated structure.

Whichever source is used, mirror it exactly:
- Same slides, in the same order, with the same slide titles
- Same sections within each slide (e.g. Key Points, Next Steps, or Keep/Start/Stop)
- Same metrics shown in the same places
- Same conventions (currency format, emoji KPI cards vs dashboard screenshots, bold usage, agency branding)

The goal is that the new month's report is indistinguishable in structure from the intended template for that client. Only the data, commentary, and period change.

### Output format

Do not generate a new deck or attempt to rebuild the client's template. Output the report as **slide-by-slide content that Jordan pastes into the client's existing Google Slides template.**

Format the output so each slide is clearly delineated and easy to copy:
- Label each slide with its number and title (e.g. "SLIDE 3 — Meta Ad Campaign Performance")
- Note where data tables, screenshots, or visuals go with a clear placeholder (e.g. "[Insert Meta campaign table screenshot here]") since those are pasted in manually by Jordan
- Provide the full text for each section (Key Points, Next Steps, etc.) ready to paste
- Match the exact slide titles and section labels used in the chosen structure source

This keeps the client's template formatting fully intact while making the fill-in step fast.

---

## Step 5: Update the client docs

After producing the report, append the period's findings to the client's docs in the repo and update any durable facts that changed, as described in the continuous client memory section above. Briefly confirm to Jordan that the docs have been updated, so he knows the client knowledge has been retained.

---

## Key facts that apply to all reports (regardless of client type)

- **Agency branding:** Reports are branded as **Toggle** by default. If the client was onboarded through Meraaki Digital (Toggle's partner agency), the report is branded as **Meraaki** and all next steps and agency actions refer to "Meraaki", not "Toggle".
- **Platform coverage is client-dependent.** Each client has its own mix of platforms. Never assume a standard set — cover only what the client is actually running.
- **Jordan does not use em dashes.** Use connecting words instead (e.g. "which" instead of "—").
- **Bullet points in commentary are dash-style** (not bullet symbols).
- The final slide is always a simple **"Thank You"** or **"THANK YOU"** closing slide.
