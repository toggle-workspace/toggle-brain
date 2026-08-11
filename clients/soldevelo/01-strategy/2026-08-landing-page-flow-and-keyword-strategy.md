# SolDevelo: landing page flow and differentiator keyword strategy

**Date:** 2026-08-11
**Author:** Jordan Pinto
**Delivers:** two action items from the 2026-08-05 monthly report call, recorded in `../05-meetings/2026-08-05-monthly-report.md`
**Companion artifact:** `SolDevelo x Toggle - Landing Page Flow and Keyword Strategy (Aug 2026).pptx`, 25 slides, built from this document
**Scope guard:** everything here concerns QAlity Plus for Jira. Nothing points at SolDevelo's custom software development services.

---

## 1. The problem

Two of the three campaigns running in July earn clicks and lose the visit.

| Campaign | July read | Diagnosis |
|---|---|---|
| Jira Test Management | Highest spend, most conversions, healthiest CPA | Working. Already pointed at a page that can close. |
| Agile / Jira QA | Best ad engagement of the three, near-zero conversions | Informational intent meeting a marketplace listing. |
| Jira Test Case | 10% CTR, above benchmark, worst converter, high CPA | Two intents sharing one campaign and one destination. |

The conversion drop from 30 in June to 9 in July is a separate matter and not a performance problem. It came from excluding generic terms, pausing low-quality keywords, an ads refresh that reset learning, and a daily budget cut that took cost down about 42%.

**The thesis:** send every ad to the page that answers it, rather than to the marketplace listing. A 10% CTR on the worst converting campaign is the account telling us the ads work and the destinations do not.

---

## 2. The intent ladder

Intent decides the destination and the order of the two asks. This is the two-CTA proposal Jordan made on 2026-08-05, made specific.

| Tier | Intent | Example query | Destination | Leads with | Then |
|---|---|---|---|---|---|
| 1 | Transactional | "jira test management app" | Marketplace listing | Install free | Book a demo |
| 2 | Commercial investigation | "best test management tool for jira" | Comparison and choice pages | Book a demo | Try free |
| 3 | Informational | "how to manage QA in jira" | QA process pages | Try free | Book a demo |

The demo leads on Tier 2 because a comparison shopper has questions a blog post cannot answer. The free tier leads on Tier 3 because a reader months from a decision will not book a sales call. Both CTAs appear on every page; only the order changes. The order is a hypothesis worth testing after one clean month of data. The two-path structure is not.

---

## 3. Content estate audit

Audited 2026-08-11 against soldevelo.com. All nine URLs verified HTTP 200.

