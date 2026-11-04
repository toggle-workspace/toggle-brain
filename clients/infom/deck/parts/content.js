/* =========================================================================
   DECK CONTENT. Every figure is listed in SRC at the bottom of each record
   and traces to the sources slide. Mockups use a placeholder cyber client
   (CYBER) so INFOM can picture its own client in the ads.
   ========================================================================= */
const q=new URLSearchParams(location.search);
const PARTNER=(q.get("for")||"INFOM").slice(0,40);
const CYBER=(q.get("client")||"Example Cyber").slice(0,40);
const CYBER_DOM=CYBER.toLowerCase().replace(/[^a-z0-9]/g,"")+".com.au";
const CY_IN=CYBER.split(/\s+/).map(w=>w[0]).join("").slice(0,2).toUpperCase();
const DECK_NAME="Cybersecurity growth · Toggle";
const BODY={},INITS=[];

/* small line icons, 24 grid */
const IC={
  laptop:'<path d="M4 6h16v10H4z"/><path d="M2 19h20"/>',
  wifi:'<path d="M2.5 9a14 14 0 0 1 19 0"/><path d="M5.5 12.5a9.5 9.5 0 0 1 13 0"/><path d="M8.7 16a5 5 0 0 1 6.6 0"/><circle cx="12" cy="19" r="1"/>',
  wall:'<path d="M3 5h18v14H3z"/><path d="M3 9.7h18M3 14.3h18M8 5v4.7M15 5v4.7M11.5 9.7v4.6M6 14.3V19M17 14.3V19"/>',
  vpn:'<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  cloud:'<path d="M7 18a4.5 4.5 0 0 1-.5-9 6 6 0 0 1 11.6 1.6A3.8 3.8 0 0 1 17.5 18z"/>',
  data:'<ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6"/><path d="M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6"/>',
  user:'<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
  card:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h4"/>',
  heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/><path d="M8 12h2l1-2 2 4 1-2h2"/>',
  bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
  key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l3 3M14 9l2 2"/>'
};
const ico=(k,cls="")=>`<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true">${IC[k]}</svg>`;

/* =========================================================================
   THE THREAT · 02 THE ALARM
   ========================================================================= */
const ALARM=⟪ALARM⟫;

/* =========================================================================
   03 THREE CLOCKS
   ========================================================================= */
BODY.clocks={
  title:'Every buyer is on <em>one of three clocks</em>.',
  kicker:'A cyber purchase starts when something forces it. Each clock changes what the buyer searches and what message works. Click a clock.',
  body:`<div class="clocks" id="clocks"></div><div class="clkpanel" id="clkPanel" aria-live="polite"></div>`,
  src:⟪CLOCK_SRC⟫
};
const CLOCKS=⟪CLOCKS⟫;
function initClocks(){
  const box=$("#clocks");
  box.innerHTML=CLOCKS.map((c,i)=>`<button type="button" class="clk${c.k==="breach"?" br":""}" data-i="${i}" aria-pressed="${i===2}">${c.k==="breach"?'<span class="likely">The likely one</span>':""}
    <svg viewBox="0 0 86 86" aria-hidden="true"><circle class="face" cx="43" cy="43" r="38"/><circle class="rim" cx="43" cy="43" r="36"/><circle class="arc" cx="43" cy="43" r="36" transform="rotate(-90 43 43)" stroke-dasharray="0 226.2" data-a="${c.arc}"/><line class="hand" x1="43" y1="43" x2="43" y2="16" data-r="${c.arc*360}"/><circle cx="43" cy="43" r="3.5" fill="var(--ink)"/></svg>
    <span><span class="tn">${c.n}</span><span class="tt">${c.t}</span><span class="ts">${c.s}</span></span></button>`).join("");
  const wind=on=>$$(".clk",box).forEach(b=>{const a=$(".arc",b),h=$(".hand",b);a.setAttribute("stroke-dasharray",on?`${+a.dataset.a*226.2} 226.2`:"0 226.2");h.style.transform=`rotate(${on?h.dataset.r:0}deg)`});
  const show=i=>{const c=CLOCKS[i];$$(".clk",box).forEach(b=>b.setAttribute("aria-pressed",+b.dataset.i===i));
    $("#clkPanel").innerHTML=`<div class="card"><span class="mono">The deadlines</span><div class="dl${c.k==="breach"?" br":""}">${c.dl.map(d=>`<div><b>${d[0]}</b><span>${d[1]}</span></div>`).join("")}</div></div>
      <div class="card"><span class="mono">What they type</span><div class="qs">${c.qs.map(x=>`<span>${x}</span>`).join("")}</div><span class="mono" style="margin-top:16px">Who feels it first</span><p>${c.who}</p></div>
      <div class="card" style="display:flex;flex-direction:column"><span class="mono">The message that wins</span><p class="msg">${c.msg}</p><span class="mono" style="margin-top:auto;padding-top:14px">Channel</span><p>${c.ch}</p></div>`};
  box.addEventListener("click",e=>{const b=e.target.closest(".clk");if(b)show(+b.dataset.i)});
  show(2);onOpen(box,()=>setTimeout(()=>wind(true),60),()=>wind(false));
}
INITS.push(initClocks);

/* =========================================================================
   04 CRITICAL DATA
   ========================================================================= */
