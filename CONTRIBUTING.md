# Contributing to Toggle Brain

How we keep this repo fast for client work and safe for canonical knowledge.

---

## The rule of zones

Before you commit, ask: **which zone is this edit in?**

| Zone | Review required? | Why |
|---|---|---|
| `brain/pricing/` | **Yes — 1 reviewer.** CODEOWNERS routes it. | Mispriced quotes go out the door. |
| `brain/` (everything else) | Suggested reviewer; merge after self-review if confident. | Brain is high-leverage but most edits are additive. |
| `templates/` | Suggested reviewer. | Edits ripple into every future client folder. |
| `playbooks/` | Suggested reviewer. | Process changes affect the whole team. |
| `generators/`, `prompts/` | Self-merge OK. | Tooling — iterate fast. |
| `clients/<slug>/` | Self-merge OK after lead glance. | Client work — speed matters. |
| `Pitching/<slug>/` | Self-merge OK after lead glance. | Pitch work — speed matters; graduates to `clients/` on win. |
| `archive/` | Self-merge OK. | Append-only memory. |

---

## Branching

Trunk-based. Short-lived branches; merge same-day where possible.

```
client/<slug>/<topic>     # e.g. client/audaura-unitar/wk24-creative
pitch/<slug>/<topic>      # e.g. pitch/kmu/rebrand-pitch
brain/<topic>             # e.g. brain/pricing-q3-update
generators/<name>         # e.g. generators/quote-v2
playbooks/<name>          # e.g. playbooks/monthly-reporting-v2
```

No long-lived feature branches. If a brain edit needs review, open the PR — don't sit on it.

---

## Commit messages

Conventional-ish, scoped by what changed:

```
feat(audaura-unitar): wk24 TikTok hook variants
fix(pricing-my): correct CPA package rate
docs(services): add web-dev case study link
chore(_template): tighten CLIENT.md frontmatter
```

Scope = the lowest meaningful folder. `feat(pricing)`, `feat(audaura-unitar)`, `feat(quote)` all read clean.

---

## File naming

| Thing | Convention |
|---|---|
| Client folders | `lowercase-kebab` — optional geo prefix (`my-`, `sg-`, `id-`) once geo is confirmed. |
| Pitch folders | Same as client folders, under `Pitching/<slug>/`. On win, `git mv` to `clients/<slug>/`. |
| Case studies | `<client>-<year>.md` (e.g. `unitar-2025.md`) — promotes a year-by-year story. |
| Quotes | `clients/<slug>/quotes/YYYY-MM-DD-<scope>.md` and `archive/quotes/YYYY-MM-DD-<client>-<scope>.md` |
| Reports | `clients/<slug>/04-reports/YYYY-MM.md` |
| Meeting notes | `clients/<slug>/05-meetings/YYYY-MM-DD-<topic>.md` |
| Briefs / strategies | descriptive kebab-case under `01-strategy/`, `00-brief/` |

---

## Required frontmatter (where it applies)

Volatile files (`brain/pricing/*.md`, `brain/voice/*.md`, `brain/positioning/*.md`, `brain/case-studies/_index.md`) carry:

```yaml
---
last_reviewed: 2026-06-08
owner: <name or role>
---
```

`/quote` warns if `brain/pricing/rate-card-<geo>.md` is 90+ days stale. Pass `--accept-stale` to override after a glance.

---

## The `brain/pricing/CHANGELOG.md` rule

Any edit to `brain/pricing/**` must add an entry to `brain/pricing/CHANGELOG.md`. The PR template enforces this — don't bypass.

Format:
```
## 2026-06-08
- rate-card-my: Increased TikTok production day rate from RM4,500 → RM5,000. (Zaid)
- discount-rules: Added 10% multi-month retainer discount for 6+ month commits. (Viknesh)
```

---

## Never write back into `brain/` from a client folder

Client work *reads* from `brain/` by reference. If you discover a fact that should be canonical (a new pricing rule, a positioning angle, a winning hook), don't inline it into `clients/<slug>/`. Open a separate PR against `brain/` so the change benefits every future client. The client folder can wait one day.

---

## Heavy binaries

- Logos, fonts, deck masters → `assets/` (small enough for git).
- Reference images for `--sref` anchoring → `assets/reference-images/<client>/`.
- Client photo/video deliverables → `clients/<slug>/assets/` **but only as small previews**. Master files live in the team Drive — link to them in the relevant brief.
- `.gitignore` blocks `clients/<slug>/assets/master/` and common heavy extensions.

If you're about to commit something over ~5 MB, stop and put it in Drive instead.

---

## CODEOWNERS at a glance

See `.github/CODEOWNERS` for the full mapping. Headline rules:

- `brain/pricing/**` → **hard-gated.** PR + 1 reviewer required.
- `brain/**`, `templates/**`, `playbooks/**` → suggested reviewer (the practice lead for that area).
- `generators/**`, `prompts/**` → no required reviewer.
- `clients/<slug>/**` → suggested reviewer = the lead on that account (auto-assigned via CODEOWNERS where known).

---

## Brain-sync ritual (Friday)

Once a week, one rotating owner merges accumulated `brain/` PRs and refreshes `last_reviewed:` on anything they touched. Goal: weekday client work never blocks waiting for a brain review.

---

## When in doubt

Open the PR. A bad PR is cheap. A wrong fact that lives in five client folders is expensive.
