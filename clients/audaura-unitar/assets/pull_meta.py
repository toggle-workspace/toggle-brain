#!/usr/bin/env python3
"""
Pull UNITAR Meta ads data via the Graph API and write meta_ads_snapshot.json.

Auth: reads ACCESS_TOKEN (Meta System User token) and AD_ACCOUNT_ID (act_...) from
the environment. Load them first with:
    set -a; source tools/meta-ads-cli/.env; set +a

Stdlib only (urllib), so it runs in a bare launchd environment. Downloads each ad's
thumbnail and base64-embeds it so the built HTML stays self-contained for Google
Drive delivery. Uses /ads?fields=creative{...} for copy + thumbnail, which avoids the
flaky ads_get_creatives path.

FIRST-RUN NOTE: the leads mapping (which Meta `actions` action_types count as a "lead")
is marked below and should be sanity-checked against the account total on the first
real run, then left alone.
"""
import base64
import io
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

API = "https://graph.facebook.com/v21.0"
TOKEN = os.environ.get("ACCESS_TOKEN", "").strip()
ACCT = os.environ.get("AD_ACCOUNT_ID", "").strip()  # act_123...
DATE_PRESET = os.environ.get("UNITAR_DATE_PRESET", "last_30d")
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "meta_ads_snapshot.json")

# The canonical Meta "lead" action type. Verified 2026-07-31 against the known window
# (Jun 20 – Jul 19): action_type "lead" = 6,094, matching Ads Manager exactly. Do NOT
# add the *_grouped / fb_pixel_lead types here — they double-count the same leads.
LEAD_ACTIONS = {"lead"}


def die(msg):
    sys.stderr.write("pull_meta: " + msg + "\n")
    sys.exit(1)


def get(path, params):
    params = dict(params)
    params["access_token"] = TOKEN
    url = "{}/{}?{}".format(API, path, urllib.parse.urlencode(params))
    for attempt in range(4):
        try:
            with urllib.request.urlopen(url, timeout=60) as r:
                return json.loads(r.read().decode())
        except urllib.error.HTTPError as e:
            body = e.read().decode(errors="replace")
            if e.code in (429, 500, 503) and attempt < 3:
                time.sleep(2 ** attempt)
                continue
            die("HTTP {} on {}: {}".format(e.code, path, body[:300]))
        except Exception as e:  # noqa
            if attempt < 3:
                time.sleep(2 ** attempt)
                continue
            die("error on {}: {}".format(path, e))


def paged(path, params):
    """Yield every row across pagination."""
    params = dict(params)
    params["access_token"] = TOKEN
    url = "{}/{}?{}".format(API, path, urllib.parse.urlencode(params))
    while url:
        for attempt in range(4):
            try:
                with urllib.request.urlopen(url, timeout=60) as r:
                    d = json.loads(r.read().decode())
                break
            except Exception as e:  # noqa
                if attempt < 3:
                    time.sleep(2 ** attempt)
                    continue
                die("error paging {}: {}".format(path, e))
        for row in d.get("data", []):
            yield row
        url = d.get("paging", {}).get("next")


def leads_from(actions):
    if not actions:
        return 0
    total = 0
    for a in actions:
        if a.get("action_type") in LEAD_ACTIONS:
            try:
                total += int(float(a.get("value", 0)))
            except (TypeError, ValueError):
                pass
    return total


def f(row, key, default=0.0):
    try:
        return float(row.get(key, default))
    except (TypeError, ValueError):
        return default


