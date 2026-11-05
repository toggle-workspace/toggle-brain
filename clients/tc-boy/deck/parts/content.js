/* =========================================================================
   DECK CONTENT. Every figure traces to the sources slide, and to
   clients/tc-boy/01-strategy/2026-11-05-pre-planning.md and
   2026-11-05-threads-playbook.md. Budget figures match the PPTX deck.
   ========================================================================= */
const q=new URLSearchParams(location.search);
const PARTNER=(q.get("for")||"TC Boy").slice(0,40);
const DECK_NAME="TC Boy 2027 plan · Toggle";
const BODY={},INITS=[];
const SYSTEM=[];
const rm=n=>"RM"+fmt(n);

/* =========================================================================
   THE MARKET · DEMAND TILES
   ========================================================================= */
const DEMAND=[
  {v:42000,c:"runners registered for the 2025 KL Standard Chartered Marathon, which sold out in under four hours.",s:"The Sun · 2025"},
  {v:100,suf:"+",c:"Anytime Fitness clubs in Malaysia by January 2026, with another 100 planned.",s:"Free Malaysia Today · Jan 2026"},
  {v:28,suf:"g",c:"protein per 100g in the RM4 sardine can a Malaysian called \"my new protein source\". No brand was named.",s:"WorldOfBuzz · Jan 2026"},
  {v:47,suf:"%",c:"of Malaysian online shoppers now buy groceries online, up from 34% a year earlier.",s:"Ipsos · Jul 2026"}
];

/* =========================================================================
   THE MARKET · POSITIONING MAP
   ========================================================================= */
BODY.map={
  title:'Everyone says protein. <em>Nobody shows up at the gym.</em>',
  kicker:'Each brand sits by how loudly it claims protein and how visible it is in sport. Click a brand, then switch to 2027.',
  body:`<div class="pmap"><div class="pplot" id="pplot"><div class="q"></div><span class="ql">Open space</span><div class="vl"></div><div class="hl"></div>
      <span class="ax x">How loudly the brand claims protein &#8594;</span><span class="ax y">Seen in sport and fitness &#8594;</span></div>
    <div class="pside"><div class="seg" id="pSeg" style="width:fit-content"><button type="button" data-v="0" aria-pressed="true">Today</button><button type="button" data-v="1" aria-pressed="false">TC Boy in 2027</button></div>
      <div class="card" id="pCard" aria-live="polite"></div></div></div>`,
  src:'Positions are Toggle\'s reading of each brand\'s public messaging and partnerships, checked 5 November 2026. Ayam Brand quote: Malaysian Foodie, November 2024. Yeo\'s launch: The Star, October 2026. Regional precedent: Century Tuna "Superbods" in the Philippines.'
};
const BRANDS=[
  {n:"Ayam Brand",x:78,y:24,say:'"An excellent and affordable source of lean protein."',sport:"Community fitness workshops as CSR. No gym, athlete or race partner found.",mk:"Official Shopee and Lazada stores."},
  {n:"Yeo's",x:22,y:12,say:"Teriyaki and spicy tuna, launched with a roadshow in October 2026.",sport:"None found. The story is flavor.",mk:"Not checked."},
  {n:"King Cup",x:14,y:30,say:"Local taste and value in sardines and mackerel.",sport:"None found.",mk:"Not checked."},
  {n:"Adabi",x:30,y:40,say:"Heritage spice brand with sardine curry.",sport:"None found.",mk:"Not checked."},
  {n:"Rex",x:40,y:12,say:"Penang tuna maker, halal certified.",sport:"None found.",mk:"Not checked."},
  {n:"TC Boy today",x:58,y:15,tc:1,say:'"High in protein" on product pages, with no grams shown.',sport:"None yet.",mk:"No official store found on Shopee, Lazada or TikTok Shop."},
  {n:"TC Boy in 2027",x:84,y:80,goal:1,say:"Protein grams on every can, a 12-can protein pack and straight answers on Threads.",sport:"Trainers, run clubs and HYROX athletes using the product on camera.",mk:"Official stores on Shopee, Lazada and TikTok Shop."}
];
function initMap(){
  const plot=$("#pplot");
  plot.insertAdjacentHTML("beforeend",BRANDS.map((b,i)=>`<button type="button" class="pdot${b.tc?" tc":""}${b.goal?" goal hide":""}" data-i="${i}" aria-pressed="false" style="left:${b.x}%;bottom:${b.y}%"><i></i><span>${b.n}</span></button>`).join(""));
  const show=i=>{const b=BRANDS[i];$$(".pdot",plot).forEach(d=>d.setAttribute("aria-pressed",+d.dataset.i===i));
    $("#pCard").innerHTML=`<span class="mono">${b.goal?"The 2027 target":"What they say"}</span><h3>${b.n}</h3><p>${b.say}</p><span class="mono pm">Sport and fitness</span><p>${b.sport}</p><span class="mono pm">Marketplaces</span><p>${b.mk}</p>`};
  plot.addEventListener("click",e=>{const d=e.target.closest(".pdot");if(d)show(+d.dataset.i)});
  seg($("#pSeg"),b=>{const on=b.dataset.v==="1";$(".pdot.goal",plot).classList.toggle("hide",!on);show(on?6:5)});
  show(5);
}
INITS.push(initMap);

