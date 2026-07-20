---
name: competitive-intel
description: Decision-oriented competitor or market brief. Triggers on "what's [competitor] doing", "how do we compare to X", "is there a market for Y already", "should we worry about [competitor]", "research [space/category] before I commit". Every brief is aimed at a specific decision the user is about to make. Cites sources with dates. Flags what couldn't be verified instead of hiding it.
---

# competitive-intel

## Step 1 — pin the decision

A brief that isn't aimed at a decision is a Wikipedia article. Before researching, get the user to confirm the call:

> "What's the decision you're trying to make? (e.g. build this vs not, charge $X vs $Y, position against X vs around them, enter this market vs hold.)"

If they push back ("I just want to know what's out there"), proceed but flag at the top that this is an overview, not a decision brief — and that it'll be less useful.

## Step 2 — gather

In this order:

1. The user's existing context — their notes, their current positioning, what they think they already know.
2. Each competitor's public surface — site, pricing page, changelog, blog, recent funding, recent hires (LinkedIn), recent customer announcements.
3. Third-party signals — G2, Capterra, Reddit, HN, X. Recent (last 90 days) sentiment, complaints, switching stories.
4. Primary sources beat summaries. If you only have a TechCrunch line saying "$10M raised", look for the founder's post or the SEC filing.

## Step 3 — output

```
DECISION
• Restate the call being made, sharper than the user phrased it.

ANSWER (TL;DR)
• One sentence. The actual recommendation. No hedging.

THE 3-5 FACTS THAT DRIVE IT
• Each fact: source + date in parens. e.g. "Competitor X raised $12M Series A (TC, 2026-04-12)."
• Each fact ties directly to the decision — no encyclopedia entries.

WHY THIS MATTERS FOR YOUR DECISION
• 2-3 lines connecting facts → call. No generic "the market is competitive."

WHAT I COULDN'T VERIFY
• Named gaps — revenue (private), team size (no LinkedIn signal), churn (never public).
• If a fact is load-bearing but unverified, write it as "If [X] is true, then [Y]" — don't pretend the if doesn't exist.

ONE FOLLOW-ON
• A single question to test before betting on this brief. e.g. "Talk to 2 former customers of X to confirm the churn pattern."
```

## Calibration rules

- **Date every fact.** Anything older than 12 months is suspect — call it out explicitly.
- **"They say" vs "verified."** Their landing-page claim is not evidence. Their pricing page is. A customer review is. A SEC filing is.
- **Don't fake a hands-on review.** If product trial would change the answer, say so — don't invent screenshots or feature comparisons.
- **Refuse flattering briefs.** If the user is hoping to hear "you're better than them" and the evidence doesn't support it, say that clearly. Solo founders make worse bets when their competitive intel agrees with them.

## Defaults

- Output to chat. Offer to save as a dated decision memo if the user is about to act on it.
- **Escalation rule:** if the decision is irreversible (signing a contract, public positioning launch, hiring a specialist), make the GAPS section the headline, not the footer.
- For "is there a market for X" briefs, demand-side evidence (people paying for adjacent things, complaint threads) beats supply-side evidence (competitors existing). Lead with demand-side.
