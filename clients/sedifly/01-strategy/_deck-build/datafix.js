// Data corrections after re-verifying every claim (4 Nov 2026).
const fs = require('fs');
const f = __dirname + '/build2.js';
let b = fs.readFileSync(f, 'utf8');
const R = [
  // slide 2, card 1: the September tests reached the same ages; messaging moved the cost
  [`['Parents', 'S$132', 'Parents want proof before a consultation',
      'A direct Readiness Check ad cost S$132 a parent lead in September. Parents signed up for the eBook at S$21 and for Joash\\'s dinner at S$15.',`,
   `['Message', 'S$38', 'The diagnostic message won',
      'Your two September Readiness Check tests reached the same ages. The diagnostic ads cost S$38 a lead and the parent roadmap ads S$132. Parents aged 45 to 54 answered the diagnostic ads at S$37.',`],
  [`'Parents see Ke Yue and Joash first, then get the Readiness Check offer.'`,
   `'Every Readiness Check ad leads with the diagnostic angle, with Ke Yue as proof.'`],
  // slide 2, card 2
  [`'Ad sets ran at ages 18 to 65, and the parent ad sets used luxury interests such as Ferrari and Rolex, which reach executives. That is the B2B and C-suite drift.'`,
   `'94% of spend ran in ad sets open to ages 18 to 65, and the parent ad sets used luxury interests such as Ferrari and Rolex. Both pull in business owners and executives.'`],
  // slide 2, card 3
  [`'Campaigns that sent people to the website cost S$124 a lead, against S$21 for Instant Forms. Meta never learned which leads qualified.'`,
   `'Campaigns that sent people to the website cost S$124 a lead (7 leads), against S$21 for Instant Forms. Your Meta reports show form fills with no qualified or booked counts.'`],
  // slide 3
  [`'Applicants get the Readiness Check offer straight away. Parents see proof first, through Ke Yue\\'s results and Joash, then get the offer through retargeting.'`,
   `'Applicants get the Readiness Check offer straight away. Parents also see Ke Yue\\'s results and Joash, then get the offer through retargeting.'`],
  [`['Expect', '7 to 10 requests']`, `['Expect', '5 to 7 requests']`],
  // slide 4
  [`'The offer arrives in the last 4 seconds.'`, `'The offer appears at 0:41, 3.5 seconds before the end.'`],
  [`about 2 in 100 viewers reach 15 seconds.`, `about 2 in 100 people shown your videos watch 15 seconds.`],
  [`(your best video: 28%)`, `(your top-spending video: 28%)`],
  // slide 5
  [`'Joash\\'s dinner invite brought parent leads at S$15 on your account. The interview ad needs a student result and the same offer as every other ad.'`,
   `'Joash\\'s dinner invite cost S$16 a lead on your account. The interview ad needs a student result and the same offer as every other ad.'`],
  [`'A still card opens the ad. It says 250+; your site says 150+.'`, `'A still card runs for 2.5 seconds before Joash appears.'`],
  [`['joash_4.0.png', '0:04', false, 'Name and title at 4 seconds. Keep this.']`, `['joash_4.0.png', '0:04', false, 'Name and title from 0:03. Keep this.']`],
  // slide 6
  [`'Your eBook brought parent leads at S$21. Ke Yue is stronger proof, and every download gets a strategist\\'s follow-up.'`,
   `'Your eBook cost S$21 a lead. Ke Yue is stronger proof, and every download gets a strategist\\'s follow-up.'`],
  [`'SAT score: the ads say 1490 and the case study page says 1390.'`, `'SAT: the ads say 1490 and a case study page says 1390. Which should the ads use?'`],
  // slide 7 forecast: retargeting at S$38 to S$55 (all warm ad sets: S$48 across 28 leads)
  [`'Month one, ', '22 to 36 Readiness Check requests'`, `'Month one, ', '20 to 33 Readiness Check requests'`],
  [`['Readiness Check requests', 'All four campaigns', '22', '36', 'S$91 to S$56'],
      ['Qualified, scored A or B', '50% to 65%', '11', '23', 'S$182 to S$87'],
      ['Readiness Check booked', '75% to 90%', '8', '20', 'S$250 to S$100'],
      ['Consultation attended', '80% to 83%', '6', '16', 'S$333 to S$125'],`,
   `['Readiness Check requests', 'All four campaigns', '20', '33', 'S$100 to S$61'],
      ['Qualified, scored A or B', '50% to 65%', '10', '21', 'S$200 to S$95'],
      ['Readiness Check booked', '75% to 90%', '7', '18', 'S$286 to S$111'],
      ['Consultation attended', '80% to 83%', '5', '14', 'S$400 to S$143'],`],
  [`['22 to 36', 'A direct ask to parents cost S$132, so S$1,100 of parent budget goes through proof first']`,
   `['20 to 33', 'Your own costs: S$700 buys Ke Yue downloads that turn into requests over weeks, and retargeting runs at your S$48 average']`],
  [`'Cost per request: applicants S$38 to S$55 (September test: S$38), parents S$70 to S$130 (September: S$132), retargeting S$28 to S$38 (your warm ad sets: S$33).'`,
   `'Cost per request: Reel S$38 to S$55 (September diagnostic test: S$38), Joash S$70 to S$130 (between your two September tests), retargeting S$38 to S$55 (your warm ad sets: S$48).'`],
  // slide 9 ceiling
  [`S$130 Joash, S$38 retargeting,`, `S$130 Joash, S$55 retargeting,`],
  // slide 10 blockers
  [`'Claims: 250+ or 150+ offers, Ke Yue\\'s SAT score, and whether the Readiness Check is free.'`,
   `'Claims: your Speedy Prep page still says 150+ offers against 250+ on the homepage, and Ke Yue\\'s SAT score.'`],
];
let n = 0;
for (const [a, c] of R) {
  if (b.includes(a)) { b = b.split(a).join(c); n++; } else console.log('MISS:', a.slice(0, 80));
}
fs.writeFileSync(f, b);
console.log('applied', n, 'of', R.length);
