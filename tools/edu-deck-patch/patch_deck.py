"""Apply Toggle's three fixes to a new export of Zaid's education deck.

Usage:
    python3 -I patch_deck.py <zaid-export.html> <output.html> [--skip-webp] [--no-iwisers]

1. Footer spacing: keeps the bottom 84px of every slide clear of content, so
   source lines sit above the footer and the floating slide controls.
2. File size: re-encodes every embedded JPEG as WebP (cwebp -q 82, max 1200px
   wide). Needs `cwebp` (brew install webp).
3. Call planner: the "Set up this call" panel (press S). Prospect name, full
   deck or short call, audit ticks, per-slide ticks, setup link, and printing
   that drops the unpicked slides.

Each step looks for exact strings in Zaid's code. If he rewrites one of those
places, the script stops and names the string it could not find.
See playbooks/education-proposal-deck-interactions.md for how the planner works.
"""
import base64, os, re, subprocess, sys, tempfile

if len(sys.argv) < 3:
    sys.exit(__doc__)
src, dst = sys.argv[1], sys.argv[2]
skip_webp = '--skip-webp' in sys.argv
s = open(src, encoding='utf-8').read()

if 'id="plan"' in s:
    sys.exit('This file already has the call planner. Run the script on Zaid\'s original export.')

def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit(f'Expected {n} match(es), found {c}, for:\n  {old[:120]}')
    s = s.replace(old, new)

# ---------------------------------------------------------------- 1. spacing
rep('.xs{font-size:13.5px;line-height:1.45;color:var(--ink-2);margin:10px 0 58px;max-width:1200px}',
    '.xs{font-size:13.5px;line-height:1.45;color:var(--ink-2);margin:10px 0 84px;max-width:1200px}')
rep('<p class="xs" style="margin:-50px 0 58px">', '<p class="xs" style="margin:-60px 0 84px">')
rep('.fs{display:grid;grid-template-columns:430px 1fr;gap:64px;flex:1;min-height:0;margin-bottom:70px}',
    '.fs{display:grid;grid-template-columns:430px 1fr;gap:64px;flex:1;min-height:0;margin-bottom:84px}')
rep('.newwork .im{height:440px;display:flex;align-items:flex-end}', '.newwork .im{height:410px;display:flex;align-items:flex-end}')
rep('gap:64px;flex:1;min-height:0;margin-bottom:70px"><div style="display:flex;flex-direction:column">',
    'gap:64px;flex:1;min-height:0;margin-bottom:84px"><div style="display:flex;flex-direction:column">')
# full-height cards: the workshop flip, and (from the November export) the lead-loss tiers and the ads dashboard
for old, new in [('.flipwrap{flex:1;min-height:0;margin:18px 0 64px;', '.flipwrap{flex:1;min-height:0;margin:18px 0 84px;'),
                 ('.tview{flex:1;min-height:0;margin:16px 0 60px;', '.tview{flex:1;min-height:0;margin:16px 0 84px;'),
                 ('.md{flex:1;min-height:0;margin:12px 0 60px;', '.md{flex:1;min-height:0;margin:12px 0 84px;')]:
    if old in s:
        rep(old, new)
    else:
        print('Note: spacing rule not found, skipped:', old[:40])

# ---------------------------------------------------------------- 2. WebP
if not skip_webp:
    tmp = tempfile.mkdtemp()
    stats = {'n': 0, 'before': 0, 'after': 0}
    def conv(m):
        raw = base64.b64decode(m.group(1))
        stats['n'] += 1
        jp, wp = f"{tmp}/{stats['n']}.jpg", f"{tmp}/{stats['n']}.webp"
        open(jp, 'wb').write(raw)
        w = int(subprocess.check_output(['sips', '-g', 'pixelWidth', jp]).split()[-1])
        subprocess.check_call(['cwebp', '-quiet', '-q', '82', '-m', '6', '-sharp_yuv']
                              + (['-resize', '1200', '0'] if w > 1200 else []) + [jp, '-o', wp])
        out = open(wp, 'rb').read()
        stats['before'] += len(raw); stats['after'] += len(out)
        return 'data:image/webp;base64,' + base64.b64encode(out).decode()
    s = re.sub(r'data:image/jpeg;base64,([A-Za-z0-9+/=]+)', conv, s)
    print(f"WebP: {stats['n']} photos, {stats['before']/1e6:.2f}MB to {stats['after']/1e6:.2f}MB")

