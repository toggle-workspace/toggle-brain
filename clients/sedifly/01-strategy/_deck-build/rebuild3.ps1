param([string]$render = '')
# Concatenate prim.txt + slides3.js into build3.js, build the deck, optionally render PNGs.
Set-Location $PSScriptRoot
$out = 'C:/Users/Jordan/Desktop/Sedifly/Sedifly Plans/Sedifly - Meta Launch Plan - 5 Nov 2026.pptx'
$p = Get-Content prim.txt -Raw -Encoding UTF8
$p = $p -replace "const OUT = .*", "const OUT = process.env.OUT || '$out';" -replace "pptx.title = .*", "pptx.title = 'Launch plan for Sedifly, 5 Nov 2026';"
"// GENERATED from prim.txt + slides3.js. Edit slides3.js, then run rebuild3.ps1.`n" + $p + (Get-Content slides3.js -Raw -Encoding UTF8) | Set-Content build3.js -Encoding UTF8 -NoNewline
node build3.js
node fix-bullets3.js ($out -replace '/', '\')
if ($render) { & .\render3.ps1 -src ($out -replace '/', '\') -out $render }
