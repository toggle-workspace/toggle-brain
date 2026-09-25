/**
 * The new silk house x COO - 12-month paid and organic social plan
 * Design system: bru-hwc (clients/COO/Colgate/design-systems/bru-hwc)
 * Built with pptxgenjs, same tokens and helpers as build-deck.js.
 * Slide surface 10 x 5.625in, mapped 1:1 from the design system's 1000 x 563px slide.
 *
 * Illustrations: the canonical Toggle isometric forms in assets/illustrations/,
 * recolored to bru-hwc purple-2 and rasterized with @resvg/resvg-js at build time.
 *
 * Usage: node build-social-plan.js <out.pptx>
 * Needs pptxgenjs and @resvg/resvg-js on NODE_PATH.
 */

const PptxGenJS = require('pptxgenjs');
const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------- tokens ---
const C = {
  cream: 'FCE5CD',
  card: 'FDF2DF',
  purple: '351C75',
  purple2: '3B2478',
  purpleMuted: '746096',
  brick: 'B5330F',
  orange: 'F6B26B',
  orangeRule: 'F2A25C',
  highlight: 'EEFF41',
  gold: 'FFD966',
  maroon: '660000',
  ink: '1C120B',
  white: 'FFFFFF',
};

// Design-system fonts are not installed on the Windows desktop. Same mapping
// as build-deck.js: geometric for narrative pages, grotesque for structured.
const F = {
  display: 'Arial Black',      // Archivo Black
  body: 'Arial',               // Archivo
  narrative: 'Century Gothic', // Lexend
  emphasis: 'Century Gothic',  // Montserrat
};

const PAD = 0.56;
const COL_W = 10 - PAD * 2; // 8.88
const GAP = 0.2;

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'BRU16x9', width: 10, height: 5.625 });
pptx.layout = 'BRU16x9';
pptx.author = 'Toggle Solutions';
pptx.company = 'Toggle Solutions';
pptx.title = 'The new silk house, 12-month paid and organic social plan';
pptx.subject = 'Prepared for COO';

// ------------------------------------------------------------- helpers ----
const NM = { margin: 0 };

// A non-positive width or height writes a .pptx PowerPoint refuses to open.
function guard(o, what) {
  if (!(o.w > 0) || !(o.h > 0)) {
    throw new Error(`Non-positive box (${o.w} x ${o.h}) for: ${String(what).slice(0, 60)}`);
  }
  return o;
}
function T(s, text, o) {
  const label = Array.isArray(text) ? text.map((r) => r.text).join('') : text;
  s.addText(text, guard({ ...NM, valign: 'top', ...o }, label));
}
function rect(s, o) {
  s.addShape(pptx.ShapeType.rect, guard({ line: { type: 'none' }, ...o }, 'rect'));
}

