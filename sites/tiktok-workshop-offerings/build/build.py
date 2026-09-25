#!/usr/bin/env python3
"""Build dist/index.html by inlining the org data and module library into the template.

Usage:  python3 build/build.py
Reads:  build/template.html, data/orgs.json, data/library.json, data/config.json
Writes: dist/index.html, dist/_headers

Everything client-facing lands in dist/ and NOTHING else does. dist/ is the only
directory that gets deployed, so source, data and this validator cannot leak to
a public URL. See README.md, "Deploy".
"""
import json, re, sys, shutil, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
TPL = ROOT / "build" / "template.html"
DIST = ROOT / "dist"
OUT = DIST / "index.html"

VALID_TRACKS = {"ai", "mk", "ax"}
REQUIRED_ORG = {"slug", "name", "sector", "headline", "situation",
                "pathway", "pillars", "modules", "outcomes", "proof"}
REQUIRED_PATH = {"code", "name", "depth", "shape", "why"}

# Phrases that must never reach a client-facing page. Sourced from the internal
# prospect research; if any appears, the build fails loudly.
BANNED = [
    "tier 1", "tier 2", "tier 3", "tier 4", "tier-1", "tier-2", "tier-3", "tier-4",
    "tiers",
    "priority stack", "deprioritise", "deprioritize", "close probability",
    "linkedin", "mutual connection", "warm intro", "expert buyer",
    "budget signal", "decision chain",
    "hrdc", "levy", "competitor", "rm20", "rm4k", "rm300k", "rm/mo",
    "weak organic", "mediocre", "immature", "naive", "inflated",
    "ticket size", "fastest close", "pitch must travel",
    "decision chain", "budget authority", "solo freelancer",
    "needs internal sell", "absorb content", "proprietary", "kinesso", "khazanah",
    "spac", "not findable", "unconfirmed", "tbd",
]

def load(name):
    p = ROOT / "data" / name
    if not p.exists():
        sys.exit(f"missing data file: {p}")
    return json.loads(p.read_text(encoding="utf-8"))

def fail(msg):
    sys.exit(f"BUILD FAILED: {msg}")

