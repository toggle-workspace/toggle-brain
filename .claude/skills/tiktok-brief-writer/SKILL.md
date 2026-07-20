---
name: tiktok-brief-writer
description: Draft a TikTok One creator brief that complies with TikTok's binding rules (1 product, 2–3 plain-language USPs, six-section structure, one creator persona). Reads brain/tiktok-one-rules.md as the authority. Use when Zaid types /tiktok-brief-writer, says "write a TikTok brief", "draft a TikTok One brief", or "creator brief for <client/product>".
user_invocable: true
---

# tiktok-brief-writer

Drafts a TikTok One creator brief that will pass TikTok's review. Enforces
the binding rules at `brain/tiktok-one-rules.md`.

## What this skill does

1. Reads `brain/tiktok-one-rules.md` — the binding rules. Non-negotiable.
2. Reads the client's `style-pack.md` for voice / visual overrides.
3. Reads `brain/voice/` for house voice and `prompts/platforms/tiktok.md`
   for hook patterns and CTA library.
4. Asks Zaid for inputs (client slug, ONE product, persona, scene direction).
5. Drafts the brief in the **six-section structure**.
6. Writes to `clients/<slug>/00-brief/YYYY-MM-DD-<campaign>-tiktok-one.md`.
7. Recommends running the `brief-validator` subagent before submission.

## Steps

1. All paths under `/Users/zaidsaad/Desktop/Code/Toggle Brain/`.
2. Read `brain/tiktok-one-rules.md` — load the four binding rules and the
   six-section structure into your working context.
3. Ask Zaid for inputs (one prompt, batch them). **Apply each input check
   as a hard refusal, not a suggestion:**
   - **client slug** (lowercase-kebab, must exist under `clients/`).
   - **product / program** — exactly ONE. **Hard refusal:** if Zaid names
     more than one (including via `+`, `and`, `or`, `bundled with`, `also`),
     respond verbatim: "That reads as two products. TikTok will reject.
     Write one brief per product. Which should we brief first?" — and stop.
   - **campaign name** (used in the filename).
   - **creator persona / archetype** — exactly ONE, in **singular voice**.
     **Hard refusal:** if Zaid uses `or`, `and`, `either-or`, or slash
     phrases ("student or parent", "Gen Z and millennial", "coder/creator"),
     respond: "Compound persona — TikTok wants one archetype. Pick the
     primary one and we'll brief separately for the other."
   - **2 or 3 plain-language USPs** — exactly 2 or 3. **Hard refusal:** if
     Zaid offers 4+, respond: "TikTok caps USPs at 3. Which 2 or 3 should
     we keep?" If Zaid offers jargon (apply the **17-year-old test** —
     would a 17-year-old understand without Googling?), respond: "Rephrase
     `<jargon phrase>` in plain English — a 17-year-old reading the brief
     must understand without context." Re-prompt until plain. Do not write
     `jargon: present — flagged` in frontmatter as an escape hatch — that
     option is removed.
   - **CTA exact wording.**
   - **deliverable specs** (default 9:16, 15s or 30s).
4. Read `clients/<slug>/style-pack.md` for voice / visual overrides.
5. Read `brain/voice/` (house voice, tone-by-channel, do-say, never-say).
6. Read `prompts/platforms/tiktok.md` for hook patterns and CTA library.
7. Draft the brief in this exact structure (six sections, this order):

```markdown
---
client: <slug>
campaign: <campaign>
platform: TikTok One
authority: brain/tiktok-one-rules.md (binding)
created: YYYY-MM-DD
status: draft (run brief-validator before submission)
---

# <Campaign title> — TikTok One creator brief

## 1. Hook & message
<plain-language opening line. What stops the scroll in the first 2 seconds.>

## 2. Product / program
**<Product name>** — <one sentence what-it-is, plain English>

## 3. USPs
- <USP 1 — plain language, no jargon>
- <USP 2 — plain language, no jargon>
- <USP 3 — optional, max three>

## 4. Creator vibe
<persona / archetype — tone, energy, look. One persona only.>

## 5. Scenes / structure
1. **Scene 1 (0–2s):** <hook visual>
2. **Scene 2 (2–6s):** <payoff>
3. **Scene 3 (6–Xs):** <build>
4. **Scene 4 (X–end):** <CTA scene>
(3–5 scenes only. Hook in 2s, payoff before 6s, CTA before end card.)

## 6. CTA & deliverables
**CTA exact wording:** "<the line the creator says or shows on screen>"
**Format:** 9:16
**Duration:** <15s | 30s>
**Deliverables:** <count and any variants — e.g. 1 main + 1 alt take>
```

8. Write the brief to
   `clients/<slug>/00-brief/<YYYY-MM-DD>-<campaign>-tiktok-one.md`.
9. **Recommend** Zaid run the `brief-validator` subagent against the draft
   before submitting to TikTok. Print the suggested invocation.
10. Commit with `feat(<slug>): TikTok One brief <campaign> (draft)`. Don't push.

## Guardrails

- **One product only.** Hard refusal in step 3 covers this — including
  the `+` / `and` / `or` / `bundled with` cases.
- **No jargon in USPs.** Apply the 17-year-old test in step 3. Do NOT
  accept `jargon: present — flagged` as an escape hatch — that frontmatter
  flag is **removed**. Reject the input until plain.
- **Six sections, that exact order.** No extra sections. Before writing
  the file, count your own `##` headers — must be exactly 6.
- **No background-context preamble over 3 sentences.** If Zaid insists on
  any preamble before section 1, cap it at 3 sentences. Beyond that, drop
  it entirely and tell Zaid: "Background context belongs in
  `01-strategy/` or `style-pack.md`, not the brief — TikTok rejects."
- **No embedded music / sound cues in scene descriptions.** Step 7 scene
  bullets describe **visual beats only**. If Zaid mentions a track,
  sound, or BGM in a scene, strip it and respond: "Music goes in the
  shot list (per `playbooks/tiktok-production.md`), not the brief. Stripped."
- **One persona, in singular voice.** Hard refusal in step 3 covers this.
- **Filename must end in `-tiktok-one.md`.** The `-one` suffix is the
  signal to `brief-validator` that this is a TikTok One brief, not a
  generic TikTok brief. Don't drop the suffix.
- **Format spec wins.** Hook in 2s, payoff before 6s, CTA before end card
  — these are per `playbooks/tiktok-production.md` and enforced here.
- **Honour the brain's zone rules.** Read from `brain/`, `prompts/`,
  `clients/<slug>/style-pack.md`. Write only to `clients/<slug>/00-brief/`.
