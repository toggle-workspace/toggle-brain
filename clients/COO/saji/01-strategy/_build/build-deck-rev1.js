/**
 * Saji x Bulan Bintang, Ramadan Raya 2027
 * Toggle's digital advertising proposal, prepared for COO. Revision 1.
 *
 * rev1 keeps the client's briefed mechanic (RM25 Saji + RM150 Bulan Bintang,
 * two receipts) and removes the friction with a Saji pop-up inside every Bulan
 * Bintang boutique. The media model is re-costed at a conservative RM18 per
 * entry. rev0 remains in build-deck.js as the record of the earlier position.
 *
 * Design system: bru-hwc structure (clients/COO/Colgate/design-systems/bru-hwc)
 * with the palette shifted to Saji, sampled from the client's own key visuals.
 * Slide surface 10 x 5.625in, mapped 1:1 from the system's 1000 x 563px slide.
 */

const PptxGenJS = require('pptxgenjs');
const path = require('path');

// ---------------------------------------------------------------- tokens ---
// Saji palette. Greens and the canvas were sampled from the client's own
// "Tone of the Campaign" and "RaRa Campaign Pillar" key visuals.
const C = {
  cream: 'F6FAEC',       // canvas, sampled F8F8E8 / F0F8E8
  card: 'E9F3DD',        // card fill
  purple: '006838',      // Saji deep green, sampled from the KV headline
  purple2: '006838',
  purpleMuted: '6E8A76',
  brick: 'C5192B',       // Saji red accent
  orange: 'F0A03C',
  orangeRule: 'E8912C',
  highlight: 'F5EC2E',   // Saji yellow
  gold: 'F8C84A',
  maroon: '6B1410',
  ink: '052B18',         // deepest green-black
  white: 'FFFFFF',
  bright: '00A651',      // bright Saji green
};

// bru-hwc fonts are not installed on this machine. These keep the two-family
// logic intact using faces present on every Windows install.
const F = {
  display: 'Arial Black',      // stands in for Archivo Black
  body: 'Arial',               // stands in for Archivo
  narrative: 'Century Gothic', // stands in for Lexend
  emphasis: 'Century Gothic',  // stands in for Montserrat
};

const PAD = 0.56;
const COL_W = 10 - PAD * 2; // 8.88
const GAP = 0.2;

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'SAJI16x9', width: 10, height: 5.625 });
pptx.layout = 'SAJI16x9';
pptx.author = 'Toggle Solutions';
pptx.company = 'Toggle Solutions';
pptx.title = 'Saji x Bulan Bintang - Digital Advertising Proposal - rev1 (2026-09-13)';
pptx.subject = 'Prepared for COO';

// ------------------------------------------------------------- helpers ----
const NM = { margin: 0 };

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
  s.addShape(pptx.ShapeType.rect, {
    x: PAD, y, w: 0.24, h: 0.08, fill: { color: C.brick }, line: { type: 'none' },
  });
}

/** Mode C headline: green sentence with at most one red phrase */
function headline(s, runs, y = 0.62, h = 0.95, size = 25) {
  s.addText(
    runs.map((r) => (typeof r === 'string'
      ? { text: r, options: { color: C.purple2 } }
      : { text: r.t, options: { color: r.accent ? C.brick : C.purple2 } })),
    {
      x: PAD, y, w: COL_W, h,
      fontFace: F.display, fontSize: size, lineSpacing: size * 1.18,
      valign: 'top', ...NM,
    },
  );
}

function standfirst(s, text, y, h = 0.5) {
  s.addText(text, {
    x: PAD, y, w: COL_W * 0.96, h,
    fontFace: F.body, fontSize: 11, bold: true, color: C.purple2,
    lineSpacing: 15, valign: 'top', ...NM,
  });
}

const RULE_COLORS = [C.brick, C.purple2, C.orangeRule, C.ink, C.bright];

/** Card grid. theme: 'positional' | 'brick' | 'purple' | 'ink' */
function cardGrid(s, cards, opts = {}) {
  const y = opts.y ?? 2.1;
  const h = opts.h ?? 2.55;
  const gap = opts.gap ?? GAP;
  const n = cards.length;
  const w = (COL_W - gap * (n - 1)) / n;
  const padX = opts.padX ?? 0.18;
  const bodySize = opts.bodySize ?? 9.5;
  const titleSize = opts.titleSize ?? 13;

  cards.forEach((c, i) => {
    const x = PAD + i * (w + gap);
    let rule;
    if (opts.theme === 'brick') rule = C.brick;
    else if (opts.theme === 'purple') rule = C.purple2;
    else if (opts.theme === 'ink') rule = C.ink;
    else rule = RULE_COLORS[i % RULE_COLORS.length];

    s.addShape(pptx.ShapeType.rect, {
      x, y, w, h, fill: { color: C.card }, line: { type: 'none' },
    });
    s.addShape(pptx.ShapeType.rect, {
      x, y, w, h: 0.06, fill: { color: rule }, line: { type: 'none' },
    });

    const ix = x + padX;
    const iw = w - padX * 2;
    let cy = y + 0.2;

    if (c.stat) {
      s.addText(c.stat, {
        x: ix, y: cy, w: iw, h: 0.42,
        fontFace: F.display, fontSize: c.statSize ?? 19, color: rule,
        valign: 'top', wrap: false, ...NM,
      });
      cy += 0.46;
    } else if (c.no) {
      s.addText(c.no, {
        x: ix, y: cy, w: iw, h: 0.24,
        fontFace: F.body, fontSize: 11, bold: true, color: rule,
        valign: 'top', wrap: false, ...NM,
      });
      cy += 0.3;
    }

    if (c.label) {
      s.addText(c.label.toUpperCase(), {
        x: ix, y: cy, w: iw, h: 0.2,
        fontFace: F.body, fontSize: 8, bold: true, charSpacing: 0.8,
        color: c.labelHot ? C.brick : C.purpleMuted, valign: 'top', ...NM,
      });
      cy += 0.23;
    }

    if (c.title) {
      const th = c.titleH ?? 0.5;
      s.addText(c.title, {
        x: ix, y: cy, w: iw, h: th,
        fontFace: F.body, fontSize: titleSize, bold: true, color: C.purple2,
        lineSpacing: titleSize + 3, valign: 'top', ...NM,
      });
      cy += th + 0.04;
    }

    if (c.body) {
      s.addText(c.body, {
        x: ix, y: cy, w: iw, h: y + h - cy - 0.16,
        fontFace: F.body, fontSize: bodySize, color: C.purple2,
        lineSpacing: bodySize + 3.5, valign: 'top', ...NM,
      });
    }

    (c.blocks || []).forEach((b) => {
      s.addText(b.label.toUpperCase(), {
        x: ix, y: cy, w: iw, h: 0.18,
        fontFace: F.body, fontSize: 7.5, bold: true, charSpacing: 0.7,
        color: b.hot ? C.brick : C.purpleMuted, valign: 'top', ...NM,
      });
      cy += 0.19;
      const bh = b.h ?? 0.5;
      s.addText(b.text, {
        x: ix, y: cy, w: iw, h: bh,
        fontFace: F.body, fontSize: bodySize, color: C.purple2,
        lineSpacing: bodySize + 3.5, valign: 'top', ...NM,
      });
      cy += bh + 0.06;
    });
  });
}

/** inset footer strip near the bottom */
function footer(s, runs, variant = 'ink') {
  const fill = variant === 'alert' ? C.brick
    : variant === 'purple' ? C.purple2
      : variant === 'strip' ? C.card : C.ink;
  const y = 4.86;
  s.addShape(pptx.ShapeType.rect, {
    x: 0.48, y, w: 10 - 0.96, h: 0.44, fill: { color: fill }, line: { type: 'none' },
  });
  const txtColor = variant === 'strip' ? C.purple2 : C.white;
  const leadColor = variant === 'strip' ? C.brick : C.highlight;
  s.addText(
    runs.map((r) => (typeof r === 'string'
      ? { text: r, options: { color: txtColor } }
      : { text: r.t, options: { color: r.lead ? leadColor : txtColor } })),
    {
      x: 0.72, y: y + 0.02, w: 10 - 1.44, h: 0.4,
      fontFace: F.body, fontSize: 9.5, bold: true, color: txtColor,
      valign: 'middle', ...NM,
    },
  );
}

function runningHeader(s, text) {
  s.addText(text, {
    x: PAD, y: 0.22, w: COL_W, h: 0.2, align: 'right',
    fontFace: F.narrative, fontSize: 8.6, color: C.purpleMuted, valign: 'top', ...NM,
  });
}

/** Mode B statement page */
function statementPage(kicker, runs, notes) {
  const s = creamPage();
  s.addText(kicker, {
    x: PAD, y: 1.45, w: COL_W, h: 0.45,
    fontFace: F.narrative, fontSize: 22, color: C.purple, valign: 'top', ...NM,
  });
  s.addText(
    runs.map((r) => (typeof r === 'string'
      ? { text: r, options: { color: C.purple } }
      : {
        text: r.t,
        options: r.hl
          ? { color: C.purple, bold: true, highlight: C.highlight }
          : { color: C.purple, bold: r.bold !== false },
      })),
    {
      x: PAD, y: 2.05, w: COL_W * 0.92, h: 2.5,
      fontFace: F.emphasis, fontSize: 22, lineSpacing: 32, valign: 'top', ...NM,
    },
  );
  if (notes) s.addNotes(notes);
  return s;
}

