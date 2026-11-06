/* =========================================================================
   DECK CONTENT, revision of 6 November 2026. Marketplace-first, healthier
   everyday positioning for the mass market, tcboy.com as an optional
   add-on. Every figure traces to the sources slide and to
   clients/tc-boy/01-strategy/2026-11-05-pre-planning.md.
   ========================================================================= */
const q=new URLSearchParams(location.search);
const PARTNER=(q.get("for")||"TC Boy").slice(0,40);
const DECK_NAME="TC Boy 2027 plan · Toggle";
const BODY={},INITS=[];
const SYSTEM=[];
const rm=n=>"RM"+fmt(n);
const mil=n=>(n/1e6).toFixed(1)+"M";

/* =========================================================================
   THE MARKET · DEMAND TILES
   ========================================================================= */
const DEMAND=[
  {v:47,suf:"%",c:"of Malaysian online shoppers now buy groceries online, up from 34% a year earlier.",s:"Ipsos · Jul 2026"},
  {v:12.57,pre:"RM",dec:2,c:"average cost of a balanced home-cooked meal. Cost is the main thing keeping families from eating to the healthy-plate guide.",s:"Galen Centre and UiTM · Sep 2025"},
  {v:28,suf:"g",c:"protein per 100g in the RM4 sardine can a Malaysian called \"my new protein source\". No brand was named.",s:"WorldOfBuzz · Jan 2026"},
  {v:56,suf:"%",c:"more protein claimed by Marigold HL Advance. Household brands are bringing protein to everyday groceries.",s:"Mini Me Insights"}
];

/* =========================================================================
   THE MARKET · POSITIONING MAP
   ========================================================================= */
BODY.map={
  title:'The healthier everyday can <em>is still up for grabs</em>.',
  kicker:'Each brand sits by how loudly it claims protein and how much it is seen as part of everyday healthier eating. Click a brand, then switch to 2027.',
  body:`<div class="pmap"><div class="pplot" id="pplot"><div class="q"></div><span class="ql">Open space</span><div class="vl"></div><div class="hl"></div>
      <span class="ax x">How loudly the brand claims protein &#8594;</span><span class="ax y">Seen as healthier everyday food &#8594;</span></div>
    <div class="pside"><div class="seg" id="pSeg" style="width:fit-content"><button type="button" data-v="0" aria-pressed="true">Today</button><button type="button" data-v="1" aria-pressed="false">TC Boy in 2027</button></div>
      <div class="card" id="pCard" aria-live="polite"></div></div></div>`,
  src:'Positions are Toggle\'s reading of each brand\'s public messaging, checked 5 and 6 November 2026. Ayam Brand: Malaysian Foodie, November 2024. Yeo\'s: The Star, October 2026. TC Boy on Shopee: TCBM Online Store listings, checked 6 November 2026.'
};
const BRANDS=[
  {n:"Ayam Brand",x:76,y:48,say:'"An excellent and affordable source of lean protein."',life:"Runs a yearly community campaign for a healthier Malaysia, the 17th in 2024. It speaks through events more than everyday online content.",mk:"Official Shopee and Lazada stores."},
  {n:"Yeo's",x:22,y:14,say:"Teriyaki and spicy tuna, launched with a roadshow in October 2026.",life:"None found. The story is flavor.",mk:"Not checked."},
  {n:"King Cup",x:14,y:28,say:"Local taste and value in sardines and mackerel.",life:"None found.",mk:"Not checked."},
  {n:"Adabi",x:30,y:36,say:"Heritage spice brand with sardine curry.",life:"None found.",mk:"Not checked."},
  {n:"Rex",x:40,y:12,say:"Penang tuna maker, halal certified.",life:"None found.",mk:"Not checked."},
  {n:"TC Boy today",x:58,y:16,tc:1,say:'"High in protein" on product pages, with no grams shown.',life:"Recipes, hampers and giveaways on social, with no healthier-living angle yet.",mk:"Sells on Shopee through TCBM Online Store. Lazada resellers only, one at RM15.99 a can. No TikTok Shop storefront found."},
  {n:"TC Boy in 2027",x:84,y:82,goal:1,say:"Protein grams on every can, and a healthier everyday pack.",life:"Home cooks, nutritionists and busy parents showing quick, healthier meals every week.",mk:"Official stores on Shopee, Lazada and TikTok Shop."}
];
function initMap(){
  const plot=$("#pplot");
  plot.insertAdjacentHTML("beforeend",BRANDS.map((b,i)=>`<button type="button" class="pdot${b.tc?" tc":""}${b.goal?" goal hide":""}" data-i="${i}" aria-pressed="false" style="left:${b.x}%;bottom:${b.y}%"><i></i><span>${b.n}</span></button>`).join(""));
  const show=i=>{const b=BRANDS[i];$$(".pdot",plot).forEach(d=>d.setAttribute("aria-pressed",+d.dataset.i===i));
    $("#pCard").innerHTML=`<span class="mono">${b.goal?"The 2027 target":"What they say"}</span><h3>${b.n}</h3><p>${b.say}</p><span class="mono pm">Healthier everyday eating</span><p>${b.life}</p><span class="mono pm">Marketplaces</span><p>${b.mk}</p>`};
  plot.addEventListener("click",e=>{const d=e.target.closest(".pdot");if(d)show(+d.dataset.i)});
  seg($("#pSeg"),b=>{const on=b.dataset.v==="1";$(".pdot.goal",plot).classList.toggle("hide",!on);show(on?6:5)});
  show(5);
}
INITS.push(initMap);

