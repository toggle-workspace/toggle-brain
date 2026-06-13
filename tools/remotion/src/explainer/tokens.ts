import { Easing } from "remotion";

// Source of truth: clients/toggle/design-system/ TOKENS.md + MOTION.md + BRAND-IDENTITY.md
// (branch migrate/initial-import). Values are the dark-canvas set — the explainer ships dark.
export const COLOR = {
  canvas: "#0A1224", // surface.canvas.dark
  blue: "#4A7BF7", // brand.primary — strokes, focal stat, display only
  blueText: "#6E95F9", // brand.primary-deep.dark — the text-safe blue for small type
  white: "#FFFFFF", // text.primary.dark
  body: "#B0B8C9", // text.body.dark
  secondary: "#9CA3B5", // text.secondary.dark — struck-line color (SIGNATURE-DEVICES B1)
  borderStrong: "#44537A", // border.strong.dark — stat underlines
} as const;

export const FONT_FALLBACK = `"Inter Tight", Inter, -apple-system, "Segoe UI", sans-serif`;

// TOKENS.md type scale is at a 1280 reference; canvas is 1920 → ×1.5.
export const TYPE = {
  display: 96,
  h1: 57,
  h2: 42,
  h3: 33,
  bodyLg: 23,
  body: 21,
  overline: 20,
  caption: 20,
  numericHero: 84,
} as const;

export const STROKE = 2; // canvas short edge ÷ 540 → 2px @1080 (SIGNATURE-DEVICES A1)

export const FPS = 30;
export const f = (ms: number): number => Math.round((ms / 1000) * FPS);

// MOTION.md §3: all video curves = the toggle-flip curve unless noted; traces are linear.
export const EASE = Easing.bezier(0.45, 0, 0.25, 1);

export const OVERLINE_STYLE = {
  fontSize: TYPE.overline,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: COLOR.blueText,
};