/** Mode A section divider */
function divider(no, title, sub, notes) {
  const s = inkPage();
  s.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 0.14, h: 5.625, fill: { color: C.brick }, line: { type: 'none' },
  });
  s.addText(no, {
    x: 0.7, y: 1.7, w: 4, h: 0.4,
    fontFace: F.narrative, fontSize: 21, bold: true, color: C.white, valign: 'top', ...NM,
  });
  s.addText(title, {
    x: 0.7, y: 2.4, w: 7.6, h: 0.8,
    fontFace: F.narrative, fontSize: 38, bold: true, color: C.white, valign: 'top', ...NM,
  });
  s.addText(sub, {
    x: 0.7, y: 3.35, w: 6.2, h: 0.9,
    fontFace: F.narrative, fontSize: 15, color: C.gold, lineSpacing: 22, valign: 'top', ...NM,
  });
  if (notes) s.addNotes(notes);
  return s;
}

/** two solid panels joined by a plus */
function panelPair(s, left, right, opts = {}) {
  const y = opts.y ?? 2.0;
  const h = opts.h ?? 2.6;
  const fs = opts.fontSize ?? 9.5;
  const ls = opts.lineSpacing ?? 13;
  const plusW = 0.44;
  const w = (COL_W - plusW - GAP * 2) / 2;
  [[left, C.brick, PAD], [right, C.purple2, PAD + w + plusW + GAP * 2]].forEach(
    ([p, fill, x]) => {
      s.addShape(pptx.ShapeType.rect, {
        x, y, w, h, fill: { color: fill }, line: { type: 'none' },
      });
      let cy = y + 0.2;
      s.addText(p.no, {
        x: x + 0.28, y: cy, w: w - 0.56, h: 0.3,
        fontFace: F.display, fontSize: 14, color: C.white, valign: 'top', ...NM,
      });
      cy += 0.38;
      s.addText(p.title, {
        x: x + 0.28, y: cy, w: w - 0.56, h: 0.42,
        fontFace: F.body, fontSize: 13.5, bold: true, color: C.white,
        lineSpacing: 17, valign: 'top', ...NM,
      });
      cy += 0.48;
      (p.rows || []).forEach((r) => {
        if (r.label) {
          s.addText(r.label.toUpperCase(), {
            x: x + 0.28, y: cy, w: w - 0.56, h: 0.18,
            fontFace: F.body, fontSize: 7.5, bold: true, charSpacing: 0.7,
            color: C.highlight, valign: 'top', ...NM,
          });
          cy += 0.19;
        }
        s.addText(r.text, {
          x: x + 0.28, y: cy, w: w - 0.56, h: r.h ?? 0.42,
          fontFace: F.body, fontSize: fs, color: C.white,
          lineSpacing: ls, valign: 'top', ...NM,
        });
        cy += (r.h ?? 0.42) + 0.06;
      });
    },
  );
  s.addText('+', {
    x: PAD + w + GAP, y: y + h / 2 - 0.24, w: plusW, h: 0.48, align: 'center',
    fontFace: F.display, fontSize: 24, color: C.purple2, valign: 'middle', ...NM,
  });
}

/** budget split bar with names under each segment */
function splitBar(s, segs, opts = {}) {
  const y = opts.y ?? 2.2;
  const h = opts.h ?? 0.58;
  const colors = [C.brick, C.purple2, C.ink, C.orangeRule];
  let x = PAD;
  const total = segs.reduce((a, b) => a + b.pct, 0);
  segs.forEach((sg, i) => {
    const w = (COL_W * sg.pct) / total;
    s.addShape(pptx.ShapeType.rect, {
      x, y, w, h, fill: { color: colors[i % 4] }, line: { type: 'none' },
    });
    s.addText(`${sg.pct}%`, {
      x, y, w, h, align: 'center', valign: 'middle',
      fontFace: F.display, fontSize: 13, color: C.white, wrap: false, ...NM,
    });
    s.addText(sg.name, {
      x, y: y + h + 0.08, w, h: 0.4, align: 'center',
      fontFace: F.body, fontSize: 9, bold: true, color: C.purple2,
      lineSpacing: 12, valign: 'top', ...NM,
    });
    x += w;
  });
}

/** horizontal timeline, dates alternating above and below the line */
function timeline(s, stops, opts = {}) {
  const y = opts.y ?? 2.5;
  const x0 = PAD + 0.35;
  const x1 = 10 - PAD - 0.35;
  s.addShape(pptx.ShapeType.line, {
    x: x0, y, w: x1 - x0, h: 0,
    line: { color: C.purple2, width: 1 },
  });
  const step = (x1 - x0) / (stops.length - 1);
  stops.forEach((st, i) => {
    const cx = x0 + step * i;
    s.addShape(pptx.ShapeType.ellipse, {
      x: cx - 0.075, y: y - 0.075, w: 0.15, h: 0.15,
      fill: { color: st.milestone ? C.brick : C.cream },
      line: { color: C.brick, width: 2 },
    });
    const above = i % 2 === 0;
    const ty = above ? y - 0.92 : y + 0.2;
    s.addText(st.when, {
      x: cx - 0.62, y: ty, w: 1.24, h: 0.22, align: 'center',
      fontFace: F.body, fontSize: 9.5, bold: true, color: C.brick, valign: 'top', ...NM,
    });
    s.addText(st.what, {
      x: cx - 0.62, y: ty + 0.22, w: 1.24, h: 0.5, align: 'center',
      fontFace: F.body, fontSize: 8.5, color: C.purple2, lineSpacing: 11,
      valign: 'top', ...NM,
    });
  });
}

/** structured table in the house style */
function table(s, head, rows, opts = {}) {
  const y = opts.y ?? 2.05;
  const colW = opts.colW;
  const fs = opts.fontSize ?? 9.5;
  const headRow = head.map((h) => ({
    text: h,
    options: {
      fontFace: F.body, fontSize: 8, bold: true, color: C.white,
      fill: { color: C.purple2 }, valign: 'middle', margin: [3, 5, 3, 5],
      charSpacing: 0.6,
    },
  }));
  const bodyRows = rows.map((r, ri) => r.map((cell, ci) => {
    const isObj = typeof cell === 'object' && cell !== null;
    const txt = isObj ? cell.t : cell;
    return {
      text: String(txt),
      options: {
        fontFace: isObj && cell.big ? F.display : F.body,
        fontSize: isObj && cell.big ? fs + 2 : fs,
        bold: isObj ? !!cell.bold : ci === 0,
        color: isObj && cell.hot ? C.brick : C.purple2,
        fill: { color: ri % 2 === 0 ? C.card : C.cream },
        valign: 'middle',
        margin: [3, 5, 3, 5],
      },
    };
  }));
  s.addTable([headRow, ...bodyRows], {
    x: opts.x ?? PAD, y, w: opts.w ?? COL_W, colW,
    rowH: [opts.headH ?? 0.26, ...rows.map(() => opts.rowH ?? 0.3)],
    border: { type: 'solid', color: C.cream, pt: 1 },
    autoPage: false,
  });
}

/** small caps caption, used above a table */
function caption(s, text, x, y, w, color) {
  s.addText(text.toUpperCase(), {
    x, y, w, h: 0.2,
    fontFace: F.body, fontSize: 8.5, bold: true, charSpacing: 0.9,
    color: color ?? C.brick, valign: 'top', ...NM,
  });
}

// =====================================================================
// 01 · Cover
// =====================================================================
{
  const s = inkPage();
  s.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 0.14, h: 5.625, fill: { color: C.brick }, line: { type: 'none' },
  });
  s.addText('Ramadan Raya 2027', {
    x: 0.7, y: 1.12, w: 6, h: 0.32,
    fontFace: F.narrative, fontSize: 14, bold: true, color: C.highlight,
    valign: 'top', ...NM,
  });
  s.addText('Digital Advertising Proposal', {
    x: 0.7, y: 1.72, w: 8, h: 1.5,
    fontFace: F.narrative, fontSize: 40, bold: true, color: C.white,
    lineSpacing: 48, valign: 'top', ...NM,
  });
  s.addText('Saji  x  Bulan Bintang', {
    x: 0.7, y: 3.0, w: 7, h: 0.5,
    fontFace: F.narrative, fontSize: 21, color: C.gold, valign: 'top', ...NM,
  });
  s.addText(
    'Turning the Buy and Win contest into a measurable conversion campaign, '
    + 'and funding the brand video separately from it.',
    {
      x: 0.7, y: 3.62, w: 6.4, h: 0.8,
      fontFace: F.narrative, fontSize: 12, color: 'B8CFBE', lineSpacing: 18,
      valign: 'top', ...NM,
    },
  );
  s.addText('Prepared by Toggle Solutions for COO  ·  September 2026', {
    x: 0.7, y: 4.88, w: 8.6, h: 0.3,
    fontFace: F.narrative, fontSize: 9.5, color: C.white, valign: 'top', ...NM,
  });
  s.addNotes(
    'Toggle supports pillars 2 and 3, the Buy and Win contest and digital amplification. '
    + 'COO owns the contest mechanics and the brand video.\n\n'
    + 'Pitch 21 Sept 2026, submission 24 Sept, award expected 17 Oct.',
  );
}

