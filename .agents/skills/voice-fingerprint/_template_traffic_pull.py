"""GSC traffic pull template for voice-fingerprint skill.

Replace these placeholders before saving the script:
  {MARKET_LOWER}  — my / ph / th / jp / id / vn (or your market code)
  {LANG_LOWER}    — en / bm / cn / th / jp / tagalog / taglish / id / vn
  {LANG_DETECTOR} — regex or function that identifies slugs in the target language

Also set the two constants at the top:
  GSC_SITE        — your Search Console site (e.g., "sc-domain:example.com")
  TOKEN_PATH      — path to your OAuth2 token JSON (see SETUP.md for how to generate)
"""
import pathlib
import re
from datetime import date, timedelta

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

# ---- Configure for your project ----

# Your Google Search Console site property.
# Use "sc-domain:example.com" for domain-level, or the full URL prefix form.
GSC_SITE = "sc-domain:YOUR_DOMAIN_HERE"

# Path to your OAuth2 token file. See SETUP.md for how to generate this.
# Adjust relative to wherever you place this script in your project.
TOKEN_PATH = pathlib.Path(__file__).resolve().parent / ".secrets" / "google_oauth_token.json"

# ---- Language detectors (pick one block, delete others) ----

# CN (Simplified Chinese, pinyin slugs)
# LANG_PATTERN = re.compile(r"(pos-xitong|kafeidian|kafeiting|canting|huiyuan|guanli)", re.I)

# BM (Bahasa Malaysia)
# LANG_PATTERN = re.compile(r"\b(panduan|cara|restoran|kafe|bisnes|sistem|untuk|yang|mengekalkan|membuka|perniagaan|fnb)\b", re.I)

# TH (Thai script in slug)
# LANG_PATTERN = re.compile(r"[฀-๿]")

# JP (Japanese script in slug)
# LANG_PATTERN = re.compile(r"[぀-ヿ一-鿿]")

# Tagalog/Taglish
# LANG_PATTERN = re.compile(r"\b(para|paano|kumita|negosyo|pinoy|tindahan|sariling|sari-sari|maliit)\b", re.I)

# EN for non-primary-EN markets (anchor-based detection)
# PH-EN example: requires PH cultural anchor in slug
# LANG_PATTERN = re.compile(r"\b(philippines|filipino|pinoy|bir|manila|cebu|ofw|sari-sari|peso|php)\b", re.I)

# REPLACE WITH ACTUAL PATTERN FOR THIS RUN:
LANG_PATTERN = re.compile(r"REPLACE_ME", re.I)

# Slugs to EXCLUDE (other languages sharing the same /market/blog/ surface)
EXCLUDE_PATTERNS = []  # e.g., for BM filter, exclude CN slugs: ["pos-xitong", "kafeidian"]


def load_creds():
    creds = Credentials.from_authorized_user_file(str(TOKEN_PATH))
    if not creds.valid and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        TOKEN_PATH.write_text(creds.to_json())
    return creds


def main():
    creds = load_creds()
    svc = build("searchconsole", "v1", credentials=creds, cache_discovery=False)
    end = date.today() - timedelta(days=3)
    start = end - timedelta(days=90)

    req = {
        "startDate": start.isoformat(),
        "endDate": end.isoformat(),
        "dimensions": ["page"],
        "rowLimit": 25000,
        "dimensionFilterGroups": [
            {"filters": [{"dimension": "page", "operator": "contains",
                          "expression": "/{MARKET_LOWER}/blog/"}]}
        ],
    }
    resp = svc.searchanalytics().query(siteUrl=GSC_SITE, body=req).execute()
    rows = resp.get("rows", [])
    print(f"Pulled {len(rows)} /{{MARKET_LOWER}}/blog/ URLs ({start} -> {end})\n")

    by_slug = {}
    for r in rows:
        slug = r["keys"][0].rstrip("/").split("/")[-1]
        if any(ex in slug for ex in EXCLUDE_PATTERNS):
            continue
        if not LANG_PATTERN.search(slug.replace("-", " ")):
            continue
        clicks = int(r.get("clicks", 0))
        if slug not in by_slug or clicks > by_slug[slug]["clicks"]:
            by_slug[slug] = {
                "slug": slug,
                "clicks": clicks,
                "impressions": int(r.get("impressions", 0)),
                "ctr": r.get("ctr", 0),
                "position": r.get("position", 0),
            }
    sorted_rows = sorted(by_slug.values(), key=lambda x: x["clicks"], reverse=True)

    print(f"{{LANG_LOWER}}-detected URLs in /{{MARKET_LOWER}}/blog/: {len(sorted_rows)}\n")
    print(f"{'clicks':>7} {'imp':>8} {'ctr':>6} {'pos':>6}  slug")
    print("-" * 110)
    for r in sorted_rows[:30]:
        print(
            f"{r['clicks']:>7} {r['impressions']:>8} {r['ctr']*100:>5.1f}% {r['position']:>6.1f}  {r['slug']}"
        )

    # Corpus richness verdict (used by skill to decide branch)
    rich = sum(1 for r in sorted_rows if r["clicks"] > 20)
    medium = sum(1 for r in sorted_rows if 5 < r["clicks"] <= 20)
    print(f"\n=== Corpus assessment ===")
    print(f"RICH (>20 cl): {rich} URLs")
    print(f"MEDIUM (5-20 cl): {medium} URLs")
    if rich >= 10:
        print("-> RICH corpus — use live articles for fingerprint")
    elif rich + medium >= 3:
        print("-> MEDIUM corpus — supplement with competitor blog")
    else:
        print("-> THIN corpus — pivot to competitor + market-media for fingerprint")


if __name__ == "__main__":
    main()
