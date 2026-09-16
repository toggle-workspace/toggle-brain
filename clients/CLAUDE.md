# `clients/` — per-client outputs

Filled work, organised one folder per client. This is where the day-to-day happens.

---

## The rules of this zone

1. **Never write back into `brain/`.** If you discover a fact that should be canonical, open a separate PR against `brain/`.
2. **Pull voice/positioning/pricing from `brain/` by reference.** Don't paste them in.
3. **Each client has at minimum `CLIENT.md` and `style-pack.md`.** Subfolders (`00-brief/`, `01-strategy/`, `02-creative/`, etc.) are created *when you need them*, not as ceremony.
4. **One client per folder.** Don't share folders across clients even if they're related (e.g. Audaura/UNITAR vs Audaura/UNITAR-Creatives are two folders).
5. **Check `CLIENT.md` for a branding rule before producing any deliverable.** Some accounts are white-labeled and must carry no Toggle branding at all — `audaura-unitar` and `audaura-unitar-creatives` are both white-label through Audaura: no Toggle logo, and never the words "Toggle" or "Madcrack" in the document. The account's `CLIENT.md` is the authority.

---

## Slug convention

- **lowercase-kebab** — `audaura-unitar`, `ocean-flair-group`, `codefortynine`.
- **Geo prefix `<geo>-` once geo is confirmed** — `my-audaura-unitar`, `sg-singlife`. This makes regional grep trivial and pairs with CODEOWNERS rules.
- Current folders are unprefixed pending a geo audit. **Add prefixes in batch when geos are confirmed.**

---

## Skeleton (from `_TEMPLATE/`)

```
clients/<slug>/
├── CLIENT.md                # required — contacts, scope, billing, geo, access
├── style-pack.md            # required — client voice + visual overrides
├── 00-brief/                # optional — campaign briefs (created on demand)
├── 01-strategy/             # optional — strategy docs, audits, roadmaps
├── 02-creative/             # optional — copy, image prompts, video prompts
│   ├── copy/
│   ├── image-prompts/
│   └── video-prompts/
├── 03-media/                # optional — media plans, channel-by-channel
├── 04-reports/              # optional — YYYY-MM.md monthly performance
├── 05-meetings/             # optional — YYYY-MM-DD-<topic>.md
├── quotes/                  # optional — drafts; finals also copied to archive/quotes/
└── assets/                  # optional — small previews only; master files in Drive
```

Create subfolders as work requires them. Empty subfolders teach the team to ignore the structure.

---

## Onboarding a new client

```bash
cp -r clients/_TEMPLATE clients/<slug>
# Fill clients/<slug>/CLIENT.md
# Fill clients/<slug>/style-pack.md
git checkout -b client/<slug>/onboarding
git commit -am "feat(<slug>): client folder onboarded"
```

90 seconds to live.

---

## The "geo prefix" backlog

These current client folders should be reviewed for geo prefixing once geo is confirmed (search `CLIENT.md` for `geo:` to audit):

- `audaura-unitar`, `audaura-unitar-creatives` → likely `my-`
- `ijn-university-college`, `sunway-tes`, `al-hidayah-publication` → likely `my-`
- Others: confirm before prefixing.