// =====================================================================
// 02 · Executive summary
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'Five years of falling entries. ' },
    { t: 'One fixable cause.', accent: true },
  ]);
  standfirst(s,
    'Saji has bought more media every year and collected fewer contest entries every year. '
    + 'The 2027 brief asks for more entries again, while raising the price of entry from RM25 to RM175. '
    + 'This is what we would do about it.', 1.62, 0.46);

  cardGrid(s, [
    {
      no: '01',
      label: 'The problem',
      title: 'Views up, entries down',
      body: '2026 delivered 38.82M views, 3.5 times 2025, and the lowest entry count on '
        + 'record at 3,765. Media was bought against impressions, and impressions is '
        + 'what it returned.',
    },
    {
      no: '02',
      label: 'The mechanic',
      title: 'Keep the rules, move the shop',
      body: 'The mechanic stays exactly as briefed. A Saji pop-up inside every Bulan '
        + 'Bintang boutique collapses two trips into one, so the RM175 survives and '
        + 'the friction does not.',
    },
    {
      no: '03',
      label: 'The structure',
      title: 'Two engines, funded apart',
      body: 'A contest conversion engine on a landing page with a pixel, and a brand '
        + 'video engine on TikTok, Meta and YouTube. Different budgets, measured '
        + 'separately.',
    },
    {
      no: '04',
      label: 'The budget',
      title: 'RM135,000 or RM160,000',
      body: 'Both planned at a conservative RM18 per entry. RM135,000 clears entries '
        + 'and reach with nothing to spare. RM160,000 clears all three KPIs on paid '
        + 'alone. Neither counts non paid contribution.',
    },
  ], { y: 2.16, h: 2.56, bodySize: 9, titleSize: 12 });

  footer(s, [
    { t: 'One ask: ', lead: true },
    'a landing page instead of a QR code in the ad. Without it no platform can optimize toward an entry, '
    + 'which is exactly why 2026 bought views and not entries.',
  ]);
  s.addNotes(
    'This is the whole argument on one page. If COO shows nothing else, show this.\n\n'
    + 'Entry history: 11,834 (2022), 8,464 (2023), 7,576 (2024), 4,179 (2025), 3,765 (2026). '
    + 'Source: RARA 2025 and RARA 2026 decks.',
  );
}

// =====================================================================
// 03 · Five years of data
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'More reach every year. ' },
    { t: 'Fewer entries every year.', accent: true },
  ], 0.62, 0.9, 24);
  standfirst(s,
    'The last column is the one that matters. It is how many contest entries each million '
    + 'people reached actually produced, and it has fallen by 90% since 2022.', 1.56, 0.44);

  table(s,
    ['YEAR', 'IMPRESSIONS', 'VIEWS', 'REACH', 'ENGAGEMENT', 'ENTRIES', 'ENTRIES PER 1M REACHED'],
    [
      ['2022', '15.06M', '3.40M', '4.46M', '0.94M', '11,834', { t: '2,653', bold: true }],
      ['2023', '40.03M', '13.81M', '15.61M', '17.35M', '8,464', { t: '542', bold: true }],
      ['2024', '50.40M', '10.43M', '15.66M', '6.85M', '7,576', { t: '484', bold: true }],
      ['2025', '51.60M', '11.21M', '20.12M', '1.88M', '4,179', { t: '208', bold: true }],
      ['2026', '51.00M', '38.82M', '13.80M', '0.04M', '3,765', { t: '273', bold: true, hot: true }],
    ],
    { y: 2.12, colW: [0.72, 1.4, 1.16, 1.16, 1.44, 1.1, 1.9], rowH: 0.36 },
  );

  s.addText(
    'Hold 2026’s rate of 273 and it takes 14.7 million reached to land 4,000 entries. '
    + 'The brief asks for 15 million reach, so the brief is internally consistent, but only '
    + 'while entry friction stays where it was.',
    {
      x: PAD, y: 4.28, w: COL_W, h: 0.5,
      fontFace: F.body, fontSize: 10, bold: true, color: C.purple2,
      lineSpacing: 14, valign: 'top', ...NM,
    },
  );
  footer(s, [
    { t: 'Source: ', lead: true },
    'RARA 2025 deck (per platform actuals and the weekly entry table) and RARA 2026 deck '
    + '(the 2022 to 2026 performance series).',
  ]);
  s.addNotes(
    'The 2026 engagement figure of 0.04M against 51M impressions is 0.08%. The 2025 figure of '
    + '1.88M against 51.6M is 3.6%. Those two cannot be measured the same way, which is why the '
    + 'engagement definition is a question for the client.',
  );
}

// =====================================================================
// 04 · The 2027 tension
// =====================================================================
statementPage(
  'The tension in the 2027 brief',
  [
    { t: 'The brief asks for ' },
    { t: '6% more entries than 2026', hl: true },
    { t: ', while raising the price of entry from ' },
    { t: 'RM25 in one receipt', hl: true },
    { t: ' to ' },
    { t: 'RM175 across two brands, two shops and two trips.', hl: true },
    { t: '\n\nNo media budget fixes that on its own.', bold: false },
  ],
  'RM25 to RM175 is seven times the cost of entry. 2026 got 3,765 entries at RM25. '
  + 'Asking for 4,000 at RM175 is not a 6% increase in ambition, it is a much larger one.',
);

// =====================================================================
// 05 · Two KPIs, two engines
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'A view is not an entry. ' },
    { t: 'Stop funding them together.', accent: true },
  ], 0.62, 0.9, 24);
  standfirst(s,
    'The brief carries two objectives that compete for the same budget. Split them into two '
    + 'engines with their own money, their own creative and their own measurement, and neither '
    + 'can quietly eat the other.', 1.42, 0.4);

  panelPair(s,
    {
      no: '01',
      title: 'Contest conversion engine',
      rows: [
        { label: 'Objective', text: 'Conversions, optimized to a completed entry on the landing page.', h: 0.38 },
        { label: 'Platforms', text: 'Meta and TikTok only.', h: 0.2 },
        { label: 'Measured on', text: 'Entries and cost per entry, reported daily.', h: 0.2 },
      ],
    },
    {
      no: '02',
      title: 'Brand video engine',
      rows: [
        { label: 'Objective', text: 'Video views and reach on the Raya brand film.', h: 0.38 },
        { label: 'Platforms', text: 'TikTok, Meta and YouTube.', h: 0.2 },
        { label: 'Measured on', text: 'Views, reach, engagement rate and recall.', h: 0.2 },
      ],
    },
    { y: 1.9, h: 2.88 },
  );
  footer(s, [
    { t: 'Why it matters: ', lead: true },
    'in 2026 one budget chased both, the cheap outcome won, and the campaign finished with '
    + 'record views and record low entries.',
  ]);
}

// =====================================================================
// 06 · The three audiences
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'Three audiences. ' },
    { t: 'The pop-up reorders them.', accent: true },
  ], 0.62, 0.9, 24);
  standfirst(s,
    'Built from the brief’s own targeting language, the Kak Ji rationale, and Bulan Bintang’s '
    + 'mid range price point and suburban skew.', 1.5, 0.36);

  cardGrid(s, [
    {
      label: 'Contest engine, core',
      title: 'The Raya Household CFO',
      blocks: [
        { label: 'Who', text: 'Malay woman, 30 to 45, married with school age children, suburban or small town outside KL and Selangor, household income RM3,000 to RM6,000.', h: 0.68 },
        { label: 'Why she matters', text: 'She does the Ramadan grocery run and buys the family’s baju raya, so she already makes both purchases. Getting her through a boutique door is the one job the contest media has to do.', h: 0.59 },
      ],
    },
    {
      label: 'Engagement and shares',
      title: 'The Young Raya Stylist',
      blocks: [
        { label: 'Who', text: 'Malay, 18 to 29, single or newly married, urban and suburban, lives on TikTok and Reels. Bulan Bintang’s core buyer at the RM289 price point.', h: 0.62 },
        { label: 'Why she matters', text: 'She carries the 3% engagement KPI and the share loop. She is already walking into Bulan Bintang, so the pop-up turns her into the easiest entrant of the three.', h: 0.65, hot: true },
      ],
    },
    {
      label: 'Highest value entrant',
      title: 'The Balik Kampung Provider',
      blocks: [
        { label: 'Who', text: 'Malay man, 28 to 45, working in KL or Johor, drives home for Raya and buys for parents and children. YouTube and Facebook more than TikTok.', h: 0.68 },
        { label: 'Why he matters', text: 'He buys groceries and baju in one trip in the 10 days before Raya. The pop-up makes that trip a single stop instead of two.', h: 0.59 },
      ],
    },
  ], { y: 1.92, h: 2.88, bodySize: 8.5, titleSize: 12.5 });

  footer(s, [
    { t: 'The consequence: ', lead: true },
    'the pop-up moves the boutique visitor to the front of the queue, so contest media now buys '
    + 'store traffic as well as page traffic.',
  ]);
  s.addNotes(
    'Sources: the client brief slide describing the Malay housewife target, the Kak Ji mascot '
    + 'rationale in the RARA 2026 deck, Bulan Bintang’s RM289 price point and 14 boutiques, '
    + 'and COO’s note that Bulan Bintang is stronger outside the city areas.',
  );
}

// =====================================================================
// 07 · Messaging direction by audience
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'One idea, ' },
    { t: 'three ways in.', accent: true },
  ], 0.62, 0.9, 24);
  standfirst(s,
    'All three sit under the client’s own Low-key Raya idea: less noise, more meaning. Saji is '
    + 'the companion, not the hero. Bahasa Malaysia first, and Kak Ji fronts the contest work.',
  1.5, 0.36);

  cardGrid(s, [
    {
      label: 'Raya Household CFO',
      blocks: [
        { label: 'Tension', text: 'She absorbs the rising cost of Raya, and everyone eats without noticing who cooked.', h: 0.32 },
        { label: 'The line', text: '"Barang Raya dah beli. Kali ni, biar Saji pula yang belanja."', h: 0.32, hot: true },
        { label: 'Proof', text: 'RM500 duit raya and a year of Saji. She stops buying cooking oil in 2027.', h: 0.32 },
        { label: 'Where and how', text: 'Facebook and TikTok, 70% outside KL and Selangor, weighted to the boutique towns.', h: 0.32 },
      ],
    },
    {
      label: 'Young Raya Stylist',
      blocks: [
        { label: 'Tension', text: 'She wants Raya to look good without pretending it is more than it is.', h: 0.32 },
        { label: 'The line', text: '"Beli baju, ambil Saji. Semua dalam satu kedai."', h: 0.32, hot: true },
        { label: 'Proof', text: 'The Saji counter sits inside the boutique, so both receipts happen in one visit.', h: 0.32 },
        { label: 'Where and how', text: 'TikTok and Reels, Spark Ads on KOL content. Baju to table, limited edition tudung.', h: 0.32 },
      ],
    },
    {
      label: 'Balik Kampung Provider',
      blocks: [
        { label: 'Tension', text: 'He shows love by providing, and he wants the drive home to count.', h: 0.32 },
        { label: 'The line', text: '"Bawa balik lebih daripada barang."', h: 0.32, hot: true },
        { label: 'Proof', text: 'The prize covers the table and the family’s baju, which is what he drives home with.', h: 0.32 },
        { label: 'Where and how', text: 'YouTube around the film, Facebook, TikTok in the last two weeks. Overlay from 1 Mar.', h: 0.32 },
      ],
    },
  ], { y: 1.92, h: 2.88, bodySize: 8.5 });

  footer(s, [
    { t: 'What we do not say: ', lead: true },
    'no extravagance, no loud flexing, no borrowed grief from world events, and never that Saji is '
    + 'the hero of the story.',
  ]);
  s.addNotes(
    'The Low-key Raya idea comes from the client’s own WhatsApp message in the Marketing Leads '
    + 'group, captured on slide 6 of the blank canvas deck: "Less noise. More meaning. Less showing. '
    + 'More feeling. Less extravagance. More togetherness."\n\n'
    + 'The tone slide sets the personality as humble, warm, genuine, meaningful.',
  );
}

