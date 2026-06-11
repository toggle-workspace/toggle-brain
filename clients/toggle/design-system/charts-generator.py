#!/usr/bin/env python3
# Generates charts.html — Stage 4 gallery (flat + architectural per primitive). Round-2 refined.
import math

C=math.cos(math.radians(30)); S=0.5
def P(x,y,z,U): return ((x-y)*C*U, (x+y)*S*U - z*U)
def fmt(pts): return " ".join(f"{x:.1f},{y:.1f}" for x,y in pts)

def block(x,y,z0,h,U,face="var(--c1)",dx=1,dy=1):
    pts=lambda *p: [P(*q,U) for q in p]
    top  = pts((x,y,z0+h),(x+dx,y,z0+h),(x+dx,y+dy,z0+h),(x,y+dy,z0+h))
    left = pts((x,y+dy,z0),(x+dx,y+dy,z0),(x+dx,y+dy,z0+h),(x,y+dy,z0+h))
    right= pts((x+dx,y,z0),(x+dx,y+dy,z0),(x+dx,y+dy,z0+h),(x+dx,y,z0+h))
    return [(top,"var(--canvas)"),(left,"var(--canvas)"),(right,face)]

def polys(plist, extra=""):
    return "".join(f'<polygon points="{fmt(p)}" fill="{f}" {extra}/>' for p,f in plist)
def svg(inner, aria, w=360, h=240):
    return f'<svg viewBox="0 0 {w} {h}" class="chart" role="img" aria-label="{aria}">{inner}</svg>'
def offset(inner, tx, ty): return f'<g transform="translate({tx},{ty})">{inner}</g>'

CATS=["var(--c1)","var(--c2)","var(--c3)","var(--c4)","var(--c5)"]
cells=[]

def flat_axes(x0,y0,x1,gridys):
    s=f'<line x1="{x0}" y1="{y0}" x2="{x1}" y2="{y0}" class="axis"/>'
    for gy,lab in gridys:
        s+=f'<line x1="{x0}" y1="{gy}" x2="{x1}" y2="{gy}" class="grid"/>'
        if lab: s+=f'<text x="{x0-6}" y="{gy+4}" class="tick" text-anchor="end">{lab}</text>'
    return s

def rank_pos(i, stride): return (i*stride, -i*stride)  # front-rank: shared baseline

# ============ 1. BAR VERTICAL ============
data=[("Google",154,CATS[0]),("Facebook",291,CATS[1]),("TikTok",525,CATS[2])]
mx=550; x0,y0,cw,gap=56,196,64,28; H=150
f=flat_axes(x0,y0,318,[(y0-H*v/mx,f"{v}") for v in (200,400)])
for i,(n,v,c) in enumerate(data):
    bh=H*v/mx; bx=x0+14+i*(cw+gap)
    f+=f'<rect x="{bx}" y="{y0-bh:.1f}" width="{cw}" height="{bh:.1f}" fill="{c}"/>'
    f+=f'<text x="{bx+cw/2}" y="{y0-bh-8:.1f}" class="val" text-anchor="middle">RM {v}</text>'
    f+=f'<text x="{bx+cw/2}" y="{y0+18}" class="cat" text-anchor="middle">{n}</text>'
U=27; ab=""; at=""
for i,(n,v,c) in enumerate(data):
    gx,gy=rank_pos(i,1.55); hh=4.5*v/mx
    ab+=polys(block(gx,gy,0,hh,U,face=c))
    px,py=P(gx+0.5,gy+0.5,hh,U)
    at+=f'<text x="{px:.1f}" y="{py-10:.1f}" class="val2" text-anchor="middle">RM {v}</text>'
    bx,by=P(gx+1,gy+1,0,U)
    at+=f'<text x="{bx:.1f}" y="{by+16:.1f}" class="cat" text-anchor="middle">{n}</text>'
cells.append(("bar-v","1 · Bar (vertical) — education CPL by channel, Toggle 2025 spend",
    svg(f,"Bar chart: education CPL by channel — Google RM 154, Facebook RM 291, TikTok RM 525"),
    svg(offset(ab+at,80,170),"Architectural bar: same CPL data as front-rank block columns"),
    "Block columns share one front rank — bases align, tops compare honestly."))

# ============ 2. BAR HORIZONTAL ============
f=""; x0=92; bw=200
for i,(n,v,c) in enumerate(data):
    by=40+i*52; bl=bw*v/mx
    f+=f'<text x="{x0-8}" y="{by+16}" class="cat" text-anchor="end">{n}</text>'
    f+=f'<rect x="{x0}" y="{by}" width="{bl:.1f}" height="26" fill="{c}"/>'
    f+=f'<text x="{x0+bl+8:.1f}" y="{by+18}" class="val">RM {v}</text>'
