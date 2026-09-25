/**
 * The new silk house x COO - market and positioning research deck
 * Design system: bru-hwc (clients/COO/Colgate/design-systems/bru-hwc)
 * Built with pptxgenjs. Slide surface 10 x 5.625in, mapped 1:1 from the
 * design system's 1000 x 563px slide (1px = 0.01in, 1px = 0.72pt).
 */

const PptxGenJS = require('pptxgenjs');
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

// Design-system fonts are not installed on this machine. These are the
// closest faces present on every Windows install, keeping the two-family
// logic intact: geometric for narrative pages, grotesque for structured.
const F = {
  display: 'Arial Black',    // stands in for Archivo Black
  body: 'Arial',             // stands in for Archivo
  narrative: 'Century Gothic', // stands in for Lexend
  emphasis: 'Century Gothic',  // stands in for Montserrat
};

const PAD = 0.56;
const COL_W = 10 - PAD * 2; // 8.88
const GAP = 0.2;

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'BRU16x9', width: 10, height: 5.625 });
pptx.layout = 'BRU16x9';
pptx.author = 'Toggle Solutions';
pptx.company = 'Toggle Solutions';
pptx.title = 'The new silk house, market and positioning research';
pptx.subject = 'Prepared for COO';

// ------------------------------------------------------------- helpers ----
const NM = { margin: 0 }; // kill pptxgenjs default text inset

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

/** small brick tick, top-left */
function dash(s, y = 0.4) {
  s.addShape(pptx.ShapeType.rect, {
    x: PAD, y, w: 0.24, h: 0.08, fill: { color: C.brick }, line: { type: 'none' },
  });
}

/** Mode C headline: purple sentence with at most one brick phrase */
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
    x: PAD, y, w: COL_W * 0.94, h,
    fontFace: F.body, fontSize: 11, bold: true, color: C.purple2,
    lineSpacing: 15, valign: 'top', ...NM,
  });
}

const RULE_COLORS = [C.brick, C.purple2, C.orangeRule, C.ink];

/**
 * Card grid. cards = [{ stat|no, label, title, body, blocks:[{label,text}] }]
 * theme: 'positional' | 'brick' | 'purple' | 'ink'
 */
