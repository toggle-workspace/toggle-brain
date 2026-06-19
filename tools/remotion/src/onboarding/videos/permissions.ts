import { OnboardingVideo } from "../kit/types";

// VIDEO 6 — the consolidated access checklist + the reassurance quartet. Access
// list pulled from clients/_TEMPLATE/CLIENT.md > Access. The reassurance panel is
// the spine of the whole series: least-privilege, 1Password, you own it, revoke.
export const permissions: OnboardingVideo = {
  id: "OnboardingPermissions",
  slug: "06-permissions",
  label: "Access checklist & control",
  scenes: [
    {
      ms: 3800,
      scene: {
        kind: "title",
        overline: "Onboarding · Access",
        title: "Your access checklist — and why",
        hook: "Everything we ask for, why we need it, and how you stay in control.",
      },
    },
    {
      ms: 12000,
      scene: {
        kind: "steps",
        overline: "What we’ll request",
        heading: "Six grants, each with a reason",
        rows: [
          {
            lead: "Meta Business Manager",
            note: "Partner access to your ad account, Page and dataset — to run and measure paid social.",
          },
          {
            lead: "Google Ads",
            note: "Accept our manager link — we manage campaigns without ever holding your login.",
          },
          {
            lead: "Google Analytics 4",
            note: "Editor for ads work, Viewer for reporting — import conversions and build audiences.",
          },
          {
            lead: "Search Console",
            note: "Full access — see and fix how Google crawls and ranks you.",
          },
          {
            lead: "Shopify — if e-commerce",
            note: "A staff invite — tie ad spend to real orders and revenue.",
          },
          {
            lead: "CRM — if applicable",
            note: "A seat — connect enrolments back to the ad platforms, so we optimise to revenue.",
          },
        ],
      },
    },
    {
      ms: 7200,
      scene: {
        kind: "reassure",
        overline: "Your guardrails",
        heading: "How you stay in control",
        points: [
          {
            label: "Least privilege",
            detail: "We ask for the minimum each job needs. Nothing more.",
          },
          {
            label: "Logged in 1Password",
            detail: "Every credential lives in our vault — never in a doc, never in a chat.",
          },
          {
            label: "You stay the owner",
            detail: "Partner and link access means you own every account. We’re a guest, never the landlord.",
          },
          {
            label: "Revoke anytime",
            detail: "One click, the same screens you used to grant it. No call, no notice.",
          },
        ],
      },
    },
    {
      ms: 4600,
      scene: {
        kind: "outro",
        cta: "Questions on any of this? Message {{ACCOUNT_LEAD_NAME}}, your senior operator. Welcome to Toggle.",
        support: "hello@toggle.solutions",
      },
    },
  ],
};
