// Sedifly: Meta plan, creative review and first-month forecast (Nov 2026).
// Design: Toggle Stage 8a dark deck master, as used for the SignWell deck.
// Every account figure comes from act_803550292448381, read 4 Nov 2026
// (5 Nov 2025 to 3 Nov 2026). House rules: writing-standards.md and stop-slop.

const PptxGenJS = require('pptxgenjs');
const path = require('path');
const T = require('./theme');
const { C, F, W, H, M, CONTENT_W, ART, TYPE, CONTACT } = T;

const IMG = (n) => path.join(__dirname, 'img', n).split(path.sep).join('/');
const OUT = process.env.OUT || 'C:/Users/Jordan/Desktop/Sedifly/Sedifly - Meta Plan and Creative Review - Nov 2026.pptx';

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'TOGGLE16x9', width: W, height: H });
pptx.layout = 'TOGGLE16x9';
pptx.author = 'Toggle Solutions';
pptx.company = 'Toggle Solutions';
pptx.title = 'Sedifly Meta plan and creative review, November 2026';
T.resetPages();

// ------------------------------------------------------------------ helpers
function tx(s, text, o) {
  if (!(o.w > 0) || !(o.h > 0)) throw new Error('bad box for: ' + JSON.stringify(text).slice(0, 40));
  s.addText(text, Object.assign({
    fontFace: F, color: C.body, fontSize: 10.5, valign: 'top', margin: 0, lineSpacingMultiple: 1.22,
  }, o));
}
function label(s, text, x, y, w, color) {
  tx(s, text.toUpperCase(), { x, y, w, h: 0.22, fontSize: 9.5, bold: true, charSpacing: 1.1, color: color || C.deepd });
}
function rect(s, o) {
  s.addShape(pptx.ShapeType.rect, Object.assign({ line: { type: 'none' } }, o));
}
function rrect(s, o) {
  s.addShape(pptx.ShapeType.roundRect, Object.assign({ rectRadius: 0.08, line: { type: 'none' } }, o));
}
function chip(s, icon, x, y, size = 0.42) {
  rrect(s, { x, y, w: size, h: size, fill: { color: C.raised } });
  const p = size * 0.2;
  s.addImage({ path: IMG('ic_' + icon + '.png'), x: x + p, y: y + p, w: size - 2 * p, h: size - 2 * p });
}
function badge(s, text, x, y, fill, w = 0.52) {
  rrect(s, { x, y, w, h: 0.24, fill: { color: fill || C.deep }, rectRadius: 0.05 });
  tx(s, text, { x, y: y + 0.035, w, h: 0.2, fontSize: 9, bold: true, color: C.ink, align: 'center' });
}
// a video frame or static with a time badge and a caption under it
function frame(s, { img, x, y, w, h, time, cap, capH = 0.9, tone }) {
  s.addImage({ path: IMG(img), x, y, w, h });
  s.addShape(pptx.ShapeType.rect, { x, y, w, h, fill: { color: C.canvas, transparency: 100 }, line: { color: tone || C.bs, width: tone ? 2 : 0.75 } });
  if (time) badge(s, time, x + 0.06, y + 0.06, tone || C.deep, time.length > 5 ? 0.9 : 0.52);
  if (cap) tx(s, cap, { x, y: y + h + 0.08, w, h: capH, fontSize: 9.5, color: C.body, lineSpacingMultiple: 1.18 });
}
// One native numbered list per block, so PowerPoint spaces the items itself.
// fix-bullets.js colors the numbers blue after the build.
function numbered(s, items, { x, y, w, h, gap = 0.1, size = 10.5 }) {
  const est = items.reduce((a, it) => a + T.textHeight(it, { w: w - 0.3, fontSize: size, lineSpacing: 1.2 }) + gap, 0);
  s.addText(items.map((it) => ({
    text: it,
    options: { bullet: { type: 'number', indent: 20 }, paraSpaceAfter: gap * 72, breakLine: true },
  })), {
    x, y, w, h: h || est, fontFace: F, fontSize: size, color: C.body, valign: 'top', margin: 0, lineSpacingMultiple: 1.2,
  });
  return y + est;
}
function sourceTag(s, text) {
  tx(s, text, { x: M, y: H - 0.47, w: 9.5, h: 0.22, fontSize: 8.5, color: C.slate });
}

