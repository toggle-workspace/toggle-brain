// SignWell brand audit deck.
// Every figure traces to clients/signwell/01-strategy/
//   2026-09-13-brand-audit-verified-data.md
// House rules: brain/voice/writing-standards.md (no em dash, no double hyphen,
// full sentences), stop-slop, and clients/toggle/design-system/.

const PptxGenJS = require('pptxgenjs');
const T = require('./theme');
const { C, F, W, H, M, TOP, CONTENT_W, ART, TYPE, CONTACT, px } = T;

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'TOGGLE16x9', width: W, height: H });
pptx.layout = 'TOGGLE16x9';
pptx.author = 'Toggle Solutions';
pptx.company = 'Toggle Solutions';
pptx.title = 'SignWell brand audit and growth plan';
pptx.subject = 'Paid media audit, tracking review and growth plan';

T.resetPages();

// =========================================================== 1. COVER

{
  const s = pptx.addSlide();
  s.background = { color: C.canvas };
  T.wordmark(s);
  s.addImage({ path: ART.step, x: 8.5, y: 1.85, w: 4.1, h: 3.6, sizing: { type: 'contain', w: 4.1, h: 3.6 } });

  s.addText('SIGNWELL   ·   14 SEPTEMBER 2026', {
    x: M, y: 2.0, w: 7.4, h: 0.3, fontFace: F, fontSize: TYPE.csk, bold: true,
    charSpacing: 1.4, color: C.deepd,
  });
  s.addText([
    { text: 'Brand audit', options: { color: C.blue } },
    { text: '\nand growth plan', options: { color: C.ink } },
  ], {
    x: M, y: 2.42, w: 7.4, h: 1.6, fontFace: F, fontSize: TYPE.coverTitle, bold: true,
    valign: 'top', lineSpacingMultiple: 1.06,
  });
  s.addText(
    'Where the paid search budget lands today, what the site does with it, and how paid social ' +
    'and the full funnel should be built around it.',
    { x: M, y: 4.15, w: 7.4, h: 0.85, fontFace: F, fontSize: TYPE.coverSub, color: C.body, valign: 'top', lineSpacingMultiple: 1.4 }
  );
  s.addText([
    { text: CONTACT.name, options: { bold: true, color: C.ink } },
    { text: '  ' + CONTACT.role + '  ·  ' + CONTACT.email, options: { bold: false, color: C.body } },
  ], {
    x: M, y: 5.15, w: 7.4, h: 0.3, fontFace: F, fontSize: TYPE.coverSub,
  });

  T.seal(s, { x: M, y: H - 0.72, w: 6, text: 'Your Digital Growth Partner' });
  T.seal(s, { x: W - M - 6, y: H - 0.72, w: 6, text: CONTACT.site, align: 'right' });
  T.pageNumber(s, false);
}

// =========================================================== 2. SCOPE AND LIMITS

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Scope',
    title: 'What we read, and what we could not see',
    kicker: 'Everything in this deck comes from your public site, read on 13 September 2026. Toggle has no account access, so none of it is your account data. Where we are inferring, the slide says so.',
  });

  T.card(pptx, s, { x: M, y, w: 5.9, h: 2.5 });
  s.addText('WHAT WE READ', { x: M + 0.25, y: y + 0.18, w: 5.4, h: 0.25, fontFace: F, fontSize: 10, bold: true, charSpacing: 1.1, color: C.deepd });
  s.addText([
    { text: '17 commercial pages, loaded in a browser and scrolled end to end', options: { bullet: true } },
    { text: 'robots.txt and both sitemaps: 102 URLs plus 212 blog posts', options: { bullet: true } },
    { text: 'Published pricing across all five plans', options: { bullet: true } },
    { text: 'Six competitor comparison pages you wrote yourselves', options: { bullet: true } },
    { text: 'Tag deployment on the homepage, pricing and demo request', options: { bullet: true } },
  ], { x: M + 0.25, y: y + 0.52, w: 5.4, h: 1.85, fontFace: F, fontSize: 11.5, color: C.body, lineSpacingMultiple: 1.35, valign: 'top' });

  T.card(pptx, s, { x: M + 6.2, w: 5.9, y, h: 2.5, fill: '2A1F14' });
  s.addText('WHAT WE COULD NOT SEE', { x: M + 6.45, y: y + 0.18, w: 5.4, h: 0.25, fontFace: F, fontSize: 10, bold: true, charSpacing: 1.1, color: C.warning });
  s.addText([
    { text: 'Your Google Ads, Meta, LinkedIn and Microsoft accounts', options: { bullet: true } },
    { text: 'Your GA4 reports and what your conversions actually cost', options: { bullet: true } },
    { text: 'Which queries you buy, and at what price', options: { bullet: true } },
    { text: 'Anything behind the app login, including activation and upgrade', options: { bullet: true } },
    { text: 'Your demo request form, which JavaScript renders', options: { bullet: true } },
  ], { x: M + 6.45, y: y + 0.52, w: 5.4, h: 1.85, fontFace: F, fontSize: 11.5, color: C.body, lineSpacingMultiple: 1.35, valign: 'top' });

  T.calloutBox(pptx, s, {
    x: M, y: y + 2.75, w: CONTENT_W, h: 0.92,
    label: 'The rule we work to',
    text: 'Nothing in this deck is invented. Every number traces back to a page we read or a source we name. Where a number would have needed guessing, we left it out and wrote a question instead.',
  });
}

// =========================================================== 3. EXECUTIVE SUMMARY

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Executive summary',
    title: 'Six things we found before we saw a single account',
    kicker: 'Four of these cost you money today. One is something you already built and may not be using. The last one is the opening.',
  });

  const findings = [
    ['01', 'Your DocuSign and Adobe pages have no way to sign up', 'Four of your six comparison pages carry a signup control. The DocuSign and Adobe Sign pages carry none, and those are the two incumbents your customers are actually leaving.'],
    ['02', 'A $12 seat and a $275 API account cannot share one conversion', 'Your API plan is 22.9 times a Light seat. If both count as one app signup, the bidding chases volume and walks away from value.'],
    ['03', 'Your free tools offer signup only after the work is done', 'That is deliberate and it matches your own ad copy. The 41 contract templates are the exception: no signup link anywhere on a 17,866 px page.'],
    ['04', 'The tracking foundation is half built, and the hard part is done', 'Somebody wired the GA4 client ID into a two year cookie so backend signups can be matched to sessions. Where that cookie goes next decides how quickly we can bid on real revenue.'],
    ['05', 'The migration will cost you performance, and you should plan for it', 'Campaign history does not move between Google Ads accounts. Conversion history, learning and Quality Score stay with your old agency. Any agency promising otherwise is guessing.'],
    ['06', 'Your category has left Meta empty, and that is the opening', 'SignNow and Dropbox Sign run zero Meta ads. DocuSign runs 360 selling enterprise AI, and PandaDoc runs 120 selling revenue operations. Nobody is selling simple, cheap signing to a small business.', true],
  ];
  let fy = y - 0.05;
  findings.forEach(([n, head, sub, good]) => {
    s.addText(n, { x: M, y: fy, w: 0.5, h: 0.3, fontFace: F, fontSize: 15, bold: true, color: good ? C.success : C.blue });
    s.addText(head, { x: M + 0.55, y: fy - 0.02, w: 11.4, h: 0.28, fontFace: F, fontSize: 13.5, bold: true, color: C.ink });
    s.addText(sub, { x: M + 0.55, y: fy + 0.25, w: 11.4, h: 0.44, fontFace: F, fontSize: 10.5, color: C.body, lineSpacingMultiple: 1.2, valign: 'top' });
    fy += 0.78;
  });
}

// =========================================================== 4. REVENUE ARCHITECTURE

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'The business',
    title: 'One product, five price points, and a 23x gap',
    kicker: 'Before anyone optimizes a campaign, one question has to be settled: which of these does a qualified app signup mean?',
  });

  s.addChart(pptx.ChartType.bar, [{
    name: 'Monthly price in US dollars',
    labels: ['Free', 'Light\n(per user)', 'Business\n(per user)', 'API\n(base plan)'],
    values: [0, 12, 36, 275],
  }], {
    x: M, y: y + 0.05, w: 6.5, h: 3.1,
    barDir: 'col', chartColors: [C.blue, C.blue, C.blue, C.orange],
    showValue: true, dataLabelFormatCode: '"$"#,##0', dataLabelFontSize: 11,
    dataLabelFontFace: F, dataLabelColor: C.ink, dataLabelPosition: 'outEnd',
    catAxisLabelFontFace: F, catAxisLabelFontSize: 10, catAxisLabelColor: C.body,
    valAxisLabelFontFace: F, valAxisLabelFontSize: 9, valAxisLabelColor: C.sec,
    valAxisTitle: 'Monthly price, US dollars', showValAxisTitle: true,
    valAxisTitleFontFace: F, valAxisTitleFontSize: 10, valAxisTitleColor: C.sec,
    catAxisTitle: 'Plan', showCatAxisTitle: true,
    catAxisTitleFontFace: F, catAxisTitleFontSize: 10, catAxisTitleColor: C.sec,
    valGridLine: { color: C.bs, style: 'solid', size: 0.75 },
    showLegend: false, barGapWidthPct: 55, valAxisMaxVal: 320,
  });
  T.tag(s, { x: M, y: y + 3.2, w: 6.5, text: 'PUBLISHED LIST PRICES, signwell.com/pricing and /api-pricing, read 13 Sept 2026' });

  const bx = M + 6.9;
  s.addText('The API plan is 22.9 times a Light seat.', { x: bx, y: y + 0.1, w: 5.2, h: 0.6, fontFace: F, fontSize: 19, bold: true, color: C.ink, lineSpacingMultiple: 1.15 });
  s.addText(
    'One API customer at $275 a month is worth roughly 23 Light seats, before a single document is billed on top at $0.85 falling to $0.20.\n\n' +
    'Automated bidding optimizes toward whatever you tell it a conversion is. Point it at undifferentiated signups and it will find you the cheapest ones, which on a freemium product means users who stop at 3 documents a month.',
    { x: bx, y: y + 0.82, w: 5.2, h: 1.75, fontFace: F, fontSize: 11.5, color: C.body, valign: 'top', lineSpacingMultiple: 1.3 }
  );
  T.calloutBox(pptx, s, {
    x: bx, y: y + 2.62, w: 5.2, h: 1.15,
    label: 'Question for Henry',
    text: 'Does a qualified app signup mean a free account, an account that sends its first document, a paid conversion, or an API key? Your answer decides the whole bidding setup.',
  });
}