/* =========================================================================
   THE MARKETPLACES · OFFICIAL STORE MOCKUP
   ========================================================================= */
BODY.store={
  title:'Three official stores, <em>one TC Boy shelf</em>.',
  kicker:'What we build on Shopee, Lazada and TikTok Shop in the first 60 days, so shoppers buy from TC Boy and not from resellers. Switch the store.',
  body:`<div class="store"><div class="sphone" id="sPhone" aria-live="polite"></div>
    <div class="sside"><div class="seg" id="sSeg" style="width:fit-content"><button type="button" data-v="0" aria-pressed="true">Shopee</button><button type="button" data-v="1" aria-pressed="false">Lazada</button><button type="button" data-v="2" aria-pressed="false">TikTok Shop</button></div>
      <div class="card"><span class="mono">Today</span><p id="sNow"></p></div>
      <div class="card"><span class="mono">What we build</span><h3 id="sBuild"></h3><p id="sBuildP"></p></div>
      <div class="card"><span class="mono">How shoppers find it</span><p id="sFind"></p></div></div></div>`,
  src:'Mockup. Store layouts are illustrative, with no platform branding. Official store status depends on each platform\'s brand approval. Pack sizes follow the plan; prices are set with TC Boy. Today: TCBM Online Store listings on Shopee and Lazada listings, checked 5 and 6 November 2026.'
};
const STORES=[
  {tint:"#E2562F",badge:"Mall",sub:"Official store · Ships from Penang",now:"TC Boy sells through TCBM Online Store. We could not confirm a Mall badge, and the listings carry no protein grams or bundles.",
   build:"An upgraded official store",bp:"The TCBM shop becomes the official TC Boy store, with bundles, protein grams on every listing and store vouchers.",
   find:"Shopee search ads on \"tuna\" and \"makanan tin\", store vouchers, Shopee Live on sale days, and affiliates who earn on each sale."},
  {tint:"#2B3FA8",badge:"LazMall",sub:"Flagship store · 100% authentic",now:"We found resellers only. One lists the 150g spring water tuna at RM15.99, more than double TC Boy's RM6.80.",
   build:"A new LazMall flagship",bp:"An official store that takes the price back from resellers, with the same packs and listings as Shopee.",
   find:"Sponsored search and discovery ads, concentrated on the double-date mega sales where Lazada traffic peaks."},
  {tint:"#121212",badge:"Official",sub:"TikTok Shop · Free returns",now:"The @tcboy.official account is already set up as a seller, but we found no storefront selling TC Boy.",
   build:"A TikTok Shop storefront",bp:"The existing seller account opens its shop, so every video and creator post can carry a buy button.",
   find:"GMV Max campaigns, creator affiliates paid on each sale, and LIVE selling on sale days."}
];
const SKU=[["6","Tuna in mineral water","6-can pack"],["12","Healthier everyday pack","12 cans · protein grams on label"],["3","Sardines in tomato sauce","3-can pack"],["24","Family pantry box","24 cans · tuna and sardines"]];
function initStore(){
  const draw=i=>{const s=STORES[i];
    $("#sPhone").style.setProperty("--tint",s.tint);
    $("#sPhone").innerHTML=`<div class="sh"><div class="row"><div class="lg"><img src="${TC_LOGO}" alt="TC BOY"></div><div><div class="nm"><span class="bdg">${s.badge}</span>TC BOY Official</div><div class="sub">${s.sub}</div></div></div></div>
      <div class="vch"><span>Store voucher</span><span>Bundle deal</span><span>Free shipping</span></div>
      <div class="grid">${SKU.map(k=>`<div class="it"><div class="im">&times;${k[0]}</div><div class="tx">${k[1]}<br><span class="tg">${k[2]}</span></div></div>`).join("")}</div>`;
    $("#sNow").textContent=s.now;$("#sBuild").textContent=s.build;$("#sBuildP").textContent=s.bp;$("#sFind").textContent=s.find};
  seg($("#sSeg"),b=>draw(+b.dataset.v));draw(0);
}
INITS.push(initStore);

/* =========================================================================
   THE PLAN · THE BUILD-UP
   ========================================================================= */
