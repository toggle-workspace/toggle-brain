# install: Meta Ads reporting CLI → this project

> **Paste this file into Claude Code and it will connect this project to a Meta ad account, read only and scoped to one account.**

Adapted from the Ads CLI Starter Kit (`installations/ads-cli-starter-kit/ONBOARDING.md`, Phase 0 and Phase 1). Meta only. TikTok and Google Ads are deliberately out of scope here, and their kit files stay parked in `installations/ads-cli-starter-kit/` until someone wants them.

---

## READS
- This file
- `installations/ads-cli-starter-kit/ONBOARDING.md` (Phase 0 and Phase 1, for background)
- `installations/meta-ads/.env.example` (the template for the project `.env`)
- `installations/meta-ads/connection-card.md` (the account scope of record)

---

## Why this is not Meta's official `meta` CLI

The starter kit's Phase 1 says `uv tool install meta-ads --python 3.12`. That fails on Windows. Meta publishes `meta-ads` as compiled wheels for Linux and macOS arm64 only:

```
manylinux_2_17_{aarch64,x86_64}  manylinux_2_28_{aarch64,x86_64}
manylinux2014_{aarch64,x86_64}   musllinux_1_2_{aarch64,x86_64}
macosx_11_0_arm64
```

There is no `win_amd64` wheel and no source distribution, so pip, pipx, and uv all fail with `no wheels with a matching platform tag`. That holds for every published version (1.0.0 through 1.1.0).

So this project ships `bin/meta`, a stdlib only client for the same Graph API. It keeps the kit's conventions (one gitignored `.env`, every command names its account, reads free) and adds a hard allowlist the official CLI does not have. Three ways to get the official binary instead, if you ever want it:

1. Install WSL (`wsl --install`, needs admin rights and a reboot), then run the kit's Phase 1 inside the Linux distro.
2. Run it on a Mac or a Linux box.
3. Wait for Meta to publish a Windows wheel.

---

## CHECKS (run these before anything else)

```bash
# 1. uv (provides the managed Python that bin/meta runs on)
uv --version
# Expected: uv 0.12.x or higher.
# Missing? powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# 2. The launcher and the client are present and executable
ls -la bin/meta bin/meta-ads.py

# 3. The credential file exists and git will never see it
ls -la .env && git check-ignore -v .env
# Expected: .gitignore:15:.env    .env
```

Stop and report any failure before continuing.

---

## STEPS

### 1. Mint a system user token (browser, you)

In Meta Business Manager, on the business that owns the ad account:

1. **Business settings → Users → System users**
2. Create a system user, or reuse one. Name it for the tool, such as `toggle-brain-reporting`.
3. **Add assets → Ad accounts**, pick the in scope account only, and grant **View performance** (`ads_read`). Do not grant Manage unless this project is ever meant to write.
4. **Generate new token**, pick the app, and select the `ads_read` scope alone.
5. Set the expiry to **Never** so reporting does not break in 60 days.
6. Copy the token.

Assign only the accounts that belong in scope. A token that can see six accounts is a token that can leak six accounts, and the allowlist in step 2 protects this project without protecting anything else.

### 2. Put the token in `.env` (you, not Claude)

Open `.env` at the project root in an editor and paste the token between the quotes on the `ACCESS_TOKEN` line. Never paste it into a chat session, and never let it reach a commit.

```bash
notepad .env      # or: nano .env
```

Every client gets its own token variable, its own account variable, and one line in the profile map:

```bash
export ACCESS_TOKEN_UNITAR="..."                      # paste, do not commit
export ACT_UNITAR="act_1034316391892752"              # UNITAR (MYR) - Audaura
export META_ACCOUNT_PROFILES="act_1034316391892752=UNITAR"
export META_ALLOWED_ACCOUNTS="act_1034316391892752"
```

Two guard rails run here, and they fail in different ways on purpose:

1. `META_ALLOWED_ACCOUNTS` is the outer fence. `bin/meta` refuses any account outside it, so a broadly scoped token cannot pull another client's numbers from this project.
2. `META_ACCOUNT_PROFILES` is the credential router. It says which token owns which account, so a command against UNITAR uses the UNITAR token and never falls through to another client's. An account mapped to a profile whose token is missing fails loudly rather than borrowing a neighbor's credential.

### 3. Verify (Claude)

```bash
export PATH="$PWD/bin:$HOME/.local/bin:$PATH"
source .env
meta auth status
```

A healthy run prints the token identity, the in scope table, and `OK: authenticated`. Read the **OUT OF SCOPE** block carefully if it appears: those are accounts the token can reach that this CLI blocks. Record them in `connection-card.md` rather than ignoring them, and tighten the token in Business Manager if they should not be visible at all.

### 4. Smoke test the live account

```bash
meta campaigns --account "$ACT_UNITAR"
meta insights --account "$ACT_UNITAR" --level campaign --date-preset last_7d
```

### 5. Record the setup

Update `installations/meta-ads/connection-card.md` with the verified date, the in scope table, and any out of scope accounts the audit surfaced.

---

## Everyday use

Every new shell starts the same way:

```bash
export PATH="$PWD/bin:$HOME/.local/bin:$PATH"
source .env
```

Then:

```bash
meta auth status                                       # identity + scope audit
meta accounts                                          # what each token sees, with business ids
meta business list                                     # Business Manager ids (needs business_management)
meta business accounts --business <business_id>        # owned and partner accounts under one business
meta campaigns --account "$ACT_UNITAR"
meta adsets    --account "$ACT_UNITAR" --campaign-id <ID>
meta ads       --account "$ACT_UNITAR" --adset-id <ID>
meta insights  --account "$ACT_UNITAR" --level campaign --date-preset last_30d
meta insights  --account "$ACT_UNITAR" --level ad --since 2026-08-01 --until 2026-08-31 --by-day
meta -o json insights --account "$ACT_UNITAR" --level campaign --date-preset last_7d > report.json
```

