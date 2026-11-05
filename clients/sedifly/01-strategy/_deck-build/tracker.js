// Builds the Sedifly Meta Ads Tracker (Excel). Inventory comes from the read-only pull of
// act_803550292448381 on 4 Nov 2026 (pass the pull folder as argv[2]).
const ExcelJS = require('exceljs');
const path = require('path');
const PULL = process.argv[2];
const OUT = 'C:/Users/Jordan/Desktop/Sedifly/Sedifly Plans/Sedifly - Meta Ads Tracker.xlsx';

const INK = 'FF0E1B33', WASH = 'FFE3EDFC', LINE = 'FFD5E2F0', ACC = 'FF2A6BE0', FILL_IN = 'FFFFF8E1', WHITE = 'FFFFFFFF', GREY = 'FF4A5A75';
const F = 'Arial';
const wb = new ExcelJS.Workbook();
wb.creator = 'Toggle Solutions';
wb.created = new Date('2026-11-05T09:00:00+08:00');

const border = { top: { style: 'thin', color: { argb: LINE } }, bottom: { style: 'thin', color: { argb: LINE } }, left: { style: 'thin', color: { argb: LINE } }, right: { style: 'thin', color: { argb: LINE } } };
function headRow(ws, r, fill = INK, color = WHITE) {
  ws.getRow(r).eachCell({ includeEmpty: false }, (c) => {
    c.font = { name: F, bold: true, size: 10, color: { argb: color } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } };
    c.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
    c.border = border;
  });
}
function body(ws, from, to, cols) {
  for (let r = from; r <= to; r++) for (let c = 1; c <= cols; c++) {
    const cell = ws.getCell(r, c);
    cell.font = Object.assign({ name: F, size: 10, color: { argb: 'FF1A2433' } }, cell.font && cell.font.bold ? { bold: true } : {});
    cell.alignment = { vertical: 'top', wrapText: true };
    cell.border = border;
  }
}
function title(ws, text, sub) {
  ws.getCell('A1').value = text;
  ws.getCell('A1').font = { name: F, bold: true, size: 15, color: { argb: INK } };
  if (sub) { ws.getCell('A2').value = sub; ws.getCell('A2').font = { name: F, size: 10, color: { argb: GREY } }; }
}

// ------------------------------------------------------------------ 1 HOW TO USE
{
  const ws = wb.addWorksheet('How to use', { views: [{ showGridLines: false }] });
  ws.columns = [{ width: 4 }, { width: 120 }];
  title(ws, 'Sedifly Meta Ads Tracker', 'Shared by Sedifly and Toggle. Last updated 5 November 2026.');
  const steps = [
    ['Purpose', 'This file tracks every Meta ad from request to launch. Your team adds the ad and its copy, and Toggle adds the campaign setup. No ad goes live until a Sedifly approver marks the row Approved.'],
    ['1. Add a new ad', 'Go to the Ad requests tab and fill the yellow cells in the first empty row: request date, your name, the creative, the asset link, the post copy, headline, description and the date you want it live.'],
    ['2. Toggle review', 'Toggle checks the copy and creative, writes any changes in the Toggle feedback column and sets the status to Toggle review or Changes needed.'],
    ['3. Setup and preview', 'Toggle fills in the campaign, ad set, form and placements, builds the ad as a draft and pastes a Meta preview link. The status moves to Preview sent.'],
    ['4. Your approval', 'Open the preview link. If it is right, set the status to Approved and add your name and the date. If not, write what to change in the Notes column.'],
    ['5. Launch', 'Toggle launches the ad, sets the status to Live and adds the live date, ad ID and creative ID.'],
    ['Changing a live ad', 'Add a new row for the changed version. Do not overwrite a live row, so the history stays readable. Toggle pauses the old ad when the new one goes live.'],
    ['When an ad needs its own ad set', 'A new ad gets its own ad set when it changes the audience, the form or the offer. Otherwise it joins an existing ad set. The Campaign setup tab lists the ad sets.'],
    ['Statuses', 'Requested, Toggle review, Changes needed, Preview sent, Approved, Live, Paused, On hold.'],
    ['Other tabs', 'Campaign setup (one row per ad set), Instant Forms (questions and screens), Naming (how campaigns and ads are named), Inventory (every campaign, ad set and ad in your account on 4 Nov 2026) and Change log.'],
  ];
  steps.forEach(([k, v], i) => {
    const r = 4 + i * 2;
    ws.getCell(r, 2).value = k; ws.getCell(r, 2).font = { name: F, bold: true, size: 11, color: { argb: ACC } };
    ws.getCell(r + 1, 2).value = v; ws.getCell(r + 1, 2).font = { name: F, size: 10.5, color: { argb: 'FF1A2433' } };
    ws.getCell(r + 1, 2).alignment = { wrapText: true, vertical: 'top' };
    ws.getRow(r + 1).height = 30;
  });
}

