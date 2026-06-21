/**
 * Config.gs — single place to tune the sales-nudge bot.
 *
 * Secrets (bot token, webhook secret) do NOT live here — they live in
 * Script Properties (Project Settings → Script Properties), so this file is
 * safe to commit to the repo. See SETUP.md.
 */

const CONFIG = {
  // --- The spreadsheet ---
  // The live sales tracker. Leave SHEET_ID blank to use the spreadsheet this
  // script is bound to (recommended: bind the script to the sheet).
  SHEET_ID: '1ZZpTXjnH-rq5pnKIojjwA_9Jf8EoLHXNvPWJQ7exUdI',
  SHEET_GID: 967882421,          // the active-pipeline tab (from the sheet URL #gid=)
  HEADER_ROW: 1,                 // row that holds the column titles

  // --- Column titles, matched by HEADER TEXT (not position) so reordering
  //     columns in the sheet won't break the bot. Must match the header cells
  //     verbatim (case-insensitive, trimmed). ---
  COLS: {
    client:      'Client Name',
    pic:         'PIC',
    source:      'Lead Source',
    stage:       'Stage',
    status:      'Lead Status',
    contact:     'Contact Details',
    clientInfo:  'Client Info/Requests',
    lastContact: 'Last Contact Date',
    updates:     'Updates',
  },

  // A stable per-row key the bot writes into its own column so button taps keep
  // pointing at the right lead even after the sheet is sorted/filtered.
  BOTID_COL_TITLE: 'BotID',

  // --- Staleness rules ---
  STALE_DAYS: 14,                // a lead is "stale" if untouched this many days
  // Stages we never nudge about (deal is parked/done). Compared case-insensitively.
  EXCLUDE_STAGES: ['Completed'],
  // Treat a blank Last Contact Date as stale (true) or skip it (false).
  BLANK_DATE_IS_STALE: true,
  // Max nudge messages to send to one PIC per run (avoid a 20-message dump).
  MAX_NUDGES_PER_PIC: 6,

  // --- Date handling ---
  // The sheet stores dates as text like "05/01/2026" (DD/MM/YYYY). The bot reads
  // both real Date cells and this string format, and writes back in this format.
  DATE_FORMAT: 'dd/MM/yyyy',
  TIMEZONE: 'Asia/Kuala_Lumpur',

  // --- Button options (label = what's written to the sheet; code = short token
  //     used in Telegram callback_data, which has a 64-byte limit). ---
  STAGE_OPTIONS: [
    { code: 'ns', label: 'Not started' },
    { code: 'ip', label: 'In progress' },
    { code: 'bl', label: 'Blocked' },
    { code: 'cp', label: 'Completed' },
  ],
  STATUS_OPTIONS: [
    { code: 'w', label: 'Warm' },
    { code: 'c', label: 'Cold' },
  ],
  SNOOZE_DAYS: 7,               // "remind me later" pushes the lead out this far

  // --- Roster (PIC → Telegram chat) ---
  // Self-service: a PIC opens the bot, taps /start, and picks their name from
  // the list of PICs found in the sheet. Stored in this hidden tab.
  ROSTER_SHEET: 'BotRoster',     // columns: PIC | chat_id | tg_username | registered_at
  LOG_SHEET: 'BotLog',           // append-only audit of every write the bot makes (note bodies redacted)

  // A "type your note" prompt that's never answered expires after this many
  // minutes, so a much-later free-text message isn't mistaken for a note.
  PENDING_TTL_MIN: 60,

  // Telegram numeric chat_id(s) allowed to run admin commands (/broadcast, /stats).
  // Fill with Zaid's chat_id after first /start (see BotLog or /whoami).
  ADMIN_CHAT_IDS: [],
};

// Script Property keys (set these in Project Settings, never hard-code secrets).
const PROP_TOKEN = 'TELEGRAM_TOKEN';     // BotFather token
const PROP_SECRET = 'TELEGRAM_SECRET';   // random string; guards the webhook
