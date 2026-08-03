# Ikonik Eye Centre, Website Intelligence and Pre-Launch Audit

**Site:** https://ikonik-eyecentre.com/
**Audited:** 2026-08-04
**Scope:** the website only. TikTok, Meta, and Google ad accounts were not audited here, and no client-side analytics access was used.
**Method:** every URL was pulled as raw HTML and read directly. Round 1 gathered facts across three lenses (services, company, technical). Round 2 ran an adversarial verifier that re-pulled all 25 sitemap URLs to attack round 1's claims, plus a completeness critic that hunted for what the first pass structurally missed. Findings below carry a confidence marker where it matters.

**Read this alongside** `CLIENT.md` and `05-meetings/2026-07-pre-proposal-meeting.md`. Section 13 lists the places where the live site contradicts what those files record.

---

## 1. How to trust this document

Every number, ID, and quoted string here was seen in the live page source at least twice, by two different agents, on separate pulls. Where a claim survived only one pass, or where the tooling cannot see the answer, it is marked **UNVERIFIED** or **BLIND SPOT** in place. Three round 1 claims were corrected by the verifier and one was refuted outright. Those corrections are already folded into the text below, so this document supersedes any earlier note.

---

## 2. The company

| Fact | Value | Source |
|---|---|---|
| Legal entity | `IKONIK EYE SPECIALIST AND GENERAL HEALTH CENTRE SDN BHD` (the site spells out "AND", it does not use an ampersand) | Footer, all 25 pages |
| SSM registration number | Not stated anywhere on the site | Verified absent across all 25 pages |
| Founding year per the site | "Since our founding in 2014" | `/our-ceo/` |
| Copyright line | `© 2014-2024` | Footer, all pages |
| Positioning line | "The Leading Eye Specialist in laser eye treatment & premium lens implantation" | Homepage |
| Secondary positioning | "Correcting Your Sight, Improving Your Vision in Life" and "First Class, World Class" | Homepage, story page |
| Centres | One, in Bukit Jalil | Contact page |
| Address | 9, 10, 11 Residensi Park Bukit Jalil, Persiaran Jalil Utama, 57000 Bandar Bukit Jalil, Kuala Lumpur | Contact page |
| Phone | (+603) 9765 1368 general, 011-2516 6926 aesthetics | Sitewide |
| Email | appointment@ikonik.com.my, external@ikonik.com.my | Contact page |
| Hours | 7:30am to 8:00pm, Monday to Saturday | Sitewide |
| Advertising licence | `KKLIU:1537/EXP 31.12.2026` | Footer, all 25 pages |

The founding year is the single most important discrepancy in this document. The site says 2014 in two independent places. The pre-proposal meeting notes say the centre was established in 2021 as a rebrand of Prof Muhaya's centre. Both can be true if 2014 is the founding of a predecessor entity, but the site never explains the lineage, so anyone writing ad copy has to pick one story. Section 13 covers this.

---

## 3. The people

**Founder and CEO: Muhammad Addaem Mikhail Chandran.** His credentials are commercial rather than clinical: a Bachelor's in Business Administration from UKM, a Global Executive MBA from INSEAD, certifications as an NLP, hypnosis, and Time Line Therapy trainer, and a certified team and executive coach credential (MGSCC). Awards listed are Male Entrepreneur of the Year (SOBA 2018) and Entrepreneur Leadership Award (SEBA 2019). The site titles him "Our World-Class Leader." No medical qualification appears in his bio.

Clinical authority sits with the Medical Director instead, which matters for how we frame authority in creative. The eight named doctors:

1. **Dr. Noor Aniah Azmi**, IKONIK Medical Director. MBBCh (Egypt), DrOphth (UKM), PGDip Cataract & Refractive Surgery (Ulster)
2. **Datuk Prof. Dr. Muhaya**. MD (UKM), MSOphth (UKM), FRCS (Edin), PhD in Ocular Immunology (London), Fellowship in Uveitis (UK)
3. **Dr. Punithamalar Velaitham**. MBBS (MMMC), DrOphth (UKM)
4. **Dr. Nazima**. MBBS (IIUM), DrOphth (UKM), Medical Retina & Uveitis (Malaysia, Auckland)
5. **Dr. Rozita**. MD (UKM), Master of Surgery (Ophthalmology)
6. **Dr. Amirah**. MBBS (IIUM), MSOphth (USM)
7. **Dr. Rafidah**. MB Bch BAO (QUB, UK), MSOpth (UM)
8. **Dr. Stella**. MBBS (AIMST), DrOphth (UKM)

