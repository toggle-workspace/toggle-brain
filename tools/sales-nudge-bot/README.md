# sales-nudge-bot

A **free** Telegram bot that nudges each sales PIC to update the live sales
tracker, and lets them update it in a few taps — no spreadsheet hunting.

> **Why this exists.** The team wasn't updating the CRM (a Google Sheet) promptly.
> Paid options (Twilio/WhatsApp Business API, per-seat Claude connectors) were
> rejected. This runs entirely on **Google Apps Script** (free backend + free
> webhook endpoint) + the **Telegram Bot API** (free, official, with tappable
> inline buttons). No server, no subscriptions, no AI cost at runtime.

## What it does

1. **Detects staleness** — daily, finds leads untouched ≥ N days (or with a blank
   contact date), grouped by PIC, skipping parked stages.
2. **Nudges, tappably** — DMs each PIC their stale leads. One tap sets the stage,
   one tap warm/cold, an optional typed note. Every interaction **stamps
   `Last Contact Date` = today** — which alone fixes most of the staleness.
3. **Writes back** — straight into the sheet, by a stable per-row `BotID` so taps
   keep working even after the sheet is sorted or filtered.
4. **Holds you accountable** — a manager digest each run (who was nudged, who's
   unregistered) — the real lever for a small team.

## The flow

```
📋 Butterfly — stage: In progress · last touch 21d ago
   What's the stage now?
   [ Not started ][ In progress ][ Blocked ][ Completed ]
   [ 💤 Snooze 7d ][ 🔕 Not mine ]
→ tap Blocked
📋 Butterfly — Stage → Blocked ✅   Warm or cold?
   [ Warm ][ Cold ][ Skip ]
→ tap Cold
📋 Butterfly — Updated ✅   Add a note? Just reply, or /skip.
→ "client wants to revisit after Raya"   → Note saved ✅
```

## Files

| File | Role |
|---|---|
| `Config.gs` | All tuning: sheet id/gid, column titles, stale rules, button options. No secrets. |
| `Main.gs` | Sheet access, date parsing, stale detection, the daily job, the `doPost` webhook. |
| `Telegram.gs` | Telegram API, onboarding, the tappable flow, write-back, roster/log storage. |
| `Setup.gs` | One-time admin: `initBot`, `setWebhook`, `createDailyTrigger`, `previewNudge`. |
| `appsscript.json` | Manifest (timezone, web-app config, OAuth scopes) — for reference / `clasp`. |
| `SETUP.md` | The 30-minute deployment runbook. **Start here.** |

## Design choices worth knowing

- **Source of truth stays the sheet.** The bot is a write *path*, not a second
  database. It only touches `Stage`, `Lead Status`, `Last Contact Date`, `Updates`.
- **Secrets live in Script Properties**, never in these files — safe to commit.
- **Webhook fails closed.** Guarded by a shared secret in the URL (Apps Script
  can't read request headers); a missing/empty secret denies every request.
- **Registration is tamper-proof.** `/start` resolves your name from a server-side
  index, not a free string, and a name already linked to another Telegram account
  is rejected — so nobody can impersonate a PIC or hijack their nudges.
- **Authorization**: a PIC can only update their own leads (admins, any).
- **Formula-injection guarded.** Any user text starting with `= + - @` is prefixed
  with `'` before it hits a cell, so notes can't become live spreadsheet formulas.
- **Concurrency-safe.** Every sheet/property mutation runs under `LockService`;
  rows are keyed by a full-UUID `BotID` so taps survive sorting/filtering.
- **Privacy.** `BotLog` records the *length* of notes, not their body (the body is
  already in the sheet); the `getWebhookInfo` helper redacts the secret.
- **No runtime LLM.** The flow is deterministic Apps Script. (Optional future:
  parse free-text replies with the Gemini free tier — not needed today.)

## Limits (be honest)
- Telegram adoption: each PIC must install Telegram + `/start` once.
- Apps Script quotas (UrlFetch/day, email/day) are generous for ~8 users but not
  infinite — fine here, worth knowing if the team 10×s.
- True row *deletion* drops a lead's `BotID`; sorting/filtering is fine.

See `SETUP.md` to deploy.
