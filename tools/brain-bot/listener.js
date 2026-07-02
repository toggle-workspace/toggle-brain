'use strict';

// listener.js — the brain-bot long-poll loop.
//
// Receives Telegram messages, gates them against the allowlist, resolves the
// asker's ACL-scoped view (shared zones + only their allowed clients), routes
// the model (/deep -> deeper model), enforces a daily per-user quota, dedupes
// updates, then shells out to ask.sh (headless read-only Claude over the view)
// and replies with the cited answer. Messages are handled one at a time so two
// questions don't spawn parallel `claude -p` runs that thrash the Mac.

const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const tg = require('./telegram');

const DIR = __dirname;
const CONFIG = JSON.parse(fs.readFileSync(path.join(DIR, 'config.json'), 'utf8'));
const STATE_FILE = path.join(DIR, '.state.json');
const QUOTA_FILE = path.join(DIR, '.quota.json');
const LOG_DIR = path.join(DIR, 'logs');
fs.mkdirSync(LOG_DIR, { recursive: true });

const TOKEN = process.env.TELEGRAM_TOKEN;
if (!TOKEN) {
  console.error('FATAL: TELEGRAM_TOKEN not set. Put it in tools/brain-bot/.env (see README.md).');
  process.exit(1);
}

// --- helpers --------------------------------------------------------------
function stamp() { return new Date().toISOString(); }
function today() { return new Date().toISOString().slice(0, 10); }
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

function log(msg) {
  const line = `[${stamp()}] ${msg}\n`;
  try { fs.appendFileSync(path.join(LOG_DIR, 'bot.log'), line); } catch (_) {}
  process.stdout.write(line);
}

function chunk(text, size) {
  const out = [];
  for (let i = 0; i < text.length; i += size) out.push(text.slice(i, i + size));
  return out;
}

// --- citation verification (catch fabricated source paths) ----------------
const ZONES = ['brain', 'clients', 'generators', 'prompts', 'templates', 'playbooks', 'Sales', 'cockpit', 'installations', 'archive', 'tools', 'assets'];
const ZONE_RE = new RegExp('`((?:' + ZONES.join('|') + ')\\/[\\w./-]+)`', 'g');

function extractCitedPaths(answer) {
  const set = new Set();
  const add = (raw) => {
    const p = String(raw).replace(/^[`(<\s]+/, '').replace(/[`)>.,;\s]+$/, '').trim();
    if (p && p.includes('/') && !p.includes('..') && !p.startsWith('/')) set.add(p);
  };
  // `source: <path>` lines (the enforced citation format; may list several)
  let m;
  const re1 = /source:\s*([^\n]+)/gi;
  while ((m = re1.exec(answer))) m[1].split(/[,\s]+/).forEach(add);
  // any backticked zone-rooted path elsewhere in the answer
  while ((m = ZONE_RE.exec(answer))) add(m[1]);
  return Array.from(set);
}

function verifyCitations(answer, viewDir) {
  const cited = extractCitedPaths(answer);
  const missing = cited.filter((p) => {
    try { return !fs.existsSync(path.join(viewDir, p.replace(/\/+$/, ''))); }
    catch (_) { return true; }
  });
  return { cited, missing };
}

// --- append-only audit log (question + citations, NOT full answers) -------
function auditLog(rec) {
  try {
    const line = JSON.stringify(Object.assign({ ts: stamp() }, rec)) + '\n';
    fs.appendFileSync(path.join(LOG_DIR, 'audit.jsonl'), line);
  } catch (e) { log('auditLog: ' + e.message); }
}

