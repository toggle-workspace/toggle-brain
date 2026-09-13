---
client: signwell
artifact: verified data layer for the brand audit deck
collected: 2026-09-13
collector: Jordan, with Claude
method: live page fetches, sitemap parsing, raw page source inspection, public web research
status: no account access. Nothing here is SignWell first party data.
---

# SignWell brand audit: verified data

Every claim the deck makes has to trace to a line in this file. Anything that cannot
be traced here is an assumption and gets labeled as one on the slide.

## Method and its limits

Read on 13 September 2026 by fetching live pages and reading the served HTML, plus
`robots.txt`, `sitemap.xml` and `resources/sitemap_index.xml`. Two findings were
confirmed visually by Jordan in a browser, marked below.

What this method cannot see: anything rendered by JavaScript after page load,
anything behind the app login, and any account data at all. Where JavaScript could
change the picture, it is said so.

---

## 1. Pricing and the revenue architecture

Source: `https://www.signwell.com/pricing/` and `https://www.signwell.com/api-pricing/`

| Plan | Monthly | Annual | Included |
|---|---|---|---|
| Free | $0 | $0 | 1 sender, 1 template, 3 documents a month, API access with 3 free documents |
| Light | $12 per user | $10 per user | 1 sender base, 5 templates per sender, unlimited documents, API with 15 free documents. Extra senders $12 monthly or $10 annual |
| Business | $36 per user | $30 per user | 3 senders base, unlimited templates, unlimited documents, API with 25 free documents, 50 SMS credits. Extra senders $15 monthly or $12 annual |
| API | $275 base | 10% discount yearly | 25 free documents monthly, then $0.85 per document falling to $0.20 at volume. Embedded signing, templates, dedicated developer support |
| Enterprise | Custom | Custom | 50 plus seats, high volume, dedicated onboarding, sales contact required |

Annual billing carries a 20% discount on the seat plans. All plans include SOC 2
Type II, HIPAA BAA and audit trails. Recipients never need an account and signers
are unlimited and free on every plan.

**The arithmetic that matters.** The API plan at $275 is 22.9 times the Light plan
and 7.6 times the Business plan. A single API customer is worth roughly as much as
23 Light seats. If both register as one undifferentiated "app signup" conversion,
automated bidding is being pointed at volume rather than value.

---

## 2. The conversion sweep

Fifteen commercial pages were fetched and their served HTML searched for signup
machinery: the Google one click button (`btn-google`), any `<form>` element, and the
phrases sign up free, get started, start free, try it free and create account.

| Page | HTML size | Google button | Forms | CTA text matches |
|---|---|---|---|---|
| `/docusign-alternative/` | 76 KB | 0 | 0 | 0 |
| `/hellosign-alternative/` | 163 KB | 0 | 0 | 0 |
| `/adobe-sign-alternative/` | 74 KB | 0 | 0 | 0 |
| `/signnow-alternative/` | 146 KB | 0 | 0 | 0 |
| `/dochub-alternative/` | 44 KB | 0 | 0 | 0 |
| `/signable-alternative/` | 176 KB | 0 | 0 | 2 |
| `/sign-pdf/` | 183 KB | 1 | 3 | 0 |
| `/sign-documents-online/` | 227 KB | 1 | 3 | 0 |
| `/online-signature/` | 113 KB | 0 | 0 | 0 |
| `/online-signature/draw/` | 38 KB | 0 | 0 | 0 |
| `/online-signature/type/` | 39 KB | 0 | 0 | 0 |
| `/contracts/` | 74 KB | 0 | 0 | 0 |
| `/pricing/` | 309 KB | 0 | 0 | 7 |
| `/api/` | 104 KB | 0 | 0 | 2 |
| `/industries/real-estate-and-property-management/` | 227 KB | 0 | 0 | 0 |
| `/industries/healthcare/` | 128 KB | 0 | 0 | 1 |
| `/signwell-for-startups/` | 70 KB | 0 | 0 | 0 |

### 2a. The comparison pages carry no signup path

**Confirmed by Jordan in a browser on 13 September 2026.** `/docusign-alternative/`
offers Log in and nothing else. Its only two HTML `<button>` elements are carousel
arrows (`docusign-carousel-arrow--prev` and `--next`). Its only in body call to
action reads "Reach out to us!". A full anchor dump returns nav links, footer links,
the Perplexity and Google AI Mode deep links, and social profiles. No signup link.

The same absence holds across all six comparison pages.

Why this matters: "docusign alternative" is among the most expensive and highest
intent queries in this category, and these are the pages built to win it.

### 2b. The free signature generator converts, but only at the end

**Confirmed by Jordan in a browser.** A call to action appears after clicking draw or
type and completing a signature.