function cardGrid(s, cards, opts = {}) {
  const y = opts.y ?? 2.1;
  const h = opts.h ?? 2.55;
  const n = cards.length;
  const w = (COL_W - GAP * (n - 1)) / n;

  cards.forEach((c, i) => {
    const x = PAD + i * (w + GAP);
    let rule;
    if (opts.theme === 'brick') rule = C.brick;
    else if (opts.theme === 'purple') rule = C.purple2;
    else if (opts.theme === 'ink') rule = C.ink;
    else rule = RULE_COLORS[i % 4];

    s.addShape(pptx.ShapeType.rect, {
      x, y, w, h, fill: { color: C.card }, line: { type: 'none' },
    });
    s.addShape(pptx.ShapeType.rect, {
      x, y, w, h: 0.06, fill: { color: rule }, line: { type: 'none' },
    });

    const ix = x + 0.18;
    const iw = w - 0.36;
    let cy = y + 0.22;

    if (c.stat) {
      s.addText(c.stat, {
        x: ix, y: cy, w: iw, h: 0.42,
        fontFace: F.display, fontSize: c.statSize ?? 19, color: rule,
        valign: 'top', ...NM,
      });
      cy += 0.46;
    } else if (c.no) {
      s.addText(c.no, {
        x: ix, y: cy, w: iw, h: 0.24,
        fontFace: F.body, fontSize: 11, bold: true, color: rule, valign: 'top', ...NM,
      });
      cy += 0.32;
    }

    if (c.label) {
      s.addText(c.label.toUpperCase(), {
        x: ix, y: cy, w: iw, h: 0.2,
        fontFace: F.body, fontSize: 8, bold: true, charSpacing: 0.8,
        color: c.labelHot ? C.brick : C.purpleMuted, valign: 'top', ...NM,
      });
      cy += 0.24;
    }

    if (c.title) {
      s.addText(c.title, {
        x: ix, y: cy, w: iw, h: 0.5,
        fontFace: F.body, fontSize: 13, bold: true, color: C.purple2,
        lineSpacing: 16, valign: 'top', ...NM,
      });
      cy += c.titleH ?? 0.52;
    }

    if (c.body) {
      s.addText(c.body, {
        x: ix, y: cy, w: iw, h: y + h - cy - 0.18,
        fontFace: F.body, fontSize: 9.5, color: C.purple2,
        lineSpacing: 13, valign: 'top', ...NM,
      });
    }

    (c.blocks || []).forEach((b) => {
      s.addText(b.label.toUpperCase(), {
        x: ix, y: cy, w: iw, h: 0.18,
        fontFace: F.body, fontSize: 8, bold: true, charSpacing: 0.8,
        color: b.hot ? C.brick : C.purpleMuted, valign: 'top', ...NM,
      });
      cy += 0.2;
      const bh = b.h ?? 0.62;
      s.addText(b.text, {
        x: ix, y: cy, w: iw, h: bh,
        fontFace: F.body, fontSize: 9.5, color: C.purple2,
        lineSpacing: 13, valign: 'top', ...NM,
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
    x: PAD, y: 1.5, w: COL_W, h: 0.45,
    fontFace: F.narrative, fontSize: 24, color: C.purple, valign: 'top', ...NM,
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
      x: PAD, y: 2.1, w: COL_W * 0.9, h: 2.3,
      fontFace: F.emphasis, fontSize: 24, lineSpacing: 34, valign: 'top', ...NM,
    },
  );
  if (notes) s.addNotes(notes);
  return s;
}

// =====================================================================
// 01. Cover (mode A, solid ink stands in for photography)
// =====================================================================
{
  const s = inkPage();
  s.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 0.14, h: 5.625, fill: { color: C.brick }, line: { type: 'none' },
  });
  s.addText('01.', {
    x: 0.7, y: 1.15, w: 4, h: 0.4,
    fontFace: F.narrative, fontSize: 21, bold: true, color: C.white, valign: 'top', ...NM,
  });
  s.addText('The new silk house', {
    x: 0.7, y: 1.95, w: 7, h: 0.8,
    fontFace: F.narrative, fontSize: 40, bold: true, color: C.white, valign: 'top', ...NM,
  });
  s.addText(
    'Launching a Malaysian luxury scarf brand that can hold RM1,200.',
    {
      x: 0.7, y: 2.9, w: 5.6, h: 0.9,
      fontFace: F.narrative, fontSize: 17, color: C.gold, lineSpacing: 25,
      valign: 'top', ...NM,
    },
  );
  s.addText('Market and positioning research  ·  Prepared by Toggle Solutions for COO  ·  September 2026', {
    x: 0.7, y: 4.85, w: 8.6, h: 0.3,
    fontFace: F.narrative, fontSize: 9.5, color: C.white, valign: 'top', ...NM,
  });
  s.addNotes(
    'Framing line to open with: the client wants to build what Arzu spent thirty years building, '
    + 'and wants to start at a price Arzu has never reached. That is possible, but only if the first '
    + 'edition is small enough that it needs 150 buyers rather than a market.\n\n'
    + 'Toggle supplies the market and commercial argument. COO owns the client relationship and the creative.\n\n'
    + 'The brand has no name yet, so this deck says "the house" throughout. Swap in the name once it lands.',
  );
}

// =====================================================================
// 02. The brief, restated (mode B)
// =====================================================================
statementPage(
  'The brief',
  [
    { t: 'The client wants a Malaysian silk scarf brand that reads as high end, exclusive and locally designed, with silk woven in China. Arzu was named as the reference. ', bold: false },
    { t: 'Arzu is not a model. Arzu is thirty years of proof this brand does not have yet.', hl: true },
  ],
  'Say this early so the rest of the deck lands as help rather than criticism. The client picked a '
  + 'good reference for the wrong reason. Arzu is worth studying for what it took to build, not for '
  + 'what it looks like finished.\n\n'
  + 'Everything on the next sixteen slides is read from public sources, so the client can check every number.',
);

// =====================================================================
// 03. What Arzu actually is (the reference case)
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '01.     The reference');
  headline(s, [
    'Arzu is a reference. ',
    { t: 'It is not a template.', accent: true },
  ]);
  standfirst(s, 'What carries Arzu is time, an address and a founder. A brand launching in 2026 can buy none of the three.', 1.62, 0.42);
  cardGrid(s, [
    { stat: '1995', label: 'Founded', body: 'Arzu Daud, born in Turkey and trained as a computer engineer, stopped in Malaysia while traveling and stayed. She sold from suitcases on bus routes before opening a store.', statSize: 22 },
    { stat: 'KLCC', label: 'Retail', body: 'Arzu trades from the base of the Petronas Towers. That address is a luxury credential, and it took a decade of trading to afford it.', statSize: 22 },
    { stat: '73.5K', label: 'Audience', body: 'Instagram followers, built over eleven years. The bio reads "Luxury scarves by @arzudaud. Loved by 100,000+ women."', statSize: 22 },
    { stat: 'RM899', label: 'Ceiling', body: 'The most expensive piece on the site today. Thirty years of equity, and the price still stops here.', statSize: 22 },
  ], { y: 2.12, h: 2.56 });
  footer(s, [{ t: 'The lesson: ', lead: true }, 'heritage on its own does not set a price. Arzu has all of it and still sells Buy 1 Free 1 at RM69.']);
  s.addNotes(
    'Sources, all checked 1 September 2026:\n'
    + '- Founder story and 1995 date: https://arzuscarf.com/pages/about-us and https://www.nona.my/arzu-daud-dulu-pensyarah-kini-bergelar-pengusaha-tudung-terkenal-di-malaysia/\n'
    + '- KLCC store: https://www.facebook.com/arzuklcc/\n'
    + '- Follower count and bio: https://www.instagram.com/arzuscarf/\n'
    + '- RM899 ceiling and the RM69 Buy 1 Free 1 tier: https://arzuscarf.com/collections/exclusilk-pieces and https://arzuscarf.com/collections/new-arrivals\n\n'
    + 'This slide does two jobs. It respects the reference the client chose, and it removes the idea that '
    + 'copying the look of Arzu produces the price of Arzu. Arzu itself has not reached RM1,400.',
  );
}

// =====================================================================
// 04. The real blocker (mode B)
// =====================================================================
statementPage(
  'The real blocker',
  [
    { t: 'Sourcing is the question the client came in with. The harder one is simpler. ', bold: false },
    { t: 'Why does a stranger pay RM1,400 for a name she has never seen?', hl: true },
  ],
  'A new house has no archive, no address, no followers and no repeat buyers. Nothing about it yet '
  + 'gives a T20 buyer permission to spend four figures.\n\n'
  + 'Exclusivity is a claim until somebody other than the brand confirms it. The rest of this deck is '
  + 'about who confirms it and how fast.',
);

// =====================================================================
// 05. The price ladder in this market
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '02.     The price ladder');
  headline(s, [
    'There is an empty shelf ',
    { t: 'between RM899 and RM1,002.', accent: true },
  ]);
  standfirst(s, 'The Malaysian ladder read end to end. The house has to pick a rung and defend it against everything on either side.', 1.62, 0.42);
  cardGrid(s, [
    { stat: 'RM69 - 229', label: 'Mass and everyday', body: 'Georgette shawls, linen blends and viscose squares from Arzu, Naelofar and the volume brands. Bought on price and promotion.', statSize: 15 },
    { stat: 'RM369 - 899', label: 'Premium silk', body: 'Arzu\'s twill and crepe de chine squares run RM369 to RM599, and its ceiling piece sits at RM899. Thirty years of trading stops here.', statSize: 15 },
    { stat: 'RM800 - 2,500', label: 'dUCk limited editions', body: 'Numbered drops and Swarovski lines. The proven four figure ceiling in this market, and it belongs to one brand.', statSize: 14 },
    { stat: 'RM1,002 - 2,800', label: 'European houses', body: 'Ferragamo lands from RM1,002 in Malaysia through Farfetch and Mytheresa. The Hermes Carre 90 sits near RM2,800.', statSize: 13 },
  ], { y: 2.15, h: 2.5 });
  footer(s, [{ t: 'The opening: ', lead: true }, 'no Malaysian brand except dUCk sells above RM899, and dUCk sells scarcity rather than silk.'], 'strip');
  s.addNotes(
    'Sources:\n'
    + '- Arzu tiers read from https://arzuscarf.com/collections/new-arrivals and https://arzuscarf.com/collections/exclusilk-pieces, 1 September 2026\n'
    + '- dUCk range: https://www.vice.com/en/article/luxury-hijab-malaysia-wealth-status-malaysia/ and https://www.xtra.com.my/lifestyle/duck-limited-edition-scarves-retails-at-rm-2500-sold-out-within-its-launch/\n'
    + '- Ferragamo Malaysian pricing: Google Shopping results supplied by the client, RM1,002.47 to RM2,170.01\n'
    + '- Hermes Carre 90: https://lvbagaholic.com/blogs/lv_bagaholic/hermes-scarf-prices-comparison\n\n'
    + 'The gap between RM899 and RM1,002 is real but narrow, and it is only defensible with a reason to '
    + 'be there. Slide 13 is that reason.',
  );
}

