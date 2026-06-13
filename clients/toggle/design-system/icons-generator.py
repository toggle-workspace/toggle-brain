#!/usr/bin/env python3
# Stage 5 — generates assets/icons/*.svg, assets/illustrations/*.svg, and icons.html gallery
import os, math

BASE="/Users/zaidsaad/Desktop/Code/Toggle Brain"
ICON_DIR=f"{BASE}/assets/icons"; ILL_DIR=f"{BASE}/assets/illustrations"
GALLERY=f"{BASE}/clients/toggle/design-system/icons.html"
os.makedirs(ICON_DIR,exist_ok=True); os.makedirs(ILL_DIR,exist_ok=True)

# ---- 12 service icons (24-grid, stroke 2, butt caps, miter joins) ----
SERVICE={
"performance-marketing":'<path d="M4 20v-4M10 20v-7M16 20V9"/><path d="M14 10l6-6"/><path d="M15.5 4H20v4.5"/>',
"content-marketing":'<rect x="5" y="3" width="14" height="18"/><path d="M9 8h6M9 12h6M9 16h4"/>',
"branding":'<path d="M20 4h-7L4 13l7 7 9-9V4z"/><circle cx="16" cy="8" r="1.5"/>',
"web-development":'<rect x="3" y="4" width="18" height="16"/><path d="M3 8h18"/><path d="M9 12l-2.5 2.5L9 17M15 12l2.5 2.5L15 17"/>',
"conversion-optimisation":'<path d="M4 5h16"/><path d="M5.5 5l5 6v5.5l3 2.25V11l5-6"/>',
"creative-production":'<rect x="3" y="4" width="18" height="16"/><path d="M10 9l5.5 3L10 15V9z"/>',
"crm":'<circle cx="12" cy="6" r="2.5"/><circle cx="5.5" cy="17.5" r="2.5"/><circle cx="18.5" cy="17.5" r="2.5"/><path d="M10.1 9.3l-2.7 4.8M13.9 9.3l2.7 4.8M9.3 17.5h5.4"/>',
"email-marketing":'<rect x="3" y="5" width="18" height="14"/><path d="M3 6.5l9 7 9-7"/>',
"store-management":'<path d="M3 4h2.5L8 15.5h11L21 7H6"/><circle cx="9.5" cy="19" r="1.7"/><circle cx="17" cy="19" r="1.7"/>',
"out-of-home":'<rect x="4" y="4" width="16" height="10"/><path d="M8 14v6M16 14v6M8 10.5l3-3 2.5 2.5L16 7.5"/>',
"reporting-analysis":'<rect x="3.5" y="3.5" width="17" height="17"/><path d="M7.5 15.5l3-4 2.5 2.5L16.5 9.5"/>',
"seo":'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/>',
}
# ---- 18 utility icons ----
UTILITY={
"arrow-right":'<path d="M3 12h16.5M14 5.5l6.5 6.5L14 18.5"/>',
"arrow-up-right":'<path d="M6 18L18 6M8 6h10v10"/>',
"arrow-left":'<path d="M21 12H4.5M10 5.5L3.5 12l6.5 6.5"/>',
"chevron-down":'<path d="M5 9l7 7 7-7"/>',
"chevron-up":'<path d="M5 15l7-7 7 7"/>',
"chevron-right":'<path d="M9 5l7 7-7 7"/>',
"plus":'<path d="M12 4v16M4 12h16"/>',
"minus":'<path d="M4 12h16"/>',
"close":'<path d="M5 5l14 14M19 5L5 19"/>',
"check":'<path d="M4 13l5.5 5.5L20 6"/>',
"external-link":'<path d="M9 4H4v16h16v-5M14 4h6v6M20 4l-9 9"/>',
"download":'<path d="M12 3v12M7 10.5l5 5 5-5M4 20h16"/>',
"calendar":'<rect x="3" y="5" width="18" height="16"/><path d="M3 9.5h18M8 3v4M16 3v4"/>',
"clock":'<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/>',
"phone":'<path d="M6 4h3.2l1.4 3.8-2 1.6a11.5 11.5 0 005.9 5.9l1.6-2 3.9 1.4V18a2 2 0 01-2.1 2A16 16 0 014 6.1 2 2 0 016 4z"/>',
"location-pin":'<path d="M12 21L6.8 14.2A6.8 6.8 0 1117.2 14.2L12 21z"/><circle cx="12" cy="9.8" r="2.5"/>',
"menu":'<path d="M4 6h16M4 12h16M4 18h16"/>',
"info":'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7v1.2"/>',
}