Datuk Prof. Dr. Muhaya being on the roster confirms the Prof Muhaya lineage the meeting notes describe. Five of the eight doctors are listed by first name only, and none has bio text beyond the credential line. For a category where patients choose a surgeon rather than a clinic, that is thin. Their strongest owned asset, a nationally recognized professor, gets one line and no page of her own.

**Hiring signal:** nine open roles, all in Bukit Jalil. Clinical Optometrist, Staff Nurse, Clinical Assistant, Beautician, Graphic Designer, Account/Finance Executive, Customer Service Experience, Management Associate, and Videographer Cum Editor. A graphic designer plus a videographer plus a customer service experience role says they are building content and intake capacity in house, which fits the meeting note that content creation stays on their side.

---

## 4. The trust numbers, and the problem with them

The site claims the following, quoted as written:

- `152,000 ++ SATISFIED PATIENTS` (homepage counter)
- `110,000++ Satisfied Patients Served as a Single Centre` (hero banner, homepage and story page)
- `Let Our 12,000++ Patients Speak` (testimonial section)
- `62,000 ++ TOTAL PROCEDURES`
- `32,000 ++ LASER EYE SURGERIES`
- `13,000 ++ CATARACT & RETINA`
- `12.5% INTERNATIONAL PATIENTS`
- `145+` CSR patients
- Awards: "over 10 prestigious accolades", with Readers' Digest, The Star, and SME Corp named but no specific award named

**Three different "patients" figures appear on the same website, and two of them appear on the same page.** 152,000, 110,000, and 12,000 are all presented as patient counts. The CEO letter independently repeats 152,000. This is confirmed, not a scraping artifact.

This is a live compliance and credibility risk, not a cosmetic one. Malaysian medical advertising sits under the KKLIU regime, and we would be amplifying whichever number we pick with paid spend behind it. Before any campaign quotes a patient count, the client has to tell us which figure is correct and what it counts. Until then, treat all three as unusable in creative.

**Testimonials:** six named, dated testimonials are hard coded into the homepage. The most recent are Dewi Zuanie and Syasya Ans Nawi, both April 2024. The rest run from July 2023 to November 2023. Nothing newer than April 2024 appears anywhere on the site.

---

## 5. Services

The site organizes its offering by age band, which is a genuinely good structure and worth keeping in campaign architecture:

- **5 to 17:** Ortho-K, using "K Ortho lenses" that reshape the cornea overnight
- **18 to 49:** Flapless Smart Signature™, Flapless Trust™, conventional LASIK, and IPCL
- **50 and above:** cataract surgery and Refractive Lens Exchange
- **Diagnostic and disease:** Comprehensive Eye Check Up, dry eye, diabetic eye disease, pterygium, chalazion, glaucoma, ARMD
- **Non-eye cross-sell:** aesthetics, hair loss, weight and body management, "Miss-V Treatment", urinary incontinence

**Flagship: Flapless Smart Signature™.** It has the deepest page, names a proprietary feature ("Intelligent Eye Tracking"), claims correction "of up to -1200 power", and carries the only concrete downtime claim on the site: "Resume Normal Routine Within Hours!"

**Flapless Trust™** is positioned as the value tier: "With our affordable prices and VIP treatment, patients receive personalized care and effective results without breaking the bank." It never states a price, and its page is shorter than the premium sibling's. A value tier that will not say its price is not a value tier.

**IPCL** carries the sharpest competitive line on the site, a swipe at rival clinics: "A muslim-friendly, synthetic" lens, footnoted with "*Some centres use animal-based collamer. Do your research wisely!" That is an ownable, differentiated, and market-specific angle, and it is buried on an interior page.