BODY.jewels={
  title:'Every pitch starts with <em>one question</em>.',
  kicker:'The answer decides which product we lead with and what the ads say. Click a type of data.',
  body:`<div class="cj"><div class="cjq"><span class="mono">Ask this first</span><h3>What is your <em>most important data</em>?</h3><p>Ask it before the product sheet or the price. Every buyer knows the answer.</p><div class="cjgrid" id="cjGrid"></div></div><div class="cjout" id="cjOut" aria-live="polite"></div></div>`,
  src:'Product categories and attack paths are Toggle\'s mapping for this deck, to be checked with each cyber client\'s own product team.'
};
const JEWELS=[
  {k:"user",n:"Customer identity records",lives:"CRM, the core banking or policy system, and the cloud apps every team exports from.",hit:["Stolen staff logins","Phishing","Third-party vendors"],guard:["Identity and access","Cloud security","Data protection"],msg:"If your customer list walked out today, which of your vendors would know first?"},
  {k:"card",n:"Payments and transactions",lives:"Payment gateways, finance systems and the email threads that approve transfers.",hit:["Business email compromise","Invoice fraud","Ransomware"],guard:["Email security","Endpoint","Data protection"],msg:"Fake invoices arrive from real supplier email accounts."},
  {k:"heart",n:"Health records",lives:"Practice software, lab systems, imaging archives and the shared drives between clinics.",hit:["Ransomware","Legacy devices","Prescription and lab vendors"],guard:["Endpoint","Backup and recovery","Data protection"],msg:"A stolen patient record stays stolen for life. Here is how clinics protect it."},
  {k:"bulb",n:"Intellectual property",lives:"Design files, source code, research data and the cloud folders shared with partners.",hit:["Insider downloads","Compromised partners","Cloud misconfiguration"],guard:["Data protection","Cloud security","Endpoint"],msg:"Your designs leave the building every time a partner opens a shared folder."},
  {k:"gear",n:"Operational systems",lives:"Plant controls, building systems, logistics platforms and the remote access that runs them.",hit:["Exploited VPN and edge devices","Ransomware","Remote access abuse"],guard:["Physical firewall","VPN and zero trust","Segmentation"],msg:"The control room is one stolen VPN password away from the internet."},
  {k:"key",n:"Staff credentials",lives:"Email, single sign-on, laptops and every personal phone that reads work email.",hit:["Phishing","Password reuse","Infostealer malware"],guard:["Endpoint","Identity and access","Email security"],msg:"Most attackers get in with a stolen login."}
];
function initJewels(){
  $("#cjGrid").innerHTML=JEWELS.map((j,i)=>`<button type="button" class="gem" data-i="${i}" aria-pressed="${i===0}">${ico(j.k)}<b>${j.n}</b></button>`).join("");
  const show=i=>{const j=JEWELS[i];$$(".gem").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.i===i));
    $("#cjOut").innerHTML=`<div class="cjrow"><span class="mono">Where it lives</span><p>${j.lives}</p></div>
      <div class="cjrow"><span class="mono">What goes after it</span><div class="chips">${j.hit.map(x=>`<span class="chip t">${x}</span>`).join("")}</div></div>
      <div class="cjrow"><span class="mono">What guards it</span><div class="chips">${j.guard.map(x=>`<span class="chip">${x}</span>`).join("")}</div></div>
      <div class="cjrow hl"><span class="mono">The opening line</span><p>${j.msg}</p></div>`};
  $("#cjGrid").addEventListener("click",e=>{const b=e.target.closest(".gem");if(b)show(+b.dataset.i)});show(0);
}
INITS.push(initJewels);

/* =========================================================================
   05 THE MAP: network path x data flow
   ========================================================================= */
BODY.map={
  title:'A file passes five stops, and <em>each one needs a product</em>.',
  kicker:'Follow a file from a laptop to the cloud. Each stop is a place to attack it and a product that defends it. Switch the flow, then click a stop.',
  body:`<div class="mapwrap"><div class="netcard"><div class="ctrlrow" style="margin-bottom:10px"><div class="seg" id="flowSeg"><button type="button" data-v="in" aria-pressed="true">Within a department</button><button type="button" data-v="x" aria-pressed="false">Across departments</button></div></div><svg class="netsvg" id="net" viewBox="0 0 900 400" role="img" aria-label="Network path from laptop to cloud for two departments"></svg><div class="netlegend" id="netLeg"></div></div><div class="hopcard" id="hopCard" aria-live="polite"></div></div>`,
  src:⟪MAP_SRC⟫
};
const HOPS=⟪HOPS⟫;
function initMap(){
  const X=[70,235,400,565,770],Y1=118,Y2=300,W=118,H=74;
  const node=(i,y,lane)=>{const h=HOPS[i];return `<g class="hop" data-i="${i}" tabindex="0" role="button" aria-label="${h.n}: ${h.p}"><rect x="${X[i]-W/2}" y="${y-H/2}" width="${W}" height="${H}" rx="14"/><g transform="translate(${X[i]-12},${y-28})">${`<svg width="24" height="24" viewBox="0 0 24 24"><g class="ic">${IC[h.k]}</g></svg>`}</g><text class="hn" x="${X[i]}" y="${y+12}" text-anchor="middle">${h.n}</text><text class="hp" x="${X[i]}" y="${y+28}" text-anchor="middle">${h.short}</text></g>`};
  const wire=(y)=>`<path class="wire" d="M${X[0]+W/2} ${y} H${X[3]-W/2}"/>`;
  $("#net").innerHTML=`<rect class="lane" x="0" y="44" width="900" height="148" rx="16"/><rect class="lane2" x="0" y="226" width="900" height="148" rx="16"/>
    <text class="lt" x="18" y="66">FINANCE TEAM</text><text class="lt" x="18" y="248">HR TEAM</text>
    ${wire(Y1)}${wire(Y2)}<path class="wire" d="M${X[3]+W/2} ${Y1} C 680 ${Y1}, 680 ${Y1}, ${X[4]-W/2} ${(Y1+Y2)/2}"/><path class="wire" d="M${X[3]+W/2} ${Y2} C 680 ${Y2}, 680 ${Y2}, ${X[4]-W/2} ${(Y1+Y2)/2}"/>
    <path class="flow" id="flIn" d="M${X[0]} ${Y1} H${X[3]} C 680 ${Y1}, 680 ${Y1}, ${X[4]-W/2} ${(Y1+Y2)/2}"/>
    <path class="flow x" id="flX" d="M${X[0]} ${Y1} H${X[3]} C 680 ${Y1}, 680 ${Y1}, ${X[4]-W/2} ${(Y1+Y2)/2} M${X[4]-W/2} ${(Y1+Y2)/2} C 680 ${Y2}, 680 ${Y2}, ${X[3]} ${Y2} H${X[0]}"/>
    ${[0,1,2,3].map(i=>node(i,Y1)).join("")}${[0,1,2,3].map(i=>node(i,Y2)).join("")}${node(4,(Y1+Y2)/2)}`;
  let mode="in",sel=0;
  const legend=()=>{$("#netLeg").innerHTML=mode==="in"?'<span><i></i>A payroll file stays with Finance: laptop to cloud and back</span>':'<span><i class="x"></i>Finance shares the payroll file with HR: it crosses the cloud into a second team\'s devices</span>'};
  const show=i=>{sel=i;const h=HOPS[i],x=mode==="x"&&h.x;$$("#net .hop").forEach(g=>g.classList.toggle("sel",+g.dataset.i===i));
    $("#hopCard").innerHTML=`<div class="card"><span class="mono">Stop ${i+1} of 5 · ${h.n}</span><h3>${h.p}</h3><p>${x?h.x:h.d}</p><div class="stat"><b>${h.stat[0]}</b><span>${h.stat[1]}<small>${h.stat[2]}</small></span></div></div>
      <div class="card" style="padding:16px 22px"><span class="mono">Products in this category</span><div class="chips" style="margin-top:8px">${h.prods.map(p=>`<span class="chip">${p}</span>`).join("")}</div></div>`};
  const setMode=m=>{mode=m;$("#flIn").classList.toggle("on",m==="in");$("#flX").classList.toggle("on",m==="x");legend();show(sel)};
  seg($("#flowSeg"),b=>setMode(b.dataset.v));
  $("#net").addEventListener("click",e=>{const g=e.target.closest(".hop");if(g)show(+g.dataset.i)});
  $("#net").addEventListener("keydown",e=>{const g=e.target.closest(".hop");if(g&&(e.key==="Enter"||e.key===" ")){e.preventDefault();show(+g.dataset.i)}});
  setMode("in");show(0);
}
INITS.push(initMap);

