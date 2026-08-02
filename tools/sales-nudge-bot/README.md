# sales-nudge-bot has moved

This tool was extracted from Toggle Brain on 2026-08-02. It now lives in its own
repository.

- **Local:** `~/Desktop/Code/toggle-sales-nudge-bot`
- **GitHub:** https://github.com/zsaaad/toggle-sales-nudge-bot (private)

Everything that was here went with it: the Google Apps Script backend
(`Config.gs`, `Main.gs`, `Polling.gs`, `Setup.gs`, `Telegram.gs`,
`appsscript.json`), the Cloudflare Worker under `worker/`, and the setup, rollout,
and team guide docs. History was not carried across, so the four original commits
(2026-06-21 through 2026-07-13) are still in this repo's log under this path.

The bot writes to the sales tracker sheet, so `Sales/` in this repo is still the
place where the tracker conventions and rollup live.

Do not add code back here. Work in the new repo.
