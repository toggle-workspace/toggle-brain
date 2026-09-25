---
playbook: Case study engine
owner: Viknesh (commercial) · account leads (capture) · Zaid (tooling)
last_reviewed: 2026-08-23
status: proposed
---

# Case study engine

How Toggle turns delivered work into proof that survives a skeptical buyer. Covers testimonial
collection, evidence, permission, writing, formats, distribution, and the numbers that judge the
system itself.

Binding: `brain/voice/writing-standards.md` governs every word produced under this playbook.

---

## 1. Where things stand today

Verified against the repo on 23 Aug 2026.

| Finding | Evidence |
|---|---|
| 9 case studies against 32 client folders | `brain/case-studies/`, `clients/` |
| 3 clients carry `status: active`; 25 CLIENT.md files are still unfilled template stubs | `clients/*/CLIENT.md` |
| Zero testimonials on file, anywhere in the repo | grep for "testimonial" returns only advice written for clients |
| `brain/positioning/agency-profile.md:11` claims "50+ client testimonials, rated 5/5" | Nothing in the repo supports it |
| Zero monthly reports have ever been produced | No `04-reports/YYYY-MM.md` exists in any client folder |
| No case names a period, a baseline, a spend level, a fee, or a measurement method | All 9 files |
| No case carries a client quote or a named person | All 9 files |
| `unitar-2026.md` is a 191-line multi-case monolith with no frontmatter | Duplicates UNITAR and Al Hidayah, breaks the atomic-file rule |
| The B2B SaaS and Atlassian Marketplace practice has no proof at all | codefortynine, ricksoft, communardo, yasoon, soldevelo |
| `differentiators.md` still carries "TODO: pair each differentiator with an evidence anchor" | The same gap seen from the positioning side |

One structural advantage sits underneath all of this. `deck-master.html`, `case-onepagers.html`,
`generators/proposal.md`, `generators/quote.md` and `templates/decks/pitch-deck.md` all read
`brain/case-studies/_index.md`. Fixing the source propagates to every sales surface at once.

---

## 2. Stop list, before the next deck goes out

These four items are corrections, not improvements. Handle them first.

**2.1 The RM11 million error.** `brain/case-studies/unitar.md:49` says spend scaled "past RM11
million per month." The account's own performance table in
`clients/audaura-unitar/01-strategy/account-knowledge-base.md` shows the highest month at
RM939,971, and the whole 12-month RFP budget is RM9.5M to RM11.5M. The line is wrong by roughly
12x and it publishes a client's media budget. Delete the figure.

**2.2 Mindvalley is not a Toggle case.** The account ran September 2019 to March 2022. Toggle
Solutions is registered as 202203225578, which dates the company to 2022. Present this as named
team experience in a bio, and keep a former employer's spend and revenue figures out of Toggle
material. The same rule applies to `clients/doctor-anywhere/`, which the folder itself describes
as an in-house handover archive from a prior role.

**2.3 UNITAR needs Audaura's permission.** Toggle contracts with Audaura Digital, not with UNITAR,
under an MSA that exists in three versions and none of them signed. A white-label rule already
forbids Toggle branding on UNITAR deliverables. UNITAR is currently the headline case in the sales
deck. Send one email to Kelvin at Audaura asking for written permission to name UNITAR in Toggle
sales material, and change the deck on the answer.

**2.4 The 50+ testimonials claim.** Either produce the source this week or delete the line from
`agency-profile.md`. An unsupported ratings claim in the agency profile undermines every real
number next to it.

While those are open, promote **Kith and Kin** to the headline case. It is named, Malaysian,
recent, and carries a business outcome the buyer recognizes: RM35 cost per lead and a 10 percent
lead-to-deal close rate.

---

## 3. The system, stage by stage

### Stage A. Collect

Capture attaches to something that already happens. The monthly reporting playbook has never once
produced its artifact, so nothing hangs off it.

**The anchor is the `/client-report` skill.** It runs, it already reads the client folder, and it
already surfaces the best number. Add a closing step to it: print the strongest result of the
period, generate a ready-to-send permission and testimonial email with the numbers filled in, and
append a `proof:` line to the client's CLIENT.md. The ask is written before anyone decides to ask.

Three capture moments, in order of yield:

1. **A result lands.** A report or a dashboard shows a number worth keeping. Ask that week.
2. **A milestone passes.** Renewal, a 90-day review, a campaign wrapping.
3. **An engagement ends.** Offboarding produces the most candid quotes, and it is the last chance.

