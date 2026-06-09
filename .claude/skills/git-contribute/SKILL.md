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

### 1. Check Current Branch

```bash
git branch --show-current
git status --short
```

If already on `main` or a protected branch, proceed to step 2. If already on a feature branch, skip to step 3.

### 2. Create & Checkout a Branch

Branch naming: `<type>/<short-description>` — lowercase kebab, matches the commit type.

```bash
# Examples
git checkout -b feat/add-pricing-bundle
git checkout -b fix/quote-generator-reads
git checkout -b docs/update-brain-services
```

**Never push to `main` directly.** If the user is on `main`, stop and create a branch first.

### 3. Stage & Commit

Follow the `git-commit` skill — analyze the diff, stage logically grouped files, generate a conventional commit message.

```bash
git diff --staged   # or git diff if nothing staged
git add <files>
git commit -m "<type>[scope]: <description>"
```

See `git-commit` skill for commit types, scopes, and message rules.

### 4. Push the Branch

```bash
git push -u origin <branch-name>
```

If the branch already exists on remote:

```bash
git push
```

### 5. Create the Pull Request

```bash
gh pr create \
  --base main \
  --title "<type>[scope]: <description>" \
  --body "$(cat <<'EOF'
## Summary
- <bullet of what changed and why>

## Changes
- <files or areas touched>

## Notes
<anything reviewers should know>
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