f+=f'<line x1="{x0}" y1="30" x2="{x0}" y2="196" class="axis"/>'
ab=""; at=""
for i,(n,v,c) in enumerate(data):
    L=5.2*v/mx
    ab+=polys(block(0,i*2.1,0,0.85,25,face=c,dx=L,dy=1))
    px,py=P(L,i*2.1+0.5,0.85,25)
    at+=f'<text x="{px+16:.1f}" y="{py+6:.1f}" class="val">RM {v}</text>'
    lx,ly=P(0,i*2.1+0.5,0.42,25)
    at+=f'<text x="{lx-16:.1f}" y="{ly+4:.1f}" class="cat" text-anchor="end">{n}</text>'
cells.append(("bar-h","2 · Bar (horizontal) — for long labels",
    svg(f,"Horizontal bar: same CPL data, long-label layout"),
    svg(offset(ab+at,158,60),"Architectural block rows: length = value"),
    "Block rows: cuboids extend along the right axis; length = value (sequential read — rows recede, compare lengths not endpoints)."))

# ============ 3. GROUPED BAR ============
gdata=[("Google",75,90),("Meta",55,70),("LinkedIn",25,35)]
mx2=100; x0,y0=56,196; H=150
f=flat_axes(x0,y0,330,[(y0-H*v/mx2,f"{v}") for v in (50,100)])
for i,(n,lo,hi) in enumerate(gdata):
    bx=x0+18+i*88
    for j,(v,c) in enumerate([(lo,CATS[0]),(hi,"var(--dvt1)")]):
        bh=H*v/mx2
        f+=f'<rect x="{bx+j*30}" y="{y0-bh:.1f}" width="26" height="{bh:.1f}" fill="{c}"/>'
        f+=f'<text x="{bx+j*30+13}" y="{y0-bh-6:.1f}" class="val2" text-anchor="middle">{v}</text>'
    f+=f'<text x="{bx+28}" y="{y0+18}" class="cat" text-anchor="middle">{n}</text>'
f+=f'<rect x="{x0+14}" y="14" width="10" height="10" fill="{CATS[0]}"/><text x="{x0+30}" y="23" class="cat">min</text>'
f+=f'<rect x="{x0+74}" y="14" width="10" height="10" fill="var(--dvt1)"/><text x="{x0+90}" y="23" class="cat">max</text>'
ab=""; at=""
for i,(n,lo,hi) in enumerate(gdata):
    gx,gy=rank_pos(i,2.45)
    ab+=polys(block(gx,gy,0,4.3*lo/mx2,23,face=CATS[0]))
    ab+=polys(block(gx+1.05,gy,0,4.3*hi/mx2,23,face="var(--dvt1)"))
    px,py=P(gx+1.05,gy+0.5,4.3*hi/mx2,23)
    at+=f'<text x="{px:.1f}" y="{py-10:.1f}" class="val2" text-anchor="middle">{lo}–{hi}</text>'
    bx,by=P(gx+1.5,gy+1,0,23)
    at+=f'<text x="{bx:.1f}" y="{by+16:.1f}" class="cat" text-anchor="middle">{n}</text>'
cells.append(("bar-g","3 · Grouped bar — est. leads/month, min vs max (Sunway plan)",
    svg(f,"Grouped bar: estimated leads per month min versus max — Google 75 to 90, Meta 55 to 70, LinkedIn 25 to 35"),
    svg(offset(ab+at,60,168),"Architectural grouped columns, front-rank baseline"),
    "Pairs share a footprint; groups share the front rank. Lighter tint (dataviz.tint-1) = second member."))

# ============ 4. STACKED BAR ============
MK={"Brand":"var(--c6)","India":CATS[0],"Pakistan":CATS[1],"UAE":CATS[3],"PK & BD":CATS[1]}
sdata=[("Google",[("Brand",750),("India",4500),("Pakistan",2250)]),
       ("Meta",[("India",2250),("UAE",1350),("PK & BD",900)]),
       ("LinkedIn",[("India",1500),("UAE",900),("PK & BD",600)])]
mx3=7500; x0,y0=56,196; H=150
f=flat_axes(x0,y0,330,[(y0-H*v/mx3,l) for v,l in ((2500,"2.5K"),(5000,"5K"),(7500,"7.5K"))])
for i,(n,segs) in enumerate(sdata):
    bx=x0+22+i*86; acc=0
    for sn,v in segs:
        bh=H*v/mx3
        f+=f'<rect x="{bx}" y="{y0-acc-bh:.1f}" width="56" height="{bh:.1f}" fill="{MK[sn]}"/>'
        acc+=bh
    tot=sum(v for _,v in segs)
    f+=f'<text x="{bx+28}" y="{y0-acc-7:.1f}" class="val2" text-anchor="middle">RM {tot:,}</text>'
    f+=f'<text x="{bx+28}" y="{y0+18}" class="cat" text-anchor="middle">{n}</text>'
