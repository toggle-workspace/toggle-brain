// Toggle Company Deck Master (Stage 8a, dark), mapped for pptxgenjs.
// Source of truth: clients/toggle/design-system/deck-master.html + SALES-TEMPLATES-8.md
//   + tokens.json + SIGNATURE-DEVICES.md
//
// Canvas: the master is drawn at 1280x720 px and states Slides pt = px x 0.5625.
// This deck ships on a 13.333 x 7.5 in canvas (960 x 540 pt), which is 1.333x that,
// so every type size below is the master's px value x 0.75. Same proportions, bigger
// sheet.
//
// Font substitution: Inter Tight is not installed on this machine and assets/fonts/
// is empty. Segoe UI is named in the token's own fallback chain, so that is what
// ships. Documented in the deck outline.

// Repo root, derived from this file's location so the build runs on any machine.
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..', '..').split(path.sep).join('/');

// Palette, verbatim from deck-master.html :root
const C = {
  blue: '4A7BF7',
  deep: '3056C9',
  deepd: '6E95F9',
  canvas: '0A1224',
  card: '121C33',
  raised: '1A2540',
  callout: '18254A',
  ink: 'FFFFFF',
  body: 'B0B8C9',
  sec: '9CA3B5',
  bs: '1F2A44',          // border subtle
  teal: '2ECC9B',
  pink: 'F59EC9',
  purple: '8E6BE6',
  slate: '6B7489',
  orange: 'F28B4C',
  // dark-mode state tokens from tokens.json
  error: 'FF7A70',
  success: '3DD6A3',
  warning: 'F5B07A',
};

const F = 'Segoe UI';

// px -> pt for this canvas
const px = (n) => +(n * 0.75).toFixed(2);

const TYPE = {
  coverTitle: px(58),   // 43.5
  coverSub: px(16),     // 12
  closeTitle: px(56),   // 42
  h1: px(38),           // 28.5
  kicker: px(15),       // 11.25
  watermark: px(13),    // 9.75
  seal: px(17),         // 12.75
  cardTitle: px(16),    // 12
  bodyText: px(13.5),   // 10.125
  stat: px(40),         // 30
  statCap: px(13),      // 9.75
  csk: px(13),          // 9.75  case/section kicker, uppercase
  tlHead: px(16),       // 12
  closeName: px(18),    // 13.5
  closeNum: px(17),     // 12.75
};

const W = 13.333;
const H = 7.5;
const M = 0.62;                 // master is 64px (0.667in); held at 0.62 so the dense
const TOP = 0.5;                // audit tables keep the width they were tuned to
const CONTENT_W = W - M * 2;

const RADIUS = 0.125;           // 12px
const PAD = 0.229;              // 22px card padding
const RAIL = 0.0625;            // 6px topbar

const ART = {
  step: REPO + '/assets/illustrations/step-form.png',
  stack: REPO + '/assets/illustrations/channel-stack-form.png',
  loop: __dirname + '/loop-form.png',
  wordmark: REPO + '/assets/logos/toggle-wordmark-white.png',
};

const CONTACT = {
  name: 'Jordan Pinto',
  role: 'Cofounder',
  email: 'jordan@toggle.solutions',
  site: 'toggle.solutions',
};

let pageNo = 0;
function resetPages() { pageNo = 0; }

// ------------------------------------------------------------------ furniture

// The master puts a [ toggle.solutions ] seal at top right of every content slide,
// and slide numbers live in the Slides master. Both render here.
function watermark(s) {
  s.addText(
    [
      { text: '[ ', options: { bold: false } },
      { text: CONTACT.site, options: { bold: true } },
      { text: ' ]', options: { bold: false } },
    ],
    {
      x: W - M - 3, y: 0.3, w: 3, h: 0.26, fontFace: F, fontSize: TYPE.watermark,
      color: C.slate, align: 'right', charSpacing: 0.3,
    }
  );
}

function pageNumber(s, draw = true) {
  pageNo += 1;
  if (!draw) return pageNo;
  s.addText(String(pageNo), {
    x: W - M - 0.8, y: H - 0.48, w: 0.8, h: 0.24, fontFace: F,
    fontSize: TYPE.watermark, color: C.slate, align: 'right',
  });
  return pageNo;
}

function wordmark(s, { x = M, y = 0.42, h = 0.32 } = {}) {
  // wordmark svg is 1432 x 392, ratio 3.653
  s.addImage({ path: ART.wordmark, x, y, w: h * 3.653, h });
}