// ------------------------------------------------------------------ 2 AD REQUESTS
const STATUSES = ['Requested', 'Toggle review', 'Changes needed', 'Preview sent', 'Approved', 'Live', 'Paused', 'On hold'];
const ADSETS = {
  rc: 'tg_sedifly_20261116_prospecting_leadgen_instantform_applicants-readiness',
  ca: 'tg_sedifly_20261116_prospecting_leadgen_instantform_applicants-consult',
  cs: 'tg_sedifly_20261116_prospecting_leadgen_instantform_parents-casestudy',
  cp: 'tg_sedifly_20261116_prospecting_leadgen_instantform_parents-consult',
  rt: 'tg_sedifly_20261116_retargeting_leadgen_instantform_warm-engagers',
};
const CAMPS = {
  bof: 'tg_sedifly_campaign_tac_20261116_bof_prospecting_leadgen_instant_form',
  mof: 'tg_sedifly_campaign_tac_20261116_mof_prospecting_leadgen_instant_form',
  rt: 'tg_sedifly_campaign_tac_20261116_bof_retargeting_leadgen_instant_form',
};
const DRIVE_KY_REELS = 'https://drive.google.com/drive/folders/1BKi13Cnd3-JaM9bXnpjVvJpk6D1xyx3m';
const DRIVE_JEREMY = 'https://drive.google.com/drive/folders/1nP01-KGayua2FOUUQkbYQf7Mm5B5GQ9z';
const NEED = 'Sedifly to add';

const JA_COPY = '🎓 Jeremy went from ITE to Columbia University, and he planned his US application without a mentor.\n\nHe worked out which activities to focus on and how to approach US admissions by himself.\n\n💬 You can skip the guesswork. Book a free consultation with a Sedifly strategist, tell us your goals and timeline, and we will go through your next steps with you.';
const JB_COPY = '📚 Reddit says one thing. Admissions forums say another.\n\nJeremy heard the same mix of advice on his way from ITE to Columbia University, and he chose to build his application around his own story.\n\n🧭 Book a free consultation with a Sedifly strategist. We will look at your goals and timeline with you and sort out which advice fits your plan.';