// ===================================================================== 1 COVER
{
  const s = pptx.addSlide();
  s.background = { color: C.canvas };
  T.wordmark(s);
  s.addImage({ path: ART.step, x: 8.6, y: 1.9, w: 4.0, h: 3.5, sizing: { type: 'contain', w: 4.0, h: 3.5 } });
  tx(s, 'SEDIFLY   ·   META PLAN   ·   4 NOVEMBER 2026', { x: M, y: 1.95, w: 7.6, h: 0.3, fontSize: TYPE.csk, bold: true, charSpacing: 1.4, color: C.deepd });
  s.addText([
    { text: 'Meta plan for November,', options: { color: C.blue } },
    { text: '\nbuilt on your account data', options: { color: C.ink } },
  ], { x: M, y: 2.38, w: 7.9, h: 2.2, fontFace: F, fontSize: TYPE.coverTitle, bold: true, valign: 'top', lineSpacingMultiple: 1.06, margin: 0 });
  tx(s, 'One slide for each of your asks. The numbers come from 12 months of your Meta account: S$18,831 spent and 718 form leads between November 2025 and November 2026.',
    { x: M, y: 4.62, w: 7.6, h: 0.8, fontSize: TYPE.coverSub, lineSpacingMultiple: 1.4 });
  s.addText([
    { text: CONTACT.name, options: { bold: true, color: C.ink } },
    { text: '  ' + CONTACT.role + '  ·  ' + CONTACT.email, options: { color: C.body } },
  ], { x: M, y: 5.6, w: 7.6, h: 0.3, fontFace: F, fontSize: TYPE.coverSub, margin: 0 });
  T.seal(s, { x: M, y: H - 0.72, w: 6, text: 'Your Digital Growth Partner' });
  T.seal(s, { x: W - M - 6, y: H - 0.72, w: 6, text: CONTACT.site, align: 'right' });
  T.pageNumber(s, false);
}

// ===================================================== 2 LESSONS FROM THE ACCOUNT
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Your ask: lessons from the previous campaigns',
    title: 'What S$18,831 on Meta taught us about your buyers',
    kicker: 'We read every campaign, ad set and ad in your account from November 2025 to November 2026. Three findings shape the plan.',
  });
  // left panel: cost per lead by offer
  const lx = M, lw = 5.7;
  T.card(pptx, s, { x: lx, y, w: lw, h: 4.85 });
  label(s, 'Cost per lead by offer', lx + 0.25, y + 0.18, lw - 0.5);
  const bars = [
    ['Awareness video', '98 leads', 19, C.blue],
    ['eBook', '81 leads', 21, C.blue],
    ['Webinars and events', '386 leads', 23, C.blue],
    ['Readiness Check, 18 to 24', '19 leads', 38, C.teal],
    ['Readiness Check, parents', '3 leads', 132, C.orange],
  ];
  const bx = lx + 2.35, bmax = 2.55;
  bars.forEach(([name, n, v, col], i) => {
    const by = y + 0.55 + i * 0.5;
    tx(s, name, { x: lx + 0.25, y: by + 0.02, w: 2.05, h: 0.22, fontSize: 9.5, color: C.ink });
    tx(s, n, { x: lx + 0.25, y: by + 0.22, w: 2.05, h: 0.2, fontSize: 8.5, color: C.slate });
    const bw = Math.max(0.12, (v / 132) * bmax);
    rect(s, { x: bx, y: by + 0.06, w: bw, h: 0.26, fill: { color: col } });
    tx(s, 'S$' + v, { x: bx + bw + 0.08, y: by + 0.08, w: 0.7, h: 0.24, fontSize: 10.5, bold: true, color: C.ink });
  });
  // age split
  const ay = y + 3.2;
  label(s, 'Where the spend went, by age', lx + 0.25, ay, lw - 0.5);
  const ages = [['18-24', 26, C.blue], ['25-34', 18, C.orange], ['35-44', 14, C.deep], ['45-54', 33, C.blue], ['55-64', 6, C.deep], ['65+', 3, C.orange]];
  let ax = lx + 0.25; const aw = lw - 0.5;
  ages.forEach(([a, p, col]) => {
    const w = (p / 100) * aw;
    rect(s, { x: ax, y: ay + 0.3, w: w - 0.02, h: 0.36, fill: { color: col } });
    if (p >= 6) tx(s, p + '%', { x: ax, y: ay + 0.37, w, h: 0.22, fontSize: 9, bold: true, color: C.ink, align: 'center' });
    if (p >= 6) tx(s, a, { x: ax - 0.1, y: ay + 0.71, w: w + 0.2, h: 0.2, fontSize: 8.5, color: C.sec, align: 'center' });
    ax += w;
  });
  tx(s, 'Orange: ages 25 to 34 (18%) and 65+ (3%), outside both buyer groups. S$3,877 of spend.', { x: lx + 0.25, y: ay + 0.98, w: aw, h: 0.4, fontSize: 9, color: C.body });

  // right: findings
  const rx = M + 6.0, rw = CONTENT_W - 6.0;
  const finds = [
    ['01', 'Parents want proof before a consultation',
      'Parent Readiness Check ads cost S$132 a lead in September. In the same months, parents signed up for the medicine webinar at S$23 and the eBook at S$21. The plan shows parents Ke Yue\'s results first.'],
    ['02', '21% of spend reached people outside your buyers',
      'Most ad sets ran at ages 18 to 65 with Advantage+ free to widen them. The parent ad sets used luxury interests such as Ferrari, Hermès and Rolex to find affluent families, and those interests reach executives more than parents. That is the B2B and C-suite drift you saw.'],
    ['03', 'Meta never learned which leads were good',
      'No qualified, booked or attended status went back to Meta, so it chased the cheapest form fill. Website forms lost leads too: campaigns that sent people to the website cost S$124 a lead, against S$21 for Instant Forms.'],
  ];
  let fy = y + 0.02;
  finds.forEach(([n, h, b]) => {
    tx(s, n, { x: rx, y: fy, w: 0.5, h: 0.32, fontSize: 15, bold: true, color: C.blue });
    tx(s, h, { x: rx + 0.55, y: fy + 0.02, w: rw - 0.55, h: 0.3, fontSize: 13, bold: true, color: C.ink });
    tx(s, b, { x: rx + 0.55, y: fy + 0.36, w: rw - 0.55, h: 1.0, fontSize: 10.5, lineSpacingMultiple: 1.25 });
    fy += 1.62;
  });
  sourceTag(s, 'Source: Sedifly Meta ad account, 5 Nov 2025 to 3 Nov 2026. The two Readiness Check rows are small September tests (S$714 and S$397 of spend).');
}

