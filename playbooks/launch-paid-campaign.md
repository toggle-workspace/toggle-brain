---
playbook: Launch paid campaign
owner: Media lead
last_reviewed: 2026-06-08
---

# Launch paid campaign

## Purpose
Take a campaign from brief to live without skipping the gates that protect spend, brand, and tracking.

## When to use it
Any paid campaign across Meta, Google, TikTok, LinkedIn, or programmatic. Includes one-off pushes and always-on flights.

## Preconditions
- Active client folder under `clients/<slug>/`.
- Budget, dates, and objective confirmed in writing.
- Tracking already in place (pixels, GA4, server-side if applicable) — if not, fix first.
- Style-pack signed off (`clients/<slug>/style-pack.md`).

## Steps
1. **Brief.** Copy `templates/briefs/<channel>.md` into `clients/<slug>/00-brief/YYYY-MM-DD-<campaign>.md`. Fill objective, KPI, audience, offer, dates, budget, mandatories. Account lead signs off the brief before media planning starts.
2. **Media plan.** Draft in `clients/<slug>/03-media/YYYY-MM-DD-<campaign>.md`. Channel split, daily budget, bid strategy, audience structure, naming convention, UTM plan. Reference rate card from `brain/pricing/` — do not inline.
3. **Creative.** Build assets under `clients/<slug>/02-creative/copy/`, `02-creative/image-prompts/`, `02-creative/video-prompts/`. Voice anchored to `brain/voice/` + style-pack overrides. Minimum: 3 hooks × 2 angles per audience for testing.
4. **Internal QA.** Run `playbooks/creative-review.md`. Copy review, visual review, platform fit check, lead sign-off. No campaign launches without this gate passed.
5. **Client approval.** Send creative + media plan in one go. Track approval in `clients/<slug>/05-meetings/` or comms log. Do not launch on verbal approval alone.
6. **Build in platform.** Mirror the naming convention from the media plan. Double-check tracking parameters, conversion events, budget pacing, schedule.
7. **Launch checklist (pre-flight).** Pixel firing, UTMs resolving, landing page live, conversion event mapped, budget cap correct, audience exclusions in place, brand-safety lists applied.
8. **Launch.** Set live. Screenshot the live state into `clients/<slug>/03-media/launch-evidence/`.
9. **Day-1 check.** Within 4 hours: delivery started, no policy rejections, CPM in expected range, no broken URLs. Pause anything misbehaving.
10. **Day-3 check.** Early signal on CTR and CPA. Kill obvious losers. Do not over-optimise yet — let the algorithm exit learning.
11. **Day-7 check.** Compare to plan. Write a short note in `clients/<slug>/04-reports/` or a follow-up meeting note. Decide: scale, hold, or rebuild.

## Common pitfalls
- Launching without tracking validated end-to-end. Day-7 you discover the pixel was firing on the wrong event and the campaign data is unusable.
- Skipping creative review because the deadline is tight. The deadline gets worse when the client sees off-brand copy.
- Letting the platform default audiences ride. Always set exclusions for existing customers and lookalike overlaps.
- Renaming campaigns post-launch. Breaks downstream reporting.

## Owner
Media lead executes. Account lead approves brief and final creative.
