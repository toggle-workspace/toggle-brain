/**
 * Main.gs — sheet access, stale-lead detection, the daily nudge job, and the
 * Telegram webhook entry point (doPost).
 */

const UNASSIGNED = '(unassigned)'; // bucket for stale leads with a blank PIC

// ---------------------------------------------------------------------------
// Concurrency — Apps Script runs webhook calls + the daily trigger in parallel.
// Every read-modify-write of the sheet or Script Properties goes through this.
// ---------------------------------------------------------------------------

function withLock_(fn) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // ms; throws if it can't get the lock — caller's catch logs it
  try { return fn(); } finally { lock.releaseLock(); }
}

// ---------------------------------------------------------------------------
// Spreadsheet helpers
// ---------------------------------------------------------------------------

function getSpreadsheet_() {
  if (CONFIG.SHEET_ID) return SpreadsheetApp.openById(CONFIG.SHEET_ID);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('No SHEET_ID set and script is not bound to a sheet.');
  return ss;
}

/** Resolve the active-pipeline tab by its gid (stable across renames). */
function getPipelineSheet_() {
  const ss = getSpreadsheet_();
  const byGid = ss.getSheets().filter(s => s.getSheetId() === CONFIG.SHEET_GID)[0];
  if (!byGid) throw new Error('No tab with gid ' + CONFIG.SHEET_GID + ' in the sheet.');
  return byGid;
}

/** Get (or lazily create) a helper tab by name. */
function getOrCreateSheet_(name, headers) {
  const ss = getSpreadsheet_();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    if (headers) sh.appendRow(headers);
    sh.hideSheet();
  }
  return sh;
}

const normHeader_ = s => String(s == null ? '' : s).trim().toLowerCase();

/**
 * Map column title -> 1-based index by reading the header row. Throws on any
 * missing column (including BotID) so misconfiguration fails loudly. This
 * function NEVER mutates the sheet — run initBot() once to create the BotID
 * column first (Setup.gs).
 */
function getColumnMap_(sheet) {
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(CONFIG.HEADER_ROW, 1, 1, lastCol).getValues()[0];
  const map = {};
  headers.forEach((h, i) => { map[normHeader_(h)] = i + 1; });

  const resolved = {};
  Object.keys(CONFIG.COLS).forEach(key => {
    const idx = map[normHeader_(CONFIG.COLS[key])];
    if (!idx) throw new Error('Column not found in sheet: "' + CONFIG.COLS[key] + '"');
    resolved[key] = idx;
  });

  const botTitle = normHeader_(CONFIG.BOTID_COL_TITLE);
  const dupes = headers.filter(h => normHeader_(h) === botTitle).length;
  if (dupes > 1) throw new Error('Multiple "' + CONFIG.BOTID_COL_TITLE + '" columns found — delete the extras.');
  if (!map[botTitle]) throw new Error('No "' + CONFIG.BOTID_COL_TITLE + '" column — run initBot() once (Setup.gs).');
  resolved.botId = map[botTitle];
  return resolved;
}

/** Create the BotID column if absent. initBot()-only (the one place that mutates structure). */
function ensureBotIdColumn_(sheet) {
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(CONFIG.HEADER_ROW, 1, 1, lastCol).getValues()[0];
  const has = headers.map(normHeader_).indexOf(normHeader_(CONFIG.BOTID_COL_TITLE)) !== -1;
  if (!has) sheet.getRange(CONFIG.HEADER_ROW, lastCol + 1).setValue(CONFIG.BOTID_COL_TITLE);
}