/* =========================================================================
   THE SHOP · BUYER JOURNEY
   ========================================================================= */
BODY.shop={
  title:'A gym-goer tries to buy six cans <em>and cannot</em>.',
  kicker:'Five steps a first-time buyer takes on tcboy.com today, and what we change in the first quarter. Click a step.',
  body:`<div class="jsteps" id="jsteps"></div><div class="jpanel" id="jPanel" aria-live="polite"></div>`,
  src:'Source: tcboy.com product feed, page source and shipping policy, checked 5 November 2026. 43 SKUs in the feed; tuna and sardines are sold by the carton.'
};
const STEPS=[
  {t:"Find",f:"Search sees one page",nb:"1 title",now:'Every page carries the same title, "TCBOY", so Google cannot tell tuna from sea coconut. The 2018 site at tcboy.tropicalgrp.com still competes in search.',fb:"43 pages",fix:"A unique title and product markup for each of the 43 products, using data already stored in your back end. The 2018 site redirects to the new one."},
  {t:"Choose",f:"Cartons only",nb:"RM326",now:"Tuna and sardines sell by the carton. The smallest tuna order is 48 cans at RM326.40, which is a lot to ask of a first-time buyer.",fb:"6 · 12 · 24",fix:"Packs of 6, 12 and 24 cans, plus a 12-can protein pack, with protein grams shown on every listing."},
  {t:"Sign up",f:"OTP before the cart",nb:"OTP",now:"Shoppers must register with a phone OTP before anything goes into the cart.",fb:"Guest",fix:"Guest checkout for first-time buyers, with sign-up offered after the order."},
  {t:"Track",f:"Ads cannot learn",nb:"0 pixels",now:"The site runs Google Analytics only. No Meta or TikTok pixel is installed, so ads cannot learn who buys.",fb:"Week 1",fix:"Tag manager, Meta Pixel with server-side conversions and the TikTok pixel, verified before any media goes live."},
  {t:"Receive",f:"A week to arrive",nb:"7 to 8 days",now:"Delivery takes 7 to 8 days to Peninsular Malaysia and 8 to 10 days to Sabah and Sarawak, with no self-collection.",fb:"3 stores",fix:"Official Shopee, Lazada and TikTok Shop stores, which plug into each platform's own delivery network."}
];
function initShop(){
  $("#jsteps").innerHTML=STEPS.map((s,i)=>`<button type="button" class="jstep" data-i="${i}" aria-pressed="${i===1}"><span class="n">STEP ${i+1}</span><span class="t">${s.t}</span><span class="f">${s.f}</span></button>`).join("");
  const show=i=>{const s=STEPS[i];$$(".jstep").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.i===i));
    $("#jPanel").innerHTML=`<div class="card jnow"><span class="mono">Today</span><div class="bn">${s.nb}</div><p>${s.now}</p></div><div class="card jfix"><span class="mono">By the end of Q1</span><div class="bn">${s.fb}</div><p>${s.fix}</p></div>`};
  $("#jsteps").addEventListener("click",e=>{const b=e.target.closest(".jstep");if(b)show(+b.dataset.i)});show(1);
}
INITS.push(initShop);

/* =========================================================================
   THE MEDIA · BUDGET
   ========================================================================= */
