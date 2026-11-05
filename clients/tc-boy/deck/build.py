"""Assemble the TC Boy 2027 deck from parts/.

python3 build.py  ->  TC-Boy-2027-Deck.html   (standalone, one file)
                      dist/artifact.html       (same page without the document
                                                skeleton, for the claude.ai link)
Shared parts (engine, fonts, wordmark, base styles) come from the INFOM deck,
which took them from Zaid's education deck.
"""
import re, pathlib, sys

HERE = pathlib.Path(__file__).parent
P = HERE / "parts"
read = lambda n: (P / n).read_text(encoding="utf-8")

content = read("content.js")
if "\u2014" in content or "\u2013" in content:
    sys.exit("em or en dash found in content.js")

body = f"""<div id="prog" aria-hidden="true"></div>
<main id="stage" aria-live="off"></main>
<nav id="rail" aria-label="All slides"><ol id="railList"></ol></nav>
<nav id="nav" aria-label="Slide navigation">
  <button type="button" id="prev" aria-label="Previous slide">&#8249;</button>
  <span class="pg" id="pg">01 / 01</span>
  <span class="tt" id="tt"></span>
  <button type="button" id="next" aria-label="Next slide">&#8250;</button>
</nav>
{read("wordmark.html")}
<script>
{read("head.js")}
{content}
{read("engine.js")}
</script>"""

head = f"""<title>TC Boy 2027 Plan</title>
<meta name="description" content="Toggle's 2027 online growth and media plan for TC Boy: the protein opportunity, the shop fixes, RM100,000 of paid media inside RM200,000, Threads, creators and the June checkpoint.">
{read("fonts.html")}
<style>
{read("zaid.css")}
{read("tcboy.css")}
</style>"""

full = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
{head}
</head>
<body>
{body}
</body>
</html>
"""
(HERE / "TC-Boy-2027-Deck.html").write_text(full, encoding="utf-8")
(HERE / "dist").mkdir(exist_ok=True)
(HERE / "dist" / "artifact.html").write_text(head + "\n" + body + "\n", encoding="utf-8")
print("built", len(full) // 1024, "KB")