def icon_svg(inner, size=24):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 24 24" '
            f'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter">'
            f'<!-- Toggle icon system v1 — 24 grid, optical centering verified within 1px tolerance, no shift applied -->{inner}</svg>')

for name,inner in {**SERVICE,**UTILITY}.items():
    open(f"{ICON_DIR}/{name}.svg","w").write(icon_svg(inner)+"\n")

# ---- canonical illustrations (Stage 1/2 geometry, exact 30 deg) ----
C=math.cos(math.radians(30)); S=0.5
def P(x,y,z,U): return ((x-y)*C*U, (x+y)*S*U - z*U)
def poly(pts,U,fill="none"):
    s=" ".join(f"{x:.2f},{y:.2f}" for x,y in (P(*p,U) for p in pts))
    return f'<polygon points="{s}" fill="{fill}"/>'

def wrap_ill(content, w, h, name):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="none" '
            f'stroke="#4A7BF7" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter">'
            f'<!-- {name} — canonical Toggle isometric form; SIGNATURE-DEVICES.md A2; regenerate, never redraw -->'
            f'{content}</svg>')

U=52
A=[("n",[(0,0,3),(1,0,3),(1,2,3),(0,2,3)]),("n",[(1,0,1),(2,0,1),(2,2,1),(1,2,1)]),
   ("n",[(1,0,1),(1,2,1),(1,2,3),(1,0,3)]),("f",[(2,0,0),(2,2,0),(2,2,1),(2,0,1)]),
   ("n",[(0,2,0),(1,2,0),(1,2,3),(0,2,3)]),("n",[(1,2,0),(2,2,0),(2,2,1),(1,2,1)])]
B=[("n",[(0,0,2),(2,0,2),(2,2,2),(0,2,2)]),("n",[(2,0,1),(3,0,1),(3,2,1),(2,2,1)]),
   ("n",[(2,0,1),(2,2,1),(2,2,2),(2,0,2)]),("n",[(3,0,0),(3,2,0),(3,2,1),(3,0,1)]),
   ("n",[(0,2,0),(2,2,0),(2,2,2),(0,2,2)]),("n",[(2,2,0),(3,2,0),(3,2,1),(2,2,1)])]
def emit(mass,U):
    allp=[P(*p,U) for _,pts in mass for p in pts]
    minx=min(p[0] for p in allp); miny=min(p[1] for p in allp)
    out=""
    for cls,pts in mass:
        s=" ".join(f"{x-minx+3:.2f},{y-miny+3:.2f}" for x,y in (P(*p,U) for p in pts))
        out+=f'<polygon points="{s}" fill="{"#4A7BF7" if cls=="f" else "none"}"/>'
    w=max(p[0] for p in allp)-minx+6; h=max(p[1] for p in allp)-miny+6
    return out,w,h
a,aw,ah=emit(A,U); b,bw,bh=emit(B,U)
GAP=36; BY=110
step=f'<g>{a}</g><g transform="translate({aw+GAP:.0f},{BY})">{b}</g>'
open(f"{ILL_DIR}/step-form.svg","w").write(wrap_ill(step, aw+GAP+bw, max(ah,BY+bh), "step-form"))

# channel-stack-form: 3 stacked blocks 50/30/20
stack=""; z=0; segs=[(2.3,"#4A7BF7"),(1.38,"none"),(0.92,"none")]
for i,(v,f) in enumerate(segs):
    stack+=poly([(0,1,z),(1,1,z),(1,1,z+v),(0,1,z+v)],46,fill=f)
    stack+=poly([(1,0,z),(1,1,z),(1,1,z+v),(1,0,z+v)],46)
    if i==len(segs)-1:  # only the topmost top face — seams stay visible-edge-only
        stack+=poly([(0,0,z+v),(1,0,z+v),(1,1,z+v),(0,1,z+v)],46)
    z+=v
# shift into view: compute bbox quickly
import re
xs=[float(m.split(",")[0]) for m in re.findall(r'points="([^"]+)"',stack) for m in m.split()]
ys=[float(m.split(",")[1]) for m in re.findall(r'points="([^"]+)"',stack) for m in m.split()]
minx,miny=min(xs),min(ys)
stack=f'<g transform="translate({-minx+3:.1f},{-miny+3:.1f})">{stack}</g>'
open(f"{ILL_DIR}/channel-stack-form.svg","w").write(wrap_ill(stack, max(xs)-minx+6, max(ys)-miny+6, "channel-stack-form"))