for i,(t,c) in enumerate([("India",CATS[0]),("Pakistan / PK & BD",CATS[1]),("UAE",CATS[3]),("Brand","var(--c6)")]):
    f+=f'<rect x="{196+(i%2)*88}" y="{8+(i//2)*16}" width="9" height="9" fill="{c}"/><text x="{209+(i%2)*88}" y="{16+(i//2)*16}" class="cat2">{t}</text>'
ab=""; at=""; z=0
for sn,v in sdata[0][1]:
    hh=4.4*v/mx3
    ab+=polys(block(0,0,z,hh,29,face=MK[sn]))
    px,py=P(1,0,z+hh/2,29)
    at+=f'<text x="{px+12:.1f}" y="{py+4:.1f}" class="cat">{sn} · RM {v:,}</text>'
    z+=hh
px,py=P(0,0,z,29)
at+=f'<text x="{px:.1f}" y="{py-10:.1f}" class="val2" text-anchor="middle">Google · RM 7,500</text>'
cells.append(("bar-s","4 · Stacked bar — monthly budget by market (Sunway, RM 15,000)",
    svg(f,"Stacked bar: monthly budget by market within each channel — Google RM 7,500, Meta RM 4,500, LinkedIn RM 3,000"),
    svg(offset(ab+at,120,196),"Architectural channel-stack: Google budget by market, every segment labeled"),
    "Flat: stable market→color identities + legend. Arch: one stack with every segment labeled — multiples go flat."))

# ============ 5. LINE ============
weeks=[1,3,5,7,9,11]; cpl=[140,128,118,110,104,100]
x0,y0=56,186; W,H=260,130; mxv,mnv=150,90
def lxf(i): return x0+W*i/5
def lyf(v): return y0-(v-mnv)/(mxv-mnv)*H
f=flat_axes(x0,y0,x0+W,[(lyf(v),f"{v}") for v in (100,125,150)])
pts=" ".join(f"{lxf(i):.1f},{lyf(v):.1f}" for i,v in enumerate(cpl))
f+=f'<polyline points="{pts}" fill="none" stroke="{CATS[0]}" stroke-width="2"/>'
for i,v in enumerate(cpl):
    f+=f'<circle cx="{lxf(i):.1f}" cy="{lyf(v):.1f}" r="3.5" fill="{CATS[0]}"/>'
    f+=f'<text x="{lxf(i):.1f}" y="{y0+16}" class="cat" text-anchor="middle">W{weeks[i]}</text>'
f+=f'<text x="{lxf(5)+2:.1f}" y="{lyf(100)-10:.1f}" class="val2" text-anchor="end">RM 100 target</text>'
f+=f'<text x="{x0}" y="22" class="tag">[ TARGET — not actuals ]</text>'
ab=""; at=""
for i,v in enumerate(cpl):
    hh=3.3*v/140
    ab+=polys(block(i*1.12,0,0,hh,25,face=CATS[0],dx=1.12 if i<5 else 1))
    bx,by=P(i*1.12+0.56,1,0,25)
    at+=f'<text x="{bx:.1f}" y="{by+14:.1f}" class="cat" text-anchor="middle">W{weeks[i]}</text>'
px,py=P(5*1.12+0.5,0,3.3*100/140,25)
at+=f'<text x="{px+4:.1f}" y="{py-8:.1f}" class="val2">RM 100</text>'
at+=f'<text x="-104" y="-92" class="tag">[ TARGET — not actuals ]</text>'
cells.append(("line","5 · Line — CPL glide path to target (slide-6 phases)",
    svg(f,"Line chart, target not actuals: CPL glide path RM 140 week 1 to RM 100 target week 11"),
    svg(offset(ab+at,116,122),"Architectural contour steps, zero baseline, target not actuals"),
    "Flat line may baseline above zero (position encoding, labeled axis). Contour-step columns are length encodings — always zero-based."))

# ============ 6. AREA ============
y02=186; H2=156
def lya(v): return y02-v/150*H2
f=flat_axes(x0,y02,x0+W,[(lya(v),f"{v}") for v in (50,100,150)])
pts2=" ".join(f"{lxf(i):.1f},{lya(v):.1f}" for i,v in enumerate(cpl))
f+=f'<polygon points="{pts2} {lxf(5):.1f},{y02} {lxf(0):.1f},{y02}" fill="{CATS[0]}" opacity="0.16"/>'
f+=f'<polyline points="{pts2}" fill="none" stroke="{CATS[0]}" stroke-width="2"/>'
for i,v in enumerate(cpl):
    f+=f'<text x="{lxf(i):.1f}" y="{y02+16}" class="cat" text-anchor="middle">W{weeks[i]}</text>'
