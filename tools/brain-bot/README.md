# brain-bot

A standalone Telegram bot that answers questions about this repo (Toggle Brain)
using **agentic retrieval** — a read-only Claude agent that navigates the repo's
markdown live (via `MAP.md` + the `CLAUDE.md` routers), reads the canonical leaf
file, and answers **with a file-path citation**. No vector store, no embeddings,
no re-indexing — the repo *is* the index, so answers stay fresh as it grows.

It is a sibling of `tools/sales-nudge-bot/` (reuses its polling transport idea)
and `tools/gdoc-sync/` (reuses its headless `claude -p` pattern).

---

## Status: MVP (phase 1 of the rollout)

Working now:
- Telegram long-poll listener with a static `user_id` allowlist.
- `/whoami` · `/start` · `/help` bootstrap (returns your `user_id` so you can be added).
- A question → headless read-only Claude over the repo → a path-cited answer.

### The jail (hard boundaries — built and verified)

The agent runs against a **clean, committed-only checkout**, not Zaid's live
working tree, and is **fenced to that checkout** by a tool hook:

1. **Clean checkout.** `refresh-checkout.sh` builds the read view from
   `git archive origin/main` — committed files only, **no `.git` history**, **no
   uncommitted WIP**. So the bot can't leak half-edited pricing, never-meant-to-
   ship drafts, or secrets deleted from git history. (Consequence: the bot
   answers from what's merged to **`main`**, not from local edits. The listener
   refreshes it on start and every `refreshIntervalMin`.)
2. **Path-guard hook.** A Claude Code `PreToolUse` hook (`hooks/path-guard.py`)
   inspects every `Read`/`Grep`/`Glob` and **denies any path resolving outside
   the checkout** (`realpath`, so `..` and symlink escapes are caught too). This
   is what stops a crafted or prompt-injected question from reading `~/.ssh`,
   `~/.claude/MEMORY.md`, or `/etc/*`.
3. **Read-only tools.** `ask.sh` permits only `Read`/`Grep`/`Glob` and denies
   `Bash`/`Write`/`Edit`/etc., so the bot can't mutate anything or shell out.

> **Hook contract gotchas (verified empirically, don't regress):** the deny must
> be the JSON `permissionDecision: "deny"` on stdout — **exit code 2 is ignored**.
> The hook command must be invoked as `/usr/bin/python3 "<path>"` with the path
> **quoted** (the repo path contains a space — `Toggle Brain` — and an unquoted
> path makes the hook fail *open*). Claude does **not** pass parent env vars to
> hooks, so don't rely on env for hook behavior.

**Still soft (next phase):** the *which-zones* scope. The system prompt tells the
agent to answer from shared zones and refuse individual `clients/` data, but that
is not yet hard-enforced. The per-user **client ACL** (mount only a user's
allowed `clients/<slug>/`) is the next phase — see Roadmap.

---

## Architecture

```
Telegram ──long poll──> listener.js ──spawns──> ask.sh ──> headless `claude -p`
(getUpdates)            (allowlist,             (cwd =     (Read/Grep/Glob only,
                         offset, reply,          clean      PreToolUse path-guard
                         periodic refresh)       checkout)  hook fences to checkout)
                                                                  │
                              refresh-checkout.sh           reads brain/*.md,
                              (git archive origin/main,      cites the path
                               no .git, no WIP) ────────────> the clean checkout
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
| `ask.sh` | The one seam that runs the brain: headless `claude -p` over the clean checkout, read-only tools, registers the path-guard hook. A future container/VPS runtime swaps only this file. |
| `refresh-checkout.sh` | Rebuilds the clean committed-only checkout from `git archive origin/main` (atomic symlink swap). |
| `hooks/path-guard.py` | `PreToolUse` hook: denies any `Read`/`Grep`/`Glob` resolving outside the checkout. The filesystem fence. |
| `prompt/system.md` | The agent's system prompt: navigation doctrine, citation + verbatim-value rules, conflict-flagging, scope, refusal. |
| `config.json` | Non-secret tunables: `repoRoot`, `checkoutDir`, `ref`, `refreshIntervalMin`, `model`, poll/answer/ask limits. |
| `run-bot.sh` | Entrypoint: loads `.env`, runs `listener.js`. launchd-friendly. |
| `allowlist.json` | **gitignored.** `{ "<telegram_user_id>": "Display Name" }`. Copy from `allowlist.example.json`. |
| `.env` | **gitignored.** Holds `TELEGRAM_TOKEN`. |
| `.settings.gen.json` / `.state.json` / `logs/` | **gitignored.** Generated hook settings, polling offset, run logs. |

## Setup

1. **Create the bot:** message [@BotFather](https://t.me/BotFather) → `/newbot` → copy the token.
2. **Add the token** (kept out of git):
   ```
   echo 'TELEGRAM_TOKEN=123456:your-botfather-token' > tools/brain-bot/.env
   ```
3. **Seed the allowlist:** copy the example, then run the bot and DM it `/whoami`
   to get your `user_id`, and paste it in:
   ```
   cp tools/brain-bot/allowlist.example.json tools/brain-bot/allowlist.json
   # edit allowlist.json: { "<your_user_id>": "Your Name" }
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
# build the clean checkout once
BRAIN_BOT_REPO_ROOT="$PWD" \
  BRAIN_BOT_CHECKOUT_DIR="$HOME/.brain-bot/checkout" \
  bash tools/brain-bot/refresh-checkout.sh
# then ask
BRAIN_BOT_CHECKOUT_DIR="$HOME/.brain-bot/checkout" \
  bash tools/brain-bot/ask.sh "What is our Malaysia retainer pricing?"
```

## Roadmap

- [x] **MVP** — Telegram long-poll + allowlist + cited answers.
- [x] **Jail** — clean committed-only checkout (no `.git`, no WIP) + `PreToolUse`
  path-guard hook fencing reads to the checkout + read-only tools. *(Done via a
  native hook rather than Docker — no container needed.)*

Next:

1. **Per-user client ACL** — `telegram_user_id → [client slugs | "all"]`; assemble
   a per-request view = shared zones + only that user's allowed `clients/<slug>/`.
   Enforced by what's mounted, never by the prompt (survives prompt injection).
3. **Cost controls** — cheap default model, `/deep` to escalate to Opus, per-user
   daily quota, hard monthly spend cap, `update_id` dedupe.
4. **Hardening** — verify cited paths exist on disk before replying, append-only
   audit log (question + cited paths, not full answers), `MAP.md` broken-path
   lint, `caffeinate`/launchd keep-alive for always-on.
