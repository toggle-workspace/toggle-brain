import { OnboardingVideo } from "../kit/types";

// VIDEO 3 — Google Ads manager (MCC) link + GA4 Editor for conversion import.
// GA4 needs Editor (not Marketer) to import conversions and link Ads.
export const googleAds: OnboardingVideo = {
  id: "OnboardingGoogle",
  slug: "03-google-ads",
  label: "Grant Google Ads + GA4 access",
  scenes: [
    {
      ms: 3800,
      scene: {
        kind: "title",
        overline: "Setup · Google",
        title: "Connect Google Ads & Analytics",
        hook: "Accept one link, add one viewer. About two minutes.",
      },
    },
    {
      ms: 8200,
      scene: {
        kind: "steps",
        overline: "Google Ads",
        heading: "Accept our manager link",
        rows: [
          {
            lead: "Watch for our manager link request",
            note: "From manager account {{TOGGLE_GOOGLE_ADS_MCC_ID}} — it arrives in-account and by email.",
          },
          {
            lead: "Open account access",
            path: ["Admin", "Access and security", "Managers"],
          },
          {
            lead: "Accept the pending request from {{TOGGLE_GOOGLE_ADS_MCC_ID}}",
          },
        ],
      },
    },
    {
      ms: 8200,
      scene: {
        kind: "steps",
        overline: "Google Analytics 4",
        heading: "Add us so we can import conversions",
        rows: [
          {
            lead: "Open property access",
            path: ["Admin", "Property access management"],
          },
          {
            lead: "Add us as Editor",
            path: ["+", "Add users", "{{TOGGLE_GOOGLE_ACCESS_EMAIL}}", "Editor"],
            note: "Editor is required for conversion import — “Marketer” isn’t enough.",
          },
        ],
        footnote: "We import your conversions so the platform optimises to real revenue, not just form-fills.",
      },
    },
    {
      ms: 4200,
      scene: {
        kind: "outro",
        cta: "Google’s connected. You stay the account owner — revoke anytime, same menus.",
        support: "hello@toggle.solutions",
      },
    },
  ],
};
