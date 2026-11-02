#!/usr/bin/env node
/* Builds a single, shareable copy of the company profile.

   toggle-company-profile.html loads sales-data.js, team-group.jpg and the
   client logos from sibling paths, so a copy sent on its own shows broken
   images and an empty book. This inlines all of them as data URIs into
   toggle-company-profile-standalone.html. Google Fonts stay remote and need
   a connection, as they do for the source page.

   Re-run after any edit to the page, sales-data.js or the logos:
     node clients/toggle/sales-page/build-standalone.mjs */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const MIME = { ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg",
               ".webp":"image/webp", ".svg":"image/svg+xml", ".gif":"image/gif" };

function dataUri(rel){
  const abs = resolve(here, rel);
  const type = MIME[extname(abs).toLowerCase()];
  if (!type) throw new Error("no mime type for " + rel);
  return "data:" + type + ";base64," + readFileSync(abs).toString("base64");
}

let html = readFileSync(join(here, "toggle-company-profile.html"), "utf8");
let data = readFileSync(join(here, "sales-data.js"), "utf8");

/* every relative image path in the data file: logos under assets/ */
let logos = 0;
data = data.replace(/(["'])((?:\.\.\/)+assets\/[^"']+\.(?:png|jpe?g|webp|svg|gif))\1/gi,
  (_, q, rel) => { logos++; return q + dataUri(rel) + q; });

const tag = '<script src="sales-data.js"></script>';
if (!html.includes(tag)) throw new Error("sales-data.js script tag not found");
/* </script> inside the data would close the inline tag early */
html = html.replace(tag, () => "<script>\n" + data.replace(/<\/script/gi, "<\\/script") + "\n</script>");

let photos = 0;
html = html.replace(/src="(team-group\.jpg)"/g, (_, rel) => { photos++; return 'src="' + dataUri(rel) + '"'; });

/* the #team grid ships hidden; inline its headshots anyway so un-hiding it
   in the source does not silently break the shared copy */
const heads = Array.from({ length: 8 }, (_, i) => dataUri("heads/h" + (i + 1) + ".webp"));
const headSrc = `'<img class="tim" src="heads/h' + (i + 1) + '.webp"`;
if (html.includes(headSrc)) {
  html = html.replace(headSrc, `'<img class="tim" src="' + HEADS[i] + '"`);
  html = html.replace("const TEAM = [", "const HEADS = " + JSON.stringify(heads) + ";\nconst TEAM = [");
}

/* anything still pointing at a local file would break when shared */
const left = [...html.matchAll(/(?:src|href)="(?!data:|https?:|mailto:|tel:|#)([^"']+)"/g)]
  .map(m => m[1]).filter(p => !p.includes("' +"));
if (left.length) console.warn("warning: local references remain:", left);

const out = join(here, "toggle-company-profile-standalone.html");
writeFileSync(out, html);
console.log(out + "\n" + logos + " logos, " + photos + " photo, " +
  Math.round(html.length / 1024) + " KB");
