# MAP — flat "question → path" index

When you don't know where something lives, look here. One question per line. Keep this file flat — no nesting, no categories, just searchable text.

> Tip: `grep -i 'pricing' MAP.md` is the fastest lookup. Add a line whenever you spend more than 30 seconds finding something.

---

## Pricing & quotes
- Where is our Malaysia rate card? → `brain/pricing/rate-card-my.md`
- Where is our Singapore rate card? → `brain/pricing/rate-card-sg.md`
- Where do bundles (named packages) live? → `brain/pricing/bundles.md`
- Where do atomic line items live (1 reel, 1 static, 1 ad set)? → `brain/pricing/line-items.md`
- Where are discount rules (retainer %, multi-month, NGO)? → `brain/pricing/discount-rules.md`
- Where do I see what changed in pricing? → `brain/pricing/CHANGELOG.md`
- How do I generate a quote? → `generators/quote.md`
- Where do past quotes live (price anchors)? → `archive/quotes/`
- Where do new quotes get written before sending? → `clients/<slug>/quotes/YYYY-MM-DD-<scope>.md`

## Services
- What services do we offer? → `brain/services/` (one file per service)
- Performance marketing? → `brain/services/performance-marketing.md`
- SEO? → `brain/services/seo.md`
- Web development? → `brain/services/web-development.md`
- Creative production / TikTok? → `brain/services/creative-production.md`
- Branding? → `brain/services/branding.md`

## Voice & positioning
- House voice? → `brain/voice/toggle-house-voice.md`
- Tone by channel (TikTok vs LinkedIn vs email)? → `brain/voice/tone-by-channel.md`
- Words we say? → `brain/voice/do-say.md`
- Words we never say? → `brain/voice/never-say.md`
- Elevator pitches? → `brain/positioning/elevator-pitches.md`
- What makes us different? → `brain/positioning/differentiators.md`
- Who are our competitors? → `brain/positioning/competitors.md`

## Case studies
- All case studies (tagged index)? → `brain/case-studies/_index.md`
- UNITAR? → `brain/case-studies/unitar.md`
- Kith & Kin? → `brain/case-studies/kith-and-kin.md`
- Great Eastern SG? → `brain/case-studies/great-eastern-sg.md`
- Singlife? → `brain/case-studies/singlife.md`
- CIMB Malaysia? → `brain/case-studies/cimb-malaysia.md`
- Al Hidayah? → `brain/case-studies/al-hidayah.md`
- Kualesa? → `brain/case-studies/kualesa.md`
- EduKids? → `brain/case-studies/edukids.md`

## Team & process
- Team roster? → `brain/team/roster.md`
- Individual bios? → `brain/team/bios/<name>.md`
- How we engage (audit, partnership, intensive)? → `brain/process.md`
- Tools, vendors, freelancers? → `brain/partners-stack.md`
- Acronyms & jargon? → `brain/glossary.md`

## Verticals & geos
- Vertical-specific knowledge? → `brain/verticals/<vertical>.md`
- Malaysia-specific (regulatory, channel mix, currency)? → `brain/geos/malaysia.md`
- Singapore-specific? → `brain/geos/singapore.md`

## Generators (slash commands)
- All generators? → `generators/`
- `/quote` → `generators/quote.md`
- `/proposal` → `generators/proposal.md`
- `/tiktok-hooks` → `generators/tiktok-hooks.md`
- `/meta-ad-copy` → `generators/meta-ad-copy.md`
- `/caption` → `generators/caption.md`
- `/email` → `generators/email.md`
- `/landing-page` → `generators/landing-page.md`
- `/image-prompt` → `generators/image-prompt.md`
- `/video-prompt` → `generators/video-prompt.md`
- `/monthly-report` → `generators/monthly-report.md`

