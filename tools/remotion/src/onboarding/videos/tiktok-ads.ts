import { OnboardingVideo } from "../kit/types";

// VIDEO 4 — TikTok Business Center. Roles are Admin / Standard / Analyst; events
// live under Assets → Events. Verify the live BC nav (APAC rollouts differ).
export const tiktokAds: OnboardingVideo = {
  id: "OnboardingTikTok",
  slug: "04-tiktok-ads",
  label: "Grant TikTok Ads access",
  scenes: [
    {
      ms: 3800,
      scene: {
        kind: "title",
        overline: "Setup · TikTok",
        title: "Give Toggle access to TikTok Ads",
        hook: "Two ways in — partner your account, or add us by email.",
      },
    },
    {
      ms: 10000,
      scene: {
        kind: "steps",
        overline: "In TikTok Business Center",
        heading: "Share your advertiser account",
        rows: [
          {
            lead: "Open Business Center",
            path: ["business.tiktok.com"],
          },
          {
            lead: "Option A — partner your ad account (recommended)",
            path: ["Advertiser accounts", "Your account", "Share", "With a partner Business Center"],
            note: "Enter our ID: {{TOGGLE_TIKTOK_BC_ID}}",
          },
          {
            lead: "Option B — add us by email",
            path: ["Members", "Invite", "{{TOGGLE_TIKTOK_ACCESS_EMAIL}}", "Role: Standard"],
            note: "Choose Admin if you’d like us to manage members too.",
          },
          {
            lead: "Share your events",
            path: ["Assets", "Events", "Your pixel", "Share"],
          },
        ],
        footnote: "Confirm Toggle appears under your advertiser account’s partners or members.",
      },
    },
    {
      ms: 4200,
      scene: {
        kind: "outro",
        cta: "TikTok’s ready. Your account, your control — revoke anytime.",
        support: "hello@toggle.solutions",
      },
    },
  ],
};