**Comprehensive Eye Check Up is the real top of funnel.** Three disease pages (diabetic eye disease, glaucoma, ARMD) route their call to action into the check-up form rather than a disease-specific flow. It is also the only service with a stated price.

**Content quality issues:**
- Flapless Smart Signature, conventional LASIK, and Flapless Trust share a word-for-word identical candidacy list, including the line "Individuals must weigh under 125kg to qualify for the treatment." Three procedures at three price points with zero clinical differentiation stated between them.
- The IPCL page contradicts itself on its own ceiling: the intro says prescriptions "reaching up to -3000" while a heading further down the page reads "Extremely high myopia up to -4000."
- Thinnest pages: pterygium (roughly 553 words) and chalazion (roughly 600 words).
- The aesthetics page bundles five unrelated services with no specifics and a separate phone number.

---

## 6. Pricing on the site

Only three ringgit figures exist anywhere, and only one is a treatment price in text:

| Figure | What it is | Where |
|---|---|---|
| `RM660` (from `RM1500`) | Comprehensive Eye Check Up, the site's only text-stated treatment price | `/service/comprehensive-eye-check-up/` |
| `RM2,500 Per Eye` | LASIK promo, "GRAB PROMO Sekarang!", baked into the homepage popup **image** | `WEBSITE POP UP 04.jpg` |
| `RM4000` | A first-year salary package in a recruitment bullet, not a patient price | `/career-with-us/` |

The RM2,500 per eye promo matches the TikTok price anchor already recorded in `CLIENT.md`, so the offer is consistent across channels. The problem is where it lives. It exists only as pixels inside a 1.29MB JPEG, so no search engine can read it, no ad platform can pull it, and no page on the site states the clinic's headline offer in text. Cataract, RLE, IPCL, and both Flapless tiers have no price anywhere.

---

## 7. The site is more than twice the size its sitemap claims

`sitemap.xml` lists 25 URLs. At least 14 more live pages exist, reachable by link but absent from the sitemap.

**Two Bahasa Malaysia pages, both linked from the main navigation:**
- `https://ikonik-eyecentre.com/rawatan-lasik-mata-malaysia/`, a complete BM landing page, H1 "Rawatan Lasik Mata Malaysia", with full service copy, benefits, and contact details in Malay
- `https://ikonik-eyecentre.com/service/rawatan-katarak-mata` (note the missing trailing slash), H1 "Rawatan Katarak Mata", more templated and with some duplicated headings

**Twelve blog posts,** reachable only from a homepage carousel, absent from the main navigation and the sitemap:
`/lasik-eye-surgery-procedure-and-advantage/` · `/why-ikonik-eye-centre-is-malaysias-leading-refractive-clinic/` · `/understanding-cataract-lens-exchange-options-at-ikonik/` · `/essential-tips-from-ikonik-specialists/` · `/comprehensive-check-ups-at-ikonik/` · `/life-after-flapless-lasik/` · `/combining-eye-care-with-aesthetic-wellness-at-ikonik/` · `/ortho-k-for-kids/` · `/hair-loss-treatment-in-malaysia/` · `/5-common-eye-diseases/` · `/lasik-surgery-malaysia-flapless-lasik-procedure/` · `/understanding-refractive-lens-exchange-rle/`

Blog posts carry no publish date, no author, and no last-updated date.

Two consequences matter for us. First, there is already a BM landing page for the exact keyword a Malay-language LASIK ad set would target, which means we do not have to build one before launch, we have to fix and claim the one that exists. Second, an entire content library is invisible to sitemap-driven crawling, which is free organic upside sitting unclaimed.

**No Chinese-language content exists anywhere on the site,** despite the Chinese-market segment discussed in the pre-proposal meeting. There is no `hreflang` markup and no language switcher, so the BM pages are orphans rather than a real multilingual structure.

---

## 8. Tracking and measurement, the section that decides whether we can launch

Every tag ID below was verified on all 25 sitemap pages by two independent pulls.