BODY.budget={
  title:'Half of the RM200,000 <em>goes straight into media</em>.',
  kicker:'Everything fits inside RM200,000, with nothing billed on top. Drag the slider to see what the June checkpoint can add.',
  body:`<div class="bud"><div><div class="stack" id="bStack"></div><div class="blist" id="bList"></div></div>
    <div class="bside"><div class="card"><span class="mono">Checkpoint top-up, paid media only</span><input type="range" id="bTop" min="0" max="60000" step="10000" value="0" aria-label="Checkpoint top-up"><div style="display:flex;justify-content:space-between" class="small"><span>RM0</span><span>RM30,000</span><span>RM60,000</span></div></div>
      <div class="card" style="margin-top:14px"><span class="mono">Total for 2027</span><div class="bnum" id="bTot"></div><p class="mono" style="margin-top:14px">Share in paid media</p><div class="bnum m" id="bShare"></div><p id="bNote"></p></div></div></div>`,
  src:'Fee lines are indicative until the quotation and exclude SST. Agency management covers 12 months of strategy, media buying, marketplace operations, Threads community management and monthly reporting. TikTok Shop affiliate commission comes out of each sale, so it never draws on this budget.'
};
const BUD=[
  {k:"Paid media",v:100000,c:"var(--accent)",d:"TikTok, Shopee, Lazada, Meta, Threads and Google",media:1},
  {k:"Agency management",v:48000,c:"var(--deep)",d:"About RM4,000 a month for 12 months"},
  {k:"E-commerce setup",v:18000,c:"var(--sky)",d:"Tracking, three official stores, listings, site fixes"},
  {k:"Content production",v:18000,c:"var(--ink-3)",d:"Two shoot days, recipe and fitness videos, ad variants"},
  {k:"Creator seeding",v:16000,c:"var(--pop)",d:"Product packs and flat fees for fitness creators"}
];
function initBudget(){
  const r=$("#bTop");
  const draw=()=>{const top=+r.value,tot=200000+top;
    $("#bStack").innerHTML=BUD.map(b=>{const v=b.media?b.v+top:b.v;return `<i style="flex-grow:${v};background:${b.c}">${v/tot>.12?Math.round(v/tot*100)+"%":""}</i>`}).join("");
    $("#bList").innerHTML=BUD.map(b=>{const v=b.media?b.v+top:b.v;return `<div><i class="sw" style="background:${b.c}"></i><b>${b.k}<small>${b.d}</small></b><span class="rm">${rm(v)}</span><span class="pc">${Math.round(v/tot*100)}%</span></div>`}).join("");
    $("#bTot").textContent=rm(tot);$("#bShare").textContent=Math.round((100000+top)/tot*100)+"%";
    $("#bNote").textContent=top?`The extra ${rm(top)} goes into 9.9, 10.10, 11.11 and 12.12, with no change to fees.`:"The base plan. Fees stay fixed if the checkpoint adds media.";};
  r.addEventListener("input",draw);draw();
}
INITS.push(initBudget);

/* =========================================================================
   THE MEDIA · PLATFORMS
   ========================================================================= */
BODY.media={
  title:'Media follows <em>where Malaysians buy groceries</em>.',
  kicker:'RM100,000 across five platforms, weighted toward the point of sale. About 60% is bought against sales, so most of it is judged in ringgit. Click a platform.',
  body:`<div class="cjobs" id="cjobs"></div><div class="cjpanel" id="cjPanel" aria-live="polite"></div>`,
  src:'Platform reach: Ipsos, July 2026 (Shopee 71% and TikTok Shop 62% of Malaysian online shoppers); DataReportal Digital 2026 Malaysia (Threads ad reach 3.6 million). Split by objective: about 60% sales, 25% consideration among fitness audiences, 15% reach and tests.'
};
const PLAT=[
  {n:"TikTok",v:36000,who:"Active Malaysians aged 18 to 35. 62% of online shoppers now use TikTok Shop, up from 43% in 2024.",run:"GMV Max campaigns on TikTok Shop, Spark Ads that boost creator posts, and live selling on sale days.",m:"TikTok Shop sales and return on ad spend, weekly."},
  {n:"Shopee and Lazada",v:26000,who:"Shoppers already searching for \"tuna\", \"makanan tin\" and \"high protein\". 71% of online shoppers use Shopee.",run:"Search and discovery ads on the official stores, plus boosts on the double-date sale days.",m:"Store sales, return on ad spend, and rank on category searches."},
  {n:"Facebook and Instagram",v:22000,who:"Family meal planners and festive buyers, the core TC Boy customer today.",run:"CNY, Ramadan and Raya hamper campaigns, catalog ads, and retargeting of store visitors.",m:"Purchases tracked by the Pixel and server-side conversions."},
  {n:"Google",v:10000,who:"People searching for high-protein food, canned tuna, or TC Boy by name.",run:"Search and Shopping ads that send buyers to the site and the official stores.",m:"Cost per sale and branded search volume."},
  {n:"Threads",v:6000,who:"About 3.6 million Malaysians reachable with Threads ads, where the brand conversation happens.",run:"Two placement tests beside Instagram, in Q2 around the protein pack launch and in Q4 around 11.11.",m:"Cost and click rate against Instagram feed, read from the placement breakdown."}
];
function initMedia(){
  $("#cjobs").innerHTML=PLAT.map((c,i)=>`<button type="button" class="cjob${i===0?" lead":""}" data-i="${i}" aria-pressed="${i===0}"><span class="jn">${c.n}</span><span class="jj">${rm(c.v)}</span><span class="sv">${c.v/1000}% of paid media</span><span class="sh"><i data-w="${c.v/1000/0.36}"></i></span></button>`).join("");
  const show=i=>{const c=PLAT[i];$$(".cjob").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.i===i));
    $("#cjPanel").innerHTML=`<div class="card"><p class="mono">Who it reaches</p><p>${c.who}</p></div><div class="card"><p class="mono">What runs here</p><p>${c.run}</p></div><div class="card"><p class="mono">Measured on</p><p>${c.m}</p></div>`};
  $("#cjobs").addEventListener("click",e=>{const b=e.target.closest(".cjob");if(b)show(+b.dataset.i)});show(0);
}
INITS.push(initMedia);