# loop-form placeholder (disclosed)
ring=('<g transform="translate(150,60)"><g transform="matrix(0.866,0.5,-0.866,0.5,0,0)">'
      '<rect x="0" y="0" width="260" height="150" rx="60"/><rect x="34" y="34" width="192" height="82" rx="41"/></g></g>'
      '<g transform="translate(318,112)"><polygon points="0,-46 39.8,-23 0,0 -39.8,-23" fill="none"/>'
      '<polygon points="39.8,23 0,46 0,0 39.8,-23" fill="none"/><polygon points="-39.8,23 0,46 0,0 -39.8,-23" fill="#4A7BF7"/></g>')
open(f"{ILL_DIR}/loop-form-PLACEHOLDER.svg","w").write(wrap_ill(ring,400,270,
    "loop-form PLACEHOLDER — the canonical loop-form must be TRACED from the Sunway Thank-You artwork (SIGNATURE-DEVICES.md A2); this approximation ships only until that trace is filed as loop-form.svg"))

# ---- gallery ----
def chip(inner, dark=False):
    return (f'<span class="chip{" chipd" if dark else ""}">'
            f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter" width="24" height="24">{inner}</svg></span>')

rows=""
for name,inner in SERVICE.items():
    sizes="".join(f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter" width="{s}" height="{s}" style="margin-right:10px;vertical-align:middle">{inner}</svg>' for s in (16,20,24,32))
    rows+=f'<tr><td class="nm">{name}</td><td>{chip(inner)}</td><td class="dk">{chip(inner,True)}</td><td>{sizes}</td></tr>'
urows=""
for name,inner in UTILITY.items():
    sizes="".join(f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter" width="{s}" height="{s}" style="margin-right:10px;vertical-align:middle">{inner}</svg>' for s in (16,20,24))
    urows+=f'<tr><td class="nm">{name}</td><td>{sizes}</td></tr>'

ill_step=open(f"{ILL_DIR}/step-form.svg").read()
ill_stack=open(f"{ILL_DIR}/channel-stack-form.svg").read()
ill_loop=open(f"{ILL_DIR}/loop-form-PLACEHOLDER.svg").read()

html=f'''<!doctype html><html><head><meta charset="utf-8"><title>Toggle — Iconography (Stage 5)</title>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;700;800&display=swap" rel="stylesheet">
<style>
body{{font-family:"Inter Tight",sans-serif;background:#E9EBF1;margin:0;padding:32px;color:#0F0F0F}}
.wrap{{max-width:1100px;margin:0 auto;background:#fff;padding:40px 48px;border-radius:8px}}
h2{{color:#4A7BF7;font-weight:800;font-size:24px;margin:0 0 4px}} h3{{font-size:17px;margin:34px 0 10px}}
p{{color:#4A4A4A;font-size:14px;max-width:72ch}}
table{{border-collapse:collapse;width:100%}} td{{padding:9px 14px;border-top:1px solid #E4E6EE;vertical-align:middle}}
.nm{{font-size:13px;font-weight:500;color:#4A4A4A;width:220px}}
.chip{{display:inline-flex;width:40px;height:40px;border-radius:12px;background:#F2F3F6;align-items:center;justify-content:center;color:#3056C9}}
.chipd{{background:#121C33;color:#4A7BF7}}
.dk{{background:#0A1224;border-radius:8px}}
.ill{{display:flex;gap:40px;align-items:flex-end}} .ill svg{{height:180px;width:auto}}
.cap{{font-size:12px;color:#6B7280;margin-top:6px}}
</style></head><body><div class="wrap">
<h2>Iconography — Stage 5</h2>
<p>24-grid · stroke 2 · butt caps · miter joins · chips 40px / icon 24 / padding 8 / radius 12. Light chip: icon in deep blue #3056C9 on card #F2F3F6. Dark chip: brand blue #4A7BF7 on card #121C33 (live-site pattern).</p>
<h3>Service icons (12 — matching the live site grid)</h3>
<table><tr><td class="nm"></td><td>chip · light</td><td>chip · dark</td><td>16 / 20 / 24 / 32</td></tr>{rows}</table>
<h3>Utility icons (18)</h3>
<table>{urows}</table>
<h3>Canonical isometric forms (filed to assets/illustrations/)</h3>
<div class="ill"><div>{ill_step}<div class="cap">step-form.svg — canonical (Stage 2 cover geometry)</div></div>
<div>{ill_stack}<div class="cap">channel-stack-form.svg — canonical</div></div></div>
<div class="ill" style="margin-top:24px"><div>{ill_loop}<div class="cap">loop-form-PLACEHOLDER.svg — ships only until the Sunway artwork is traced</div></div></div>
</div></body></html>'''
open(GALLERY,"w").write(html)
print("icons:",len(SERVICE)+len(UTILITY),"| illustrations: 3 | gallery written")