Three ask formats, easiest first. The voice note is the default because it is the one clients
actually complete.

- **Voice note, three questions, on WhatsApp.** "What was the situation before? What changed?
  Who would you tell about it?" Thirty seconds of their time.
- **Written quote by email.** Send a drafted paragraph they edit rather than a blank request.
- **Recorded call, fifteen minutes.** Reserve this for the one or two flagship accounts per year.

**Storage.** No new numbered folder. Testimonials, consent records, and the permission state live
in a `## Proof` section inside `clients/<slug>/CLIENT.md`, which is the one file the team reliably
opens. Screenshots go in the existing `assets/`. If a client ever accumulates enough material to
need its own folder, create `proof/` alongside `quotes/`, matching the unnumbered optional pattern
already in the skeleton.

**Personal data.** Store name, role, company, date, and scope of permission. Never store the
contact's email or phone number in the repo. This repo gets cloned to laptops and read by a
Telegram bot, and git history does not forget. Redact account IDs, ad account numbers, CRM record
IDs, and any lead's name from screenshots before committing.

**Review sites.** The same ask ends with a Google review link. A public review is faster to get
than a case study and it works on prospects who never reach the deck.

**Reference roster.** Every consent request includes one extra question: would they take a short
call from a prospect in a similar position. Maintain the list of people who said yes. A reference
call closes more business-to-business deals than any PDF, and it costs nothing to produce.

### Stage B. Prepare the evidence

Pull the evidence before writing a word, and before asking the client for anything.

- The raw exports the numbers came from, with their date ranges.
- The baseline. A result with no before-state is an assertion.
- What else was running. Every claimed result had help from other channels, seasonality, or the
  client's own sales team.
- The creative or the artifact that did the work.
- The spend level and the fee band. A Malaysian marketing director's first two questions are "on
  what spend" and "what did that cost me." An 11.5x return with no spend attached reads as a
  RM2,000 test.

### Stage C. The metric standard

**The ladder.** Every case reports as high up this ladder as the evidence honestly supports.

| Rung | Examples | Use |
|---|---|---|
| Platform | impressions, clicks, click-through rate, rankings | Supporting detail only, never a headline |
| Efficiency | cost per lead, return on ad spend, cost per acquisition | The minimum bar for a published case |
| Business | revenue, enrolments, deals closed, pipeline value | The target, when the client will confirm it |

SEO retainers rarely reach the business rung, and the rule should not make the SEO practice
permanently proof-less. An SEO case may headline traffic value or ranked-keyword revenue proxy, as
long as the case states plainly that the figure is a proxy.

**The three numbers.** One volume number, one efficiency number, one business or proxy number.
More than three and the reader remembers none.

**Every ratio carries its formula.** "ROI 11.5x", "6x ROAS" and "20x+ ROAS" are three different
pieces of arithmetic. Write the formula next to the number: for example, "TikTok Shop gross
merchandise value divided by TikTok ad spend, before cost of goods."

**Attribution honesty.** State the method: platform-reported, GA4, CRM-validated, or holdout. Never
claim a number the client's CRM owns, such as a close rate or an enrolment count, unless the client
confirms it in writing. Kith and Kin's 10 percent close rate is the client's figure, and the case
should say so.

**Percentages need their base.** "+392% leads" from a starting point of no paid advertising is a
smaller claim than it looks. Give the absolute numbers alongside it.

### Stage D. Permission

Consent comes from the contracting counterparty, which is not always the brand in the headline. For
UNITAR that is Audaura first. For any white-label chain, both parties have to agree.

Tiers:

| Tier | Meaning |
|---|---|
| `granted-named` | Written release on file. Usable everywhere in scope. |
| `granted-anonymised` | Named description forbidden. Drop the vertical, geo, and year together, since those three identify the client anyway. |
| `requested` | Asked, waiting. Index only, no external use. |
| `refused` | Never leaves the repo. |
| `not-requested` | Default for everything today. Index only. |
| `not-ours` | Work performed under prior employment or another agency's contract. Team experience for a bio, never a Toggle case, never with the former employer's numbers. |

Assume a signed release from a bank or an insurer routes through legal and compliance, takes
months, and often comes back as no. Build the deck without CIMB, Great Eastern and Singlife rather
than shipping them and waiting to be asked to stop. The logo wall in `SALES-TEMPLATES-8.md` needs
the same permission as a named case, since it uses their trademarks.