/* =========================================================================
   THE MEDIA · FLIGHTING
   ========================================================================= */
BODY.flight={
  title:'Spend peaks <em>when Malaysians shop</em>.',
  kicker:'Monthly paid media for 2027, in RM thousands. Switch the checkpoint top-up on to see where the extra media goes. Click a month.',
  body:`<div class="flt"><div class="fchart"><div class="fbars" id="fBars"><div class="fchk"><span>June checkpoint</span></div></div></div>
    <div class="fside"><div class="seg" id="fSeg" style="width:fit-content"><button type="button" data-v="0" aria-pressed="true">Base</button><button type="button" data-v="30" aria-pressed="false">+RM30,000</button><button type="button" data-v="60" aria-pressed="false">+RM60,000</button></div>
      <div class="card" id="fCard" aria-live="polite"></div><div class="ftot" id="fTot"></div></div></div>`,
  src:'Provisional 2027 dates: CNY about 6 February, Ramadan about 8 February to 9 March, Hari Raya about 10 March (Calendarific). Mega sale dates follow Shopee and Lazada\'s usual double-date calendar.'
};
const MONTHS=[
  ["Jan",5,0,"Tracking and the official stores go live. Pre-CNY hamper ads on Facebook and Instagram."],
  ["Feb",10,0,"CNY (about 6 February) and the start of Ramadan (about 8 February). Hamper and sahur bundles."],
  ["Mar",9,0,"Hari Raya (about 10 March) and 3.3. Festive bundles, then the first creator seeding."],
  ["Apr",8,0,"The protein pack launches on TikTok Shop and the official stores, around 4.4."],
  ["May",6,0,"The creator program scales, with run club partners. 5.5 sale."],
  ["Jun",8,0,"6.6 sale. The checkpoint review runs in the first week of July on January to June data."],
  ["Jul",6,0,"Media moves toward the channels that cleared the gates. 7.7 sale."],
  ["Aug",8,0,"Merdeka and the \"homegrown protein\" angle. 8.8 sale."],
  ["Sep",9,12,"9.9 sale. Any checkpoint top-up starts here."],
  ["Oct",9,12,"10.10 sale and race season content."],
  ["Nov",12,22,"11.11, the largest sale day of the year."],
  ["Dec",10,14,"12.12 and year-end gym and hamper bundles."]
];
function initFlight(){
  const box=$("#fBars");let top=0,sel=10;const MAX=34;
  box.insertAdjacentHTML("beforeend",MONTHS.map((m,i)=>`<button type="button" class="fbar${i>5?" h2":""}" data-i="${i}" aria-pressed="${i===sel}"><span class="v"></span><span class="col"><i class="b"></i><i class="t"></i></span><span class="m">${m[0]}</span></button>`).join(""));
  const draw=()=>{const k=top/60;let h1=0,h2=0;
    $$(".fbar",box).forEach((b,i)=>{const m=MONTHS[i],t=m[2]*k,v=m[1]+t;i<6?h1+=v:h2+=v;
      $(".b",b).style.height=(m[1]/MAX*300)+"px";$(".t",b).style.height=(t/MAX*300)+"px";$(".v",b).textContent=Math.round(v)});
    $("#fTot").innerHTML=`<div><b>${rm(h1*1000)}</b><span>Jan to Jun</span></div><div><b>${rm(h2*1000)}</b><span>Jul to Dec</span></div><div><b>${rm((h1+h2)*1000)}</b><span>Paid media, 2027</span></div>`;show(sel)};
  const show=i=>{sel=i;const m=MONTHS[i],t=m[2]*top/60;$$(".fbar",box).forEach(b=>b.setAttribute("aria-pressed",+b.dataset.i===i));
    $("#fCard").innerHTML=`<span class="mono">${m[0]} 2027</span><h3>${rm((m[1]+t)*1000)}</h3><p>${m[3]}</p>`};
  box.addEventListener("click",e=>{const b=e.target.closest(".fbar");if(b)show(+b.dataset.i)});
  seg($("#fSeg"),b=>{top=+b.dataset.v;draw()});draw();
}
INITS.push(initFlight);

