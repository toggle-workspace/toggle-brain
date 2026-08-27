#!/usr/bin/env python3
"""Generate one QR code per organisation, deep-linking to ?org=<slug>,
plus a printable A4 sheet of table cards.

Usage:  python3 build/qr.py [base-url]
        base-url defaults to data/config.json -> baseUrl

Writes: dist/qr/<slug>.svg, dist/qr/<slug>.png, dist/qr/print.html
"""
import json, sys, pathlib, html
try:
    import segno
except ImportError:
    sys.exit("segno not installed. run: pip3 install segno")

ROOT = pathlib.Path(__file__).resolve().parent.parent
QR = ROOT / "dist" / "qr"

def main():
    orgs = json.loads((ROOT / "data" / "orgs.json").read_text(encoding="utf-8"))
    config = json.loads((ROOT / "data" / "config.json").read_text(encoding="utf-8"))
    base = (sys.argv[1] if len(sys.argv) > 1 else config["baseUrl"]).rstrip("/")

    if "REPLACE-ME" in base or not base.startswith("https://"):
        sys.exit("FAILED: baseUrl is a placeholder or not https, so the QR codes "
                 "would not resolve.\n  Set data/config.json baseUrl, or pass it: "
                 "python3 build/qr.py https://…")

    QR.mkdir(parents=True, exist_ok=True)
    cards = []
    for o in orgs:
        url = f"{base}/?org={o['slug']}"
        # error correction H so a printed card survives a coffee ring, and an
        # explicit white background with the full 4-module quiet zone so the code
        # still scans on a dark slide or in a dark-mode file preview
        q = segno.make(url, error="h")
        q.save(QR / f"{o['slug']}.svg", scale=8, border=4, dark="#0F0F0F", light="#FFFFFF")
        q.save(QR / f"{o['slug']}.png", scale=10, border=4, dark="#0F0F0F", light="#FFFFFF")
        cards.append((o, url))

    sheet = ["""<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>Toggle Bespoke · QR table cards</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  @page{size:A4;margin:12mm}
  *{box-sizing:border-box}
  body{margin:0;background:#F2F3F7;color:#3F434B;
    font-family:"Inter Tight","Inter",system-ui,-apple-system,sans-serif;font-size:14px}
  .hd{max-width:900px;margin:0 auto;padding:26px 20px 10px}
  .hd h1{margin:0 0 6px;font-size:24px;font-weight:800;color:#0F0F0F;letter-spacing:-.02em}
  .hd p{margin:0;color:#5E6472;font-size:13.5px}
  .sheet{max-width:900px;margin:0 auto;padding:14px 20px 40px;
    display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
  .c{background:#fff;border:1px solid #D2D6E2;border-radius:14px;padding:18px;
    display:grid;grid-template-columns:1fr 116px;gap:16px;align-items:center;break-inside:avoid}
  .c .k{font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#3056C9}
  .c h2{margin:6px 0 5px;font-size:17px;font-weight:800;color:#0F0F0F;letter-spacing:-.01em;line-height:1.2}
  .c .p{font-size:12.5px;color:#5E6472;line-height:1.45}
  .c .u{font-size:9.5px;color:#767C88;margin-top:8px;word-break:break-all;font-family:ui-monospace,monospace}
  .c img{width:116px;height:116px;display:block;background:#fff}
  .c.other{border-color:#3056C9;border-width:2px}
  @media print{
    body{background:#fff}
    .hd{display:none}
    .sheet{display:block;padding:0;max-width:none;font-size:0}
    .c{display:inline-block;width:49%;vertical-align:top;margin:0 2% 10px 0;font-size:14px;
       break-inside:avoid;page-break-inside:avoid}
    .c:nth-child(2n){margin-right:0}
  }
</style>
<div class="hd">
  <h1>QR table cards</h1>
  <p>One card per organisation. Each code opens that organisation's pathway page directly.
     Print at A4, two cards per row. Cmd-P to print.</p>
</div>
<div class="sheet">"""]
    for o, url in cards:
        p = o["pathway"]
        cls = " other" if o["slug"] == "other" else ""
        sheet.append(f"""  <div class="c{cls}">
    <div>
      <div class="k">Your pathway</div>
      <h2>{html.escape(o['name'])}</h2>
      <div class="p">{html.escape(p['code'])} {html.escape(p['name'])} · {len(o['modules'])} modules<br>Scan to see your curriculum</div>
      <div class="u">{html.escape(url)}</div>
    </div>
    <img src="{o['slug']}.svg" alt="QR code for {html.escape(o['name'])}">
  </div>""")
    sheet.append("</div>")
    (QR / "print.html").write_text("\n".join(sheet), encoding="utf-8")
    print(f"wrote {len(cards)} QR pairs + dist/qr/print.html  (base: {base})")

if __name__ == "__main__":
    main()
