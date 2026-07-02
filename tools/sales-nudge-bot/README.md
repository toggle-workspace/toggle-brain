# sales-nudge-bot

A **free** Telegram bot that nudges each sales PIC to update the live sales
tracker, and lets them update it in a few taps — no spreadsheet hunting.

> **Why this exists.** The team wasn't updating the CRM (a Google Sheet) promptly.
> Paid options (Twilio/WhatsApp Business API, per-seat Claude connectors) were
> rejected. This runs entirely on **Google Apps Script** (free backend, no server)
> + the **Telegram Bot API** (free, official, with tappable inline buttons). No
> subscriptions, no AI cost at runtime.

## What it does

1. **Detects staleness** — weekly (Sunday ~7am KL), finds leads untouched ≥ N days
   (or with a blank contact date), grouped by PIC, skipping parked stages.
2. **Nudges, tappably** — DMs each PIC their stale leads. One tap sets the stage,
   one tap warm/cold, an optional typed note. Every interaction **stamps
   `Last Contact Date` = today** — which alone fixes most of the staleness.
3. **Writes back** — straight into the sheet, by a stable per-row `BotID` so taps
   keep working even after the sheet is sorted or filtered.
4. **Holds you accountable** — a manager digest each weekly run (who was nudged,
   who's unregistered) — the real lever for a small team.
5. **Captures new leads** — any registered PIC sends `/newlead` and adds a row
   (client name, PIC, notes) in a few taps, straight from their phone after a meeting.
   The assigned PIC gets an instant Telegram ping (if they're registered and weren't
   the one who added it).

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

**Adding a lead** (`/newlead`):

```
🆕 New lead — what's the client / company name?
→ "Acme Sdn Bhd"
🆕 Acme Sdn Bhd — who's the PIC? Tap a name or type one:
   [ Jordan ][ Lau ]   [ Vik ][ Yang ]   …   [ ➕ Someone else ]
→ tap Jordan
🆕 Acme Sdn Bhd — PIC → Jordan ✅   Add a note (or /skip):
→ "met at expo, wants Q3 proposal"   → Added ✅
```

## Transport — webhook via a Cloudflare Worker (polling = fallback)

Replies are near-instant (~1–3s). Telegram can't webhook the Apps Script directly:
Apps Script web apps answer every request with a `302` redirect Telegram won't follow
(`getWebhookInfo` shows *"Wrong response from the webhook: 302 Moved Temporarily"*).
So a tiny **free Cloudflare Worker** (`worker/`) is the public webhook — it returns
HTTP 200 instantly and forwards each update to the Apps Script `/exec` (following the
302 itself), where `doPost()` runs and the bot replies. Setup is in `worker/README.md`.

**Polling is the fallback.** `Polling.gs` (`createPollingTrigger`/`pollUpdates`) pulls
updates via `getUpdates` on a 1-minute timer — zero extra infra, but ~60s/tap latency,
so it's used only if the Worker is down. The two are mutually exclusive: the live
Worker webhook means the polling trigger is deleted (`removePollingTriggers`), and
falling back means `deleteWebhook` + `createPollingTrigger`. Telegram queues updates
during any gap, so nothing is lost.

## Files

| File | Role |
|---|---|
| `Config.gs` | All tuning: sheet id/gid, column titles, stale rules, button options. No secrets. |
| `Main.gs` | Sheet access, date parsing, stale detection, the weekly nudge job (`runDailyNudge`), and the `doPost` webhook handler (the live entry point behind the Worker). |
| `Telegram.gs` | Telegram API, onboarding, the tappable flow, `/newlead`, write-back, roster/log storage. |
| `Polling.gs` | **Fallback transport.** Pulls updates via `getUpdates` on a 1-min timer (`createPollingTrigger`/`pollUpdates`) — used only if the Worker webhook is down. |
| `Setup.gs` | One-time admin: `initBot`, `setWorkerWebhook`, `createWeeklyTrigger`, `previewNudge`, `getWebhookInfo`. |
| `worker/` | **The live transport.** A free Cloudflare Worker that proxies Telegram's webhook to Apps Script for ~1–3s replies. See `worker/README.md`. |
| `appsscript.json` | Manifest (timezone, web-app config, OAuth scopes) — for reference / `clasp`. |
| `SETUP.md` | The 30-minute deployment runbook. **Start here.** |

## Design choices worth knowing

- **Source of truth stays the sheet.** The bot is a write *path*, not a second
  database. It only touches `Stage`, `Lead Status`, `Last Contact Date`, `Updates`.
- **Secrets live in Script Properties**, never in these files — safe to commit.
- **Webhook fails closed at both hops.** Telegram → Worker is guarded by a
  `secret_token` header — the Worker rejects anything without it (and won't forward an
  unauthenticated request). Worker → Apps Script carries a shared `?secret=` that
  `doPost` verifies; missing/empty denies every request. (Apps Script can't read
  request headers, which is why that secret rides in the URL.)
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