// =====================================================================
// 06. The ceiling is proven
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '03.     The opportunity');
  headline(s, [
    'Malaysian women already pay RM2,500 for a scarf. ',
    { t: 'One brand sells them.', accent: true },
  ], 0.62, 1.1);
  standfirst(s, 'dUCk built a collector market at four figures on this audience, in this country, inside ten years.', 1.74, 0.42);
  cardGrid(s, [
    { stat: 'RM2,500', label: 'Limited edition', body: 'The top of dUCk\'s limited edition range, a chiffon lace scarf set with 1,300 Swarovski crystals. Their standard limited pieces run from RM800.', statSize: 20 },
    { stat: '5 minutes', label: 'Sell out', body: 'A RM800 scarf printed with the Kuala Lumpur skyline sold out in five minutes. The Swarovski line cleared four colorways by 7:30am on launch day.', statSize: 20 },
    { stat: 'Resale', label: 'Collector culture', body: 'Buyers call themselves Duckies, stack the boxes into a #DuckTower and photograph them. The empty boxes have their own resale market.', statSize: 20 },
  ], { y: 2.25, h: 2.42, theme: 'brick' });
  footer(s, [{ t: 'Read this as: ', lead: true }, 'demand at the price exists and one brand serves it. The work is earning the right to ask for it.'], 'purple');
  s.addNotes(
    'Sources:\n'
    + '- RM800 to RM2,500 range and the five minute sell out: https://www.vice.com/en/article/luxury-hijab-malaysia-wealth-status-malaysia/\n'
    + '- Swarovski line, 1,300 crystals, four colors gone by 7:30am: https://www.xtra.com.my/lifestyle/duck-limited-edition-scarves-retails-at-rm-2500-sold-out-within-its-launch/\n'
    + '- RM1,000 Luxe Basics Silk Monogram launch and the public backlash: https://gempak.com/rojakdaily/lifestyle/duck-scarves-just-launched-new-luxury-scarf-line-costs-rm1000-each-61244\n\n'
    + 'The VICE headline is worth quoting out loud: "Forget Supreme, Hijab Is the New Symbol of Wealth and Status in Malaysia."\n\n'
    + 'One brand owning a price band is the opportunity and the warning on the same slide. dUCk got there first '
    + 'and has a decade of head start.',
  );
}

// =====================================================================
// 07. Competitors, tier one
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '04.     Competitor map, tier one');
  headline(s, [
    'The European houses set the anchor ',
    { t: 'this brand gets measured against.', accent: true },
  ]);
  standfirst(s, 'None of them sell scarves through a Malaysian boutique network, which leaves an open lane between RM900 and RM1,400.', 1.62, 0.42);
  cardGrid(s, [
    { stat: 'USD 660', label: 'Hermes Carre 90', body: 'Official 2026 retail, roughly RM2,800, rising about 5 percent a year. This is the exact 90x90 format the client wants to sell.', statSize: 20 },
    { stat: 'RM1,002 - 2,170', label: 'Ferragamo silk squares', body: 'Live Malaysian pricing through Farfetch, Mytheresa and resellers. The nearest reachable benchmark for a Malaysian buyer.', statSize: 14 },
    { stat: 'EUR 450 - 800', label: 'Chanel silk scarves', body: 'New retail, higher for embroidered pieces and oversized formats. Sold as an accessory to a handbag relationship.', statSize: 15 },
  ], { y: 2.15, h: 2.5 });
  footer(s, [{ t: 'The gap: ', lead: true }, 'nothing credible sits between the RM899 Malaysian ceiling and Ferragamo at RM1,002. That is the shelf to take.']);
  s.addNotes(
    'Sources:\n'
    + '- Hermes Carre 90 at USD 660 in 2026 and the 5 percent annual rise: https://lvbagaholic.com/blogs/lv_bagaholic/hermes-scarf-prices-comparison and https://scentlab33.com/blogs/style-guide/top-5-hermes-scarf-classics-the-2026-style-price-audit-scent-lab-33\n'
    + '- Ferragamo Malaysian pricing: Google Shopping results supplied by the client, showing Farfetch, Mytheresa and Ask Me Wear listings from RM1,002.47 to RM2,170.01\n'
    + '- Chanel new retail band: https://www.1stdibs.com/buy/chanel-silk-scarves/\n\n'
    + 'USD to MYR converted at roughly 4.25. Flag it as an approximation if asked.\n\n'
    + 'Useful framing for the room: these houses are the reason a Malaysian buyer believes a scarf can cost '
    + 'four figures at all. They built the category belief, and they do not defend the RM1,000 to RM1,400 band locally.',
  );
}