/** Give every data row a unique BotID. Regenerates blanks AND duplicates. */
function backfillBotIds_(sheet, cols) {
  withLock_(function () {
    const firstRow = CONFIG.HEADER_ROW + 1;
    const n = sheet.getLastRow() - CONFIG.HEADER_ROW;
    if (n <= 0) return;
    const range = sheet.getRange(firstRow, cols.botId, n, 1);
    const ids = range.getValues();
    const seen = {};
    let changed = false;
    for (let i = 0; i < ids.length; i++) {
      let v = String(ids[i][0]).trim();
      if (!v || seen[v]) { v = Utilities.getUuid(); ids[i][0] = v; changed = true; } // full UUID — no collisions
      seen[v] = true;
    }
    if (changed) range.setValues(ids);
  });
}

/** Find the data row (1-based) for a BotID, or -1. Warns on duplicate ids. */
function findRowByBotId_(sheet, cols, botId) {
  const firstRow = CONFIG.HEADER_ROW + 1;
  const n = sheet.getLastRow() - CONFIG.HEADER_ROW;
  if (n <= 0 || !botId) return -1;
  const ids = sheet.getRange(firstRow, cols.botId, n, 1).getValues();
  let found = -1, count = 0;
  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]).trim() === botId) { count++; if (found === -1) found = firstRow + i; }
  }
  if (count > 1) logBot_('WARN', '', botId, 'duplicate BotID matched ' + count + ' rows');
  return found;
}

// ---------------------------------------------------------------------------
// Date helpers
// ---------------------------------------------------------------------------

/**
 * Parse a cell value to a Date, or null. Handles real Date cells, "DD/MM/YYYY",
 * and "DD MMM YYYY". Unknown/invalid formats return null (treated per
 * BLANK_DATE_IS_STALE) rather than risking a US MM/DD misread.
 */
function parseDate_(val) {
  if (val instanceof Date && !isNaN(val)) return val;
  const s = String(val == null ? '' : val).trim();
  if (!s) return null;

  let m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/); // DD/MM/YYYY
  if (m) {
    const d = +m[1], mo = +m[2], y = m[3].length === 2 ? 2000 + +m[3] : +m[3];
    const dt = new Date(y, mo - 1, d);
    // reject rollovers like 13/25/2026
    if (dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === d) return dt;
    return null;
  }
  m = s.match(/^(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})$/); // DD MMM YYYY (e.g. "18 Dec 2024")
  if (m) {
    const months = { jan:0, feb:1, mar:2, apr:3, may:4, jun:5, jul:6, aug:7, sep:8, oct:9, nov:10, dec:11 };
    const mo = months[m[2].slice(0, 3).toLowerCase()];
    if (mo != null) {
      const dt = new Date(+m[3], mo, +m[1]);
      if (!isNaN(dt)) return dt;
    }
  }
  return null; // unknown format → not "freshly contacted"; surfaced as stale
}

function todayStr_() {
  return Utilities.formatDate(new Date(), CONFIG.TIMEZONE, CONFIG.DATE_FORMAT);
}

function daysSince_(date) {
  if (!date) return Infinity;
  return Math.floor((Date.now() - date.getTime()) / 86400000);
}

// ---------------------------------------------------------------------------
// Stale-lead detection
// ---------------------------------------------------------------------------

/**
 * Returns leads grouped by PIC name. Leads with a blank PIC are bucketed under
 * UNASSIGNED so they're surfaced, not silently dropped.
 *   { "Vik": [ {botId, client, stage, status, days, row}, ... ], "(unassigned)": [...] }
 */