| Platform | ID | Status |
|---|---|---|
| GA4 | `G-B5LDLFMDNE` | Present |
| Universal Analytics | `UA-120520037-1` | Present and still firing, though the property has been dead since 2023 |
| Google Tag Manager | `GTM-K6MM86HM`, `GTM-KJ9W6NK`, `GTM-WMZTHR5T` | Three separate containers on every page |
| Google Ads | `AW-801169026` | Present, with no conversion label found in any page source |
| Meta Pixel | `431642605237146` | Present, `fbq('init', ...)` |
| TikTok Pixel | `CGN904BC77UCKR526JO0` | Present, `ttq.load(...)` |
| Hotjar, Clarity, LinkedIn, Bing UET, live chat | none | Not found |

**The finding that matters: all three ad platforms are tracking pageviews and none of them fires a lead event in the page source.** Only `fbq('track','PageView')` and `ttq.page()` appear. There is no `ttq.track()`, no `gtag('event', ...)` conversion call, no `fbq` Lead, Contact, or Schedule event, and no conversion label on the Google Ads tag. The appointment form's success handler calls none of the three.

**BLIND SPOT, and we must not paper over it:** three GTM containers are loading, and GTM can inject conversion tags on form-submit events at runtime. Reading the HTML cannot see inside a GTM container. So the honest statement is that no conversion tracking is visible to a crawler, and it has to be confirmed live in Tag Assistant, Meta Pixel Helper, and TikTok Pixel Helper before we commit to the diagnosis. That check takes about twenty minutes with access and it is the first thing to do at kickoff.

Three concurrent GTM containers is unusual and reads as layered handoffs between previous developers or agencies that nobody cleaned up. Even if conversions do fire, duplicate tags across three containers risk double counting, which would inflate reported results and quietly corrupt optimization.

---

## 9. How a visitor actually converts

**The appointment form** collects `name`, `emailAddr`, `telNumber`, `patientAge`, `fromWhere`, `apptDate`, `service`, `message`, and `knowaboutus`. The HTML `action` attribute points at the page itself, and submission happens through a jQuery AJAX call to `/cart/sendAppointment/` inside a `checkForm()` function.

Two dropdowns are worth knowing about. The **Service** dropdown offers Comprehensive Eye Check Up, Bebas Rabun 18-49, Bebas Rabun 50+, Cataract, Penyakit Mata, and For Kids, which mirrors the age-band structure and uses Malay labels. The **"How Did You Know About Us?"** dropdown offers TikTok, Instagram, Google, Facebook, YouTube, Website, Billboard, Influencer, Event, and Friends/Relative. That second field is a gift: the client already collects self-reported attribution on every lead, which gives us a free cross-check against platform-reported numbers from day one.

**There is no WhatsApp entry point anywhere on the site.** All 25 sitemap pages were grepped for `wa.me`, `api.whatsapp`, and `whatsapp`. The only hit is an uploaded image filename on the CEO page, `WhatsApp Image 2025-08-15 at 5.54.21 PM.jpeg`, which is not a link. This directly contradicts the "WhatsApp-first capture" scope written into `CLIENT.md`, and it is the highest priority build item before launch.

**Other paths:** click to call on `tel:+601125166926` and `tel:+60397651368` sitewide, plus a malformed `tel:0397651368` on the privacy policy page that is missing its country code. A career application form on `/career-with-us/` takes a job position and a resume upload under 1MB. No newsletter signup, no live chat, no booking software, no payment gateway.

**The landing experience is weak.** The LASIK category page, the most likely destination for a LASIK ad, has no embedded form. A visitor has to click through to `/contact-us/` to enquire. There are no dedicated campaign landing pages at all.

**The homepage popup is broken.** It auto-fires on every page load via `$('#homePopupModal').modal('show')`, and it carries the RM2,500 per eye offer. The intended booking link was written as `<img src="https://ikonik-eyecentre.com/contact-us/#form_anchor">` rather than an anchor tag, twice. Those render as broken image icons and click through to nothing. The clinic's headline promo currently has no working call to action, and it sits behind a 1.29MB image in a folder that `robots.txt` blocks.

---

## 10. Technical and SEO condition

**Stack:** hand-rolled PHP rather than WordPress, with no `wp-` signatures, a `/cart/sendAppointment/` endpoint, a `PHPSESSID` cookie, and a sitemap generated by "easysell PHP XML Sitemap Generator 1.0". Apache origin, no CDN detected. jQuery 3.7.1 and Bootstrap 5.3.3 are both current. HTTPS with HSTS and reasonable security headers. The viewport meta tag is present, so the site is responsive.

