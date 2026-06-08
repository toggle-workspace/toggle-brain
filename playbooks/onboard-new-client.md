---
playbook: Onboard new client
owner: Account lead
last_reviewed: 2026-06-08
---

# Onboard new client

## Purpose
Move a signed engagement from quote to first deliverable without dropping anything between sales and delivery.

## When to use it
Quote has been countersigned, deposit invoiced (or terms agreed), and we're ready to set up the client in the system. Run within 48 hours of signature.

## Preconditions
- Signed quote on file in `archive/quotes/YYYY-MM-DD-<client>-<scope>.md`.
- Account lead assigned.
- Engagement model from `brain/process.md` confirmed (audit, partnership, intensive, expansion, lab).
- Slug chosen — lowercase-kebab, geo prefix only if geo is confirmed (see `clients/CLAUDE.md`).

## Steps
1. **Create the client folder.** `cp -r clients/_TEMPLATE clients/<slug>`. Do not pre-create empty subfolders.
2. **Fill `clients/<slug>/CLIENT.md`.** Frontmatter (`client`, `slug`, `geo`, `status: active`, `practice`, `account_lead`, `last_reviewed`), contacts, scope, billing, access. Link services to `brain/services/<service>.md` rather than describing them inline.
3. **Fill `clients/<slug>/style-pack.md`.** Only the overrides vs `prompts/style-packs/toggle-default.md`. If nothing differs yet, mark each section "inherits default" — do not invent voice rules.
4. **Schedule kickoff meeting.** Use `templates/meeting-notes.md` and save the filled note to `clients/<slug>/05-meetings/YYYY-MM-DD-kickoff.md`. Agenda: scope confirmation, success metrics, decision-maker map, comms cadence.
5. **Set up access.** Request the access listed under `CLIENT.md > Access`: Meta Business Manager, Google Ads MCC link, GA4 viewer/editor, Shopify staff invite, any CRM. Log credentials in 1Password; reference the vault name in `CLIENT.md`, never paste creds.
6. **Confirm style-pack with client.** Share the filled `style-pack.md` overrides for written sign-off before any creative goes into production.
7. **Schedule first 30 / 60 / 90 review.** Block calendar invites now. Put dates in `CLIENT.md > Scope > Renewal / review date`.
8. **Open onboarding branch and commit.** `git checkout -b client/<slug>/onboarding`, commit, request lead review, merge.

## Common pitfalls
- Inventing contact details or geo before they are confirmed. Leave as `TBD`.
- Pasting credentials into `CLIENT.md`. Always 1Password reference only.
- Skipping the kickoff meeting note because "we already discussed it." The note is what survives team handoff.
- Pre-creating empty `00-brief/`, `01-strategy/`, etc. Folders get created when work starts.

## Owner
Account lead executes. Practice lead reviews the CLIENT.md before merge.
