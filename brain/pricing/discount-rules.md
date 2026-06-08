---
last_reviewed: 2026-06-08
owner: TBD
---

# Discount rules

How discounts stack. Rules are applied in the order listed below — the `/quote` generator lists which rule fired and why on every quote.

> Percentage values `TBD` are pending confirmation by Viknesh + Zaid.

---

## Stacking order

1. Sector discount (NGO / education) — applied to subtotal.
2. Multi-month retainer discount — applied to retainer line items only.
3. Annual prepay discount — applied after multi-month.
4. Partner referral discount — applied to subtotal after the above.
5. First-month onboarding waiver — applied last, only to the first invoice.

Rush surcharges (negative discounts) are added on top of the final discounted total. A quote never shows a negative total; minimum effective fee floor is set per-client.

---

## Rule: multi-month retainer discount

- **Applies to:** retainer line items with a committed term length.
- **3–5 months committed:** TBD% off retainer fees.
- **6–11 months committed:** TBD% off retainer fees.
- **12+ months committed:** TBD% off retainer fees (stacks with annual prepay below).
- **Does not apply to:** ad spend, one-off projects, line items.

---

## Rule: NGO / non-profit discount

- **Applies to:** registered non-profits (proof of registration required).
- **Discount:** TBD% off all fees.
- **Stacks with:** multi-month, annual prepay. Does NOT stack with partner referral.
- **Does not apply to:** ad spend.

---

## Rule: education sector discount

- **Applies to:** accredited educational institutions (universities, colleges, K–12 schools).
- **Discount:** TBD% off all fees.
- **Stacks with:** multi-month, annual prepay. Does NOT stack with NGO discount.
- **Does not apply to:** ad spend.

---

## Rule: first-month onboarding waiver

- **Applies to:** new retainer engagements with 3+ month commitment.
- **Discount:** TBD% off month-one retainer fees only (default `TBD` — Viknesh to confirm whether this is 50%, 100%, or a flat amount).
- **Stacks with:** every other rule.
- **One-time only:** does not reapply on renewal.

---

## Rule: partner referral discount

- **Applies to:** new clients introduced by a named partner in `brain/partners-stack.md`.
- **Discount:** TBD% off first 3 months of fees.
- **Stacks with:** multi-month only. Does NOT stack with NGO or education.
- **Partner payout:** handled separately (see `brain/partners-stack.md` referral terms).

---

## Rule: annual prepay discount

- **Applies to:** clients prepaying 12 months of retainer fees in one invoice.
- **Discount:** TBD% off the annual total.
- **Stacks with:** multi-month, sector discounts.
- **Cash flow note:** Viknesh approves all annual prepays — surface to him before quoting.

---

## Rule: rush surcharge (negative discount)

- **Applies to:** deliverables turned around in under 72 hours, or campaigns going live in under 7 days from scope sign-off.
- **Surcharge:** TBD% added to affected line items.
- **Surface clearly** on the quote — not hidden in the total.

---

## Notes

- Every applied discount must appear as a labelled line on the quote with the rule name.
- If a client qualifies for multiple sector discounts (e.g. an education NGO), use the higher of the two — don't stack sector discounts.
- Discounts are a sales lever, not a default. Quote at list price first; discount on rationale.
