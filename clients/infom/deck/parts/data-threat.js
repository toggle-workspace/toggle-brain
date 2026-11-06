@@ALARM
{
  window:"2025 to 2026",
  title:'In Australia, a cybercrime is reported <em>every six minutes</em>.',
  lede:'Breach notifications hit a record in 2025, and breaches affecting over a million people nearly tripled in early 2026.',
  tiles:[
    {v:82000,suf:"+",c:"cybercrime reports to the ASD in the 2025 to 26 financial year",s:"ASD Cyber Threat Report"},
    {v:1205,c:"data breaches notified to the OAIC in 2025, the most since the scheme began in 2018",s:"OAIC, July 2026"},
    {v:4.22,pre:"A$",suf:"m",dec:2,c:"average cost of one data breach in Australia, and A$6.31m in financial services",s:"IBM, 2026"},
    {v:11,c:"breaches touching over a million people in January to June 2026, up from 4",s:"OAIC, October 2026"}
  ],
  cost:[["A$93,500","average cost a business reported per cybercrime, up 16%"],["A$141,300","for a medium-sized business, up 45%"],["139","ransomware incidents the ASD responded to"]]
}
;;
@@CLOCKS
[
  {k:"rule",n:"Clock 1 · Rule",t:"Get it in time",s:"A law or a standard sets a date",arc:.33,rule:"the Essential Eight",
   dl:[["ML2","Maturity Level Two of the Essential Eight is required of non-corporate Commonwealth entities"],["A$3m","annual turnover from which a business must report a ransomware payment, in force since 30 May 2025"],["CPS 230","APRA's operational risk standard, applying to banks, insurers and super funds since 1 July 2025"]],
   qs:["essential eight maturity level 2","ransomware payment reporting australia","cps 230 requirements"],
   who:"The CIO and the compliance lead, months ahead.",
   msg:"What the rule asks for, in the order an assessor checks it.",
   ch:"Google Search on the rule's name, then LinkedIn."},
  {k:"audit",n:"Clock 2 · Audit",t:"Get it now",s:"An assessor, a regulator or a customer sets a date",arc:.66,rule:"the next audit",
   dl:[["22%","of Commonwealth entities reached Maturity Level Two or above across all eight strategies in 2025"],["A$5.8m","the first civil penalty under the Privacy Act, against Australian Clinical Labs in October 2025"],["30%","of adjusted turnover, the ceiling on a Privacy Act penalty for a serious breach (or A$50m if higher)"]],
   qs:["cps 234 audit preparation","essential eight assessment","supplier security questionnaire"],
   who:"The head of risk and the audit committee, weeks ahead.",
   msg:"Bring the evidence the assessor accepts the first time.",
   ch:"Google Search and LinkedIn ads carrying the audit guide."},
  {k:"breach",n:"Clock 3 · Breach",t:"Get it yesterday",s:"An attacker sets the time",arc:.96,rule:"the first hour",
   dl:[["12 hours","to notify the ASD of a critical incident under the SOCI Act, or 72 hours for a relevant one"],["72 hours","to report a ransomware payment, and to notify APRA of a material incident under CPS 234"],["30 days","to finish assessing a suspected data breach under the Privacy Act"]],
   qs:["ransomware attack what to do now","data breach notification oaic","incident response company sydney"],
   who:"The CEO and the IT lead, on the first night.",
   msg:"Call a responder now. We handle the first hour and every report you owe.",
   ch:"Google Search, with a phone number on the ad."}
]
;;
@@CLOCK_SRC
'Sources: Home Affairs, ransomware payment reporting factsheet (Cyber Security Act 2024); CISC, SOCI incident reporting guidance; APRA CPS 234 and CPS 230; OAIC, the NDB scheme (Privacy Act s 26WH) and penalties (s 13G); ASD, Commonwealth Cyber Security Posture in 2025; Federal Court, Australian Clinical Labs, October 2025. "The likely one": 82,000+ cybercrime reports and 1,205 breach notifications in a year.'
;;
@@HOPS
[
  {k:"laptop",n:"Laptop",short:"ENDPOINT",p:"Endpoint security",
   d:"Every file starts on a device. The risks are stolen passwords, malware and personal laptops nobody manages.",
   x:"Shared with HR, the file lands on devices Finance never sees. One weak HR laptop exposes Finance's payroll.",
   stat:["46%","of systems whose company logins turned up in infostealer logs were unmanaged devices","Verizon DBIR 2025"],prods:["Endpoint detection and response","Antivirus","Device management"]},
  {k:"wifi",n:"Wi-Fi",short:"NETWORK",p:"Network access",
   d:"Wi-Fi decides who can reach the network. Shared passwords and guest networks let anyone in range get close to the file.",
   x:"On a flat network, HR devices can see Finance's file shares. Segmentation keeps each team separate.",
   stat:["39%","of the ways attackers got in during ASD-handled incidents were phishing, and 15% were valid stolen accounts","ASD Cyber Threat Report 2025 to 26"],prods:["Network access control","Secure Wi-Fi","Segmentation"]},
  {k:"wall",n:"Firewall",short:"PERIMETER",p:"Physical firewall",
   d:"The firewall sits between the office and the internet and controls what comes in and goes out.",
   x:"Internal firewall rules decide whether HR can reach Finance's servers.",
   stat:["31%","of breaches in 2026 started with an exploited vulnerability, ahead of stolen credentials for the first time","Verizon DBIR 2026"],prods:["Next-generation firewall","Intrusion prevention","Gateway antivirus"]},
  {k:"vpn",n:"VPN gateway",short:"REMOTE ACCESS",p:"VPN and zero trust access",
   d:"Remote staff connect through the VPN gateway. One stolen VPN login opens the whole network.",
   x:"Zero trust access gives each person only their own team's apps, so an HR login cannot open Finance systems.",
   stat:["3% → 22%","rise in breaches that began with an exploited edge device or VPN, in one year","Verizon DBIR 2025"],prods:["VPN","Zero trust network access","Multi-factor authentication"]},
  {k:"cloud",n:"Cloud",short:"PUBLIC · PRIVATE",p:"Cloud and data security",
   d:"Cloud security controls who opens the file, from which apps and connections, and how much they can download.",
   x:"The file changes hands in the cloud. Data protection rules decide if it can be shared, copied or moved in a migration.",
   stat:["30%","of breaches involved a third party, double the year before","Verizon DBIR 2025"],prods:["Cloud access security","Private app access","Data loss prevention","Data migration"]}
]
;;
@@MAP_SRC
'Sources: Verizon Data Breach Investigations Report 2025 and 2026; ASD Cyber Threat Report 2025 to 26. The five stops and their product categories are Toggle\'s mapping, to be checked with each client\'s product team.'
;;
@@SECTORS
(()=>{const S=[
  {n:"Health",short:"Clinics, hospitals, labs and pharmacies",jewel:"Patient records, Medicare details and prescriptions",hops:[0,4],
   flow:["Across teams","Records move between clinics, labs, billing and outside software vendors"],
   vulns:[["The most breached sector","225 of the 1,205 breaches notified in 2025, and 149 in the first half of 2026"],["Human error","62 of those 149 came from staff mistakes, beside 72 malicious attacks"],["Shared vendors","prescription and lab platforms hold data for thousands of practices at once"]],
   case:["MediSecure, 2024:","an electronic prescription provider. Data on about 12.9 million people was stolen."],
   prods:["Endpoint","Data protection","Backup and recovery"],paper:"The clinic's first hour: protecting patient records when the screens go dark",reader:"practice owners and hospital IT leads",
   kw:"medical practice data breach what to do",check:"The clinic ransomware checklist",brief:"the clinic's first hour"},
  {n:"Financial services",short:"Banks, insurers, lenders and super funds",jewel:"Identity documents, accounts and card data",hops:[0,3,4],
   flow:["Across teams","Customer files move between lending, collections, marketing and outside brokers"],
   vulns:[["A$6.31m","average cost of a breach in Australian financial services, the highest of any sector"],["157 breaches","notified by finance in 2025, second only to health"],["Third parties","brokers and service providers that keep copies of customer identity documents"]],
   case:["Latitude Financial, 2023:","about 14 million personal records and identity documents stolen."],
   prods:["Cloud security","Data protection","Identity and access"],paper:"CPS 234 and your suppliers: the evidence APRA asks for",reader:"heads of risk and CISOs at APRA-regulated firms",
   kw:"cps 234 third party requirements",check:"The supplier evidence checklist",brief:"what APRA asks boards"},
  {n:"Government",short:"Federal, state and local agencies",jewel:"Citizen identity data and sensitive case files",hops:[0,2,3],
   flow:["Across agencies","Files move between agencies and the law firms and contractors that serve them"],
   vulns:[["22% at Level Two","of Commonwealth entities met Essential Eight Maturity Level Two or above in 2025"],["118 breaches","notified by the Australian Government sector in 2025"],["Suppliers","law firms and contractors that hold agency documents outside agency controls"]],
   case:["HWL Ebsworth, 2023:","a law firm breach that reached 65 government agencies, with about 2.5 million documents stolen."],
   prods:["Endpoint","Physical firewall","VPN and zero trust"],paper:"Essential Eight Maturity Level Two: the order to fix it in",reader:"agency CIOs and security advisers",
   kw:"essential eight maturity level 2",check:"The Level Two self-score",brief:"the order to fix the Eight"},
  {n:"Energy and utilities",short:"Power, water, gas and the firms that run them",jewel:"Control systems, and the customer data beside them",hops:[2,3],
   flow:["Within and across","Plant controls must stay apart from the office network that holds customer data"],
   vulns:[["154 incidents","on critical infrastructure handled by the ASD in 2025 to 26, about 10% of all incidents"],["12 hours","to notify the ASD of a critical incident under the SOCI Act"],["3% → 22%","rise in breaches that began with an exploited edge device or VPN"]],
   case:["Origin Energy, 2026:","the company confirmed about 900,000 current and former customers were affected."],
   prods:["Physical firewall","VPN and zero trust","Segmentation"],paper:"Twelve hours: the SOCI incident plan for operators",reader:"operations and security leads at critical infrastructure operators",
   kw:"soci act incident reporting",check:"The 12-hour reporting checklist",brief:"the first 12 hours"},
  {n:"Education",short:"Universities, schools and training providers",jewel:"Student records, staff logins and research data",hops:[0,1,4],
   flow:["Across teams","Records move between faculties, student services, campuses and cloud learning platforms"],
   vulns:[["85 breaches","notified by education in the first half of 2026, second only to health"],["Unpatched servers","the Victorian schools breach in January 2026 began on one unpatched school server"],["Shared logins","students, staff and contractors on one network and one set of cloud apps"]],
   case:["Victorian Department of Education, 2026:","student data across government schools was exposed through an unpatched school server."],
   prods:["Identity and access","Endpoint","Cloud security"],paper:"Forty thousand logins: securing the student lifecycle",reader:"university CIOs and IT directors",
   kw:"university cyber security framework",check:"The student data audit",brief:"securing student logins"}
];
S.forEach(s=>s.pieces=[
  ["st","Search guide page · 1",`The answer page for "${s.kw}"`,"Open to read, answer-first, written to be cited by AI answers"],
  ["st","Checklist · 1",s.check,"The one-page tool a reader hands to their team on Monday"],
  ["ft","LinkedIn posts · 3","Three findings from the paper","Posted by the client's assessors, one a week"],
  ["ft","Short videos · 3","Three 15-second breach stories","For YouTube and Meta, each ending on one fix"],
  ["bt","Nurture emails · 3","The checklist, a story and the invitation","Sent on days 3, 10 and 21 after the download"],
  ["bt","Briefing · 1",`45 minutes on ${s.brief}`,"Offered only to readers who engaged"]]);
return S})()
;;
@@SECTOR_SRC
'Sources: OAIC Notifiable Data Breaches statistics, 2025 and January to June 2026; IBM Cost of a Data Breach 2026 (Australian figures); ASD Cyber Threat Report 2025 to 26; ASD, Commonwealth Cyber Security Posture in 2025; Verizon DBIR 2025; company statements and press coverage for each breach. Critical data and product picks are Toggle\'s draft for Sean to prioritize.'
;;
@@SOURCES
[
  '<b>ASD, Annual Cyber Threat Report 2025 to 26</b> (October 2026): 82,000+ reports, one about every six minutes; A$93,500 average business cost per report; A$141,300 for medium businesses; 139 ransomware incidents; 154 critical infrastructure incidents; phishing 39% and valid accounts 15% of initial access. <span class="chk">Check against the PDF</span>',
  '<b>OAIC, Notifiable Data Breaches, calendar year 2025</b> (media release, 6 July 2026): 1,205 notifications; health 225, finance 157, Australian Government 118.',
  '<b>OAIC, Notifiable Data Breaches, January to June 2026</b> (media release, 26 October 2026): breaches over 1 million people up from 4 to 11; health 149 (72 malicious, 62 human error); education 85.',
  '<b>IBM and Ponemon, Cost of a Data Breach 2026</b>: Australian average A$4.22m; financial services A$6.31m. <span class="chk">Australian figures via trade press</span>',
  '<b>Home Affairs, Ransomware payment reporting</b> (Cyber Security Act 2024): 72 hours; A$3m turnover; from 30 May 2025.',
  '<b>CISC, SOCI Act incident reporting</b>: 12 hours for critical incidents, 72 hours for relevant incidents.',
  '<b>APRA, CPS 234</b> (72-hour notification) and <b>CPS 230</b> (from 1 July 2025).',
  '<b>OAIC, Privacy Act</b> s 26WH (30-day assessment) and s 13G (A$50m, 3 times the benefit or 30% of adjusted turnover). Australian Clinical Labs penalty, A$5.8m, Federal Court, October 2025.',
  '<b>ASD, Commonwealth Cyber Security Posture in 2025</b>: 22% of entities at Essential Eight Maturity Level Two or above.',
  '<b>Verizon, Data Breach Investigations Report 2025</b>: edge device and VPN exploitation 3% to 22%; third party involvement 30%; 46% unmanaged devices. <b>DBIR 2026</b>: 31% exploited vulnerability.',
  '<b>Breaches</b>: MediSecure (2024, about 12.9m people), Latitude Financial (2023, about 14m records), HWL Ebsworth (2023, 65 agencies), Origin Energy (CEO statement, 28 July 2026, about 900,000 customers), Victorian Department of Education (OVIC review, 2026).',
  '<b>6sense, 2025 B2B Buyer Experience Report</b> (November 2025): 94% ranked vendors before first contact; 77% bought from the first-ranked vendor; first contact at 61% of the journey. <span class="chk">Check against the report</span>',
  '<b>ActualTech Media and Cybersecurity Marketing Society, 2024 Cybersecurity Buyers Report</b>: 44% take 3 to 6 months; 68% of committees have 2 to 5 people.',
  '<b>NOLA Marketing and Ponemon, State of Cybersecurity Marketing Influence 2026</b>: research reports have the most direct impact (46%).',
  '<b>StatCounter, Australia, October 2026</b>: Google 87.61% of searches. <b>LocaliQ, 2026 Search Advertising Benchmarks</b>: 6.64% average click rate. <b>ZenABM, LinkedIn Ads Benchmarks 2026</b>: 0.42% median click rate, about 10% form completion, US$80 to 120 cost per lead in Asia Pacific. <b>G2, April 2026</b>: 51% start research in an AI chatbot more often than in Google.',
  '<b>Oldroyd, McElheran and Elkington</b>, "The Short Life of Online Sales Leads", Harvard Business Review, March 2011.',
  '<b>Toggle case studies</b>: Great Eastern and Singlife (2025, position 1), CIMB (+52.6% organic impressions), Mindvalley (business cost per lead US$100 to US$10, 2019 to 2022), UNITAR (32,000+ leads, 47% lower cost per lead, June to September 2025). <b>Toggle, Education Creative Deck</b>, October 2026 (head-to-head tests).'
]
;;
