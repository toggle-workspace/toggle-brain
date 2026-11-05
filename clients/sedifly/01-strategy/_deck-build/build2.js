// Sedifly Meta plan, rev-2 (4 Nov 2026), on the SignWell proposal design:
// paper background, Instrument Serif headlines with a blue italic phrase,
// JetBrains Mono eyebrows, white line cards, navy result cards.
// Account figures: act_803550292448381, 5 Nov 2025 to 3 Nov 2026.

const PptxGenJS = require('pptxgenjs');
const path = require('path');

const OUT = process.env.OUT || 'C:/Users/Jordan/Desktop/Sedifly/Sedifly - Meta Plan and Creative Review - Nov 2026 - rev-2.pptx';
const IMG = (n) => path.join(__dirname, 'img', n).split(path.sep).join('/');
const WORDMARK = 'C:/Users/Jordan/Desktop/Claude Code/toggle-brain/assets/logos/toggle-wordmark-black.png';

const C = {
  paper: 'F4F8FD', lift: 'FFFFFF', ink: '0E1B33', ink2: '4A5A75', ink3: '8794AC',
  line: 'D5E2F0', soft: 'E7EFF9', accent: '2A6BE0', deep: '1B4CB0', wash: 'E3EDFC',
  aqua: '8CE0EC', teal: '1FA5B8', amber: 'D2971E', alert: 'DB4A45',
};
const SERIF = 'Instrument Serif', SANS = 'Instrument Sans', SANS6 = 'Instrument Sans SemiBold', MONO = 'JetBrains Mono';
const W = 13.333, H = 7.5, M = 0.667, CW = W - 2 * M, BOTTOM = 6.72;
const px = (n) => n / 96;

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'SW', width: W, height: H });
pptx.layout = 'SW';
pptx.author = 'Toggle Solutions';
pptx.title = 'Meta plan for Sedifly, rev-2';

// ------------------------------------------------------------ primitives
function T(s, text, o) {
  if (!(o.w > 0) || !(o.h > 0)) throw new Error('bad box: ' + JSON.stringify(text).slice(0, 50));
  s.addText(text, Object.assign({ fontFace: SANS, fontSize: 10, color: C.ink2, margin: 0, valign: 'top', lineSpacingMultiple: 1.15 }, o));
}
function box(s, x, y, w, h, kind = 'card', r = px(14)) {
  const fill = { card: C.lift, wash: C.wash, ink: C.ink, paper: C.paper }[kind];
  const line = kind === 'card' ? { color: C.line, width: 0.75 } : { type: 'none' };
  s.addShape(pptx.ShapeType.roundRect, { x, y, w, h, rectRadius: r, fill: { color: fill }, line });
}
function hr(s, x, y, w, color = C.soft, h = 0.01) {
  s.addShape(pptx.ShapeType.rect, { x, y, w, h, fill: { color }, line: { type: 'none' } });
}
function mono(s, text, x, y, w, color = C.ink3, size = 7.5) {
  T(s, text.toUpperCase(), { x, y, w, h: 0.18, fontFace: MONO, bold: true, fontSize: size, charSpacing: 1.2, color });
}
// rough line count for wrapped text
function lines(text, w, size, em = 0.47) {
  const cpl = Math.max(8, Math.floor((w * 72) / (em * size)));
  return String(text).split('\n').reduce((a, p) => a + Math.max(1, Math.ceil(p.length / cpl)), 0);
}
function textH(text, w, size, ls = 1.3, em = 0.5) { return (lines(text, w, size, em) * size * ls) / 72; }