/* =========================================================================
   06 SECTOR EXPLORER (the meeting's slide 7)
   ========================================================================= */
BODY.sectors={
  title:'Each sector guards <em>different critical data</em>.',
  kicker:'Click a sector to see where it gets attacked and which product to lead with.',
  body:`<div class="sx" id="sx"></div>`,
  src:⟪SECTOR_SRC⟫
};
const PATH=["Laptop","Wi-Fi","Firewall","VPN","Cloud"];
const SECTORS=⟪SECTORS⟫;
function initSectors(){
  const box=$("#sx");
  box.innerHTML=SECTORS.map((s,i)=>`<div class="sxc" role="button" tabindex="0" data-i="${i}" aria-expanded="${i===0}">
    <div class="sxh"><span class="sn">0${i+1}</span><h3>${s.n}</h3><span class="sj">${s.short}</span></div>
    <div class="sxb">
      <div class="col"><div><span class="mono">Critical data</span><div class="jewel">${s.jewel}</div></div>
        <div><span class="mono">Where it is attacked</span><div class="minipath">${PATH.map((p,k)=>`${k?"<i></i>":""}<span class="${s.hops.includes(k)?"on":""}">${p}</span>`).join("")}</div></div>
        <div class="flowtag"><b>${s.flow[0]}</b>${s.flow[1]}</div></div>
      <div class="col"><div><span class="mono">Top vulnerabilities</span><div class="vuln">${s.vulns.map(v=>`<div><b>${v[0]}</b>${v[1]}</div>`).join("")}</div></div></div>
      <div class="col"><div class="case"><b>${s.case[0]}</b> ${s.case[1]}</div>
        <div><span class="mono">Products to lead with</span><div class="chips">${s.prods.map(p=>`<span class="chip">${p}</span>`).join("")}</div></div>
        <div class="paper"><span class="mono">The white paper</span><p>${s.paper}</p></div></div>
    </div><span class="open">Open the journey &#8250;</span></div>`).join("");
  const open=i=>$$(".sxc",box).forEach(c=>c.setAttribute("aria-expanded",+c.dataset.i===i));
  box.addEventListener("click",e=>{const c=e.target.closest(".sxc");if(c)open(+c.dataset.i)});
  box.addEventListener("keydown",e=>{const c=e.target.closest(".sxc");if(c&&(e.key==="Enter"||e.key===" ")){e.preventDefault();open(+c.dataset.i)}});
}
INITS.push(initSectors);

/* =========================================================================
   THE BUYER · 09 PLATFORM JOBS
   ========================================================================= */
BODY.channels={
  title:'Google leads, and the other platforms <em>feed the search</em>.',
  kicker:'Buyers search the moment a clock starts, so Google gets the biggest share. The other platforms make the client a name the buyer already knows. Click a platform.',
  body:`<div class="cjobs" id="cjobs"></div><div class="cjpanel" id="cjPanel" aria-live="polite"></div>`,
  src:⟪CHAN_SRC⟫
};
const CHANNELS=⟪CHANNELS⟫;
function initChannels(){
  $("#cjobs").innerHTML=CHANNELS.map((c,i)=>`<button type="button" class="cjob${i===0?" lead":""}" data-i="${i}" aria-pressed="${i===0}"><span class="jn">${c.n}${i===0?'<span class="leadtag">Lead channel</span>':""}</span><span class="jj">${c.j}</span>${c.sh?`<span class="sv">${c.sh}% of paid media at launch</span><span class="sh"><i data-w="${c.sh}"></i></span>`:`<span class="sv">Built from the white papers, no media</span><span class="sh"></span>`}</button>`).join("");
  const show=i=>{const c=CHANNELS[i];$$(".cjob").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.i===i));
    $("#cjPanel").innerHTML=`<div class="card"><p class="mono">Who it reaches</p><p>${c.who}</p><p class="mono" style="margin-top:16px">Measured on</p><p>${c.m}</p></div>
      <div class="card"><p class="mono">What runs here</p><p>${c.run}</p></div>
      <div class="card"><p class="mono">${c.bl}</p><div class="bn">${c.bn}</div><p>${c.bs}</p></div>`};
  $("#cjobs").addEventListener("click",e=>{const b=e.target.closest(".cjob");if(b)show(+b.dataset.i)});show(0);
}
INITS.push(initChannels);

/* =========================================================================
   10 GOOGLE SEARCH MOCKUP
   ========================================================================= */
