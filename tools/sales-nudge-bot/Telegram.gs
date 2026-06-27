/**
 * Telegram.gs — Telegram API wrappers, update router, onboarding, the tappable
 * update flow, and write-back into the sheet.
 *
 * Messages use parse_mode = HTML (only <b>/<i> + escaped text). All dynamic,
 * sheet-derived text is run through escHtml_ before going into a message.
 */

// ---------------------------------------------------------------------------
// Low-level API
// ---------------------------------------------------------------------------

function tgToken_() {
  const t = PropertiesService.getScriptProperties().getProperty(PROP_TOKEN);
  if (!t) throw new Error('Missing Script Property: ' + PROP_TOKEN);
  return t;
}

function tgApi_(method, payload) {
  const res = UrlFetchApp.fetch('https://api.telegram.org/bot' + tgToken_() + '/' + method, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload || {}),
    muteHttpExceptions: true,
  });
  const body = JSON.parse(res.getContentText());
  if (!body.ok) logBot_('TG_ERR', '', method, res.getContentText());
  return body;
}

function tgSendText_(chatId, html, inlineKeyboard) {
  const payload = { chat_id: chatId, text: html, parse_mode: 'HTML', disable_web_page_preview: true };
  if (inlineKeyboard) payload.reply_markup = { inline_keyboard: inlineKeyboard };
  return tgApi_('sendMessage', payload);
}

function tgEditText_(chatId, messageId, html, inlineKeyboard) {
  const payload = { chat_id: chatId, message_id: messageId, text: html, parse_mode: 'HTML', disable_web_page_preview: true };
  if (inlineKeyboard) payload.reply_markup = { inline_keyboard: inlineKeyboard }; // omit → keyboard removed
  return tgApi_('editMessageText', payload);
}

function tgAnswerCallback_(callbackId, text) {
  return tgApi_('answerCallbackQuery', { callback_query_id: callbackId, text: text || '' });
}