let page = 0;
function slide() {
  const s = pptx.addSlide();
  s.background = { color: C.paper };
  page += 1;
  if (page > 1) T(s, String(page).padStart(2, '0'), { x: W - M - 1, y: H - 0.42, w: 1, h: 0.18, fontFace: MONO, fontSize: 7.5, color: C.ink3, align: 'right', charSpacing: 1.5 });
  return s;
}
// eyebrow + serif headline with italic blue phrase + kicker. Returns content top.
function head(s, eyebrow, plain, em, kicker) {
  let y = 0.58;
  s.addShape(pptx.ShapeType.ellipse, { x: M, y: y + 0.055, w: 0.065, h: 0.065, fill: { color: C.accent }, line: { type: 'none' } });
  T(s, eyebrow.toUpperCase(), { x: M + 0.13, y, w: CW - 0.2, h: 0.18, fontFace: MONO, bold: true, fontSize: 8.25, charSpacing: 1.6, color: C.accent });
  y += 0.3;
  s.addText([
    { text: plain, options: { fontFace: SERIF, color: C.ink } },
    { text: em, options: { fontFace: SERIF, italic: true, color: C.accent } },
  ], { x: M, y, w: CW, h: 0.62, fontSize: 39, margin: 0, valign: 'top', lineSpacingMultiple: 0.95 });
  y += 0.7;
  if (kicker) {
    const kh = textH(kicker, CW, 12.75, 1.45, 0.48) + 0.02;
    T(s, kicker, { x: M, y, w: CW, h: kh, fontSize: 12.75, lineSpacingMultiple: 1.4 });
    y += kh + 0.24;
  }
  return y;
}
// key/value rows like the SignWell timeline cards
function rows(s, items, x, y, w, { keyW = 0.95, size = 9.6, gap = 0.07 } = {}) {
  items.forEach(([k, v], i) => {
    if (i) hr(s, x, y, w);
    const yy = y + (i ? gap : 0);
    const vh = textH(v, w - keyW, size, 1.32) + 0.03;
    T(s, k.toUpperCase(), { x, y: yy + 0.02, w: keyW - 0.08, h: 0.16, fontFace: MONO, bold: true, fontSize: 6.6, charSpacing: 0.8, color: C.ink3 });
    T(s, v, { x: x + keyW, y: yy, w: w - keyW, h: vh + 0.1, fontSize: size, lineSpacingMultiple: 1.3 });
    y = yy + vh + gap;
  });
  return y;
}
// square-dot bullets
function bullets(s, items, x, y, w, { size = 10, gap = 0.08, dot = C.accent, color = C.ink2 } = {}) {
  items.forEach((t) => {
    const h = textH(t, w - 0.2, size, 1.32) + 0.02;
    s.addShape(pptx.ShapeType.roundRect, { x, y: y + (size * 1.32 / 72) / 2 - 0.03, w: 0.062, h: 0.062, rectRadius: 0.012, fill: { color: dot }, line: { type: 'none' } });
    T(s, t, { x: x + 0.2, y, w: w - 0.2, h: h + 0.12, fontSize: size, color, lineSpacingMultiple: 1.3 });
    y += h + gap;
  });
  return y;
}
function chip(s, text, x, y, color = C.ink2, fill = C.paper, line = C.line) {
  const w = text.length * 0.068 + 0.26;
  s.addShape(pptx.ShapeType.roundRect, { x, y, w, h: 0.26, rectRadius: px(7), fill: { color: fill }, line: { color: line, width: 0.75 } });
  T(s, text, { x, y: y + 0.055, w, h: 0.17, fontFace: MONO, bold: true, fontSize: 7.8, color, align: 'center' });
  return w;
}
function band(s, plain, em, y = BOTTOM - 0.56) {
  s.addShape(pptx.ShapeType.roundRect, { x: M, y, w: CW, h: 0.56, rectRadius: px(12), fill: { color: C.ink }, line: { type: 'none' } });
  s.addText([
    { text: plain, options: { color: C.paper } },
    { text: em, options: { italic: true, color: C.aqua } },
  ], { x: M + 0.23, y: y + 0.13, w: CW - 0.46, h: 0.34, fontFace: SERIF, fontSize: 17, margin: 0, valign: 'top' });
}
function frame(s, img, x, y, w, h, time, warn) {
  s.addImage({ path: IMG(img), x, y, w, h, rounding: false });
  s.addShape(pptx.ShapeType.rect, { x, y, w, h, fill: { color: C.paper, transparency: 100 }, line: { color: warn ? C.amber : C.line, width: warn ? 2 : 0.75 } });
  if (time) {
    s.addShape(pptx.ShapeType.roundRect, { x: x + 0.07, y: y + 0.07, w: 0.5, h: 0.22, rectRadius: 0.04, fill: { color: warn ? C.amber : C.ink }, line: { type: 'none' } });
    T(s, time, { x: x + 0.07, y: y + 0.11, w: 0.5, h: 0.15, fontFace: MONO, bold: true, fontSize: 7.8, color: C.lift, align: 'center' });
  }
}
// SignWell table: mono header over a 1.5pt ink rule, hairline rows
function table(s, x, y, w, cols, data, { size = 10, rowH = 0.3, boldFirst = true, totalRow = -1 } = {}) {
  const none = { type: 'none' };
  const head = cols.map((c) => ({
    text: c.label.toUpperCase(),
    options: { fontFace: MONO, bold: true, fontSize: 7.2, color: C.ink3, charSpacing: 1, align: c.align || 'left', valign: 'bottom', margin: [2, 6, 4, 6], border: [none, none, { pt: 1.5, color: C.ink }, none] },
  }));
  const body = data.map((r, ri) => r.map((v, ci) => ({
    text: String(v),
    options: {
      fontFace: (ci === 0 && boldFirst) || ri === totalRow ? SANS6 : SANS, fontSize: size,
      color: (ci === 0 && boldFirst) || ri === totalRow ? C.ink : C.ink2, align: cols[ci].align || 'left', valign: 'middle', margin: [3, 6, 3, 6],
      border: [none, none, ri === totalRow ? { pt: 1.5, color: C.ink } : { pt: 0.75, color: C.line }, none],
    },
  })));
  s.addTable([head, ...body], { x, y, w, colW: cols.map((c) => (c.w / 100) * w), rowH: [0.3, ...data.map(() => rowH)], autoPage: false });
}

// ================================================================ 1 COVER
{
  const s = slide();
  s.addImage({ path: WORDMARK, x: 0.52, y: 0.72, w: 0.34 * 3.653, h: 0.34 });
  s.addText([
    { text: 'Meta plan', options: { color: C.ink, breakLine: true } },
    { text: 'for ', options: { color: C.ink } },
    { text: 'Sedifly', options: { italic: true, color: C.accent } },
  ], { x: 0.52, y: 1.42, w: 7, h: 1.95, fontFace: SERIF, fontSize: 57, margin: 0, valign: 'top', lineSpacingMultiple: 0.92 });
  s.addImage({ path: IMG('wave.png'), x: 0, y: H - 3.54, w: W, h: 3.54 });
}