One passive observation worth passing to their developer: a `cnf_session` cookie is served containing a readable PHP-serialized payload. We did not probe it and it is out of scope for a marketing engagement, but their developer should look at it.

**SEO defects:**
- **Zero structured data.** No `application/ld+json` on any of the 25 pages. No LocalBusiness, no MedicalClinic, no Physician markup. For a single-location clinic competing on local search, this is the cheapest available win and it is completely unclaimed.
- **Every canonical tag contains a stray port number,** for example `https://ikonik-eyecentre.com:443/`. All 25 pages.
- `robots.txt` blocks `/images/`, `/css/`, and `/js/`, plus an odd `Disallow: /*.ph` rule. Blocking CSS and JS prevents search engines from rendering pages the way users see them.
- Title tags do not match page content in several places. The conventional LASIK page is titled "FEMTO-Lasik Eye Laser | Bladeless Laser Eye Surgery" while its H1 says LASIK, and the RLE page's title reads like a LASIK page.
- `/contact-us/`, the page that holds the conversion form, has no H1 at all.
- No `hreflang`, despite two live Malay pages.

**Production defects visible to visitors right now:**
- The Flapless Smart Signature page, the flagship, has a live H1 reading `Flapless Smart Signature™ - COPY` and a meta description ending in the words "Extra instruction". Both are unfinished editor placeholders shipped to production.
- `/service/flapless-smart/` returns a 302 redirect to the homepage. It has no content of its own.
- The Ortho-K page's primary "Book Appointment" button points at that dead URL, twice. Ortho-K is the entire kids segment, and its main conversion button drops visitors on the homepage with no form.

**Performance:** HTML documents are small, between 54KB and 87KB. Two homepage images are not optimized: the popup JPEG at 1.29MB and `awards.png` at 1.37MB. jQuery, Bootstrap, and four theme scripts load synchronously with no `async` or `defer`. No Lighthouse score is claimed here because none was run.

**Assets:** all images are self-hosted with no stock-marketplace filename patterns, which suggests commissioned or owned photography, though we cannot confirm authenticity from filenames. One doctor photo ships as `WEBSITE GAMBAR DR copy.jpg`, with spaces and a "copy" suffix in the filename. No video anywhere on the site, and no TikTok embed, despite TikTok being their strongest channel.

---

## 11. Compliance and data handling

The KKLIU licence `KKLIU:1537/EXP 31.12.2026` runs sitewide and **expires on 31 December 2026**, which is inside any six-month engagement starting now. Renewal timing should be on our risk list, because ad creative in this category leans on that licence.

The privacy policy is governed by the PDPA 2010. Marketing consent is opt in at registration only. The policy explicitly rules out selling or renting patient data, with exceptions for treating clinicians, legal compulsion, and consent. Cookies and web beacons are disclosed in generic terms.

**Two flags for a paid engagement:**
1. The appointment form has **no PDPA consent checkbox**. We would be driving paid traffic into a form that collects name, phone, email, age, and a health service selection with no capture of consent.
2. The privacy policy does not authorize uploading the clinic's patient list to ad platforms for custom or lookalike audiences. Patient lists are health-adjacent data, both Meta and TikTok restrict health targeting, and the policy as written does not cover it. Customer-list lookalikes need separate written client sign-off and a policy update before we attempt them.

---

## 12. What blocks or degrades a paid lead-gen launch

Ordered by severity. Every item traces to a finding above.