// =========================================================== 5. THE MARKET

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'The market',
    title: 'Every forecast disagrees on the size and agrees on the direction',
    kicker: 'We are showing you the spread rather than picking the number that flatters the slide. The useful signal is what they all agree on.',
  });

  T.table(pptx, s, {
    x: M, y: y + 0.05, w: 6.4,
    cols: [{ label: 'Source', w: 44 }, { label: '2026 market size', w: 30, align: 'right' }, { label: 'CAGR', w: 26, align: 'right' }],
    rows: [
      ['Straits Research', '$8.49B', '29.18%'],
      ['Coherent Market Insights', '$13.01B', '33.70%'],
      ['Research and Markets', '$13.09B', '19.90%'],
      ['Fortune Business Insights', '$13.70B', '35.40%'],
      ['Mordor Intelligence', '$16.83B', '22.90%'],
    ],
    rowH: 0.36,
  });
  T.tag(s, { x: M, y: y + 2.2, w: 6.4, text: 'PUBLISHED FORECASTS, five vendors, collected 13 Sept 2026' });

  const bx = M + 6.8;
  s.addText('What they agree on', { x: bx, y: y + 0.05, w: 5.3, h: 0.32, fontFace: F, fontSize: 16, bold: true, color: C.ink });
  s.addText([
    { text: 'Software and apps hold roughly 81% of the market, so the growth is in platforms like yours rather than in services.', options: { bullet: true } },
    { text: 'The growth driver is regulatory compliance and auditable transactions, which is the thing you already include on every plan including free.', options: { bullet: true } },
    { text: 'Nobody forecasts below 19% a year. A rising category hides a lot of marketing sins, and it also means competitors keep arriving.', options: { bullet: true } },
  ], { x: bx, y: y + 0.45, w: 5.3, h: 1.7, fontFace: F, fontSize: 11.5, color: C.body, lineSpacingMultiple: 1.3, valign: 'top' });

  T.calloutBox(pptx, s, {
    x: bx, y: y + 2.25, w: 5.3, h: 1.5,
    label: 'The shift worth watching',
    text: 'Signing is moving inside AI assistants. You shipped an /mcp/ page for exactly that, and your robots.txt opts into AI training and AI search. You are ahead of most companies your size here, and almost none of your paid media reflects it yet.',
  });

  s.addText(
    'One number to settle internally: your homepage says documents get signed 40% faster, your DocuSign page says 60% faster. Ad copy has to pick one.',
    { x: M, y: y + 2.62, w: 6.4, h: 0.6, fontFace: F, fontSize: 11, italic: true, color: C.sec, valign: 'top', lineSpacingMultiple: 1.25 }
  );
}

// =========================================================== 6. COMPETITIVE SET

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Competitors',
    title: 'Where you actually sit in the auction',
    kicker: 'You compete against two different groups. The incumbents you take customers from, and the cheap challengers taking customers from you.',
  });

  T.table(pptx, s, {
    x: M, y: y + 0.02, w: CONTENT_W,
    cols: [
      { label: 'Competitor', w: 16 },
      { label: 'Entry price', w: 16 },
      { label: 'Free plan', w: 17 },
      { label: 'Where they beat you', w: 26 },
      { label: 'Where you beat them', w: 25 },
    ],
    rows: [
      ['DocuSign', '$15 to $40 per user', 'Trial only', 'Brand recognition, enterprise procurement, integrations depth', 'Price, no envelope fees, support included'],
      ['Adobe Acrobat Sign', 'Bundled with Acrobat', 'Trial only', 'Sits inside a suite finance already buys', 'Simplicity, and a product that does one thing'],
      ['Dropbox Sign', '$20 per month', 'None, 30 day trial', 'Dropbox distribution', 'A real free plan and a lower entry price'],
      ['PandaDoc', 'Free tier available', 'Unlimited sending', 'Proposals and quoting, not just signing', 'Cheaper paid tiers, simpler product'],
      ['SignNow', '$8 per user', 'Trial only', 'Undercuts you on headline price', 'Compliance on every plan, ratings, support'],
      [{ text: 'SignWell', options: { bold: true, color: C.ink } }, { text: '$10 to $12 per user', options: { bold: true, color: C.ink } }, { text: '3 documents a month', options: { bold: true, color: C.ink } }, { text: 'Reference row', options: { color: C.slate } }, { text: 'Reference row', options: { color: C.slate } }],
    ],
    fontSize: 10.5, rowH: 0.44,
  });
  T.tag(s, { x: M, y: y + 3.40, w: CONTENT_W, text: 'PUBLISHED PRICING, competitor sites and category comparisons, read 13 Sept 2026' });

  T.calloutBox(pptx, s, {
    x: M, y: y + 3.75, w: CONTENT_W, h: 0.75,
    label: 'The strategic read',
    text: 'Your defensible ground is not being the cheapest, because SignNow already took that at $8. It is being the only one that gives a small team SOC 2, HIPAA, eIDAS and real support on the entry plan.',
  });
}

// =========================================================== 7. HOW SIGNWELL WINS

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Differentiation',
    title: 'Three things you can say that nobody else can',
    kicker: 'Each of these survives the test that matters for ad copy: a competitor cannot paste the line into their own ad unchanged.',
  });

  const diffs = [
    ['Compliance on every plan, including free', 'SOC 2 Type II, HIPAA BAA, GDPR, eIDAS, ESIGN, UETA and Mexican NOM 151, on the $0 plan. DocuSign and Adobe gate parts of this behind higher tiers. This is the line a regulated buyer cannot ignore.', C.blue],
    ['A price DocuSign will not match', '$10 a user against $15 to $40, with no per envelope fee. Your own page cites Capterra likelihood to recommend at 92.5% against their 87.5%.', C.teal],
    ['Support included at every tier', 'The thing your testimonials keep repeating, and the thing that costs incumbents the most to offer. It is also the least used angle in your marketing.', C.purple],
  ];
  let cx = M;
  diffs.forEach(([head, sub, col]) => {
    T.card(pptx, s, { x: cx, y, w: 3.9, h: 2.3 });
    s.addShape(pptx.ShapeType.rect, { x: cx, y, w: 3.9, h: 0.07, fill: { color: col }, line: { width: 0 } });
    s.addText(head, { x: cx + 0.25, y: y + 0.28, w: 3.4, h: 0.6, fontFace: F, fontSize: 14, bold: true, color: C.ink, valign: 'top', lineSpacingMultiple: 1.15 });
    s.addText(sub, { x: cx + 0.25, y: y + 0.95, w: 3.4, h: 1.2, fontFace: F, fontSize: 10.5, color: C.body, valign: 'top', lineSpacingMultiple: 1.3 });
    cx += 4.1;
  });

  s.addText('And here is what nobody else is saying', { x: M, y: y + 2.55, w: CONTENT_W, h: 0.32, fontFace: F, fontSize: 15, bold: true, color: C.ink });
  s.addText(
    'We read every live ad across Meta, Google, LinkedIn and TikTok for you and four competitors. DocuSign has walked away from the small business signing message: their 360 Meta ads sell agreement AI, research reports and virtual events. PandaDoc sells revenue operations. SignNow sells compliance stories on LinkedIn. Nobody is running the simple line, sign a document today for a fraction of what DocuSign charges, to a small business.',
    { x: M, y: y + 2.92, w: CONTENT_W, h: 0.85, fontFace: F, fontSize: 11.5, color: C.body, valign: 'top', lineSpacingMultiple: 1.3 }
  );
  T.tag(s, { x: M, y: y + 3.72, w: CONTENT_W, text: 'PUBLIC AD LIBRARIES, captured 13 Sept 2026. Full teardown in the appendix' });
}

// =========================================================== 8. THE BUYER

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Audience',
    title: 'Three buyers we think you have, and eleven industries we cannot rank',
    kicker: 'These ICPs are our assumption, built from your pages and pricing. Correct them in the meeting and the media plan changes with them.',
  });

  const icps = [
    ['ICP 1', 'The switcher', 'An office manager, HR lead or operations person at a 5 to 50 person company who just received a DocuSign renewal quote. Buys on price and speed. Lands on your comparison pages.', 'Likely worth: Business plan, multiple seats'],
    ['ICP 2', 'The solo professional', 'A realtor, consultant, coach or contractor who needs one contract signed today. Arrives through a free tool or a contract template. Converts fast and stays small.', 'Likely worth: Light plan, one seat'],
    ['ICP 3', 'The embedder', 'A developer or product lead at a SaaS company who needs signing inside their own product. Compares signing APIs, not signing apps.', 'Likely worth: $275 a month and up'],
  ];
  let ix = M;
  icps.forEach(([tagTxt, name, desc, worth]) => {
    T.card(pptx, s, { x: ix, y, w: 3.9, h: 2.15 });
    s.addText(tagTxt, { x: ix + 0.25, y: y + 0.18, w: 3.4, h: 0.22, fontFace: F, fontSize: 9, bold: true, charSpacing: 1.1, color: C.deepd });
    s.addText(name, { x: ix + 0.25, y: y + 0.42, w: 3.4, h: 0.3, fontFace: F, fontSize: 15, bold: true, color: C.ink });
    s.addText(desc, { x: ix + 0.25, y: y + 0.78, w: 3.4, h: 0.95, fontFace: F, fontSize: 10.5, color: C.body, valign: 'top', lineSpacingMultiple: 1.28 });
    s.addText(worth, { x: ix + 0.25, y: y + 1.76, w: 3.4, h: 0.25, fontFace: F, fontSize: 9.5, bold: true, color: C.deepd });
    ix += 4.1;
  });
  T.tag(s, { x: M, y: y + 2.22, w: CONTENT_W, text: 'ASSUMPTION, built from published pricing and page structure, not from your data' });

  T.calloutBox(pptx, s, {
    x: M, y: y + 2.55, w: CONTENT_W, h: 1.15,
    label: 'The ask that changes the budget',
    text: 'You publish eleven industry pages: accounting, education, finance and banking, healthcare, HR and payroll, insurance, legal, manufacturing, nonprofits, real estate and SaaS. At $20,000 a month, eleven industries means none of them gets a real budget. Can you tier them into the ones that drive revenue today, the ones that are growing, and the ones that are aspiration?',
  });
}

