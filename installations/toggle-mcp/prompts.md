---
sidebar_position: 4
---

# Prompts

Prompts are executable recipes loaded from `generators/` and `playbooks/`. Invoke them in any connected MCP client to run a structured workflow against the Toggle knowledge base.

Prompt names follow the pattern `<zone>--<filename>` (e.g. `generators--quote`, `playbooks--onboard-new-client`).

---

## Variable interpolation

Generator files use `{{variable}}` placeholders. When you invoke a prompt, pass values for each placeholder and the server substitutes them before running. Unset placeholders are left blank.

---

## Generators

Generators are output-producing recipes — they pull from `brain/` and produce a deliverable (quote, proposal, copy, etc.).

| Prompt name | What it produces | Key placeholders |
|---|---|---|
| `generators--quote` | Client quotation | `client`, `scope`, `geo` |
| `generators--proposal` | Full proposal document | `client`, `vertical` |
| `generators--tiktok-hooks` | TikTok hook copy variants | `client`, `product`, `angle` |
| `generators--caption` | Social media captions | `platform`, `client`, `brief` |
| `generators--email` | Email copy | `type`, `client`, `cta` |
| `generators--image-prompt` | Image generation prompt (Midjourney / Flux) | `style`, `subject`, `mood` |
| `generators--video-prompt` | Video generation prompt (Sora / Kling) | `style`, `scene`, `duration` |
| `generators--landing-page` | Landing page copy | `client`, `offer`, `audience` |
| `generators--meta-ad-copy` | Meta ad copy (primary + headline + description) | `client`, `product`, `audience` |
| `generators--monthly-report` | Monthly performance report | `client`, `month`, `platform` |

---

## Playbooks

Playbooks are step-by-step runbooks. They guide you (or Claude) through a process rather than producing a single output.

| Prompt name | What it covers |
|---|---|
| `playbooks--onboard-new-client` | Full new-client onboarding checklist — intake, folder setup, brief, kick-off |
| `playbooks--launch-paid-campaign` | Paid campaign launch — account setup, creative trafficking, QA, go-live |
| `playbooks--tiktok-production` | TikTok content production pipeline — brief → shoot → edit → publish |
| `playbooks--monthly-reporting` | Monthly reporting routine — data pull, analysis, deck, client send |
| `playbooks--creative-review` | Creative review process — brief check, rounds, approval, archive |

---

## Adding a new prompt

1. Create a `.md` file in `generators/` or `playbooks/` in toggle-brain.
2. Use `{{variable_name}}` syntax for any inputs the prompt needs.
3. Push to `main` — the MCP server picks it up on next restart.

The file's first non-empty line (after frontmatter) becomes the prompt description shown in the MCP client.
