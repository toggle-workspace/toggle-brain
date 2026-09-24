---
last_reviewed: 2026-08-27
owner: Zaid
status: v2, for review by Yi Yang and Viknesh
supersedes: v1, which was built around a presented slide deck
---

# The Toggle sales play

The runbook for a first sales conversation. It exists because of a specific diagnosis from Yi Yang: our calls sound like we are asking for the business rather than deciding whether to take it.

There are two artifacts in `clients/toggle/sales-page/`, both scrolling pages rather than decks.

| Page | Which call |
|---|---|
| `index.html`, the **company profile** | The first conversation. Generic, no prospect name, nothing to prepare. It leads with the thesis, walks the three places growth breaks, and ends at the audit. |
| `diagnosis.html`, the **post-audit page** | The second conversation, once you have spent the ninety minutes below on one named prospect. It opens on their name and their three findings. |

They cross-link in the header, so you can move between them mid-call. Everything below applies to whichever one is on screen.

**The one rule:** we do not present. We diagnose, out loud, using their numbers. Authority is a byproduct of being useful before you are paid, and no amount of better adjectives produces it.

---

## What was wrong, named plainly

| Symptom | Root cause | What replaces it |
|---|---|---|
| "We feel small on calls" | The old deck was a company profile. Who We Are, What We Do, Why Partner. Every slide asked the prospect to be impressed by us. | The page opens on their name and their numbers. We appear later, as evidence the diagnosis is trustworthy. |
| "It sounds like we are begging" | We had nothing to give away, so willingness was the only currency we had. | Three real findings, given away in the first five minutes, checkable without us. |
| "We do performance and we get you leads" | A line any of forty agencies in Kuala Lumpur can say word for word. It fails the ownable test in `brain/voice/writing-standards.md`. | We benchmark first response time, CRM workflow, page behavior and footfall before quoting. Nobody else says this because nobody else does it. |
| "No perspective that wows them" | We arrived with a template and researched afterward. | Ninety minutes of pre-call research is an entry requirement. No findings, no call. |
| "Our case studies suck" | Nine real cases, five of them in the deck, none with the method, and the two strongest missing entirely. | All nine on the page, filterable, each opening to the method and a transfer line. Gaps tracked in `brain/case-studies/PROOF-GAPS.md`. |

---

## The first call runs on the profile

No preparation beyond knowing their industry. Open `index.html` and run the five beats in order: who we are, why we are the authority, how many clients, what we would do for you, and then the qualification.

Three moves matter.

**On the authority section, read the figure before the claim.** "Eleven million ringgit a month" lands. "We hold efficiency at scale" on its own does not.

**Ask them to type their four numbers into the arithmetic section** while you watch. A prospect doing sums on your page has stopped judging your slides and started thinking about their own problem, which is a different meeting.

**Run the BANT section with them, out loud, on the screen.** Read each question, let them pick, and read the note that appears underneath. Then read the verdict card as written. If it comes back red, say it plainly and do not soften it: "we would decline this today, and here is the one thing that would change that." That single moment does more for our authority than the rest of the page combined, and it is the whole reason the qualification is visible to the prospect rather than hidden in a rep's notes.

Close the first call by asking for the ninety minutes: "let us go and look at your accounts properly, and we will come back with the three things we would change."

## Before the second call: ninety minutes, non-negotiable

This is what fills in `diagnosis.html`. If you cannot spend ninety minutes, move the call. Arriving without findings is what produces the tone we are trying to kill.

1. **Meta Ad Library, fifteen minutes.** Count live ads, count distinct angles, note the oldest creative still running. An angle running for months at high frequency is finding two on almost every account.
2. **Search footprint, twenty minutes.** Run their five commercial terms. Note where they rank, who outranks them, and whether they are bidding against their own organic listing.
3. **Landing pages, twenty minutes.** Load their main conversion page on a phone on mobile data. Time it. Count the form fields. Check whether the ad promise and the page headline are the same sentence.
4. **Tracking, fifteen minutes.** Read the page source for the pixel and for any sign of server-side or offline conversion. Most accounts fire on form submit only, which is finding three on almost every account.
5. **Company context, twenty minutes.** Last quarter of announcements, funding, leadership changes, and the number they are publicly judged on.

Then open **Set up** on `diagnosis.html` and enter the company, the market, the date and the three findings with the evidence attached to each. Leave their four numbers blank, because you will type those in live and the typing is part of the demonstration.

---

## The thirty minutes