// ======================================================= 2 WHAT THE ACCOUNT SHOWS
{
  const s = slide();
  const y = head(s, 'What your account shows', 'Twelve months of data, ', 'three lessons',
    'We read every campaign, ad set and ad in your Meta account from November 2025 to November 2026: S$18,831 spent and 718 form leads.');
  const cw = (CW - 0.38) / 3, ch = BOTTOM - 0.56 - 0.24 - y;
  const cards = [
    ['Message', 'S$38', 'The diagnostic message won',
      'Your two September Readiness Check tests reached the same ages. The diagnostic ads cost S$38 a lead and the parent roadmap ads S$132. Parents aged 45 to 54 answered the diagnostic ads at S$37.',
      'Every Readiness Check ad leads with the diagnostic angle, with Ke Yue as proof.'],
    ['Audience', '21%', 'Spend went outside your buyers',
      '94% of spend ran in ad sets open to ages 18 to 65, and the parent ad sets used luxury interests such as Ferrari and Rolex. Both pull in business owners and executives.',
      'Fixed age bands, no interest layers, and Advantage+ audience off.'],
    ['Tracking', 'S$124', 'Website forms lost leads',
      'Campaigns that sent people to the website cost S$124 a lead (7 leads), against S$21 for Instant Forms. Your Meta reports show form fills with no qualified or booked counts.',
      'Instant Forms into HubSpot, with qualified, booked and attended sent back to Meta.'],
  ];
  cards.forEach(([k, big, h, body, change], i) => {
    const x = M + i * (cw + 0.19);
    box(s, x, y, cw, ch);
    mono(s, k, x + 0.23, y + 0.22, cw - 0.46);
    T(s, big, { x: x + 0.23, y: y + 0.45, w: cw - 0.46, h: 0.62, fontFace: SERIF, fontSize: 43, color: C.accent, lineSpacingMultiple: 0.9 });
    T(s, h, { x: x + 0.23, y: y + 1.15, w: cw - 0.46, h: 0.3, fontFace: SANS6, fontSize: 12.5, color: C.ink });
    T(s, body, { x: x + 0.23, y: y + 1.5, w: cw - 0.46, h: 1.2, fontSize: 10.8, lineSpacingMultiple: 1.35 });
    hr(s, x + 0.23, y + ch - 0.95, cw - 0.46, C.line);
    mono(s, 'What we change', x + 0.23, y + ch - 0.84, cw - 0.46, C.accent, 7);
    T(s, change, { x: x + 0.23, y: y + ch - 0.62, w: cw - 0.46, h: 0.5, fontFace: SANS6, fontSize: 10, color: C.ink, lineSpacingMultiple: 1.3 });
  });
  band(s, 'Every campaign ends in one conversion: ', 'a booked Readiness Check.');
}

// ======================================================= 3 PERFORMANCE RECOVERY
{
  const s = slide();
  const y = head(s, 'Performance recovery', 'Reversing the decline, ', 'week by week',
    'Cost per lead rose from S$14 in May to S$45 in October on similar spend. Most of the rise came from Readiness Check campaigns that kept spending after they stopped converting.');
  // left: monthly cost per lead
  const lw = 4.15, lh = BOTTOM - y;
  box(s, M, y, lw, lh);
  mono(s, 'Cost per lead by month', M + 0.22, y + 0.2, lw - 0.44, C.accent);
  const months = [['May', 14, 203], ['Jun', 20, 54], ['Jul', 23, 27], ['Aug', 33, 44], ['Sep', 30, 50], ['Oct', 45, 55]];
  const cx = M + 0.3, cw = lw - 0.6, base = y + 2.55, maxH = 1.6, bw = cw / months.length;
  hr(s, cx, base, cw, C.line, 0.012);
  months.forEach(([mo, v, l], i) => {
    const h = (v / 45) * maxH, x = cx + i * bw + 0.1;
    s.addShape(pptx.ShapeType.rect, { x, y: base - h, w: bw - 0.2, h, fill: { color: i === 5 ? C.amber : C.accent }, line: { type: 'none' } });
    T(s, 'S$' + v, { x: x - 0.1, y: base - h - 0.24, w: bw, h: 0.2, fontFace: MONO, bold: true, fontSize: 8, color: C.ink, align: 'center' });
    T(s, mo, { x: x - 0.1, y: base + 0.06, w: bw, h: 0.18, fontSize: 8.5, color: C.ink2, align: 'center' });
    T(s, l + ' leads', { x: x - 0.12, y: base + 0.24, w: bw + 0.04, h: 0.16, fontSize: 7, color: C.ink3, align: 'center' });
  });
  box(s, M + 0.2, base + 0.55, lw - 0.4, lh - (base - y) - 0.75, 'wash', px(10));
  T(s, [
    { text: 'October: ', options: { fontFace: SANS6, color: C.ink } },
    { text: 'three Readiness Check campaigns spent S$924, 37% of the month, for 3 leads. The medicine webinar spent S$814 for 35.', options: { color: C.ink } },
  ], { x: M + 0.34, y: base + 0.68, w: lw - 0.68, h: lh - (base - y) - 1.0, fontSize: 9.6, lineSpacingMultiple: 1.3 });

  // middle: where the money moves
  const mx = M + lw + 0.19, mw = 3.75;
  box(s, mx, y, mw, lh);
  mono(s, 'Where the spend moves', mx + 0.22, y + 0.2, mw - 0.44, C.accent);
  const moves = [
    ['Stop', C.alert, 'Readiness Check ads that sent people to the website or used the parent roadmap message', 'S$124 to S$396 a lead'],
    ['Replace', C.amber, 'The eBook ad set running since 14 May, still on luxury interests', 'S$9 a lead in May, S$43 in October'],
    ['Scale', C.teal, 'The diagnostic angle on Instant Forms, in the Reel and Ke Yue campaigns', 'S$23 (medicine webinar) and S$38 (September test)'],
  ];
  let my = y + 0.5;
  moves.forEach(([tag, col, what, num], i) => {
    if (i) hr(s, mx + 0.22, my - 0.1, mw - 0.44, C.soft);
    const tw = tag.length * 0.075 + 0.24;
    s.addShape(pptx.ShapeType.roundRect, { x: mx + 0.22, y: my, w: tw, h: 0.22, rectRadius: 0.04, fill: { color: col }, line: { type: 'none' } });
    T(s, tag.toUpperCase(), { x: mx + 0.22, y: my + 0.04, w: tw, h: 0.15, fontFace: MONO, bold: true, fontSize: 7.2, color: C.lift, align: 'center' });
    const wh = textH(what, mw - 0.44, 10, 1.28) + 0.04;
    T(s, what, { x: mx + 0.22, y: my + 0.3, w: mw - 0.44, h: wh + 0.08, fontFace: SANS6, fontSize: 10, color: C.ink, lineSpacingMultiple: 1.28 });
    T(s, num, { x: mx + 0.22, y: my + 0.32 + wh, w: mw - 0.44, h: 0.2, fontSize: 9, color: C.ink2 });
    my += 0.32 + wh + 0.42;
  });

  // right: weekly forecast, conditional on the fixes
  const rx = mx + mw + 0.19, rw = CW - lw - mw - 0.38;
  box(s, rx, y, rw, lh, 'ink');
  T(s, 'Weekly forecast', { x: rx + 0.22, y: y + 0.18, w: rw - 0.44, h: 0.36, fontFace: SERIF, fontSize: 20, color: C.lift });
  T(s, 'On S$467 a week, once the fixes are live.', { x: rx + 0.22, y: y + 0.56, w: rw - 0.44, h: 0.2, fontSize: 9, color: 'C9D5E8' });
  const wk = [
    ['Weeks 1 and 2', 'From 9 Nov', '4', '11', 'S$43'],
    ['Weeks 3 and 4', 'From 23 Nov', '6', '14', 'S$34'],
    ['Month two', 'From 7 Dec', '8', '17', 'S$28'],
  ];
  const c1 = rx + 0.22, c2 = rx + rw * 0.47, c3 = rx + rw * 0.64, c4 = rx + rw * 0.8;
  const hy = y + 0.92;
  [['Requests', c2], ['Leads', c3], ['Cost', c4]].forEach(([t, x]) => T(s, t.toUpperCase(), { x, y: hy, w: 0.8, h: 0.15, fontFace: MONO, bold: true, fontSize: 6.4, charSpacing: 0.6, color: C.aqua }));
  wk.forEach(([a, b2, r, l, c], i) => {
    const ry = hy + 0.3 + i * 0.66;
    hr(s, rx + 0.22, ry - 0.08, rw - 0.44, '2A3A57');
    T(s, a, { x: c1, y: ry, w: c2 - c1 - 0.05, h: 0.2, fontFace: SANS6, fontSize: 10, color: C.lift });
    T(s, b2, { x: c1, y: ry + 0.22, w: c2 - c1 - 0.05, h: 0.18, fontSize: 8.6, color: 'C9D5E8' });
    T(s, r, { x: c2, y: ry, w: 0.7, h: 0.32, fontFace: SERIF, fontSize: 18, color: C.lift });
    T(s, l, { x: c3, y: ry, w: 0.7, h: 0.32, fontFace: SERIF, fontSize: 18, color: C.lift });
    T(s, c, { x: c4, y: ry, w: 0.9, h: 0.32, fontFace: SERIF, fontSize: 18, color: C.aqua });
  });
  T(s, 'These are forecasts, and they depend on the fixes in this deck: HubSpot tracking, the creative edits and the blockers on slide 11. Leads adds Ke Yue downloads to requests. We reset the numbers after 30 days.',
    { x: rx + 0.22, y: BOTTOM - 1.02, w: rw - 0.44, h: 0.85, fontSize: 8.8, color: 'C9D5E8', lineSpacingMultiple: 1.28 });
}

