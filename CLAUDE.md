# Toggle Brain — Root Router

The Toggle Solutions internal knowledge repository. This file routes Claude (and humans) to the right zone. Do not put canonical knowledge here — every fact belongs in a leaf file under one of the zones below.

> **Toggle Solutions** — Your Digital Growth Partner · [toggle.solutions](https://toggle.solutions/) · hello@toggle.solutions · Viknesh (+60) 125688681

---

## The five zones (hard separation, never mix)

| Zone | What it holds | Rule |
|---|---|---|
| **`brain/`** | Canonical knowledge — services, pricing, voice, positioning, case studies, team, process, glossary | **Read-mostly.** Cite path. Never inline values. Every fact lives in exactly one file. |
| **`generators/`** | Slash-command recipes — `/quote`, `/proposal`, `/tiktok-hooks`, etc. Each starts with a `READS:` manifest. | **Entry points only.** Generators *execute*; they don't store content. |
| **`prompts/`** | Reusable prompt library — copy snippets, platform prompts, image/video tool prompts, style-packs. | **Library, not entry points.** @-reference `brain/voice/`; never inline. |
| **`templates/`** | Empty shells — briefs, proposals, quotations, reports, decks. | **Copy out, don't edit here.** Templates seed `clients/`. |
| **`clients/`** | Filled outputs per client — briefs, strategies, creative, media, reports, meetings, quotes. | **Never write back into `brain/`.** Outputs only. |

Plus supporting zones: **`playbooks/`** (how-we-do-things runbooks), **`assets/`** (shared non-client binaries), **`archive/`** (closed engagements + quote ledger), **`Sales/`** (agency business state — cross-client rollups: MRR, quotation tracker, credit pending, sales pipeline, efficiency metrics; generated from `clients/*/CLIENT.md` by `/sales-trackers`, never hand-edited), **`cockpit/`** (daily operating state — focus, todos, journal, decisions; powers `/toggle-brief`, `/toggle-status`, `/toggle-decide`), **`installations/`** (AI-executable setup recipes — one per integration, e.g. `toggle-mcp/`, `google-drive/`; recipes write to system config like `~/.claude/`, never back into `brain/`), **`tools/`** (runnable code shared by the team — `tools/remotion/`, the programmatic-video workspace; `tools/meta-ads-cli/`, install + auth setup for Meta's official Ads CLI (`meta`); `tools/gdoc-sync/`, pull a Google Doc into the repo as Markdown via headless Claude + the Drive MCP, scheduled by launchd).

---

## Routing — which folder for which task

| Task | Folder | Entry file |
|---|---|---|
| Build a quote (one client) | `generators/quote.md` | reads `brain/pricing/` + `clients/<slug>/CLIENT.md` + `archive/quotes/` anchors; renders print-faithful HTML |
| Pre-generate this month's quotes for every active client | `generators/monthly-quotes.md` (`/monthly-quotes`) | batches `/quote` across the book; one ready-to-send HTML draft per client, anchored to past quotes |
| Draft a proposal | `generators/proposal.md` | reads `brain/services/`, `brain/positioning/`, `brain/case-studies/` |
| Write TikTok hooks | `generators/tiktok-hooks.md` | reads `brain/voice/`, `prompts/platforms/tiktok.md`, client `style-pack.md` |
| Write a TikTok One creator brief | `/tiktok-brief-writer` global skill | enforces `brain/tiktok-one-rules.md`; writes `clients/<slug>/00-brief/` |
| Validate a draft brief against TikTok rules | `brief-validator` subagent | reads `brain/tiktok-one-rules.md` |
| Generate UNITAR weekly leads breakdown | `/unitar-weekly-report` global skill | format spec in `clients/audaura-unitar/WEEKLY-REPORT-FORMAT.md` |
| Morning brief / day's focus | `/toggle-brief` global skill | reads `cockpit/`, `clients/*/CLIENT.md`; writes `cockpit/current.md` |
| Status across all clients (green/yellow/red) | `/toggle-status` global skill | reads `clients/*/CLIENT.md` + git mtime |
| Refresh MRR / quotation / credit / pipeline trackers | `generators/sales-trackers.md` (`/sales-trackers`) | reads `clients/*/CLIENT.md` + `archive/quotes/`; writes `Sales/` |
| Check recurring revenue / open quotes / receivables / pipeline | `Sales/` | `mrr-tracker.md`, `quotation-tracker.md`, `credit-pending.md`, `sales-pipeline.md`, `efficiency-metrics.md` |
| Pick the next task | `/toggle-decide` global skill | reads `cockpit/`, optionally writes `cockpit/decisions/` |
| Onboard a new client | `cp -r clients/_TEMPLATE clients/<slug>` + fill `CLIENT.md` |
| Add a new service | new file in `brain/services/<service>.md` (atomic — one service per file) |
| Update pricing | edit the right file in `brain/pricing/` **and** add a `CHANGELOG.md` entry |
| Record a case study | `brain/case-studies/<client>-<year>.md`, tag it in `_index.md` |
| Capture a new partner/tool | `brain/partners-stack.md` |
| Install / connect an integration (MCP server, Google Drive) | `installations/<integration>/install.md` | AI-executable recipe; writes to `~/.claude/` etc., never back into `brain/` |
| Pull a Google Doc into the repo as Markdown | `tools/gdoc-sync/pull-gdoc.sh` | headless Claude + Drive MCP; scheduled via launchd (see its `README.md`) |
| Render / make a branded video (explainer, ad, reel, promo) | `/remotion-video` skill | drives `tools/remotion/` (quickstart in its `README.md`); canon in `clients/toggle/design-system/`; deliverables → `clients/<slug>/02-creative/` |
| Look up team member | `brain/team/roster.md` + `brain/team/bios/<name>.md` |
| Find anything | `MAP.md` (flat question → path index) |

---

## The seven principles

1. **Five hard zones, never mixed.** A pricing fact lives in exactly one place — `brain/pricing/rate-card-my.md` — and every generator, prompt, and client output references it by path. One edit, propagation everywhere.
2. **Atomic files beat mega-docs.** One concept per file. No `SERVICES.md` monoliths. Two people editing services on the same day never touch the same file.
3. **Generators ≠ prompts.** `generators/quote.md` is the *recipe* Claude executes. `prompts/copy/hooks/` is the *library* it pulls from. Don't blur them.
4. **Every generator opens with a `READS:` manifest.** First section of any generator lists only the files it needs — nothing else. Keeps context lean, keeps outputs accurate.
5. **Scoped `CLAUDE.md` per zone.** Each zone has its own router enforcing its zone-specific rule (brain = "cite, don't inline"; clients = "don't write back"; templates = "copy out, don't edit here").
6. **Client slugs are lowercase-kebab.** Geo-prefix (`my-`, `sg-`) once geo is confirmed — see `clients/CLAUDE.md`.
7. **Trunk-based with thin client branches.** `client/<slug>/<topic>` merges fast after lead review. PR + review *required* only for `brain/pricing/`. See `CONTRIBUTING.md`.

---

## What's in each zone (one line each)

- **`brain/services/`** — one file per service (performance marketing, SEO, content, web dev, creative, etc.)
- **`brain/pricing/`** — rate cards (SG, MY), bundles, line items, discount rules, `CHANGELOG.md` (mandatory on edits)
- **`brain/voice/`** — house voice, tone-by-channel, do-say, never-say
- **`brain/positioning/`** — elevator pitches, differentiators, competitors
- **`brain/verticals/`** — higher-ed, healthcare, fnb, b2b-saas, insurance, banking, e-commerce, real-estate
- **`brain/geos/`** — malaysia.md, singapore.md (regulatory, channel mix, currency notes)
- **`brain/case-studies/`** — one file per case (`unitar.md`, `kith-and-kin.md`, …) + tagged `_index.md`
- **`brain/team/`** — `roster.md` + `bios/<name>.md`
- **`brain/process.md`** — engagement models (audit, partnership, intensive, expansion, lab)
- **`brain/partners-stack.md`** — tools, vendors, freelancers
- **`brain/glossary.md`** — acronyms, terminology

---

## The `archive/quotes/` price-anchor memory

When a quote is sent, drop a copy into `archive/quotes/YYYY-MM-DD-<client>-<scope>.md`. The `/quote` generator reads the 2 nearest past quotes as price anchors, so good quotes compound. **Feed this directory — it pays you back every quote after.**

---

## Staleness guards

- `brain/pricing/` files carry `last_reviewed: YYYY-MM-DD` frontmatter.
- `/quote` warns if the rate card is 90+ days old. It does not refuse — pass `--accept-stale` to proceed anyway after a glance.
- `brain/voice/`, `positioning/`, and `case-studies/_index.md` carry `last_reviewed:` too. Quarterly brain-sync ritual to refresh.

---

## Contributing changes

Before pushing any changes to this repo, run the `/git-contribute` skill — it enforces the branch → commit → PR workflow and prevents direct pushes to `main`.

Skills are located at:
- `.claude/skills/` — Claude Code local resolution
- `.agents/skills/` — multi-agent / cross-platform resolution

Both locations hold the same skills. Use whichever your tool resolves first.

---

## What does NOT belong at root

- Service descriptions → `brain/services/`
- Case studies → `brain/case-studies/`
- Team profiles → `brain/team/`
- Process / engagement models → `brain/process.md`
- Anything client-specific → `clients/<slug>/`
- Anything tactical (a hook, a prompt, an ad copy) → `prompts/` or `clients/<slug>/02-creative/`

If you're tempted to add a `.md` at the repo root, **don't.** Add it under the right zone instead. Root holds only these docs — `README.md`, `CLAUDE.md` (this file), `MAP.md`, `CONTRIBUTING.md`, `TOGGLE_BRAIN_SETUP.md` (one-time repo bootstrap) — plus machine config: `.mcp.json` (shared MCP servers) and `skills-lock.json` (skills lockfile).
