# TikTok Ads connection card

Which advertiser ID belongs to which client, and what reaches them. Setup lives in `installations/tiktok-ads/install.md`; the client is `tools/tiktok-ads/tt`.

**Last verified:** 2026-10-08, by `tools/tiktok-ads/tt accounts`.

---

## The login

| | |
|---|---|
| **App** | Toggle Solutions TikTok Brain Ads |
| **App ID** | `7692121001227878421` |
| **Approving login** | `jordan420` (pinto.jordan@gmail.com) |
| **Accounts covered** | 16 |
| **Redirect URL** | `https://toggle.solutions` (no trailing slash) |

Authorization is user level, so the token covers whatever this login reaches. There is no per-account toggle. Adding a client means re-consenting, not editing this file.

---

## Mapped accounts

These advertiser IDs match a client folder under `clients/`.

| Advertiser ID | Account name | Company on TikTok | Client slug |
|---|---|---|---|
| `7508692797466329106` | Unitar Capital Sdn. Bhd. Ad Account | UNITAR EDUCATION SDN. BHD. | `audaura-unitar` |
| `7486332711721156609` | Audaura Digital0327 | Audaura Digital | `audaura-unitar` (agency side) |
| `7218513919218925570` | Ikonik | IKONIK EYE SPECIALIST AND GENERAL HEALTH CENTRE | `ikonik` |
| `7665283282359107604` | Ikonik Ad Account V2 | IKONIK EYE WELLNESS CENTRE PLT | `ikonik` |
| `7351287858143215617` | IJN | IJN College | `ijn-university-college` |
| `7554702566660292625` | KM Animal Clinic and Surgery | KM Animal Clinic and Surgery | `km-vet` |
| `7670930512726458375` | KYNARE WELLNESS & PERFORMANCE_adv | KYNARE PERFORMANCE & WELLNESS | `kynare` |
| `7504972427773280273` | Al-Hidayah Publisher | AL HIDAYAH HOUSE OF PUBLISHERS SDN. BHD. | `al-hidayah-publication` |
| `7599576854068117512` | littlemanja_1 | Meraaki Global Sdn Bhd | `meraaki-digital` |

**Ikonik runs on two accounts.** `7218513919218925570` is the older Eye Specialist entity and `7665283282359107604` is the newer Eye Wellness Centre PLT. Any Ikonik report has to state which one it covers, or pull both and say so.

---

## Unmapped accounts

Reachable by the token but with no confirmed client folder. Confirm the mapping before quoting any of these in a client-facing report.

| Advertiser ID | Account name | Company on TikTok | Note |
|---|---|---|---|
| `7555810831858991105` | Puteri Malaysia | A.P.S Manja Sdn. Bhd | slug unconfirmed |
| `7566487218865405953` | SECOM SMART (MALAYSIA) SDN. BHD. | SECOM SMART (MALAYSIA) SDN. BHD | slug unconfirmed |
| `7662194739550257153` | MABECS SDN. BHD._adv | MABECS SDN. BHD. | slug unconfirmed |
| `7663071563654496272` | SISTEM TALIVISYEN MALAYSIA BERHAD_kk76bx | SISTEM TALIVISYEN MALAYSIA BERHAD | slug unconfirmed |
| `7296329069321306113` | MBS Network 2 | MBS Network | slug unconfirmed, Asia/Singapore timezone |
| `7047721623775969282` | MBS Network1231 | MBS Network | slug unconfirmed |

---

## Flags

- **`7529542692955930640` Al Hidayah Publisher (Not in Use)** carries `ROLE_CHILD_ADVERTISER` and is named as retired. Report on `7504972427773280273` instead.
- **`7486332711721156609` Audaura Digital0327** is `STATUS_SELF_SERVICE_UNAUDITED`, meaning it was never fully verified with TikTok. Reporting on it may come back empty.
- **`7296329069321306113` MBS Network 2** is the only account on `Asia/Singapore`. Every other account is `Asia/Kuala_Lumpur`, so a day boundary on that account is not the same day boundary as the rest.
- Every account bills in **MYR**.

## Not on TikTok

Clients with a folder under `clients/` but no account in this list, as of 2026-10-08: `petsmore`, `cdc-strathclyde`, `city-university`, `gourmet-butchers`, `soldevelo`, `ICMS`. If one of these is expected to be here, it is a Business Center permission gap. See the troubleshooting table in `install.md`.