f+=f'<text x="{x0}" y="14" class="tag">[ TARGET — not actuals ]</text>'
a2b=""; a2t=""
for i,v in enumerate(cpl):
    hh=3.3*v/140
    bl=block(i*1.12,0,0,hh,25,face=CATS[0],dx=1.12 if i<5 else 1)
    bl=[(p,("var(--dvt1)" if fl=="var(--canvas)" else fl)) for p,fl in bl]
    a2b+=polys(bl)
    bx,by=P(i*1.12+0.56,1,0,25)
    a2t+=f'<text x="{bx:.1f}" y="{by+14:.1f}" class="cat" text-anchor="middle">W{weeks[i]}</text>'
cells.append(("area","6 · Area — same series when volume matters (zero baseline)",
    svg(f,"Area chart, zero baseline, target not actuals: CPL glide path"),
    svg(offset(a2b+a2t,116,122),"Architectural filled terrain, zero baseline"),
    "Area is an area encoding — zero baseline mandatory. All faces tinted = the filled terrain."))

# ============ 7. DONUT ============
import math as m
cx,cy,R,r=120,120,84,58.8
def arc(p0,p1,color):
    a0=-m.pi/2+2*m.pi*p0; a1=-m.pi/2+2*m.pi*p1
    large=1 if (p1-p0)>0.5 else 0
    X0,Y0=cx+R*m.cos(a0),cy+R*m.sin(a0); X1,Y1=cx+R*m.cos(a1),cy+R*m.sin(a1)
    xi,yi=cx+r*m.cos(a1),cy+r*m.sin(a1); xj,yj=cx+r*m.cos(a0),cy+r*m.sin(a0)
    return (f'<path d="M{X0:.1f},{Y0:.1f} A{R},{R} 0 {large} 1 {X1:.1f},{Y1:.1f} '
            f'L{xi:.1f},{yi:.1f} A{r},{r} 0 {large} 0 {xj:.1f},{yj:.1f} Z" fill="{color}"/>')
f=arc(0,0.5,CATS[0])+arc(0.5,0.8,CATS[1])+arc(0.8,1.0,"var(--c6)")
f+=f'<text x="{cx}" y="{cy-2}" class="donutc" text-anchor="middle">RM 15K</text>'
f+=f'<text x="{cx}" y="{cy+18}" class="cat" text-anchor="middle">monthly</text>'
for i,(t,c) in enumerate([("Google Search · 50%",CATS[0]),("Meta · 30%",CATS[1]),("LinkedIn · 20%","var(--c6)")]):
    f+=f'<rect x="236" y="{74+i*26}" width="10" height="10" fill="{c}"/><text x="252" y="{83+i*26}" class="cat">{t}</text>'
ab=""; at=""; z=0
for v,c,lab in [(50,CATS[0],"Google 50%"),(30,CATS[1],"Meta 30%"),(20,"var(--c6)","LinkedIn 20%")]:
    hh=4.6*v/100
    ab+=polys(block(0,0,z,hh,30,face=c))
    px,py=P(1,0,z+hh/2,30)
    at+=f'<text x="{px+12:.1f}" y="{py+4:.1f}" class="cat">{lab}</text>'
    z+=hh
tx,ty=P(0,0,z,30)
at+=f'<text x="{tx:.1f}" y="{ty-12:.1f}" class="val2" text-anchor="middle">RM 15K / mo</text>'
cells.append(("donut","7 · Donut — share of whole (flat contexts only)",
    svg(f,"Donut: monthly budget split — Google 50 percent, Meta 30, LinkedIn 20, RM 15K total"),
    svg(offset(ab+at,150,196),"Architectural share-of-whole: the channel-stack with total headline"),
    "Share-of-whole has ONE architectural form: the channel-stack (curves are banned in the grammar; 3D arcs lie). The stack carries the whole's total as its headline."))

# ============ 8. FUNNEL — stage diagram ============
fd=[("Visitors","10,000","",CATS[0]),("Leads","700","7% convert",CATS[1]),
    ("Qualified","455","65% qualify",CATS[2]),("Enrolments","70","8–15% enrol",CATS[3])]
f=f'<text x="40" y="20" class="tag">[ STAGE DIAGRAM — counts labeled, geometry not to scale ]</text>'
for i,(n,v,rate,c) in enumerate(fd):
    yy=34+i*46
    f+=f'<rect x="{40+i*14}" y="{yy}" width="{170-i*28}" height="34" fill="{c}"/>'
    f+=f'<text x="224" y="{yy+15}" class="td2">{n} · {v}</text>'
    if rate: f+=f'<text x="224" y="{yy+29}" class="cat2">{rate}</text>'
