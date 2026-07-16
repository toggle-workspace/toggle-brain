#!/usr/bin/env node
// html-to-pdf converter: wraps headless Chrome --print-to-pdf and injects
// print CSS when the source HTML has no @page rule. Never modifies the
// source file; injection happens in a temp copy written next to it so
// relative assets (images, local stylesheets) keep resolving.
//
// Usage: node convert.mjs <input.html> [output.pdf] [options]
// Options:
//   --page-size <spec>   Force page size: "A4", "A4-landscape", "letter",
//                        "letter-landscape", or "<W>x<H>" in px (e.g. 1280x720)
//   --margin <val>       Margin for injected @page (e.g. 14mm, 28px, 0). Default: auto
//   --settle <ms>        Chrome virtual time budget in ms. Default: 10000
//   --css <string>       Extra CSS injected into the temp copy (repeatable).
//                        Does not override an authored @page.
//   --open-details       Add the open attribute to every <details> in the temp copy
//   --force-inject       Full injection even when the file already has @page
//   --no-inject          No CSS injection (a temp copy is still made for --open-details)
//   --keep-temp          Keep the temp copy for debugging
//   --chrome <path>      Chrome binary override (also honors $CHROME_PATH)

import { readFileSync, writeFileSync, unlinkSync, existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname, basename, join } from 'node:path';
import { pathToFileURL } from 'node:url';

function fail(msg) { console.error(`error: ${msg}`); process.exit(1); }
function warn(msg) { console.error(`warning: ${msg}`); }

// ---------- argument parsing ----------
const argv = process.argv.slice(2);
const opts = { css: [] };
const positional = [];
function value(flag, i) {
  const v = argv[i];
  if (v === undefined || v.startsWith('--')) fail(`${flag} needs a value`);
  return v;
}
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  switch (a) {
    case '--page-size': opts.pageSize = value(a, ++i); break;
    case '--margin': opts.margin = value(a, ++i); break;
    case '--settle': {
      opts.settle = parseInt(value(a, ++i), 10);
      if (!Number.isFinite(opts.settle) || opts.settle < 0) fail('--settle needs a number of milliseconds');
      break;
    }
    case '--css': opts.css.push(value(a, ++i)); break;
    case '--open-details': opts.openDetails = true; break;
    case '--force-inject': opts.forceInject = true; break;
    case '--no-inject': opts.noInject = true; break;
    case '--keep-temp': opts.keepTemp = true; break;
    case '--chrome': opts.chrome = value(a, ++i); break;
    default:
      if (a.startsWith('--')) fail(`unknown option ${a}`);
      positional.push(a);
  }
}
if (positional.length < 1) fail('usage: node convert.mjs <input.html> [output.pdf] [options]');
if (opts.noInject && (opts.forceInject || opts.css.length || opts.pageSize || opts.margin)) {
  fail('--no-inject cannot be combined with --force-inject, --css, --page-size, or --margin');
}

const input = resolve(positional[0]);
if (!existsSync(input)) fail(`input not found: ${input}`);
const output = resolve(positional[1] ?? input.replace(/\.html?$/i, '') + '.pdf');
const settle = opts.settle ?? 10000;

// ---------- Chrome discovery ----------
const chromeCandidates = [
  opts.chrome,
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
].filter(Boolean);
const chrome = chromeCandidates.find(p => existsSync(p));
if (!chrome) fail('no Chrome binary found; pass --chrome <path> or set CHROME_PATH');