// [request date, requested by, ad name, creative, format, asset, copy, headline, description, CTA, form, live date, end date,
//  campaign, ad set, placements, toggle feedback, status, preview, approved, live, adId, creativeId, notes]
const ads = [
  ['4 Nov 2026', 'Ben', 'sedifly_20261116_readiness_vid_keyue-33s', 'Ke Yue Reel, long cut', '9:16 video, 0:33', DRIVE_KY_REELS + '  (30S Paid Ad Your first choice...)', NEED, NEED, NEED, 'Book Now', 'Readiness Check', 'Week of 16 Nov', '',
    CAMPS.bof, ADSETS.rc, 'Reels, Stories, Feeds', 'Ready to run. The offer shows from 0:29 of 0:33, so the first line of the post copy and the headline should name the free Readiness Check.', 'Toggle review', '', '', '', '', '', ''],
  ['4 Nov 2026', 'Ben', 'sedifly_20261116_readiness_vid_keyue-19s', 'Ke Yue Reel, short cut', '9:16 video, 0:19', DRIVE_KY_REELS + '  (15S Paid Ad Your first choice...)', NEED, NEED, NEED, 'Book Now', 'Readiness Check', 'Week of 16 Nov', '',
    CAMPS.bof, ADSETS.rc, 'Reels, Stories, Feeds', 'Ready to run. The offer shows from 0:15 of 0:19. Same copy note as the 33s cut.', 'Toggle review', '', '', '', '', '', ''],
  ['4 Nov 2026', 'Ben', 'sedifly_20261116_readiness_vid_keyue-33s', 'Ke Yue Reel, long cut', '9:16 video, 0:33', 'Same file as row 1', 'Same as row 1', 'Same as row 1', 'Same as row 1', 'Book Now', 'Readiness Check', 'Week of 16 Nov', '',
    CAMPS.rt, ADSETS.rt, 'Reels, Stories, Feeds', 'Retargeting copy of row 1.', 'Toggle review', '', '', '', '', '', ''],
  ['4 Nov 2026', 'Ben', 'sedifly_20261116_readiness_vid_keyue-19s', 'Ke Yue Reel, short cut', '9:16 video, 0:19', 'Same file as row 2', 'Same as row 2', 'Same as row 2', 'Same as row 2', 'Book Now', 'Readiness Check', 'Week of 16 Nov', '',
    CAMPS.rt, ADSETS.rt, 'Reels, Stories, Feeds', 'Retargeting copy of row 2.', 'Toggle review', '', '', '', '', '', ''],
  ['4 Nov 2026', 'Ben', 'sedifly_20261116_casestudy_img_keyue-profile-reveal', 'Ke Yue static: profile reveal ("86.65 RP. 1490 SAT.")', '4:5 and 9:16 image', NEED, NEED, NEED, NEED, 'Download', 'Case study download', 'Week of 16 Nov', '',
    CAMPS.mof, ADSETS.cs, '4:5 in Feeds, 9:16 in Stories (not Reels)', 'Ready. Lead with this one: the grades give parents something to compare with their own child.', 'Toggle review', '', '', '', '', '', ''],
  ['4 Nov 2026', 'Ben', 'sedifly_20261116_casestudy_img_keyue-diagnostic', 'Ke Yue static: diagnostic ("Her profile wasn\'t weak")', '4:5 and 9:16 image', NEED, NEED, NEED, NEED, 'Download', 'Case study download', 'Week of 16 Nov', '',
    CAMPS.mof, ADSETS.cs, '4:5 in Feeds, 9:16 in Stories (not Reels)', 'One edit on the 9:16 version: add the "stronger fit" line under "Prestige-led list", as on the 4:5 version. Without it, the list reads as if Sedifly built a prestige list.', 'Changes needed', '', '', '', '', '', ''],
  ['4 Nov 2026', 'Ben', 'sedifly_20261116_casestudy_img_keyue-hero', 'Ke Yue static: hero ("From an unsuccessful first cycle to UChicago")', '4:5 and 9:16 image', NEED, NEED, NEED, NEED, 'Download', 'Case study download', 'Week of 16 Nov', '',
    CAMPS.mof, ADSETS.cs, '4:5 in Feeds, 9:16 in Stories (not Reels)', 'Ready.', 'Toggle review', '', '', '', '', '', ''],
  ['4 Nov 2026', 'Ben', 'sedifly_20261116_casestudy_img_keyue-ebook', 'Ke Yue static: eBook ("Inside her second US application")', '4:5 and 9:16 image', NEED, NEED, NEED, NEED, 'Download', 'Case study download', 'Week of 16 Nov', '',
    CAMPS.mof, ADSETS.cs, '4:5 in Feeds, 9:16 in Stories (not Reels)', 'Ready. Run as the test static against profile reveal and diagnostic.', 'Toggle review', '', '', '', '', '', ''],
  ['4 Nov 2026', 'Ben', 'sedifly_20261116_casestudy_car_keyue-5-cards', 'Ke Yue carousel, 5 cards', '4:5 and 1:1 carousel', NEED, NEED, NEED, NEED, 'Download', 'Case study download', 'Week of 16 Nov', '',
    CAMPS.mof, ADSETS.cs, 'Feeds', 'Ready. SAT 1490 and "One Cycle Later" are now correct. Card headlines can stay as they are.', 'Toggle review', '', '', '', '', '', ''],
  ['4 Nov 2026', 'Ben', 'sedifly_20261116_consult_vid_joash-davos', 'Joash founder interview (Davos)', '9:16 video, 0:27', 'Sent on WhatsApp, 4 Nov 15:32. ' + NEED + ' a Drive link', NEED, NEED, NEED, 'Book Now', 'Consultation', 'Week of 16 Nov', '',
    CAMPS.bof, ADSETS.cp, 'Reels and Stories', 'Ready. Before launch, update the Speedy Prep page from 150+ offers to 250+, so the site matches the ad. A 4:5 cut would let it run in Feeds too.', 'Toggle review', '', '', '', '', '', ''],
  ['4 Nov 2026', 'Ben', 'sedifly_20261116_consult_vid_jeremy-a-mentor', 'Jeremy Galang podcast A: "I wish I had a mentor"', '9:16 video, 0:30', DRIVE_JEREMY + '  (Jeremy Podcast I Wish I Had Guidance Paid Ad (3).mp4)', JA_COPY, 'From ITE to Columbia', 'Free consultation with a strategist', 'Book Now', 'Consultation', 'Week of 16 Nov', '',
    CAMPS.bof, ADSETS.ca, 'Reels and Stories', 'Toggle revised the copy from your brief: written to the student, "ITE to Columbia" in the first line, hedges cut, button changed from Sign Up to Book Now. Please approve or edit.', 'Toggle review', '', '', '', '', '', ''],
  ['4 Nov 2026', 'Ben', 'sedifly_20261116_consult_vid_jeremy-b-advice', 'Jeremy Galang podcast B: "Conflicting advice"', '9:16 video, 0:21', DRIVE_JEREMY + '  (Conflicting admissions advice Jeremy Podcast Paid Ad (2).mp4)', JB_COPY, 'Conflicting Admissions Advice? Start Here.', 'Free consultation with a strategist', 'Book Now', 'Consultation', 'Week of 16 Nov', '',
    CAMPS.bof, ADSETS.ca, 'Reels and Stories (a Feed crop cuts the top text)', 'Toggle revised the copy: the brief titled this ad "I Wish I Had Guidance" by mistake. The copy now links the conflicting-advice hook to Jeremy\'s answer about crafting his own story. Please approve or edit.', 'Toggle review', '', '', '', '', '', ''],
  ['4 Nov 2026', 'Ben', 'sedifly_20261116_consult_vid_jeremy-c-grades', 'Jeremy Galang podcast C: "Beyond grades"', '9:16 video, 0:33', DRIVE_JEREMY + '  (Jeremy Podcast Beyond Grades Paid Ad (2).mp4)', 'Hold until the re-cut', '', '', 'Book Now', 'Consultation', 'After the re-cut', '',
    CAMPS.bof, ADSETS.ca, 'Reels and Stories', 'Re-cut before launch: open on Jeremy\'s close-up at "The first one was definitely the national service experience", drop the "1550 and above SAT" line, and end on what National Service and his app added to his application.', 'On hold', '', '', '', '', '', ''],
];
{
  const ws = wb.addWorksheet('Ad requests', { views: [{ state: 'frozen', xSplit: 3, ySplit: 4, showGridLines: false }] });
  const cols = [
    ['#', 5], ['Request date', 12], ['Requested by', 12], ['Ad name', 34], ['Creative', 26], ['Format and length', 15], ['Asset link', 34],
    ['Post copy (primary text)', 52], ['Headline', 24], ['Description', 24], ['CTA button', 12], ['Form', 16], ['Live date wanted', 13], ['End date', 11],
    ['Campaign', 34], ['Ad set', 36], ['Placements', 20], ['Toggle feedback', 46], ['Status', 14], ['Meta preview link', 26], ['Approved by and date', 18], ['Live date', 11], ['Ad ID', 20], ['Creative ID', 20], ['Notes', 34],
  ];
  ws.columns = cols.map(([, w]) => ({ width: w }));
  title(ws, 'Ad requests', 'One row per ad per ad set. Yellow cells are for your team. Toggle fills the dark columns.');
  ws.mergeCells(3, 2, 3, 14); ws.getCell(3, 2).value = 'SEDIFLY FILLS';
  ws.mergeCells(3, 15, 3, 24); ws.getCell(3, 15).value = 'TOGGLE FILLS';
  ws.getCell(3, 25).value = 'BOTH';
  [[2, WASH, INK], [15, INK, WHITE], [25, 'FFEFF3F8', INK]].forEach(([c, fill, color]) => { const x = ws.getCell(3, c); x.font = { name: F, bold: true, size: 9, color: { argb: color } }; x.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } }; x.alignment = { horizontal: 'center' }; });
  ws.getRow(4).values = cols.map(([h]) => h);
  headRow(ws, 4, INK, WHITE);
  for (let c = 2; c <= 14; c++) { const x = ws.getCell(4, c); x.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: WASH } }; x.font = { name: F, bold: true, size: 10, color: { argb: INK } }; }
  ws.getRow(4).height = 30;
  const N = 60;
  ads.forEach((a, i) => { ws.getRow(5 + i).values = [i + 1, ...a]; });
  for (let i = ads.length; i < N; i++) ws.getCell(5 + i, 1).value = i + 1;
  body(ws, 5, 4 + N, cols.length);
  for (let r = 5; r <= 4 + N; r++) {
    for (let c = 2; c <= 14; c++) { const x = ws.getCell(r, c); if (x.value === NEED || x.value == null || x.value === '' || String(x.value).includes(NEED)) x.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: FILL_IN } }; }
    ws.getCell(r, 19).dataValidation = { type: 'list', allowBlank: true, formulae: ['"' + STATUSES.join(',') + '"'] };
    ws.getCell(r, 11).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Book Now,Download,Learn More,Sign Up,Apply Now"'] };
    ws.getCell(r, 12).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Readiness Check,Consultation,Case study download"'] };
    ws.getCell(r, 16).dataValidation = { type: 'list', allowBlank: true, formulae: ["'Campaign setup'!$B$5:$B$9"] };
    ws.getCell(r, 4).font = { name: 'Consolas', size: 9, color: { argb: 'FF1A2433' } };
    [15, 16].forEach((c) => { ws.getCell(r, c).font = { name: 'Consolas', size: 9, color: { argb: 'FF1A2433' } }; });
  }
  for (let i = 0; i < ads.length; i++) ws.getRow(5 + i).height = (ads[i][6] && ads[i][6].length > 60) ? 150 : 75;
  const colorFor = { 'Requested': 'FFEFF3F8', 'Toggle review': 'FFE3EDFC', 'Changes needed': 'FFFDE7C8', 'Preview sent': 'FFDDF3F6', 'Approved': 'FFD9F2E3', 'Live': 'FFB9E6C9', 'Paused': 'FFE5E7EB', 'On hold': 'FFFBE3E2' };
  ws.addConditionalFormatting({ ref: `S5:S${4 + N}`, rules: STATUSES.map((s, i) => ({ type: 'containsText', operator: 'containsText', text: s, priority: i + 1, style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: colorFor[s] } }, font: { bold: true } } })) });
  ws.autoFilter = { from: 'A4', to: `Y${4 + N}` };
}

