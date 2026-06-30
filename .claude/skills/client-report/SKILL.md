---
name: client-report
description: 'Toggle''s single report generator. Use whenever someone asks to write, draft, outline, review, or fill in a client report — monthly performance report, weekly report, campaign recap, or any ad-platform commentary (Key Points, Next Steps, Keep/Start/Stop) for Meta, Google, or TikTok — even if they do not say "use my style". Handles B2C and B2B (Atlassian Marketplace) styles, the binding UNITAR weekly leads breakdown, slide-by-slide paste-ready deck content, and internal markdown reports. Reads each client''s repo docs first so knowledge compounds, asks only for what is missing, produces the actual report, then logs findings back. Triggers: /client-report, "monthly report for <client>", "draft the UNITAR weekly", "leads breakdown", "campaign recap", "write Key Points / Next Steps for <platform>".'
user_invocable: true
license: MIT
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Client Report — Toggle's unified report generator

This skill replaces three older tools and is the **single entry point** for every
client report Toggle produces:

- the monthly performance report (`generators/monthly-report.md`, now absorbed),
- the slide-by-slide reporting **style** (B2C / B2B, growth-partner voice),
- the binding **UNITAR weekly** leads breakdown (`/unitar-weekly-report`, absorbed).

It is **client-first, not platform-first**: a report is a strategic communication
that positions Toggle as a growth partner, not an ad-spend dump. Ads are one lever;
when the data points beyond the ad account (landing pages, funnels, CRM, creative,
organic, seasonality, positioning), the report says so — but only **1–2 such
observations per report**, never forced onto every slide.

## READS
- `clients/<slug>/CLIENT.md`                # who they are, scope, goals, platforms, branding
- `clients/<slug>/style-pack.md`            # client voice / visual overrides (if present)
- `clients/<slug>/KPI.md`                   # KPI framing, if the client has one
- `clients/<slug>/04-reports/`              # prior reports = price/structure/history anchors
- `clients/<slug>/03-media/` (or `media/`)  # spend + performance data where available (glob both)
- one reference file from `references/` (chosen by client type + cadence — see Step 3)

## WRITES
- the report (destination depends on cadence — see each reference file)
- an appended history entry back into the client's docs (see `references/client-log-template.md`)

---

## Step 0 — Classify the request, then route

**First: full report, or just a commentary snippet?**

- **Commentary-only / ad-hoc** — the user wants Key Points, Next Steps, or a
  Keep/Start/Stop block for one platform from pasted data, *not* a whole report.
  Take the **fast path**: skip Steps 1, 2, and 5. Read the matching style
  reference for commentary format (`b2c-slides.md` or `b2b-slides.md`); if the
  client/type is unknown, ask **one** question (B2C or B2B?) or state the default
  you're assuming (B2C, punchy) and proceed. Output inline only — no file, no
  doc write-back.
- **Full report** — continue with the full flow below.