**The consent email.** One message, plain text, from a person.

> Subject: Permission to reference our work together
>
> Hi [Name],
>
> We would like to write up the work we did for [Company] as a case study, and we need your written
> permission before we do anything.
>
> We would name [Company] and use your logo, and we would state these figures: [each figure, with
> its period and how it was measured]. It would appear in our sales deck, on toggle.solutions, in
> proposals, and on LinkedIn. You get the full draft to approve first, and we will change or remove
> anything you are not comfortable with.
>
> If you would rather not be named, we can describe you as [neutral descriptor] instead.
>
> You can withdraw permission any time by email and we will take it down from anything we control
> within 14 days. This permission runs for 24 months unless you renew it.
>
> Separately, and only if you are willing: two or three sentences about working with us that we
> could quote next to your name and role. We would keep your name, role, company, and a record of
> this permission, and nothing else.
>
> A reply saying "approved as written" is enough.

### Stage E. Write

Nine blocks, one page:

1. Kicker: vertical, geo, period.
2. Headline: the named story, not a label.
3. The client in one paragraph.
4. The challenge, carrying the before-state number.
5. The solution as numbered moves, each one a decision someone made.
6. The results table, with baseline, period, spend level, and formula.
7. What else was running. One honest sentence.
8. The client quote, with a name and a role.
9. What we would do differently. This is the block competitors will not write, and it is the one
   that makes the other eight believable.

### Stage F. Formats

One source file, four outputs. The full case is the least used of them.

| Format | Where it gets used | Built by |
|---|---|---|
| Index row | Proposals, quotes, deck generation | `_index.md` |
| One-pager | Emailed after a first call, printed | `case-onepagers.html`, then `/html-to-pdf` |
| Deck slide | The company deck | `deck-master.html` |
| **WhatsApp snippet** | How Viknesh actually closes | New. Three lines and one image: result, context, named client. |

The WhatsApp snippet is missing today and it is the format the deals actually touch.

**Vertical proof packs.** Bundle the outputs by buyer rather than by client. One pack per vertical:
higher education, Malaysian e-commerce and TikTok Shop, clinics, and Atlassian business-to-business.
Each pack holds one named case, the WhatsApp snippet, the three defects Toggle reliably finds in
that vertical, a price band, and a reference name. Wire the packs into `audit-master.html` and the
F2 audit-delivery email. The free brand audit is how Toggle wins, on the evidence of the Ikonik
engagement, so the proof belongs inside the audit rather than beside it.

**The Atlassian gap has no case study answer this quarter.** SolDevelo and codefortynine are too
new to have results. Sell category fluency instead: a short point of view on Atlassian Marketplace
acquisition drawn from the SolDevelo strategy work. European vendors cannot check a Malaysian logo
they do not recognize, and they buy demonstrated understanding of their market.

### Stage G. Publish and operate

Definition of done for a new case is two writes: the case file and the `_index.md` row. Everything
downstream reads the index and regenerates. Website and LinkedIn are a separate marketing task.

Keeping it alive:

- `/case-study` generator, following the `READS:` manifest convention.
- `case-study-validator` subagent, modeled on the existing `brief-validator`, which fails a draft
  that carries a number with no evidence path, a ratio with no formula, or a permission tier below
  `granted-named` heading for external use.
- A monthly nudge through `brain-bot`, which already runs against this repo under launchd. One
  extra plist, one prompt: list active clients with a report this month and no `proof:` entry, then
  message the account lead. Recurring work gets automated here, because manual habits at Toggle
  die inside about four weeks.

---

## 4. Frontmatter

Four fields, added to the existing block. Every field is read by the generator or the validator.
Nothing gets added that no tool reads, since the repo already fails to keep one `last_reviewed`
field current.

```yaml
permission: not-requested        # see the tier table
period: 2025-06 to 2025-09       # the window the numbers cover
evidence: []                     # paths showing provenance: exports, dashboards, dated notes
quote: false                     # a named client quote is on file
```

Baseline, spend, formula, attribution method and what else was running belong in the results table
and the prose, where a reader sees them, rather than in machine fields nobody queries.

`evidence:` accepts anything that shows provenance, including a screenshot, a dashboard HTML file,
or a dated meeting note. The rule the validator enforces is that a headline number cannot have an
empty evidence list.

---

## 5. How we judge the system