## Prompts library
- Hooks / bodies / CTAs? → `prompts/copy/{hooks,bodies,ctas}/`
- TikTok prompts? → `prompts/platforms/tiktok.md`
- Meta prompts? → `prompts/platforms/meta.md`
- LinkedIn prompts? → `prompts/platforms/linkedin.md`
- Midjourney prompts? → `prompts/image/midjourney.md`
- Sora prompts (video)? → `prompts/video/sora.md`
- Toggle default style-pack (voice + visual)? → `prompts/style-packs/toggle-default.md`
- Winning prompts (proven in market)? → `prompts/canonical/`

## Templates
- All empty templates? → `templates/`
- TikTok brief shell? → `templates/briefs/tiktok.md`
- Meta brief shell? → `templates/briefs/meta.md`
- Creative brief shell? → `templates/briefs/creative.md`
- Proposal shell? → `templates/proposals/proposal.md`
- Quotation shell? → `templates/quotations/quotation.md`
- Monthly report shell? → `templates/reports/monthly-performance.md`
- Pitch deck shell? → `templates/decks/pitch-deck.md`
- Meeting notes shell? → `templates/meeting-notes.md`
- Content calendar shell? → `templates/content-calendar.md`

## Clients
- Client template (skeleton)? → `clients/_TEMPLATE/`
- Audaura (UNITAR)? → `clients/audaura-unitar/`
- IJN University College? → `clients/ijn-university-college/`
- Sunway TES? → `clients/sunway-tes/`
- (Full client list — see `clients/` directory)

## Playbooks
- Onboard a new client? → `playbooks/onboard-new-client.md`
- Launch a paid campaign? → `playbooks/launch-paid-campaign.md`
- Monthly reporting routine? → `playbooks/monthly-reporting.md`
- TikTok production pipeline? → `playbooks/tiktok-production.md`
- Creative review process? → `playbooks/creative-review.md`

## Cockpit (daily operating state)
- Today's focus / top 3? → `cockpit/current.md`
- Per-client todos? → `cockpit/todos/<client-slug>.md`
- Toggle-internal todos (biz dev, ops, hiring)? → `cockpit/todos/_internal.md`
- Daily journal (EOD logs)? → `cockpit/journal/YYYY-MM-DD.md`
- Significant decisions log? → `cockpit/decisions/YYYY-MM-DD-<slug>.md`
- Zone rules? → `cockpit/CLAUDE.md`

## Daily routines (global skills, callable from any project)
- Morning brief / day's plan? → `/toggle-brief` (reads `cockpit/`, `clients/*/CLIENT.md`)
- Green/yellow/red across clients? → `/toggle-status` (reads `clients/*/CLIENT.md`, git mtime)
- Pick the next task? → `/toggle-decide` (reads `cockpit/`, today's git activity)
- UNITAR weekly leads breakdown? → `/unitar-weekly-report` (reads `clients/audaura-unitar/WEEKLY-REPORT-FORMAT.md`)
- Write a TikTok One creator brief? → `/tiktok-brief-writer` (enforces `brain/tiktok-one-rules.md`)
- Validate a draft brief? → `brief-validator` subagent (adversarial check vs TikTok rules)

## Knowledge (binding doctrine)
- TikTok One binding creator-brief rules (TikTok platform — applies anywhere)? → `brain/tiktok-one-rules.md`
- UNITAR KPI definition (net-lead gap, NOT blended CPL)? → `clients/audaura-unitar/KPI.md`
- UNITAR campaign naming convention? → `clients/audaura-unitar/CAMPAIGN-NAMING.md`
- UNITAR weekly leads breakdown format? → `clients/audaura-unitar/WEEKLY-REPORT-FORMAT.md`

## Installations (tooling setup)
- How do I install the toggle-brain MCP server? → `installations/toggle-mcp/install.md`
- Set up toggle-mcp auto-sync from toggle-brain? → `TOGGLE_BRAIN_SETUP.md`
- How do I connect Google Drive to Claude Code? → `installations/google-drive/install.md`

## Governance
- Branching / PR rules? → `CONTRIBUTING.md`
- Who reviews what? → `.github/CODEOWNERS`
- PR checklist? → `.github/PULL_REQUEST_TEMPLATE.md`
