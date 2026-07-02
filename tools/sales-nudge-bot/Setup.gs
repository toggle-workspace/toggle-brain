/**
 * Setup.gs — one-time / occasional admin functions. Run these by hand from the
 * Apps Script editor (Run ▸ pick the function). See SETUP.md for the order.
 */

/**
 * STEP 1 — initialise. Creates the BotID column + helper tabs and registers a
 * stable id for every existing lead. Safe to run repeatedly.
 */
function initBot() {
  const sheet = getPipelineSheet_();
  ensureBotIdColumn_(sheet);          // the ONLY place that creates the BotID column
  const cols = getColumnMap_(sheet);
  backfillBotIds_(sheet, cols);
  rosterSheet_();
  getOrCreateSheet_(CONFIG.LOG_SHEET, ['ts', 'level', 'chat_id', 'botId', 'detail']);
  Logger.log('initBot done. BotID column + helper tabs ready.');
}

/**
 * STEP 2 — point Telegram at this web app. Requires the web app to be deployed
 * (Deploy ▸ New deployment ▸ Web app ▸ Execute as me ▸ Anyone) and the deployed
 * /exec URL stored in Script Property WEBAPP_URL (or it auto-detects).
 * Also requires Script Properties TELEGRAM_TOKEN and TELEGRAM_SECRET.
 */
function setWebhook() {
  const props = PropertiesService.getScriptProperties();
  const secret = props.getProperty(PROP_SECRET);
  if (!secret) throw new Error('Set Script Property ' + PROP_SECRET + ' first.');
  let url = props.getProperty('WEBAPP_URL');
  if (!url) { try { url = ScriptApp.getService().getUrl(); } catch (e) {} }
  if (!url) throw new Error('Deploy as web app, then set Script Property WEBAPP_URL to the /exec URL.');
  // getUrl() often returns the /dev URL (auth-walled, unreachable by Telegram).
  if (url.indexOf('/dev') !== -1) throw new Error('Got a /dev URL — set Script Property WEBAPP_URL to the deployed /exec URL.');

  const hookUrl = url + (url.indexOf('?') === -1 ? '?' : '&') + 'secret=' + encodeURIComponent(secret);
  const res = tgApi_('setWebhook', { url: hookUrl, allowed_updates: ['message', 'callback_query'] });
  Logger.log(JSON.stringify(res)); // response does not echo the URL, so the secret isn't logged
}

/** Check what Telegram thinks the webhook is (debugging). Secret is redacted. */
function getWebhookInfo() {
  const info = tgApi_('getWebhookInfo', {});
  if (info && info.result && info.result.url) {
    info.result.url = info.result.url.replace(/secret=[^&]*/, 'secret=***');
  }
  Logger.log(JSON.stringify(info, null, 2));
}

/**
 * STEP 2 (LIVE PATH) — point Telegram at the Cloudflare Worker proxy.
 * Apps Script /exec returns a 302 that Telegram won't follow, so we never set the
 * webhook to /exec directly (that's what the legacy setWebhook above does, and why
 * it failed). Instead Telegram talks to the Worker, which forwards to /exec.
 *
 * Requires Script Properties:
 *   WORKER_URL      the deployed Worker URL (from `wrangler deploy`)
 *   WEBHOOK_SECRET  the same secret_token configured as a Worker secret
 * See worker/README.md. After this succeeds, run removePollingTriggers().
 */
function setWorkerWebhook() {
  const props = PropertiesService.getScriptProperties();
  const workerUrl = props.getProperty('WORKER_URL');
  if (!workerUrl) throw new Error('Set Script Property WORKER_URL to your Cloudflare Worker URL first.');
  const secret = props.getProperty('WEBHOOK_SECRET');
  if (!secret) throw new Error('Set Script Property WEBHOOK_SECRET (must equal the Worker\'s WEBHOOK_SECRET).');
  const res = tgApi_('setWebhook', {
    url: workerUrl,
    secret_token: secret,
    allowed_updates: ['message', 'callback_query'],
    drop_pending_updates: true,
  });
  Logger.log(JSON.stringify(res)); // response echoes neither the secret_token nor the worker secret
}

/** Remove the webhook (e.g. to switch bots, or to fall back to polling). */
function deleteWebhook() {
  Logger.log(JSON.stringify(tgApi_('deleteWebhook', {})));
}

/**
 * STEP 3 — schedule the weekly nudge. Runs runDailyNudge() once a week, early
 * Sunday (~7am project time — Apps Script fires within the 7–8am window). Adjust
 * the hour/day to taste; runs in the project's timezone (set it to
 * Asia/Kuala_Lumpur in Project Settings). Safe to run repeatedly — clears old copies first.
 */
function createWeeklyTrigger() {
  removeTriggers();
  ScriptApp.newTrigger('runDailyNudge')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.SUNDAY)
    .atHour(7)
    .create();
  Logger.log('Weekly trigger created for ~Sunday 07:00 project time.');
}

function removeTriggers() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'runDailyNudge')
    .forEach(t => ScriptApp.deleteTrigger(t));
}

/** Dry run: log what TODAY's nudge would do without sending anything. */
function previewNudge() {
  const byPic = findStaleLeadsByPic_();
  const roster = getRoster_();
  Object.keys(byPic).sort().forEach(pic => {
    const reg = roster[pic] ? 'registered' : 'NOT REGISTERED';
    Logger.log(pic + ' (' + reg + '): ' + byPic[pic].length + ' stale — ' +
      byPic[pic].slice(0, CONFIG.MAX_NUDGES_PER_PIC).map(l => l.client).join(', '));
  });
}

/** Send yourself a test message to confirm the token works. Pass your chat_id. */
function testSend(chatId) {
  tgSendText_(chatId || (CONFIG.ADMIN_CHAT_IDS || [])[0],
    '✅ sales-nudge-bot test message. Token + send path work.');
}
