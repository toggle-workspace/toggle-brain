# brain-bot

A standalone Telegram bot that answers questions about this repo (Toggle Brain)
using **agentic retrieval** — a read-only Claude agent that navigates the repo's
markdown live (via `MAP.md` + the `CLAUDE.md` routers), reads the canonical leaf
file, and answers **with a file-path citation**. No vector store, no embeddings,
no re-indexing — the repo *is* the index, so answers stay fresh as it grows.

It is a sibling of `tools/sales-nudge-bot/` (reuses its polling transport idea)
and `tools/gdoc-sync/` (reuses its headless `claude -p` pattern).

---

## Status

Working: Telegram long-poll + `user_id` allowlist + `/whoami`·`/start`·`/help`
bootstrap, a question → headless read-only Claude over the asker's view → a
path-cited answer, plus the jail, per-user client ACL, and cost controls below.

### The jail (hard boundaries — built and verified)

The agent runs against a **clean, committed-only view**, not Zaid's live working
tree, and is **fenced to that view** by a tool hook:

1. **Clean view.** `build-view.sh` builds the read view from
   `git archive origin/main` — committed files only, **no `.git` history**, **no
   uncommitted WIP**. So the bot can't leak half-edited pricing, never-meant-to-
   ship drafts, or secrets deleted from git history. (Consequence: the bot
   answers from what's merged to **`main`**, not from local edits. The listener
   refreshes views on start and every `refreshIntervalMin`.)
2. **Path-guard hook.** A Claude Code `PreToolUse` hook (`hooks/path-guard.py`)
   inspects every `Read`/`Grep`/`Glob` and **denies any path resolving outside
   the view** (`realpath`, so `..` and symlink escapes are caught too). This is
   what stops a crafted or prompt-injected question from reading `~/.ssh`,
   `~/.claude/MEMORY.md`, `/etc/*`, or hopping to another user's view.
3. **Read-only tools.** `ask.sh` permits only `Read`/`Grep`/`Glob` and denies
   `Bash`/`Write`/`Edit`/etc., so the bot can't mutate anything or shell out.

