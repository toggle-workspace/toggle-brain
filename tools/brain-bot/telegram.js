'use strict';

// telegram.js — thin Telegram Bot API client (no deps; uses Node's global fetch).
// Long-polling transport: we PULL updates with getUpdates rather than running a
// webhook. The sales-nudge-bot needed a Cloudflare Worker only because Apps
// Script answers with a 302 Telegram won't follow — a local Node process has no
// such problem, so there is no webhook, no Worker, and no public URL here.

const api = (token, method) => `https://api.telegram.org/bot${token}/${method}`;

async function call(token, method, payload) {
  const res = await fetch(api(token, method), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload || {}),
  });
  return res.json();
}

// Long poll: the call blocks up to `timeoutSec` on Telegram's side until an
// update arrives, so latency is ~instant rather than a fixed timer interval.
async function getUpdates(token, offset, timeoutSec) {
  return call(token, 'getUpdates', {
    offset,
    timeout: timeoutSec,
    allowed_updates: ['message'],
  });
}

async function sendMessage(token, chatId, text) {
  return call(token, 'sendMessage', {
    chat_id: chatId,
    text,
    disable_web_page_preview: true,
  });
}

async function sendChatAction(token, chatId, action) {
  return call(token, 'sendChatAction', { chat_id: chatId, action: action || 'typing' });
}

module.exports = { getUpdates, sendMessage, sendChatAction };
