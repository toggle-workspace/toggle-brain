/*
  Toggle Solutions website copy, single source for both concepts.

  Every string here is the APPROVED copy lifted from the live site
  (toggle.solutions, home + /about + /work/*, pulled 2026-10-17).
  Only three spelling fixes were made: "anually" -> "annually",
  "timeas" -> "time as", "Management(CRM)" -> "Management (CRM)".
  The em dashes in three case blurbs are kept verbatim; they break
  brain/voice/writing-standards.md, so swap them before launch.

  Anything a concept adds that is NOT on the live site is marked
  `proposed: true` so it can be reviewed before it ships.
*/
window.TOGGLE = {
  meta: {
    name: "Toggle Solutions",
    email: "hello@toggle.solutions",
    phone: "+60 12-579 9984",
    phoneHref: "tel:+60125799984",
    address: "1st Floor, No. 22, Lorong Datuk Sulaiman 1, Taman Tun Dr Ismail, 60000 Kuala Lumpur",
    company: "© 2026 Toggle Solutions. All Rights Reserved · (Company No. 202601012628 / 1674726-H)",
    linkedin: "https://www.linkedin.com/company/toggle-solutions",
    instagram: "https://www.instagram.com/toggle.solutions/",
  },

  nav: [
    { label: "Our Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Blog", href: "#blog" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    struck: "Your Marketing Agency",
    title: "Your Digital Growth Partner",
    body: "A strategic growth partner for ambitious brands. We combine high-end design with data-driven performance to build systems that scale effortlessly.",
    cta: "Book a Consultation",
    rating: "4.9/5",
    ratingLabel: "Trusted by 50+ clients",
    points: [
      "Full-stack digital marketing built for sustainable growth",
      "A structured approach that reduces guesswork",
      "Transparent reporting that supports better decisions",
    ],
  },

  logosTitle: "Your favorite companies are our partners.",
  logos: [
    ["bruno", "Bruno"], ["cimbbank", "CIMB Bank"], ["clarins", "Clarins"], ["cni", "CNI"],
    ["esp", "ESP"], ["greateastern", "Great Eastern"], ["gurulabs", "GuruLabs"],
    ["kithandkin", "Kith & Kin"], ["kualesa", "Kualesa"], ["leica", "Leica"], ["maxis", "Maxis"],
    ["nihon", "Nihon"], ["puteri", "Puteri"], ["secom", "Secom"], ["singlife", "Singlife"],
    ["supermamalab", "SuperMamaLab"], ["thompson", "Thomson Medical"], ["toyota", "Toyota"],
    ["unabrands", "Una Brands"], ["unitar", "Unitar"], ["petsmore", "PetsMore"], ["hwc", "HWC"],
    ["media_prima", "Media Prima", "svg"],
  ],

  servicesTitle: "Full Stack Digital Solutions",
  servicesBody: "From brand awareness to final scale, we cover it all.",
  servicesCta: "Explore all services",
  services: [
    { code: "PM", name: "Performance Marketing", body: "Drive growth with campaign optimization and performance creative, using audience and conversion data to guide what we produce and scale." },
    { code: "SEO", name: "Search Engine Optimisation", body: "Build organic visibility through technical SEO, keyword strategy, and content optimization that shows up in search results, AI answers, and featured snippets." },
    { code: "GEO", name: "Generative Engine Optimisation (GEO)", isNew: true, body: "Get found and cited in AI answers, not just search results. Buyers ask ChatGPT, Perplexity, Gemini and Google AI Overviews before they click a website. We make your brand the source those answers pull from, quote, and recommend." },
    { code: "WEB", name: "Web Development", body: "Design and develop high-performing websites and landing pages built for speed, clarity, and conversions." },
    { code: "R&A", name: "Reporting & Analysis", body: "Build a reporting cadence that tracks what matters and highlights what to improve next, not just what happened." },
    { code: "CM", name: "Content Marketing", body: "Create a content system that builds awareness, drives qualified traffic, and supports conversion across channels." },
    { code: "EM", name: "Email Marketing", body: "Set up automated journeys, newsletters, and segmentation that grow LTV and reduce churn over time." },
    { code: "BR", name: "Branding", body: "Define your message and visual direction, then apply it consistently so your brand stands out in competitive markets." },
    { code: "CP", name: "Creative Production", body: "Produce scroll-stopping creative assets: video, photography, design, and copy optimized for performance marketing and built to convert." },
    { code: "CRO", name: "Conversion Optimisation", body: "Run structured testing programmes to improve messaging, user journeys, and conversion rates - turning more traffic into revenue." },
    { code: "OOH", name: "Out of Home", body: "Build mass awareness with strategically placed billboards, transit, and digital out-of-home campaigns integrated with your digital strategy." },
    { code: "OSM", name: "Online Store Management", body: "Manage and optimize your online store from product listings and pricing to promotions and checkout making sure every part converts." },
    { code: "CRM", name: "Customer Relationship Management (CRM)", body: "Build automated retention systems - segmentation, lifecycle flows, and loyalty strategies - that grow LTV without increasing acquisition costs." },
  ],

  workTitle: "Real Brands. Real Revenue",
  workBody: "Join the 50+ ambitious companies that trust Toggle to scale their growth.",
  workCta: "View all work",
  // Metrics are the "01 . Metrics" values published on each /work/<slug> page.
  work: [
    { slug: "cimb", img: "cimb-ads-1", title: "From Authority Gap to Search Dominance", client: "CIMB Bank Berhad", industry: "Financial Services", service: "Search Engine Optimisation", location: "Kuala Lumpur, Malaysia",
      body: "One of the region's largest banks, quietly losing ground in search to leaner, faster competitors. We built the content system that took it back.",
      metrics: [["52.6%", "Increase in Organic impressions"], ["34.5%", "Growth in organic clicks"]] },
    { slug: "unitar", img: "unitar-ads-1", title: "From Moonshot to Milestone", client: "UNITAR Education Sdn. Bhd.", industry: "Education", service: "Performance Marketing", location: "Petaling Jaya, Malaysia",
      body: "A leading Malaysian private university drowning in acquisition costs with no ceiling in sight. We rebuilt the engine — and the results rewrote what their team thought was possible.",
      metrics: [["32K+", "Leads from Ads"], ["77%", "Total Impressions"]] },
    { slug: "singlife", img: "singlife-ads-1", title: "From Third to First in 90 Days", client: "Singlife PTE LTD", industry: "Financial Services", service: "Search Engine Optimisation", location: "Singapore",
      body: "A digital-first insurer sitting one position away from dominance in a fiercely contested market. Three months later, they weren't chasing the top spot anymore.",
      metrics: [["23%", "Increase in Organic Click"]] },
    { slug: "kualesa", img: "kualesa-ads-1", title: "Stitching a Movement", client: "Kualesa Apparel Sdn Bhd.", industry: "Apparel", service: "Performance Marketing", location: "Petaling Jaya, Malaysia",
      body: "A Malaysian eco-fashion brand trying to make sustainability feel like a statement, not a sacrifice. What we built together went far beyond a campaign.",
      metrics: [] },
    { slug: "greateastern", img: "great-eastern-ads-1", title: "Two Months to the top", client: "Great Eastern Holdings LTD", industry: "Life Insurance", service: "Search Engine Optimisation", location: "Singapore",
      body: "A household insurance brand with strong recognition but rankings that didn't reflect it. A focused two-month push changed that completely.",
      metrics: [["75%", "Increase in search visibility"], ["16%", "Increase in Organic Click"]] },
    { slug: "kith-and-kin", img: "kith-and-kin-ads-1", title: "Unlocking New Growth Channels", client: "Kith & Kin Realty Sdn. Bhd.", industry: "Real Estate", service: "Performance Marketing", location: "Kuala Lumpur, Malaysia",
      body: "A real estate agency that had never run a paid ad in their life, relying entirely on organic methods and cold calls. We changed that — and the pipeline has never looked the same since.",
      metrics: [["392%", "Increase in Lead Volume"], ["47%", "Cost Per Lead"]] },
  ],

  teamTitle: "One senior team, every channel",
  teamBody: "You work directly with the operators who own both the strategy and the doing. Fewer handoffs, faster decisions, one team accountable for your growth.",
  teamCta: "See Who You'll Work With",
  // frames: 6 stills per person from the Oct 2026 founders shoot (assets/team/<id>-0..5.webp)
  people: [
    { id: "marcus", name: "Marcus", role: "Co-Founder & CEO" },
    { id: "viknesh", name: "Viknesh", role: "Co-Founder & CFO" },
    { id: "jordan", name: "Jordan", role: "Co-Founder & Director of performance" },
    { id: "zaid", name: "Zaid", role: "Co-Founder & Director of Innovation" },
    { id: "shaun", name: "Shaun", role: "Co-Founder & Head of Performance" },
    { id: "aizad", name: "Aizad", role: "Co-Founder & Head of Engineering" },
    { id: "julian", name: "Julian", role: "Director of Organic Growth Specialist" },
    { id: "kinxian", name: "Kin Xian", role: "Project Manager" },
  ],
  // Left-to-right order of the six co-founders in assets/photos/founders.webp (shoot frame 3).
  // x = horizontal center of each face as a fraction of image width. Verify before launch.
  foundersPhoto: [
    { id: "shaun", x: 0.145, y: 0.47 }, { id: "zaid", x: 0.305, y: 0.47 }, { id: "marcus", x: 0.46, y: 0.47 },
    { id: "viknesh", x: 0.605, y: 0.48 }, { id: "jordan", x: 0.765, y: 0.49 }, { id: "aizad", x: 0.95, y: 0.36 },
  ],

  stats: [
    ["60+", "Brands grown worldwide"],
    ["$60M+", "Ad budget managed annually"],
    ["4.9/5", "Average client rating"],
    ["4+", "Years of growth partnerships"],
  ],

  faqTitle: "Frequently Asked Questions",
  faqBody: "Everything you need to know about our process, pricing, and how we help ambitious brands scale. Can't find the answer you're looking for?",
  faqLink: "Chat to our team.",
  faq: [
    { q: "What do I get in the Free Brand Audit?",
      a: "Our Free Brand Audit is a comprehensive review of your current marketing channels, funnel performance and growth opportunities. You'll receive a detailed roadmap including:",
      list: ["3-5 prioritized growth levers", "Identification of quick wins to boost conversion rates.", "Recommended next steps to improve results."] },
    { q: "How long does it take to receive the audit?",
      a: "We value speed without compromising quality. Typically, we will:",
      list: ["Respond to your initial request within 24 hours.", "Deliver the completed audit within 3–5 business days, depending on the complexity of your current setup and data availability."] },
    { q: "Who will I work with?",
      a: "You won't be handed off to a junior team. Every client gets a dedicated team of three fully dedicated:",
      list: [["Senior Account Manager", "Your strategic partner and main point of contact."], ["Senior Performance Marketer", "An expert in media buying and campaign optimization."], ["Backup Performance Marketing Specialist", "Ensures backup coverage and support for execution."]],
      after: "No unnecessary layers, just experienced people who are fully accountable for your results." },
    { q: "What type of brands are you the best fit for?",
      a: "We've consulted and helped clients across all verticals including:",
      list: ["Education & EdTech", "Healthcare", "Technology", "Professional services", "Food & Beverage", "FMCG", "E-commerce", "Lifestyle Brands"],
      after: "Along with many others, If you're a brand that's serious about growth, we're built to work with you regardless of industry." },
    { q: "Do you do performance marketing only?",
      a: "Performance marketing is one part of what we do but sustainable growth requires more than ads. We build growth systems that span:",
      list: ["Paid Media", "Creative Strategy", "SEO & CRO", "Content, Email and Lifecycle Marketing", "CRM and sales integration", "AI-powered automation"],
      after: "All working together under one strategy. We focus on the entire funnel, not isolated campaigns." },
    { q: "What does pricing look like?",
      a: "Pricing is catered to your scope and budget. Engagements are typically structured as a monthly retainer that covers the services most relevant to your growth stage whether that's campaign management, creative production, CRO, SEO, or a combination. We'll outline a clear proposal after understanding your goals." },
    { q: "What results can I expect and how fast?",
      a: "While every business is unique, our framework is designed for rapid impact:",
      list: [["Day 1", "Leads and sales can start coming in immediately upon campaign launch."], ["Weeks 2-4", "Early performance improvements often become visible as campaigns go live and initial data comes in."], ["Days 60-90", "More meaningful, compounding growth typically builds over time as we test, optimise and scale what's working."]] },
    { q: "Do you require long-term contracts?",
      a: "We focus on long-term partnerships but avoid restrictive contracts. Most engagements operate on flexible monthly agreements based on performance and results." },
  ],

  blogTitle: "Latest from the Blog",
  blogBody: "Insights on SEO, paid media, and digital strategy from the Toggle Solutions team.",
  blogCta: "View all posts",
  blog: [
    { read: "15 min read", topic: "CRO", title: "Your Ads Aren't the Problem, Your Landing Page Is: A CRO Guide for Paid Traffic",
      body: "Strong click-through rates but weak lead volume? The problem is often the page, not the ads. A practical landing page optimisation guide for brands running paid traffic on Google, Meta and TikTok." },
    { read: "13 min read", topic: "Retention", title: "How to Grow Customer Lifetime Value Without Increasing Ad Spend",
      body: "Acquisition costs keep climbing, but the customers you have already paid to win are often your most under-used growth lever. Here is how to build a customer retention strategy that increases lifetime value without adding a ringgit to your ad budget." },
    { read: "14 min read", topic: "GEO", title: "How to Get Your Brand Cited in AI Answers: A Practical GEO Checklist",
      body: "A practical, seven-step checklist for getting your brand cited in ChatGPT, Perplexity, Gemini and Google AI Overviews — from crawler access and content structure to tracking the traffic AI sends you." },
  ],

  cta: {
    title: "Your Growth Strategy Starts With One Call.",
    body: "We review your business before the call so the conversation is useful from the first minute. You'll leave with a clear picture of your biggest growth levers and where your spend is leaking.",
    button: "Book a Strategy Call",
  },

  footer: {
    services: ["All Services", "Performance Marketing", "Search Engine Optimisation", "Generative Engine Optimisation (GEO)", "Web Development", "Reporting & Analysis"],
    work: ["All Work", "CIMB Bank Berhad", "UNITAR Education Sdn. Bhd.", "Singlife PTE LTD", "Kualesa Apparel Sdn Bhd.", "Great Eastern Holdings LTD", "Kith & Kin Realty Sdn. Bhd."],
    legal: ["Terms and conditions", "Privacy Policy"],
  },

  /* ---------------- About page ---------------- */
  about: {
    crumbs: ["Home", "About us"],
    title: "Complete marketing service, built to last",
    body: "Founded in 2021, Toggle Solutions was built around one idea: growth marketing should be transparent, measurable, and built to last. Today we work with brands across Asia, the US, Europe, and beyond.",
    valuesTitle: "Core Values",
    valuesBody: "The principles that guide every decision we make.",
    values: [
      { name: "Data-Driven Decisions", body: "We challenge assumptions with evidence. Every campaign decision starts with a question: what does the data say?", photo: "pair-zaid-jordan" },
      { name: "Craft & Care", body: "Details matter. Every ad, landing page, and email is a chance to earn the click and keep the customer.", photo: "pair-shaun-zaid" },
      { name: "True Partnership", body: "We work inside your goals, not around them. If your numbers improve, ours do too.", photo: "pair-marcus-viknesh" },
      { name: "Radical Transparency", body: "We share real numbers, honest assessments, and clear reporting. You always know where you stand.", photo: "pair-aizad-marcus" },
    ],
    peopleTitle: "The People Running Your Account",
    peopleBody: "Strategy and execution sit in the same team. Between our directors and leads, Toggle has managed over RM60M in ad budget across Asia, the US, Europe, and the Middle East.",
    partnersTitle: "Partnerships That Widen What We Cover",
    partnersBody: "We plan and buy on the platforms our clients sell on, and we bring in partners for the work that sits outside our team. Strategy, media, and build stay under one group that answers for the numbers.",
    partnersCta: "Learn More",
    brandsTitle: "Brands We Work With",
    brandsBody: "50+ brands across Asia, the US, Europe, and the Middle East trust Toggle with their growth.",
    brands: ["cimbbank", "greateastern", "kithandkin", "kualesa", "maxis", "media_prima", "petsmore", "singlife", "unitar"],
    // New About sections are assembled from approved FAQ answers (no new claims).
    // Their short section labels are the only new words and are flagged proposed.
    newSections: {
      teamOfThree: { label: "Who will I work with?", proposed: true },
      timeline: { label: "What results can I expect and how fast?", proposed: true },
      system: { label: "Do you do performance marketing only?", proposed: true },
    },
  },
};

/* Shared helpers used by both concepts. */
window.TG = {
  $: (s, r = document) => r.querySelector(s),
  $$: (s, r = document) => Array.from(r.querySelectorAll(s)),
  esc: (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]),
  pad: (n) => String(n).padStart(2, "0"),
  reduced: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  ASSETS: "../assets",

  /* Theme: explicit data-theme wins, then saved choice, then OS. */
  theme: {
    key: "toggle-theme",
    current() {
      const set = document.documentElement.getAttribute("data-theme");
      if (set) return set;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    },
    init(defaultTheme) {
      let saved = null;
      try { saved = localStorage.getItem(this.key); } catch (e) {}
      if (saved) document.documentElement.setAttribute("data-theme", saved);
      else if (defaultTheme && !document.documentElement.getAttribute("data-theme")) {
        // A concept can choose its own default when the OS gives no preference signal.
        if (!window.matchMedia("(prefers-color-scheme: light)").matches && !window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.setAttribute("data-theme", defaultTheme);
        }
      }
    },
    set(t, origin) {
      const apply = () => {
        document.documentElement.setAttribute("data-theme", t);
        try { localStorage.setItem(this.key, t); } catch (e) {}
        document.dispatchEvent(new CustomEvent("themechange", { detail: t }));
      };
      // Circular wipe from the switch where the browser supports view transitions.
      if (document.startViewTransition && origin && !TG.reduced()) {
        const r = origin.getBoundingClientRect();
        const x = r.left + r.width / 2, y = r.top + r.height / 2;
        const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        const vt = document.startViewTransition(apply);
        vt.ready.then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
            { duration: 650, easing: "cubic-bezier(.7,0,.2,1)", pseudoElement: "::view-transition-new(root)" }
          );
        }).catch(() => {});
      } else apply();
    },
    toggle(origin) { this.set(this.current() === "dark" ? "light" : "dark", origin); },
  },

  /* Preload every frame for a person so the flipbook never flashes. */
  frames(id, n = 6) {
    return Array.from({ length: n }, (_, i) => `${TG.ASSETS}/team/${id}-${i}.webp`);
  },
  preload(urls) { urls.forEach((u) => { const i = new Image(); i.src = u; }); },
};
