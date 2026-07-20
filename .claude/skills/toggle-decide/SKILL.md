---
name: toggle-decide
description: Recommend ONE next task for Zaid across Toggle work based on priority, deadlines, energy, and mid-flow context. Reads Toggle Brain cockpit/ state, todos, journal, plus today's git activity. Returns a single pick with rationale — not a menu. Use when Zaid types /toggle-decide, asks "what should I do next for Toggle / UNITAR / clients", or "pick something for me at the agency".
user_invocable: true
---

# toggle-decide

Pick ONE next task for Zaid across Toggle work. The job is to absorb the
decision cost — surface one recommendation with rationale, and log only if
the pick is a real shift.

## What this skill does

1. Reads cockpit state, todos, recent journal, and today's git activity
   across Toggle work folders.
2. Applies decision rules (blockers → deadlines → focus client → top-3 →
   energy → don't-fragment).
3. Returns ONE pick with rationale + dropped alternatives.
4. Updates `cockpit/current.md` focus pointer if Zaid accepts.
5. Logs to `cockpit/decisions/` ONLY when the pick is a real shift (focus
   client change, kill/park, strategic fork) — not for routine "next task" picks.

## Steps

1. All paths under `/Users/zaidsaad/Desktop/Code/Toggle Brain/`.
2. Gather inputs:
   - `cockpit/current.md` — focus_client, focus_track, energy, blockers.
   - `cockpit/todos/_internal.md` and every `cockpit/todos/<slug>.md`.
   - `cockpit/journal/<yesterday>.md` (compute via `date -v-1d +%Y-%m-%d`).
   - `cockpit/decisions/` — anything in last 3 days that constrains the pick.
3. Today's mid-flow signal — `git log --since=midnight --oneline` on:
   - `/Users/zaidsaad/Desktop/Code/Toggle Brain`
   - **If it exists**, `/Users/zaidsaad/Desktop/Code/tg` (sibling Toggle work — bespoke, TG, unitar). Check with `test -d` first. If absent, skip and note: `(sibling tg folder not found — skipped mid-flow check)` in output. Do not crash.
4. Apply decision rules in order:
   - **a. Blocker resolution.** If `cockpit/current.md` has an active blocker
     and a todo would resolve it, recommend that.
   - **b. Deadlines.** Any P0/P1 todo with `due:` in next 48 hours wins
     unless mid-flow is on fire.
   - **c. Focus client.** If `focus_client` is set and they have an open P0,
     prefer that over equivalent-priority items on other clients.
   - **d. Top 3.** If `cockpit/current.md` Top 3 is set today, pick from it.
   - **e. Energy.** If yesterday's journal shows low-energy / burnt-out
     signal, recommend rest or a low-cognitive-load task, not the highest-ROI.
   - **f. Don't fragment.** If today's git log shows 90+ minutes on one
     project, default to "keep going on X" unless a fire interrupts.
5. Print the recommendation:

```markdown
## 🎯 Next: <one-sentence task description>

**Client / track:** <client slug or "internal">
**Why this:** <rationale referencing the todo line + the rule that decided it>
**Estimated effort:** <if known from the todo, else "ask before committing">
**Source:** <file:line of the todo or current.md item this came from>

### Dropped alternatives
- <other contender 1> — <why dropped>
- <other contender 2> — <why dropped>

### Log?
<yes — real shift / no — routine pick>
```

6. **Decide whether to log:**
   - Real shift (focus client change, kill, strategic fork) → write
     `cockpit/decisions/<today>-<short-slug>.md`, patch `cockpit/current.md`
     `focus_client` + `focus_track`, commit with `decide <date> — <slug>`.
   - Routine pick → no decision file. Only update `cockpit/current.md` if
     Zaid explicitly says "go". If he hasn't, don't mutate.
7. If nothing changed, don't commit.

## Guardrails

- **One pick, not a menu.** The whole point.
- **Rest is a valid answer.** Low-energy signal → recommend rest.
- **Don't override mid-flow without a fire.** 90+ minutes on something today
  → keep going unless a P0 deadline is hours away.
- **Don't fabricate todos.** If a deadline mentioned in CLIENT.md has no
  matching todo, say so — don't invent the task. Suggest Zaid add it.
- **Quote sources.** Every recommendation cites the line it came from, so
  Zaid can verify in one click.
- **Don't mix Toggle and Cranium recommendations.** This is Toggle work
  only. Cranium has its own `/cranium-decide`.
- **Honour zone rules.** Only writes are to `cockpit/`. Never write into
  `brain/`, `clients/`, `prompts/`, `templates/` from this skill.