// ============================================================== 3 META PLAN
{
  const s = slide();
  const y = head(s, 'The Meta plan', 'Four campaigns, ', 'one S$2,000 budget',
    'Applicants get the Readiness Check offer straight away. Parents also see Ke Yue\'s results and Joash, then get the offer through retargeting.');
  const cy = y, cw = (CW - 0.57) / 4, ch = 2.85;
  const camps = [
    ['1', 'Readiness Check', 'Applicants, 18 to 24', 'S$600 · S$20 a day', [['Who', 'JC and poly graduates, NS, gap year'], ['Creative', 'Admissions Readiness Reel'], ['Expect', '10 to 15 requests']]],
    ['2', 'Ke Yue case study', 'Parents, 38 to 60', 'S$700 · S$23 a day', [['Who', 'Parents planning a US or UK application'], ['Creative', 'Ke Yue statics and carousel'], ['Expect', '28 to 46 downloads']]],
    ['3', 'Joash interview', 'Parents, 38 to 60', 'S$400 · S$13 a day', [['Who', 'Parents planning a US or UK application'], ['Creative', 'Joash interview video'], ['Expect', '3 to 5 requests']]],
    ['4', 'Retargeting', 'People who know Sedifly', 'S$300 · S$10 a day', [['Who', 'Video viewers and page engagers'], ['Creative', '15-second Reel, Joash, carousel'], ['Expect', '5 to 7 requests']]],
  ];
  camps.forEach(([n, name, sub, money, rs], i) => {
    const x = M + i * (cw + 0.19);
    box(s, x, cy, cw, ch);
    T(s, name, { x: x + 0.2, y: cy + 0.18, w: cw - 0.4, h: 0.36, fontFace: SERIF, fontSize: 20, color: C.ink });
    T(s, sub, { x: x + 0.2, y: cy + 0.55, w: cw - 0.4, h: 0.2, fontFace: SANS6, fontSize: 10, color: C.accent });
    chip(s, money, x + 0.2, cy + 0.84);
    rows(s, rs, x + 0.2, cy + 1.22, cw - 0.4, { keyW: 0.78, size: 9.4, gap: 0.06 });
  });
  // shared setup strip
  const sy = cy + ch + 0.2, sh = BOTTOM - sy, sw = (CW - 0.4) / 3;
  box(s, M, sy, CW, sh, 'wash');
  const shared = [
    ['Objective', 'Leads, with Meta Instant Forms synced to HubSpot in real time.'],
    ['Targeting', 'Singapore, fixed age bands, Advantage+ audience off, past leads excluded.'],
    ['Placements', 'Instagram and Facebook Feeds, Stories and Reels. Reels and Stories took 59% of your spend.'],
  ];
  shared.forEach(([k, v], i) => {
    const x = M + 0.23 + i * (sw + 0.07);
    mono(s, k, x, sy + 0.2, sw - 0.2, C.accent);
    T(s, v, { x, y: sy + 0.44, w: sw - 0.25, h: sh - 0.55, fontSize: 10, color: C.ink, lineSpacingMultiple: 1.3 });
  });
}

