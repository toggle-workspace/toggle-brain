# Rollout kit — get the team on the sales-nudge bot

Goal: every sales PIC registered so the Sunday nudge reaches them and they can
`/newlead` from their phone. Registration is self-service and takes each person ~60
seconds. **You can't register them for them** — each must tap `/start` once.

---

## 1. Copy-paste this to the team (WhatsApp / Telegram group)

> **📲 2-minute setup — our sales nudge bot**
>
> We've got a bot that pings you about leads that have gone quiet and lets you update
> the tracker in a couple of taps — no more hunting through the sheet. Quick setup:
>
> 1. Open **https://t.me/Togglenudgebot** (install Telegram first if you don't have it).
> 2. Tap **Start** (or send `/start`).
> 3. Tap **your name** from the list. Done ✅
>
> From then on:
> • **Sunday morning** you'll get your stale leads — tap to update stage + warm/cold,
>   optionally add a note. That's it.
> • Type `/stale` anytime to pull your list on demand.
> • Type **`/update`** anytime to pick any of your leads and change its stage/status
>   or add a note (`/update <name>` to jump to one client).
> • Just left a meeting? Send **`/newlead`** to add a new lead (client name → PIC →
>   note) on the spot.
>
> Any issues, ping me.

---

## 2. The team → name mapping (must match the tracker exactly)

The `/start` list is built from the **PIC column of the live tracker**, so each
person taps the name already next to their leads. As of the last check the 8 names
in the tracker are:

`Aizad · Jordan · Julian · Lau · Shaun · Vik · Yang · Zaid`

Every teammate should tap the one that's theirs. (Zaid → **Zaid**, Viknesh → **Vik**, etc.)

> **If someone's name isn't a button:** it's not in the tracker's `PIC` column yet.
> Either add a lead with their name in `PIC`, or have them (or you) create one via
> `/newlead` — then their name appears next time they `/start`.

---

## 3. Admin checklist (you, once)

1. **Register yourself** first: `/start` → tap **Zaid**. Then send `/whoami` and copy
   your numeric `chat_id`.
2. **Become an admin:** add your `chat_id` (and any other manager's) to
   `CONFIG.ADMIN_CHAT_IDS` in `Config.gs`, then re-paste/redeploy the script. Admins
   get the weekly digest + "not mine" alerts and can update any PIC's leads.
3. **Clean the test registration:** the `BotRoster` tab currently has one row — PIC
   **Vik** linked to Telegram **@Zaid** (a test). If that's not right, delete the row
   in `BotRoster` and have the real Viknesh `/start` → tap **Vik**.
4. **Confirm it routes:** after a couple of people register, run `previewNudge`
   (Apps Script editor) — registered PICs show `registered`, the rest `NOT REGISTERED`.
   Chase the stragglers.

---

## 4. Common snags

| Symptom | Fix |
|---|---|
| "Already linked to another account" | That name is bound to a different Telegram user (anti-impersonation). Delete the wrong `BotRoster` row, have them `/start` again. |
| Their name isn't in the list | Name missing from the tracker's `PIC` column — add a lead or use `/newlead`. |
| Registered but no Sunday nudge | Their `PIC` name in the sheet must match the name they tapped, and they need ≥1 stale lead. Run `previewNudge` to check. |
| No reply at all / very slow | The bot needs the live transport up — see `worker/README.md` (Cloudflare Worker) or the polling fallback in `SETUP.md` §4. |

See `README.md` for what the bot does and `SETUP.md` to (re)deploy it.
