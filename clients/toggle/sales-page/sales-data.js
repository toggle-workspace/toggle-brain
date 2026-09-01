/* =========================================================================
   Toggle sales data, shared by index.html (post-audit diagnosis) and
   profile.html (company profile). Loaded as a classic script, so CASES,
   BOOK and STARS land on window and both pages read the same roster.
   Edit here once. Never copy this into a page.
   ========================================================================= */
/* =========================================================================
   Every number below appears in a committed file under brain/case-studies/.
   Edit the case file first, then this array. Nothing here is invented.
   ========================================================================= */
const CASES = [
  { id:"unitar", client:"UNITAR International University", year:"2023 to 2026", vertical:"education", geo:"Malaysia",
    services:["Paid advertising","Making the ads","Reporting"],
    headline:"32,000 enquiries, with the cost of each one down 47 percent, held for 3 years",
    stats:[{v:"32,000+",l:"enquiries worth following up"},{v:"47%",l:"cheaper for each enquiry"},{v:"77%",l:"of all education ads seen in Malaysia"}],
    challenge:"By the middle of 2024 they were paying RM154 for every enquiry from Google, RM291 from Facebook and RM525 from TikTok, and each extra ringgit was buying less than the one before it. At the same time the university needed more students, not fewer.",
    method:["Wrote a different message for each stage a student goes through, from first hearing of the university to actually applying, so we were never saying the same thing to everyone.","Gave every platform one job. Google reached people already searching for a course, Meta reached people still deciding, and TikTok reached people who had not thought about studying yet.","Connected the university's own enrolment records back to Google and Meta, so those platforms learned which enquiries turned into real students instead of guessing.","Merged campaigns that were competing against each other, and narrowed the targeting from anyone at all to people who had shown real interest, plus people who looked like the students who had already enrolled.","Paced the spending carefully enough to go past RM11 million a month without the cost of an enquiry going up."],
    transfer:"Spreading your advertising across several platforms only helps if each one has a different job. If all 3 are chasing the same person, you end up competing against your own ads, and that is the most common reason the cost of an enquiry creeps up as budgets grow." },
  { id:"mindvalley", client:"Mindvalley Labs", year:"2019 to 2022", vertical:"education", geo:"Global",
    services:["Paid advertising","Making the ads","Getting more visitors to buy"],
    headline:"The cost of a business enquiry cut from $100 to $10, on $500,000 of advertising",
    stats:[{v:"$100 to $10",l:"cost of one business enquiry"},{v:"4x",l:"return on ad spend"},{v:"+100%",l:"more money kept after costs"}],
    challenge:"One product sold into several countries with 2 revenue models side by side, so a blended target would have hidden which half of the business was losing money. 4 separate studios produced creative with no shared standard for a winning concept.",
    method:["Moved the business enquiries onto forms that asked the qualifying questions up front, so people who were never going to buy stopped reaching the sales team at all.","Tried the same 5 different approaches on one audience every round, and judged them on how many people clicked, how many installed the app, and what each install cost.","Broke the results down by whether men or women responded and by age. The community approach drew 89 percent men, mostly aged 18 to 34, while the benefit approach appealed evenly to everyone over 25.","Told the 4 studios exactly which single thing to change each time, such as the headline or the opening shot, rather than giving them opinions. For the first time their work could be compared fairly.","Fixed the product listings so the ad systems could automatically show the right product to people who had not visited the site before."],
    transfer:"5 angles against one audience produces 2 winners, because different angles recruit different people. Splitting results by who responded, instead of only by what performed, turns a creative test into an audience strategy." },
  { id:"cimb", client:"CIMB Malaysia", year:"2025", vertical:"banking", geo:"Malaysia",
    services:["SEO","Articles and content"],
    headline:"Appearances in Google search results up 52.6 percent, in an industry where every claim gets checked",
    stats:[{v:"+52.6%",l:"more appearances in Google"},{v:"+34.5%",l:"more clicks from Google, unpaid"}],
    challenge:"Their product pages were not ranking, competitors covered each subject far more thoroughly than they did, and they published so slowly that nothing ever built up.",
    method:["Repositioned the program from page-level fixes to a content-led authority model built for financial scrutiny.","Grouped the subjects so that every new article made the articles already published stronger, instead of competing with them.","Aligned page intent with what searchers were trying to do, not with internal product naming."],
    transfer:"In industries that are watched closely, Google trusts you because you cover a subject thoroughly, and no amount of links from other websites will make up for not doing that. The same approach works for insurance, healthcare and education." },
  { id:"singlife", client:"Singlife", year:"2025", vertical:"insurance", geo:"Singapore",
    services:["SEO"],
    headline:"Core insurance keywords moved from position 3 to position 1",
    stats:[{v:"#3 to #1",l:"position on their main searches"},{v:"+23%",l:"more clicks from Google, unpaid"}],
    challenge:"Core insurance terms had been stuck at position 3 in a category where search engines apply extra scrutiny to accuracy and authorship.",
    method:["Rebuilt the pages around the searches made by people who were actually ready to buy, so Google could see those pages were the best answer.","Rewrote each page to answer the question people were actually typing into Google, rather than naming the product the way the company names it internally.","Made it clear on every page who wrote it, what they know about the subject, and where the information came from, because Google weighs all 3."],
    transfer:"When a page has sat in the same position for months, the problem is usually what the page tells Google about itself, not how much has been written. Working out which takes days, and you can measure whether the fix worked." },
  { id:"greateastern", client:"Great Eastern Singapore", year:"2025", vertical:"insurance", geo:"Singapore",
    services:["SEO"],
    headline:"The same authority model, repeated on a second insurer, 4 to 1",
    stats:[{v:"#4 to #1",l:"position on their target searches"},{v:"+16%",l:"more clicks from Google, unpaid"}],
    challenge:"Target terms sat at position 4 in a market where the top 3 results take the great majority of the clicks.",
    method:["Applied the model proven on Singlife, adapted to a different product set.","Prioritized the terms where a one position move produced the largest click gain."],
    transfer:"2 insurers in the same market with the same outcome is a method. Ask us to show you both." },
  { id:"alhidayah", client:"Al Hidayah Publications", year:"2025", vertical:"e-commerce", geo:"Malaysia",
    services:["Paid advertising","Running the online store"],
    headline:"11.5 times return, with revenue up 300 percent",
    stats:[{v:"11.5x",l:"back for every 1 spent"},{v:"+300%",l:"more sales"},{v:"+200%",l:"more orders"}],
    challenge:"Their free reach on TikTok and their ordinary sales campaigns had both stopped growing, and adding more budget was no longer making any difference.",
    method:["Sorted the products into 3 groups instead of treating them all the same. Best sellers got the most money, middle performers stayed in testing, and slow stock was cleared with as little spend as possible.","Built a network of creators who post about the books themselves, because videos that look like a real person talking sell far better than polished brand adverts.","Made different ads for each group, built around the reason people actually buy that kind of book."],
    transfer:"Cutting budget from low performers freed the capital that tripled revenue from the best sellers. Waste reduction moved the number more than scaling winners did." },
  { id:"kualesa", client:"Kualesa", year:"2025", vertical:"e-commerce", geo:"ASEAN",
    services:["Paid advertising","Running the online store"],
    headline:"Return on ad spend up 45 percent while opening 5 new markets",
    stats:[{v:"+45%",l:"more back for every 1 spent"},{v:"2.0x",l:"back for every 1, held while expanding"},{v:"5",l:"new countries"}],
    challenge:"Spend was concentrated on Meta with no diversification, growth had hit a ceiling, and customer acquisition cost was climbing.",
    method:["Lowered spend deliberately to fund creative testing and localized visual angles before scaling anything.","Identified the winning angle per market instead of assuming one creative would travel.","Spread the advertising across Google, TikTok and Meta, including Meta's automatic shopping ads, which choose which product to show each shopper.","Expanded into Singapore, Brunei, the Philippines and Dubai on angles that had already proven out."],
    transfer:"Creative testing is the foundation, and it never stops being one. Localized angles per market are what make international scale possible on one budget." },
  { id:"edukids", client:"EduKids", year:"2025", vertical:"e-commerce", geo:"Malaysia",
    services:["Paid advertising","Running the online store","Getting more visitors to buy"],
    headline:"6 times return on TikTok at a 5.5 percent conversion rate",
    stats:[{v:"6x",l:"return on ad spend"},{v:"5.5%",l:"of visitors bought something"}],
    challenge:"The store needed TikTok to work as a commerce channel, having run it as awareness that never paid for itself.",
    method:["Ran performance media, store management and conversion work as one program instead of splitting it across 3 vendors.","Tuned the product page and checkout against the traffic TikTok sends."],
    transfer:"A channel failing on return is failing at the page more often than in the ad account. Fix the destination before you fix the bid." },
  { id:"kithandkin", client:"Kith and Kin", year:"2025", vertical:"real-estate", geo:"Malaysia",
    services:["Paid advertising","Making the ads","Getting more visitors to buy"],
    headline:"Enquiries up 392 percent, at RM35 each, in 3 months",
    stats:[{v:"+392%",l:"more enquiries"},{v:"RM35",l:"cost of one enquiry"},{v:"10%",l:"of those enquiries became sales"}],
    challenge:"They relied on word of mouth and cold calling, with no advertising at all, while launching a development in Dutamas aimed at both Malaysian and foreign buyers.",
    method:["Checked what other agents were advertising around Dutamas and found almost nobody was, which meant advertising there was unusually cheap.","Focused on Meta enquiry forms and click to WhatsApp campaigns aimed at that gap.","Produced creative across animation, image and video so the selling points landed at several moments."],
    transfer:"Checking what competitors were advertising before deciding where to advertise is what produced the RM35 cost per enquiry. What we did was ordinary. Where we chose to do it was not." }
];