BODY.ramp={
  title:'From kickstart <em>to 11.11 and 12.12</em>.',
  kicker:'How 2027 builds, from the first week with Toggle to the year\'s biggest sale days. The line shows the shape we plan for, not a sales forecast. Click a stage.',
  body:`<div class="ramp"><div class="rchart" id="rChart"></div><div class="rstages" id="rStages"></div><div class="rpanel" id="rPanel" aria-live="polite"></div></div>`,
  src:'Illustrative. The line is an index of planned marketplace activity, peaking at 11.11 = 100. Media figures are the base plan; the top-up applies only if the June checkpoint gates are met. Provisional 2027 dates: CNY about 6 February, Ramadan about 8 February to 9 March.'
};
const RAMP=[8,22,26,30,34,44,46,54,66,74,100,88];
const RPEAK={1:"CNY",2:"Raya",5:"6.6",8:"9.9",9:"10.10",10:"11.11",11:"12.12"};
const STAGES=[
  {n:"Weeks 1 to 6",t:"Kickstart",what:"Onboarding, tracking, the three official stores, and first listings with protein grams in packs of 6, 12 and 24.",win:"All three stores live by the end of February.",med:"RM5,000 in January, mostly store traffic tests."},
  {n:"Feb to Mar",t:"First sales",what:"CNY on about 6 February, then Ramadan and Raya. Hamper bundles and sahur and iftar packs. The first festive sales teach the ads who buys.",win:"First festive sales on all three stores.",med:"RM19,000 across February and March."},
  {n:"Apr to Jun",t:"Healthier everyday launch",what:"The healthier everyday pack launches with home cooks, nutritionists and busy-parent creators, across 4.4, 5.5 and 6.6.",win:"The June checkpoint, against the gates we agree now.",med:"RM22,000 across the quarter."},
  {n:"Jul to Sep",t:"Scale what works",what:"Media moves to the stores, channels and creators that sold. Merdeka carries the homegrown story into 9.9.",win:"Top-up media starts in September if the gates are met.",med:"RM23,000, up to RM35,000 with the top-up."},
  {n:"Oct to Dec",t:"Peak sales",what:"10.10, 11.11 and 12.12, the biggest sale days of the year, with year-end hampers and pantry boxes.",win:"11.11, the biggest single sales day of the year.",med:"RM31,000, up to RM79,000 with the top-up."}
];
const SPAN=[[0,1],[1,3],[3,6],[6,9],[9,12]];
function initRamp(){
  const W=1200,H=300,X=i=>(i+.5)*100,Y=v=>262-v*2.3;
  const pts=RAMP.map((v,i)=>[X(i),Y(v)]);
  const d="M"+X(0)+",262 L"+pts.map(p=>p.join(",")).join(" L");
  const area=d+" L"+X(11)+",262 Z";
  $("#rChart").innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="rampFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(42,107,224,.28)"/><stop offset="1" stop-color="rgba(42,107,224,0)"/></linearGradient></defs>
    <path class="ar" d="${area}"/><path class="ln" pathLength="1" d="${d}"/>
    <g class="ck"><line x1="600" y1="20" x2="600" y2="262"/><text x="610" y="32">JUNE CHECKPOINT</text></g>
    ${pts.map((p,i)=>RPEAK[i]?`<g class="pk${i===10?" big":""}" style="transition-delay:${.5+i*.16}s"><circle cx="${p[0]}" cy="${p[1]}" r="${i===10?9:7}"/><text x="${p[0]}" y="${p[1]-18}">${RPEAK[i]}</text></g>`:"").join("")}
    ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m,i)=>`<text class="mo" x="${X(i)}" y="290">${m.toUpperCase()}</text>`).join("")}</svg>`;
  $("#rStages").innerHTML=STAGES.map((s,i)=>`<button type="button" class="rst" data-i="${i}" aria-pressed="${i===0}"><span class="n">${s.n}</span><span class="t">${s.t}</span></button>`).join("");
  const show=i=>{const s=STAGES[i];$$(".rst").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.i===i));
    $("#rPanel").innerHTML=`<div class="card"><span class="mono">What happens</span><p>${s.what}</p></div><div class="card"><span class="mono">Milestone</span><p>${s.win}</p></div><div class="card"><span class="mono">Paid media</span><p>${s.med}</p></div>`};
  $("#rStages").addEventListener("click",e=>{const b=e.target.closest(".rst");if(b)show(+b.dataset.i)});show(0);
  onOpen($("#rChart"),()=>setTimeout(()=>$("#rChart").classList.add("go"),80),()=>$("#rChart").classList.remove("go"));
}
INITS.push(initRamp);

/* =========================================================================
   THE MEDIA · PLATFORMS
   ========================================================================= */
BODY.media={
  title:'Media follows <em>where Malaysians shop</em>.',
  kicker:'RM100,000 of paid media inside the RM200,000, weighted to the marketplaces: 68% goes to TikTok Shop, Shopee and Lazada. Click a platform.',
  body:`<div class="cjobs" id="cjobs"></div><div class="cjpanel" id="cjPanel" aria-live="polite"></div>`,
  src:'Platform use: Ipsos, July 2026 (Shopee 71% and TikTok Shop 62% of Malaysian online shoppers). Threads ad reach: DataReportal Digital 2026 Malaysia. Google stays small because the stores, not tcboy.com, carry the sales in this plan.'
};
const PLAT=[
  {n:"TikTok and TikTok Shop",v:36000,who:"Malaysians who discover food on their feed. 62% of online shoppers now use TikTok Shop, up from 43% in 2024.",run:"GMV Max on the new TikTok Shop, Spark Ads that boost creator posts, and LIVE selling on sale days.",m:"TikTok Shop sales and return on ad spend, weekly."},
  {n:"Shopee",v:22000,who:"71% of Malaysian online shoppers use Shopee, many already searching \"tuna\" and \"makanan tin\".",run:"Search and discovery ads, store vouchers and sale-day boosts on the upgraded official store.",m:"Store sales, return on ad spend, and rank on category searches."},
  {n:"Lazada",v:10000,who:"Grocery shoppers who buy on Lazada, today served only by resellers.",run:"Sponsored search and discovery on the new LazMall store, concentrated on mega sale days.",m:"Store sales and return on ad spend."},
  {n:"Facebook and Instagram",v:22000,who:"Family meal planners and festive buyers, the core TC Boy customer today.",run:"Reels with quick, healthier recipes, hamper campaigns, and catalog ads that link to the stores.",m:"Store visits and purchases, tracked with the Pixel."},
  {n:"Threads",v:6000,who:"About 3.6 million Malaysians reachable with Threads ads.",run:"Two placement tests beside Instagram, in Q2 and Q4.",m:"Cost and click rate against Instagram feed."},
  {n:"Google",v:4000,who:"People searching for TC Boy by name.",run:"Brand search ads that point to the official stores.",m:"Clicks to the stores."}
];
function initMedia(){
  $("#cjobs").innerHTML=PLAT.map((c,i)=>`<button type="button" class="cjob${i===0?" lead":""}" data-i="${i}" aria-pressed="${i===0}"><span class="jn">${c.n}</span><span class="jj">${rm(c.v)}</span><span class="sv">${c.v/1000}% of paid media</span><span class="sh"><i data-w="${c.v/360}"></i></span></button>`).join("");
  const show=i=>{const c=PLAT[i];$$(".cjob").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.i===i));
    $("#cjPanel").innerHTML=`<div class="card"><p class="mono">Who it reaches</p><p>${c.who}</p></div><div class="card"><p class="mono">What runs here</p><p>${c.run}</p></div><div class="card"><p class="mono">Measured on</p><p>${c.m}</p></div>`};
  $("#cjobs").addEventListener("click",e=>{const b=e.target.closest(".cjob");if(b)show(+b.dataset.i)});show(0);
}
INITS.push(initMedia);

/* =========================================================================
   THE MEDIA · MALAYSIA TAKEOVER
   Ad views use Toggle's 2026 Malaysian planning costs per 1,000 views
   (clients/COO/saji media plan): TikTok sales RM15 on RM16,000 and Spark or
   video RM2.60 on RM20,000; Meta sales RM22 on RM10,000 and Reels RM3.50
   on RM12,000; Threads RM4.00 on RM6,000. That is 14.14M views from the
   RM64,000 social budget, about 221 views per ringgit. Reach divides views
   by a frequency of 1.9, summed across platforms. Store visits: RM32,000 of
   marketplace ads at RM0.40 a click and RM4,000 of Google at RM0.80.
   ========================================================================= */
BODY.takeover={
  title:'A Malaysia takeover, <em>one month at a time</em>.',
  kicker:'Press play to watch 2027 build from Penang outward. Each dot is an equal share of Malaysia\'s 36.1 million people; a dot lights up for every share\'s worth of TC Boy ad views. Switch on the checkpoint top-up.',
  body:`<div class="tko"><div class="tmap"><svg id="tSvg" viewBox="0 0 ${MYMAP.w} ${MYMAP.h+14}" aria-label="Map of Malaysia filling with TC Boy ad views"></svg>
      <div class="tbar"><button type="button" class="tplay" id="tPlay">&#9654; Play 2027</button><div class="tmonths" id="tMonths"></div>
      <div class="seg" id="tSeg"><button type="button" data-v="0" aria-pressed="true">Base</button><button type="button" data-v="30" aria-pressed="false">+RM30K</button><button type="button" data-v="60" aria-pressed="false">+RM60K</button></div></div></div>
    <div class="kside"><div class="card"><span class="mono" id="tMon">January 2027</span><div class="tnum a" id="tViews">0</div><small>TC Boy ad views so far</small></div>
      <div class="card"><div class="tnum" id="tReach">0</div><small>Malaysians reached, estimated</small></div>
      <div class="card"><div class="tnum" id="tVisits">0</div><small>shopper visits to the official stores from search ads</small></div>
      <div class="card"><span class="mono">Who these platforms can reach</span><div class="aud" id="tAud"></div></div></div></div>`,
  src:'Illustrative. Ad views use Toggle\'s 2026 Malaysian planning costs per 1,000 views (TikTok video RM2.60, Meta Reels RM3.50, Threads RM4.00, sales campaigns RM15 to RM22). Reach assumes 1.9 views per person per platform, summed across platforms. Store visits assume RM0.40 a click on Shopee and Lazada and RM0.80 on Google. Creator and organic reach come on top. Audiences and population: DataReportal Digital 2026 Malaysia; TikTok counts adults 18 and over.'
};
const POP=36.1e6,VPR=14142000/64000,VIS=85000/36000,FREQ=1.9;
const FLIGHT=[5,10,9,8,6,8,6,8,9,9,12,10],TOPW=[0,0,0,0,0,0,0,0,12,12,22,14];
const AUD=[["TikTok",30.7],["Facebook",23.0],["Instagram",16.1],["Threads",3.6]];
function initTakeover(){
  const svg=$("#tSvg"),D=MYMAP.dots,N=D.length/2;let top=0,timer=null,shown=-1;
  svg.innerHTML=Array.from({length:N},(_,i)=>`<circle class="d" cx="${D[2*i]}" cy="${D[2*i+1]}" r="2.5"/>`).join("")+
    `<g class="hm"><circle cx="${MYMAP.home[0]}" cy="${MYMAP.home[1]}" r="8"/><line x1="${MYMAP.home[0]+8}" y1="${MYMAP.home[1]-6}" x2="236" y2="34" stroke="#FF4F9A" stroke-width="1.2"/><text x="242" y="38">BUKIT MERTAJAM, HOME OF TC BOY</text></g>`;
  const C=$$("circle.d",svg);
  $("#tMonths").innerHTML=["J","F","M","A","M","J","J","A","S","O","N","D"].map(m=>`<span>${m}</span>`).join("");
  $("#tAud").innerHTML=AUD.map(a=>`<div><span>${a[0]}</span><i data-w="${a[1]/30.7*100}"></i><b>${a[1]}M</b></div>`).join("");
  const at=m=>{let v=0,s=0;for(let i=0;i<=m;i++){const k=FLIGHT[i]+TOPW[i]*top/60;v+=k*640*VPR;s+=k*360*VIS}return{v,s}};
  const MON=["January","February","March","April","May","June","July","August","September","October","November","December"];
  const paint=(m,fresh)=>{const prev=m>0?at(m-1).v:0,{v,s}=at(m),lit=Math.min(N,Math.round(v/POP*N)),was=Math.min(N,Math.round(prev/POP*N));
    C.forEach((c,i)=>{c.classList.toggle("on",i<lit);c.classList.toggle("nw",fresh&&i>=was&&i<lit)});
    $$("#tMonths span").forEach((e,i)=>{e.classList.toggle("on",i<m);e.classList.toggle("now",i===m)});
    $("#tMon").textContent=MON[m]+" 2027";$("#tViews").textContent=mil(v);$("#tReach").textContent=mil(v/FREQ);$("#tVisits").textContent=fmt(Math.round(s/1000)*1000);shown=m};
  const stop=()=>{clearInterval(timer);timer=null};
  const play=()=>{stop();let m=0;paint(0,true);if(REDUCED||PRINTING){paint(11,false);return}
    timer=setInterval(()=>{m++;if(m>11){stop();C.forEach(c=>c.classList.remove("nw"));return}paint(m,true)},650)};
  $("#tPlay").addEventListener("click",play);
  seg($("#tSeg"),b=>{top=+b.dataset.v;if(!timer)paint(shown<0?11:shown,false)});
  paint(11,false);
  onOpen(svg,()=>setTimeout(play,500),stop);
}
INITS.push(initTakeover);

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
  ["Jan",5,0,"The official stores go live and tracking is verified. Pre-CNY hamper ads."],
  ["Feb",10,0,"CNY (about 6 February) and the start of Ramadan (about 8 February). Hamper and sahur bundles."],
  ["Mar",9,0,"Hari Raya (about 10 March) and 3.3. Festive bundles, then the first creator seeding."],
  ["Apr",8,0,"The healthier everyday pack launches on all three stores, around 4.4."],
  ["May",6,0,"Creators scale: home cooks, nutritionists and busy parents. 5.5 sale."],
  ["Jun",8,0,"6.6 sale. The checkpoint review runs in the first week of July on January to June data."],
  ["Jul",6,0,"Media moves toward the stores and creators that sold. 7.7 sale."],
  ["Aug",8,0,"Merdeka and the homegrown story. 8.8 sale."],
  ["Sep",9,12,"9.9 sale. Any checkpoint top-up starts here."],
  ["Oct",9,12,"10.10 sale and year-end pantry box content."],
  ["Nov",12,22,"11.11, the biggest sale day of the year."],
  ["Dec",10,14,"12.12 and year-end hampers."]
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
  body:`<div class="thr"><div><div class="seg" id="tSeg2" style="width:fit-content;margin-bottom:14px"><button type="button" data-v="0" aria-pressed="true">Easy healthier meals</button><button type="button" data-v="1" aria-pressed="false">Straight answers</button><button type="button" data-v="2" aria-pressed="false">Offer day</button></div><div class="tphone" id="tPhone" aria-live="polite"></div></div>
    <div class="tside"><div class="card"><span class="mono">What Malaysian brands get</span><p><b>280K</b> people follow Watsons Malaysia on Threads, and it answers mentions in BM. One Lotus's Buy 1 Free 1 post drew <b>1.5K</b> likes against 19 to 48 on its ordinary posts.</p></div>
      <div class="card"><span class="mono">How TC Boy posts</span><div class="trules"><div>A warm, cheeky persona in BM and Manglish, one to three posts a day.</div><div>A person approves every reply before it goes out.</div><div>Bodies, race, religion and royalty never become the joke.</div><div>Offer posts link to the official stores with tracked links.</div></div></div></div></div>`,
  src:'Mockup. Follower and like counts from logged-out profile views, 5 November 2026. Threads ad reach in Malaysia: DataReportal Digital 2026.'
};
const POSTS=[
  [{a:"TC",n:"tcboymalaysia",t:"Office lunch in five minutes: one can of tuna in mineral water, cucumber, a squeeze of lime and rice. Kenyang, sedap, tak mahal."},
   {a:"NA",u:1,n:"nadia.wfh",t:"Okay this is my WFH lunch from now on",re:1},
   {a:"TC",n:"tcboymalaysia",t:"Try it with our lemon pepper tuna next. The recipe is on the listing in our store.",re:1}],
  [{a:"HZ",u:1,n:"hafiz.cooks",t:"Tuna tin ni banyak garam tak? Doktor I cakap kena jaga garam."},
   {a:"TC",n:"tcboymalaysia",t:"Soalan bagus. Pick our tuna in mineral water and check the sodium line on the label. We are posting the full nutrition panel for every can this week, so you can compare yourself.",re:1}],
  [{a:"TC",n:"tcboymalaysia",t:"11.11 is here. The healthier everyday pack is on our official Shopee, Lazada and TikTok Shop stores. Lunches for the whole month, sorted."},
   {a:"SY",u:1,n:"syaz.eats",t:"Finally I can buy a small pack instead of a whole carton haha",re:1}]
];
function initThreads(){
  const draw=i=>{$("#tPhone").innerHTML=POSTS[i].map(p=>`<div class="tp${p.re?" reply":""}"><div class="av${p.u?" u":""}">${p.a}</div><div><div class="nm">${p.n}<span>${p.u?"2h":"1h"}</span></div><div class="tx">${p.t}</div><div class="re"><span>Like</span><span>Reply</span><span>Repost</span></div></div></div>`).join("")};
  seg($("#tSeg2"),b=>draw(+b.dataset.v));draw(0);
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
  {k:"Sales",d:"Marketplace sales ahead of your 2026 baseline, and ads at or above the agreed return."},
  {k:"Product",d:"The healthier everyday pack reaches its agreed share of orders, and repeat buyers grow."},
  {k:"Brand",d:"Creator content views and the Threads following reach their agreed targets."}
];
function initGate(){
  const st=[1,1,0,0];
  $("#gList").innerHTML=GATES.map((g,i)=>`<button type="button" class="gate${g.must?" must":""}" data-i="${i}" aria-pressed="${!!st[i]}"><span class="bx"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span><b>${g.k}</b><span>${g.d}</span></span></button>`).join("");
  const draw=()=>{const others=st[1]+st[2]+st[3];let h,p,a;
    if(!st[0]){h="Fix the foundation first.";p="H2 runs at the base budget, and the first job is getting the stores and tracking right.";a="RM0"}
    else if(others>=2){h="Add media for the big sale days.";p="TC Boy adds paid media to 9.9, 10.10, 11.11 and 12.12, with no change to fees.";a="+RM30,000 to RM60,000"}
    else{h="Hold the budget and move the media.";p="H2 runs at base, and media moves toward the stores and channels that cleared their gates.";a="RM0"}
    $("#gOut").innerHTML=`<span class="mono">The decision</span><h3>${h}</h3><p>${p}</p><div class="amt">${a}</div>`};
  $("#gList").addEventListener("click",e=>{const b=e.target.closest(".gate");if(!b)return;const i=+b.dataset.i;st[i]=st[i]?0:1;b.setAttribute("aria-pressed",!!st[i]);draw()});draw();
}
INITS.push(initGate);

/* =========================================================================
   SLIDES
   ========================================================================= */
const XS={map:["The market","Competitors","ill"],store:["The marketplaces","Official stores","mock"],ramp:["The plan","The build-up","ill"],media:["The media","Platforms","ill"],takeover:["The media","Malaysia takeover","ill"],flight:["The media","Monthly spend","ill"],threads:["The voice","Threads","mock"],gate:["The plan","Checkpoint","ill"]};
const xslide=id=>{const b=BODY[id],[sec,name,bd]=XS[id];
  return `<section class="slide ex" id="ex-${id}" data-sec="${sec}" data-title="${name}"><header class="xh"><div><div class="kick">${sec} · ${name} ${BADGE[bd]}</div><h2 class="xt">${b.title}</h2></div><p class="xk">${b.kicker}</p></header><div class="xb"><div class="fit">${b.body}</div></div><p class="xs">${b.src}</p></section>`};

const SOURCES=[
  "TC Boy: tcboy.com product feed, page source and shipping policy, checked 5 November 2026.",
  "TC Boy on Shopee: TCBM Online Store listings for TC BOY tuna, found 6 November 2026. Mall status not confirmed.",
  "Lazada listings for TC Boy 150g tuna (Emporium Mall reseller, RM15.99; trending listing, RM6.90), checked 5 November 2026.",
  "Online grocery and platform use: Ipsos survey via Malay Mail, 16 July 2026.",
  "Cost of a balanced home-cooked meal: Galen Centre and UiTM survey, via Free Malaysia Today, 8 September 2025.",
  "Viral RM4 sardine protein post: WorldOfBuzz, 26 January 2026.",
  "Marigold HL Advance protein claim: Mini Me Insights.",
  "Ayam Brand protein positioning and healthier Malaysia campaign: Malaysian Foodie, November 2024.",
  "Yeo's Teriyaki Tuna launch: The Star, 3 October 2026.",
  "Population, platform ad audiences and Threads ad reach: DataReportal, Digital 2026 Malaysia.",
  "Planning costs per 1,000 ad views: Toggle's 2026 Malaysian media plans.",
  "Malaysian brands on Threads: Marketing-Interactive, 28 November 2025 and 24 June 2026; The Rakyat Post, 19 November and 2 December 2025.",
  "Food claim rules: Food Regulations 1985, Regulations 18 to 18E, Fifth A Schedule.",
  "Malaysia map: Natural Earth via world-atlas 2.0.2.",
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
  <div class="lockup"><svg viewBox="0 0 1432 392" aria-label="Toggle"><use href="#wm"/></svg><span class="x">&times;</span><img class="tcl" src="${TC_LOGO}" alt="TC BOY"></div>
  <h1>The healthier everyday can <em>for every Malaysian home</em></h1>
  <p class="prep">Prepared for ${esc(PARTNER)} · 2027 marketplace growth and media plan · November 2026</p></section>`,

