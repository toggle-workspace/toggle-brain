# SolDevelo: landing page flow and differentiator keyword strategy

**Date:** 2026-08-11
**Status:** FINAL, reconciled to the signed-off 24-slide deck. Jordan confirmed this version on 2026-08-11 after a correction pass. Everything below matches the deck as it stands.
**Author:** Jordan Pinto
**Delivers:** two action items from the 2026-08-05 monthly report call, recorded in `../05-meetings/2026-08-05-monthly-report.md`
**Companion artifact:** `SolDevelo x Toggle - Landing Page Flow and Keyword Strategy (Aug 2026).pptx` and its PDF export, both on Jordan's Desktop
**Scope guard:** everything here concerns QAlity Plus for Jira. Nothing points at SolDevelo's custom software development services.

---

## 1. The problem

Two of the three campaigns running in July earn clicks and lose the visit.

| Campaign | July read | Diagnosis |
|---|---|---|
| Jira Test Management | Highest spend, most conversions, healthiest CPA | Working. Already pointed at a page that can close. |
| Agile / Jira QA | Best ad engagement of the three, near-zero conversions | Informational intent meeting a marketplace listing. |
| Jira Test Case | 10% CTR, above benchmark, worst converter, high CPA | Two intents sharing one campaign and one destination. |

The drop from 30 conversions in June to 9 in July is a separate matter and not a performance problem. It came from excluding generic terms, pausing low-quality keywords, an ads refresh that reset learning, and a daily budget cut that took cost down about 42%.

**The thesis, and the deck's one strikethrough:** ~~send every ad to the marketplace listing~~ send every ad to the page that answers it.

---

## 2. The intent ladder

| Tier | Intent | Example query | Destination | Leads with | Then |
|---|---|---|---|---|---|
| 1 | Transactional | "jira test management app" | Marketplace listing | Try for free | Install / Request App |
| 2 | Commercial investigation | "best test management tool for jira" | Comparison and choice pages | Book a demo | Try for free |
| 3 | Informational | "how to manage QA in jira" | QA process pages | Try for free | Book a demo |

The demo leads on Tier 2 because a comparison shopper has questions a blog post cannot answer. The free tier leads on Tier 3 because a reader months from a decision will not book a sales call. Both CTAs appear on every page; only the order changes.

**CTA wording is locked as "Try for free" and "Book a demo".** Use those exact strings in ad copy, on-page buttons and future decks.

---

## 3. Content estate audit

Audited 2026-08-11. All nine URLs verified HTTP 200.