// ---------- CSS scanning ----------
// The detectors only see CSS inside <style> blocks. Print CSS living in a
// linked stylesheet is invisible here; SKILL.md documents that limit.
const html = readFileSync(input, 'utf8');
const rawStyles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]).join('\n');
const styleText = rawStyles.replace(/\/\*[\s\S]*?\*\//g, ' ');

// Brace-balanced walk that yields {sel, body, media} for every declaration
// rule. @keyframes and other non-media at-rule blocks are skipped entirely;
// @media blocks recurse with their prelude recorded so callers can tell a
// top-level rule from a mobile-only or print-only one.
function collectRules(css) {
  const rules = [];
  function walk(text, media) {
    let i = 0;
    while (i < text.length) {
      const open = text.indexOf('{', i);
      if (open === -1) break;
      const prelude = text.slice(i, open).trim();
      let depth = 1, j = open + 1;
      while (j < text.length && depth > 0) {
        if (text[j] === '{') depth++;
        else if (text[j] === '}') depth--;
        j++;
      }
      const body = text.slice(open + 1, j - 1);
      if (prelude.startsWith('@media')) walk(body, prelude);
      else if (prelude.startsWith('@supports')) walk(body, media);
      else if (!prelude.startsWith('@')) {
        for (const sel of prelude.split(',')) rules.push({ sel: sel.trim(), body, media });
      }
      i = j;
    }
  }
  walk(css, null);
  return rules;
}
const allRules = collectRules(styleText);
// Rules that apply when printing: top level or inside @media print.
const printApplicable = allRules.filter(r => !r.media || /\bprint\b/.test(r.media));

const hasAtPage = /@page\b/.test(styleText);
const hasPrintMedia = /@media[^{]*\bprint\b/.test(styleText);
const hasColorAdjust = /print-color-adjust/.test(styleText);

const px = (body, prop) => {
  const m = body.match(new RegExp(`(?:^|[;\\s{])${prop}\\s*:\\s*(\\d+)px`));
  return m ? +m[1] : null;
};

// Widest fixed content width among print-applicable rules. Resolves one
// level of CSS custom properties so max-width: var(--maxw) counts too.
function detectContentWidth() {
  const vars = new Map();
  for (const m of styleText.matchAll(/(--[\w-]+)\s*:\s*(\d+)px/g)) vars.set(m[1], +m[2]);
  let max = 0;
  const consider = w => { if (w >= 700 && w <= 1600 && w > max) max = w; };
  for (const { body } of printApplicable) {
    const w = px(body, 'width') ?? px(body, 'max-width');
    if (w) consider(w);
    const v = body.match(/(?:max-)?width\s*:\s*var\((--[\w-]+)\)/);
    if (v && vars.has(v[1])) consider(vars.get(v[1]));
  }
  return max || null;
}

// A slide deck rule pins both width and exact height to deck-like pixel
// dimensions on a simple selector, e.g. .slide{width:1280px;height:720px}.
// min-height does not count (that is a hero-banner idiom, not a slide).
function detectSlideRule() {
  for (const { sel, body, media } of printApplicable) {
    if (media && !/\bprint\b/.test(media)) continue;
    if (!/^[.#]?[\w-]+$/.test(sel)) continue;
    const W = px(body, 'width');
    const H = px(body, 'height');
    if (W && H && W >= 900 && W <= 1600 && H >= 500 && H <= 1000 && W > H) {
      return { selector: sel, W, H };
    }
  }
  return null;
}

// Selectors whose print-applicable rules pin position:fixed or sticky.
// Chrome repeats fixed elements on every printed page, stamped over the
// content, so fixed gets hidden and sticky returns to normal flow.
// Mobile-only rules (@media with a max-width prelude) are ignored.
function detectPinnedSelectors() {
  const fixed = [], sticky = [];
  for (const { sel, body, media } of printApplicable) {
    if (media && !/\bprint\b/.test(media)) continue;
    if (!/^[\w.#\s>:,\[\]="'-]+$/.test(sel) || sel.length > 120) continue;
    if (/position\s*:\s*fixed/.test(body)) fixed.push(sel);
    else if (/position\s*:\s*sticky/.test(body)) sticky.push(sel);
  }
  return { fixed, sticky };
}

// ---------- decide page setup ----------
const NAMED_SIZES = {
  'a4': 'A4', 'a4-landscape': 'A4 landscape',
  'letter': 'letter', 'letter-landscape': 'letter landscape',
};
function parsePageSize(spec) {
  const named = NAMED_SIZES[spec.toLowerCase()];
  if (named) return named;
  const m = spec.match(/^(\d+)x(\d+)$/i);
  if (m) return `${m[1]}px ${m[2]}px`;
  fail(`bad --page-size "${spec}"; use A4, A4-landscape, letter, letter-landscape, or WxH in px`);
}

const contentW = detectContentWidth();
let slide = detectSlideRule();
// A slide match narrower than the widest flow container is a framed asset
// inside a flowing gallery (e.g. a scaled social-post mock), not a deck.
if (slide && contentW && contentW > slide.W) slide = null;

let pageSizeCss, marginCss, breakCss = '', mode;
if (opts.pageSize) {
  pageSizeCss = parsePageSize(opts.pageSize);
  marginCss = opts.margin ?? (slide ? '0' : '14mm');
  mode = `forced ${pageSizeCss}`;
} else if (slide) {
  pageSizeCss = `${slide.W}px ${slide.H}px`;
  marginCss = opts.margin ?? '0';
  breakCss = `
  ${slide.selector} { page-break-after: always; break-inside: avoid; box-shadow: none !important; margin: 0 !important; }
  ${slide.selector}:last-of-type, ${slide.selector}:last-child { page-break-after: auto; }
  body { padding: 0 !important; margin: 0 !important; background: #fff !important; }`;
  mode = `slide deck (${slide.selector} ${slide.W}x${slide.H})`;
} else if (contentW && contentW > 770) {
  // Content wider than A4 portrait printable width: keep the layout at its
  // designed width and give it a page of matching width at A4 proportion,
  // so Chrome scales the whole thing to paper without reflow or clipping.
  const pad = 48;
  const pw = contentW + pad * 2;
  const ph = Math.round(pw * 1.4142);
  pageSizeCss = `${pw}px ${ph}px`;
  marginCss = opts.margin ?? `${pad}px`;
  mode = `wide flow doc (content ${contentW}px, page ${pw}x${ph}px)`;
} else {
  pageSizeCss = 'A4';
  marginCss = opts.margin ?? '14mm';
  mode = 'A4 flow doc';
}

// ---------- build injected CSS ----------
const pinned = detectPinnedSelectors();
const pinnedCss = [
  pinned.fixed.length ? `  ${pinned.fixed.join(', ')} { display: none !important; }` : '',
  pinned.sticky.length ? `  ${pinned.sticky.join(', ')} { position: static !important; }` : '',
].filter(Boolean).join('\n');

const guardCss = `
/* injected by html-to-pdf skill */
@media print {
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  html, body { overflow: visible !important; min-height: auto !important; height: auto !important; }
  img, svg, video, canvas { max-width: 100% !important; }
  table, figure, pre, blockquote { break-inside: avoid; }
  tr, img { break-inside: avoid; }
  h1, h2, h3, h4 { break-after: avoid; }
  [style*="position:fixed"], [style*="position: fixed"] { position: static !important; }
${pinnedCss}
${breakCss}
}
@page { size: ${pageSizeCss}; margin: ${marginCss}; }
`;

// ---------- decide what to inject ----------
// Full geometry injection only when the author gave no @page (or the caller
// forced it). --css on a print-ready file injects just those rules, so the
// author's tuned print CSS stays in charge.
const geometryInject = !opts.noInject && (opts.forceInject || !hasAtPage || Boolean(opts.pageSize));
const extraInject = !opts.noInject && opts.css.length > 0;
if (opts.pageSize && hasAtPage && !opts.forceInject) {
  warn('source has its own @page; --page-size overrides it with full injection');
}
const injectedCss = [geometryInject ? guardCss : '', extraInject ? opts.css.join('\n') : '']
  .filter(Boolean).join('\n');

// ---------- content-loss warnings ----------
if (/<details(?![^>]*\bopen\b)/i.test(html) && !opts.openDetails) {
  warn('closed <details> found; their content will be missing from the PDF. Re-run with --open-details to include it.');
}
if (/max-height\s*:\s*0/.test(styleText) && !extraInject) {
  warn("collapsed-accordion pattern (max-height:0) found; body copy inside it will be missing. Fix with --css '<selector>{max-height:none!important}'.");
}

// ---------- write temp copy ----------
let target = input;
let temp = null;
if (injectedCss || opts.openDetails) {
  let patched = html;
  if (opts.openDetails) patched = patched.replace(/<details(?![^>]*\bopen\b)/gi, '<details open');
  if (injectedCss) {
    const block = `<style data-html-to-pdf>${injectedCss}</style>`;
    // Insert before the LAST </head> so a commented-out marker earlier in
    // the file cannot swallow the block. Splice by index: replacement-
    // pattern characters ($&) in user CSS must not expand.
    const headEnd = patched.toLowerCase().lastIndexOf('</head>');
    if (headEnd !== -1) patched = patched.slice(0, headEnd) + block + '\n' + patched.slice(headEnd);
    else {
      const bodyOpen = patched.match(/<body[^>]*>/i);
      if (bodyOpen) {
        const at = bodyOpen.index + bodyOpen[0].length;
        patched = patched.slice(0, at) + block + patched.slice(at);
      } else patched = block + patched;
    }
  }
  temp = join(dirname(input), `.pdftmp-${process.pid}-${basename(input)}`);
  try { writeFileSync(temp, patched); }
  catch (e) { fail(`cannot write temp copy next to source (${e.code}): ${temp}`); }
  target = temp;
}
function cleanup() { if (temp && !opts.keepTemp) { try { unlinkSync(temp); } catch {} } }
process.on('SIGINT', () => { cleanup(); process.exit(130); });
process.on('SIGTERM', () => { cleanup(); process.exit(143); });

const modeNote = geometryInject
  ? `inject (${mode})`
  : `as-is (source has ${hasAtPage ? '@page' : 'no @page'}${hasPrintMedia ? ' + @media print' : ''})${extraInject ? ' + extra css' : ''}`;
console.error(`mode: ${modeNote}`);
if (!geometryInject && !hasColorAdjust) {
  warn('source lacks print-color-adjust; colored backgrounds may drop. Re-run with --force-inject if they do.');
}

// ---------- run Chrome ----------
try {
  execFileSync(chrome, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-pdf-header-footer',
    `--virtual-time-budget=${settle}`,
    `--print-to-pdf=${output}`,
    pathToFileURL(target).href,
  ], { stdio: ['ignore', 'ignore', 'pipe'], timeout: 120000 });
} catch (e) {
  cleanup();
  const hint = e.code === 'ETIMEDOUT' ? ' (Chrome hit the 120s wall clock; try a smaller --settle or a simpler file)' : '';
  fail(`chrome failed: ${e.stderr?.toString().trim() || e.message}${hint}`);
}
cleanup();
if (temp && opts.keepTemp) console.error(`temp kept: ${temp}`);

if (!existsSync(output)) fail('chrome exited but wrote no PDF');
const bytes = statSync(output).size;
// Rough page count from uncompressed PDF page objects; Chrome PDFs keep these visible.
const pdf = readFileSync(output, 'latin1');
const pages = (pdf.match(/\/Type\s*\/Page[^s]/g) || []).length || '?';
console.log(`${output}`);
console.error(`ok: ${(bytes / 1024).toFixed(0)} KB, ~${pages} pages`);
