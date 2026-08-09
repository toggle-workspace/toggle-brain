---
client: Milkyway Marketing
slug: milkyway
doc: Kreloses assessment and funnel automation options
end_client: dental practice specializing in veneers (name not disclosed)
prepared_for: Harsha, Milkyway Marketing
prepared_by: Zaid, Toggle Solutions
date: 2026-07-29
status: internal draft, not client-facing
last_reviewed: 2026-07-29
---

# Kreloses assessment and funnel automation options

Internal working document. It answers the question Harsha raised on WhatsApp, and it is
not formatted for the practice yet. The reply draft to Harsha lives in
`harsha-reply-draft-2026-07-29.md`.

## The question as asked

Harsha's framing was that the practice wants to replace Kreloses because it has no API,
which is blocking an automated funnel. The practice wants to run ads, put a chatbot in
front of the traffic, and have that chatbot connected to the patient system.

That framing bundles two decisions that should be separated. One is whether the practice
keeps its patient record system. The other is whether Toggle can build the funnel it
wants. The second does not depend on the first as heavily as the thread assumes.

## What Kreloses is

Kreloses is a cloud clinic management platform based in Petaling Jaya, founded by Karl
Alexander Kininmonth, and built for the Asian market. It sells vertical editions for
dental, veterinary, physiotherapy, and chiropractic practices, so the dental edition is a
real product rather than a general tool the practice adapted.

Verified from the vendor's own pages:

- Cloud hosted, browser based, no local install, encrypted at rest.
- Appointments, patient records, dental charting, invoicing, inventory, payments,
  expenses, and financial reporting.
- Compliance integrations that matter in this region: LHDN e-invoicing for Malaysia, and
  SATUSEHAT for Indonesia.
- SMS credits sold as a paid add-on.
- Kreloses quotes pricing through a calculator keyed to country, industry, branch count,
  and staff seat count, and bills annually. Data migration and training cost extra as
  one-time fees. It publishes no price list.

Two things follow from the compliance integrations. Kreloses has engineering capacity and
does build outbound integrations when there is a reason to. And any replacement system has
to carry LHDN e-invoicing, or the practice breaks its tax compliance to gain an API. That
single requirement removes most of the international dental software market from
consideration.

## The six gaps, re-scored

The practice listed six gaps. They are not equal, and two of them are softer than the
thread suggests.

| # | Gap as stated | Assessment |
|---|---|---|
| 1 | Data export is difficult | Contradicted by the vendor. See below. Treat as unverified. |
| 2 | No API, so no automated funnel | Well supported for a public API. A partner API is untested. Blocks less than assumed. |
| 3 | Limited patient data upload, including images | The strongest real driver. Cannot be solved by anything Toggle builds outside the system. |
| 4 | No patient app | Low priority. A WhatsApp flow serves this market better than an app a patient installs once. |
| 5 | No broadcast campaigns | Partly solvable outside the system, and constrained by PDPA consent rather than by software. |
| 6 | No loyalty program | Low priority, and buildable outside the patient record system. |

### Gap 1 contradicts the vendor's own claim

The Kreloses pricing page states that the customer owns their data and can export the
complete database whenever they want, with no restrictions and no fees. The practice says
export is difficult. Both statements can be true at once, and the likely reconciliation is
that the export produces a set of raw table dumps with internal identifiers and no schema
documentation. That is unusable to a clinic manager and ordinary work for an engineer.

That distinction decides the whole track. If the export exists, the data is not locked in,
and Toggle can build a one-way sync into a funnel layer with ordinary tooling. Before anyone
plans a migration on the basis of lock-in, ask Kreloses support for the full export and look
at what arrives. One email could remove the practice's primary stated reason for switching.

### Gap 2 blocks less of the funnel than the thread assumes

Walk the funnel the practice described and mark which steps need to touch the patient
record system:

1. Ads on Meta and Google. No system access needed.
2. Landing page or lead form capture. No system access needed.
3. Chatbot qualification, answering questions about veneers, price ranges, and timelines. No system access needed.
4. Nurture sequence for people who did not book. No system access needed.
5. Booking the consultation. Needs write access, or a person.
6. Appointment reminders. Needs read access only for bookings that did not come through the funnel.
7. Post-treatment recall and reactivation. Needs read access, or a person.

Four of the seven steps run outside Kreloses with no access at all. The chatbot the practice
wants does not need to read patient records to qualify a stranger who clicked an ad, because
that person is not a patient yet. Step 6 sits in between: the funnel can remind anyone it
booked itself, and it needs Kreloses only for appointments the front desk took by phone or
at the counter.