BODY.search={
  title:'Be the first answer <em>when the clock starts</em>.',
  kicker:'Each clock brings a different search, so each gets its own ad and landing page. Switch the clock.',
  body:`<div class="serpgrid"><div class="serp"><div class="sbar"><div class="glogo"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></div><div class="sbox"><span class="ty" id="sQ"></span><svg viewBox="0 0 24 24" fill="none" stroke="#4285F4" stroke-width="2.2"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg></div></div><div class="sbody" id="sBody"></div></div>
    <div class="serpside"><div class="seg" id="sSeg" style="width:fit-content"><button type="button" data-v="0" aria-pressed="false">Rule</button><button type="button" data-v="1" aria-pressed="false">Audit</button><button type="button" data-v="2" aria-pressed="true">Breach</button></div><div id="sSide" aria-live="polite" style="display:flex;flex-direction:column;gap:12px"></div></div></div>`,
  src:'Mockup. The searches are written from the rules on the clocks slide. Search volumes for Australia come from Google Keyword Planner once the first client is signed, and the ads are approved by that client.'
};
const SERP=[
  {q:"essential eight maturity level 2 checklist",ad:["Essential Eight Maturity Level 2 | The 40-Point Self Check","Score your controls against all eight strategies in 15 minutes. Written by Australian assessors. Free download, no sales call."],sl:["Download the checklist","Book an assessment","Our assessors"],paa:["What is Essential Eight maturity level 2?","Who has to comply with the Essential Eight?","How long does it take to reach maturity level 2?"],
   land:"A checklist page with a 15-minute self-score. The form asks for the current maturity level and the next assessment date.",kpi:"Checklist downloads and assessment bookings"},
  {q:"cps 234 audit preparation",ad:["CPS 234 Audit in 90 Days? | What APRA Will Ask For","The evidence pack APRA-regulated boards ask for: control testing, third-party coverage and incident plans. Get the 12-page guide."],sl:["Get the guide","Talk to an assessor","CPS 230 and CPS 234"],paa:["What does a CPS 234 audit cover?","How often must CPS 234 controls be tested?","What is the difference between CPS 230 and CPS 234?"],
   land:"An audit guide with a gap check. The form asks for the audit date so the nearest audits get called first.",kpi:"Guide downloads with an audit date inside 90 days"},
  {q:"ransomware attack what to do now",ad:["Ransomware Attack? | Australian Incident Response, 24/7","Isolate, preserve and report. Call a responder now. We walk you through the 72-hour ransomware payment report and your OAIC notification."],sl:["Call the 24/7 line","First hour checklist","Reporting rules"],paa:["Do I have to report a ransomware attack in Australia?","Should we pay the ransom?","How long do we have to notify the OAIC?"],
   land:"A page with a 24/7 phone number and a first-hour checklist. It has no form because the buyer needs a person now.",kpi:"Calls to the incident line, answered inside five minutes"}
];
function initSearch(){
  let tT;const type=(s,cb)=>{clearInterval(tT);const el=$("#sQ");if(REDUCED||PRINTING){el.textContent=s;cb();return}let k=0;el.textContent="";tT=setInterval(()=>{k++;el.textContent=s.slice(0,k);if(k>=s.length){clearInterval(tT);cb()}},38)};
  const show=i=>{const r=SERP[i];$("#sBody").innerHTML="";
    type(r.q,()=>{$("#sBody").innerHTML=`<div class="gad" style="animation:pop .4s var(--ease)"><div class="spn">Sponsored</div><div class="site"><span class="fav">${CY_IN}</span><span><span class="sn">${esc(CYBER)}</span><br><span class="su">https://www.${CYBER_DOM}</span></span></div><h4>${r.ad[0]}</h4><p>${r.ad[1]}</p><div class="sl">${r.sl.map(x=>`<span>${x}</span>`).join("")}</div></div>
      <div class="paa" style="animation:pop .4s var(--ease) .15s both"><b>People also ask</b>${r.paa.map(x=>`<div>${x}</div>`).join("")}</div>
      <div class="gad org" style="animation:pop .4s var(--ease) .3s both"><div class="site"><span class="fav">${CY_IN}</span><span><span class="sn">${esc(CYBER)}</span><br><span class="su">${CYBER_DOM} › guides</span></span></div><h4>${r.paa[0].replace("?","")}: a plain-English guide</h4><p>The client\'s own guide page ranks for the same question, so the client appears twice on one screen.</p></div>`});
    $("#sSide").innerHTML=`<div class="card"><p class="mono">Where the click lands</p><p>${r.land}</p></div><div class="card"><p class="mono">Judged on</p><p>${r.kpi}</p></div>`};
  seg($("#sSeg"),b=>show(+b.dataset.v));
  onOpen($("#sBody"),()=>{const b=$("#sSeg button[aria-pressed=true]");show(+b.dataset.v)});
}
INITS.push(initSearch);

/* =========================================================================
   11 THE ADS WE WOULD RUN: a deck of native mockups
   ========================================================================= */
