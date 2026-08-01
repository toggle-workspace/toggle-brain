#!/usr/bin/env python3
"""
UNITAR Meta Ads dashboard builder — Leaderboard layout on the M3 token system.

Reads meta_ads_snapshot.json (produced by pull_meta.py) and renders a self-contained,
white-label, theme-aware HTML leaderboard to
clients/audaura-unitar/04-reports/meta-ads-dashboard.html.

Design: Material 3 tonal surfaces seeded on blue (tokens copied from the bespoke-trainings
M3 system), with an added M3 error role for the high-CPL heat. White-label — no Toggle or
Madcrack name/logo anywhere. `parse_name` is imported by pull_meta.py; keep its signature.
"""

import json
import os
import re
import html

HERE = os.path.dirname(os.path.abspath(__file__))
SNAPSHOT = os.path.join(HERE, "meta_ads_snapshot.json")
OUT = os.path.abspath(os.path.join(HERE, "..", "04-reports", "meta-ads-dashboard.html"))

LANG = {"bm": "Malay", "en": "English", "kh": "Khmer", "ur": "Urdu"}
FORMATS = ["static", "video", "animated", "img", "carousel", "igpost", "boost"]


def money(n):
    return "RM {:,.2f}".format(n)


def money0(n):
    return "RM {:,.0f}".format(n)


def compact(n):
    n = float(n)
    if n >= 1_000_000:
        return "{:.1f}M".format(n / 1_000_000)
    return "{:,.0f}".format(n)


def esc(s):
    return html.escape(str(s))


def parse_name(name):
    """Derive a readable label + format/language tags from Meta's ad-name convention.
    Imported by pull_meta.py — keep the return shape {label, lang, fmt}."""
    raw = name.strip()
    tokens = re.split(r"[_\s]+", raw)
    low = [t.lower() for t in tokens]
    lang = next((LANG[t] for t in low if t in LANG), None)
    fmt = next((t for t in low if t in FORMATS), None)
    if fmt == "igpost":
        fmt = "IG post"
    elif fmt == "img":
        fmt = "image"
    noise = set(LANG) | set(FORMATS) | {"nootp", "v1", "v2", "v3", "v4", "a0", "a1", "a2",
                                        "a3", "generic", "maincampus", "uuckl", "static"}
    keep = [t for t in tokens if t.lower() not in noise and not re.fullmatch(r"\d{6,8}", t)
            and not re.fullmatch(r"v\d+(,v\d+)*", t.lower())]
    label = " ".join(keep).replace("-", " ").strip()
    label = re.sub(r"\s+", " ", label)
    if not label:
        label = raw
    label = " ".join(w if (w.isupper() and len(w) <= 4) else w.capitalize()
                     for w in label.split())
    return {"label": label, "lang": lang, "fmt": fmt}


STATUS_META = {
    "ACTIVE": ("Active", "on"),
    "PAUSED": ("Paused", "off"),
    "CAMPAIGN_PAUSED": ("Campaign paused", "cp"),
    "ADSET_PAUSED": ("Ad set paused", "cp"),
    "WITH_ISSUES": ("With issues", "cp"),
    "DISAPPROVED": ("Disapproved", "cp"),
    "PENDING_REVIEW": ("In review", "cp"),
}


def cpl_bucket(cpl):
    if cpl is None:
        return "c"
    if cpl < 60:
        return "g"
    if cpl <= 150:
        return "w"
    return "c"


