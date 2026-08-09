# Aina, Demo Conversation

A worked transcript of the proposed WhatsApp agent handling one realistic patient. Every Aina line here is traceable to a rule in `ikonik-whatsapp-agent-v1-2026-08-04.md`. Nothing is aspirational: if the spec cannot produce a line, the line is not in this demo.

**Scenario.** Tuesday, 9:42pm. The clinic closed at 8pm. The patient taps a click-to-WhatsApp ad on TikTok, so a referral payload arrives with the first message. He opens in English, switches to Malay, switches back to English to argue about price, then drifts back to Malay. He also asks about his mother.

**Setup for the presentation.** Run the current template flow first, then this. The contrast does the work.

---

## The conversation

> **Patient** · 9:42pm
> Hi, saw your ad on TikTok. How much is LASIK for both eyes?

> **Aina**
> Hi! 🙂 Our Flapless LASIK promo is RM2,500 per eye, so RM5,000 for both eyes. The final price is confirmed after your eye assessment.

> **Aina**
> We're closed right now, so our team will call you tomorrow from 7:30am. We only keep your name, age and number to arrange the appointment, under PDPA 2010.

> **Aina**
> May I have your name?

`Answers in English because the patient wrote English. Answers the actual question asked, with the both-eyes total worked out. States closing time up front instead of at the end. PDPA notice before the first data question. Never asks how he heard about IKONIK, because the TikTok referral payload already recorded it.`

> **Patient** · 9:43pm
> wait, where are you located? got parking?

> **Aina**
> We're at Residensi Park Bukit Jalil, Persiaran Jalil Utama, and there's parking on site. May I have your name?

`Answers from the Knowledge Source, then returns to the field it still needs without repeating itself or nagging.`

> **Patient**
> Zaid. eh boleh cakap melayu tak

> **Aina**
> Boleh Zaid! Ni untuk awak sendiri, atau nak tanya pasal anak?

`Switches on the same turn, then keeps working. Asks the age question as a band ("for yourself or for a child") rather than demanding a number from a stranger. This single exchange is the one the current template fails: it replays the same Malay template instead.`

> **Patient**
> sendiri. sy 34

> **Aina**
> Ok noted! Saya guna nombor WhatsApp ni untuk booking ya?

> **Patient**
> power sy -1100 kot. tinggi sangat x? boleh buat ke

> **Aina**
> Flapless Smart Signature kami boleh buat sehingga power -1200, tapi kelayakan sebenar kena confirm lepas pemeriksaan mata ya. Nombor WhatsApp ni ok untuk team call awak?

`The highest-intent question in the category. Aina names the fact that answers it, then stops short of confirming candidacy, which is a clinical decision. It never asked for his prescription, it only used what he volunteered.`

> **Patient**
> ok. berapa lama kena cuti kerja lepas buat?

> **Aina**
> Doktor akan confirm detail tu masa pemeriksaan nanti ya. Nombor ni ok untuk team hubungi awak?

`Recovery time is not a pinned fact, so Aina uses the fixed deflection line rather than inventing a number. This is the behavior that keeps the clinic out of trouble.`

> **Patient**
> ok. mak sy pulak ada katarak, 62 tahun. berapa harga katarak?

> **Aina**
> Harga katarak depends jenis lens dan hasil pemeriksaan, doktor akan confirm lepas assessment. Untuk mak awak, senang kalau dia WhatsApp kami terus, atau team boleh ambil butiran dia masa call esok.

`No cataract price exists on the clinic's own website, so Aina states none rather than guessing. It also does not try to absorb a second patient into this thread, because one conversation holds one patient record.`

> **Patient** · 9:48pm
> wait let me ask in english. Optimax quoted my friend RM1,800 per eye. why is yours more expensive?

> **Aina**
> Prices depend on the technology used and each patient's eye condition, so they are not directly comparable. Our RM660 comprehensive assessment gives you an exact quote for your own eyes.

> **Patient**
> is the RM660 refundable if i don't proceed?

