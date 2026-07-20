# Live {MARKET}-{LANG} Voice Fingerprint — Extracted from Production Articles

**Extraction date:** {DATE}
**Method:** WebFetch live `/{market_lower}/blog/` bodies + GSC 90d cross-reference.
**Confidence:** {HIGH / MEDIUM / LOW based on corpus richness} — {N} articles read end-to-end:
- `{slug-1}` ({clicks} cl / {imp} imp / pos {pos}) — {type / register}
- `{slug-2}` ({clicks} cl / {imp} imp / pos {pos}) — {type / register}
- `{slug-3}` ({clicks} cl / {imp} imp / pos {pos}) — {type / register}

**Corpus assessment:** {N total URLs in GSC, top driver {slug} at {clicks} cl}. {Describe: rich / medium / thin}.

**Why this doc exists:** Existing generic naturalness reviewer doesn't have dedicated {MARKET}-{LANG} detection logic. {Brief: what's market-specific about this language combination}.

---

## GSC traffic baseline (top 10-15 URLs, 90d)

| Slug | Clicks | Imp | CTR | Pos |
|---|---:|---:|---:|---:|
| {slug-1} | {N} | {N} | {N}% | {N} |
| ... | ... | ... | ... | ... |

{One-line summary: e.g., "{LANG} is the top traffic-driver among non-EN content on this blog surface."}

---

## Critical calibration vs other languages

EN-borrowing tolerance for this language: **{≤X%}**

Reasoning: {explain how this language naturalizes EN business terms — strict for CN/JP-kanji, permissive for BM/Tagalog/Taglish, native for PH-EN/MY-EN}

**What still fails (regardless of tolerance):**
- EN nouns from non-business vocabulary
- EN nouns where {LANG} has a fluent equivalent
- Long EN phrases inside {LANG} sentences
- Raw {non-LANG} merchant quotes (if applicable)

---

## The 12-15 Signature Patterns

### 1. Opening — direct + locally-anchored, never cinematic

**Live (article-1):**
> {verbatim opening}

**Live (article-2):**
> {verbatim opening}

**Pattern:** {Describe what live openings do — situation framing, problem statement, listicle preview, etc.}

**Anti-pattern detection:** {Specific grep pattern + threshold for hard-fail}

### 2. Compliance/payment vocabulary — {MARKET}-centric, NEVER cross-market

**Required {MARKET} compliance vocabulary:**
- {List: BIR/SSS/PhilHealth for PH; LHDN/MyInvois for MY; ภาษี for TH; etc.}

**HARD FAIL if any of these appear in {MARKET}-{LANG} body:**
- {Cross-market leakage list — e.g., LHDN in PH content, RM currency in TH content}

### 3. Currency — `{symbol}` or `{code}`, never cross-market

**Live:** {observed examples}

**Rule:** All money in {MARKET}-{LANG} body uses `{symbol}` OR ` {code} ` (with spaces). Hard fail if other-market currency appears.

### 4. Delivery integrations — per market

| Platform | Verdict | Citation framing |
|---|:-:|---|
| {Platform 1} | ✅ / ⚠️ / ❌ | {framing rule} |
| {Platform 2} | ✅ / ⚠️ / ❌ | {framing rule} |

**Source of truth:** {sales deck / claim manifest / your market's web pages}

### 5. Cultural anchors — locally-built signal

**Required signal (article should contain ≥2):**
- Geography: {list}
- Cultural: {list}
- Business: {list}
- Tier-A merchants or local brands: {list, if applicable}

### 6. Spelling convention

{Per-language note — strict American/British/Hybrid, or N/A for non-Latin}

### 7. Em-dash policy

{Per-market policy — strict no for some markets; conversational OK for EN-native markets}

### 8. Merchant quotes — content-type-dependent

{Live observations across article types — comparison usually no quotes, story usually yes}

### 9. Closing disclaimer

{Required / optional per article type — quote canonical text}

### 10. Section headers — pattern

{Topical / numbered / question-form — never narrative-fragment}

### 11. BLUF / "At a Glance" box — convention for this market

{Used / not used / conditional}

### 12. Cross-language callout structure ("What this means for you" type)

{Live convention — usually NOT used, flag if imported from EN template}

### 13. Native connectors (for non-EN languages)

{List of natural connectors in {LANG} — replace EN-grammar bridges}

### 14. Code-switching rules (for code-switched languages: Taglish, code-switch BM, etc.)

{Specific code-switch density rules + which EN words are naturalized}

### 15. Particles / markers / honorifics

{Per-language signature markers — terminal particles for certain languages; ครับ/ค่ะ for Thai; po/opo for Tagalog; etc.}

---

## Structural-block anti-patterns

| Block | Live observation | Anti-pattern in drafts |
|---|---|---|
| BLUF box | {present/absent} | {present/absent in drafts} |
| Cinematic opening | {present/absent} | {present/absent} |
| "What this means for you" callouts | {present/absent} | {present/absent} |
| Walkaway standalone section | {present/absent} | {present/absent} |
| Raw foreign-lang merchant quotes | {present/absent} | {present/absent} |
| Generic template opener | {present/absent} | {present/absent} |

---

## What's actually unique about {MARKET}-{LANG} failure mode

| Risk | This market+lang |
|---|---|
| Translation residue from EN | {high / medium / low — depends on whether writers are native} |
| Code-switch density risk | {high / medium / low — depends on naturalization} |
| Wrong compliance system | {describe: e.g., LHDN appears in PH content = fail} |
| Wrong delivery platforms | {market-specific list} |
| Wrong currency | {market-specific} |
| Cultural anchor density | {market-specific anchor list} |
| Spelling convention | {per language} |
| Em-dash policy | {per market} |
| BLUF box | {per market} |
| Generic-template risk | {high / medium / low} |

**The single biggest {MARKET}-{LANG} failure mode = {specific risk}.**

---

## What to put in the agent

Hard-fail detectors:
1. {market-specific}
2. {market-specific}
...

Soft-flag detectors:
1. {market-specific}
2. {market-specific}
...

---

## Related docs

- `<your-content-core-dir>/claim_manifest_{MARKET}.md` — claim discipline
- `<your-content-core-dir>/voice_{MARKET}.md` — earlier voice work (if exists)
- `.claude/agents/{market_lower}-{lang_lower}-naturalness-reviewer.md` — agent built from this fingerprint
- Sister fingerprint docs: other `live_*_voice_fingerprint.md` files in your content core dir