// =========================================================== 9. SELF SERVE JOURNEY

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'User journey, part one',
    title: 'The self serve path, as we walked it',
    kicker: 'Jordan created an account on 13 September. Signup took one click through Google, with no email verification step and no form.',
  });

  const ny = y + 0.35, nh = 0.95, nw = 1.53, gap = 0.22;
  const steps = [
    ['Ad or organic click', 'Search, mostly', 'verified'],
    ['Landing page', 'Comparison, tool or home', 'verified'],
    ['Signup', 'One click, Google OAuth', 'verified'],
    ['In the app', 'No verification step seen', 'verified'],
    ['First document sent', 'Activation, undefined', 'assumed'],
    ['3 document ceiling', 'Free plan limit', 'verified'],
    ['Upgrade to paid', 'Light or Business', 'assumed'],
  ];
  let nx = M;
  steps.forEach((st, i) => {
    T.node(pptx, s, { x: nx, y: ny, w: nw, h: nh, title: st[0], sub: st[1], kind: st[2] });
    if (i < steps.length - 1) T.arrow(pptx, s, { x: nx + nw + 0.04, y: ny + nh / 2 - 0.08, w: gap - 0.08 });
    nx += nw + gap;
  });

  s.addText('Solid border, verified by walking it.   Dashed border, our assumption.', {
    x: M, y: ny + nh + 0.12, w: CONTENT_W, h: 0.24, fontFace: F, fontSize: 9.5, color: C.slate,
  });

  s.addText('Where we think it leaks', { x: M, y: ny + nh + 0.55, w: 6.2, h: 0.3, fontFace: F, fontSize: 15, bold: true, color: C.ink });
  s.addText([
    { text: 'Between landing page and signup, on every page that has no signup button. That is slides 11 and 12.', options: { bullet: true } },
    { text: 'Between signup and first document sent, because a one click signup is easy to do and easy to abandon.', options: { bullet: true } },
    { text: 'Between the 3 document ceiling and upgrade, which is the only step that produces revenue.', options: { bullet: true } },
  ], { x: M, y: ny + nh + 0.92, w: 6.2, h: 1.3, fontFace: F, fontSize: 11, color: C.body, lineSpacingMultiple: 1.3, valign: 'top' });

  T.calloutBox(pptx, s, {
    x: M + 6.5, y: ny + nh + 0.55, w: 5.6, h: 1.7,
    label: 'Question for Henry',
    text: 'Which of those three is the biggest drop off, and do you measure all three? One click signup through Google is excellent for volume and it means you learn almost nothing about the user at the moment they arrive.',
  });
}

// =========================================================== 10. SALES ASSISTED JOURNEY

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'User journey, part two',
    title: 'The sales assisted path, as we assume it works',
    kicker: 'Every box on this map is a guess. Your demo request form is rendered by JavaScript so we could not read its fields. Correct this map in the meeting and we will redraw it.',
  });

  const ny = y + 0.3, nh = 0.95, nw = 1.53, gap = 0.22;
  const steps = [
    ['Enterprise or API intent', 'Pricing, API, industry pages', 'assumed'],
    ['Demo request', '/demo-request/ exists', 'verified'],
    ['Form submitted', 'Fields unknown', 'assumed'],
    ['CRM record', 'HubSpot, we think', 'assumed'],
    ['Human follow up', 'Owner and speed unknown', 'assumed'],
    ['Technical evaluation', 'Sandbox or API key', 'assumed'],
    ['Contract and onboarding', 'Enterprise or API plan', 'assumed'],
  ];
  let nx = M;
  steps.forEach((st, i) => {
    T.node(pptx, s, { x: nx, y: ny, w: nw, h: nh, title: st[0], sub: st[1], kind: st[2] });
    if (i < steps.length - 1) T.arrow(pptx, s, { x: nx + nw + 0.04, y: ny + nh / 2 - 0.08, w: gap - 0.08 });
    nx += nw + gap;
  });
  T.tag(s, { x: M, y: ny + nh + 0.12, w: CONTENT_W, text: 'ASSUMPTION, every step except the demo request page itself' });

  s.addText('What we noticed anyway', { x: M, y: ny + nh + 0.5, w: 6.2, h: 0.3, fontFace: F, fontSize: 15, bold: true, color: C.ink });
  s.addText([
    { text: 'HubSpot loads on your homepage and pricing page, and not on the demo request page. That is the one page where a sales lead gets created.', options: { bullet: true } },
    { text: 'Two Google Tag Manager containers fire on the demo request page, which risks counting the same submission twice.', options: { bullet: true } },
    { text: 'Enterprise pricing is gated behind sales contact, so this path carries your largest deals.', options: { bullet: true } },
  ], { x: M, y: ny + nh + 0.87, w: 6.2, h: 1.4, fontFace: F, fontSize: 11, color: C.body, lineSpacingMultiple: 1.3, valign: 'top' });

  T.calloutBox(pptx, s, {
    x: M + 6.5, y: ny + nh + 0.5, w: 5.6, h: 1.75,
    label: 'Questions for Henry',
    text: 'Walk us through what happens after someone clicks talk to sales. Who picks it up, how fast, and what happens next? And where does the biggest drop off sit on this path, compared with the self serve one?',
  });
}

// =========================================================== 11. THE MONEY SLIDE

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Where the search money lands',
    title: 'Two comparison pages have no way to sign up, and they are the two that matter most',
    kicker: 'We loaded all six comparison pages in a browser, scrolled each one end to end, and looked for any control that leads to signup. Four of them have one. Two do not.',
  });

  // 8a forbids the strikethrough in a deck (device budget stays with proposals),
  // so the argument is made as a plain two line statement.
  s.addText('You already solved this on four pages.', {
    x: M, y: y + 0.02, w: 6.9, h: 0.36, fontFace: F, fontSize: px(24), bold: true, color: C.sec, valign: 'middle',
  });
  s.addText('The two missing are DocuSign and Adobe.', {
    x: M, y: y + 0.38, w: 6.9, h: 0.42, fontFace: F, fontSize: px(28), bold: true, color: C.ink, valign: 'middle',
  });

  const none = { color: C.error, bold: true };
  const has = { color: C.success };
  T.table(pptx, s, {
    x: M, y: y + 0.95, w: 6.9,
    cols: [{ label: 'Comparison page', w: 33 }, { label: 'Page length', w: 17, align: 'right' }, { label: 'Route to signup', w: 50 }],
    rows: [
      [{ text: '/docusign-alternative/', options: { bold: true, color: C.ink } }, { text: '10,625 px', options: { align: 'right' } }, { text: 'None anywhere on the page', options: none }],
      [{ text: '/adobe-sign-alternative/', options: { bold: true, color: C.ink } }, { text: '9,109 px', options: { align: 'right' } }, { text: 'None anywhere on the page', options: none }],
      ['/signnow-alternative/', { text: '9,486 px', options: { align: 'right' } }, { text: 'Create your free account today', options: has }],
      ['/signable-alternative/', { text: '9,564 px', options: { align: 'right' } }, { text: 'Get started for free', options: has }],
      ['/hellosign-alternative/', { text: '9,236 px', options: { align: 'right' } }, { text: 'Sign my documents', options: has }],
      ['/dochub-alternative/', { text: '6,184 px', options: { align: 'right' } }, { text: 'Sign my documents', options: has }],
    ],
    fontSize: 10.5, rowH: 0.34,
  });
  T.tag(s, { x: M, y: y + 3.36, w: 6.9, text: 'RENDERED DOM, headless browser, full scroll, 13 Sept 2026. Confirmed on screen by Jordan' });

  const bx = M + 7.3;
  s.addText('Why these two and not the other four', { x: bx, y: y + 0.95, w: 4.8, h: 0.55, fontFace: F, fontSize: 15, bold: true, color: C.ink, valign: 'top', lineSpacingMultiple: 1.15 });
  s.addText(
    'DocuSign is the brand your customers are leaving, and Adobe is the second. Between them they own the category.\n\n' +
    'Somebody typing docusign alternative has already decided to switch. Your page makes the argument well, then offers them Log in.',
    { x: bx, y: y + 1.58, w: 4.8, h: 1.55, fontFace: F, fontSize: 11.5, color: C.body, valign: 'top', lineSpacingMultiple: 1.3 }
  );
  T.calloutBox(pptx, s, {
    x: bx, y: y + 3.28, w: 4.8, h: 1.0,
    label: 'What we would do first',
    text: 'Copy the control you already use on the SignNow page onto the DocuSign and Adobe pages, then measure it. No new design, no media cost, and it is the highest leverage change on this list.',
  });
}

