/* =========================================================================
   DECK ENGINE, lifted from the education deck (Zaid, November 2026) and
   trimmed: same stage, rail, pill nav, observer stand-in, fit and print.
   The call planner is left out; this deck is presented in one order.
   ========================================================================= */
const stage=$("#stage");
const WM='<svg viewBox="0 0 1432 392" aria-hidden="true"><use href="#wm"/></svg>';
stage.innerHTML=SLIDES.map(s=>s.startsWith("@ex:")?xslide(s.slice(4)):s).join("");
const SL=$$(".slide",stage);
SL.forEach((s,i)=>s.insertAdjacentHTML("beforeend",`<div class="sf">${WM}<span>${DECK_NAME}</span><span class="pn">${String(i+1).padStart(2,"0")} / ${SL.length}</span></div>`));
$("#agenda").innerHTML=SYSTEM.map(id=>{const i=SL.findIndex(s=>s.id==="ex-"+id);return `<a href="#${i+1}"><span class="an">${String(i+1).padStart(2,"0")}</span><span class="at">${SL[i].dataset.title}</span></a>`}).join("");

INITS.forEach(f=>{try{f()}catch(err){console.error(f.name+": "+err.message)}});

/* bars grow when their slide opens */
function grow(s,on){
  $$("[data-w]",s).forEach(i=>{i.style.width=on?i.dataset.w+"%":"0"});
  $$(".dots5",s).forEach(d=>d.classList.toggle("on",on));
}

/* fit each exhibit body into the space under its header */
function fitOne(s){const xb=$(".xb",s),f=$(".fit",s);if(!xb||!f)return;let z=+s.dataset.z||1;
  for(let k=0;k<4;k++){f.style.setProperty("--z",z);const h=f.scrollHeight,H=xb.clientHeight,nz=Math.min(1.1,Math.max(.6,H/h*.98));if(Math.abs(nz-z)<.01)break;z=nz}
  f.style.setProperty("--z",z);s.dataset.z=z.toFixed(2)}
function fitAll(){$$(".ex").forEach(fitOne)}
const fitRO=new ResizeObserver(es=>es.forEach(e=>{const s=e.target.closest(".slide");clearTimeout(s._ft);s._ft=setTimeout(()=>{const H=$(".xb",s).clientHeight,h=e.target.scrollHeight*(+s.dataset.z||1);if(h>H+2||h<H*.9)fitOne(s)},120)}));
$$(".ex .fit").forEach(f=>fitRO.observe(f));

let cur=-1;
function go(n){
  n=Math.max(0,Math.min(SL.length-1,n));if(n===cur)return;
  if(cur>=0){const o=SL[cur];o.classList.remove("on");o.classList.add("offscreen");o.inert=true;grow(o,false)}
  cur=n;const s=SL[n];s.classList.add("on");s.classList.remove("offscreen");s.inert=false;
  requestAnimationFrame(()=>grow(s,true));
  $$("#railList button").forEach(b=>{const on=+b.dataset.n===n;b.setAttribute("aria-current",on);if(on)b.scrollIntoView({block:"nearest"})});
  $("#pg").textContent=`${String(n+1).padStart(2,"0")} / ${SL.length}`;$("#tt").textContent=s.dataset.title||"";
  $("#prog").style.width=(n+1)/SL.length*100+"%";
  if(location.hash!=="#"+(n+1))history.replaceState(null,"","#"+(n+1));
  pingIO();
  const wv=$(".cover .wavewrap svg");if(wv&&wv.pauseAnimations){(n===0&&!REDUCED)?wv.unpauseAnimations():wv.pauseAnimations()}
}
const step=d=>go(cur+d);
SL.forEach(s=>{s.inert=true;s.classList.add("offscreen")});
{const sec=SL.map(s=>s.dataset.sec);
 $("#railList").innerHTML=SL.map((s,i)=>`${sec[i]&&sec[i]!==sec[i-1]?`<li class="sec">${sec[i]}</li>`:""}<li><button type="button" data-n="${i}" aria-label="Slide ${i+1}: ${s.dataset.title}"><span class="rn">${String(i+1).padStart(2,"0")}</span><span class="rt">${s.dataset.title}</span></button></li>`).join("");
 $("#railList").addEventListener("click",e=>{const b=e.target.closest("button");if(b){go(+b.dataset.n);b.blur()}});}
const scaleStage=()=>{const rail=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--rail"))||0;document.documentElement.style.setProperty("--s",Math.min((innerWidth-rail)/1600,innerHeight/900))};
addEventListener("resize",scaleStage);scaleStage();
const fromHash=()=>{const n=parseInt(location.hash.slice(1),10);return isNaN(n)?0:n-1};
addEventListener("hashchange",()=>go(fromHash()));
$("#prev").addEventListener("click",()=>step(-1));$("#next").addEventListener("click",()=>step(1));
document.addEventListener("keydown",e=>{
  const t=e.target;if(t.matches&&t.matches("input,textarea,select"))return;
  if(["ArrowRight","PageDown"].includes(e.key)||(e.key===" "&&t===document.body)){e.preventDefault();step(1)}
  else if(["ArrowLeft","PageUp"].includes(e.key)){e.preventDefault();step(-1)}
  else if(e.key==="Home")go(0);else if(e.key==="End")go(SL.length-1);
  else if(e.key==="f"&&document.fullscreenEnabled){(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()).catch(()=>{})}});
let idleT;const wake=()=>{$("#nav").classList.remove("idle");clearTimeout(idleT);idleT=setTimeout(()=>$("#nav").classList.add("idle"),2600)};
addEventListener("mousemove",wake);addEventListener("keydown",wake);wake();

/* print: every slide shows its finished state */
addEventListener("beforeprint",()=>{PRINTING=true;pingIO();SL.forEach(s=>grow(s,true));
  $$("[data-count]").forEach(e=>e.textContent=(e.dataset.pre||"")+fmt(+e.dataset.count)+(e.dataset.suf||""));fitAll()});
addEventListener("afterprint",()=>{PRINTING=false;SL.forEach((s,i)=>{if(i!==cur)grow(s,false)})});

go(fromHash());
(document.fonts?document.fonts.ready:Promise.resolve()).then(fitAll);
