// Sedifly launch plan, 5 Nov 2026. Answers Ben's asks of 4 Nov on the rev-4 design.
// Account figures: act_803550292448381, pulled 4 Nov 2026 about 6pm SGT (scratchpad pull).

// ================================================================ 1 COVER
{
  const s = slide();
  s.addImage({ path: WORDMARK, x: 0.52, y: 0.72, w: 0.34 * 3.653, h: 0.34 });
  s.addText([
    { text: 'Launch plan', options: { color: C.ink, breakLine: true } },
    { text: 'for ', options: { color: C.ink } },
    { text: 'Sedifly', options: { italic: true, color: C.accent } },
  ], { x: 0.52, y: 1.42, w: 7, h: 1.95, fontFace: SERIF, fontSize: 57, margin: 0, valign: 'top', lineSpacingMultiple: 0.92 });
  s.addImage({ path: IMG('wave.png'), x: 0, y: H - 3.54, w: W, h: 3.54 });
}

// ================================================================ 2 SUMMARY
{
  const s = slide();
  const y = head(s, 'Your asks from 4 November', 'Five asks, ', 'and our answers',
    'Each row points to the slides with the detail. All launches and changes wait for your approval.');
  box(s, M, y, CW, BOTTOM - 0.56 - 0.2 - y);
  table(s, M + 0.2, y + 0.14, CW - 0.4,
    [{ label: 'Your ask', w: 22 }, { label: 'Our answer', w: 68 }, { label: 'Slides', w: 10, align: 'right' }],
    [
      ['Meta inventory', 'One campaign is live: the new Roscoe webinar at S$150 a day. Every Readiness Check campaign is paused, and slide 03 lists their IDs.', '03'],
      ['Creative review', 'Ke Yue\'s Reels and the Joash ad can run. The case study needs two small edits. Jeremy A and B can run after the copy and form changes, and C needs a re-cut.', '05 to 08'],
      ['Consultation CTA', 'It adds a consultation form and two ad sets with their own budgets. The month-one total stays close to our last forecast: 21 to 35 requests.', '04, 09, 10'],
      ['Launch and tracking', 'Ke Yue case study at S$600 a month for 24 to 40 downloads. View-only HubSpot access for us. Launch in the week of 16 November, or earlier if reviews finish sooner.', '06, 11, 13'],
      ['Channel expansion', 'Google Search from mid-January, after 30 days of Meta data. We suggest S$1,000 a month for two months.', '12'],
    ], { size: 10.2, rowH: 0.66 });
  band(s, 'Please send the copy for each ad and form, ', 'so we can review it before launch.');
}

// ================================================================ 3 META INVENTORY
{
  const s = slide();
  const y = head(s, 'Meta inventory', 'Your account ', 'on 4 November',
    'We pulled your account on 4 November. It holds 30 campaigns and 168 ads, and one campaign is live.');
  const lw = 4.7, lh = BOTTOM - y;
  box(s, M, y, lw, lh);
  mono(s, 'Live now', M + 0.23, y + 0.2, lw - 0.46, C.teal);
  T(s, '2026-11-15_Roscoe_G9-11_Webinar – New', { x: M + 0.23, y: y + 0.44, w: lw - 0.46, h: 0.3, fontFace: SANS6, fontSize: 11.5, color: C.ink });
  let ry = rows(s, [
    ['Campaign ID', '120256629675680569'],
    ['Budget', 'S$150 a day, set at campaign level'],
    ['Ad sets', 'Parent angle (120256629751870569) and Student Angle (120256629675700569), one ad in each'],
    ['Form', 'Instant Form with the Sign Up button'],
    ['Targeting', 'Ages 18 to 65 with Advantage+ audience on'],
  ], M + 0.23, y + 0.8, lw - 0.46, { keyW: 1.05, size: 9.4, gap: 0.05 });
  box(s, M + 0.18, ry + 0.06, lw - 0.36, BOTTOM - ry - 0.24, 'wash', px(10));
  mono(s, 'Two questions', M + 0.34, ry + 0.18, lw - 0.7, C.amber);
  bullets(s, [
    'At S$150 a day it can spend up to S$1,650 before the 15 November webinar. Does that sit inside or outside the S$2,000?',
    'Grade 9 to 11 students are 14 to 17, and Meta cannot show ads to anyone under 18, so the Student Angle ad set reaches adults. Shall we move its budget to the parent ad set?',
  ], M + 0.34, ry + 0.42, lw - 0.68, { size: 9.2, gap: 0.05, dot: C.amber, color: C.ink });

  const rx = M + lw + 0.19, rw = CW - lw - 0.19;
  const th = 3.3;
  box(s, rx, y, rw, th);
  mono(s, 'Admissions Readiness Check campaigns, all paused', rx + 0.23, y + 0.2, rw - 0.46, C.accent);
  table(s, rx + 0.12, y + 0.36, rw - 0.24,
    [{ label: 'Campaign and ID', w: 46 }, { label: 'Variants', w: 30 }, { label: 'Last edit', w: 11 }, { label: '30 days', w: 13, align: 'right' }],
    [
      ['MSA | Readiness Assessment | Messaging Test 01\n120256027176360569', 'Diagnostic, Planning, Prioritisation', '9 Oct', 'S$109\n1 lead'],
      ['MSA | Parents | Readiness Assessment | Test 01\n120256036587060569', 'Hidden gaps, Roadmap, Early planning', '5 Oct', 'S$45\n0 leads'],
      ['SG | Leads | Website+IF | Admissions Readiness\n120256206011020569', 'Personalised Guidance, Small-Group Strategy, Sedifly Environment', '16 Oct', 'S$396\n1 lead'],
      ['SG | Admissions | Leads | Evergreen Grades\n120256342662220569', 'Parent SG Admissions Reel', '26 Oct', 'S$95\n2 leads'],
    ], { size: 8.2, rowH: 0.56 });
  T(s, 'Together they spent S$644 in the last 30 days for 4 leads. None of their variants is running now.',
    { x: rx + 0.23, y: y + th - 0.3, w: rw - 0.46, h: 0.2, fontSize: 8.8, color: C.ink3 });
  const by = y + th + 0.16, bh = BOTTOM - by;
  box(s, rx, by, rw, bh, 'wash');
  mono(s, 'What we do with them', rx + 0.23, by + 0.16, rw - 0.46, C.accent);
  bullets(s, [
    'We leave the paused campaigns as they are, so your history stays in the account. The new plan runs in new campaigns, named so HubSpot shows which ad brought each lead.',
    'Instant Forms do not show at our access level. Please share the copy of the forms you use today, including the Admissions Readiness Check form, so we can match them.',
  ], rx + 0.23, by + 0.38, rw - 0.46, { size: 9, gap: 0.04, color: C.ink });
}

