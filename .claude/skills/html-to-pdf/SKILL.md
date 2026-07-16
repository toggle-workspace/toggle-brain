---
name: html-to-pdf
description: Convert any HTML file in this repo to a clean PDF with headless Chrome. Injects sane print CSS (page size, margins, break rules, color preservation, overflow guards) only when the source lacks it, and drops the PDF next to the source. Use when someone says "convert this to PDF", "export the deck/quote/proposal as PDF", "make a PDF of this HTML", or types /html-to-pdf.
argument-hint: <path/to/file.html> [flags]
---

# HTML to PDF

Convert an HTML file to a print-faithful PDF. The converter script lives next to this file at `convert.mjs`. It wraps headless Chrome, never modifies the source HTML, and writes the PDF beside the source by default.

## Request

$ARGUMENTS

If a path is given above, convert that file now following the workflow below. If the arguments are empty, infer the target file from the conversation.

## Requirements

Google Chrome (or Chromium) installed, plus Node 18 or newer. The script auto-finds Chrome at the standard macOS path; override with `--chrome <path>` or `CHROME_PATH`. Files that load Google Fonts need network access at convert time; without it, type falls back to system fonts and tightly fitted layouts can reflow.

## Workflow

1. **Read the head of the HTML first.** Open the file and look at its `<style>` block (the first 100 to 200 lines usually suffice). You are answering four questions: does it declare `@page`, is it a fixed-size slide deck, is it a wide flow document, and does any content render through JavaScript.

2. **Run the converter.** From the repo root:

   ```bash
   node .claude/skills/html-to-pdf/convert.mjs "<path/to/file.html>"
   ```

   The script classifies the file and prints its decision to stderr:
   - **Source has `@page`**: converted as-is, no injection. This covers the repo's quote HTMLs, tech packs, UNITAR decks, the HWC roadmap, and `proposal-master.html`. Their authors already tuned the print CSS; do not second-guess it.
   - **Slide deck detected** (a rule pinning width 900 to 1600px and height 500 to 1000px, like `.slide{width:1280px;height:720px}`): injects `@page` at the exact slide size with zero margin, one slide per page, color preservation.
   - **Wide flow document** (fixed content width above 770px, no `@page`): injects a proportional A4-ratio page at the content's designed width, so Chrome scales it to paper without reflow, clipping, or spill.
   - **Everything else**: A4 portrait, 14mm margins, break rules that keep tables, figures, and headings intact.

   In every injected case the block also adds `print-color-adjust: exact` (dark themes and colored bands survive), `max-width: 100%` on media, and break-inside guards.

3. **Heed the warnings.** The script warns on stderr when it detects content that will silently go missing: closed `<details>` elements (fix with `--open-details`) and `max-height: 0` accordion patterns (fix with `--css`). Do not deliver a PDF while one of these warnings is unaddressed.

4. **Verify before delivering.** Check the reported size and page count, then read the PDF directly (the Read tool renders PDF pages) or open it (`open <file.pdf>`). Confirm no clipped right edge, no white-on-white text, no element split across a page break, and no missing accordion or FAQ copy. A large blank region before a tall image or table means the injected `break-inside: avoid` pushed it to the next page; relax it with `--css 'img{break-inside:auto}'` if the gap looks worse than the split. A PDF nobody looked at is not a deliverable.

5. **Output location.** The PDF lands next to the source with the same basename. Pass a second positional argument to place it elsewhere. Client deliverables stay inside the client's folder per repo rules.

## Flags

| Flag | Use when |
|---|---|
| `--page-size A4-landscape` (or `letter`, `1280x720`, any `WxH` in px) | The auto-detected size is wrong. Warning: forcing a small page (A4-landscape) onto a tall flow document fragments its sections across many pages; prefer the auto-detected proportional page for those. Overrides an authored `@page` too, with a warning. |
| `--margin 0` / `--margin 10mm` | Override the injected margin. |
| `--settle 15000` | JavaScript builds the content (charts, count-ups). The value is Chrome's virtual time budget in ms; it fast-forwards timers and animations. `Sales/profitability-dashboard.html` needs this. |
| `--css '<rules>'` | File-specific fixes, repeatable. Example, forcing collapsed accordions visible: `--css '.acc-b{max-height:none!important}'`. On a file with its own `@page`, only these rules are injected; the author's print CSS stays in charge. |
| `--open-details` | The page uses `<details>` accordions; closed ones hide their content in print. Adds `open` to all of them in the temp copy. `components-6d.html` needs this. |
| `--force-inject` | The source has `@page` but colored backgrounds still drop (it lacks `print-color-adjust`). |
| `--no-inject` | No CSS injection at all; convert as authored. |
| `--keep-temp` | Debugging: inspect the patched copy the script actually printed. |
| `--chrome <path>` | Chrome binary override; `CHROME_PATH` works too. |

## Known repo cases

Every HTML in the repo was converted and visually verified when the skill was built (2026-07). Patterns to reuse:

- **Print-ready as-is**: `archive/quotes/*.html`, `templates/quotations/quotation.html`, tech packs, `clients/audaura-unitar/01-strategy/*.html`, `clients/COO/HWC x Media Prima/access-onboarding-roadmap.html`, `clients/toggle/design-system/proposal-master.html`, `clients/smart-reader-*/proposal-*.html`. Plain run, no flags.
- **Dark decks missing print CSS**: `deck-master.html`, `case-onepagers.html`. Auto-detected as slide decks; injection preserves the dark background.
- **Wide strategy docs and dashboards** (1040 to 1280px wraps): Valetex guidebook, `clients/toggle/01-strategy/*.html`, `hwc-mediaprima-scope-alignment.html`, `marketing-9.html`. Auto-detected as wide flow docs; the default output is correct, and forcing A4-landscape on these fragments them badly.
- **JS-built dashboard**: `Sales/profitability-dashboard.html`. Run with `--settle 15000` so the Chart.js canvases finish drawing.
- **Oddle partnership deck**: has a `beforeprint` handler that resolves its animations, but its accordions stay collapsed. Run with `--css '.acc-b{max-height:none!important;opacity:1!important}'` and verify the accordion slides. Caution: the expanded content on the partnership-terms slide runs close to the bottom of the fixed 720px page; check that nothing is clipped.
- **FAQ galleries with `<details>`** (`components-6d.html`): run with `--open-details` or the answers are missing from the PDF.
- **`design-systems/bru-hwc/sample.html`** depends on a sibling `tokens.css`; convert it in place so the relative link resolves (the script always writes its temp copy next to the source for exactly this reason). Its fixed-size preview cards leave dead space below each page; a matching `--page-size` tightens it if that matters.

## Limits

The script never edits the source HTML. Its detectors only read CSS inside `<style>` blocks, so a file whose print CSS lives in a linked stylesheet is treated as having no `@page` and gets the injected geometry; use `--no-inject` if that file's own print CSS should win. Component galleries (`clients/toggle/design-system/components-*.html`, `icons.html`, `charts.html`) are working references, not deliverables; they convert cleanly, but expect arbitrary pagination between components. For a client-facing PDF, start from a master template instead.
