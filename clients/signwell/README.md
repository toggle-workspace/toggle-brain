# SignWell: start here

Everything Toggle knows about this account, in one file, so work can resume on any
machine without rebuilding context. Written 13 September 2026, the night before the
first call. It is a snapshot from that date: `CLIENT.md` holds the current state of
the account and wins wherever the two disagree.

**Read order for a cold start:** this file, then
`01-strategy/2026-09-13-brand-audit-verified-data.md` for the evidence behind every
claim, then `01-strategy/2026-09-13-discovery-questions.md` if a meeting is coming up.

---

## 1. How this came in

Lawrence Quan referred Toggle into a three way agency shortlist over WhatsApp. He is
the same partner who referred VoiceRun, except he now writes from a signwell.com
address and calls SignWell "we", so his exact role inside the company is unconfirmed
and worth asking about.

His brief, in his words:

- Spend is about $20,000 a month, mostly on paid search.
- They also want to launch paid social.
- Transition off the last agency, who built campaigns inside their own accounts.
  Everything has to move to SignWell's own accounts.
- Set up tracking.
- Goal is qualified app signups. Mostly a product led motion. Cost per conversion
  matters because it is a lower ACV business.
- Build a paid social and full funnel strategy.

**The meeting.** Monday 14 September 2026, 9:30am ET, which is 9:30pm Malaysia time,
hard stop at 10:15. Jordan Pinto presenting. Attendees are Lawrence and Henry, the
head of marketing (surname unknown). Nobody said whether it is discovery or a
proposal review, so everything was built to serve both.

**Two loose ends as of writing.** The calendar invite to lawrence@signwell.com and
henry@signwell.com did not appear to have gone out. And the first question in the
room should be which kind of meeting this is, so the 45 minutes get spent correctly.

---

## 2. What SignWell is

Electronic signature platform in Portland, Oregon. Founded 2019 by Ruben Gamez,
operating as Docsketch LLC after renaming from Docsketch. 17 employees, growing 36.4%
year over year as of March 2026 per Crustdata. A third party snapshot put revenue near
$5M ARR in 2024, which is **unconfirmed and must not be repeated to the client as
fact**.

Positioning is the simple, affordable alternative to DocuSign and Adobe Sign, with
compliance included on every plan including the free one. Claimed proof: 65,000 plus
businesses, 20 million plus documents signed, 4.9 on Capterra, 4.8 on G2.

### Pricing, which governs everything else

| Plan | Price | Notes |
|---|---|---|
| Free | $0 | 1 sender, 1 template, 3 documents a month |
| Light | $12 per user monthly, $10 annual | Unlimited documents, 5 templates |
| Business | $36 per user monthly, $30 annual | 3 senders, unlimited templates, 50 SMS credits |
| API | $275 a month base | 25 free documents, then $0.85 falling to $0.20 per document |
| Enterprise | Custom, sales gated | 50 plus seats |

The API plan is 22.9 times a Light seat. That single ratio drives the most important
question in the whole engagement, which is what "qualified app signup" actually means.

Eleven industry pages exist with no visible tiering. Integrations point at specific
verticals: Clio for legal, Close for sales, QuickBooks and Xero for accounting, Jack
Henry and Mambu for banking cores.

---

## 3. The five things worth knowing

Full evidence and sources live in
`01-strategy/2026-09-13-brand-audit-verified-data.md`. Summary only here.

**1. Two comparison pages have no route to signup, and they are the two biggest.**
`/docusign-alternative/` (10,625 px) and `/adobe-sign-alternative/` (9,109 px) carry
no signup control anywhere on them. The other four comparison pages do. DocuSign is
the incumbent their customers are leaving and Adobe is the second, so the fix needs no
new design, just the control that already works on the SignNow page.

**2. A $12 seat and a $275 API account cannot share one conversion action.** If both
register as an undifferentiated "app signup", automated bidding chases volume and
walks away from value. This is the first question for Henry.

**3. The free tools offer signup only after the work is done.** That is deliberate and
it matches SignWell's own Google ad copy, "No Account Needed to Sign." The real
questions are whether the post-action prompt fires a tracked event and whether anyone
retargets people who finished a document and never took an account. The 41 contract
templates are the exception: no signup route anywhere on a 17,866 px page, and they
have not been touched since July 2021.