**Minutes 0 to 2. The hero.** Their name is on the screen in the first sentence.

> "Before we start: we are not going to pitch you. We spent time in your accounts and your market before this call and we have three things we would change. In thirty minutes you will either agree the diagnosis is right or you will not, and either answer is a good outcome for both of us."

Then stop. The pause does more work than the sentence.

**Minutes 2 to 10. The findings.** Scroll to the three cards. Read each finding, name the evidence, and say out loud that they should fix all three themselves without us. Then be quiet and let them respond. If they push back on a finding, you were wrong about that one, so say so and move on.

**Minutes 10 to 16. The arithmetic.** Ask for four rough numbers and type them into the page while they watch. Read the big figure once and stop. If their close rate is under five percent, the page says the constraint sits after the click, so say it out loud. That is the most credible sentence available to an agency in a first meeting.

**Minutes 16 to 20. How we diagnose.** The vermillion section. The retainer model forces most agencies to sell marketing regardless of readiness, and saying that plainly explains their last three agencies without insulting them. Have one real story ready about walking away or referring out, because without it this is a claim rather than a position.

**Minutes 20 to 25. The receipts.** Filter to their vertical and open the one or two that argue for their situation. Read the transfer line rather than the number. Then scroll into **Where our evidence runs out** and name a limit. Volunteering a limit is the strongest available signal that everything else you said was true, and skipping it to save time is the most expensive shortcut on this page.

**The book, if they ask "who else do you work with?"** Scroll to the client rows. The argument there is range and repetition rather than famous names, and the four counters carry it. Hover to stop a row, click the account closest to their situation, and let the modal do the talking. If they land on a card that says there is no published result, that is the intended answer and not an accident. Say it plainly: we publish a case when we have permission and a number worth showing, and the rest we will walk you through on a call.

**Minutes 25 to 29. The terms.** Read the qualification section flat, without edge. Stating conditions is authority. Sounding pleased with yourself is arrogance.

**Minutes 29 to 30. One ask.** One decision, one date, one owner. Do not stack asks.

**Same day.** Send the link. Their inputs live in their own browser, not yours, so if you want the numbers preserved in the copy you send, use **Save as PDF** and attach it. A recap that arrives Friday for a Tuesday call undoes the whole performance.

---

## The four authority moves

1. **Arrive having already worked.** "We looked at your account on Tuesday" is worth more than every case on the page.
2. **Give the findings away.** Value handed over before payment is what separates a diagnosis from a pitch.
3. **Name a limit.** The evidence section exists to be used, not skipped.
4. **State conditions.** We take work that can succeed and decline work that cannot, and we say which on the call.

---

## Objections

**"You are more expensive than the other quote."** The fee is the smallest line in the acquisition math. On the numbers we just ran together, a ten percent difference in fee moves your cost per customer less than a one percent change in lead cost does. Optimizing the fee means optimizing the wrong ninety percent.

**"Send us a proposal and we will review internally."** We will, and it will be short. Before I write it, which of the three findings should it solve first, because scoping against all three makes it a document rather than a decision.

**"How do we know you can handle our size?"** UNITAR ran past eleven million ringgit a month through us without the lead cost inflating, and Mindvalley was five channels across three revenue lines in hard currency. If your shape matches neither, the evidence section says so plainly.

**"We already have an agency."** Good, and this is not a replacement conversation. Take the three findings to your current team. If they fix all three in six weeks, you never needed us.

**"Can you guarantee results?"** No, and anyone who does is quoting a number they do not control. We guarantee the diagnosis: two days, priced small, ending in a ranked list with the evidence behind each item. If it says your problem is not marketing, we hand the brief back.

---

## Never say

- "We would do anything to have your business."
- "We are a full service digital marketing agency."
- "We do performance and we get you leads."
- "Let me walk you through our capabilities."
- Any number you cannot source to a file in `brain/case-studies/`.
- Any slider value above fifty percent without naming the structural change behind it. The page warns you on screen when you cross that line.

---

## Reads

- `clients/toggle/sales-page/index.html`, the company profile
- `clients/toggle/sales-page/diagnosis.html`, the post-audit page
- `clients/toggle/sales-page/README.md`, how to run and edit it
- `brain/voice/writing-standards.md`, binding for anything written
- `brain/case-studies/`, every number on the page
- `brain/case-studies/PROOF-GAPS.md`, what we cannot yet prove
- `brain/positioning/agency-profile.md`, the diagnosis-before-prescription position
- `brain/pricing/`, quote after the call, never on it