// ================================================================ 4 THE PLAN
{
  const s = slide();
  const y = head(s, 'The Meta plan', 'Five ad sets, ', 'one S$2,000 budget',
    'Jeremy\'s ads take S$300. We moved S$100 each from the Ke Yue Reel, the Ke Yue case study and Joash to fund them, so the total stays at S$2,000.');
  const n = 5, g = 0.15, cw = (CW - g * (n - 1)) / n, ch = 2.95;
  const sets = [
    ['Readiness Check', 'Applicants, 18 to 24', 'S$500 · S$17 a day', [['Creative', 'Ke Yue Reels, 33s and 19s'], ['Form', 'Readiness Check'], ['Expect', '9 to 13 requests']], 'Was S$600'],
    ['Consultation', 'Applicants, 18 to 24', 'S$300 · S$10 a day', [['Creative', 'Jeremy A and B'], ['Form', 'Consultation'], ['Expect', '3 to 5 requests']], 'New'],
    ['Ke Yue case study', 'Parents, 38 to 60', 'S$600 · S$20 a day', [['Creative', '4 statics and the carousel'], ['Form', 'Case study download'], ['Expect', '24 to 40 downloads']], 'Was S$700'],
    ['Consultation', 'Parents, 38 to 60', 'S$300 · S$10 a day', [['Creative', 'Joash interview'], ['Form', 'Consultation'], ['Expect', '2 to 4 requests']], 'Was S$400'],
    ['Retargeting', 'People who know Sedifly', 'S$300 · S$10 a day', [['Creative', 'Ke Yue Reels, 33s and 19s'], ['Form', 'Readiness Check'], ['Expect', '5 to 7 requests']], 'No change'],
  ];
  sets.forEach(([name, sub, money, rs, tag], i) => {
    const x = M + i * (cw + g);
    box(s, x, y, cw, ch);
    T(s, name, { x: x + 0.18, y: y + 0.18, w: cw - 0.36, h: 0.34, fontFace: SERIF, fontSize: 19, color: C.ink });
    T(s, sub, { x: x + 0.18, y: y + 0.53, w: cw - 0.36, h: 0.2, fontFace: SANS6, fontSize: 9.6, color: C.accent });
    chip(s, money, x + 0.18, y + 0.82);
    rows(s, rs, x + 0.18, y + 1.2, cw - 0.36, { keyW: 0.72, size: 9.2, gap: 0.06 });
    T(s, tag.toUpperCase(), { x: x + 0.18, y: y + ch - 0.32, w: cw - 0.36, h: 0.16, fontFace: MONO, bold: true, fontSize: 6.8, charSpacing: 0.8, color: tag === 'New' ? C.teal : C.ink3 });
  });
  const sy = y + ch + 0.2, sh = BOTTOM - sy, sw = (CW - 0.4) / 3;
  box(s, M, sy, CW, sh, 'wash');
  [
    ['When a new ad needs its own ad set', 'A new ad gets its own ad set when it changes the audience, the form or the offer. Otherwise it joins an existing ad set.'],
    ['Targeting', 'Singapore, fixed age bands, Advantage+ audience off. We exclude your clients and past leads.'],
    ['Objective and placements', 'Leads, with Instant Forms synced to HubSpot. Instagram and Facebook Feeds, Stories and Reels.'],
  ].forEach(([k, v], i) => {
    const x = M + 0.23 + i * (sw + 0.07);
    mono(s, k, x, sy + 0.2, sw - 0.2, C.accent);
    T(s, v, { x, y: sy + 0.44, w: sw - 0.25, h: sh - 0.55, fontSize: 9.8, color: C.ink, lineSpacingMultiple: 1.3 });
  });
}