// =====================================================================
// 08 · Divider, the mechanic
// =====================================================================
divider('01.', 'The mechanic',
  'What Malaysia already does with two brand contests, where the friction actually sits, and the three things we would change about the experience rather than the rules.');

// =====================================================================
// 09 · How Malaysia runs two-brand contests
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'Nobody in Malaysia asks for ' },
    { t: 'two receipts from two shops.', accent: true },
  ], 0.62, 0.9, 23);
  standfirst(s,
    'Five live examples. Every one of them either puts both brands in a single receipt at a single '
    + 'retailer, or makes the partner brand the prize rather than a second purchase.', 1.56, 0.4);

  cardGrid(s, [
    {
      label: 'HeroMarket, Aug 2026',
      title: 'Tyson and First Pride',
      body: 'Two brands, one receipt, one store. Buy any two packs of either brand in a single receipt.\n\nLESSON: two brands works when both sit in the same basket.',
    },
    {
      label: 'Guardian, Sep 2025',
      title: 'BRAND’S x Christy Ng',
      body: 'Spend RM100 on BRAND’S, win a Christy Ng bag. 20 winners.\n\nLESSON: the partner brand can be the prize instead of a second purchase.',
    },
    {
      label: 'Raya 2026',
      title: '100PLUS x SHALS',
      body: 'A limited edition baju raya by a Malaysian label, awarded to top spenders in TikTok Live.\n\nLESSON: FMCG and fashion works when the baju is the reward.',
    },
    {
      label: 'AEON, Aug 2026',
      title: 'Merdeka Shop and Win',
      body: 'RM80 single receipt, scan the QR at checkout, 69 prizes over four weekly draws.\n\nLESSON: the QR lives at the till, and weekly draws hold a long window.',
    },
    {
      label: 'Running right now',
      title: 'Bulan Bintang, our partner',
      body: 'They run their own QR scan contest with a RM400,000 cash pool.\n\nLESSON: our RM145,000 two brand contest would sit next to a bigger, simpler one.',
      labelHot: true,
    },
  ], { y: 2.02, h: 2.72, gap: 0.13, padX: 0.14, bodySize: 8, titleSize: 10.5 });

  footer(s, [
    { t: 'The finding: ', lead: true },
    'we could not find a single Malaysian contest that required purchases from two separate brands '
    + 'at two separate retailers for one entry. That absence is the warning.',
  ], 'alert');
  s.addNotes(
    'Sources:\n'
    + 'HeroMarket x Tyson and First Pride, everydayonsales.com, 1 Aug to 30 Sep 2026.\n'
    + 'Guardian x BRAND’S x Christy Ng, 1 Sep to 31 Oct 2025.\n'
    + '100PLUS x SHALS "Raya Lebih Fresh Dengan 100PLUS", brandinginasia.com, 17 Jan to 15 Apr 2026.\n'
    + 'AEON Merdeka Shop and Win, syioknya.com, 30 Jul to 31 Aug 2026.\n'
    + 'Bulan Bintang Terrrpaling Raya Finale, verified live on bulan-bintang.com.my, RM400,000 cash pool.',
  );
}

// =====================================================================
// 10 · Where the friction actually sits
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'Nine steps across two trips, ' },
    { t: 'or six in one shop.', accent: true },
  ], 0.58, 0.5, 24);
  standfirst(s,
    'The mechanic stays exactly as the client wrote it: RM25 of Saji, RM150 of Bulan Bintang, two '
    + 'receipts. What we change is where the shopper is standing when she buys them.', 1.18, 0.36);

  panelPair(s,
    {
      no: 'AS BRIEFED',
      title: 'Two shops, two trips, receipts days apart',
      rows: [
        { label: 'The journey', text: '1. Sees the ad\n2. Works out that two brands are needed\n3. Buys RM25 of Saji at the grocer\n4. Keeps receipt one, for days\n5. Travels to a Bulan Bintang boutique\n6. Buys RM150 of baju\n7. Finds the entry route again\n8. Uploads two receipts\n9. Submits\n\nSteps four to six take days.', h: 1.72 },
      ],
    },
    {
      no: 'WITH THE POP-UP',
      title: 'One shop, one trip, receipts minutes apart',
      rows: [
        { label: 'The journey', text: '1. Sees the ad, or the poster at the boutique door\n2. Buys RM150 of baju at Bulan Bintang\n3. Buys RM25 of Saji at the counter behind her\n4. Scans the counter QR, or taps the ad\n5. Uploads both receipts, taken minutes apart\n6. Submits\n\nThe RM175 threshold is untouched. The two trips become one afternoon, and no receipt has to survive a week in a handbag.', h: 1.72 },
      ],
    },
    { y: 1.72, h: 3.06, fontSize: 8.5, lineSpacing: 11 },
  );
  footer(s, [
    { t: 'The honest trade: ', lead: true },
    'this fixes the journey for anyone already heading to a boutique, and it hands the media a new '
    + 'job, which is putting 14 shopfronts in front of the right people.',
  ]);
  s.addNotes(
    'The step counts are the same journey described two ways, not a modelled drop-off. Nine steps '
    + 'as briefed, six with the pop-up.\n\n'
    + 'The real gain is not the three steps saved. It is that steps four to six in the briefed '
    + 'journey span days, and a receipt that has to survive days is a receipt that gets lost. In '
    + 'the pop-up journey the two receipts are printed minutes apart.',
  );
}

// =====================================================================
// 11 · The pop-up
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'Put a Saji counter inside ' },
    { t: 'every Bulan Bintang store.', accent: true },
  ], 0.62, 0.9, 23);
  standfirst(s,
    'One counter, 14 boutiques, 10 weeks. It puts both qualifying purchases within a few steps of '
    + 'each other, and it puts Saji in front of a shopper who has just spent RM289 on a baju.',
  1.56, 0.4);

  cardGrid(s, [
    {
      stat: 'Access',
      statSize: 15,
      label: 'The friction answer',
      title: 'Both receipts in one visit',
      body: 'She buys her baju, turns around, and buys her Saji at the counter behind her. The client’s RM175 threshold survives intact, and the two receipts are minutes apart instead of days.',
    },
    {
      stat: 'Exclusive',
      statSize: 15,
      label: 'The reason to go',
      title: 'Three things you can only get here',
      body: 'The mystery gift, the campaign pack and the Golden Ticket exist only in stock sold at the pop-ups. Walking into a boutique becomes the advantage rather than the obstacle.',
      labelHot: true,
    },
    {
      stat: 'Data',
      statSize: 15,
      label: 'What Saji keeps afterwards',
      title: 'First-party proof of an M40 basket',
      body: 'Saji is read as a B40 brand. Every pop-up receipt pairs RM25 of Saji with RM150 or more of apparel, which is basket evidence Saji does not hold anywhere today.',
    },
  ], { y: 2.08, h: 2.5, titleSize: 12 });

  footer(s, [
    { t: 'What this needs from the partner: ', lead: true },
    'floor space for a Saji counter in all 14 boutiques for 10 weeks. Everything in this section '
    + 'rests on that one yes.',
  ]);
  s.addNotes(
    'Sources: Bulan Bintang runs 14 boutiques at roughly RM289 a piece, per their own site and the '
    + 'StoreHub profile. COO described them in the room as mid-range and stronger outside the city.\n\n'
    + 'Two things to say out loud when this slide is up. First, none of the budget options in this '
    + 'deck carry a ringgit of pop-up build, stock or staffing cost. That sits with on-ground, not '
    + 'with the digital line. Second, we are claiming M40, not T20. A RM289 baju from a suburban '
    + 'boutique supports an M40 read. We have no evidence for T20 and are not going to assert it.\n\n'
    + 'This is also the answer to slide 9. The HeroMarket lesson was that two brands work when both '
    + 'sit in the same basket. A counter inside the boutique is how you put them there without '
    + 'touching the client’s mechanic.',
  );
}