# ---------------------------------------------------------------- Toggle-only variant
# --no-iwisers: for meetings Toggle presents alone. Removes the iWisers name and
# the work iWisers delivers (parent community seeding), so the deck does not
# present their service as ours: the partnership and parent-thread slides go,
# along with the seeder card, seeding lanes and the "iWisers assisted" source.
if '--no-iwisers' in sys.argv:
    rep('<meta name="description" content="Toggle and iWisers education pitch:', '<meta name="description" content="Toggle education pitch:')
    rep('Education growth deck, Toggle x iWisers.', 'Education growth deck, Toggle.')
    rep('<span class="x">×</span><span class="iw">iWisers</span></div>', '</div>')
    rep('<span>Education growth · Toggle × iWisers</span>', '<span>Education growth · Toggle</span>')
    # the two slides that exist to show the partnership
    rep('const SYSTEM=["split","jobs","geo","thread",', 'const SYSTEM=["jobs","geo",')
    rep('initGeo,initThread,', 'initGeo,')
    # channels: the seeder card belongs to iWisers
    rep(',\n  {n:"Seeders",j:"Start the conversations parents trust",who:"Parent groups, forums and school chats where families ask each other.",m:"Mentions, branded search lift and assisted enquiries",o:"iWisers"}', '')
    rep('The SEO and GEO and seeder roles are proposed.', 'The SEO and GEO role is proposed.')
    # intake planner and open days: drop the seeding lanes
    rep('\n  {n:"Community seeding",c:"#0E8C9C",o:"iWisers",f:(m)=>[...intakes].some(i=>[(i+10)%12,(i+11)%12,(i+9)%12].includes(m))?1:0},', '')
    rep('Seeding starts ten weeks ahead, search peaks around results,', 'Search peaks around results,')
    rep('\n  {n:"Parent group answers",a:-21,b:-5,o:"iw",d:"iWisers parents answer open day questions already asked in their groups: what to ask, what to bring."},', '')
    # GEO, dashboard mockup and the close
    rep('Forum threads and parent discussions, which is where iWisers and GEO meet.', 'Forum threads and parent discussions that AI assistants read and quote.')
    rep(',["iWisers assisted",15]]', ']')
    rep(' iWisers brings what parents are asking in the groups.', '')
    # slide 6 (Finding 01, IJN): Yi Yang, 2 Nov 2026, name IJN instead of UNITAR
    rep('<p class="body">UNITAR reached the same conclusion: ads that list modules', '<p class="body">IJN reached the same conclusion: ads that list modules')
    # strip the removed slides' data and the unused labels, so the source carries no trace either
    for start in ('BODY.thread = {', 'BODY.split = {'):
        m = re.search(re.escape(start) + r'.*?(?=\n/\* =====)', s, re.S)
        if not m:
            sys.exit(f'Could not find the block starting {start}')
        s = s[:m.start()] + s[m.end():]
    rep('{iWisers:"own iw",Joint:"own jt"}', '{Joint:"own jt"}')
    rep('${l.o==="iw"?"iWisers":', '${l.o==="iw"?"Partner":')
    left = len(re.findall(r'iwisers|seeder', re.sub(r'base64,[A-Za-z0-9+/=]+', '', s), re.I))
    if left:
        sys.exit(f'Toggle-only: {left} mention(s) of iWisers or seeders are still in the file. Find them and add a rule above.')
    print('Toggle-only: no mention of iWisers or seeders left in the file.')

# the rail's "The system" label starts at the first system slide, whichever that is
rep('{const firstSys=SL.findIndex(s=>s.id==="ex-split"),', '{const firstSys=SL.findIndex(s=>s.id==="ex-"+SYSTEM[0]),')

