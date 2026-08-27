# Stage 8 — The Sales Artifact Stack (8a–8f)

> The close-rate pile beyond the proposal master. All artifacts use Stage 3 tokens, Stage 5 assets, and the Stage 2 Slides conversion (pt = px × 0.5625). Solo-built under the run-through directive; the deferred adversarial pass is queued (see final wrap-up).

---

## 8a - Company Deck Master (dark, interactive) - `deck-master.html`

**Belief:** *"They opened their analysis tool, not a slide deck. They already know my business."*

Rebuilt 2026-08-26 as a running instrument rather than a static master, after the CEO read that our calls lack authority. The old 14-slide company profile (Cover, Who We Are, What We Do, Why Partner) is in git history. It was replaced because a company profile is a supplicant structure: every slide asks the prospect to be impressed by us.

**15 slides, four acts.** Cover (we looked before we called) - Agenda (they set the order, blocks are clickable) - Pre-call findings (three fixes given away free) - **The money math** (their spend, lead cost, close rate and customer value typed in live, computed to cost per customer and annual value of the gap) - Failure modes (three, the matching one highlights itself from the inputs) - **Live scorecard** (five areas rated on the call, the verdict writes itself and names the first fix) - How we diagnose (the benchmark-outside-marketing position) - The rebuild (four steps, fixed order) - **Receipts** (all nine cases from `brain/case-studies/`, filterable by vertical, click to pin) - Case in full (the pinned case with method and transfer line) - **What we do not claim** (where our evidence runs out, generated from `brain/case-studies/PROOF-GAPS.md`) - Qualification (who we take on, who we turn down) - How we engage (five models, prices stay open) - The one decision - Leave-behind (printable, built from what was entered).

**How it runs.** Arrow keys or space to move, `G` for overview, `N` for presenter notes (every slide carries the script), `S` for Call setup, `Escape` to close everything, number keys to jump. Call setup persists in the browser's local storage, so prep survives a reload. The Leave-behind button prints every slide with the call's inputs baked in.

**Rules.** Every number traces to a file in `brain/case-studies/`; nothing is invented here. The improvement slider on the money slide prints an on-screen warning above 50 percent, because a reduction that size came from a structural change rather than from ad account tuning and must not be left on screen unsourced. Prices stay open on the engagement slide, and quotes come from `brain/pricing/` after the call. Colors come from `tokens.json`, with two severity values (`--warn`, `--risk`) minted here and marked in the file pending addition to the token set. **No strikethrough in the deck**, since the device budget stays with proposals (C1).

**The call script that goes with it:** `playbooks/sales-play.md`.

## 8b — Free Brand Audit Master (light) — `audit-master.html`

**Belief:** *"If the free one is this rigorous, the paid one pays for itself."*
One page: scorecard table (5 areas, status tags — **including an honest "On target"**: an audit that finds only problems is a sales letter) → the three findings that matter (severity stripe, evidence line with a number, fix line that names the method) → "if we worked together" 3-step timeline (audit → fixes → week-6 outcomes) → next-step band (named person + number) → the no-pressure fine print.
Sample data is marked `[SAMPLE]` throughout — the template never ships with invented client numbers.

## 8c — Case Study One-Pagers (dark, dense) — `case-onepagers.html`

**Belief:** *"The result is the headline, the method is checkable, the next step is one call."*
Template: kicker (vertical · geo · year) → title (the case's named story) → challenge/solution columns (≤58ch) → 2–3 stat cards (one focal) → service tags → base bar (wordmark + contact). **Populated for all six: UNITAR · CIMB · Singlife · Kualesa · Al Hidayah · EduKids** — numbers verbatim from the case-study index.

## 8d — Report Masters (light) — `reports-8d.html`

**Monthly** — belief: *"I can run my own exec meeting from this page."* Four-number month (one focal) → channel table with stripes + total → learnings (only decision-changing) → next moves (scale/test/pause). 
**Weekly leads (UNITAR format)** — belief: *"Every Monday, the same shape — comparisons hold."* Codifies `clients/audaura-unitar/WEEKLY-REPORT-FORMAT.md` exactly: headline sentence → 4-segment split table → per-campus table ranked by gap remaining (all 10, never truncated in delivery) → channel mix → ≤5 learnings → 3 moves. Hard rules carried over: no blended-CPL headline, no emojis, no vague "continue monitoring."

## 8e — Pricing & Packages Master (light) — `pricing-8e.html`

**Belief:** *"The structure is principled — the number will be too."*
Five engagement models (process.md) × duration × built-for × what-you-get × investment. **Prices stay `TBD (MYR)`** — the rate card forbids invented values; what ships is the **anchor logic**: scoped to outcomes not headcount · the audit prices first and smallest · media never inside the fee (billed direct, shown separately per the Stage 2 Commercials rule) · every quote anchored to the two nearest ledger quotes (`archive/quotes/`).

## 8f — Email Sequences (3 pre-meeting + 3 post-meeting)

**Belief:** *"They run their own pipeline the way they'd run mine."*
Voice rules: ≤120 words · one link/ask per email · receipts inline · no urgency theatre · sign-off = sender's name, role, mobile · plain text (no HTML marketing chrome — these come from a person).

### Pre-meeting

**P1 — Confirm + set context** (on booking)
> Subject: Thursday 2pm — what we'll cover
> [Name] — locked: Thursday 2pm, 30 minutes. Before the call we'll have looked at your site, your ads (whatever's publicly visible), and your search footprint. We'll bring the first three things we'd fix — you bring the number you're trying to move. If anything's changed, this link reschedules in one click: [link]. — Viknesh, Sales & Partnership Director, (+60) 125 688 681

**P2 — The homework swap** (T−2 days)
> Subject: One number before Thursday
> Quick one: what did a customer cost you last quarter, all-in? Rough is fine. We'll bring the education-category reference points (we've run RM150+ Google / RM290+ Meta CPLs down 47% when the funnel was the problem, not the ads). No prep beyond that. — Viknesh

**P3 — Day-of nudge** (T−2 hours)
> Subject: 2pm — joining link
> See you at 2: [link]. 30 minutes, three fixes, no pitch deck. — Viknesh

### Post-meeting

**F1 — Recap + the promise kept** (same day)
> Subject: What we said we'd fix first
> [Name] — as discussed: (1) [finding], (2) [finding], (3) [finding]. The written audit lands by [day] — it'll carry the evidence for each. The one decision on your side: [the single ask]. — Viknesh

**F2 — The audit delivery** (≤1 week)
> Subject: Your brand audit (attached)
> Attached — scorecard, the three findings with evidence, and what weeks 1–6 would look like if we ran the fixes. Honest version included: [area] is already on target; we won't pretend otherwise. 20 minutes to walk through it? [two time options]. — Viknesh

**F3 — The clean break** (T+10 days, if silent)
> Subject: Closing the file?
> No response needed if the timing's wrong — we'll close the file and the audit stays yours either way. If it's a question of scope or budget, say so plainly; we'd rather right-size than chase. — Viknesh

---

## Slides production note (all of 8a–8e)

Masters live as HTML reference + Google Slides/Docs rebuilds per PROPOSAL-MASTER §4's recipes and conversion. Deck = Slides; audit/monthly/weekly/pricing = Docs or Slides per team preference; the weekly may also ship as the markdown the `/unitar-weekly-report` skill already generates — this template is its styled twin.
