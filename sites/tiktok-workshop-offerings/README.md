# TikTok x Toggle workshop — per-organisation pathway pages

One Cloudflare Pages site. An attendee picks their organisation from the dropdown
at the top and sees the Toggle Bespoke pathway proposed for them: their
curriculum, their weighted modules, four engagement pillars, the outcomes, and a
relevant proof point.

Per-organisation QR codes deep-link to `?org=<slug>`, so a card handed to one
company lands on that company's page with no tapping.

## THE ONE RULE

**Everything in `dist/` is read by the person it describes, on their phone, at
the event.** They can also read every other organisation's page from the
dropdown. So the copy must contain nothing that ranks the room, nothing implying
we researched individuals, and nothing anyone could read as condescension.

Three things enforce this rather than trusting a careful writer:

1. `data/` and `build/` are **never deployed**. Only `dist/` is. `build.py`
   refuses to finish if anything but `index.html`, `_headers` and `qr/` is
   sitting in `dist/`.
2. `build.py` runs a phrase scan over all client-visible copy and fails the build
   on a hit. **Do not weaken that list to get a build through. Rewrite the copy.**
3. `build/verify.mjs` renders all 16 organisations headlessly and fails on empty
   fields, overflow-length values, and broken fallbacks.

## Layout

```
data/orgs.json      one object per organisation (the content, source of truth)
data/library.json   the 21-module library with client-facing descriptions
data/config.json    baseUrl, bookingUrl, email
build/template.html the page shell, CSS and client-side renderer
build/build.py      validates data, inlines it into the template -> dist/
build/qr.py         writes dist/qr/<slug>.svg + .png and dist/qr/print.html
build/verify.mjs    headless render check across every organisation
dist/               THE ONLY DEPLOYABLE DIRECTORY
dist/qr/print.html  printable A4 sheet of table cards, one per organisation
```

`dist/index.html` is fully self-contained: no fetches, no CDN, no web fonts, so
it renders instantly on venue wifi and works in light and dark.

## Build

```sh
# 1. real URLs first. The build FAILS on a placeholder, by design: a dead QR code
#    or a dead CTA is worse than no page at all.
$EDITOR data/config.json          # baseUrl + bookingUrl

# 2. build, generate codes, verify
python3 build/build.py
pip3 install segno                # once
python3 build/qr.py               # or: python3 build/qr.py https://your.pages.dev
node build/verify.mjs

# 3. preview
(cd dist && python3 -m http.server 8788)
```

All three are idempotent. Re-run `build.py` after any edit to `data/`.

## Deploy

```sh
npx wrangler pages deploy dist --project-name toggle-workshop-pathways
```

**Deploy `dist`, never `.`** — the repository root holds the source data and the
build scripts, which must not be served.

After the first deploy, put the real URL into `data/config.json` and **re-run
`build/qr.py`**, since the QR codes encode absolute URLs. Then print
`dist/qr/print.html` at A4. Confirm with `curl -sI <url>/data/orgs.json` that the
data files 404.

Deliberately no Basic Auth: attendees have to reach this from a QR code with no
password. `_headers` sets `noindex` so the page stays unlisted rather than gated.

## Editing content

Edit `data/orgs.json`, then rebuild. Each object needs `slug`, `name`, `sector`,
`headline`, `situation`, `pathway` (`code`, `name`, `depth`, `shape`, `why`),
exactly 4 `pillars`, `modules` matching `library.json`, 3 to 5 `outcomes`, and
`proof`. `focus: true` marks the modules weighted heaviest, and it must stay a
minority of the list or the weighting says nothing.

Rules the validator enforces, and why:

- **Alphabetical order by `name`, `other` last.** Any other order is a ranking,
  and the printed card sheet reads straight off this array.
- **`pathway.depth`** holds the ELI value for internal scoping but is **not
  rendered**. Showing a depth number next to a module count let anyone with the
  dropdown rank the room.
- **`pathway.code` is 8 characters max** and `shape` is 200 max. The badge is a
  fixed box, and `shape` renders as prose.
- **No case-study figure may appear on two organisations' pages.** One case can
  serve several pages, but each must draw a different fact from it, or the
  bespoke claim collapses the moment two clients compare notes.

Every performance number must appear verbatim in a file under
`brain/case-studies/`. Every fact about an organisation must be publicly
agreeable to that organisation.

The `other` slug is the fallback for walk-ins and anyone not listed. Keep it.

## Curriculum source

Module ids, names, tracks and pathway module order come from
`~/Downloads/curriculum-pathways.html`. That document is marked "pathway set not
yet locked", and these pages present the pathways as settled, which is fine for a
proposal the footer frames as a starting point. If the pathway set changes,
update `data/library.json` and the affected organisations together, then rebuild.

## Adding an organisation

1. Append an object to `data/orgs.json` and re-sort alphabetically.
2. `python3 build/build.py` — it names whatever is missing or inconsistent.
3. `python3 build/qr.py && node build/verify.mjs`.
