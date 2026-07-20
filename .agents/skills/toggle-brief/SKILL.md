---
name: toggle-brief
description: Morning brief routine for Zaid's Toggle Brain repo. Reads cockpit/ (current focus, todos, journal, decisions), client status, and recent git activity across Toggle work folders; writes today's brief and updates cockpit/current.md. Use when Zaid types /toggle-brief, asks "what should I work on today for Toggle / clients / UNITAR", or says "Toggle morning brief".
user_invocable: true
---

# toggle-brief

Morning brief over Zaid's Toggle Brain repo at `/Users/zaidsaad/Desktop/Code/Toggle Brain`.

## What this skill does

1. Reads `cockpit/current.md`, `cockpit/todos/*.md`, yesterday's
   `cockpit/journal/<yesterday>.md`, and recent `cockpit/decisions/*.md`.
2. Reads each `clients/*/CLIENT.md` for status + scope.
3. Resolves real last-activity per client via git mtime on `clients/<slug>/`.
4. Writes the brief to `/tmp/toggle-brief-<today>.md`.
5. Updates `cockpit/current.md` with today's date and proposed top 3.
6. Commits the cockpit change with message `morning brief <date>`. **No push.**
7. Prints the brief contents to the user.

## Steps

1. All file ops use absolute paths under `/Users/zaidsaad/Desktop/Code/Toggle Brain/`.
2. Read `cockpit/current.md` — note `focus_client`, `focus_track`, `energy`.
3. Read `cockpit/todos/_internal.md` and every `cockpit/todos/<slug>.md` —
   count open `- [ ]`, flag any with `due:` within 7 days.
4. Read `cockpit/journal/<yesterday>.md` if it exists (compute yesterday with
   `date -v-1d +%Y-%m-%d` on macOS). Note what shipped, what slipped.
5. Scan `cockpit/decisions/` for any decisions made in the last 3 days that
   need follow-through.
6. For each `clients/*/CLIENT.md`:
   - Read frontmatter for `status:` (active / paused / closed / prospect).
   - `git -C "/Users/zaidsaad/Desktop/Code/Toggle Brain" log -1 --format="%cs" -- "clients/<slug>"` for last activity on that client.
   - Skip closed / archived in the brief unless they have an open todo.
7. Compose the brief with this structure:

```markdown
# Toggle brief — <today>

## 🔆 Energy
<from current.md, or "unset" if not set today>

## 🎯 Top 3 for today
1. <highest-priority item — surface the focus_client's P0 todo>
2. <next>
3. <next>

## 📅 Urgent (due within 7 days)
<bulleted list of todos with due: dates inside the window, with client tag>

## 🟢 Active clients (status + last activity)
<one-line per active client: name, status, last-git-activity, open todo count>

## 📌 Yesterday's tail
<from journal/<yesterday>.md — what shipped, what slipped, anything carrying over>

## ⚠️ Drift / blockers
<anything stale, blocked, or surprising from decisions/ in last 3 days>
```

8. Write to `/tmp/toggle-brief-<today>.md`.
9. Patch `cockpit/current.md` `date:` frontmatter and `## Top 3` block with the
   proposed top 3.
10. `git -C "/Users/zaidsaad/Desktop/Code/Toggle Brain" add cockpit/current.md && git commit -m "morning brief <date>"`. Don't push.
11. Print the brief.

## Guardrails

- **Don't fabricate.** If `cockpit/current.md` is empty / stale or
  `cockpit/todos/` is empty, say so in the brief rather than inventing tasks.
- **Stale-context warning.** Before reading `cockpit/current.md` for context,
  check its `date:` frontmatter. If it is more than 24h behind today, lead
  the brief with `⚠️ Last brief was <N> days ago — context may be stale.`
  Then proceed.
- **Date arithmetic uses `date -v-1d +%Y-%m-%d`** (BSD/macOS). Don't guess.
- **No push.** Local commit only — Zaid pushes manually.
- **Idempotent.** Re-running mid-morning overwrites `/tmp/toggle-brief-<today>.md`.
- **Distinct from Cranium.** This is the Toggle brain, not the Cranium brain.
  If both are stale, mention each in its own line — don't conflate. The
  Cranium brief lands at `/tmp/cranium-brief-<today>.md` (different prefix,
  no collision).
- **Honour the brain's zone rules.** Cockpit reads/writes are fine; never
  write into `brain/`, `clients/`, `prompts/`, or `templates/` from this skill.
