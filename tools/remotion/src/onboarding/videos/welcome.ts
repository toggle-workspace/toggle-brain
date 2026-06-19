import { OnboardingVideo } from "../kit/types";

// VIDEO 1 — the warm intro. No platform steps; sets up why we're about to ask
// for access. Lock-in copy uses the ONLY safe phrasing (SIGNATURE-DEVICES warns
// the bare "no lock-ins" detonates at contract review — a 3-month minimum exists).
export const welcome: OnboardingVideo = {
  id: "OnboardingWelcome",
  slug: "01-welcome",
  label: "Welcome to Toggle",
  scenes: [
    {
      ms: 3800,
      scene: {
        kind: "title",
        overline: "Client onboarding · Welcome",
        title: "Welcome to Toggle, {{CLIENT_NAME}}.",
        hook: "You signed a growth partner, not an agency. Here’s how we run — and what we’ll need from you.",
      },
    },
    {
      ms: 8800,
      scene: {
        kind: "steps",
        overline: "How we’ll work",
        heading: "Senior operators, working with you directly.",
        numbered: false,
        rows: [
          {
            lead: "Your senior operator is {{ACCOUNT_LEAD_NAME}}",
            note: "A senior operator — the person who builds your strategy is the one who runs it.",
          },
          {
            lead: "Diagnosis before prescription",
            note: "Before we touch a single account, we benchmark what’s actually limiting growth.",
          },
          {
            lead: "A clear cadence",
            note: "{{COMMS_CADENCE}} check-ins, one shared thread, async updates in between.",
          },
          {
            lead: "The rhythm: 30 / 60 / 90",
            note: "Day 30 — tracking & early signal. Day 60 — creative winners & spend shape. Day 90 — the scale decision.",
          },
        ],
      },
    },
    {
      ms: 6500,
      scene: {
        kind: "steps",
        overline: "The terms, plainly",
        heading: "Earned every month, not locked in.",
        numbered: false,
        rows: [
          {
            lead: "No long-term lock-ins",
            note: "We earn the next month with results — there’s a 3-month minimum on retainers.",
          },
          {
            lead: "You own everything",
            note: "Your accounts. Your data. Your strategy. Always yours.",
          },
        ],
      },
    },
    {
      ms: 4200,
      scene: {
        kind: "outro",
        cta: "Next: five short setup videos — each takes about two minutes. Let’s get you live.",
        support: "hello@toggle.solutions",
      },
    },
  ],
};