**4. The tracking foundation is half built and somebody already did the hard part.**
Every page writes the GA4 client ID into a first party cookie named `ga_client_id`
with a two year expiry, retrying up to ten times. That was engineered so a backend
signup can be matched to the web session that produced it. Where that cookie goes
after signup decides how quickly Toggle can bid on real revenue.

**5. The category has left Meta empty, and that is the opening.** SignNow and Dropbox
Sign run zero Meta ads. DocuSign runs about 360 selling enterprise agreement AI and
PandaDoc about 120 selling revenue operations. Nobody is selling simple, cheap signing
to a small business. Meanwhile SignWell runs 22 Google ads against SignNow's roughly
20,000.

### The migration, which nobody else will say out loud

Campaign history does not move between Google Ads accounts. Conversion history,
Quality Score and bidding learning stay with the old agency. Expect a rebuild period.
Any agency promising a clean lift and shift is either mistaken or has not done it.

---

## 4. The competitive picture, from the public ad libraries

Captured by Jordan on 13 September 2026. Counts are the libraries' own approximations.

| Brand | Meta | Google | LinkedIn | TikTok |
|---|---|---|---|---|
| SignWell | 0 | **22** | not captured | 0 |
| DocuSign | ~360 | ~3,000 | not captured | 0 |
| PandaDoc | ~120 | ~3,000 | not captured | 0 |
| SignNow | 0 | ~20,000 | 52 | 0 |
| Dropbox Sign | 0 | not captured | not captured | 0 |

Three reads that matter:

- **DocuSign bids the word free in five languages** and has no free plan. SignWell has
  a real one and is not defending the word.
- **SignNow is running SignWell's own playbook on LinkedIn.** All 52 ads are customer
  stories about replacing DocuSign for compliance reasons in clinical research.
  SignWell has compliance on every plan including free, which SignNow does not, plus
  14 published customer stories, and runs none of it.
- **Nobody uses TikTok** in this category, so there is no first mover argument worth
  funding.

---

## 5. The proposed plan

Budget split for the $20,000, media only, no Toggle fee anywhere in the deck:

| Platform | Monthly | Share |
|---|---|---|
| Google Search | $12,000 | 60% |
| Microsoft Search | $1,000 | 5% |
| Meta | $4,000 | 20% |
| LinkedIn | $2,000 | 10% |
| Test reserve | $1,000 | 5% |

Search holds 65%, respecting Lawrence's instruction. Paid social gets 30%, which is
enough to learn rather than enough to produce an unreadable result.

Three paid social angles, each a test with a result you can act on: the renewal
switching moment on Meta, retargeting free tool users on Meta, and compliance told as
a customer story on LinkedIn.

**No forecast until account access.** Five inputs are missing: current cost per
qualified signup, monthly signup volume, free to paid conversion rate, average revenue
per paid account, and the seat against API revenue mix. The deck shows the model and
commits to a real forecast within five working days of access. This was a deliberate
decision, not an omission.

---

## 6. What has been built

| Path | What it is |
|---|---|
| `CLIENT.md` | Contacts, scope, access, status |
| `style-pack.md` | Voice and visual notes, read from their live site, not a brand guide |
| `01-strategy/2026-09-13-brand-audit-verified-data.md` | Every verified finding with its source. The deck may not assert anything not in here |
| `01-strategy/2026-09-13-discovery-questions.md` | The one page question sheet for the call, seven categories, five starred |
| `01-strategy/2026-09-13-audit-deck-outline.md` | What shipped in the deck and why, plus design deviations |
| `_deck-build/` | The build script, theme, layout checker and DOM checker |
| Jordan's Desktop | `SignWell - Brand Audit and Growth Plan (2026-09-13).pptx`, 35 slides |

The `.pptx` itself is **not** in the repo. Rebuild it from `_deck-build/` (see
section 8) or copy it from the Desktop of the machine that built it.

### The deck in one paragraph

