---
client: kynare
title: Campaign structure, budget plan and tracker state
date: 2026-08-12
source: "Kynare Budget & Performance Tracker.xlsx" (Jordan's Desktop), read 2026-08-12
last_reviewed: 2026-08-12
---

# Kynare — campaign structure and budget

Everything below comes from the client budget and performance tracker workbook, read on 2026-08-12.

## The three campaigns

All three share: objective **Leads**, funnel stage **MOF**, budget type **ABO**, targeting type **Prospecting**, media buyer **Toggle**, product **PT Hybrid program**, and creative produced by Toggle.

| Platform | Conversion objective | Destination | Monthly | Daily (÷30) | Share |
|---|---|---|---|---|---|
| Meta | Instant Lead Gen Forms | Meta Instant Lead Gen Form | RM2,000 | RM66.67 | 44.4% |
| Meta | Message Conversations | WhatsApp Direct Messages | RM1,000 | RM33.33 | 22.2% |
| TikTok | Instant Lead Gen Forms | TikTok Instant Lead Gen Form | RM1,500 | RM50.00 | 33.3% |
| | | **Total** | **RM4,500** | **RM150.00** | **100%** |

TikTok carries the remark: run as Spark Ads.

### Shared targeting

- **Location:** PJ Section 13 and Mont Kiara, both inside a single location field per campaign
- **Language:** Malay and English
- **Age:** 18 to 55+
- **Gender:** Both
- **Exclusions (all three):** existing followers, page engagers, video watchers, current purchasers

### Audience

- **Meta** runs an interest stack: Physical fitness, Personal Training/Fitness, Fitness services, Personal Training/Nutrition, National Personal Training Institute, Physio Pilates, Exercise physiology, Fitness equipment and clothing, Fitness and wellness. Physical fitness and Fitness equipment and clothing each appear twice in the list.
- **TikTok** runs broad with no interest targeting.

## Budget calendar

Flat RM4,500 a month, August through December 2026.

| Channel | Monthly | Aug to Dec total |
|---|---|---|
| Meta | RM3,000 | RM15,000 |
| TikTok | RM1,500 | RM7,500 |
| Google | RM0 | RM0 |
| **Total** | **RM4,500** | **RM22,500** |

This sits at the top of the range the client modeled. August through October comes to RM13,500, matching the RM13,500 ceiling in the brief.

**There is no November step-up for the doctor arm.** The client modeled that at an extra RM3,000 to RM5,000 a month. Adding it for November and December would take the 2026 total from RM22,500 to between RM28,500 and RM32,500.

## Accounts and reporting plumbing

| Item | Value |
|---|---|
| Meta ad account | "Kynare Ecosystems", `act_1053396740745682` |
| Meta Dataslayer connection | `User_Xian_Lau` |
| TikTok ad account | "KYNARE WELLNESS & PERFORMANCE_adv", `7670930512726458375` |
| TikTok Dataslayer connection | `jordan420` |
| Pull window | 2026-08-01 to 2026-12-31 |
| Workbook owner | `pinto.jordan@gmail.com` |

Both Dataslayer queries refreshed successfully on 2026-08-12.

## Launch status

Every row from 1 August to 12 August shows zero cost with `--` in the campaign name on both the Meta and TikTok trackers. **Nothing has launched or spent.**

## Problems in the workbook

### 1. It still carries Ikonik's data (fix before sharing)

The file was copied from the Ikonik tracker and the remarks columns were never cleared:

- Meta sheet row 62 and TikTok sheet row 300: "Added new locations into the Whatsapp and lead gen campaigns: Medan, Jakarta, Singapore, Muar, Johor"
- TikTok sheet row 399: "Changed destination link from homepage to taplink (https://taplink.cc/ikoniktiktok)"
- TikTok sheet row 408: "Reallocated RM2000 from TT direct messages to TT instant lead gen forms..."

None of these are Kynare decisions. They are another client's optimization log, including that client's link, sitting in a file named for Kynare. Clear them before anyone outside Toggle opens it.

### 2. The Google column is broken, not just empty

The Budget Sheet references a `Google Budget Tracker` sheet that does not exist in the workbook, so every month from July onward returns `#N/A` and the annual Google total is `#N/A`.

Separately, the January through June rows point the Meta SUMIFS at `'TikTok Budget Tracker'!B:B` and the Google SUMIFS at `'TikTok Budget Tracker'!J:J`, which is the wrong sheet and the wrong columns. All of it is copy residue.

### 3. Two different daily budgets

- The **Ad Campaign Structure** tab divides monthly budget by 30, giving **RM150 a day**.
- The **Budget Sheet** tab divides by remaining days in the month (20 as of 2026-08-12), giving **RM225 a day**: RM100 Meta lead gen, RM50 WhatsApp, RM75 TikTok.

Burning RM4,500 across 20 days is a materially different launch from RM150 a day. Pick one before the media buyer starts.

### 4. Nothing measures the conversion that matters

Every campaign optimizes to a lead form fill or a WhatsApp message, and the tracker stops at cost per lead. The clinic's real conversion event is the walk-in assessment. There are no columns for assessments booked, assessments attended, or packages signed, so the RM180 to RM250 CAC in the brief cannot be verified from this workbook. See `../KPI.md`.

## Recommendations on the structure itself

- **Optimize toward assessment bookings, not paid sign-ups.** At RM100 to RM150 a day and RM180 to RM250 CAC the campaigns produce well under one sign-up a day. Meta wants roughly 50 events per ad set per week to optimize properly, and sign-ups will never reach that.
- **Keep both locations in one ad set.** PJ Section 13 and Mont Kiara are close enough that splitting by radius would put the two ad sets into the same auction. Attribute location from the form field instead.
- **The RM1,000 WhatsApp campaign is likely too thin to optimize.** The RM2,000 Meta lead form campaign should gather enough events to stabilize. Consider holding the WhatsApp budget until CPL is established on the form, then splitting.
- **Report by age band from week one.** The client base skews older while the floor is set at 18. Cheap leads from the young end flatter CPL and damage CAC.
- **Revisit Google.** An older, pain-led audience searches for knee pain, back pain and post-surgery rehab, and Google currently has zero budget.
- **Nothing addresses re-signing.** Current purchasers are excluded everywhere, which is right for prospecting, but with a six-week cycle and a three-month contract the renewal moment is a real revenue event with no media behind it.