// ------------------------------------------------------------------ 3 CAMPAIGN SETUP
{
  const ws = wb.addWorksheet('Campaign setup', { views: [{ state: 'frozen', xSplit: 2, ySplit: 4, showGridLines: false }] });
  const cols = [['Campaign', 40], ['Ad set', 44], ['Audience', 34], ['Ages', 8], ['Exclusions', 34], ['Advantage+ audience', 12], ['Placements', 24], ['Objective and form', 26], ['Monthly budget (S$)', 12], ['Daily budget (S$)', 11], ['Ads in it', 34], ['Month-one KPI', 26], ['Ceiling and stop rule', 34], ['Status', 12]];
  ws.columns = cols.map(([, w]) => ({ width: w }));
  title(ws, 'Campaign setup', 'One row per ad set. Daily budget = monthly budget / 30. Total S$2,000 a month from the week of 16 November.');
  ws.getRow(4).values = cols.map(([h]) => h); headRow(ws, 4); ws.getRow(4).height = 32;
  const EXC = 'Current clients and open leads (HubSpot lists), anyone who submitted a Sedifly Instant Form in the last 30 days';
  const rows = [
    [CAMPS.bof, ADSETS.rc, 'Applicants in Singapore: JC and poly graduates, NS, gap year', '18-24', EXC, 'Off', 'Reels, Stories, Feeds (Instagram and Facebook)', 'Leads, Instant Form (Higher Intent): Readiness Check', 500, null, 'Ke Yue Reels, 33s and 19s', '9 to 13 Readiness Check requests at S$38 to S$55', 'S$55 a request. Above it for 5 days: swap creative first, then cut budget.', 'Not launched'],
    [CAMPS.bof, ADSETS.ca, 'Applicants in Singapore: JC, poly and ITE graduates, NS, gap year', '18-24', EXC, 'Off', 'Reels and Stories', 'Leads, Instant Form (Higher Intent): Consultation', 300, null, 'Jeremy A and B (C after the re-cut)', '3 to 5 consultation requests at S$55 to S$85', 'S$85 a request. After 2,000 plays per ad, keep the ad with the higher hook rate and lower cost per request.', 'Not launched'],
    [CAMPS.mof, ADSETS.cs, 'Parents in Singapore planning a US or UK application', '38-60', EXC, 'Off', '4:5 in Feeds, 9:16 in Stories', 'Leads, Instant Form (Higher Intent): Case study download', 600, null, 'Ke Yue statics (profile reveal, diagnostic, hero, eBook) and the 5-card carousel', '24 to 40 downloads at S$15 to S$25; 10% to 15% go on to request a Readiness Check', 'S$25 a download. Under 35% of leads scored A or B: cut budget even if leads look cheap.', 'Not launched'],
    [CAMPS.bof, ADSETS.cp, 'Parents in Singapore planning a US or UK application', '38-60', EXC, 'Off', 'Reels and Stories', 'Leads, Instant Form (Higher Intent): Consultation', 300, null, 'Joash founder interview', '2 to 4 consultation requests at S$70 to S$130', 'S$130 a request. Above it after S$260 spent: move Joash to retargeting.', 'Not launched'],
    [CAMPS.rt, ADSETS.rt, 'Instagram and Facebook video viewers and page engagers (365 days), Instant Form openers who did not submit (90 days)', '18-65', EXC, 'Off', 'Reels, Stories, Feeds', 'Leads, Instant Form (Higher Intent): Readiness Check', 300, null, 'Ke Yue Reels, 33s and 19s', '5 to 7 Readiness Check requests at S$38 to S$55', 'S$55 a request. Watch frequency: refresh creative above 4 a week.', 'Not launched'],
  ];
  rows.forEach((r, i) => { ws.getRow(5 + i).values = r; ws.getCell(5 + i, 10).value = { formula: `ROUND(I${5 + i}/30,2)` }; });
  ws.getRow(10).values = ['', '', '', '', '', '', '', 'Total', { formula: 'SUM(I5:I9)' }, { formula: 'SUM(J5:J9)' }];
  body(ws, 5, 10, cols.length);
  ws.getRow(10).font = { name: F, bold: true, size: 10 };
  for (let r = 5; r <= 10; r++) { ws.getCell(r, 9).numFmt = '#,##0'; ws.getCell(r, 10).numFmt = '#,##0.00'; ws.getRow(r).height = r < 10 ? 78 : 18; [1, 2].forEach((c) => { ws.getCell(r, c).font = { name: 'Consolas', size: 9 }; }); }
  ws.getCell('A12').value = 'Rules';
  ws.getCell('A12').font = { name: F, bold: true, size: 11, color: { argb: ACC } };
  [
    'A new ad gets its own ad set when it changes the audience, the form or the offer. Otherwise it joins an existing ad set.',
    'Each ad set has a fixed budget, so Meta cannot move all the money to the cheaper offer.',
    'First 7 days: leave ad sets to learn unless tracking breaks. A video with a hook rate under 15% after 2,000 views gets re-cut or retired.',
    'An ad set 20% under its ceiling for 7 days can take up to S$200 a month more, with Sedifly approval.',
  ].forEach((t, i) => { const c = ws.getCell(13 + i, 1); c.value = t; c.font = { name: F, size: 10 }; ws.mergeCells(13 + i, 1, 13 + i, 6); });
}

