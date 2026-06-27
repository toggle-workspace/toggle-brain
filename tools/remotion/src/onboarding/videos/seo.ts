import { OnboardingVideo } from "../kit/types";

// VIDEO 5 — SEO access: Search Console (Full), GA4 (Viewer), CMS (Administrator —
// technical SEO needs admin), hosting/CDN. Then what we audit first.
export const seo: OnboardingVideo = {
  id: "OnboardingSEO",
  slug: "05-seo",
  label: "Grant SEO access",
  scenes: [
    {
      ms: 3800,
      scene: {
        kind: "title",
        overline: "Setup · SEO",
        title: "Set up access for SEO",
        hook: "Search Console, Analytics and your site — so we can audit what’s really happening.",
      },
    },
    {
      ms: 10500,
      scene: {
        kind: "steps",
        overline: "Grant access",
        heading: "Three logins, one site",
        rows: [
          {
            lead: "Search Console — add us as Full",
            path: ["Settings", "Users and permissions", "Add user", "{{TOGGLE_GOOGLE_ACCESS_EMAIL}}", "Full"],
          },
          {
            lead: "GA4 — add us as Viewer",
            path: ["Admin", "Property access management", "+", "Add users", "{{TOGGLE_GOOGLE_ACCESS_EMAIL}}", "Viewer"],
            note: "Read-only is enough for SEO reporting.",
          },
          {
            lead: "Your CMS — Administrator",
            path: ["WordPress", "Users", "Add new", "{{TOGGLE_GOOGLE_ACCESS_EMAIL}}", "Administrator"],
            note: "Technical SEO needs admin — plugins, redirects, schema. Other CMS: the equivalent admin role.",
          },
          {
            lead: "Hosting / CDN — if applicable",
            note: "Add us to your host or Cloudflare so we can check speed, caching and Core Web Vitals.",
          },
        ],
      },
    },
    {
      ms: 6800,
      scene: {
        kind: "steps",
        overline: "Diagnosis first",
        heading: "What we audit first",
        numbered: false,
        rows: [
          { lead: "Crawlability & indexing" },
          { lead: "Site speed & Core Web Vitals" },
          { lead: "Your highest-traffic landing pages" },
          { lead: "Bounce on your lead-form pages" },
        ],
        footnote: "Most “our ads aren’t working” problems are really landing-page problems.",
      },
    },
    {
      ms: 4200,
      scene: {
        kind: "outro",
        cta: "That’s SEO access done. We’ll send the first audit — the honest version, not the flattering one.",
        support: "hello@toggle.solutions",
      },
    },
  ],
};