function isoImage(name, widthPx) {
  const src = path.resolve(__dirname, '../../../../../assets/illustrations', `${name}.svg`);
  const svg = fs.readFileSync(src, 'utf8').replace(/#4A7BF7/gi, `#${C.purple2}`);
  const img = new Resvg(svg, { fitTo: { mode: 'width', value: widthPx }, background: 'rgba(0,0,0,0)' }).render();
  return { data: `image/png;base64,${img.asPng().toString('base64')}`, ratio: img.height / img.width };
}
const STEP = isoImage('step-form', 1200);
const STACK = isoImage('channel-stack-form', 400);

function creamPage() {
  const s = pptx.addSlide();
  s.background = { color: C.cream };
  return s;
}
function inkPage() {
  const s = pptx.addSlide();
  s.background = { color: C.ink };
  return s;
}
function dash(s, y = 0.4) {
  rect(s, { x: PAD, y, w: 0.24, h: 0.08, fill: { color: C.brick } });
}
function runningHeader(s, text) {
  T(s, text, {
    x: PAD, y: 0.22, w: COL_W, h: 0.2, align: 'right',
    fontFace: F.narrative, fontSize: 8.6, color: C.purpleMuted,
  });
}
/** Mode C headline: purple sentence with at most one brick phrase */
function headline(s, runs, y = 0.62, h = 0.95, size = 25) {
  T(s, runs.map((r) => (typeof r === 'string'
    ? { text: r, options: { color: C.purple2 } }
    : { text: r.t, options: { color: r.accent ? C.brick : C.purple2 } })), {
    x: PAD, y, w: COL_W, h, fontFace: F.display, fontSize: size, lineSpacing: size * 1.18,
  });
}
/** Standfirst spans the headline's width unless a graphic sits to the right. */
function standfirst(s, text, y = 1.62, h = 0.42, w = COL_W) {
  T(s, text, {
    x: PAD, y, w, h, fontFace: F.body, fontSize: 11, bold: true, color: C.purple2, lineSpacing: 15,
  });
}

const RULE_COLORS = [C.brick, C.purple2, C.orangeRule, C.ink];

/** Card grid. cards = [{ stat|no, label, title, body, blocks:[{label,text,h,hot}] }] */
function cardGrid(s, cards, opts = {}) {
  const y = opts.y ?? 2.1;
  const h = opts.h ?? 2.55;
  const n = cards.length;
  const w = (COL_W - GAP * (n - 1)) / n;
  const bodySize = opts.bodySize ?? 9.5;

  cards.forEach((c, i) => {
    const x = PAD + i * (w + GAP);
    let rule;
    if (opts.theme === 'brick') rule = C.brick;
    else if (opts.theme === 'purple') rule = C.purple2;
    else if (opts.theme === 'ink') rule = C.ink;
    else rule = RULE_COLORS[(i + (opts.offset ?? 0)) % 4];

    rect(s, { x, y, w, h, fill: { color: C.card } });
    rect(s, { x, y, w, h: 0.06, fill: { color: rule } });

    const ix = x + 0.18;
    const iw = w - 0.36;
    let cy = y + 0.22;

    if (c.stat) {
      T(s, c.stat, { x: ix, y: cy, w: iw, h: 0.42, fontFace: F.display, fontSize: c.statSize ?? 19, color: rule });
      cy += c.statH ?? 0.46;
    } else if (c.no) {
      T(s, c.no, { x: ix, y: cy, w: iw, h: 0.24, fontFace: F.body, fontSize: 11, bold: true, color: rule });
      cy += 0.32;
    }
    if (c.label) {
      T(s, c.label.toUpperCase(), {
        x: ix, y: cy, w: iw, h: 0.2, fontFace: F.body, fontSize: 8, bold: true, charSpacing: 0.8,
        color: c.labelHot ? C.brick : C.purpleMuted,
      });
      cy += 0.24;
    }
    if (c.title) {
      T(s, c.title, {
        x: ix, y: cy, w: iw, h: c.titleH ?? 0.5, fontFace: F.body, fontSize: 13, bold: true,
        color: C.purple2, lineSpacing: 16,
      });
      cy += c.titleH ?? 0.52;
    }
    if (c.body) {
      T(s, c.body, {
        x: ix, y: cy, w: iw, h: y + h - cy - 0.14, fontFace: F.body, fontSize: bodySize,
        color: C.purple2, lineSpacing: bodySize * 1.37,
      });
    }
    (c.blocks || []).forEach((b) => {
      T(s, b.label.toUpperCase(), {
        x: ix, y: cy, w: iw, h: 0.18, fontFace: F.body, fontSize: 8, bold: true, charSpacing: 0.8,
        color: b.hot ? C.brick : C.purpleMuted,
      });
      cy += 0.2;
      const bh = b.h ?? 0.62;
      T(s, b.text, {
        x: ix, y: cy, w: iw, h: bh, fontFace: F.body, fontSize: bodySize, color: C.purple2,
        lineSpacing: bodySize * 1.37,
      });
      cy += bh + 0.08;
    });
  });
}

/** inset footer strip near the bottom */
function footer(s, runs, variant = 'ink') {
  const fill = variant === 'alert' ? C.brick
    : variant === 'purple' ? C.purple2
      : variant === 'strip' ? C.card : C.ink;
  const y = 4.85;
  rect(s, { x: 0.48, y, w: 10 - 0.96, h: 0.44, fill: { color: fill } });
  const txt = variant === 'strip' ? C.purple2 : C.white;
  const lead = variant === 'strip' ? C.brick : C.highlight;
  T(s, runs.map((r) => (typeof r === 'string'
    ? { text: r, options: { color: txt } }
    : { text: r.t, options: { color: r.lead ? lead : txt } })), {
    x: 0.72, y: y + 0.02, w: 10 - 1.44, h: 0.4, fontFace: F.body, fontSize: 9.5, bold: true,
    color: txt, valign: 'middle', lineSpacing: 12,
  });
}

const STAGE = [
  { name: 'Awareness', color: C.brick },
  { name: 'Consideration', color: C.purple2 },
  { name: 'Conversion', color: C.ink },
];

/** Split bar: segments sized by percent, white percentages inside */
function splitBar(s, x, y, w, h, pcts) {
  let cx = x;
  pcts.forEach((p, i) => {
    const sw = (w * p) / 100;
    rect(s, { x: cx, y, w: sw, h, fill: { color: STAGE[i].color } });
    T(s, `${p}%`, {
      x: cx, y, w: sw, h, align: 'center', valign: 'middle',
      fontFace: F.display, fontSize: 11, color: C.white,
    });
    cx += sw;
  });
}

/** Table cell helpers */
const cellBase = { fontFace: F.body, fontSize: 9, color: C.purple2, fill: { color: C.card }, valign: 'middle' };
const th = (text, o = {}) => ({
  text, options: { ...cellBase, bold: true, fontSize: 8.5, color: C.white, fill: { color: C.purple2 }, ...o },
});
const td = (text, o = {}) => ({ text, options: { ...cellBase, ...o } });

// =====================================================================
// 01. Cover (mode A, solid ink stands in for photography)
// =====================================================================
{
  const s = inkPage();
  rect(s, { x: 0, y: 0, w: 0.14, h: 5.625, fill: { color: C.brick } });
  T(s, '02.', { x: 0.7, y: 1.15, w: 4, h: 0.4, fontFace: F.narrative, fontSize: 21, bold: true, color: C.white });
  T(s, 'The new silk house', { x: 0.7, y: 1.95, w: 7, h: 0.8, fontFace: F.narrative, fontSize: 40, bold: true, color: C.white });
  T(s, 'Twelve months of paid and organic social, planned to sell a RM1,200 silk scarf.', {
    x: 0.7, y: 2.9, w: 5.8, h: 0.9, fontFace: F.narrative, fontSize: 17, color: C.gold, lineSpacing: 25,
  });
  T(s, 'Paid and organic social plan  ·  Prepared by Toggle Solutions for COO  ·  September 2026', {
    x: 0.7, y: 4.85, w: 8.6, h: 0.3, fontFace: F.narrative, fontSize: 9.5, color: C.white,
  });
  s.addNotes(
    'This deck follows the 2 September market and positioning research, which is deck 01. It answers the '
    + 'question COO brought back from the client: how do we market the house for its first year, paid and organic.\n\n'
    + 'Toggle owns the media plan and the content angles. COO owns the client relationship, the brand identity '
    + 'and the creative production that this plan asks for.\n\n'
    + 'The brand still has no name, so the deck says "the house" throughout. RM1,200 is the entry price the '
    + 'research recommended. The client has not confirmed a price yet.',
  );
}

// =====================================================================
// 02. Executive summary
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, 'Executive summary');
  headline(s, ['A 12-month plan that builds the name first ', { t: 'and sells second.', accent: true }]);
  standfirst(s, 'The house launches with no name recognition. The first three months buy attention, and the last six ask for the sale. Paid and organic social follow the same funnel.', 1.62, 0.44);
  cardGrid(s, [
    {
      stat: '3 · 3 · 6', label: 'Months per phase', statSize: 20,
      body: 'Three months led by awareness, three led by consideration and six led by conversion. All three stages run every month, and only the weighting changes.',
    },
    {
      stat: 'RM108K', label: 'Year-one media', statSize: 20,
      body: 'RM8,000 a month in Months 1 to 6 and RM10,000 a month in Months 7 to 12. Meta takes 50%, TikTok 30% and Google Search 20%.',
    },
    {
      stat: '4 angles', label: 'In every ad', statSize: 20,
      body: 'The designer, the detail up close, the numbered piece and the gift. Each platform runs the four angles in the format its users watch.',
    },
    {
      stat: 'Website', label: 'The sales channel', statSize: 20,
      body: 'Ads at the bottom of the funnel send buyers to the product page, and the sale happens at checkout on the website.',
    },
  ], { y: 2.16, h: 2.52 });
  footer(s, [{ t: 'Plan for this: ', lead: true }, 'the first quarter builds the audience, and most of the year\'s sales arrive in Months 7 to 12.']);
  s.addNotes(
    'The one idea to leave the client with: a brand nobody has heard of cannot open with a hard sell at RM1,200. '
    + 'The plan spends the first quarter getting the name in front of the right women, then spends more each '
    + 'quarter on turning those people into buyers.\n\n'
    + 'The budget is our recommendation and covers media only. Production, KOL fees, service tax and agency fees '
    + 'sit on top (slide 05).\n\n'
    + 'The research deck recommended a single capped edition. The client wants ongoing sales, so this plan keeps '
    + 'the store open from Month 1 and releases new prints in numbered batches instead. Slide 11 covers what that '
    + 'change asks of the client.\n\n'
    + 'The research deck suggested closing sales on WhatsApp. The client wants online sales, so every conversion '
    + 'campaign in this plan sends buyers to the website and optimizes toward purchases at checkout.',
  );
}