const ADS=[
  {p:"Google Search",s:"Breach clock · All sectors",h:()=>`<div class="mk g"><div class="q">ransomware attack what to do now</div><div class="spn">Sponsored</div><div class="su">${esc(CYBER)} · ${CYBER_DOM}</div><h4>Ransomware Attack? | Australian Incident Response, 24/7</h4><p>Isolate, preserve and report. A responder picks up in minutes and walks you through the 72-hour report.</p></div>`},
  {p:"LinkedIn · Document ad",s:"Audit clock · Financial services",h:()=>mkLI("CPS 234 audits now test your suppliers too. This 12-page guide shows the evidence APRA asks for, and which three gaps fail most boards.","Guide for APRA-regulated boards","CPS 234: the <em>supplier</em> question","#0E1B33","#1B4CB0","Download")},
  {p:"Meta · Lead form",s:"Breach clock · Health",h:()=>mkFB("Practice owners: if your patient records were locked tonight, who would you call first? Answer three questions and get the clinic recovery plan.","Clinic owners","Locked out of <em>patient records</em>?","#5A1220","#DB4A45","Get the plan",1)},
  {p:"LinkedIn · Thought leader",s:"Rule clock · Government",h:()=>mkLI("Agencies ask us which Essential Eight control to fix first. Our lead assessor explains her pick in this post.","Essential Eight, in order","Fix <em>this one</em> first","#0F2A47","#2A6BE0","Read more",0,1)},
  {p:"YouTube · Skippable",s:"Audit clock · Education",h:()=>`<div class="mk yt"><div class="mkimg" style="background:linear-gradient(140deg,#0B1229,#2563FF)"><span class="play"></span><span class="k">${esc(CYBER)} · 0:15</span><h5>A student portal holds <em>40,000 identities</em>. Who checks the logins?</h5><span class="skip">Skip ad ›</span></div><div class="mkh"><span class="mkav r">${CY_IN}</span><span><span class="mkn">University security in 15 seconds</span><br><span class="mkm">Sponsored · ${CYBER_DOM}</span></span></div></div>`},
  {p:"Google Search",s:"Rule clock · Government",h:()=>`<div class="mk g"><div class="q">essential eight maturity level 2 checklist</div><div class="spn">Sponsored</div><div class="su">${esc(CYBER)} · ${CYBER_DOM}</div><h4>Essential Eight Maturity Level 2 | The 40-Point Self Check</h4><p>Score your controls against all eight strategies in 15 minutes. Free download, no sales call.</p></div>`},
  {p:"Meta · Feed",s:"Rule clock · Critical infrastructure",h:()=>mkFB("A critical infrastructure operator has 12 hours to report a significant cyber incident to the ASD. This plan fits inside that window.","Operators under SOCI","The <em>12-hour</em> report","#14301F","#0F8A5F","Learn more")},
  {p:"LinkedIn · Lead gen form",s:"Breach clock · Financial services",h:()=>`<div class="mk li form"><div class="mkh"><span class="mkav">${CY_IN}</span><span><span class="mkn">${esc(CYBER)}</span><br><span class="mkm">Promoted · <b>Request the briefing</b></span></span></div><div class="mkt">A 45-minute briefing for heads of risk: how a payment fraud email gets past three approvers.</div><div class="fq"><label>When is your next CPS 234 review?</label><div>Within 90 days</div><label>Who approves supplier payments?</label><div>Finance team and CFO</div></div><div class="mkcta"><div><b>Name and email filled from LinkedIn</b>Two questions, then submit</div><span>Submit</span></div></div>`},
  {p:"Meta · Retargeting",s:"Any clock · Guide readers",h:()=>mkFB("You downloaded the checklist. The next step is a 45-minute call with an assessor who has scored 60 organizations against it.","Readers of the checklist","Your score, <em>checked by an assessor</em>","#0B1229","#7A5CFF","Book a call")}
];
function mkLI(txt,k,h,c1,c2,cta,form,person){return `<div class="mk li"><div class="mkh"><span class="mkav${person?" r":""}">${person?"JL":CY_IN}</span><span><span class="mkn">${person?"Jordan Lee · Lead Assessor":esc(CYBER)}</span><br><span class="mkm">${person?esc(CYBER)+" · ":""}Promoted</span></span></div><div class="mkt">${txt}</div><div class="mkimg" style="background:linear-gradient(140deg,${c1},${c2})"><span class="k">${k}</span><h5>${h}</h5></div><div class="mkcta"><div><b>${esc(CYBER)}</b>${CYBER_DOM}</div><span>${cta}</span></div></div>`}
function mkFB(txt,k,h,c1,c2,cta){return `<div class="mk fb"><div class="mkh"><span class="mkav r">${CY_IN}</span><span><span class="mkn">${esc(CYBER)}</span><br><span class="mkm">Sponsored</span></span></div><div class="mkt">${txt}</div><div class="mkimg" style="background:linear-gradient(140deg,${c1},${c2})"><span class="k">${k}</span><h5>${h}</h5></div><div class="mkcta"><div><b>${CYBER_DOM.toUpperCase()}</b>${esc(CYBER)}</div><span>${cta}</span></div></div>`}
function initAds(){
  const el=$("#adeck");let a=1,t=null;
  el.innerHTML=ADS.map((x,i)=>`<div class="adcard mk-host" data-i="${i}" role="button" tabindex="-1" aria-label="${x.p}: ${x.s}">${x.h()}</div>`).join("");
  const cards=$$(".adcard",el),C=730;cards.forEach(c=>{c.classList.add("mk");c.style.width="380px";c.style.marginLeft="-190px"});
  const lay=()=>{cards.forEach((c,i)=>{const k=i-a,d=Math.abs(k),sg=Math.sign(k);
      const x=C+sg*(d?190+380*.925/2-90+(d-1)*84:0),sc=1-Math.min(d,7)*.075,rot=sg*Math.min(d,4)*1.6;
      c.style.transform=`translateX(${x}px) scale(${sc}) rotate(${rot}deg)`;c.style.zIndex=100-d;c.style.opacity=d>6?0:1;c.style.filter=d?`saturate(${1-Math.min(d,5)*.14})`:"none";c.classList.toggle("on",!d)});
    const x=ADS[a];$("#adN").textContent=`${String(a+1).padStart(2,"0")} / ${ADS.length}`;$("#adC").textContent=x.p;$("#adP").textContent=x.s};
  const set=n=>{a=(n+ADS.length)%ADS.length;lay()};const stop=()=>{clearInterval(t);t=null};
  $("#adPrev").addEventListener("click",()=>{stop();set(a-1)});$("#adNext").addEventListener("click",()=>{stop();set(a+1)});
  el.addEventListener("click",e=>{const c=e.target.closest(".adcard");if(c){stop();set(+c.dataset.i)}});
  lay();
  new IntersectionObserver(es=>{stop();if(es[0].isIntersecting&&!REDUCED&&!PRINTING)t=setInterval(()=>set(a+1),2800)}).observe(el);
}
INITS.push(initAds);

/* =========================================================================
   13 THE FUNNEL
   ========================================================================= */
BODY.funnel={
  title:'Make the client the <em>first choice</em> before the shortlist.',
  kicker:'Buyers do most of their research before they talk to a vendor, so the funnel starts well before the form. Click a stage.',
  body:`<div class="fun"><div class="funstack" id="funStack"><div class="trig"><b>The clock starts</b>A rule, an audit or a breach can push a buyer in at any stage</div></div><div class="funpanel" id="funPanel" aria-live="polite"></div></div>`,
  src:⟪FUN_SRC⟫
};
const FUN=⟪FUN⟫;
function initFunnel(){
  $("#funStack").insertAdjacentHTML("beforeend",FUN.map((f,i)=>`<button type="button" class="fst s${i}" data-i="${i}" aria-pressed="${i===0}"><span class="n">0${i+1}</span><span><b>${f.n}</b><small>${f.s}</small></span><span class="ch">${f.ch}</span></button>`).join(""));
  const show=i=>{const f=FUN[i];$$(".fst").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.i===i));
    $("#funPanel").innerHTML=`<div class="card"><span class="mono">Stage ${i+1} · ${f.ch}</span><h3>${f.h}</h3><p>${f.d}</p></div>
      <div class="two"><div class="card"><span class="mono">What they see</span><p>${f.see}</p></div><div class="card"><span class="mono">Measured on</span><p>${f.m}</p></div></div>`};
  $("#funStack").addEventListener("click",e=>{const b=e.target.closest(".fst");if(b)show(+b.dataset.i)});show(0);
  let fT;onOpen($("#funStack"),()=>{let i=0;show(0);clearInterval(fT);if(REDUCED)return;fT=setInterval(()=>{i++;if(i>=FUN.length){clearInterval(fT);return}show(i)},1800)},()=>clearInterval(fT));
  $("#funStack").addEventListener("pointerdown",()=>clearInterval(fT));
}
INITS.push(initFunnel);

/* =========================================================================
   14 CONTENT ENGINE
   ========================================================================= */
