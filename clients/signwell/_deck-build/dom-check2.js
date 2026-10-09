// Second pass. The first pass matched on button wording and did not scroll, so it
// missed anything rendered lazily further down the page.
// This one scrolls the whole page, then counts every VISIBLE element whose href
// points at a signup route (/sign_up, /sign_up/register, app signup), which is the
// definitive signal regardless of wording.

const { chromium } = require('playwright');

const PAGES = [
  'docusign-alternative', 'adobe-sign-alternative', 'hellosign-alternative',
  'signnow-alternative', 'dochub-alternative', 'signable-alternative',
  'electronic-signature', 'online-signature', 'sign-pdf', 'sign-documents-online',
  'contracts', 'industries/healthcare',
  'industries/real-estate-and-property-management', 'signwell-for-startups',
];

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const out = [];

  for (const p of PAGES) {
    const url = 'https://www.signwell.com/' + p + '/';
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    } catch (e) {
      out.push({ p, err: e.message.slice(0, 50) }); await page.close(); continue;
    }
    // walk the whole page so anything lazy renders
    await page.evaluate(async () => {
      await new Promise((res) => {
        let y = 0;
        const step = () => {
          y += 600; window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 90); else { window.scrollTo(0, 0); setTimeout(res, 600); }
        };
        step();
      });
    });
    await page.waitForTimeout(800);

    const r = await page.evaluate(() => {
      const hits = [];
      document.querySelectorAll('a[href], button, form').forEach((el) => {
        const href = el.getAttribute('href') || el.getAttribute('action') || '';
        const isSignup = /\/sign_up|\/register|api-upgrade|free_api/.test(href);
        const googleBtn = el.className && /btn-google/.test(String(el.className));
        if (!isSignup && !googleBtn) return;
        const rect = el.getBoundingClientRect();
        const st = getComputedStyle(el);
        if (st.display === 'none' || st.visibility === 'hidden' || +st.opacity < 0.05) return;
        if (rect.width < 8 || rect.height < 8) return;
        const inNav = !!el.closest('header, nav, [class*="nav" i], [class*="header" i]');
        const inFooter = !!el.closest('footer, [class*="footer" i]');
        hits.push({
          txt: (el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 45),
          href: href || (googleBtn ? 'google-button' : el.tagName),
          zone: inNav ? 'nav' : (inFooter ? 'footer' : 'BODY'),
        });
      });
      return { hits, h: document.body.scrollHeight };
    });

    out.push({ p, ...r });
    await page.close();
  }
  await browser.close();

  out.forEach((o) => {
    if (o.err) { console.log(o.p + '  ERROR ' + o.err); return; }
    const body = o.hits.filter((h) => h.zone === 'BODY');
    const nav = o.hits.filter((h) => h.zone === 'nav');
    console.log('\n' + o.p + '   [page ' + o.h + 'px]   body=' + body.length + ' nav=' + nav.length);
    [...body, ...nav].slice(0, 6).forEach((h) => console.log('   ' + h.zone.padEnd(6) + '"' + h.txt + '" -> ' + h.href));
    if (!o.hits.length) console.log('   NO SIGNUP LINK ANYWHERE ON THE PAGE');
  });
  require('fs').writeFileSync('dom-check2.json', JSON.stringify(out, null, 1));
})();