// --- allowlist + ACL ------------------------------------------------------
function loadAllowlist() {
  const f = path.join(DIR, 'allowlist.json');
  if (!fs.existsSync(f)) return {};
  try { return JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { log('allowlist.json parse error: ' + e.message); return {}; }
}

// An entry is either a string (display name => shared zones only, no clients)
// or { name, clients: 'all' | ["slug", ...] }. Returns null for malformed.
function aclFor(entry) {
  if (typeof entry === 'string') return { name: entry, clients: [] };
  if (entry && typeof entry === 'object') {
    let clients;
    if (entry.clients === 'all') {
      clients = 'all';
    } else if (Array.isArray(entry.clients)) {
      // 'all' is a RESERVED sentinel: full access requires the string "all".
      // An "all" sitting inside the array (typo/fat-finger) must NOT escalate —
      // strip it so we fail closed to that user's other (or zero) clients.
      clients = entry.clients.filter((c) => typeof c === 'string' && c && c !== 'all');
    } else {
      clients = [];
    }
    return { name: entry.name || 'user', clients };
  }
  return null;
}

// --- ACL-scoped views (one per distinct client-set) -----------------------
const viewBuiltAt = {}; // key -> ms (in-memory; resets each restart => fresh build)

function viewKeyFor(clients) {
  if (clients === 'all') return 'all';
  if (!clients || clients.length === 0) return 'shared';
  return 'c_' + clients.slice().sort().join('+').replace(/[^a-zA-Z0-9_+.-]/g, '_');
}
function viewDirFor(key) { return path.join(CONFIG.viewsDir, key); }

function buildView(key, clients) {
  return new Promise((resolve) => {
    const env = Object.assign({}, process.env, {
      BRAIN_BOT_REPO_ROOT: CONFIG.repoRoot,
      BRAIN_BOT_REF: CONFIG.ref || 'origin/main',
      BRAIN_BOT_VIEW_DIR: viewDirFor(key),
      BRAIN_BOT_VIEW_CLIENTS: clients === 'all' ? 'all' : (clients.length ? clients.join(',') : ''),
      BRAIN_BOT_EXCLUDE_ZONES: (CONFIG.adminOnlyZones || []).join(','),
    });
    execFile('bash', [path.join(DIR, 'build-view.sh')], {
      env, timeout: 120000, maxBuffer: 4 * 1024 * 1024,
    }, (err, stdout, stderr) => {
      if (err) { log('build-view error [' + key + ']: ' + err.message + ' :: ' + String(stderr || '').slice(0, 300)); resolve(false); }
      else { log(String(stdout || '').trim()); resolve(true); }
    });
  });
}

async function ensureView(clients) {
  const key = viewKeyFor(clients);
  const dir = viewDirFor(key);
  const ageMs = viewBuiltAt[key] ? (Date.now() - viewBuiltAt[key]) : Infinity;
  const stale = ageMs > (CONFIG.refreshIntervalMin || 10) * 60 * 1000;
  if (stale || !fs.existsSync(dir)) {
    const ok = await buildView(key, clients);
    if (ok) viewBuiltAt[key] = Date.now();
    else if (!fs.existsSync(dir)) return null; // failed and no prior view to serve
  }
  return dir;
}

// --- daily per-user quota -------------------------------------------------
function loadQuota() {
  try { const q = JSON.parse(fs.readFileSync(QUOTA_FILE, 'utf8')); if (q.date === today()) return q; } catch (_) {}
  return { date: today(), perUser: {}, global: 0 };
}
function saveQuota(q) { try { fs.writeFileSync(QUOTA_FILE, JSON.stringify(q)); } catch (e) { log('saveQuota: ' + e.message); } }
function quotaExceeded(uid) {
  if ((CONFIG.adminUserIds || []).includes(uid)) return false;
  const q = loadQuota();
  const perLim = CONFIG.dailyQuotaPerUser || 0;
  const globLim = CONFIG.dailyQuotaGlobal || 0;
  if (perLim && (q.perUser[String(uid)] || 0) >= perLim) return true;
  if (globLim && (q.global || 0) >= globLim) return true;
  return false;
}
function bumpQuota(uid) {
  const q = loadQuota();
  q.perUser[String(uid)] = (q.perUser[String(uid)] || 0) + 1;
  q.global = (q.global || 0) + 1;
  saveQuota(q);
}

// --- state: offset + update dedupe ----------------------------------------
function loadState() { try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); } catch (_) { return { offset: 0, processed: [] }; } }
function saveState(s) { try { fs.writeFileSync(STATE_FILE, JSON.stringify(s)); } catch (e) { log('saveState: ' + e.message); } }

// --- the brain ------------------------------------------------------------
function askBrain(question, viewDir, model) {
  return new Promise((resolve) => {
    const env = Object.assign({}, process.env, {
      BRAIN_BOT_CHECKOUT_DIR: viewDir,
      BRAIN_BOT_MODEL: model || CONFIG.model,
    });
    execFile('bash', [path.join(DIR, 'ask.sh'), question], {
      env, timeout: CONFIG.askTimeoutMs || 180000, maxBuffer: 16 * 1024 * 1024,
    }, (err, stdout, stderr) => {
      if (err) { log('ask.sh error: ' + err.message + ' :: ' + String(stderr || '').slice(0, 400)); resolve(null); }
      else resolve(String(stdout || '').trim());
    });
  });
}

// --- message handling -----------------------------------------------------
async function reply(chatId, text) {
  for (const part of chunk(text, CONFIG.maxAnswerChars || 3800)) {
    await tg.sendMessage(TOKEN, chatId, part);
  }
}