// ===================================================== 5 KE YUE REELS AND JOASH
{
  const s = slide();
  const y = head(s, 'Creative review · Ke Yue Reels and Joash', 'Both are ', 'ready to run',
    'You made the edits we asked for on the Reels, and Joash now opens on him speaking. One claim on your website needs to match the Joash ad.');
  const fw = 1.38, fh = 2.45, g = 0.12;
  const fr = [
    ['n_ky19_13.8.png', '0:14', false, '19s Reel: the letter now reads "Admitted to University of Chicago".'],
    ['n_ky19_17.png', '0:15', false, 'The Readiness Check offer shows in the last 4 seconds of both cuts.'],
    ['n_joash_0.8.png', '0:00', true, 'Joash opens speaking, with 250+ offers over the shot.'],
    ['n_joash_25.5.png', '0:24', false, 'Ends on "Book a free consultation".'],
  ];
  fr.forEach(([img, t, warn, cap], i) => {
    const x = M + i * (fw + g);
    frame(s, img, x, y, fw, fh, t, warn);
    T(s, cap, { x, y: y + fh + 0.08, w: fw, h: 0.7, fontSize: 8.6, lineSpacingMultiple: 1.22 });
  });
  const lw = 4 * fw + 3 * g, rx = M + lw + 0.3, rw = CW - lw - 0.3;
  const h1 = 1.55;
  box(s, rx, y, rw, h1);
  mono(s, 'What your team changed', rx + 0.23, y + 0.2, rw - 0.46, C.accent);
  bullets(s, [
    'The Reel now runs in two cuts, 33 and 19 seconds, down from 45.',
    'The UChicago letter is labeled, and the end card names the free Readiness Check.',
    'Joash opens on him speaking at 0:00, with the 250+ offers line on screen.',
  ], rx + 0.23, y + 0.44, rw - 0.46, { size: 9.6, gap: 0.04 });
  const y2 = y + h1 + 0.15, h2 = 1.25;
  box(s, rx, y2, rw, h2);
  mono(s, 'Before launch', rx + 0.23, y2 + 0.2, rw - 0.46, C.amber);
  T(s, 'Your homepage says 250+ offers and 40%+ Ivy League and Oxbridge. Your Speedy Prep page still says 150+ and 30%+ (checked on 4 November). Please update the Speedy Prep page, so a parent who checks after seeing Joash finds the same number.',
    { x: rx + 0.23, y: y2 + 0.44, w: rw - 0.46, h: 0.75, fontSize: 9.6, color: C.ink, lineSpacingMultiple: 1.3 });
  const y3 = y2 + h2 + 0.15, h3 = BOTTOM - y3;
  box(s, rx, y3, rw, h3, 'wash');
  mono(s, 'Copy and setup', rx + 0.23, y3 + 0.18, rw - 0.46, C.accent);
  bullets(s, [
    'Please send the post copy, headline and description for both Reels and the Joash ad. The offer appears late in each Reel, so name the free Readiness Check in the first line and the headline.',
    'Joash keeps "Book a free consultation" and runs in the parent consultation ad set. Ke Yue stays out of the Joash ad, as you asked.',
  ], rx + 0.23, y3 + 0.42, rw - 0.46, { size: 9.4, gap: 0.04, color: C.ink });
}

// ========================================================= 6 KE YUE CASE STUDY
{
  const s = slide();
  const y = head(s, 'Ke Yue case study', 'Budget, KPIs and ', 'follow-up',
    'Your corrected files fix the SAT score and the last carousel card. Two small edits remain. Please send the copy for the statics, the carousel and the form.');
  const tw = 1.2, th = 1.5, nw = 0.85, g = 0.1;
  const thumbs = [['n_profile45.png', tw], ['n_diag45.png', tw], ['n_car1.png', tw]];
  thumbs.forEach(([img, w], i) => frame(s, img, M + i * (tw + g), y, w, th));
  const nx = M + 3 * (tw + g);
  frame(s, 'n_diag916.png', nx, y, nw, th, '9:16', true);
  const lw = 3 * tw + nw + 3 * g;
  T(s, 'The 4:5 statics and the carousel run in Feeds. The 9:16 statics run in Stories and stay out of Reels, where the caption and button cover the bottom third of the image.',
    { x: M, y: y + th + 0.1, w: lw, h: 0.55, fontSize: 9, lineSpacingMultiple: 1.25 });
  const fy = y + th + 0.72, fh = BOTTOM - fy;
  box(s, M, fy, lw, fh);
  mono(s, 'Two edits', M + 0.23, fy + 0.2, lw - 0.46, C.amber);
  bullets(s, [
    '9:16 diagnostic static: "Prestige-led list" sits under What changed without the "stronger fit" line the 4:5 version has. It reads as if Sedifly built a prestige list. Please add the line.',
    'PDF page 2: "The writing was strong; and the underlying story was a common one" reads better as "The writing was strong, but the underlying story was a common one."',
  ], M + 0.23, fy + 0.44, lw - 0.46, { size: 9.2, gap: 0.05, dot: C.amber, color: C.ink });

  const rx = M + lw + 0.3, rw = CW - lw - 0.3;
  box(s, rx, y, rw, BOTTOM - y);
  mono(s, 'Campaign setup for your approval', rx + 0.25, y + 0.22, rw - 0.5, C.accent);
  rows(s, [
    ['Budget', 'S$600 a month (S$20 a day), down from S$700 to fund Jeremy\'s ads'],
    ['Targeting', 'Parents in Singapore, ages 38 to 60, one ad set'],
    ['Placements', 'Feeds for the 4:5 statics and carousel, Stories for the 9:16 statics'],
    ['Form', 'Higher Intent Instant Form with the three Readiness Check questions: who is filling it in, the student\'s level, target universities'],
    ['Delivery', 'The form\'s thank-you screen links to the PDF'],
    ['Follow-up', 'Your team sends a Readiness Check invite on day 3, and a strategist calls each A or B lead within 24 hours. The PDF\'s button links to your Check My Readiness page with tracking tags, so it doesn’t need to change.'],
    ['KPIs', 'S$15 to S$25 per download (24 to 40 downloads), 40% to 55% scored A or B, 10% to 15% go on to request a Readiness Check'],
    ['Copy', 'Post copy, headline and description for each static and the carousel, plus the form copy, from your team'],
    ['Preview', 'We send a Meta preview link for each ad before launch'],
  ], rx + 0.25, y + 0.52, rw - 0.5, { keyW: 1.05, size: 9.4, gap: 0.06 });
}