// =====================================================================
// 12 · Novelty
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'Three reasons to walk ' },
    { t: 'into the pop-up.', accent: true },
  ], 0.62, 0.9, 24);
  standfirst(s,
    'A counter on its own is a convenience. These three make it somewhere worth going, and all '
    + 'three are gated to stock bought at the pop-ups.', 1.56, 0.4);

  cardGrid(s, [
    {
      stat: 'RM50',
      statSize: 17,
      label: 'Mystery gift',
      title: 'Spend above the entry floor',
      body: 'Double the RM25 threshold at the counter and a wrapped mystery gift goes in the bag. It lifts basket value on the spot and gives the staff something to say. The client sets the threshold.',
    },
    {
      stat: 'Limited',
      statSize: 17,
      label: 'Campaign packaging',
      title: 'Saji x Bulan Bintang, on the pack',
      body: 'A campaign pack sold only through the pop-ups. It is the collaboration made physical, it photographs well, and it is the thing shoppers post without being asked to.',
    },
    {
      stat: 'Golden',
      statSize: 17,
      label: 'The Golden Ticket',
      title: 'Randomized, and only here',
      body: 'A ticket hidden at random in pop-up stock wins the RM29,000 grand prize outright. One shopper walks out of a boutique holding it, and that is the story this contest has been missing.',
      labelHot: true,
    },
  ], { y: 2.08, h: 2.5, titleSize: 12 });

  footer(s, [
    { t: 'Why all three are pop-up only: ', lead: true },
    'exclusivity is what makes a shopper choose the boutique over the grocer, which is the whole '
    + 'job of the counter.',
  ]);
  s.addNotes(
    'Two production constraints to raise before anyone commits to this in front of the client.\n\n'
    + 'A Golden Ticket cannot go inside a bottle of cooking oil. It has to sit under the cap, on a '
    + 'neck tag or inside the outer carton, and that is a packaging line change with its own lead '
    + 'time. It needs to be locked with the permit in mid December.\n\n'
    + 'A randomized ticket is a second game of chance sitting alongside the weekly draw. Counsel '
    + 'should confirm whether both can be named in one permit under the Common Gaming Houses Act '
    + '1953, or whether the Golden Ticket needs its own.\n\n'
    + 'RM50 is our proposal for the mystery gift threshold, double the entry floor. The client sets '
    + 'the real number, and the gift cost sits with on-ground rather than with media.',
  );
}

// =====================================================================
// 13 · The prize
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'RM145,000, unchanged. ' },
    { t: 'Split to make a headline.', accent: true },
  ], 0.62, 0.9, 23);
  standfirst(s,
    'The client budgeted RM145,000 and that total does not move by a ringgit. What moves is the '
    + 'shape: 40 weekly winners, plus one Golden Ticket worth ten of them, so the contest finally '
    + 'has a prize people repeat to each other.', 1.56, 0.44);

  cardGrid(s, [
    {
      stat: 'RM116,000',
      statSize: 17,
      label: '40 weekly winners',
      title: 'Four a week, ten weeks',
      body: 'RM2,900 each: RM500 duit raya in cash plus RM2,400 of Saji products for a year. Ten weekly draws, so no week of the contest passes without a visible winner.',
    },
    {
      stat: 'RM29,000',
      statSize: 17,
      label: 'One Golden Ticket',
      title: 'Ten weekly prizes in one packet',
      body: 'Found at random in stock bought at a pop-up. It is worth exactly ten of the weekly prizes, which is a line the creative can use without exaggerating anything.',
    },
    {
      stat: '+ RM600',
      statSize: 17,
      label: 'Optional, partner funded',
      title: 'If Bulan Bintang co-funds',
      body: 'A family baju set on each weekly prize takes it to RM3,500 a winner, with Saji’s RM145,000 untouched. The partner is in the mechanic, the pop-up and the Golden Ticket, but not in the prize.',
      labelHot: true,
    },
  ], { y: 2.2, h: 2.46, titleSize: 12 });

  footer(s, [
    { t: 'The one trade: ', lead: true },
    'the winner count moves from 50 to 40 to fund the Golden Ticket. Saji spends the same '
    + 'RM145,000 either way.',
  ]);
  s.addNotes(
    'The arithmetic: 40 winners at RM2,900 is RM116,000, plus a RM29,000 Golden Ticket, which is '
    + 'RM145,000 exactly. The briefed structure was 50 winners at RM2,900, which is the same '
    + 'RM145,000. Nothing has been added to the client’s budget.\n\n'
    + 'If the client will not give up ten winners, the alternative is to keep all 50 and ask Bulan '
    + 'Bintang to fund the Golden Ticket. That is the same partner conversation as card three, and '
    + 'it can be put as one ask rather than two.\n\n'
    + 'On weekly draws: COO’s working deck proposes four draws across a 10 week window, which '
    + 'leaves six weeks with no winning moment. Four winners a week for ten weeks keeps a winner in '
    + 'every week. In 2025 the contest ran roughly 2,000 winners against 4,179 entries and held '
    + 'entries better than any year since, so visible winning is what keeps people entering. Confirm '
    + 'that 2025 figure against the source deck before quoting it, since the PDF columns are loose.\n\n'
    + 'Card three is an option, not something we have costed into any budget figure in this deck.',
  );
}

// =====================================================================
// 14 · Divider, the media plan
// =====================================================================
divider('02.', 'The media plan',
  'What we are planning on, what RM135,000 buys, what RM160,000 buys, and why an entry is now priced at RM18 instead of RM9.');

// =====================================================================
// 15 · The planning rate card
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'Every number we plan on, ' },
    { t: 'and where it came from.', accent: true },
  ], 0.62, 0.9, 23);
  standfirst(s,
    'Half of this is derived from Saji’s own 2025 per platform delivery. Half is our planning '
    + 'assumption, because neither past deck contains a single spend figure. You should know which '
    + 'is which before you defend it.', 1.56, 0.44);

  table(s,
    ['LINE', 'PLATFORM', 'OBJECTIVE', 'CPM', 'FREQ', 'VIEW RATE', 'PER VIEW / CPC', 'SOURCE'],
    [
      ['Contest', 'Meta', 'Conversions', 'RM22.00', 'n/a', 'n/a', 'CPC RM0.45', { t: 'CPM assumed, CTR 2025', hot: true }],
      ['Contest', 'TikTok', 'Conversions', 'RM15.00', 'n/a', 'n/a', 'CPC RM0.30', { t: 'CPM assumed, CTR 2025', hot: true }],
      ['Video', 'TikTok', 'Video views', 'RM2.20', '1.9', '70%', 'RM0.0031', 'Freq and VTR 2025'],
      ['Video', 'Meta', 'Reels video', 'RM3.50', '1.8', '55%', 'RM0.0064', 'Freq 2025, rest assumed'],
      ['Video', 'YouTube', 'In-stream, Shorts', 'RM3.80', '1.7', '32%', 'RM0.0119', { t: 'Assumed', hot: true }],
      ['Engage', 'TikTok', 'Spark Ads on KOL', 'RM2.60', '1.8', '65%', 'RM0.0040', { t: 'Assumed', hot: true }],
    ],
    { y: 2.04, colW: [0.78, 0.86, 1.28, 0.84, 0.6, 0.86, 1.26, 2.4], rowH: 0.31, fontSize: 8.5 },
  );

  s.addText(
    'Derived from the 2025 deck: Meta frequency 1.86 (26.37M impressions over 14.17M reach), '
    + 'TikTok 1.93. View rates TikTok 63%, Meta 8.8%, Google 12.5%. CTR Meta 0.13%, TikTok 10.6%, '
    + 'Google 0.26%. Meta’s low observed view rate reflects a mostly static reach buy, so the '
    + '55% Reels figure is a different buy rather than a contradiction.',
    {
      x: PAD, y: 4.18, w: COL_W, h: 0.56,
      fontFace: F.body, fontSize: 8.5, color: C.purpleMuted, lineSpacing: 11.5,
      valign: 'top', ...NM,
    },
  );
  footer(s, [
    { t: 'One answer fixes this: ', lead: true },
    'tell us what the 2026 campaign actually spent by platform, and most of that source column '
    + 'turns from assumption into fact.',
  ]);
}

// =====================================================================
// 16 · Entry conversion, bracketed
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'We will not pretend to know ' },
    { t: 'the conversion rate.', accent: true },
  ], 0.62, 0.9, 23);
  standfirst(s,
    'In 2025 Meta delivered 34,400 link clicks against 4,179 entries, so 12.1% is the ceiling if '
    + 'Meta carried the digital route. Count TikTok’s 1.22M clicks and it drops to 0.33%. We plan '
    + 'on 2.0%, because 2027 is the first year that asks for two purchases and two receipts, and '
    + 'every year before it asked for one.', 1.56, 0.6);

  table(s,
    ['LANDING PAGE CONVERSION', 'ENTRIES', 'COST PER ENTRY', 'READ'],
    [
      [{ t: '1.5%', bold: true }, '3,000 entries', 'RM24.00', { t: 'Deeper friction than we have planned for', hot: true }],
      [{ t: '2.0%', bold: true }, { t: '4,000 entries', bold: true }, { t: 'RM18.00', bold: true }, 'What we plan on'],
      [{ t: '3.0%', bold: true }, '6,000 entries', 'RM12.00', 'If the pop-up does its job'],
      [{ t: '4.0%', bold: true }, '8,000 entries', 'RM9.00', 'The single-brand rate. Not what 2027 asks for.'],
    ],
    { y: 2.42, colW: [2.3, 1.8, 1.7, 3.08], rowH: 0.36, fontSize: 9.5 },
  );

  s.addText(
    'Both budget options buy the same 200,000 contest sessions, so entries turn on conversion alone. '
    + 'RM18 is deliberately cautious: it sits below the 2.5% stress case we modelled before the '
    + 'pop-up existed, and the pop-up is what should pull the real number above it. Cost per entry '
    + 'is against the contest line, not the total budget.',
    {
      x: PAD, y: 4.18, w: COL_W, h: 0.58,
      fontFace: F.body, fontSize: 9.5, bold: true, color: C.purple2, lineSpacing: 13,
      valign: 'top', ...NM,
    },
  );
  footer(s, [
    { t: 'The page pays for itself here: ', lead: true },
    'the landing page is what turns this from a guess into a number we manage down week by week.',
  ]);
  s.addNotes(
    'Why RM18 and not RM9. The rev0 model planned on 4.0%, which was the right rate for a mechanic '
    + 'where one purchase qualified. This proposal keeps the client’s two-purchase, two-receipt '
    + 'mechanic, so the planning rate halves to 2.0% as a safety margin. Every prior year of this '
    + 'contest asked for a single brand purchase, so there is no Saji data point for a two-receipt '
    + 'entry rate and nothing to borrow from the Malaysian benchmarks either.\n\n'
    + 'The consequence is on the next two slides: the contest line grows from RM45,000 to RM72,000, '
    + 'which is what 4,000 entries costs at RM18.',
  );
}

