---
client: Milkyway Marketing
slug: milkyway
doc: WhatsApp reply draft to Harsha
channel: WhatsApp
date: 2026-07-29
status: draft, awaiting Zaid's send
backing_doc: kreloses-assessment-2026-07-29.md
last_reviewed: 2026-07-29
---

# Reply draft to Harsha (SUPERSEDED)

> **Superseded by `harsha-reply-draft-v2-2026-07-30.md`.** This version pitched asking Kreloses
> for a partner integration. Zaid dropped that path in favor of pulling data with the clinic's
> own access. Kept for the reasoning, not for sending.

Written for WhatsApp and split into sends. Tone matches the
existing thread. Nothing here reveals that Toggle thinks the practice may be too small for
the full scope, and nothing commits to a price.

---

## Send 1, the reframe

Okay, did the research. Kreloses is a solid product and it has a proper dental edition. The
question worth asking is which parts of the funnel need to touch it at all.

One thing I want to flag before anyone talks about replacing it. Out of the funnel they
described, most of it runs outside the patient system anyway. Ads, landing page,
chatbot qualifying the lead, the follow up sequence for people who did not book, none of
that needs to read patient records, because whoever clicked the ad is not a patient yet.

The missing API costs them in two places, writing the booking into the calendar and pulling
recall dates for reactivation. We have workarounds for both. So we can start building the
funnel now and treat the software question as a separate track.

## Send 2, the export contradiction

Also worth checking something. Their pricing page says the clinic owns its data and can
export the complete database any time, no restrictions, no fees. That is the opposite of
pain point 1.

My guess is the export does exist but it comes out as raw table dumps that nobody at the
clinic can do anything with. That is a five minute job for us and an impossible job for a
clinic manager. Can you ask them whether anyone has requested the full export from Kreloses
support, and what they got back? If it works, the lock-in reason for switching goes away.

## Send 3, the gap that matters

The one gap I would push on is number 3, the limited patient uploads. For a veneers
practice the before and afters, the scans, the smile mockups, that is the clinical record
and the case evidence for a treatment plan running over a year. Nothing we build outside the
system fixes that.

Can you find out what fails there? File size, number of files per patient, total storage, or
file types it will not accept? Their answer tells us whether they need to switch at all.

## Send 4, the third option nobody has tried

Has anyone put the question to Kreloses? They are a small company in PJ and they built LHDN
e-invoicing and the Indonesia health ministry integration, so they do build integrations when
there is a reason.

One clinic asking for a webhook gets ignored. Two agencies saying we will bring you
integration-ready clinics is a different conversation, and they might have a partner API that
is not on the website. Worth a shot in parallel, and it costs us nothing.

If they say no and the imaging limit is real, the closest alternative for this market is
kumoDent. Malaysian, dental and perio charting, image capture with annotation, before and
after collage tool, and it has LHDN e-invoicing. That last part matters, because most
international dental software does not, and switching to gain an API while breaking their
tax compliance would be a bad trade.

## Send 5, two things to raise with the client

Two constraints on the ads side that we should get ahead of.

The Malaysian Dental Council restricts dental advertising, and elective aesthetic work like
veneers is the category they watch hardest. Patient testimonials, best or cheapest claims,
guaranteed results, and patient solicitation are all limited. There is published research
that found around 15 percent of Malaysian dental clinic posts non compliant. We can still run
ads. It means the dentist signs off on creative before it goes live and we plan the angles
around the restrictions.

Second, health data counts as sensitive personal data under the PDPA, so it needs explicit
consent to process, and patient data cannot be used to market services without it. Practical
version: the chatbot needs a consent step, and broadcasting to their existing patient list
only works if those patients agreed to marketing contact. Consenting to treatment does not
cover that.

Neither one blocks the work, and both cost less to design in now than to fix later.

## Send 6, what I need to scope it

Four things and then I can put numbers to this:

1. Budget, and whether that sits with you or the clinic
2. The RM6k they mentioned, is that monthly or total spend so far
3. Average value of a veneers case, and how many inquiries they get a month
4. What they mean by chatbot, WhatsApp, Instagram DMs, or a widget on the site

Last thing, and I want to be straight with you. Happy to advise on the software choice, but
I would not want Toggle running the migration itself. Moving patient records for a practice
with year long treatment plans is clinical risk, and that should sit with the clinic and
whichever vendor they pick. The funnel build is where we add the most value and where I am
confident we deliver.

Want to jump on a call this week and go through it?