ab=""; at=""
for i,(n,v,rate,c) in enumerate(fd):
    x=i*2.0; z=(3-i)*1.0
    ab+=polys(block(x,0,z,0.5,23,face=c,dx=1.9,dy=1.5))
    px,py=P(x+1.9,0,z+0.25,23)
    at+=f'<text x="{px+10:.1f}" y="{py-6:.1f}" class="val2">{n} · {v}</text>'
    if rate: at+=f'<text x="{px+10:.1f}" y="{py+7:.1f}" class="cat2">{rate}</text>'
at+=f'<text x="-64" y="-90" class="tag">[ STAGE DIAGRAM — not to scale ]</text>'
cells.append(("funnel","8 · Funnel — stage diagram, modeled from KPI targets (slide 13)",
    svg(f,"Funnel stage diagram, not to scale: visitors 10,000, leads 700 at 7 percent, qualified 455, enrolments 70"),
    svg(offset(ab+at,84,122),"Architectural stepped platforms, equal footprints, counts labeled"),
    "The honest funnel: equal-ish platforms, the COUNTS and RATES are the data — geometry never encodes magnitude (a true-scale funnel is 143:1 and unreadable; a flattering one is a lie)."))

# ============ 9. STAT BLOCK ============
f=f'''<rect x="60" y="40" width="240" height="150" rx="12" fill="var(--card)"/>
<rect x="60" y="40" width="240" height="7" rx="3" fill="{CATS[0]}"/>
<text x="180" y="118" class="bigstat" text-anchor="middle">32,000+</text>
<text x="180" y="146" class="cat" text-anchor="middle">leads generated</text>
<text x="180" y="166" class="cat2" text-anchor="middle">UNITAR · 2023–2026</text>'''
ab=polys(block(0,0,0,3.4,34,face="var(--canvas)"))
tx,ty=P(0,0,3.4,34)
at=f'<text x="{tx:.1f}" y="{ty-24:.1f}" class="bigstat" text-anchor="middle">32,000+</text>'
at+=f'<text x="{tx:.1f}" y="{ty-6:.1f}" class="cat" text-anchor="middle">leads · UNITAR 2023–2026</text>'
cells.append(("stat","9 · Stat block — the receipt, load-bearing",
    svg(f,"Stat block: 32,000 plus leads generated, UNITAR 2023 to 2026"),
    svg(offset(ab+at,160,206),"Architectural stat column, stroke-only: fixed height encodes nothing"),
    "Stat-as-column. Fixed-height columns render STROKE-ONLY (no data face) — a filled face would claim an encoding that isn't there."))

# ============ 10. SPARKLINE ============
sp=[44,47,42,51,55,53,61]
spx=lambda i:20+i*30; spy=lambda v:60-(v-40)*1.6
pts3=" ".join(f"{spx(i)},{spy(v):.1f}" for i,v in enumerate(sp))
f=f'<g transform="translate(60,80)"><polyline points="{pts3}" fill="none" stroke="{CATS[0]}" stroke-width="1.5"/>'
f+=f'<circle cx="{spx(6)}" cy="{spy(61):.1f}" r="3" fill="{CATS[0]}"/>'
f+=f'<text x="{spx(6)+10}" y="{spy(61)+4:.1f}" class="val2">61</text></g>'
f+=f'<text x="60" y="170" class="cat">leads / week — shown enlarged; ships ≤ 24 px tall inline</text>'
ab=""; at=""
for i,v in enumerate(sp):
    hh=2.2*v/61
    ab+=polys(block(i*0.8,0,0,hh,15,face=CATS[0],dx=0.8 if i<6 else 0.7))
px,py=P(6*0.8+0.4,0,2.2,15)
at=f'<text x="{px+6:.1f}" y="{py:.1f}" class="val2">61</text>'
cells.append(("spark","10 · Sparkline — inline trend",
    svg(f,"Sparkline: leads per week trend ending at 61"),
    svg(offset(ab+at,130,150),"Architectural micro contour steps, zero baseline"),
    "Inline: flat polyline ≤24px, no axes, terminal dot + value. Micro contour-steps (zero-based) for hero/print."))

# ============ 11. COMPARISON TABLE ============
rows=[("Sunway TES Brand","RM 70",CATS[0]),("Search — India","RM 100",CATS[1]),("Search — Pakistan","RM 100",CATS[2]),("Meta Lead Gen","RM 80",CATS[3]),("LinkedIn Lead Gen","RM 120",CATS[4])]
f=f'<rect x="30" y="24" width="300" height="28" fill="var(--thbg)"/>'
f+=f'<text x="42" y="42" class="th">Campaign</text><text x="318" y="42" class="th" text-anchor="end">Target CPL</text>'
for i,(n,v,c) in enumerate(rows):
    yy=52+i*30; bg='var(--card)' if i%2 else 'var(--canvas)'
    f+=f'<rect x="30" y="{yy}" width="300" height="30" fill="{bg}"/>'
    f+=f'<rect x="30" y="{yy}" width="5" height="30" fill="{c}"/>'
    f+=f'<text x="46" y="{yy+19}" class="td">{n}</text><text x="318" y="{yy+19}" class="tdv" text-anchor="end">{v}</text>'