// =====================================================================
// 03. The full funnel
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '01.     The funnel');
  headline(s, ['Meta and TikTok run the whole funnel. ', { t: 'Google Search catches the intent.', accent: true }]);
  standfirst(s, 'Each stage has its own objective and its own measure of success, so each stage gets its own campaigns and its own share of the budget.');
  const cards = [
    {
      no: '01  ·  Awareness', title: 'Make the name familiar', titleH: 0.3,
      blocks: [
        { label: 'Platforms', text: 'Meta and TikTok', h: 0.2 },
        { label: 'Campaign objective', text: 'Meta Awareness and Reach. TikTok Reach and Video views.', h: 0.4 },
        { label: 'We measure', text: 'Reach, frequency, cost per 1,000 people reached and 6-second video views.', h: 0.4 },
      ],
    },
    {
      no: '02  ·  Consideration', title: 'Bring buyers to the prints', titleH: 0.3,
      blocks: [
        { label: 'Platforms', text: 'Meta, TikTok and Google Search', h: 0.2 },
        { label: 'Campaign objective', text: 'Meta Traffic and Engagement. TikTok Traffic. Google Search on generic terms.', h: 0.4 },
        { label: 'We measure', text: 'Landing page views, time on site, profile visits, follows and cost per visit.', h: 0.4 },
      ],
    },
    {
      no: '03  ·  Conversion', title: 'Sell on the website', titleH: 0.3,
      blocks: [
        { label: 'Platforms', text: 'Meta, TikTok and Google Search', h: 0.2 },
        { label: 'Campaign objective', text: 'Meta Sales. TikTok Web conversions. Google Search on brand and buying terms.', h: 0.4 },
        { label: 'We measure', text: 'Add to carts, checkouts started, purchases, cost per purchase and return on ad spend.', h: 0.4 },
      ],
    },
  ];
  cardGrid(s, cards, { y: 2.12, h: 2.56, bodySize: 9 });
  footer(s, [{ t: 'On targeting: ', lead: true }, 'Meta and TikTok cannot target by income in Malaysia, so we reach T20 buyers through interests, KL postcodes and lookalikes of site visitors.'], 'purple');
  s.addNotes(
    'Why Google sits out of awareness: nobody can search for a brand they have never heard of. Google Search '
    + 'earns its place once people look for silk scarves in general (consideration) and, later, for the house by '
    + 'name (conversion). Generic terms to test include "silk scarf Malaysia", "luxury scarf gift" and "hand rolled '
    + 'silk scarf".\n\n'
    + 'Conversion on Meta and TikTok optimizes for add to cart first and moves to purchases once the website records '
    + 'enough sales to train the algorithm (slide 11). Google Search conversion campaigns count purchases through '
    + 'the Google Ads tag and GA4.\n\n'
    + 'Targeting: Meta offers household income targeting only in the United States, and TikTok does not offer '
    + 'income targeting in Malaysia. Check both in the ad accounts at setup. The T20 proxies we use are interests '
    + '(luxury fashion houses, fine jewelry, premium travel), locations (Bangsar, Mont Kiara, Damansara Heights, '
    + 'KLCC, Bukit Tunku and similar), and lookalikes built from site visitors and buyers.',
  );
}

