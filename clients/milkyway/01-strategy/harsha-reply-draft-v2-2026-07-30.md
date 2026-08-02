---
client: Milkyway Marketing
slug: milkyway
doc: WhatsApp reply to Harsha, version 2
channel: WhatsApp
date: 2026-07-30
status: draft, awaiting Zaid's send
supersedes: harsha-reply-draft-2026-07-29.md
backing_docs: kreloses-assessment-2026-07-29.md
last_reviewed: 2026-07-30
---

# Reply to Harsha, v2

Version 1 pitched asking Kreloses for a partner integration. Zaid killed that path. This
version says the data can come out using the clinic's own access, which is what removes the
fear from their software decision, and then states Toggle's confidence on the funnel, the ads,
and the chatbot.

Written casual for WhatsApp and split into sends.

---

## Send 1, both blockers are solvable

Okay, good news on both of the blockers they raised.

Point 1, getting data out. Their own pricing page says the clinic owns its data and can
export the full database any time, no fees and no restrictions. So the data is not locked in.
My guess is someone tried it, got a pile of raw files that looked unusable, and gave up. That
is a formatting problem, and formatting we can handle.

Point 2, no API. True, they have no public API. But we don't need Kreloses to build one for
us. Using the clinic's own login we can pull what we need two ways: their built in report
exports, and the data requests their web app already makes in the background every time staff
open a screen. I'd want to confirm it on the live account, but this works on almost every
cloud system.

## Send 2, why that matters for them

The reason that matters is it takes the fear out of the decision.

Right now they feel stuck. If we can get the data out cleanly, switching to a better tool
stops being a risk, and staying on Kreloses stops being a trap. They get to choose software
based on whether it fits a veneers practice, mainly whether it can hold all the photos and
scans they need per patient, instead of choosing based on what they can escape from.

It also puts a third option on the table, which is we build the missing pieces in house and
let Kreloses keep doing the clinical records. Depends on budget, but it's a real option now.

## Send 3, the funnel

On automating the funnel, I'm confident we can do it either way, with Kreloses or without it.

I mapped their funnel to 7 steps: ads, landing page, chatbot qualifying, follow up for people
who didn't book, booking, reminders, then recall and reactivation. Four of those seven never
touch the patient system at all. Whoever clicks an ad is not a patient yet, so the bot has
nothing to look up.

Only two spots need the patient system, writing the booking in and pulling recall dates back
out. Both have workarounds. So the chatbot was never blocked by Kreloses in the first place.

## Send 4, ads and chatbot

So yes to both the ads and the chatbot, and we're comfortable running them.

The bot can handle the common veneers questions, price ranges and how long treatment takes,
qualify the person, then push them to book. One thing we would deliberately not do is let the
bot write into their clinical calendar. The bot books into our calendar and the front desk
copies it across. Sounds low tech, but it takes seconds and it means a bug can never wipe a
real patient's appointment.

The bigger win on the ads side: once we can read whether someone showed up for their consult,
we feed that back to Meta. Right now Meta only knows someone filled in a form, so it goes
hunting for cheap form fills, which on a veneers account means people who were never going to
spend. Give it real attendance and case values and it starts hunting for actual veneer cases
instead. That changes the economics of the whole ad account. I'd need their average case value
to size it properly.

## Send 5, two things to flag early

Two flags, and neither one blocks the work.

The Malaysian Dental Council has rules on dental advertising, and veneers is the category they
watch hardest. Testimonials, best and cheapest claims, guaranteed results, all limited. We
need the dentist to sign off on creative before it runs and we plan the angles around it.

Second, health data counts as sensitive under the PDPA, so the bot needs a consent step, and
broadcasting to their existing patient list only works if those patients agreed to marketing
contact. Treatment consent doesn't cover it. Cheaper to build in now than to fix later.

## Send 6, what I need to put numbers on it

1. Budget, and whether that sits with you or the clinic
2. The RM6k they mentioned, monthly or total spend so far
3. Average value of a veneers case, and how many inquiries they get a month
4. What they mean by chatbot, WhatsApp, IG DMs, or a widget on the site
5. Their Kreloses subscription agreement if they can dig it out. I want to check what it says
   about automated access before we build anything on top of it.

Free for a call this week?
