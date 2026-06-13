# `installations/` — AI-executable setup recipes

One sub-directory per integration. One recipe per integration.

---

## The rules of this zone

1. **Recipes are AI-executable, not human READMEs.** Every file here is written to be pasted into an AI assistant and run without further instruction. If a step can't be executed by the AI, it doesn't belong here.
2. **Every recipe opens with a `READS:` manifest** listing only the files and URLs it needs for context.
3. **Every recipe has a `CHECKS:` pre-flight section** that verifies prerequisites before touching the system.
4. **Recipes WRITE to system config paths** (`~/.claude/`, `~/.cursor/`, `~/.codeium/`). They never write back into `brain/` or `generators/`.
5. **One directory per integration** (`toggle-mcp/`, and future integrations in their own sub-directory). Don't flatten.
6. **Don't duplicate README content.** Link to the source repo README for background. This file is the *how*, not the *what*.

---

## What's in here

- `toggle-mcp/install.md` — installs and connects the toggle-brain MCP server to Claude Code, Cursor, or Windsurf
