# `Pitching/` — pre-win prospect work

One folder per prospect we're actively pitching. This is where pitch plans, decks, and proposals are built *before* a deal is won. It mirrors `clients/` in shape and rules — the only difference is lifecycle stage.

---

## The rules of this zone

1. **Never write back into `brain/`.** Same as `clients/`. Pull voice, positioning, pricing, services, and case studies from `brain/` **by reference (cite the path)** — don't paste them in. If you discover a canonical fact, open a separate PR against `brain/`.
2. **One prospect per folder**, named with the same slug convention as clients (`lowercase-kebab`, geo prefix `<geo>-` once confirmed).
3. **At minimum `CLIENT.md` (with `status: prospect`) and `style-pack.md`.** Subfolders created on demand — `01-strategy/` for the pitch plan / proposal / deck, `05-meetings/` for discovery and pitch-call notes, `assets/` for before/after captures.
4. **Outputs only.** Like `clients/`, this zone never holds canonical knowledge.

---

## Lifecycle — how a prospect moves through here

```
Pitching/<slug>/        ← while pitching (status: prospect)
   │
   ├── won  → git mv Pitching/<slug> clients/<slug>   (flip CLIENT.md status: prospect → active)
   └── lost → archive it (or set status: closed-lost and leave for the post-mortem)
```

**Win = graduation to `clients/`.** Everything built here (strategy, brand work, proposal) moves with the folder, so nothing is re-keyed. This is why `Pitching/` and `clients/` share the same skeleton.

---

## Skeleton (from `clients/_TEMPLATE/`)

```
Pitching/<slug>/
├── CLIENT.md            # required — status: prospect; profile, contacts, scope-in-discussion
├── style-pack.md        # required — for a rebrand pitch this doubles as the brief (current brand = TBD)
├── 01-strategy/         # pitch plan, brand strategy, proposal, deck
├── 05-meetings/         # discovery + pitch-call notes (YYYY-MM-DD-<topic>.md)
└── assets/              # small previews only — before/after captures, reference images
```

Start a pitch:

```bash
cp -r clients/_TEMPLATE Pitching/<slug>
rm Pitching/<slug>/README.md          # the template README is for the template, not a real folder
# fill CLIENT.md (status: prospect) + style-pack.md
```

---

## Generators that write here

- **`/proposal`** (`generators/proposal.md`) reads `Pitching/<slug>/CLIENT.md` and writes the proposal to `Pitching/<slug>/01-strategy/`.

---

## Known integration gap

The daily-ops global skills (`/toggle-brief`, `/toggle-status`) currently glob `clients/*/CLIENT.md` and will **not** surface prospects living here. To include active pitches in those views, those skills need to also glob `Pitching/*/CLIENT.md`. Until then, check `Pitching/` directly for prospect status.