a=f'<text x="10" y="20" class="cat">Rhetorical contexts only — when precision matters, ship the flat table:</text>'
for i,(n,v,c) in enumerate(rows):
    yy=44+i*36
    a+=f'<text x="10" y="{yy+14}" class="td">{n}</text>'
    L=2.6*int(v.split()[1])/120
    a+=offset(polys(block(0,0,0,0.55,22,face=c,dx=L,dy=0.8)),196,yy+14)
    px,py=P(L,0,0.55,22)
    a+=f'<text x="{196+px+8:.1f}" y="{yy+14+py+8:.1f}" class="tdv">{v}</text>'
cells.append(("table","11 · Comparison table — accent stripe (flat) / block-row values (arch, rhetorical only)",
    svg(f,"Comparison table: target CPL by campaign, RM 70 to RM 120"),
    svg(a,"Architectural table variant: value column as block rows — rhetorical contexts only"),
    "Stripe = category (series order). The flat table is strictly better when the numbers ARE the argument; block rows are for pitch moments."))

# ============ 12. LEAD-QUALITY LOOP ============
steps=[("01","Form submits",CATS[0]),("02","CRM scores",CATS[1]),("03","Fires back",CATS[3]),("04","Retrains",CATS[2])]
f=""
for i,(num,n,c) in enumerate(steps):
    xx=18+i*88
    f+=f'<rect x="{xx}" y="92" width="72" height="56" rx="8" fill="var(--card)"/>'
    f+=f'<rect x="{xx}" y="92" width="72" height="6" rx="3" fill="{c}"/>'
    f+=f'<text x="{xx+36}" y="118" class="loopt" text-anchor="middle">{num}</text>'
    f+=f'<text x="{xx+36}" y="134" class="cat2" text-anchor="middle">{n}</text>'
    if i<3: f+=f'<text x="{xx+78}" y="124" class="arrow">→</text>'
f+=f'<path d="M 282,156 C 282,196 78,196 54,156" fill="none" stroke="{CATS[0]}" stroke-width="1.5" stroke-dasharray="4 4"/>'
f+=f'<text x="180" y="206" class="cat" text-anchor="middle">outcome data loops back</text>'
ring=f'<g transform="translate(0,18.6) matrix(0.866,0.5,-0.866,0.5,0,0)"><rect x="0" y="0" width="72" height="72" rx="20" fill="none" stroke="{CATS[0]}" stroke-width="1.5" stroke-dasharray="5 5"/></g>'
inner=""; tpass=""
for (gx,gy),(num,n,c) in zip([(0,0),(2.2,0),(2.2,2.2),(0,2.2)],steps):
    inner+=polys(block(gx,gy,0,0.9,26,face=c))
    px,py=P(gx+0.5,gy+0.5,1.7,26)
    tpass+=f'<text x="{px:.1f}" y="{py:.1f}" class="loopt" text-anchor="middle">{num}</text>'
cells.append(("loop","12 · Lead-quality loop — the 4-block circuit",
    svg(f,"Lead-quality loop: form submits, CRM scores, outcome fires back, algorithm retrains — outcome data loops back"),
    svg(offset(ring+inner+tpass,164,100),"Architectural 4-block circuit on a dashed iso ring"),
    "Four blocks on a dashed circuit ring — the loop-form carrying the CRM→CAPI story."))

# ============ 13. CHANNEL-MIX ============
f=""; acc=0
for v,c,n,d,ink in [(50,CATS[0],"Google Search","RM 7,500",False),(30,CATS[1],"Meta","RM 4,500",True),(20,"var(--c6)","LinkedIn","RM 3,000",False)]:
    w=300*v/100
    f+=f'<rect x="{30+acc}" y="70" width="{w:.1f}" height="44" fill="{c}"/>'
    fillattr=' fill="var(--ink2)"' if ink else ''
    f+=f'<text x="{30+acc+w/2:.1f}" y="97" class="segl" text-anchor="middle"{fillattr}>{v}%</text>'
    f+=f'<text x="{30+acc+w/2:.1f}" y="136" class="cat" text-anchor="middle">{n}</text>'
    f+=f'<text x="{30+acc+w/2:.1f}" y="152" class="cat2" text-anchor="middle">{d}</text>'
    acc+=w