async function handleMessage(msg) {
  const chatId = msg.chat && msg.chat.id;
  const userId = msg.from && msg.from.id;
  let text = (msg.text || '').trim();
  if (!chatId || !text) return;

  // Open commands — bootstrap the allowlist.
  if (text === '/whoami' || text === '/start' || text === '/help') {
    await tg.sendMessage(TOKEN, chatId,
      'brain-bot — ask me anything about the Toggle Brain.\n\n' +
      'How to use:\n' +
      '• just type a question\n' +
      '• /deep <question> — use the deeper model for hard, multi-file questions\n\n' +
      `Your Telegram user_id is: ${userId}\n` +
      'Send that id to Zaid to be added to the allowlist.');
    return;
  }

  const entry = loadAllowlist()[String(userId)];
  if (!entry) {
    await tg.sendMessage(TOKEN, chatId,
      "You're not on the brain-bot allowlist yet.\n" +
      `Your user_id is ${userId} — send it to Zaid to get access.`);
    log(`DENIED user=${userId} text=${text.slice(0, 80)}`);
    return;
  }
  const acl = aclFor(entry);
  if (!acl) { await tg.sendMessage(TOKEN, chatId, 'Your allowlist entry looks malformed — ping Zaid.'); return; }

  // Model routing: /deep escalates this one question to the deeper model.
  let model = CONFIG.model;
  if (/^\/deep\b/i.test(text)) {
    model = CONFIG.deepModel || CONFIG.model;
    text = text.replace(/^\/deep\b\s*/i, '').trim();
  }
  if (!text) { await tg.sendMessage(TOKEN, chatId, 'Usage: /deep <your question>'); return; }

  // Daily quota (admins exempt).
  if (quotaExceeded(userId)) {
    await tg.sendMessage(TOKEN, chatId, `You've hit today's limit of ${CONFIG.dailyQuotaPerUser} questions. It resets tomorrow.`);
    log(`QUOTA user=${userId}`);
    return;
  }

  // Resolve the ACL-scoped view (build/refresh as needed).
  const viewDir = await ensureView(acl.clients);
  if (!viewDir) { await tg.sendMessage(TOKEN, chatId, 'Sorry — my knowledge view is unavailable right now. Try again shortly.'); return; }

  const scope = acl.clients === 'all' ? 'all-clients' : (acl.clients.length ? acl.clients.join(',') : 'shared-only');
  log(`Q user=${userId}(${acl.name}) model=${model} scope=[${scope}]: ${text.slice(0, 200)}`);
  // Count at admission, BEFORE the (possibly expensive, possibly failing) call,
  // so timeouts/errors aren't free retries that dodge the quota.
  bumpQuota(userId);
  await tg.sendChatAction(TOKEN, chatId, 'typing');
  const answer = await askBrain(text, viewDir, model);
  if (!answer) {
    await tg.sendMessage(TOKEN, chatId, 'Sorry — something went wrong answering that. Please try again.');
    auditLog({ user: userId, name: acl.name, scope, model, q: text.slice(0, 300), ok: false });
    return;
  }
  // Verify every cited path actually exists in this view; flag fabrications.
  const { cited, missing } = verifyCitations(answer, viewDir);
  let out = answer;
  if (missing.length) {
    out += `\n\n⚠️ I couldn't verify these cited path(s) in your view: ${missing.join(', ')}. Double-check before relying on them.`;
  }
  await reply(chatId, out);
  auditLog({ user: userId, name: acl.name, scope, model, q: text.slice(0, 300), ok: true, cited, missing, chars: answer.length });
  log(`A user=${userId} chars=${answer.length} cited=${cited.length} missing=${missing.length}`);
}

// --- main loop ------------------------------------------------------------
async function main() {
  log(`brain-bot listener starting. repo=${CONFIG.repoRoot} model=${CONFIG.model} deep=${CONFIG.deepModel || '(none)'}`);

  // Pre-build the 'all' view so admins / terminal tests answer instantly.
  await ensureView('all');

  const state = loadState();
  let offset = state.offset || 0;
  let processed = Array.isArray(state.processed) ? state.processed : [];

  for (;;) {
    let res;
    try {
      res = await tg.getUpdates(TOKEN, offset, CONFIG.pollTimeoutSec || 25);
    } catch (e) {
      log('getUpdates network error: ' + e.message);
      await sleep(3000);
      continue;
    }
    if (!res || !res.ok) {
      log('getUpdates not ok: ' + JSON.stringify(res).slice(0, 300));
      await sleep(3000);
      continue;
    }
    for (const u of (res.result || [])) {
      // Dedupe: never process the same update twice (guards crash-redelivery).
      if (!processed.includes(u.update_id)) {
        processed.push(u.update_id);
        if (processed.length > 200) processed = processed.slice(-200);
        try {
          if (u.message) await handleMessage(u.message);
        } catch (e) {
          log('handle error: ' + e.message);
        }
      }
      offset = u.update_id + 1;
      saveState({ offset, processed }); // persist per-update so a crash never reprocesses
    }
  }
}

main().catch((e) => { log('FATAL: ' + (e && e.stack ? e.stack : e)); process.exit(1); });