def main():
    orgs = load("orgs.json")
    library = load("library.json")
    config = load("config.json")

    if not isinstance(orgs, list) or not orgs:
        fail("orgs.json must be a non-empty array")

    slugs = set()
    for o in orgs:
        missing = REQUIRED_ORG - o.keys()
        if missing:
            fail(f"{o.get('slug','?')}: missing keys {sorted(missing)}")
        if o["slug"] in slugs:
            fail(f"duplicate slug: {o['slug']}")
        slugs.add(o["slug"])
        if not re.fullmatch(r"[a-z0-9-]+", o["slug"]):
            fail(f"bad slug: {o['slug']}")
        pmissing = REQUIRED_PATH - o["pathway"].keys()
        if pmissing:
            fail(f"{o['slug']}: pathway missing {sorted(pmissing)}")
        if len(o["pillars"]) != 4:
            fail(f"{o['slug']}: expected 4 pillars, got {len(o['pillars'])}")
        if not o["modules"]:
            fail(f"{o['slug']}: no modules")
        for m in o["modules"]:
            if m["track"] not in VALID_TRACKS:
                fail(f"{o['slug']}/{m['id']}: bad track {m['track']!r}")
            if m["id"] not in library:
                fail(f"{o['slug']}: module {m['id']} not in library.json")
            if m["name"] != library[m["id"]]["name"]:
                fail(f"{o['slug']}/{m['id']}: name {m['name']!r} != library {library[m['id']]['name']!r}")
            if m["track"] != library[m["id"]]["track"]:
                fail(f"{o['slug']}/{m['id']}: track disagrees with library")
        for k in ("name", "sector", "headline", "situation"):
            if not str(o.get(k, "")).strip():
                fail(f"{o['slug']}: empty {k}")
        for k in REQUIRED_PATH:
            if not str(o["pathway"][k]).strip():
                fail(f"{o['slug']}: empty pathway.{k}")
        # the badge is a fixed box and shape is prose, so both have real limits
        if len(o["pathway"]["code"]) > 8:
            fail(f"{o['slug']}: pathway.code {o['pathway']['code']!r} will overflow the badge")
        if len(o["pathway"]["shape"]) > 200:
            fail(f"{o['slug']}: pathway.shape is {len(o['pathway']['shape'])} chars, too long to read")
        for i, pl in enumerate(o["pillars"]):
            for k in ("title", "body"):
                if not str(pl.get(k, "")).strip():
                    fail(f"{o['slug']}: pillar {i + 1} has an empty {k}")
        for m in o["modules"]:
            if not str(m.get("why", "")).strip():
                fail(f"{o['slug']}/{m['id']}: empty why")
        for i, x in enumerate(o["outcomes"]):
            if not str(x).strip():
                fail(f"{o['slug']}: outcome {i + 1} is empty")
        if not o.get("proof", {}).get("body", "").strip():
            fail(f"{o['slug']}: missing proof")
        if not (3 <= len(o["outcomes"]) <= 5):
            fail(f"{o['slug']}: expected 3 to 5 outcomes, got {len(o['outcomes'])}")
        nfocus = sum(1 for m in o["modules"] if m.get("focus"))
        if nfocus and (nfocus == len(o["modules"])
                       or nfocus > max(2, round(len(o["modules"]) * 0.45))):
            fail(f"{o['slug']}: {nfocus} of {len(o['modules'])} modules flagged focus, "
                 "so the weighting says nothing. Weight fewer.")

    if "other" not in slugs:
        fail("no 'other' fallback org")

    # data/orgs.json must stay alphabetical. Any other order is a ranking, and
    # the printed card sheet and view-source both read straight off this array.
    named = [o["name"] for o in orgs if o["slug"] != "other"]
    if named != sorted(named, key=str.lower):
        fail("data/orgs.json is not in alphabetical order by name. Any other "
             "order publishes a ranking. Re-sort it, with 'other' last.")
    if orgs[-1]["slug"] != "other":
        fail("the 'other' fallback must be the last entry in data/orgs.json")

    if len(library) != 21:
        fail(f"library.json should hold 21 modules, holds {len(library)}")
    for mid, m in library.items():
        if m["track"] not in VALID_TRACKS:
            fail(f"library/{mid}: bad track")
        for k in ("name", "line"):
            if not m.get(k):
                fail(f"library/{mid}: empty {k}")

    # leak scan across every client-visible string
    blob = json.dumps(orgs, ensure_ascii=False).lower() + " " + \
           json.dumps(library, ensure_ascii=False).lower()
    # normalise escaped newlines and runs of whitespace first, so a phrase that
    # straddles a line break in the source copy cannot slip the scan
    blob = re.sub(r"(\\n|\s|\u00a0)+", " ", blob)
    # word-boundary matching, so "spac" cannot fire on "workspace"
    hits = sorted({b for b in BANNED
                   if re.search(r"\b" + re.escape(b).replace(r"\ ", r"\s+") + r"\b", blob)})
    if hits:
        fail("internal-only language found in client-facing copy: " + ", ".join(hits))

    for k in ("bookingUrl", "email"):
        if not config.get(k) or "REPLACE-ME" in config[k]:
            fail(f"config.json {k} is still a placeholder. Set the real value before building.")
    if not config["bookingUrl"].startswith("https://"):
        fail("config.json bookingUrl must be an https URL")

    tpl = TPL.read_text(encoding="utf-8")
    def inject(marker, value):
        nonlocal tpl
        pat = re.compile(r"/\*__" + marker + r"__\*/.*?/\*__END__\*/", re.S)
        if not pat.search(tpl):
            fail(f"template placeholder __{marker}__ not found")
        tpl = pat.sub(lambda _: json.dumps(value, ensure_ascii=False, indent=1), tpl, count=1)

    inject("ORGS", orgs)
    inject("LIBRARY", library)
    inject("CONTACT", {"bookingUrl": config["bookingUrl"], "email": config["email"]})

    DIST.mkdir(exist_ok=True)
    # check the deploy directory BEFORE writing, so a failing build never leaves
    # a fresh index.html sitting next to something that must not ship
    ALLOWED = {"index.html", "_headers", "qr"}
    strays = sorted(q.name for q in DIST.iterdir() if q.name not in ALLOWED)
    if strays:
        fail("dist/ holds files that must never be published: " + ", ".join(strays))

    OUT.write_text(tpl, encoding="utf-8")
    # _headers must travel with the deployable output, not sit beside the source
    shutil.copyfile(ROOT / "_headers", DIST / "_headers")
    kb = OUT.stat().st_size / 1024
    print(f"built {OUT.relative_to(ROOT)}  {kb:.1f} KB  {len(orgs)} orgs  {len(library)} modules")
    print("deployable: dist/ only  (source, data and this validator stay behind)")

if __name__ == "__main__":
    main()
