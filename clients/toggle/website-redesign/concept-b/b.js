/* Concept B "Growth Console". Renders every page from window.TOGGLE (../shared/content.js).
   Visible strings that are NOT on the live site are marked `// proposed copy`. */
(function () {
  "use strict";
  var T = window.TOGGLE, TGx = window.TG;
  var $ = TGx.$, $$ = TGx.$$, esc = TGx.esc, pad = TGx.pad, A = TGx.ASSETS;
  var page = document.body.dataset.page || "home";
  var isHome = page === "home";
  var reduced = TGx.reduced();
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var G = window.gsap, ST = window.ScrollTrigger;
  if (G && ST) G.registerPlugin(ST);
  TGx.theme.init("dark");

  var WM = window.TOGGLE_WORDMARK || "toggle";
  var arrow = '<span class="arr" aria-hidden="true">→</span>';
  var desktop = function () { return window.matchMedia("(min-width: 961px)").matches; };
  var logoSrc = function (id) {
    var l = T.logos.find(function (x) { return x[0] === id; });
    return A + "/logos/" + id + "-logo." + ((l && l[2]) || "webp");
  };
  var logoName = function (id) { var l = T.logos.find(function (x) { return x[0] === id; }); return l ? l[1] : id; };
  var link = function (href) { return !isHome && href.charAt(0) === "#" && href !== "#contact" ? "index.html" + href : href; };
  var words = function (text, accentFrom) {
    return text.split(" ").map(function (w, i, arr) {
      var acc = accentFrom != null && i >= arr.length - accentFrom;
      return '<span class="w' + (acc ? " w--accent" : "") + '"><span>' + esc(w) + "</span></span>";
    }).join(" ");
  };

  /* ---------- shared chrome ---------- */
  var duoDefs =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">' +
    '<filter id="duo-dark" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 0 0 0 1 0"/>' +
    '<feComponentTransfer><feFuncR type="table" tableValues="0.039 0.290"/><feFuncG type="table" tableValues="0.071 0.482"/><feFuncB type="table" tableValues="0.141 0.969"/></feComponentTransfer></filter>' +
    '<filter id="duo-light" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 0 0 0 1 0"/>' +
    '<feComponentTransfer><feFuncR type="table" tableValues="0.106 0.957"/><feFuncG type="table" tableValues="0.298 0.969"/><feFuncB type="table" tableValues="0.690 0.988"/></feComponentTransfer></filter></svg>';

  var gridlines = '<div class="gridlines" aria-hidden="true"><div class="gridlines__in">' + new Array(13).join("<i></i>") + "</div></div>";

  function themeSwitch(extra) {
    return '<button type="button" class="tswitch ' + (extra || "") + '" role="switch" aria-checked="false" aria-label="Dark mode">' +
      '<span class="tswitch__track" aria-hidden="true"><span class="tswitch__knob"></span></span>' +
      '<span class="tswitch__label mono">Dark mode</span></button>';
  }

  function nav() {
    var links = T.nav.map(function (n, i) {
      var cur = !isHome && n.href === "about.html" ? ' aria-current="page"' : "";
      return '<a href="' + link(n.href) + '"' + cur + '><span class="nav__n">[' + pad(i + 1) + "]</span>" + esc(n.label) + "</a>";
    }).join("");
    var big = T.nav.map(function (n, i) {
      return '<a href="' + link(n.href) + '"><span>[' + pad(i + 1) + "]</span>" + esc(n.label) + "</a>";
    }).join("");
    return '<a class="skip" href="#main">Skip to content</a>' + // proposed copy
      '<header class="nav" id="nav"><div class="nav__in">' +
      '<a class="nav__brand" href="index.html" aria-label="Toggle Solutions home">' + WM + "</a>" +
      '<nav class="nav__links" aria-label="Primary">' + links + "</nav>" +
      '<div class="nav__right">' + themeSwitch() + '<a class="pill" href="#contact">' + esc(T.hero.cta) + "</a>" +
      '<button type="button" class="nav__menu mono" aria-expanded="false" aria-controls="menu">Menu</button></div>' + // proposed copy
      "</div></header>" +
      '<div class="menu" id="menu" hidden data-lenis-prevent><button type="button" class="menu__close mono">Close</button>' + // proposed copy
      '<nav aria-label="Mobile">' + big + "</nav>" +
      '<div class="menu__foot">' + themeSwitch() + '<a class="pill" href="#contact">' + esc(T.hero.cta) + "</a></div></div>";
  }

  function head(label, title, body, extra) {
    return '<header class="sh" data-reveal><span class="sh__rule" aria-hidden="true"></span>' +
      '<p class="sh__label mono">' + label + "</p>" +
      '<div class="sh__main"><h2 class="sh__title">' + esc(title) + "</h2>" +
      (body || extra ? '<div class="sh__row">' + (body ? '<p class="sh__body">' + esc(body) + "</p>" : "") + (extra || "") + "</div>" : "") +
      "</div></header>";
  }

  function stats() {
    return '<div class="stats" role="list">' + T.stats.map(function (s, i) {
      return '<div class="stat" role="listitem"><span class="stat__i mono">[' + pad(i + 1) + ']</span>' +
        '<span class="stat__n"><span>' + esc(s[0]) + '</span></span><span class="stat__l">' + esc(s[1]) + "</span></div>";
    }).join("") + "</div>";
  }

  function scanFigure(src, alt, tags) {
    return '<figure class="scan" tabindex="0" aria-label="' + esc(alt) + '"' + (tags ? " data-tags" : "") + ">" +
      '<img class="scan__duo" src="' + src + '" alt="" decoding="async">' +
      '<img class="scan__true" src="' + src + '" alt="' + esc(alt) + '" decoding="async">' +
      '<div class="scan__band" aria-hidden="true"><span class="scan__tick mono">Scan</span></div>' + // proposed copy
      (tags ? '<div class="scan__tag mono" aria-live="polite"></div>' : "") + "</figure>";
  }

  function cta() {
    var audit = T.faq[1].list, fq = T.faq[0].list;
    // Ticket rows use FAQ facts only (responses within 24 hours, audit in 3-5 business days, 3-5 growth levers).
    var rows = ["Respond within 24 hours", "Audit in 3–5 business days", fq[0]];
    return '<section class="sec cta" id="contact"><div class="wrap cta__grid">' +
      '<div class="cta__copy" data-reveal><p class="sh__label mono">[05] Contact</p>' +
      '<h2 class="cta__title">' + esc(T.cta.title) + "</h2>" +
      '<p class="cta__body">' + esc(T.cta.body) + "</p>" +
      '<a class="btn" href="#contact">' + esc(T.cta.button) + " " + arrow + "</a></div>" +
      '<div class="ticket-wrap" data-reveal><div class="ticket">' +
      '<div class="ticket__main"><div class="ticket__top mono"><span>[ toggle.solutions ]</span><span>Admit one</span></div>' + // proposed copy: "Admit one"
      '<p class="ticket__title">' + esc(T.faq[0].q.replace("What do I get in the ", "").replace("?", "")) + "</p>" +
      '<ul class="ticket__rows mono">' + rows.map(function (r, i) { return "<li><span>" + pad(i + 1) + "</span><span>" + esc(r) + "</span></li>"; }).join("") + "</ul>" +
      '<div class="ticket__bars" aria-hidden="true"></div></div>' +
      '<button type="button" class="ticket__stub mono" aria-label="Tear off the stub to book a strategy call"><span>Tear here ' + arrow + "</span></button>" + // proposed copy
      '<div class="ticket__reveal"><a href="#contact">' + esc(T.cta.button) + " " + arrow + "</a></div>" +
      '</div><p class="ticket-hint mono">Drag the stub to tear it off</p></div>' + // proposed copy
      "</div></section>";
    void audit;
  }

  function footer() {
    var M = T.meta, F = T.footer;
    var col = function (title, items, href) {
      return '<div class="foot__col"><h3 class="mono">' + title + "</h3><ul>" + items.map(function (s) {
        return '<li><a href="' + link(href) + '">' + esc(s) + "</a></li>";
      }).join("") + "</ul></div>";
    };
    return '<footer class="foot"><div class="wrap">' +
      '<div class="foot__grid">' +
      '<div class="foot__col foot__contact"><h3 class="mono">Contact</h3>' +
      '<p class="sel"><a href="mailto:' + M.email + '">' + M.email + "</a></p>" +
      '<p class="sel"><a href="' + M.phoneHref + '">' + M.phone + "</a></p>" +
      '<p class="sel" style="color:var(--muted);max-width:34ch">' + esc(M.address) + "</p></div>" +
      col("Services", F.services, "#services") + col("Work", F.work, "#work") +
      '<div class="foot__col"><h3 class="mono">Social</h3><ul><li><a href="' + M.linkedin + '" target="_blank" rel="noopener">LinkedIn</a></li><li><a href="' + M.instagram + '" target="_blank" rel="noopener">Instagram</a></li></ul></div>' +
      "</div>" +
      '<div class="foot__bar"><div class="foot__legal">' + F.legal.map(function (l) { return '<a href="#">' + esc(l) + "</a>"; }).join("") +
      "<span>" + esc(M.company) + "</span></div>" + themeSwitch() + "</div>" +
      '</div><div class="foot__mark" aria-hidden="true">' + WM + "</div></footer>";
  }

  /* ---------- home ---------- */
  function homeHTML() {
    var H = T.hero;
    var hero = '<section class="hero" id="top">' +
      '<canvas class="hero__grid" aria-hidden="true"></canvas><div class="hero__readout mono" aria-hidden="true">X 0000 · Y 0000</div>' +
      '<div class="wrap hero__inner">' +
      '<p class="hero__eyebrow mono"><span>[ toggle.solutions ]</span><span>Kuala Lumpur</span></p>' +
      '<h1 class="hero__title"><del class="hero__struck">' + esc(H.struck) + '<span class="hero__strike" aria-hidden="true"></span></del>' +
      '<span class="hero__main">' + words(H.title, 2) + "</span></h1>" +
      '<div class="hero__foot">' +
      '<p class="hero__body" data-hero>' + esc(H.body) + "</p>" +
      '<div class="hero__actions" data-hero><a class="btn" href="#contact">' + esc(H.cta) + " " + arrow + "</a>" +
      '<p class="hero__rating mono"><b>' + esc(H.rating) + "</b> · " + esc(H.ratingLabel) + "</p></div>" +
      '<ul class="spec mono" data-hero>' + H.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>" +
      "</div></div>" +
      '<p class="scroll-cue mono" aria-hidden="true">( Scroll )</p>' + // proposed copy
      "</section>";

    var founders = '<section class="founders"><div class="wrap">' +
      scanFigure(A + "/photos/founders.webp", "The six co-founders of Toggle Solutions", true) + // proposed copy (alt)
      '<div class="scan-meta mono"><span>[ Co-founders ]</span><span>Move across the photo to scan</span></div>' + // proposed copy
      "</div></section>";

    var half = Math.ceil(T.logos.length / 2);
    var row = function (list, rev) {
      var items = list.map(function (l) {
        return '<div class="marq__item"><img' + (l[2] ? ' class="logo-mp"' : "") + ' src="' + A + "/logos/" + l[0] + "-logo." + (l[2] || "webp") + '" alt="' + esc(l[1]) + ' logo" loading="lazy"></div>';
      }).join("");
      return '<div class="marq' + (rev ? " marq--rev" : "") + '"><div class="marq__track">' + items + '<div aria-hidden="true" style="display:contents">' + items.replace(/alt="[^"]*"/g, 'alt=""') + "</div></div></div>";
    };
    var logos = '<section class="logos" aria-label="' + esc(T.logosTitle) + '"><h2 class="logos__label mono">[ ' + esc(T.logosTitle) + " ]</h2>" +
      row(T.logos.slice(0, half)) + row(T.logos.slice(half), true) + "</section>";

    var tiles = T.services.map(function (s, i) {
      return '<button type="button" class="tile" data-i="' + i + '" aria-controls="svc-ro">' +
        '<span class="tile__top mono"><span>' + pad(i + 1) + "</span>" + (s.isNew ? '<span class="tile__new mono">New</span>' : "") + "</span>" +
        '<span class="tile__code">' + esc(s.code) + "</span>" +
        '<span class="tile__name">' + esc(s.name) + "</span>" +
        '<span class="tile__body">' + esc(s.body) + "</span></button>";
    }).join("");
    var services = '<section class="sec" id="services"><div class="wrap">' +
      head("[02] Services", T.servicesTitle, T.servicesBody) +
      '<div class="svc" data-reveal><div class="svc__grid">' + tiles +
      '<a class="tile tile--all" href="#services"><span class="tile__code">' + esc(T.servicesCta) + " " + arrow + "</span></a></div>" +
      '<aside class="svc__readout" id="svc-ro" aria-live="polite"><span class="trace" aria-hidden="true"><i></i><i></i><i></i><i></i></span>' +
      '<p class="ro__idx mono"></p><h3 class="ro__name"></h3><p class="ro__body"></p>' +
      '<div class="ro__bars" aria-hidden="true">' + T.services.map(function () { return "<i></i>"; }).join("") + "</div></aside>" +
      "</div></div></section>";

    var rows = T.work.map(function (w, i) {
      var m = w.metrics[0];
      return '<div class="row" data-img="' + A + "/work/" + w.img + '.webp">' +
        '<button type="button" class="row__btn" aria-expanded="false" aria-controls="wk-' + i + '">' +
        '<span class="c c--n mono">' + pad(i + 1) + "</span>" +
        '<span class="c c--case">' + esc(w.title) + "</span>" +
        '<span class="c c--client">' + esc(w.client) + "</span>" +
        '<span class="c c--ind mono">' + esc(w.industry) + "</span>" +
        '<span class="c c--svc mono">' + esc(w.service) + "</span>" +
        '<span class="c c--m">' + (m ? "<b>" + esc(m[0]) + '</b><small class="mono">' + esc(m[1]) + "</small>" : '<small class="mono muted">Brand campaign</small>') + "</span>" + // proposed copy: "Brand campaign"
        '<span class="c c--x mono" aria-hidden="true">+</span></button>' +
        '<div class="row__more" id="wk-' + i + '"><div class="row__inner">' +
        '<div class="row__media"><img src="' + A + "/work/" + w.img + '.webp" alt="Campaign creative for ' + esc(w.client) + '" loading="lazy"></div>' + // proposed copy (alt)
        '<p class="row__body">' + esc(w.body) + "</p>" +
        '<div class="row__side"><p class="row__meta mono">' + esc(w.location) + "</p>" +
        (w.metrics.length ? '<dl class="row__metrics">' + w.metrics.map(function (x) { return "<div><dt>" + esc(x[0]) + '</dt><dd class="mono">' + esc(x[1]) + "</dd></div>"; }).join("") + "</dl>" : "") +
        '<a class="lnk" href="#work">Read more ' + arrow + "</a></div>" +
        "</div></div></div>";
    }).join("");
    var work = '<section class="sec" id="work"><div class="wrap">' +
      head("[01] Our Work", T.workTitle, T.workBody) +
      '<div class="tbl" data-reveal><div class="tbl__head mono" aria-hidden="true"><span>No.</span><span>Case</span><span>Client</span><span>Industry</span><span>Service</span><span>Key metric</span><span></span></div>' + // proposed copy: column labels
      rows + "</div>" +
      '<div class="work-foot"><a class="lnk" href="#work">' + esc(T.workCta) + " " + arrow + "</a></div>" +
      '</div><div class="peek" aria-hidden="true"><img alt=""></div></section>';

    var cards = T.people.map(function (p, i) {
      var f = A + "/team/" + p.id + "-0.webp";
      return '<figure class="pcard" data-id="' + p.id + '" tabindex="0">' +
        '<div class="pcard__img"><img class="duo" src="' + f + '" alt="" loading="lazy" draggable="false">' +
        '<img class="tru" src="' + f + '" alt="Portrait of ' + esc(p.name) + '" loading="lazy" draggable="false">' + // proposed copy (alt)
        '<span class="pcard__rec mono">Rec</span></div>' + // proposed copy
        '<figcaption><span class="code mono">T-' + pad(i + 1) + "</span><b>" + esc(p.name) + '</b><span class="role mono">' + esc(p.role) + "</span></figcaption></figure>";
    }).join("");
    var team = '<section class="sec team" id="team"><div class="wrap">' +
      head("[ Team ]", T.teamTitle, T.teamBody, '<a class="lnk" href="about.html">' + esc(T.teamCta) + " " + arrow + "</a>") + // proposed copy: "[ Team ]"
      '<div class="team__top mono"><span>Hover a portrait to play the shoot</span><span>( Drag )</span></div></div>' + // proposed copy
      '<div class="strip" data-lenis-prevent-wheel>' + cards + "</div>" +
      '<div class="wrap">' + stats() + "</div></section>";

    var faq = '<section class="sec" id="faq"><div class="wrap faq">' +
      '<div class="faq__head" data-reveal><p class="sh__label mono">[ FAQ ]</p>' + // proposed copy
      '<h2 class="sh__title">' + esc(T.faqTitle) + "</h2><p>" + esc(T.faqBody) + ' <a class="lnk" href="#contact">' + esc(T.faqLink) + "</a></p></div>" +
      '<div class="faq__list" data-reveal>' + T.faq.map(function (f, i) {
        return '<div class="qa' + (i === 0 ? " open" : "") + '"><h3 style="margin:0"><button type="button" class="qa__q" aria-expanded="' + (i === 0) + '" aria-controls="qa-' + i + '">' +
          '<span class="qa__n mono">' + pad(i + 1) + '</span><span class="qa__t">' + esc(f.q) + '</span><span class="qa__ic mono" aria-hidden="true">' + (i === 0 ? "[−]" : "[+]") + "</span></button></h3>" +
          '<div class="qa__a" id="qa-' + i + '" role="region"><div class="qa__in">' + answer(f) + "</div></div></div>";
      }).join("") + "</div></div></section>";

    var blog = '<section class="sec" id="blog"><div class="wrap">' +
      head("[03] Blog", T.blogTitle, T.blogBody, '<a class="lnk" href="#blog">' + esc(T.blogCta) + " " + arrow + "</a>") +
      '<div class="posts" data-reveal>' + T.blog.map(function (b) {
        return '<a class="post" href="#blog"><span class="post__chip mono">' + esc(b.topic) + '</span><span class="post__read mono">' + esc(b.read) + "</span>" +
          "<h3>" + esc(b.title) + "</h3><p>" + esc(b.body) + "</p>" + arrow + "</a>";
      }).join("") + "</div></div></section>";

    return hero + founders + logos + services + work + team + faq + blog + cta();
  }

  function answer(f) {
    var out = "<p>" + esc(f.a) + "</p>";
    if (f.list) out += "<ul>" + f.list.map(function (x) {
      return "<li><span>" + (Array.isArray(x) ? "<strong>" + esc(x[0]) + ":</strong> " + esc(x[1]) : esc(x)) + "</span></li>";
    }).join("") + "</ul>";
    if (f.after) out += "<p>" + esc(f.after) + "</p>";
    return out;
  }

  /* ---------- about ---------- */
  function aboutHTML() {
    var AB = T.about;
    // proposed copy: spec-sheet labels; values are public facts from the live site.
    var spec = [["Founded", "2021"], ["Base", "Kuala Lumpur"], ["Markets", "Asia, US, Europe, Middle East"], ["Company No.", "202601012628"]];
    var hero = '<section class="ahero"><div class="wrap">' +
      '<p class="crumbs mono"><a href="index.html">' + esc(AB.crumbs[0]) + '</a><span aria-hidden="true">/</span><span>' + esc(AB.crumbs[1]) + "</span></p>" +
      '<div class="ahero__grid"><h1 class="ahero__title">' + words(AB.title, 3) + "</h1>" +
      '<p class="ahero__body" data-hero>' + esc(AB.body) + "</p>" +
      '<aside class="sheet" data-hero aria-label="Company facts"><p class="sheet__h mono"><span>[ Spec sheet ]</span><span>Rev. 2026</span></p><dl>' + // proposed copy
      spec.map(function (s) { return '<div><dt class="mono">' + s[0] + "</dt><dd>" + esc(s[1]) + "</dd></div>"; }).join("") + "</dl></aside>" +
      "</div></div></section>" +
      '<section class="founders"><div class="wrap">' + scanFigure(A + "/photos/team.webp", "The Toggle Solutions team in the studio", false) + // proposed copy (alt)
      '<div class="scan-meta mono"><span>[ The team ]</span><span>Move across the photo to scan</span></div>' + stats() + "</div></section>"; // proposed copy

    var values = '<section class="sec" id="values"><div class="wrap">' +
      head("[ Principles ]", AB.valuesTitle, AB.valuesBody) + // proposed copy: "[ Principles ]"
      '<div class="values"><div class="values__list">' + AB.values.map(function (v, i) {
        return '<button type="button" class="clause' + (i === 0 ? " is-active" : "") + '" data-i="' + i + '">' +
          '<span class="clause__n mono">§' + pad(i + 1) + "</span><h3>" + esc(v.name) + "</h3><p>" + esc(v.body) + "</p></button>";
      }).join("") + "</div>" +
      '<div class="values__frame" aria-hidden="true">' + AB.values.map(function (v, i) {
        var src = A + "/photos/" + v.photo + ".webp";
        return '<div class="vframe' + (i === 0 ? " is-active" : "") + '"><img class="duo" src="' + src + '" alt="" loading="lazy"><img class="tru" src="' + src + '" alt="" loading="lazy">' +
          '<span class="vframe__cap mono">§' + pad(i + 1) + " " + esc(v.name) + "</span></div>";
      }).join("") + "</div></div></div></section>";

    // proposed: new section built from FAQ answers 2 and 7 (approved copy), label is the FAQ question.
    var f2 = T.faq[1], f7 = T.faq[6];
    var steps = [["24 hours", f2.list[0], "Audit"], ["3–5 business days", f2.list[1], "Audit"]].concat(
      f7.list.map(function (x) { return [x[0], x[1], "Campaign"]; }));
    var timeline = '<section class="sec" id="timeline"><div class="wrap">' +
      head("[ Timeline ]", f7.q, f7.a) + // proposed copy: "[ Timeline ]"
      '<div class="track"><div class="track__line" aria-hidden="true"><span></span></div>' + steps.map(function (s, i) {
        return '<div class="step" data-reveal><span class="step__i mono">' + pad(i + 1) + " · <span class=\"step__phase\">" + s[2] + "</span></span>" + // proposed copy: phase labels
          '<p class="step__k">' + esc(s[0]) + "</p><p>" + esc(s[1]) + "</p></div>";
      }).join("") + "</div></div></section>";

    var f3 = T.faq[2];
    var three = '<section class="sec" id="team-of-three"><div class="wrap">' +
      head("[ Your team ]", f3.q, f3.a) + // proposed copy: "[ Your team ]"
      '<div class="three" data-reveal>' + f3.list.map(function (r, i) {
        return '<div class="role-card"><span class="role-card__n mono">' + pad(i + 1) + " / 03</span><h3>" + esc(r[0]) + "</h3><p>" + esc(r[1]) + "</p></div>";
      }).join("") + "</div>" +
      '<p class="three-after" data-reveal>' + esc(f3.after) + "</p></div></section>";

    var people = '<section class="sec" id="people"><div class="wrap">' +
      head("[ People ]", AB.peopleTitle, AB.peopleBody) + // proposed copy: "[ People ]"
      '<div class="dgrid">' + T.people.map(function (p, i) {
        var f = A + "/team/" + p.id + "-0.webp";
        return '<button type="button" class="dcard" data-i="' + i + '" data-reveal aria-haspopup="dialog">' +
          '<span class="dcard__img"><img class="duo" src="' + f + '" alt="" loading="lazy"><img class="tru" src="' + f + '" alt="" loading="lazy">' +
          '<span class="dcard__open mono">Open file</span></span>' + // proposed copy
          '<span class="dcard__cap"><span class="code mono">T-' + pad(i + 1) + "</span><b>" + esc(p.name) + '</b><span class="role mono">' + esc(p.role) + "</span></span></button>";
      }).join("") + "</div></div>" +
      '<dialog class="dlg" aria-labelledby="dlg-name"><div class="dlg__in">' +
      '<div class="dlg__photo"><img id="dlg-img" alt=""></div>' +
      '<div class="dlg__info"><button type="button" class="dlg__close mono">Close</button>' + // proposed copy
      '<p class="dlg__code mono" id="dlg-code"></p><h3 class="dlg__name" id="dlg-name"></h3><p class="dlg__role mono" id="dlg-role"></p>' +
      '<div class="scrub" id="dlg-scrub" tabindex="0" role="slider" aria-label="Photo frame" aria-valuemin="1" aria-valuemax="6" aria-valuenow="1"></div>' +
      '<p class="dlg__meta mono"><span>Drag across the strip to scrub through the shoot</span><span id="dlg-frame">Frame 01 / 06</span></p>' + // proposed copy
      "</div></div></dialog></section>";

    var f5 = T.faq[4];
    var pos = [[13, 18], [13, 50], [13, 82], [87, 18], [87, 50], [87, 82]];
    var system = '<section class="sec" id="system"><div class="wrap">' +
      head("[ System ]", f5.q, null) + // proposed copy: "[ System ]"
      '<p class="sys-intro" data-reveal>' + esc(f5.a) + "</p>" +
      '<div class="sys"><svg aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 100">' +
      pos.map(function (p) { return '<line class="draw" x1="50" y1="50" x2="' + p[0] + '" y2="' + p[1] + '" pathLength="1"/>'; }).join("") +
      pos.map(function (p) { return '<line class="flow" x1="50" y1="50" x2="' + p[0] + '" y2="' + p[1] + '"/>'; }).join("") +
      "</svg>" +
      '<div class="node node--core" style="left:50%;top:50%"><span class="node__i mono">Core</span><b>One strategy</b></div>' + // proposed copy: "Core"; "One strategy" is from the approved answer
      f5.list.map(function (n, i) {
        return '<div class="node" data-reveal style="left:' + pos[i][0] + "%;top:" + pos[i][1] + '%"><span class="node__i mono">' + pad(i + 1) + "</span><b>" + esc(n) + "</b></div>";
      }).join("") + "</div>" +
      '<p class="sys-after" data-reveal>' + esc(f5.after) + "</p></div></section>";

    var partners = '<section class="sec" id="partners"><div class="wrap">' +
      '<div class="partners"><div class="partners__copy" data-reveal><p class="sh__label mono">[ Partners ]</p>' + // proposed copy
      '<h2 class="sh__title">' + esc(AB.partnersTitle) + "</h2><p>" + esc(AB.partnersBody) + "</p>" +
      '<a class="lnk" href="#partners">' + esc(AB.partnersCta) + " " + arrow + "</a></div>" +
      '<div class="partners__logo" data-reveal><span class="mono">Partner</span><img src="' + A + '/logos/sama-logo.svg" alt="sama logo"></div></div>' + // proposed copy: "Partner"
      "</div></section>";

    var brands = '<section class="sec" id="brands" style="padding-top:0"><div class="wrap">' +
      head("[ Clients ]", AB.brandsTitle, AB.brandsBody) + // proposed copy
      '<div class="bgrid" data-reveal>' + AB.brands.map(function (id, i) {
        return '<div><span class="mono">' + pad(i + 1) + '</span><img' + (/\.svg$/.test(logoSrc(id)) ? ' class="logo-mp"' : "") + ' src="' + logoSrc(id) + '" alt="' + esc(logoName(id)) + ' logo" loading="lazy"></div>';
      }).join("") + "</div></div></section>";

    return hero + values + timeline + three + people + system + partners + brands + cta();
  }

  /* ---------- mount ---------- */
  document.body.insertAdjacentHTML("afterbegin", duoDefs + gridlines + nav() + '<main id="main">' + (isHome ? homeHTML() : aboutHTML()) + "</main>" + footer());

  /* ---------- behaviors ---------- */
  var lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    if (G && ST) {
      lenis.on("scroll", ST.update);
      G.ticker.add(function (t) { lenis.raf(t * 1000); });
      G.ticker.lagSmoothing(0);
    } else {
      var loop = function (t) { lenis.raf(t); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    }
  }
  function scrollToHash(hash) {
    var el = hash === "#top" ? document.body : $(hash);
    if (!el) return false;
    if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    return true;
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var h = a.getAttribute("href");
    if (h.length > 1 && scrollToHash(h)) { e.preventDefault(); closeMenu(); }
  });

  // Theme switches
  function syncSwitches() {
    var dark = TGx.theme.current() === "dark";
    $$(".tswitch").forEach(function (b) {
      b.setAttribute("aria-checked", String(dark));
      $(".tswitch__label", b).textContent = dark ? "Dark mode" : "Light mode";
    });
  }
  $$(".tswitch").forEach(function (b) { b.addEventListener("click", function () { TGx.theme.toggle(b); }); });
  document.addEventListener("themechange", syncSwitches);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () { syncSwitches(); document.dispatchEvent(new CustomEvent("themechange")); });
  syncSwitches();

  // Nav: solid after scroll, hides on scroll down
  var navEl = $("#nav"), lastY = 0;
  function onScroll() {
    var y = window.scrollY;
    navEl.classList.toggle("is-solid", y > 40);
    navEl.classList.toggle("is-hidden", y > 400 && y > lastY + 4 && !menuOpen);
    if (y < lastY - 4 || y < 400) navEl.classList.remove("is-hidden");
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var menu = $("#menu"), menuBtn = $(".nav__menu"), menuOpen = false;
  function openMenu() {
    menu.hidden = false; menuOpen = true; menuBtn.setAttribute("aria-expanded", "true");
    if (lenis) lenis.stop();
    if (G && !reduced) G.from($$("nav a", menu), { yPercent: 60, autoAlpha: 0, stagger: 0.05, duration: 0.6, ease: "power3.out", clearProps: "all" });
    $(".menu__close", menu).focus();
  }
  function closeMenu() {
    if (!menuOpen) return;
    menu.hidden = true; menuOpen = false; menuBtn.setAttribute("aria-expanded", "false");
    if (lenis) lenis.start();
    menuBtn.focus({ preventScroll: true });
  }
  menuBtn.addEventListener("click", openMenu);
  $(".menu__close", menu).addEventListener("click", closeMenu);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* Hero blueprint canvas */
  function heroGrid() {
    var cv = $(".hero__grid"); if (!cv) return;
    var hero = $(".hero"), ro = $(".hero__readout"), ctx = cv.getContext("2d");
    var w = 0, h = 0, mx = -1, my = -1, raf = 0, C = {};
    function cols() {
      var cs = getComputedStyle(document.documentElement);
      C = { line: cs.getPropertyValue("--line").trim(), major: cs.getPropertyValue("--line-strong").trim(), acc: cs.getPropertyValue("--accent").trim(), sig: cs.getPropertyValue("--signal").trim() };
    }
    function size() {
      var r = cv.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height; cv.width = Math.round(w * d); cv.height = Math.round(h * d);
      ctx.setTransform(d, 0, 0, d, 0, 0); draw();
    }
    function draw() {
      raf = 0; ctx.clearRect(0, 0, w, h);
      var s = w < 700 ? 32 : 48, i, x, y;
      ctx.lineWidth = 1;
      for (x = 0.5, i = 0; x < w; x += s, i++) { ctx.strokeStyle = i % 4 ? C.line : C.major; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (y = 0.5, i = 0; y < h; y += s, i++) { ctx.strokeStyle = i % 4 ? C.line : C.major; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      if (mx >= 0) {
        var sx = Math.round(mx / s) * s + 0.5, sy = Math.round(my / s) * s + 0.5;
        ctx.strokeStyle = C.acc; ctx.globalAlpha = 0.5;
        ctx.beginPath(); ctx.moveTo(mx, 0); ctx.lineTo(mx, h); ctx.moveTo(0, my); ctx.lineTo(w, my); ctx.stroke();
        ctx.globalAlpha = 1; ctx.strokeStyle = C.sig;
        ctx.strokeRect(sx - s, sy - s, s * 2, s * 2);
        ctx.fillStyle = C.acc; ctx.fillRect(mx - 3, my - 3, 6, 6);
      }
    }
    cols(); size();
    window.addEventListener("resize", size);
    document.addEventListener("themechange", function () { requestAnimationFrame(function () { cols(); draw(); }); });
    if (!canHover) return;
    hero.addEventListener("pointermove", function (e) {
      var r = cv.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
      ro.textContent = "X " + String(Math.round(mx)).padStart(4, "0") + " · Y " + String(Math.round(my)).padStart(4, "0");
      ro.style.transform = "translate(" + (mx + 16) + "px," + (my + 16) + "px)";
      ro.classList.add("on");
      if (!raf) raf = requestAnimationFrame(draw);
    });
    hero.addEventListener("pointerleave", function () { mx = -1; ro.classList.remove("on"); if (!raf) raf = requestAnimationFrame(draw); });
  }

  /* Duotone scanner */
  function scanners() {
    $$(".scan").forEach(function (fig) {
      var tru = $(".scan__true", fig), band = $(".scan__band", fig), tag = $(".scan__tag", fig);
      var tags = fig.hasAttribute("data-tags"), st = { x: 0.5 }, last = null, sweepT = null, resumeT = 0;
      var bw = function () { return window.innerWidth < 760 ? 0.3 : 0.18; };
      function apply() {
        var half = (bw() / 2) * 100, c = st.x * 100;
        tru.style.clipPath = "inset(0 " + Math.max(0, 100 - (c + half)) + "% 0 " + Math.max(0, c - half) + "%)";
        band.style.left = c + "%"; band.style.width = bw() * 100 + "%";
        if (!tags) return;
        var best = null, d = 1;
        T.foundersPhoto.forEach(function (f) { var dd = Math.abs(f.x - st.x); if (dd < d) { d = dd; best = f; } });
        if (best && d < 0.07) {
          if (last !== best.id) {
            var p = T.people.find(function (x) { return x.id === best.id; });
            tag.innerHTML = "<b>" + esc(p.name) + "</b><span>" + esc(p.role) + "</span>";
            last = best.id;
          }
          tag.classList.add("on");
        } else { tag.classList.remove("on"); last = null; }
      }
      apply();
      var setX = G ? G.quickTo(st, "x", { duration: reduced ? 0.01 : 0.7, ease: "power3", onUpdate: apply }) : function (v) { st.x = v; apply(); };
      var rel = function (e) { var r = fig.getBoundingClientRect(); return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)); };
      fig.addEventListener("pointermove", function (e) { if (e.pointerType === "mouse") setX(rel(e)); });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); setX(Math.min(1, Math.max(0, st.x + (e.key === "ArrowRight" ? 0.05 : -0.05)))); }
      });
      if (!canHover && G && !reduced) {
        var sweep = function (to) { sweepT = G.to(st, { x: to, duration: 5.5, ease: "sine.inOut", onUpdate: apply, onComplete: function () { sweep(to > 0.5 ? 0.08 : 0.92); } }); };
        ST.create({ trigger: fig, start: "top bottom", once: true, onEnter: function () { sweep(0.92); } });
        fig.addEventListener("click", function (e) {
          if (sweepT) sweepT.kill();
          clearTimeout(resumeT);
          G.to(st, { x: rel(e), duration: 0.6, ease: "power3", onUpdate: apply });
          resumeT = setTimeout(function () { sweep(st.x > 0.5 ? 0.08 : 0.92); }, 4000);
        });
      }
      window.addEventListener("resize", apply);
    });
  }

  /* Services readout */
  function services() {
    var tiles = $$(".tile[data-i]"); if (!tiles.length) return;
    var ro = $(".svc__readout"), bars = $$(".ro__bars i"), traceTl = null, cur = -1;
    function set(i) {
      if (i === cur) return; cur = i;
      var s = T.services[i];
      tiles.forEach(function (t) { t.classList.toggle("is-active", +t.dataset.i === i); });
      bars.forEach(function (b, k) { b.classList.toggle("on", k === i); });
      $(".ro__idx", ro).textContent = "[ " + pad(i + 1) + " / " + pad(T.services.length) + " ] · " + s.code + (s.isNew ? " · New" : "");
      $(".ro__name", ro).textContent = s.name;
      $(".ro__body", ro).textContent = s.body;
      if (G && !reduced) {
        if (traceTl) traceTl.kill();
        var tr = $$(".trace i", ro);
        traceTl = G.timeline({ defaults: { duration: 0.16, ease: "none" } })
          .fromTo(tr[0], { scaleX: 0 }, { scaleX: 1 }).fromTo(tr[1], { scaleY: 0 }, { scaleY: 1 })
          .fromTo(tr[2], { scaleX: 0 }, { scaleX: 1 }).fromTo(tr[3], { scaleY: 0 }, { scaleY: 1 });
        G.fromTo([$(".ro__name", ro), $(".ro__body", ro)], { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06, ease: "power3.out", overwrite: true });
      }
    }
    tiles.forEach(function (t) {
      var i = +t.dataset.i;
      t.addEventListener("mouseenter", function () { if (desktop()) set(i); });
      t.addEventListener("focus", function () { if (desktop()) set(i); });
      t.addEventListener("click", function () {
        if (desktop()) { set(i); return; }
        var open = !t.classList.contains("open");
        t.classList.toggle("open", open); t.setAttribute("aria-expanded", String(open));
        setTimeout(function () { if (ST) ST.refresh(); }, 520);
      });
    });
    set(0);
  }

  /* Work table */
  function work() {
    var rows = $$(".row"); if (!rows.length) return;
    var peek = $(".peek"), pimg = $("img", peek), qx = null, qy = null;
    if (G && canHover) { G.set(peek, { xPercent: 18, yPercent: -50 }); qx = G.quickTo(peek, "x", { duration: 0.55, ease: "power3" }); qy = G.quickTo(peek, "y", { duration: 0.55, ease: "power3" }); }
    rows.forEach(function (r) {
      var b = $(".row__btn", r);
      b.addEventListener("click", function () {
        var open = r.classList.toggle("open");
        b.setAttribute("aria-expanded", String(open));
        if (open) peek.classList.remove("on");
        setTimeout(function () { if (ST) ST.refresh(); }, 650);
      });
      if (!qx) return;
      r.addEventListener("mouseenter", function (e) {
        if (r.classList.contains("open")) return;
        pimg.src = r.dataset.img; qx(e.clientX); qy(e.clientY); peek.classList.add("on");
      });
      r.addEventListener("mouseleave", function () { peek.classList.remove("on"); });
      r.addEventListener("mousemove", function (e) { qx(e.clientX); qy(e.clientY); if (r.classList.contains("open")) peek.classList.remove("on"); });
    });
  }

  /* Flipbook portraits */
  function flipbook(card, getId, imgs) {
    var timer = null, i = 0;
    function start() {
      var fr = TGx.frames(getId());
      TGx.preload(fr);
      card.classList.add("is-on");
      if (reduced || timer) return;
      timer = setInterval(function () { i = (i + 1) % fr.length; imgs.forEach(function (im) { im.src = fr[i]; }); }, 143);
    }
    function stop() {
      clearInterval(timer); timer = null; i = 0;
      card.classList.remove("is-on");
      var f0 = TGx.frames(getId())[0];
      imgs.forEach(function (im) { im.src = f0; });
    }
    card.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") start(); });
    card.addEventListener("pointerleave", stop);
    card.addEventListener("focus", start);
    card.addEventListener("blur", stop);
    return { start: start, stop: stop };
  }

  function team() {
    var strip = $(".strip"); if (!strip) return;
    $$(".pcard", strip).forEach(function (c) {
      var fb = flipbook(c, function () { return c.dataset.id; }, $$("img", c));
      if (!canHover) c.addEventListener("click", function () { c.classList.contains("is-on") ? fb.stop() : fb.start(); });
    });
    // Mouse drag to scroll
    var down = false, sx = 0, sl = 0, moved = 0;
    strip.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") return; down = true; sx = e.clientX; sl = strip.scrollLeft; moved = 0; });
    window.addEventListener("pointermove", function (e) {
      if (!down) return; var dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx));
      if (moved > 4) strip.classList.add("dragging");
      strip.scrollLeft = sl - dx;
    });
    window.addEventListener("pointerup", function () { down = false; strip.classList.remove("dragging"); });
  }

  /* FAQ */
  function faq() {
    $$(".qa").forEach(function (q) {
      var b = $(".qa__q", q);
      b.addEventListener("click", function () {
        var open = q.classList.toggle("open");
        b.setAttribute("aria-expanded", String(open));
        $(".qa__ic", q).textContent = open ? "[−]" : "[+]";
        setTimeout(function () { if (ST) ST.refresh(); }, 600);
      });
    });
  }

  /* Tear-off ticket */
  function tickets() {
    $$(".ticket").forEach(function (tk) {
      var stub = $(".ticket__stub", tk), torn = false, drag = false, sx = 0, sy = 0, d = 0;
      function tear() {
        if (torn) return; torn = true; tk.classList.add("torn");
        if (G && !reduced) G.to(stub, { x: 70, y: 260, rotation: 28, autoAlpha: 0, duration: 0.95, ease: "power2.in" });
        else stub.style.visibility = "hidden";
        setTimeout(function () { var a = $(".ticket__reveal a", tk); if (a) a.focus({ preventScroll: true }); }, 400);
      }
      stub.addEventListener("pointerdown", function (e) { if (torn) return; drag = true; d = 0; sx = e.clientX; sy = e.clientY; stub.setPointerCapture(e.pointerId); });
      stub.addEventListener("pointermove", function (e) {
        if (!drag) return;
        d = Math.max(0, Math.max(e.clientX - sx, e.clientY - sy));
        if (G) G.set(stub, { x: d * 0.45, rotation: d / 7 });
        if (d > 110) { drag = false; tear(); }
      });
      var end = function () {
        if (!drag) return; drag = false;
        if (d < 5) { tear(); return; }
        if (!torn && G) G.to(stub, { x: 0, rotation: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
      };
      stub.addEventListener("pointerup", end);
      stub.addEventListener("pointercancel", end);
      stub.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tear(); } });
    });
  }

  /* About: values */
  function values() {
    var cl = $$(".clause"); if (!cl.length) return;
    var fr = $$(".vframe");
    function set(i) {
      cl.forEach(function (c, k) { c.classList.toggle("is-active", k === i); });
      fr.forEach(function (f, k) { f.classList.toggle("is-active", k === i); });
    }
    cl.forEach(function (c, i) {
      c.addEventListener("mouseenter", function () { set(i); });
      c.addEventListener("focus", function () { set(i); });
      c.addEventListener("click", function () { set(i); });
      if (ST && !canHover) ST.create({ trigger: c, start: "top 60%", end: "bottom 60%", onToggle: function (s) { if (s.isActive) set(i); } });
    });
  }

  /* About: dossier dialog with scrub strip */
  function dossier() {
    var dlg = $(".dlg"); if (!dlg) return;
    var img = $("#dlg-img"), scrub = $("#dlg-scrub"), opener = null, person = null, frame = 0, frames = [];
    function show(i) {
      frame = Math.max(0, Math.min(frames.length - 1, i));
      img.src = frames[frame];
      $$("img", scrub).forEach(function (t, k) { t.classList.toggle("on", k === frame); });
      var head = $(".scrub__head", scrub);
      head.style.left = "calc(" + frame + " * ((100% - 20px) / 6 + 4px))";
      scrub.setAttribute("aria-valuenow", String(frame + 1));
      $("#dlg-frame").textContent = "Frame " + pad(frame + 1) + " / " + pad(frames.length); // proposed copy
    }
    function open(i, btn) {
      person = T.people[i]; opener = btn; frames = TGx.frames(person.id); TGx.preload(frames);
      $("#dlg-code").textContent = "T-" + pad(i + 1) + " · Personnel file"; // proposed copy
      $("#dlg-name").textContent = person.name;
      $("#dlg-role").textContent = person.role;
      img.alt = "Portrait of " + person.name; // proposed copy (alt)
      scrub.innerHTML = frames.map(function (f) { return '<img src="' + f + '" alt="">'; }).join("") + '<span class="scrub__head" aria-hidden="true"></span>';
      show(0);
      if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
      if (lenis) lenis.stop();
      if (G && !reduced) G.from($(".dlg__in", dlg), { y: 30, autoAlpha: 0, duration: 0.5, ease: "power3.out", clearProps: "all" });
      $(".dlg__close", dlg).focus();
    }
    function close() { if (dlg.open) dlg.close(); }
    dlg.addEventListener("close", function () { if (lenis) lenis.start(); if (opener) opener.focus({ preventScroll: true }); });
    $(".dlg__close", dlg).addEventListener("click", close);
    dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });
    $$(".dcard").forEach(function (b) { b.addEventListener("click", function () { open(+b.dataset.i, b); }); });
    var down = false;
    var at = function (e) { var r = scrub.getBoundingClientRect(); return Math.floor(Math.min(0.999, Math.max(0, (e.clientX - r.left) / r.width)) * frames.length); };
    scrub.addEventListener("pointerdown", function (e) { down = true; scrub.setPointerCapture(e.pointerId); show(at(e)); });
    scrub.addEventListener("pointermove", function (e) { if (down || e.pointerType === "mouse") show(at(e)); });
    scrub.addEventListener("pointerup", function () { down = false; });
    scrub.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); show(frame + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); show(frame - 1); }
    });
  }

  /* ---------- motion ---------- */
  function intro() {
    if (!G || reduced) return;
    var tl = G.timeline({ defaults: { ease: "power4.out" } });
    if (isHome) {
      tl.from(".hero__eyebrow", { autoAlpha: 0, y: 12, duration: 0.6, clearProps: "all" })
        .from(".hero__struck", { autoAlpha: 0, y: 20, duration: 0.7, clearProps: "all" }, "<0.1")
        .from(".hero__strike", { scaleX: 0, duration: 0.8, ease: "power2.inOut", clearProps: "transform" }, ">-0.1")
        .from(".hero__main .w > span", { yPercent: 110, duration: 1.05, stagger: 0.08, clearProps: "transform" }, "<0.35")
        .from("[data-hero]", { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.1, clearProps: "all" }, "<0.5");
    } else {
      tl.from(".crumbs", { autoAlpha: 0, y: 12, duration: 0.5, clearProps: "all" })
        .from(".ahero__title .w > span", { yPercent: 110, duration: 1, stagger: 0.06, clearProps: "transform" }, "<0.1")
        .from("[data-hero]", { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.1, clearProps: "all" }, "<0.5");
    }
  }

  function scrollMotion() {
    if (!G || !ST || reduced) return;
    $$("[data-reveal]").forEach(function (el) {
      G.from(el, { y: 40, autoAlpha: 0, duration: 1, ease: "power3.out", clearProps: "transform,opacity,visibility", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
    $$(".sh__rule").forEach(function (el) {
      G.from(el, { scaleX: 0, duration: 1.2, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
    });
    $$(".stats").forEach(function (s) {
      G.from($$(".stat__n > span", s), { yPercent: 105, duration: 1, stagger: 0.09, ease: "power4.out", clearProps: "transform", scrollTrigger: { trigger: s, start: "top 88%", once: true } });
    });
    $$(".scan").forEach(function (f) {
      G.from(f, { clipPath: "inset(12% 6% 12% 6%)", duration: 1.4, ease: "power3.out", clearProps: "clipPath", scrollTrigger: { trigger: f, start: "top 85%", once: true } });
    });
    var track = $(".track");
    if (track) G.fromTo(track, { "--p": 0 }, { "--p": 1, ease: "none", scrollTrigger: { trigger: track, start: "top 75%", end: "bottom 60%", scrub: 0.6 } });
    var sys = $(".sys svg");
    if (sys && desktop()) G.fromTo($$("line.draw", sys), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.1, ease: "power2.inOut", scrollTrigger: { trigger: ".sys", start: "top 75%", once: true } });
    $$(".pcard").forEach(function (c, i) {
      G.from(c, { y: 50, autoAlpha: 0, duration: 0.9, delay: i * 0.06, ease: "power3.out", clearProps: "transform,opacity,visibility", scrollTrigger: { trigger: ".strip", start: "top 88%", once: true } });
    });
  }

  function preloader(done) {
    var seen = false;
    try { seen = sessionStorage.getItem("tg-b-pre") === "1"; } catch (e) {}
    if (reduced || seen || !G) { done(); return; }
    try { sessionStorage.setItem("tg-b-pre", "1"); } catch (e) {}
    var el = document.createElement("div");
    el.className = "pre"; el.setAttribute("aria-hidden", "true");
    el.innerHTML = '<div class="pre__in"><p class="mono pre__label">[ toggle ]</p>' +
      '<svg class="pre__graph" viewBox="0 0 300 64" preserveAspectRatio="none"><path class="pre__base" d="M0 63.5 H300"/>' +
      '<path class="pre__line" d="M0 58 L38 54 L72 56 L110 42 L146 45 L184 30 L220 26 L258 14 L300 4" pathLength="1"/></svg>' +
      '<p class="mono pre__count">000</p></div>';
    document.body.appendChild(el);
    if (lenis) lenis.stop();
    var c = { v: 0 }, out = $(".pre__count", el);
    G.timeline({ onComplete: function () { el.remove(); if (lenis) lenis.start(); } })
      .to(c, { v: 100, duration: 1.0, ease: "power2.inOut", onUpdate: function () { out.textContent = String(Math.round(c.v)).padStart(3, "0"); } })
      .to($(".pre__line", el), { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" }, 0)
      .to(el, { yPercent: -100, duration: 0.7, ease: "power4.inOut", onStart: done }, "+=0.1");
  }

  heroGrid(); scanners(); services(); work(); team(); faq(); tickets(); values(); dossier();
  preloader(intro);
  scrollMotion();
  window.addEventListener("load", function () { if (ST) ST.refresh(); });
  if (location.hash && location.hash.length > 1) setTimeout(function () { scrollToHash(location.hash); }, 300);
})();
