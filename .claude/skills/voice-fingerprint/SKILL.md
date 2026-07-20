---
name: voice-fingerprint
description: Extract a live-brand-voice fingerprint for a new market+language content surface, then scaffold a dedicated naturalness reviewer agent. Generalizes manual voice-fingerprint work into a ~30-minute onboarding for any new market (PH-Taglish, JP secondary, ID, VN, TH-EN-knowledge, etc.). Pulls GSC traffic data, fetches top 3-5 live articles, drafts a fingerprint doc with calibrated detectors, scaffolds a naturalness reviewer agent, and audits existing drafts if present.
allowed-tools: Read, Glob, Grep, Write, Edit, Bash, WebFetch, WebSearch
argument-hint: "<market> <lang>  e.g.  TH EN  |  PH Taglish  |  JP JP  |  ID BM"
---

# /voice-fingerprint — Multi-Language Naturalness Onboarding

Run this skill when your team expands content into a new market+language combination, OR when an existing market+language doesn't yet have a fingerprint + dedicated naturalness reviewer agent.

The skill formalizes a proven methodology for extracting live brand voice from production-ranking articles and encoding it into reusable agent-level rules — built from evidence across CN, BM, and PH-EN surfaces. It applies consistently in ~30 minutes instead of ~3 hours of manual research.

**Do NOT run this skill for:**
- Any market+language that already has a dedicated naturalness reviewer agent in `.claude/agents/`
- Any market+language that already has a fingerprint doc in your content core directory (see SETUP.md)

**Do run this skill for:**
- New market+language combinations with no existing agent
- Markets with thin content history where competitor/media corpus is needed as a substitute
- Any expansion where you want a living ruleset that an automated agent can enforce

---

## Arguments

`<market>` — e.g., `MY` | `PH` | `TH` | `JP` | `ID` | `VN` (or your own market codes)
`<lang>` — e.g., `EN` | `BM` | `CN` | `TH` | `JP` | `Tagalog` | `Taglish` | `ID` | `VN`

Validate inputs. If the combination is unknown or ambiguous, stop and ask the user to clarify.

---

## The 6-step pipeline

### Step 1 — Validate + check for duplicates

```bash
# Check if fingerprint already exists for this market+lang
ls "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}/<your-content-core-dir>/live_{market_lower}_{lang_lower}_voice_fingerprint.md" 2>/dev/null
# Check if agent already exists
ls "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}/.claude/agents/{market_lower}-{lang_lower}-naturalness-reviewer.md" 2>/dev/null
```

If either exists, ask the user: "Fingerprint/agent already exists for {market}+{lang}. Refresh? (yes/no)". If no, stop.

### Step 2 — Pull GSC traffic for the market's blog surface

Generate `<your-tracker-venv>/_{market_lower}_{lang_lower}_traffic_pull.py` from the template (see `_template_traffic_pull.py` in this skill folder).

Customize:
- URL prefix filter: `/{market_lower}/blog/`
- Language detector (slug tokens):
  - **CN**: pinyin pattern (`-pos-xitong`, `kafeidian`, `huiyuan`, `canting`)
  - **BM**: Malay tokens (`panduan`, `cara`, `restoran`, `kafe`, `bisnes`, `untuk`, `yang`, `mengekalkan`)
  - **TH**: Thai script `[ก-๛]` in slug
  - **JP**: Japanese script `[ぁ-ゔァ-ヴー一-龯]` in slug
  - **Tagalog**: Tagalog tokens (`para`, `paano`, `kumita`, `negosyo`, `pinoy`, `tindahan`)
  - **EN**: no non-ASCII; for cross-market EN (e.g., PH-EN), filter by anchor list (BIR/PHP/Manila for PH-EN; 円/JPY for JP-EN)

Run the script:
```bash
cd "<your-tracker-venv>" && .venv/bin/python3 _{market_lower}_{lang_lower}_traffic_pull.py
```

**Decision branch on corpus size:**
- **≥10 URLs with >20 clicks** → RICH corpus → use live articles for fingerprint
- **3-10 URLs with >5 clicks** → MEDIUM corpus → use top 3 live + supplement with competitor blog
- **<3 URLs with traffic** → THIN corpus → pivot to competitor + market-media (e.g., for PH-Taglish: local SaaS/retail blogs + major business media)

### Step 3 — Fetch top 3-5 live articles

WebFetch the top live articles (or competitor articles if thin corpus). For each, extract:
- Opening 3-4 sentences verbatim
- All H2 section headings
- One middle prose section (rhythm sample)
- Any merchant quote + the language it appears in
- Closing paragraph + disclaimer presence
- Punctuation conventions (em-dashes, quote marks, currency formatting)
- Spelling conventions (American vs British, where applicable)

**Prompt template for each WebFetch:** see `_webfetch_prompt.md` in this skill folder.

