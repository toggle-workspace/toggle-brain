# Internal Markdown Report format

Use this when the deliverable is a **markdown document** filed in the repo —
not slide-by-slide content for a client's Google Slides deck. This is the
right mode for:

- An internal performance summary kept in `clients/<slug>/04-reports/`
- A first-draft monthly report before it gets translated into the client's deck
- A post-campaign recap
- Any client without a Google Slides template, where the report itself is the
  markdown file

If the client receives a styled **slide deck**, use `b2c-slides.md` or
`b2b-slides.md` instead and output paste-ready slide content. When unsure which
the client expects, ask (see the SKILL.md intake).

The growth-partner philosophy, voice rules (no em dashes, dash-style bullets,
explain the *why*, 1–2 cross-month/beyond-ads observations), and the
read-docs-first / write-docs-after memory loop all still apply here — only the
output shape changes.

## Output destination

`clients/<slug>/04-reports/YYYY-MM.md` for a monthly report, or
`clients/<slug>/04-reports/YYYY-MM-DD-<campaign>-recap.md` for a campaign recap.
`mkdir -p` the folder first.

## A. Monthly performance report

Mirror `templates/reports/monthly-performance.md`. Only include the channels the
client actually runs — never emit empty channel blocks.

```markdown
# Monthly performance report — <client name>

**Client:** <client name>
**Period:** <YYYY-MM>
**Prepared by:** <name>
**Date issued:** <YYYY-MM-DD>

---

## Executive summary
<3–5 bullets: top-line result, biggest win, biggest concern, what we're changing>

## Channel-by-channel performance
### <Platform>            <!-- one block per running platform; include Organic / SEO (Sessions / Top pages / Keyword wins) when the client runs it -->
- **Spend:** <amount>
- **Impressions / Reach:** <n>
- **Clicks / CTR:** <n / %>
- **Conversions / CPA:** <n / amount>
- **ROAS:** <n>            <!-- include the metrics that fit the platform/objective -->
- **Commentary:** <one paragraph — explain the why, reference last month where it strengthens the point>

## Wins
- <what worked and why>

## Losses
- <what didn't and what we're doing about it>

## Spend reconciliation
| Channel | Budget | Actual | Variance |
|---|---|---|---|
| <channel> | <amount> | <amount> | <%> |

## Next month plan
- <action 1 — specific, forward-looking>
- <action 2>
- <action 3>

---
*Toggle Solutions · toggle.solutions · hello@toggle.solutions*
```

(Branding line becomes Meraaki if the account is a Meraaki-onboarded client.)

## B. Campaign recap

Mirror `templates/reports/campaign-recap.md`.

```markdown
# Campaign recap — <campaign name>

**Client:** <client name>
**Campaign:** <name>
**Period:** <YYYY-MM-DD to YYYY-MM-DD>
**Prepared by:** <name>
**Date issued:** <YYYY-MM-DD>

---

## Goal
<one sentence — the specific commercial outcome we set out to drive>

## Result vs goal
| Metric | Goal | Actual | Variance |
|---|---|---|---|
| <metric> | <target> | <actual> | <% / delta> |

## What worked
- <observation>

## What didn't
- <observation>

## Recommendations
1. <recommendation>
2. <recommendation>
3. <recommendation>

---
*Toggle Solutions · toggle.solutions · hello@toggle.solutions*
```

## Data sourcing

- Pull spend + performance from `clients/<slug>/03-media/` where it exists.
- Anything not sourced from a platform or the media folder → write
  `TBD — source: <platform>` literally. Do not invent numbers.
