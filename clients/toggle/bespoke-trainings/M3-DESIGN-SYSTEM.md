# Material 3, seeded on Toggle blue

The design system for the Toggle Bespoke AI-literacy trainings. It is Google's Material 3, with the **primary color set to Toggle blue** instead of the M3 baseline purple. Tokens and the core components live in `m3-toggle.css` (this folder).

## The idea in one line
Material 3 structure (tonal surfaces, elevation, shape scale, light heading weights) carrying Toggle's blue, so the trainings look like Toggle and behave like M3.

## Color mapping
Three M3 key colors map to the three curriculum tracks:

| M3 role | Hue | Track |
|---|---|---|
| primary | blue | AI track (AI-1 to AI-8) |
| tertiary | green | Marketing track (MK-1 to MK-4) |
| secondary | amber | AI in Marketing, applied (AX-1 to AX-9) |

Filled "container" tones are the block backgrounds; the matching "on-container" tone is the text on them.

## How to use it
Artifacts block external stylesheets (CSP), so `m3-toggle.css` is the **source you copy from**, not a runtime `@import`. When building a lesson HTML:
1. Paste the token blocks (`:root`, the dark `@media`, and both `:root[data-theme=...]` overrides) into the page `<style>`.
2. Style through the tokens only, never hard-coded hex.
3. Use the app aliases for readability: `--brand`, `--card`, `--card-2`, `--callout`, `--teach`, `--do`, `--ai-bg` / `--ai`, `--mk-bg` / `--mk`, `--ax-bg` / `--ax`, `--shadow`. Each is wired to an underlying `--md-*` role.

## Rules baked in
- **Themes:** light is the `:root` default; dark comes from `prefers-color-scheme` and from a `data-theme` attribute (viewer toggle) that must win in both directions. All four scopes are defined.
- **Type:** Roboto stack; large text stays light weight (headings 400, titles 500). Roboto is not installed on macOS or Windows and the CSP blocks font CDNs, so it falls back to the system UI font. Embed Roboto as a data URI only if pixel-true M3 type is needed.
- **Shape:** cards 16px (`--md-radius-lg`), chips 8px, pills 999px.
- **Elevation:** tonal surface tiers plus `--md-elev-1`, not hard borders.
- **No em dashes** in any built copy, per `brain/voice/writing-standards.md`.

## Relationship to the main Toggle design system
This is separate from the canonical Toggle brand system in `clients/toggle/design-system/` (`tokens.json`, `BRAND-IDENTITY.md`, and so on), which is not Material 3. This M3 variant is scoped to the Bespoke trainings. It reuses Toggle's blue as the seed so the two stay visually related.