/* 2 demand */
`<section class="slide dark" data-sec="The market" data-title="The demand" id="s-demand"><div class="kick">The market · Malaysia, 2025 to 2026</div>
  <h2 class="sttl" style="font-size:74px;max-width:1380px">Malaysians want to <em>eat better, easily</em>.</h2>
  <p class="body" style="max-width:1080px;margin-top:22px">Healthier eating has gone mainstream, and more of the shopping happens online. <b>A can of tuna is protein that is cheap, halal and ready in minutes.</b></p>
  <div class="tiles">${DEMAND.map(t=>`<div><div class="big" data-count="${t.v}" data-pre="${t.pre||""}" data-suf="${t.suf||""}" data-dec="${t.dec||0}">0</div><p class="cap">${t.c}</p><span class="sr">${t.s}</span></div>`).join("")}</div></section>`,

"@ex:map",

/* 4 marketplaces */
`<section class="slide white" data-sec="The marketplaces" data-title="Marketplaces today" id="s-mk"><div class="kick">The marketplaces · Today ${BADGE.v}</div>
  <h2 class="sttl" style="font-size:64px;max-width:1380px">Your marketplace shelf is thin, <em>and resellers fill the gap</em>.</h2>
  <p class="body" style="max-width:1150px;margin-top:18px">TC Boy sells on Shopee through TCBM Online Store, but Lazada has resellers only and TikTok Shop has no storefront. The same 150g can of tuna sells for more than double on one Lazada listing.</p>
  <div class="mk2"><div class="pbars">
    <div class="pbar"><div class="lb"><b>tcboy.com, per can inside a 48-can carton</b><span>RM6.80</span></div><div class="tr"><i data-w="42.5"></i></div></div>
    <div class="pbar mid"><div class="lb"><b>Lazada trending listing, seller unknown</b><span>RM6.90</span></div><div class="tr"><i data-w="43.1"></i></div><div class="sm">122 sold in 30 days</div></div>
    <div class="pbar hi"><div class="lb"><b>Lazada reseller, Emporium Mall</b><span>RM15.99</span></div><div class="tr"><i data-w="100"></i></div></div></div>
    <div class="mstat"><div><b>Shopee</b><span class="st ok">TCBM Online Store</span><span class="d">71% of online shoppers use Shopee. Mall badge not confirmed, and no bundles or protein grams.</span></div>
      <div><b>Lazada</b><span class="st">Resellers only</span><span class="d">No LazMall store found, so resellers set the price.</span></div>
      <div><b>TikTok Shop</b><span class="st">No storefront</span><span class="d">62% of online shoppers use it. The seller account exists but sells nothing.</span></div></div></div>
  <p class="xs" style="margin-top:auto">Listings checked 5 and 6 November 2026. Platform use: Ipsos, July 2026. Please tell us about any authorized sellers.</p></section>`,

