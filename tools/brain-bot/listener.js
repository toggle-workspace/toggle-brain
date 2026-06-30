'use strict';

// listener.js — the brain-bot long-poll loop.
//
// Receives Telegram messages, gates them against a static user_id allowlist,
// shells out to ask.sh (headless read-only Claude over the repo), and replies
// with the cited answer. Offset is persisted per-update so a crash never
// reprocesses a message (ported from sales-nudge-bot/Polling.gs).
//
// Messages are handled one at a time (awaited in sequence) so two simultaneous
// questions don't thrash the Mac with parallel `claude -p` runs.

const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const tg = require('./telegram');

const DIR = __dirname;
const CONFIG = JSON.parse(fs.readFileSync(path.join(DIR, 'config.json'), 'utf8'));
const STATE_FILE = path.join(DIR, '.state.json');
const LOG_DIR = path.join(DIR, 'logs');
fs.mkdirSync(LOG_DIR, { recursive: true });

const TOKEN = process.env.TELEGRAM_TOKEN;
if (!TOKEN) {
  console.error('FATAL: TELEGRAM_TOKEN not set. Put it in tools/brain-bot/.env (see README.md).');
  process.exit(1);
}

// --- helpers --------------------------------------------------------------
function stamp() { return new Date().toISOString(); }

function log(msg) {
  const line = `[${stamp()}] ${msg}\n`;
  try { fs.appendFileSync(path.join(LOG_DIR, 'bot.log'), line); } catch (_) {}
  process.stdout.write(line);
}

function loadAllowlist() {
  const f = path.join(DIR, 'allowlist.json');
  if (!fs.existsSync(f)) return {};
  try { return JSON.parse(fs.readFileSync(f, 'utf8')); }
  catch (e) { log('allowlist.json parse error: ' + e.message); return {}; }
}

function loadOffset() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')).offset || 0; }
  catch (_) { return 0; }
}
function saveOffset(offset) {
  try { fs.writeFileSync(STATE_FILE, JSON.stringify({ offset })); }
  catch (e) { log('saveOffset error: ' + e.message); }
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

function chunk(text, size) {
  const out = [];
  for (let i = 0; i < text.length; i += size) out.push(text.slice(i, i + size));
  return out;
}

// --- clean checkout (the jail's committed-only view) ----------------------
function refreshCheckout() {
  return new Promise((resolve) => {
    const env = Object.assign({}, process.env, {
      BRAIN_BOT_REPO_ROOT: CONFIG.repoRoot,
      BRAIN_BOT_CHECKOUT_DIR: CONFIG.checkoutDir,
      BRAIN_BOT_REF: CONFIG.ref || 'origin/main',
    });
    execFile('bash', [path.join(DIR, 'refresh-checkout.sh')], {
      env, timeout: 120000, maxBuffer: 4 * 1024 * 1024,
    }, (err, stdout, stderr) => {
      if (err) log('refresh-checkout error: ' + err.message + ' :: ' + String(stderr || '').slice(0, 300));
      else log(String(stdout || '').trim());
      resolve(!err);
    });
  });
}

// --- the brain ------------------------------------------------------------
function askBrain(question) {
  return new Promise((resolve) => {
    const env = Object.assign({}, process.env, {
      BRAIN_BOT_CHECKOUT_DIR: CONFIG.checkoutDir,
      BRAIN_BOT_MODEL: CONFIG.model,
    });
    execFile('bash', [path.join(DIR, 'ask.sh'), question], {
      env,
      timeout: CONFIG.askTimeoutMs || 180000,
      maxBuffer: 16 * 1024 * 1024,
    }, (err, stdout, stderr) => {
      if (err) {
        log('ask.sh error: ' + err.message + ' :: ' + String(stderr || '').slice(0, 400));
        resolve(null);
      } else {
        resolve(String(stdout || '').trim());
      }
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
  const text = (msg.text || '').trim();
  if (!chatId || !text) return;

  // /whoami, /start, /help are open to everyone — they bootstrap the allowlist.
  if (text === '/whoami' || text === '/start' || text === '/help') {
    await tg.sendMessage(TOKEN, chatId,
      'brain-bot — ask me anything about the Toggle Brain.\n\n' +
      `Your Telegram user_id is: ${userId}\n` +
      'Send that id to Zaid to be added to the allowlist.');
    return;
  }

  const allow = loadAllowlist();
  if (!allow[String(userId)]) {
    await tg.sendMessage(TOKEN, chatId,
      "You're not on the brain-bot allowlist yet.\n" +
      `Your user_id is ${userId} — send it to Zaid to get access.`);
    log(`DENIED user=${userId} text=${text.slice(0, 80)}`);
    return;
  }

  log(`Q user=${userId} (${allow[String(userId)]}): ${text.slice(0, 200)}`);
  await tg.sendChatAction(TOKEN, chatId, 'typing');
  const answer = await askBrain(text);
  if (!answer) {
    await tg.sendMessage(TOKEN, chatId, 'Sorry — something went wrong answering that. Please try again in a moment.');
    return;
  }
  await reply(chatId, answer);
  log(`A user=${userId} chars=${answer.length}`);
}

// --- main loop ------------------------------------------------------------
async function main() {
  log(`brain-bot listener starting. repo=${CONFIG.repoRoot} model=${CONFIG.model}`);

  // Build the clean checkout before serving, then keep it fresh on a timer so
  // answers track what the team merges to main (without per-query cost).
  await refreshCheckout();
  const everyMin = CONFIG.refreshIntervalMin || 10;
  setInterval(() => { refreshCheckout().catch(() => {}); }, everyMin * 60 * 1000);

  let offset = loadOffset();
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
      try {
        if (u.message) await handleMessage(u.message);
      } catch (e) {
        log('handle error: ' + e.message);
      }
      offset = u.update_id + 1;
      saveOffset(offset); // persist per-update so a crash never reprocesses
    }
  }
}

main().catch((e) => { log('FATAL: ' + (e && e.stack ? e.stack : e)); process.exit(1); });
