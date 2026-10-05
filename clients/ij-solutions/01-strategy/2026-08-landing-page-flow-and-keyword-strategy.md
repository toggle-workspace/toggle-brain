# IJ Solutions: landing page flow and keyword strategy

**Date:** 2026-08-12
**Status:** DRAFT, pending Jonas's approval. Keyword volume and bid data is pulled after approval, not before.
**Author:** Jordan Pinto
**Delivers:** the landing page action item from the 2026-08-06 monthly report call, recorded in `../05-meetings/2026-08-06-july-monthly-report.md`
**Companion artifact:** `ij-solutions x Toggle - Landing Page Flow and Keyword Strategy (Aug 2026).pptx`, 19 slides, on Jordan's Desktop
**Scope guard:** everything here concerns Epic Clone for Jira. Nothing points at Project Milestones, User Absence Planner or the consulting side.

---

## 1. The problem

The demo campaign earns attention and loses the visit.

| Signal | July read |
|---|---|
| Demo campaign click-through rate | 0.99%, below the product keywords |
| Demo campaign conversions | Zero |
| Demo page engagement | Visitors staying 30 seconds or more, so the page is being read |
| Initial campaign trend | Conversions, CPA and conversion rate all worse from June to July, with CPC rising |

The June to July decline is a market-wide shift rather than an account fault. The same pattern shows across our other Atlassian partners, driven by more partners bidding the Jira and Confluence keyword space.

**The thesis, and the deck's one strikethrough:** ~~send every click to the marketplace listing~~ send every click to the page that answers it.

Someone searching how to duplicate a Jira project structure is not ready for a marketplace listing. IJ Solutions has already published the pages that answer those searches, so this is a routing job rather than a content job.

---

## 2. The intent ladder

| Tier | Intent | Example query | Destination | Leads with | Then |
|---|---|---|---|---|---|
| 1 | Transactional | "epic clone for jira" | Marketplace listing | Try for free | Install |
| 2 | Commercial investigation | "native jira clone limitations" | Comparison page, demo page | Book a demo | Try for free |
| 3 | Informational | "how to duplicate a jira project" | Blog pages LP1, LP2, LP3 | Try for free | Book a demo |

The demo leads on Tier 2 because someone comparing an app against native Jira has questions a blog post cannot answer. The free trial leads on Tier 3 because a reader still learning the problem will not book a sales call. Both CTAs appear on every page, and only the order changes.

**CTA wording is locked as "Try for free" and "Book a demo".** Use those exact strings in ad copy, on-page buttons and future decks.

---

## 3. Content estate audit

Audited 2026-08-12. All 12 URLs verified HTTP 200.