// =========================================================== 12. THE FREE TOOLS

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'The free tools',
    title: 'The tools ask for nothing until the work is done. One asks for nothing at all',
    kicker: 'Your free tools let people finish the job without an account, which is exactly what your own ads promise. That is a deliberate choice, so the question is what happens next rather than whether the button is missing.',
  });

  T.table(pptx, s, {
    x: M, y: y + 0.02, w: CONTENT_W,
    cols: [
      { label: 'Tool', w: 24 },
      { label: 'What the user gets', w: 25 },
      { label: 'Where the signup offer sits', w: 30 },
      { label: 'Read', w: 21 },
    ],
    rows: [
      ['/sign-pdf/', 'Signs a PDF, no account', 'A Google signup form exists in the page but is hidden on arrival. It surfaces once the user acts', { text: 'Tool first, offer later', options: { color: C.warning, bold: true } }],
      ['/sign-documents-online/', 'Sends a document for signature', 'Same pattern. Hidden Google signup form, revealed after the user acts', { text: 'Tool first, offer later', options: { color: C.warning, bold: true } }],
      ['/online-signature/ plus draw and type', 'Downloads a signature image', 'Appears only once the signature is finished', { text: 'Tool first, offer later', options: { color: C.warning, bold: true } }],
      ['/contracts/ and 41 templates', 'Downloads a contract template', 'Nowhere. No signup link anywhere on a 17,866 px page', { text: 'Nothing at all', options: { color: C.error, bold: true } }],
    ],
    fontSize: 10.5, rowH: 0.52,
  });
  T.tag(s, { x: M, y: y + 2.72, w: CONTENT_W, text: 'RENDERED DOM, headless browser, full scroll, 13 Sept 2026' });

  s.addText('The two questions this raises', { x: M, y: y + 3.08, w: 5.9, h: 0.3, fontFace: F, fontSize: 15, bold: true, color: C.ink });
  s.addText(
    'When that prompt appears after the work, does it fire a tracked event? And does anyone follow up with the people who finished a document and never took an account? Neither is visible from outside.',
    { x: M, y: y + 3.43, w: 5.9, h: 0.75, fontFace: F, fontSize: 11.5, color: C.body, valign: 'top', lineSpacingMultiple: 1.3 }
  );
  T.calloutBox(pptx, s, {
    x: M + 6.2, y: y + 3.08, w: 5.9, h: 1.1,
    label: 'The opportunity either way',
    text: 'This traffic is already paid for and it has already shown intent by signing something. Retargeting a person who just finished a document is the cheapest paid social audience available to you, and it needs no new demand created.',
  });
}

// =========================================================== 13. TRACKING

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Tracking',
    title: 'The foundation is half built, and somebody already did the hard part',
    kicker: 'Read from your page source on the homepage, the pricing page and the demo request page. We could not see GTM container contents, so some of this fires in ways we cannot verify from outside.',
  });

  T.table(pptx, s, {
    x: M, y: y + 0.02, w: 6.6,
    cols: [{ label: 'Tag', w: 40 }, { label: 'Home', w: 20, align: 'center' }, { label: 'Pricing', w: 20, align: 'center' }, { label: 'Demo request', w: 20, align: 'center' }],
    rows: [
      ['GA4  G-XSY8RPYZ51', { text: 'Yes', options: { align: 'center' } }, { text: 'Yes', options: { align: 'center' } }, { text: 'Yes', options: { align: 'center' } }],
      ['GTM  GTM-MV48XB3B', { text: 'Yes', options: { align: 'center' } }, { text: 'Yes', options: { align: 'center' } }, { text: 'Yes', options: { align: 'center' } }],
      ['GTM  GTM-MHKC8Q4', { text: 'No', options: { align: 'center', color: C.slate } }, { text: 'No', options: { align: 'center', color: C.slate } }, { text: 'Yes', options: { align: 'center', color: C.warning, bold: true } }],
      ['Meta pixel', { text: 'Yes', options: { align: 'center' } }, { text: 'Yes', options: { align: 'center' } }, { text: 'Yes', options: { align: 'center' } }],
      ['HubSpot', { text: 'Yes', options: { align: 'center' } }, { text: 'Yes', options: { align: 'center' } }, { text: 'No', options: { align: 'center', color: C.error, bold: true } }],
      ['Microsoft Clarity', { text: 'Yes', options: { align: 'center' } }, { text: 'No', options: { align: 'center', color: C.warning } }, { text: 'No', options: { align: 'center', color: C.warning } }],
      ['Hotjar', { text: 'Yes', options: { align: 'center' } }, { text: 'Yes', options: { align: 'center' } }, { text: 'Yes', options: { align: 'center' } }],
    ],
    fontSize: 10.5, rowH: 0.31,
  });
  T.tag(s, { x: M, y: y + 2.62, w: 6.6, text: 'SERVED HTML, read 13 Sept 2026. LinkedIn and Microsoft pixels fire through GTM' });

  const bx = M + 7.0;
  s.addText('The detail worth the whole slide', { x: bx, y: y + 0.02, w: 5.1, h: 0.32, fontFace: F, fontSize: 15, bold: true, color: C.ink });
  s.addText(
    'Every page writes the GA4 client ID into a first party cookie named ga_client_id, with a two year expiry, retrying up to ten times until it gets one.\n\n' +
    'Nobody does that by accident. It was built so a signup recorded in your backend can be matched to the web session that produced it.',
    { x: bx, y: y + 0.42, w: 5.1, h: 1.75, fontFace: F, fontSize: 11.5, color: C.body, valign: 'top', lineSpacingMultiple: 1.3 }
  );
  T.calloutBox(pptx, s, {
    x: bx, y: y + 2.25, w: 5.1, h: 1.35,
    label: 'Question for Henry',
    text: 'Where does that cookie go after someone signs up? If it reaches your database, importing real conversions back into Google and Meta is a short job. If it was built and never wired up, it is the highest leverage fix on this list.',
  });
  s.addText('Three hygiene items: two GTM containers on one page, two session recording tools running in parallel, and HubSpot missing from the page where sales leads are created.', {
    x: bx, y: y + 3.75, w: 5.1, h: 0.7, fontFace: F, fontSize: 10.5, italic: true, color: C.sec, valign: 'top', lineSpacingMultiple: 1.25,
  });
}

// =========================================================== 14. THE MIGRATION

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'The migration',
    title: 'What moves to your accounts, and what stays behind',
    kicker: 'Lawrence told us the last agency built your campaigns inside their own accounts. This is the part of the brief with a real cost attached, and it should be said out loud before anyone signs anything.',
  });

  T.card(pptx, s, { x: M, y, w: 5.9, h: 2.35, fill: '10241E' });
  s.addText('WHAT COMES ACROSS', { x: M + 0.25, y: y + 0.18, w: 5.4, h: 0.25, fontFace: F, fontSize: 10, bold: true, charSpacing: 1.1, color: C.success });
  s.addText([
    { text: 'Keyword lists, ad copy and campaign structure, rebuilt from exports', options: { bullet: true } },
    { text: 'Landing pages, because they are yours already', options: { bullet: true } },
    { text: 'Historical reporting, if they hand over exports before the account closes', options: { bullet: true } },
    { text: 'Customer lists you hold, for Customer Match and lookalikes', options: { bullet: true } },
    { text: 'GA4 history, which lives in your property and not theirs', options: { bullet: true } },
  ], { x: M + 0.25, y: y + 0.52, w: 5.4, h: 1.7, fontFace: F, fontSize: 11, color: C.body, lineSpacingMultiple: 1.3, valign: 'top' });

  T.card(pptx, s, { x: M + 6.2, y, w: 5.9, h: 2.35, fill: '2A1618' });
  s.addText('WHAT STAYS BEHIND', { x: M + 6.45, y: y + 0.18, w: 5.4, h: 0.25, fontFace: F, fontSize: 10, bold: true, charSpacing: 1.1, color: C.error });
  s.addText([
    { text: 'Conversion history, which is what automated bidding learns from', options: { bullet: true } },
    { text: 'Quality Score history on every keyword', options: { bullet: true } },
    { text: 'Campaign learning, so every new campaign starts cold', options: { bullet: true } },
    { text: 'Remarketing audiences built inside their accounts', options: { bullet: true } },
    { text: 'Ad strength and account level signals Google holds internally', options: { bullet: true } },
  ], { x: M + 6.45, y: y + 0.52, w: 5.4, h: 1.7, fontFace: F, fontSize: 11, color: C.body, lineSpacingMultiple: 1.3, valign: 'top' });

  T.calloutBox(pptx, s, {
    x: M, y: y + 2.6, w: CONTENT_W, h: 1.3,
    label: 'What this means in practice',
    text: 'Expect a rebuild period while new campaigns gather enough conversions for automated bidding to work. On a lower ACV product with decent volume that is usually weeks rather than months, and it is still a real cost. We would run the first phase on manual or maximize clicks with tight controls, then hand over to automated bidding once the conversion data supports it. Any agency telling you the accounts will lift and shift cleanly is either mistaken or has not done this before.',
  });
}

// =========================================================== 15. SEO, AEO, GEO

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Organic and answer engines',
    title: 'Strong content, thin markup, and a real head start on AI search',
    kicker: 'A quick read rather than a full audit. Paid and organic compete for the same landing pages, so what happens here changes what paid search costs.',
  });

  const quads = [
    ['On page', 'Titles and descriptions are clean. Your homepage claims 40% faster, your DocuSign page claims 60%. Pick one.', C.blue],
    ['Technical', '102 URLs in the main sitemap, 212 blog posts kept current. 41 contract templates last touched in July 2021. One malformed URL at /industries/industries/.', C.orange],
    ['Off page and content', '212 posts, 15 case studies, ebooks and webinars. This is a working content engine and most competitors your size do not have one.', C.teal],
    ['AEO and GEO', 'robots.txt opts into AI training and AI search. Deep links fire a written evaluation prompt into Perplexity and Google AI Mode. An /mcp/ page lets people sign inside an AI chat.', C.purple],
  ];
  let qx = M, qy = y;
  quads.forEach((q, i) => {
    const x = M + (i % 2) * 6.2;
    const yy = y + Math.floor(i / 2) * 1.5;
    T.card(pptx, s, { x, y: yy, w: 5.9, h: 1.35 });
    s.addShape(pptx.ShapeType.rect, { x, y: yy, w: 0.06, h: 1.35, fill: { color: q[2] }, line: { width: 0 } });
    s.addText(q[0], { x: x + 0.3, y: yy + 0.15, w: 5.4, h: 0.28, fontFace: F, fontSize: 13, bold: true, color: C.ink });
    s.addText(q[1], { x: x + 0.3, y: yy + 0.46, w: 5.35, h: 0.8, fontFace: F, fontSize: 10.5, color: C.body, valign: 'top', lineSpacingMultiple: 1.28 });
  });

  T.calloutBox(pptx, s, {
    x: M, y: y + 3.1, w: CONTENT_W, h: 0.85,
    label: 'The one gap worth fixing',
    text: 'Your homepage markup declares Organization and WebPage and stops there. No SoftwareApplication, no Product, no FAQPage, and no AggregateRating, while a 4.9 Capterra rating and a 4.8 G2 score sit on the page unmarked. Your content is written to be cited and your markup does not help a machine parse it.',
  });
}

