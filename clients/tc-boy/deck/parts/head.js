"use strict";
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
const fmt = n=>Math.round(n).toLocaleString("en-US");
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const BADGE = {v:'<span class="badge v"><i></i>Verified</span>',ill:'<span class="badge ill"><i></i>Illustrative model</span>',mock:'<span class="badge mock"><i></i>Mockup</span>'};
function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
const seg=(el,fn)=>el.addEventListener("click",e=>{const b=e.target.closest("button");if(!b||!el.contains(b))return;$$("button",el).forEach(x=>x.setAttribute("aria-pressed",x===b));fn(b)});

/* Slides are stacked in one stage, so a real IntersectionObserver would see
   every slide as on screen. This stand-in reports an element as visible
   only while its slide is the current one. */
const IOS=[];let PRINTING=false;
window.IntersectionObserver=class{
  constructor(cb){this.cb=cb;this.els=new Map();IOS.push(this)}
  observe(el){this.els.set(el,null);setTimeout(()=>this.ping(),0)}
  unobserve(el){this.els.delete(el)}
  disconnect(){this.els.clear()}
  ping(){const es=[];this.els.forEach((last,el)=>{const s=el.closest(".slide"),on=PRINTING||!!(s&&s.classList.contains("on"));if(on!==last){this.els.set(el,on);es.push({target:el,isIntersecting:on})}});if(es.length)this.cb(es,this)}
};
const pingIO=()=>IOS.forEach(o=>o.ping());
/* run fn each time the element's slide opens */
const onOpen=(el,fn,off)=>new IntersectionObserver(es=>{es[0].isIntersecting?fn():off&&off()}).observe(el);

function countUp(el,to,suf,pre="",dec=0){
  const f=v=>pre+(dec?v.toFixed(dec):fmt(v))+suf;
  if(REDUCED||PRINTING){el.textContent=f(to);return}
  const t0=performance.now(),d=1400;
  const tick=t=>{const p=Math.min(1,(t-t0)/d),e=1-Math.pow(1-p,3);el.textContent=f(to*e);if(p<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick);
}