// ------------------------------------------------------------------ 4 INSTANT FORMS
{
  const ws = wb.addWorksheet('Instant Forms', { views: [{ showGridLines: false }] });
  ws.columns = [{ width: 26 }, { width: 50 }, { width: 50 }, { width: 50 }];
  title(ws, 'Instant Forms', 'All three forms use the Higher Intent type and the same three questions, so leads score A to D the same way.');
  ws.getRow(4).values = ['Field', 'Readiness Check', 'Consultation', 'Case study download']; headRow(ws, 4);
  const Q1 = 'Who is completing this form?\n1. Parent or guardian\n2. Student, and my parent is part of this decision\n3. Student';
  const Q2 = 'What is the student\'s current level?\n1. Sec 3 or Sec 4\n2. JC1, IB DP1 or Poly Year 1 to 2\n3. JC2, IB DP2 or Poly final year\n4. ITE\n5. Awaiting results, NS or gap year';
  const Q3 = 'Which universities is the student aiming for?\n1. US top universities (Ivy League or Top 20)\n2. UK top universities (Oxbridge or Top 20)\n3. Both US and UK\n4. Not sure yet, I would like guidance';
  const PDF = 'https://682e5a7b-a62a-4f9e-b4c6-b3599fc963c7.usrfiles.com/ugd/682e5a_a14b5b4dd08845ac9bedf17a58ca7649.pdf';
  const rows = [
    ['Used by', 'Ke Yue Reels (applicants and retargeting)', 'Jeremy A and B, Joash', 'Ke Yue statics and carousel'],
    ['Form name in Meta', 'sedifly_form_readiness-check_202611', 'sedifly_form_consultation_202611', 'sedifly_form_keyue-casestudy_202611'],
    ['Form type', 'Higher Intent', 'Higher Intent', 'Higher Intent'],
    ['Intro headline', 'Book a Readiness Check With a Sedifly Strategist', 'Book a Free Consultation With a Sedifly Strategist', 'Get Ke Yue\'s Free 4-Page Case Study'],
    ['Intro text', 'Answer three questions about the student. A Sedifly strategist will review the profile and timeline, then show you what is ready and what to prioritize before the next deadline.', 'Tell us about the student and where they want to apply. A Sedifly strategist will WhatsApp you to book a time for your free consultation.', 'See how Ke Yue went from an unsuccessful first cycle to an offer from the University of Chicago. Answer three questions and the case study opens on the next screen.'],
    ['Question 1', Q1, Q1, Q1],
    ['Question 2', Q2, Q2, Q2],
    ['Question 3', Q3, Q3, Q3],
    ['Contact fields', 'Full name, email, phone (WhatsApp)', 'Full name, email, phone (WhatsApp)', 'Full name, email, phone (WhatsApp)'],
    ['Privacy policy', 'https://www.sedifly.com/', 'https://www.sedifly.com/', 'https://www.sedifly.com/'],
    ['Thank-you headline', 'Thank You, Your Readiness Check Request Is In', 'Thanks, Your Consultation Request Is In', 'Your Case Study Is Ready'],
    ['Thank-you text', 'A Sedifly strategist will contact you on WhatsApp to book a 30-minute slot. Read our admissions insights while you wait.', 'A Sedifly strategist will WhatsApp you within one working day to book a time.', 'Tap the button to open Ke Yue\'s case study. A Sedifly strategist may WhatsApp you to offer a free Readiness Check.'],
    ['Thank-you button', 'Visit Website: https://www.sedifly.com/', 'Visit Website: https://www.sedifly.com/', 'Download: ' + PDF],
    ['HubSpot tag (offer)', 'Readiness Check', 'Consultation', 'Ke Yue case study'],
    ['Check before launch', 'Confirm the 30-minute slot length.', 'Confirm your team can reply within one working day.', 'We copied the PDF link from WhatsApp. Toggle tests it before launch.'],
    ['Form ID', '', '', ''],
  ];
  rows.forEach((r, i) => { ws.getRow(5 + i).values = r; });
  body(ws, 5, 4 + rows.length, 4);
  for (let r = 5; r <= 4 + rows.length; r++) { ws.getCell(r, 1).font = { name: F, bold: true, size: 10 }; const len = Math.max(...[2, 3, 4].map((c) => String(ws.getCell(r, c).value || '').length)); ws.getRow(r).height = Math.max(18, Math.ceil(len / 48) * 14 + (String(ws.getCell(r, 2).value).split('\n').length - 1) * 13); }
  const k = 6 + rows.length;
  ws.getCell(k, 1).value = 'Lead score key (draft)'; ws.getCell(k, 1).font = { name: F, bold: true, size: 11, color: { argb: ACC } };
  ws.getCell(k, 2).value = 'Draft for Sedifly to confirm against the A to D scoring in the September proposal.'; ws.getCell(k, 2).font = { name: F, italic: true, size: 10, color: { argb: GREY } };
  const key = [
    ['Score', 'Rule', 'Next step', ''],
    ['A', 'Q3 is US, UK or both, and Q2 is JC2, IB DP2, poly final year, or awaiting results, NS or gap year', 'Strategist calls within 24 hours', ''],
    ['B', 'Q3 is US, UK or both, and Q2 is Sec 3 or 4, JC1, IB DP1, poly year 1 to 2, or ITE', 'Strategist calls within 24 hours', ''],
    ['C', 'Q3 is "Not sure yet"', 'WhatsApp follow-up and the Ke Yue case study', ''],
    ['D', 'Contact details do not work, or the student is outside Singapore', 'No follow-up', ''],
  ];
  key.forEach((r, i) => { ws.getRow(k + 1 + i).values = r.slice(0, 3); });
  headRow(ws, k + 1, WASH, INK);
  body(ws, k + 2, k + 5, 3);
  for (let r = k + 2; r <= k + 5; r++) ws.getRow(r).height = 30;
}