// =========================================================== 16. THE STRATEGY

{
  const s = T.sectionOpener(pptx, {
    number: 'THE PLAN',
    title: 'Three jobs, one budget',
    kicker: 'Search defends and harvests the demand that already exists. Social creates new demand and rescues the traffic your free tools already earn. The site has to hold a signup path on every page paid traffic touches.',
    art: ART.stack,
  });
}

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Strategy',
    title: 'What each channel is actually for',
    kicker: 'Giving every channel the same job is how a $20,000 budget turns into three mediocre channels. These are three different jobs with three different measures.',
  });

  const jobs = [
    ['Paid search', 'Harvest and defend', 'People typing docusign alternative have already decided. Your job is to be there, answer fast, and give them somewhere to sign up. This keeps the bulk of the budget because the demand is real and it is being fought over.', 'Measured on: cost per qualified signup', C.blue],
    ['Paid social', 'Create demand and rescue traffic', 'Nobody browses Instagram wanting an eSignature tool. Two audiences do work: people whose DocuSign renewal is coming, and the people already on your site using free tools who never signed up.', 'Measured on: cost per qualified signup, at a higher tolerance while learning', C.teal],
    ['The site', 'Convert what the first two send', 'Two comparison pages with no signup route is a media problem before it is a web problem. Every dollar of search spend runs through the page it lands on.', 'Measured on: signup rate per landing page', C.purple],
  ];
  let jx = M;
  jobs.forEach(([name, job, desc, measure, col]) => {
    T.card(pptx, s, { x: jx, y, w: 3.9, h: 3.35 });
    s.addShape(pptx.ShapeType.rect, { x: jx, y, w: 3.9, h: 0.07, fill: { color: col }, line: { width: 0 } });
    s.addText(name, { x: jx + 0.25, y: y + 0.25, w: 3.4, h: 0.28, fontFace: F, fontSize: 11, bold: true, charSpacing: 0.8, color: C.deepd });
    s.addText(job, { x: jx + 0.25, y: y + 0.56, w: 3.4, h: 0.6, fontFace: F, fontSize: 17, bold: true, color: C.ink, valign: 'top', lineSpacingMultiple: 1.12 });
    s.addText(desc, { x: jx + 0.25, y: y + 1.3, w: 3.4, h: 1.4, fontFace: F, fontSize: 10.5, color: C.body, valign: 'top', lineSpacingMultiple: 1.3 });
    s.addText(measure, { x: jx + 0.25, y: y + 2.72, w: 3.4, h: 0.5, fontFace: F, fontSize: 10, bold: true, color: C.deepd, valign: 'top', lineSpacingMultiple: 1.2 });
    jx += 4.1;
  });
}

// =========================================================== 17. THE META WHITESPACE

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'The opening',
    title: 'Your category has left Meta empty, and you run 22 ads on Google',
    kicker: 'We read every live ad for you and four competitors across four platforms. Two numbers on this slide decide most of the paid social plan.',
  });

  T.table(pptx, s, {
    x: M, y: y + 0.02, w: 7.5,
    cols: [
      { label: 'Brand', w: 26 },
      { label: 'Meta, active', w: 19, align: 'right' },
      { label: 'Google', w: 18, align: 'right' },
      { label: 'LinkedIn', w: 18, align: 'right' },
      { label: 'TikTok', w: 19, align: 'right' },
    ],
    rows: [
      [{ text: 'SignWell', options: { bold: true, color: C.ink } }, { text: '0', options: { align: 'right', bold: true, color: C.error } }, { text: '22', options: { align: 'right', bold: true, color: C.error } }, { text: 'Not captured', options: { align: 'right', color: C.slate } }, { text: '0', options: { align: 'right' } }],
      ['DocuSign', { text: '~360', options: { align: 'right' } }, { text: '~3,000', options: { align: 'right' } }, { text: 'Not captured', options: { align: 'right', color: C.slate } }, { text: '0', options: { align: 'right' } }],
      ['PandaDoc', { text: '~120', options: { align: 'right' } }, { text: '~3,000', options: { align: 'right' } }, { text: 'Not captured', options: { align: 'right', color: C.slate } }, { text: '0', options: { align: 'right' } }],
      ['SignNow', { text: '0', options: { align: 'right' } }, { text: '~20,000', options: { align: 'right', bold: true } }, { text: '52', options: { align: 'right' } }, { text: '0', options: { align: 'right' } }],
      ['Dropbox Sign', { text: '0', options: { align: 'right' } }, { text: 'Not captured', options: { align: 'right', color: C.slate } }, { text: 'Not captured', options: { align: 'right', color: C.slate } }, { text: '0', options: { align: 'right' } }],
    ],
    fontSize: 10.5, rowH: 0.36,
  });
  T.tag(s, { x: M, y: y + 2.3, w: 7.5, text: 'PUBLIC AD LIBRARIES, captured 13 Sept 2026. Counts are the libraries own approximations' });

  const bx = M + 7.9;
  s.addText('Two of your four competitors run zero Meta ads.', { x: bx, y: y + 0.02, w: 4.2, h: 0.7, fontFace: F, fontSize: 16, bold: true, color: C.ink, valign: 'top', lineSpacingMultiple: 1.15 });
  s.addText(
    'The two who do are not selling signing. DocuSign sells agreement AI, research reports and virtual events. PandaDoc sells revenue operations to sales teams.\n\n' +
    'Nobody is telling a small business they can sign a document today for a fraction of what DocuSign charges.',
    { x: bx, y: y + 0.78, w: 4.2, h: 1.8, fontFace: F, fontSize: 11, color: C.body, valign: 'top', lineSpacingMultiple: 1.3 }
  );
  T.calloutBox(pptx, s, {
    x: bx, y: y + 2.62, w: 4.2, h: 1.55,
    label: 'The other number',
    text: 'You run 22 Google ads. SignNow runs about 20,000 and DocuSign about 3,000. At $20,000 a month, 22 ads is not enough surface area to learn which message works.',
  });

  T.calloutBox(pptx, s, {
    x: M, y: y + 2.65, w: 7.5, h: 1.2,
    label: 'One more thing worth taking personally',
    text: 'DocuSign bids the word free in five languages, including "Free E-sign Online, Docusign for free", while having no free plan. You have a real free plan and you are not defending the word. That is the cheapest correction on this list.',
  });
}

// =========================================================== 18. MEDIA PLAN

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Media plan',
    title: 'How we would split $20,000 a month',
    kicker: 'Search keeps 65% because that is where the decided buyers are. Paid social gets 30%, which is enough to learn something rather than enough to produce a result nobody can read.',
  });

  s.addChart(pptx.ChartType.doughnut, [{
    name: 'Monthly budget share',
    labels: ['Google Search', 'Microsoft Search', 'Meta', 'LinkedIn', 'Test reserve'],
    values: [12000, 1000, 4000, 2000, 1000],
  }], {
    x: M - 0.15, y: y + 0.05, w: 4.3, h: 3.0,
    chartColors: [C.blue, '8FB0FA', C.teal, C.purple, C.slate],
    showLegend: true, legendPos: 'b', legendFontFace: F, legendFontSize: 10, legendColor: C.body,
    showValue: false, showPercent: true, dataLabelFontFace: F, dataLabelFontSize: 10,
    dataLabelColor: C.ink, holeSize: 52,
  });
  T.tag(s, { x: M - 0.15, y: y + 3.1, w: 4.3, text: 'PROPOSED ALLOCATION, media only, no Toggle fee included' });

  T.table(pptx, s, {
    x: M + 4.35, y: y + 0.05, w: 7.75,
    cols: [
      { label: 'Platform', w: 19 },
      { label: 'Monthly', w: 13, align: 'right' },
      { label: 'Share', w: 10, align: 'right' },
      { label: 'Campaign objectives', w: 58 },
    ],
    rows: [
      ['Google Search', '$12,000', '60%', 'Brand defense, competitor and alternative terms, high intent category terms, API and developer terms, tier one industry terms'],
      ['Microsoft Search', '$1,000', '5%', 'Mirror of the two strongest Google campaigns. Lower CPCs and an older desktop buyer'],
      ['Meta', '$4,000', '20%', 'Cold prospecting on the renewal switch, retargeting free tool and comparison page visitors, lookalikes from paying customers'],
      ['LinkedIn', '$2,000', '10%', 'Job title targeting for the API and embedded buyer, plus operations, HR and legal roles at tier one industries'],
      ['Test reserve', '$1,000', '5%', 'Held back, then given to whichever angle earns it in month one'],
      [{ text: 'Total media', options: { bold: true, color: C.ink } }, { text: '$20,000', options: { bold: true, color: C.ink, align: 'right' } }, { text: '100%', options: { bold: true, color: C.ink, align: 'right' } }, { text: 'Toggle fee discussed separately', options: { italic: true, color: C.sec } }],
    ],
    fontSize: 10, rowH: 0.48,
  });

  T.calloutBox(pptx, s, {
    x: M + 4.35, y: y + 3.82, w: 7.75, h: 0.7,
    label: 'The split we would revisit first',
    text: 'If your answer on qualified signups points at the API plan, developer and embedded terms deserve more than $1,800 of the search budget and LinkedIn deserves more than $2,000.',
  });
}

