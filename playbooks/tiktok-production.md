---
playbook: TikTok production
owner: Creative lead
last_reviewed: 2026-06-08
---

# TikTok production

## Purpose
Move TikTok creative from hook ideation to posted video without losing the speed advantage that makes TikTok work.

## When to use it
Any TikTok paid or organic deliverable. Same pipeline regardless of feed (Spark Ads, in-feed, organic).

## Preconditions
- Client style-pack signed off (`clients/<slug>/style-pack.md`).
- Brief or post objective agreed.
- Talent / creator booked if applicable.
- Music / sound rights cleared if using anything other than TikTok's Commercial Music Library.

## Steps
1. **Hooks.** Run `/tiktok-hooks` (generator at `generators/tiktok-hooks.md`) which reads `brain/voice/`, `prompts/platforms/tiktok.md`, and the client's `style-pack.md`. Generate 10–15 hook variants. Save to `clients/<slug>/02-creative/copy/YYYY-MM-DD-tiktok-hooks.md`.
2. **Brief.** Copy `templates/briefs/tiktok.md` into `clients/<slug>/00-brief/YYYY-MM-DD-<campaign>-tiktok.md`. Lock: objective, audience, top 3 hooks to shoot, scene-by-scene structure, CTA, on-screen text, captions, music direction, deliverable specs (9:16, duration, file format).
3. **Pre-production.** Shot list, location, talent confirmation, props, wardrobe. Confirm legal/likeness usage rights in writing before shoot day. Save shot list to `clients/<slug>/02-creative/video-prompts/<campaign>-shotlist.md`.
4. **Shoot.** Cover each hook with at least one alt take. Capture B-roll. Shoot vertical native — no salvage crops from horizontal.
5. **Edit.** First cut against the brief, not against feel. Pacing: hook in first 2 seconds, payoff before 6 seconds, CTA before end card. On-screen text fully visible above the platform UI safe zone.
6. **Internal review.** Run `playbooks/creative-review.md` — voice check vs `brain/voice/`, visual check vs `style-pack.md`, platform fit (caption length, CTA, sound, safe zone).
7. **Client approval.** One round of revisions baked into the timeline. Anything beyond that is scope.
8. **Post.** Paid: upload via Ads Manager with the right Spark Ads permissions. Organic: post natively from creator account at the agreed time. Document the live URL in the brief file.
9. **Measure.** 24h, 72h, 7d checkpoints. Hook hold rate, completion rate, CTR if paid, CPM, CPA. Note learnings in `clients/<slug>/04-reports/` or directly in the brief file under a "Learnings" section.

## Common pitfalls
- Writing hooks in the brand voice instead of the platform voice. TikTok rewards pattern-breaks, not polish.
- Shooting horizontal and cropping. Looks cropped, performs accordingly.
- Captions that block the CTA. Test on a real phone before delivery.
- Burning the first 2 seconds on a logo or intro card. Cut it.
- No music plan — discovering on edit day that the sound you wanted is not in the Commercial Music Library.

## Owner
Creative lead owns production. Media lead owns paid distribution. Account lead owns client comms.