def spark(days, spend, leads, w=560, h=90):
    PL, PR, PT, PB = 4, 4, 8, 6
    iw, ih = w - PL - PR, h - PT - PB
    n = len(spend)
    maxS = max(spend) * 1.06 if spend else 1
    maxL = max(leads) * 1.15 if leads else 1

    def x(i):
        return PL + (iw * i / (n - 1) if n > 1 else iw / 2)
    sp = "".join(("M" if i == 0 else "L") + "{:.1f} {:.1f} ".format(x(i), PT + ih - ih * v / maxS) for i, v in enumerate(spend))
    lp = "".join(("M" if i == 0 else "L") + "{:.1f} {:.1f} ".format(x(i), PT + ih - ih * v / maxL) for i, v in enumerate(leads))
    area = sp + "L{:.1f} {} L{:.1f} {} Z".format(x(n - 1), PT + ih, x(0), PT + ih)
    return (
        '<svg class="spk" viewBox="0 0 {w} {h}" preserveAspectRatio="none" aria-hidden="true">'
        '<path class="spk-area" d="{area}"/>'
        '<path class="spk-spend" d="{sp}"/>'
        '<path class="spk-leads" d="{lp}"/>'
        "</svg>"
    ).format(w=w, h=h, area=area, sp=sp, lp=lp)


def main():
    with open(SNAPSHOT) as f:
        data = json.load(f)

    acc = data["account"]
    ads = data["ads"]
    daily = data["daily"]
    ad_count = data.get("ad_count", len(ads))

    for a in ads:
        p = parse_name(a["name"])
        a["_label"], a["_lang"], a["_fmt"] = p["label"], p["lang"], p["fmt"]
        a["_live"] = a["effective_status"] == "ACTIVE"
    ads.sort(key=lambda a: a["spend"], reverse=True)

    live = [a for a in ads if a["_live"]]
    off = [a for a in ads if not a["_live"]]
    live_spend = sum(a["spend"] for a in live)
    off_spend = sum(a["spend"] for a in off)
    max_spend = max((a["spend"] for a in ads), default=1)
    live_pct = (len(live) / len(ads) * 100) if ads else 0

    rows = "".join(row(a, max_spend) for a in ads)
    trend = spark(daily["days"], daily["spend"], daily["leads"])

    doc = PAGE.replace("__ROWS__", rows) \
             .replace("__TREND__", trend) \
             .replace("__WINDOW__", esc(data.get("window", ""))) \
             .replace("__PULLED__", esc(data.get("pulled_at", ""))) \
             .replace("__SPEND__", money0(acc["spend"])) \
             .replace("__LEADS__", "{:,}".format(acc["leads"])) \
             .replace("__CPL__", money(acc["cpl"])) \
             .replace("__REACH__", compact(acc["reach"])) \
             .replace("__IMPR__", compact(acc["impressions"])) \
             .replace("__CTR__", "{:.2f}%".format(acc["ctr"])) \
             .replace("__NTOTAL__", str(len(ads))) \
             .replace("__ADCOUNT__", str(ad_count)) \
             .replace("__NLIVE__", str(len(live))) \
             .replace("__NOFF__", str(len(off))) \
             .replace("__LIVESPEND__", money0(live_spend)) \
             .replace("__OFFSPEND__", money0(off_spend)) \
             .replace("__LIVEPCT__", "{:.0f}".format(live_pct))
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        f.write(doc)
    print("Wrote", OUT, "|", len(ads), "creatives |", len(live), "live /", len(off), "off")