// ============================================================== 3 THE META PLAN
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Your ask: the Meta plan',
    title: 'Four campaigns that all end in a booked Readiness Check',
    kicker: 'Applicants get the Readiness Check offer from the first ad. Parents see Ke Yue\'s results and Joash first, then get the offer through retargeting and a strategist\'s follow-up.',
  });
  const b = (t) => ({ text: t, options: { bold: true, color: C.ink } });
  T.table(pptx, s, {
    x: M, y, w: CONTENT_W, fontSize: 10, rowH: [0.32, 0.5, 0.5, 0.5, 0.62, 0.36],
    cols: [
      { label: 'Priority', w: 7 }, { label: 'Campaign', w: 19 }, { label: 'Who sees it', w: 28 },
      { label: 'Creative', w: 19 }, { label: 'Budget', w: 13 }, { label: 'Month one', w: 14 },
    ],
    rows: [
      ['1', b('Readiness Check for applicants'), 'Singapore, ages 18 to 24: JC and poly graduates, NS, gap year', 'Admissions Readiness Reel', 'S$600 (S$20 a day)', '10 to 15 enquiries'],
      ['2', b('Ke Yue case study for parents'), 'Singapore, ages 38 to 60', 'Four statics and the carousel', 'S$700 (S$23.33 a day)', '28 to 46 downloads'],
      ['3', b('Joash interview for parents'), 'Singapore, ages 38 to 60', 'Joash interview video', 'S$400 (S$13.33 a day)', '3 to 5 enquiries'],
      ['4', b('Retargeting'), '25,000+ video viewers, 5,000 Instagram and Facebook engagers, case study downloads', '15-second Reel cut, Joash video, carousel', 'S$300 (S$10 a day)', '7 to 10 enquiries'],
      [b('Total'), '', '', '', b('S$2,000 (S$66.67)'), b('22 to 36 enquiries')],
    ],
  });
  const cy = y + 3.05, cw = (CONTENT_W - 0.4) / 3, ch = 1.85;
  const cards = [
    ['performance-marketing', 'Objective', 'Leads, with Meta Instant Forms (Higher Intent) synced to HubSpot. On your account, Instant Forms cost S$21 a lead and website campaigns cost S$124.'],
    ['location-pin', 'Targeting', 'Age bands locked, with Advantage+ audience off. We add no interest layers. Current clients and past leads stay out of the cold campaigns.'],
    ['creative-production', 'Placements', 'Instagram and Facebook Feeds, Stories and Reels. Reels and Stories took 59% of your spend at the same cost per lead as Feeds, so every campaign needs 9:16 assets.'],
  ];
  cards.forEach(([ic, h, t], i) => {
    const x = M + i * (cw + 0.2);
    T.card(pptx, s, { x, y: cy, w: cw, h: ch, rail: [C.blue, C.teal, C.purple][i] });
    chip(s, ic, x + 0.22, cy + 0.25);
    tx(s, h, { x: x + 0.78, y: cy + 0.33, w: cw - 1, h: 0.3, fontSize: 12.5, bold: true, color: C.ink });
    tx(s, t, { x: x + 0.22, y: cy + 0.8, w: cw - 0.44, h: 0.95, fontSize: 10, lineSpacingMultiple: 1.25 });
  });
}

