# SignWell deck build

Rebuilds `SignWell - Brand Audit and Growth Plan (2026-09-13).pptx` from source on any
machine. Committed rather than left in a session scratchpad so the deck stays
reproducible, which is a deliberate departure from the VoiceRun precedent.

## Run it

```bash
npm install
npm run build      # writes the .pptx to your Desktop
npm run check      # layout check, must report zero problems
```

Override the output path with `OUT=/some/where/deck.pptx npm run build`.

The repo root is derived from this folder's location, so the isometric artwork and
the wordmark resolve without configuration.

## Files

| File | What it does |
|---|---|
| `build.js` | All 35 slides, and the only place deck copy lives |
| `theme.js` | The Stage 8a deck master mapped for pptxgenjs: palette, type scale, slide shells, tables, flow-map nodes, callouts |
| `check.js` | Layout checker. Hooks every `addText`, `addTable` and `addShape` during the build and estimates rendered height against declared box height |
| `dom-check2.js` | Re-runs the signup control sweep across SignWell's pages from the rendered DOM. Needs playwright |
| `loop-form.png` | The canonical loop-form placeholder SVG, rasterized, because PowerPoint handles SVG poorly through pptxgenjs |

## Two things that will bite you

**Fonts.** The canon calls for Inter Tight. It is not installed on the Windows desktop
and `assets/fonts/` is empty, so the deck ships in Segoe UI, which the design token
names as its own fallback. On a machine with Inter Tight, change `F` in `theme.js`.

**`check.js` must pass at zero before shipping.** pptxgenjs does not wrap or clip text
for you: it writes the box you asked for and PowerPoint spills whatever does not fit.
This checker caught seven text overflows, six table collisions and two flow maps that
ran off the slide edge. Callouts auto-grow to fit their copy; nothing else does.

To confirm visually on Windows, open the file in PowerPoint and export slides to PNG
through the COM object. Reading the slide XML is the fallback.

## Re-running the site checks

```bash
npx playwright install chromium
npm run dom
```

Reading SignWell's served HTML is not sufficient. Several pages inject their signup
control with JavaScript, so anything about signup controls must come from the rendered
DOM with the page fully scrolled. See section 7 of the client README.