def main():
    if not TOKEN or not ACCT:
        die("ACCESS_TOKEN / AD_ACCOUNT_ID not set. Source tools/meta-ads-cli/.env first.")

    # 1) account totals
    acc_fields = "spend,impressions,clicks,ctr,cpc,cpm,reach,frequency,actions"
    acc = get("{}/insights".format(ACCT),
              {"fields": acc_fields, "date_preset": DATE_PRESET, "level": "account"})
    a0 = (acc.get("data") or [{}])[0]
    acc_leads = leads_from(a0.get("actions"))
    account = {
        "spend": round(f(a0, "spend"), 2),
        "impressions": int(f(a0, "impressions")),
        "clicks": int(f(a0, "clicks")),
        "ctr": round(f(a0, "ctr"), 2),
        "cpc": round(f(a0, "cpc"), 2),
        "cpm": round(f(a0, "cpm"), 2),
        "reach": int(f(a0, "reach")),
        "frequency": round(f(a0, "frequency"), 2),
        "leads": acc_leads,
        "cpl": round(f(a0, "spend") / acc_leads, 2) if acc_leads else 0.0,
    }

    # 2) daily trend
    days, dspend, dleads = [], [], []
    for row in paged("{}/insights".format(ACCT),
                     {"fields": "spend,actions", "date_preset": DATE_PRESET,
                      "level": "account", "time_increment": "1"}):
        d = row.get("date_start", "")
        # -> "Jul 3" style label
        try:
            import datetime
            days.append(datetime.datetime.strptime(d, "%Y-%m-%d").strftime("%b %-d"))
        except Exception:  # noqa
            days.append(d)
        dspend.append(round(f(row, "spend"), 2))
        dleads.append(leads_from(row.get("actions")))

    # 3) ad-level insights (spend + metrics + leads)
    ad_metrics = {}
    for row in paged("{}/insights".format(ACCT),
                     {"fields": "ad_id,ad_name,spend,impressions,clicks,ctr,actions",
                      "date_preset": DATE_PRESET, "level": "ad", "limit": "500"}):
        aid = row.get("ad_id")
        if not aid:
            continue
        ld = leads_from(row.get("actions"))
        sp = round(f(row, "spend"), 2)
        ad_metrics[aid] = {
            "spend": sp,
            "impressions": int(f(row, "impressions")),
            "clicks": int(f(row, "clicks")),
            "ctr": round(f(row, "ctr"), 2),
            "lead": ld if ld else None,
            "cpl": round(sp / ld, 2) if ld else None,
        }

    # 4) ad entities: status + creative copy + full-res image. thumbnail_url is
    # Meta's low-res preview render; image_url is the full source asset, which we
    # prefer for a crisp card (downscaled locally). Request a large thumbnail so the
    # fallback (video / dynamic creatives without image_url) is still decent.
    ad_meta = {}
    for row in paged("{}/ads".format(ACCT),
                     {"fields": "id,name,effective_status,status,"
                                "creative{body,title,thumbnail_url,image_url,object_type,"
                                "object_story_id,effective_object_story_id,video_id}",
                      "thumbnail_width": "1080", "thumbnail_height": "1080",
                      "limit": "200"}):
        cr = row.get("creative") or {}
        ad_meta[row["id"]] = {
            "name": row.get("name", ""),
            "effective_status": row.get("effective_status", "PAUSED"),
            "status": row.get("status", ""),
            "body": cr.get("body"),
            "title": cr.get("title"),
            "image_url": cr.get("image_url"),
            "thumbnail_url": cr.get("thumbnail_url"),
            "story_id": cr.get("effective_object_story_id") or cr.get("object_story_id"),
            "video_id": cr.get("video_id"),
        }

    # 5) consolidate: one card per creative. Meta creates a separate ad entity per
    # ad set, so the same creative (same name) appears many times. Group by name and
    # aggregate spend/leads/impressions/clicks, then RECOMPUTE cpl/ctr (weighted, not
    # averaged). Status = ACTIVE if any placement is live. Copy/image come from the
    # highest-spend placement that has them; the image is downloaded once per creative.
    groups = {}
    for aid, m in ad_metrics.items():
        if m["spend"] <= 0:
            continue
        meta = ad_meta.get(aid, {})
        key = re.sub(r"\s+", " ", (meta.get("name") or aid).strip())
        g = groups.setdefault(key, {"name": key, "id": aid, "insts": [],
                                    "spend": 0.0, "impr": 0, "clicks": 0, "leads": 0,
                                    "active": 0, "total": 0})
        g["spend"] += m["spend"]
        g["impr"] += m["impressions"]
        g["clicks"] += m["clicks"]
        g["leads"] += (m["lead"] or 0)
        g["total"] += 1
        if meta.get("effective_status") == "ACTIVE":
            g["active"] += 1
        g["insts"].append({"spend": m["spend"], "status": meta.get("effective_status", "PAUSED"),
                           "body": meta.get("body"), "title": meta.get("title"),
                           "image_url": meta.get("image_url"), "thumb": meta.get("thumbnail_url"),
                           "story_id": meta.get("story_id"), "video_id": meta.get("video_id")})

    creatives = []
    for g in groups.values():
        insts = sorted(g["insts"], key=lambda x: -x["spend"])
        body = next((i["body"] for i in insts if i["body"]), None)
        title = next((i["title"] for i in insts if i["title"]), None)
        img = next((i["image_url"] for i in insts if i["image_url"]), None)
        thumb = next((i["thumb"] for i in insts if i["thumb"]), None)
        story_id = next((i["story_id"] for i in insts if i["story_id"]), None)
        video_id = next((i["video_id"] for i in insts if i["video_id"]), None)
        eff = "ACTIVE" if g["active"] > 0 else insts[0]["status"]
        creatives.append({
            "id": g["id"], "name": g["name"], "effective_status": eff,
            "spend": round(g["spend"], 2), "impressions": g["impr"], "clicks": g["clicks"],
            "ctr": round(g["clicks"] / g["impr"] * 100, 2) if g["impr"] else 0.0,
            "lead": g["leads"] or None,
            "cpl": round(g["spend"] / g["leads"], 2) if g["leads"] else None,
            "placements": g["total"], "placements_active": g["active"],
            "body": body, "title": title,
            "thumbnail_b64": process_image(best_image_url(img, story_id, video_id, thumb)),
        })
    creatives.sort(key=lambda a: a["spend"], reverse=True)

    import datetime
    snap = {
        "pulled_at": datetime.datetime.now().strftime("%-d %b %Y"),
        "window": window_label(days),
        "account": account,
        "ad_count": sum(c["placements"] for c in creatives),
        "daily": {"days": days, "spend": dspend, "leads": dleads},
        "ads": creatives,
    }
    with open(OUT, "w") as fh:
        json.dump(snap, fh, indent=2)
    print("pull_meta: {} creatives from {} ads | {} leads | RM{} spend".format(
        len(creatives), snap["ad_count"], account["leads"], account["spend"]))


