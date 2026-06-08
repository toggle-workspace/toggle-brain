# /proposal

Draft a pitch-stage proposal anchored to Toggle's positioning, services, and case studies.

## READS
- brain/positioning/                       # elevator pitches, differentiators
- brain/services/                          # one file per service in scope
- brain/case-studies/_index.md             # surface relevant cases for the prospect's vertical
- brain/case-studies/<relevant>.md         # 1–3 named cases pulled by vertical / scope
- clients/<slug>/CLIENT.md                 # prospect context, geo, vertical
- templates/proposals/proposal.md          # output shape

## WRITES
- clients/<slug>/01-strategy/proposal-YYYY-MM-DD.md

## INPUTS
- $slug — the client (prospect) slug
- $services — comma-separated services in scope (e.g. "performance-marketing,seo")

## STEPS
1. Read `clients/$slug/CLIENT.md` for geo, vertical, business context.
2. Read positioning + each service file in $services.
3. Pull 1–3 case studies from the prospect's vertical via `_index.md`.
4. Render into `templates/proposals/proposal.md` shape.
5. Write to `clients/$slug/01-strategy/proposal-YYYY-MM-DD.md`.

## STATUS
scaffold — flesh out under demand