function escHtml_(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Guard against spreadsheet formula injection: a value starting with = + - @
 *  (or a control char) becomes a live formula in Sheets. Prefix with ' to neutralise. */
function safeCell_(v) {
  const s = String(v == null ? '' : v);
  return /^[=+\-@\t\r]/.test(s) ? ("'" + s) : s;
}

function displayName_(from) {
  if (!from) return 'someone';
  return from.username ? ('@' + from.username) : (from.first_name || ('id' + from.id));
}

// ---------------------------------------------------------------------------
// Update router
// ---------------------------------------------------------------------------

function handleUpdate_(update) {
  if (update.callback_query) return handleCallback_(update.callback_query);
  if (update.message) return handleMessage_(update.message);
}

function handleMessage_(msg) {
  const chatId = msg.chat.id;
  const text = (msg.text || '').trim();

  if (text === '/start' || text === '/register') return startOnboarding_(chatId);
  if (text === '/whoami') {
    const pic = getPicByChat_(chatId);
    return tgSendText_(chatId, 'chat_id: <code>' + chatId + '</code>\nregistered as: <b>' + escHtml_(pic || '— not registered —') + '</b>');
  }
  if (text === '/stale' || text === '/mine') return sendMyStale_(chatId);
  if (text === '/skip') { clearPending_(chatId); return tgSendText_(chatId, 'Skipped 👍'); }
  if (text === '/stats') return handleStats_(chatId);

  // Otherwise: a free-text note for the lead we just asked about?
  const pending = getPending_(chatId);
  if (pending && text && text[0] !== '/') {
    appendNote_(chatId, pending.botId, text);
    clearPending_(chatId);
    return tgSendText_(chatId, 'Note saved on <b>' + escHtml_(pending.client) + '</b> ✅');
  }
}

// ---------------------------------------------------------------------------
// Onboarding: /start -> pick your name (by index) -> stored in BotRoster
// ---------------------------------------------------------------------------

function startOnboarding_(chatId) {
  const existing = getPicByChat_(chatId);
  if (existing) {
    return tgSendText_(chatId, 'You\'re registered as <b>' + escHtml_(existing) +
      '</b>. Tap below to re-pick, or send /stale to see your leads.', picKeyboard_());
  }
  tgSendText_(chatId, '👋 Welcome to the Toggle sales-nudge bot.\n\nWho are you? Pick your name as it appears in the tracker:', picKeyboard_());
}

/** Inline keyboard of PIC names. callback_data carries the INDEX (not the name),
 *  keeping it tiny and making impersonation of an arbitrary string impossible. */
function picKeyboard_() {
  const pics = getDistinctPics_();
  const rows = [];
  for (let i = 0; i < pics.length; i += 2) {
    rows.push(pics.slice(i, i + 2).map((p, j) => ({ text: p, callback_data: 'a|rg|' + (i + j) })));
  }
  return rows;
}

function getDistinctPics_() {
  const sheet = getPipelineSheet_();
  const cols = getColumnMap_(sheet);
  const firstRow = CONFIG.HEADER_ROW + 1;
  const n = sheet.getLastRow() - CONFIG.HEADER_ROW;
  if (n <= 0) return [];
  const vals = sheet.getRange(firstRow, cols.pic, n, 1).getValues();
  const seen = {};
  const out = [];
  vals.forEach(v => {
    const p = String(v[0]).trim();
    if (p && !seen[p.toLowerCase()]) { seen[p.toLowerCase()] = true; out.push(p); }
  });
  return out.sort(); // stable order so indices in callback_data stay meaningful within a session
}

// ---------------------------------------------------------------------------
// The tappable update flow
// ---------------------------------------------------------------------------

function sendLeadNudge_(chatId, lead) {
  const age = lead.days === null ? 'never contacted' : ('last touch ' + lead.days + 'd ago');
  const html = '📋 <b>' + escHtml_(lead.client) + '</b>\n' +
    'stage: <i>' + escHtml_(lead.stage) + '</i> · ' + escHtml_(age) + '\n\nWhat\'s the stage now?';
  tgSendText_(chatId, html, stageKeyboard_(lead.botId));
}

function stageKeyboard_(botId) {
  const rows = [CONFIG.STAGE_OPTIONS.map(o => ({ text: o.label, callback_data: 'a|st|' + botId + '|' + o.code }))];
  rows.push([
    { text: '💤 Snooze ' + CONFIG.SNOOZE_DAYS + 'd', callback_data: 'a|sz|' + botId },
    { text: '🔕 Not mine', callback_data: 'a|nm|' + botId },
  ]);
  return rows;
}

function statusKeyboard_(botId) {
  return [CONFIG.STATUS_OPTIONS.map(o => ({ text: o.label, callback_data: 'a|ls|' + botId + '|' + o.code }))
    .concat([{ text: 'Skip', callback_data: 'a|sk|' + botId }])];
}

/** Wrapper guarantees the button's spinner is always stopped, even on error. */
function handleCallback_(cb) {
  try {
    handleCallbackInner_(cb);
  } catch (err) {
    const chatId = cb && cb.message && cb.message.chat ? cb.message.chat.id : '';
    logBot_('ERROR', chatId, '', 'callback: ' + err + (err.stack ? '\n' + err.stack : ''));
    try { tgAnswerCallback_(cb.id, '⚠ Something went wrong, try again'); } catch (e) {}
  }
}

function handleCallbackInner_(cb) {
  const chatId = cb.message.chat.id;
  const messageId = cb.message.message_id;
  const parts = String(cb.data || '').split('|');
  const action = parts[1];

  // Registration — the only action allowed before you're registered. The name
  // is resolved from a server-side index, so you can't register as an arbitrary
  // string, and a name already claimed by a different chat is rejected.
  if (action === 'rg') {
    const pics = getDistinctPics_();
    const pic = pics[parseInt(parts[2], 10)];
    if (pic == null) { tgAnswerCallback_(cb.id, 'Unknown name — send /start again'); return; }
    const res = setRoster_(pic, chatId, displayName_(cb.from));
    if (!res.ok) {
      tgAnswerCallback_(cb.id, pic + ' is already linked to another account');
      tgEditText_(chatId, messageId, '⚠ <b>' + escHtml_(pic) + '</b> is already linked to another Telegram account. If that\'s wrong, ask an admin to fix the BotRoster tab.');
      notifyAdmins_('⚠ ' + escHtml_(displayName_(cb.from)) + ' tried to register as <b>' + escHtml_(pic) + '</b> (already claimed).');
      return;
    }
    tgAnswerCallback_(cb.id, 'Registered as ' + pic);
    tgEditText_(chatId, messageId, '✅ You\'re registered as <b>' + escHtml_(pic) + '</b>. Send /stale to see your leads.');
    notifyAdmins_('✅ New registration: <b>' + escHtml_(pic) + '</b> (' + escHtml_(displayName_(cb.from)) + ')');
    return;
  }

  const callerPic = getPicByChat_(chatId);
  if (!callerPic) { tgAnswerCallback_(cb.id, 'Send /start first'); return; }

  const botId = parts[2];
  const sheet = getPipelineSheet_();
  const cols = getColumnMap_(sheet);
  const row = findRowByBotId_(sheet, cols, botId);
  if (row === -1) { tgAnswerCallback_(cb.id, 'Lead not found (sheet changed?)'); return; }

  // Authorization: only your own leads (admins, any).
  const leadPic = String(sheet.getRange(row, cols.pic).getValue()).trim();
  if (leadPic.toLowerCase() !== callerPic.toLowerCase() && !isAdmin_(chatId)) {
    tgAnswerCallback_(cb.id, 'That\'s ' + leadPic + '\'s lead, not yours');
    return;
  }
  const clientRaw = String(sheet.getRange(row, cols.client).getValue()).trim();
  const client = escHtml_(clientRaw);

  if (action === 'st') {
    const label = codeToLabel_(CONFIG.STAGE_OPTIONS, parts[3]);
    withLock_(function () { writeCell_(sheet, row, cols.stage, label); stamp_(sheet, row, cols); });
    logBot_('STAGE', chatId, botId, callerPic + ' -> ' + label);
    tgAnswerCallback_(cb.id, 'Stage: ' + label);
    tgEditText_(chatId, messageId, '📋 <b>' + client + '</b>\nStage → <b>' + escHtml_(label) + '</b> ✅\n\nWarm or cold?', statusKeyboard_(botId));
    return;
  }
  if (action === 'ls') {
    const label = codeToLabel_(CONFIG.STATUS_OPTIONS, parts[3]);
    withLock_(function () { writeCell_(sheet, row, cols.status, label); stamp_(sheet, row, cols); });
    setPendingNote_(chatId, botId, clientRaw);
    logBot_('STATUS', chatId, botId, callerPic + ' -> ' + label);
    tgAnswerCallback_(cb.id, 'Status: ' + label);
    tgEditText_(chatId, messageId, '📋 <b>' + client + '</b>\nUpdated ✅\n\nAdd a note for <b>' + client + '</b>? Just reply, or send /skip.');
    return;
  }
  if (action === 'sk') {
    clearPending_(chatId);
    tgAnswerCallback_(cb.id, 'Done');
    tgEditText_(chatId, messageId, '📋 <b>' + client + '</b> — updated ✅');
    return;
  }
  if (action === 'sz') {
    setSnooze_(botId, Date.now() + CONFIG.SNOOZE_DAYS * 86400000);
    logBot_('SNOOZE', chatId, botId, callerPic);
    tgAnswerCallback_(cb.id, 'Snoozed ' + CONFIG.SNOOZE_DAYS + 'd');
    tgEditText_(chatId, messageId, '📋 <b>' + client + '</b> — snoozed ' + CONFIG.SNOOZE_DAYS + ' days 💤');
    return;
  }
  if (action === 'nm') {
    tgAnswerCallback_(cb.id, 'Noted');
    tgEditText_(chatId, messageId, '📋 <b>' + client + '</b> — flagged "not mine". Reassign the PIC in the sheet.');
    notifyAdmins_('🔕 ' + escHtml_(callerPic) + ' says <b>' + client + '</b> is not their lead — check the PIC column.');
    return;
  }
  tgAnswerCallback_(cb.id, '');
}

// ---------------------------------------------------------------------------
// Write-back helpers
// ---------------------------------------------------------------------------

function writeCell_(sheet, row, col, value) {
  sheet.getRange(row, col).setValue(safeCell_(value));
}

/** Stamp Last Contact Date = today (the single most valuable side effect). */
function stamp_(sheet, row, cols) {
  sheet.getRange(row, cols.lastContact).setValue(todayStr_());
}

function appendNote_(chatId, botId, note) {
  withLock_(function () {
    const sheet = getPipelineSheet_();
    const cols = getColumnMap_(sheet);
    const row = findRowByBotId_(sheet, cols, botId);
    if (row === -1) return;
    const cell = sheet.getRange(row, cols.updates);
    const existing = String(cell.getValue()).trim();
    const dated = todayStr_() + ': ' + note;
    cell.setValue(safeCell_(existing ? dated + '\n' + existing : dated));
    sheet.getRange(row, cols.lastContact).setValue(todayStr_());
  });
  logBot_('NOTE', chatId, botId, 'len=' + note.length); // redacted — body is already in the sheet
}

function codeToLabel_(options, code) {
  const found = options.filter(o => o.code === code)[0];
  return found ? found.label : code;
}

// ---------------------------------------------------------------------------
// "Show me my stale leads now"
// ---------------------------------------------------------------------------

function sendMyStale_(chatId) {
  const pic = getPicByChat_(chatId);
  if (!pic) return startOnboarding_(chatId);
  const all = findStaleLeadsByPic_()[pic] || [];
  const leads = all.slice(0, CONFIG.MAX_NUDGES_PER_PIC);
  if (!leads.length) return tgSendText_(chatId, 'Nothing stale on your plate 🎉');
  const more = all.length - leads.length;
  tgSendText_(chatId, '<b>' + escHtml_(pic) + '</b> — ' + all.length + ' to update' +
    (more > 0 ? ' (showing ' + leads.length + ', send /stale again for the rest)' : '') + ':');
  leads.forEach(l => sendLeadNudge_(chatId, l));
}

function handleStats_(chatId) {
  const byPic = findStaleLeadsByPic_();
  const lines = Object.keys(byPic).sort().map(p => p + ': ' + byPic[p].length);
  const total = Object.keys(byPic).reduce((a, p) => a + byPic[p].length, 0);
  tgSendText_(chatId, '<b>Stale leads (' + total + ')</b>\n' + escHtml_(lines.join('\n') || 'none 🎉'));
}

// ---------------------------------------------------------------------------
// Roster / pending / snooze / log (storage)
// ---------------------------------------------------------------------------

function rosterSheet_() {
  return getOrCreateSheet_(CONFIG.ROSTER_SHEET, ['PIC', 'chat_id', 'tg_username', 'registered_at']);
}

function getRoster_() {
  const sh = rosterSheet_();
  const n = sh.getLastRow() - 1;
  const map = {};
  if (n <= 0) return map;
  sh.getRange(2, 1, n, 2).getValues().forEach(r => {
    const pic = String(r[0]).trim();
    const chat = String(r[1]).trim();
    if (pic && chat) map[pic] = chat;
  });
  return map;
}

function getPicByChat_(chatId) {
  const sh = rosterSheet_();
  const n = sh.getLastRow() - 1;
  if (n <= 0) return null;
  const rows = sh.getRange(2, 1, n, 2).getValues();
  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i][1]).trim() === String(chatId).trim()) return String(rows[i][0]).trim();
  }
  return null;
}

