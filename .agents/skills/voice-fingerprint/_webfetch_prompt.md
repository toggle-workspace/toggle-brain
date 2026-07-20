# WebFetch prompt template — voice-fingerprint live article extraction

Use this prompt verbatim (with placeholders filled) when running WebFetch on each top live article during Step 3 of the voice-fingerprint skill.

---

```
Extract verbatim the {LANG} body copy of this article. Specifically I need:

(1) Opening 3-4 sentences exactly as written, preserving all punctuation and bold markup.

(2) All H2 section headings (or first 10 if many).

(3) One full middle prose section showing sentence rhythm and how English technical terms
    (POS, dashboard, online, delivery, etc.) are woven into {LANG} sentences (if applicable).

(4) Any merchant quote/testimonial — note the EXACT language it appears in ({LANG} or English).
    Also note the attribution line format (name + role + city).

(5) Any references to market-specific compliance or platforms:
    - PH: BIR / PTU / SSS / PhilHealth / Pag-IBIG / DTI / SEC / GrabFood / Foodpanda / GCash / Maya / ₱ / PHP
    - MY: LHDN / MyInvois / DuitNow / RM / GrabFood / Foodpanda
    - TH: ภาษี / กรมสรรพากร / LINE MAN / GrabFood / ฿ / บาท
    - JP: 軽減税率 / インボイス / Suica / PayPay / ¥ / 円
    - ID: NPWP / OSS / GoPay / OVO / Rp / IDR
    (Add your market's equivalents if not listed above)

(6) The closing paragraph and any legal disclaimer block (verbatim if present).

(7) Punctuation conventions observed:
    - Em-dash (—) usage — count occurrences
    - Quote marks — straight vs curly, full-width vs half-width
    - Currency formatting (with/without space)

(8) Spelling conventions observed (if applicable):
    - British (colour, organise, programme) vs American (color, organize, program)
    - Count each side
    - Note any inconsistency within the same article

Preserve all exact characters, punctuation, and bold markup. Do NOT translate. Do NOT summarize.
```

---

## How to use

For each of the top 3-5 live articles identified in Step 2, run WebFetch with this prompt customized to the target language and market. Collect all 8 sections into a synthesis doc that becomes the input to Step 4 (fingerprint).

**Selection rule for which 3 articles to fetch:**
1. **Top traffic** (highest clicks in last 90d)
2. **Best query-space match** for the existing drafts being audited (if any) — e.g., if the drafts include comparison articles, pick a live comparison article
3. **Content-type diversity** — at least one comparison, one industry-guide, and one listicle if available, to capture register variations