ab=""; at=""; z=0
for v,c,n in [(50,CATS[0],"Google 50% · RM 7,500"),(30,CATS[1],"Meta 30% · RM 4,500"),(20,"var(--c6)","LinkedIn 20% · RM 3,000")]:
    hh=4.6*v/100
    ab+=polys(block(0,0,z,hh,30,face=c))
    px,py=P(1,0,z+hh/2,30)
    at+=f'<text x="{px+12:.1f}" y="{py+4:.1f}" class="cat">{n}</text>'
    z+=hh
tx,ty=P(0,0,z,30)
at+=f'<text x="{tx:.1f}" y="{ty-12:.1f}" class="val2" text-anchor="middle">RM 15K / mo</text>'
cells.append(("mix","13 · Channel-mix — stacked blocks (ARCH IS DEFAULT) / split bar (flat fallback)",
    svg(f,"Channel mix split bar: Google 50 percent RM 7,500, Meta 30 percent RM 4,500, LinkedIn 20 percent RM 3,000"),
    svg(offset(ab+at,120,196),"Architectural channel-mix: stacked blocks with total headline"),
    "Block heights = budget share; the total headlines the stack. LinkedIn keeps its slate identity (Stage 2 precedent — stable channel identities override series order)."))

# ============ 14. BEFORE/AFTER ============
f=f'''<text x="105" y="60" class="cat" text-anchor="middle">CPL before (indexed)</text>
<text x="105" y="110" class="bigstat" text-anchor="middle" fill="var(--sec)">100</text>
<text x="255" y="60" class="cat" text-anchor="middle">CPL after</text>
<text x="255" y="110" class="bigstat" text-anchor="middle">53</text>
<text x="255" y="134" class="val2" text-anchor="middle">−47% · UNITAR</text>
<line x1="150" y1="100" x2="206" y2="100" class="axis"/><text x="178" y="92" class="arrow" text-anchor="middle">→</text>'''
gx2,gy2=rank_pos(1,1.9)
ab=polys(block(0,0,0,4.4,28,face="var(--secf)"))+polys(block(gx2,gy2,0,4.4*0.53,28,face=CATS[0]))
px,py=P(0.5,0.5,4.4,28); at=f'<text x="{px:.1f}" y="{py-10:.1f}" class="val" text-anchor="middle">100</text>'
px,py=P(gx2+0.5,gy2+0.5,4.4*0.53,28); at+=f'<text x="{px:.1f}" y="{py-10:.1f}" class="val" text-anchor="middle">53</text>'
bx,by=P(gx2+1,gy2+1,0,28); at+=f'<text x="{bx-34:.1f}" y="{by+18:.1f}" class="cat">CPL indexed · −47% · UNITAR</text>'
cells.append(("ba","14 · Before/after — 47% CPL drop, indexed (UNITAR)",
    svg(f,"Before and after: CPL indexed 100 before, 53 after — 47 percent drop, UNITAR"),
    svg(offset(ab+at,90,168),"Architectural step-form as data: two front-rank columns, indexed 100 to 53"),
    "The step-form as data — both columns on the front rank, bases aligned, so the drop reads true."))

# ============ 15. STATES ============
f=f'''<rect x="40" y="40" width="280" height="150" rx="12" fill="none" stroke="var(--bord)" stroke-width="1.5" stroke-dasharray="6 6"/>
<text x="180" y="108" class="td" text-anchor="middle">No data yet</text>
<text x="180" y="130" class="cat" text-anchor="middle">First read-out lands Friday Wk 1 — no projections shown as data</text>'''
ab=""
for i,h in enumerate([0.55,0.75,0.65]):
    gx3,gy3=rank_pos(i,1.55)
    bl=block(gx3,gy3,0,4.2*h,26,face="var(--bord)")
    ab+='<g class="skel">'+polys(bl,'stroke="var(--bord)"')+'</g>'
cells.append(("states","15 · Empty state (flat) / loading skeleton (arch)",
    svg(f,"Empty state: no data yet, first read-out lands Friday week 1"),
    svg(offset(ab,80,170),"Loading skeleton: gray blocks, data face in border subtle"),
    "Empty: dashed border + the honest sentence. Loading: gray blocks (face + strokes in border.subtle), static — no shimmer."))

# ================= assemble =================
def cell_html(cid,title,flat,arch,cap):
    return f'''<div class="prim" id="{cid}">
  <h3>{title}</h3>
  <div class="pair">
    <figure><figcaption>FLAT — fallback</figcaption>{flat}</figure>
    <figure class="archfig"><figcaption>ARCHITECTURAL — default at threshold moments</figcaption>{arch}</figure>
  </div>
  <p class="capn">{cap}</p>
</div>'''

body="".join(cell_html(*c) for c in cells)
body_dark=body.replace('id="','id="d-')