"@ex:store",

/* 6 optional add-on */
`<section class="slide alt" data-sec="The marketplaces" data-title="Optional: tcboy.com"><div class="kick">The marketplaces · Optional add-on</div>
  <h2 class="sttl" style="font-size:64px;max-width:1380px">An optional add-on: <em>a tcboy.com that sells</em>.</h2>
  <p class="body" style="max-width:1150px;margin-top:18px">The marketplaces carry the 2027 plan. If you want your own site to sell as well, Toggle's web team can fix or rebuild it. <span class="optag">Quoted separately, outside the RM200,000</span></p>
  <div class="addon"><div class="card"><span class="mono">What a shopper meets today</span><div class="afl">
      <div><b>RM326</b><span>The smallest tuna order is a 48-can carton.</span></div>
      <div><b>OTP</b><span>Shoppers must register before anything goes in the cart.</span></div>
      <div><b>1 title</b><span>Every page has the same title, so Google sees one page.</span></div>
      <div><b>0 pixels</b><span>No Meta or TikTok pixel, so ads cannot learn who buys.</span></div></div></div>
    <div class="card"><span class="mono">What the add-on covers</span><div class="agl">
      <div>Packs of 6, 12 and 24 cans, and guest checkout.</div>
      <div>Product pages Google can read, with protein grams and recipes.</div>
      <div>Meta and TikTok pixels, so site visitors join the ad audiences.</div>
      <div>A Bahasa Malaysia version, and the old 2018 site redirected.</div></div></div></div>
  <p class="xs" style="margin-top:auto">Source: tcboy.com product feed and page source, checked 5 November 2026.</p></section>`,

