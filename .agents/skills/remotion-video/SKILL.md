---
name: remotion-video
description: 'Scaffold, preview, and render a branded video (explainer, ad, social/TikTok video, reel, promo, logo animation) in Toggle''s shared Remotion workspace (tools/remotion). Use when someone says "make a video", "make an ad", "render an explainer", "animate our logo", "make a 9:16 promo / reel", or types /remotion-video. Produces an actual rendered MP4 — for TikTok creator-brief COPY (not a video) use /tiktok-brief-writer instead. Drives the design-system canon, the version pinned in tools/remotion/package.json, and files deliverables in clients/<slug>/02-creative/.'
license: MIT
allowed-tools: Bash, Read, Write, Edit, Glob, Grep
---

# Remotion video — Toggle programmatic-video workspace

Drives `tools/remotion/`, Toggle's shared Remotion project, to produce a branded video: scaffold a composition as a React component, preview it in Remotion Studio, render to MP4, file the deliverable. **The workspace is the engine; this skill is the interface.**

## How to use this (read first if you're not a developer)

- **You brief; Claude builds.** You don't write code or type terminal commands — describe the video you want, and Claude writes the composition, runs every command below, and hands you a preview. Your job is the brief and the feedback.
- **To start:** open Claude Code with this repo (the Toggle Brain folder) as the working directory, then say *"make me a video…"* or type `/remotion-video`. (Just `git pull`-ing the repo isn't enough — the skill only fires from inside a Claude Code session pointed at this repo.)
- **Mac only (macOS 15+).** Rendering won't work on Windows/Linux — if that's you, send your brief to whoever owns rendering (Zaid) instead of running it locally.

## READS (load first — cite, never re-inline)

- `tools/remotion/README.md` — house rules (CLI invocation, version pinning, env requirements, license)
- `clients/toggle/design-system/TOKENS.md` — colors, type scale, spacing (canon)
- `clients/toggle/design-system/MOTION.md` — motion language: wipes, bumpers, easing, durations
- `clients/toggle/design-system/BRAND-IDENTITY.md` — motion bans (no bounce / pop / sparkle — drawing-in only)
- `tools/remotion/src/explainer/` — the reference composition + `tokens.ts` (copy its patterns)
- `clients/<slug>/CLIENT.md` — who the video is for, when client-specific

## Preconditions (Claude handles these; first run per machine)

```bash
cd tools/remotion       # from the repo root
npm i                   # node_modules is ~650 MB and NOT committed — first run only (~3–5 min)
npx remotion versions   # expect: "All packages have the correct version."
```

- **No Node?** `npm: command not found` means Node isn't installed — get Node 18+ from nodejs.org (or `brew install node`) first.
- **`npm i` fails?** Check you're online and retry. Still failing → delete `node_modules` + `package-lock.json` and retry, or ping Zaid; don't hand-patch it.
- **License gate (Zaid's call — settle once):** Remotion is free only for very small teams; using it across Toggle needs a remotion.pro company license before client work ships. Confirm with Zaid it's in place. Rule: `tools/remotion/README.md` (License).
- Full env detail (Node/macOS floor, Chrome Headless Shell auto-download on first render, bundled FFmpeg): `tools/remotion/README.md`.

## Workflow

### 1. Scope the video
Capture: which client (slug), the message, aspect ratio(s) (16:9 master, 9:16 vertical, 1:1), duration, and whether it follows an existing format (e.g. the explainer). Read the relevant `clients/<slug>/CLIENT.md`.

### 2. Read the canon, don't reinvent
Load the READS above. Pull colors / type / motion from `clients/toggle/design-system/` and the existing `src/explainer/tokens.ts` — do **not** hardcode hexes or guess easing. The motion language is strict: drawing-in vocabulary only, the easing from `MOTION.md`, no bounce/pop/sparkle.

### 3. Scaffold the composition (Claude writes this — not you)
Claude creates `src/<name>/<Name>.tsx` as a React component, importing `src/explainer/tokens.ts` (`COLOR`, `TYPE`, `STROKE`, `EASE`, the `f(ms)` frame helper) rather than forking it. Any new tokens go in a shared tokens file sourced from the canon — never guessed. Durations are in **frames**, not seconds (fps is 30).

### 4. Register the composition in `src/Root.tsx`  ← the #1 forgotten step
A composition is invisible in Studio until it's registered. That's **two** edits to `Root.tsx` — import the component at the top, then add a `<Composition>`:

```tsx
// 1) with the other imports at the top of Root.tsx:
import { MyVideo } from "./myvideo/MyVideo";
import { f } from "./explainer/tokens";   // frame helper, if used for duration

// 2) inside the <> … </>, alongside the existing compositions:
<Composition
  id="MyVideo"
  component={MyVideo}
  durationInFrames={f(8000)}   // f() takes MILLISECONDS → 8000ms = 8s = 240 frames
  fps={30}                     // see FPS in src/explainer/tokens.ts (currently 30)
  width={1920}
  height={1080}
/>
```

For a vertical (9:16) crop, add a second `<Composition>` with the same `component` and swapped `width={1080} height={1920}`; the component reads orientation (the explainer does this via a `useLayout()` helper in `src/explainer/layout.ts`, which wraps `useVideoConfig()` — `portrait = height > width`).

⚠️ `f()` bakes in 30fps. If a composition ever uses a different `fps`, don't use `f()` — use `Math.round(ms/1000*fps)`.

Confirm it registered:
```bash
npx remotion compositions    # your id should appear in the list
```

### 5. Preview in Remotion Studio
```bash
npm run dev      # opens Remotion Studio in the browser — NOT `npm start` (no such script)
```
Claude starts it and gives you the link. In Studio: pick your composition in the left panel, press space to play, drag the playhead to scrub. **New here?** Ask Claude to preview `ToggleExplainer` first, so you see Toggle's house motion style before briefing your own.

### 6. Render
```bash
npx remotion render <COMP-ID> out/<name>.mp4    # MP4   (entry point auto-detected)
npx remotion still  <COMP-ID> out/<name>.png    # poster / still frame
```
`out/` is gitignored scratch — render there, watch it, then promote the final.

### 7. File the deliverable
The final MP4 belongs in `clients/<slug>/02-creative/`. Per the repo's binary policy, heavy renders go to **Drive, not git** — keep the composition **source** in git (it's reproducible) and link the rendered file from Drive in the client folder. To watch a render, double-click the file in `tools/remotion/out/` (or ask Claude to open it). Don't let finished renders pile up in `out/`.

### 8. Commit the source
Commit the composition source (`src/<name>/`, the `Root.tsx` edits, any new tokens) with the `git-contribute` skill — never push to `main` directly, and never commit `node_modules/`, `out/`, or a heavy MP4.

## House rules & version discipline → `tools/remotion/README.md`
The binding workspace rules — always invoke as `npx remotion …` from inside `tools/remotion/`, keep every `@remotion/*` on the one pinned version (`npx remotion add <pkg>` / `npm run upgrade` only; check with `npx remotion versions`), and the env floor — live in `tools/remotion/README.md`. Read it; don't restate it here.

## Distribution (maintainers)
Committed to `.claude/skills/remotion-video/` **and** `.agents/skills/remotion-video/` so teammates get it by cloning / `git pull`. It then triggers inside any Claude Code session rooted in this repo (git pull alone doesn't make it run — see "How to use"). **Keep both copies byte-identical** when editing. Registered in `MAP.md` and the root `CLAUDE.md` routing table.

## Never
- **Never** say `npm start` — the only preview script is `npm run dev`.
- **Never** hardcode brand colors, type sizes, or easing — source them from `clients/toggle/design-system/` + `src/explainer/tokens.ts`.
- **Never** commit `node_modules/`, `out/`, or a heavy rendered MP4 to git.
- **Never** mix `@remotion/*` versions, or ship client work without confirming the license gate (above).