// ------------------------------------------------------------------ 5 NAMING
{
  const ws = wb.addWorksheet('Naming', { views: [{ showGridLines: false }] });
  ws.columns = [{ width: 18 }, { width: 70 }, { width: 70 }];
  title(ws, 'Naming', 'The same format Toggle uses on its other accounts. HubSpot and GA4 read these names through the UTM tags, so each lead shows its campaign, ad set and ad.');
  ws.getRow(4).values = ['Level', 'Format', 'Example']; headRow(ws, 4);
  const rows = [
    ['Campaign', 'tg_sedifly_campaign_tac_<launch date YYYYMMDD>_<tof, mof or bof>_<prospecting or retargeting>_<objective>', CAMPS.bof],
    ['Ad set', 'tg_sedifly_<launch date>_<prospecting or retargeting>_<objective>_<audience>-<offer>', ADSETS.rc],
    ['Ad', 'sedifly_<launch date>_<offer>_<vid, img or car>_<creative name>', 'sedifly_20261116_consult_vid_jeremy-a-mentor'],
    ['Instant Form', 'sedifly_form_<offer>_<YYYYMM>', 'sedifly_form_consultation_202611'],
    ['URL tags', 'utm_source=facebook&utm_medium=paid&utm_campaign={{campaign.name}}&utm_term={{adset.name}}&utm_content={{ad.name}}', 'Added to every ad, so website visits from the thank-you screens show in GA4 by ad.'],
    ['Dates', 'Use the launch date. If the launch moves, Toggle renames before publishing.', '20261116 = the week of 16 November 2026'],
  ];
  rows.forEach((r, i) => { ws.getRow(5 + i).values = r; });
  body(ws, 5, 4 + rows.length, 3);
  for (let r = 5; r <= 4 + rows.length; r++) { ws.getCell(r, 1).font = { name: F, bold: true, size: 10 }; [2, 3].forEach((c) => { ws.getCell(r, c).font = { name: 'Consolas', size: 9 }; }); ws.getRow(r).height = 32; }
}