// =====================================================================
// 08. Competitors, tier two
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '05.     Competitor map, tier two');
  headline(s, [
    'The brands to beat are regional, ',
    { t: 'and none of them launched at the top.', accent: true },
  ], 0.62, 1.1);
  standfirst(s, 'Each wins on a different mechanism, and each took four years or more to earn the price it charges now.', 1.74, 0.42);
  cardGrid(s, [
    {
      no: 'dUCk  ·  Malaysia', label: 'Wins on scarcity', title: 'Launched May 2014',
      body: 'Vivy Yusof, under FashionValet. It reached RM800 in 2018 and RM1,000 in 2019, four and five years in. The RM2,500 line came later.',
    },
    {
      no: 'Buttonscarves  ·  Indonesia', label: 'Wins on retail system', title: 'Launched 2016',
      body: 'Linda Anggrea started from home, online only, on about RM11,000 of capital. The first mall stores opened in 2018, two years in.',
    },
    {
      no: 'Naelofar  ·  Malaysia', label: 'Wins on celebrity equity', title: 'Launched 2014',
      body: 'Neelofa was already famous, and the brand still sold RM73 turbans in 2018. Celebrity reach did not shortcut the ladder either.',
    },
  ], { y: 2.25, h: 2.42 });
  footer(s, [{ t: 'The pattern: ', lead: true }, 'every one of them built an audience first and raised the price second. Nobody in this market has opened at four figures.'], 'alert');
  s.addNotes(
    'Sources:\n'
    + '- dUCk launched May 2014 under FashionValet: https://www.fashionvalet.com/duck/about-us.html and https://vulcanpost.com/815515/interesting-fun-facts-vivy-yusof-the-first-decade/\n'
    + '- RM800 Swarovski KL scarf in 2018 and the RM1,000 Luxe Basics line in 2019: https://gempak.com/rojakdaily/lifestyle/duck-scarves-just-launched-new-luxury-scarf-line-costs-rm1000-each-61244 and https://www.vice.com/en/article/luxury-hijab-malaysia-wealth-status-malaysia/\n'
    + '- Buttonscarves founded 2016 from home with Rp40 million of capital, stores from 2018: https://indonesia.endeavor.org/profiles/linda-anggrea/ and https://www.suara.com/lifestyle/2025/03/14/123136/profil-dan-perjalanan-bisnis-buttonscarves-brand-hijab-lokal-premium-milik-linda-anggrea\n'
    + '- Naelofar founded 2014, RM73 Be Lofa turbans in 2018 and the RM75 Starbucks collaboration in 2019: https://www.malaymail.com/news/malaysia/2018/02/27/neelofas-turbans-sold-out-after-nightclub-launch/1586717 and https://www.malaysianfoodie.com/2019/08/starbucks-malaysia-teams-with-neelofa-again-unveil-exclusive-starbucks-naelofar-scarf-collection.html\n\n'
    + 'Rp40 million converted to roughly RM11,000 at current rates. That is our conversion, not a published figure.\n\n'
    + 'This is the slide that should change how the client thinks about the launch. They want to open where '
    + 'dUCk arrived after five years. Slide 13 explains the one structure that makes an exception defensible.\n\n'
    + 'Verification gap: Buttonscarves silk square pricing in ringgit could not be confirmed, their collection '
    + 'URLs returned errors. Visible new arrivals sat around RM115.',
  );
}

// =====================================================================
// 09. Competitors, tier three
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '06.     Competitor map, tier three');
  headline(s, [
    'The same mills sell to your customer. ',
    { t: 'A new label has nothing in the way.', accent: true },
  ], 0.62, 1.1);
  standfirst(s, 'A buyer who reverse image searches a print can land on the same square for a fraction of the price, and a brand with no archive has no answer for her.', 1.74, 0.42);
  cardGrid(s, [
    { stat: 'USD 28 - 52', label: 'Direct to consumer', body: 'What a verified 100 percent mulberry silk scarf costs a shopper buying online from China, roughly RM120 to RM220.', statSize: 18 },
    { stat: 'USD 14', label: 'Factory floor', body: 'Wholesale unit price at minimum order quantity from Hangzhou silk mills.', statSize: 20 },
    { stat: 'No MOQ', label: 'Open access', body: 'Hangzhou factories quote custom 12mm silk satin 90x90cm squares with free swatches and no minimum order. Anyone can start a rival label this week.', statSize: 20 },
  ], { y: 2.25, h: 2.42, theme: 'ink' });
  footer(s, [{ t: 'The defense: ', lead: true }, 'own the print from the first piece. A house with no archive is one image search away from being a markup.'], 'alert');
  s.addNotes(
    'Sources:\n'
    + '- Retail and wholesale price bands, momme labeling, hand rolled hems and OEKO-TEX: https://apparel.alibaba.com/guide/silk-scarf-in-china-where-to-buy-what-to-know\n'
    + '- Finished retail comparison: https://sinocultural.com/collections/silk-scarf\n'
    + '- Custom 12mm 90x90cm quotes and no minimum order: https://silkshowing.en.made-in-china.com/ and https://www.customsilkscarfs.com/\n\n'
    + 'Handle this slide gently. The client sources here. The point is that sourcing is not the problem, and '
    + 'hiding it is.\n\n'
    + 'This risk is sharper for a new house than it was for Arzu. Arzu has a thirty year print archive and a '
    + 'customer base that knows the brand. A launch has neither, so an original print archive stops being a '
    + 'nice asset and becomes the entire defense.',
  );
}