// =====================================================================
// 04. The year in phases
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '02.     The year in phases');
  headline(s, ['Three months to be seen, three to be considered ', { t: 'and six to sell.', accent: true }]);
  const leftW = 5.7;
  standfirst(s, 'All three stages run every month. The phase decides which stage takes the largest share of the budget.', 1.62, 0.42, leftW);

  const rows = [
    { when: 'Months 1 to 3', lead: 'Awareness leads', pcts: [60, 30, 10], budget: 'RM8,000 a month' },
    { when: 'Months 4 to 6', lead: 'Consideration leads', pcts: [30, 45, 25], budget: 'RM8,000 a month' },
    { when: 'Months 7 to 12', lead: 'Conversion leads', pcts: [20, 30, 50], budget: 'RM10,000 a month' },
  ];
  let y = 2.2;
  rows.forEach((r) => {
    T(s, [
      { text: `${r.when}  ·  `, options: { color: C.purple2, bold: true } },
      { text: r.lead, options: { color: C.brick, bold: true } },
    ], { x: PAD, y, w: leftW * 0.68, h: 0.22, fontFace: F.body, fontSize: 10.5 });
    T(s, r.budget, {
      x: PAD + leftW * 0.68, y, w: leftW * 0.32, h: 0.22, align: 'right',
      fontFace: F.body, fontSize: 9, bold: true, color: C.purpleMuted,
    });
    splitBar(s, PAD, y + 0.27, leftW, 0.38, r.pcts);
    y += 0.78;
  });
  // legend
  let lx = PAD;
  STAGE.forEach((st) => {
    rect(s, { x: lx, y: y + 0.05, w: 0.14, h: 0.14, fill: { color: st.color } });
    T(s, st.name, { x: lx + 0.2, y: y + 0.02, w: 1.3, h: 0.2, fontFace: F.body, fontSize: 8.5, bold: true, color: C.purple2 });
    lx += 1.45;
  });

  const iw = 2.6;
  s.addImage({ data: STEP.data, x: 10 - PAD - iw, y: 2.15, w: iw, h: iw * STEP.ratio });
  footer(s, [{ t: 'Why six months of conversion: ', lead: true }, 'Months 7 to 12 sell to the audience that Months 1 to 6 found and warmed up.']);
  s.addNotes(
    'Read the bars as the share of that month\'s budget going to each stage. In Months 1 to 3, RM4,800 of the '
    + 'RM8,000 goes to awareness. In Months 7 to 12, RM5,000 of the RM10,000 goes to conversion.\n\n'
    + 'Conversion spend runs from Month 1 because the store is open from launch. Early on it only retargets people '
    + 'who have already watched a video or visited the site, which keeps it cheap.\n\n'
    + 'These weightings are our starting recommendation. We review them at the end of Month 3 and Month 6 against '
    + 'cost per purchase and the size of the warm audience, and move budget between stages if the numbers say so.',
  );
}

