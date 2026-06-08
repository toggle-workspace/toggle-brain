---
playbook: Creative review
owner: Practice lead
last_reviewed: 2026-06-08
---

# Creative review

## Purpose
Internal gate before any creative leaves the building. Catches voice drift, brand violations, and platform mistakes while they are still cheap to fix.

## When to use it
Every piece of client-bound creative: copy, static, video, landing pages, email, scripts. No exceptions, including "tiny" revisions — those are where the slips happen.

## Preconditions
- Creative is at internal-final state — not a rough cut review.
- `brain/voice/` and the client `style-pack.md` are accessible to the reviewer.
- The brief the creative was built against is named in the review request.

## Steps
1. **Copy review — voice check.** Read the copy against `brain/voice/` (house voice) and `clients/<slug>/style-pack.md` (client overrides). Flag: tone drift, banned words, missing words-we-use, brand voice violations. If the style-pack says "inherits default," check only `brain/voice/`.
2. **Visual review — brand check.** Compare against `clients/<slug>/style-pack.md` visual overrides: colors, type, logo usage, motion. Compare against reference images under `clients/<slug>/assets/reference-images/` if present. Flag off-brand colors, wrong logo lockup, wrong type, off-tone imagery.
3. **Platform fit check.** Each channel has hard constraints. Check against `prompts/platforms/<channel>.md` if it exists, otherwise the platform spec sheet. Examples: TikTok safe zone, Meta 20% text guideline (legacy but still useful), LinkedIn character counts, Google Ads headline limits, email subject line length.
4. **Brief-fit check.** Does the creative actually deliver against the brief? KPI, audience, mandatories, CTA. If not, reject — do not let "looks great" override "answers the brief."
5. **Tracking check.** UTMs, click destinations, conversion events, pixel firing on the landing page. Static creative is exempt; everything that drives traffic is not.
6. **Lead sign-off.** Practice lead writes a one-line decision: ship / revise / reject. Save the review notes to `clients/<slug>/02-creative/reviews/YYYY-MM-DD-<asset>.md` or inline as a section under the asset file. No verbal sign-offs.

## Common pitfalls
- Reviewing on phone only or desktop only. Always check the actual delivery surface.
- Skipping the brief-fit check because the work "looks polished." Polish on the wrong brief is the most expensive output we ship.
- Letting the creator be the reviewer of their own work. Always a fresh set of eyes.
- "Approve with minor tweaks" — either approve or revise, never both. Approve-with-tweaks is how typos ship.

## Owner
Practice lead signs off. Reviewer can be account lead, strategy lead, or peer creative — whoever has fresh eyes and is not the creator.