// =====================================================================
// 10. Market size
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '07.     Market size');
  headline(s, [
    'We size this from ',
    { t: 'Malaysian households, not global headlines.', accent: true },
  ]);
  standfirst(s, 'Global scarf market numbers are accurate and useless for this decision. The question that matters is how many Malaysian households can pay four figures for an accessory.', 1.62, 0.5);
  cardGrid(s, [
    { stat: '1.58 million', label: 'T20 households', body: 'Out of 8.2 million Malaysian households. Entry to the T20 band sits near RM12,680 a month across 2025 and 2026.', statSize: 18 },
    { stat: 'USD 2.52b', label: 'Malaysia luxury goods', body: 'Total market value in 2025, growing 3.58 percent a year, lifted by a rising count of high net worth individuals.', statSize: 20 },
    { stat: 'USD 2.66b', label: 'Global luxury scarves', body: 'Reaching USD 3.59 billion by 2030. Silk holds about 15.3 percent of scarf revenue and grows at 6.2 percent.', statSize: 20 },
  ], { y: 2.28, h: 2.38 });
  footer(s, [{ t: 'Working estimate: ', lead: true }, 'one percent of T20 households buying a single RM1,400 piece a year is a RM22 million category. Every input is on this slide so the client can argue with it.'], 'strip');
  s.addNotes(
    'Sources:\n'
    + '- T20 household count, threshold and total households: https://www.stashaway.my/r/b40-m40-t20-t15-malaysia and https://madeinmalaysia.com.my/malaysia-b40-m40-t20-income-classification/\n'
    + '- Malaysia luxury goods market: https://www.statista.com/outlook/cmo/luxury-goods/malaysia\n'
    + '- Global luxury scarves and the silk share: https://deepmarketinsights.com/report/luxury-scarves-market-research-report and https://www.fortunebusinessinsights.com/scarves-shawls-market-110358\n'
    + '- Global Islamic clothing at USD 93.8 billion in 2026 with Malaysia named a category leader: https://www.grandviewresearch.com/industry-analysis/islamic-clothing-market and https://www.dhl.com/discover/en-my/logistics-advice/import-export-advice/modest-fashion-market-marketing-strategy\n\n'
    + 'The RM22 million figure is our estimate, not a published number. 1.58m households x 1 percent x RM1,400. '
    + 'Say that out loud. A founder trusts a number she can recalculate.\n\n'
    + 'The number that matters more for a launch is on slide 13. A capped first edition of 150 pieces needs '
    + 'roughly one buyer in every ten thousand T20 households.',
  );
}

// =====================================================================
// 11. Audience
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '08.     Target audience');
  headline(s, [
    'T20 is an income bracket. ',
    { t: 'Three buyers sit inside it.', accent: true },
  ]);
  standfirst(s, 'Each needs a different trigger, and for a brand with no history they do not open in the same order.', 1.62, 0.42);
  cardGrid(s, [
    {
      no: '01', title: 'The collector',
      blocks: [
        { label: 'Trigger', text: 'A drop she was told about before the public, with a number printed on the piece.', h: 0.55 },
        { label: 'Hardest to win first', text: 'She already collects a brand, and switching costs her the community she is in.', hot: true, h: 0.55 },
      ],
    },
    {
      no: '02', title: 'The gifter',
      blocks: [
        { label: 'Trigger', text: 'Raya, a wedding, a farewell for a senior colleague. The gift has to read as expensive on sight.', h: 0.55 },
        { label: 'Winnable cold', text: 'She needs the object to look expensive, not the label to be famous.', hot: true, h: 0.55 },
      ],
    },
    {
      no: '03', title: 'The professional',
      blocks: [
        { label: 'Trigger', text: 'A wardrobe signal for boardrooms, government events and public appearances.', h: 0.55 },
        { label: 'Wins on the cap', text: 'She will not wear a print that a hundred other women wore last Raya. A capped run is the answer.', hot: true, h: 0.55 },
      ],
    },
  ], { y: 2.15, h: 2.5 });
  footer(s, [{ t: 'Open with the gifter: ', lead: true }, 'looking expensive on sight is the one job a brand with no reputation can do on day one.']);
  s.addNotes(
    'These three segments come from the category evidence rather than from client customer data, which does '
    + 'not exist yet. Say that. Offer to validate them against the first hundred orders as a piece of paid work.\n\n'
    + 'The sequencing argument is the useful part for a launch. The collector is loyal to a brand she already '
    + 'stacks boxes for, so she is the hardest to take. The professional needs to trust that the print stays '
    + 'rare, which only a published cap can promise. The gifter judges the object in her hand, so she is the '
    + 'one buyer a brand with no history can win in month one.\n\n'
    + 'The collector segment is directly evidenced by the dUCk Duckies and #DuckTower behavior in the VICE article: '
    + 'https://www.vice.com/en/article/luxury-hijab-malaysia-wealth-status-malaysia/',
  );
}

// =====================================================================
// 12. Origin
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '09.     The origin question');
  headline(s, [
    'Say designed in Malaysia. ',
    { t: 'Never say made in Malaysia.', accent: true },
  ]);
  standfirst(s, 'The client wants the brand to read as made in Malaysia. The silk is woven in China, and the distance between those two sentences carries a penalty for every item on the shelf.', 1.62, 0.5);
  cardGrid(s, [
    {
      no: '01', title: 'The line that is safe',
      body: 'Designed in Malaysia is accurate as long as the design work happens here, and it is the same construction European houses use when the weaving happens somewhere else.',
    },
    {
      no: '02', title: 'The legal exposure',
      body: 'The Trade Descriptions Act 2011 makes a false indication of place of manufacture an offence, including assisting an act abroad that claims goods were made in Malaysia. A company faces up to RM15,000 for each item, rising to RM30,000 on repeat offences.',
    },
    {
      no: '03', title: 'What has to be true',
      body: 'Arzu leans on "Designed In Malaysia Since 1995" because it already was. A house launching in 2026 earns the line with a named designer, a studio address and dated original work.',
    },
  ], { y: 2.22, h: 2.44 });
  footer(s, [{ t: 'Per item: ', lead: true }, 'on a stocked inventory a per item penalty is a commercial risk, not a legal footnote.'], 'alert');
  s.addNotes(
    'Sources:\n'
    + '- Trade Descriptions Act 2011 (Act 730), sections on false indication of place of manufacture and the penalty schedule: '
    + 'https://www.jetro.go.jp/ext_images/world/asia/my/ip/pdf/tradedescription2011_en.pdf and https://www.wipo.int/wipolex/en/legislation/details/15309\n'
    + '- The Arzu comparison line: https://arzuscarf.com/pages/about-us\n\n'
    + 'We are not their lawyers and should say so. Recommend they run the final wording past counsel. The '
    + 'commercial argument stands on its own: a single screenshot comparing a "made in Malaysia" claim to a '
    + 'Chinese supplier sheet is a brand crisis, and a new brand has no goodwill to absorb it.\n\n'
    + 'OPEN ITEM FOR COO: confirm the design work genuinely happens in Malaysia. If the prints are also coming '
    + 'off a mill catalogue then "designed in Malaysia" has nothing true underneath it either, and the first '
    + 'pillar of slide 15 disappears. Worth asking before the meeting.',
  );
}