// ====================================================== 4 ADMISSIONS READINESS REEL
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Your ask: review the Admissions Readiness Reel and set a test budget',
    title: 'A strong story with the offer in the last 4 seconds',
    kicker: 'On your account, about 2 in 100 people who see a video watch 15 seconds of it. Ke Yue\'s opening earns attention, so the offer has to appear while people are still watching.',
  });
  const fw = 1.42, fh = 2.52, g = 0.13;
  const frames = [
    ['reel_0.3.png', '0:00', 'Strong hook. The "Underdog Story" label sits where Reels puts its caption and button.', null],
    ['reel_37.0.png', '0:37', 'The UChicago letter shows for one second, with no text naming it.', C.orange],
    ['reel_40.8.png', '0:40', 'The end card opens without an offer.', C.orange],
    ['reel_43.5.png', '0:41', 'The Readiness Check appears in the last 4 seconds.', C.orange],
  ];
  frames.forEach(([img, t, cap, tone], i) => frame(s, { img, x: M + i * (fw + g), y, w: fw, h: fh, time: t, cap, capH: 0.85, tone }));
  const lw = 4 * fw + 3 * g;
  T.calloutBox(pptx, s, {
    x: M, y: y + fh + 1.0, w: lw, h: 1.05, label: 'Test budget',
    text: 'S$280 over 14 days in the applicant campaign. We scale the Reel if its hook rate reaches 25% (your best video so far: 28%) and cost per enquiry stays at S$55 or less. Its best window opens mid-December, when US Early Decision results land.',
  });
  const rx = M + lw + 0.35, rw = CONTENT_W - lw - 0.35;
  T.card(pptx, s, { x: rx, y, w: rw, h: 4.95, rail: C.blue });
  label(s, 'What we would change', rx + 0.25, y + 0.22, rw - 0.5);
  numbered(s, [
    'Show "Free Admissions Readiness Check" on screen from about 8 seconds, and again on the letter shot.',
    'Cut a 30-second main version and a 15-second version: hook, gap year, letter, offer. The 15-second cut runs in Stories and retargeting.',
    'Label the letter shot "Offer: University of Chicago". The outcome is the reason to book.',
    'Test two more openers from Ke Yue\'s own lines: the "aiming too high" advice she got, and the letter shot first.',
    'Move the label into the top third, and confirm the Readiness Check is free before the ads say so.',
  ], { x: rx + 0.25, y: y + 0.55, w: rw - 0.5, h: 4.25, gap: 0.14, size: 10.5 });
}

// ========================================================= 5 JOASH INTERVIEW AD
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Your ask: launch and optimize the Joash interview ad',
    title: 'Joash builds trust, and the ad still needs a result',
    kicker: "Joash's dinner invite cost S$15 a parent lead on your account. Direct consultation asks cost S$132, so this ad runs with a stop rule.",
  });
  const fw = 1.42, fh = 2.52, g = 0.13;
  const frames = [
    ['joash_0.5.png', '0:00', 'A still card fills the first 2.5 seconds. It says 250+; your site says 150+.', C.orange],
    ['joash_4.0.png', '0:04', 'Name and title arrive at 4 seconds. Keep this.', null],
    ['joash_27.5.png', '0:27', 'The offer says "free consultation". Every other ad says Readiness Check.', C.orange],
  ];
  frames.forEach(([img, t, cap, tone], i) => frame(s, { img, x: M + i * (fw + g), y, w: fw, h: fh, time: t, cap, capH: 1.0, tone }));
  const lw = 3 * fw + 2 * g;
  const rx = M + lw + 0.35, rw = CONTENT_W - lw - 0.35;
  const b = (t) => ({ text: t, options: { bold: true, color: C.ink } });
  T.table(pptx, s, {
    x: rx, y, w: rw, fontSize: 10, rowH: [0.3, 0.34, 0.34, 0.34, 0.34, 0.34, 0.44],
    cols: [{ label: 'Setup', w: 20 }, { label: 'What we propose', w: 80 }],
    rows: [
      [b('Objective'), 'Leads, Instant Form (Higher Intent), synced to HubSpot'],
      [b('Audience'), 'Parents in Singapore, ages 38 to 60, age band locked'],
      [b('Placements'), 'Reels and Stories in 9:16, plus a 4:5 cut for Feeds'],
      [b('Budget'), 'S$400 a month (S$13.33 a day), plus a share of retargeting'],
      [b('Forecast'), '3 to 5 Readiness Check requests at S$70 to S$130 each'],
      [b('Stop rule'), 'Above S$130 per enquiry after S$260 spent, the video moves to retargeting, where people already know Sedifly'],
    ],
  });
  const ey = y + 2.85;
  T.card(pptx, s, { x: rx, y: ey, w: rw, h: 2.1, rail: C.orange });
  label(s, 'Edits before launch', rx + 0.25, ey + 0.2, rw - 0.5);
  numbered(s, [
    'Open on Joash speaking, with the offer count as text over the shot.',
    'Add one result before the end card, such as 3 seconds of Ke Yue: an unsuccessful first cycle, then UChicago.',
    'End on "Take the free Admissions Readiness Check".',
    'Confirm 250+ or 150+, and that the interview\'s producer allows paid use of the footage.',
  ], { x: rx + 0.25, y: ey + 0.5, w: rw - 0.5, h: 1.5, gap: 0.07, size: 10 });
}

