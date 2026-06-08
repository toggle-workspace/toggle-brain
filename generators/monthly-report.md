# /monthly-report

Generate a monthly performance report for one client.

## READS
- templates/reports/monthly-performance.md # output shape
- clients/<slug>/CLIENT.md                 # scope, channels, KPIs
- clients/<slug>/03-media/                  # spend + performance data (where available)

## WRITES
- clients/<slug>/04-reports/YYYY-MM.md

## INPUTS
- $slug — the client slug
- $month — YYYY-MM period

## STEPS
1. Read `templates/reports/monthly-performance.md` for the shell.
2. Read `clients/$slug/CLIENT.md` for active channels + KPIs in scope.
3. Pull performance data from `clients/$slug/03-media/` for the period.
4. Fill the template: exec summary, channel-by-channel, wins, losses, spend reconciliation, next month plan.
5. Write to `clients/$slug/04-reports/$month.md`.

## STATUS
scaffold — flesh out under demand
