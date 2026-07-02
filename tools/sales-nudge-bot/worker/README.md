# sales-nudge-proxy — Cloudflare Worker

**What this is:** a tiny, free middleman that makes the Telegram bot reply fast
(~1–3 seconds instead of up to a minute).

**Do you need it?** Only if the bot feels slow. Without this Worker the bot still
works — it just checks for messages once a minute. Set this up once and replies
become near-instant. (The *why* is at the bottom if you're curious.)

---

## What you'll need first

Have these three values handy before you start. You set them up when you built
the bot (see the main `SETUP.md` one folder up):

| Name | What it looks like | Where you got it |
|---|---|---|
| **Apps Script URL** | `https://script.google.com/macros/s/XXXX/exec?secret=...` | The `/exec` URL of your bot, with `?secret=<TELEGRAM_SECRET>` on the end |
| **Telegram token** | `123456:ABC-DEF...` | From @BotFather when you made the bot |
| **A random password** | any long string, e.g. a UUID | Make one up now — used in steps 2 and 3. Keep it the same in both. |

> Tip: generate the random password by running `uuidgen` in your terminal, or
> just mash a long string. Write it down — you'll paste it twice.

---

## Setup — 4 steps, one time

### Step 1 — Install the tool and log in

```sh
npm install -g wrangler     # the Cloudflare command-line tool
wrangler login              # opens your browser; a free Cloudflare account is fine
```

### Step 2 — Deploy the Worker

```sh
cd tools/sales-nudge-bot/worker

wrangler secret put EXEC_URL
#   → paste your Apps Script URL (the long one with ?secret=... on the end)

wrangler secret put WEBHOOK_SECRET
#   → paste your random password

wrangler deploy
```

When `wrangler deploy` finishes it prints a **Worker URL** like
`https://sales-nudge-proxy.<you>.workers.dev`. **Copy it — you need it in step 3.**

### Step 3 — Tell Telegram to use the Worker

Run this, filling in your **Telegram token**, your **Worker URL** from step 2,
and the **same random password** from step 2:

```sh
curl "https://api.telegram.org/bot<TELEGRAM_TOKEN>/setWebhook" \
  -d url="<YOUR_WORKER_URL>" \
  -d secret_token="<YOUR_RANDOM_PASSWORD>" \
  -d drop_pending_updates=true \
  --data-urlencode 'allowed_updates=["message","callback_query"]'
```

You should see `{"ok":true,...}`.

### Step 4 — Turn off the old slow checker

In the Apps Script editor, open `Polling.gs` and run the function
**`removePollingTriggers`** once. That stops the bot from checking every minute,
since the Worker now delivers messages instantly.

✅ **Done.** Send the bot a message — the reply should land in 1–3 seconds.

---

## Check it's working

```sh
curl "https://api.telegram.org/bot<TELEGRAM_TOKEN>/getWebhookInfo"
```

Healthy output shows:
- `url` = your Worker URL
- `last_error_message` is empty
- `pending_update_count` is `0`

If something looks wrong there, the password in step 2 and step 3 probably don't
match. Redo step 3 with the correct one.

---

## If you ever want to undo it

Go back to the slow-but-simple polling mode:

1. In the Apps Script editor, run **`createPollingTrigger`** (`Polling.gs`).
2. Run this to disconnect the Worker:
   ```sh
   curl "https://api.telegram.org/bot<TELEGRAM_TOKEN>/deleteWebhook"
   ```

Nothing gets lost in the switch — Telegram holds onto messages until the bot
picks them up again.

---

## The "why" (optional reading)

Telegram needs a web address it can POST new messages to, and it expects an
instant `200 OK` back. Google Apps Script can't be that address directly — it
answers every request with a redirect (a `302`), which Telegram refuses to
follow. So normally the bot copes by *polling*: asking Telegram "any new
messages?" once a minute. That's why it can feel slow.

This Worker fixes that. It sits in the middle as the address Telegram talks to:

```
Telegram ──▶ Cloudflare Worker ──▶ Apps Script (your bot)
              returns 200 instantly    follows the redirect, replies
```

The Worker does no bot logic — it just receives the message, says "200 OK" to
keep Telegram happy, and passes the message along to your bot (following the
redirect that Telegram wouldn't). Your bot keeps doing all the real work and
writing to the Sheet exactly as before.

**It's free.** Cloudflare's free tier allows 100,000 requests/day. For a team of
~8 people that's hundreds of times more than you'll ever use.

### The two passwords, kept straight

There are two secret values in play. They guard the two hops:

| Secret | Set where | Stops |
|---|---|---|
| `WEBHOOK_SECRET` (your random password) | Worker (step 2) **and** Telegram (step 3) — must match | Strangers pretending to be Telegram |
| `TELEGRAM_SECRET` (the `?secret=...` in your Apps Script URL) | Inside `EXEC_URL` | Strangers pretending to be the Worker |

If the bot ignores you after setup, it's almost always because the
`WEBHOOK_SECRET` you put in step 2 and step 3 don't match.
