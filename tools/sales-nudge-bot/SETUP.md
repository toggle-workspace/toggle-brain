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
   whoami - Show my chat id + name
   skip - Skip the note step
   stats - Stale-lead counts (all PICs)
   ```

## 2. Create the Apps Script project (5 min)

**Recommended: bind it to the sheet** so it has access automatically.

1. Open the sales tracker → **Extensions ▸ Apps Script**.
2. Delete the empty `Code.gs`. Create these files and paste each from this folder:
   `Config.gs`, `Main.gs`, `Telegram.gs`, `Setup.gs`.
3. **Project Settings** (gear icon):
   - Set **Time zone** = `Asia/Kuala_Lumpur`.
   - Under **Script Properties**, add:
     | Property | Value |
     |---|---|
     | `TELEGRAM_TOKEN` | the BotFather token |
     | `TELEGRAM_SECRET` | any long random string you make up (e.g. a UUID) |
   - (If you did NOT bind to the sheet, also confirm `SHEET_ID` in `Config.gs`.)
4. Confirm `Config.gs` → `SHEET_GID` matches the tab's `#gid=` in the sheet URL.

## 3. Initialise (2 min)

1. In the editor, **Run ▸ `initBot`**. Approve the OAuth prompt (it's your own
   script). This adds a `BotID` column to the pipeline tab and creates the hidden
   `BotRoster` / `BotLog` tabs.
2. **Run ▸ `previewNudge`** → View ▸ Logs. You should see each PIC and their
   stale-lead counts. No messages are sent. This proves detection works.

## 4. Deploy as a web app + connect the webhook (5 min)

1. **Deploy ▸ New deployment ▸ Web app.**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy → copy the **/exec URL**.
2. Back in **Script Properties**, add `WEBAPP_URL` = that /exec URL.
3. **Run ▸ `setWebhook`** → Logs should show `{"ok":true,...}`.
4. **Run ▸ `getWebhookInfo`** to confirm (url set, no errors).

> Re-deploying creates a new URL only if you choose "New deployment". Use
> **Manage deployments ▸ edit (pencil) ▸ New version** to keep the same URL after
> code changes — otherwise update `WEBAPP_URL` and re-run `setWebhook`.

## 5. Register the team (5 min)

1. You first: open the bot, `/start`, pick your name. Then send `/whoami` — copy
   your numeric `chat_id` into `Config.gs` → `ADMIN_CHAT_IDS` (so you get the
   manager digest + "not mine" alerts). Save.
2. Send each PIC the bot link (`t.me/<your_bot_username>`). They tap **Start**,
   pick their name once. Done — they appear in `BotRoster`.
3. `testSend(yourChatId)` to confirm sending works end to end.

## 6. Schedule it

**Run ▸ `createDailyTrigger`** — sends the daily nudge ~09:00 KL time. Change the
hour in `Setup.gs` if you like. To stop: `removeTriggers`.

---

## Daily life
- A PIC gets *"📋 Butterfly — stage? [Not started][In progress][Blocked][Completed]"*,
  taps through stage → warm/cold → optional note. The sheet updates and
  **Last Contact Date is stamped to today** automatically.
- `/stale` any time pulls their current list on demand.
- You get a digest each run: who was nudged, who isn't registered yet.

## Troubleshooting
- **Buttons do nothing** → webhook not set or wrong secret. Re-run `setWebhook`,
  check `getWebhookInfo` for `last_error_message`.
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
