# install: Google Drive MCP → Claude Code

> **Paste this file into Claude Code and it will guide you through connecting Google Drive as an MCP resource.**

MCP package: `@modelcontextprotocol/server-gdrive`

---

## READS
- This file

## CHECKS (run these before anything else)

```bash
# 1. Node.js 20+
node --version
# Expected: v20.x.x or higher

# 2. npm
npm --version
# Expected: any version bundled with Node 20

# 3. Claude Code CLI
claude --version
# Expected: any version — confirms claude CLI is on PATH
```

Stop and report any failures before continuing.

---

## STEPS

### 1 — Create a Google Cloud project

These steps happen in the browser. Walk the user through them:

1. Go to https://console.cloud.google.com/
2. Click the project dropdown (top bar) → **New Project**
3. Name it `toggle-brain-mcp` (or anything memorable) → **Create**
4. Make sure the new project is selected in the top bar

---

### 2 — Enable the Google Drive API

1. In the same project, go to **APIs & Services → Library**
2. Search for `Google Drive API`
3. Click it → **Enable**

---

### 3 — Create OAuth 2.0 credentials

1. Go to **APIs & Services → Credentials**
2. Click **+ Create Credentials → OAuth client ID**
3. If prompted to configure the consent screen first:
   - Choose **Internal** (if on Google Workspace) or **External**
   - Fill in App name: `toggle-brain-mcp`, User support email: your email
   - Skip scopes for now → Save and Continue through all steps
4. Back on Create OAuth client ID:
   - Application type: **Desktop app**
   - Name: `toggle-brain-mcp`
   - Click **Create**
5. Click **Download JSON** on the confirmation dialog

Ask the user: **"Where did you save the downloaded credentials JSON file? Paste the full path."**

Store the answer as `CREDENTIALS_PATH`.

---

### 4 — Add the MCP server to Claude Code

```bash
claude mcp add google-drive \
  -e GDRIVE_CREDENTIALS_FILE="$CREDENTIALS_PATH" \
  -- npx -y @modelcontextprotocol/server-gdrive
```

Expected: `MCP server "google-drive" added.`

---

### 5 — Trigger the OAuth flow

The first time Claude Code connects to `google-drive`, it will open a browser window for Google sign-in.

Start a new Claude Code session (or run `/mcp` to force a reconnect). When the browser opens:

1. Sign in with the Google account whose Drive you want to access
2. Click **Allow** on the permissions screen
3. The browser will show a success page — return to Claude Code

A token file is saved locally so you only need to do this once. Its default location is `~/.config/mcp-server-gdrive/credentials.json` (created automatically).

---

### 6 — Verify

Run inside Claude Code:

```
/mcp
```

Expected: `google-drive — Connected`

Then test it:

```
Ask Claude: "List 5 files from my Google Drive"
```

Expected: Claude returns a list of file names from your Drive.

---

## TROUBLESHOOTING

| Symptom | Fix |
|---|---|
| `google-drive` missing from `/mcp` | Re-run the `claude mcp add` command from Step 4 and restart the session |
| Browser doesn't open on first connect | Run `npx -y @modelcontextprotocol/server-gdrive` manually in a terminal — it will print the auth URL |
| `invalid_client` error in browser | The credentials JSON is wrong type — re-download and confirm it says `"application_type": "desktop"` |
| `access_denied` in browser | Consent screen is in testing mode and your Google account isn't added as a test user — add it under **OAuth consent screen → Test users** |
| Token expired / Drive stops responding | Delete `~/.config/mcp-server-gdrive/credentials.json` and reconnect to re-authenticate |
| `GDRIVE_CREDENTIALS_FILE` not found | Confirm the path has no typos: `ls "$CREDENTIALS_PATH"` |
