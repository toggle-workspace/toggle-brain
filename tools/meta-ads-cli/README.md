# Meta Ads CLI (`meta`)

Meta's **official** command-line tool for the Marketing API — list/create campaigns,
ad sets, ads, creatives, and pull insights from the terminal. This folder vendors a
one-shot installer + auth setup so the whole team installs the same version the same way.

- **Package:** [`meta-ads`](https://pypi.org/project/meta-ads/) on PyPI, published by Meta Platforms.
- **Command:** `meta` (e.g. `meta ads campaign list`)
- **Docs:** <https://developers.facebook.com/documentation/ads-commerce/ads-ai-connectors/ads-cli/ads-cli-overview>
- **Pinned version:** `1.1.0` (see `META_ADS_VERSION` in `install.sh`)

> ⚠️ **Not** the same as `meta-ads-cli` (a third-party tool, command `meta-ads`).
> We use the official Meta package, whose command is just `meta`.

---

## Install

```bash
tools/meta-ads-cli/install.sh
```

That installs `pipx` if needed, then installs `meta-ads` into an isolated pipx
environment and puts `meta` on your PATH. Open a new terminal (or
`export PATH="$HOME/.local/bin:$PATH"`) and verify:

```bash
meta --version      # meta, version 1.1.0
```

### Why pipx + Python 3.13 (not 3.12 / 3.14)?

`meta-ads` ships **compiled wheels for CPython 3.12 and 3.13 only** — there's no
3.14 wheel and no source distribution, so installing under Python 3.14 fails with
`No matching distribution found`. The installer pins Python **3.13** and lets pipx
download a standalone build if your machine doesn't have one, so it works
regardless of your system Python.

Manual equivalent, if you'd rather not run the script:

```bash
pipx install "meta-ads==1.1.0" --python 3.13 --fetch-python=missing
```

---

## Authentication

The CLI authenticates via two environment variables (there is no `meta auth login`):

| Variable        | What it is                                              |
|-----------------|---------------------------------------------------------|
| `ACCESS_TOKEN`  | Long-lived Meta System User access token                |
| `AD_ACCOUNT_ID` | Ad account ID **with** the `act_` prefix (`act_123…`)   |

### Generate a token (one-time, in Meta Business Manager)

1. Create (or reuse) a Meta Developer App with **Marketing API** access.
2. Business Settings → **Users → System Users** → add a System User.
3. Assign the ad account(s) to that System User with **Manage** access.
4. **Generate Token** with scopes: `ads_management`, `ads_read`,
   `business_management`, `pages_show_list`.
5. Copy the token — this is your `ACCESS_TOKEN`.

### Wire it up locally

```bash
cp tools/meta-ads-cli/.env.example tools/meta-ads-cli/.env
# edit .env, paste ACCESS_TOKEN + AD_ACCOUNT_ID
set -a; source tools/meta-ads-cli/.env; set +a
meta auth status        # → authenticated
```

> 🔒 **Never paste a token into a Claude/chat session, and never commit `.env`.**
> The repo's `.gitignore` already ignores `.env` / `.env.*` (only `.env.example`
> is tracked). Treat the token like a password; rotate it if it leaks.

---

## Common commands

```bash
meta auth status                                   # check auth
meta ads adaccount list                            # accounts you can access
meta ads campaign list                             # campaigns in AD_ACCOUNT_ID
meta ads insights get --date-preset last_7d \
  --fields spend,impressions,clicks,ctr,conversions
meta ads campaign create --name "Q3 Sales" \
  --objective OUTCOME_SALES --daily-budget 5000
meta --help                                        # full command tree
```

Global flags: `-o, --output [table|json|plain]`, `--no-color`, `--no-input`, `--debug`.
JSON output (`-o json`) is handy for piping into scripts/reports.

---

## Upgrading

Bump `META_ADS_VERSION` in `install.sh`, commit, and have the team re-run the
installer (it uses `--force` when already installed). Or directly:

```bash
pipx install --force "meta-ads==<new-version>" --python 3.13 --fetch-python=missing
```

## Uninstall

```bash
pipx uninstall meta-ads
```

## Troubleshooting

- **`No matching distribution found for meta-ads`** — you're on Python 3.14+. Use
  the installer (pins 3.13) or pass `--python 3.13 --fetch-python=missing`.
- **`meta: command not found`** after install — pipx's bin dir isn't on PATH.
  Run `pipx ensurepath` and open a new shell, or `export PATH="$HOME/.local/bin:$PATH"`.
- **`Not authenticated. Set the ACCESS_TOKEN environment variable.`** — you haven't
  sourced your `.env` in this shell. Re-run `set -a; source …/.env; set +a`.
