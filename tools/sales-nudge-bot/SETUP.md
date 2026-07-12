# Setup — sales-nudge-bot (Telegram + Google Apps Script)

~30 minutes, one time. Everything below is **free**. You need: edit access to the
sales tracker, a Telegram account, and 5 minutes from each PIC to register.

---

## 1. Create the Telegram bot (2 min)

1. In Telegram, message **@BotFather** → `/newbot`.
2. Give it a name (e.g. `Toggle Sales Nudge`) and a username ending in `bot`.
3. BotFather replies with a **token** like `1234567890:AAH...`. Keep it.
4. (Optional) `/setcommands` on BotFather, paste:
   ```
   start - Register yourself
   stale - Show my stale leads now
   update - Update any of my leads / add a note
   newlead - Add a new lead (client, PIC, notes)
   whoami - Show my chat id + name
   skip - Skip the current step
   stats - Stale-lead counts (all PICs)
   ```

## 2. Create the Apps Script project (5 min)

**Recommended: bind it to the sheet** so it has access automatically.

1. Open the sales tracker → **Extensions ▸ Apps Script**.
2. Delete the empty `Code.gs`. Create these files and paste each from this folder:
   `Config.gs`, `Main.gs`, `Telegram.gs`, `Setup.gs`, `Polling.gs`.
3. **Project Settings** (gear icon):
   - Set **Time zone** = `Asia/Kuala_Lumpur`.
   - Under **Script Properties**, add:
     | Property | Value |
     |---|---|
     | `TELEGRAM_TOKEN` | the BotFather token |
     | `TELEGRAM_SECRET` | a long random string (e.g. a UUID) — guards the webhook; the Worker passes it through as `?secret=` (see §4) |
   - (If you did NOT bind to the sheet, also confirm `SHEET_ID` in `Config.gs`.)
4. Confirm `Config.gs` → `SHEET_GID` matches the **`Client - Master Sheet`** tab's
   `#gid=` in the sheet URL (open that tab, copy the number after `#gid=`). The bot
   reads/writes that tab; its `COLS` must match its header row (`Client Name`, `PIC`,
   `Stage`, `Lead Status`, `Last Contact Date`, `Latest Correspondance/Updates`).

## 3. Initialise (2 min)

1. In the editor, **Run ▸ `initBot`**. Approve the OAuth prompt (it's your own
   script). This adds a `BotID` column to the `Client - Master Sheet` tab and creates the hidden
   `BotRoster` / `BotLog` tabs.
2. **Run ▸ `previewNudge`** → View ▸ Logs. You should see each PIC and their
   stale-lead counts. No messages are sent. This proves detection works.

## 4. Make it fast — deploy the Cloudflare Worker webhook (10 min)

Apps Script can't be Telegram's webhook directly (it returns a `302` Telegram won't
follow), and 1-minute polling makes every tap wait up to ~60s. A tiny **free
Cloudflare Worker** fixes this — replies drop to ~1–3s. Full runbook: **`worker/README.md`**.

1. **Deploy the web app** so the Worker has something to forward to:
   **Deploy ▸ New deployment ▸ Web app** (Execute as **Me**, Who has access **Anyone**)
   → copy the **/exec URL**.
2. **Deploy the Worker** (`worker/README.md`): `wrangler login`, set its two secrets —
   `EXEC_URL` = the /exec URL **plus** `?secret=<TELEGRAM_SECRET>`, and `WEBHOOK_SECRET`
   = a fresh long random string — then `wrangler deploy`. It prints your Worker URL.
3. **Point Telegram at the Worker.** Add Script Properties `WORKER_URL` (the Worker URL)
   and `WEBHOOK_SECRET` (same value as step 2), then **Run ▸ `setWorkerWebhook`**, then
   **Run ▸ `removePollingTriggers`** — the 1-min poller must be stopped, or its next
   `getUpdates` hits a 409 conflict and deletes your webhook.
4. **Run ▸ `getWebhookInfo`** → confirm `url` = your Worker, empty `last_error_message`,
   `pending_update_count` 0. Send the bot a message; the reply should land in ~1–3s.

> **Prefer zero extra infra?** Skip steps 2–3 and **Run ▸ `createPollingTrigger`**
> instead (replies within ~1 min, no Cloudflare account). The two transports are
> mutually exclusive — to switch back from the Worker later, `deleteWebhook` then
> `createPollingTrigger`.

## 5. Register the team (5 min)

1. You first: open the bot, `/start`, pick your name. Then send `/whoami` — copy
   your numeric `chat_id` into `Config.gs` → `ADMIN_CHAT_IDS` (so you get the
   manager digest + "not mine" alerts). Save.
2. Send each PIC the bot link (`t.me/<your_bot_username>`). They tap **Start**,
   pick their name once. Done — they appear in `BotRoster`.
3. `testSend(yourChatId)` to confirm sending works end to end.

## 6. Schedule it

**Run ▸ `createWeeklyTrigger`** — sends the nudge **~07:00 KL on Sundays** (the
handler is still named `runDailyNudge`). Change the day/hour in `Setup.gs` if you
like. To stop: `removeTriggers`.

---

## Day-to-day
- A PIC gets *"📋 Butterfly — stage? [Not Pitched][Pitch In Progress][Blocked][Active][Dead][Closed]"*,
  taps through stage → warm/cold → optional note. The sheet updates and
  **Last Contact Date is stamped to today** automatically.
- `/stale` any time pulls their current list on demand.
- `/update` (or `/update <name>`) lists a PIC's own leads to pick one and change
  stage/status or add a note — the on-demand version of the Sunday nudge.
- `/newlead` adds a brand-new lead — client name → PIC (tap or type) → note (or
  `/skip`). Any registered PIC can use it; the row lands with a fresh `BotID` and
  today's date, so the bot will nudge on it from then on.
- You get a digest each weekly run: who was nudged, who isn't registered yet.

## Troubleshooting
- **Buttons do nothing** → **Run ▸ `getWebhookInfo`**: `url` should be your Worker and
  `last_error_message` empty. A `302` error means the webhook is pointed at `/exec`
  directly — repoint it at the Worker (`setWorkerWebhook`). If you're on the polling
  fallback instead, confirm a `pollUpdates` time-trigger exists. Either way, check the
  hidden `BotLog` tab for errors.
- **Error: "No BotID column — run initBot()"** → you skipped step 3.1. Run `initBot`.
- **A PIC sees "already linked to another account"** → that name is taken by a
  different Telegram chat (anti-impersonation). Fix the `BotRoster` tab by hand:
  delete the wrong row, have them `/start` again.
- **"Lead not found (sheet changed?)"** → a row was deleted; harmless. The BotID
  system tolerates sorting/filtering, only true row deletion drops a lead.
- **A PIC isn't nudged** → they're not in `BotRoster` (haven't `/start`ed), or
  their `PIC` name in the sheet doesn't match the name they picked.
- **Logs** → the hidden `BotLog` tab records every write; `View ▸ Executions` in
  the editor shows runtime errors.