// ========================================================= 7 JEREMY CREATIVE + COPY
{
  const s = slide();
  const y = head(s, 'Creative review · Jeremy Galang podcast ads', 'Two to run, ', 'one to re-cut',
    'Jeremy speaks to students, and "ITE to Columbia" gives ITE and poly students someone who took their route. A and B can run once your team updates the copy and form with the changes below and sends them to us.');
  const fw = 1.25, fh = 2.22, g = 0.14;
  const fr = [
    ['n_jA_1.png', 'A', false, 'Run', C.teal, '"I wish I had a mentor" (0:30). His first line tells students what the ad is about.'],
    ['n_jB_1.png', 'B', false, 'Run', C.teal, '"Conflicting advice" (0:21). The question on screen is about conflicting advice, but Jeremy talks about telling his own story. The post copy should connect the two.'],
    ['n_jC_1.5.png', 'C', true, 'Re-cut', C.amber, '"Beyond grades" (0:33). The first 5 seconds are a wide shot with small faces, and the clip stops mid-sentence at "the FITZ app".'],
  ];
  fr.forEach(([img, t, warn, verdict, col, cap], i) => {
    const x = M + i * (fw + g);
    frame(s, img, x, y, fw, fh, t, warn);
    const cwid = verdict.length * 0.075 + 0.24;
    s.addShape(pptx.ShapeType.roundRect, { x, y: y + fh + 0.1, w: cwid, h: 0.22, rectRadius: 0.04, fill: { color: col }, line: { type: 'none' } });
    T(s, verdict.toUpperCase(), { x, y: y + fh + 0.14, w: cwid, h: 0.15, fontFace: MONO, bold: true, fontSize: 7.2, color: C.lift, align: 'center' });
    T(s, cap, { x, y: y + fh + 0.4, w: fw, h: 1.45, fontSize: 8.8, lineSpacingMultiple: 1.22 });
  });
  const lw = 3 * fw + 2 * g, rx = M + lw + 0.3, rw = CW - lw - 0.3;
  const h1 = 3.05;
  box(s, rx, y, rw, h1);
  mono(s, 'Copy changes', rx + 0.23, y + 0.2, rw - 0.46, C.accent);
  bullets(s, [
    'Write to the student. Ad A asks about "your own or your child\'s" journey, but Jeremy talks to students and this ad set reaches 18 to 24.',
    'Open with "ITE to Columbia". Meta cuts the post copy after about two lines, so it has to sit in the first one.',
    'Cut "could", "may" and "explore how". Tell people what they get: a free consultation with a Sedifly strategist.',
    'Change the button from Sign Up to Book Now, which matches booking a call.',
    'In the brief, Ad B carries Ad A\'s title. We recommend renaming it to "Conflicting Advice".',
  ], rx + 0.23, y + 0.44, rw - 0.46, { size: 9.4, gap: 0.05 });
  const y2 = y + h1 + 0.15, h2 = BOTTOM - y2;
  box(s, rx, y2, rw, h2, 'wash');
  mono(s, 'Re-cut for C', rx + 0.23, y2 + 0.18, rw - 0.46, C.amber);
  T(s, 'Open on Jeremy\'s close-up at "The first one was definitely the national service experience". Cut Joash\'s opening line, "Everyone has a 1550 and above SAT score". A 1550 is a top score, so ITE and poly students without one may decide the ad is not for them and scroll past. End on what National Service and his app added to his application.',
    { x: rx + 0.23, y: y2 + 0.42, w: rw - 0.46, h: h2 - 0.5, fontSize: 9.4, color: C.ink, lineSpacingMultiple: 1.3 });
}

