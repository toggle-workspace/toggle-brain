# Ikonik WhatsApp Mystery Shop, Audit Script and Results Log

**Prepared:** 2026-08-04
**Target:** +60 17-877 1819 (`~Ikonik Eye Specialist`, WhatsApp Business account)
**Why this exists:** the client asked for it directly. Their words: "I want them to audit our call centre and WhatsApp reply and propose to us what can they improvise for us." This covers the WhatsApp half. The call centre script is separate.
**What it is:** a repeatable mystery shop that produces screenshot evidence of how the current template flow handles real patient behavior.

**Important:** Ikonik does not run a chatbot. They run WhatsApp Business message templates with button and list replies. So the failures below are structural rather than a badly trained bot. Templates cannot read free text, cannot answer a question, and cannot branch on anything a patient types. Frame every finding that way, because it points at the fix instead of blaming their team.

---

## Setup, do not skip this

1. **Use a fresh phone number that has never messaged them.** Any existing thread is mid flow and an agent may already recognize the sender, which contaminates every result.
2. **Screen record rather than screenshot.** The timestamps are the evidence. A recording gives you the stills and the gaps between them.
3. **Run Session A on WhatsApp Web deliberately.** Desktop behavior is one of the findings, not a convenience choice.
4. **Log every timestamp** in the results table at the bottom as you go, because reconstructing it later from screenshots is slow and error prone.
5. If a real human engages on the symptom test in Session C, **tell them it was an audit test** so you are not burning clinical attention.

---

## Session A, business hours, fresh number, WhatsApp Web

Send these in order. Do not help the system along, and behave the way an actual patient behaves.

### A1. Opening message, English, intent and question stated up front

```
Hi, I saw your LASIK ad on TikTok. How much is it for both eyes?
```

**What to capture:** the reply language, and whether either the stated treatment or the stated question is acknowledged.

**Expected failure:** a Malay template fires in response to English, ignores that the patient already named the treatment, and ignores the only question asked. A patient arriving from paid traffic gets a menu instead of an answer.

**Business cost:** every ad click lands on a conversation that starts from zero, so the qualification the ad already did gets thrown away.

### A2. Explicit language request

```
Sorry, can you reply in English please?
```

**Expected failure:** the identical Malay template repeats word for word. Already observed on 2026-07 in the existing thread at 4:14pm and 4:15pm. Reproduce it on the clean number.

**Business cost:** a system that repeats itself verbatim when asked for help reads as broken to the patient. This is the most damaging single frame in the audit, so capture it cleanly.

### A3. Tap through the menu

Tap `Pesakit Baru`, then `Bebas Rabun (LASIK)`, then `Continue`.

**What to capture:** the message reading `This message can't be displayed here. Please open WhatsApp on your phone to view the message.`

**Expected failure:** WhatsApp Flows do not render outside mobile. Desktop users hit a wall at the exact moment they were about to convert.

**Business cost:** every desktop enquiry dead ends at the final step of the funnel.

**Also note here:** the flow mixes English button labels (`Select`, `Let's start`, `Continue`) into an otherwise Malay conversation, and the closing template contains the phrase "kami komited untuk memastikan pengalaman 5 BINTANG." The copy quality is worth one line in the deck, though it is minor next to the structural failures.

### A4. Free text price question, in Malay this time

```
Berapa harga LASIK untuk dua mata?
```

**Expected failure:** no answer, and most likely the template repeats.

**Business cost:** this removes the language excuse. Perfect Malay still gets nothing, which proves the problem is not translation. Free text does nothing at all and only button taps move the conversation.

### A5. The advertised offer

```
Promo RM2,500 satu mata tu masih ada?
```

**Expected failure:** the flow cannot confirm the clinic's own promotion.

**Business cost:** the strongest test in the set. RM2,500 per eye runs on their homepage popup and on TikTok. The reply channel that receives the resulting clicks cannot confirm the price that drove them. Ask the room what an ad is worth when the landing conversation cannot close the loop on its own offer.

### A6. Eligibility, the highest intent question in the category

```
Power saya -1200, boleh buat LASIK tak?
```

**Expected failure:** no answer, no routing, no qualification.

**Business cost:** this is the question that separates a buyer from a browser. Their own website states that Flapless Smart Signature corrects up to -1200 power, so the answer exists inside the business. The channel simply cannot reach it.

### A7. Off menu segment, children

```
Anak saya 8 tahun. Ada rawatan untuk kanak-kanak?
```

**Expected failure:** the menu offers no Ortho-K path.

**Business cost:** the entire 5 to 17 segment falls through, even though the website structures its whole offering around that age band and Ortho-K is the product built for it.

### A8. Booking a specific slot

```
Boleh saya book Sabtu ni pukul 10 pagi?
```

