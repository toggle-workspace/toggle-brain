# Setup: Connect toggle-brain to toggle-mcp

Follow these two steps to make toggle-mcp automatically update whenever toggle-brain is pushed to.

---

## Step 1 — Add the secret

Go to:
**toggle-brain repo → Settings → Secrets and variables → Actions → New repository secret**

| Field | Value |
|---|---|
| Name | `GH_PAT` |
| Value | A GitHub classic PAT with `repo` and `workflow` scopes |

To generate the PAT:
1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Click **Generate new token (classic)**
3. Give it a name e.g. `toggle-mcp-sync`
4. Check `repo` (full) and `workflow`
5. Click **Generate token** and copy it
6. Paste it as the secret value above

---

## Step 2 — Create the notify workflow

Create this file inside toggle-brain at exactly this path:

```
.github/workflows/notify-mcp.yml
```

Paste this as the file content:

```yaml
name: Notify toggle-mcp on push

on:
  push:
    branches: [main, master]

jobs:
  dispatch:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger toggle-mcp sync
        run: |
          curl -s -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer ${{ secrets.GH_PAT }}" \
            -H "X-GitHub-Api-Version: 2022-11-28" \
            https://api.github.com/repos/toggle-workspace/toggle-mcp/dispatches \
            -d '{"event_type":"toggle-brain-updated"}'
```

Commit and push this file to `main`.

---

## Step 3 — Test it

1. Make any small change in toggle-brain and push to `main`
2. Go to **toggle-brain → Actions** and confirm the `Notify toggle-mcp on push` workflow ran
3. Go to **toggle-mcp → Actions** and confirm the `Sync content from toggle-brain` workflow triggered and completed
4. Check **toggle-mcp → commits** — you should see a new `chore: sync content from toggle-brain` commit

---

That's it. From now on, every push to toggle-brain automatically updates the content in toggle-mcp.