// ===================================================== 4 ADMISSIONS READINESS REEL
{
  const s = slide();
  const y = head(s, 'Creative review · Admissions Readiness Reel', 'A strong story, ', 'with the offer too late',
    'Ke Yue\'s opening holds attention. The Readiness Check appears at 0:41 of a 0:45 video, and on your account about 2 in 100 people shown your videos watch 15 seconds.');
  const fw = 1.36, fh = 2.42, g = 0.12;
  const fr = [['reel_0.3.png', '0:00', false, 'Strong hook. The label sits under the Reels caption.'],
    ['reel_37.0.png', '0:37', true, 'The UChicago letter shows for one second, unnamed.'],
    ['reel_43.5.png', '0:41', true, 'The offer appears at 0:41, 3.5 seconds before the end.']];
  fr.forEach(([img, t, warn, cap], i) => {
    const x = M + i * (fw + g);
    frame(s, img, x, y, fw, fh, t, warn);
    T(s, cap, { x, y: y + fh + 0.08, w: fw, h: 0.55, fontSize: 9, lineSpacingMultiple: 1.25 });
  });
  const lw = 3 * fw + 2 * g, rx = M + lw + 0.3, rw = CW - lw - 0.3;
  const eh = 2.55;
  box(s, rx, y, rw, eh);
  mono(s, 'What we would change', rx + 0.25, y + 0.22, rw - 0.5, C.accent);
  bullets(s, [
    'Put "Free Admissions Readiness Check" on screen from about 8 seconds, and again on the letter shot.',
    'Cut a 30-second main version and a 15-second version for Stories and retargeting.',
    'Label the letter "Offer: University of Chicago" so the result reads in one second.',
    'Move the "Underdog Story" label into the top third, clear of the caption and button.',
  ], rx + 0.25, y + 0.5, rw - 0.5, { size: 10.2 });
  const ty = y + eh + 0.18, th = BOTTOM - ty;
  box(s, rx, ty, rw, th, 'ink');
  T(s, 'Test plan', { x: rx + 0.25, y: ty + 0.18, w: 3, h: 0.36, fontFace: SERIF, fontSize: 20, color: C.lift });
  const tr = [['Budget', 'S$280 over the first 14 days'], ['Targeting', 'Applicants 18 to 24. A parent version runs from mid-December, when Early Decision results land.'], ['Scale if', 'Hook rate of 25% or more (your top-spending video: 28%) and S$55 or less per request']];
  let yy = ty + 0.6;
  tr.forEach(([k, v]) => {
    T(s, k.toUpperCase(), { x: rx + 0.25, y: yy + 0.02, w: 0.95, h: 0.16, fontFace: MONO, bold: true, fontSize: 6.6, charSpacing: 0.8, color: C.aqua });
    const vh = textH(v, rw - 1.45, 9.8, 1.3) + 0.02;
    T(s, v, { x: rx + 1.2, y: yy, w: rw - 1.45, h: vh, fontSize: 9.8, color: 'C9D5E8', lineSpacingMultiple: 1.3 });
    yy += vh + 0.08;
  });
}

// ========================================================== 5 JOASH INTERVIEW
{
  const s = slide();
  const y = head(s, 'Creative review · Joash interview ad', 'Founder trust, ', 'plus one student result',
    'Joash\'s dinner invite cost S$16 a lead on your account. The interview ad needs a student result and the same offer as every other ad.');
  const fw = 1.36, fh = 2.42, g = 0.12;
  const fr = [['joash_0.5.png', '0:00', true, 'A still card runs for 2.5 seconds before Joash appears.'],
    ['joash_4.0.png', '0:04', false, 'Name and title from 0:03. Keep this.'],
    ['joash_27.5.png', '0:27', true, 'Says free consultation. The other ads say Readiness Check.']];
  fr.forEach(([img, t, warn, cap], i) => {
    const x = M + i * (fw + g);
    frame(s, img, x, y, fw, fh, t, warn);
    T(s, cap, { x, y: y + fh + 0.08, w: fw, h: 0.55, fontSize: 9, lineSpacingMultiple: 1.25 });
  });
  const lw = 3 * fw + 2 * g, rx = M + lw + 0.3, rw = CW - lw - 0.3;
  const sh = 2.75;
  box(s, rx, y, rw, sh);
  mono(s, 'Campaign setup', rx + 0.25, y + 0.22, rw - 0.5, C.accent);
  rows(s, [
    ['Objective', 'Leads, with an Instant Form synced to HubSpot'],
    ['Targeting', 'Parents in Singapore, ages 38 to 60'],
    ['Placements', 'Reels and Stories, plus a 4:5 cut for Feeds'],
    ['Budget', 'S$400 a month (S$13 a day), plus retargeting'],
    ['Forecast', '3 to 5 Readiness Check requests at S$70 to S$130 each'],
    ['Tracking', 'Qualified, booked and attended in HubSpot, sent back to Meta'],
    ['Stop rule', 'Above S$130 a request after S$260 spent, it moves to retargeting'],
  ], rx + 0.25, y + 0.5, rw - 0.5, { keyW: 1.05, size: 9.6, gap: 0.045 });
  const ey = y + sh + 0.18, eh = BOTTOM - ey;
  box(s, rx, ey, rw, eh, 'wash');
  mono(s, 'Edits before launch', rx + 0.25, ey + 0.18, rw - 0.5, C.accent);
  bullets(s, [
    'Open on Joash speaking, with the offer count over the shot.',
    'Add 3 seconds of Ke Yue before the end card: an unsuccessful first cycle, then UChicago.',
    'End on "Take the free Admissions Readiness Check".',
  ], rx + 0.25, ey + 0.44, rw - 0.5, { size: 9.8, gap: 0.05, color: C.ink });
}

