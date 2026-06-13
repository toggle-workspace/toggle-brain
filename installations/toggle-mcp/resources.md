---
sidebar_position: 3
---

# Resources

Resources are read-only knowledge base articles exposed via `kb://` URIs. They cover everything in Toggle Brain — services, pricing, clients, templates, and more.

---

## URI format

```
kb://<zone>--<path>
```

Path segments are separated by `--` (double dash). Examples:

```
kb://brain--services--performance-marketing
kb://brain--pricing--rate-card-my
kb://clients--audaura-unitar--CLIENT
kb://templates--quotations--quotation
```

---

## Zones

| Zone | What it contains | Example URI |
|---|---|---|
| `brain` | Services, pricing, voice, positioning, case studies, team, verticals, geos, process, glossary, partners | `kb://brain--services--seo` |
| `cockpit` | Daily focus, todos, journal, decisions | `kb://cockpit--current` |
| `clients` | All client folders — briefs, strategy, creative, media, reports, quotes | `kb://clients--audaura-unitar--CLIENT` |
| `templates` | Empty shells — briefs, proposals, quotations, reports, decks | `kb://templates--quotations--quotation` |
| `archive` | Closed clients, past quote ledger | `kb://archive--quotes--README` |

---

## brain/ breakdown

The `brain` zone is the most referenced. It maps directly to the `brain/` directory structure:

| Sub-zone | Path | Contents |
|---|---|---|
| Services | `brain--services--*` | One file per service (performance marketing, SEO, web dev, creative, etc.) |
| Pricing | `brain--pricing--*` | Rate cards (MY, SG), bundles, line items, discount rules, changelog |
| Voice | `brain--voice--*` | House voice, tone by channel, do-say, never-say |
| Positioning | `brain--positioning--*` | Elevator pitches, differentiators, competitors, agency profile |
| Case Studies | `brain--case-studies--*` | One file per client case, tagged index |
| Verticals | `brain--verticals--*` | Higher-ed, healthcare, F&B, B2B SaaS, insurance, banking, e-commerce, real estate |
| Geos | `brain--geos--*` | Malaysia and Singapore (regulatory, channel mix, currency notes) |
| Team | `brain--team--*` | Roster, individual bios |
| Process | `brain--process` | Engagement models (audit, partnership, intensive, expansion, lab) |
| Glossary | `brain--glossary` | Acronyms and terminology |
| Partners | `brain--partners-stack` | Tools, vendors, freelancers |
| TikTok One Rules | `brain--tiktok-one-rules` | Binding creator-brief rules for TikTok One |

---

## How to use in Claude Code

Resources load automatically when the server starts. In Claude Code, you can reference them by URI or let Claude search them:

```
@kb://brain--pricing--rate-card-my
```

Or simply ask — Claude will resolve the right resource from context.
