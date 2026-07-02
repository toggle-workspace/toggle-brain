/**
 * Telegram → Apps Script webhook proxy (Cloudflare Worker).
 *
 * Why this exists: Google Apps Script web apps answer every request with a 302
 * redirect, which Telegram refuses to follow ("Wrong response from the webhook:
 * 302 Moved Temporarily"). This Worker is the public webhook Telegram talks to.
 * It returns HTTP 200 immediately and forwards the update to the Apps Script
 * /exec URL (following the 302 itself), so doPost() runs and the bot replies —
 * within ~1–3s instead of the ~60s polling floor.
 *
 * The bot sends its replies via its own Telegram API calls (tgSendText_), NOT via
 * the webhook HTTP response, so returning 200 here before the forward finishes is
 * safe — Telegram just needs the 200 to stop retrying.
 *
 * Secrets (set with `wrangler secret put`, never commit — see README.md):
 *   EXEC_URL        the Apps Script /exec URL, INCLUDING ?secret=<TELEGRAM_SECRET>
 *   WEBHOOK_SECRET  must equal the secret_token passed to Telegram's setWebhook
 */
export default {
  async fetch(request, env, ctx) {
    if (request.method !== 'POST') {
      // Liveness probe only — carries no data.
      return new Response('sales-nudge-bot proxy is alive', { status: 200 });
    }

    // Fail CLOSED: only Telegram knows the secret_token. A missing/mismatched
    // token (or an unconfigured WEBHOOK_SECRET) is rejected before we touch
    // Apps Script — mirroring doPost()'s fail-closed guard.
    if (!env.WEBHOOK_SECRET ||
        request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== env.WEBHOOK_SECRET) {
      return new Response('forbidden', { status: 403 });
    }

    const body = await request.text();

    // Forward to Apps Script, but don't make Telegram wait on it. waitUntil keeps
    // the request alive after we return 200. redirect:'follow' chases the 302 to
    // googleusercontent.com so doPost actually executes.
    ctx.waitUntil(
      fetch(env.EXEC_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        redirect: 'follow',
      }).catch((e) => console.log('forward to Apps Script failed: ' + e))
    );

    return new Response('OK', { status: 200 });
  },
};