For a full report, settle three axes (ask only what the docs + request don't answer):

| Axis | Options | How to decide |
|---|---|---|
| **Cadence** | weekly · monthly · campaign-recap | from the request; default monthly |
| **Client type** | B2C · B2B (Atlassian Marketplace) · UNITAR-weekly (special) | from `CLIENT.md`; if blank/placeholder, **ask** (Step 2 Q4) — do not guess |
| **Output mode** | slide-by-slide deck · markdown repo doc | **ask** (Step 2). Never infer "no deck" from an empty `04-reports/` — client decks live in Google Slides, not the repo. Default: slides for a client-facing report, markdown for an internal/recap doc |

Routing shortcuts:
- Client is `audaura-unitar` **and** cadence is weekly → **UNITAR-weekly** path
  (`references/unitar-weekly.md`). Binding format overrides the slide flow, but you
  still ask for the week's numbers (Step 2 / that reference).
- Known B2B Atlassian Marketplace clients in this repo: `codefortynine`,
  `communardo`, `ricksoft`, `iota` (and similar Jira/Confluence app vendors) →
  `references/b2b-slides.md`.
- Other client slide decks → `references/b2c-slides.md`; internal/markdown →
  `references/markdown-report.md`.

---

## Step 1 — Read the client's docs first, every time

Toggle reports for the same clients month after month. **Read before you ask.**

1. Locate the client folder: `clients/<slug>/`. If the slug is unclear, `grep -ril`
   the client name across `clients/*/CLIENT.md` to find it. Slugs are lowercase-kebab
   (see `clients/CLAUDE.md`).
2. Read `CLIENT.md` fully — industry, type, goals, platforms, branding, benchmarks,
   history, prior findings. Read `style-pack.md` and `KPI.md` if present.
3. Read the most recent file **of the same report type** in `04-reports/` — it
   anchors structure, prior numbers, and what was recommended last period. Ignore
   unrelated artifacts (audits, briefs) sitting in the same folder.
4. Use what you find to **skip intake questions you already have answers to.**
   **Placeholders are not answers:** if a `CLIENT.md` field is still an
   angle-bracket placeholder (`<…>`), `TBD`, or empty, treat it as *missing* — run
   the full Step 2 intake and offer to seed the doc. A scaffold-only `CLIENT.md`
   (the state most B2B clients are in today) counts as "no usable docs".
5. Use month-by-month history to close loops: writing a June report, recall what was
   flagged in March–May, whether recommendations were acted on, and the outcome.

**If the client has no docs yet:** run full intake (Step 2), then create
`clients/<slug>/CLIENT.md` from `clients/_TEMPLATE/` and seed it using
`references/client-log-template.md`.

---

## Step 2 — Intake only the gaps (one message, then wait)

Ask for anything not already answered by the docs — all in **one** message, and do
not start writing until you have answers:

1. **Client + slug** (if not obvious).
2. **Currency** (RM / EUR / USD — usually in `CLIENT.md`).
3. **Ad platforms running** (Meta / Google / TikTok — cover only what they actually run).
4. **Client type + industry** (B2B / B2C — confirms which style reference to read).
5. **Campaign goals**, including any goal *beyond ads* (more sales, new market, enrolment).
6. **Reporting period** (e.g. 1–31 May 2026, or a bi-weekly range).
7. **This period's data** — dashboard screenshots or data export. Without numbers,
   write `TBD — source: <platform>` literally; never invent.
8. **Report structure** — same as last month, or changed? If changed, ask for the
   current empty template or what changed. If unchanged, mirror the last report.
9. **Output mode** — paste-ready slide content for the client's deck, or a markdown
   report filed in the repo? (Default: slides for a client-facing report.)

If goals are vague, ask one sharpening follow-up (e.g. "more leads, or better-quality
leads?") before writing.

---

## Step 3 — Read the right reference file (mandatory before writing)

Do not write report content until you have read the matching file:

| Situation | Read |
|---|---|
| UNITAR weekly leads breakdown | `references/unitar-weekly.md` (binding) |
| B2C client, slide deck | `references/b2c-slides.md` |
| B2B Atlassian Marketplace client, slide deck | `references/b2b-slides.md` |
| Internal markdown report / campaign recap / no deck | `references/markdown-report.md` |

`references/client-log-template.md` defines what to record back afterward.

**Build a context summary first** (internally, before any slide): what the client
sells, what they want this period and longer-term, each platform's role toward the
goal, what success looks like (volume / efficiency / revenue), what was recommended
last month and what happened, and any cross-month or cross-platform pattern worth surfacing.

---

## Step 4 — Mirror the client's structure; produce the actual report

Pick the structure to follow in this priority order:

1. **Current month's template provided** by the user → follow it exactly (source of truth).
2. **User noted what changed** → start from last report, apply the changes.
3. **Otherwise** → mirror the most recent prior report in `04-reports/` exactly.

Mirror it precisely: same slides/sections in the same order, same titles, same metrics
in the same places, same conventions (currency format, KPI cards vs dashboard
screenshots, bold usage, agency branding). Only data, commentary, and period change.

**Output format depends on mode:**
- **Slide deck** → output **paste-ready slide-by-slide content**, not a rebuilt deck.
  Label each slide `SLIDE N — Title`, give full section text ready to paste, and mark
  visuals with `[Insert <X> screenshot/table here]`. Jordan/Zaid pastes into the
  client's existing Google Slides template.
- **Markdown doc** → write the file per `references/markdown-report.md` (or the
  UNITAR binding spec for the weekly) into `04-reports/`.

When writing **Key Points**, ask "what does this mean for the client's business?" not
just "what happened in the ad account?". Reference prior months where it strengthens
the analysis. When writing **Next Steps**, be specific and forward-looking (never
"continue to monitor"); go beyond ad-account actions where the data supports it.

---

## Step 5 — Write findings back to the client's docs

After producing the report, **append** the period's findings so the next report
benefits. Where they go in this repo:

- **Report history** → append a dated entry under a `## Report history` section in
  `clients/<slug>/CLIENT.md` (create the section if absent). Each entry: period,
  headline results, what was recommended, growth observations, what to watch next
  month. See `references/client-log-template.md` for the shape. **Append — never
  overwrite past entries.**
- **Durable facts that changed** (new platform, goal shift, new benchmark) → update
  the relevant prose section or `## Notes` in `CLIENT.md`.
- **Do NOT touch `CLIENT.md` frontmatter business fields** (`geo`, `mrr`,
  `credit_pending`, `account_lead`, `status`, `stage`) — those update via the sales
  trackers / quote flow, not here. You may bump `last_reviewed`.
- **Never write into `brain/`** (zone rule, `clients/CLAUDE.md`).

Then **echo back the output path and the one-sentence headline** so the operator can
confirm the right report generated, and confirm the docs were updated. The written
file is **not committed** — remind the user to run `/git-commit` (or `/git-contribute`
for a PR) once they're happy with it.

---

## House rules (every report, every client type)

- **Branding = Toggle by default.** If the client was onboarded through **Meraaki
  Digital** (Toggle's partner agency) — look for a Meraaki signal in `CLIENT.md`
  (`account_lead` / `## Notes`), and if it's unclear, ask — brand the report as
  Meraaki and rename all agency actions/next-steps to "Meraaki".
- **Cover only the platforms the client actually runs.** Never assume a standard set.
- **No em dashes.** Use connecting words ("which" instead of "—").
- **Dash-style bullets** in commentary, not bullet symbols.
- **Always explain the *why*,** not just the metric.
- **Never invent numbers.** Missing data → `TBD — source: <platform>` literally.
- **Slide decks end on a "Thank You" / "THANK YOU" closing slide.**
- **Currency:** RM with no space (RM24.39) for MY clients; € for most Atlassian
  clients — but always use the currency of the client's actual ad account.

---

## Fallback outside the repo

If repo file access is unavailable (e.g. claude.ai), fall back to past-conversation
search for prior reports and rely on memory for durable facts. The principle is
unchanged: always pull prior context before writing.

---

## What this skill supersedes

- `generators/monthly-report.md` — absorbed (this skill is the executable path now).
- `/unitar-weekly-report` global skill — absorbed via `references/unitar-weekly.md`;
  the binding spec at `clients/audaura-unitar/WEEKLY-REPORT-FORMAT.md` stays the authority.
- The standalone `toggle-reporting-style` skill — this is its evolution, repo-wired
  and cadence-aware.