// ========================================================= 8 JEREMY FORMS + SETUP
{
  const s = slide();
  const y = head(s, 'Jeremy Galang podcast ads', 'Forms, setup ', 'and KPIs',
    'Jeremy A and B share one ad set with the consultation form. It reaches the same applicants as the Ke Yue Reels, which offer the Readiness Check.');
  const lw = 5.3, lh = 3.12;
  box(s, M, y, lw, lh);
  mono(s, 'Form changes', M + 0.23, y + 0.2, lw - 0.46, C.accent);
  bullets(s, [
    'One consultation form for Jeremy A, Jeremy B and Joash, so their results compare.',
    'Higher Intent form type, so people review their answers before they submit.',
    'The three Readiness Check questions: who is filling it in, the student\'s level and target universities. We added ITE to the level options.',
    'Your draft does not ask where the student wants to apply, so we could not score its leads A to D.',
    'A thank-you screen that says who gets in touch and when: "A Sedifly strategist will WhatsApp you within one working day to book a time."',
  ], M + 0.23, y + 0.46, lw - 0.46, { size: 9.2, gap: 0.04 });
  const ay = y + lh + 0.15, ah = BOTTOM - ay;
  box(s, M, ay, lw, ah, 'ink');
  T(s, 'How we set the cost', { x: M + 0.25, y: ay + 0.14, w: lw - 0.5, h: 0.3, fontFace: SERIF, fontSize: 16, color: C.lift });
  T(s, 'Your account has no consultation ads to learn from. A call asks more of a student than a Readiness Check, so we set the cost at 1.5 to 2 times your September test\'s S$38 a lead.',
    { x: M + 0.25, y: ay + 0.46, w: lw - 0.5, h: ah - 0.5, fontSize: 9, color: 'C9D5E8', lineSpacingMultiple: 1.28 });

  const rx = M + lw + 0.19, rw = CW - lw - 0.19;
  const h1 = BOTTOM - y;
  box(s, rx, y, rw, h1);
  mono(s, 'Campaign setup', rx + 0.25, y + 0.2, rw - 0.5, C.accent);
  rows(s, [
    ['Targeting', 'Singapore, ages 18 to 24, Advantage+ audience off, clients and past leads excluded'],
    ['Placements', 'Instagram and Facebook Reels and Stories. A Feed crop would cut the top text on Jeremy B.'],
    ['Testing', 'A and B run in the same ad set. Once each ad has 2,000 plays, we keep the one with the higher hook rate and lower cost per request.'],
    ['Budget', 'S$300 a month (S$10 a day)'],
    ['Timeline', 'You approve the copy and form by Tue 10 Nov, we send previews by Fri 13 Nov, and the ads go live in the week of 16 Nov. C joins after the re-cut.'],
    ['KPIs', '3 to 5 consultation requests a month at S$55 to S$85 each, a hook rate of 25% or more, and 50% to 65% of leads scored A or B'],
  ], rx + 0.25, y + 0.5, rw - 0.5, { keyW: 1.05, size: 9.6, gap: 0.08 });
}

// ================================================================ 9 CONSULTATION CTA
{
  const s = slide();
  const y = head(s, 'The consultation CTA', 'A second offer ', 'with its own form',
    'Yes, it changes the setup and the forecast. Requests now come through two offers at different costs, and HubSpot tracks each one.');
  const n = 3, g = 0.19, cw = (CW - g * (n - 1)) / n, ch = BOTTOM - 0.56 - 0.2 - y;
  // setup
  box(s, M, y, cw, ch);
  mono(s, 'Setup', M + 0.23, y + 0.2, cw - 0.46, C.accent);
  bullets(s, [
    'A consultation Instant Form sits beside the Readiness Check form. HubSpot shows which form each lead came through, so you can see the offer they chose.',
    'Two consultation ad sets, Jeremy for applicants and Joash for parents, each with a fixed budget. Fixed budgets stop Meta from moving all the money to the cheaper offer.',
    'The weekly one-pager shows the two offers side by side.',
  ], M + 0.23, y + 0.46, cw - 0.46, { size: 9.6, gap: 0.06 });
  // forecast
  const x2 = M + cw + g;
  box(s, x2, y, cw, ch);
  mono(s, 'Forecast', x2 + 0.23, y + 0.2, cw - 0.46, C.accent);
  table(s, x2 + 0.12, y + 0.42, cw - 0.24,
    [{ label: 'Offer', w: 40 }, { label: 'Spend', w: 22, align: 'right' }, { label: 'Requests', w: 38, align: 'right' }],
    [
      ['Readiness Check', 'S$1,400', '16 to 26'],
      ['Consultation', 'S$600', '5 to 9'],
      ['Total', 'S$2,000', '21 to 35'],
    ], { size: 9.8, rowH: 0.36, totalRow: 2 });
  T(s, 'Our last forecast was 20 to 33. The higher consultation cost applies to S$600 of the S$2,000, so the total stays close.',
    { x: x2 + 0.23, y: y + 1.95, w: cw - 0.46, h: 0.62, fontSize: 9.4, color: C.ink, lineSpacingMultiple: 1.3 });
  T(s, 'Readiness Check covers the Ke Yue Reels, retargeting and case study follow-ups. Consultation covers Jeremy and Joash. Cost per request: S$38 to S$55 for the Readiness Check, S$55 to S$130 for a consultation.',
    { x: x2 + 0.23, y: y + 2.62, w: cw - 0.46, h: 0.9, fontSize: 8.8, color: C.ink3, lineSpacingMultiple: 1.28 });
  // reading the test
  const x3 = M + 2 * (cw + g);
  box(s, x3, y, cw, ch, 'wash');
  mono(s, 'Reading the test', x3 + 0.23, y + 0.2, cw - 0.46, C.accent);
  bullets(s, [
    'The two applicant ad sets differ in creative as well as offer. Month one tells you which pairing of creative and offer works.',
    'For a read on the CTA alone, export Jeremy A once more with a Readiness Check end card and run the same video with both forms.',
    'We compare the offers on cost per attended meeting after six to eight weeks, once enough people have come to a call.',
  ], x3 + 0.23, y + 0.46, cw - 0.46, { size: 9.6, gap: 0.06, color: C.ink });
  band(s, 'One question: does a Readiness Check lead into a consultation, ', 'or are they separate first meetings?');
}

