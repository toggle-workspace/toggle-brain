# Toggle Remotion workspace

Shared Remotion project for programmatic video at Toggle. Write compositions as React components under `src/`, preview in the Studio, render to MP4/stills.

## Team quickstart

```console
cd tools/remotion
npm i
npm run dev        # opens Remotion Studio in the browser
```

Render: `npx remotion render MyComp out/video.mp4` · Still: `npx remotion still MyComp out/frame.png`

## House rules

- **Always run the CLI as `npx remotion ...` from inside this folder** — never a globally installed `remotion`. All `@remotion/*` packages must stay on the exact same version (currently pinned `4.0.475`); upgrade only via `npm run upgrade`, add packages only via `npx remotion add <pkg>`, and check health with `npx remotion versions`.
- **License:** Remotion is free only for teams of ≤3 people. If Toggle is at 4+, a company license from [remotion.pro](https://www.remotion.pro) is required before client work ships from here.
- Client-facing outputs rendered here belong in `clients/<slug>/02-creative/` — don't accumulate finished deliverables in this folder.
- Requirements: Node ≥16 (repo machines run 26), macOS 15+. Chrome Headless Shell auto-downloads into `node_modules` on first render; FFmpeg is bundled.

---

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
