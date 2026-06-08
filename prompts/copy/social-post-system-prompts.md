# Social Media Agent Training Plan

## Overview

Three agents, each trained per platform, each able to write in any of the three style modes:
- **Alex Hormozi** — brutal directness, earned authority, one idea per post
- **Scott Galloway** — intellectual provocation, systems thinking, moral urgency
- **Marketing Millennials** — no-BS peer talk, tactical lists, conversational

---

## What to Build

### 1. System Prompts (per platform)
One system prompt per platform that encodes:
- Agency brand, voice, and positioning
- Core proof points and case study data
- Content pillars / talking points
- Platform-specific formatting rules
- Style selector (Hormozi / Galloway / Marketing Millennials)

### 2. Post Types (templates per content category)

| Post Type | Description |
|---|---|
| Case Study | Before → what we did → after (with specific numbers) |
| Opinion / Hot Take | Contrarian position on industry topic |
| Data Insight | Stat or observation from managing client accounts |
| Founder Story | Personal origin, failure, lesson learned |
| Client Results | Specific metric win, stripped to the numbers |
| Contrarian Take | Something the industry says that we disagree with |
| Tactical Tip | One actionable thing the audience can apply today |

### 3. Content Brief Format
A simple fill-in that lets you feed the agent a raw talking point and get a platform-ready post:

```
TALKING POINT: [raw idea, data point, or story]
POST TYPE: [case study / opinion / data / story / result / tip]
STYLE: [Hormozi / Galloway / Marketing Millennials]
PLATFORM: [LinkedIn / Instagram / YouTube Shorts]
TONE NOTES: [any specific adjustments for this post]
```

---

## Platform Specs

### LinkedIn
- Best for: Opinion posts, case studies, founder stories, data insights
- Format: Native text, line breaks for spacing, minimal hashtags (2-3)
- Length: 150–300 words for punchy posts; up to 600 for deep dives
- Hook: Must work as a standalone first line (shown before "see more" cut)
- CTA: Question or soft engagement invite at end

### Instagram
- Best for: Quick wins, tactical tips, visual case studies, quotes
- Format: Caption + carousel or single image
- Caption length: 50–150 words; front-load value
- Carousel: One idea per slide, 5-10 slides max
- CTA: "Save this," "Send to your team," open question

### YouTube Shorts
- Best for: Hot takes, contrarian opinions, single tactical insights
- Format: Spoken — write as a script, not an essay
- Length: 30–60 second script (~75–150 words spoken)
- Structure: Hook (0-3s) → Point (3-45s) → Punchline close (45-60s)
- Hook rule: First line must work without visuals — it's heard before it's seen

---

## Input Files Required Before Building Agents

- [ ] `agency-inputs.md` — completed with all agency details
- [ ] `case-studies.md` — at least 3 case studies with before/after numbers
- [ ] `talking-points.md` — at least 10 content pillars / opinions
- [ ] `tone-of-voice.md` — brand voice adjectives, dos and don'ts
- [ ] `performance-data.md` — key stats, benchmarks, platform results

---

## Style Reference Files
- `style-hormozi.md`
- `style-galloway.md`
- `style-marketing-millennials.md`