// =====================================================================
// 05. Budget by platform and objective
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '03.     Budget');
  headline(s, ['RM108,000 in media for the year, ', { t: 'with half of it on Meta.', accent: true }]);
  standfirst(s, 'Our recommended split by platform and funnel stage for the full twelve months. The figures cover media spend only.');

  // channel stack, drawn at the real 50 / 30 / 20 proportions
  const sh = 2.6;
  const sw = sh / STACK.ratio;
  const sx = PAD + 0.1;
  const sy = 2.08;
  s.addImage({ data: STACK.data, x: sx, y: sy, w: sw, h: sh });
  const k = sh / 1231; // source raster is 400 x 1231
  [
    { t: 'Google 20%', c: 220 },
    { t: 'TikTok 30%', c: 470 },
    { t: 'Meta 50%', c: 915 },
  ].forEach((l) => {
    T(s, l.t, {
      x: sx + sw + 0.12, y: sy + l.c * k - 0.1, w: 1.0, h: 0.2,
      fontFace: F.body, fontSize: 9.5, bold: true, color: C.purple2,
    });
  });

  const tx = 2.78;
  const tw = 10 - PAD - tx;
  const rows = [
    [th('Platform'), th('Awareness', { align: 'right' }), th('Consideration', { align: 'right' }), th('Conversion', { align: 'right' }), th('Year total', { align: 'right' })],
    [td('Meta', { bold: true }), td('RM18,600', { align: 'right' }), td('RM16,200', { align: 'right' }), td('RM19,200', { align: 'right' }), td('RM54,000', { align: 'right', bold: true })],
    [td('TikTok', { bold: true }), td('RM15,000', { align: 'right' }), td('RM10,800', { align: 'right' }), td('RM6,600', { align: 'right' }), td('RM32,400', { align: 'right', bold: true })],
    [td('Google Search', { bold: true }), td('Not used', { align: 'right', color: C.purpleMuted, italic: true }), td('RM9,000', { align: 'right' }), td('RM12,600', { align: 'right' }), td('RM21,600', { align: 'right', bold: true })],
    [
      td('Total', { bold: true, color: C.white, fill: { color: C.ink } }),
      td('RM33,600', { align: 'right', bold: true, color: C.white, fill: { color: C.ink } }),
      td('RM36,000', { align: 'right', bold: true, color: C.white, fill: { color: C.ink } }),
      td('RM38,400', { align: 'right', bold: true, color: C.white, fill: { color: C.ink } }),
      td('RM108,000', { align: 'right', bold: true, color: C.highlight, fill: { color: C.ink } }),
    ],
  ];
  s.addTable(rows, {
    x: tx, y: 2.16, w: tw, colW: [1.42, 1.17, 1.3, 1.17, 1.2],
    rowH: [0.34, 0.46, 0.46, 0.46, 0.46],
    border: { type: 'solid', pt: 1.5, color: C.cream },
    margin: [0.04, 0.12, 0.04, 0.12],
  });
  T(s, 'TikTok carries more of the awareness work, and Meta and Google carry more of the selling.', {
    x: tx, y: 4.46, w: tw, h: 0.22, fontFace: F.body, fontSize: 9, italic: true, color: C.purpleMuted,
  });
  footer(s, [{ t: 'Not included: ', lead: true }, 'content production, KOL fees, service tax on ad spend and agency fees. These sit on top of the RM108,000.'], 'alert');
  s.addNotes(
    'How the stage totals are built: Months 1 to 3 at RM8,000 split 60/30/10, Months 4 to 6 at RM8,000 split '
    + '30/45/25, Months 7 to 12 at RM10,000 split 20/30/50. That gives RM33,600 for awareness, RM36,000 for '
    + 'consideration and RM38,400 for conversion.\n\n'
    + 'Platform logic. Meta (Instagram first) is where T20 women browse fashion and where catalog and retargeting ads '
    + 'drive the most online sales, so it takes half. TikTok is the cheapest reach for styling and fabric videos, so it leans on awareness '
    + 'and consideration. Google Search only buys intent, so it has no awareness line.\n\n'
    + 'The illustration is the Toggle channel-stack form, and its three blocks sit at 50, 30 and 20, the same '
    + 'split as the table.\n\n'
    + 'The whole budget is our recommendation. If the client wants to start smaller, cut Months 1 to 6 to '
    + 'RM6,000 a month before touching Months 7 to 12, and expect the warm audience to grow more slowly.',
  );
}

// =====================================================================
// 06. Paid content angles, overall
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '04.     Paid content angles');
  headline(s, ['Four angles run through every ad, ', { t: 'and each one answers a buyer\'s doubt.', accent: true }]);
  standfirst(s, 'A buyer who has never heard of the house wants to know who made the scarf, whether it is good, why it costs RM1,200 and who it suits.', 1.62, 0.44);
  cardGrid(s, [
    {
      no: '01', label: 'Who made this?', title: 'The designer', titleH: 0.3,
      body: 'The designer\'s face, the studio and the sketch behind each print. The ads show where the design work happens, which makes "designed in Malaysia" a fact the buyer can see.',
    },
    {
      no: '02', label: 'Is it good?', title: 'The detail up close', titleH: 0.3,
      body: 'Macro shots of the hand-rolled hem, the momme weight on screen and both sizes in centimeters. Arzu publishes none of the three on its silk pages.',
    },
    {
      no: '03', label: 'Why this price?', title: 'Numbered pieces', titleH: 0.3,
      body: 'Each print sells in a small numbered batch, and the ad shows the number. A buyer can see how many pieces of her print exist.',
    },
    {
      no: '04', label: 'Who is it for?', title: 'The gift', titleH: 0.3,
      body: 'Raya, weddings and farewells. The ad shows the box, the ribbon and the moment it opens, because a gift has to look expensive before anyone reads the label.',
    },
  ], { y: 2.16, h: 2.52 });
  footer(s, [{ t: 'One rule for every ad: ', lead: true }, 'say designed in Malaysia and never say made in Malaysia. The silk is woven in China.'], 'alert');
  s.addNotes(
    'These four angles come straight from the research: the proof stack (designer, edition) and the publish list '
    + '(momme, dimensions, hem), plus the gifter, the buyer the research said a new brand can win first.\n\n'
    + 'Arzu point: across its 100% real silk collection, no product publishes momme weight or dimensions in '
    + 'centimeters, and one product mentions a hand-rolled hem. Source: https://arzuscarf.com/collections/exclusilk-pieces, '
    + 'checked 1 September 2026.\n\n'
    + 'Origin: the Trade Descriptions Act 2011 puts up to RM15,000 per item behind a false "made in Malaysia" '
    + 'claim for a company. This applies to ad copy, captions and landing pages as well as the label. Research deck, slide 12.\n\n'
    + 'Angle 01 depends on the open item from the research: COO still needs to confirm the design work happens in Malaysia.',
  );
}