BODY.content={
  title:'One white paper per sector <em>becomes twelve pieces</em>.',
  kicker:'We write one white paper per sector with the client\'s specialists, then cut it into pages, posts, videos and emails. Switch the sector.',
  body:`<div class="ctrlrow" style="margin-bottom:16px"><div class="seg" id="ceSeg"></div></div><div class="ce"><div class="cover3d" id="ceCover"></div><div class="pieces" id="cePieces"></div></div>`,
  src:'Mockup. Titles are drafts for discussion; each paper is written with the cyber client\'s specialists and approved by them before release.'
};
function initContent(){
  $("#ceSeg").innerHTML=SECTORS.map((s,i)=>`<button type="button" data-v="${i}" aria-pressed="${i===0}">${s.n}</button>`).join("");
  const show=i=>{const s=SECTORS[i];
    $("#ceCover").innerHTML=`<span class="k">${esc(CYBER)} · ${s.n} briefing</span><h4>${s.paper}</h4><p>Written with ${esc(CYBER)}'s assessors for ${s.reader}. Twelve pages, every figure sourced.</p><div class="by"><span>White paper</span><span>2027 edition</span></div>`;
    $("#cePieces").innerHTML=s.pieces.map((p,k)=>`<div class="piece ${p[0]}" style="animation-delay:${k*.04}s"><span class="mono">${p[1]}</span><b>${p[2]}</b><span>${p[3]}</span></div>`).join("")};
  seg($("#ceSeg"),b=>show(+b.dataset.v));show(0);
}
INITS.push(initContent);

/* =========================================================================
   15 NURTURE: five touches after a download
   ========================================================================= */
const N5=[
  ["Day 0","On download","Deliver the paper, ask one question","The paper arrives with one question about the date of their next audit. The answer sets how fast we follow up.","Reader","Email"],
  ["Hour 1","High intent","A specialist calls inside the hour","If the reader has an audit inside 90 days or a live incident, a specialist calls within the hour.","Reader","Phone",1],
  ["Day 3","The checklist","Give them something to use","A one-page checklist from the paper for the reader's team.","Reader and team","Email"],
  ["Day 10","The story","Show it happening to someone like them","A breach in their sector: how it got in, what it cost and which control would have stopped it.","Reader","Email and LinkedIn"],
  ["Day 21","The briefing","Offer 45 minutes with an assessor","An invitation to a private briefing, sent only to readers who opened, clicked or replied.","Reader and their boss","Email and LinkedIn"]
];
function initNurture(){
  $("#f5line").innerHTML=N5.map((s,i)=>`<button type="button" class="f5n${s[6]?" par":""}" data-i="${i}" aria-pressed="false"><span class="d">${i+1}</span><span class="w">${s[0]}</span><span class="j">${s[1]}</span></button>`).join("");
  let f5T;const show=i=>{const s=N5[i];$$(".f5n").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.i===i));
    $("#f5card").innerHTML=`<span class="mono">${s[0]} · ${s[5]}</span><h3>${s[2]}</h3><p>${s[3]}</p><div class="to"><span class="own${s[6]?" jt":""}">${s[4]}</span></div>`};
  $("#f5line").addEventListener("click",e=>{const b=e.target.closest(".f5n");if(b){clearInterval(f5T);show(+b.dataset.i)}});
  onOpen($("#f5line"),()=>{let i=0;show(0);clearInterval(f5T);if(REDUCED)return;f5T=setInterval(()=>{i++;if(i>4){clearInterval(f5T);return}show(i)},2200)},()=>clearInterval(f5T));
}
INITS.push(initNurture);

/* =========================================================================
   16 THE QUALIFIER
   ========================================================================= */
BODY.qualify={
  title:`${PARTNER} can now <em>qualify any cyber client</em>.`,
  kicker:'Three answers from the first meeting set the lead product, the channels and the first piece of content. Try it on a client you are talking to.',
  body:`<div class="qz"><div class="qzin">
    <div class="qzq"><span class="mono">1 · Which sector do they sell to?</span><div class="seg" id="qzS"></div></div>
    <div class="qzq"><span class="mono">2 · What is the buyer's most important data?</span><div class="seg" id="qzJ"></div></div>
    <div class="qzq"><span class="mono">3 · Which clock are their buyers on?</span><div class="seg" id="qzC"><button type="button" data-v="0" aria-pressed="false">Rule</button><button type="button" data-v="1" aria-pressed="true">Audit</button><button type="button" data-v="2" aria-pressed="false">Breach</button></div></div>
    <div class="note blue"><b>The fourth question</b>Ask which product sells best today. If it does not guard their critical data, lead with the one that does.</div>
  </div><div class="qzout" id="qzOut" aria-live="polite"></div></div>`,
  src:'Illustrative. The logic combines the sector map, the critical data and the clocks from earlier slides.'
};
function initQualify(){
  $("#qzS").innerHTML=SECTORS.map((s,i)=>`<button type="button" data-v="${i}" aria-pressed="${i===0}">${s.n}</button>`).join("");
  $("#qzJ").innerHTML=JEWELS.map((j,i)=>`<button type="button" data-v="${i}" aria-pressed="${i===0}">${j.n}</button>`).join("");
  const st={s:0,j:0,c:1};
  const render=()=>{const s=SECTORS[st.s],j=JEWELS[st.j],c=CLOCKS[st.c];
    const mix=[["LinkedIn","Google Search","Meta and YouTube"],["Google Search","LinkedIn","Meta and YouTube"],["Google Search","Meta","LinkedIn"]][st.c];
    const first=[s.check,s.paper,`The first-hour plan for ${s.n.toLowerCase()} teams`][st.c];
    $("#qzOut").innerHTML=`<span class="mono">What ${PARTNER} pitches</span>
      <div class="qzrow"><span class="mono">Lead products</span><div class="chips">${[...new Set([...j.guard.slice(0,2),...s.prods.slice(0,1)])].map(x=>`<span class="chip">${x}</span>`).join("")}</div></div>
      <div class="qzrow"><span class="mono">Watch for</span><div class="chips">${j.hit.map(x=>`<span class="chip t">${x}</span>`).join("")}</div></div>
      <div class="qzrow"><span class="mono">Channel order</span><p>${mix.join(" → ")}</p></div>
      <div class="qzrow"><span class="mono">First content</span><p>${first}</p></div>
      <div class="qzrow"><span class="mono">Opening line</span><p class="msg">${j.msg}</p></div>`};
  seg($("#qzS"),b=>{st.s=+b.dataset.v;render()});seg($("#qzJ"),b=>{st.j=+b.dataset.v;render()});seg($("#qzC"),b=>{st.c=+b.dataset.v;render()});render();
}
INITS.push(initQualify);

/* =========================================================================
   SLIDES
   ========================================================================= */
const XS={clocks:["The threat","Three clocks","v"],jewels:["The threat","Critical data","ill"],map:["The threat","The map","ill"],sectors:["The threat","Sector journeys","draft"],
  channels:["The system","Channels","ill"],search:["The system","Google Search","mock"],funnel:["The system","The lead funnel","ill"],content:["The system","Content engine","mock"],qualify:["The system","The qualifier","ill"]};