> **Hook contract gotchas (verified empirically, don't regress):** the deny must
> be the JSON `permissionDecision: "deny"` on stdout — **exit code 2 is ignored**.
> The hook command must be invoked as `/usr/bin/python3 "<path>"` with the path
> **quoted** (the repo path contains a space — `Toggle Brain` — and an unquoted
> path makes the hook fail *open*). Claude does **not** pass parent env vars to
> hooks, so don't rely on env for hook behavior.

### Per-user client ACL (hard — built)

Scope is enforced **physically**, not by prompt. Each user's `allowlist.json`
entry declares which clients they may see, and the bot answers them from a
**view** containing the shared zones + only their allowed `clients/<slug>/`
folders (built by `build-view.sh` via `git archive` pathspecs). Non-allowed
clients **don't exist** in that view, so the ACL holds even against a broad
`Glob`/enumeration — you can't read or list a file that isn't there. Combined
with the path-guard hook (which blocks reaching the full repo or another view by
absolute path), a teammate scoped to client A cannot reach client B's data.

**Cross-client zones are admin-only, not "shared".** Client B's confidential
numbers don't live only in `clients/B/` — they're also in `Sales/` (MRR,
quotation tracker, pipeline, margins) and `archive/quotes/` (named-client
quotes), and `cockpit/` holds daily operating decisions. So `config.json`
`adminOnlyZones` (`["Sales","archive","cockpit"]` by default) lists zones that
are **dropped from every non-`all` view** — only an `clients: "all"` (admin) user
sees them. Without this, a shared-only user could read the whole agency's
financials out of the "shared" zones. Adjust the list to taste, but don't put
per-client financials back into scoped views.

`allowlist.json` entry forms:

```json
{
  "111111111": { "name": "Zaid", "clients": "all" },
  "222222222": { "name": "Account Lead", "clients": ["audaura-unitar", "oddle-partnership"] },
  "333333333": "Shared-only teammate (string entry = no client access)"
}
```

Views are cached per distinct client-set and rebuilt when stale
(`refreshIntervalMin`) or on restart.

### Cost controls

- **`/deep <question>`** routes that one question to `deepModel` (Opus); the
  default is the cheaper `model` (Sonnet).
- **Daily quota** — per-user (`dailyQuotaPerUser`, admins exempt) **and** global
  (`dailyQuotaGlobal`) ceilings; reset each day. Counted **at admission** (before
  the model call), so a failed/timeout question isn't a free retry.
- **Update dedupe** — each Telegram `update_id` is processed once, so a
  crash-redelivery never double-bills.

> **Known limits (accepted for now):** the listener handles one question at a
> time, so a single slow `/deep` blocks others for up to the timeout — fine for a
> small internal team, revisit with a concurrency cap if traffic grows.

---

## Architecture

```
Telegram ─long poll─> listener.js ──────spawns─────> ask.sh ──> headless `claude -p`
(getUpdates)          (allowlist, ACL, /deep,        (cwd =     (Read/Grep/Glob only,
                       quota, dedupe, reply)          user's     PreToolUse path-guard
                            │                         view)      hook fences to view)
                            │ per ACL                   │
                       build-view.sh             reads brain/*.md + allowed
                       (git archive origin/main:  clients/*, cites the path
                        shared zones + only the
                        user's allowed clients) ──────> the ACL-scoped view
```

- **No webhook / no Cloudflare Worker.** Those exist in `sales-nudge-bot` only
  because Apps Script returns a 302 Telegram won't follow. A local Node process
  long-polls outbound, so there's no public URL and no inbound surface.
- **Messages are handled one at a time** (awaited in sequence) so two questions
  never spawn parallel `claude -p` runs that thrash the Mac.
- **Offset is persisted per-update** to `.state.json`, so a crash never
  reprocesses a message.

## Files

| File | Role |
|---|---|
| `listener.js` | Long-poll loop: allowlist gate, offset, spawn `ask.sh`, reply (chunked); refreshes the checkout on start + on a timer. |
| `telegram.js` | Thin Bot API client (`getUpdates` / `sendMessage` / `sendChatAction`). |
| `ask.sh` | The one seam that runs the brain: headless `claude -p` over the asker's view, read-only tools, registers the path-guard hook. A future container/VPS runtime swaps only this file. |
| `build-view.sh` | Builds an ACL-scoped view from `git archive origin/main` = shared zones + only the allowed clients (atomic symlink swap). |
| `hooks/path-guard.py` | `PreToolUse` hook: denies any `Read`/`Grep`/`Glob` resolving outside the view. The filesystem fence. |
| `lint-map.sh` | Flags paths referenced in `MAP.md`/`CLAUDE.md`/`README.md` that no longer exist (run manually or in CI). |
| `com.toggle.brain-bot.plist` | `launchd` LaunchAgent: keeps the listener running + the Mac awake (`caffeinate`), respawns on crash. |
| `prompt/system.md` | The agent's system prompt: navigation doctrine, citation + verbatim-value rules, conflict-flagging, scope, refusal. |
| `config.json` | Non-secret tunables: `repoRoot`, `viewsDir`, `ref`, `refreshIntervalMin`, `model`, `deepModel`, `dailyQuotaPerUser`, poll/answer/ask limits, `adminUserIds`. |
| `run-bot.sh` | Entrypoint: loads `.env`, runs `listener.js`. launchd-friendly. |
| `allowlist.json` | **gitignored.** Maps `user_id` → ACL (see forms above). Copy from `allowlist.example.json`. |
| `.env` | **gitignored.** Holds `TELEGRAM_TOKEN`. |
| `.settings.gen.json` / `.state.json` / `.quota.json` / `logs/` | **gitignored.** Generated hook settings, polling offset+dedupe, daily quota, run logs (incl. `logs/audit.jsonl`). |

## Setup

1. **Create the bot:** message [@BotFather](https://t.me/BotFather) → `/newbot` → copy the token.
2. **Add the token** (kept out of git):
   ```
   echo 'TELEGRAM_TOKEN=123456:your-botfather-token' > tools/brain-bot/.env
   ```
3. **Seed the allowlist:** copy the example, then run the bot and DM it `/whoami`
   to get your `user_id`, and paste it in with your client scope:
   ```
   cp tools/brain-bot/allowlist.example.json tools/brain-bot/allowlist.json
   # edit allowlist.json, e.g. { "<your_user_id>": { "name": "You", "clients": "all" } }
   # ("all" = every client; ["slug",...] = only those; a plain string = shared zones only)
   ```
4. **Run it:**
   ```
   ./tools/brain-bot/run-bot.sh
   ```
   DM the bot a question, e.g. *"What's our Malaysia rate card?"* — it should
   reply with the answer and `source: brain/pricing/rate-card-my.md`.

`allowlist.json` is re-read on every message, so you can add people without
restarting the bot.

## Test the brain directly (no Telegram)

```
cd "/Users/zaidsaad/Desktop/Code/Toggle Brain"
# build a view once (clients="all" | "" for shared-only | "slug1,slug2")
BRAIN_BOT_REPO_ROOT="$PWD" \
  BRAIN_BOT_VIEW_DIR="$HOME/.brain-bot/views/all" \
  BRAIN_BOT_VIEW_CLIENTS="all" \
  bash tools/brain-bot/build-view.sh
# then ask against it
BRAIN_BOT_CHECKOUT_DIR="$HOME/.brain-bot/views/all" \
  bash tools/brain-bot/ask.sh "What is our Malaysia retainer pricing?"
```

## Always-on (launchd)

```
cp tools/brain-bot/com.toggle.brain-bot.plist ~/Library/LaunchAgents/
launchctl load -w ~/Library/LaunchAgents/com.toggle.brain-bot.plist   # start + keep alive
launchctl unload -w ~/Library/LaunchAgents/com.toggle.brain-bot.plist # stop
```
`caffeinate -dis` keeps the Mac awake while the bot runs; `KeepAlive` respawns it
on crash. (Migrate to an always-on box / runtime B if it must answer with the
laptop shut.)

## Observability & maintenance

- **Citation check** — after each answer, every cited path is verified to exist
  in the asker's view; fabricated paths get a `⚠️ couldn't verify` note appended.
- **Audit log** — `logs/audit.jsonl` records `{ts, user, scope, model, question,
  cited, missing}` per query (**not** full answers). `logs/bot.log` has the
  running narrative.
- **Index lint** — `./tools/brain-bot/lint-map.sh` flags `MAP.md`/`CLAUDE.md`
  paths that no longer exist (placeholders like `YYYY-MM-DD` skipped). Good as a
  pre-commit / CI check as the repo grows.

## Roadmap

- [x] **MVP** — Telegram long-poll + allowlist + cited answers.
- [x] **Jail** — clean committed-only view (no `.git`, no WIP) + `PreToolUse`
  path-guard hook + read-only tools. *(Native hook, no Docker.)*
- [x] **Per-user client ACL** — physical views; non-allowed clients/zones don't
  exist in the view, so the ACL survives enumeration and prompt injection.
- [x] **Cost controls** — `/deep` escalation, per-user + global daily quota
  (counted at admission), `update_id` dedupe.
- [x] **Hardening** — cited-path verification, audit log, `lint-map.sh`,
  `caffeinate`/launchd keep-alive.

Future (needs the metered-API runtime "B"): a hard dollar spend cap, and lifting
the single-question serialization for real concurrency.

> **Cost note:** the bot runs on the local `claude` CLI (subscription auth), so
> there's no per-token dollar meter to cap. `dailyQuotaPerUser`/`dailyQuotaGlobal`
> + the cheap default model are the practical ceiling. A hard dollar cap would
> require the metered Anthropic API runtime (the future "runtime B").