/**
 * Upsert a PIC↔chat mapping. One identity per chat. Returns {ok:false,
 * reason:'claimed'} if the name is already bound to a DIFFERENT chat (prevents
 * name-collision account takeover).
 */
function setRoster_(pic, chatId, username) {
  return withLock_(function () {
    const sh = rosterSheet_();
    const n = sh.getLastRow() - 1;
    const rows = n > 0 ? sh.getRange(2, 1, n, 4).getValues() : [];
    let chatRow = -1;
    for (let i = 0; i < rows.length; i++) {
      const rPic = String(rows[i][0]).trim();
      const rChat = String(rows[i][1]).trim();
      if (rPic.toLowerCase() === pic.toLowerCase() && rChat !== String(chatId).trim()) {
        return { ok: false, reason: 'claimed' };
      }
      if (rChat === String(chatId).trim()) chatRow = i;
    }
    if (chatRow !== -1) {
      sh.getRange(chatRow + 2, 1, 1, 4).setValues([[pic, chatId, username, todayStr_()]]);
    } else {
      sh.appendRow([pic, chatId, username, todayStr_()]);
    }
    return { ok: true };
  });
}

function getPending_(chatId) {
  const raw = PropertiesService.getScriptProperties().getProperty('PEND_' + chatId);
  if (!raw) return null;
  let o;
  try { o = JSON.parse(raw); } catch (e) { return null; }
  if (!o || !o.ts || (Date.now() - o.ts) > CONFIG.PENDING_TTL_MIN * 60000) {
    clearPending_(chatId);
    return null;
  }
  return o; // { botId, client, ts }
}
function setPendingNote_(chatId, botId, client) {
  PropertiesService.getScriptProperties().setProperty('PEND_' + chatId,
    JSON.stringify({ botId: botId, client: client, ts: Date.now() }));
}
function clearPending_(chatId) {
  PropertiesService.getScriptProperties().deleteProperty('PEND_' + chatId);
}

