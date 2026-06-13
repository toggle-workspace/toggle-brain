---
sidebar_position: 1
---

# toggle-mcp — Overview

**toggle-mcp** is the MCP (Model Context Protocol) server for Toggle Brain. It reads this repository as its content source and exposes everything inside as three types of MCP capabilities: **resources**, **prompts**, and **tools**.

Any MCP-compatible AI (Claude Code, Cursor, Windsurf) connected to toggle-mcp gets direct, structured access to the full Toggle knowledge base — no copy-pasting, no file hunting.

---

## How it works

```
toggle-brain (this repo)
    └── content/  ← git submodule synced on every push to main
            ├── brain/
            ├── generators/
            ├── playbooks/
            ├── clients/
            └── ...

toggle-mcp server
    ├── loader/content.ts     ← scans content/ on startup
    ├── resources/            ← brain, cockpit, clients, templates, archive → kb:// URIs
    ├── prompts/              ← generators/, playbooks/ → callable prompts
    └── tools/                ← any .ts or .py scripts in content/ → callable tools
```

On startup, the server scans `content/` and registers everything automatically. No manual registration — adding a file to the right directory is enough.

---

## Three capability types

| Type | Source | What it gives you |
|---|---|---|
| **Resources** | `brain/`, `cockpit/`, `clients/`, `templates/`, `archive/` | Read-only KB articles via `kb://` URIs |
| **Prompts** | `generators/`, `playbooks/` | Executable recipes with `{{variable}}` interpolation |
| **Tools** | Any `.ts` / `.py` in `content/` | Callable scripts with JSON args in, text out |

---

## Quick start

To install and connect toggle-mcp to your editor, follow the [installation recipe](./install.md) — paste it into Claude Code and it runs the full setup for you.

---

## Auto-sync

Every push to `main` in this repo triggers a rebuild of the toggle-mcp `content/` submodule via GitHub Actions. The server picks up changes the next time it starts (or restarts).

See `TOGGLE_BRAIN_SETUP.md` at the root of this repo for setup instructions.

---

## Repo

Source: [github.com/toggle-workspace/toggle-mcp](https://github.com/toggle-workspace/toggle-mcp)