def row(a, max_spend):
    label, scls = STATUS_META.get(a["effective_status"], (a["effective_status"].title(), "off"))
    chips = []
    if a["_fmt"]:
        chips.append('<span class="chip">{}</span>'.format(esc(a["_fmt"])))
    if a["_lang"]:
        chips.append('<span class="chip">{}</span>'.format(esc(a["_lang"])))
    plc = a.get("placements", 1)
    if plc > 1:
        chips.append('<span class="chip sets">{} ad sets · {} live</span>'.format(plc, a.get("placements_active", 0)))
    chip_html = "".join(chips)

    cpl = a.get("cpl")
    cpl_txt = money(cpl) if cpl is not None else "n/a"
    cpl_sort = cpl if cpl is not None else 10 ** 9
    leads = a.get("lead")
    leads_txt = "{:,}".format(leads) if leads is not None else "—"
    ctr = a.get("ctr", 0.0)
    bar = a["spend"] / max_spend * 100 if max_spend else 0

    b64 = a.get("thumbnail_b64")
    if b64:
        thumb = '<span class="th" style="background-image:url({})"></span>'.format(esc(b64))
    else:
        thumb = '<span class="th th-none">{}</span>'.format(esc((a["_label"] or "?")[:2].upper()))

    search = esc((a["name"] + " " + a["_label"] + " " + (a.get("body") or "") + " " + (a.get("title") or "")).lower())
    return """
      <tr class="r r-{live}" data-status="{sfilter}" data-spend="{spend}" data-leads="{ln}" data-cpl="{cs}" data-ctr="{ctr}" data-search="{search}" data-title="{dt}" data-body="{db}">
        <td class="c-rk"><span class="rk"></span></td>
        <td class="c-th">{thumb}</td>
        <td class="c-cr"><div class="cr-name">{label}</div><div class="cr-tags">{chips}</div></td>
        <td class="c-st"><span class="pill pill-{scls}">{stlabel}</span></td>
        <td class="c-sp"><span class="spbar" style="width:{bar:.1f}%"></span><span class="spval">{spend_txt}</span></td>
        <td class="c-num">{leads_txt}</td>
        <td class="c-num cpl-{bucket}">{cpl_txt}</td>
        <td class="c-num">{ctr:.2f}%</td>
      </tr>""".format(
        live="live" if a["_live"] else "off",
        sfilter="live" if a["_live"] else "off",
        spend=a["spend"], ln=(leads if leads is not None else 0), cs=cpl_sort, ctr=ctr,
        search=search, dt=esc(a.get("title") or ""), db=esc(a.get("body") or ""),
        thumb=thumb, label=esc(a["_label"]), chips=chip_html,
        scls=scls, stlabel=esc(label), bar=bar, spend_txt=money0(a["spend"]),
        leads_txt=leads_txt, bucket=cpl_bucket(cpl), cpl_txt=cpl_txt,
    )