def get_soft(path, params):
    """Like get() but returns None on any error instead of aborting the pull.
    Used for image lookups (story full_picture, video thumbnails) that may be
    permission-walled — a failure there must not kill the whole run."""
    params = dict(params)
    params["access_token"] = TOKEN
    url = "{}/{}?{}".format(API, path, urllib.parse.urlencode(params))
    try:
        with urllib.request.urlopen(url, timeout=45) as r:
            return json.loads(r.read().decode())
    except Exception:  # noqa
        return None


def best_image_url(image_url, story_id, video_id, thumb_url):
    """Resolve the highest-quality image URL for a creative, in priority order.
    image_url (full-res image creatives) works with ads_read. The story
    full_picture and video thumbnail paths need broader token scope
    (pages_read_engagement + page/video asset access); they return None until
    that is granted, at which point they light up with no code change."""
    if image_url:
        return image_url
    if story_id:
        st = get_soft(story_id, {"fields": "full_picture"})
        if st and st.get("full_picture"):
            return st["full_picture"]
    if video_id:
        v = get_soft(video_id, {"fields": "thumbnails{uri,width,height}"})
        ths = ((v or {}).get("thumbnails") or {}).get("data", [])
        if ths:
            best = max(ths, key=lambda t: t.get("width", 0))
            if best.get("uri"):
                return best["uri"]
    return thumb_url  # last resort; process_image rejects it if it's tiny


_DL_CACHE = {}


def _fetch(url):
    if url in _DL_CACHE:
        return _DL_CACHE[url]
    data = None
    for attempt in range(3):
        try:
            with urllib.request.urlopen(url, timeout=45) as r:
                data = r.read()
            break
        except Exception:  # noqa
            if attempt < 2:
                time.sleep(1.5 ** attempt)
    _DL_CACHE[url] = data
    return data


def process_image(url, max_edge=640, quality=80):
    """Download an image and return a downscaled JPEG data URI, sized for the 46px
    thumbnail and the ~330px hover preview. Requires Pillow to resize; if Pillow is
    unavailable it will NOT embed the raw full-res image (that once blew the page to
    36 MB and broke the Cloudflare 25 MB/file limit) — it returns None so the card
    shows a clean placeholder instead."""
    if not url:
        return None
    data = _fetch(url)
    if not data:
        return None
    try:
        from PIL import Image
    except Exception:  # noqa — no Pillow: refuse to embed a full-res image
        return None
    try:
        im = Image.open(io.BytesIO(data)).convert("RGB")
        w, h = im.size
        # Reject Meta's tiny 64px preview thumbnails — upscaling them looks broken.
        if max(w, h) < 200:
            return None
        scale = min(1.0, float(max_edge) / max(w, h))
        if scale < 1.0:
            im = im.resize((max(1, int(w * scale)), max(1, int(h * scale))), Image.LANCZOS)
        buf = io.BytesIO()
        im.save(buf, format="JPEG", quality=quality, optimize=True)
        data = buf.getvalue()
    except Exception:  # noqa — unreadable image
        return None
    return "data:image/jpeg;base64," + base64.b64encode(data).decode()


def window_label(days):
    if not days:
        return ""
    return "{} – {} 2026".format(days[0], days[-1])


if __name__ == "__main__":
    main()