// =========================================================== 19. PAID SOCIAL

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Paid social',
    title: 'Three angles, and what each one settles',
    kicker: 'Paid social is new for you, so every angle here is a test with a result you can act on rather than a campaign that just runs.',
  });

  const angles = [
    ['01', 'The renewal moment', 'Meta, cold', 'Your whole organic demand is people searching for a DocuSign alternative, and that search happens because a renewal quote landed. DocuSign no longer defends this ground on Meta. Their ads sell agreement AI to enterprises.', 'Settles: whether we can create switching demand instead of waiting for it', C.blue],
    ['02', 'The free tool rescue', 'Meta, retargeting', 'Somebody just drew a signature on your site and left. They have a document to sign and no account. This audience costs nothing to build, is already warm, and needs no new demand created.', 'Settles: what your existing unconverted traffic is actually worth', C.teal],
    ['03', 'Compliance, told as a customer story', 'LinkedIn', 'SignNow runs 52 LinkedIn ads, every one a story about replacing DocuSign for compliance reasons in one regulated vertical. You have compliance on every plan including free, and 14 published customer stories, and none of it runs.', 'Settles: whether your strongest differentiator sells on social', C.purple],
  ];
  let ax = M;
  angles.forEach(([n, name, platform, desc, settles, col]) => {
    T.card(pptx, s, { x: ax, y, w: 3.9, h: 3.05 });
    s.addShape(pptx.ShapeType.rect, { x: ax, y, w: 3.9, h: 0.07, fill: { color: col }, line: { width: 0 } });
    s.addText(n, { x: ax + 0.25, y: y + 0.22, w: 0.5, h: 0.26, fontFace: F, fontSize: 13, bold: true, color: col });
    s.addText(platform, { x: ax + 0.8, y: y + 0.25, w: 2.85, h: 0.22, fontFace: F, fontSize: 9.5, bold: true, charSpacing: 0.8, color: C.sec, align: 'right' });
    s.addText(name, { x: ax + 0.25, y: y + 0.54, w: 3.4, h: 0.62, fontFace: F, fontSize: 16, bold: true, color: C.ink, valign: 'top', lineSpacingMultiple: 1.12 });
    s.addText(desc, { x: ax + 0.25, y: y + 1.22, w: 3.4, h: 1.35, fontFace: F, fontSize: 10, color: C.body, valign: 'top', lineSpacingMultiple: 1.28 });
    s.addText(settles, { x: ax + 0.25, y: y + 2.58, w: 3.4, h: 0.42, fontFace: F, fontSize: 9.5, bold: true, color: C.deepd, valign: 'top', lineSpacingMultiple: 1.2 });
    ax += 4.1;
  });

  T.calloutBox(pptx, s, {
    x: M, y: y + 3.2, w: CONTENT_W, h: 0.75,
    label: 'Why we would start with number two',
    text: 'It is the only one of the three that does not depend on creating demand. The people are already on your site, they already have a document to sign, and you already paid to get them there.',
  });
}

// =========================================================== 19. THE FORECAST

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Forecast',
    title: 'What we are not going to forecast tonight',
    kicker: 'You are choosing between three agencies. At least one of them will hand you a twelve month projection built on numbers nobody has. Here is the model we would use, and the five inputs it needs.',
  });

  const inputs = [
    ['01', 'Current cost per qualified signup'],
    ['02', 'Monthly qualified signup volume'],
    ['03', 'Free to paid conversion rate'],
    ['04', 'Average revenue per paid account'],
    ['05', 'Seat against API revenue mix'],
  ];
  s.addText('The five numbers we do not have', { x: M, y, w: 5.5, h: 0.32, fontFace: F, fontSize: 15, bold: true, color: C.ink });
  let iy = y + 0.45;
  inputs.forEach(([n, label]) => {
    s.addText(n, { x: M, y: iy, w: 0.45, h: 0.28, fontFace: F, fontSize: 12, bold: true, color: C.blue });
    s.addText(label, { x: M + 0.5, y: iy, w: 5.0, h: 0.28, fontFace: F, fontSize: 12.5, color: C.ink });
    iy += 0.42;
  });

  const bx = M + 6.0;
  T.card(pptx, s, { x: bx, y, w: 6.1, h: 2.0, fill: C.raised });
  s.addText('THE MODEL, READY TO RUN', { x: bx + 0.3, y: y + 0.2, w: 5.5, h: 0.24, fontFace: F, fontSize: 9.5, bold: true, charSpacing: 1.1, color: C.deepd });
  s.addText(
    'Spend  ÷  cost per click  =  clicks\n' +
    'Clicks  ×  landing page signup rate  =  signups\n' +
    'Signups  ×  free to paid rate  =  customers\n' +
    'Customers  ×  revenue per account  =  return',
    { x: bx + 0.3, y: y + 0.55, w: 5.5, h: 1.25, fontFace: 'Consolas', fontSize: 12, color: C.ink, valign: 'top', lineSpacingMultiple: 1.45 }
  );

  T.calloutBox(pptx, s, {
    x: bx, y: y + 2.2, w: 6.1, h: 1.4,
    label: 'What you get instead',
    text: 'Give us admin access to the accounts and your GA4 property, and you have a real forecast within five working days, with the assumptions written next to every number so you can argue with them. A forecast built tonight would be four guesses multiplied together, and you would find that out in month three.',
  });
}

// =========================================================== 20. QUESTIONS AND NEXT STEPS

{
  const s = pptx.addSlide();
  s.background = { color: C.canvas };
  T.watermark(s);
  s.addText('WHAT WE NEED FROM YOU', { x: M, y: TOP, w: 8.0, h: 0.26, fontFace: F, fontSize: TYPE.csk, bold: true, charSpacing: 1.4, color: C.deepd });
  s.addText('Seven things, and then we can be useful', {
    x: M, y: TOP + 0.3, w: 9.6, h: 0.62, fontFace: F, fontSize: TYPE.h1, bold: true, color: C.blue, valign: 'top', lineSpacingMultiple: 1.08,
  });

  const qs = [
    ['Goals and economics', 'What a qualified app signup means, and what it costs you today'],
    ['Audience', 'Your eleven industries, tiered. And which countries are in scope'],
    ['Journey', 'Where the biggest drop off sits, and what happens after talk to sales'],
    ['Tracking', 'Where the ga_client_id cookie goes, and what you want to see in twelve weeks'],
    ['The migration', 'How the old campaigns were built, and what actually comes across'],
    ['Channels', 'Which channel drives the most qualified signups today'],
    ['Process', 'Your decision timeline, and what would make us the obvious choice'],
  ];
  let qy = 1.62;
  qs.forEach(([head, sub]) => {
    s.addText(head, { x: M, y: qy, w: 2.45, h: 0.26, fontFace: F, fontSize: TYPE.bodyText, bold: true, color: C.deepd });
    s.addText(sub, { x: M + 2.55, y: qy, w: 6.3, h: 0.26, fontFace: F, fontSize: TYPE.bodyText, color: C.body });
    qy += 0.4;
  });

  T.calloutBox(pptx, s, {
    x: M, y: 4.55, w: 8.05, h: 1.12,
    label: 'Next steps',
    text: 'Admin access to the ad accounts and GA4, then a full account audit and a real forecast within five working days. In the meantime, the two missing comparison page signup controls cost nothing in media and can go live this week.',
  });

  // Close block, per the master: one person, one contact, loop-form.
  s.addText([
    { text: CONTACT.name, options: { bold: true, color: C.ink } },
    { text: '  ' + CONTACT.role, options: { bold: false, color: C.body } },
  ], { x: M, y: H - 1.12, w: 6, h: 0.3, fontFace: F, fontSize: TYPE.closeName });
  s.addText(CONTACT.email, {
    x: M, y: H - 0.82, w: 6, h: 0.28, fontFace: F, fontSize: TYPE.closeNum, bold: true, color: C.deepd,
  });
  s.addText(CONTACT.site, {
    x: M, y: H - 0.56, w: 6, h: 0.28, fontFace: F, fontSize: TYPE.closeNum, bold: true, color: C.deepd,
  });

  s.addImage({ path: ART.loop, x: 8.75, y: 1.95, w: 3.8, h: 3.1, sizing: { type: 'contain', w: 3.8, h: 3.1 } });
  T.pageNumber(s);
}

// =========================================================== APPENDIX

T.sectionOpener(pptx, {
  number: 'APPENDIX',
  title: 'The working, in full',
  kicker: 'The evidence behind every claim in the first twenty slides, plus the phasing, the event model and the full question bank.',
  art: ART.stack,
});

// A23. Meta teardown.
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Appendix, competitor ads',
    title: 'Meta: two competitors are there, and neither is selling signing',
    kicker: 'Every active ad in the Meta Ad Library for SignWell, DocuSign, PandaDoc, SignNow and Dropbox Sign, read on 13 September 2026.',
  });
  T.table(pptx, s, {
    x: M, y: y + 0.02, w: CONTENT_W,
    cols: [
      { label: 'Brand', w: 13 },
      { label: 'Active', w: 8, align: 'right' },
      { label: 'The message, in their words', w: 47 },
      { label: 'Format and timing', w: 32 },
    ],
    rows: [
      [{ text: 'SignWell', options: { bold: true, color: C.ink } }, { text: '0', options: { align: 'right', bold: true, color: C.error } }, { text: 'Nothing running', options: { color: C.error } }, ''],
      ['DocuSign', '~360', '"Leading research reveals a critical connection between trust and end-to-end agreement solutions." "Meet the AI-powered platform turning hours of work into seconds." "Discover how Docusign IAM helps teams find critical agreement data in minutes."', 'Static, video and carousel. Running since 1 April 2026 on Facebook, Instagram, Threads and Messenger. Regional pages for Australia, Brazil, France, Mexico, South Korea'],
      ['PandaDoc', '~120', '"Deal sign-off, already handled." "EOQ renewals, already handled." "Upcoming commitments, already handled." "Every bad handoff is a churn risk."', 'One template across the set, static plus one video. Nearly all started 14 August 2026, so this is a single coordinated launch'],
      ['SignNow', { text: '0', options: { align: 'right' } }, 'No ads match your search criteria', ''],
      ['Dropbox Sign', { text: '0', options: { align: 'right' } }, 'No ads match your search criteria', ''],
    ],
    fontSize: 9, rowH: 0.5, pad: 2,
  });
  T.calloutBox(pptx, s, {
    x: M, y: y + 3.42, w: CONTENT_W, h: 0.9,
    label: 'The gap',
    text: 'DocuSign sells an enterprise AI platform. PandaDoc sells revenue operations to sales teams. Neither is talking to a person who just needs a document signed and does not want to pay $40 a seat. That message is uncontested on Meta, and it is the one you are best placed to make.',
  });
}