/* =========================================================================
   THE VOICE · THREADS MOCKUP
   ========================================================================= */
BODY.threads={
  title:'No canned brand speaks on Threads. <em>TC Boy can be first.</em>',
  kicker:'Malaysian brands such as Watsons, Lotus\'s and Mydin made Threads a banter channel, and packaged food stayed away. Switch the post type.',
  body:`<div class="thr"><div><div class="seg" id="tSeg" style="width:fit-content;margin-bottom:14px"><button type="button" data-v="0" aria-pressed="true">Cheap protein</button><button type="button" data-v="1" aria-pressed="false">Straight answers</button><button type="button" data-v="2" aria-pressed="false">Offer day</button></div><div class="tphone" id="tPhone" aria-live="polite"></div></div>
    <div class="tside"><div class="card"><span class="mono">What Malaysian brands get</span><p><b>280K</b> people follow Watsons Malaysia on Threads, and it answers mentions in BM. One Lotus's Buy 1 Free 1 post drew <b>1.5K</b> likes against 19 to 48 on its ordinary posts.</p></div>
      <div class="card"><span class="mono">How TC Boy posts</span><div class="trules"><div>A warm, cheeky persona in BM and Manglish, one to three posts a day.</div><div>A person approves every reply before it goes out.</div><div>Bodies, race, religion and royalty never become the joke.</div><div>Offer posts link to the official stores with tracked links.</div></div></div></div></div>`,
  src:'Mockup. Follower and like counts from logged-out profile views, 5 November 2026. The protein figure in the first post will come from TC Boy\'s nutrition panel. Threads ad reach in Malaysia: DataReportal Digital 2026.'
};
const POSTS=[
  [{a:"TC",n:"tcboymalaysia",t:"Leg day done. Dinner is one can of tuna in mineral water, a scoop of rice and five minutes. Protein settle, wallet pun selamat."},
   {a:"AI",u:1,n:"aina.runs",t:"Okay but which one for meal prep, brine or mineral water?",re:1},
   {a:"TC",n:"tcboymalaysia",t:"Mineral water if you want it clean, EVOO if you want it tasty. Both have the protein grams printed on the can now.",re:1}],
  [{a:"HZ",u:1,n:"hafiz_lifts",t:"Tuna tin ni banyak garam tak? Gym coach I cakap kena jaga sodium."},
   {a:"TC",n:"tcboymalaysia",t:"Soalan bagus. Pick our tuna in mineral water and check the sodium line on the label. We are posting the full nutrition panel for every can this week, so you can compare yourself.",re:1}],
  [{a:"TC",n:"tcboymalaysia",t:"11.11 is here. The 12-can protein pack is on our official Shopee, Lazada and TikTok Shop stores. Meal prep for the whole month, sorted."},
   {a:"SY",u:1,n:"syaz.eats",t:"Finally I don't need to buy a whole carton of 48 haha",re:1}]
];
function initThreads(){
  const draw=i=>{$("#tPhone").innerHTML=POSTS[i].map(p=>`<div class="tp${p.re?" reply":""}"><div class="av${p.u?" u":""}">${p.a}</div><div><div class="nm">${p.n}<span>${p.u?"2h":"1h"}</span></div><div class="tx">${p.t}</div><div class="re"><span>Like</span><span>Reply</span><span>Repost</span></div></div></div>`).join("")};
  seg($("#tSeg"),b=>draw(+b.dataset.v));draw(0);
}
INITS.push(initThreads);

/* =========================================================================
   THE PLAN · CHECKPOINT GATES
   ========================================================================= */