// ======================================================= 6 KE YUE CASE STUDY
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Your ask: the Ke Yue case study campaign',
    title: 'Ke Yue gives parents proof before the Readiness Check',
    kicker: 'Your eBook brought in parent leads at S$21 each. The Ke Yue case study is stronger proof, so it runs the same way and hands A and B leads to a strategist.',
  });
  const tw = 1.38, th = 1.72, g = 0.1;
  const thumbs = [
    ['ky_profile.png', 'Lead candidate', C.teal, 'Exact grades parents can compare with their child\'s.'],
    ['ky_diag.png', 'Lead candidate', C.teal, 'Names the worry: a good profile that did not fit together.'],
    ['ky_ebook.png', 'Test', C.deep, 'Shows what the download contains.'],
    ['ky_car1.png', 'Feeds', C.deep, 'The swipe order tells the story.'],
  ];
  thumbs.forEach(([img, tag, col, cap], i) => {
    const x = M + i * (tw + g);
    frame(s, { img, x, y, w: tw, h: th });
    badge(s, tag, x + 0.06, y + th - 0.32, col, tag.length > 6 ? 1.12 : 0.6);
    tx(s, cap, { x, y: y + th + 0.08, w: tw, h: 0.6, fontSize: 9, lineSpacingMultiple: 1.15 });
  });
  const lw = 4 * tw + 3 * g;
  const fy = y + th + 0.82;
  T.card(pptx, s, { x: M, y: fy, w: lw, h: 4.95 - th - 0.82, rail: C.orange });
  label(s, 'Fix before launch', M + 0.25, fy + 0.2, lw - 0.5);
  numbered(s, [
    'SAT score: the ads say 1490 and the case study page says 1390.',
    'The last carousel card reads "Once Cycle Later" in the 4:5 and 1:1 sets.',
    'On three of the four 9:16 statics, the logo or button sits where Stories and Reels cover the frame.',
    'We need the 4-page PDF itself, hosted at a link the form and HubSpot can open.',
  ], { x: M + 0.25, y: fy + 0.5, w: lw - 0.5, h: 4.95 - th - 0.82 - 0.62, gap: 0.08, size: 10 });

  const rx = M + lw + 0.35, rw = CONTENT_W - lw - 0.35;
  const b = (t) => ({ text: t, options: { bold: true, color: C.ink } });
  T.table(pptx, s, {
    x: rx, y, w: rw, fontSize: 10, rowH: [0.3, 0.42, 0.42, 0.42, 0.7, 0.7, 0.7],
    cols: [{ label: 'Setup', w: 22 }, { label: 'What we propose', w: 78 }],
    rows: [
      [b('Objective'), 'Leads, Instant Form (Higher Intent), synced to HubSpot'],
      [b('Audience'), 'Parents in Singapore, ages 38 to 60, one ad set'],
      [b('Budget'), 'S$700 a month (S$23.33 a day)'],
      [b('Form'), 'The three Readiness Check questions: who is filling it in, the student\'s current level, and target universities'],
      [b('Follow-up'), 'The PDF arrives at once. A Readiness Check invite follows on day 3, and a strategist calls every A or B lead within 24 hours.'],
      [b('KPIs'), 'S$15 to S$25 per download (28 to 46), 40% to 55% scored A or B, and 10% to 15% booking a Readiness Check within 30 days'],
    ],
  });
}