// =====================================================================
// 13. The recommendation
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '10.     Recommendation');
  headline(s, [
    'Launch narrow. ',
    { t: 'Cap the first edition.', accent: true },
  ]);

  const pw = (COL_W - 0.55) / 2;
  const py = 1.72;
  const ph = 2.9;

  s.addShape(pptx.ShapeType.rect, { x: PAD, y: py, w: pw, h: ph, fill: { color: C.brick }, line: { type: 'none' } });
  s.addText('01', { x: PAD + 0.26, y: py + 0.24, w: pw - 0.52, h: 0.34, fontFace: F.display, fontSize: 16, color: C.white, valign: 'top', ...NM });
  s.addText('The first edition', { x: PAD + 0.26, y: py + 0.66, w: pw - 0.52, h: 0.34, fontFace: F.body, fontSize: 15, bold: true, color: C.white, valign: 'top', ...NM });
  s.addText(
    'One silk line in 90x90cm and 110x110cm. Hand rolled hems, momme weight published, every piece numbered. '
    + 'Priced RM1,200 to RM1,800, into the empty shelf between the RM899 Malaysian ceiling and Ferragamo at RM1,002. '
    + 'Cap the run at 100 to 150 pieces, publish the number, and never restock it.',
    { x: PAD + 0.26, y: py + 1.12, w: pw - 0.52, h: 1.6, fontFace: F.body, fontSize: 10.5, color: C.white, lineSpacing: 14.5, valign: 'top', ...NM },
  );

  s.addText('+', { x: PAD + pw + 0.08, y: py + 1.2, w: 0.39, h: 0.5, fontFace: F.display, fontSize: 22, color: C.purple2, align: 'center', valign: 'top', ...NM });

  const x2 = PAD + pw + 0.55;
  s.addShape(pptx.ShapeType.rect, { x: x2, y: py, w: pw, h: ph, fill: { color: C.purple2 }, line: { type: 'none' } });
  s.addText('02', { x: x2 + 0.26, y: py + 0.24, w: pw - 0.52, h: 0.34, fontFace: F.display, fontSize: 16, color: C.white, valign: 'top', ...NM });
  s.addText('Why the cap carries the price', { x: x2 + 0.26, y: py + 0.66, w: pw - 0.52, h: 0.34, fontFace: F.body, fontSize: 15, bold: true, color: C.white, valign: 'top', ...NM });
  s.addText(
    'At 150 pieces the house does not need a market, it needs 150 buyers. That is one in every ten thousand T20 households. '
    + 'The scarcity is real rather than staged, and a launch with no warehouse and no wholesale commitments can afford a '
    + 'genuinely small run in a way an established brand cannot.',
    { x: x2 + 0.26, y: py + 1.12, w: pw - 0.52, h: 1.6, fontFace: F.body, fontSize: 10.5, color: C.white, lineSpacing: 14.5, valign: 'top', ...NM },
  );

  footer(s, [{ t: 'The line to hold: ', lead: true }, 'no promotions, no second line and no restock for twelve months.']);
  s.addNotes(
    'The RM1,200 to RM1,800 band is our recommendation, derived from the gap between the RM899 Malaysian ceiling '
    + 'and the RM1,002 Ferragamo entry point. It is a judgment call, not a published figure.\n\n'
    + 'STATE THIS RISK OUT LOUD. No brand in this market has launched at four figures. dUCk took four years to '
    + 'reach RM800 and five to reach RM1,000, Naelofar was still selling RM73 turbans four years in, and '
    + 'Buttonscarves started from a home office. Opening at RM1,200 is an exception to the only pattern the '
    + 'evidence shows.\n\n'
    + 'The cap is what makes the exception defensible. A brand cannot manufacture a market in month one, and it '
    + 'can find 150 people. If the client wants volume at this price in year one, this plan is wrong for them '
    + 'and the honest advice is to climb the way dUCk climbed.\n\n'
    + 'Sizing note: set the run against the size of the list built before launch, not against the ambition. '
    + 'Slide 18 carries this as the main execution risk.',
  );
}

// =====================================================================
// 14. What to publish at launch
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '11.     What to publish at launch');
  headline(s, [
    'A new name has to publish ',
    { t: 'what an old name can imply.', accent: true },
  ], 0.62, 1.1);
  standfirst(s, 'Arzu sells a RM899 square with no specification anywhere on the page, because it has thirty years standing behind it. A first edition has to show its work.', 1.74, 0.42);
  cardGrid(s, [
    { no: '01', title: 'Momme weight', body: 'Publish it. Twelve momme and above is the number a buyer who has researched silk goes looking for, and its absence reads as an answer.' },
    { no: '02', title: 'Dimensions', body: 'State 90x90cm and 110x110cm on every page. The category sells "medium" and "large", which tells a serious buyer nothing.' },
    { no: '03', title: 'The hem', body: 'Hand rolled and hand stitched, photographed close. This is the most visible difference between a RM150 scarf and a RM1,500 one.' },
    { no: '04', title: 'The edition', body: 'Print a number on the piece and the box. "Piece 24 of 150" turns a purchase into something worth keeping and photographing.' },
  ], { y: 2.25, h: 2.42, theme: 'purple' });
  footer(s, [{ t: 'It costs copywriting and photography, not manufacturing. ', lead: true }, 'And it is free here, because there is no legacy catalog to go back and fix.']);
  s.addNotes(
    'Evidence that the category leaves this gap open: across the whole Arzu 100% real silk collection, exactly '
    + 'one product mentions a hand rolled hem, and none publish momme weight, dimensions in centimeters, or where '
    + 'the silk was woven. Source: https://arzuscarf.com/collections/exclusilk-pieces, every product page listed, '
    + 'checked 1 September 2026. The single mention is on The Good Wrinkle Silk Cotton Long Scarf at RM249.\n\n'
    + 'Momme, dimensions and hem are the three specifications a buyer researching silk goes looking for. A brand '
    + 'that publishes all three outruns an incumbent that publishes none, on day one, for the price of a copywriter.\n\n'
    + 'This is the easiest yes in the deck. Lead the commercial conversation with it if the room is cold on the '
    + 'bigger argument.',
  );
}

