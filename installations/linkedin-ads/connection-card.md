# LinkedIn Ads connection card

Which ad account ID belongs to which client, and what reaches them. Setup lives in `installations/linkedin-ads/install.md`; the client is `tools/linkedin-ads/li`.

**Last verified:** 2026-10-18, by `tools/linkedin-ads/li accounts`.

---

## The login

| | |
|---|---|
| **App** | Toggle Solutions Ads Reporting |
| **Client ID** | `788mpnv8ec2p5m` |
| **Products** | Advertising API, Development tier (approved 2026-10-18) |
| **Token scopes** | `r_ads`, `r_ads_reporting` |
| **Approving login** | Jordan's LinkedIn |
| **Accounts covered** | 8 |
| **Machines connected** | Jordan's Windows desktop (2026-10-18). MacBook not yet connected. |
| **Access token expires** | 2026-12-17 (refresh token valid to 2027-10-18) |

The token reaches every ad account where the approving login holds a Campaign Manager role. Adding a client means the client adds that login to their ad account; no new token is needed.

---

## Mapped accounts

These ad account IDs match a client folder under `clients/`.

| Ad account ID | Account name | Currency | Client slug |
|---|---|---|---|
| `547313427` | VoiceRun | USD | `voicerun-lawrence-client` |

---

## Other accounts this login can read

No client folder matches these. Do not report on them without asking Jordan.

| Ad account ID | Account name | Currency | Serving on 2026-10-18 |
|---|---|---|---|
| `507213217` | LTSE Services, Inc. | USD | Runnable |
| `508407307` | Federated Wireless | USD | Billing hold |
| `508652715` | Jordan's Ad Account | USD | Billing hold |
| `508655722` | Jordan's Ad Account | MYR | Billing hold |
| `511651562` | bitvoodoo Apps | USD | Runnable |
| `517020222` | SECOM Smart Malaysia | USD | Billing hold |
| `517366565` | SECOM Smart Malaysia | MYR | Runnable |