// ------------------------------------------------------------------ 6 INVENTORY
{
  const req = (n) => require(path.join(PULL, n));
  const camps = req('s_campaigns.json'), sets = req('s_adsets.json'), adsAll = req('s_ads.json'), ins = req('s_ins_ad_30d.json');
  const lead = (a) => { const f = (a || []).find((x) => x.action_type === 'lead'); return f ? +f.value : 0; };
  const sp = {}, ld = {}; ins.forEach((r) => { sp[r.ad_id] = +r.spend; ld[r.ad_id] = lead(r.actions); });
  const ws = wb.addWorksheet('Inventory', { views: [{ state: 'frozen', ySplit: 4, showGridLines: false }] });
  const cols = [['Campaign ID', 20], ['Campaign', 46], ['Campaign status', 13], ['Campaign created', 12], ['Ad set ID', 20], ['Ad set', 42], ['Ad set status', 16], ['Ad set ages', 9], ['Ad ID', 20], ['Ad', 40], ['Ad status', 16], ['Creative ID', 18], ['CTA button', 13], ['Spend, 5 Oct to 4 Nov (S$)', 13], ['Leads, 5 Oct to 4 Nov', 11]];
  ws.columns = cols.map(([, w]) => ({ width: w }));
  title(ws, 'Inventory', `Read-only pull of ad account act_803550292448381 on 4 Nov 2026, about 6pm SGT: ${camps.length} campaigns and ${adsAll.length} ads, including 10 ads in two archived campaigns. Statuses are Meta's effective status. Instant Forms do not show at Toggle's access level.`);
  ws.getRow(4).values = cols.map(([h]) => h); headRow(ws, 4); ws.getRow(4).height = 30;
  const CTA = { BOOK_TRAVEL: 'Book now', SIGN_UP: 'Sign up', LEARN_MORE: 'Learn more', DOWNLOAD: 'Download', SEE_DETAILS: 'See details', APPLY_NOW: 'Apply now', SUBSCRIBE: 'Subscribe', GET_QUOTE: 'Get quote', CONTACT_US: 'Contact us' };
  let r = 5;
  camps.slice().sort((a, b) => b.created_time.localeCompare(a.created_time)).forEach((c) => {
    const cs = sets.filter((s) => s.campaign_id === c.id);
    const ca = adsAll.filter((a) => a.campaign_id === c.id);
    if (!ca.length) { ws.getRow(r++).values = [c.id, c.name, c.effective_status, c.created_time.slice(0, 10)]; return; }
    ca.forEach((a) => {
      const s = cs.find((x) => x.id === a.adset_id) || {};
      const t = s.targeting || {};
      ws.getRow(r++).values = [c.id, c.name, c.effective_status, c.created_time.slice(0, 10), a.adset_id, s.name || '', s.effective_status || '', t.age_min ? `${t.age_min}-${t.age_max || '65+'}` : '', a.id, a.name, a.effective_status, (a.creative && a.creative.id) || '', CTA[a.creative && a.creative.call_to_action_type] || (a.creative && a.creative.call_to_action_type) || '', sp[a.id] ? Math.round(sp[a.id] * 100) / 100 : 0, ld[a.id] || 0];
    });
  });
  const ids = new Set(camps.map((c) => c.id));
  adsAll.filter((a) => !ids.has(a.campaign_id)).forEach((a) => {
    ws.getRow(r++).values = [a.campaign_id, 'Archived campaign (Meta returns the ad, not the campaign)', 'ARCHIVED', '', a.adset_id, '', '', '', a.id, a.name, a.effective_status, (a.creative && a.creative.id) || '', CTA[a.creative && a.creative.call_to_action_type] || '', sp[a.id] || 0, ld[a.id] || 0];
  });
  body(ws, 5, r - 1, cols.length);
  for (let i = 5; i < r; i++) { [1, 5, 9, 12].forEach((c) => { ws.getCell(i, c).numFmt = '@'; ws.getCell(i, c).font = { name: 'Consolas', size: 9 }; }); ws.getCell(i, 14).numFmt = '#,##0.00'; if (ws.getCell(i, 3).value === 'ACTIVE') ws.getRow(i).eachCell((x) => { x.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9F2E3' } }; }); }
  ws.autoFilter = { from: 'A4', to: `O${r - 1}` };
  console.log('inventory rows', r - 5);
}

// ------------------------------------------------------------------ 7 CHANGE LOG
{
  const ws = wb.addWorksheet('Change log', { views: [{ state: 'frozen', ySplit: 4, showGridLines: false }] });
  ws.columns = [{ width: 13 }, { width: 14 }, { width: 70 }, { width: 50 }];
  title(ws, 'Change log', 'Every change to a live campaign, ad set, ad or form, newest at the top.');
  ws.getRow(4).values = ['Date', 'Who', 'What changed', 'Why']; headRow(ws, 4);
  ws.getRow(5).values = ['5 Nov 2026', 'Toggle', 'Tracker created. Jeremy A and B copy revised, three consultation forms merged into one, five ad sets set up for approval.', 'Launch plan of 5 November 2026'];
  body(ws, 5, 30, 4);
}

wb.xlsx.writeFile(OUT).then(() => console.log('wrote ' + OUT));
