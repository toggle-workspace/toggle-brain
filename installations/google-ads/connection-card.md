# Connection card: Google Ads

The scope of record for this project's Google Ads connection. Update it whenever a login profile, an account, or a route changes. Setup steps live in `install.md`.

| Field | Value |
|---|---|
| Platform | Google Ads API (REST, `v25`) |
| Tool | `tools/google-ads/gads` launcher + `gads.py` beside it (stdlib Python on uv managed CPython 3.12, or python3) |
| Access level | **Read only.** No write command exists, and `raw` is allowlisted to search and metadata paths. |
| Cloud project | `adroit-nuance-510512-k8`, display name `toggle-google-ads-reporting`, number `801354963863`, owned by jordan@toggle.solutions |
| API access level | **Explorer**, approved 2026-10-03. 2,880 operations a day on live accounts plus 15,000 on test accounts. Basic access needs brand verification first. |
| Developer token | Not needed. Google sunset developer tokens on 2026-09-09 and moved access levels onto Cloud projects. The token in the Toggle manager account's API Center no longer controls anything. |
| OAuth app | Google Auth Platform app **Ads Reporting**: External, In production, unverified on purpose (100 user cap). Desktop client **Ads Reporting Dashboard**. |
| Credentials | Per machine, never in the repo: `ads-oauth-client.json` plus one `application_default_credentials.json` per profile, in the gcloud folder (`%APPDATA%\gcloud` on Windows, `~/.config/gcloud` on macOS) |
| Verify command | `tools/google-ads/gads --profile toggle auth status` |
| Setup built | 2026-10-03 on Jordan's Windows desktop. MacBook pending. |

---

## Profiles

| Profile | Login | gcloud folder | Default route |
|---|---|---|---|
| `toggle` | jordan@toggle.solutions | `gcloud` | Toggle Solutions manager account `6738385427` |
| `personal` | Jordan's personal Google login | `gcloud-personal` | none (direct) |

Teammates sign in their own toggle.solutions login as `toggle`. Their account list will differ from Jordan's.

---

## Routes for the `toggle` profile

Verified 2026-10-03. Pass the route with `--login-cid`.

**Through the Toggle manager account `6738385427`** (the default, no flag needed)

| Account | ID | Status |
|---|---|---|
| CDC Management Development (M) Sdn Bhd | `4547947408` | Enabled. Smoke tested: 7 day campaign data returned. |
| Cadler Group | `7243223737` | Enabled |
| Sistem Televisyen Malaysia Berhad | `7073055290` | Enabled. Also reachable direct. |
| Toggle Solutions | `8402701993` | Enabled |
| Al Hidayah Publisher | `1879257064` | Canceled |
| (no name) | `3978234619` | Closed |

**Direct** (`--login-cid direct`)

| Account | ID | Currency | Status |
|---|---|---|---|
| SolDevelo | `2597602829` | PLN | Enabled |
| Ikonik Eye Specialist Centre | `5129107395` | MYR | Enabled. Smoke tested. |
| yasoon GmbH | `4881511817` | EUR | Enabled |
| VoiceRun | `1162306091` | USD | Enabled |
| DrinkELT | `4059441584` | MYR | Enabled |
| ij-solutions | `3100610594` | EUR | Enabled. Also under Brighttail. |
| (unknown) | `9172606846` | | `CUSTOMER_NOT_ENABLED`: deactivated or never set up |

**Through Brighttail Digital's manager account `7709261217`** (`--login-cid 7709261217`)

Enabled: codefortynine GmbH `5317559146` (smoke tested), eazyBI `6015771977`, Refined `9066151006`, Narva (EU) `3874107023`, E7 Solutions LLC `3282313642`, Yasoon_Legacy `3177403835`, Avontus US `4228016270`, Catapult Labs `2803252133`, Elevatic `3813726009`, Released.so `3250429617`, ij-solutions `3100610594`. Run `tools/google-ads/gads --profile toggle tree 7709261217` for the full list, including canceled accounts and the sub-manager accounts.

---

## Routes for the `personal` profile

Verified 2026-10-03.

**Through Audaura Digital's manager account `8589062821`** (`--login-cid 8589062821`)

| Account | ID | Status |
|---|---|---|
| UNITAR - MY - Degree | `9059202225` | Enabled. Smoke tested: 57 active campaigns returned. |
| UNITAR - MY - Pre-U/New Courses | `7418262431` | Enabled. Smoke tested. |
| UNITAR - MY - Masters + Doctorate | `3845525084` | Canceled |

**Direct** (the default for this profile)

| Account | ID | Status |
|---|---|---|
| Al Hidayah Publisher | `4111928284` | Enabled |
| KM Animal Clinic & Surgery | `3709465491` | Enabled |
| PCM Puchong Motor Sdn Bhd | `6931832084` | Enabled |
| PCM Ipoh | `4444951739` | Enabled |
| Wizu / Fusecon | `8834386656` | Enabled |
| Giat Solutions | `5476647688` | Enabled |
| Petsmore | `3253688833` | Suspended |
| (unknown) | `9987700470`, `7209865052`, `4603783842` | `CUSTOMER_NOT_ENABLED` |

The `personal` profile also reaches the Toggle manager account and its accounts. Use `toggle` for those.

---

## White-label rule

Some accounts reached through the `personal` profile belong to a partner agency that does not know Toggle is involved. Query them only with `personal`. Never link them to the Toggle manager account, and never invite a toggle.solutions user to them. Ask Jordan before changing access on any account in the `personal` tables.