PAGE = r"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>UNITAR – Meta Ads Performance</title>
<meta name="description" content="Live Meta ads creative leaderboard for UNITAR: every creative ranked by spend, with status, leads, cost per lead and CTR. Refreshes daily.">
<style>
:root{
  --md-radius-sm:8px; --md-radius-md:12px; --md-radius-lg:16px;
  --md-font:"Roboto","Roboto Flex",system-ui,-apple-system,"Segoe UI",Arial,sans-serif;
  --md-surface:#FBF8FE; --md-surface-container-lowest:#FFFFFF; --md-surface-container-low:#F3F0F9;
  --md-surface-container:#EFEDF4; --md-surface-container-high:#E9E7EF; --md-surface-container-highest:#E4E1E9;
  --md-on-surface:#1A1B21; --md-on-surface-variant:#45464F; --md-outline:#767680; --md-outline-variant:#C7C5D0;
  --md-primary:#3A5CC8; --md-on-primary:#FFFFFF; --md-primary-container:#DCE1FF; --md-on-primary-container:#001551;
  --md-secondary:#7A5900; --md-on-secondary:#FFFFFF; --md-secondary-container:#FFDEA0; --md-on-secondary-container:#261900;
  --md-tertiary:#146C43; --md-on-tertiary:#FFFFFF; --md-tertiary-container:#A4F5C4; --md-on-tertiary-container:#00210F;
  --md-error:#BA1A1A; --md-on-error:#FFFFFF; --md-error-container:#FFDAD6; --md-on-error-container:#410002;
  --md-elev-1:0 1px 2px rgba(0,0,0,.28),0 1px 3px 1px rgba(0,0,0,.12);
  --md-elev-2:0 1px 2px rgba(0,0,0,.28),0 2px 6px 2px rgba(0,0,0,.12);
  --canvas:var(--md-surface); --card:var(--md-surface-container-low); --card-2:var(--md-surface-container-high);
  --ink:var(--md-on-surface); --muted:var(--md-on-surface-variant); --faint:var(--md-outline); --line:var(--md-outline-variant);
  --brand:var(--md-primary); --brand-deep:#274BB5; --on-brand:var(--md-on-primary);
  --good:var(--md-tertiary); --watch:var(--md-secondary); --crit:var(--md-error);
  --shadow:var(--md-elev-1);
}
@media (prefers-color-scheme:dark){:root{
  --md-surface:#121318; --md-surface-container-lowest:#0D0E13; --md-surface-container-low:#1B1B21;
  --md-surface-container:#1E1F25; --md-surface-container-high:#2A2B31; --md-surface-container-highest:#33343A;
  --md-on-surface:#E4E1E9; --md-on-surface-variant:#C7C5D0; --md-outline:#90909A; --md-outline-variant:#45464F;
  --md-primary:#B4C5FF; --md-on-primary:#002E69; --md-primary-container:#123E77; --md-on-primary-container:#DAE2FF;
  --md-secondary:#F0C060; --md-on-secondary:#412D00; --md-secondary-container:#5D4200; --md-on-secondary-container:#FFDEA0;
  --md-tertiary:#7ED6A5; --md-on-tertiary:#003920; --md-tertiary-container:#005231; --md-on-tertiary-container:#A4F5C4;
  --md-error:#FFB4AB; --md-on-error:#690005; --md-error-container:#93000A; --md-on-error-container:#FFDAD6;
  --md-elev-1:0 1px 3px rgba(0,0,0,.5),0 4px 8px 2px rgba(0,0,0,.3);
  --brand-deep:#DAE2FF;
}}
:root[data-theme="light"]{
  --md-surface:#FBF8FE; --md-surface-container-lowest:#FFFFFF; --md-surface-container-low:#F3F0F9;
  --md-surface-container:#EFEDF4; --md-surface-container-high:#E9E7EF; --md-surface-container-highest:#E4E1E9;
  --md-on-surface:#1A1B21; --md-on-surface-variant:#45464F; --md-outline:#767680; --md-outline-variant:#C7C5D0;
  --md-primary:#3A5CC8; --md-on-primary:#FFFFFF; --md-primary-container:#DCE1FF; --md-on-primary-container:#001551;
  --md-secondary:#7A5900; --md-on-secondary:#FFFFFF; --md-secondary-container:#FFDEA0; --md-on-secondary-container:#261900;
  --md-tertiary:#146C43; --md-on-tertiary:#FFFFFF; --md-tertiary-container:#A4F5C4; --md-on-tertiary-container:#00210F;
  --md-error:#BA1A1A; --md-on-error:#FFFFFF; --md-error-container:#FFDAD6; --md-on-error-container:#410002;
  --md-elev-1:0 1px 2px rgba(0,0,0,.28),0 1px 3px 1px rgba(0,0,0,.12);
  --brand-deep:#274BB5;
}
:root[data-theme="dark"]{
  --md-surface:#121318; --md-surface-container-lowest:#0D0E13; --md-surface-container-low:#1B1B21;
  --md-surface-container:#1E1F25; --md-surface-container-high:#2A2B31; --md-surface-container-highest:#33343A;
  --md-on-surface:#E4E1E9; --md-on-surface-variant:#C7C5D0; --md-outline:#90909A; --md-outline-variant:#45464F;
  --md-primary:#B4C5FF; --md-on-primary:#002E69; --md-primary-container:#123E77; --md-on-primary-container:#DAE2FF;
  --md-secondary:#F0C060; --md-on-secondary:#412D00; --md-secondary-container:#5D4200; --md-on-secondary-container:#FFDEA0;
  --md-tertiary:#7ED6A5; --md-on-tertiary:#003920; --md-tertiary-container:#005231; --md-on-tertiary-container:#A4F5C4;
  --md-error:#FFB4AB; --md-on-error:#690005; --md-error-container:#93000A; --md-on-error-container:#FFDAD6;
  --md-elev-1:0 1px 3px rgba(0,0,0,.5),0 4px 8px 2px rgba(0,0,0,.3);
  --brand-deep:#DAE2FF;
}
*{box-sizing:border-box}
html,body{margin:0}
body{background:var(--canvas);color:var(--ink);font-family:var(--md-font);line-height:1.5;-webkit-font-smoothing:antialiased;padding:28px 20px 80px}
.wrap{max-width:1240px;margin:0 auto}
h1{font-weight:400;font-size:30px;letter-spacing:-.01em;margin:0 0 4px}
.sub{color:var(--muted);font-size:14.5px;margin:0;max-width:70ch}