35 slides. Twenty two to present in about 23 minutes, leaving half the meeting free,
plus a 13 slide appendix as the leave behind. Built on the Toggle Stage 8a Company
Deck Master (dark). No Toggle fee slide, per the VoiceRun precedent, since fee is
handled with Lawrence separately. No strikethrough, because 8a forbids it in a deck.
Jordan Pinto, Cofounder, jordan@toggle.solutions appears on the cover and the close.

---

## 7. Mistakes already made, so nobody repeats them

Three corrections happened during this work. They are recorded because the wrong
version is plausible and someone could re-derive it.

**Reading the served HTML is not enough on this site.** The first pass concluded all
six comparison pages lacked a signup control. Jordan checked in a browser and four of
them plainly had one. SignWell injects several of these controls with JavaScript.
Every signup claim in the evidence file now comes from the rendered DOM in headless
Chromium with the full page scrolled. Use `_deck-build/dom-check2.js` to re-run it.

**`/electronic-signature/` does have signup controls.** Two "Start for free" buttons
in the body. The earlier HTML-only reading said none.

**`/sign-pdf/` and `/sign-documents-online/` are not "built to convert on arrival".**
They hold a hidden Google signup form that surfaces after the user acts, the same
pattern as the signature generator. Tool first by design.

**One thing that looks like a finding and is not.** SignWell's Google ads display
`signwell.com/esignature`, which returns a 404. Google Ads display paths are
decorative and need not match the final URL, so this proves nothing about where the
budget lands. It is a question for Henry, not a finding.

---

## 8. Rebuilding the deck on another machine

```bash
cd clients/signwell/_deck-build
npm install
npm run build          # writes the .pptx to your Desktop
npm run check          # layout check: overflow, table collisions, painted-over text, edge bleed
```

Both paths are portable. The repo root is derived from the folder's own location and
the output defaults to your Desktop, so nothing needs editing. Override the
destination with `OUT=/some/where/deck.pptx npm run build`. Verified working from a
clean install on 13 September 2026. See `_deck-build/README.md` for detail.

Two things to know:

- **Fonts.** The canon calls for Inter Tight. It was not installed on the Windows
  desktop and `assets/fonts/` is empty, so the deck ships in Segoe UI, which the
  design token names as its own fallback. If you build on a machine with Inter Tight,
  change `F` in `theme.js` and the deck will match the canon exactly.
- **`check.js` must pass at zero.** It hooks every `addText`, `addTable` and
  `addShape` during the build and estimates rendered height against declared box
  height. It caught seven text overflows, six table collisions and two flow maps that
  ran off the slide. Do not ship a build it complains about.

To verify visually, open the file in PowerPoint and export slides to PNG. On Windows
that can be scripted through the PowerPoint COM object. PNG export has been unreliable
on this machine in the past, so read the slide XML as a fallback.

To re-run the site checks:

```bash
npx playwright install chromium
npm run dom            # rendered-DOM signup control sweep across the key pages
```

---

## 9. Open questions and next steps

**Unverified, and must stay labeled as such:**

- Which pages the $20,000 a month actually lands on.
- LinkedIn ad counts for SignWell, DocuSign, PandaDoc and Dropbox Sign. Only SignNow
  was captured.
- The demo request form fields. The form is JavaScript rendered.
- Organic traffic, keyword rankings and backlink profile. No Ahrefs or Semrush access.
- Everything behind the app login, including activation and upgrade flows.
- Lawrence's actual role inside SignWell.
- Henry's surname and remit.

**If the pitch converts, in order:**

1. Admin access to Google Ads, Meta, LinkedIn, Microsoft and the GA4 property.
2. Full account audit, then the real forecast within five working days.
3. The DocuSign and Adobe comparison page signup controls, which cost nothing in media
   and can ship in a week.
4. Instrument the event model in the appendix: free signup, activated, paid, API
   signup, API paid, demo request, each with a value.

**Repo hygiene:** work sits on branch `client/signwell/brand-audit`, unpushed at the
time of writing. Run `/git-contribute` to open the PR. On 9 October 2026 this file
and `_deck-build/` moved from `clients/lawrence-clients/signwell/` into this folder,
and VoiceRun moved to its own folder at `clients/voicerun-lawrence-client/`.
