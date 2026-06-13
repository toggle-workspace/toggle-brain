# How to run the master prompt — order of operations

> The single most important thing: **don't ask Claude to do everything in one turn.** Run the stages in sequence. Review after each. The output quality compounds when each stage builds on a locked previous stage.

## Pre-flight (do once, before stage 1)

### Step 0 — Resolve the four pre-flight items (mandatory)

Open `06-pre-flight-resolutions.md` and answer the four locked questions:
1. Wordmark font origin
2. Primary type family pick
3. Imagery treatment rule
4. Documentation platform

Save with your answers filled in. Any TODO left at this stage will become a placeholder in Stage 1 instead of a real system decision.

### Step 1 — Open and upload

1. Open a fresh Claude conversation (claude.ai with Artifacts on, OR Claude Code with a new session).
2. Upload these 10 files in this order:
   - `01-brand-dna-snapshot.md`
   - `02-voice-and-positioning-distilled.md`
   - `03-design-system-scope.md`
   - `04-references-and-anti-patterns.md`
   - `06-pre-flight-resolutions.md` (with answers)
   - `07-component-spec-template.md`
   - `screencapture-toggle-solutions-…pdf`
   - `Company Profile Deck - Toggle Solutions.pdf`
   - `Sunway TES Marketing Proposal.pdf`
   - `screencapture-linkedin-company-toggle-solutions-posts-…pdf`
3. Paste the contents of `00-MASTER-PROMPT.md` as your first message.
4. Wait for Claude to acknowledge — it should summarize what it understood and confirm it's ready for Stage 1.

## Stage cadence

Each stage (and sub-stage) is **one prompt → one review → one approval (or pushback) → next.** Sub-stages exist because Stages 6, 7, 8, 9 are too large for a single Claude turn — break them up explicitly.