> **Aina**
> The team will confirm that when they call you tomorrow morning. Is this WhatsApp number the best one for them?

`Switches back to English on the same turn. Holds the price line twice under pressure, never names the competitor back, never repeats their figure, never offers a discount to win the argument.`

> **Patient**
> yes this number. sabtu pagi boleh?

> **Aina**
> Ok Zaid, terima kasih! Team kami akan call awak kat nombor ni esok pagi lepas 7:30 untuk confirm slot Sabtu. Jumpa nanti!

`Mixed Malay and English reads as Malay, so Aina follows. Lead is complete: name, age band, service, number, preferred day, source. The record now says the lead came from the TikTok ad, without ever asking.`

> **Patient** · 9:51pm
> ok. oh ya satu lagi, mak sy cakap dia nampak macam tirai turun kat mata kanan dia sejak petang tadi

> **Aina**
> Ini kecemasan mata. Terus ke jabatan kecemasan hospital SEKARANG, jangan tunggu.

> **Patient**
> serious ke? boleh tunggu esok x

> **Aina**
> Ini kecemasan mata. Terus ke jabatan kecemasan hospital SEKARANG, jangan tunggu.

`A curtain across the vision is a red flag for retinal detachment, where delay costs sight. Aina catches it buried inside a casual "oh ya satu lagi" after the booking was already settled, drops the sales conversation entirely, and sends him to a hospital rather than the closed clinic. When pushed on whether it can wait, it repeats the approved line word for word instead of improvising reassurance. The conversation is tagged Urgent Clinical and assigned to a human immediately.`

---

## A second conversation, in Chinese

> **Patient**
> 你好，请问近视手术多少钱？

> **Aina**
> 您好!我们的无刀无瓣激光矫视手术促销价是每只眼 RM2,500,双眼 RM5,000,最终价格在眼睛检查后确认。

> **Aina**
> 我们现在已下班,团队明早 7:30 后会联系您。我们只保存您的姓名、年龄和电话用于安排预约,依据 2010 年个人数据保护法。请问怎么称呼您?

---

## What to say while presenting this

**Lead with the emergency, not the price.** A clinic owner cares more about liability than about a won argument. The moment worth pausing on is Aina catching a sight-threatening symptom that arrived as a throwaway line after the booking was done, at 9:51pm when nobody was in the building.

**Then show the language switch.** Put the current template's screenshot next to it: the same Malay message sent twice to someone who asked for English. The fix is visible in one screen.

**Then the money.** Three questions in this conversation would each end the current flow dead: the price for both eyes, eligibility at -1100, and a competitor's cheaper quote. The template answers none of them, because a template cannot read a sentence.

**Attribution is the quiet one.** Aina never asks how he heard about IKONIK, because the ad click already said so. Every booking traces back to the ad that produced it, which is what makes the channel measurable.

---

## Honest notes before this is shown to anyone

1. **This is a spec walkthrough, not a recording.** It shows what the written agent produces. It has not been run in respond.io, because the agent is not built yet. Say that plainly if asked, and offer a live test after build.
2. **The Knowledge Source answer** (location and parking) assumes the clinic's pages have been loaded into respond.io. That is a setup step, not a prompt behavior.
3. **The referral payload** requires the WhatsApp connection to pass Meta's `ctwa_clid` into contact fields. Also a setup step.
4. **Two gaps this demo exposed**, both now on the v1.1 list:
   - **Multi-patient households.** Zaid asking about his mother is common, especially for the 50+ cataract segment. v1 correctly refuses to fake it, but the right fix is a proper second-patient path, which needs prompt budget the current 9,894 of 9,900 characters does not have.
   - **Naming the emergency hospital.** Aina says "hospital emergency department." Most private hospitals in KL do not run 24-hour ophthalmology cover, so a generic instruction can cost the patient hours. Naming a specific 24-hour facility would be better advice, and it needs the clinic's clinical sign-off before we put it in the agent's mouth.
5. **The RM2,500 promo is quoted throughout.** If that promo has ended, this demo is wrong. Confirm before showing.
