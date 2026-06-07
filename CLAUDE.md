# Agency Hub — Build Plan

This is the master build plan for the digital marketing agency's internal hub, hosted on GitHub Pages. The hub combines an org knowledge base, a live ads performance dashboard (Meta, Google, TikTok, LinkedIn, X), and Google Workspace integration (Gmail, Calendar, Drive).

---

## What we're building

A single-page internal hub (`index.html`) that serves as the agency's central command centre. It includes:

- **Org hub** — business info, team directory, services, clients, and case studies
- **Ads hub** — live performance dashboard across 5 ad platforms with spend, ROAS, CTR, conversions, and campaign-level breakdowns
- **Google Workspace** — live Gmail threads, Calendar events, and Drive files via OAuth
- **Ask AI** — an internal AI assistant pre-loaded with agency context

Hosted statically on GitHub Pages. No backend required — all API calls happen client-side via OAuth tokens.

---

## Phase 1 — Build & export the hub file

**Estimated time: ~30 minutes**

- [ ] Generate the combined `index.html` (org hub + ads hub + Google Workspace panels)
- [ ] Add real agency name, team members, services, and clients
- [ ] Customise brand colours and logo in the CSS variables
- [ ] Test the file locally by opening it in a browser

### Notes

The entire app lives in a single `index.html` file. CSS variables at the top of the file control all colours and branding — update `--brand` and `--accent` to match the agency's palette. All ad platform data and workspace data starts as sample/placeholder and goes live once OAuth tokens are connected in later phases.

---

## Phase 2 — Create & configure GitHub repo

**Estimated time: ~15 minutes**

- [ ] Create a new GitHub repository (can be public or private)
- [ ] Push `index.html` to the `main` branch
- [ ] Enable GitHub Pages under **Settings → Pages → Source: main branch / root**
- [ ] Confirm the hub is live at `https://yourusername.github.io/repo-name`

### Notes

GitHub Pages serves static files for free with no configuration needed beyond the settings toggle. For a custom domain (e.g. `hub.youragency.com`), add a `CNAME` file to the repo root containing your domain, then point your DNS to GitHub's servers. If the repo is private, GitHub Pages requires a paid plan.

---

## Phase 3 — Connect Google Workspace

**Estimated time: ~45 minutes**

- [ ] Create a Google Cloud project at [console.cloud.google.com](https://console.cloud.google.com)
- [ ] Enable the Gmail API, Google Calendar API, and Google Drive API
- [ ] Configure the OAuth 2.0 consent screen (External, set scopes: `gmail.readonly`, `calendar.readonly`, `drive.readonly`)
- [ ] Create OAuth 2.0 credentials (Web application type)
- [ ] Add the GitHub Pages URL as an authorised JavaScript origin and redirect URI
- [ ] Paste the Client ID into the hub's config and test the sign-in flow

### API scopes needed

| Service  | Scope                                               |
| -------- | --------------------------------------------------- |
| Gmail    | `https://www.googleapis.com/auth/gmail.readonly`    |
| Calendar | `https://www.googleapis.com/auth/calendar.readonly` |
| Drive    | `https://www.googleapis.com/auth/drive.readonly`    |

### Notes

All three APIs use the same OAuth client and consent screen — no need to create separate credentials per service. The hub uses the Google Identity Services (GIS) library for the sign-in flow. Tokens are stored in memory only (not localStorage) for security. Team members will each sign in with their own Google account when they open the hub.

---

## Phase 4 — Connect ad platforms

**Estimated time: ~2–3 hours** (plus potential waiting time for TikTok API approval)

### Meta (Facebook & Instagram)

- [ ] Create a Meta App at [developers.facebook.com](https://developers.facebook.com)
- [ ] Add the Marketing API product to the app
- [ ] Generate a System User access token in Meta Business Manager
- [ ] Add the token to the hub and verify campaign data loads

Endpoint used: `GET /act_{ad_account_id}/insights`

### Google Ads

- [ ] Apply for a Google Ads API developer token in the [API Center](https://ads.google.com/aw/apicenter)
- [ ] Create OAuth 2.0 credentials in Google Cloud (same project as Workspace, or separate)
- [ ] Link the Google Ads account and verify data loads

Endpoint used: `GoogleAdsService.SearchStream` via the REST API

### TikTok Ads

- [ ] Apply for TikTok Marketing API access at [ads.tiktok.com/marketing_api](https://ads.tiktok.com/marketing_api)
- [ ] Create a TikTok for Business developer app
- [ ] Generate an access token and add it to the hub

**Note:** TikTok API access can take 1–3 business days to be approved.

Endpoint used: `POST /open_api/v1.3/report/integrated/get/`

### LinkedIn Ads

- [ ] Create a LinkedIn App at [developer.linkedin.com](https://developer.linkedin.com)
- [ ] Request access to the Marketing Developer Platform
- [ ] Generate OAuth credentials with `r_ads_reporting` scope
- [ ] Add the access token to the hub

Endpoint used: `GET /adAnalyticsV2`

### X (Twitter) Ads

- [ ] Create an X Developer App at [developer.twitter.com](https://developer.twitter.com)
- [ ] Apply for Ads API access (requires an active ad account)
- [ ] Generate Bearer token and OAuth 1.0a credentials
- [ ] Add credentials to the hub and verify data loads

Endpoint used: `GET /stats/accounts/{account_id}`

---

## File structure

```
/
├── index.html          # The entire hub — all HTML, CSS, JS in one file
└── CNAME               # Optional: custom domain (e.g. hub.youragency.com)
```

---

## Security considerations

- OAuth tokens are held in memory and never written to `localStorage` or `sessionStorage`
- The hub is internal — share the URL only with team members
- For stronger access control, add a simple password gate or restrict by GitHub org membership
- Ad platform tokens should be read-only scopes wherever possible
- Rotate tokens regularly and revoke access for team members who leave

---

## Quick reference — buttons to kick off each step

| Step              | Action                                                                             |
| ----------------- | ---------------------------------------------------------------------------------- |
| Generate the code | Ask Claude: _"Generate the complete index.html for the agency hub"_                |
| GitHub setup      | Ask Claude: _"Step-by-step guide to create a GitHub repo and enable Pages"_        |
| Google OAuth      | Ask Claude: _"Walk me through Google OAuth setup for Gmail, Calendar, and Drive"_  |
| Meta API          | Ask Claude: _"How do I connect Meta Marketing API to a static GitHub Pages site?"_ |
| Google Ads API    | Ask Claude: _"How do I connect Google Ads API with OAuth to a static site?"_       |
| TikTok API        | Ask Claude: _"How do I integrate TikTok Marketing API into a client-side app?"_    |
| LinkedIn API      | Ask Claude: _"How do I connect LinkedIn Ads API to a GitHub Pages hub?"_           |
| X Ads API         | Ask Claude: _"How do I connect the X Ads API to a static web app?"_                |