### Step 4 — Build the fingerprint doc

Copy `_template_fingerprint.md` to `<your-content-core-dir>/live_{market_lower}_{lang_lower}_voice_fingerprint.md`.

Fill placeholders:
- `{MARKET}` / `{LANG}` / `{MARKET_LOWER}` / `{LANG_LOWER}`
- GSC baseline table (top 10-15 URLs)
- 15 signature patterns — fill in observations from Step 3 WebFetch
- Code-switch density calibration (see calibration heuristics below)
- Cultural anchor list (research the market)
- Compliance vocabulary (research the market — BIR/SSS/PhilHealth for PH; LHDN/MyInvois for MY; ภาษีมูลค่าเพิ่ม for TH; 軽減税率 for JP)
- Currency convention (₱/PHP, RM/MYR, ฿/THB, ¥/JPY)
- Closing disclaimer canonical text (extract from one live article)
- Cross-market leakage list (what MUST NEVER appear: e.g., for PH content — LHDN/RM/Bangsar/円)

**Code-switch density calibration heuristics (derived from CN/BM/PH-EN fingerprinting work):**
- **Logographic script (CN, JP-Kanji)**: ≤20% EN tolerance — strict, EN feels foreign
- **Native Latin-script EN (PH-EN, MY-EN)**: native — measure cultural-anchor density instead of EN density
- **Latin-script with EN business borrowing (BM, ID)**: ≤30% EN tolerance — EN technical terms naturalized
- **Script-mixed (Thai with bare EN)**: ≤15% EN tolerance — EN sticks out more in Thai than in BM
- **Romanized non-native (Tagalog/Taglish)**: ≤40% EN tolerance — Taglish IS code-switching by nature

### Step 5 — Scaffold the naturalness reviewer agent

Copy `_template_agent.md` to `.claude/agents/{market_lower}-{lang_lower}-naturalness-reviewer.md`.

Fill placeholders:
- Agent name + description
- Reference to the fingerprint doc just built (using your content core dir path)
- Hard-fail detectors customized for the market:
  - Cross-market leakage list (what must never appear)
  - Wrong-currency detector
  - Em-dash policy (per-market rule)
  - Cultural anchor minimum
  - Delivery-platform allowed list
- Soft-flag detectors customized
- Output format (consistent across all naturalness agents)

**Important:** Custom agents only register at session startup. Restart Claude Code after scaffolding so the new agent is available.

### Step 6 — Audit existing drafts (if any)

Check for existing drafts:
```bash
ls "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}/<your-content-drafts-dir>/{MARKET}/" | grep -i "{lang_lower}\|_{LANG}_" 2>/dev/null
```

For each draft found, run the Python audit (template in `_audit_script.py`) that executes the agent's hard-fail detectors. Surface verdict per draft:
- HARD-BLOCK / FULL-REWRITE → user decides if you rewrite immediately or defer
- SOFT-BLOCK → list decisions needed
- SHIP-READY → no changes needed

---

## Output

End the session by surfacing:

1. **Files created:**
   - `_traffic_pull.py` script
   - `live_{market}_{lang}_voice_fingerprint.md`
   - `{market}-{lang}-naturalness-reviewer.md` agent
2. **GSC baseline summary** (corpus richness + top URLs)
3. **Audit verdict** for each existing draft (if any)
4. **Decisions needed** (numbered list — BLUF/delivery/disclaimer/etc.)
5. **Next steps:** restart Claude Code so the new agent registers, then either rewrite drafts (if HARD-BLOCK) or proceed to ship.

Write a worklog entry summarizing the session (your project's worklog location).

---

## Hard constraints (do NOT)

- Do NOT run for markets/languages that already have agents — check `.claude/agents/` first
- Do NOT generalize blindly from one data point if corpus is thin — pivot to competitor/media corpus and flag the lower confidence in the fingerprint
- Do NOT auto-rewrite drafts during this skill run — surface verdict, ask the user before rewriting
- Do NOT update shared ruleset files (feedback_*, memory) without user approval — only create new project-specific fingerprint docs
- Do NOT flip any draft to live/published status

---

## Cost expectation

~30-45 min wall time (vs ~3 hr manual). ~80-120K tokens. Most cost in Step 3 (WebFetch live articles) + Step 4 (fingerprint synthesis).

If you need to dig into competitor/media corpus (thin live corpus case), add 30-45 min.

---

## Related files (in this skill folder)

- `_template_traffic_pull.py` — GSC pull script template
- `_template_fingerprint.md` — fingerprint doc template
- `_template_agent.md` — naturalness reviewer agent template
- `_webfetch_prompt.md` — WebFetch prompt for live article extraction
- `_audit_script.py` — Python audit template for existing drafts
- `SETUP.md` — dependencies + configuration guide for new teammates