Global flags go on `meta` itself: `-o table|json|plain` and `--debug`.

Unlike the official CLI, `--account` sits on the subcommand here, so the kit's flag ordering gotcha does not apply.

---

## Finding an ad account id or a business id

You do not have to copy ids out of the Business Manager interface. Two read only commands find them, and the difference between them matters.

```bash
meta accounts                                      # every account each token sees, with its business id
meta business list                                 # businesses this token can read metadata for
meta business accounts --business <business_id>    # the portfolio under one business
```

`meta accounts` returns the owning business id on every account row, and it works with `ads_read` alone. That is the cheapest way to get a business id: assign the system user one ad account, run the command, and read the id off the row. UNITAR's business id came back this way as `1936608196363281`.

`meta business accounts` splits a portfolio into **owned** accounts and **partner** accounts, the ones a client owns and shares into the business. It only ever returns accounts the token is actually assigned to, so a token scoped to one client shows one row. Enumerating a full partner portfolio needs a token with the `business_management` scope and broad asset assignment, which is the shared credential this setup exists to prevent. If you need that list once, mint a short lived discovery token, run the command, record the ids in `connection-card.md`, and delete the token. Day to day reporting then runs on the narrow per client tokens.

Business ids live in `.env` as `META_BUSINESS_<PROFILE>`, so the discovery command reads `meta business accounts --business "$META_BUSINESS_TOGGLE"` rather than a pasted number. A business id is not a credential and grants nothing by itself.

`meta business list` needs `business_management` too. With a reporting token it prints a plain line saying the token cannot read business metadata, rather than failing in a way that looks like a broken setup.

Discovery is the one place `META_ALLOWED_ACCOUNTS` does not apply, since it is how you find the id that belongs in the allowlist. Seeing an account in that output grants nothing: every other command still refuses anything outside the allowlist.

---

## Adding another client account

Repeat the same four lines for each new client. Toggle Solutions was added this way on 2026-09-08 as the profile `TOGGLE`, and `connection-card.md` records the result including the audit findings. The steps below use that setup as the worked example.

1. **Business Manager (you).** In the business that owns the new ad account, create a system user named for the tool, such as `toggle-brain-reporting`. Assign that one ad account with **View performance** (`ads_read`), and nothing else. Do not reuse the system user from another client: the point of a per client token is that it can only ever see one account.
2. **Generate the token** with the `ads_read` scope alone and the expiry set to **Never**.
3. **Edit `.env` (you).** Paste the token into `ACCESS_TOKEN_TOGGLE`, then uncomment and fill the three staged lines so they read:

   ```bash
   export ACT_TOGGLE="act_<the numeric id>"
   export META_ACCOUNT_PROFILES="act_1034316391892752=UNITAR,act_<the numeric id>=TOGGLE"
   export META_ALLOWED_ACCOUNTS="act_1034316391892752,act_<the numeric id>"
   ```

4. **Audit (Claude).** `source .env && meta auth status` walks every profile in turn. A clean result prints each token's identity, the accounts it owns, and the closing line "no token reaches another profile's account". Three failures are worth knowing before you see them:

   - **`SHARED CREDENTIAL`** means one token can see an account that belongs to a different profile here. The CLI still refuses the account, but the token itself is too broad. Unassign the extra account in Business Manager, regenerate that token, and run the audit again.
   - **`OUT OF SCOPE`** means the token can see accounts this project does not track at all. That is a warning rather than a failure, and the accounts belong in the connection card so nobody rediscovers them later.
   - **`In scope account(s) not visible to this token`** is an asset assignment gap in Business Manager, not a bad token.

5. **Smoke test and record.** Run `meta campaigns --account "$ACT_TOGGLE"` and one `meta insights` pull, then update `connection-card.md` with the verified date, the token identity, and the audit result.

---

## Rules of engagement

1. **This path cannot write.** No create, update, delete, or status flip is implemented. Reporting only, by construction. Ask before adding one.
2. **Every command names its account.** There is no default account variable and there never should be.
3. **One token per client.** A system user gets exactly one ad account. Sharing a token across two clients is the failure this setup exists to prevent, and `meta auth status` reports it as `SHARED CREDENTIAL`.
4. **Rotation is the fix, deletion is not.** A leaked token gets regenerated in Business Manager, then `.env` is updated.
5. **Credentials live in `.env` only.** Never in shell profiles, MCP configs, chat, or commits.

---

## Gotchas

- **`Token rejected (code 190)`** means the token is expired, revoked, or minted for a different app. Regenerate it in Business Manager. A token created without an explicit **Never** expiry dies after 60 days.
- **`Permission denied (code 10 / 200 / 272)`** on an account query is an asset assignment problem, not a token problem. Assign the ad account to the system user in Business Manager with `ads_read`.
- **HTTP errors mentioning the version** mean the pinned Graph version sunset. Meta retires versions on a rolling schedule. Set `META_API_VERSION` in `.env` to a supported version.
- **`chmod 600 .env` is a no op on Windows.** NTFS ignores POSIX modes, so the file was locked down with `icacls .env /inheritance:r /grant:r "<user>:(F)"` instead. Re-run that after recreating `.env`.
- **`meta: command not found`** means `bin/` is not on PATH in this shell. Run the `export PATH=...` line above.
- **An account with zero delivery still lists campaigns.** Check spend in `meta insights` before concluding a setup is wired correctly. This trap is called out in the kit's TikTok phase and it applies to Meta just as well.