// ============================================================ 7 FORECAST
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Your ask: the first-month forecast',
    title: 'Month one: 22 to 36 requests and 1 to 4 enrollments',
    kicker: 'Same stages and conversion rates as the September proposal. The request count moves for two reasons, both shown on the right.',
  });
  const lw = 7.1, ch = 3.75;
  T.card(pptx, s, { x: M, y, w: lw, h: ch });
  tx(s, 'LOW TO HIGH', { x: M + 3.9, y: y + 0.18, w: 1.5, h: 0.2, fontSize: 9, bold: true, charSpacing: 1, color: C.deepd, align: 'center' });
  tx(s, 'MEDIA EACH', { x: M + 5.45, y: y + 0.18, w: 1.45, h: 0.2, fontSize: 9, bold: true, charSpacing: 1, color: C.deepd, align: 'center' });
  const stages = [
    ['Readiness Check requests', 'All four campaigns', '22 to 36', 'S$56 to S$91', 1.0, C.blue],
    ['Qualified, scored A or B', '50% to 65% of requests', '11 to 23', 'S$87 to S$182', 0.82, C.blue],
    ['Readiness Check booked', '75% to 90% of qualified', '8 to 20', 'S$100 to S$250', 0.7, C.teal],
    ['Consultation attended', '80% to 83% of booked', '6 to 16', 'S$125 to S$333', 0.6, C.teal],
    ['Enrolled', '20% to 30% of attended', '1 to 4', 'S$500 to S$2,000', 0.5, C.purple],
  ];
  stages.forEach(([st, rate, rng, cost, f, col], i) => {
    const sy = y + 0.45 + i * 0.56;
    const bw = 3.6 * f;
    rect(s, { x: M + 0.25 + (3.6 - bw) / 2, y: sy, w: bw, h: 0.48, fill: { color: col } });
    tx(s, st, { x: M + 0.25, y: sy + 0.04, w: 3.6, h: 0.22, fontSize: 10, bold: true, color: C.ink, align: 'center' });
    tx(s, rate, { x: M + 0.25, y: sy + 0.26, w: 3.6, h: 0.2, fontSize: 8.5, color: C.ink, align: 'center' });
    tx(s, rng, { x: M + 3.9, y: sy + 0.08, w: 1.5, h: 0.32, fontSize: 15, bold: true, color: C.ink, align: 'center' });
    tx(s, cost, { x: M + 5.45, y: sy + 0.12, w: 1.45, h: 0.26, fontSize: 10.5, color: C.body, align: 'center' });
  });
  tx(s, 'Plus 28 to 46 Ke Yue downloads in the follow-up pool. Low takes the weaker end of every rate, high the stronger end, and each step rounds down. Most enrollments land in months two and three.',
    { x: M + 0.25, y: y + 3.3, w: lw - 0.5, h: 0.4, fontSize: 9, color: C.sec });

  // bridge from the September proposal
  const rx = M + lw + 0.3, rw = CONTENT_W - lw - 0.3;
  T.card(pptx, s, { x: rx, y, w: rw, h: ch, rail: C.purple });
  label(s, 'How this ties to the September proposal', rx + 0.25, y + 0.2, rw - 0.5);
  const steps = [
    ['47 to 68', 'September proposal at S$3,000, including masterclass sign-ups'],
    ['37 to 49', 'Same cost bands on S$2,000, with the masterclass cell removed'],
    ['22 to 36', 'Your account data: a direct ask to parents cost S$132, so S$1,100 of parent budget goes through Ke Yue and Joash first'],
  ];
  steps.forEach(([n, t], i) => {
    const sy = y + 0.55 + i * 1.05;
    rrect(s, { x: rx + 0.25, y: sy, w: 1.35, h: 0.62, fill: { color: i === 2 ? C.deep : C.raised } });
    tx(s, n, { x: rx + 0.25, y: sy + 0.15, w: 1.35, h: 0.32, fontSize: 15, bold: true, color: C.ink, align: 'center' });
    tx(s, t, { x: rx + 1.75, y: sy + 0.02, w: rw - 2.0, h: 0.8, fontSize: 9.8, lineSpacingMultiple: 1.18 });
    if (i < 2) s.addShape(pptx.ShapeType.downArrow, { x: rx + 0.8, y: sy + 0.68, w: 0.25, h: 0.32, fill: { color: C.slate }, line: { type: 'none' } });
  });

  T.calloutBox(pptx, s, {
    x: M, y: y + ch + 0.15, w: CONTENT_W, h: 1.05, label: 'Assumptions and sources',
    text: 'Conversion rates are the September proposal\'s bands. Cost per request: applicants S$38 to S$55 (September test: S$38), parents S$70 to S$130 (September: S$132), retargeting S$28 to S$38 (your warm ad sets: S$33), case study S$15 to S$25 per download (your eBook: S$21). Your team calls within 5 minutes. Weeks one and two cost more while Meta learns, and your HubSpot data replaces every band after 30 days.',
  });
}

