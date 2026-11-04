---
last_reviewed: 2026-10-17
owner: Yi Yang
---

# toggle.solutions redesign mockups

Two design concepts for the Toggle website, home and About pages, each in light and dark. Built from the approved live-site copy and the October 2026 founders photoshoot (Drive folder `1JdWw3zx_Rm4EunAqQKZiccisJDskEvoU`).

| Path | What it is |
|---|---|
| `index.html` | Hub page that links both concepts and lists open review points |
| `concept-a/` | **Clean Room.** Light-first, Apple-style. Founders lens reveal, stop-motion portraits, stacked value cards |
| `concept-b/` | **Growth Console.** Dark-first, blueprint grid. Duotone scanner, services readout, results table, tear-off audit ticket |
| `shared/content.js` | All approved copy as data. Both concepts render from it, so one edit updates both |
| `shared/wordmark.js` | The outlined `toggle` wordmark as inline SVG (never re-typeset) |
| `assets/` | Processed photos (`team/<id>-0..5.webp` are the six flipbook frames per person), monochrome client logos, case creatives |

## Running it

Open `index.html` in a browser, or serve the folder (`python3 -m http.server 8811 --directory .`). No build step. GSAP 3.12.5, ScrollTrigger and Lenis 1.1.13 load from cdnjs and jsDelivr. Add `?theme=light` or `?theme=dark` to any page URL to force a theme.

## Copy rules

- Every visible string in `shared/content.js` is lifted from toggle.solutions as approved. Three typos were fixed ("anually", "timeas", "Management(CRM)").
- The live site has em dashes in three case blurbs and one blog excerpt. They are kept verbatim and should be rewritten before launch, per `brain/voice/writing-standards.md`.
- Anything new is marked `// proposed copy` in the concept JS, or `proposed: true` in `content.js`.

## Open items

1. Confirm the founder name tags on `assets/photos/founders.webp` (shoot frame 3, left to right: Shaun, Zaid, Marcus, Viknesh, Jordan, Aizad). Positions live in `TOGGLE.foundersPhoto`.
2. Approve or drop the three new About sections (results timeline, team of three, full-funnel diagram). They reuse FAQ answers word for word.
3. Case study, service and blog links point to anchors; wire them to real routes when this moves into the production codebase.