1. **Confirm conversion tracking on all three platforms.** Nothing in the page source fires a lead event. Verify live in Tag Assistant and the Meta and TikTok pixel helpers, then build the events. Until a lead event fires, campaigns cannot optimize and reported results mean nothing.
2. **Add a WhatsApp path.** The proposed scope is WhatsApp-first capture and the site has no WhatsApp link at all. This has to be built before click-to-WhatsApp ads can run.
3. **Fix the Ortho-K call to action.** The kids segment's main booking button points at a dead URL.
4. **Fix the homepage popup.** The RM2,500 offer, their strongest hook, has no working click-through.
5. **Audit and consolidate the three GTM containers, and remove the dead UA tag.** Duplicate tags risk double-counted conversions.
6. **Add a PDPA consent checkbox to the appointment form** before paid traffic reaches it.
7. **Build real landing pages, starting with LASIK and the BM LASIK page.** Category pages have no embedded form, so every ad click costs an extra step.
8. **Resolve the patient-count contradiction** (152,000 against 110,000 against 12,000) before any number is used in creative.
9. **Fix the production placeholders,** the "- COPY" H1 and the "Extra instruction" meta description, on a page likely to be an ad destination.
10. **Add the 14 orphan URLs to the sitemap** and add LocalBusiness or MedicalClinic structured data.
11. **Compress the two multi-megabyte homepage images** and defer render-blocking scripts, which affects both user experience and Google Ads quality signals.
12. **Correct the canonical `:443` port** and the malformed phone link on the privacy policy page.

Items 1 through 4 are launch blockers. Items 5 through 8 should be closed inside the first month. The rest are compounding improvements.

---

## 13. Where the live site contradicts our own records

| Our record | The site | What to do |
|---|---|---|
| `CLIENT.md` scope: "WhatsApp-first capture" | No WhatsApp link exists anywhere | Either build it in week one or change the scope. Confirm with the client which. |
| Meeting notes: "established 2021", rebranded from Prof Muhaya's centre | "Since our founding in 2014" plus a `© 2014-2024` footer | Ask the client which date to use publicly. A "10+ years" claim depends on the answer. |
| `CLIENT.md`: "10+ years, 152,000+ patients" | 2014 founding supports 10+ years. The patient figure appears as 152,000, 110,000, and 12,000 | Do not use a patient count in creative until the client confirms one figure. |
| `CLIENT.md`: services list | Accurate, and it now extends to a full disease cluster and a five-service aesthetics arm | Update the services line in `CLIENT.md`. |
| `CLIENT.md`: TikTok price anchor "serendah RM2,500/satu mata" | Matches. The same RM2,500 per eye offer runs on the homepage popup | Consistent across channels. The offer is real, its on-site execution is broken. |
| `CLIENT.md` status: "Prospect, pitch Thu 16 Jul 2026" | Today is 2026-08-04, so the pitch date has passed | The outcome is not recorded anywhere in the repo. This needs updating and it is not something this audit can determine. |

Ikonik also does not appear in `Sales/sales-pipeline.md` or anywhere in `cockpit/`. The pipeline tracker has never been generated, so that is a wider gap rather than an Ikonik-specific one.

---

## 14. Opportunities the audit surfaced

- **A BM LASIK landing page already exists** at `/rawatan-lasik-mata-malaysia/`. Malay-language ad sets have a destination on day one, once it is fixed and given a form.
- **The self-reported attribution dropdown** on the lead form gives us an independent read on channel performance without any extra build.
- **The IPCL Muslim-friendly lens angle** is concrete, differentiated, and specific to this market. Competitors using animal-based collamer cannot copy it. It currently sits on an interior page with no promotion.
- **The age-band structure** (5 to 17, 18 to 49, 50 plus) maps cleanly onto campaign and ad set architecture, and the lead form's Service dropdown already uses the same segments.
- **Twelve blog posts** exist with zero sitemap coverage and no dates. Indexing and dating them is cheap organic upside.
- **Datuk Prof. Dr. Muhaya** is a nationally known figure reduced to one credential line. She is the clinic's strongest authority asset and is close to unused on the website.

---

## 15. What we could not verify

- Whether GTM containers fire lead events at runtime. This needs live access to check, and it changes the severity of item 1 above.
- Whether the career form actually posts anywhere, since it has no `action` attribute in the markup.
- Whether doctor and patient photos are commissioned or licensed, which cannot be determined from filenames.
- Any traffic, ranking, spend, or conversion data. No GSC, GA4, or ad account access was used for this audit. The NDA and GSC access noted in the meeting file are still the gate for a real baseline.
- The clinic's actual prices for cataract, RLE, IPCL, and both Flapless tiers, none of which appear anywhere on the site.