That leaves two hard dependencies out of seven, the booking write in step 5 and the recall
read in step 7, and Toggle can work around both without replacing the system.

For booking, the chatbot writes into a calendar Toggle controls, and the front desk mirrors
confirmed bookings into Kreloses. That is a short manual step per booking, it is honest
about being manual, and it unblocks the whole upper funnel from day one. For recall and
reactivation, a scheduled export feeds the campaign list, assuming the export works.

### Gap 3 is the real migration driver

A veneers practice lives on imaging. Before and after photographs, intraoral scans, smile
design mockups, and shade records serve as both the clinical record and the case
evidence the practice needs to keep for a treatment plan that runs over a year. If Kreloses
caps what can be attached per patient, no funnel Toggle builds fixes that, and no
integration works around it. This is the gap that would justify changing systems, and it
has nothing to do with the API.

Confirm the limit before acting on it. Ask Harsha which of these fails: a file size cap, a
count cap per patient, a total storage cap, or unsupported file types such as DICOM.

## Two constraints nobody in the thread raised

These change the shape of the engagement and should be surfaced to Harsha before any
proposal, because they are Toggle's professional obligation to name.

### Dental advertising in Malaysia is regulated

The Malaysian Dental Council restricts what a dental practice may publish. Patient
testimonials that read as endorsement, superlative claims such as best or cheapest,
guaranteed clinical outcomes, comparative claims against named competitors, and patient
solicitation are all constrained. The MDC publishes this in its Guidelines and Provisions
for Public Information. Published research on Malaysian dental clinic social accounts found
roughly 15 percent of posts non-compliant, with patient solicitation the most common
failure, and more than half of the accounts studied carried at least one non-compliant post.

Veneers is elective aesthetic dentistry, the category MDC polices hardest, and Malaysian
academics have criticized online advertising for aesthetic dental treatment in the national
press. The creative approach that performs best in this category, which is
dramatic before and after content plus patient stories, is also the approach most likely to
breach the guidelines. Toggle needs the practice's dentist to sign off on creative, and the
compliance constraint belongs in the scope and the price rather than discovered later.

### Patient data is sensitive personal data under the PDPA

Malaysian law treats health data as sensitive personal data, which requires explicit
consent to process. Patient data cannot be used to market healthcare services without that
consent. The 2024 amendments added mandatory breach notification and raised penalties.

Three consequences for the plan as described. The chatbot needs a consent step before it
collects anything from a user. Broadcasting to the existing patient base needs consent
already on file for marketing use, and a patient who consented to treatment has not
consented to promotions. Piping patient records into a third-party chatbot or CRM also makes
that vendor a processor, so where that vendor stores data becomes the practice's problem. A funnel
that moves patient records into a marketing tool without a consent trail is the shortcut
that gets a healthcare client fined.

## The options

### Option A: keep Kreloses, build the funnel layer outside it

Toggle builds ads, landing page, chatbot, nurture, and booking in its own stack. Kreloses
stays the clinical record. The front desk bridges bookings by hand.

Fastest to revenue, no clinical risk, no migration, and it starts generating data the
practice does not have today. The cost is a manual step per booking and no automated
recall until someone checks the export. Both agencies bill against this track, and the
practice does not have to decide anything about software before it starts.

### Option B: ask Kreloses for a partner integration

Nobody in the thread has asked the vendor. Kreloses is a small Petaling Jaya company with a
reachable founder, and it already builds integrations when there is a commercial reason.
A single clinic requesting a webhook gets ignored. Two agencies offering a pipeline of
integration-ready clinics plus co-marketing is a different conversation, and it may also
surface a private partner API that is not on the marketing site.

Cheapest possible route to closing the real gap, and the downside is a few weeks of
waiting. Worth starting in parallel with Option A regardless of what else happens.

### Option C: evaluate kumoDent as the replacement

kumoDent is the closest like-for-like alternative for this market. Malaysian, serves 11
countries with about 2,500 clinics across Southeast Asia, and it carries the two things a
switch cannot lose: LHDN e-invoicing and SATUSEHAT. It has dental and periodontal charting,
image capture with annotation, a before and after photo collage tool, digital forms,
inventory with batch control, commission calculation, and a staff app.

It addresses gap 3, the gap that matters. Two cautions. Its
WhatsApp feature reads as a click-to-chat quick link rather than Business API broadcast, and
its promotional vouchers are not a loyalty program. Neither its public pages nor its
marketing mention a developer API. Before recommending it, ask kumoDent directly whether a
documented API or webhooks exist, and confirm the imaging limits.

