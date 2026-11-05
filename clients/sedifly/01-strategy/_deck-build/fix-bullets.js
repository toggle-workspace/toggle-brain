// Colors the numbers of native numbered lists blue (pptxgenjs cannot) and strips
// inter-tag whitespace from the XML.
const fs = require('fs'); const JSZip = require('jszip');
const file = process.argv[2];
(async () => {
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  let n = 0;
  for (const name of Object.keys(zip.files)) {
    if (!/^ppt\/slides\/slide\d+\.xml$/.test(name)) continue;
    let x = await zip.file(name).async('string');
    x = x.replace(/<a:buSzPct val="100000"\/><a:buFont typeface="\+mj-lt"\/><a:buAutoNum/g, () => { n++; return '<a:buClr><a:srgbClr val="4A7BF7"/></a:buClr><a:buSzPct val="100000"/><a:buFont typeface="+mj-lt"/><a:buAutoNum'; });
    zip.file(name, x);
  }
  fs.writeFileSync(file, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE', compressionOptions: { level: 9 } }));
  console.log('colored', n, 'numbered paragraphs');
})();