// =====================================================================
// 07. Paid angles by platform and objective
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '05.     Angles by platform');
  headline(s, ['The same four angles, ', { t: 'cut for each platform.', accent: true }]);
  standfirst(s, 'What each platform runs at each stage of the funnel, and the format it runs in.', 1.2);
  const cell = (t) => td(t, { valign: 'top', fontSize: 8.5 });
  const rowHead = (name, sub) => ({
    text: [
      { text: name, options: { bold: true, fontSize: 10, color: C.purple2, breakLine: true } },
      { text: sub, options: { fontSize: 7.5, color: C.purpleMuted } },
    ],
    options: { ...cellBase, valign: 'top' },
  });
  const rows = [
    [th(''), th('Awareness'), th('Consideration'), th('Conversion')],
    [
      rowHead('Meta', 'Instagram and Facebook'),
      cell('A 15-second studio film: the designer draws the print, then the finished square moves on a model. Reels and Stories.'),
      cell('Carousels of the detail: the hem, the momme weight and both sizes. Styling posts show three ways to wear one square.'),
      cell('Retargeting to site visitors and video viewers: the numbered piece and the gift box, with a Shop now button to the product page.'),
    ],
    [
      rowHead('TikTok', 'In-feed and Spark Ads'),
      cell('Creator styling videos that tie one 90cm square five ways in 30 seconds, shot handheld with sound on.'),
      cell('Fabric explainers: what momme means, how to spot a hand-rolled hem and why good silk costs more.'),
      cell('Unboxing and gifting videos, shown to people who watched half of an earlier video, linking to the product page.'),
    ],
    [
      rowHead('Google Search', 'Text ads'),
      td('Not used. People cannot search for a name they have not heard yet.', { valign: 'top', fontSize: 8.5, italic: true, color: C.purpleMuted }),
      cell('Generic terms such as "silk scarf Malaysia" and "luxury scarf gift". The ads lead with size, momme and the hand-rolled hem.'),
      cell('The brand name and buying terms such as "buy silk scarf KL". The ads lead with the numbered piece and link to the product page.'),
    ],
  ];
  s.addTable(rows, {
    x: PAD, y: 1.66, w: COL_W, colW: [1.5, 2.46, 2.46, 2.46],
    rowH: [0.3, 0.86, 0.86, 0.86],
    border: { type: 'solid', pt: 1.5, color: C.cream },
    margin: [0.07, 0.1, 0.05, 0.1],
  });
  footer(s, [{ t: 'Spark Ads: ', lead: true }, 'we boost the best organic TikTok videos as ads, so the strongest content runs twice with no new shoot.'], 'purple');
  s.addNotes(
    'Format notes. Meta: build every awareness video for 9:16 first, with the brand shown in the first two seconds. '
    + 'TikTok: Spark Ads boost organic posts from the brand account or a creator\'s account, so the best organic '
    + 'videos (slide 08) become ads without new production. Google Search: responsive search ads, with sitelinks to '
    + 'the size guide, the gift page and the newest release.\n\n'
    + 'The conversion cells use the 50% video view audience on TikTok and site visitors plus video viewers on '
    + 'Meta. Those audiences will be small in Month 1, which is why conversion spend starts at 10% of budget.\n\n'
    + 'Search terms are starting points to validate in Google Keyword Planner at setup. We have not pulled search '
    + 'volumes for this deck.',
  );
}

// =====================================================================
// 08. Organic content by funnel stage
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '06.     Organic content');
  headline(s, ['Organic posts follow the same funnel as the ads, ', { t: 'one job per post.', accent: true }]);
  standfirst(s, 'We recommend half the calendar for awareness. The other half moves followers toward the online store.');
  cardGrid(s, [
    {
      no: 'Awareness  ·  50% of posts',
      blocks: [
        { label: 'Where the prints come from', text: 'Studio process, the sketch turning into a print and the Malaysian places behind each design.', h: 0.62 },
        { label: 'How to wear it', text: 'Styling reels that wear one 90cm square as a hijab, a neck scarf and a bag tie.', h: 0.62 },
      ],
    },
    {
      no: 'Consideration  ·  30% of posts',
      blocks: [
        { label: 'Why it costs what it costs', text: 'Short lessons on momme weight, hand-rolled hems and how to care for silk.', h: 0.62 },
        { label: 'Who wears it', text: 'Buyers and gift recipients in their own photos, reposted with their permission.', h: 0.62 },
      ],
    },
    {
      no: 'Conversion  ·  20% of posts',
      blocks: [
        { label: 'What is available', text: 'New print releases, the pieces left in each numbered batch and the date of the next release.', h: 0.62 },
        { label: 'How to buy', text: 'Shoppable posts that link to the product page, plus gift wrapping, delivery times and the care card.', h: 0.62 },
      ],
    },
  ], { y: 2.12, h: 2.56 });
  footer(s, [{ t: 'Where paid and organic meet: ', lead: true }, 'we turn the organic posts that perform best into paid ads, which saves on production.'], 'strip');
  s.addNotes(
    'The 50/30/20 mix is our recommendation for the first six months. From Month 7, when paid media leans on '
    + 'conversion, the organic calendar can move to 40/30/30.\n\n'
    + 'Awareness content does the brand-building work that paid awareness cannot afford to do alone. A buyer who '
    + 'clicks an ad and lands on an Instagram grid full of studio and styling posts has a reason to believe the house is real.\n\n'
    + 'User photos only appear once there are buyers, so expect the "Who wears it" pillar to start around Month 3. '
    + 'Until then, the consideration slot leans on fabric lessons.',
  );
}