html=f'''<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Toggle — Chart Primitives (Stage 4)</title>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;700;800&display=swap" rel="stylesheet">
<style>
.light{{--canvas:#FFFFFF;--card:#F2F3F6;--ink:#0F0F0F;--body:#4A4A4A;--sec:#6B7280;--secf:#9AA0A8;
 --bord:#E4E6EE;--axis:#9AA0A8;--deep:#3056C9;--thbg:#3056C9;--c1:#4A7BF7;--dvt1:#B7CBFB;--c2:#2ECC9B;--c3:#F59EC9;--c4:#8E6BE6;--c5:#F28B4C;--c6:#2C2C36;--stroke:#4A7BF7;--ink2:#0F0F0F}}
.dark{{--canvas:#0A1224;--card:#121C33;--ink:#FFFFFF;--body:#B0B8C9;--sec:#9CA3B5;--secf:#44537A;
 --bord:#1F2A44;--axis:#44537A;--deep:#6E95F9;--thbg:#3056C9;--c1:#4A7BF7;--dvt1:#27406F;--c2:#2ECC9B;--c3:#F59EC9;--c4:#8E6BE6;--c5:#F28B4C;--c6:#6B7489;--stroke:#4A7BF7;--ink2:#0F0F0F}}
*{{box-sizing:border-box}} body{{margin:0;font-family:"Inter Tight",sans-serif;background:#E9EBF1;padding:32px}}
.mode{{max-width:1240px;margin:0 auto 48px;background:var(--canvas);color:var(--ink);padding:40px 48px;border-radius:8px}}
.mode>h2{{font-size:24px;font-weight:800;color:var(--c1);margin:0 0 6px}}
.mode>p{{color:var(--body);font-size:14px;margin:0 0 28px}}
.prim{{border-top:1px solid var(--bord);padding:22px 0}}
.prim h3{{font-size:16px;font-weight:700;margin:0 0 12px}}
.pair{{display:grid;grid-template-columns:1fr 1fr;gap:24px}}
figure{{margin:0}} figcaption{{font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--sec);margin-bottom:6px}}
.capn{{font-size:13px;color:var(--body);margin:10px 0 0}}
svg.chart{{width:100%;height:auto;display:block}}
svg.chart polygon{{stroke:var(--stroke);stroke-width:1.5;stroke-linecap:butt;stroke-linejoin:miter}}
.grid{{stroke:var(--bord);stroke-width:1}} .axis{{stroke:var(--axis);stroke-width:1}}
.tick,.cat{{font:500 13px "Inter Tight";fill:var(--sec)}} .cat2{{font:500 11px "Inter Tight";fill:var(--sec)}}
.val{{font:800 15px "Inter Tight";fill:var(--ink);font-variant-numeric:tabular-nums}}
.val2{{font:700 12.5px "Inter Tight";fill:var(--ink);font-variant-numeric:tabular-nums}}
.bigstat{{font:800 30px "Inter Tight";fill:var(--c1);font-variant-numeric:tabular-nums}}
.donutc{{font:800 22px "Inter Tight";fill:var(--ink);font-variant-numeric:tabular-nums}}
.tag{{font:700 11px "Inter Tight";fill:var(--sec);letter-spacing:.05em}}
.th{{font:700 12.5px "Inter Tight";fill:#FFFFFF}} .td{{font:500 12.5px "Inter Tight";fill:var(--body)}}
.td2{{font:700 12.5px "Inter Tight";fill:var(--ink)}}
.tdv{{font:700 12.5px "Inter Tight";fill:var(--deep);font-variant-numeric:tabular-nums}}
.loopt{{font:800 13px "Inter Tight";fill:var(--ink)}}
.segl{{font:800 16px "Inter Tight";fill:#FFFFFF}}
.arrow{{font:800 16px "Inter Tight";fill:var(--c1)}}
.skel polygon{{stroke:var(--bord)}}
@media print{{body{{background:#fff}}}}
</style></head><body>
<div class="mode light"><h2>Chart primitives — light mode</h2>
<p>Architectural is the default at threshold moments (covers, pitch openers, closings — where data is announced); flat is the working default where data is read. Strokes: blueprint blue, butt caps, miter joins. Full rules: CHARTS.md.</p>
{body}</div>
<div class="mode dark"><h2>Chart primitives — dark mode</h2>
<p>Same primitives on the navy canvas — token .dark siblings swap in; cat-6 slate re-mints to #6B7489; grouped tint dataviz.tint-1 darkens to #27406F.</p>
{body_dark}</div>
</body></html>'''

out="/Users/zaidsaad/Desktop/Code/Toggle Brain/clients/toggle/design-system/charts.html"
open(out,"w").write(html)
assert ':nth-of-type(0)' not in html and '.fun{' not in html
assert html.count('aria-label')==60, html.count('aria-label')
print("written",out,len(html),"bytes |",len(cells),"primitives | aria:",html.count('aria-label'),"| dark ids:","d-bar-v" in html)
