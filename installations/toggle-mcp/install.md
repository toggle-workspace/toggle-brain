# install: toggle-mcp

> **Paste this file into Claude Code (or any MCP-compatible AI) and it will run the full installation for you.**

Repo: https://github.com/toggle-workspace/toggle-mcp

---

## READS
- This file
- `TOGGLE_BRAIN_SETUP.md` — GitHub Actions sync setup (read it now; you'll need Step 2 of it later)

## CHECKS (run these before anything else)

Run each check and stop if any fails — report the failure and wait for the user to resolve it before continuing.

```bash
# 1. Node.js 20+
node --version
# Expected: v20.x.x or higher. If lower: https://nodejs.org/en/download

# 2. Git
git --version
# Expected: git version 2.x.x or higher.

# 3. npm
npm --version
# Expected: 10.x.x or similar — any version bundled with Node 20 is fine.
```

Ask the user: **"Where should I clone toggle-mcp? Default is `~/tools/toggle-mcp`. Press Enter to confirm or type a different path."**

Store the answer as `INSTALL_PATH`. If the user presses Enter, use `~/tools/toggle-mcp`.

Ask the user: **"Which editor are you connecting to? (1) Claude Code  (2) Cursor  (3) Windsurf  (4) All three"**

Store the answer as `EDITOR_TARGET`.

---

## STEPS

### 1 — Clone

```bash
mkdir -p "$(dirname $INSTALL_PATH)"
git clone https://github.com/toggle-workspace/toggle-mcp.git "$INSTALL_PATH"
cd "$INSTALL_PATH"
```

Expected: Repository cloned. `ls` shows `package.json`, `src/`, `dist/` (may be empty until build).

---

### 2 — Install and build

```bash
cd "$INSTALL_PATH"
npm install
npm run build
```

Expected: `node_modules/` populated, `dist/index.js` created with no TypeScript errors.

---

### 3 — Smoke test

```bash
timeout 3 node "$INSTALL_PATH/dist/index.js" 2>&1 || true
```

Expected output (printed before the process exits):
```
Loaded: NNN resources, NN prompts, N tools
```

If the output is missing or shows 0s for everything, run `git -C "$INSTALL_PATH" pull` and rebuild.

---

### 4 — Connect to editor(s)

#### Claude Code (run if EDITOR_TARGET is 1 or 4)

```bash
claude mcp add toggle-brain node "$INSTALL_PATH/dist/index.js"
```

Expected: `MCP server "toggle-brain" added.`

Verify inside Claude Code by running `/mcp` — you should see `toggle-brain — Connected`.

---

#### Cursor (run if EDITOR_TARGET is 2 or 4)

Check if `~/.cursor/mcp.json` exists:

```bash
cat ~/.cursor/mcp.json 2>/dev/null || echo "FILE_NOT_FOUND"
```

**If FILE_NOT_FOUND**, create `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "toggle-brain": {
      "command": "node",
      "args": ["/absolute/path/to/toggle-mcp/dist/index.js"]
    }
  }
}
```

Replace `/absolute/path/to/toggle-mcp` with the actual resolved value of `$INSTALL_PATH` (no `~` — write the full expanded path).

**If the file already exists**, merge the `toggle-brain` key into the existing `mcpServers` object — do not overwrite other servers.

Reload Cursor and open **Settings → MCP** to confirm `toggle-brain` appears.

---

#### Windsurf (run if EDITOR_TARGET is 3 or 4)

Check if `~/.codeium/windsurf/mcp_config.json` exists:

```bash
cat ~/.codeium/windsurf/mcp_config.json 2>/dev/null || echo "FILE_NOT_FOUND"
```

**If FILE_NOT_FOUND**, create `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "toggle-brain": {
      "command": "node",
      "args": ["/absolute/path/to/toggle-mcp/dist/index.js"]
    }
  }
}
```

Replace `/absolute/path/to/toggle-mcp` with the actual resolved value of `$INSTALL_PATH`.

**If the file already exists**, merge the `toggle-brain` key into the existing `mcpServers` object.

Reload Windsurf and confirm `toggle-brain` appears in its MCP panel.

---

### 5 — Optional: set up auto-sync (GitHub Actions)

Ask the user: **"Do you want to set up auto-sync so toggle-mcp updates every time toggle-brain is pushed? (y/n)"**

If yes, follow the steps in `TOGGLE_BRAIN_SETUP.md` (already in context from the READS section). Steps summary:

1. Add a `GH_PAT` secret (classic PAT with `repo` + `workflow` scopes) to the toggle-brain repo at **Settings → Secrets and variables → Actions**.
2. Create `.github/workflows/notify-mcp.yml` in toggle-brain with the workflow content from `TOGGLE_BRAIN_SETUP.md → Step 2`.
3. Commit and push the workflow file to `main`.
4. Verify by making a small push to toggle-brain and confirming the sync Action runs in both repos.

---

## VERIFICATION

After all steps, run this checklist:

```bash
# 1. Build artifact exists
test -f "$INSTALL_PATH/dist/index.js" && echo "✓ dist/index.js exists" || echo "✗ MISSING — rebuild with: cd $INSTALL_PATH && npm run build"

# 2. Server loads without error
timeout 3 node "$INSTALL_PATH/dist/index.js" 2>&1 | grep -i "Loaded" && echo "✓ Server starts" || echo "✗ Server did not print Loaded line — check Node version and rebuild"
```

For **Claude Code**: run `/mcp` — confirm `toggle-brain — Connected`.

For **Cursor / Windsurf**: confirm the server appears in the editor's MCP panel after a reload.

---

## TROUBLESHOOTING

| Symptom | Fix |
|---|---|
| `toggle-brain` missing from `/mcp` | Re-run `claude mcp add toggle-brain node "$INSTALL_PATH/dist/index.js"` and restart the Claude Code session |
| Loaded line shows 0 resources | Run `git -C "$INSTALL_PATH" pull` then `npm run build` again |
| Build fails with type errors | Run `node --version` — must be v20 or later |
| Cursor/Windsurf doesn't show server | Confirm the path in the JSON config is the absolute path to `dist/index.js`; no `~` expansion in args |
| Sync Action fails in toggle-brain | Confirm `GH_PAT` secret exists with `repo` and `workflow` scopes |
| Sync Action fails in toggle-mcp | Confirm `sync-brain.yml` is present in toggle-mcp and the event type matches `toggle-brain-updated` |