# ---------------------------------------------------------------- 3. planner
ICON = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h9M19 6h1M4 12h3M13 12h7M4 18h11M21 18h-1"/><circle cx="16" cy="6" r="2.2"/><circle cx="10" cy="12" r="2.2"/><circle cx="18" cy="18" r="2.2"/></svg>'

CSS = r'''
/* call planner: pick the slides for this conversation */
#plan{position:fixed;inset:0;z-index:40;display:none;align-items:center;justify-content:center;padding:12px;background:rgba(11,20,36,.6);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
body.planning #plan{display:flex}
.pp{width:min(1120px,100%);max-height:100%;overflow:auto;background:var(--paper);color:var(--ink);border-radius:20px;padding:22px 32px 16px;box-shadow:0 40px 90px -30px rgba(0,0,0,.6);animation:pop .35s var(--ease)}
.pph{display:flex;justify-content:space-between;align-items:flex-start;gap:20px}
.pt{font-family:var(--serif);font-weight:400;font-size:34px;line-height:1.02;letter-spacing:-.02em;margin:8px 0 0}
.pt em{font-style:italic;color:var(--accent)}
.ppx{flex:0 0 auto;width:40px;height:40px;border-radius:50%;border:1px solid var(--line);background:var(--paper-lift);font-size:22px;line-height:1;color:var(--ink-2)}
.ppx:hover{border-color:var(--ink);color:var(--ink)}
.pprow{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:34px;margin-top:14px;padding-top:14px;border-top:1px solid var(--line)}
.ppname input{display:block;width:100%;margin-top:6px;border:0;border-bottom:1.5px dashed var(--ink-3);background:transparent;font-family:var(--mono);font-size:18px;padding:4px 2px;outline:none}
.ppname input:focus{border-bottom:1.5px solid var(--accent)}
.ppmode .small{margin-top:6px;font-size:12.5px}
.ppmode .seg{margin-top:6px}
.ppsec{margin-top:14px;padding-top:12px;border-top:1px solid var(--line)}
.pplab{display:flex;align-items:baseline;gap:16px;flex-wrap:wrap;margin-bottom:8px}
.pplab .small{font-size:12.5px;color:var(--ink-3)}
.pp input[type=checkbox]{accent-color:var(--accent);width:16px;height:16px;margin:2px 0 0;flex:0 0 auto}
.ppaud{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.ppaud label{display:flex;gap:10px;align-items:flex-start;cursor:pointer;padding:6px 11px;border:1px solid var(--line);border-radius:10px;background:var(--paper-lift);font-size:14px;line-height:1.3;transition:.2s}
.ppaud label:hover{border-color:var(--ink-3)}
.ppaud label:has(input:checked){border-color:var(--accent);background:var(--accent-wash)}
.ppaud small{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3);margin-top:3px}
.ppaud label:has(input:checked) small{color:var(--accent-deep)}
.ppsl{column-count:3;column-gap:28px}
.ppsl h4{font-family:var(--mono);font-size:10.5px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--accent);margin:0 0 6px;break-after:avoid}
.ppsl h4:not(:first-child){margin-top:9px}
.ppsl label{display:flex;gap:9px;align-items:center;cursor:pointer;break-inside:avoid;padding:1.5px 0;font-size:13px;line-height:1.3}
.ppsl label input{margin:0}
.ppsl .n{font-family:var(--mono);font-size:11px;color:var(--ink-3);flex:0 0 20px}
.ppsl .t{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ppsl label:has(input:not(:checked)) .t{color:var(--ink-3)}
.ppf{display:flex;align-items:center;gap:10px;margin-top:14px;padding-top:12px;border-top:1px solid var(--line);flex-wrap:wrap}
.ppf .ppk{margin-left:auto;color:var(--ink-3);font-size:12.5px}
.pplink{font-family:var(--mono);font-size:11px;width:240px;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--paper-lift);color:var(--ink-2)}
#railList button.extra{opacity:.4}
#railList button.extra .rn{color:rgba(234,241,250,.55)}
#railList .railset{color:var(--aqua)}
#railList .railset .rn svg{margin:0 auto}
.agenda a.extra{opacity:.5;border-style:dashed}
.prep{font-family:var(--mono);font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-2);margin:30px 0 0;position:relative;z-index:3}
.prep[hidden]{display:none}
@media print{.slide.skip{display:none!important}#plan{display:none!important}}
'''
rep('/* chrome outside the stage */', CSS + '\n/* chrome outside the stage */')