/* 7 the plan */
`<section class="slide dark" data-sec="The plan" data-title="The plan" style="justify-content:center;padding-bottom:110px"><div class="kick">The plan · 2027</div>
  <h2 class="sttl" style="font-size:84px;max-width:1380px;margin-top:22px">Open the stores, show the protein, <em>then scale</em>.</h2>
  <div class="moves">
    <div><span class="mono">01 · Q1</span><h3>Open the official stores</h3><p>Shopee, Lazada and TikTok Shop, with packs of 6, 12 and 24 cans.</p></div>
    <div><span class="mono">02 · Q2</span><h3>Show the protein</h3><p>Protein grams on every listing, and a healthier everyday pack built on the tuna range.</p></div>
    <div><span class="mono">03 · Q2 onward</span><h3>Everyday creators</h3><p>Home cooks, nutritionists and busy parents, paid partly by commission on sales.</p></div>
    <div><span class="mono">04 · All year</span><h3>Keep the festive buyer</h3><p>CNY, Ramadan and Raya hampers hold the core customer while new ones arrive.</p></div></div></section>`,

"@ex:ramp",
"@ex:media",
"@ex:takeover",
"@ex:flight",
"@ex:threads",

/* creators */
`<section class="slide white" data-sec="The voice" data-title="Creators"><div class="kick">The voice · Creators</div>
  <h2 class="sttl" style="font-size:64px;max-width:1380px">Everyday creators <em>carry the healthier message</em>.</h2>
  <p class="body" style="max-width:1150px;margin-top:18px">Three tiers, each with one job, and every script checked against Malaysian food claim rules before it posts.</p>
  <div class="tiers">
    <div><span class="mono">Credible voice</span><div class="cnt">1 to 2</div><h3>Nutritionists or dietitians</h3><p>Explain protein per can, and answer the sodium and mercury questions honestly.</p><span class="pay">Flat fee</span></div>
    <div><span class="mono">Everyday cooks</span><div class="cnt">6 to 10</div><h3>Home cooks, busy parents, office-lunch creators</h3><p>Show TC Boy in quick, healthier meals people already make at home.</p><span class="pay">Fee plus product</span></div>
    <div><span class="mono">Affiliates</span><div class="cnt">30 to 50</div><h3>TikTok Shop and Shopee affiliates</h3><p>Post, tag and sell the healthier everyday pack, earning a share of each sale.</p><span class="pay">Commission per sale</span></div></div>
  <div class="saynot"><div class="y"><span class="mono">What creators say</span>"Protein helps build and repair body tissues."</div><div class="n"><span class="mono">What creators never say</span>"Builds muscle", "melts fat", "cures" anything, or a joke about someone's body.</div></div>
  <p class="xs" style="margin-top:12px">Food Regulations 1985, Regulation 18E lists the permitted protein function claims. Other health claims need separate approval.</p></section>`,

