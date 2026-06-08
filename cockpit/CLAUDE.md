# `cockpit/` — daily operating state

The chief-of-staff zone. Holds **transient, dated state** that drives the
daily routines: `/toggle-brief`, `/toggle-status`, `/toggle-decide`, plus
end-of-day journaling and significant-decision logging.

This zone is **not knowledge** (that's `brain/`) and **not client output**
(that's `clients/`). It's the steering wheel.

---

## The rules of this zone

1. **Append, never overwrite.** Journals and decisions are dated files —
   never edit yesterday's. Today's brief overwrites today's brief; that's it.
2. **State is small.** `current.md` is one page. If it grows past a screen,
   the routine is broken, not the file.
3. **Never duplicate `brain/` facts.** This zone references — it doesn't
   restate. If the TikTok-rule belongs anywhere, it's `brain/`. Cockpit cites.
4. **Per-client todos live here, not in `clients/<slug>/`.** Client folders
   are deliverable outputs. Todos are operating state. Keep separated.
5. **Routines write here; humans write here; clients never see this zone.**

---

## What lives where

| Path | Purpose | Cadence |
|---|---|---|
| `current.md` | Today's focus, top 3, energy, blockers | Updated every brief / decide |
| `journal/YYYY-MM-DD.md` | EOD log: what shipped, what slipped, decisions | Once per work session |
| `decisions/YYYY-MM-DD-<slug>.md` | One file per significant decision with rationale | Only on real shifts |
| `todos/<client-slug>.md` | Per-client open todos with priority + estimate | When created/completed |
| `todos/_internal.md` | Toggle-internal todos (biz dev, ops, hiring) | Same |

---

## Routine entry points (callable from anywhere)

| Command | Reads | Writes |
|---|---|---|
| `/toggle-brief` | `current.md`, `todos/`, `journal/<yesterday>.md`, `clients/*/CLIENT.md` | `current.md` (today's top 3) |
| `/toggle-status` | `clients/*/CLIENT.md`, `todos/`, git mtime | Nothing (read-only) |
| `/toggle-decide` | All of the above + today's git activity | `current.md` focus, optionally `decisions/` |
| `/toggle-journal` _(future)_ | Today's work + `current.md` | `journal/<today>.md` |
| `/toggle-review` _(future)_ | Last 7 days of journals | Weekly journal entry |

---

## Why this zone exists separately

Without it, project state leaks into `clients/<slug>/` (which is meant to be
client-deliverable output) or `brain/` (which is meant to be canonical
knowledge). Cockpit gives the routines a single dated, ephemeral, internal
home — so the other zones stay clean.