rep('<nav id="nav" aria-label="Slide navigation">\n  <button type="button" id="prev"',
    '<nav id="nav" aria-label="Slide navigation">\n  <button type="button" id="setupBtn" aria-label="Set up this call" title="Set up this call (S)">' + ICON + '</button>\n  <button type="button" id="prev"')

PANEL = '''<div id="plan" role="dialog" aria-modal="true" aria-labelledby="planT">
 <div class="pp">
  <div class="pph"><div><div class="kick">Set up this call</div><h2 class="pt" id="planT">Pick the slides <em>for this conversation</em>.</h2></div><button type="button" class="ppx" id="planClose" aria-label="Close">&times;</button></div>
  <div class="pprow">
   <div class="ppname"><div class="pplab" style="margin:0"><label class="mono" for="uniName">Prepared for</label><span class="small" id="nameNote"></span></div><input id="uniName" type="text" placeholder="Prospect name, for example Multimedia University" autocomplete="off" maxlength="60"></div>
   <div class="ppmode"><span class="mono">Start from</span><div class="seg" id="planMode"><button type="button" data-v="full" aria-pressed="true">Full deck</button><button type="button" data-v="short" aria-pressed="false">Short call</button></div><p class="small" id="planStat"></p></div>
  </div>
  <div class="ppsec"><div class="pplab"><span class="mono">What the pre-call audit found</span><span class="small">Each tick adds the slides that answer it. A short call keeps at least two findings and two system slides.</span></div><div class="ppaud" id="planAudit"></div></div>
  <div class="ppsec"><div class="pplab"><span class="mono" id="planCount"></span><span class="small">Unticked slides stay in the rail, dimmed, so you can still open one if they ask.</span></div><div class="ppsl" id="planSlides"></div></div>
  <div class="ppf"><button type="button" class="btn ghost" id="planReset">Reset to full deck</button><button type="button" class="btn ghost" id="planLink">Copy setup link</button><input class="pplink" id="planLinkOut" readonly hidden aria-label="Setup link"><span class="small ppk">Press S to open this panel</span><button type="button" class="btn solid" id="planGo"></button></div>
 </div>
</div>
'''
rep('<svg style="display:none" xmlns="http://www.w3.org/2000/svg"><symbol id="wm"', PANEL + '<svg style="display:none" xmlns="http://www.w3.org/2000/svg"><symbol id="wm"')

# the cover's hidden name field moves into the panel; the cover shows "Prepared for" once a name is set
m = re.search(r'\n\s*<div class="setup" style="display:none">.*?</div>(</section>`,)', s)
if not m:
    sys.exit('Could not find the hidden "Prepared for" field on the cover.')
s = s[:m.start()] + '\n  <p class="prep" id="prepLine" hidden>Prepared for <span class="uni-n">Your University</span></p>' + m.group(1) + s[m.end():]

rep('$("#pg").textContent=`${String(n+1).padStart(2,"0")} / ${SL.length}`;', 'const pl=planPos(n);$("#pg").textContent=pl.label;')
rep('$("#prog").style.width=((n+1)/SL.length*100)+"%";', '$("#prog").style.width=pl.pct+"%";')
rep('$("#prev").addEventListener("click",()=>go(cur-1));$("#next").addEventListener("click",()=>go(cur+1));',
    '$("#prev").addEventListener("click",()=>step(-1));$("#next").addEventListener("click",()=>step(1));')
rep('if(t.matches&&t.matches("input,textarea,select"))return;',
    'if(t.matches&&t.matches("input,textarea,select"))return;if(document.body.classList.contains("planning"))return;')