"@ex:gate",

/* proof */
`<section class="slide alt" data-sec="Close" data-title="Our work"><div class="kick">Close · Our work</div>
  <h2 class="sttl" style="font-size:66px;max-width:1350px">We have grown marketplace stores <em>like this before</em>.</h2>
  <p class="body" style="max-width:1100px;margin-top:18px">Three e-commerce brands in 2025. Each one tested small first, then put money behind what sold.</p>
  <div class="prf">
    <div><b>11.5x</b><h3>Return on TikTok Shop ads, Al Hidayah</h3><p>A tiered GMV Max setup with affiliate creators lifted revenue 300% and orders 200% in four months.</p><span class="mono">TikTok Shop · Malaysia · 2025</span></div>
    <div><b>6x</b><h3>TikTok return on ad spend, EduKids</h3><p>Target met by month two, and a newly launched website grew to RM14,000 a month at a 5.5% conversion rate.</p><span class="mono">TikTok and Meta · Malaysia · 2025</span></div>
    <div><b>+45%</b><h3>Return on ad spend, Kualesa</h3><p>Creative tests at low spend first, then Google, TikTok and Meta at scale across five markets, holding 2.0x.</p><span class="mono">Multi-channel · ASEAN · 2025</span></div></div></section>`,

/* next step */
`<section class="slide dark" data-sec="Close" data-title="Next step" style="justify-content:center;padding-bottom:110px"><div class="kick">Next step</div>
  <h2 class="sttl" style="font-size:84px;max-width:1350px;margin-top:22px">One questionnaire, <em>then one working session</em>.</h2>
  <p class="body" style="max-width:1000px;margin-top:28px">Return the onboarding questionnaire by Friday, 13 November, and we book a session that week to turn this draft into the final plan.</p>
  <div class="asks"><div><span class="mono">${esc(PARTNER)} brings</span><p>Confirmation that the RM200,000 includes media, 2026 marketplace sales by platform, and the nutrition panel for each product.</p></div><div><span class="mono">Toggle brings</span><p>A checked audit of the Shopee store and Threads, a creator shortlist, and the first 90 days, week by week.</p></div><div><span class="mono">We leave with</span><p>Agreed checkpoint targets, a confirmed media split, and a January start date.</p></div></div>
  <div class="contact" style="margin-top:26px"><div><span class="mono">Toggle Solutions</span><p>hello@toggle.solutions</p></div><div><span class="mono">Viknesh</span><p>+60 12 568 8681</p></div><div><span class="mono">On the web</span><p>toggle.solutions</p></div></div></section>`,

/* sources */
`<section class="slide white" data-sec="Close" data-title="Sources"><div class="kick">Sources</div><h2 class="sttl" style="font-size:52px">Where <em>every number</em> comes from.</h2>
  <ol class="srclist">${SOURCES.map(s=>`<li>${s}</li>`).join("")}</ol></section>`
];

/* demand numbers count up when the slide opens */
INITS.push(function initDemand(){onOpen($("#s-demand .tiles"),()=>$$("#s-demand [data-count]").forEach(el=>countUp(el,+el.dataset.count,el.dataset.suf,el.dataset.pre,+el.dataset.dec)))});
