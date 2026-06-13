# Toggle Brain

The internal knowledge repository for **Toggle Solutions** — our canonical knowledge, generators, prompt library, templates, and client work, all in one place.

> Toggle Solutions — Your Digital Growth Partner · [toggle.solutions](https://toggle.solutions/) · hello@toggle.solutions · Viknesh (+60) 125688681

---

## Start here

1. **Read [`CLAUDE.md`](./CLAUDE.md)** — the root router. It explains the five-zone structure and where everything lives.
2. **Read [`MAP.md`](./MAP.md)** — the flat "question → path" index. Fastest way to find a file.
3. **Read [`CONTRIBUTING.md`](./CONTRIBUTING.md)** — branching, naming, PR rules, CODEOWNERS.

---

## The five zones

| Zone | Purpose | Examples |
|---|---|---|
| [`brain/`](./brain) | Canonical knowledge (read-mostly) | services, pricing, voice, positioning, case studies, team, process |
| [`generators/`](./generators) | Slash-command recipes (entry points) | `/quote`, `/proposal`, `/tiktok-hooks`, `/caption` |
| [`prompts/`](./prompts) | Reusable prompt library (no entry points) | copy snippets, platform prompts, image/video tool prompts, style-packs |
| [`templates/`](./templates) | Empty shells (copy out, don't edit here) | briefs, proposals, quotations, reports, decks |
| [`clients/`](./clients) | Per-client outputs (filled work) | one folder per client, copy of `_TEMPLATE` |

Plus: [`playbooks/`](./playbooks) (runbooks), [`assets/`](./assets) (shared non-client binaries), [`archive/`](./archive) (closed engagements + quote ledger).

---

## Quick starts

### I want to build a quote for a client
```
1. Make sure clients/<slug>/CLIENT.md is up to date (contacts, scope, geo).
2. Invoke /quote — it reads brain/pricing/, brain/services/, and the 2 nearest past quotes
   in archive/quotes/ as price anchors.
3. Output lands in clients/<slug>/quotes/YYYY-MM-DD-<scope>.md.
4. On send, copy the final version into archive/quotes/ so future quotes have memory.
```

### I want to onboard a new client
```
cp -r clients/_TEMPLATE clients/<lowercase-kebab-slug>
# fill clients/<slug>/CLIENT.md (contacts, scope, billing, geo)
# fill clients/<slug>/style-pack.md (voice + visual overrides)
# create subfolders (00-brief/, 01-strategy/, etc.) only when you need them
```

### I want to write TikTok hooks for a client
```
1. Invoke /tiktok-hooks — generator reads brain/voice/, prompts/platforms/tiktok.md,
   and the client's style-pack.md.
2. Output lands in clients/<slug>/02-creative/copy/.
```

### I want to update pricing
```
1. Edit the right file in brain/pricing/ (rate-card-my.md, bundles.md, etc.).
2. Add a one-line entry to brain/pricing/CHANGELOG.md (mandatory — PRs are blocked otherwise).
3. Update the file's last_reviewed: YYYY-MM-DD frontmatter.
4. Open a PR — CODEOWNERS routes brain/pricing/ edits for review.
```

### I want to add a case study
```
1. Create brain/case-studies/<client>-<year>.md from the existing files as a shape reference.
2. Tag it in brain/case-studies/_index.md (vertical, service, geo).
3. Link from the relevant brain/services/<service>.md files.
```

---

## The seven principles (short version)

1. **Five hard zones, never mixed.** One fact → one file → cited everywhere.
2. **Atomic files beat mega-docs.** No more `SERVICES.md` monoliths.
3. **Generators ≠ prompts.** Recipes vs library.
4. **Every generator opens with a `READS:` manifest.** Surgical context, not bulk.
5. **Scoped `CLAUDE.md` per zone.** Each zone's `CLAUDE.md` enforces its rule.
6. **Client slugs are lowercase-kebab.** Geo-prefix when geo is confirmed.
7. **Trunk-based with thin client branches.** Hard review only on `brain/pricing/`.

Full reasoning in [`CLAUDE.md`](./CLAUDE.md).

---

## Daily workflow (Monday morning)

```bash
git pull --rebase
git checkout -b client/<slug>/<topic>     # e.g. client/audaura-unitar/wk24-creative
# work inside clients/<slug>/ — pull voice/positioning from brain/ by reference
git commit -m "feat(audaura-unitar): wk24 TikTok hook variants"
# client work: merge same-day after lead review
# touching brain/ / pricing/ / templates/ / playbooks/? open a PR, +1 reviewer required for pricing
```

---

## Three things to know up-front

- **`archive/quotes/` is price-anchor memory.** Every sent quote goes here. The `/quote` generator uses it. Feed it.
- **`brain/pricing/CHANGELOG.md` is mandatory.** Any pricing edit must add a line. The PR template enforces it.
- **Don't edit `templates/` directly.** Copy out, fill in `clients/<slug>/`. Templates are shells.

---

## MCP server

This repo is exposed as an MCP server via **[toggle-mcp](https://github.com/toggle-workspace/toggle-mcp)** — a separate repo that reads `content/` (a git submodule pointing here) and serves the knowledge base as MCP resources, prompts, and tools.

- **Install**: follow `installations/toggle-mcp/install.md` (paste it into Claude Code — it runs the full setup)
- **Auto-sync**: every push to `main` here triggers a rebuild in `toggle-mcp` via GitHub Actions (see `TOGGLE_BRAIN_SETUP.md`)
- **Local dev**: the server lives at `~/Desktop/toggle-mcp` — run `npm run dev` there to test changes

---

## Status

Repo restructure landed June 2026 (see git history). Existing content migrated:
- `SERVICES.md` → `brain/services/` (atomic, one file per service)
- `CASE_STUDIES.md` → `brain/case-studies/` (one file per case, tagged `_index.md`)
- `TEAM.md` → `brain/team/roster.md` + `brain/team/bios/`
- `PROCESS.md` → `brain/process.md`

Pricing, voice, positioning, verticals, geos, glossary, partners-stack are stubbed — fill as you go.

---

_Last updated: June 2026_