Verified against the HTML: `/online-signature/`, `/online-signature/draw/` and
`/online-signature/type/` all serve zero signup buttons and zero forms. The prompt
Jordan saw is injected by JavaScript after the user finishes the signature.

Two consequences. A visitor who reads and leaves without drawing never sees an
offer. And a JavaScript element appearing that late is easy to leave untracked, so
whether it fires a GA4 event is an open question for Henry.

### 2c. Two tool pages are built to convert

`/sign-pdf/` and `/sign-documents-online/` each serve the Google one click button
plus three forms in the HTML. These are the only non homepage pages in the sweep
with server rendered signup machinery.

### 2d. The contract templates offer nothing

`/contracts/` serves no signup button and no form.

### 2e. The main category page has no signup form either

`/electronic-signature/`, titled "Free Electronic Signature Software, Simple,
Compliant, and Affordable", is 472 KB and serves zero signup buttons and zero forms.
The only matches for signup wording on the page sit inside customer testimonials.

This is the page most likely to receive generic category traffic, paid or organic.

### 2f. A caution about the ad display paths

SignWell's Google ads show display paths of `signwell.com/esignature` and
`signwell.com/esignature/contracts`. Neither resolves: `/esignature/` returns a 404.
Google Ads display paths are decorative and do not have to match the final URL, so
this proves nothing about where paid traffic actually lands. It does mean nobody can
tell from outside which pages the $20,000 a month points at, which makes it a
question for Henry rather than a finding.

---

## 3. Tracking as deployed

Read from served HTML on the homepage, `/pricing/` and `/demo-request/`.

| Tag | Homepage | Pricing | Demo request |
|---|---|---|---|
| GA4 `G-XSY8RPYZ51` | yes | yes | yes |
| GTM `GTM-MV48XB3B` | yes | yes | yes |
| GTM `GTM-MHKC8Q4` | not seen | not seen | yes, in the noscript iframe |
| Meta pixel | yes | yes | yes |
| HubSpot | yes | yes | **no** |
| Microsoft Clarity | yes | **no** | **no** |
| Hotjar | yes | yes | yes |
| LinkedIn Insight (`snap.licdn`) | not hardcoded | not hardcoded | not hardcoded |
| Microsoft UET (`bat.bing`) | not hardcoded | not hardcoded | not hardcoded |

Jordan observed LinkedIn and Microsoft pixels with Tag Assistant, which fits: they
fire through GTM rather than sitting in the page source.

### 3a. The `ga_client_id` cookie

The homepage and every page checked run this, inline:

```
gtag('config', 'G-XSY8RPYZ51');
// Set ga_client_id cookie
gtag('get', 'G-XSY8RPYZ51', 'client_id', function(clientId) { ... })
document.cookie = 'ga_client_id=' + clientId + '; expires=' + ... + '; path=/; SameSite=Lax';
```

It retries up to ten times at 500ms intervals and sets a two year expiry.

Somebody engineered this deliberately so a backend signup event can be stitched to
the web session that produced it. The question for Henry is where that cookie goes
after signup. If it reaches their database, offline and server side conversion
import is a short job. If it was built and never wired up, that is the single
highest leverage tracking fix available.

### 3b. Hygiene observations

Two GTM containers fire on the demo request page, which risks duplicate tag firing
and double counted conversions. Two session recording tools (Clarity and Hotjar) run
in parallel, with Clarity deployed inconsistently. HubSpot loads on the homepage and
pricing but not on the demo request page, which is the one page where a sales lead
is created.

---

## 4. Site architecture and SEO

### 4a. robots.txt

```
Sitemap: https://www.signwell.com/sitemap.xml
Sitemap: https://www.signwell.com/resources/sitemap_index.xml
Content-Signal: ai-train=yes, search=yes, ai-input=yes
User-agent: *
Disallow: /app/*  /sign_in/*  /docs/*  /signed/*  /completed_docs/*
Disallow: /completed_documents/*  /d/*  /new_doc/*
```

They have explicitly opted into AI training, AI search and AI input.

### 4b. Sitemap composition

Main sitemap: 102 URLs.

| Group | Count | Note |
|---|---|---|
| Contract templates under `/contracts/` | 41 | Last modified July 2021. Five years untouched |
| Industry pages | 11 | accounting, education, finance and banking, healthcare, HR and payroll, insurance and risk management, legal and compliance, manufacturing and supply chain, nonprofits, real estate and property management, technology and SaaS |
| Comparison pages | 7 | DocuSign, HelloSign, Adobe Sign, SignNow, DocHub, Signable, Formstack Sign |
| Integration pages | 7 | Clio, Close, QuickBooks, Xero, Jack Henry, Mambu, MCP |
| Customer stories | 14 | Including EXIT Realty, Cornell CTA, Evoke Health, Compliable, Offerwell, Pactly |
| Free tools | 4 | `/online-signature/`, `/sign-pdf/`, `/sign-documents-online/`, `/contracts/` |