// ========================================================= 6 KE YUE CASE STUDY
{
  const s = slide();
  const y = head(s, 'Creative review · Ke Yue case study', 'Ke Yue\'s case study, ', 'proof for parents',
    'Your eBook cost S$21 a lead. Ke Yue is stronger proof, and every download gets a strategist\'s follow-up.');
  const tw = 1.3, th = 1.62, g = 0.1;
  const thumbs = [['ky_profile.png', 'Lead with', C.accent], ['ky_diag.png', 'Lead with', C.accent], ['ky_ebook.png', 'Test', C.ink], ['ky_car1.png', 'Feeds', C.ink]];
  thumbs.forEach(([img, tag, col], i) => {
    const x = M + i * (tw + g);
    frame(s, img, x, y, tw, th);
    const cwid = tag.length * 0.07 + 0.22;
    s.addShape(pptx.ShapeType.roundRect, { x: x + 0.07, y: y + th - 0.3, w: cwid, h: 0.22, rectRadius: 0.04, fill: { color: col }, line: { type: 'none' } });
    T(s, tag, { x: x + 0.07, y: y + th - 0.26, w: cwid, h: 0.15, fontFace: MONO, bold: true, fontSize: 7.5, color: C.lift, align: 'center' });
  });
  T(s, 'The grades and the "profile wasn\'t weak" lines give parents specifics to compare with their own child, so those two lead.',
    { x: M, y: y + th + 0.1, w: 4 * tw + 3 * g, h: 0.4, fontSize: 9.4, lineSpacingMultiple: 1.25 });
  const lw = 4 * tw + 3 * g, fy = y + th + 0.62, fh = BOTTOM - fy;
  box(s, M, fy, lw, fh);
  mono(s, 'Fix before launch', M + 0.23, fy + 0.2, lw - 0.46, C.amber);
  bullets(s, [
    'SAT: the ads say 1490 and a case study page says 1390. Which should the ads use?',
    'The last carousel card reads "Once Cycle Later".',
    'Three 9:16 statics place the logo or button where Stories and Reels cover the frame.',
    'We need the 4-page PDF, hosted at a link the form can open.',
  ], M + 0.23, fy + 0.46, lw - 0.46, { size: 9.6, gap: 0.05, dot: C.amber });
  const rx = M + lw + 0.3, rw = CW - lw - 0.3;
  box(s, rx, y, rw, BOTTOM - y);
  mono(s, 'Campaign setup', rx + 0.25, y + 0.22, rw - 0.5, C.accent);
  rows(s, [
    ['Objective', 'Leads, with an Instant Form synced to HubSpot'],
    ['Targeting', 'Parents in Singapore, ages 38 to 60, one ad set'],
    ['Placements', 'Feeds for the 4:5 statics and carousel, Stories and Reels for the 9:16 statics'],
    ['Budget', 'S$700 a month (S$23 a day)'],
    ['Form', 'The three Readiness Check questions: who is filling it in, the student\'s level, and target universities'],
    ['Follow-up', 'The PDF arrives at once. A Readiness Check invite follows on day 3, and a strategist calls every A or B lead within 24 hours.'],
    ['KPIs', 'S$15 to S$25 per download (28 to 46 downloads), 40% to 55% scored A or B, 10% to 15% booking a Readiness Check'],
  ], rx + 0.25, y + 0.52, rw - 0.5, { keyW: 1.1, size: 9.8, gap: 0.07 });
}

// ============================================================= 7 FORECAST
{
  const s = slide();
  const y = head(s, 'First-month forecast', 'Month one, ', '20 to 33 Readiness Check requests',
    'We kept the stages and conversion rates from the September proposal and applied them to S$2,000. Costs come from your account where it has data.');
  const lw = 7.55, th = 2.88;
  box(s, M, y, lw, th);
  table(s, M + 0.2, y + 0.16, lw - 0.4,
    [{ label: 'Stage', w: 33 }, { label: 'Rate', w: 25 }, { label: 'Low', w: 10, align: 'right' }, { label: 'High', w: 10, align: 'right' }, { label: 'Media each', w: 22, align: 'right' }],
    [
      ['Readiness Check requests', 'All four campaigns', '20', '33', 'S$100 to S$61'],
      ['Qualified, scored A or B', '50% to 65%', '10', '21', 'S$200 to S$95'],
      ['Readiness Check booked', '75% to 90%', '7', '18', 'S$286 to S$111'],
      ['Consultation attended', '80% to 83%', '5', '14', 'S$400 to S$143'],
      ['Enrolled', '20% to 30%', '1', '4', 'S$2,000 to S$500'],
    ], { size: 10.2, rowH: 0.42 });
  T(s, 'Plus 28 to 46 Ke Yue downloads in the follow-up pool. Most enrollments land in months two and three.',
    { x: M + 0.26, y: y + th - 0.27, w: lw - 0.5, h: 0.2, fontSize: 8.8, color: C.ink3 });
  // bridge
  const rx = M + lw + 0.25, rw = CW - lw - 0.25;
  box(s, rx, y, rw, th, 'ink');
  T(s, 'From the September proposal', { x: rx + 0.25, y: y + 0.18, w: rw - 0.5, h: 0.36, fontFace: SERIF, fontSize: 19, color: C.lift });
  const br = [['47 to 68', 'Enquiries at S$3,000, including masterclass sign-ups'], ['37 to 49', 'The same cost bands at S$2,000, without the masterclass'], ['20 to 33', 'Your costs: Ke Yue downloads turn into requests over weeks, and retargeting runs at S$48']];
  br.forEach(([n, t], i) => {
    const by = y + 0.62 + i * 0.72;
    T(s, n, { x: rx + 0.25, y: by, w: 1.4, h: 0.4, fontFace: SERIF, fontSize: 24, color: i === 2 ? C.aqua : C.lift });
    T(s, t, { x: rx + 1.65, y: by + 0.02, w: rw - 1.9, h: 0.62, fontSize: 9.2, color: 'C9D5E8', lineSpacingMultiple: 1.25 });
  });
  const ay = y + th + 0.2, ah = BOTTOM - ay;
  box(s, M, ay, CW, ah, 'wash');
  mono(s, 'Assumptions and sources', M + 0.23, ay + 0.18, 4, C.accent);
  const aw = (CW - 0.46 - 0.3) / 2;
  bullets(s, [
    'Cost per request: Reel S$38 to S$55 (September test: S$38), Joash S$70 to S$130, retargeting S$38 to S$55 (your warm ad sets: S$48).',
    'Ke Yue: S$15 to S$25 per download (your eBook: S$21), and 10% to 15% go on to request a Readiness Check.',
  ], M + 0.23, ay + 0.44, aw, { size: 9.4, gap: 0.05, color: C.ink });
  bullets(s, [
    'Your team calls each request within 5 minutes, between 10:00 and 22:00.',
    'Weeks one and two cost more while Meta learns. Your HubSpot numbers replace every band after 30 days.',
  ], M + 0.23 + aw + 0.3, ay + 0.44, aw, { size: 9.4, gap: 0.05, color: C.ink });
}