/* =========================================================================
   THE BOOK. One row per account Toggle has run or is running.

   `caseId`  pulls the full published case out of CASES above.
   `logo`    is a path under assets/logos/clients/. When present the chip and
             the modal render the image instead of the name. No client logo
             files exist in this repo yet, so every entry currently renders
             typographically. Drop a file in and add the one field.
   `proved`  is set automatically for entries with a caseId or stats.

   HONESTY RULE: an entry gets `line`, `stats` or `method` only where the repo
   documents it. Everything else carries `unpublished` and says so on the card.
   Fill in clients/<slug>/CLIENT.md and the card upgrades itself.
   ========================================================================= */
/* The rows only carry clients whose logo we hold and have cleared. CLIENT_COUNT
   is the full book including the ones with no usable mark, and it is what every
   counter on both pages reports. Raise it as the book grows. */
const CLIENT_COUNT = 62;

const BOOK = [
  /* --- published cases, full detail lives in CASES --- */
  { caseId:"unitar",       v:"Higher education", m:"Malaysia" , logo:"../../../assets/logos/clients/unitar-international-university.png" },
  { caseId:"mindvalley",   v:"Education technology", m:"Global" , logo:"../../../assets/logos/clients/mindvalley-labs.png" },
  { caseId:"cimb",         v:"Banking", m:"Malaysia" , logo:"../../../assets/logos/clients/cimb-malaysia.png" },
  { caseId:"singlife",     v:"Insurance", m:"Singapore" , logo:"../../../assets/logos/clients/singlife.png" },
  { caseId:"greateastern", v:"Insurance", m:"Singapore" , logo:"../../../assets/logos/clients/great-eastern-singapore.png" },
  { caseId:"alhidayah",    v:"Commerce", m:"Malaysia" , logo:"../../../assets/logos/clients/al-hidayah-publications.png" },
  { caseId:"kualesa",      v:"Commerce", m:"ASEAN" , logo:"../../../assets/logos/clients/kualesa.webp" },
  { caseId:"edukids",      v:"Commerce", m:"Malaysia" , logo:"../../../assets/logos/clients/edukids.png" },
  { caseId:"kithandkin",   v:"Real estate", m:"Malaysia" , logo:"../../../assets/logos/clients/kith-and-kin.png" },

  /* --- documented engagements without a published number --- */
  { n:"SolDevelo", v:"Business software", m:"Poland and United States", logo:"../../../assets/logos/clients/soldevelo.png",
    line:"Paid search and content for QAlity Plus, their test management app for Jira on the Atlassian Marketplace.",
    method:["The work promotes their Jira app on the Atlassian Marketplace, and not their software development business. We keep the 2 completely separate.","Landing page flow and keyword strategy built around Marketplace intent.","We match trial sign-ups using the reference numbers Atlassian passes through, and check those against SolDevelo's own records."],
    unpublished:"Reported monthly against Marketplace evaluations. The numbers belong to the client and we have not asked to publish them." },
  { n:"Kynare", v:"Healthcare", m:"Malaysia", logo:"../../../assets/logos/clients/kynare.png",
    line:"Patient acquisition for a physiotherapy and training clinic running across 2 locations.",
    method:["Assessment-first messaging, written for a reader who has already tried something that did not hold.","Copy built only from structurally true facts: assessment before any program, physio and training under one roof, 2 locations, a named first-timer session.","The ask is a walk-in, because the walk-in is where the clinic closes."],
    unpublished:"There is no public footprint for this brand to draw proof from, and we have not invented one. No testimonial and no patient number appears in any asset we produced." },
  { n:"Ikonik Eye Specialist Centre", v:"Healthcare", m:"Malaysia", logo:"../../../assets/logos/clients/ikonik-eye-specialist-centre.png",
    line:"LASIK acquisition for an eye specialist centre, reported weekly.",
    method:["Trust-led creative where the livestream surgery content carries the persuasion and the copy stays calm and factual.","Measured in enquiries, booked appointments and actual patients. We never report visitor numbers on this account.","Bahasa Malaysia leaning for the mass LASIK audience, with a Chinese-market segment tested separately."],
    unpublished:"A promise-averse client in a regulated category. Weekly reporting is internal and nothing has been cleared for publication." },
  { n:"Oddle", v:"Restaurant technology", m:"Singapore", logo:"../../../assets/logos/clients/oddle.png",
    line:"Partnership work with a restaurant commerce platform.",
    unpublished:"Partnership engagement. No public case has been written." },
  { n:"ICMS", v:"Higher education", m:"Malaysia", logo:"../../../assets/logos/clients/icms.webp",
    line:"Google Ads account audit covering structure, tracking and wasted spend.",
    unpublished:"Audit delivered. The findings are the client's and have not been published." },
  { n:"Valetax", v:"Financial services", m:"Malaysia", logo:"../../../assets/logos/clients/valetax.png",
    line:"TikTok content system, including a creator guidebook built for a regulated category.",
    unpublished:"No public case has been written for this account." },
  { n:"IJN University College", v:"Higher education", m:"Malaysia", logo:"../../../assets/logos/clients/ijn-university-college.png",
    line:"TikTok media planning for a health sciences college.",
    unpublished:"No public case has been written for this account." },
  { n:"CodeFortyNine", v:"Business software", m:"Europe", logo:"../../../assets/logos/clients/codefortynine.png",
    line:"Advertising for a company selling an app on the Atlassian Marketplace.",
    unpublished:"Reported against Marketplace evaluations. Nothing cleared for publication." },
  { n:"Meraaki Digital", v:"Agency partner", m:"Malaysia",
    line:"Advertising and customer follow-up work delivered under another agency's name rather than ours.",
    unpublished:"White-label by agreement. We do not publish work delivered under another agency's name." },

  /* --- in the book, no public case written --- */
  { n:"Communardo",        v:"Business software", m:"Europe", logo:"../../../assets/logos/clients/communardo.png" },
  { n:"Ricksoft",          v:"Business software", m:"Japan", logo:"../../../assets/logos/clients/ricksoft.png" },
  { n:"Yasoon",            v:"Business software", m:"Europe", logo:"../../../assets/logos/clients/yasoon.png" },
  { n:"Sourceflow",        v:"Business software", m:"United Kingdom", logo:"../../../assets/logos/clients/sourceflow.png" },
  { n:"Catapult Labs",     v:"Business software", m:"Global", logo:"../../../assets/logos/clients/catapult-labs.png" },
  { n:"IOTA",              v:"Business software", m:"Global", logo:"../../../assets/logos/clients/iota.svg" },
  { n:"Petsmore",          v:"Commerce", m:"Malaysia", logo:"../../../assets/logos/clients/petsmore.png" },
  { n:"Mr.Hardbox",        v:"Commerce", m:"Malaysia" },
  { n:"Ocean Flair Group", v:"Commerce", m:"Malaysia", logo:"../../../assets/logos/clients/ocean-flair-group.png" },
  { n:"Al-Shah",           v:"Commerce", m:"Malaysia", logo:"../../../assets/logos/clients/al-shah.png" },
  { n:"Fusecon",           v:"Business services", m:"Malaysia", logo:"../../../assets/logos/clients/fusecon.png" },
  { n:"Cadler",            v:"Business services", m:"Malaysia", logo:"../../../assets/logos/clients/cadler.webp" },
  { n:"IJ-Solutions",      v:"Business services", m:"Malaysia" },
  { n:"Al-Hidayah Publication", v:"Commerce", m:"Malaysia", sameAs:"alhidayah" },
  /* ---------------------------------------------------------------------
     Added 2026-08-29 from Zaid's 2 client lists.

     VERIFY BEFORE THE NEXT CALL. The industry or the market on the rows
     marked REVIEW is my inference, not a fact from this repo. A wrong
     industry label changes the industries counter on the profile page.

     Also unresolved: whether Toyota is the Puchong dealership or the
     national account, and whether Bruno is a separate brand or the "Bru"
     drama IP inside the Media Prima campaign.
     --------------------------------------------------------------------- */
  { n:"Maxis",                v:"Telecommunications", m:"Malaysia", logo:"../../../assets/logos/clients/maxis.webp" },
  { n:"Media Prima",          v:"Media", m:"Malaysia", logo:"../../../assets/logos/clients/media-prima.svg" },
  { n:"Clarins",              v:"Beauty", m:"Malaysia", logo:"../../../assets/logos/clients/clarins.png" },              /* REVIEW: market */
  { n:"Toyota",               v:"Automotive", m:"Malaysia", logo:"../../../assets/logos/clients/toyota.png" },          /* REVIEW: which Toyota account */
  { n:"Thomson Medical",      v:"Healthcare", m:"Singapore", logo:"../../../assets/logos/clients/thomson-medical.webp" },
  { n:"Leica Camera",         v:"Commerce", m:"Global", logo:"../../../assets/logos/clients/leica-camera.webp" },
  { n:"SECOM",                v:"Business services", m:"Malaysia", logo:"../../../assets/logos/clients/secom.webp" },
  { n:"UNA Brands",           v:"Commerce", m:"Singapore", logo:"../../../assets/logos/clients/una-brands.png" },
  { n:"CNI",                  v:"Commerce", m:"Malaysia", logo:"../../../assets/logos/clients/cni.png" },
  { n:"HWC Coffee",           v:"Food and beverage", m:"Malaysia", logo:"../../../assets/logos/clients/hwc-coffee.png" },
  { n:"Bruno",                v:"Commerce", m:"Malaysia", logo:"../../../assets/logos/clients/bruno.png" },            /* REVIEW: separate brand, or the Bru IP */
  { n:"GuruLab",              v:"Education technology", m:"Malaysia", logo:"../../../assets/logos/clients/gurulab.png" },
  { n:"City University Malaysia", v:"Higher education", m:"Malaysia", logo:"../../../assets/logos/clients/city-university-malaysia.png" },
  { n:"Code of Origin",       v:"Agency partner", m:"Malaysia", logo:"../../../assets/logos/clients/code-of-origin.png" },
  { n:"ESP Profere Property", v:"Real estate", m:"Malaysia", logo:"../../../assets/logos/clients/esp-profere-property.png" },
  { n:"Golen Homes",          v:"Real estate", m:"Malaysia" },         /* REVIEW: spelling, Golden Homes? */
  { n:"Nasi Lemak Saleha",    v:"Food and beverage", m:"Malaysia" },
  { n:"Anyday Cakes",         v:"Food and beverage", m:"Malaysia" },
  { n:"Furball Haven",        v:"Commerce", m:"Malaysia" },
  { n:"Chinzi",               v:"Commerce", m:"Malaysia" },            /* REVIEW: separate from Mr.Hardbox? */
  { n:"Puetri",               v:"Commerce", m:"Malaysia" },            /* REVIEW: industry */
  { n:"Khalsa",               v:"Commerce", m:"Malaysia" },            /* REVIEW: industry */
  { n:"Nihon",                v:"Commerce", m:"Malaysia" },            /* REVIEW: industry and market */
  { n:"Frontier",             v:"Business services", m:"Malaysia" },   /* REVIEW: industry */
  { n:"Giat Solutions",       v:"Business services", m:"Malaysia" },   /* REVIEW: industry */
  { n:"Outbound Strat",       v:"Business services", m:"Malaysia" },   /* REVIEW: industry */
  { n:"Bumi Safety",          v:"Business services", m:"Malaysia" }    /* REVIEW: industry */
].filter(b => !b.sameAs).map(b => {
  const c = b.caseId ? CASES.find(x => x.id === b.caseId) : null;
  return Object.assign({}, b, {
    n: b.n || (c ? c.client : ""),
    line: b.line || (c ? c.headline : ""),
    stats: b.stats || (c ? c.stats : null),
    method: b.method || (c ? c.method : null),
    challenge: c ? c.challenge : null,
    transfer: c ? c.transfer : null,
    year: c ? c.year : null,
    proved: !!c
  });
});

/* stars floating around the constellation headline: value, label, position */
const STARS = [
  { v:"47%",     l:"lower CPL, UNITAR",        s:"top:2%;left:1%",    r:-7, hot:1 },
  { v:"$100→$10",l:"cost of a business enquiry, Mindvalley",s:"top:9%;right:2%",   r:6,  hot:1 },
  { v:"11.5x",   l:"return, Al Hidayah",       s:"top:34%;left:-2%",  r:4 },
  { v:"#3 → #1", l:"rankings, Singlife",       s:"bottom:6%;left:7%", r:-4 },
  { v:"+392%",   l:"enquiries, Kith and Kin",      s:"bottom:1%;right:9%",r:5 },
  { v:"6x",      l:"return on TikTok ads, EduKids",  s:"bottom:30%;right:-1%",r:-6 },
  { v:"+52.6%",  l:"impressions, CIMB",        s:"top:44%;right:12%", r:3 },
  { v:"RM11m",   l:"a month, without CPL drift",s:"top:26%;left:14%", r:-3 }
];