rep('{e.preventDefault();go(cur+1)}', '{e.preventDefault();step(1)}')
rep('{e.preventDefault();go(cur-1)}', '{e.preventDefault();step(-1)}')
rep('else if(e.key==="Home")go(0);else if(e.key==="End")go(SL.length-1);',
    'else if(e.key==="Home")go(SEQ[0]);else if(e.key==="End")go(SEQ[SEQ.length-1]);\n  else if((e.key==="s"||e.key==="S")&&!e.metaKey&&!e.ctrlKey&&!e.altKey)openPlan();')

JS = r'''/* =========================================================================
   CALL PLANNER (added by toggle-brain/tools/edu-deck-patch)
   Pick the slides for one conversation. Arrow keys step through the picked
   slides only; the rest stay in the rail as extras. The pick is saved in
   this browser and can travel as a link (?for=Name&slides=1.2.3).
   ========================================================================= */
const ALL=SL.map((_,i)=>i);
const T=t=>{let i=SL.findIndex(s=>s.dataset.title===t);if(i<0)i=SL.findIndex(s=>(s.dataset.title||"").startsWith(t));if(i<0)console.error("planner: no slide titled "+t);return i};
/* every short call keeps these */
const CORE=["Cover","Our top performing ads","The evidence base","Proof at scale","Five findings","The through-line","The honest limit","Next step"];
/* used to top up when the audit names fewer than two findings or two system slides */
const DEF_F=["Finding 01: The course is not the hook","Finding 02"],DEF_S=["Intake planning","Lead nurturing"];
const AUDIT=[
  {k:"syllabus",g:"f",l:"Their ads lead with the course, the modules or the accreditation",t:"Finding 01",s:["Finding 01: The course is not the hook"]},
  {k:"traffic",g:"f",l:"Their ads send people to a website instead of a lead form",t:"Finding 02",s:["Finding 02"]},
  {k:"price",g:"f",l:"Their ads never name a fee, a scholarship or a waiver",t:"Finding 03",s:["Finding 03"]},
  {k:"translated",g:"f",l:"Their Chinese or Bahasa ads are translated from English",t:"Finding 04",s:["Finding 04"]},
  {k:"stale",g:"f",l:"The same few ads have been running for months",t:"Finding 05 and the campus workshops",s:["Finding 05","Campus creative workshops"]},
  {k:"ai",g:"s",l:"AI assistants do not name them when parents ask",t:"Search and AI",s:["Search and AI"]},
  {k:"openday",g:"s",l:"An intake or open day is less than eight weeks away",t:"Open days and open day nurture",s:["Open days","Open day nurture"]},
  {k:"parents",g:"s",l:"Parents drive the decision (foundation, diploma, school)",t:"Lead nurturing",s:["Lead nurturing"]},
  {k:"programmes",g:"s",l:"Several programmes compete for one budget",t:"On-demand pivots",s:["On-demand pivots"]},
  {k:"postgrad",g:"s",l:"They have a postgraduate or online arm with long decisions",t:"Sales and marketing",s:["Sales and marketing"]},
  {k:"lost",g:"s",l:"Nobody can say why most of their leads never enrol",t:"Why leads are lost",s:["Why leads are lost"]},
  {k:"report",g:"s",l:"They cannot see what each ad costs per lead",t:"Live ads dashboard",s:["Live ads dashboard"]}
].filter(a=>a.s.every(t=>SL.some(s=>(s.dataset.title||"").startsWith(t))));   /* drop ticks whose slides are not in this deck */
let plan={mode:"full",audit:[],add:[],del:[]};   /* add and del hold slide titles */
var SEQ=ALL.slice();
const topUp=(l,d)=>{l=[...l];for(const x of d){if(l.length>=2)break;if(!l.includes(x))l.push(x)}return l};
function shortBase(){const a=AUDIT.filter(x=>plan.audit.includes(x.k)),f=a.filter(x=>x.g==="f").flatMap(x=>x.s),sy=a.filter(x=>x.g==="s").flatMap(x=>x.s);
  return new Set([...CORE,...topUp(f,DEF_F),...topUp(sy,DEF_S)].map(T).filter(i=>i>=0))}
function computeSeq(){const b=plan.mode==="full"?new Set(ALL):shortBase();
  plan.add.map(T).forEach(i=>{if(i>=0)b.add(i)});plan.del.map(T).forEach(i=>b.delete(i));
  if(!b.size)b.add(0);return [...b].sort((x,y)=>x-y)}
const pad=n=>String(n).padStart(2,"0");
function planPos(n){const i=SEQ.indexOf(n);
  if(i>=0)return {label:`${pad(i+1)} / ${SEQ.length}`,pct:(i+1)/SEQ.length*100};
  return {label:`Extra · ${pad(n+1)}`,pct:SEQ.filter(x=>x<n).length/SEQ.length*100}}
/* arrows move through the picked slides; from an extra they return to the sequence */
function step(d){const i=SEQ.indexOf(cur);let n;
  if(i>=0)n=SEQ[Math.max(0,Math.min(SEQ.length-1,i+d))];
  else n=d>0?(SEQ.find(x=>x>cur)??SEQ[SEQ.length-1]):([...SEQ].reverse().find(x=>x<cur)??SEQ[0]);
  go(n)}
function applyPlan(save=true){SEQ=computeSeq();const on=new Set(SEQ);
  SL.forEach((s,i)=>{const p=SEQ.indexOf(i),pn=$(".sf .pn",s);if(pn)pn.textContent=p>=0?`${pad(p+1)} / ${SEQ.length}`:"Extra";s.classList.toggle("skip",!on.has(i))});
  $$("#railList button[data-n]").forEach(b=>{const p=SEQ.indexOf(+b.dataset.n);b.classList.toggle("extra",p<0);$(".rn",b).textContent=p>=0?pad(p+1):"+"});
  $$("#agenda a").forEach(a=>{const p=SEQ.indexOf(+a.getAttribute("href").slice(1)-1);a.classList.toggle("extra",p<0);$(".an",a).textContent=p>=0?pad(p+1):"Extra"});
  if(save)store.set("edu-plan",plan);
  if(cur>=0){const pl=planPos(cur);$("#pg").textContent=pl.label;$("#prog").style.width=pl.pct+"%"}
  renderPlanUI()}
function renderPlanUI(){const ed=plan.add.length||plan.del.length;
  $$("#planMode button").forEach(b=>{b.setAttribute("aria-pressed",b.dataset.v===plan.mode);b.textContent=b.dataset.v==="full"?`Full deck · ${SL.length}`:`Short call · ${shortBase().size}`});
  $("#planStat").textContent=`${plan.mode==="full"?"The full deck":"The short call"}${ed?" with your edits":""}. The arrow keys step through ${SEQ.length} slides.`;
  $$("#planAudit input").forEach(x=>x.checked=plan.audit.includes(x.dataset.a));
  const on=new Set(SEQ);$$("#planSlides input").forEach(x=>x.checked=on.has(+x.dataset.n));
  $("#planCount").textContent=`Slides in this call · ${SEQ.length} of ${SL.length}`;
  $("#planGo").textContent=`Present ${SEQ.length} slides →`}
/* the panel scales to the window like the stage does, down to 72%, then scrolls */
function fitPanel(){const e=$(".pp");e.style.zoom="";const z=Math.min(1,(innerHeight-24)/e.scrollHeight);if(z<1)e.style.zoom=Math.max(.72,z).toFixed(3)}
addEventListener("resize",()=>{if(document.body.classList.contains("planning"))fitPanel()});
function openPlan(){document.body.classList.add("planning");$("#stage").inert=true;renderPlanUI();fitPanel();setTimeout(()=>$("#planGo").focus({preventScroll:true}),60)}
function closePlan(){document.body.classList.remove("planning");$("#stage").inert=false}
{
  const FS=SL.findIndex(s=>s.id==="ex-"+SYSTEM[0]),LAST=SL.length-1;
  const nUni=new Set([...$$(".uni-n").map(e=>e.closest(".slide")),$("#ex-geo")].filter(Boolean)).size;   /* the AI answer writes the name in by script */
  $("#nameNote").textContent=`Shows on ${nUni} slides, including the cover.`;
  $("#planAudit").innerHTML=AUDIT.map(a=>`<label><input type="checkbox" data-a="${a.k}"><span>${a.l}<small>Adds ${a.t}</small></span></label>`).join("");
  const grp=(h,a,b)=>`<h4>${h}</h4>`+SL.slice(a,b).map((s,j)=>`<label title="${esc(s.dataset.title)}"><input type="checkbox" data-n="${a+j}"><span class="n">${pad(a+j+1)}</span><span class="t">${esc(s.dataset.title)}</span></label>`).join("");
  $("#planSlides").innerHTML=grp("The proof",0,FS)+grp("The system",FS,LAST)+grp("Close",LAST,LAST+1);
  $("#planAudit").addEventListener("change",e=>{const k=e.target.dataset.a;if(!k)return;
    plan.audit=e.target.checked?[...new Set([...plan.audit,k])]:plan.audit.filter(x=>x!==k);
    if(plan.mode==="full"){plan.mode="short";plan.add=[];plan.del=[]}applyPlan()});
  $("#planSlides").addEventListener("change",e=>{const i=+e.target.dataset.n;if(isNaN(i))return;const t=SL[i].dataset.title,b=plan.mode==="full"?new Set(ALL):shortBase();
    plan.add=plan.add.filter(x=>x!==t);plan.del=plan.del.filter(x=>x!==t);
    if(e.target.checked&&!b.has(i))plan.add.push(t);if(!e.target.checked&&b.has(i))plan.del.push(t);applyPlan()});
  $("#planMode").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;plan.mode=b.dataset.v;plan.add=[];plan.del=[];applyPlan()});
  $("#planReset").addEventListener("click",()=>{plan={mode:"full",audit:[],add:[],del:[]};applyPlan()});
  $("#planGo").addEventListener("click",()=>{closePlan();go(SEQ[0])});
  $("#planClose").addEventListener("click",closePlan);
  $("#plan").addEventListener("click",e=>{if(e.target.id==="plan")closePlan()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&document.body.classList.contains("planning"))closePlan()});
  $("#setupBtn").addEventListener("click",openPlan);
  $("#railList").insertAdjacentHTML("afterbegin",`<li><button type="button" class="railset" id="railSet" aria-label="Set up this call"><span class="rn">''' + ICON + r'''</span><span class="rt">Set up this call</span></button></li>`);
  $("#railSet").addEventListener("click",e=>{e.stopPropagation();e.currentTarget.blur();openPlan()});
  $("#planLink").addEventListener("click",()=>{const u=new URL(location.href),q=new URLSearchParams();u.hash="";
    if(nameIn.value.trim())q.set("for",nameIn.value.trim());q.set("slides",SEQ.map(i=>i+1).join("."));u.search=q.toString();
    const link=u.toString(),o=$("#planLinkOut"),btn=$("#planLink");o.hidden=false;o.value=link;o.select();
    const done=()=>{btn.textContent="Link copied";setTimeout(()=>btn.textContent="Copy setup link",2200)};
    (navigator.clipboard?navigator.clipboard.writeText(link):Promise.reject()).then(done,()=>{try{if(document.execCommand("copy"))done()}catch(err){}})});
  /* the cover shows "Prepared for" only once a name is set */
  const prep=()=>{$("#prepLine").hidden=!nameIn.value.trim()};nameIn.addEventListener("input",prep);
  /* a setup link wins over what this browser saved */
  const q=new URLSearchParams(location.search);
  if(q.get("for")!=null){nameIn.value=q.get("for");applyName(true)}
  if(q.get("slides")){const want=new Set(q.get("slides").split(".").map(x=>+x-1).filter(i=>i>=0&&i<SL.length));
    plan={mode:"full",audit:[],add:[],del:ALL.filter(i=>!want.has(i)).map(i=>SL[i].dataset.title)}}
  else{const sv=store.get("edu-plan",null);if(sv&&sv.mode)plan={mode:sv.mode,audit:sv.audit||[],add:sv.add||[],del:sv.del||[]}}
  prep();applyPlan(!!q.get("slides"));
}

go(fromHash());
(document.fonts'''
rep('go(fromHash());\n(document.fonts', JS)

open(dst, 'w', encoding='utf-8').write(s)
print(f'Wrote {dst} ({os.path.getsize(dst)/1e6:.2f}MB)')
