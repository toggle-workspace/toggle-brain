// Data-driven onboarding video series. One engine (OnboardingVideo.tsx) renders
// any of these configs; each video is a list of timed scenes. Durations are in
// MILLISECONDS — the f() helper in explainer/tokens.ts converts to frames @30fps.
//
// Copy convention: any `{{TOKEN}}` in a string is an unresolved identifier that
// must be filled per-client/per-account before a render is sent to a real client
// (Toggle's Meta Business ID, Google Ads MCC, TikTok BC ID, the account lead's
// name, etc.). TokenText renders them with a dashed underline so they are
// impossible to miss. NEVER hardcode a real credential here — leave the token.

export type MenuPath = readonly string[]; // segments, joined with › on screen

export type StepRow = {
  lead: string; // the imperative instruction
  path?: MenuPath; // exact platform menu path
  note?: string; // small caveat / sub-line
};

export type TitleScene = {
  kind: "title";
  overline: string; // kicker, e.g. "Setup · Meta Ads"
  title: string;
  hook: string;
};

export type StepsScene = {
  kind: "steps";
  overline?: string;
  heading: string;
  numbered?: boolean; // default true; false → blueprint-tick bullets (statements)
  rows: readonly StepRow[];
  footnote?: string;
};

export type ReassureScene = {
  kind: "reassure";
  overline?: string;
  heading: string;
  points: readonly { label: string; detail: string }[];
};

export type OutroScene = {
  kind: "outro";
  cta: string;
  support?: string; // e.g. hello@toggle.solutions
};

export type Scene = TitleScene | StepsScene | ReassureScene | OutroScene;

export type Timed = { scene: Scene; ms: number };

export type OnboardingVideo = {
  id: string; // Remotion composition id, e.g. "OnboardingMeta"
  slug: string; // deliverable slug, e.g. "02-meta-ads"
  label: string; // human label
  scenes: readonly Timed[];
};