const xslide=id=>{const b=BODY[id],[sec,name,bd]=XS[id];
  return `<section class="slide ex" id="ex-${id}" data-sec="${sec}" data-title="${name}"><header class="xh"><div><div class="kick">${sec} · ${name} ${BADGE[bd]}</div><h2 class="xt">${b.title}</h2></div><p class="xk">${b.kicker}</p></header><div class="xb"><div class="fit">${b.body}</div></div><p class="xs">${b.src}</p></section>`};
const SYSTEM=["channels","search","ads","h2h","funnel","content","nurture","qualify"];

const SLIDES=[
/* 1 cover */
`<section class="slide cover" data-title="Cover"><div class="wavewrap" aria-hidden="true">
    <svg viewBox="0 0 1440 620" preserveAspectRatio="none">
      <defs>
        <linearGradient id="wv1" x1="0" y1="0" x2=".7" y2="1"><stop offset="0" stop-color="#CFE2FA"/><stop offset="1" stop-color="#AFD3F5"/></linearGradient>
        <linearGradient id="wv2" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#A9CFF3"/><stop offset="1" stop-color="#8FC9EF"/></linearGradient>
        <linearGradient id="wv3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9AD5EE"/><stop offset="1" stop-color="#8CE0EC"/></linearGradient>
      </defs>
      <path fill="url(#wv1)" opacity=".72" d="M0,168 C240,86 430,214 730,176 C1010,141 1190,54 1440,110 L1440,620 L0,620 Z"><animate attributeName="d" dur="9s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.33;.66;1" keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1" values="M0,168 C240,86 430,214 730,176 C1010,141 1190,54 1440,110 L1440,620 L0,620 Z;M0,132 C260,190 470,96 760,140 C1030,182 1210,150 1440,82 L1440,620 L0,620 Z;M0,196 C220,120 400,160 700,210 C980,250 1170,96 1440,138 L1440,620 L0,620 Z;M0,168 C240,86 430,214 730,176 C1010,141 1190,54 1440,110 L1440,620 L0,620 Z"/></path>
      <path fill="url(#wv2)" opacity=".74" d="M0,296 C300,224 496,362 796,314 C1074,270 1252,186 1440,244 L1440,620 L0,620 Z"><animate attributeName="d" dur="12s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.33;.66;1" keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1" values="M0,296 C300,224 496,362 796,314 C1074,270 1252,186 1440,244 L1440,620 L0,620 Z;M0,262 C280,330 520,250 820,282 C1100,312 1270,262 1440,208 L1440,620 L0,620 Z;M0,318 C320,262 470,318 770,352 C1050,382 1230,230 1440,276 L1440,620 L0,620 Z;M0,296 C300,224 496,362 796,314 C1074,270 1252,186 1440,244 L1440,620 L0,620 Z"/></path>
      <path fill="url(#wv3)" opacity=".8" d="M0,438 C268,378 512,506 812,448 C1090,394 1272,340 1440,388 L1440,620 L0,620 Z"><animate attributeName="d" dur="15s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.33;.66;1" keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1" values="M0,438 C268,378 512,506 812,448 C1090,394 1272,340 1440,388 L1440,620 L0,620 Z;M0,410 C250,470 540,420 840,404 C1110,390 1290,430 1440,360 L1440,620 L0,620 Z;M0,462 C290,410 490,452 790,486 C1070,516 1250,372 1440,414 L1440,620 L0,620 Z;M0,438 C268,378 512,506 812,448 C1090,394 1272,340 1440,388 L1440,620 L0,620 Z"/></path>
    </svg>
  </div>
  <div class="lockup"><svg viewBox="0 0 1432 392" aria-label="Toggle"><use href="#wm"/></svg></div>
  <h1>Industry Focus: <em>Cybersecurity</em></h1>
  <p class="prep">Prepared for ${esc(PARTNER)} · Australia</p></section>`,

/* 2 the alarm */
`<section class="slide dark" data-sec="The threat" data-title="The alarm" id="s-alarm"><div class="kick">The threat · Australia, ${ALARM.window}</div>
  <h2 class="sttl" style="font-size:76px;max-width:1300px">${ALARM.title}</h2>
  <p class="body" style="max-width:1000px;margin-top:22px">${ALARM.lede}</p>
  <div class="alarm">${ALARM.tiles.map(t=>`<div><div class="big" data-count="${t.v}" data-pre="${t.pre||""}" data-suf="${t.suf||""}" data-dec="${t.dec||0}">0</div><p class="cap">${t.c}</p><span class="sr">${t.s}</span></div>`).join("")}</div>
  <div class="costrow">${ALARM.cost.map(c=>`<div><b>${c[0]}</b><span>${c[1]}</span></div>`).join("")}</div></section>`,

"@ex:clocks",
"@ex:jewels",
"@ex:map",
"@ex:sectors",

/* through-line */
`<section class="slide dark" data-sec="The threat" data-title="The through-line" style="justify-content:center;padding-bottom:110px"><div class="kick">The through-line</div>
  <h2 class="sttl" style="font-size:86px;max-width:1300px;margin-top:26px">The product follows the critical data. <em>The content should too.</em></h2>
  <p class="body" style="max-width:900px;margin-top:36px">Lead each campaign with the product that guards the data the buyer fears losing most.</p></section>`,

/* the buyer: first choice */
`<section class="slide white" data-sec="The buyer" data-title="The first choice" id="s-first"><div class="fc"><div><div class="kick">The buyer · How deals are won</div>
  <h2 class="sttl" style="font-size:72px">${FIRST.title}</h2>
  <p class="body" style="margin-top:28px">${FIRST.body}</p></div>
  <div><div class="dots5"><i></i><i></i><i></i><i></i><i></i></div>
  <p class="small" style="margin-top:12px">${FIRST.dots}</p>
  <div class="jbar"><div class="t"><i data-w="${FIRST.jw}">${FIRST.jl}</i><span>${FIRST.jr}</span></div><div class="lb"><span>${FIRST.j0}</span><span>${FIRST.j1}</span></div></div>
  <div class="fcstats">${FIRST.stats.map(s=>`<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join("")}</div>
  <p class="xs" style="margin:16px 0 0">${FIRST.src}</p></div></div></section>`,

/* honest limit */
`<section class="slide alt mid" data-sec="The buyer" data-title="The current plan"><div class="kick">The current plan</div><h2 class="sttl" style="font-size:72px;max-width:1300px">LinkedIn alone competes for <em>the one deal in five</em>.</h2>
  <p class="body" style="max-width:1100px;margin-top:24px">The current plan puts everything into LinkedIn ads, which reach most buyers after they have a favorite. <b>Our plan adds Google Search and content so the client becomes the favorite.</b> Cybersecurity is new to Toggle, but we have run lead generation in banking, insurance and education for years.</p>
  <div class="prf">
    <div><b>#1</b><h3>Google rank in insurance and banking</h3><p>Great Eastern from position 4 and Singlife from position 3, with a 52.6% rise in organic impressions for CIMB.</p><span class="mono">Search · Regulated categories · 2025</span></div>
    <div><b>$100 → $10</b><h3>Business cost per lead, Mindvalley</h3><p>Screening questions moved inside the LinkedIn and Facebook forms, so sales only saw buyers who fit.</p><span class="mono">B2B lead forms · 2019 to 2022</span></div>
    <div><b>&minus;47%</b><h3>Cost per lead, UNITAR</h3><p>32,000+ leads after Toggle gave Google, Meta and TikTok one job each and fed results back to the ads.</p><span class="mono">Multi-channel · June to September 2025</span></div>
  </div>
  <div class="agenda" id="agenda" style="margin-top:28px"></div></section>`,

"@ex:channels",
"@ex:search",

/* the ads */
`<section class="slide white adwrap" id="ex-ads" data-sec="The system" data-title="Ads we would run"><div class="kick">The system · Ads we would run ${BADGE.mock}</div><h2 class="sttl" style="font-size:60px">Nine ad mockups across <em>three clocks and five sectors</em>.</h2>
  <div class="adeck" id="adeck" aria-roledescription="carousel" aria-label="Ad mockups"></div>
  <div class="adbar"><button type="button" class="adnav" id="adPrev" aria-label="Previous ad">&#8249;</button>
    <div class="adinfo" aria-live="polite"><span class="adn num" id="adN">01 / 09</span><span class="adc" id="adC"></span><span class="adp" id="adP"></span></div>
    <button type="button" class="adnav" id="adNext" aria-label="Next ad">&#8250;</button></div></section>`,