| Page | Published | Tier | Ready to take a paid click? |
|---|---|---|---|
| [Epic Clone product page](https://ij-solutions.com/epic-clone/) | Live | 1 | Ready. Both CTAs present. |
| [Epic Clone vs. Native Jira Cloning](https://ij-solutions.com/native-jira-cloning-vs-epic-clone/) | Live | 2 | Ready. Hero CTA and comparison table in place. |
| [Epic Clone demo page](https://ij-solutions.com/epic-clone-demo/) | Live | 2 | Ready. Enterprise logos and two booking paths. |
| [Stop Rebuilding the Same Jira Project Structure Every Time](https://ij-solutions.com/stop-rebuilding-the-same-jira-project-structure-every-time/) | Jul 2026 | 3 | Needs a hero CTA |
| [When Jira Automation Isn't Enough](https://ij-solutions.com/jira-automation-overload-when-to-use-apps/) | Mar 2026 | 2 | Needs a hero CTA |
| [How to Avoid Jira Bulk Clone Errors](https://ij-solutions.com/avoid-jira-bulk-clone-errors-and-preserve-issue-relationships/) | Feb 2026 | 3 | Needs a hero CTA and more depth |
| [Jira Template: Reusable Templates](https://ij-solutions.com/supercharge-your-jira-project-workflow-with-reusable-templates/) | Sep 2025 | 3 | Needs a hero CTA |
| Atlassian Marketplace listing (`marketplace.atlassian.com/apps/1222030`) | Live | 1 | Ready |

Three destinations are ready today. Four blog pages need a CTA layer first. No blog post carries a hero CTA above the fold: every one places a single CTA at the conclusion, and each page words it differently.

**Benched, with the reason stated on the deck slide:**

- [Scaling Jira Without Chaos](https://ij-solutions.com/scaling-jira-without-chaos/), Oct 2025. Enterprise bulk cloning, roughly 1,040 words. Hold for an enterprise push, where it pairs with the demo page's enterprise logos.
- The [JQL](https://ij-solutions.com/bulk-cloning-via-jql-in-epic-clone/), REST API and background cloning posts. Feature announcements, too narrow for paid.
- [Using Jira for Project Management](https://ij-solutions.com/using-jira-for-project-management/), Sep 2025. Too broad, and its keywords belong on the negative list.
- The IT service request post. A different product motion.

---

## 4. Landing page assignments

### LP1: Stop Rebuilding the Same Jira Project Structure Every Time

Roughly 1,400 words, published July 2026. It names the frustration behind the template keywords, walks through building a reusable structure in five steps, then explains keeping the full hierarchy intact. The strongest page in the estate.

- **Keywords to target:** jira project template · recreate jira project structure · duplicate jira project structure · standardize jira project setup
- **CTAs:** Try for free leads, Book a demo follows
- **Needs:** a hero CTA band above the fold; one mid-scroll CTA at the hierarchy section, where the article names the problem the product solves; the closing demo link points at a personal booking page, so route it to the demo page

### LP2: Jira Template: Supercharge Your Project Workflow with Reusable Templates

Roughly 970 words, carrying a Jira templates versus Epic Clone decision matrix. That matrix is why it takes the definitional searches: a reader asking what a Jira template is gets a straight answer and a reason to keep reading.

- **Keywords to target:** jira template · jira issue template · jira epic template (live in the account) · create template in jira
- **CTAs:** Try for free leads, Book a demo follows
- **Needs:** a hero CTA band above the fold; one mid-scroll CTA where native templates hit their limits; paid UTM tags on the marketplace link

**Cannibalization guard.** LP1 and LP2 both speak to templates. LP2 takes the definitional head terms, LP1 takes the repeated-rebuild pain and the standardize-across-teams queries. Without that split they compete in the same auction.

### LP3: How to Avoid Jira Bulk Clone Errors and Preserve Issue Relationships

The natural destination for the bulk clone keywords already running, and at roughly 585 words the shortest page in the estate. The structure is right: native limits, the common problems, then why the usual workarounds do not scale.

- **Keywords to target:** bulk clone in jira (live) · jira clone and issue (live, top converter) · jira issue clone (live) · clone jira epic with stories · preserve issue links when cloning
- **CTAs:** Try for free leads, Book a demo follows
- **Needs:** more depth before it takes paid spend, since 585 words is thin for the page receiving the account's best keywords; a hero CTA band; one mid-scroll CTA after the workarounds section
- **Expand this page before pointing the bulk clone keywords at it.** It is the highest value content job in this plan.

### LP4: Epic Clone vs. Native Jira Cloning

Roughly 1,200 words with an eight row comparison table, three marketplace testimonials and a hero CTA already in place. A reader weighing an app against native Jira can check every claim in one screen, which is why it earns the demo first.

- **Keywords to target:** jira clone app · jira cloning plugin · native jira clone limitations · jira clone alternative
- **CTAs:** Book a demo leads, Try for free follows
- **Needs:** the demo link points at a personal booking page, so route it to the demo page; paid UTM tags on both CTAs; competitor names stay off the page until we agree a conquest position

### LP5: When Jira Automation Isn't Enough

Roughly 1,250 words with an FAQ block and an automation versus apps comparison. It reaches a reader who has already built Jira automation rules and hit their limits, which is a warmer start than someone still learning what cloning is.

- **Keywords to target:** jira automation limitations · jira automation vs app · when to use a jira app instead of automation
- **CTAs:** Book a demo leads, Try for free follows
- **Needs:** a hero CTA band above the fold; one mid-scroll CTA at the section on what Epic Clone does that automation cannot; the FAQ block is worth marking up as FAQ schema for organic pickup
- This keyword group is new to the account. Start it small and let the data decide.

---

## 5. The routing map

| Keyword group | Ad group | Landing page | Leads with | Then |
|---|---|---|---|---|
| Project template and structure | Jira Template | LP1 | Try for free | Book a demo |
| Jira template head terms | Jira Template | LP2 | Try for free | Book a demo |
| Bulk clone mechanics and errors | Bulk Clone | LP3 | Try for free | Book a demo |
| App evaluation and comparison | Comparison (new) | LP4 | Book a demo | Try for free |
| Automation limits | Automation (new) | LP5 | Book a demo | Try for free |
| Core product terms | Bulk Clone | Marketplace listing | Try for free | Install |

Two live ad groups become four. The two new ones carry commercial intent keywords that have nowhere to land today, and the live ad groups keep the keywords already converting. Search AI Max stays paused, and its budget goes to Bulk Clone and Jira Template.

---

## 6. The "jira clone" problem

The top converting keyword in the account is "jira clone and issue". The bare phrase "jira clone" means something different to a large group of searchers: developers looking for tutorials and code repositories to build a Jira lookalike of their own. They are not evaluating an app and they never will, yet they click the same ads and spend the same budget.

This is a filtering problem, not a bidding problem.

**Negative clusters to apply as a shared list, so one edit covers every campaign:**

- **Developer builds:** jira clone github · build a jira clone · jira clone tutorial · jira clone react
- **Free and open source:** free jira clone plugin · open source jira clone · jira clone free
- **Careers and training:** jira certification · jira training · jira jobs
- **Too broad to convert:** using jira for project management · what is jira

**Conquest terms are named and held.** Searches such as "deep clone for jira alternative" carry real intent, and there is no page built to receive them. They stay on the shelf until LP4 gets a conquest position we are comfortable publishing.

---

## 7. Ad copy direction

A responsive search ad holds up to 15 headlines and 4 descriptions, so the twelve headlines and four descriptions below are a starting set with room to expand. Every headline is within the 30 character limit and every description within 90, verified at build time.

**Templates (LP1, LP2):** Reuse Your Jira Structure · Stop Rebuilding Every Time · Clone A Project In Minutes

Description: "Build a reusable Jira structure once, then clone it whenever a project starts."

**Bulk clone (LP3):** Bulk Clone Without Errors · Keep Every Issue Link · Clone Epics And Subtasks

Description: "Clone epics, stories and subtasks in one pass with parent links and fields kept."

**Comparison (LP4):** More Than Native Cloning · Native Clone Falls Short · Built For Cross-Project Work

Description: "Native Jira cloning stops at one issue. Clone whole hierarchies across projects."

**Automation (LP5):** When Automation Hits Limits · Beyond Jira Automation Rules · Skip The Rule Sprawl

Description: "Automation rules struggle with full hierarchy cloning. Book a demo and compare."

Load at least 8 headlines and 3 descriptions per ad group, and ask IJ Solutions to veto anything that overstates the product.

---

## 8. The conversion layer

1. **A hero CTA band above the fold** on LP1, LP2, LP3 and LP5, carrying both paths side by side. The order follows the intent tier.
2. **One mid-scroll CTA**, placed where the article names the problem the product solves, rather than at the bottom where readers may have already left.
3. **Every demo CTA points at the demo page** instead of a personal booking link, so the demo campaign and the blog pages share one measurable destination.
4. **One consistent UTM scheme** on every marketplace and demo link.
5. **The same two CTA strings everywhere:** "Try for free" and "Book a demo".

### UTM convention

| Parameter | Value |
|---|---|
| `utm_source` | `google` |
| `utm_medium` | `cpc` |
| `utm_campaign` | The campaign name, for example `epic-clone-templates` |
| `utm_content` | The landing page reference, for example `lp1-project-structure` |
| `utm_term` | The matched keyword |

### The measurement chain

A paid click on a keyword group, then the blog page that answers it, then the marketplace listing or the demo page, then the evaluation ID recorded in GA4, then a retargeting audience of high intent visitors.

The Atlassian evaluation ID custom dimension is implemented on every IJ Solutions app property in GA4, so the last two steps are set up rather than proposed. Consent rejection still limits what GA4 can capture, so treat the evaluation ID as a floor and not a full count. Without UTMs on the blog links this traffic reports as direct, and the whole plan looks like it did nothing.

---

## 9. Content gaps

1. **A deeper bulk clone page.** LP3 receives the account's best keywords at roughly 585 words. Expanding it is the only gap holding paid spend back.
2. **A conquest comparison page.** Searches for alternatives to competing clone apps carry real buying intent and have nowhere to land. Those keywords stay on the shelf until a page exists that IJ Solutions is comfortable publishing.
3. **A template gallery or examples page.** The template keywords are the largest group in this plan. A page showing real project structures would answer them better than prose, and it would give LP1 and LP2 somewhere to send a reader next.

The first gap is a rewrite of a page that exists. The other two are new pages, and neither is urgent.

---

## 10. Next steps

| Action | Owner |
|---|---|
| Add a hero CTA band to LP1, LP2, LP3 and LP5 | IJ Solutions |
| Expand LP3 before it takes paid traffic | IJ Solutions |
| Route every demo CTA to the demo page | IJ Solutions |
| Apply the UTM scheme to every paid destination | Toggle |
| Rebuild the ad groups against the routing map | Toggle |
| Apply the shared negative keyword list | Toggle |
| Pull volume and bid data for the five keyword groups | Toggle |

Three actions sit with IJ Solutions and four with Toggle.

---

## Open items

- **The demo page has a choice problem, and it is not in the deck.** The page offers two competing paths, a 1:1 expert demo and an on-demand video, and its form asks for a Product Interest dropdown that a paid Epic Clone click has already answered. Both are plausible reasons engaged visitors do not convert. This was scoped out of the landing page deck deliberately and belongs to the separate demo page audit action item.
- Blog demo links point at an Outlook booking page for Jonas rather than at `/epic-clone-demo/`, so demo traffic never sees the enterprise logos on that page. Section 8 item 3 fixes this.
- Whether the Project Milestones GA4 property has started recording evaluation ID values. It was empty during the 6 August call because the setup had just been applied.
- Whether IJ Solutions wants to name competitors on LP4. The answer decides whether the conquest keyword group ever launches.
- Contact roles beyond Jonas are unconfirmed. `CLIENT.md` records what the call evidences and nothing more.

## Deck build notes

- 19 slides, built with pptxgenjs to the `clients/toggle/design-system/PROPOSAL-MASTER.md` spec and the icon rules in `ICONOGRAPHY.md`. The build script stays in the scratchpad and is not committed.
- Verified before delivery: all 17 hexes legal, exactly one strikethrough, no em dash in slides or speaker notes, only the two locked CTA strings, no keyword metric columns, all 12 URLs at HTTP 200, and speaker notes on all 19 slides.
- Inter Tight is not installed on the Windows desktop, so PowerPoint substitutes a font locally and metrics shift. It renders correctly in Google Slides.
- The `loop-form` isometric is still a placeholder in `assets/illustrations/`, so the closing slide ships without artwork rather than with placeholder art.