// =====================================================================
// 09. Organic platform roles and cadence
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '07.     Organic platforms');
  headline(s, ['Instagram is the shop window. ', { t: 'The website is the shop.', accent: true }]);
  standfirst(s, 'Each platform has one role. The posting cadence below is our recommendation, and it depends on how much content COO can produce each month.', 1.62, 0.44);
  cardGrid(s, [
    {
      stat: '4 posts a week', label: 'Instagram  ·  the brand\'s home', statSize: 16, statH: 0.4,
      blocks: [
        { label: 'Role', text: 'A buyer checks here whether the house is real, through the grid, the highlights and the designer\'s story.', h: 0.62 },
        { label: 'Mix', text: 'Two Reels, one carousel and one single image each week, plus Stories every day.', h: 0.5 },
      ],
    },
    {
      stat: '3 videos a week', label: 'TikTok  ·  discovery', statSize: 16, statH: 0.4,
      blocks: [
        { label: 'Role', text: 'New buyers find the house here through styling and fabric videos.', h: 0.62 },
        { label: 'Mix', text: 'Styling tutorials, studio clips and fabric explainers, all shot vertically.', h: 0.5 },
      ],
    },
    {
      stat: '1 email a week', label: 'Website and email  ·  the shop', statSize: 16, statH: 0.4,
      blocks: [
        { label: 'Role', text: 'Buyers check the sizes, the momme and the hem up close, then pay at checkout.', h: 0.62 },
        { label: 'Mix', text: 'A weekly email to subscribers with release news, sent before the Instagram post goes up.', h: 0.5 },
      ],
    },
  ], { y: 2.16, h: 2.52 });
  footer(s, [{ t: 'The production brief: ', lead: true }, 'about 30 organic posts a month, plus daily Stories and 8 to 10 new paid ad creatives.']);
  s.addNotes(
    'The monthly count: 4 Instagram posts a week is about 17 a month, and 3 TikTok videos a week is about 13. '
    + 'That gives roughly 30 posts, before Stories and paid creatives. Many TikTok videos can be cut from the same '
    + 'shoot as the Instagram Reels.\n\n'
    + 'The website is where the sale closes, so every post and profile link points to a product page rather than '
    + 'the home page. Release news goes to email subscribers first, a few hours before Instagram, which gives the most '
    + 'engaged buyers first choice of the numbered pieces.\n\n'
    + 'Email sign-ups come from a pop-up on the website offering early access to each release. No discount code, '
    + 'in line with the no-promotions rule from the research.',
  );
}

// =====================================================================
// 10. Timeline
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '08.     Timeline');
  headline(s, ['Setup takes a month. ', { t: 'Month 1 goes live.', accent: true }]);
  standfirst(s, 'The plan runs for twelve months after a four-week setup in Month 0. The budget steps up from RM8,000 to RM10,000 a month when conversion takes the lead.', 1.2, 0.44);

  const lineY = 3.05;
  const x0 = 0.8;
  const x1 = 9.2;
  const mx = (m) => x0 + (m * (x1 - x0)) / 12;
  rect(s, { x: x0, y: lineY - 0.005, w: x1 - x0, h: 0.01, fill: { color: C.purple2 } });

  const stops = [
    { m: 0, when: 'Month 0', what: 'Setup: pixels, Conversions API, GA4, the online store and the first shoot.', up: true, milestone: false },
    { m: 1, when: 'Month 1', what: 'Launch. The store opens and the ads go live on all three platforms.', up: false, milestone: true },
    { m: 3, when: 'Month 3', what: 'First review of reach, cost per visit and the warm audience.', up: true },
    { m: 4, when: 'Month 4', what: 'Consideration leads. Retargeting grows as the warm audience grows.', up: false },
    { m: 6, when: 'Month 6', what: 'Second print release, emailed to subscribers first.', up: true },
    { m: 7, when: 'Month 7', what: 'Conversion leads. Budget rises to RM10,000 a month.', up: false, milestone: true },
    { m: 9, when: 'Month 9', what: 'Third print release.', up: true },
    { m: 12, when: 'Month 12', what: 'Year review and the plan for year two.', up: false },
  ];
  const tagW = 1.55;
  stops.forEach((st) => {
    const cx = mx(st.m);
    const r = 0.08;
    s.addShape(pptx.ShapeType.ellipse, guard({
      x: cx - r, y: lineY - r, w: r * 2, h: r * 2,
      fill: { color: st.milestone ? C.brick : C.white },
      line: { color: C.brick, width: 1.5 },
    }, 'node'));
    let tx = cx - tagW / 2;
    let align = 'center';
    if (tx < PAD) { tx = PAD; align = 'left'; }
    if (tx + tagW > 10 - PAD) { tx = 10 - PAD - tagW; align = 'right'; }
    const ty = st.up ? 2.18 : 3.22;
    T(s, st.when, {
      x: tx, y: st.up ? ty : ty, w: tagW, h: 0.18, align,
      fontFace: F.body, fontSize: 9, bold: true, color: C.brick,
    });
    T(s, st.what, {
      x: tx, y: ty + 0.2, w: tagW, h: 0.58, align,
      fontFace: F.body, fontSize: 8.5, color: C.purple2, lineSpacing: 11,
    });
  });

  // monthly budget strip
  const by = 4.14;
  const cw = (COL_W - 0.04 * 11) / 12;
  for (let m = 1; m <= 12; m += 1) {
    const x = PAD + (m - 1) * (cw + 0.04);
    const hot = m >= 7;
    rect(s, { x, y: by, w: cw, h: 0.52, fill: { color: hot ? C.purple2 : C.card } });
    T(s, `M${m}`, {
      x, y: by + 0.06, w: cw, h: 0.16, align: 'center',
      fontFace: F.body, fontSize: 7.5, bold: true, color: hot ? C.white : C.purpleMuted,
    });
    T(s, hot ? 'RM10K' : 'RM8K', {
      x, y: by + 0.24, w: cw, h: 0.22, align: 'center',
      fontFace: F.display, fontSize: 10, color: hot ? C.white : C.purple2,
    });
  }
  footer(s, [{ t: 'Raya: ', lead: true }, 'once the launch date is set, we move the heaviest gifting spend into the four weeks before Hari Raya Aidilfitri.'], 'alert');
  s.addNotes(
    'Month 0 is non-negotiable. If the pixels, the Conversions API and purchase tracking are not live on '
    + 'launch day, the first month of spend teaches the platforms nothing, and the warm audiences for Month 4 '
    + 'retargeting never get built.\n\n'
    + 'Print releases every three months give the conversion campaigns something new to announce without '
    + 'discounting. The plan contains no promotions, in line with the research.\n\n'
    + 'Raya timing depends on the launch date. Hari Raya Aidilfitri falls around 10 March in 2027, with Ramadan '
    + 'starting around 8 February. If the launch lands so that Raya falls in Months 1 to 3, we still push the '
    + 'gifting angle, but with a smaller warm audience to sell to. Weddings and year-end farewells give smaller '
    + 'gifting peaks later in the year.',
  );
}