// =====================================================================
// 17 · Option 1, RM135,000
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'Option 1: RM135,000. ' },
    { t: 'Recommended.', accent: true },
  ], 0.62, 0.9, 24);
  standfirst(s,
    'Google gets RM12,000, Meta and TikTok share RM123,000. At RM18 an entry the contest line has '
    + 'to carry RM72,000, which is where the majority of the money now sits.', 1.56, 0.44);

  splitBar(s, [
    { pct: 53, name: 'Contest conversion\nRM72,000' },
    { pct: 40, name: 'Video and reach\nRM54,000' },
    { pct: 7, name: 'Engagement, Spark\nRM9,000' },
  ], { y: 2.12, h: 0.52 });

  table(s,
    ['DELIVERS', 'AGAINST THE BRIEF', 'VERDICT'],
    [
      [{ t: '4,000 entries', big: true }, 'Target 4,000', { t: 'Exactly on target at RM18. No cushion.', hot: true }],
      [{ t: '15.1M reach', big: true }, 'Target 15M', { t: 'Clears it by 0.7%. No cushion there either.', hot: true }],
      [{ t: '14.7M paid views', big: true }, 'Target 40M campaign wide', 'KOL and organic carry more of this than in 2026'],
      [{ t: '27.7M impressions', big: true }, 'No target set', 'RM4.87 blended CPM'],
    ],
    { y: 3.18, colW: [2.4, 2.6, 3.88], rowH: 0.33, fontSize: 9.5 },
  );
  footer(s, [
    { t: 'Cost per entry: ', lead: true },
    'RM18.00 against the contest line, RM33.75 against the full budget. The team assumed RM22.50 '
    + 'before the two-receipt friction was priced in.',
  ]);
  s.addNotes(
    'This is the same RM135,000 that rev0 recommended, rebalanced. The contest line moves from '
    + 'RM45,000 to RM72,000 and the video lines give up RM27,000 to fund it. Entries and reach both '
    + 'still clear, but neither has room left, and paid views fall from 20.1M to 14.7M.\n\n'
    + 'If the client will only sign one number, this is the one to sign. If they want the views '
    + 'target defended on paid alone, that is Option 2.\n\n'
    + 'Line detail: contest Meta RM36,000 and TikTok RM36,000, video TikTok RM30,000, video Meta '
    + 'RM12,000, Spark RM9,000, YouTube RM12,000.',
  );
}

// =====================================================================
// 18 · Option 2, RM160,000
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'Option 2: RM160,000. ' },
    { t: 'All three KPIs on paid alone.', accent: true },
  ], 0.62, 0.9, 23);
  standfirst(s,
    'The same RM72,000 contest line, with RM25,000 more behind video and reach. This is what it '
    + 'costs to hold entries, clear reach with room, and still put a real share of the 40M views '
    + 'target on paid media.', 1.56, 0.44);

  splitBar(s, [
    { pct: 45, name: 'Contest conversion\nRM72,000' },
    { pct: 47, name: 'Video and reach\nRM76,000' },
    { pct: 8, name: 'Engagement, Spark\nRM12,000' },
  ], { y: 2.12, h: 0.52 });

  table(s,
    ['DELIVERS', 'AGAINST THE BRIEF', 'VERDICT'],
    [
      [{ t: '4,000 entries', big: true }, 'Target 4,000', 'Same RM72,000 contest line as Option 1'],
      [{ t: '20.0M reach', big: true }, 'Target 15M', 'Clears it by 33%'],
      [{ t: '20.1M paid views', big: true }, 'Target 40M campaign wide', 'Half from paid, KOL and organic close the gap'],
      [{ t: '36.7M impressions', big: true }, 'No target set', 'Engagement 2.3% on impressions, 4.2% on reach'],
    ],
    { y: 3.18, colW: [2.4, 2.6, 3.88], rowH: 0.33, fontSize: 9.5 },
  );
  footer(s, [
    { t: 'What the extra RM25,000 buys: ', lead: true },
    '4.9M more reach and 5.4M more paid views. That is the price of planning an entry at RM18 '
    + 'instead of RM9.',
  ]);
  s.addNotes(
    'The contest line does not grow between the two options, because RM72,000 is already what '
    + '4,000 entries costs at RM18 and buying past the target would buy entries the prize pool '
    + 'cannot reward. Every extra ringgit goes to views and reach.\n\n'
    + 'Line detail: contest Meta RM36,000 and TikTok RM36,000, video TikTok RM40,000, video Meta '
    + 'RM18,000, Spark RM12,000, YouTube RM18,000. Blended CPM RM4.36.',
  );
}

// =====================================================================
// 19 · The two options side by side
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'Side by side.' },
  ], 0.62, 0.7, 24);
  standfirst(s,
    'The honest read on both. RM135,000 clears entries and reach with nothing to spare. RM160,000 '
    + 'clears them with room and puts half the views target on paid.', 1.4, 0.4);

  table(s,
    ['', 'BRIEF TARGET', 'RM135,000', 'RM160,000', '2026 ACTUAL'],
    [
      ['Contest entries', '4,000', { t: '4,000', bold: true }, { t: '4,000', bold: true }, '3,765'],
      ['Paid reach', '15M', { t: '15.1M', bold: true }, { t: '20.0M', bold: true }, '13.8M'],
      ['Video views, paid', '40M campaign wide', '14.7M', '20.1M', '38.8M campaign wide'],
      ['Impressions', 'Not set', '27.7M', '36.7M', '51.0M'],
      ['Engagement rate', '3%', '2.3% impr / 4.2% reach', '2.3% impr / 4.2% reach', '0.08% impr'],
      ['Cost per entry', 'Not set', 'RM18.00', 'RM18.00', 'Unknown'],
    ],
    { y: 1.84, colW: [1.86, 1.78, 1.74, 1.74, 1.76], rowH: 0.32, fontSize: 9 },
  );

  s.addText(
    'The RM90,000 discussed on 11 September is gone from this table. Priced at RM18 an entry it '
    + 'returns 2,083 entries against a 4,000 target and 11.4M reach against 15M, so it clears '
    + 'neither. Both forecasts above are paid media only, excluding KOL and organic views, both '
    + 'brands’ owned channels, entries walked in from the sampling and roadshow days, POSM and on '
    + 'pack QR codes, the Sampul Raya, and earned media.',
    {
      x: PAD, y: 4.10, w: COL_W, h: 0.68,
      fontFace: F.body, fontSize: 9, bold: true, color: C.purple2, lineSpacing: 11.5,
      valign: 'top', ...NM,
    },
  );
  footer(s, [
    { t: 'Read this line first: ', lead: true },
    'paid is the floor, not the ceiling. Everything the campaign earns for free sits on top of these '
    + 'numbers.',
  ]);
}

// =====================================================================
// 20 · Budget breakdown by platform, both options
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'Where every ringgit goes, ' },
    { t: 'by platform.', accent: true },
  ], 0.58, 0.5, 24);
  standfirst(s,
    'The same three lines split across Meta, TikTok and Google in both options. Contest conversion '
    + 'is identical in the two, because RM72,000 is what 4,000 entries costs at RM18. Engagement '
    + 'runs entirely on TikTok Spark Ads, because that is where the KOL content lives.',
  1.18, 0.44);

  const tW = (COL_W - 0.3) / 2;          // 4.29 each
  const tX2 = PAD + tW + 0.3;
  const cols = [1.29, 0.72, 0.76, 0.74, 0.78];
  const tY = 2.34;

  caption(s, 'Option 1 · RM135,000 · recommended', PAD, 2.08, tW, C.brick);
  caption(s, 'Option 2 · RM160,000', tX2, 2.08, tW, C.purpleMuted);

  table(s,
    ['LINE', 'META', 'TIKTOK', 'GOOGLE', 'TOTAL'],
    [
      ['Contest conversion', '36,000', '36,000', 'n/a', { t: '72,000', bold: true }],
      ['Video and reach', '12,000', '30,000', '12,000', { t: '54,000', bold: true }],
      ['Engagement, Spark', 'n/a', '9,000', 'n/a', { t: '9,000', bold: true }],
      [{ t: 'TOTAL', bold: true }, { t: '48,000', bold: true }, { t: '75,000', bold: true },
        { t: '12,000', bold: true }, { t: '135,000', bold: true, hot: true }],
    ],
    { x: PAD, w: tW, y: tY, colW: cols, rowH: 0.29, headH: 0.24, fontSize: 8 },
  );

  table(s,
    ['LINE', 'META', 'TIKTOK', 'GOOGLE', 'TOTAL'],
    [
      ['Contest conversion', '36,000', '36,000', 'n/a', { t: '72,000', bold: true }],
      ['Video and reach', '18,000', '40,000', '18,000', { t: '76,000', bold: true }],
      ['Engagement, Spark', 'n/a', '12,000', 'n/a', { t: '12,000', bold: true }],
      [{ t: 'TOTAL', bold: true }, { t: '54,000', bold: true }, { t: '88,000', bold: true },
        { t: '18,000', bold: true }, { t: '160,000', bold: true, hot: true }],
    ],
    { x: tX2, w: tW, y: tY, colW: cols, rowH: 0.29, headH: 0.24, fontSize: 8 },
  );

  // platform share strip
  const shareY = 3.94;
  [
    { name: 'Meta', o1: '36%', o2: '34%', color: C.purple2 },
    { name: 'TikTok', o1: '56%', o2: '55%', color: C.brick },
    { name: 'Google, YouTube', o1: '9%', o2: '11%', color: C.orangeRule },
  ].forEach((p, i2) => {
    const w = (COL_W - 0.4) / 3;
    const x = PAD + i2 * (w + 0.2);
    s.addShape(pptx.ShapeType.rect, {
      x, y: shareY, w, h: 0.62, fill: { color: C.card }, line: { type: 'none' },
    });
    s.addShape(pptx.ShapeType.rect, {
      x, y: shareY, w: 0.05, h: 0.62, fill: { color: p.color }, line: { type: 'none' },
    });
    s.addText(p.name, {
      x: x + 0.16, y: shareY + 0.09, w: w - 0.32, h: 0.2,
      fontFace: F.body, fontSize: 9, bold: true, color: C.purple2, valign: 'top', ...NM,
    });
    s.addText(`${p.o1} of RM135,000  ·  ${p.o2} of RM160,000`, {
      x: x + 0.16, y: shareY + 0.31, w: w - 0.32, h: 0.22,
      fontFace: F.body, fontSize: 8.5, color: C.purpleMuted, valign: 'top', ...NM,
    });
  });

  footer(s, [
    { t: 'Please note: ', lead: true },
    'these are initial plans. The split moves once the campaign is live, because we optimize against '
    + 'real time cost per entry and cost per view rather than against this table.',
  ], 'alert');

  s.addNotes(
    'TikTok carries the majority in both options, 56% and 55%, because a view costs least there and '
    + 'a contest session costs RM0.30 against Meta’s RM0.45. Meta holds 36% and 34%. Google takes 9% '
    + 'and 11%.\n\n'
    + 'Contest conversion is split evenly between Meta and TikTok in both options, so neither '
    + 'platform is trusted with the whole entry target before we have live data.\n\n'
    + 'Google carries no contest budget by design. YouTube cannot optimize toward a receipt upload '
    + 'the way Meta and TikTok can, so it works the brand film and leaves entries to the other two.\n\n'
    + 'Reconciliation: 48,000 + 75,000 + 12,000 = 135,000. 54,000 + 88,000 + 18,000 = 160,000.\n\n'
    + 'None of these figures include pop-up build, stock, staffing, the mystery gift or the Golden '
    + 'Ticket packaging change. Those sit with on-ground and with the client.',
  );
}