Resources sitemap: 212 blog posts, most recent 28 August 2026, plus 15 case studies,
ebooks and webinars. The blog is actively maintained. The contract templates are not.

A malformed URL exists at `/industries/industries/`.

### 4c. On page

Homepage title: "Electronic Signature Software - SignWell". Meta description: "Get
your documents signed 40% faster with zero-setup electronic signatures. SignWell
helps you cut turnaround time and makes it easy for everyone to electronically sign
your documents."

Homepage weight: 169 KB of HTML, served in 1.94 seconds on this connection. The
industry and free tool pages are heavier, up to 309 KB on `/pricing/`.

### 4d. Schema markup

Homepage JSON-LD declares Organization, WebSite, WebPage, Person, PostalAddress,
ContactPoint and DefinedTerm.

Absent: SoftwareApplication, Product, Offer, FAQPage and AggregateRating. They hold
a 4.9 Capterra rating and a 4.8 G2 score and mark up neither, which forfeits review
rich results on the pages most likely to win them.

### 4e. Answer engine and generative engine optimization

Already in place, and ahead of most companies this size:

- `Content-Signal: ai-train=yes, search=yes, ai-input=yes` in robots.txt.
- Deep links on the homepage and comparison pages that fire a pre written evaluation
  prompt into Perplexity and Google AI Mode (`google.com/search?udm=50`). The prompt
  reads: "I'm evaluating eSignature platforms and want to know what makes SignWell a
  strong choice, and what differentiates it from alternatives. Summarize the
  highlights from SignWell's website, signwell.com."
- OpenAI, Gemini, Grok and Perplexity logos rendered on the homepage.
- An `/mcp/` page for signing documents from inside an AI chat, linked three times
  from the homepage and from comparison pages.

The gap is structured data, not intent. Their content is written to be cited and
their markup does not help a machine parse it.

---

## 5. Company and competitive facts

| Fact | Value | Source |
|---|---|---|
| Founded | 2019 by Ruben Gamez | signwell.com/about |
| Legal entity | Docsketch LLC, doing business as SignWell | signwell.com/about |
| Address | 12042 SE Sunnyside Rd, Suite 546, Portland, OR 97015 | signwell.com/about |
| Headcount | 17, growing 36.4% year over year as of March 2026 | Crustdata |
| Revenue | Roughly $5M ARR on a 2024 snapshot. **Unconfirmed, do not repeat as fact** | Latka |
| Customers claimed | 65,000 plus businesses, 20 million plus documents | signwell.com |
| Ratings | 4.9 Capterra, 4.8 G2 | signwell.com |
| Social | LinkedIn, X (@SignWellApp), Instagram (@signwell_official), Facebook (SignWellApp). No TikTok, no YouTube | page source |

### 5a. Competitor pricing

| Competitor | Entry price | Note |
|---|---|---|
| DocuSign | $15 to $40 per user monthly | Plus per envelope fees. No ongoing free plan |
| Dropbox Sign | $20 monthly | 30 day trial, no ongoing free plan |
| PandaDoc | Free plan with unlimited sending | Stronger free tier than DocuSign |
| SignNow | $8 per user monthly | Site License bills per signature invite rather than per user |
| SignWell | $10 to $12 per user monthly | Free plan at 3 documents a month |

### 5b. SignWell's own competitive argument

From `/docusign-alternative/`: DocuSign has "grown larger, less agile, and less
affordable" and uses "aggressive pricing strategies that often take DocuSign
customers by surprise". The page cites Capterra likelihood to recommend at 92.5%
against DocuSign's 87.5%, and G2 meets requirements at 9.4 against 9.1. It claims
contracts are signed 60% faster than traditional methods, while the homepage claims
40% faster. Those two numbers disagree and are worth asking about.

### 5c. Market sizing

Published forecasts disagree so widely that no single figure is defensible. The deck
shows the range and names the sources rather than picking one.

| Source | 2026 market size | CAGR |
|---|---|---|
| Straits Research | $8.49B | 29.18% |
| Coherent Market Insights | $13.01B | 33.7% |
| Research and Markets | $13.09B | 19.9% |
| Fortune Business Insights | $13.70B | 35.40% |
| Mordor Intelligence | $16.83B | 22.90% |

The one point every report agrees on: software and apps hold roughly 81% of the
market, and the growth driver is regulatory compliance plus auditable transactions.

---

## 6. The ad libraries

Captured by Jordan on 13 September 2026 from the public ad libraries. Counts are the
libraries' own approximations.

