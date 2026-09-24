// Headless render check: runs the built page's own JS against a DOM stub and
// renders every organisation, so a bad data field fails here rather than on an
// attendee's phone.
//
// Usage:  node build/verify.mjs
import fs from "fs";

const html = fs.readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
const script = html.match(/<script>([\s\S]*)<\/script>/)[1];

const made = [];
const mkEl = () => ({ value:"", textContent:"", innerHTML:"", children:[],
  appendChild(c){ this.children.push(c); }, addEventListener(){},
  classList:{ add(){}, remove(){} }, offsetWidth:1 });
const sel = mkEl(), appEl = mkEl(), liveEl = mkEl();
global.document = {
  getElementById: id => ({ orgsel: sel, app: appEl, live: liveEl }[id] ?? mkEl()),
  createElement: () => { const e = mkEl(); made.push(e); return e; },
  set title(v){ this._t = v; }, get title(){ return this._t; }
};
global.location = { href:"http://x/?org=he-medical", search:"?org=he-medical" };
global.history = { replaceState(){} };
global.window = { scrollTo(){} };

const { ORGS, LIBRARY, render, pick } = new Function(
  script + "\n;return {ORGS,LIBRARY,render,pick};")();

let fails = 0;
const fail = m => { console.log("  FAIL " + m); fails++; };

console.log(`orgs=${ORGS.length}  library=${Object.keys(LIBRARY).length}  dropdown=${made.length}`);
if (made.length !== ORGS.length) fail(`dropdown has ${made.length} options for ${ORGS.length} orgs`);

for (const o of ORGS) {
  try {
    render(o);
    const h = appEl.innerHTML;
    for (const bad of ["undefined", "null", "NaN", "[object Object]"])
      if (h.includes(bad)) fail(`${o.slug}: renders literal "${bad}"`);
    if (h.length < 2500) fail(`${o.slug}: suspiciously short (${h.length} chars)`);
    if (!liveEl.textContent.includes(o.name)) fail(`${o.slug}: live region not updated`);
    // the pathway badge is a fixed-width box, so a long code is a layout bug
    if (o.pathway.code.length > 8) fail(`${o.slug}: pathway.code "${o.pathway.code}" too long for the badge`);
    if (o.pathway.shape.length > 200) fail(`${o.slug}: pathway.shape is ${o.pathway.shape.length} chars`);
  } catch (e) { fail(`${o.slug} threw: ${e.message}`); }
}

pick("nope-not-real", false);
if (sel.value !== "other") fail(`unknown slug fell back to "${sel.value}", expected "other"`);
pick("acebrix", false);
if (sel.value !== "acebrix") fail("known slug did not select");

console.log(fails ? `\n${fails} FAILURE(S)` : `\nall ${ORGS.length} orgs render clean`);
process.exit(fails ? 1 : 0);