// =====================================================================
// 11. Caveats
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '09.     Caveats');
  headline(s, ['What can slow this plan down, ', { t: 'and what we do about it.', accent: true }]);
  standfirst(s, 'These are the risks we see today. Each one has a fix that we can put in place before Month 1.');
  const top = [
    { title: 'Tracking gaps', titleH: 0.3, body: 'If the pixels miss a purchase or its value, Meta and TikTok cannot learn who buys. We test every checkout step before Month 1 spends a ringgit.' },
    { title: 'A slow first quarter', titleH: 0.3, body: 'Nobody searches for a name they have not heard. Expect few sales in Months 1 to 3 while the ads build the audience that later months sell to.' },
    { title: 'Too few sales to learn from', titleH: 0.3, body: 'Meta learns best from about 50 conversions a week, and a RM1,200 scarf will not reach that early. We optimize for add to cart first.' },
  ];
  const bottom = [
    { title: 'Slow payback in year one', titleH: 0.3, body: 'RM108,000 in media equals about 90 scarves at RM1,200. Year one is unlikely to pay back its media, and the audience it builds carries year two.' },
    { title: 'Creative supply', titleH: 0.3, body: 'The plan needs about 30 organic posts and 8 to 10 new ad creatives a month. If production falls short, ads tire faster and costs rise.' },
    { title: 'A change from the research', titleH: 0.3, body: 'Ongoing sales replace the single capped edition. If the house adds pieces to a numbered batch after release, buyers stop trusting the numbers.' },
  ];
  cardGrid(s, top, { y: 2.1, h: 1.32, bodySize: 8.8 });
  cardGrid(s, bottom, { y: 3.54, h: 1.32, bodySize: 8.8, offset: 3 });
  s.addNotes(
    'Tracking fix: Meta Conversions API and TikTok Events API on the website, plus the Google Ads tag and GA4 '
    + 'ecommerce events, all sending purchase value in ringgit. In Month 0 we place a test order through every '
    + 'payment method and check that each platform records it.\n\n'
    + 'Learning phase: Meta says an ad set needs about 50 optimization events in a week to exit the learning '
    + 'phase. Source: https://www.facebook.com/business/help/112167992830700\n\n'
    + 'Payback math: RM108,000 divided by RM1,200 is 90 pieces. That is revenue, before the cost of goods. The '
    + 'client should treat year-one media as the cost of building a list of warm buyers.\n\n'
    + 'Change from the research: the research deck recommended one capped edition of 100 to 150 pieces and no '
    + 'restock for twelve months. The client prefers ongoing sales. This plan keeps the scarcity real through numbered '
    + 'batches per print, and that only works if the client never tops up a batch.',
  );
}

// =====================================================================
// 12. What we need to start
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '10.     Next steps');
  headline(s, ['Five things we need ', { t: 'before Month 0 starts.', accent: true }]);
  standfirst(s, 'Some of these decide the budget and the calendar, so we need them before setup begins.', 1.2);
  cardGrid(s, [
    { no: '01', title: 'Name and launch date', titleH: 0.56, body: 'The name goes into every ad, and the launch date decides where Raya falls in the plan.' },
    { no: '02', title: 'Unit cost and price', titleH: 0.56, body: 'The landed cost and the final price set the cost per sale the client can afford.' },
    { no: '03', title: 'A creative commitment', titleH: 0.56, body: 'How many posts and ads COO can produce each month, and the date of the first shoot.' },
    { no: '04', title: 'Account access', titleH: 0.56, body: 'Admin access to the Meta Business portfolio, TikTok Ads Manager, Google Ads, GA4 and the website.' },
    { no: '05', title: 'A store ready to sell', titleH: 0.56, body: 'Product pages with sizes, momme and hem close-ups, card and FPX payment, delivery times and returns.' },
  ], { y: 1.8, h: 2.88, bodySize: 9 });
  footer(s, ['Prepared by Toggle Solutions for COO. Working notes and sources sit in the speaker notes of every slide.'], 'strip');
  s.addNotes(
    'The fastest next step is a 30-minute call with the client to close items 01, 02 and 05. Items 03 and 04 sit '
    + 'with COO. If the online store is not built yet, item 05 sets the launch date, because the conversion '
    + 'campaigns cannot start without a working checkout.\n\n'
    + 'Once we have the launch date, we turn this plan into a dated media calendar with a weekly budget per '
    + 'platform, and we set the cost per purchase target from the unit cost and price in item 02.',
  );
}

// ------------------------------------------------------------------ write --
const out = process.argv[2] || path.join(__dirname, 'new-silk-house-social-plan.pptx');
pptx.writeFile({ fileName: out }).then(() => {
  console.log('written:', out);
});