// A24. Google teardown.
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Appendix, competitor ads',
    title: 'Google: you are outgunned on volume by roughly a thousand to one',
    kicker: 'From the Google Ads Transparency Center, read on 13 September 2026. Counts are the library’s own approximations.',
  });
  T.table(pptx, s, {
    x: M, y: y + 0.02, w: CONTENT_W,
    cols: [
      { label: 'Brand', w: 13 },
      { label: 'Ads', w: 10, align: 'right' },
      { label: 'Headlines, in their words', w: 47 },
      { label: 'What it tells us', w: 30 },
    ],
    rows: [
      [{ text: 'SignWell', options: { bold: true, color: C.ink } }, { text: '22', options: { align: 'right', bold: true, color: C.error } }, '"No Account Needed to Sign, Free and Takes Under a Minute." "eSign API, Start for Free, Clean Docs. Simple Setup." "Sign Contracts Online, Sign. Send. Done." Plus a branded login ad', 'The copy is good. There is not enough of it to learn anything at $20,000 a month'],
      ['DocuSign', '~3,000', '"Free E-sign Online, Docusign for free." "Kostenlose Signaturen online." "Enjoy a 30-Day Free Trial, Save an Average of $36 Per Document Compared to Paper Processes."', 'They bid the word free in five languages and have no free plan. You do, and you are not defending it'],
      ['PandaDoc', '~3,000', '"Grow Faster with PandaDoc." "Make a Switch to PandaDoc, Trusted by 40,000 Businesses." "PandaDoc Quote Software." Request a demo today', 'Social proof plus a switching message, pointed at a demo rather than a signup'],
      ['SignNow', '~20,000', '"Legal eSignatures in India." "Legal eSignatures in Australia." "No per envelope pricing. No hidden costs." "More intuitive than competitors."', 'A programmatic geo split at scale, run by airSlate. This is what a fully built search account looks like'],
    ],
    fontSize: 9, rowH: 0.5, pad: 2,
  });
  T.calloutBox(pptx, s, {
    x: M, y: y + 3.2, w: CONTENT_W, h: 0.85,
    label: 'A caution on landing pages',
    text: 'Your ads display signwell.com/esignature and signwell.com/esignature/contracts. Neither path resolves, so those are display paths rather than real destinations. Nobody outside your account can tell where the money lands, which is a question for Henry rather than a finding.',
  });
}

// A25. LinkedIn and TikTok teardown.
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Appendix, competitor ads',
    title: 'LinkedIn and TikTok: one competitor is running your playbook',
    kicker: 'SignNow runs 52 LinkedIn ads. Every one of them is a customer story about replacing DocuSign, aimed at a single regulated vertical.',
  });

  T.card(pptx, s, { x: M, y, w: 7.4, h: 2.6 });
  s.addText('WHAT SIGNNOW RUNS ON LINKEDIN', { x: M + 0.25, y: y + 0.18, w: 6.9, h: 0.25, fontFace: F, fontSize: 10, bold: true, charSpacing: 1.1, color: C.deepd });
  s.addText([
    { text: '"We were looking for a replacement for DocuSign. What Ora Clinical needed instead: Part 11 compliance, a real audit trail."', options: { bullet: true } },
    { text: '"Why Ora Clinical replaced DocuSign for clinical trials."', options: { bullet: true } },
    { text: '"150 people at one CRO, one searchable audit trail."', options: { bullet: true } },
    { text: '"How a 600-person CRO keeps every trial signature Part 11 ready."', options: { bullet: true } },
  ], { x: M + 0.25, y: y + 0.52, w: 6.9, h: 1.4, fontFace: F, fontSize: 10.5, color: C.body, lineSpacingMultiple: 1.32, valign: 'top' });
  s.addText('One vertical, one competitor named, one compliance standard, one customer. Repeated 52 times.', {
    x: M + 0.25, y: y + 2.0, w: 6.9, h: 0.45, fontFace: F, fontSize: 10.5, italic: true, color: C.sec, valign: 'top', lineSpacingMultiple: 1.25,
  });

  T.card(pptx, s, { x: M + 7.7, y, w: 4.4, h: 2.6, fill: C.card });
  s.addText('TIKTOK', { x: M + 7.95, y: y + 0.18, w: 3.9, h: 0.25, fontFace: F, fontSize: 10, bold: true, charSpacing: 1.1, color: C.sec });
  s.addText(
    'No ads from SignWell and no ads from any competitor.\n\nThe category does not use the platform, so there is no first mover argument here worth $20,000 of anyone’s budget. We would not recommend it.',
    { x: M + 7.95, y: y + 0.52, w: 3.9, h: 1.9, fontFace: F, fontSize: 11, color: C.body, valign: 'top', lineSpacingMultiple: 1.3 }
  );

  T.calloutBox(pptx, s, {
    x: M, y: y + 2.85, w: CONTENT_W, h: 1.0,
    label: 'Why this matters more than the Meta slide',
    text: 'SignNow is proving that compliance plus a named DocuSign switch plus a real customer sells on LinkedIn. You have compliance on every plan including the free one, which SignNow does not, and 14 published customer stories. You are better equipped to run this campaign than the company currently running it.',
  });
  T.tag(s, { x: M, y: y + 3.95, w: CONTENT_W, text: 'LINKEDIN AD LIBRARY and TIKTOK AD LIBRARY, captured 13 Sept 2026. LinkedIn counts for the other three brands not captured' });
}

// A26. The full conversion sweep.
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Appendix, evidence',
    title: 'The conversion sweep, every page we checked',
    kicker: 'Each page was loaded in a headless browser, scrolled from top to bottom so anything lazy had rendered, then searched for every visible control leading to a signup route. Reading the HTML alone was not enough: several of these pages inject the control with JavaScript.',
  });
  const yes = (t) => ({ text: t, options: { color: C.success } });
  const no = { text: 'None', options: { color: C.error, bold: true } };
  T.table(pptx, s, {
    x: M, y: y + 0.02, w: CONTENT_W,
    cols: [
      { label: 'Page', w: 38 },
      { label: 'Page length', w: 13, align: 'right' },
      { label: 'Route to signup, as rendered', w: 49 },
    ],
    rows: [
      [{ text: '/docusign-alternative/', options: { bold: true, color: C.ink } }, { text: '10,625 px', options: { align: 'right' } }, no],
      [{ text: '/adobe-sign-alternative/', options: { bold: true, color: C.ink } }, { text: '9,109 px', options: { align: 'right' } }, no],
      ['/signnow-alternative/', { text: '9,486 px', options: { align: 'right' } }, yes('Create your free account today, plus Sign my documents')],
      ['/signable-alternative/', { text: '9,564 px', options: { align: 'right' } }, yes('Get started for free')],
      ['/hellosign-alternative/', { text: '9,236 px', options: { align: 'right' } }, yes('Sign my documents')],
      ['/dochub-alternative/', { text: '6,184 px', options: { align: 'right' } }, yes('Sign my documents')],
      ['/electronic-signature/', { text: '14,147 px', options: { align: 'right' } }, yes('Start for free, twice in the body')],
      ['/industries/healthcare/', { text: '10,478 px', options: { align: 'right' } }, yes('Start for free, no sales call required')],
      ['/industries/real-estate-and-property-management/', { text: '9,001 px', options: { align: 'right' } }, no],
      ['/signwell-for-startups/', { text: '6,885 px', options: { align: 'right' } }, no],
      ['/sign-pdf/', { text: '9,397 px', options: { align: 'right' } }, { text: 'Google signup form present but hidden until the user acts', options: { color: C.warning } }],
      ['/sign-documents-online/', { text: '7,367 px', options: { align: 'right' } }, { text: 'Google signup form present but hidden until the user acts', options: { color: C.warning } }],
      ['/online-signature/', { text: '8,500 px', options: { align: 'right' } }, { text: 'Appears after the signature is finished', options: { color: C.warning } }],
      ['/contracts/ and its 41 templates', { text: '17,866 px', options: { align: 'right' } }, no],
    ],
    fontSize: 9.5, rowH: 0.24, pad: 2,
  });
  T.tag(s, { x: M, y: y + 3.75, w: CONTENT_W, text: 'RENDERED DOM, headless Chromium at 1440 x 900, full scroll, 13 Sept 2026' });

  T.calloutBox(pptx, s, {
    x: M, y: y + 4.05, w: CONTENT_W, h: 0.72,
    label: 'Why we read the rendered page, not the HTML',
    text: 'Four of these pages inject their signup control with JavaScript, so an audit that only read the served HTML would have reported them as missing. Every row above was read from the page as a visitor actually sees it.',
  });
}

// A27. The event model.
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Appendix, tracking',
    title: 'The event model we would instrument',
    kicker: 'One conversion action per commercial outcome, each with a value, so automated bidding chases revenue rather than volume.',
  });
  T.table(pptx, s, {
    x: M, y: y + 0.02, w: CONTENT_W,
    cols: [
      { label: 'Event', w: 20 },
      { label: 'Fires when', w: 30 },
      { label: 'Value', w: 16 },
      { label: 'Used for', w: 34 },
    ],
    rows: [
      ['free_signup', 'Account created, any route', 'Low, fixed', 'Volume signal and audience building, not the bidding target'],
      ['activated', 'First document sent for signature', 'Medium, fixed', 'The real top of funnel target. This is the first honest sign of intent'],
      ['paid_conversion', 'First payment on Light or Business', 'Actual plan value', 'The primary bidding target for seat campaigns'],
      ['api_signup', 'Developer account created', 'High, fixed', 'Separate conversion, so developer campaigns are never judged on seat economics'],
      ['api_paid', 'First payment on the $275 plan', 'Actual plan value', 'The primary bidding target for developer and embedded campaigns'],
      ['demo_request', 'Demo form submitted', 'High, fixed', 'Enterprise path. Imported back from the CRM once qualified'],
      ['tool_completed', 'Signature drawn or typed and downloaded', 'None', 'Retargeting audience only. Never a conversion'],
    ],
    fontSize: 10, rowH: 0.42,
  });
  T.calloutBox(pptx, s, {
    x: M, y: y + 3.72, w: CONTENT_W, h: 0.75,
    label: 'What makes this possible',
    text: 'The ga_client_id cookie you already write. Match it to the signup record in your database and every event above can be imported back into Google and Meta with its real value attached.',
  });
}

