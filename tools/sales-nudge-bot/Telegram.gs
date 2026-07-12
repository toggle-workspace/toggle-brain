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
  if (text === '/skip') return handleSkip_(chatId);
  if (text === '/stats') return handleStats_(chatId);
  if (text === '/newlead') return startNewlead_(chatId);
  // /update [optional client filter] — pick any of your leads to update / note.
  if (text === '/update' || text.indexOf('/update ') === 0) return startUpdate_(chatId, text.slice(7).trim());

  // Otherwise: a free-text reply continuing a flow we started (a note, or /newlead).
  const pending = getPending_(chatId);
  if (!pending) return;
  if (pending.flow === 'newlead') {
    if (text && text[0] !== '/') return advanceNewlead_(chatId, pending, text);
    // Empty or a stray slash mid-flow — guide instead of silently dropping it.
    return tgSendText_(chatId, 'Type the ' + newleadStepLabel_(pending.step) + ', or send /skip to stop.');
  }
  // Typing while the /update list is open re-filters it by client name — a second
  // way to find a lead that's on a later page, without knowing the exact name.
  if (pending.flow === 'updatelist') {
    if (text && text[0] !== '/') return startUpdate_(chatId, text);
    return;
  }
  if (pending.flow === 'note' && text && text[0] !== '/') {
    appendNote_(chatId, pending.botId, text);
    clearPending_(chatId);
    return tgSendText_(chatId, 'Note saved on <b>' + escHtml_(pending.client) + '</b> ✅');
  }
}

/** /skip finalises a /newlead (no note) mid-flow, or cancels it before the notes
 *  step, or — outside /newlead — just clears a pending note prompt. */
