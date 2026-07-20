# SETUP — voice-fingerprint skill

This skill runs a 6-step pipeline to extract a live brand voice fingerprint for a new market+language surface and scaffold a naturalness reviewer agent. Below are the dependencies and configuration steps needed before your first run.

---

## 1. Python dependencies

The GSC traffic pull script (`_template_traffic_pull.py`) requires:

```
google-auth
google-auth-httplib2
google-api-python-client
```

Install into a venv of your choice. The template script references `.venv/bin/python3` relative to wherever you store the script — adjust the path in SKILL.md Step 2 to match your project layout.

Example:
```bash
python3 -m venv .venv
.venv/bin/pip install google-auth google-auth-httplib2 google-api-python-client
```

---

## 2. Google Search Console credentials

The traffic pull script authenticates with Google Search Console via OAuth2. You must wire your own credentials — no credentials are bundled with this skill.

**Steps:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/) and create a project (or use an existing one).
2. Enable the **Google Search Console API**.
3. Create an **OAuth 2.0 Client ID** (application type: Desktop app).
4. Download the `client_secrets.json` file.
5. Run a one-time auth flow to generate your token:

```python
from google_auth_oauthlib.flow import InstalledAppFlow
import json, pathlib

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
flow = InstalledAppFlow.from_client_secrets_file("client_secrets.json", SCOPES)
creds = flow.run_local_server(port=0)
pathlib.Path(".secrets/google_oauth_token.json").write_text(creds.to_json())
```

6. The generated `.secrets/google_oauth_token.json` is what `_template_traffic_pull.py` reads on `TOKEN_PATH`. Adjust `TOKEN_PATH` in the script to match where you store the token.

> Keep `.secrets/` in your `.gitignore` — never commit token files.

---

## 3. Configure your paths

Before running the skill for the first time, decide where your content files will live and tell the skill. Two paths need to be set consistently across all files:

### Content core directory

This is where fingerprint docs and related content rules live. The skill template uses `<your-content-core-dir>/` as a placeholder.

Example from the skill's original setup: `StoreHub/ALL_Programtic_SEO/_core/`

Replace `<your-content-core-dir>/` with your actual path (relative to your project root) in:
- `SKILL.md` — Steps 1, 4, 6
- `_template_agent.md` — "Always load before reviewing" section and output section
- `_template_fingerprint.md` — "Related docs" section

### Drafts directory

This is where your content drafts live (one folder per market). The skill template uses `<your-drafts-dir>/` as a placeholder.

Example: `content/drafts/` or `04_drafts/`

Replace in:
- `SKILL.md` — Step 6
- `_template_agent.md` — Inputs table and Pass 5

### Tracker venv path

The traffic pull script is generated into `<your-tracker-venv>/` per the SKILL.md. This is just wherever you store your content tooling scripts. It can be any convenient directory in your project.

---

## 4. GSC site property

In `_template_traffic_pull.py`, set `GSC_SITE` to match your Search Console site property:

```python
GSC_SITE = "sc-domain:your-domain.com"
# or: GSC_SITE = "https://www.your-domain.com/"
```

---

## 5. Where files land after the skill runs

| File | Location |
|---|---|
| Traffic pull script | `<your-tracker-venv>/_{market}_{lang}_traffic_pull.py` |
| Fingerprint doc | `<your-content-core-dir>/live_{market}_{lang}_voice_fingerprint.md` |
| Naturalness reviewer agent | `.claude/agents/{market}-{lang}-naturalness-reviewer.md` |

---

## 6. Restart Claude Code after scaffolding

Custom agents (files in `.claude/agents/`) only register when Claude Code starts up — they are not hot-reloaded. After the skill scaffolds a new agent file, **restart your Claude Code session** before calling the new agent.

Skills (files in `.claude/skills/`) hot-reload and do not need a restart.

---

## 7. Corpus-richness branches

The traffic pull script prints a corpus assessment at the end. The skill uses this to branch:

| Result | Branch |
|---|---|
| RICH (≥10 URLs >20 clicks) | Use live articles as the fingerprint corpus |
| MEDIUM (3-10 URLs >5 clicks) | Use top 3 live + supplement with competitor blog |
| THIN (<3 URLs with traffic) | Pivot entirely to competitor + local market media |

For thin corpus, the fingerprint confidence is lower — the template doc has a confidence field for this. Flag lower-confidence fingerprints and plan to refresh them once you have more live content.