// ============================================================ 8 TRACKING
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Your ask: tracking for qualified leads and consultation bookings',
    title: 'We trace every lead from the form to the consultation',
    kicker: 'Until now, Meta saw form fills and nothing after them. HubSpot stages will tell it who qualified, booked and attended, and Meta then bids for more people like them.',
  });
  const nodes = [
    ['Instant Form', 'One form per campaign, three qualifying questions'],
    ['HubSpot', 'Lead lands in real time through the Meta Lead Ads sync'],
    ['Score A to D', 'Form answers set the score. A and B count as qualified'],
    ['Booked', 'Your team marks the Readiness Check booked within 24 hours'],
    ['Attended', 'Your team marks the consultation attended within 24 hours'],
  ];
  const nw = 2.05, gap = (CONTENT_W - 5 * nw) / 4, nh = 1.25;
  nodes.forEach(([t, sub], i) => {
    const x = M + i * (nw + gap);
    T.node(pptx, s, { x, y, w: nw, h: nh, title: t, sub, kind: 'verified' });
    if (i < 4) T.arrow(pptx, s, { x: x + nw + 0.04, y: y + nh / 2 - 0.08, w: gap - 0.08, color: C.deep });
  });
  // return loop
  const ly = y + nh + 0.18;
  rect(s, { x: M + nw / 2, y: ly, w: 4 * (nw + gap), h: 0.03, fill: { color: C.teal } });
  rect(s, { x: M + nw / 2, y: y + nh, w: 0.03, h: 0.2, fill: { color: C.teal } });
  rect(s, { x: M + 4 * (nw + gap) + nw / 2, y: y + nh, w: 0.03, h: 0.2, fill: { color: C.teal } });
  tx(s, 'HubSpot\'s Conversions API sync sends qualified, booked and attended back to Meta, so Ads Manager shows cost per consultation by ad.',
    { x: M + 0.8, y: ly + 0.1, w: CONTENT_W - 1.6, h: 0.36, fontSize: 10, color: C.teal, align: 'center' });

  const cy = ly + 0.55, cw = (CONTENT_W - 0.3) / 2, ch = 2.7;
  T.card(pptx, s, { x: M, y: cy, w: cw, h: ch, rail: C.blue });
  label(s, 'What we set up', M + 0.25, cy + 0.2, cw - 0.5);
  numbered(s, [
    'HubSpot stages: Lead, then MQL (A or B), SQL (booked), Opportunity (attended), Customer.',
    'Each Meta lead carries its campaign, ad set and ad, so you can see which ad produced each consultation.',
    'Once the account logs about 100 qualified events, we test Meta\'s Conversion Leads goal, which bids for qualified leads.',
    'UTM tags on every ad link, so ad visits show in GA4 by campaign and ad.',
  ], { x: M + 0.25, y: cy + 0.5, w: cw - 0.5, h: ch - 0.62, gap: 0.1, size: 10 });
  const rx = M + cw + 0.3;
  T.card(pptx, s, { x: rx, y: cy, w: cw, h: ch, rail: C.orange });
  label(s, 'What we found and will fix', rx + 0.25, cy + 0.2, cw - 0.5);
  numbered(s, [
    'Three pixels sit on your account. "Sedifly - CURRENT" fires, one stopped on 19 October, and one has never fired. We keep one.',
    'Your website retargeting audience holds about 20 people, so the pixel on the Wix site needs a check.',
    'Booked and attended reach Meta when your team updates HubSpot. We cannot do this step for you.',
    'Website campaigns cost S$124 a lead on your account, so every campaign uses an Instant Form.',
  ], { x: rx + 0.25, y: cy + 0.5, w: cw - 0.5, h: ch - 0.62, gap: 0.1, size: 10 });
}

// ===================================================== 9 REPORTING AND OPTIMIZATION
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Your ask: first reporting date, cadence and optimization criteria',
    title: 'You get a report every Monday from 16 November',
    kicker: 'Each report covers spend, requests, qualified, booked and attended by campaign, the ads we kept and cut, and the one decision we made that week.',
  });
  const lw = 3.95;
  const cad = [
    ['calendar', 'Every Monday from 16 Nov', 'One-page report by campaign, with cost per qualified request and lead quality by age.'],
    ['clock', 'Day 14: Tuesday 24 Nov', 'Creative call: Reel, Joash and the Ke Yue statics, with keep, cut and scale decisions.'],
    ['reporting-analysis', 'Day 30: Thursday 10 Dec', 'KPI review against this forecast. We reset the KPIs on your real numbers.'],
  ];
  cad.forEach(([ic, h, t], i) => {
    const cy = y + i * 1.68;
    T.card(pptx, s, { x: M, y: cy, w: lw, h: 1.52 });
    chip(s, ic, M + 0.22, cy + 0.22);
    tx(s, h, { x: M + 0.78, y: cy + 0.3, w: lw - 1, h: 0.28, fontSize: 12, bold: true, color: C.ink });
    tx(s, t, { x: M + 0.22, y: cy + 0.78, w: lw - 0.44, h: 0.65, fontSize: 10 });
  });
  const rx = M + lw + 0.3, rw = CONTENT_W - lw - 0.3;
  const b = (t) => ({ text: t, options: { bold: true, color: C.ink } });
  T.table(pptx, s, {
    x: rx, y, w: rw, fontSize: 9.8, rowH: [0.3, 0.5, 0.62, 0.5, 0.75, 0.62, 0.62, 0.62],
    cols: [{ label: 'Signal', w: 25 }, { label: 'Trigger', w: 44 }, { label: 'Action', w: 31 }],
    rows: [
      [b('First 7 days'), 'Meta is still learning', 'No changes unless tracking breaks or an ad is rejected'],
      [b('Video hook rate'), 'Under 15% after 2,000 impressions (your account average: 9%)', 'Re-cut the opener or retire the video'],
      [b('Static click rate'), 'Under 0.7% after 1,500 impressions (your average: 0.8%)', 'Retire the static'],
      [b('Cost per request'), 'Above the ceiling five days running: S$55 applicants, S$130 Joash, S$38 retargeting, S$25 per download', 'Rotate creative first, then cut budget'],
      [b('Lead quality'), 'Under 35% of leads scored A or B after 10 leads', 'Cut budget, even when cost per lead looks good'],
      [b('Winning campaign'), 'Cost per qualified request 20% under ceiling for 7 days', 'Move up to S$200 a month into it'],
      [b('Audience drift'), 'Over 30% of a week\'s leads are neither parent nor applicant', 'Tighten the ad set that week'],
    ],
  });
}