function getSnoozeMap_() {
  const raw = PropertiesService.getScriptProperties().getProperty('SNOOZE_MAP');
  return raw ? JSON.parse(raw) : {};
}
function setSnooze_(botId, untilMillis) {
  withLock_(function () {
    const props = PropertiesService.getScriptProperties();
    const raw = props.getProperty('SNOOZE_MAP');
    const map = raw ? JSON.parse(raw) : {};
    const now = Date.now();
    Object.keys(map).forEach(k => { if (map[k] < now) delete map[k]; }); // prune expired → bounded size
    map[botId] = untilMillis;
    props.setProperty('SNOOZE_MAP', JSON.stringify(map));
  });
}

function logBot_(level, chatId, botId, detail) {
  try {
    const sh = getOrCreateSheet_(CONFIG.LOG_SHEET, ['ts', 'level', 'chat_id', 'botId', 'detail']);
    sh.appendRow([new Date(), level, chatId, botId, detail]);
  } catch (e) { /* never let logging break the bot */ }
}

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------

function isAdmin_(chatId) {
  return (CONFIG.ADMIN_CHAT_IDS || []).map(String).indexOf(String(chatId)) !== -1;
}
function notifyAdmins_(html) {
  (CONFIG.ADMIN_CHAT_IDS || []).forEach(id => tgSendText_(id, html));
}