// ================================================================ 10 FORECAST
{
  const s = slide();
  const y = head(s, 'First-month forecast', 'Month one, ', '21 to 35 requests',
    'We kept the stages and rates from the September proposal and the cost bands from our last plan, and added the consultation ad sets.');
  const lw = 6.1, th = 3.0;
  box(s, M, y, lw, th);
  mono(s, 'By ad set', M + 0.2, y + 0.18, lw - 0.4, C.accent);
  table(s, M + 0.12, y + 0.36, lw - 0.24,
    [{ label: 'Ad set', w: 34 }, { label: 'Budget', w: 16, align: 'right' }, { label: 'Cost each', w: 26, align: 'right' }, { label: 'Requests', w: 24, align: 'right' }],
    [
      ['Readiness Check, applicants', 'S$500', 'S$38 to S$55', '9 to 13'],
      ['Consultation, applicants', 'S$300', 'S$55 to S$85', '3 to 5'],
      ['Ke Yue case study', 'S$600', 'S$15 to S$25', '2 to 6'],
      ['Consultation, parents', 'S$300', 'S$70 to S$130', '2 to 4'],
      ['Retargeting', 'S$300', 'S$38 to S$55', '5 to 7'],
      ['Total', 'S$2,000', '', '21 to 35'],
    ], { size: 9.4, rowH: 0.34, totalRow: 5 });
  const rx = M + lw + 0.19, rw = CW - lw - 0.19;
  box(s, rx, y, rw, th);
  mono(s, 'Funnel', rx + 0.2, y + 0.18, rw - 0.4, C.accent);
  table(s, rx + 0.12, y + 0.36, rw - 0.24,
    [{ label: 'Stage', w: 30 }, { label: 'Rate', w: 22 }, { label: 'Low', w: 11, align: 'right' }, { label: 'High', w: 11, align: 'right' }, { label: 'Media each', w: 26, align: 'right' }],
    [
      ['Requests', 'All five ad sets', '21', '35', 'S$95 to S$57'],
      ['Qualified, A or B', '50% to 65%', '10', '22', 'S$200 to S$91'],
      ['Booked', '75% to 90%', '7', '19', 'S$286 to S$105'],
      ['Attended', '80% to 83%', '5', '15', 'S$400 to S$133'],
      ['Enrolled', '20% to 30%', '1', '4', 'S$2,000 to S$500'],
    ], { size: 9.4, rowH: 0.4 });
  const ay = y + th + 0.2, ah = BOTTOM - ay;
  box(s, M, ay, CW, ah, 'wash');
  mono(s, 'Assumptions and sources', M + 0.23, ay + 0.18, 4, C.accent);
  const aw = (CW - 0.46 - 0.3) / 2;
  bullets(s, [
    'Readiness Check: S$38 in your September diagnostic test. Retargeting: your warm ad sets averaged S$48. Ke Yue: 24 to 40 downloads at S$15 to S$25 (your eBook: S$21), and 10% to 15% go on to request.',
    'Consultation: no history in your account, so 1.5 to 2 times the Readiness Check cost for applicants. Parents use our last Joash band, S$70 to S$130.',
  ], M + 0.23, ay + 0.44, aw, { size: 9, gap: 0.05, color: C.ink });
  bullets(s, [
    'Both offers use the same funnel rates until HubSpot shows a difference. Your team calls each request within 5 minutes, between 10:00 and 22:00.',
    'Weeks one and two cost more while Meta learns, and most enrollments land in months two and three. Your HubSpot numbers replace every band after 30 days.',
  ], M + 0.23 + aw + 0.3, ay + 0.44, aw, { size: 9, gap: 0.05, color: C.ink });
}