| Page | Published | Tier | Ready to take a paid click? |
|---|---|---|---|
| [QAlity Plus product page](https://soldevelo.com/our-products/qality-plus-test-management-for-jira/) | Live | 1 | Ready. Both "Try QAlity Plus" and "Book a demo" present. |
| [What Teams Miss (Jira QA workflow)](https://soldevelo.com/blog/what-teams-miss-when-they-try-to-manage-their-jira-qa-workflow-using-native-tools-alone/) | Apr 2026 | 3 | Needs a hero CTA |
| [Maximizing ROI with Structured Jira Test Case Management](https://soldevelo.com/blog/maximizing-roi-with-structured-jira-test-case-management/) | Apr 2026 | 2 | Needs a hero CTA |
| [The Real Costs of Tests as Jira Issues vs Separate Test Storage](https://soldevelo.com/blog/the-real-costs-of-tests-as-jira-issues-vs-separate-test-storage-how-architecture-impacts-shift-left-adoption-speed/) | Apr 2026 | 3 | Bench |
| [How to Choose the Right Jira Test Management Tool](https://soldevelo.com/blog/how-to-choose-the-right-jira-test-management-tool-for-visibility-speed-and-adoption/) | Mar 2026 | 2 | Needs a hero CTA |
| [Why Jira Teams Struggle with Test Visibility](https://soldevelo.com/blog/test-management-for-jira-why-visibility-is-a-shift-left-must/) | Mar 2026 | 3 | Bench |
| [How to Build Transparency Into Your Testing Process](https://soldevelo.com/blog/how-to-build-transparency-into-your-testing-process/) | Jun 2025 | 3 | Bench |
| [How to Use Jira for Testing](https://soldevelo.com/blog/how-to-become-a-pro-tester-in-jira/) | Oct 2023 | 3 | Hero CTA and a content refresh |
| [QAlity Plus vs Xray vs Zephyr Squad](https://soldevelo.com/blog/testing-apps-for-jira-qality-plus-vs-xray-vs-zephyr-squad/) | Aug 2023 | 2 | Rebuild before it takes traffic |

**The finding that shapes everything below:** only the product page is conversion-ready. Every blog page carries soft mid-content text links, a generic "Get in touch" button, or a newsletter prompt. None has a hero CTA and none has a demo path. There is also no `/resources` hub yet, which is what the Pillar Page #1 dropdown creates.

---

## 4. Landing page assignments

### LP1: What Teams Miss (Jira QA workflow)

The page Sebastian described on the call. Roughly 2,900 words, carrying a "Jira alone vs Jira plus a tool" decision framework and a comparison table.

- **Keywords:** jira qa workflow · qa process in jira · managing qa in jira · jira for qa teams · agile qa process · jira native testing limits
- **CTAs:** Try free leads, Book a demo follows
- **Needs:** a hero CTA band above the fold; one mid-scroll CTA at the "Bridging the Gap" section where the article names the problem; paid UTM tags on the two existing marketplace links

### LP2: How to Use Jira for Testing

The most valuable page for this strategy and the one in the worst shape. It carries its own subsections on the Execution History page and on auto-filled bug data, which makes it the natural home for differentiator groups A and C.

- **Keywords:** how to use jira for testing · testing in jira · jira for test management · jira testing workflow · test management in jira
- **CTAs:** Try free leads, Book a demo follows
- **Needs:** a content refresh, since October 2023 predates the current feature set; a slug change with a 301 redirect, because the URL says "become-a-pro-tester" while the H1 says "How to Use Jira for Testing"; a hero CTA band
- **Do the refresh before the differentiator campaigns launch.** This page is their destination.

### LP3: How to Choose the Right Jira Test Management Tool

Commercial investigation intent, published March 2026, in good shape. Only needs the CTA layer.

- **Keywords:** best jira test management tool · test management app for jira · jira test management tools · choosing a test management tool · test management plugin for jira
- **CTAs:** Book a demo leads, Try free follows
- **Needs:** a hero CTA with the demo as primary; an anchor link to the selection criteria so the ad's headline promise appears above the fold; paid UTM tags

### LP4: Maximizing ROI with Structured Jira Test Case Management

The salvage destination for the rescoped test case group. See section 5.

- **Keywords:** jira test case management · test case repository jira · organize test cases in jira · test case folders jira · test case management tool
- **CTAs:** Book a demo leads, Try free follows
- **Needs:** a hero CTA band

### LP5: QAlity Plus vs Xray vs Zephyr Squad

The highest commercial intent page on the site and the only home for conquest keywords. **Recommend holding the conquest keywords until this is rebuilt.**

- **Keywords:** xray alternative · zephyr squad alternative · xray vs qality plus · zephyr alternative for jira · jira test management comparison
- **CTAs:** Book a demo leads, Try free follows
- **Three problems:**
  1. Published August 2023 and quotes 2023 cloud pricing for all three tools. A shortlisting buyer will check it.
  2. It links out to the Xray and Zephyr marketplace listings, so paid clicks leave for competitors.
  3. No demo path at all.

### Bench

Three pages available if more routes are needed later: Why Jira Teams Struggle with Test Visibility, The Real Costs of Tests as Jira Issues, and How to Build Transparency Into Your Testing Process.

---

## 5. The test case group: a partial save

Sebastian flagged the "test cases" keywords for dropping. He is right about half of them.

**Cut, and add as negatives.** Searchers wanting AI generated test cases cannot convert, because QAlity Plus does not generate test cases: ai test case generation · ai generated test cases · generate test cases with ai · automatic test case generation · test case generator

**Keep, and route to LP4.** Managing, organizing and storing test cases is a different search from generating them: jira test case management · test case repository jira · organize test cases in jira · test case folders jira · test case management tool

**The receipt:** this group ran a 10% CTR in July, above benchmark, while converting worst of the three. The pull is real. The destination was wrong. If SolDevelo still wants the whole group paused, agree, and fold the salvaged terms into the Differentiators campaign later rather than arguing it twice.

---

## 6. The routing map

| Keyword group | Campaign | Landing page | Leads with | Then |
|---|---|---|---|---|
| Jira test management (core) | Jira Test Management | Product page | Install free | Book a demo |
| Jira QA workflow, QA process | Agile / Jira QA | LP1 | Try free | Book a demo |
| How to use Jira for testing | Agile / Jira QA | LP2 | Try free | Book a demo |
| Best Jira test management tool | Tool Comparison (new) | LP3 | Book a demo | Try free |
| Test case management (kept) | Jira Test Case (rescoped) | LP4 | Book a demo | Try free |
| Xray and Zephyr alternatives | Conquest (on hold) | LP5 | Book a demo | Try free |
| Differentiator groups A, B, C | Differentiators (new) | LP2 + product page | Try free | Book a demo |

Three campaigns become five. Two are new, one gets rescoped, and one waits on the LP5 rebuild.

---

## 7. The conversion layer

Five changes, none of which requires a new page.

1. **A hero CTA band above the fold**, carrying both paths side by side. Order follows the intent tier.
2. **One mid-scroll CTA**, placed where the article names the problem the product solves, not at the bottom where readers have already left.
3. **Competitor marketplace links removed from LP5.**
4. **A consistent UTM scheme** on every marketplace link, so GA4 can follow a paid click through the blog to the listing.
5. **The Resources dropdown published.** Blocked on Pillar Page #1 going live, which is blocked on Ewa's review.

### UTM convention

| Parameter | Value |
|---|---|
| `utm_source` | `google` |
| `utm_medium` | `cpc` |
| `utm_campaign` | The campaign name, for example `jira-qa-workflow` |
| `utm_content` | The landing page reference, for example `lp1-qa-workflow` |
| `utm_term` | The matched keyword |

Keep `utm_campaign` identical to the Google Ads campaign name. Do not paraphrase.

### The measurement chain

Paid click, then blog landing page, then marketplace listing, then evaluation ID in GA4, then a retargeting audience.

**What we cannot see yet:** most traffic still lands under direct and referral, and privacy consent limits GA4 capture. Organic and paid search are not separating. SolDevelo's cross-check of evaluation IDs against their internal evaluation report tells us how much of this path we can trust. Do not oversell the retargeting until that comes back.

---

## 8. Differentiator keyword research

Ewa and Sebastian named three things QAlity Plus does that competitors do not. Each becomes a keyword group. 14 candidates per group, deliberately over-supplied so each can be cut to a clean 10 once Google Ads Keyword Planner returns the zero-volume terms.

**No search volume, bid or competition figures appear anywhere in this document or the deck.** Those columns ship blank on purpose, for Jordan to fill from Keyword Planner. An estimate presented in a client deck reads as data.

### Group A: execution history

The execution page carries the full history of previous runs beside the current test. Destination: LP2 and the product page execution section.

test execution history · jira test execution history · test run history · test execution report jira · test execution tracking · track test execution jira · test execution status jira · test execution log · historical test results · test cycle history jira · test execution dashboard jira · previous test run results · test execution audit trail · test execution report tool

### Group B: unresolved bug surfacing

Re-execution surfaces the bugs still open, so testers stop re-reporting known issues. Destination: LP1 and LP2.

duplicate bug reports · avoid duplicate bug reports · known issues tracking · unresolved bugs jira · open defect tracking · defect management jira · link bugs to test cases · bug traceability jira · bug traceability matrix · defect tracking tool jira · regression defect tracking · known defects list · bug deduplication tool · requirements traceability jira

### Group C: auto-filled bug descriptions

A bug created from a failed step arrives with its description and repro steps already written. Destination: LP2, and Pillar Page #2 once it exists.

bug report template · bug report template jira · how to write a bug report · automated bug reporting · bug reporting tool jira · create bug from test case · steps to reproduce template · bug report generator · defect report template · jira bug report automation · auto create bug from failed test · bug reproduction steps template · bug report format · bug reporting best practices

### Pull method

Google Ads, Tools, Keyword Planner, "Get search volume and forecasts". Location set to the current performing markets (US, France, Canada), language English, last 12 months. Fill volume, top of page bid low, top of page bid high and competition per row. Then cut the four weakest terms per group.

### The expected read

- **Bid on:** terms carrying a jira, tool, app or plugin qualifier. The qualifier is the buying signal that separates a tester shopping for software from a student reading about testing. Groups A and B hold most of these.
- **Exclude:** template, format, example and how-to-write terms. They carry most of the volume in Group C, and the searcher wants a document to copy rather than an app to install.
- **Turn into ad copy:** the differentiator language itself. Nobody types "unresolved bugs surfaced during re-execution", and every tester recognizes the problem when an ad names it.

Group C will split hardest. Expect two or three bid-worthy terms out of fourteen. The 2026-08-05 call agreed this outcome in advance: if no viable keywords exist, the insights shape messaging direction instead.

---

## 9. Ad copy direction

Responsive search ad assets built from the differentiators. All headlines are within the 30 character limit and all descriptions within 90, verified at build time.

### Group A: execution history

| Headline | Chars |
|---|---|
| See Every Past Test Run | 23 |
| Test History, Inline In Jira | 28 |
| Stop Guessing What You Tested | 29 |
| Full Run History Per Test | 25 |

Description: "Execute tests in Jira and see every previous run beside the current one. Free to try."

### Group B: unresolved bug surfacing

| Headline | Chars |
|---|---|
| Stop Re-Reporting Known Bugs | 28 |
| Open Bugs Surface On Retest | 27 |
| Never File A Duplicate Again | 28 |
| See Which Bugs Are Still Open | 29 |

Description: "Re-execution shows the bugs still open, so your testers stop filing the same one twice."

### Group C: auto-filled bug descriptions

| Headline | Chars |
|---|---|
| Bug Reports Write Themselves | 28 |
| Repro Steps Filled In For You | 29 |
| One Click From Fail To Bug | 26 |
| No More Blank Bug Tickets | 25 |

Description: "A failed step becomes a bug report with the description and repro steps already written."

Ask Ewa or Sebastian to veto anything that overstates what the product does. Better before launch than after a support ticket. Load a minimum of 8 headlines and 3 descriptions per ad group for RSA asset coverage.

---

## 10. Negatives

Apply as a shared negative keyword list in Google Ads so it propagates across campaigns automatically.

**The AI test case cluster.** The mismatch Sebastian identified: ai test case generation · ai generated test cases · generate test cases with ai · chatgpt test cases · test case generator ai · automatic test case generation

**Free and open source seekers.** A free QAlity tier exists, but these searchers rarely upgrade and the click costs the same as a paying prospect: free test management tool · open source test management · free jira plugin · testlink · test management excel template

**Wrong audience.** Career and training traffic follows QA keywords everywhere: qa jobs · qa course · qa certification · tester salary · how to become a qa · qa interview questions

Already excluded in July: "jira for free", "jira login", and the generic Jira navigation terms.

---

## 11. Content gaps

Groups B and C have no dedicated destination and currently share LP2.

**Pillar Page #2: bug reporting quality in Jira.** What a bug report needs before a developer can act on it, how to stop duplicate reports when the same defect keeps failing, and linking a bug to the test step that found it. Houses groups B and C.

**Pillar Page #3: test execution reporting and history.** How to read execution history across a release, what a test execution report should show a delivery lead, and auditing what was tested, skipped and risky before shipping. Houses group A, which today lives in one subsection of a 2023 post.

Publish Pillar Page #1 first. The Resources dropdown cannot be built until it is live, and every landing page above wants that dropdown as its next step.

---

## 12. Next steps

| Action | Owner | By when |
|---|---|---|
| Publish Pillar Page #1, then build the Resources dropdown | SolDevelo | Once Ewa signs off |
| Pull volume and bid data for the 42 candidate keywords | Toggle | Within one week |
| Add the hero CTA band to LP1, LP2, LP3 and LP4 | SolDevelo | Before the new campaigns launch |
| Refresh LP5 and remove the competitor marketplace links | SolDevelo | Before conquest goes live |
| Rescope the Jira Test Case campaign, add the negatives | Toggle | This week |
| Build the Differentiators campaign on surviving keywords | Toggle | After the data pull |
| Cross-check GA4 evaluation IDs against the internal report | SolDevelo | Open since 2026-08-05 |

**Budget holds at current levels until the hero CTAs are live on LP1 through LP4.** That is the gate agreed on 2026-08-05.

---

## Open question carried forward

Whether the SolDevelo team has insight into how the Atlassian "similar apps" tab affects them or other marketplace partners. On the 2026-08-05 agenda, unanswered in the notes. Re-ask.