// ===================================================== 10 LAUNCH, ASSETS, BLOCKERS
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Your ask: launch timeline, required assets and blockers',
    title: 'Live on 10 November if these items close by Friday',
    kicker: 'We build from Thursday 5 November. Blockers on the right need an answer by Friday 6 November, and the assets by Monday 9 November.',
  });
  // timeline
  const steps = [
    ['Wed 4 Nov', 'You review this plan'],
    ['Thu 5 to Mon 9', 'We build forms, HubSpot sync and audiences'],
    ['Tue 10 Nov', 'All four campaigns go live'],
    ['Mon 16 Nov', 'First weekly report'],
    ['Tue 24 Nov', 'Day-14 creative call'],
    ['Mid-December', 'Early Decision results: Reel push'],
    ['Thu 10 Dec', '30-day KPI review'],
  ];
  const tlY = y + 0.35, seg = CONTENT_W / steps.length;
  rect(s, { x: M + seg / 2, y: tlY, w: CONTENT_W - seg, h: 0.04, fill: { color: C.deep } });
  steps.forEach(([d, t], i) => {
    const cx = M + seg * i + seg / 2;
    s.addShape(pptx.ShapeType.ellipse, { x: cx - 0.11, y: tlY - 0.09, w: 0.22, h: 0.22, fill: { color: i === 2 ? C.teal : C.blue }, line: { type: 'none' } });
    tx(s, d, { x: cx - seg / 2 + 0.03, y: tlY + 0.24, w: seg - 0.06, h: 0.24, fontSize: 10.5, bold: true, color: C.ink, align: 'center' });
    tx(s, t, { x: cx - seg / 2 + 0.05, y: tlY + 0.5, w: seg - 0.1, h: 0.5, fontSize: 9.5, align: 'center', lineSpacingMultiple: 1.15 });
  });
  const cy = y + 1.5, ch = 6.95 - cy, lw = 5.0;
  T.card(pptx, s, { x: M, y: cy, w: lw, h: ch, rail: C.blue });
  label(s, 'Assets we need by Mon 9 Nov', M + 0.25, cy + 0.2, lw - 0.5);
  numbered(s, [
    'Reel: a 30-second and a 15-second cut, with the offer on screen.',
    'Joash: the re-cut with a result, the new end card and a 4:5 version.',
    'Ke Yue: the 4-page PDF, the fixed carousel card and the corrected SAT score.',
    'Ad copy: we draft the primary text and headlines for every ad, and you approve them.',
  ], { x: M + 0.25, y: cy + 0.5, w: lw - 0.5, h: ch - 0.62, gap: 0.12, size: 10.5 });
  const rx = M + lw + 0.3, rw = CONTENT_W - lw - 0.3;
  T.card(pptx, s, { x: rx, y: cy, w: rw, h: ch, rail: C.orange });
  label(s, 'Blockers to clear by Fri 6 Nov', rx + 0.25, cy + 0.2, rw - 0.5);
  numbered(s, [
    'Claims: confirm 250+ or 150+ offers, Ke Yue\'s SAT score, and that the Readiness Check is free.',
    'Permissions: Ke Yue\'s written consent for paid ads, and the producer\'s approval for the interview footage.',
    'HubSpot: admin access for us, the Meta Lead Ads connection, and one person who updates booked and attended.',
    'A privacy policy page on sedifly.com for the forms to link to (PDPA).',
    'Your client and past-lead lists, so the cold campaigns skip people you already know.',
    'Your Roscoe webinar campaign for 15 November is live. Tell us if it sits inside or outside the S$2,000.',
  ], { x: rx + 0.25, y: cy + 0.5, w: rw - 0.5, h: ch - 0.62, gap: 0.08, size: 10 });
}

module.exports = pptx;
if (require.main === module) {
  pptx.writeFile({ fileName: OUT }).then((f) => console.log('wrote ' + f));
}