// =====================================================================
// 21 · Platform roles and geo
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'Each platform has ' },
    { t: 'one job.', accent: true },
  ], 0.62, 0.9, 24);
  standfirst(s,
    'Taken straight from what each one actually delivered for Saji in 2025, rather than from a '
    + 'generic channel plan.', 1.56, 0.4);

  cardGrid(s, [
    {
      stat: 'TikTok',
      statSize: 17,
      label: 'Views and engagement',
      title: 'The cheapest view in the market',
      body: 'In 2025 TikTok turned 11.5M impressions into 7.26M views, a 63% view rate, six times cheaper per view than YouTube. It carries the view KPI and the Spark Ads on KOL content.',
    },
    {
      stat: 'Meta',
      statSize: 17,
      label: 'Reach and conversion',
      title: 'Where the Household CFO lives',
      body: 'In 2025 Meta delivered 14.17M reach on its own. It carries the reach KPI and the higher intent half of the contest conversion buy, with Advantage+ and a real pixel.',
    },
    {
      stat: 'YouTube',
      statSize: 17,
      label: 'The brand film',
      title: 'Premium environment, priced like it',
      body: 'At roughly RM0.012 per view it is four times TikTok. It earns its place for the 6 minute film and for recall among the Balik Kampung Provider, not for volume.',
    },
  ], { y: 1.98, h: 2.34, titleSize: 12 });

  s.addText(
    'Geo: the contest runs as TWO separate campaigns so budget cannot leak to the cheapest inventory. '
    + 'KL and Selangor take 30%, the other states 70%, matching Bulan Bintang’s suburban skew. Inside '
    + 'each, a radius layer around the 14 boutiques carries the pop-up message. The brand video runs national.',
    {
      x: PAD, y: 4.42, w: COL_W, h: 0.4,
      fontFace: F.body, fontSize: 10, bold: true, color: C.purple2, lineSpacing: 13.5,
      valign: 'top', ...NM,
    },
  );
  footer(s, [
    { t: 'Why two campaigns and not two ad sets: ', lead: true },
    'inside one campaign the algorithm spends where conversions are cheapest, which is KL, and the '
    + 'outer states quietly starve.',
  ]);
  s.addNotes(
    'The 30/70 split was set against Bulan Bintang’s suburban skew before the pop-up was on the '
    + 'table. Now that the boutiques carry the mechanic, the split should be set against the real '
    + 'store list, which we do not have. That is a question for the client on slide 28.\n\n'
    + 'The boutique radius layer is a targeting layer inside the same two campaigns, not a third '
    + 'campaign and not extra budget. It runs store-traffic creative to people within reach of a '
    + 'pop-up, while the broad layer keeps working the rest of the state.',
  );
}

// =====================================================================
// 22 · Divider, how people enter
// =====================================================================
divider('03.', 'How people actually enter',
  'Why a QR code in a mobile ad cannot work, where QR codes still belong, and what the landing page has to do.');

// =====================================================================
// 23 · QR in the ad vs landing page
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'You cannot scan a QR code with ' },
    { t: 'the phone that is showing it.', accent: true },
  ], 0.62, 0.9, 22);
  standfirst(s,
    'Over 90% of Meta and TikTok impressions in Malaysia are mobile in feed. A QR code in that ad '
    + 'asks the viewer to go and find a second device.', 1.5, 0.36);

  panelPair(s,
    {
      no: 'QR CODE IN THE AD',
      title: 'Five steps, and most of them fail',
      rows: [
        { label: 'The journey', text: '1. Scrolling TikTok on her phone\n2. Sees a QR code in the ad\n3. Cannot scan it with that phone\n4. Screenshots it, or finds another device\n5. Opens a scanner that reads from the gallery', h: 0.78 },
        { label: 'What we get back', text: 'No click. No pixel. No conversion event. No retargeting pool. No cost per entry. The platforms never learn who converts, so they keep serving people who never enter.', h: 0.72 },
      ],
    },
    {
      no: 'LANDING PAGE',
      title: 'One tap, and it reports back',
      rows: [
        { label: 'The journey', text: '1. Scrolling TikTok on her phone\n2. Sees the ad, taps Sertai Sekarang\n3. Lands on the page in the in-app browser\n4. Uploads the receipt and submits\n5. Thank you page asks for the share', h: 0.78 },
        { label: 'What we get back', text: 'Click recorded, pixel fires, the conversion event trains the algorithm, a retargeting pool builds, and we can chase the people who started but never finished.', h: 0.72 },
      ],
    },
    { y: 1.86, h: 2.92, fontSize: 8.5, lineSpacing: 11 },
  );
  footer(s, [
    { t: 'This is the whole reason 2026 bought views: ', lead: true },
    'entries arrived by WhatsApp, which Meta and TikTok cannot see, so they optimized toward the '
    + 'only thing they could measure.',
  ]);
}

// =====================================================================
// 24 · Where QR still earns its place
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'QR codes belong at the till, ' },
    { t: 'not in the feed.', accent: true },
  ], 0.62, 0.9, 23);
  standfirst(s,
    'Everywhere a shopper is looking at a physical surface, a QR code is the fastest route in. '
    + 'Every code points at the same landing page with its own tracking tag, so we can report which '
    + 'touchpoint actually produced entries. This is the AEON model.', 1.56, 0.46);

  cardGrid(s, [
    {
      no: '01',
      label: 'In store',
      title: 'On the shelf and on the pack',
      body: 'Shelf talkers, neck tags, A-boards, block displays, posters and on pack stickers. The 2025 campaign already printed 10,000 shelf talkers, 7,000 posters and 40,000 neck tags.',
    },
    {
      no: '02',
      label: 'Partner surfaces',
      title: 'Inside Bulan Bintang',
      body: 'Boutique counters across all 14 stores, and an insert in the baju raya packaging. The 150,000 Saji sample packs going into Bulan Bintang purchases each carry a code.',
    },
    {
      no: '03',
      label: 'Events and activation',
      title: 'Where people are already standing',
      body: 'The launch at Wisma FGV, 320 sampling days across 120 outlets, 96 roadshow days across 32 outlets, and the Sampul Raya itself.',
    },
  ], { y: 2.24, h: 2.42, titleSize: 12 });

  footer(s, [
    { t: 'One page, many doors: ', lead: true },
    'every QR and every ad lands on the same page, so entries from paid, in store, partner and '
    + 'on ground are all counted in one place.',
  ]);
}