// =====================================================================
// 15. The proof stack
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '12.     The proof stack');
  headline(s, [
    'Four things a house with no history ',
    { t: 'can own on day one.', accent: true },
  ], 0.62, 1.1);
  standfirst(s, 'This is the substitute for Arzu\'s thirty years, ordered by how fast each one starts working.', 1.74, 0.42);
  cardGrid(s, [
    {
      no: '01', label: 'Works immediately', title: 'An original print archive',
      body: 'Prints the house draws and owns. The only defense against a mill selling the same square to somebody else, and it compounds every season.',
    },
    {
      no: '02', label: 'Works at launch', title: 'A published edition cap',
      body: 'A number on the piece and the box, honored in public. Worth nothing if it is quietly extended, worth a lot the first time it sells out.',
    },
    {
      no: '03', label: 'Works in months', title: 'A named designer',
      body: 'A face, a studio and a reason she draws what she draws. Buyers cannot check momme weight from a photograph. They can check a person.',
    },
    {
      no: '04', label: 'Works within a year', title: 'One physical room',
      body: 'Appointment viewing, a counter or a short residency. Arzu bought this signal with a KLCC address. A residency rents it by the month.',
    },
  ], { y: 2.25, h: 2.42 });
  footer(s, [{ t: 'What these share: ', lead: true }, 'none of them needs a loom in Malaysia, and none of them can be outspent by a competitor with a bigger budget.'], 'purple');
  s.addNotes(
    'This slide exists because the client asked how to look exclusive and the honest answer is that exclusivity '
    + 'is confirmed by other people. These four are the assets that make the confirmation possible without waiting '
    + 'thirty years for it.\n\n'
    + 'The first one is the priority. Slide 09 shows Hangzhou mills quoting custom squares with no minimum order, '
    + 'which means the design file is the only thing a competitor cannot copy legally. A house that sells a mill '
    + 'catalogue print at RM1,400 has bought a lawsuit and a screenshot instead of a brand.\n\n'
    + 'If COO wants a scope out of this deck, it is here. Print archive, edition system, designer story and the '
    + 'physical room are four distinct pieces of brand and creative work, and COO owns that side.',
  );
}

// =====================================================================
// 16. Online sales method
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '13.     How to sell it');
  headline(s, [
    'A drop needs an audience ',
    { t: 'to drop to.', accent: true },
  ]);
  standfirst(s, 'dUCk had FashionValet\'s customer list before it ever ran a limited edition. For a launch the order matters more than the mechanics.', 1.62, 0.42);
  cardGrid(s, [
    {
      no: '01', title: 'Build the list first',
      body: 'Six to nine months of the designer\'s face, the prints and the studio. Paid media does the finding, because a new name has no organic reach. Collect phone numbers, not followers.',
      titleH: 0.34,
    },
    {
      no: '02', title: 'Then drop, count published',
      body: 'Announce the date, cap the run, publish the number, never restock. dUCk proved this mechanic on this audience at this price, and a real cap makes it true rather than theatrical.',
      titleH: 0.34,
    },
    {
      no: '03', title: 'Sell it on WhatsApp',
      body: 'WhatsApp reaches 98 percent of Malaysian social users, and high ticket sellers replace Add to Cart with Chat to Buy. A named advisor and order updates written by hand.',
      titleH: 0.34,
    },
  ], { y: 2.15, h: 2.5, theme: 'brick' });
  footer(s, [{ t: 'On paid media: ', lead: true }, 'buy the audience, then stop. Advertising a capped edition after it opens tells buyers it did not sell.']);
  s.addNotes(
    'Sources:\n'
    + '- WhatsApp at 98 percent usage in Malaysia and social commerce behavior: https://www.marketing-interactive.com/whatsapp-social-commerce-analysis\n'
    + '- Luxury clienteling on WhatsApp, previews and white glove order tracking: https://endearhq.com/blog/clienteling-in-luxury-retail and https://www.hellomerx.com/blog/use-cases-whatsapp-clienteling-software-for-luxury-retail\n'
    + '- Chat to Buy replacing Add to Cart for high ticket in Malaysia: https://www.blaster-pro.com/post/how-to-build-a-whatsapp-first-brand-lessons-from-malaysia-s-top-5-viral-startups\n'
    + '- dUCk launched under FashionValet, which already held the customer list: https://www.fashionvalet.com/duck/about-us.html\n\n'
    + 'This is the biggest correction for a launch. The drop mechanic works, and it works second. A capped '
    + 'edition announced to nobody is a public failure, and slide 18 carries that as the main execution risk.\n\n'
    + 'ON TIKTOK: Malaysia grew TikTok Shop GMV 150 percent, the fastest in the region, and live sessions convert '
    + 'at 5 to 20 percent (https://technode.global/2026/02/11/tiktoks-southeast-asia-doubles-gmv-year-on-year-to-45-6b-in-2025/ '
    + 'and https://www.contentgrip.com/tiktok-shop-strategy-southeast-asia/). It is the right channel for a RM200 to '
    + 'RM500 tier and the wrong one for a capped first edition. Recommend it in year two if the house adds a lower '
    + 'line, and keep the flagship off live selling either way.',
  );
}

// =====================================================================
// 17. Talking points
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '14.     Talking points');
  headline(s, [
    'What to say ',
    { t: 'when the client pushes back.', accent: true },
  ]);
  standfirst(s, 'Four objections will come up on this call. Each has an answer that keeps the conversation moving.', 1.62, 0.42);
  cardGrid(s, [
    {
      no: '01', title: '"Our silk comes from China."', titleH: 0.72,
      body: 'So does most of the silk here. Buyers ask who drew the print and how many exist, not where the loom sits. Publish both.',
    },
    {
      no: '02', title: '"We want to open at RM1,500."', titleH: 0.72,
      body: 'You can, if the first edition is 150 pieces and not 1,500. At that size you need 150 buyers, not a market.',
    },
    {
      no: '03', title: '"Arzu does it, so we can too."', titleH: 0.72,
      body: 'Arzu has thirty years, a KLCC address and a founder story, and still stops at RM899. The angle without the proof holds nothing up.',
    },
    {
      no: '04', title: '"Can we say made in Malaysia?"', titleH: 0.72,
      body: 'No. The Trade Descriptions Act puts up to RM15,000 an item behind that sentence. Designed in Malaysia survives a screenshot.',
    },
  ], { y: 2.08, h: 2.62 });
  footer(s, [{ t: 'Close on this: ', lead: true }, 'the mills will sell anybody the same silk. They cannot sell them the person who drew the print.']);
  s.addNotes(
    'Deliver the second answer carefully. It is the one that decides whether this engagement is worth taking. '
    + 'A client who wants four figure pricing and volume in year one is asking for something no brand in this '
    + 'market has done, and saying so early is cheaper than saying it in month six.\n\n'
    + 'The third answer is the reason this deck is built around Arzu as a reference rather than a target. The '
    + 'client chose the comparison, so use it.\n\n'
    + 'If the room warms up, the natural next scope for Toggle is the print archive brief, the edition and '
    + 'specification system, the pre launch list build and the WhatsApp clienteling setup. COO owns the naming, '
    + 'the identity and the creative.',
  );
}