// ================================================================ 11 HUBSPOT
{
  const s = slide();
  const y = head(s, 'HubSpot access', 'View-only access ', 'to your ad leads',
    'Please add jordan@toggle.solutions as a view-only user. We need to see the leads from your ads and how far each one gets.');
  const lw = 3.3, mw = 4.75, rw = CW - lw - mw - 0.38, h = 3.45;
  box(s, M, y, lw, h);
  mono(s, 'What we look at', M + 0.23, y + 0.2, lw - 0.46, C.accent);
  T(s, 'View-only seat', { x: M + 0.23, y: y + 0.44, w: lw - 0.46, h: 0.36, fontFace: SERIF, fontSize: 20, color: C.ink });
  bullets(s, [
    'The leads from each ad and their answers to the form questions.',
    'How far each lead gets: qualified, booked, attended and enrolled.',
    'We use these numbers in the weekly one-pager and the 30-day review.',
  ], M + 0.23, y + 0.92, lw - 0.46, { size: 9.6, gap: 0.06 });

  const mx = M + lw + 0.19;
  box(s, mx, y, mw, h);
  mono(s, 'Access we need', mx + 0.23, y + 0.2, mw - 0.46, C.accent);
  table(s, mx + 0.12, y + 0.4, mw - 0.24,
    [{ label: 'Area', w: 30 }, { label: 'Access and why', w: 70 }],
    [
      ['Contacts', 'View, to see each lead and its form answers'],
      ['Deals', 'View, to see booked, attended and enrolled'],
      ['Ads', 'View, to see which ad brought each lead'],
      ['Lists', 'View, to check who the ads exclude'],
      ['Reports', 'View, to read your lead dashboards'],
    ], { size: 9, rowH: 0.46, boldFirst: true });
  T(s, 'Not needed: edit rights, admin, billing or user management.', { x: mx + 0.23, y: y + h - 0.36, w: mw - 0.46, h: 0.2, fontSize: 8.8, color: C.ink3 });

  const rx = mx + mw + 0.19;
  box(s, rx, y, rw, h, 'wash');
  mono(s, 'From your side', rx + 0.23, y + 0.2, rw - 0.46, C.amber);
  bullets(s, [
    'Connect the Meta Instant Forms to HubSpot, so each lead arrives with its form and ad name. We send a test lead before launch to check it.',
    'Who updates booked, attended and enrolled in HubSpot? We need one name, and each update within 24 hours of the call.',
  ], rx + 0.23, y + 0.46, rw - 0.46, { size: 9.4, gap: 0.07, dot: C.amber, color: C.ink });
}

// ================================================================ 12 GOOGLE SEARCH
{
  const s = slide();
  const y = head(s, 'Channel expansion', 'Google Search, ', 'from month two',
    'We suggest adding Google Search in mid-January, after 30 days of Meta, when HubSpot can show which Meta leads qualify.');
  const lw = 3.4, h = BOTTOM - y;
  box(s, M, y, lw, h);
  mono(s, 'Why Search', M + 0.23, y + 0.2, lw - 0.46, C.accent);
  T(s, 'Parents and students who type "US university admissions consultant Singapore" want help now. Of the channels we looked at, Search has the strongest case on audience fit and lead quality.',
    { x: M + 0.23, y: y + 0.44, w: lw - 0.46, h: 1.2, fontSize: 9.6, color: C.ink, lineSpacingMultiple: 1.3 });
  hr(s, M + 0.23, y + 1.72, lw - 0.46, C.line);
  mono(s, 'Why not the others', M + 0.23, y + 1.84, lw - 0.46, C.ink3);
  bullets(s, [
    'TikTok: each ad group needs more than US$20 a day, about S$800 a month, so S$500 cannot fund one. It also cannot reach under-18s.',
    'LinkedIn: targets job titles, not families planning university.',
    'YouTube: builds awareness, with few direct leads at this budget.',
  ], M + 0.23, y + 2.1, lw - 0.46, { size: 9, gap: 0.05 });

  const mx = M + lw + 0.19, mw = 5.45, mh = 2.9;
  box(s, mx, y, mw, mh);
  mono(s, 'Two budget options', mx + 0.23, y + 0.2, mw - 0.46, C.accent);
  table(s, mx + 0.12, y + 0.38, mw - 0.24,
    [{ label: 'Option', w: 38 }, { label: 'Clicks', w: 19, align: 'right' }, { label: 'Requests', w: 18, align: 'right' }, { label: 'Cost each', w: 25, align: 'right' }],
    [
      ['S$500 a month\nBrand and top intent', '100 to 165', '4 to 11', 'S$45 to S$125'],
      ['S$1,000 a month\nPlus wider terms', '170 to 290', '5 to 17', 'S$59 to S$200'],
    ], { size: 9.2, rowH: 0.52 });
  T(s, 'We suggest S$1,000 a month for two months. Google\'s automated bidding needs about 30 conversions a month, which neither option reaches, so we set bids by hand. Two months at S$1,000 gives you 10 to 34 requests to judge quality on.',
    { x: mx + 0.23, y: y + 1.85, w: mw - 0.46, h: 0.95, fontSize: 9.2, color: C.ink, lineSpacingMultiple: 1.28 });
  const ay = y + mh + 0.15, ah = BOTTOM - ay;
  box(s, mx, ay, mw, ah, 'wash');
  mono(s, 'Assumptions', mx + 0.23, ay + 0.16, mw - 0.46, C.accent);
  T(s, 'S$3 to S$5 a click on brand and top-intent terms, S$4 to S$7 on wider terms. 4% to 7% of clicks request a Readiness Check, 2% to 5% on wider terms. We replace these estimates with Google\'s keyword volumes and bids before you approve a budget. January follows the US Regular Decision deadlines, so the first weeks may run quieter.',
    { x: mx + 0.23, y: ay + 0.38, w: mw - 0.46, h: ah - 0.44, fontSize: 8.7, color: C.ink, lineSpacingMultiple: 1.28 });

  const rx = mx + mw + 0.19, rw = CW - lw - mw - 0.38;
  box(s, rx, y, rw, h, 'ink');
  T(s, 'What Search needs', { x: rx + 0.22, y: y + 0.18, w: rw - 0.44, h: 0.36, fontFace: SERIF, fontSize: 19, color: C.lift });
  const need = [
    'A landing page with the Readiness Check form. Your Check My Readiness page could serve.',
    'Google Ads conversion tracking on that form, and the form feeding HubSpot.',
    'Access to your Google Ads account, or a new one in your name.',
    'We report brand and non-brand searches apart, since people who search "Sedifly" know you before they click.',
  ];
  let ny = y + 0.66;
  need.forEach((t) => {
    s.addShape(pptx.ShapeType.roundRect, { x: rx + 0.22, y: ny + 0.07, w: 0.062, h: 0.062, rectRadius: 0.012, fill: { color: C.aqua }, line: { type: 'none' } });
    const th = textH(t, rw - 0.64, 9.4, 1.3) + 0.04;
    T(s, t, { x: rx + 0.42, y: ny, w: rw - 0.64, h: th + 0.1, fontSize: 9.4, color: 'C9D5E8', lineSpacingMultiple: 1.3 });
    ny += th + 0.12;
  });
}