One number, computed automatically, emitted by `/toggle-status`, which already reads every
CLIENT.md: **cases with `permission: granted-named` divided by active clients.** Today that is zero
over three.

Two counts worth watching by eye, no tooling: testimonials on file, and names on the reference
roster. Both are zero today.

Everything else, including attach rates and win-rate influence, needs CRM data this repo does not
hold. Skip it rather than pretend to measure it.

---

## 6. Team to-do list

Owners are suggestions. Reassign at the top of each block. Times are honest estimates for one
person doing the task once.

### Week 1: correct what is already in circulation

Nothing new gets built until the wrong things stop shipping. This whole block is about two hours.

- [ ] Delete the "RM11 million per month" line from `brain/case-studies/unitar.md:49`. **5 min.** Zaid.
- [ ] Move `brain/case-studies/unitar-2026.md` to `archive/`. Do not delete it: it holds the only
      copy of the TPL Fresh Meats numbers and the mid-2024 per-channel cost per lead. **10 min.** Zaid.
- [ ] Re-tier `mindvalley.md` to `not-ours` and rewrite it as named team experience in a team bio,
      with the former employer's spend and revenue figures removed. **20 min.** Zaid.
- [ ] Set `permission: not-requested` on all nine cases, and pull CIMB, Great Eastern, Singlife and
      UNITAR out of `deck-master.html` until releases exist. **30 min.** Whoever owns the deck.
- [ ] Produce the source for "50+ client testimonials, rated 5/5" in
      `brain/positioning/agency-profile.md:11`, or delete the line. **15 min.** Viknesh.
- [ ] Promote Kith and Kin to the top row of `brain/case-studies/_index.md` and to the first case
      slide in the deck. **20 min.** Whoever owns the deck.
- [ ] Email Kelvin at Audaura asking for written permission to name UNITAR in Toggle sales
      material. **10 min.** Viknesh.

### Weeks 2 to 4: start the supply

- [ ] Send the consent and testimonial email to the three active clients: Audaura, Kynare,
      SolDevelo. **5 min each.** Account lead.
- [ ] Send a three-question WhatsApp voice-note ask to the three past clients most likely to say
      yes. Kith and Kin first. **5 min each.** Account lead.
- [ ] Add a `## Proof` section to the CLIENT.md of every active client, even if it starts empty.
      **5 min each.** Account lead.
- [ ] Add `period:` and `evidence:` to the four cases Toggle can actually defend: Kith and Kin,
      Al Hidayah, EduKids, Kualesa. **15 min each.** Account lead.
- [ ] Put a Google review link in the team email signature. **10 min.** Anyone.
- [ ] Write the formula next to every ratio in those four cases. **10 min total.** Account lead.

### Month 2: build the machine so this stops depending on anyone remembering

- [ ] Add a closing step to `.claude/skills/client-report/SKILL.md`: print the period's best number,
      generate the filled-in permission and testimonial email, append `proof:` to CLIENT.md.
      **30 min.** Zaid.
- [ ] Build the `/case-study` generator with a `READS:` manifest. **One session.** Zaid.
- [ ] Build the `case-study-validator` subagent on the `brief-validator` pattern. **45 min.** Zaid.
- [ ] Add the WhatsApp snippet as a fourth output alongside the one-pager. **One session.** Zaid.
- [ ] Add a `brain-bot` launchd plist for the monthly capture nudge. **45 min.** Zaid.

### Month 3: sell with it

- [ ] Build two vertical proof packs: higher education, and Malaysian e-commerce with TikTok Shop.
      **Half a day each.** Viknesh with the account lead.
- [ ] Wire each of the five differentiators in `brain/positioning/differentiators.md` to one case as
      its evidence anchor, closing the TODO that file already carries. **30 min.** Viknesh.
- [ ] Write the Atlassian Marketplace point of view from the SolDevelo strategy work, since that
      segment has no case study available this quarter. **One day.** Whoever owns SolDevelo.
- [ ] Put a quarterly case review on the calendar: refresh numbers, retire stale cases, re-check
      permissions against their 24-month expiry. **15 min to schedule.** Viknesh.

### The recurring five minutes

Once the machine exists, this is the whole ongoing commitment per person.

- **Account lead, monthly:** when `/client-report` prints the testimonial email, read it, then send
  it. Five minutes.
- **Viknesh, monthly:** check the reference roster has one more name than last month.
- **Zaid, quarterly:** run the case review and fix whatever the validator flags.