function handleSkip_(chatId) {
  const p = getPending_(chatId);
  if (p && p.flow === 'newlead') {
    if (p.step === 'notes') return finalizeNewlead_(chatId, p, '');
    clearPending_(chatId);
    return tgSendText_(chatId, 'New lead cancelled 🚫');
  }
  clearPending_(chatId);
  return tgSendText_(chatId, 'Skipped 👍');
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
// /newlead — any registered PIC adds a row in a few taps:
//   client name (typed) -> PIC (tap a name, or type a new one) -> note (typed,
//   or /skip). State machine lives in the same PEND_<chatId> pending store as the
//   note flow, discriminated by `flow: 'newlead'` and advanced by `step`.
// ---------------------------------------------------------------------------

function startNewlead_(chatId) {
  if (!getPicByChat_(chatId)) {
    return tgSendText_(chatId, 'Send /start to register first, then /newlead.');
  }
  setPending_(chatId, { flow: 'newlead', step: 'client' });
  tgSendText_(chatId, '🆕 <b>New lead</b>\n\nWhat\'s the client / company name?');
}

/** Human label for the field a /newlead step is waiting on (used in re-prompts). */
function newleadStepLabel_(step) {
  return step === 'client' ? 'client / company name'
       : (step === 'pic' || step === 'pic_typed') ? 'PIC name'
       : 'note';
}

/** Inline keyboard of the GIVEN PIC names for /newlead, plus a "type a new name"
 *  escape hatch. callback_data carries the index into that list (or 'new'). The
 *  list is snapshotted into pending state (picOptions) so the index still resolves
 *  to the same name at tap time, even if the sheet's PIC set changes meanwhile. */
function newleadPicKeyboard_(pics) {
  const rows = [];
  for (let i = 0; i < pics.length; i += 2) {
    rows.push(pics.slice(i, i + 2).map((p, j) => ({ text: p, callback_data: 'a|np|' + (i + j) })));
  }
  rows.push([{ text: '➕ Someone else (type a name)', callback_data: 'a|np|new' }]);
  return rows;
}

/** Advance the /newlead flow on a free-text reply (the PIC step is normally a tap,
 *  but a typed name here is accepted as the PIC too). */
function advanceNewlead_(chatId, pending, text) {
  if (pending.step === 'client') {
    const pics = getDistinctPics_();
    setPending_(chatId, { flow: 'newlead', step: 'pic', client: text, picOptions: pics });
    return tgSendText_(chatId, '🆕 <b>' + escHtml_(text) + '</b>\n\nWho\'s the PIC? Tap a name or type one:', newleadPicKeyboard_(pics));
  }
  if (pending.step === 'pic' || pending.step === 'pic_typed') {
    setPending_(chatId, { flow: 'newlead', step: 'notes', client: pending.client, pic: text });
    return tgSendText_(chatId, '🆕 <b>' + escHtml_(pending.client) + '</b>\nPIC → <b>' + escHtml_(text) + '</b> ✅\n\nAdd a note (or send /skip):');
  }
  if (pending.step === 'notes') {
    return finalizeNewlead_(chatId, pending, text);
  }
}

function finalizeNewlead_(chatId, pending, notes) {
  if (!pending.client || !pending.pic) {           // defensive: incomplete state
    clearPending_(chatId);
    return tgSendText_(chatId, 'That new lead expired — send /newlead to start over.');
  }
  const callerPic = getPicByChat_(chatId);
  appendLead_(chatId, { client: pending.client, pic: pending.pic, notes: notes || '' }, callerPic);
  clearPending_(chatId);

  // Ping the assigned PIC (if they're on the bot and aren't the one who added it).
  const notified = notifyPicOfNewLead_(pending.pic, pending.client, notes, callerPic, chatId);

  let confirm = '✅ Added <b>' + escHtml_(pending.client) + '</b> (PIC: <b>' + escHtml_(pending.pic) + '</b>) to the tracker.';
  if (notified) confirm += '\n📨 ' + escHtml_(pending.pic) + ' has been notified.';
  tgSendText_(chatId, confirm);

  notifyAdmins_('🆕 ' + escHtml_(callerPic) + ' added a lead: <b>' + escHtml_(pending.client) + '</b> (PIC: ' + escHtml_(pending.pic) + ').');
}

/** DM the assigned PIC that a new lead landed on their plate. Returns true only if a
 *  message was actually sent — i.e. the PIC is registered and isn't the person who
 *  just added it (who already got the confirmation). */
function notifyPicOfNewLead_(pic, client, note, addedBy, adderChatId) {
  const chatId = getChatByPic_(pic);
  if (!chatId) return false;                                 // PIC not on the bot yet
  if (String(chatId) === String(adderChatId)) return false;  // they added it themselves
  let msg = '🆕 <b>New lead assigned to you</b>\n' +
            '<b>' + escHtml_(client) + '</b> — added by ' + escHtml_(addedBy) + '.';
  if (note) msg += '\n📝 ' + escHtml_(note);
  msg += '\n\nSend /stale to see all your leads.';
  const res = tgSendText_(chatId, msg);
  return !!(res && res.ok);   // only claim "notified" if Telegram accepted the send
}

/** Callback for the /newlead PIC keyboard (action 'np'): a tapped name index or
 *  'new' (→ ask them to type a name). Advances pending state to the notes step. */
function handleNewleadPic_(cb, chatId, messageId, idxOrNew) {
  const pending = getPending_(chatId);
  if (!pending || pending.flow !== 'newlead') { tgAnswerCallback_(cb.id, 'Start with /newlead'); return; }
  if (idxOrNew === 'new') {
    setPending_(chatId, { flow: 'newlead', step: 'pic_typed', client: pending.client });
    tgAnswerCallback_(cb.id, 'Type the name');
    tgEditText_(chatId, messageId, '🆕 <b>' + escHtml_(pending.client) + '</b>\nType the PIC\'s name:');
    return;
  }
  const pics = pending.picOptions || getDistinctPics_();   // resolve against the snapshot shown
  const pic = pics[parseInt(idxOrNew, 10)];
  if (pic == null) { tgAnswerCallback_(cb.id, 'Unknown name — type it instead'); return; }
  setPending_(chatId, { flow: 'newlead', step: 'notes', client: pending.client, pic: pic });
  tgAnswerCallback_(cb.id, 'PIC: ' + pic);
  tgEditText_(chatId, messageId, '🆕 <b>' + escHtml_(pending.client) + '</b>\nPIC → <b>' + escHtml_(pic) + '</b> ✅\n\nAdd a note (or send /skip):');
}

// ---------------------------------------------------------------------------
// /update — pick ANY of your leads (not just stale ones) and update it:
//   /update           -> paged list of your leads as buttons (stalest first)
//   /update <name>     -> same, filtered to clients matching <name>
//   ◀ Back / More ▶   -> page through the list (action 'um') — so a PIC with a
//                         long book can reach every lead, not just the first page
//   tap a lead (action 'up') -> the update card (stage / status / note / snooze)
// The page position (query + offset) lives in the PEND_<chatId> store as
// flow:'updatelist'. Per-lead PIC authorization, the stage/status/snooze writes,
// and the note flow are the same handlers the daily nudge card uses.
// ---------------------------------------------------------------------------

function startUpdate_(chatId, query) {
  const pic = getPicByChat_(chatId);
  if (!pic) return tgSendText_(chatId, 'Send /start to register first, then /update.');
  setPending_(chatId, { flow: 'updatelist', query: query || '', offset: 0 });
  renderUpdatePage_(chatId, null); // null messageId → send a fresh message
}

/**
 * Render (or, with a messageId, re-render in place) one page of the caller's
 * leads. Reads the current query + offset from pending state; re-fetches the
 * list each time so freshly-changed leads re-sort correctly. Adds ◀ Back / More ▶
 * buttons only when there's actually another page in that direction.
 */
function renderUpdatePage_(chatId, messageId) {
  const pic = getPicByChat_(chatId);
  if (!pic) return tgSendText_(chatId, 'Send /start to register first, then /update.');

  const pending = getPending_(chatId);
  const isList = pending && pending.flow === 'updatelist';
  const query = isList ? (pending.query || '') : '';
  let offset = isList ? (pending.offset || 0) : 0;

  const leads = getLeadsForPic_(pic, query);
  const total = leads.length;
  if (!total) {
    clearPending_(chatId);
    const msg = query
      ? 'None of your leads match "<b>' + escHtml_(query) + '</b>". Send /update on its own to see them all.'
      : 'You have no leads in the tracker yet. Add one with /newlead.';
    return messageId ? tgEditText_(chatId, messageId, msg) : tgSendText_(chatId, msg);
  }

  const page = CONFIG.MAX_UPDATE_LIST;
  if (offset >= total) offset = Math.max(0, total - page); // clamp if the list shrank
  if (offset < 0) offset = 0;
  const slice = leads.slice(offset, offset + page);

  // One lead per row; button text is the client (+ current stage for context).
  const rows = slice.map(l => [{ text: l.client + ' · ' + l.stage, callback_data: 'a|up|' + l.botId }]);
  const nav = [];
  if (offset > 0) nav.push({ text: '◀ Back', callback_data: 'a|um|prev' });
  if (offset + page < total) nav.push({ text: 'More ▶', callback_data: 'a|um|next' });
  if (nav.length) rows.push(nav);

  const from = offset + 1, to = offset + slice.length;
  let header = '🛠 <b>Update a lead</b> — tap one of yours:';
  header += '\n<i>(' + from + '–' + to + ' of ' + total +
    (query ? ' matching "' + escHtml_(query) + '"' : '') +
    (total > page ? ' · ◀ Back / More ▶ to page' : '') + ')</i>';

  setPending_(chatId, { flow: 'updatelist', query: query, offset: offset }); // persist clamped offset (+ refresh TTL)
  if (messageId) tgEditText_(chatId, messageId, header, rows);
  else tgSendText_(chatId, header, rows);
}

/** Header for a lead's update card: client + where it stands right now. */
function updateCardHtml_(lead) {
  const age = lead.days === null ? 'never contacted' : ('last touch ' + lead.days + 'd ago');
  return '📋 <b>' + escHtml_(lead.client) + '</b>\n' +
    'stage: <i>' + escHtml_(lead.stage) + '</i> · status: <i>' + escHtml_(lead.status) + '</i> · ' + escHtml_(age) +
    '\n\nChange the stage or status, add a note, or snooze:';
}

/** Stage buttons chunked 2-per-row — the stage labels ("Pitch In Progress")
 *  are too long to sit in a single row without Telegram truncating them. */
function stageButtonRows_(botId) {
  const rows = [];
  const opts = CONFIG.STAGE_OPTIONS;
  for (let i = 0; i < opts.length; i += 2) {
    rows.push(opts.slice(i, i + 2).map(o => ({ text: o.label, callback_data: 'a|st|' + botId + '|' + o.code })));
  }
  return rows;
}

/** Buttons on a lead's update card. Stage/status/snooze reuse the existing
 *  callback actions; '📝 Add note' (action 'nt') is the note-only shortcut. */
function updateCardKeyboard_(botId) {
  const rows = stageButtonRows_(botId);
  rows.push(CONFIG.STATUS_OPTIONS.map(o => ({ text: o.label, callback_data: 'a|ls|' + botId + '|' + o.code })));
  rows.push([
    { text: '📝 Add note', callback_data: 'a|nt|' + botId },
    { text: '💤 Snooze ' + CONFIG.SNOOZE_DAYS + 'd', callback_data: 'a|sz|' + botId },
  ]);
  return rows;
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
  const rows = stageButtonRows_(botId);
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

  // /newlead PIC picker — parts[2] is a name index or 'new', not a botId, so this
  // must be handled before the botId-based row lookup below.
  if (action === 'np') return handleNewleadPic_(cb, chatId, messageId, parts[2]);

  // /update paging — parts[2] is 'prev'/'next', not a botId. Shift the offset and
  // re-render the same message. Also handled before the botId lookup.
  if (action === 'um') {
    const pending = getPending_(chatId);
    if (!pending || pending.flow !== 'updatelist') { tgAnswerCallback_(cb.id, 'Send /update again'); return; }
    const delta = parts[2] === 'prev' ? -CONFIG.MAX_UPDATE_LIST : CONFIG.MAX_UPDATE_LIST;
    setPending_(chatId, { flow: 'updatelist', query: pending.query || '', offset: (pending.offset || 0) + delta });
    tgAnswerCallback_(cb.id, '');
    return renderUpdatePage_(chatId, messageId); // re-render in place; renderUpdatePage_ clamps the offset
  }

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

  // /update picker → open the update card for this lead (read its current state).
  if (action === 'up') {
    const last = parseDate_(sheet.getRange(row, cols.lastContact).getValue());
    const lead = {
      client: clientRaw,
      stage: String(sheet.getRange(row, cols.stage).getValue()).trim() || '(blank)',
      status: String(sheet.getRange(row, cols.status).getValue()).trim() || '(blank)',
      days: last === null ? null : daysSince_(last),
    };
    clearPending_(chatId); // leaving the list → end the paging/filter flow
    tgAnswerCallback_(cb.id, '');
    tgEditText_(chatId, messageId, updateCardHtml_(lead), updateCardKeyboard_(botId));
    return;
  }

  // Note-only shortcut (from the update card): straight to the "type a note" prompt,
  // no stage/status change required. The reply is saved by the 'note' flow in
  // handleMessage_ via appendNote_ (which also stamps Last Contact Date).
  if (action === 'nt') {
    setPendingNote_(chatId, botId, clientRaw);
    logBot_('NOTE_PROMPT', chatId, botId, callerPic);
    tgAnswerCallback_(cb.id, 'Type your note');
    tgEditText_(chatId, messageId, '📋 <b>' + client + '</b>\n\n📝 Type a note — just reply, or send /skip.');
    return;
  }

  if (action === 'st') {
    const label = codeToLabel_(CONFIG.STAGE_OPTIONS, parts[3]);
    withLock_(function () { writeCell_(sheet, row, cols.stage, label); stamp_(sheet, row, cols); });
    logBot_('STAGE', chatId, botId, callerPic + ' -> ' + label);
    tgAnswerCallback_(cb.id, 'Stage: ' + label);
    // Warm/cold only means something while we're still chasing the lead. For a
    // resolved stage (Active / Dead / Closed — anything off the nudge allowlist)
    // skip the temperature question and go straight to an optional note, which is
    // the natural place to capture *why* (e.g. reason lost / won).
    if (isNudgeStage_(label)) {
      tgEditText_(chatId, messageId, '📋 <b>' + client + '</b>\nStage → <b>' + escHtml_(label) + '</b> ✅\n\nWarm or cold?', statusKeyboard_(botId));
    } else {
      setPendingNote_(chatId, botId, clientRaw);
      tgEditText_(chatId, messageId, '📋 <b>' + client + '</b>\nStage → <b>' + escHtml_(label) + '</b> ✅\n\nAdd a note (or send /skip):');
    }
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

/** Append a brand-new lead row (from /newlead). Generates a fresh BotID, stamps
 *  Last Contact Date = today, sets the default stage, and runs every
 *  user-supplied value through safeCell_ (formula-injection guard). */
function appendLead_(chatId, fields, callerPic) {
  const botId = withLock_(function () {
    const sheet = getPipelineSheet_();
    const cols = getColumnMap_(sheet);
    const width = Math.max(sheet.getLastColumn(), cols.botId);
    const row = new Array(width).fill('');
    const id = Utilities.getUuid();
    const today = todayStr_();
    row[cols.client - 1]      = safeCell_(fields.client);
    row[cols.pic - 1]         = safeCell_(fields.pic);
    row[cols.stage - 1]       = CONFIG.NEWLEAD_STAGE;
    row[cols.lastContact - 1] = today;
    // safeCell_ guards the cell's FIRST character — the only thing Sheets evaluates
    // as a formula. The date prefix keeps that char a digit today; keep the wrap so a
    // future reformat that puts user text first stays guarded.
    if (fields.notes) row[cols.updates - 1] = safeCell_(today + ': ' + fields.notes);
    row[cols.botId - 1]       = id;
    sheet.appendRow(row);
    return id;
  });
  logBot_('NEWLEAD', chatId, botId,   // logged outside the lock — matches appendNote_
    callerPic + ' added "' + fields.client + '" pic=' + fields.pic + ' note_len=' + (fields.notes ? fields.notes.length : 0));
  return botId;
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

/** Reverse of getPicByChat_: a registered PIC's chat_id by name (case-insensitive),
 *  or null if that PIC hasn't registered. */
function getChatByPic_(pic) {
  if (!pic) return null;
  const roster = getRoster_();
  const want = String(pic).trim().toLowerCase();
  const keys = Object.keys(roster);
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].trim().toLowerCase() === want) return roster[keys[i]];
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
  return o; // { flow, ts, ... } — 'note': {botId, client}; 'newlead': {step, client?, pic?}
}
/** Store an arbitrary pending-flow object (TTL via the ts we stamp here). */
function setPending_(chatId, obj) {
  const o = Object.assign({}, obj, { ts: Date.now() });
  PropertiesService.getScriptProperties().setProperty('PEND_' + chatId, JSON.stringify(o));
}
function setPendingNote_(chatId, botId, client) {
  setPending_(chatId, { flow: 'note', botId: botId, client: client });
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