.top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:22px}
.top-r{display:flex;flex-direction:column;align-items:flex-end;gap:10px}
.live{display:inline-flex;align-items:center;gap:8px;font-size:13px;color:var(--good);font-weight:600}
.dot{width:9px;height:9px;border-radius:50%;background:var(--good);box-shadow:0 0 0 4px color-mix(in srgb,var(--good) 22%,transparent)}
.asof{font-size:12.5px;color:var(--muted)}
.asof b{color:var(--ink);font-weight:600}

/* M3 segmented theme switch */
.seg{display:inline-flex;background:var(--card-2);border:1px solid var(--line);border-radius:999px;padding:3px;gap:2px}
.seg button{appearance:none;border:0;background:transparent;color:var(--muted);font:inherit;font-size:12.5px;font-weight:600;padding:5px 13px;border-radius:999px;cursor:pointer;transition:.15s ease}
.seg button:hover{color:var(--ink)}
.seg button[aria-pressed="true"]{background:var(--brand);color:var(--on-brand)}
.seg button:focus-visible{outline:2px solid var(--brand-deep);outline-offset:2px}

.kpis{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:14px}
.kpi{background:var(--card);border-radius:var(--md-radius-lg);box-shadow:var(--shadow);padding:16px 18px}
.kpi .lab{font-size:11.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);font-weight:600}
.kpi .val{font-size:26px;font-weight:600;letter-spacing:-.01em;font-variant-numeric:tabular-nums;margin-top:6px}
.kpi .foot{font-size:12px;color:var(--muted);margin-top:4px}

.strip{display:grid;grid-template-columns:1.1fr 1fr;gap:14px;margin-bottom:22px}
.trendcard,.splitcard{background:var(--card);border-radius:var(--md-radius-lg);box-shadow:var(--shadow);padding:16px 18px}
.cardhd{font-size:12.5px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px}
.spk{width:100%;height:90px;display:block}
.spk-area{fill:var(--brand-deep);opacity:.12}
.spk-spend{fill:none;stroke:var(--good);stroke-width:2.2;stroke-linejoin:round}
.spk-leads{fill:none;stroke:var(--brand);stroke-width:2.2;stroke-linejoin:round}
.spk-lg{display:flex;gap:16px;font-size:12px;color:var(--muted);margin-top:6px}
.spk-lg i{width:12px;height:3px;display:inline-block;border-radius:2px;margin-right:6px;vertical-align:middle}
.splitbar{display:flex;height:12px;border-radius:999px;overflow:hidden;background:var(--md-surface-container-highest);margin:6px 0 12px}
.splitbar .s-live{background:var(--good)}
.splitleg{display:flex;flex-direction:column;gap:8px;font-size:13px;color:var(--muted)}
.splitleg b{color:var(--ink);font-variant-numeric:tabular-nums}
.splitleg i{width:11px;height:11px;border-radius:3px;display:inline-block;margin-right:8px;vertical-align:baseline}

.controls{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px}
.controls input{flex:1;min-width:200px;border:1px solid var(--line);background:var(--md-surface-container-lowest);color:var(--ink);border-radius:999px;padding:10px 16px;font:inherit;font-size:14px}
.controls input:focus-visible{outline:2px solid var(--brand-deep);outline-offset:1px}
.count{font-size:12.5px;color:var(--muted);font-variant-numeric:tabular-nums}