### 6a. Meta Ad Library, active ads

| Brand | Active ads | What they are selling |
|---|---|---|
| SignWell | **0** | Nothing running |
| DocuSign | ~360 | Agreement AI, research reports, virtual events. Regional pages for Australia, Brazil, France, Mexico and South Korea. Running since 1 April 2026 on Facebook, Instagram, Threads and Messenger |
| PandaDoc | ~120 | "Agreement intelligence" aimed at revenue teams. Almost every ad started on 14 August 2026, so this is one coordinated campaign about a month old |
| SignNow | **0** | Nothing running |
| Dropbox Sign | **0** | Nothing running |

DocuSign's Meta copy, verbatim: "Leading research reveals a critical connection
between trust and end-to-end agreement solutions." "While most people see a signature
as an end. We're here to show you that it's just the beginning of a vault of customer
value." "Join industry leaders by managing contracts the smart way. Meet the
AI-powered platform turning hours of work into seconds." Landing on
docusign.com/IAM, with buttons reading Download, Sign up, See details and Learn More.

PandaDoc's Meta copy, verbatim: "Deal sign-off, already handled." "EOQ renewals,
already handled." "Upcoming commitments, already handled." "Every bad handoff is a
churn risk." All built on one template and aimed at sales operations.

**The read.** Neither of the two brands on Meta is selling signing to a small
business. DocuSign is selling an enterprise AI platform and PandaDoc is selling
revenue operations software. The simple message, sign a document today for less than
DocuSign charges, is uncontested on Meta.

### 6b. Google Ads Transparency Center

| Brand | Ads running | Angles |
|---|---|---|
| **SignWell** | **22** | "No Account Needed to Sign, Free and Takes Under a Minute." "eSign API, Start for Free, Clean Docs. Simple Setup." "Sign Contracts Online, Sign. Send. Done." Plus a branded login ad |
| DocuSign | ~3,000 | Heavy on the word free despite having no free plan: "Free E-sign Online, Docusign for free", "Kostenlose Signaturen online", "Signature Electronique n 1". Plus "Enjoy a 30-Day Free Trial, Save an Average of $36 Per Document Compared to Paper Processes" |
| PandaDoc | ~3,000 | "Grow Faster with PandaDoc." "Make a Switch to PandaDoc, Trusted by 40,000 Businesses." "PandaDoc Quote Software." Request a demo |
| SignNow | ~20,000 | Country by country at scale: "Legal eSignatures in India", "Legal eSignatures in Australia". Plus "No per envelope pricing. No hidden costs." Run by airSlate, Inc. |

SignWell's API copy is the strongest thing in this set: "Integrate document signing
in a few lines of code. Full sandbox access, no card needed. Integrate document
signing in days, not months. No bloated SDK, just clean." Sitelinks include Pricing,
No Card Required, Sign and Send via API Today, Start Free Trial and Compare Plans.

**The read.** Twenty two ads against three thousand and twenty thousand. At $20,000 a
month that is not enough creative surface area to learn which message works. And
DocuSign is bidding the word free in five languages while SignWell owns an actual
free plan and does not defend the word.

### 6c. LinkedIn Ad Library

SignNow runs 52 ads, every one of them a customer story about replacing DocuSign in a
single regulated vertical. Verbatim: "We were looking for a replacement for
DocuSign. What Ora Clinical needed instead: Part 11 compliance, a real audit trail."
"Why Ora Clinical replaced DocuSign for clinical trials." "150 people at one CRO, one
searchable audit trail." "How a 600-person CRO keeps every trial signature Part 11
ready."

**The read.** This is the exact play SignWell is best positioned to run and does not.
SignWell has compliance on every plan including free, and 14 published customer
stories, and none of it appears in paid media.

### 6d. TikTok

No SignWell ads and no competitor ads. Confirmed by Jordan. The category does not use
the platform.

---

## 7. Still unverified

These go into the deck as questions, never as claims.

- Which pages the $20,000 a month actually lands on. The Google ad display paths
  (`/esignature`, `/esignature/contracts`) do not resolve and are decorative.
- LinkedIn ad counts for SignWell, DocuSign, PandaDoc and Dropbox Sign. Only SignNow
  was captured.
- The demo request form fields. The form is JavaScript rendered and absent from
  the HTML.
- Whether the comparison pages inject a signup CTA with JavaScript. The homepage and
  two tool pages carry theirs server side, so the absence elsewhere looks real, and
  Jordan confirmed `/docusign-alternative/` visually.
- Organic traffic volume, keyword rankings and backlink profile. No Ahrefs or
  Semrush access.
- Which queries they actually buy, and at what cost.
- Everything behind the app login, including activation and upgrade flows.
