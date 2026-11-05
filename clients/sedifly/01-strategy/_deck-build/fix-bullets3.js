// Colors and shrinks the square bullets that bullets() emits (pptxgenjs cannot color them).
// 25A0 = accent blue, 25FC = amber, 25FE = aqua. Usage: node fix-bullets3.js "<pptx>"
const fs = require('fs'); const JSZip = require('jszip');
const file = process.argv[2];
const COLOR = { '25A0': '2A6BE0', '25FC': 'D2971E', '25FE': '1FA5B8' };
(async () => {
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  let n = 0;
  for (const name of Object.keys(zip.files)) {
    if (!/^ppt\/slides\/slide\d+\.xml$/.test(name)) continue;
    let x = await zip.file(name).async('string');
    x = x.replace(/<a:buSzPct val="100000"\/><a:buChar char="&#x(25A0|25FC|25FE);"\/>/g, (m, code) => {
      n++;
      return `<a:buClr><a:srgbClr val="${COLOR[code]}"/></a:buClr><a:buSzPct val="70000"/><a:buFont typeface="Arial"/><a:buChar char="&#x25A0;"/>`;
    });
    zip.file(name, x);
  }
  fs.writeFileSync(file, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 } }));
  console.log('colored', n, 'bullets');
})();
