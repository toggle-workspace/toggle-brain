// Layout checker. Hooks addText and addTable during the build, estimates how tall
// each really renders, and reports text that overflows its box or content that
// collides with the bottom of a table.
// Segoe UI averages about 0.537 em regular and 0.555 em bold, calibrated against a
// PowerPoint export of this deck.

const PptxGenJS = require('pptxgenjs');

const slides = [];
const origAddSlide = PptxGenJS.prototype.addSlide;
PptxGenJS.prototype.addSlide = function (...a) {
  const s = origAddSlide.apply(this, a);
  let seq = 0;
  const bucket = { items: [], tables: [], shapes: [] };
  slides.push(bucket);
  const origText = s.addText.bind(s);
  s.addText = function (t, o) { bucket.items.push({ t, o: o || {}, seq: seq++ }); return origText(t, o); };
  const origShape = s.addShape.bind(s);
  s.addShape = function (sh, o) { const g = o || {}; bucket.shapes.push({ o: { x: g.x, y: g.y, w: g.w, h: g.h, fill: !!(g.fill && g.fill.color) }, seq: seq++ }); return origShape(sh, o); };
  const origTable = s.addTable.bind(s);
  s.addTable = function (r, o) {
    // pptxgenjs rewrites these to EMU in place, so snapshot the inches now
    const g = o || {};
    bucket.tables.push({
      rows: r,
      o: { x: g.x, y: g.y, w: g.w, rowH: g.rowH, fontSize: g.fontSize, pad: g.pad, colW: (g.colW || []).slice() },
    });
    return origTable(r, o);
  };
  return s;
};

require('./build.js');

const flat = (t) => Array.isArray(t) ? t.map((r) => r.text || '').join('') : String(t == null ? '' : t);
const cellText = (c) => (c && typeof c === 'object') ? String(c.text == null ? '' : c.text) : String(c);

let problems = 0;

slides.forEach((sl, i) => {
  const n = i + 1;
  const out = [];

  // 1. text boxes that need more height than they declare
  sl.items.forEach(({ t, o }) => {
    const txt = flat(t);
    if (!txt.trim() || !o.w || !o.h) return;
    const fs = o.fontSize || 12;
    const em = o.bold ? 0.555 : 0.537;
    const cpl = Math.max(6, Math.floor((o.w * 72) / (em * fs)));
    const ls = o.lineSpacingMultiple || 1.2;
    const paras = txt.split('\n');
    const lines = paras.reduce((a, p) => a + Math.max(1, Math.ceil(p.length / cpl)), 0);
    const needed = ((lines + (paras.length - 1) * 0.35) * fs * ls) / 72;
    if (needed > o.h + 0.06) {
      out.push('    OVERFLOW: needs ' + needed.toFixed(2) + 'in, box ' + o.h.toFixed(2) +
        'in at y=' + (o.y || 0).toFixed(2) + '  "' + txt.slice(0, 52).replace(/\n/g, ' ') + '"');
      problems++;
    }
  });

  // 2. anything sitting under a table that the table's real height runs into
  sl.tables.forEach((tb) => {
    const o = tb.o;
    if (o.y == null || !o.colW) return;
    let bottom = o.y;
    tb.rows.forEach((r) => {
      let tallest = o.rowH || 0.3;
      r.forEach((cell, ci) => {
        const txt = cellText(cell);
        const fs = (cell && cell.options && cell.options.fontSize) || o.fontSize || 10;
        const w = o.colW[ci] || 1;
        const cpl = Math.max(4, Math.floor(((w - 0.2) * 72) / (0.537 * fs)));
        const ln = Math.max(1, Math.ceil(txt.length / cpl));
        tallest = Math.max(tallest, (ln * fs * 1.25) / 72 + ((o.pad == null ? 4 : o.pad) * 2) / 72);
      });
      bottom += tallest;
    });
    const tRight = o.x + (o.w || 12);
    sl.items.forEach(({ o: io, t }) => {
      if (io.y == null || io.y < o.y) return;
      const txt = flat(t);
      if (!txt.trim()) return;
      const overlapsX = io.x < tRight && (io.x + (io.w || 1)) > o.x;
      if (overlapsX && io.y < bottom - 0.04) {
        out.push('    TABLE COLLISION: table ends ' + bottom.toFixed(2) +
          'in, item at y=' + io.y.toFixed(2) + '  "' + txt.slice(0, 46).replace(/\n/g, ' ') + '"');
        problems++;
      }
    });
    if (bottom > 6.95) {
      out.push('    TABLE RUNS LONG: bottom ' + bottom.toFixed(2) + 'in (page number sits at 7.02)');
      problems++;
    }
  });

  // 2b. a text box whose area is later painted over by a filled shape
  //     (callouts and cards are drawn after the text they can cover)
  sl.items.forEach((it, ii) => {
    const a = it.o;
    const txt = flat(it.t);
    if (!txt.trim() || a.x == null || a.w == null || a.h == null) return;
    sl.shapes.forEach((sh) => {
      const b = sh.o;
      if (b.x == null || b.w == null || b.h == null || !b.fill) return;
      if (sh.seq < it.seq) return;               // drawn before the text, so behind it
      const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if (ox > 0.3 && oy > 0.12) {
        out.push('    PAINTED OVER: text box y=' + a.y.toFixed(2) + '..' + (a.y + a.h).toFixed(2) +
          ' hit by a shape at y=' + b.y.toFixed(2) + ' (overlap ' + oy.toFixed(2) + 'in)  "' + txt.slice(0, 44) + '"');
        problems++;
      }
    });
  });

  // 3. anything running past the right or bottom edge of the sheet
  const RIGHT = 13.333 - 0.5, BOT = 7.5 - 0.12;
  [...sl.shapes, ...sl.items].forEach((it) => {
    const o = it.o; if (o.x == null || o.w == null) return;
    if (o.x + o.w > RIGHT + 0.02) { out.push('    OFF RIGHT EDGE: ends ' + (o.x + o.w).toFixed(2) + 'in (sheet 13.33)'); problems++; }
    if (o.y != null && o.h != null && o.y + o.h > BOT) { out.push('    OFF BOTTOM: ends ' + (o.y + o.h).toFixed(2) + 'in'); problems++; }
  });

  if (out.length) console.log('SLIDE ' + n + '\n' + [...new Set(out)].join('\n'));
});

console.log('\n--- ' + problems + ' layout problem(s) ---');