### Option D: a system with a documented open API

Open Dental has a genuine REST API and a large integration ecosystem, but remote API access
needs its eConnector service running on a machine inside the practice network, it is built
around the United States market, and it has no LHDN e-invoicing. CareStack has a mature
open API at high volume, and it is also United States centric with enterprise pricing.

Both trade a real compliance requirement and a large operational burden for the API. For a
single Malaysian practice this is the wrong trade. Listed for completeness rather than as a
candidate.

## Recommendation

Split this into two tracks and stop treating it as one decision.

**Track 1, Toggle's scope, starts now.** Build the funnel outside Kreloses per Option A.
Ads, landing page, chatbot with a PDPA consent step, nurture, and a booking calendar that
the front desk mirrors into Kreloses. This produces revenue, it produces data, and it does
not wait on a software decision. Creative goes through MDC review before it runs.

**Track 2, the practice's decision, runs in parallel.** Answer three factual questions in
this order, because each one can end the track. Request the full export from Kreloses and
inspect it. Ask Kreloses about a partner API or webhooks, with Milkyway and Toggle framing
it as a partnership. Confirm what the imaging limitation is. If the export works
and the imaging limit proves tolerable, the practice has no reason to migrate. If imaging is
capped, evaluate kumoDent, and price the migration as its own project.

Toggle advises on Track 2 and does not own it. Migrating the patient records of a practice
running year-long treatment plans carries clinical and legal risk that Toggle should not
absorb on an account it reaches through a partner, and where it has never met the owner.
Say that plainly to Harsha now rather than after a migration goes wrong.

## What Toggle sells here

Track 1 maps to `brain/services/performance-marketing.md`,
`brain/services/conversion-optimisation.md`, and `brain/services/consumer-retention.md`.
Price against `brain/pricing/rate-card-my.md`. An audit engagement from `brain/process.md`
is the right opening shape, because the discovery questions below are worth charging for
and they de-risk the retainer that follows.

Do not quote until the budget question is answered. If the RM6,000 the practice mentioned
is the lifetime ad spend rather than a monthly budget, then a custom integration plus a
system migration plus a managed funnel sits outside what this account can carry, and the
honest recommendation shrinks to Option A alone at a modest retainer.

## Open questions

Commercial, and these gate the proposal:

1. What is the budget, and does Milkyway or the practice hold it?
2. Is the RM6,000 monthly or lifetime?
3. Who contracts Toggle, and what is Milkyway's margin expectation?
4. What is the average veneers case value, and the current monthly inquiry volume?

Technical, and Harsha can get these from the practice:

5. Has anyone requested the Kreloses full database export, and what arrived?
6. What fails on patient uploads: file size, file count, total storage, or file type?
7. What does the current funnel look like, and who answers inquiries today?
8. Does the practice have a WhatsApp Business API number and a Meta Business Manager?
9. Which Kreloses plan and seat count are they on, and when does the annual term renew?

Compliance, and the practice's dentist has to answer these:

10. Who signs off creative against MDC guidelines?
11. Does the existing patient base have consent on file for marketing contact?

## Sources

- [Kreloses homepage](https://www.kreloses.com/)
- [Kreloses dental edition](https://www.kreloses.com/dental)
- [Kreloses dental Malaysia](https://www.kreloses.com/dental/malaysia)
- [Kreloses pricing, including the data export claim](https://www.kreloses.com/home/price)
- [Kreloses on Crunchbase, company and founder detail](https://www.crunchbase.com/organization/kreloses)
- [kumoDent](https://www.kumodent.com/)
- [Open Dental API modes](https://www.opendental.com/site/apilocal.html)
- [Open Dental cloud third-party integrations](https://www.opendental.com/site/opendentalcloudintegrations.html)
- [CareStack](https://carestack.com/)
- [MDC Guidelines and Provisions for Public Information 2022](https://hq.moh.gov.my/ohp/mdc/)
- [Content and compliance analysis of Malaysian dental social media](https://aos.usm.my/docs/Vol_19/aos-2024-0027.pdf)
- [Bernama commentary on aesthetic dental treatment advertising](https://bernama.com/en/thoughts/news.php?id=2216698)
- [Health data governance in Malaysia](https://healthdatagovernance.org/country/malaysia/)
- [PDPA compliance guidance for Malaysian marketers](https://www.teambench.ai/resources/blog/malaysia/pdpa-malaysia-data-compliance-marketing/)