// ============================================================== 8 TRACKING
{
  const s = slide();
  const y = head(s, 'Tracking', 'Every lead, ', 'from form to consultation',
    'Your Meta reports show form fills with no qualified or booked counts. HubSpot will send those stages back, so Meta can find more people like them.');
  const steps = [['Instant Form', 'Three qualifying questions on every campaign'], ['HubSpot', 'Each lead lands in real time, tagged with its ad'], ['Score', 'A and B count as qualified'], ['Booked', 'Your team marks it within 24 hours'], ['Attended', 'Your team marks it within 24 hours']];
  // rail
  const rw = CW, n = steps.length, sw = (CW - 0.19 * (n - 1)) / n;
  hr(s, M + 0.08, y + 0.075, rw - 0.16, C.accent, 0.022);
  steps.forEach(([h, t], i) => {
    const x = M + i * (sw + 0.19);
    s.addShape(pptx.ShapeType.ellipse, { x: x + 0.02, y, w: 0.17, h: 0.17, fill: { color: i === 4 ? C.accent : C.paper }, line: { color: C.accent, width: 2 } });
    box(s, x, y + 0.32, sw, 1.32, i === 4 ? 'ink' : 'card');
    T(s, h, { x: x + 0.18, y: y + 0.48, w: sw - 0.36, h: 0.36, fontFace: SERIF, fontSize: 20, color: i === 4 ? C.lift : C.ink });
    T(s, t, { x: x + 0.18, y: y + 0.88, w: sw - 0.36, h: 0.66, fontSize: 9.8, color: i === 4 ? 'C9D5E8' : C.ink2, lineSpacingMultiple: 1.28 });
  });
  const ly = y + 1.8;
  T(s, 'HubSpot sends qualified, booked and attended back to Meta, so Ads Manager shows cost per consultation by ad.',
    { x: M, y: ly, w: CW, h: 0.26, fontSize: 10.5, color: C.accent, fontFace: SANS6 });
  const cy = ly + 0.45, ch = BOTTOM - cy, cw = (CW - 0.19) / 2;
  box(s, M, cy, cw, ch);
  mono(s, 'What Toggle fixes', M + 0.23, cy + 0.2, cw - 0.46, C.accent);
  bullets(s, [
    'UTM tags on every ad, so visits show in GA4 by campaign and ad.',
    'Three pixels sit on your account and one fires. We keep that one.',
    'Your website audience holds about 20 people, so we check the pixel on your Wix site.',
    'After about 100 qualified leads, we test Meta\'s Conversion Leads goal, which bids for quality.',
  ], M + 0.23, cy + 0.48, cw - 0.46, { size: 10 });
  const rx = M + cw + 0.19;
  box(s, rx, cy, cw, ch);
  mono(s, 'What we need from your team', rx + 0.23, cy + 0.2, cw - 0.46, C.amber);
  bullets(s, [
    'Set up the HubSpot stages: Lead, MQL (A or B), SQL (booked), Opportunity (attended) and Customer.',
    'Mark each Readiness Check booked and attended in HubSpot within 24 hours. That is how Meta learns which leads become consultations.',
    'Give us admin access to HubSpot and your Wix site, so we can connect the forms and check the pixel.',
  ], rx + 0.23, cy + 0.48, cw - 0.46, { size: 10, dot: C.amber });
}

// =================================================== 9 REPORTING AND OPTIMIZATION
{
  const s = slide();
  const y = head(s, 'Reporting and optimization', 'A one-pager ', 'every Tuesday',
    'You get a one-page report every Tuesday, starting the week after launch. Each one ends with what we changed and why.');
  // sample one-pager
  const lw = 5.6, lh = BOTTOM - y;
  box(s, M, y, lw, lh);
  T(s, 'Sedifly · Weekly one-pager', { x: M + 0.22, y: y + 0.2, w: 3.5, h: 0.24, fontFace: SANS6, fontSize: 12, color: C.ink });
  T(s, 'SAMPLE LAYOUT, ILLUSTRATIVE FIGURES', { x: M + 0.22, y: y + 0.46, w: 4, h: 0.16, fontFace: MONO, bold: true, fontSize: 6.6, charSpacing: 1, color: C.ink3 });
  chip(s, 'SAMPLE', M + lw - 0.95, y + 0.2, '8A6212', 'FDF6E7', C.amber);
  const tiles = [['Spend', 'S$467'], ['Requests', '7'], ['Qualified', '4'], ['Booked', '3']];
  const tw = (lw - 0.44 - 0.3) / 4;
  tiles.forEach(([k, v], i) => {
    const x = M + 0.22 + i * (tw + 0.1);
    box(s, x, y + 0.75, tw, 0.78, 'paper', px(10));
    T(s, k.toUpperCase(), { x: x + 0.12, y: y + 0.85, w: tw - 0.2, h: 0.15, fontFace: MONO, bold: true, fontSize: 6.4, charSpacing: 0.8, color: C.ink3 });
    T(s, v, { x: x + 0.12, y: y + 1.05, w: tw - 0.2, h: 0.4, fontFace: SERIF, fontSize: 22, color: C.ink });
  });
  table(s, M + 0.16, y + 1.68, lw - 0.32,
    [{ label: 'Campaign', w: 34 }, { label: 'Spend', w: 18, align: 'right' }, { label: 'Requests', w: 22, align: 'right' }, { label: 'Per qualified', w: 26, align: 'right' }],
    [['Applicants', 'S$140', '3', 'S$70'], ['Ke Yue', 'S$163', '1', 'S$163'], ['Joash', 'S$93', '1', 'None yet'], ['Retargeting', 'S$70', '2', 'S$70'], ['Total', 'S$466', '7', 'S$117']],
    { size: 9, rowH: 0.27, totalRow: 4 });
  const dy = y + 3.6;
  box(s, M + 0.22, dy, lw - 0.44, lh - 3.6 - 0.22, 'wash', px(10));
  mono(s, 'Decision this week', M + 0.36, dy + 0.12, 3, C.accent, 6.8);
  T(s, 'We moved S$5 a day from Joash to the applicant Reel after it reached a 27% hook rate.', { x: M + 0.36, y: dy + 0.33, w: lw - 0.72, h: 0.4, fontSize: 9.4, color: C.ink, lineSpacingMultiple: 1.25 });
  // optimization rules
  const rx = M + lw + 0.3, rw = CW - lw - 0.3;
  box(s, rx, y, rw, lh);
  mono(s, 'How we optimize', rx + 0.23, y + 0.2, rw - 0.46, C.accent);
  table(s, rx + 0.12, y + 0.42, rw - 0.24,
    [{ label: 'When', w: 52 }, { label: 'We', w: 48 }],
    [
      ['First 7 days', 'Leave it to learn, unless tracking breaks'],
      ['Video hook rate under 15% after 2,000 views', 'Re-cut the opening or retire the video'],
      ['Cost per request above ceiling for 5 days', 'Swap creative first, then cut budget'],
      ['Under 35% of leads scored A or B', 'Cut budget, even if leads look cheap'],
      ['30% of a week\'s leads fit neither buyer', 'Tighten that ad set the same week'],
      ['A campaign 20% under ceiling for 7 days', 'Move up to S$200 a month into it'],
    ], { size: 9.4, rowH: 0.48, boldFirst: false });
  T(s, 'Ceilings per request: S$55 applicants, S$130 Joash, S$55 retargeting, S$25 per Ke Yue download.',
    { x: rx + 0.23, y: BOTTOM - 0.42, w: rw - 0.46, h: 0.3, fontSize: 8.8, color: C.ink3 });
}

