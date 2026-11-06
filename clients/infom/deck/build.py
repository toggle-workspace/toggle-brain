"""Assemble the INFOM cybersecurity deck from parts/.

python3 build.py  ->  INFOM-Cybersecurity-Deck.html  (standalone, for GitHub Pages)
                      dist/artifact.html            (same page without the document
                                                     skeleton, for the claude.ai link)
Data blocks in parts/data.js fill the ⟪NAME⟫ markers in parts/content.js.
"""
import json, re, pathlib, sys

HERE = pathlib.Path(__file__).parent
P = HERE / "parts"
read = lambda n: (P / n).read_text(encoding="utf-8")

content = read("content.js")
data = read("data-buyer.js") + "\n" + read("data-threat.js")
# the data files hold `NAME = <js expression>;;` blocks, separated by a line of ;;
blocks = dict(re.findall(r"^@@(\w+)\n(.*?)\n;;", data, flags=re.S | re.M))
missing = sorted(set(re.findall(r"⟪(\w+)⟫", content)) - set(blocks))
if missing:
    sys.exit("missing data blocks: " + ", ".join(missing))
content = re.sub(r"⟪(\w+)⟫", lambda m: blocks[m.group(1)].strip(), content)
prelude = "\n".join(f"const {k}={blocks[k].strip()};" for k in ("FIRST", "SOURCES"))

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
{prelude}
{content}
{read("engine.js")}
</script>"""

head = f"""<title>INFOM Cybersecurity Deck</title>
<meta name="description" content="Toggle's cybersecurity growth deck for INFOM: the threat, the critical data framework, five sector journeys and the lead system that makes a cyber client the buyer's first choice.">
{read("fonts.html")}
<style>
{read("zaid.css")}
{read("cyber.css")}
</style>"""

for bad in ("—", "--"):
    # em dashes are banned in visible text; CSS custom properties use "--", so only check text nodes and strings
    pass
em = [m.start() for m in re.finditer("—", content + data)]
if em:
    sys.exit(f"em dash found in content/data at {em[:5]}")

full = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
{head}
</head>
<body>
{body}
</body>
</html>
"""
(HERE / "INFOM-Cybersecurity-Deck.html").write_text(full, encoding="utf-8")
(HERE / "dist").mkdir(exist_ok=True)
(HERE / "dist" / "artifact.html").write_text(head + "\n" + body + "\n", encoding="utf-8")
print("built", len(full) // 1024, "KB")

# python3 build.py --client <dir>: the copy INFOM sees, written as <dir>/index.html.
# Strips internal review markers and asks search engines not to index the page.
if "--client" in sys.argv:
    out = pathlib.Path(sys.argv[sys.argv.index("--client") + 1])
    c = re.sub(r' ?<span class="chk">[^<]*</span>', "", full)
    for a, b in [
        ('sectors:["The threat","Sector journeys","draft"]', 'sectors:["The threat","Sector journeys","ill"]'),
        ("product picks are Toggle\\'s draft for Sean to prioritize.", "product picks are Toggle\\'s mapping."),
        ('<meta name="viewport"', '<meta name="robots" content="noindex,nofollow">\n<meta name="viewport"'),
        ("<i></i>Draft for Sean</span>", "<i></i>Illustrative model</span>"),
    ]:
        if a not in c:
            sys.exit("client build: marker not found: " + a)
        c = c.replace(a, b)
    if re.search(r'class="chk"|for Sean', c):
        sys.exit("client build: internal marker left in output")
    out.mkdir(parents=True, exist_ok=True)
    (out / "index.html").write_text(c, encoding="utf-8")
    print("client copy ->", out / "index.html")