BODY.gate={
  title:'June decides the second half <em>with numbers</em>.',
  kicker:'We agree these gates with you now, so a budget increase follows a rule. Tick the gates TC Boy clears to see the decision.',
  body:`<div class="gates"><div class="glist" id="gList"></div><div class="gout" id="gOut" aria-live="polite"></div></div>`,
  src:'Targets for each gate are set with you once we see the 2026 baseline, margins and average order value. Review in the first week of July on January to June data.'
};
const GATES=[
  {k:"Foundation",d:"Three official stores live and tracking verified by the end of February.",must:1},
  {k:"Sales",d:"Online sales ahead of your 2026 baseline, and marketplace ads at or above the agreed return."},
  {k:"Product",d:"The protein pack reaches its agreed share of online orders, and repeat buyers grow."},
  {k:"Brand",d:"Fitness creator content and the Threads following reach their agreed targets."}
];
function initGate(){
  const st=[1,1,0,0];
  $("#gList").innerHTML=GATES.map((g,i)=>`<button type="button" class="gate${g.must?" must":""}" data-i="${i}" aria-pressed="${!!st[i]}"><span class="bx"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span><b>${g.k}</b><span>${g.d}</span></span></button>`).join("");
  const draw=()=>{const others=st[1]+st[2]+st[3];let h,p,a;
    if(!st[0]){h="Fix the foundation first.";p="H2 runs at the base budget, and the first job is getting the stores and tracking right.";a="RM0"}
    else if(others>=2){h="Add media for the big sale days.";p="TC Boy adds paid media to 9.9, 10.10, 11.11 and 12.12, with no change to fees.";a="+RM30,000 to RM60,000"}
    else{h="Hold the budget and move the media.";p="H2 runs at base, and media moves toward the channels that cleared their gates.";a="RM0"}
    $("#gOut").innerHTML=`<span class="mono">The decision</span><h3>${h}</h3><p>${p}</p><div class="amt">${a}</div>`};
  $("#gList").addEventListener("click",e=>{const b=e.target.closest(".gate");if(!b)return;const i=+b.dataset.i;st[i]=st[i]?0:1;b.setAttribute("aria-pressed",!!st[i]);draw()});draw();
}
INITS.push(initGate);

/* =========================================================================
   SLIDES
   ========================================================================= */
const XS={map:["The market","Competitors","ill"],shop:["The shop","Buyer journey","v"],budget:["The media","Budget","ill"],media:["The media","Platforms","ill"],flight:["The media","Monthly spend","ill"],threads:["The voice","Threads","mock"],gate:["The plan","Checkpoint","ill"]};
const xslide=id=>{const b=BODY[id],[sec,name,bd]=XS[id];
  return `<section class="slide ex" id="ex-${id}" data-sec="${sec}" data-title="${name}"><header class="xh"><div><div class="kick">${sec} · ${name} ${BADGE[bd]}</div><h2 class="xt">${b.title}</h2></div><p class="xk">${b.kicker}</p></header><div class="xb"><div class="fit">${b.body}</div></div><p class="xs">${b.src}</p></section>`};

