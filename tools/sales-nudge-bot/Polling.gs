/**
 * Polling.gs — fallback transport that AVOIDS the webhook entirely.
 *
 * Google Apps Script web apps answer every request with a 302 redirect, and
 * Telegram doesn't reliably follow it (getWebhookInfo shows
 * "Wrong response from the webhook: 302 Moved Temporarily"). Instead of
 * receiving a webhook, this PULLS updates with getUpdates on a 1-minute timer.
 *
 * Webhook and polling are mutually exclusive — createPollingTrigger() deletes
 * the webhook first. With polling you do NOT need the web app deployment,
 * WEBAPP_URL, or setWebhook at all.
 */

function pollUpdates() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return; // a previous poll is still running — skip this tick
  try {
    const props = PropertiesService.getScriptProperties();
    let offset = parseInt(props.getProperty('TG_OFFSET') || '0', 10);

    for (let guard = 0; guard < 20; guard++) { // drain in batches; guard caps a runaway loop
      const res = tgApi_('getUpdates', { offset: offset, timeout: 0, allowed_updates: ['message', 'callback_query'] });
      if (!res.ok) {
        logBot_('POLL_ERR', '', 'getUpdates', JSON.stringify(res).slice(0, 300));
        if (res.error_code === 409) tgApi_('deleteWebhook', {}); // webhook still set → clear it
        break;
      }
      const updates = res.result || [];
      if (!updates.length) break;
      for (let i = 0; i < updates.length; i++) {
        const u = updates[i];
        try { handleUpdate_(u); } catch (e) { logBot_('ERROR', '', 'poll', String(e)); }
        offset = u.update_id + 1;
        props.setProperty('TG_OFFSET', String(offset)); // persist per-update so a crash never reprocesses
      }
    }
  } finally {
    lock.releaseLock();
  }
}

/**
 * Switch the bot to polling: drop the webhook, skip any stale queued updates,
 * and schedule a 1-minute poll. Run this once.
 */
function createPollingTrigger() {
  tgApi_('deleteWebhook', {});                 // webhook + polling can't coexist

  // Flush stale queued updates so we don't replay the broken-webhook backlog.
  const flush = tgApi_('getUpdates', { timeout: 0 });
  if (flush.ok && flush.result && flush.result.length) {
    const last = flush.result[flush.result.length - 1].update_id;
    PropertiesService.getScriptProperties().setProperty('TG_OFFSET', String(last + 1));
  }

  removePollingTriggers();
  ScriptApp.newTrigger('pollUpdates').timeBased().everyMinutes(1).create();
  Logger.log('Polling every 1 min. Webhook deleted, stale updates flushed.');
}

function removePollingTriggers() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'pollUpdates')
    .forEach(t => ScriptApp.deleteTrigger(t));
}