// =====================================================================
// 18. Risks and gaps
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '15.     Risks and gaps');
  headline(s, [
    'What we could not verify, ',
    { t: 'and what could still go wrong.', accent: true },
  ]);
  standfirst(s, 'Everything in this deck is read from public sources. These four items need the client in the room to close.', 1.62, 0.42);
  cardGrid(s, [
    { no: 'Gap', label: 'Needs a manual check', title: 'Buttonscarves silk pricing', body: 'Their collection pages returned errors on every attempt. New arrivals sat near RM115. The silk square price is unconfirmed.' },
    { no: 'Gap', label: 'Needs the client', title: 'The brand does not exist yet', body: 'No name, no founder story, no confirmed design capability in Malaysia, no unit cost and no launch date. Each one moves the plan.' },
    { no: 'Risk', label: 'Execution', title: 'A cap that does not clear', body: 'A published edition that fails to sell out is worse than never publishing one. Size the first run to the list, not to the ambition.', labelHot: true },
    { no: 'Risk', label: 'Category', title: 'Dupes', body: 'The Hangzhou mills sell to anyone with a design file. An archive of original prints is the only durable defense.', labelHot: true },
  ], { y: 2.08, h: 2.62 });
  footer(s, ['Prepared by Toggle Solutions for COO. Source links and check dates sit in the speaker notes of every slide.'], 'strip');
  s.addNotes(
    'Say the gaps out loud on the call. Naming what we do not know is what makes the rest of the numbers '
    + 'trustworthy, and every gap here converts naturally into a paid discovery scope.\n\n'
    + 'The execution risk is the one to press on. A brand can survive launching at RM800 instead of RM1,400. '
    + 'It has a much harder time surviving a public edition of 150 that sells eleven.\n\n'
    + 'Separate risk worth naming if the client raises it: pricing advice here assumes healthy silk margins at '
    + 'the RM1,200 to RM1,800 band. Given a landed cost near the USD 28 to 52 direct band on slide 09, that '
    + 'assumption is safe, but it should be confirmed against their actual quote.',
  );
}

// =====================================================================
// 19. Sources
// =====================================================================
{
  const s = creamPage();
  dash(s);
  runningHeader(s, '16.     Sources');
  headline(s, ['Every number in this deck, ', { t: 'and where it came from.', accent: true }]);

  const left = [
    ['Arzu, the reference', 'arzuscarf.com product collections and Our Story page, Instagram @arzuscarf, Facebook Arzu KLCC, Nona founder profile. Checked 1 September 2026.'],
    ['dUCk', 'FashionValet brand page and Vulcan Post on the 2014 launch, VICE on the collector market, Rojak Daily on the RM1,000 line in 2019, XTRA on the RM2,500 editions.'],
    ['Buttonscarves and Naelofar', 'Endeavor Indonesia and Suara on the 2016 Buttonscarves launch and capital, PitchBook company profile, Malay Mail and Malaysian Foodie on Naelofar pricing in 2018 and 2019.'],
    ['International pricing', 'Bagaholic global Hermes price comparison, Scent Lab 2026 price audit, 1stDibs Chanel listings, client supplied Google Shopping results for Ferragamo in Malaysia.'],
  ];
  const right = [
    ['Market size', 'Statista Malaysia luxury goods outlook, StashAway and Made in Malaysia on T20 thresholds and household counts, Deep Market Insights and Fortune Business Insights on scarves, Grand View on Islamic clothing.'],
    ['China supply', 'Alibaba silk scarf sourcing guide, SinoCultural retail collection, Hangzhou Zhigeng and Huacuiyuan factory listings.'],
    ['Origin and law', 'Trade Descriptions Act 2011 (Act 730), JETRO and WIPO Lex published texts.'],
    ['Sales method', 'Marketing Interactive on WhatsApp in Malaysia, Endear and Merx on luxury clienteling, TNGlobal and ContentGrip on TikTok Shop Southeast Asia.'],
  ];

  const colW = (COL_W - 0.4) / 2;
  [left, right].forEach((col, ci) => {
    let y = 1.72;
    col.forEach(([label, text]) => {
      const x = PAD + ci * (colW + 0.4);
      s.addText(label.toUpperCase(), {
        x, y, w: colW, h: 0.18,
        fontFace: F.body, fontSize: 8, bold: true, charSpacing: 0.8, color: C.brick, valign: 'top', ...NM,
      });
      s.addText(text, {
        x, y: y + 0.2, w: colW, h: 0.6,
        fontFace: F.body, fontSize: 9.5, color: C.purple2, lineSpacing: 13, valign: 'top', ...NM,
      });
      y += 0.8;
    });
  });

  footer(s, [{ t: 'One rule: ', lead: true }, 'anything we estimated is labeled as an estimate on the slide it appears on.']);
  s.addNotes(
    'Full URLs are in the speaker notes of each individual slide. This page exists so COO can hand the deck on '
    + 'without the notes and still show the work.\n\n'
    + 'Two figures on this deck are ours rather than published: the RM22 million category estimate on slide 10, '
    + 'and the RM1,200 to RM1,800 price band on slide 13. Both are labeled on their slides.',
  );
}

// ------------------------------------------------------------------ write --
const out = process.argv[2] || path.join(__dirname, 'new-silk-house-research.pptx');
pptx.writeFile({ fileName: out }).then(() => {
  console.log('written:', out);
});
