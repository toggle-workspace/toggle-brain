# Connection card: Meta Ads

The scope of record for this project's Meta connection. Phase 5 of the Ads CLI Starter Kit. Update it whenever the token, the account list, or the tooling changes.

| Field | Value |
|---|---|
| Platform | Meta Ads (Marketing API, Graph `v23.0`) |
| Tool | `bin/meta` (project local, stdlib Python via uv managed CPython 3.13) |
| Install method | `bin/meta` + `bin/meta-ads.py`, committed to this repo. No pip install. |
| Why not the official CLI | `meta-ads` publishes no `win_amd64` wheel and no sdist. See `install.md`. |
| Access level | **Read only.** No write command is implemented. |
| Credentials | One `ACCESS_TOKEN_<PROFILE>` per client in `.env` at the project root, gitignored, ACL restricted to `JORDAN\Jordan` |
| Credential routing | `META_ACCOUNT_PROFILES` maps each `act_` id to the profile that owns it. No account borrows another client's token. |
| Verify command | `source .env && meta auth status` (audits every profile in turn) |
| Token type | Meta Business Manager system user tokens. `UNITAR` carries `ads_read`. `TOGGLE` carries `ads_management` as well, which is wider than this project needs. |
| Token expiry | Both never expire. Confirmed for `TOGGLE` on 2026-09-08 via `debug_token`: `expires_at` and `data_access_expires_at` both return never. |
| Setup built | 2026-09-02 |
| Per client tokens introduced | 2026-09-08, ahead of adding the Toggle Solutions account |
| Ikonik added to scope | 2026-09-10, on Jordan's request, so the weekly Meta numbers can be pulled from the CLI |

---

## In scope accounts

| Variable | Account name | ID | Profile | Token identity | Status |
|---|---|---|---|---|---|
| `ACT_UNITAR` | UNITAR (MYR) - Audaura | `act_1034316391892752` | `UNITAR` | `unitardashboard-bot` (id `122109563954338934`) | Verified 2026-09-02, re-verified under the profile split 2026-09-08 |
| `ACT_TOGGLE` | Toggle Solutions (MYR) | `act_602322711290774` | `TOGGLE` | `Claude CLI` (id `122094606855478034`) | **Connected and verified 2026-09-08.** Campaign list and insights both return rows. The token is wider than this account, see below. |
| `ACT_IKONIK` | Ikonik Eye Specialist - Ad - V2 | `act_322145847970519` | `TOGGLE` | `Claude CLI` (id `122094606855478034`) | **Connected and verified 2026-09-10.** Campaigns and insights both return rows. Account timezone is `America/Los_Angeles`, so every reported day starts at 3pm Malaysian time. Client folder: `clients/ikonik/`. |

## Business Manager ids

| Business | ID | How it was found |
|---|---|---|
| Unitar | `1936608196363281` | `meta accounts`, which returns the owning business on every account row with `ads_read` alone |
| Toggle Solutions | `596170808875972` | Supplied by Jordan on 2026-09-08. The `Claude CLI` token lacks `business_management`, so the API cannot confirm it. |

Both ids are in `.env` as `META_BUSINESS_UNITAR` and `META_BUSINESS_TOGGLE`. A business id is not access. It names a portfolio for the discovery command and grants nothing on its own.

Toggle Solutions' business holds partner ad accounts belonging to clients. Those are visible to a token only when the system user is assigned to them, so a correctly scoped reporting token lists one account and no more. Enumerating the whole portfolio takes a token with the `business_management` scope, which is worth minting briefly and then deleting rather than keeping around.

`META_ALLOWED_ACCOUNTS` in `.env` lists exactly these IDs. `bin/meta` refuses every account outside that list, so a token with wider visibility still cannot pull another client's data through this project. `META_ACCOUNT_PROFILES` adds the second guard: each account resolves to its own token, and an account whose token is missing fails loudly instead of falling back to another client's credential.

### Toggle Solutions baseline, first verified pull

Recorded so a later run that looks wrong has something to compare against. Account level, 2025-01-01 to 2026-09-08:

| Metric | Value |
|---|---:|
| Spend | RM 4,772.62 |
| Impressions | 1,805,162 |
| Reach | 1,015,761 |
| Clicks | 11,090 |
| Form leads | 7 |
| Purchases | 83 |

The last 30 days return no rows, because every campaign in the account is paused. Campaign names follow the `tg_` convention and the newest one started on 2026-06-22. An empty insights pull on this account means no delivery, not a broken connection.

## Out of scope accounts

### UNITAR profile: clean

**None. Audited 2026-09-02, re-audited 2026-09-08.** The `unitardashboard-bot` system user is assigned exactly one ad account, so `meta auth status` reported "Ad accounts this token can see: 1" with an empty out of scope block.

This is the strongest possible result for the no-shared-accounts requirement. The scoping holds at the token itself, not only at the CLI allowlist, so even a tool that ignores `META_ALLOWED_ACCOUNTS` cannot reach another client's data with this token.

### TOGGLE profile: 10 client accounts visible, all blocked

**Audited 2026-09-08, revised 2026-09-10 when Ikonik moved into scope.** The `Claude CLI` system user is assigned 12 ad accounts. Two are in scope (Toggle Solutions and Ikonik) and the other 10 belong to clients:

| ID | Account name | Timezone | Account status |
|---|---|---|---|
| `act_849103525201052` | Petsmore | Asia/Kuala_Lumpur | 1, active |
| `act_2203722347039439` | Cadler Ad Account | Asia/Singapore | 1, active |
| `act_1208810903369938` | New Project Ads | Asia/Kuala_Lumpur | 1, active |
| `act_1544547886495478` | iKon Impact | Asia/Kuala_Lumpur | 1, active |
| `act_823366623217448` | Grand Damansara Ads | Asia/Kuala_Lumpur | 1, active |
| `act_1595741604442233` | OFG Ad Account | Asia/Kuala_Lumpur | 1, active |
| `act_1560409005365215` | Golen Homes | Asia/Kuala_Lumpur | 1, active |
| `act_1912921625996713` | Furball Haven | Asia/Singapore | 1, active |
| `act_1029308756310229` | BRU x HWC | Asia/Kuala_Lumpur | 1, active |
| `act_1053396740745682` | Kynare Ecosystems | Asia/Singapore | 3, unsettled |

`bin/meta` refuses every one of them, which was verified by running `meta insights --account act_1029308756310229` and getting the allowlist refusal. The gap is at the token, not at the CLI: any other tool holding this token could read all 11.

### The TOGGLE token also carries write access

`debug_token` on 2026-09-08 returned this for `ACCESS_TOKEN_TOGGLE`:

| Field | Value |
|---|---|
| Type | `SYSTEM_USER` |
| App | `Claude CLI - T-Cult` (app id `1069759995815820`) |
| Scopes | `ads_management`, `ads_read`, `public_profile` |
| Expiry | Never, for both the token and data access |

`ads_management` allows creating, editing, pausing, and deleting campaigns. `bin/meta` implements no write command at all, so nothing in this project can use it, but the scope travels with the token. Combined with the 10 client accounts above, this single string in `.env` could change live campaigns across the whole client book from any other tool.

**The fix, when someone wants the guarantee to hold at the source:** create a system user assigned to `act_602322711290774` alone, grant it View performance (`ads_read`) only, generate a fresh token, and replace `ACCESS_TOKEN_TOGGLE`. The audit then prints an empty out of scope block, matching the UNITAR profile, and the write capability disappears. Until that happens, this project is safe and the token is not.

Re-run `meta auth status` after any Business Manager change and update this section.

## Related client

`clients/audaura-unitar/` holds the UNITAR work this account funds, including the weekly leads report format in `WEEKLY-REPORT-FORMAT.md`.

`act_602322711290774` is Toggle's own account, so its reporting belongs in `clients/toggle/` rather than under a client folder.

## Baseline from the first verified pull

Recorded so a later run that looks wrong has something to compare against. Seven days, 2026-08-26 to 2026-09-01, campaign level:

| Metric | Value |
|---|---|
| Spend | RM 75,453.60 |
| Campaigns with delivery | 9 of 11 reporting rows |

That weekly spend lines up with the roughly RM 71k a week recorded in `clients/audaura-unitar/handover-2026-08-zaid.md`, which is a good sign the account and the token match the engagement.

Monthly totals, both months verified against the client's own reporting on 2026-09-02:

| Month | Spend (RM) | Leads | CPL (RM) | Impressions | Clicks | Reach |
|---|---:|---:|---:|---:|---:|---:|
| July 2026 | 323,763.21 | 5,584 | 57.98 | 42,069,228 | 263,168 | 7,916,938 |
| August 2026 | 313,334.31 | 2,775 | 112.91 | 34,891,585 | 209,119 | 6,480,173 |

## Counting leads correctly (this bit off once already)

Meta returns three different lead numbers and they are easy to confuse:

| Action type | July | August | What it is |
|---|---:|---:|---|
| `onsite_conversion.lead_grouped` | 5,584 | 2,775 | Instant form leads filled on Meta |
| `offsite_conversion.fb_pixel_lead` | 575 | 559 | Leads fired by the website pixel |
| `lead` | 6,159 | 3,334 | The exact sum of the two above |

**`lead` is a total, not the instant form count.** The identity `lead = lead_grouped + fb_pixel_lead` holds exactly in both months. Ads Manager's "Leads" column, and every UNITAR report built off it, means `lead_grouped`. Reading `lead` instead inflates July by 575 and August by 559, which understates CPL by roughly RM 5 and RM 19 respectively.

`bin/meta` therefore reports `leads_form` (the reporting number), `cpl_form`, `leads_pixel`, and `leads_total` as four named columns, so nobody has to remember which one Meta means by `lead`. The dashboard generator's `LEAD_ACTIONS` mapping in `generators/unitar-ads-dashboard.md` needs the same treatment if it is ever pointed at this account.

## Gotchas hit during setup

- Meta's official `meta-ads` package cannot install on Windows. No Windows wheel exists for any published version, and there is no source distribution to build from. WSL was not installed on this machine either, so the project ships its own Graph API client.
- `chmod 600` does not restrict anything on NTFS. The `.env` file was locked with `icacls` instead, granting full control to `JORDAN\Jordan` and removing inheritance.
- `Set-Acl` needs `SeSecurityPrivilege` and fails unelevated. Recreating the file and applying `icacls` once is the way around it.

## Not connected

TikTok Ads and Google Ads are out of scope for this setup. Their starter kit recipes and scripts sit unused in `installations/ads-cli-starter-kit/` if either is wanted later. Google Ads carries a 1 to 3 business day wait for a developer token, so start that early if it ever comes up.