// ================================================================ 13 LAUNCH
{
  const s = slide();
  const y = head(s, 'Launch', 'Live in the week of ', '16 November',
    'We moved the launch a week so your team has time to review the copy, forms and previews. If the reviews and revisions finish sooner, we can launch earlier.');
  const steps = [
    ['5 to 10 Nov', 'You review', 'Approve this plan. Send the copy for each ad and form, including the revised Jeremy copy. Share HubSpot access.'],
    ['11 to 13 Nov', 'We build', 'Forms, audiences and ads. We send a Meta preview link for each ad by Fri 13 Nov.'],
    ['Week of 16 Nov', 'Launch', 'All five ad sets go live once you approve the previews and a test lead reaches HubSpot.'],
    ['Tue 24 Nov', 'First one-pager', 'Then every Tuesday.'],
    ['Mid-December', '30-day review', 'We reset the targets on your HubSpot numbers and decide on Google Search.'],
  ];
  const n = steps.length, sw = (CW - 0.15 * (n - 1)) / n, sh = 1.62;
  hr(s, M + 0.08, y + 0.075, CW - 0.16, C.accent, 0.022);
  steps.forEach(([d, h, t], i) => {
    const x = M + i * (sw + 0.15), ink = i === 2;
    s.addShape(pptx.ShapeType.ellipse, { x: x + 0.02, y, w: 0.17, h: 0.17, fill: { color: ink ? C.accent : C.paper }, line: { color: C.accent, width: 2 } });
    box(s, x, y + 0.32, sw, sh, ink ? 'ink' : 'card');
    T(s, d, { x: x + 0.16, y: y + 0.46, w: sw - 0.32, h: 0.34, fontFace: SERIF, fontSize: 18, color: ink ? C.lift : C.ink });
    T(s, h, { x: x + 0.16, y: y + 0.8, w: sw - 0.32, h: 0.2, fontFace: SANS6, fontSize: 9.8, color: ink ? C.aqua : C.accent });
    T(s, t, { x: x + 0.16, y: y + 1.05, w: sw - 0.32, h: 0.85, fontSize: 8.9, color: ink ? 'C9D5E8' : C.ink2, lineSpacingMultiple: 1.22 });
  });
  const cy = y + sh + 0.5, ch = BOTTOM - cy, lw = 6.0;
  box(s, M, cy, lw, ch);
  mono(s, 'What we need from your team', M + 0.23, cy + 0.2, lw - 0.46, C.accent);
  bullets(s, [
    'Post copy, headline and description for the Ke Yue Reels, statics, carousel and the Joash ad (slides 05 and 06).',
    'The revised Jeremy A and B copy and the consultation form copy (slides 07 and 08).',
    'View-only HubSpot access for jordan@toggle.solutions, with the Meta forms connected to HubSpot (slide 11).',
    'Your client and past-lead lists, so the ads skip people you know.',
  ], M + 0.23, cy + 0.46, lw - 0.46, { size: 9.4, gap: 0.05 });
  const rx = M + lw + 0.19, rw = CW - lw - 0.19;
  box(s, rx, cy, rw, ch);
  mono(s, 'Open questions', rx + 0.23, cy + 0.2, rw - 0.46, C.amber);
  bullets(s, [
    'Roscoe webinar: inside or outside the S$2,000 (slide 03)?',
    'Who updates booked, attended and enrolled in HubSpot (slide 11)?',
    'Speedy Prep page: can it show 250+ offers, as the homepage does (slide 05)?',
    'Readiness Check and consultation: one path or two (slide 09)?',
  ], rx + 0.23, cy + 0.46, rw - 0.46, { size: 9.4, gap: 0.04, dot: C.amber, color: C.ink });
}

pptx.writeFile({ fileName: OUT }).then((f) => console.log('wrote ' + f));
