# UNITAR ads tooling has moved

The scripts that used to live in this folder were extracted from Toggle Brain on
2026-08-02. They now live in their own repository.

- **Local:** `~/Desktop/Code/toggle-unitar-ads-dashboard`
- **GitHub:** https://github.com/zsaaad/toggle-unitar-ads-dashboard (private)

What moved: `pull_meta.py`, `build_ads_dashboard.py`, `build_ad_creative_tracker.py`,
`build_leadform.py`, `refresh-dashboard.sh`, the launchd plist, the lead form CSVs,
the creative tracker spreadsheet, and the deploy credential templates.

What stayed here, because it is client-facing rather than code:

- `../04-reports/meta-ads-dashboard.html` — the built dashboard. The daily refresh
  job still copies each new build into that path, so it stays current.
- `../CAMPAIGN-NAMING.md`, `../01-strategy/account-knowledge-base.md`, and the ad
  copy under `../creative/copy/` — the reference docs the tracker script reads
  against.

The daily 07:30 launchd job `com.toggle.unitar-ads-dashboard` was repointed at the
new location on 2026-08-02 and reloaded. If it ever fails with "No such file", an
old copy of the plist is installed in `~/Library/LaunchAgents`.

Do not add code back here. Work in the new repo.