/* head to head */
`<section class="slide dark" id="ex-h2h" data-sec="The system" data-title="Lead with the data"><div class="fs"><div class="lft"><div class="kick">The system · The hook ${BADGE.mock}</div><h2 class="sttl" style="font-size:60px">Lead with <em>the data they fear losing</em>.</h2>
  <p class="body">Most cyber ads lead with features and acronyms. The ad on the right leads with the data the buyer is afraid to lose.</p>
  <p class="body">In our 2026 education accounts, ads that led with the course cost 2.7 to 5.9 times more per lead. <b>We will run the same test in the first cyber account\'s first month.</b></p></div>
  <div class="h2h"><div class="vc">${mkLI("Introducing our AI-powered, next-generation XDR platform with 360-degree visibility, automated threat hunting and unified SOC workflows.","Platform launch","Next-gen XDR. <em>Unified.</em>","#2A3550","#4A5A75","Learn more")}<div class="tag" style="margin-top:18px">What most cyber ads say</div><p class="why">It lists features and gives no reason to act today.</p></div>
  <div class="vc win">${mkFB("Clinic owners: if your patient records were locked tonight, who would you call first? Answer three questions and get the clinic recovery plan.","Clinic owners","Locked out of <em>patient records</em>?","#5A1220","#DB4A45","Get the plan")}<div class="tag" style="margin-top:18px">What we would test first</div><p class="why"><b>It names the reader, the risk and the next step.</b></p></div></div></div></section>`,

"@ex:funnel",
"@ex:content",

/* nurture */
`<section class="slide alt n5" id="ex-nurture" data-sec="The system" data-title="Nurture"><div class="kick">The system · Nurture ${BADGE.ill}</div>
  <h2 class="sttl" style="font-size:58px">Five touches between the download <em>and the briefing</em>.</h2>
  <div class="f5grid">
    <div><div class="f5line" id="f5line"></div><div class="f5card" id="f5card" aria-live="polite"></div>
      <p class="small" style="margin-top:14px">Readers who go quiet after touch three get a monthly sector update instead.</p></div>
    <div class="f5side">
      <div class="card"><p class="mono">Why the first hour matters</p><p style="margin:8px 0 0;font-size:16px;line-height:1.5">Firms that called a lead within an hour were nearly <b>7 times</b> as likely to reach the decision maker as firms that called an hour later, and over <b>60 times</b> as likely as firms that waited a day.</p></div>
      <div class="card"><p class="mono">Judge it on briefings booked</p><div class="msr">
        <div><b>Downloads to briefings booked</b><span>Monthly</span></div>
        <div>Time to first call on high-intent leads<span>Weekly</span></div>
        <div>Briefings to proposals<span>Quarterly</span></div></div></div>
    </div>
  </div>
  <p class="xs" style="margin:-60px 0 84px">Source: Oldroyd, McElheran and Elkington, "The Short Life of Online Sales Leads", Harvard Business Review, March 2011. The five touches are Toggle's proposed sequence.</p></section>`,

"@ex:qualify",

/* close */
`<section class="slide dark" data-sec="Close" data-title="Next step" style="justify-content:center;padding-bottom:110px"><div class="kick">Next step</div>
  <h2 class="sttl" style="font-size:88px;max-width:1300px;margin-top:24px">One working session <em>to pick the first cyber client</em>.</h2>
  <p class="body" style="max-width:960px;margin-top:30px">We run the qualifier on each cyber client ${esc(PARTNER)} is talking to and leave with one client to pitch.</p>
  <div class="asks"><div><span class="mono">${esc(PARTNER)} brings</span><p>The cyber clients in the pipeline and their best-selling products.</p></div><div><span class="mono">Toggle brings</span><p>The sector journeys, reviewed by Sean, and Australian search volumes for each clock.</p></div><div><span class="mono">We leave with</span><p>One client, one lead product, one white paper title and a launch date.</p></div></div>
  <div class="contact" style="margin-top:22px"><div><span class="mono">Toggle Solutions</span><p>hello@toggle.solutions</p></div><div><span class="mono">Viknesh</span><p>+60 12 568 8681</p></div><div><span class="mono">On the web</span><p>toggle.solutions</p></div></div></section>`,

/* sources */
`<section class="slide white" data-sec="Close" data-title="Sources"><div class="kick">Sources</div><h2 class="sttl" style="font-size:52px">Where <em>every number</em> comes from.</h2>
  <ol class="srclist">${SOURCES.map(s=>`<li>${s}</li>`).join("")}</ol></section>`
];
/* alarm numbers and the first-choice dots */
INITS.push(function initAlarm(){onOpen($("#s-alarm .alarm"),()=>$$("#s-alarm [data-count]").forEach(el=>countUp(el,+el.dataset.count,el.dataset.suf,el.dataset.pre,+el.dataset.dec)))});
