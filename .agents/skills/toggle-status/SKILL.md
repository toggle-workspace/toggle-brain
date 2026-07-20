---
name: toggle-status
description: Read-only snapshot of every Toggle client — status color, real last-activity date (verified against git mtime per client folder, not just CLIENT.md), open todo counts, next deliverable, and drift between declared status and actual activity. Use when Zaid types /toggle-status, asks "where are all my Toggle clients", "show me green yellow red for Toggle", or "what's stalled at the agency".
user_invocable: true
---

# toggle-status

Read-only status across all Toggle clients. **No mutation, no commit.**

## What this skill does

1. Lists every `clients/<slug>/CLIENT.md` and reads its frontmatter.
2. Resolves real last-activity per client via `git log` over the client folder.
3. Counts open todos per client from `cockpit/todos/<slug>.md`.
4. Flags **drift** where the declared status disagrees with real activity.
5. Prints a one-screen summary. Nothing is written.

## Steps

1. All paths under `/Users/zaidsaad/Desktop/Code/Toggle Brain/`.
2. Glob `clients/*/CLIENT.md` (exclude `_TEMPLATE`).
3. For each:
   - Read frontmatter: `client`, `slug`, `geo`, `status`, `practice`, `last_reviewed`.
   - **Placeholder detection:** the `_TEMPLATE` ships with literal `status: <prospect | active | paused | closed>` (or `<my | sg | id | …>` for geo). If a value looks like a template placeholder (starts with `<` or contains ` | `), treat it as **unset** and surface in a dedicated `## ⚪ Unset frontmatter` section at the end of the output. Do NOT assume any default status.
   - `git -C "/Users/zaidsaad/Desktop/Code/Toggle Brain" log -1 --format="%cs" -- "clients/<slug>"` → real last-activity. If empty, fall back to filesystem mtime and tag the row `(by file mtime)`.
   - Read `cockpit/todos/<slug>.md` if exists: count `- [ ]` (open), count items with `due:` within 7 days.
   - Compute days-since vs today.
4. Print a single block:

```markdown
# 📊 Toggle status — <today>

## All clients
| Status | Client | Geo | Practice | Last activity | Open todos | Due ≤7d |
|---|---|---|---|---|---:|---:|
| 🟢/🟡/🔴/⚪ | <name> | <geo> | <practice> | <YYYY-MM-DD> (Nd) | N | N |
...

## Drift detected
<rows where declared status disagrees with real activity; max 5>
- <client>: declared <status> but no activity in <N> days
- <client>: declared paused but commits in last week

## Stalled (>14d no activity)
<client list — kill / revive / chase candidates>

## ⚪ Unset frontmatter
<clients whose CLIENT.md still has literal `<placeholder | values>` from _TEMPLATE. Onboarding incomplete.>

## TL;DR
<one sentence — what's burning, what's healthy. If many `unset` clients, lead with that — onboarding hygiene is the actual story.>
```

5. **Do not mutate. Do not commit.**

## Status colors

- 🟢 **green** — active, activity within last 14 days, no overdue todos.
- 🟡 **yellow** — active but 14+ days without commits, OR overdue todos
  pending, OR `last_reviewed` is 60+ days old.
- 🔴 **red** — active but 30+ days without commits, OR P0 overdue, OR
  declared blocker logged in `cockpit/decisions/`.
- ⚪ **paused / closed / prospect** — not red, just not in play.

## Guardrails

- **Read-only.** No edits anywhere. Not even fixing obviously stale
  `last_reviewed` dates — that's a separate review pass.
- **No prescription.** Status is information. Save "what next" for
  `/toggle-decide` and `/toggle-brief`.
- **Honest about uncertainty.** If a client folder has no commits at all,
  label `(no git history)`. If a CLIENT.md frontmatter is missing `status:`
  or contains a literal template placeholder (`<prospect | active | …>`),
  label `(status unset)` and list the client under `## ⚪ Unset frontmatter`.
- **Sibling-folder gotcha:** `audaura-unitar` and `audaura-unitar-creatives`
  are sibling folders for the same engagement. List both rows but note
  `(sub-folder of audaura-unitar)` on the `-creatives` row so Zaid sees the
  duplication is intentional, not a data error.
- **Use CLIENT.md status in the main table.** Surface disagreements
  separately under Drift — the table reflects what Zaid believes, Drift
  reflects what the data says.