function findStaleLeadsByPic_() {
  const sheet = getPipelineSheet_();
  const cols = getColumnMap_(sheet);
  backfillBotIds_(sheet, cols);

  const firstRow = CONFIG.HEADER_ROW + 1;
  const n = sheet.getLastRow() - CONFIG.HEADER_ROW;
  const byPic = {};
  if (n <= 0) return byPic;

  const data = sheet.getRange(firstRow, 1, n, sheet.getLastColumn()).getValues();
  const snoozed = getSnoozeMap_();
  const now = Date.now();
  const exclude = CONFIG.EXCLUDE_STAGES.map(s => s.toLowerCase());

  for (let i = 0; i < data.length; i++) {
    const get = key => data[i][cols[key] - 1];
    const client = String(get('client')).trim();
    if (!client) continue; // blank / separator row

    const stage = String(get('stage')).trim();
    if (exclude.indexOf(stage.toLowerCase()) !== -1) continue;

    const botId = String(get('botId')).trim();
    if (snoozed[botId] && snoozed[botId] > now) continue;

    const last = parseDate_(get('lastContact'));
    const days = daysSince_(last);
    const isStale = last === null ? CONFIG.BLANK_DATE_IS_STALE : days >= CONFIG.STALE_DAYS;
    if (!isStale) continue;

    const pic = String(get('pic')).trim() || UNASSIGNED;
    (byPic[pic] = byPic[pic] || []).push({
      botId: botId,
      client: client,
      stage: stage || '(blank)',
      status: String(get('status')).trim() || '(blank)',
      days: last === null ? null : days,
      row: firstRow + i,
    });
  }
  Object.keys(byPic).forEach(pic => {
    byPic[pic].sort((a, b) => (b.days === null ? 1e9 : b.days) - (a.days === null ? 1e9 : a.days));
  });
  return byPic;
}

// ---------------------------------------------------------------------------
// The daily nudge job (wire to a time-driven trigger — see Setup.gs)
// ---------------------------------------------------------------------------

function runDailyNudge() {
  const byPic = findStaleLeadsByPic_();
  const roster = getRoster_(); // { picName: chatId }
  const summary = [];

  Object.keys(byPic).forEach(pic => {
    const leads = byPic[pic];
    if (pic === UNASSIGNED) {
      summary.push('⚠ unassigned: ' + leads.length + ' stale lead(s) with no PIC — assign in the sheet');
      return;
    }
    const chatId = roster[pic];
    if (!chatId) {
      summary.push(pic + ': ' + leads.length + ' stale — NOT registered on the bot');
      return;
    }
    const toSend = leads.slice(0, CONFIG.MAX_NUDGES_PER_PIC);
    const more = leads.length - toSend.length;
    tgSendText_(chatId,
      '👋 <b>' + escHtml_(pic) + '</b> — you have <b>' + leads.length + '</b> stale lead' +
      (leads.length === 1 ? '' : 's') + '. Let\'s clear ' + toSend.length + ':' +
      (more > 0 ? '\n<i>(' + more + ' more — send /stale again after these)</i>' : ''));
    toSend.forEach(lead => sendLeadNudge_(chatId, lead));
    summary.push(pic + ': nudged ' + toSend.length + '/' + leads.length);
  });

  notifyAdmins_('🗒 <b>Daily nudge run</b>\n' + escHtml_(summary.join('\n') || 'No stale leads 🎉'));
  return summary;
}

// ---------------------------------------------------------------------------
// Webhook entry point — Telegram POSTs every update here.
// ---------------------------------------------------------------------------

function doPost(e) {
  try {
    // Verify the shared secret. Apps Script doPost cannot read request headers,
    // so the secret travels in the webhook URL query string (?secret=…), set by
    // setWebhook() in Setup.gs. Fail CLOSED: a missing secret denies everything.
    const secret = PropertiesService.getScriptProperties().getProperty(PROP_SECRET);
    if (!secret) {
      logBot_('ERROR', '', 'doPost', 'TELEGRAM_SECRET unset — denying request');
      return ContentService.createTextOutput('forbidden');
    }
    const got = e && e.parameter && e.parameter.secret;
    if (got !== secret) return ContentService.createTextOutput('forbidden');

    const update = JSON.parse(e.postData.contents);
    handleUpdate_(update);
  } catch (err) {
    logBot_('ERROR', '', 'doPost', String(err) + (err.stack ? '\n' + err.stack : ''));
  }
  return ContentService.createTextOutput('ok'); // always 200 so Telegram won't retry-storm
}

function doGet() {
  return ContentService.createTextOutput('sales-nudge-bot is alive');
}
