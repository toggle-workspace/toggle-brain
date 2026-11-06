/* Concept A, "Clean Room". Renders both pages from window.TOGGLE, then wires motion. */
(function () {
  const T = window.TOGGLE, { $, $$, esc, pad } = TG, A = TG.ASSETS;
  const page = document.body.dataset.page;
  const isHome = page === "home";
  const home = isHome ? "" : "index.html";
  const REDUCED = TG.reduced();
  const hasGSAP = !!window.gsap;
  let lenis = null;

  TG.theme.init();

  /* ---------- small builders ---------- */
  const arrow = '<span class="arr" aria-hidden="true">→</span>';
  const sun = '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const moon = '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>';
  const sw = () => `<button class="switch" role="switch" aria-label="Dark mode" aria-checked="false" data-theme-switch><span class="knob">${sun}${moon}</span></button>`;
  const navHref = (h) => (h.startsWith("#") ? home + h : h);
  const logo = (l) => `${A}/logos/${l[0]}${l[0] === "media_prima" ? "-mono.svg" : "-logo.webp"}`;
  const rawCls = (id) => (id === "media_prima" ? ' class="raw-logo"' : "");
  const logoById = (id) => logo(T.logos.find((l) => l[0] === id) || [id]);
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; return el; };
  const splitTitle = (s, word) => esc(s).replace(esc(word), `<em>${esc(word)}</em>`);

  /* ---------- shared: nav + footer + cta ---------- */
  set("nav", `
    <div class="wrap nav-in">
      <a class="wm" href="${isHome ? "#top" : "index.html"}" aria-label="Toggle Solutions home">${TOGGLE_WORDMARK}</a>
      <nav class="nav-links" aria-label="Main">
        ${T.nav.map((n) => `<a href="${navHref(n.href)}"${n.href === "about.html" && !isHome ? ' aria-current="page"' : ""}>${esc(n.label)}</a>`).join("")}
      </nav>
      <div class="nav-right">
        ${sw()}
        <a class="btn" href="${home}#contact">${esc(T.hero.cta)}</a>
        <button class="menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><span></span></button>
      </div>
    </div>
    <div class="drawer" id="drawer">
      ${T.nav.map((n) => `<a href="${navHref(n.href)}">${esc(n.label)}</a>`).join("")}
      <a class="btn" href="${home}#contact">${esc(T.hero.cta)} ${arrow}</a>
    </div>`);

  set("contact", `
    <div class="wrap">
      <div class="cta-card">
        <img src="${A}/photos/studio.webp" alt="The Toggle team on set during the founders photoshoot" loading="lazy">
        <div class="cta-in">
          <h2 class="h2">${esc(T.cta.title)}</h2>
          <div>
            <p>${esc(T.cta.body)}</p>
            <a class="btn" href="mailto:${T.meta.email}">${esc(T.cta.button)} ${arrow}</a>
          </div>
        </div>
      </div>
    </div>`);

  set("foot", `
    <div class="wrap">
      <div class="foot-grid">
        <div class="contact">
          <h3>Contact</h3>
          <p class="em">${esc(T.meta.email)}</p>
          <p><a href="${T.meta.phoneHref}">${esc(T.meta.phone)}</a></p>
          <p>${esc(T.meta.address)}</p>
        </div>
        <div><h3>Services</h3><ul>${T.footer.services.map((s) => `<li><a href="${home}#services">${esc(s)}</a></li>`).join("")}</ul></div>
        <div><h3>Work</h3><ul>${T.footer.work.map((s) => `<li><a href="${home}#work">${esc(s)}</a></li>`).join("")}</ul></div>
        <div><h3>Social</h3><ul><li><a href="${T.meta.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li><li><a href="${T.meta.instagram}" target="_blank" rel="noopener">Instagram</a></li></ul></div>
      </div>
      <div class="foot-low">
        <span>${esc(T.meta.company)}</span>
        <div class="row">${T.footer.legal.map((l) => `<a href="#">${esc(l)}</a>`).join("")}${sw()}</div>
      </div>
      <div class="foot-word" aria-hidden="true">${TOGGLE_WORDMARK}</div>
    </div>`);

  /* ---------- HOME ---------- */
  if (isHome) {
    document.getElementById("hero").setAttribute("id", "top");
    set("top", `
      <div class="wrap">
        <p class="struck"><span>${esc(T.hero.struck)}</span></p>
        <h1 aria-label="${esc(T.hero.title)}">
          <span class="line"><span>Your Digital</span></span>
          <span class="line"><span><em>Growth</em> Partner</span></span>
        </h1>
        <div class="hero-low">
          <p class="lede">${esc(T.hero.body)}</p>
          <div class="hero-actions">
            <div class="rating"><b class="num">${esc(T.hero.rating)}</b><span class="mono">${esc(T.hero.ratingLabel)}</span></div>
            <a class="btn blue" href="#contact">${esc(T.hero.cta)} ${arrow}</a>
          </div>
        </div>
        <ul class="points">${T.hero.points.map((p, i) => `<li><span class="mono">${pad(i + 1)}</span><span>${esc(p)}</span></li>`).join("")}</ul>
      </div>`);

    const byId = Object.fromEntries(T.people.map((p) => [p.id, p]));
    set("lens", `
      <div class="lens-pin">
        <div class="lens-frame">
          <img src="${A}/photos/founders.webp" alt="The six co-founders of Toggle Solutions standing in a row in the studio" width="2200" height="1467">
          <div class="lens-tags">
            ${T.foundersPhoto.map((f) => `<div class="tag" data-x="${f.x}" data-y="${f.y}" tabindex="0"><span class="pill">${esc(byId[f.id].name)}<small>${esc(byId[f.id].role)}</small></span><span class="dot"></span></div>`).join("")}
          </div>
          <span class="lens-cap mono">${esc(T.teamTitle)}</span>
        </div>
      </div>`);

    const half = Math.ceil(T.logos.length / 2);
    const row = (ls) => ls.concat(ls).map((l, i) => `<img${rawCls(l[0])} src="${logo(l)}" alt="${i < ls.length ? esc(l[1]) + " logo" : ""}"${i >= ls.length ? ' aria-hidden="true"' : ""} loading="lazy">`).join("");
    set("logos", `
      <div class="wrap"><h2>${esc(T.logosTitle)}</h2></div>
      <div class="marquee" style="--dur:70s"><div class="track">${row(T.logos.slice(0, half))}</div></div>
      <div class="marquee rev" style="--dur:80s"><div class="track">${row(T.logos.slice(half))}</div></div>`);

    $("#services").classList.add("sec");
    set("services", `
      <div class="wrap">
        <div class="sec-head"><h2 class="h2">${esc(T.servicesTitle)}</h2><p class="lede">${esc(T.servicesBody)}</p></div>
        <div class="svc-grid">
          <aside class="svc-side" aria-hidden="true">
            <div class="svc-count num"><span id="svc-n">01</span><small>/${T.services.length}</small></div>
            <span class="mono">Now showing</span>
            <div class="svc-now" id="svc-now">${esc(T.services[0].name)}</div>
          </aside>
          <div>
            <ul class="svc-list">
              ${T.services.map((s, i) => `
                <li class="svc${i === 0 ? " open on" : ""}" data-i="${i}">
                  <button aria-expanded="${i === 0}" aria-controls="svc-b${i}">
                    <span class="idx">${pad(i + 1)}</span>
                    <span class="nm">${esc(s.name)}${s.isNew ? '<span class="new">new</span>' : ""}</span>
                    <span class="pm" aria-hidden="true"></span>
                  </button>
                  <div class="body" id="svc-b${i}"><div><p>${esc(s.body)}</p></div></div>
                </li>`).join("")}
            </ul>
            <a class="link svc-more" href="#services">${esc(T.servicesCta)} ${arrow}</a>
          </div>
        </div>
      </div>`);

    set("work", `
      <div class="work-pin">
        <div class="wrap">
          <div class="sec-head">
            <div><h2 class="h2">${esc(T.workTitle)}</h2></div>
            <div><p class="lede">${esc(T.workBody)}</p>
              <div class="work-meta"><span class="mono num" id="work-c">01 / ${pad(T.work.length)}</span><span class="prog"><i></i></span><a class="link" href="#work">${esc(T.workCta)} ${arrow}</a></div>
            </div>
          </div>
        </div>
        <div class="rail" id="rail">
          ${T.work.map((w, i) => `
            <article class="card">
              <div class="art"><span class="mono">${esc(w.industry)}</span><img src="${A}/work/${w.img}.webp" alt="${esc(w.client)} campaign creative" loading="lazy"></div>
              <div class="txt">
                <span class="mono">${pad(i + 1)} · ${esc(w.service)}</span>
                <h3>${esc(w.title)}</h3>
                <span class="client">${esc(w.client)}</span>
                <div class="mets">${w.metrics.length
                  ? w.metrics.map((m) => `<div class="met"><b>${esc(m[0])}</b><span>${esc(m[1])}</span></div>`).join("")
                  : `<div class="met none"><b>${esc(w.industry)}</b><span>${esc(w.location)}</span></div>`}</div>
                <p>${esc(w.body)}</p>
                <a class="link" href="#work">Read more ${arrow}</a>
              </div>
            </article>`).join("")}
        </div>
      </div>`);

    $("#team").classList.add("sec");
    set("team", `
      <div class="wrap">
        <div class="sec-head"><h2 class="h2">${esc(T.teamTitle)}</h2><p class="lede">${esc(T.teamBody)}</p></div>
        <div class="team-grid">${T.people.map(personCard).join("")}</div>
        ${statsHTML()}
        <a class="btn ghost team-cta" href="about.html#people">${esc(T.teamCta)} ${arrow}</a>
      </div>`);

    set("breather", `<img src="${A}/photos/laptop.webp" alt="Toggle Solutions team" loading="lazy"><span class="mono">[ Toggle Solutions team ]</span>`);

    $("#faq").classList.add("sec");
    set("faq", `
      <div class="wrap faq-grid">
        <div class="faq-side">
          <h2 class="h2">${esc(T.faqTitle)}</h2>
          <p class="lede">${esc(T.faqBody)}</p>
          <a class="link" href="mailto:${T.meta.email}">${esc(T.faqLink)} ${arrow}</a>
        </div>
        <div>${T.faq.map(qaHTML).join("")}</div>
      </div>`);

    $("#blog").classList.add("sec");
    set("blog", `
      <div class="wrap">
        <div class="sec-head"><h2 class="h2">${esc(T.blogTitle)}</h2><p class="lede">${esc(T.blogBody)}</p></div>
        <div class="posts">${T.blog.map((b) => `
          <a class="post" href="#blog">
            <div class="top"><span class="mono topic">${esc(b.topic)}</span><span class="mono">${esc(b.read)}</span></div>
            <h3>${esc(b.title)}</h3>
            <p>${esc(b.body)}</p>
            <span class="link">Read article ${arrow}</span>
          </a>`).join("")}</div>
        <a class="link blog-more" href="#blog">${esc(T.blogCta)} ${arrow}</a>
      </div>`);
  }

  /* ---------- ABOUT ---------- */
  if (!isHome) {
    const ab = T.about;
    set("ab-hero", `
      <div class="wrap">
        <nav class="crumbs mono" aria-label="Breadcrumb"><a href="index.html">${esc(ab.crumbs[0])}</a><span>/</span><span>${esc(ab.crumbs[1])}</span></nav>
        <h1>${splitTitle(ab.title, "built to last")}</h1>
        <div class="ab-intro">
          <div class="facts mono"><span>Founded 2021</span><span>Kuala Lumpur</span><span>Asia · US · Europe · Middle East</span></div>
          <p class="lede">${esc(ab.body)}</p>
        </div>
        <div class="ab-photo"><img src="${A}/photos/team.webp" alt="The full Toggle Solutions team in the studio" width="2200" height="1467"></div>
      </div>`);

    set("ab-stats", `<div class="wrap">${statsHTML()}</div>`);

    $("#values").classList.add("sec");
    set("values", `
      <div class="wrap">
        <div class="sec-head"><h2 class="h2">${esc(ab.valuesTitle)}</h2><p class="lede">${esc(ab.valuesBody)}</p></div>
        <div class="v-stack">${ab.values.map((v, i) => `
          <article class="vcard" style="top:${90 + i * 22}px">
            <div class="ph"><img src="${A}/photos/${v.photo}.webp" alt="" loading="lazy"></div>
            <div class="tx">
              <span class="ix">${pad(i + 1)}</span>
              <div><h3>${esc(v.name)}</h3><p style="margin-top:18px">${esc(v.body)}</p></div>
            </div>
          </article>`).join("")}</div>
      </div>`);

    // Proposed section 1: built only from the approved "How long" and "What results" FAQ answers.
    const fAudit = T.faq[1], fResults = T.faq[6];
    const steps = [
      ["24 hours", fAudit.list[0]], // proposed copy: "24 hours" label
      ["3–5 days", fAudit.list[1]], // proposed copy: "3–5 days" label
      ...fResults.list.map((x) => [x[0], x[1]]),
    ];
    $("#timeline").classList.add("sec");
    set("timeline", `
      <div class="wrap proposed">
        <span class="ptag">Proposed section · approved FAQ copy</span>
        <div class="sec-head"><h2 class="h2">${esc(fResults.q)}</h2><p class="lede tl-intro">${esc(fResults.a)}</p></div>
        <div class="tl-track" id="tl">
          <span class="tl-line" aria-hidden="true"><i></i></span>
          ${steps.map((s, i) => `<div class="tl-step"><span class="mono ph">Step ${i + 1} of ${steps.length}</span><span class="when num">${esc(s[0])}</span><p>${esc(s[1])}</p></div>`).join("")}
        </div>
      </div>`);

    // Proposed section 2: the "Who will I work with?" answer as three role cards.
    const fWho = T.faq[2];
    set("three", `
      <div class="wrap proposed">
        <span class="ptag">Proposed section · approved FAQ copy</span>
        <div class="sec-head"><h2 class="h2">${esc(fWho.q)}</h2><p class="lede">${esc(fWho.a)}</p></div>
        <div class="three-grid">${fWho.list.map((r, i) => `<div class="role"><span class="n">${i + 1}</span><div><h3>${esc(r[0])}</h3><p>${esc(r[1])}</p></div></div>`).join("")}</div>
        <p class="three-after">${esc(fWho.after)}</p>
      </div>`);

    $("#people").classList.add("sec");
    set("people", `
      <div class="wrap">
        <div class="sec-head"><h2 class="h2">${esc(ab.peopleTitle)}</h2><p class="lede">${esc(ab.peopleBody)}</p></div>
        <div class="people-grid">${T.people.map((p) => personCard(p, true)).join("")}</div>
      </div>`);

    // Proposed section 3: "Do you do performance marketing only?" as a system diagram.
    const fSys = T.faq[4];
    $("#system").classList.add("sec");
    set("system", `
      <div class="wrap proposed">
        <span class="ptag">Proposed section · approved FAQ copy</span>
        <div class="sys-wrap">
          <div>
            <h2 class="h2">${esc(fSys.q)}</h2>
            <p class="lede" style="margin-top:24px">${esc(fSys.a)}</p>
            <p class="lede">${esc(fSys.after)}</p>
          </div>
          <div class="sys" id="sys" role="img" aria-label="${esc(fSys.list.join(", "))}, all connected to one strategy">
            <svg viewBox="0 0 100 100" aria-hidden="true"><circle class="ring" cx="50" cy="50" r="38"/>${fSys.list.map((_, i) => {
              const a = (i / fSys.list.length) * Math.PI * 2 - Math.PI / 2;
              return `<line class="spoke" x1="50" y1="50" x2="${(50 + 38 * Math.cos(a)).toFixed(2)}" y2="${(50 + 38 * Math.sin(a)).toFixed(2)}" pathLength="1"/>`;
            }).join("")}</svg>
            <div class="core">One strategy</div>
            ${fSys.list.map((n, i) => {
              const a = (i / fSys.list.length) * Math.PI * 2 - Math.PI / 2;
              return `<span class="node" style="left:${50 + 38 * Math.cos(a)}%;top:${50 + 38 * Math.sin(a)}%">${esc(n)}</span>`;
            }).join("")}
          </div>
        </div>
      </div>`);

    $("#partners").classList.add("sec");
    $("#partners").style.paddingTop = "0";
    set("partners", `
      <div class="wrap">
        <div class="partners-card">
          <div><h2 class="h2" style="font-size:clamp(32px,4.4vw,60px)">${esc(ab.partnersTitle)}</h2><p class="lede">${esc(ab.partnersBody)}</p><a class="btn ghost" href="#partners">${esc(ab.partnersCta)} ${arrow}</a></div>
          <div class="logo-box"><img src="${A}/logos/sama-logo.svg" alt="Sama logo"></div>
        </div>
      </div>`);

    $("#brands").classList.add("sec");
    $("#brands").style.paddingTop = "0";
    set("brands", `
      <div class="wrap">
        <div class="sec-head"><h2 class="h2">${esc(ab.brandsTitle)}</h2><p class="lede">${esc(ab.brandsBody)}</p></div>
        <div class="brand-grid">${ab.brands.map((b) => `<div><img${rawCls(b)} src="${logoById(b)}" alt="${esc((T.logos.find((l) => l[0] === b) || [b, b])[1])} logo" loading="lazy"></div>`).join("")}</div>
      </div>`);
  }

  function personCard(p, button) {
    const tag = button ? "button" : "div";
    return `<${tag} class="pp" data-id="${p.id}"${button ? ` aria-label="Open ${esc(p.name)}, ${esc(p.role)}"` : ""}>
      <span class="ph"><img src="${A}/team/${p.id}-0.webp" alt="${button ? "" : esc(p.name) + ", " + esc(p.role)}" loading="lazy" width="688" height="860"><span class="rec" aria-hidden="true"></span><span class="fc num" aria-hidden="true">01/06</span></span>
      <span class="who"><b>${esc(p.name)}</b><span>${esc(p.role)}</span></span>
    </${tag}>`;
  }
  function statsHTML() {
    return `<div class="stats">${T.stats.map((s) => `<div class="stat"><span class="v"><span>${esc(s[0])}</span></span><span class="l">${esc(s[1])}</span></div>`).join("")}</div>`;
  }
  function qaHTML(f, i) {
    const list = f.list ? `<ul>${f.list.map((x) => (Array.isArray(x) ? `<li><b>${esc(x[0])}:</b> ${esc(x[1])}</li>` : `<li>${esc(x)}</li>`)).join("")}</ul>` : "";
    return `<div class="qa${i === 0 ? " open" : ""}">
      <button aria-expanded="${i === 0}" aria-controls="qa${i}"><span>${esc(f.q)}</span><span class="pm" aria-hidden="true"></span></button>
      <div class="ans" id="qa${i}"><div><p>${esc(f.a)}</p>${list}${f.after ? `<p>${esc(f.after)}</p>` : ""}</div></div>
    </div>`;
  }

  /* ================= INTERACTION ================= */

  // Theme switches (nav + footer stay in sync).
  const syncSwitches = () => $$("[data-theme-switch]").forEach((b) => b.setAttribute("aria-checked", String(TG.theme.current() === "dark")));
  syncSwitches();
  $$("[data-theme-switch]").forEach((b) => b.addEventListener("click", () => TG.theme.toggle(b)));
  document.addEventListener("themechange", syncSwitches);
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", syncSwitches);

  // Mobile drawer.
  const mb = $(".menu-btn"), dr = $("#drawer");
  mb && mb.addEventListener("click", () => {
    const o = dr.classList.toggle("open");
    mb.setAttribute("aria-expanded", String(o));
  });
  $$("#drawer a").forEach((a) => a.addEventListener("click", () => { dr.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); }));

  // Accordions: services (one open at a time) and FAQ.
  function accordion(items, cls) {
    items.forEach((it) => {
      const b = $("button", it);
      b.addEventListener("click", () => {
        const willOpen = !it.classList.contains("open");
        items.forEach((o) => { o.classList.remove("open"); $("button", o).setAttribute("aria-expanded", "false"); });
        if (willOpen) { it.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
        setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 520);
      });
    });
  }
  accordion($$(".svc"));
  accordion($$(".qa"));

  // Flipbook portraits: hover (or tap) plays the six stills from the shoot like stop-motion.
  $$(".pp").forEach((card) => {
    const id = card.dataset.id, img = $("img", card), fc = $(".fc", card), frames = TG.frames(id);
    let t = null, f = 0, loaded = false;
    const show = (n) => { f = n; img.src = frames[n]; fc.textContent = `${pad(n + 1)}/${pad(frames.length)}`; };
    const play = () => {
      if (REDUCED || t) return;
      if (!loaded) { TG.preload(frames); loaded = true; }
      card.classList.add("playing");
      t = setInterval(() => show((f + 1) % frames.length), 140);
    };
    const stop = () => { clearInterval(t); t = null; card.classList.remove("playing"); show(0); };
    card.addEventListener("mouseenter", play);
    card.addEventListener("mouseleave", stop);
    card.addEventListener("focus", play);
    card.addEventListener("blur", stop);
    if (!card.matches("button")) card.addEventListener("touchstart", () => (t ? stop() : play()), { passive: true });
  });

  // People sheet (About): drag across the photo, use the slider, or arrow keys to scrub frames.
  const sheet = $("#sheet");
  if (sheet) {
    let lastFocus = null;
    const open = (p) => {
      lastFocus = document.activeElement;
      const frames = TG.frames(p.id); TG.preload(frames);
      sheet.innerHTML = `
        <div class="sheet-card" role="dialog" aria-modal="true" aria-labelledby="sh-name" data-lenis-prevent>
          <button class="x" aria-label="Close"></button>
          <div class="big" id="sh-big"><img src="${frames[0]}" alt="${esc(p.name)}, ${esc(p.role)}"><span class="mono hint">Drag to scrub</span></div>
          <div class="info">
            <span class="mono">Toggle Solutions · ${pad(T.people.indexOf(p) + 1)} of ${pad(T.people.length)}</span>
            <h3 id="sh-name">${esc(p.name)}</h3>
            <div class="role-t">${esc(p.role)}</div>
            <label class="mono" for="sh-scrub">Frame <span id="sh-f" class="num">01</span> of 06</label>
            <input class="scrub" id="sh-scrub" type="range" min="0" max="5" step="1" value="0">
            <div class="thumbs">${frames.map((u, i) => `<button aria-label="Frame ${i + 1}"${i === 0 ? ' class="on"' : ""}><img src="${u}" alt=""></button>`).join("")}</div>
          </div>
        </div>`;
      sheet.hidden = false;
      lenis && lenis.stop();
      const big = $("#sh-big", sheet), im = $("img", big), rng = $("#sh-scrub", sheet), lab = $("#sh-f", sheet), th = $$(".thumbs button", sheet);
      const go = (n) => { n = Math.max(0, Math.min(5, n)); im.src = frames[n]; rng.value = n; lab.textContent = pad(n + 1); th.forEach((b, i) => b.classList.toggle("on", i === n)); };
      rng.addEventListener("input", () => go(+rng.value));
      th.forEach((b, i) => b.addEventListener("click", () => go(i)));
      let drag = false;
      const at = (x) => { const r = big.getBoundingClientRect(); go(Math.floor(((x - r.left) / r.width) * 6)); };
      big.addEventListener("pointerdown", (e) => { drag = true; big.setPointerCapture(e.pointerId); at(e.clientX); });
      big.addEventListener("pointermove", (e) => { if (drag || e.pointerType === "mouse") at(e.clientX); });
      big.addEventListener("pointerup", () => (drag = false));
      $(".x", sheet).addEventListener("click", close);
      $(".x", sheet).focus();
      if (hasGSAP && !REDUCED) gsap.from($(".sheet-card", sheet), { y: 40, opacity: 0, scale: .98, duration: .55, ease: "power3.out" });
    };
    const close = () => { sheet.hidden = true; sheet.innerHTML = ""; lenis && lenis.start(); lastFocus && lastFocus.focus(); };
    sheet.addEventListener("click", (e) => { if (e.target === sheet) close(); });
    document.addEventListener("keydown", (e) => {
      if (sheet.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { const r = $("#sh-scrub", sheet); r.value = +r.value + (e.key === "ArrowRight" ? 1 : -1); r.dispatchEvent(new Event("input")); }
      if (e.key === "Tab") { // keep focus inside the sheet
        const f = $$("button, input", sheet); const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    $$(".people-grid .pp").forEach((b) => b.addEventListener("click", () => open(T.people.find((p) => p.id === b.dataset.id))));
  }

  // Founder name tags: map each face from image space into the cover-fitted frame.
  function placeTags() {
    const frame = $(".lens-frame"); if (!frame) return;
    const img = $("img", frame), W = frame.clientWidth, H = frame.clientHeight;
    const iw = img.naturalWidth || 2200, ih = img.naturalHeight || 1467;
    const s = Math.max(W / iw, H / ih), rw = iw * s, rh = ih * s;
    const pos = getComputedStyle(img).objectPosition.split(" ").map((v) => parseFloat(v) / 100);
    const ox = (W - rw) * pos[0], oy = (H - rh) * pos[1];
    $$(".tag", frame).forEach((t) => {
      const x = ox + +t.dataset.x * rw, y = oy + (+t.dataset.y - 0.13) * rh;
      t.style.left = x + "px"; t.style.top = y + "px";
      t.style.visibility = x < 30 || x > W - 30 ? "hidden" : "visible";
    });
  }

  /* ---------- motion ---------- */
  if (!hasGSAP) { placeTags(); return; }
  gsap.registerPlugin(ScrollTrigger);
  if (!REDUCED && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
      const id = a.getAttribute("href"); if (id.length < 2) return;
      const el = $(id); if (!el) return; e.preventDefault(); lenis.scrollTo(el, { offset: -60 });
    }));
  }

  // Nav: border once scrolled, hide on the way down, return on the way up.
  const nav = $("#nav"); let lastY = 0;
  const onScroll = (y) => {
    nav.classList.toggle("scrolled", y > 10);
    nav.classList.toggle("hide", y > 400 && y > lastY && !(dr && dr.classList.contains("open")));
    lastY = y;
  };
  lenis ? lenis.on("scroll", (e) => onScroll(e.scroll)) : addEventListener("scroll", () => onScroll(scrollY), { passive: true });

  window.addEventListener("load", () => { placeTags(); ScrollTrigger.refresh(); });
  window.addEventListener("resize", placeTags);
  placeTags();

  const mm = gsap.matchMedia();

  // Hero: lines rise, then the old category gets struck through.
  if (isHome) {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    if (!REDUCED) {
      tl.from(".hero .struck", { y: 16, opacity: 0, duration: .7 })
        .fromTo(".hero .struck", { "--strike": 0 }, { "--strike": 1, duration: .8, ease: "power2.inOut" }, "+=.1")
        .to(".hero .struck", { opacity: .55, duration: .5 }, "<.4")
        .from(".hero h1 .line > span", { yPercent: 110, duration: 1.1, stagger: .12 }, "-=.5")
        .from(".hero-low > *, .points li", { y: 24, opacity: 0, duration: .8, stagger: .08, clearProps: "all" }, "-=.6");
    }
  }

  mm.add({ desk: "(min-width: 761px)", ok: "(prefers-reduced-motion: no-preference)" }, (c) => {
    const { desk, ok } = c.conditions;
    if (!ok) return;

    // Founders lens: a framed photo opens to full bleed, then the names land on each face.
    if (desk && $("#lens")) {
      const frame = $(".lens-frame");
      gsap.timeline({ scrollTrigger: { trigger: "#lens", start: "top top", end: "bottom bottom", scrub: 0.6 } })
        .fromTo(frame, { "--ix": "18%", "--iy": "16%", "--ir": "32px", "--zoom": 1.18 }, { "--ix": "0%", "--iy": "0%", "--ir": "0px", "--zoom": 1, ease: "none", duration: 1 })
        .to(".tag", { opacity: 1, y: 0, stagger: 0.06, duration: 0.25 }, 0.78)
        .to(".lens-cap", { opacity: 1, duration: 0.2 }, 0.85);
      gsap.set(".tag", { y: 14 });
    }

    // Work: pinned horizontal rail on desktop.
    const rail = $("#rail");
    if (rail && innerWidth > 900) {
      const dist = () => rail.scrollWidth - innerWidth;
      const count = $("#work-c"), prog = $(".prog");
      gsap.to(rail, {
        x: () => -dist(), ease: "none",
        scrollTrigger: {
          trigger: "#work", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.5, invalidateOnRefresh: true,
          onUpdate: (st) => {
            const n = Math.min(T.work.length, Math.floor(st.progress * T.work.length) + 1);
            count.textContent = `${pad(n)} / ${pad(T.work.length)}`;
            prog.style.setProperty("--p", Math.max(1 / T.work.length, st.progress));
          },
        },
      });
    }

    // Breather + CTA: slow parallax.
    $("#breather img") && gsap.fromTo("#breather img", { yPercent: -12 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: "#breather", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.fromTo(".cta-card", { "--z": 1.16 }, { "--z": 1, ease: "none", scrollTrigger: { trigger: ".cta-card", start: "top bottom", end: "bottom bottom", scrub: true } });

    // About photo settles into the page as you scroll.
    $(".ab-photo") && gsap.fromTo(".ab-photo", { scale: .9, borderRadius: "48px" }, { scale: 1, borderRadius: "28px", ease: "none", scrollTrigger: { trigger: ".ab-photo", start: "top 90%", end: "top 30%", scrub: true } });

    // Values: each card shrinks back as the next one stacks over it.
    if (desk) $$(".vcard").forEach((card, i, all) => {
      if (i === all.length - 1) return;
      gsap.to(card, { scale: .94, filter: "brightness(.55)", ease: "none", scrollTrigger: { trigger: all[i + 1], start: "top 85%", end: "top 90px", scrub: true } });
    });
  });

  // Services: the row passing the middle of the screen becomes the active one.
  const svcN = $("#svc-n"), svcNow = $("#svc-now");
  $$(".svc").forEach((li) => {
    ScrollTrigger.create({
      trigger: li, start: "top 55%", end: "bottom 55%",
      onToggle: (st) => {
        if (!st.isActive) return;
        $$(".svc").forEach((o) => o.classList.toggle("on", o === li));
        const i = +li.dataset.i;
        if (svcN) { svcN.textContent = pad(i + 1); svcNow.textContent = T.services[i].name; }
      },
    });
  });

  // Section headings and cards rise in once.
  if (!REDUCED) {
    ScrollTrigger.batch(".sec-head > *, .post, .role, .tl-step, .three-after, .partners-card, .brand-grid > div, .logos h2", {
      start: "top 88%", once: true,
      onEnter: (els) => gsap.from(els, { y: 36, opacity: 0, duration: .9, ease: "power3.out", stagger: .07, clearProps: "transform,opacity" }),
    });
    // Stats: numbers slide up out of a mask. No counting up.
    $$(".stats").forEach((s) => gsap.from($$(".v span", s), { yPercent: 105, duration: 1, ease: "power4.out", stagger: .09, scrollTrigger: { trigger: s, start: "top 85%", once: true } }));
    // Team grid.
    $$(".team-grid, .people-grid").forEach((g) => gsap.from($$(".pp", g), { y: 50, opacity: 0, duration: 1, ease: "power3.out", stagger: .06, clearProps: "transform,opacity", scrollTrigger: { trigger: g, start: "top 85%", once: true } }));
  }

  // Timeline: the line fills with scroll and each step lights as the line reaches it.
  const tlEl = $("#tl");
  if (tlEl) {
    const steps = $$(".tl-step", tlEl), line = $(".tl-line", tlEl);
    ScrollTrigger.create({
      trigger: tlEl, start: "top 75%", end: "bottom 45%", scrub: true,
      onUpdate: (st) => {
        line.style.setProperty("--p", st.progress);
        steps.forEach((s, i) => s.classList.toggle("lit", st.progress >= i / (steps.length - 1) - 0.02));
      },
    });
    line.style.setProperty("--p", 0);
  }

  // System diagram: spokes draw out from the core.
  const sys = $("#sys");
  if (sys && !REDUCED) {
    gsap.fromTo($$(".spoke", sys), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.out", stagger: .1, scrollTrigger: { trigger: sys, start: "top 75%", once: true } });
    gsap.from($$(".node", sys), { opacity: 0, duration: .6, ease: "power2.out", stagger: .08, delay: .3, clearProps: "opacity", scrollTrigger: { trigger: sys, start: "top 75%", once: true } });
  }
})();