function seal(s, { x, y, w, text, align = 'left', size = TYPE.seal, color = C.blue }) {
  s.addText(
    [
      { text: '[ ', options: { bold: false } },
      { text, options: { bold: true } },
      { text: ' ]', options: { bold: false } },
    ],
    { x, y, w, h: 0.3, fontFace: F, fontSize: size, color, align }
  );
}

// ---------------------------------------------------------------- slide shells

// Master content slide: watermark seal, blue h1, body kicker, then the content well.
function content(pptx, { eyebrow, title, kicker, titleLines = 1 }) {
  const s = pptx.addSlide();
  s.background = { color: C.canvas };
  watermark(s);
  let y = TOP;

  if (eyebrow) {
    s.addText(eyebrow.toUpperCase(), {
      x: M, y, w: CONTENT_W, h: 0.24, fontFace: F, fontSize: TYPE.csk, bold: true,
      charSpacing: 1.1, color: C.deepd,
    });
    y += 0.3;
  }
  // h1 at 28.5pt fits about 56 characters across the content width. Anything
  // longer wraps, so reserve a second line rather than let it collide with the kicker.
  const lines = titleLines === 2 || title.length > 56 ? 2 : 1;
  const th = lines === 2 ? 0.92 : 0.5;
  s.addText(title, {
    x: M, y, w: CONTENT_W, h: th, fontFace: F, fontSize: TYPE.h1, bold: true,
    color: C.blue, valign: 'top', lineSpacingMultiple: 1.08,
  });
  y += th + 0.08;

  if (kicker) {
    // The kicker runs the full content width. Never capped narrower than the
    // heading above it (stop-slop layout rule).
    s.addText(kicker, {
      x: M, y, w: CONTENT_W, h: 0.44, fontFace: F, fontSize: TYPE.kicker,
      color: C.body, valign: 'top', lineSpacingMultiple: 1.3,
    });
    y += 0.56;
  }
  pageNumber(s);
  return { s, y };
}

function sectionOpener(pptx, { number, title, kicker, art }) {
  const s = pptx.addSlide();
  s.background = { color: C.canvas };
  watermark(s);
  s.addText(number, {
    x: M, y: 2.3, w: 4, h: 0.32, fontFace: F, fontSize: TYPE.csk, bold: true,
    charSpacing: 1.4, color: C.deepd,
  });
  s.addText(title, {
    x: M, y: 2.72, w: 7.2, h: 1.1, fontFace: F, fontSize: px(48), bold: true,
    color: C.blue, valign: 'top', lineSpacingMultiple: 1.06,
  });
  if (kicker) {
    s.addText(kicker, {
      x: M, y: 3.95, w: 7.2, h: 1.0, fontFace: F, fontSize: TYPE.kicker,
      color: C.body, valign: 'top', lineSpacingMultiple: 1.35,
    });
  }
  if (art) {
    s.addImage({ path: art, x: 9.1, y: 2.2, w: 3.4, h: 3.0, sizing: { type: 'contain', w: 3.4, h: 3.0 } });
  }
  pageNumber(s);
  return s;
}

// ------------------------------------------------------------------ primitives

function card(pptx, s, { x, y, w, h, fill, rail }) {
  s.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: RADIUS,
    fill: { color: fill || C.card }, line: { width: 0 },
  });
  if (rail) {
    s.addShape(pptx.ShapeType.rect, {
      x, y, w, h: RAIL, fill: { color: rail }, line: { width: 0 },
    });
  }
}

// Rough rendered height of a text run. Segoe UI averages about 0.537 em regular
// and 0.555 bold; calibrated against a PowerPoint export, with a paragraph gap
// added per hard break.
function textHeight(txt, { w, fontSize, bold = false, lineSpacing = 1.3 }) {
  const em = bold ? 0.555 : 0.537;
  const cpl = Math.max(6, Math.floor((w * 72) / (em * fontSize)));
  const paras = String(txt).split('\n');
  const lines = paras.reduce((a, p) => a + Math.max(1, Math.ceil(p.length / cpl)), 0);
  const gaps = (paras.length - 1) * 0.35;
  return ((lines + gaps) * fontSize * lineSpacing) / 72;
}

