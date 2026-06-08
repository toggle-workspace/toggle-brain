---
client: audaura-unitar
title: Campaign naming convention
last_reviewed: 2026-06-08
deadline: 2026-11-15
status: pending implementation across Meta + Google + TikTok ad accounts
---

# UNITAR — campaign naming convention

> **Hard deadline:** the new convention must be implemented across UNITAR
> Meta + Google + TikTok ad accounts by **2026-11-15**.

## Why a binding convention

Before this, campaign names varied by platform and operator, which made
reporting per-campus impossible without manual reconciliation. The new
convention is enforced because the per-campus net-lead-gap KPI
(`clients/audaura-unitar/KPI.md`) requires platform-agnostic per-campus
roll-ups.

## The convention

_(To be locked in by Zaid + Shaun + Tiffany. Stub below — fill before
implementation deadline.)_

### Format

```
<TREE>_<CAMPUS>_<OBJECTIVE>_<FUNNEL>_<CREATIVE-PACK>_<YYYY-MM>
```

| Token | Allowed values | Notes |
|---|---|---|
| `<TREE>` | `UC` / `ONLINE` / `SELANGOR` / `UIU` | Hard separation — never mix trees per C2 2026 doctrine. |
| `<CAMPUS>` | Campus code (10 campuses — list TBD) | Source of per-campus roll-up. |
| `<OBJECTIVE>` | `LEAD` / `TRAFFIC` / `BAU` / `RETARGET` | Meta/Google/TikTok objective. |
| `<FUNNEL>` | `TOFU` / `MOFU` / `BOFU` / `RETARGET` | Funnel stage. |
| `<CREATIVE-PACK>` | `B1` / `B2` / `B3` / `ESAC` / `MED` | Batch or program code. |
| `<YYYY-MM>` | Month launched | For cohort comparison. |

### Examples

```
UC_JOHOR_LEAD_TOFU_B3_2026-06
UC_SHAH-ALAM_RETARGET_BOFU_ESAC_2026-06
SELANGOR_KL_LEAD_MOFU_MED_2026-06
```

## Validation

The `/campaign-namer` skill _(future)_ validates a proposed name before it's
typed into Ads Manager. Until that skill exists, validate manually against
this file.

## Open items before lock-in

- [ ] Confirm 10 campus codes (Johor, Kedah, Perak, Shah Alam, KL, ?…)
- [ ] Decide whether `<FUNNEL>` and `<OBJECTIVE>` can ever overlap (e.g. `RETARGET` appears in both).
- [ ] Confirm cross-platform support (does Google Ads max length cap us at any token?).
- [ ] Decide migration path: rename existing campaigns or only enforce going forward?

## Related

- KPI: `clients/audaura-unitar/KPI.md`
- C2 2026 strategy: `~/Desktop/Code/tg/TG/C2 2026/...`