const SOURCES=[
  "TC Boy: tcboy.com product feed, page source and shipping policy, checked 5 November 2026.",
  "Lazada listings for TC Boy 150g tuna (Emporium Mall reseller, RM15.99; trending listing, RM6.90), checked 5 November 2026.",
  "Ayam Brand protein positioning: Malaysian Foodie, November 2024 and September 2025.",
  "Yeo's Teriyaki Tuna launch: The Star, 3 October 2026.",
  "Century Tuna \"Superbods\": Lazada Brand Wiki, Philippines.",
  "Anytime Fitness growth: Free Malaysia Today, 26 January 2026.",
  "KL Standard Chartered Marathon 2025 registrations: The Sun, 2025.",
  "HYROX Kuala Lumpur, 11 to 13 December 2026 at MITEC: SAYS and The Rakyat Post, 2026.",
  "Viral RM4 sardine protein post: WorldOfBuzz, 26 January 2026.",
  "Platform usage and online grocery: Ipsos survey via Malay Mail, 16 July 2026.",
  "Threads ad reach in Malaysia: DataReportal, Digital 2026 Malaysia.",
  "Malaysian brands on Threads: Marketing-Interactive, 28 November 2025 and 24 June 2026; The Rakyat Post, 19 November and 2 December 2025.",
  "Food claim rules: Food Regulations 1985, Regulations 18 to 18E, Fifth A Schedule.",
  "Toggle case studies, 2025: Al Hidayah Publications, EduKids, Kualesa.",
  "Provisional 2027 holiday dates: Calendarific."
];

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
  <h1>The everyday protein <em>of active Malaysians</em></h1>
  <p class="prep">Prepared for ${esc(PARTNER)} · 2027 online growth and media plan · November 2026</p></section>`,

/* 2 demand */
`<section class="slide dark" data-sec="The market" data-title="The demand" id="s-demand"><div class="kick">The market · Malaysia, 2025 to 2026</div>
  <h2 class="sttl" style="font-size:76px;max-width:1350px">Malaysians already eat canned fish <em>for protein</em>.</h2>
  <p class="body" style="max-width:1050px;margin-top:22px">The fitness crowd is growing, and it already reaches for a can. <b>Nobody has told them which one.</b></p>
  <div class="tiles">${DEMAND.map(t=>`<div><div class="big" data-count="${t.v}" data-pre="" data-suf="${t.suf||""}">0</div><p class="cap">${t.c}</p><span class="sr">${t.s}</span></div>`).join("")}</div></section>`,

"@ex:map",
"@ex:shop",

/* 5 marketplaces */
`<section class="slide white" data-sec="The shop" data-title="Marketplace prices" id="s-mk"><div class="kick">The shop · Marketplaces ${BADGE.v}</div>
  <h2 class="sttl" style="font-size:66px;max-width:1350px">Resellers set your price <em>on the marketplaces</em>.</h2>
  <p class="body" style="max-width:1100px;margin-top:18px">We found no official TC Boy store on Shopee, Lazada or TikTok Shop. The same 150g can of tuna sells for more than double on one Lazada listing.</p>
  <div class="mk2"><div class="pbars">
    <div class="pbar"><div class="lb"><b>tcboy.com, per can inside a 48-can carton</b><span>RM6.80</span></div><div class="tr"><i data-w="42.5"></i></div></div>
    <div class="pbar mid"><div class="lb"><b>Lazada trending listing, seller unknown</b><span>RM6.90</span></div><div class="tr"><i data-w="43.1"></i></div><div class="sm">122 sold in 30 days</div></div>
    <div class="pbar hi"><div class="lb"><b>Lazada reseller, Emporium Mall</b><span>RM15.99</span></div><div class="tr"><i data-w="100"></i></div></div></div>
    <div class="mkstats"><div><b>71%</b><span>of Malaysian online shoppers use Shopee.</span></div><div><b>62%</b><span>use TikTok Shop, up from 43% in 2024.</span></div></div></div>
  <p class="xs" style="margin-top:auto">Lazada listings checked 5 November 2026. Platform usage: Ipsos, July 2026. Please tell us about any authorized sellers.</p></section>`,

/* 6 the plan */
`<section class="slide dark" data-sec="The plan" data-title="The plan" style="justify-content:center;padding-bottom:110px"><div class="kick">The plan · 2027</div>
  <h2 class="sttl" style="font-size:84px;max-width:1350px;margin-top:22px">Fix the shop, prove the protein, <em>then scale</em>.</h2>
  <div class="moves">
    <div><span class="mono">01 · Q1</span><h3>Fix the shop</h3><p>Tracking, official stores on Shopee, Lazada and TikTok Shop, and packs of 6, 12 and 24 cans.</p></div>
    <div><span class="mono">02 · Q2</span><h3>Prove the protein</h3><p>Protein grams on every listing, and a 12-can protein pack built on the tuna range.</p></div>
    <div><span class="mono">03 · Q2 onward</span><h3>Borrow credibility</h3><p>Trainers, run clubs and HYROX athletes, paid partly by commission on sales.</p></div>
    <div><span class="mono">04 · All year</span><h3>Keep the family buyer</h3><p>CNY, Ramadan and Raya hampers hold the core customer while the new one grows.</p></div></div></section>`,

/* 7 the year */
`<section class="slide alt" data-sec="The plan" data-title="The year"><div class="kick">The plan · Four quarters</div>
  <h2 class="sttl" style="font-size:66px;max-width:1350px">The shop opens <em>before the festive peak</em>.</h2>
  <p class="body" style="max-width:1100px;margin-top:18px">Festive demand arrives in February, a few weeks after kickoff, so the first 60 days go to the stores and the tracking.</p>
  <div class="qtr">
    <div><span class="mono">Q1 · Jan to Mar</span><h3>Foundation and festive</h3><p>Tracking and three official stores live by the end of February. CNY, Ramadan and Raya hampers.</p><div class="dates"><span>CNY</span><span>Ramadan</span><span>Raya</span><span>3.3</span></div></div>
    <div><span class="mono">Q2 · Apr to Jun</span><h3>Protein launch</h3><p>The protein pack, the creator program and run club partners. Checkpoint at the end of June.</p><div class="dates"><span>4.4</span><span>5.5</span><span>6.6</span></div></div>
    <div><span class="mono">Q3 · Jul to Sep</span><h3>Scale what worked</h3><p>Media moves to the winning channels, with Merdeka as the "homegrown protein" moment.</p><div class="dates"><span>7.7</span><span>8.8</span><span>Merdeka</span><span>9.9</span></div></div>
    <div><span class="mono">Q4 · Oct to Dec</span><h3>Peak sales</h3><p>The year's biggest sale days, then year-end gym and hamper bundles.</p><div class="dates"><span>10.10</span><span>11.11</span><span>12.12</span></div></div></div></section>`,

"@ex:budget",
"@ex:media",
"@ex:flight",
"@ex:threads",

