import { OnboardingVideo } from "../kit/types";

// VIDEO 2 — Meta Ads partner access. Flow (share assets to a partner Business
// ID, per-asset permissions) is stable; literal labels are the most-churned part
// of Meta's UI — screen-verify against the live account before sending.
export const metaAds: OnboardingVideo = {
  id: "OnboardingMeta",
  slug: "02-meta-ads",
  label: "Grant Meta Ads access",
  scenes: [
    {
      ms: 3800,
      scene: {
        kind: "title",
        overline: "Setup · Meta Ads",
        title: "Give Toggle access to Meta Ads",
        hook: "Partner access, not a password. You stay the owner — and can revoke anytime.",
      },
    },
    {
      ms: 11000,
      scene: {
        kind: "steps",
        overline: "In Meta Business Settings",
        heading: "Grant partner access",
        rows: [
          {
            lead: "Open Business Settings",
            path: ["business.facebook.com/settings"],
            note: "It’s Business Settings — not Business Suite.",
          },
          {
            lead: "Add Toggle as a partner",
            path: ["Users", "Partners", "Add", "Give a partner access to your assets"],
            note: "Enter our Business ID: {{TOGGLE_META_BUSINESS_ID}}",
          },
          {
            lead: "Share your ad account",
            path: ["Accounts", "Ad accounts", "Your account", "Assign partner"],
            note: "Grant full “Manage campaigns.”",
          },
          {
            lead: "Share your Page",
            path: ["Accounts", "Pages", "Your Page", "Assign partner"],
          },
          {
            lead: "Share your dataset (pixel)",
            path: ["Data sources", "Datasets", "Your dataset", "Assign partner"],
            note: "Events Manager may label this “Pixel” or “Dataset.”",
          },
        ],
        footnote: "Done — confirm all three assets show Toggle under Partners.",
      },
    },
    {
      ms: 4200,
      scene: {
        kind: "outro",
        cta: "That’s Meta sorted. You can revoke our access anytime from the same screen.",
        support: "hello@toggle.solutions",
      },
    },
  ],
};