| Stage | What you ask | What you get back | Review focus |
|---|---|---|---|
| **1. Identity + Signature Devices** | "Begin Stage 1" | `BRAND-IDENTITY.md` + `SIGNATURE-DEVICES.md` (architecture motif as system, strikethrough as cross-surface device with 6 worked examples, wordmark+bracket sealed mark) | Sharpens, doesn't reinvent. Strikethrough device shown across 6 surfaces, not just hero. |
| **2. Proposal Master (canonical worked example)** | "Approved. Begin Stage 2" | Light-mode HTML+CSS artifact rebuilding the Sunway proposal with real copy + 3 Contrarian Slide Library templates + Google Slides–shaped spec | Belief named per slide. Contrarian library lands. Could a team member ship a new proposal from this in < 4 hours? |
| **3. Design tokens (extracted from 1+2)** | "Approved. Begin Stage 3" | `TOKENS.md` + `tokens.json` with full taxonomy from `03-design-system-scope.md` Layer 1, three-tier semantic naming, dark+light pairs enforced | Every token has both modes. No orphan hexes. Contrast ratios documented. |
| **4. Charts & data-viz primitives (architectural layer)** | "Approved. Begin Stage 4" | `CHARTS.md` + inline SVG for every primitive in flat AND architectural rendering | Architectural primitives feel like Toggle, not generic chart libraries. |
| **5. Iconography & illustration** | "Approved. Begin Stage 5" | `ICONOGRAPHY.md` + 12 service icons + 18 utility icons + 3 canonical composite isometric forms with construction grammar | Grid math locked. Stroke weight locked. Chip math locked. |
| **6a. Inputs & forms** | "Approved. Begin Stage 6a" | Button, input set, form composition — all using `07-component-spec-template.md` | Every section of the template filled in. States table complete. |
| **6b. Containers & data** | "Approved. Begin 6b" | Card variants, tag/chip, stat block, table | Architectural component variants present (stat-as-column, channel-mix-as-blocks). |
| **6c. Structure** | "Approved. Begin 6c" | Navigation, footer, section header (with bracket device), hero blocks (with strikethrough device) | Strikethrough device formalized as component, not one-off. |
| **6d. Disclosure & supplementary** | "Approved. Begin 6d" | FAQ, modal, toast, tooltip, breadcrumb, pagination, empty state, loading skeleton, avatar, divider, dot-timeline node | Lighter spec acceptable for genuinely simple components. |
| **7a. Web layouts (sales-critical)** | "Approved. Begin 7a" | Homepage, service detail, case study detail (with architectural data viz + dot-timeline) | Holds at 375px. Editorial pacing on case study. |
| **7b. Web layouts (supporting)** | "Approved. Begin 7b" | About/team (with rectangular portraits + editorial framing), contact/booking, FAQ. All breakpoints. | Senior-operator portrait treatment matches verbal claim. |
| **8a. Company deck master** | "Approved. Begin 8a" | Dark-mode 13-slide deck modeled on Company Profile, with architectural data primitives | Stat slides feel structurally different from the Sunway light proposal. |
| **8b. Audit deliverable master** | "Approved. Begin 8b" | Free Brand Audit output template | Would a prospect upgrade to paid based on this artifact? |
| **8c. Case study one-pagers** | "Approved. Begin 8c" | One-pager template + ONE populated per real client: UNITAR, CIMB, Singlife, Kualesa, Al Hidayah, EduKids | Real numbers, real names. No Lorem Ipsum. |
| **8d. Monthly client report + weekly leads breakdown** | "Approved. Begin 8d" | Light-mode dashboard + weekly format that codifies what Zaid already does manually for UNITAR | Format is reusable across clients without major redesign. |
| **8e. Pricing & packages table** | "Approved. Begin 8e" | 5-engagement-model table with anchor logic | Sales-credibility test — would a senior B2B prospect take this seriously? |
| **8f. Email sequence templates** | "Approved. Begin 8f" | 3 pre-meeting + 3 post-meeting templates | Lands in Toggle's voice (not generic agency follow-up). |
| **9a. LinkedIn (primary channel)** | "Approved. Begin 9a" | Stat card (3 variants) + 10-slide carousel template — both using architectural primitives | Sharper than current LinkedIn output, not just different. |
| **9b. Meta + Google ads** | "Approved. Begin 9b" | 3 sizes × 3 hook formats | Maps to the Creative Strategy framework from Sunway proposal. |
| **9c. Utility assets** | "Approved. Begin 9c" | Email sig (3 variants), OG image, favicon, Twitter card, business card (digital + print) | Print specs include CMYK + bleed + safe area. |
| **10. Motion & video** | "Approved. Begin Stage 10" | `MOTION.md` + drawing-in intro bumper (line-trace, NOT assembly-pop) + outro + lower-thirds + stat-reveal | Editor can build from spec without DMing. Ages well — looks at home in 2030. |
| **11. Voice in design** | "Approved. Begin Stage 11" | `VOICE-IN-DESIGN.md` 1-pager mapping all 5 voice adjectives to specific design rules (using the positive Experienced + Unpretentious rules) | Gut-check doc the team will actually use. |
| **12. Governance & rollout (MVP)** | "Approved. Begin Stage 12" | `GOVERNANCE.md` single page: where masters live, who owns updates, request flow | Lightweight enough for a 12-person team. No deprecation theatre. |

## How to push back when a stage is off

Don't restart from scratch. Reply with:

> Stage [N] is mostly right but [specific issue: e.g., the type scale's caption size is too small to read in the Sunway proposal context — try 14px instead of 12px]. Adjust and re-output. Don't move to Stage [N+1] yet.

The model holds the context across stages — you can iterate within a stage 2–3 times before moving on.

## When to spawn a parallel critic

Before approving any stage that touches a high-stakes artifact (Stages 1, 2, 6, 7), open a parallel Claude conversation, paste the stage output, and ask:

> You are an adversarial brand critic. Read this design system stage output and tell me everything wrong with it — from the perspective of [pick one]: (a) a senior B2B prospect deciding whether to hire Toggle, (b) a working designer who has to implement this, (c) Toggle's biggest competitor trying to find weaknesses to exploit.

Take the criticisms back into the main thread and ask for revisions. Don't skip this — the system gets noticeably sharper.

## When to stop

You're done when:
- All 10 stages have produced artifacts and you've approved them.
- One real Toggle proposal has been rebuilt in the new template and feels obviously better than the Sunway TES baseline.
- One real LinkedIn post has been generated using the new stat-card template and posted.
- The team can find any token in under 30 seconds.

## Realistic timeline

With the chunked sub-stages, the system is ~22 turns. Plan ~2 turns per focused 2-hour session.

- **Week 1 (Days 1–5):** Stages 1, 2, 3, 4, 5 — foundations, proposal master, tokens, charts, icons. *This is the highest-value week — the proposal master alone justifies the system.*
- **Week 2 (Days 6–10):** Stages 6a–6d, 7a–7b — web components + layouts.
- **Week 3 (Days 11–15):** Stages 8a–8f — the rest of the sales artifact stack (deck, audit, case studies, reports, pricing, emails).
- **Week 4 (Days 16–20):** Stages 9a–9c, 10, 11, 12 — marketing assets, motion, voice-in-design, governance.
- **Week 5 (buffer):** Migrate one in-flight client artifact (UNITAR weekly report? CIMB case study?) to the new system as the proof.

Four to five calendar weeks if you protect 2–3 focused hours per day. **Don't compress into one sprint — the review/approval rhythm is the quality lever.** A bad Stage 2 propagates into every component and template downstream.

## Don't optimize for speed — optimize for the proposal master

If you only ship Stage 1 + Stage 2 in this entire process, **Toggle still wins.** A formalized identity + a working proposal master that closes deals faster is the single highest-ROI artifact. Everything after Stage 2 compounds value, but if budget runs out, those two are the floor.

## After the system is built

- Drop the final artifacts into `Toggle Brain/brain/design-system/` (new folder, treat as canonical source-of-truth).
- **Mirror everything into Google Suite** (the team-facing consumption surface, confirmed in pre-flight):
  - Google Docs: `BRAND-IDENTITY`, `SIGNATURE-DEVICES`, `VOICE-IN-DESIGN`, `GOVERNANCE`, `TOKENS` (human-readable version), `ICONOGRAPHY`, `CHARTS`, `COMPONENTS` reference
  - Google Slides: Proposal master, Company deck master, Case study one-pager template, Audit deliverable master, Monthly report master, Weekly leads breakdown master, Pricing & packages master
  - Google Sheets: Token reference (color hexes, type scale sizes, spacing values — for non-eng team members who don't read JSON)
  - Google Drive folder structure: `Toggle Design System / 01 Identity / 02 Tokens / 03 Components / 04 Sales Templates / 05 Marketing Assets / 06 Voice & Governance`
- Update `clients/toggle/style-pack.md` to point at the new system (with Google Drive links) rather than carrying inline overrides.
- Add a `last_reviewed:` frontmatter and put it on the quarterly brain-sync rotation per `Toggle Brain/CLAUDE.md`.
- Onboard each Toggle team member with the `VOICE-IN-DESIGN.md` 1-pager + a 30-min walkthrough of the Google Drive folder.

## Common failure modes (watch for these)

1. **Claude tries to invent a brand from scratch instead of codifying.** Push back hard with: "The brand exists. Codify it. Re-read the brand DNA snapshot."
2. **Claude produces beautiful UI components that don't match the Toggle voice.** Push back: "This looks like Stripe / Linear / [whatever]. It should look like Toggle. Check against the references vs. anti-patterns doc."
3. **Claude generates one component perfectly and then drifts on subsequent ones.** Reset by asking it to re-list the locked tokens before designing the next batch.
4. **Claude proposes 3 variants when 1 is needed.** Push back: "Pick one. Justify why. Cut the others. Senior operators don't ship optionality, they ship decisions."
5. **The dark-mode version of a component is great but the light-mode version is an afterthought.** Always ask explicitly: "Show me light mode side-by-side. Does this look native or bolted on?"

## Escape hatches

If the conversation grows too long and Claude starts losing the thread, end the session and start a fresh one — re-upload the 8 files, re-paste the master prompt, plus the stage-N artifact you'd already approved, and pick up at Stage N+1. The system is designed to be modular per stage so this works cleanly.
