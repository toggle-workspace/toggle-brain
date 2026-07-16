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
  // The "Client - Master Sheet" tab (gid confirmed 2026-07-13). If the tab is ever
  // moved/recreated its gid changes — copy the new number from after #gid= in the
  // URL. A wrong gid fails loudly ("No tab with gid …") rather than reading blindly.
  SHEET_GID: 54720587,           // Client - Master Sheet
  HEADER_ROW: 1,                 // row that holds the column titles

  // --- Column titles, matched by HEADER TEXT (not position) so reordering
  //     columns in the sheet won't break the bot. Must match the header cells
  //     verbatim (case-insensitive, trimmed). Only the columns the bot actually
  //     reads or writes are listed — every one here MUST exist or getColumnMap_
  //     throws, so we deliberately keep this set minimal (columns the bot never
  //     touches, e.g. Lead Source / Client Contact, are intentionally omitted so
  //     renaming them can't break the bot). ---
  COLS: {
    client:      'Client Name',
    pic:         'PIC',
    stage:       'Stage',
    status:      'Lead Status',
    lastContact: 'Last Contact Date',
    updates:     'Latest Correspondance/Updates', // note the sheet's spelling
  },

  // A stable per-row key the bot writes into its own column so button taps keep
  // pointing at the right lead even after the sheet is sorted/filtered.
  BOTID_COL_TITLE: 'BotID',

  // --- Staleness rules ---
  STALE_DAYS: 14,                // a lead is "stale" if untouched this many days
  // Only leads in one of these stages get nudged (an ALLOWLIST). Anything else —
  // Active (won/live client), Dead, Closed, or any new stage added later — is
  // treated as "don't chase". Compared case-insensitively; must match the labels
  // in STAGE_OPTIONS / the sheet's Stage column verbatim (trimmed).
  NUDGE_STAGES: ['Blocked', 'Not Pitched', 'Pitch In Progress'],
  // Treat a blank Last Contact Date as stale (true) or skip it (false).
  BLANK_DATE_IS_STALE: true,
  // Max nudge messages to send to one PIC per run (avoid a 20-message dump).
  MAX_NUDGES_PER_PIC: 6,

  // --- /update ---
  // Max leads shown as tappable buttons by /update (Telegram caps message size,
  // and a 40-button wall is unusable). If a PIC has more, they narrow with
  // `/update <name>`.
  MAX_UPDATE_LIST: 12,

  // --- /newlead defaults ---
  // Stage written to a row created via the /newlead command (must match one of
  // STAGE_OPTIONS' labels, and be in NUDGE_STAGES, so the new lead gets chased).
  NEWLEAD_STAGE: 'Not Pitched',

  // --- Date handling ---
  // The sheet stores dates as text like "05/01/2026" (DD/MM/YYYY). The bot reads
  // both real Date cells and this string format, and writes back in this format.
  DATE_FORMAT: 'dd/MM/yyyy',
  TIMEZONE: 'Asia/Kuala_Lumpur',

  // --- Button options (label = what's written to the sheet; code = short token
  //     used in Telegram callback_data, which has a 64-byte limit). ---
  // Labels are written verbatim into the sheet's Stage column and MUST match the
  // stage vocabulary the team uses there. codes are short, stable tokens used in
  // Telegram callback_data (64-byte cap) — never reuse a code for a different stage.
  STAGE_OPTIONS: [
    { code: 'np', label: 'Not Pitched' },
    { code: 'pi', label: 'Pitch In Progress' },
    { code: 'bl', label: 'Blocked' },
    { code: 'ac', label: 'Active' },
    { code: 'dd', label: 'Dead' },
    { code: 'cl', label: 'Closed' },
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