/* 12 creators */
`<section class="slide white" data-sec="The voice" data-title="Creators"><div class="kick">The voice · Creators</div>
  <h2 class="sttl" style="font-size:66px;max-width:1350px">Creators who train <em>carry the protein message</em>.</h2>
  <p class="body" style="max-width:1100px;margin-top:18px">Three tiers, each with one job, and every script checked against Malaysian food claim rules before it posts.</p>
  <div class="tiers">
    <div><span class="mono">Credible voice</span><div class="cnt">1 to 2</div><h3>Dietitians or doctors</h3><p>Explain protein per can, and answer the sodium and mercury questions honestly.</p><span class="pay">Flat fee</span></div>
    <div><span class="mono">Trainers and athletes</span><div class="cnt">5 to 8</div><h3>Trainers, runners, HYROX athletes</h3><p>Show TC Boy inside real meal prep and race week routines.</p><span class="pay">Fee plus product</span></div>
    <div><span class="mono">Everyday affiliates</span><div class="cnt">30 to 50</div><h3>TikTok Shop affiliates</h3><p>Post, tag and sell the protein pack, earning a share of each sale.</p><span class="pay">Commission per sale</span></div></div>
  <div class="saynot"><div class="y"><span class="mono">What creators say</span>"Protein helps build and repair body tissues."</div><div class="n"><span class="mono">What creators never say</span>"Builds muscle", "melts fat", or anything about someone's body.</div></div>
  <p class="xs" style="margin-top:12px">Food Regulations 1985, Regulation 18E lists the permitted protein function claims. Muscle and performance claims need separate approval.</p></section>`,

"@ex:gate",

/* 14 proof */
`<section class="slide alt" data-sec="Close" data-title="Our work"><div class="kick">Close · Our work</div>
  <h2 class="sttl" style="font-size:66px;max-width:1350px">We have grown online stores <em>like this before</em>.</h2>
  <p class="body" style="max-width:1100px;margin-top:18px">Three e-commerce brands in 2025. Each one tested small first, then put money behind what sold.</p>
  <div class="prf">
    <div><b>11.5x</b><h3>Return on TikTok Shop ads, Al Hidayah</h3><p>A tiered GMV Max setup with affiliate creators lifted revenue 300% and orders 200% in four months.</p><span class="mono">TikTok Shop · Malaysia · 2025</span></div>
    <div><b>6x</b><h3>TikTok return on ad spend, EduKids</h3><p>Target met by month two, and a newly launched website grew to RM14,000 a month at a 5.5% conversion rate.</p><span class="mono">TikTok and Meta · Malaysia · 2025</span></div>
    <div><b>+45%</b><h3>Return on ad spend, Kualesa</h3><p>Creative tests at low spend first, then Google, TikTok and Meta at scale across five markets, holding 2.0x.</p><span class="mono">Multi-channel · ASEAN · 2025</span></div></div></section>`,

/* 15 next step */
`<section class="slide dark" data-sec="Close" data-title="Next step" style="justify-content:center;padding-bottom:110px"><div class="kick">Next step</div>
  <h2 class="sttl" style="font-size:84px;max-width:1350px;margin-top:22px">One questionnaire, <em>then one working session</em>.</h2>
  <p class="body" style="max-width:1000px;margin-top:28px">Return the onboarding questionnaire by Friday, 13 November, and we book a session that week to turn this draft into the final plan.</p>
  <div class="asks"><div><span class="mono">${esc(PARTNER)} brings</span><p>Confirmation that the RM200,000 includes media, 2026 online sales by channel, and the nutrition panel for each product.</p></div><div><span class="mono">Toggle brings</span><p>The checked marketplace and Threads audit, a creator shortlist, and the first 90 days, week by week.</p></div><div><span class="mono">We leave with</span><p>Agreed checkpoint targets, a confirmed budget split, and a January start date.</p></div></div>
  <div class="contact" style="margin-top:26px"><div><span class="mono">Toggle Solutions</span><p>hello@toggle.solutions</p></div><div><span class="mono">Viknesh</span><p>+60 12 568 8681</p></div><div><span class="mono">On the web</span><p>toggle.solutions</p></div></div></section>`,

/* 16 sources */
`<section class="slide white" data-sec="Close" data-title="Sources"><div class="kick">Sources</div><h2 class="sttl" style="font-size:52px">Where <em>every number</em> comes from.</h2>
  <ol class="srclist">${SOURCES.map(s=>`<li>${s}</li>`).join("")}</ol></section>`
];

/* demand numbers count up when the slide opens */
INITS.push(function initDemand(){onOpen($("#s-demand .tiles"),()=>$$("#s-demand [data-count]").forEach(el=>countUp(el,+el.dataset.count,el.dataset.suf,el.dataset.pre)))});
