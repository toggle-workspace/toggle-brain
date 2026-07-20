"""Audit template for voice-fingerprint skill — Step 6.

Replace the configuration constants below, then run against your drafts to verify
they pass the naturalness agent's hard-fail detectors before publishing.

Run from your project root (the directory containing your drafts folder).

Usage:
    python3 _audit_script.py
"""
import re
import pathlib

# ---- CUSTOMIZE PER MARKET/LANG ----

# Glob pattern for drafts to audit.
# e.g., "content/drafts/PH/PH-*.md" or "04_drafts/{MARKET}/{glob}"
DRAFTS_GLOB = "<your-drafts-dir>/{MARKET}/{glob}"  # e.g., "drafts/PH/PH-*.md"

# Cross-market leakage detector — terms that must NEVER appear in this market+lang body.
# Update to match the terms that belong to OTHER markets, not this one.
# Examples:
#   PH drafts: ban LHDN/MyInvois/DuitNow/Bangsar/RM currency terms
#   TH drafts: ban LHDN/MyInvois/DuitNow/ringgit/peso/yen
#   MY drafts: ban BIR/PhilHealth/SSS/PromptPay/baht/peso
BANNED_TERMS = re.compile(
    r"\b(REPLACE_WITH_BANNED_TERMS_FOR_THIS_MARKET)\b",
    re.I,
)

# Wrong-currency detector.
# Update: remove your market's correct currency, keep only wrong ones.
# e.g., for PH drafts (correct = ₱/PHP): flag RM/MYR/THB/JPY/IDR/VND
WRONG_CURRENCY = re.compile(r"\b(REPLACE_WITH_WRONG_CURRENCY_PATTERNS)\b")

# Cultural anchors — ≥3 required in body for a hard-fail check.
# Replace with market-specific list. Examples:
#   PH: ['Philippines', 'Filipino', 'BIR', 'Manila', 'Cebu', 'BGC', 'sari-sari', 'OFW']
#   MY: ['Malaysia', 'KL', 'LHDN', 'mamak', 'kopitiam', 'Klang Valley']
#   TH: ['ประเทศไทย', 'กรุงเทพ', 'ภาษี', 'LINE MAN']
ANCHORS = [
    # "Anchor1",
    # "Anchor2",
    # etc.
]

# Em-dash policy.
# Set True if this market has a strict no-em-dash rule.
# Set False for markets where em-dashes are allowed (e.g., EN-native markets).
EM_DASH_STRICT = True

# Closing disclaimer phrase signature (per market language).
# Set to a substring of the canonical disclaimer text for this market.
# Set to None to skip this check.
DISCLAIMER_SIGNATURE = "REPLACE_WITH_DISCLAIMER_PHRASE_OR_SET_TO_NONE"

# Callout pattern — EN "What this means for you" and its translated equivalents.
# Add the translated form for your target language.
CALLOUT_PATTERN = re.compile(
    r"> \*\*What this means for you"
    r"|> \*\*REPLACE_WITH_LANG_EQUIVALENT"
)


def audit_one(path: pathlib.Path) -> dict:
    text = path.read_text(encoding="utf-8")
    body = text.split("## Body content", 1)[-1] if "## Body content" in text else text
    body = body.split("## Pre-flight", 1)[0]
    name = path.stem
    result = {"name": name, "hard_fails": 0, "soft_flags": 0, "verdict": "?"}

    # 1.1 cross-market leakage
    leakage = BANNED_TERMS.findall(body)
    if leakage:
        result["hard_fails"] += 1
        print(f"  [1.1] Cross-market leakage: {set(leakage)}")

    # 1.2 currency
    bad_curr = WRONG_CURRENCY.findall(body)
    if bad_curr:
        result["hard_fails"] += 1
        print(f"  [1.2] Wrong currency: {bad_curr}")

    # 1.3 em-dash
    if EM_DASH_STRICT:
        em_count = body.count("—")
        if em_count > 0:
            result["hard_fails"] += 1
            print(f"  [1.3] Em-dashes: {em_count}")

    # 1.4 cultural anchors
    anchor_hits = sum(1 for a in ANCHORS if a.lower() in body.lower())
    if anchor_hits < 3 and ANCHORS:
        result["hard_fails"] += 1
        print(f"  [1.4] Insufficient cultural anchors: {anchor_hits} (need >=3)")
    else:
        print(f"  [1.4] Cultural anchors: {anchor_hits}")

    # 1.5 disclaimer (per article-type rule — adapt as needed)
    if DISCLAIMER_SIGNATURE and DISCLAIMER_SIGNATURE not in text:
        result["soft_flags"] += 1
        print(f"  [disclaimer] Missing (check article type rule)")

    # 1.6 EN-translation callouts
    callouts = len(CALLOUT_PATTERN.findall(body))
    if callouts > 0:
        result["hard_fails"] += 1
        print(f"  [callouts] 'What this means for you' style: {callouts}")

    # Verdict
    if result["hard_fails"] == 0 and result["soft_flags"] <= 2:
        result["verdict"] = "SHIP-READY"
    elif result["hard_fails"] == 0:
        result["verdict"] = "SOFT-BLOCK"
    else:
        result["verdict"] = "HARD-BLOCK"
    print(f"  VERDICT: {result['verdict']}")
    return result


def main():
    drafts = sorted(pathlib.Path(".").glob(DRAFTS_GLOB))
    if not drafts:
        print(f"No drafts matching {DRAFTS_GLOB}")
        return
    results = []
    for d in drafts:
        print(f"\n=== {d.stem} ===")
        results.append(audit_one(d))
    print(f"\n\n=== SUMMARY ===")
    for r in results:
        print(f"  {r['verdict']:<14} {r['name']} (hard={r['hard_fails']}, soft={r['soft_flags']})")


if __name__ == "__main__":
    main()