**Expected failure:** no calendar, no slots, no confirmation, just a deferral to a human.

**Business cost:** the human then has to redo the entire conversation from the start, so the flow adds handling time instead of saving it.

### A9. Restart behavior

```
hi
```

**Expected failure:** the flow resets to the top and loses all context.

**Business cost:** count how many times you have now repeated yourself in a single conversation. That number goes on a slide.

---

## Session B, after hours, and this is the money finding

Send at **9:30pm on a weekday**, then again on a **Sunday**. Their stated hours are Monday to Saturday, 7:30am to 8:00pm.

```
Hi, I want to book a LASIK consultation
```

**What to capture:** whether any after hours or closed message exists, and the exact time a human first replies.

**Expected failure:** the same template fires and promises `LIVE agent kami akan segera menghubungi anda`. Log precisely how long "segera" turns out to be. A Sunday enquiry may sit until Monday morning.

**Business cost:** this outranks everything above combined. Their strongest channel is TikTok, TikTok LIVE peaks at night, and the reply system is asleep during exactly the hours their best traffic is awake. Every ringgit spent after 8pm lands on a promise the business does not keep, and the patient has already messaged a competitor by morning.

---

## Session C, two quick tests

### C1. Chinese language

```
你好，请问LASIK多少钱？
```

Tests the Chinese market segment the client raised in the pre proposal meeting. The website has no Chinese content at all, so confirm whether WhatsApp does any better.

### C2. Urgent symptom triage

```
Mata saya merah dan sakit sejak semalam, patut saya datang sekarang?
```

Tests whether an urgent symptom gets any handling or is queued behind the same sales menu as a LASIK price enquiry. Tell the agent it was a test if a human picks it up.

---

## Results log, fill this in as you run

| Test | Sent (time) | First reply (time) | Language of reply | Answered the question? | Screenshot ref | Notes |
|---|---|---|---|---|---|---|
| A1 English opener | | | | | | |
| A2 Language request | | | | | | |
| A3 Menu and desktop render | | | | | | |
| A4 Price in Malay | | | | | | |
| A5 RM2,500 promo | | | | | | |
| A6 Eligibility -1200 | | | | | | |
| A7 Child, Ortho-K | | | | | | |
| A8 Specific slot | | | | | | |
| A9 Restart | | | | | | |
| B1 Weekday 9:30pm | | | | | | |
| B2 Sunday | | | | | | |
| C1 Chinese | | | | | | |
| C2 Urgent symptom | | | | | | |

### Headline metrics to compute

- **Time to first human reply**, per session, business hours against after hours
- **Taps required** to reach a human
- **Times the patient repeated themselves** in one conversation
- **Questions asked against questions answered**, as a ratio
- **Data captured by the flow**: name, age, prescription, preferred date, source

That last metric is the one with our name on it. The website form collects `patientAge`, `apptDate`, `service`, and a `knowaboutus` attribution field. The WhatsApp flow collects none of it. **Paid leads arriving on WhatsApp carry no attribution at all**, so no booking can be traced back to the ad that produced it. For a performance retainer measured on patient volume, that gap makes the channel unmeasurable.

---

## Benchmark from the existing thread

Already captured before this script was written, and usable as is:

- 4:14pm, patient sends an English message
- 4:14pm, Malay template replies
- 4:15pm, patient asks for English
- 4:15pm, the identical Malay template replies again
- 4:16pm, patient taps through three menu steps
- 4:18pm, a WhatsApp Flow message fails to render on desktop
- 4:18pm, closing template promises a live agent shortly
- 4:21pm, a human replies with `Ya, Zaid, boleh saya bantu?`

Seven minutes, roughly four taps, and the patient still never received a price.

---

## How to present this without losing the room

Build the slide as two columns, **what the patient asked** against **what the system did**. The repetition does the persuading on its own, so the commentary can stay short.

**Give them the one thing that works.** A real human answered in about three minutes during business hours, which is genuinely good. Their people are fine. The system sitting in front of their people is what fails. That framing turns the audit from an attack into a fixable problem, and it makes the remaining findings land as credible rather than as a hatchet job.

**Point at the structural cause, not the staff.** Message templates cannot read free text, so no amount of retraining fixes A4 through A8. That conclusion is what justifies the recommendation, whether that lands as Respond.io, ManyChat, or a WhatsApp Business API setup with real routing.

---

## Related files

- `01-strategy/website-audit-2026-08-04.md`, the website audit. Section 9 records that the website has no WhatsApp entry point anywhere, which means this flow is currently reachable only through ads, direct search, and their TikTok profile.
- `05-meetings/2026-07-pre-proposal-meeting.md`, the pre proposal notes, including the Chinese segment and the TikTok LIVE ads discussion.
- `CLIENT.md`, scope and blockers.