// =====================================================================
// 25 · The contest landing page
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'The page does the ' },
    { t: 'explaining.', accent: true },
  ], 0.62, 0.85, 23);

  s.addImage({
    path: path.join(__dirname, 'landing-rev1.png'),
    x: PAD, y: 1.44, w: 3.3, h: 3.3,
  });

  const tx = PAD + 3.3 + 0.34;
  const tw = 10 - PAD - tx;
  let ty = 1.46;

  [
    ['THE MECHANIC, IN ONE SCREEN',
      'A three step checklist: buy Bulan Bintang, buy Saji at the pop-up counter, upload both receipts. Both purchases are required and the page says so, so nobody submits half an entry and wonders why it failed.'],
    ['THE POP-UP LOCATOR',
      'The 14 boutiques carrying a Saji counter sit directly under the form, because walking into one is now the entry route. Save and finish later holds a half done entry for the shopper who has one receipt so far.'],
    ['BUILT FOR A PHONE ON 4G',
      'Under two seconds to load, no app, no login, no account. Bahasa Malaysia first with an English toggle. Receipt files validated on upload for type, size and date inside the contest window.'],
    ['LEGAL WHERE IT HAS TO BE',
      'PDPA consent checkbox, a link to the full terms, and the organizer named. The full mechanics, including the Golden Ticket, sit in a collapsed accordion below the form, disclosed but out of the entry flow.'],
  ].forEach(([label, body]) => {
    s.addText(label, {
      x: tx, y: ty, w: tw, h: 0.19,
      fontFace: F.body, fontSize: 8, bold: true, charSpacing: 0.7,
      color: C.brick, valign: 'top', ...NM,
    });
    ty += 0.19;
    s.addText(body, {
      x: tx, y: ty, w: tw, h: 0.62,
      fontFace: F.body, fontSize: 9.5, color: C.purple2, lineSpacing: 13,
      valign: 'top', ...NM,
    });
    ty += 0.64;
  });

  footer(s, [
    { t: 'Built and attached: ', lead: true },
    'a working HTML page ships with this proposal, so the client can see the real thing rather than '
    + 'a picture of it.',
  ]);
  s.addNotes(
    'The working page ships alongside this deck as tersaji-raya-2027-contest-landing-page-rev1.html. '
    + 'It is responsive, verified at 360, 390 and 1000 pixels, and carries the client’s briefed '
    + 'mechanic with the pop-up as the entry route.\n\n'
    + 'Two things on the page are not finished and should not be shown as if they are. The entry '
    + 'count, winner count and named winners are placeholder data and must read from the live '
    + 'database before launch. The form validates and shows a thank-you state, but the submit '
    + 'handler still needs wiring to a real endpoint with receipt storage and the Meta and TikTok '
    + 'conversion events that the whole media argument depends on.',
  );
}

// =====================================================================
// 26 · Landing page conversion features
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'Nine things on the page that ' },
    { t: 'exist only to convert.', accent: true },
  ], 0.62, 0.9, 23);
  standfirst(s,
    'Every element here exists to move someone from "I have two receipts" to "I have entered". '
    + 'These are the parts that carry the 2% conversion the plan is built on.', 1.5, 0.36);

  cardGrid(s, [
    {
      no: '01',
      label: 'Above the fold',
      title: 'Prize, winners, form',
      body: 'The prize, a headline naming what you win, and the winner count, all before any scrolling. The form is embedded inline rather than behind a popup.',
    },
    {
      no: '02',
      label: 'Social proof',
      title: 'Proof that people win',
      body: 'A live entry counter and a weekly winner wall with real names and towns. It answers the problem COO named: "probably impossible for me to win".',
      labelHot: true,
    },
    {
      no: '03',
      label: 'Urgency and return',
      title: 'A countdown, and a reason to return',
      body: 'A live countdown to the Friday draw. The thank you page is the highest intent moment we get, so that is where we ask for the share and the referral.',
    },
  ], { y: 1.96, h: 2.3, titleSize: 12 });

  s.addText(
    'Also on the page: three form fields only, returning entrants recognized so weeks two to ten '
    + 'take three taps instead of eight, the pop-up locator doubling as Bulan Bintang’s store '
    + 'finder, a Golden Ticket explainer that tells people to check the pack, and a WhatsApp '
    + 'fallback so the 2026 habit is kept rather than broken.',
    {
      x: PAD, y: 4.4, w: COL_W, h: 0.42,
      fontFace: F.body, fontSize: 9.5, bold: true, color: C.purple2, lineSpacing: 12.5,
      valign: 'top', ...NM,
    },
  );
  s.addNotes(
    'The pop-up locator is the revenue driving element for Bulan Bintang. It puts all 14 boutiques '
    + 'in front of every visitor, including the ones who arrived from a Saji ad and had no plan to '
    + 'visit a store.\n\n'
    + 'Benchmarks: Woobox and KickoffLabs on giveaway landing page conversion and first viewport '
    + 'composition; embedded versus popup form performance.',
  );
}

// =====================================================================
// 27 · Timeline
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'From award to close, ' },
    { t: 'and what runs when.', accent: true },
  ], 0.62, 0.85, 23);

  timeline(s, [
    { when: '17 Oct', what: 'Project award' },
    { when: 'Mid Dec', what: 'Permit and packaging locked', milestone: true },
    { when: '15 Jan', what: 'Page live, pop-ups built' },
    { when: '25 Jan', what: 'Campaign launch event', milestone: true },
    { when: '1 Feb', what: 'Contest ads live', milestone: true },
    { when: '24 Feb', what: 'Brand video launch', milestone: true },
    { when: '5 Apr', what: 'Contest closes' },
  ], { y: 2.22 });

  cardGrid(s, [
    {
      label: 'Weeks 1 to 3',
      title: '1 to 23 Feb',
      body: 'Contest engine alone, with no film yet. Chinese New Year on 6 Feb, so hold bid caps and cut weight about 30% for three days. Ramadan opens 8 Feb and the contest ramps. First winners announced 19 Feb.',
    },
    {
      label: 'Weeks 4 to 6',
      title: '24 Feb to 9 Mar',
      body: 'Teasers on 17 and 22 Feb, film launches 24 Feb. Both engines at full weight. Retarget video viewers into the contest, which will be the highest converting audience the campaign has.',
    },
    {
      label: 'Weeks 7 to 10',
      title: '10 Mar to 5 Apr',
      body: 'Raya on 10 Mar, so pull contest spend for three days and let the film carry emotional reach. Balik kampung and open house through Syawal. Last chance creative from 29 Mar. Report by 17 Apr.',
    },
  ], { y: 3.36, h: 1.36, bodySize: 8.5, titleSize: 11.5 });

  s.addNotes(
    'The two dates the client’s own slides disagree on: the campaign house slide says the launch '
    + 'event is 25 January, the project timeline slide says 28 January. We have planned on 25 January '
    + 'and flagged it.\n\n'
    + 'The contest runs 24 days before the brand film exists, which is why contest creative has to '
    + 'carry weeks 1 to 3 on its own.\n\n'
    + 'Mid December now carries three locks, not one: the permit, the Golden Ticket packaging change '
    + 'and the Bulan Bintang floor space agreement. The packaging line has the longest lead time of '
    + 'the three, so it sets the date. Pop-up build, stock and staffing have to be done before 1 '
    + 'February, because the contest ads go live that day and they point people at a counter.',
  );
}

// =====================================================================
// 28 · Caveats and questions
// =====================================================================
{
  const s = creamPage();
  dash(s);
  headline(s, [
    { t: 'What we are not sure of, and ' },
    { t: 'what we need from you.', accent: true },
  ], 0.62, 0.9, 23);

  const halfW = (COL_W - GAP) / 2;
  [
    {
      x: PAD,
      rule: C.brick,
      head: 'CAVEATS',
      items: [
        'Is the 40M views KPI paid only or campaign wide? We assumed campaign wide. Paid only roughly doubles the budget.',
        'What counts as a view, and is engagement measured on impressions or on reach? The same campaign reads 2.3% or 4.2%.',
        'We do not know the 2026 spend, so every CPM here stays an assumption until you share it.',
        'The pop-up rests on Bulan Bintang agreeing to host a Saji counter in all 14 boutiques. That yes is not ours to give.',
        'No budget option here includes pop-up build, stock or staffing. That cost sits with on-ground, not with this line.',
        'A Golden Ticket cannot go inside a bottle of oil. A neck tag, under-cap or carton insert adds packaging lead time.',
        'The weekly draw and the Golden Ticket are two games of chance and likely need naming in one permit. Allow three to four weeks.',
        'Bulan Bintang runs its own RM400,000 QR contest, and your own slides disagree on the launch date and the winner count.',
      ],
    },
    {
      x: PAD + halfW + GAP,
      rule: C.purple2,
      head: 'QUESTIONS FOR THE CLIENT',
      items: [
        'Are the three KPIs for paid media alone, or for the whole campaign including KOL and organic?',
        'What did the 2026 campaign spend on digital, by platform?',
        'Will Bulan Bintang host a Saji counter in all 14 boutiques, and on what commercial terms?',
        'Where are the 14 boutiques? The 30/70 geo split should be set against the real store list.',
        'Who owns the landing page, domain, hosting and entry database, and who is the PDPA data controller?',
        'Will Bulan Bintang co fund the RM600 baju component of the weekly prize?',
        'Do we get Meta and TikTok pixel access on Saji properties, plus lists for lookalikes?',
        'Which Saji SKUs count toward the RM25 threshold, and which ones carry the Golden Ticket?',
      ],
    },
  ].forEach((col) => {
    s.addShape(pptx.ShapeType.rect, {
      x: col.x, y: 1.5, w: halfW, h: 3.24, fill: { color: C.card }, line: { type: 'none' },
    });
    s.addShape(pptx.ShapeType.rect, {
      x: col.x, y: 1.5, w: halfW, h: 0.06, fill: { color: col.rule }, line: { type: 'none' },
    });
    s.addText(col.head, {
      x: col.x + 0.18, y: 1.68, w: halfW - 0.36, h: 0.2,
      fontFace: F.body, fontSize: 8.5, bold: true, charSpacing: 0.8, color: col.rule,
      valign: 'top', ...NM,
    });
    s.addText(
      col.items.map((t) => ({
        text: t,
        options: { bullet: { characterCode: '2022', indent: 12 } },
      })),
      {
        x: col.x + 0.18, y: 1.94, w: halfW - 0.36, h: 2.72,
        fontFace: F.body, fontSize: 8.5, color: C.purple2, lineSpacing: 11.5,
        paraSpaceAfter: 3, valign: 'top', ...NM,
      },
    );
  });

  footer(s, [
    { t: 'What we need to start: ', lead: true },
    'the Bulan Bintang yes on the pop-up, platform access, and a yes or no on the landing page. '
    + 'Everything else we can work around.',
  ]);
}

// ------------------------------------------------------------------ write --
const out = process.argv[2] || path.join(__dirname, 'saji-digital-proposal.pptx');
pptx.writeFile({ fileName: out }).then(() => {
  console.log('written:', out);
});