function calloutBox(pptx, s, { x, y, w, h, text, label }) {
  // Grow the box if the copy needs more room than the caller guessed. A callout
  // that clips its own last line is worse than one that is a little taller.
  const inner = textHeight(text, { w: w - PAD * 2, fontSize: TYPE.bodyText, lineSpacing: 1.35 });
  const chrome = 0.15 + (label ? 0.25 : 0) + 0.14;
  h = Math.max(h, inner + chrome);

  s.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: RADIUS,
    fill: { color: C.callout }, line: { width: 0 },
  });
  let ty = y + 0.15;
  if (label) {
    s.addText(label.toUpperCase(), {
      x: x + PAD, y: ty, w: w - PAD * 2, h: 0.2, fontFace: F, fontSize: px(12),
      bold: true, charSpacing: 1.1, color: C.deepd,
    });
    ty += 0.25;
  }
  s.addText(text, {
    x: x + PAD, y: ty, w: w - PAD * 2, h: h - (ty - y) - 0.12, fontFace: F,
    fontSize: TYPE.bodyText, color: C.ink, valign: 'top', lineSpacingMultiple: 1.35,
  });
}

// Dark table: blue-deep header, card-tinted rows, hairline rules on --bs.
function table(pptx, s, { x, y, w, cols, rows, fontSize = TYPE.bodyText, headerSize = px(13), rowH = 0.34, pad = 4 }) {
  const head = cols.map((c) => ({
    text: c.label,
    options: {
      fontFace: F, fontSize: headerSize, bold: true, color: C.ink,
      fill: { color: C.deep }, align: c.align || 'left',
      valign: 'middle', margin: [pad, 7, pad, 7],
    },
  }));
  const bodyRows = rows.map((r, i) =>
    r.map((cell, ci) => {
      const isObj = cell !== null && typeof cell === 'object';
      const txt = isObj ? cell.text : String(cell);
      const opt = isObj ? cell.options || {} : {};
      return {
        text: txt,
        options: Object.assign({
          fontFace: F, fontSize, color: C.body,
          fill: { color: i % 2 ? C.card : '0E1730' },
          align: cols[ci].align || 'left', valign: 'middle',
          margin: [pad, 7, pad, 7],
        }, opt),
      };
    })
  );
  s.addTable([head, ...bodyRows], {
    x, y, w, colW: cols.map((c) => (c.w / 100) * w),
    rowH, pad, border: { type: 'solid', color: C.bs, pt: 0.75 },
    autoPage: false,
  });
}

// Flow-map node. kind: 'verified' | 'assumed' | 'drop'
function node(pptx, s, { x, y, w, h, title, sub, kind = 'verified' }) {
  const style = {
    verified: { fill: C.raised, line: C.blue, title: C.ink, dash: 'solid', wt: 1.5 },
    assumed: { fill: C.card, line: C.slate, title: C.body, dash: 'dash', wt: 1 },
    drop: { fill: '2A1520', line: C.error, title: C.error, dash: 'solid', wt: 1.5 },
  }[kind];
  s.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.05,
    fill: { color: style.fill },
    line: { color: style.line, width: style.wt, dashType: style.dash },
  });
  s.addText(title, {
    x: x + 0.08, y: y + 0.1, w: w - 0.16, h: 0.3, fontFace: F, fontSize: px(13),
    bold: true, color: style.title, align: 'center', valign: 'middle',
  });
  if (sub) {
    s.addText(sub, {
      x: x + 0.08, y: y + 0.38, w: w - 0.16, h: h - 0.46, fontFace: F,
      fontSize: px(11), color: kind === 'drop' ? C.error : C.sec,
      align: 'center', valign: 'top', lineSpacingMultiple: 1.15,
    });
  }
}

function arrow(pptx, s, { x, y, w, color }) {
  s.addShape(pptx.ShapeType.rightArrow, {
    x, y, w, h: 0.16, fill: { color: color || C.bs }, line: { width: 0 },
  });
}

// Evidence tag. CHARTS.md writes these with em dashes, which writing-standards.md
// never permits, so commas are used instead.
function tag(s, { x, y, w, text }) {
  s.addText('[ ' + text + ' ]', {
    x, y, w, h: 0.22, fontFace: F, fontSize: px(12), bold: true,
    charSpacing: 0.6, color: C.slate,
  });
}

module.exports = {
  C, F, W, H, M, TOP, CONTENT_W, ART, REPO, TYPE, CONTACT, px,
  RADIUS, PAD, RAIL,
  content, sectionOpener, card, calloutBox, table, node, arrow, tag, textHeight,
  watermark, pageNumber, wordmark, seal, resetPages,
};
