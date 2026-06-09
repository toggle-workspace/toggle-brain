---
name: contribute
description: Use when a contributor wants to submit changes to the project, or when the user types "/contribute" — creates a branch, commits changes using conventional commits, pushes, and opens a pull request instead of pushing directly to main.
license: MIT
allowed-tools: Bash
---

# Git Contribute — Branch → Commit → PR

## Overview

Contributors must never push directly to `main`. This skill enforces the branch → commit → pull request workflow for all changes.

## Workflow

### 1. Pull Latest Changes

Always sync with the remote before branching to avoid conflicts.

```bash
git checkout main
git pull origin main
```

### 2. Check Current Branch

```bash
git branch --show-current
git status --short
```

If already on `main` or a protected branch, proceed to step 3. If already on a feature branch, skip to step 4.

### 3. Create & Checkout a Branch

Branch naming: `<type>/<short-description>` — lowercase kebab, matches the commit type.

```bash
# Examples
git checkout -b feat/add-pricing-bundle
git checkout -b fix/quote-generator-reads
git checkout -b docs/update-brain-services
```

**Never push to `main` directly.** If the user is on `main`, stop and create a branch first.

### 4. Stage & Commit

Follow the `git-commit` skill — analyze the diff, stage logically grouped files, generate a conventional commit message.

```bash
git diff --staged   # or git diff if nothing staged
git add <files>
git commit -m "<type>[scope]: <description>"
```

See `git-commit` skill for commit types, scopes, and message rules.

### 5. Push the Branch

```bash
git push -u origin <branch-name>
```

If the branch already exists on remote:

```bash
git push
```

### 6. Create the Pull Request

Use the repo's PR template. Fill in each section based on the diff before running.

```bash
gh pr create \
  --base main \
  --title "<type>[scope]: <description>" \
  --body "$(cat <<'EOF'
## What changed
- <1–3 specific bullets>

## Zone(s) touched
- [ ] `brain/pricing/` — **CHANGELOG.md entry added** (mandatory)
- [ ] `brain/` (other)
- [ ] `templates/`
- [ ] `playbooks/`
- [ ] `generators/`
- [ ] `prompts/`
- [ ] `clients/<slug>/`
- [ ] `archive/`
- [ ] Root governance (`CLAUDE.md` / `README.md` / `MAP.md` / `CONTRIBUTING.md`)

## Checklist
- [ ] If I touched `brain/pricing/`, I added a `CHANGELOG.md` entry and updated `last_reviewed:`.
- [ ] If I touched `brain/`, I checked I'm not duplicating a fact that already exists elsewhere.
- [ ] If I added a client deliverable, the client folder's `CLIENT.md` is up to date.
- [ ] If I sent a quote, a copy is in `archive/quotes/` for future price anchoring.
- [ ] No client work writes back into `brain/` (open a separate PR for that).
- [ ] No heavy binaries (>5 MB) committed — they're in Drive, linked here if needed.

## Notes for reviewer
<anything non-obvious — why this approach, what you're unsure about>
EOF
)"
```

After creating, output the PR URL for the user.

## Branch Naming Conventions

| Commit type | Branch prefix | Example |
|---|---|---|
| `feat` | `feat/` | `feat/tiktok-hooks-v2` |
| `fix` | `fix/` | `fix/quote-anchor-path` |
| `docs` | `docs/` | `docs/brain-glossary` |
| `chore` | `chore/` | `chore/cleanup-archive` |
| `refactor` | `refactor/` | `refactor/client-template` |

## Safety Rules

- **Never push to `main`** — always branch first
- **Never force push** unless explicitly requested
- **Never skip hooks** (`--no-verify`) unless user asks
- **One logical change per PR** — keep scope tight
- **Do not commit secrets** (.env, credentials, private keys)

## Common Mistakes

| Mistake | Fix |
|---|---|
| Already on `main` with uncommitted changes | `git stash` → `git checkout -b <branch>` → `git stash pop` |
| Branch already exists on remote | `git push` (no `-u` needed) |
| Forgot to stage files before commit | `git add <files>` then retry commit |
| PR title doesn't match commit convention | Match the commit type/scope in the PR title |