.board{background:var(--card);border-radius:var(--md-radius-lg);box-shadow:var(--shadow);overflow:hidden}
.tblwrap{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:13.5px}
thead th{position:sticky;top:0;background:var(--card-2);color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:.04em;font-weight:600;text-align:right;padding:12px 14px;white-space:nowrap;z-index:1}
thead th.l{text-align:left}
thead th.sortable{cursor:pointer;user-select:none}
thead th.sortable:hover{color:var(--ink)}
thead th .ar{opacity:0;margin-left:4px;font-size:10px}
thead th[aria-sort="descending"] .ar{opacity:1}
thead th[aria-sort="ascending"] .ar{opacity:1;display:inline-block;transform:scaleY(-1)}
tbody{counter-reset:rank}
tbody tr{border-top:1px solid var(--md-surface-container)}
tbody tr:hover{background:var(--md-surface-container)}
td{padding:9px 14px;text-align:right;vertical-align:middle}
.c-rk{color:var(--faint);font-weight:600;font-variant-numeric:tabular-nums;text-align:center;width:40px}
.r:not([style*="none"]) .rk::before{counter-increment:rank;content:counter(rank)}
.c-th{width:56px}
.th{display:block;width:46px;height:46px;border-radius:var(--md-radius-sm);background-size:cover;background-position:center;background-color:var(--md-surface-container-high);cursor:zoom-in;transition:transform .12s ease,box-shadow .12s ease}
.th:hover{transform:scale(1.08);box-shadow:var(--md-elev-2)}
.pop{position:fixed;z-index:50;display:none;width:330px;max-width:86vw;background:var(--md-surface-container-lowest);border:1px solid var(--line);border-radius:var(--md-radius-lg);box-shadow:var(--md-elev-2);overflow:hidden;pointer-events:none}
.pop-img{display:block;width:100%;max-height:380px;object-fit:contain;background:var(--md-surface-container-high)}
.pop-txt{padding:12px 15px 15px}
.pop-title{font-weight:600;font-size:13.5px;color:var(--ink);margin-bottom:5px}
.pop-body{font-size:12.5px;color:var(--muted);line-height:1.45;white-space:pre-wrap;max-height:150px;overflow:hidden}
.pop-empty{padding:26px 15px;text-align:center;color:var(--muted);font-size:12.5px}
.th-none{display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--brand);background:var(--md-primary-container)}
.c-cr{text-align:left;min-width:230px}
.cr-name{font-weight:500;font-size:13.5px;color:var(--ink)}
.cr-tags{display:flex;gap:5px;flex-wrap:wrap;margin-top:4px}
.chip{font-size:10.5px;font-weight:500;color:var(--muted);background:var(--md-surface-container-high);border-radius:var(--md-radius-sm);padding:2px 8px}
.chip.sets{color:var(--md-on-primary-container);background:var(--md-primary-container)}
.c-st{text-align:left;white-space:nowrap}
.pill{font-size:11px;font-weight:600;padding:3px 11px;border-radius:999px;white-space:nowrap}
.pill-on{background:var(--md-tertiary-container);color:var(--md-on-tertiary-container)}
.pill-off{background:var(--md-surface-container-highest);color:var(--muted)}
.pill-cp{background:var(--md-secondary-container);color:var(--md-on-secondary-container)}
.c-sp{text-align:left;position:relative;min-width:150px}
.spbar{position:absolute;left:14px;top:50%;transform:translateY(-50%);height:26px;background:var(--md-primary-container);border-radius:var(--md-radius-sm);z-index:0}
.spval{position:relative;z-index:1;font-variant-numeric:tabular-nums;font-weight:600}
.c-num{font-variant-numeric:tabular-nums;font-weight:500;white-space:nowrap}
.cpl-g{color:var(--good);font-weight:700}
.cpl-w{color:var(--watch);font-weight:700}
.cpl-c{color:var(--crit);font-weight:700}
.foot-note{font-size:12px;color:var(--faint);margin-top:22px;text-align:center;line-height:1.6}
@media (max-width:900px){.kpis{grid-template-columns:repeat(2,1fr)}.strip{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
</style>
</head>
<body>
<div class="wrap">
  <div class="top">
    <div>
      <h1>UNITAR – Meta Ads Performance</h1>
      <p class="sub">Every creative running on Facebook and Instagram, ranked by spend. Cost per lead is colour-coded: green under RM 60, amber RM 60 to 150, red above RM 150. Currency is Malaysian Ringgit.</p>
    </div>
    <div class="top-r">
      <div class="seg" role="group" aria-label="Theme">
        <button type="button" data-theme="light" aria-pressed="false">Light</button>
        <button type="button" data-theme="dark" aria-pressed="false">Dark</button>
      </div>
      <div class="live"><span class="dot"></span>Live data</div>
      <div class="asof"><b>__WINDOW__</b> · pulled __PULLED__ · refreshes daily</div>
    </div>
  </div>

  <div class="kpis">
    <div class="kpi"><div class="lab">Total spend</div><div class="val">__SPEND__</div><div class="foot">__NTOTAL__ creatives · __ADCOUNT__ ad sets</div></div>
    <div class="kpi"><div class="lab">Leads</div><div class="val">__LEADS__</div><div class="foot">Standard lead action</div></div>
    <div class="kpi"><div class="lab">Cost / lead</div><div class="val">__CPL__</div><div class="foot">Blended</div></div>
    <div class="kpi"><div class="lab">Reach</div><div class="val">__REACH__</div><div class="foot">Meta accounts</div></div>
    <div class="kpi"><div class="lab">Impressions</div><div class="val">__IMPR__</div><div class="foot">CTR __CTR__</div></div>
  </div>

  <div class="strip">
    <div class="trendcard">
      <div class="cardhd">Daily spend and leads</div>
      __TREND__
      <div class="spk-lg"><span><i style="background:var(--good)"></i>Spend</span><span><i style="background:var(--brand)"></i>Leads</span></div>
    </div>
    <div class="splitcard">
      <div class="cardhd">Delivery status</div>
      <div class="splitbar"><span class="s-live" style="width:__LIVEPCT__%"></span></div>
      <div class="splitleg">
        <span><i style="background:var(--good)"></i><b>__NLIVE__</b> active creatives · __LIVESPEND__</span>
        <span><i style="background:var(--md-surface-container-highest)"></i><b>__NOFF__</b> paused or off · __OFFSPEND__</span>
      </div>
    </div>
  </div>

  <div class="controls">
    <div class="seg" id="seg" role="group" aria-label="Filter by status">
      <button type="button" data-f="all" aria-pressed="true">All</button>
      <button type="button" data-f="live" aria-pressed="false">Active</button>
      <button type="button" data-f="off" aria-pressed="false">Paused</button>
    </div>
    <input id="q" type="search" placeholder="Search creatives by name, program or copy...">
    <span class="count" id="count"></span>
  </div>

  <div class="board">
    <div class="tblwrap">
      <table>
        <thead>
          <tr>
            <th class="c-rk">#</th>
            <th></th>
            <th class="l">Creative</th>
            <th class="l">Status</th>
            <th class="l sortable" data-key="spend" aria-sort="descending">Spend<span class="ar">▾</span></th>
            <th class="sortable" data-key="leads">Leads<span class="ar">▾</span></th>
            <th class="sortable" data-key="cpl">CPL<span class="ar">▾</span></th>
            <th class="sortable" data-key="ctr">CTR<span class="ar">▾</span></th>
          </tr>
        </thead>
        <tbody id="tb">__ROWS__</tbody>
      </table>
    </div>
  </div>

  <p class="foot-note">Source: Meta Ads account 1034316391892752 (UNITAR MYR), pulled live and rebuilt daily. Hover a thumbnail to preview the full creative and its copy. Figures reflect Meta's reported attribution at pull time and may revise slightly as conversions settle.</p>
</div>
<div id="pop" class="pop"><img class="pop-img" alt=""><div class="pop-txt"><div class="pop-title"></div><div class="pop-body"></div></div></div>

<script>
(function(){
  var root=document.documentElement;
  var tb=document.getElementById("tb");
  var rows=[].slice.call(tb.querySelectorAll("tr.r"));
  var q=document.getElementById("q"), seg=document.getElementById("seg"), count=document.getElementById("count");
  var filter="all", sortKey="spend", sortDir=-1;

  function apply(){
    var term=q.value.trim().toLowerCase(), shown=0;
    rows.forEach(function(r){
      var okF=filter==="all"||r.getAttribute("data-status")===filter;
      var okQ=!term||r.getAttribute("data-search").indexOf(term)>-1;
      var vis=okF&&okQ; r.style.display=vis?"":"none"; if(vis)shown++;
    });
    count.textContent=shown+" of "+rows.length+" shown";
  }
  seg.addEventListener("click",function(e){
    var b=e.target.closest("button"); if(!b)return;
    filter=b.dataset.f;
    [].forEach.call(seg.children,function(x){x.setAttribute("aria-pressed",x===b);});
    apply();
  });
  q.addEventListener("input",apply);

  // column sort
  var heads=[].slice.call(document.querySelectorAll("th.sortable"));
  function sortBy(key){
    heads.forEach(function(h){ if(h.dataset.key!==key) h.removeAttribute("aria-sort"); });
    rows.sort(function(a,b){
      var av=parseFloat(a.getAttribute("data-"+key)), bv=parseFloat(b.getAttribute("data-"+key));
      return (av-bv)*sortDir;
    });
    rows.forEach(function(r){ tb.appendChild(r); });
  }
  heads.forEach(function(h){
    h.addEventListener("click",function(){
      var key=h.dataset.key;
      if(key===sortKey){ sortDir=-sortDir; } else { sortKey=key; sortDir=-1; }
      h.setAttribute("aria-sort", sortDir<0?"descending":"ascending");
      sortBy(key); apply();
    });
  });

  // theme switch
  var tseg=document.querySelector('.seg[aria-label="Theme"]');
  function syncTheme(){
    var t=root.getAttribute("data-theme");
    [].forEach.call(tseg.children,function(x){x.setAttribute("aria-pressed", x.dataset.theme===t);});
  }
  tseg.addEventListener("click",function(e){
    var b=e.target.closest("button"); if(!b)return;
    root.setAttribute("data-theme", b.dataset.theme); syncTheme();
  });
  syncTheme();

  // hover preview: one shared popover reads each thumb's image + the row's copy
  var pop=document.getElementById("pop");
  var pImg=pop.querySelector(".pop-img"), pTitle=pop.querySelector(".pop-title"), pBody=pop.querySelector(".pop-body");
  function showPop(th){
    var r=th.closest("tr");
    var bg=getComputedStyle(th).backgroundImage||"";
    var m=bg.match(/url\(["']?(.*?)["']?\)/);
    if(m&&m[1]&&m[1]!=="none"){pImg.src=m[1];pImg.style.display="";}else{pImg.style.display="none";}
    var t=r.getAttribute("data-title")||"", b=r.getAttribute("data-body")||"";
    var nm=(r.querySelector(".cr-name")||{}).textContent||"";
    pTitle.textContent=t||nm;
    pBody.textContent=b; pBody.style.display=b?"":"none";
    pop.style.display="block";
  }
  function place(e){
    var pad=14,w=pop.offsetWidth,h=pop.offsetHeight;
    var x=e.clientX+18,y=e.clientY+18;
    if(x+w+pad>window.innerWidth)x=e.clientX-w-18;
    if(y+h+pad>window.innerHeight)y=window.innerHeight-h-pad;
    if(y<pad)y=pad; if(x<pad)x=pad;
    pop.style.left=x+"px"; pop.style.top=y+"px";
  }
  [].forEach.call(document.querySelectorAll("td.c-th .th"),function(th){
    th.addEventListener("mouseenter",function(e){showPop(th);place(e);});
    th.addEventListener("mousemove",place);
    th.addEventListener("mouseleave",function(){pop.style.display="none";});
  });

  apply();
})();
</script>
</body>
</html>
"""


if __name__ == "__main__":
    main()