| Page | Published | Tier | Ready to take a paid click? |
|---|---|---|---|
| [QAlity Plus product page](https://soldevelo.com/our-products/qality-plus-test-management-for-jira/) | Live | 1 | Ready. Both CTAs present. |
| [What Teams Miss (Jira QA workflow)](https://soldevelo.com/blog/what-teams-miss-when-they-try-to-manage-their-jira-qa-workflow-using-native-tools-alone/) | Apr 2026 | 3 | Needs a hero CTA |
| [Maximizing ROI with Test Case Management](https://soldevelo.com/blog/maximizing-roi-with-structured-jira-test-case-management/) | Apr 2026 | 2 | Needs a hero CTA |
| [The Real Costs of Tests as Jira Issues](https://soldevelo.com/blog/the-real-costs-of-tests-as-jira-issues-vs-separate-test-storage-how-architecture-impacts-shift-left-adoption-speed/) | Apr 2026 | 3 | Bench |
| [How to Choose the Right Tool](https://soldevelo.com/blog/how-to-choose-the-right-jira-test-management-tool-for-visibility-speed-and-adoption/) | Mar 2026 | 2 | Needs a hero CTA |
| [Why Jira Teams Struggle with Test Visibility](https://soldevelo.com/blog/test-management-for-jira-why-visibility-is-a-shift-left-must/) | Mar 2026 | 3 | Bench |
| [How to Build Transparency Into Testing](https://soldevelo.com/blog/how-to-build-transparency-into-your-testing-process/) | Jun 2025 | 3 | Bench |
| [How to Use Jira for Testing](https://soldevelo.com/blog/how-to-become-a-pro-tester-in-jira/) | Oct 2023 | 3 | Hero CTA and a content refresh |
| [QAlity Plus vs Xray vs Zephyr Squad](https://soldevelo.com/blog/testing-apps-for-jira-qality-plus-vs-xray-vs-zephyr-squad/) | Aug 2023 | 2 | Rebuild before it takes traffic |

Only the product page is conversion-ready. Every blog page carries soft mid-content text links, a generic "Get in touch" button, or a newsletter prompt. None has a hero CTA and none has a demo path.

---

## 4. Landing page assignments

### LP1: What Teams Miss (Jira QA workflow)

Roughly 2,900 words, carrying a "Jira alone vs Jira plus a tool" decision framework and a comparison table.

- **Keywords to target:** jira qa workflow · qa process in jira · managing qa in jira · jira for qa teams · agile qa process · jira native testing limits
- **CTAs:** Try for free leads, Book a demo follows
- **Needs:** a hero CTA band above the fold; one mid-scroll CTA at the "Bridging the Gap" section; paid UTM tags on the two existing marketplace links

### LP2: How to Use Jira for Testing

The most valuable page for this strategy and the one in the worst shape. Its own subsections cover the Execution History page and auto-filled bug data, making it the home for differentiator groups A and C.

- **Keywords to target:** how to use jira for testing · testing in jira · jira for test management · jira testing workflow · test management in jira
- **CTAs:** Try for free leads, Book a demo follows
- **Needs:** a content refresh (Oct 2023 predates the current feature set); a slug change with a 301 redirect, since the URL says "become-a-pro-tester" while the H1 says "How to Use Jira for Testing"; a hero CTA band
- **Do the refresh before the differentiator campaigns launch.** This page is their destination.

### LP3: How to Choose the Right Jira Test Management Tool

Commercial investigation intent, March 2026, in good shape. Needs only the CTA layer.

- **Keywords to target:** best jira test management tool · test management app for jira · jira test management tools · choosing a test management tool · test management plugin for jira
- **CTAs:** Book a demo leads, Try for free follows
- **Needs:** a hero CTA with the demo as primary; an anchor link to the selection criteria; paid UTM tags

### LP4: Maximizing ROI with Structured Jira Test Case Management

Destination for the rescoped test case group. See section 5.

- **CTAs:** Book a demo leads, Try for free follows
- **Needs:** a hero CTA band

### LP5: QAlity Plus vs Xray vs Zephyr Squad

Highest commercial intent page on the site and the only home for conquest keywords. **Hold the conquest keywords until it is rebuilt.**

- **Keywords to target:** xray alternative · zephyr squad alternative · xray vs qality plus · zephyr alternative for jira · jira test management comparison
- **CTAs:** Book a demo leads, Try for free follows
- **Needs:** refresh the cloud pricing if needed, since it quotes 2023 figures for all three tools; remove the outbound links to the Xray and Zephyr marketplace listings; add a hero CTA, as there is no demo path today

---

## 5. The test case group: a partial save

SolDevelo flagged the "test cases" keywords for dropping. They are right about half.

**Cut, and add as negatives.** QAlity Plus does not generate test cases, so the click cannot convert: ai test case generation · ai generated test cases · generate test cases with ai · automatic test case generation · test case generator

**Keep, and route to LP4.** Managing, organizing and storing test cases is a different search from generating them: jira test case management · test case repository jira · organize test cases in jira · test case folders jira · test case management tool

**The receipt:** a 10% CTR in July, above benchmark, on the worst converting campaign in the account. The pull is real. The destination was wrong.

---

## 6. The routing map

| Keyword group | Campaign | Landing page | Leads with | Then |
|---|---|---|---|---|
| Jira test management (core) | Jira Test Management | Marketplace listing | Try & Buy Clicks | Install |
| Jira QA workflow, QA process | Agile / Jira QA | LP1 | Try for free | Book a demo |
| How to use Jira for testing | Agile / Jira QA | LP2 | Try for free | Book a demo |
| Best Jira test management tool | Tool Comparison (new) | LP3 | Book a demo | Try for free |
| Test case management (kept) | Jira Test Case (rescoped) | LP4 | Book a demo | Try for free |
| Xray and Zephyr alternatives | Conquest (on hold) | LP5 | Book a demo | Try for free |
| Differentiator groups A, B, C | Differentiators (new) | LP2 + product page | Try for free | Book a demo |

Three campaigns become five. Two are new, one gets rescoped, and one waits on the LP5 rebuild.

---

## 7. The conversion layer

1. **A hero CTA band above the fold**, carrying both paths side by side: "Try QAlity Plus for free" and "Book a demo". Order follows the intent tier.
2. **One mid-scroll CTA**, placed where the article names the problem the product solves, not at the bottom where readers may have already left.
3. **Competitor marketplace links removed from LP5.**
4. **A consistent UTM scheme** on every marketplace link.
5. **The Resources dropdown published.** Blocked on Pillar Page #1 going live.

### UTM convention

| Parameter | Value |
|---|---|
| `utm_source` | `google` |
| `utm_medium` | `cpc` |
| `utm_campaign` | The campaign name, for example `jira-qa-workflow` |
| `utm_content` | The landing page reference, for example `lp1-qa-workflow` |
| `utm_term` | The matched keyword |

### The measurement chain

Paid click, then blog landing page, then marketplace listing, then evaluation ID in GA4, then a retargeting audience.

**What we cannot see yet:** most traffic still lands under direct and referral, and privacy consent limits GA4 capture. Organic and paid search are not separating. SolDevelo's cross-check of evaluation IDs against their internal evaluation report tells us how much of this path we can trust. They noted the ID format resembles a license number, so the match should be quick to confirm.

---

## 8. Differentiator keyword research: the results

Ewa and Sebastian named three things QAlity Plus does that competitors do not. Each became a keyword group, pulled through Google Ads Keyword Planner.

**41 keywords pulled across three groups (14 / 13 / 14).** All figures below are Keyword Planner output. **The account reports in PLN**, so every bid is Polish złoty.

**16 of the 41 returned zero volume.** Combined searchable demand across all three groups is roughly **4,010 searches per month**, and it is distributed very unevenly.

### Group A: execution history

The execution page carries the full history of previous runs beside the current test. Destination: LP2 and the product page.

| Keyword | Avg. monthly searches | Bid low | Bid high | Competition |
|---|---|---|---|---|
| test report tool | 70 | PLN 16.40 | PLN 74.53 | Medium |
| jira test execution | 40 | PLN 7.63 | PLN 29.91 | Low |
| create test execution in jira | 10 | N/A | N/A | Low |
| jira execute test case | 10 | N/A | N/A | Medium |
| test execution status jira | 10 | N/A | N/A | Medium |
| test execution log | 10 | N/A | N/A | Low |
| dashboard testing test cases | 10 | N/A | N/A | N/A |
| test management dashboard | 10 | PLN 17.56 | PLN 66.89 | Medium |
| jira test execution dashboard | 10 | N/A | N/A | Low |
| test execution history | 0 | N/A | N/A | N/A |
| jira test execution history | 0 | N/A | N/A | N/A |
| test run history | 0 | N/A | N/A | N/A |
| previous test run results | 0 | N/A | N/A | N/A |
| test execution audit trail | 0 | N/A | N/A | N/A |

**Verdict: the weakest group. About 180 searches per month total.** The literal differentiator language returns nothing. "test execution history", "test run history" and "test execution audit trail" are all zero, which means nobody searches for the feature in the words the product team uses to describe it. What demand exists sits in generic tooling terms ("test report tool", "test management dashboard") where QAlity Plus competes against every reporting tool rather than on its differentiator.

**Recommendation:** do not build a campaign on Group A. Bid only on "jira test execution" (40, Low competition, PLN 7.63 floor) as a cheap Jira-qualified entry, and move the execution-history story into ad copy and into Pillar Page #3.

### Group B: unresolved bug surfacing

Re-execution surfaces the bugs still open, so testers stop re-reporting known issues. Destination: LP1 and LP2.

| Keyword | Avg. monthly searches | Bid low | Bid high | Competition |
|---|---|---|---|---|
| defect tracking tool jira | 1,600 | PLN 9.75 | PLN 56.43 | Low |
| jira for defect tracking | 260 | PLN 9.63 | PLN 45.08 | Low |
| defect management jira | 260 | PLN 9.63 | PLN 45.08 | Low |
| requirements traceability jira | 30 | PLN 31.50 | PLN 40.77 | Medium |
| bug tracking report | 10 | N/A | N/A | Low |
| bug logging in jira | 10 | N/A | N/A | Low |
| jira bug management tool | 10 | N/A | N/A | Low |
| link bugs to test cases | 0 | N/A | N/A | N/A |
| bug traceability jira | 0 | N/A | N/A | N/A |
| bug traceability matrix | 0 | N/A | N/A | N/A |
| regression defect tracking | 0 | N/A | N/A | N/A |
| known defects list | 0 | N/A | N/A | N/A |
| bug deduplication tool | 0 | N/A | N/A | N/A |

**Verdict: the clear winner, and the most important finding in the whole research.** About 2,180 searches per month, and roughly 99% of it sits in four Jira-qualified, buy-intent terms.

**"defect tracking tool jira" is the single best keyword found: 1,600 searches per month, Low competition, a PLN 9.75 floor bid.** High volume with low competition on a tool-qualified term is rare, and it points straight at the QAlity Plus proposition.

Note that "jira for defect tracking" and "defect management jira" return identical figures (260 / PLN 9.63 / PLN 45.08), so Keyword Planner is treating them as close variants of one concept. Bid on one and let the other come in as a close match rather than paying for both.

**Recommendation: build the Differentiators campaign around Group B first.** It is the only group that justifies its own budget on the data.

### Group C: auto-filled bug descriptions

A bug created from a failed step arrives with its description and repro steps written. Destination: LP2, and Pillar Page #2 once it exists.

| Keyword | Avg. monthly searches | Bid low | Bid high | Competition |
|---|---|---|---|---|
| bug report template | 590 | PLN 5.37 | PLN 26.12 | Low |
| bug report format | 390 | PLN 6.14 | PLN 26.05 | Low |
| bug reporting tool jira | 260 | N/A | N/A | Low |
| how to write a bug report | 110 | N/A | N/A | Low |
| jira bug report template | 90 | N/A | N/A | Low |
| defect report template | 90 | PLN 8.84 | PLN 37.82 | Low |
| jira bug report example | 70 | N/A | N/A | Low |
| bug reporting best practices | 40 | PLN 11.17 | PLN 31.48 | Low |
| automated bug reporting | 10 | N/A | N/A | Low |
| create bug from test case | 0 | N/A | N/A | N/A |
| bug report generator | 0 | N/A | N/A | N/A |
| jira bug report automation | 0 | N/A | N/A | N/A |
| auto create bug from failed test | 0 | N/A | N/A | N/A |
| bug reproduction steps template | 0 | N/A | N/A | N/A |

**Verdict: highest raw volume, worst intent match.** About 1,650 searches per month, but roughly 1,180 of that (72%) sits in template-and-format terms: "bug report template" (590), "bug report format" (390), "how to write a bug report" (110), "defect report template" (90). Those searchers want a document to copy, not an app to install. Bidding on them buys traffic that will never convert.

The defensible subset is the Jira-qualified terms, worth about 420 searches per month combined:

- **bug reporting tool jira** (260, Low) is the strongest, because "tool" plus "jira" is a buying signal.
- **jira bug report template** (90) and **jira bug report example** (70) are template-intent but Jira-scoped, so a QAlity Plus page has a genuine chance of answering them.

The zero-volume rows are all the literal product mechanics: "create bug from test case", "auto create bug from failed test", "jira bug report automation". Same pattern as Group A. Nobody searches for the mechanism.

**Recommendation:** bid only on the three Jira-qualified terms. Add "bug report template", "bug report format" and "how to write a bug report" as **negatives**, not targets, despite the volume. Then use the template demand as an organic content play on Pillar Page #2 rather than a paid one.

### The pattern across all three groups

The differentiators are real product advantages and almost nobody searches for them by name. Every group's literal feature language came back at zero. Demand exists one level up, in the category term the feature belongs to: "defect tracking tool jira" rather than "bug deduplication tool", "test report tool" rather than "test execution audit trail".

This is what the 5 August call anticipated: where the volume is not there, the differentiator becomes ad copy instead of a keyword. Group B is the exception that earns paid budget.

**Priority order for the Differentiators campaign:**

1. **Group B**, on its four Jira-qualified terms. This is the campaign.
2. **Group C**, three Jira-qualified terms only, as a small ad group.
3. **Group A**, one keyword ("jira test execution") or nothing at all.

---

## 9. Ad copy direction

Responsive search ad assets built from the differentiators. **A Responsive Search Ad holds up to 15 headlines and 4 descriptions**, so the twelve headlines and three descriptions below are a starting set with room to expand, not the full load. Every headline is within the 30 character limit and every description within 90.

### Group A: execution history

See Every Past Test Run · Test History, Inline In Jira · Stop Guessing What You Tested · Full Run History Per Test

Description: "Execute tests in Jira and see every previous run beside the current one. Free to try."

### Group B: unresolved bug surfacing

Stop Re-Reporting Known Bugs · Open Bugs Surface On Retest · Never File A Duplicate Again · See Which Bugs Are Still Open

Description: "Re-execution shows the bugs still open, so your testers stop filing the same one twice."

### Group C: auto-filled bug descriptions

Bug Reports Write Themselves · Repro Steps Filled In For You · One Click From Fail To Bug · No More Blank Bug Tickets

Description: "A failed step becomes a bug report with the description and repro steps already written."

Since Group A and Group C have almost no biddable volume, their headlines matter more than their keywords. Load them into the Group B ad group as well, so the execution-history and auto-fill stories reach the defect-tracking audience that does search.

Ask Ewa or Sebastian to veto anything that overstates the product. Load a minimum of 8 headlines and 3 descriptions per ad group for RSA asset coverage, and fill toward the 15 and 4 ceiling as more angles get approved.

---

## 10. Negatives

Apply as a shared negative keyword list so it propagates across campaigns.

**The AI test case cluster.** The mismatch SolDevelo raised: ai test case generation · ai generated test cases · generate test cases with ai · chatgpt test cases · test case generator ai · automatic test case generation

**Free and open source seekers.** A free QAlity tier exists, but these searchers rarely upgrade and the click costs full price: free test management tool · open source test management · free jira plugin · testlink · test management excel template

**Wrong audience.** Career and training traffic follows QA keywords everywhere: qa jobs · qa course · qa certification · tester salary · how to become a qa · qa interview questions

**Added after the keyword pull, high volume and wrong intent:** bug report template · bug report format · how to write a bug report · defect report template

Already excluded in July: "jira for free", "jira login", and the generic Jira navigation terms.

---

## 11. Content gaps

**Pillar Page #2: bug reporting quality in Jira.** What a bug report needs before a developer can act on it, how to stop duplicate reports when the same defect keeps failing, and linking a bug to the test step that found it. Houses groups B and C.

The keyword data strengthens the case for this page. About 1,180 searches per month of template and format demand cannot be bought profitably, but it can be earned organically. Pillar Page #2 is the right home for it.

**Pillar Page #3: test execution reporting and history.** How to read execution history across a release, what a test execution report should show a delivery lead, and auditing what was tested, skipped and risky before shipping. Houses group A, whose paid route does not exist.

Publish Pillar Page #1 first. The Resources dropdown cannot be built until it is live.

---

## 12. Next steps

Owners as sent. Note that publishing Pillar Page #1 and building the Resources dropdown now sits with Toggle, not SolDevelo.

| Action | Owner |
|---|---|
| Publish Pillar Page #1, then build the Resources dropdown | Toggle |
| Pull volume and bid data for the candidate keywords | Toggle (done, section 8) |
| Add the hero CTA band to LP1, LP2, LP3 and LP4 | SolDevelo |
| Refresh LP5 and remove the competitor marketplace links | SolDevelo |
| Rescope the Jira Test Case campaign, add the negatives | Toggle |
| Build the Differentiators campaign on surviving keywords | Toggle |
| Cross-check GA4 evaluation IDs against the internal report | SolDevelo |

Three actions sit with SolDevelo and four with Toggle.

The budget-hold language from the 5 August call was cut from the sent deck. The commitment still stands from that meeting: spend holds until the foundation is cleaner. Raise it verbally rather than in writing at the next call.

---

## Open items

- The Atlassian "similar apps" tab question from the 2026-08-05 agenda is still unanswered. Re-ask.
- Contact roles for Anna, Ewa, Pawel and Sebastian remain unconfirmed.

## Deck cleanup carried forward

The correction pass fixed the keyword count to 41 across slides 4, 15 and 16, and corrected the action split to three with SolDevelo and four with Toggle. Five cosmetic items remain in the deck file. None changes a number or a decision, so they are noted here rather than chased:

- **Slide 23** still reads "the 42 candidate keywords" in the Next steps table. It is the last surviving 42 in the deck. Worth fixing before the deck is reused, since it contradicts slides 4, 15 and 16.
- **Slide 2** labels Ewa's Pillar Page row "Outstanding" while its status cell says "Done".
- **Slide 2** says part two runs "slides 15 to 23". The keyword content ends at 22; 23 is Next steps.
- **Slide 11** reads "a comparison user can check every claim on quickly", missing the end of the sentence.
- **Slide 11** is the one slide still using "Keyword group" and "Try free" while every other slide uses "Keywords to target" and "Try for free".