// ======================================================= 10 LAUNCH AND NEEDS
{
  const s = slide();
  const y = head(s, 'Launch', 'Live in the week of ', '9 November',
    'Your team clears the items below by Friday 6 November, and the campaigns go live the following week.');
  const steps = [
    ['4 to 6 Nov', 'Build and approve', 'You approve the plan and clear the blockers. We build the forms, HubSpot sync, audiences and ad copy.'],
    ['Week of 9 Nov', 'Launch', 'All four campaigns go live once a test lead reaches HubSpot.'],
    ['Tue 17 Nov', 'First one-pager', 'Then every Tuesday.'],
    ['After 30 days', 'KPI review', 'We reset the targets on your HubSpot numbers.'],
  ];
  const n = steps.length, sw = (CW - 0.19 * (n - 1)) / n, sh = 1.5;
  hr(s, M + 0.08, y + 0.075, CW - 0.16, C.accent, 0.022);
  steps.forEach(([d, h, t], i) => {
    const x = M + i * (sw + 0.19), ink = i === 3;
    s.addShape(pptx.ShapeType.ellipse, { x: x + 0.02, y, w: 0.17, h: 0.17, fill: { color: i === 1 ? C.accent : C.paper }, line: { color: C.accent, width: 2 } });
    box(s, x, y + 0.32, sw, sh, ink ? 'ink' : 'card');
    T(s, d, { x: x + 0.18, y: y + 0.46, w: sw - 0.36, h: 0.36, fontFace: SERIF, fontSize: 20, color: ink ? C.lift : C.ink });
    T(s, h, { x: x + 0.18, y: y + 0.83, w: sw - 0.36, h: 0.2, fontFace: SANS6, fontSize: 10, color: ink ? C.aqua : C.accent });
    T(s, t, { x: x + 0.18, y: y + 1.08, w: sw - 0.36, h: 0.7, fontSize: 9.4, color: ink ? 'C9D5E8' : C.ink2, lineSpacingMultiple: 1.25 });
  });
  const cy = y + sh + 0.55, ch = BOTTOM - cy, lw = 4.6;
  box(s, M, cy, lw, ch);
  mono(s, 'Assets we need by 9 Nov', M + 0.23, cy + 0.2, lw - 0.46, C.accent);
  bullets(s, [
    'Reel: the 30-second and 15-second cuts.',
    'Joash: the re-cut with Ke Yue\'s result and a 4:5 version.',
    'Ke Yue: the PDF, the fixed carousel card and the corrected SAT score.',
  ], M + 0.23, cy + 0.48, lw - 0.46, { size: 9.8 });
  const rx = M + lw + 0.19, rw = CW - lw - 0.19;
  box(s, rx, cy, rw, ch);
  mono(s, 'Blockers to clear by 6 Nov', rx + 0.23, cy + 0.2, rw - 0.46, C.amber);
  const half = (rw - 0.46 - 0.25) / 2;
  bullets(s, [
    'Claims: your Speedy Prep page still says 150+ offers against 250+ on the homepage, and Ke Yue\'s SAT score.',
    'Ke Yue\'s written consent for paid ads, and the producer\'s approval for the interview footage.',
    'A privacy policy page on sedifly.com for the forms to link to (PDPA).',
  ], rx + 0.23, cy + 0.48, half, { size: 9.4, dot: C.amber, gap: 0.06 });
  bullets(s, [
    'HubSpot admin access, the Meta Lead Ads connection, and one person who updates booked and attended.',
    'Your client and past-lead lists, so cold ads skip people you know.',
    'Your Roscoe webinar campaign is set to S$350 a day and has spent S$35 since 16 October. Inside or outside the S$2,000?',
  ], rx + 0.23 + half + 0.25, cy + 0.48, half, { size: 9.4, dot: C.amber, gap: 0.06 });
}

pptx.writeFile({ fileName: OUT }).then((f) => console.log('wrote ' + f));
