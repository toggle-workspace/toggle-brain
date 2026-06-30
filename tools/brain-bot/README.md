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

**MVP scope guard is the system prompt, not a hard boundary.** The agent is told
to answer only from the shared zones (`brain/`, `generators/`, `Sales/`, …) and
to refuse individual `clients/` data. The *hard* enforcement — a containerized
clean `git archive main` checkout with no `$HOME`, no `.git`, and a per-user
client ACL — is a later phase (see Roadmap).

The read-only guarantee IS hard already: `ask.sh` permits only `Read`, `Grep`,
`Glob` and explicitly denies `Bash`/`Write`/`Edit`/etc., so the bot cannot
mutate the repo or shell out.

---

## Architecture

```
Telegram  ──long poll──>  listener.js  ──spawns──>  ask.sh
(getUpdates)              (allowlist,              (headless `claude -p`,
                          offset, reply)            cwd = repo root,
                                                    Read/Grep/Glob only)
                                                          │
                                                    reads brain/*.md,
                                                    cites the path
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
| `listener.js` | Long-poll loop: allowlist gate, offset, spawn `ask.sh`, reply (chunked). |
| `telegram.js` | Thin Bot API client (`getUpdates` / `sendMessage` / `sendChatAction`). |
| `ask.sh` | The one seam that runs the brain: headless `claude -p`, read-only tools, repo as cwd. A future container/VPS runtime swaps only this file. |
| `prompt/system.md` | The agent's system prompt: navigation doctrine, citation + verbatim-value rules, conflict-flagging, scope, refusal. |
| `config.json` | Non-secret tunables: `repoRoot`, `model`, poll timeout, answer length, ask timeout. |
| `run-bot.sh` | Entrypoint: loads `.env`, runs `listener.js`. launchd-friendly. |
| `allowlist.json` | **gitignored.** `{ "<telegram_user_id>": "Display Name" }`. Copy from `allowlist.example.json`. |
| `.env` | **gitignored.** Holds `TELEGRAM_TOKEN`. |
| `.state.json` / `logs/` | **gitignored.** Polling offset + run logs. |

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
BRAIN_BOT_REPO_ROOT="$PWD" bash tools/brain-bot/ask.sh "What is our Malaysia retainer pricing?"
```

## Roadmap (post-MVP)

1. **Jail** — run the agent in a container over a clean `git archive main`
   checkout: no `$HOME`, no `.git`, no uncommitted/WIP files. This is the real
   security boundary; the MVP's prompt-scope is interim.
2. **Per-user client ACL** — `telegram_user_id → [client slugs | "all"]`; assemble
   a per-request view = shared zones + only that user's allowed `clients/<slug>/`.
   Enforced by what's mounted, never by the prompt (survives prompt injection).
3. **Cost controls** — cheap default model, `/deep` to escalate to Opus, per-user
   daily quota, hard monthly spend cap, `update_id` dedupe.
4. **Hardening** — verify cited paths exist on disk before replying, append-only
   audit log (question + cited paths, not full answers), `MAP.md` broken-path
   lint, `caffeinate`/launchd keep-alive for always-on.