// A28 to A30. Phasing.
{
  const phases = [
    ['The first 30 days', [
      'Take admin ownership of new Google Ads, Meta, LinkedIn and Microsoft accounts',
      'Audit the GTM setup, resolve the duplicate container and document every existing tag',
      'Instrument the event model, starting with free_signup, activated and paid_conversion',
      'Put a signup control onto the DocuSign and Adobe comparison pages and measure the change',
      'Rebuild search campaigns from exports, running manual or maximize clicks while data gathers',
      'Deliver the real forecast, with assumptions written next to every number',
    ]],
    ['Days 31 to 60', [
      'Move search to automated bidding once conversion volume supports it',
      'Launch Meta retargeting against free tool and comparison page audiences',
      'Launch the renewal switch angle on Meta as a cold prospecting test',
      'Launch LinkedIn job title targeting for the API and embedded buyer',
      'Add offline conversion import from the CRM for the demo and enterprise path',
      'First full monthly report, with Keep, Start and Stop',
    ]],
    ['Days 61 to 90', [
      'Read the paid social tests and move the test reserve to whichever angle earned it',
      'Expand search into tier one industry terms, once you have told us which those are',
      'Mirror the two strongest Google campaigns into Microsoft Ads',
      'Add schema markup to the pages paid traffic lands on, so organic and paid stop competing',
      'Build lookalikes from paying customers rather than from all signups',
      'Quarterly review, and a revised forecast against three months of real data',
    ]],
  ];
  phases.forEach(([title, items]) => {
    const { s, y } = T.content(pptx, {
      eyebrow: 'Appendix, phasing',
      title,
      kicker: 'Sequenced so nothing depends on data that does not exist yet.',
    });
    let py = y + 0.15;
    items.forEach((it, i) => {
      s.addShape(pptx.ShapeType.roundRect, { x: M, y: py, w: 0.34, h: 0.34, rectRadius: 0.05, fill: { color: C.callout }, line: { width: 0 } });
      s.addText(String(i + 1), { x: M, y: py, w: 0.34, h: 0.34, fontFace: F, fontSize: 11, bold: true, color: C.deepd, align: 'center', valign: 'middle' });
      s.addText(it, { x: M + 0.5, y: py + 0.02, w: 11.5, h: 0.3, fontFace: F, fontSize: 12.5, color: C.body, valign: 'middle' });
      py += 0.52;
    });
  });
}

// A31. Reporting.
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Appendix, reporting',
    title: 'What you would get, and how often',
    kicker: 'Reporting is where most agency relationships quietly fail. These are the commitments, not the aspiration.',
  });
  T.table(pptx, s, {
    x: M, y: y + 0.02, w: CONTENT_W,
    cols: [{ label: 'Cadence', w: 16 }, { label: 'What it contains', w: 54 }, { label: 'Who it is for', w: 30 }],
    rows: [
      ['Weekly', 'Spend against pace, cost per qualified signup by campaign, anything that broke, anything we changed', 'Henry, in a message rather than a deck'],
      ['Monthly', 'Full performance against target, creative read, Keep, Start and Stop, next month plan', 'Henry and Lawrence, as a document'],
      ['Quarterly', 'Strategy review, forecast revised against actuals, channel mix reconsidered', 'Whoever owns the budget'],
      ['Always on', 'A live dashboard you can open without asking us', 'Anyone at SignWell'],
    ],
    fontSize: 11, rowH: 0.5,
  });
  T.calloutBox(pptx, s, {
    x: M, y: y + 2.35, w: CONTENT_W, h: 0.85,
    label: 'One commitment worth making explicit',
    text: 'If a test fails, the monthly report says so in the first paragraph rather than the appendix. On a lower ACV product the whole job is killing the expensive things quickly, and that only works if bad news travels fast.',
  });
}

// A32 and A33. SEO detail.
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Appendix, organic',
    title: 'Technical and on page detail',
    kicker: 'Read from robots.txt, both sitemaps and page source on 13 September 2026.',
  });
  T.table(pptx, s, {
    x: M, y: y + 0.02, w: CONTENT_W,
    cols: [{ label: 'What we checked', w: 26 }, { label: 'What we found', w: 48 }, { label: 'Read', w: 26 }],
    rows: [
      ['Main sitemap', '102 URLs. 41 contract templates, 11 industry pages, 7 comparison pages, 7 integration pages, 14 customer stories', 'Well structured'],
      ['Content sitemap', '212 blog posts, most recent 28 August 2026, plus 15 case studies, ebooks and webinars', 'A working content engine'],
      ['Stale content', 'All 41 contract templates carry a last modified date of July 2021', 'Five years untouched'],
      ['robots.txt', 'Content-Signal set to ai-train=yes, search=yes, ai-input=yes. App paths correctly disallowed', 'Deliberate and current'],
      ['Homepage schema', 'Organization, WebSite, WebPage, Person, PostalAddress, ContactPoint, DefinedTerm', 'Thin for a software product'],
      ['Missing schema', 'No SoftwareApplication, Product, Offer, FAQPage or AggregateRating', 'Forfeits review rich results'],
      ['Page weight', 'Homepage 169 KB of HTML in 1.94 seconds. Pricing page 309 KB', 'Heavy on the long pages'],
      ['Errors', 'A malformed URL exists at /industries/industries/', 'Minor, worth fixing'],
    ],
    fontSize: 10, rowH: 0.4,
  });
}

{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Appendix, answer engines',
    title: 'What you already do for AI search, and the one gap',
    kicker: 'You are further along here than most companies your size, which is why this is a short slide rather than a pitch.',
  });
  T.card(pptx, s, { x: M, y, w: 5.9, h: 2.6, fill: '10241E' });
  s.addText('ALREADY IN PLACE', { x: M + 0.25, y: y + 0.18, w: 5.4, h: 0.25, fontFace: F, fontSize: 10, bold: true, charSpacing: 1.1, color: C.success });
  s.addText([
    { text: 'robots.txt opts into AI training, AI search and AI input', options: { bullet: true } },
    { text: 'Deep links on the homepage and comparison pages fire a written evaluation prompt into Perplexity and Google AI Mode', options: { bullet: true } },
    { text: 'OpenAI, Gemini, Grok and Perplexity logos on the homepage', options: { bullet: true } },
    { text: 'An /mcp/ page so people can sign documents inside an AI chat, linked three times from the homepage', options: { bullet: true } },
  ], { x: M + 0.25, y: y + 0.52, w: 5.4, h: 1.95, fontFace: F, fontSize: 11, color: C.body, lineSpacingMultiple: 1.3, valign: 'top' });

  T.card(pptx, s, { x: M + 6.2, y, w: 5.9, h: 2.6, fill: '2A1F14' });
  s.addText('THE GAP', { x: M + 6.45, y: y + 0.18, w: 5.4, h: 0.25, fontFace: F, fontSize: 10, bold: true, charSpacing: 1.1, color: C.warning });
  s.addText([
    { text: 'No structured data that helps a machine parse what SignWell is, what it costs, or how it is rated', options: { bullet: true } },
    { text: 'A 4.9 Capterra rating and a 4.8 G2 score sit on the page as text, unmarked', options: { bullet: true } },
    { text: 'The 41 contract templates are exactly the kind of page AI answers cite, and they have not been touched since 2021', options: { bullet: true } },
    { text: 'None of this shows up in the paid media strategy yet', options: { bullet: true } },
  ], { x: M + 6.45, y: y + 0.52, w: 5.4, h: 1.95, fontFace: F, fontSize: 11, color: C.body, lineSpacingMultiple: 1.3, valign: 'top' });

  T.calloutBox(pptx, s, {
    x: M, y: y + 2.85, w: CONTENT_W, h: 0.8,
    label: 'Why a paid media agency cares',
    text: 'Paid and organic compete for the same landing pages. When an AI answer names SignWell as a DocuSign alternative, your branded search volume rises and your cost per acquisition falls. That is a paid media outcome achieved without paid media.',
  });
}

// A34. Sources.
{
  const { s, y } = T.content(pptx, {
    eyebrow: 'Appendix, sources',
    title: 'Where every number came from',
    kicker: 'All of it public, all of it read on 13 September 2026, all of it checkable.',
  });
  T.table(pptx, s, {
    x: M, y: y + 0.02, w: CONTENT_W,
    cols: [{ label: 'Claim', w: 42 }, { label: 'Source', w: 58 }],
    rows: [
      ['All pricing, all five plans', 'signwell.com/pricing and signwell.com/api-pricing'],
      ['The conversion sweep across 17 pages', 'Served HTML of each page, fetched directly'],
      ['Tag deployment and the ga_client_id cookie', 'Inline scripts on the homepage, pricing and demo request pages'],
      ['Sitemap counts and stale template dates', 'signwell.com/sitemap.xml and resources/sitemap_index.xml'],
      ['AI and answer engine setup', 'robots.txt Content-Signal header, and homepage anchor hrefs'],
      ['Headcount and growth rate', 'Crustdata company profile, March 2026'],
      ['Founding, location and legal entity', 'signwell.com/about'],
      ['Competitor pricing', 'Competitor pricing pages and published category comparisons'],
      ['Market size and CAGR range', 'Straits Research, Coherent, Research and Markets, Fortune Business Insights, Mordor'],
      ['Competitor ad activity', 'Meta Ad Library, Google Ads Transparency Center, LinkedIn and TikTok ad libraries'],
    ],
    fontSize: 10, rowH: 0.36,
  });
  s.addText(
    'One figure we deliberately left out: third party trackers put SignWell near $5M ARR on a 2024 snapshot. We could not verify it, so it is not in this deck.',
    { x: M, y: y + 4.1, w: CONTENT_W, h: 0.4, fontFace: F, fontSize: 10.5, italic: true, color: C.sec, valign: 'top' }
  );
}

// ---------------------------------------------------------------------------

// Defaults to the user's Desktop on any OS. Override with: OUT=/some/path node build.js
const OUT = process.env.OUT ||
  require('path').join(require('os').homedir(), 'Desktop', 'SignWell - Brand Audit and Growth Plan (2026-09-13).pptx');
pptx.writeFile({ fileName: OUT })
  .then(() => console.log('WROTE: ' + OUT))
  .catch((e) => { console.error('FAILED: ' + e.message); process.exit(1); });
