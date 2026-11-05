# -*- coding: utf-8 -*-
"""TC Boy x Toggle 2027 proposal deck. House style, 10 x 5.625in.
Run with the scratchpad venv: venv/bin/python build_deck.py
Numbers trace to ../2026-11-05-pre-planning.md and ../2026-11-05-threads-playbook.md."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from primitives import *  # noqa: F401,F403

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..",
                   "TC-Boy-Toggle-2027-Proposal-Nov-2026.pptx")


def bars_h(s, l, t, rows, max_v, bar_w, row_h=0.46, label_w=2.1, size=11):
    """Horizontal single-series bars drawn as shapes, sorted by the caller."""
    y = t
    for label, val, vlabel, color in rows:
        txt(s, l, y + 0.06, label_w, 0.3, label, size, INK)
        w = bar_w * val / max_v
        rect(s, l + label_w, y + 0.04, w, row_h - 0.16, fill=color)
        txt(s, l + label_w + w + 0.1, y + 0.05, 1.2, 0.3, vlabel, size, color if color != PALE else GREY, bold=True)
        y += row_h


def card(s, l, t, w, h, kicker, head, body, color=TEAL):
    rect(s, l, t, w, h, fill=TINT)
    txt(s, l + 0.16, t + 0.14, w - 0.32, 0.25, kicker, 10, color, bold=True)
    txt(s, l + 0.16, t + 0.40, w - 0.32, 0.5, head, 13, INK, bold=True, spacing=1.0)
    txt(s, l + 0.16, t + 0.92, w - 0.32, h - 1.0, body, 10.5, GREY, spacing=1.15)


# =====================================================================
# 01 COVER
# =====================================================================
PAGE["n"] = 1
s = prs.slides.add_slide(BLANK)
rect(s, 0, 0, 10, 5.625, fill=WHITE)
wordmark(s, 0.55, 0.50, 1.60)
txt(s, 0.55, 1.95, 8.6, 1.2, "The everyday protein\nof active Malaysians", 40, INK, bold=True, spacing=0.94)
hline(s, 0.55, 3.35, 2.2, color=TEAL, lw=2.0)
txt(s, 0.55, 3.62, 8.6, 0.6,
    "A 2027 online growth and media plan for TC Boy\nToggle Solutions · November 2026", 13, GREY, spacing=1.15)
txt(s, 0.55, 5.21, 6.0, 0.2, "Prepared for TC Boy Marketing Sdn Bhd · Draft for discussion", 9, PALE)
txt(s, 8.0, 5.21, 1.45, 0.2, "1", 9, PALE, align=PP_ALIGN.RIGHT)

# =====================================================================
# 02 THE DEMAND
# =====================================================================
s = slide_base("Malaysians already eat canned fish for protein",
               "The demand is there before any brand has claimed it.")
statcard(s, 0.55, 1.52, 2.08, 1.15, "42,000", "runners registered for the\nKL marathon in 2025", TEAL)
statcard(s, 2.83, 1.52, 2.08, 1.15, "100+", "Anytime Fitness clubs in\nMalaysia by January 2026", TEAL)
statcard(s, 5.11, 1.52, 2.08, 1.15, "28g", "protein per 100g in a viral\nRM4 sardine can", ORANGE)
statcard(s, 7.39, 1.52, 2.06, 1.15, "Dec 2026", "first HYROX race in\nKuala Lumpur, at MITEC", TEAL, figsize=24)
txt(s, 0.55, 2.98, 8.9, 0.8,
    "In January 2026 a post calling canned sardines \"my new protein source\" spread across Malaysian\n"
    "social media. No brand was named in the post or in the news stories that followed.",
    12, INK, spacing=1.3)
verdict(s, "The fitness buyer already reaches for a can. Nobody has told them which one.",
        "Sources: The Sun, Free Malaysia Today, WorldOfBuzz and SAYS, 2025 to 2026.")

# =====================================================================
# 03 THE COMPETITION
# =====================================================================
s = slide_base("Nobody in canned fish owns fitness yet",
               "The category leader talks about protein but has never backed it with sport.")
rows = [
    ["Brand", "What they say", "Link to fitness or sport"],
    ["Ayam Brand", "\"An excellent and affordable source of lean protein\"", "Community fitness workshops only"],
    ["Yeo's", "Teriyaki and spicy tuna, launched October 2026", "None found"],
    ["King Cup, Adabi, Rex", "Local taste and value", "None found"],
    ["TC Boy", "\"High in protein\", with no grams shown", "None yet"],
]
table(s, 0.55, 1.52, 8.9, rows, [2.1, 4.1, 2.7], row_h=0.44, body_size=11.5, accent_rows={4: TEAL})
verdict(s, "The first canned brand at the gym, the race and the meal prep feed gets to keep that space.",
        "Desk research, 5 November 2026. Regional precedent: Century Tuna's Superbods fitness contest in the Philippines.")

# =====================================================================
# 04 THE SHOP
# =====================================================================
s = slide_base("A gym-goer cannot buy six cans online today",
               "Your site is built for carton buyers, and a new buyer wants a trial pack.")
statcard(s, 0.55, 1.52, 2.08, 1.15, "RM326", "smallest tuna order on\ntcboy.com, 48 cans", ORANGE)
statcard(s, 2.83, 1.52, 2.08, 1.15, "OTP", "registration needed before\nanything goes in the cart", ORANGE)
statcard(s, 5.11, 1.52, 2.08, 1.15, "0", "ad pixels installed, so ads\ncannot learn who buys", ORANGE)
statcard(s, 7.39, 1.52, 2.06, 1.15, "7 to 8", "days for delivery to\nPeninsular Malaysia", GREY)
txt(s, 0.55, 2.98, 8.9, 0.8,
    "Google sees the same page title on every page, and the 2018 site at tcboy.tropicalgrp.com\n"
    "still competes with the new one in search results.",
    12, INK, spacing=1.3)
verdict(s, "We fix the shop before buying traffic, so the media money does not leak at checkout.",
        "Source: tcboy.com product feed, page source and shipping policy, 5 November 2026.")

# =====================================================================
# 05 THE MARKETPLACES
# =====================================================================
s = slide_base("Resellers set your price on the marketplaces",
               "We found no official TC Boy store on Shopee, Lazada or TikTok Shop.")
base_y, max_h, max_v = 3.85, 2.05, 17.0
bars = [("tcboy.com,\nper can in a carton", 6.80, "RM6.80", TEAL),
        ("Lazada listing,\nseller unknown", 6.90, "RM6.90", PALE),
        ("Lazada reseller,\nEmporium Mall", 15.99, "RM15.99", ORANGE)]
x = 0.75
for label, val, vlabel, color in bars:
    h = max_h * val / max_v
    rect(s, x, base_y - h, 1.35, h, fill=color)
    txt(s, x, base_y - h - 0.30, 1.35, 0.25, vlabel, 16, color if color != PALE else GREY,
        bold=True, align=PP_ALIGN.CENTER)
    txt(s, x - 0.18, base_y + 0.06, 1.71, 0.4, label, 9.5, GREY, align=PP_ALIGN.CENTER, spacing=1.0)
    x += 1.60
txt(s, 6.10, 1.55, 3.35, 2.3,
    "71% of Malaysian online\nshoppers use Shopee, and\n62% use TikTok Shop.\n\n"
    "Shoppers who buy groceries\nonline rose from 34% to 47%.", 12, INK, spacing=1.3)
verdict(s, "Official stores let TC Boy set the price, the pack and the reviews where Malaysians shop.",
        "150g tuna. Lazada checked 5 November 2026. Usage: Ipsos, July 2026. Please tell us about authorized sellers.")

# =====================================================================
# 06 THE PLAN
# =====================================================================
s = slide_base("Fix the shop, prove the protein, then scale",
               "Four moves, in this order, across 2027.")
cw, gap = 2.08, 0.19
cards = [
    ("01", "Fix the shop", "Tracking, official stores on Shopee, Lazada and TikTok Shop, and 6, 12 and 24 can packs."),
    ("02", "Prove the protein", "Protein grams on every listing, and a 12-can protein pack built on the tuna range."),
    ("03", "Borrow credibility", "Trainers, run clubs and HYROX athletes, paid partly by commission on sales."),
    ("04", "Keep the family buyer", "CNY, Ramadan and Raya hampers hold the core customer while the new one grows."),
]
for i, (k, h, b) in enumerate(cards):
    card(s, 0.55 + i * (cw + gap), 1.52, cw if i < 3 else 2.06, 2.55, k, h, b,
         ORANGE if i == 3 else TEAL)
verdict(s, "Each move makes the next one cheaper to run.",
        "Tracked stores make the media smarter, and protein proof makes the creators believable.", top=4.30)

# =====================================================================
# 07 THE BUDGET
# =====================================================================
s = slide_base("Half of the RM200,000 goes straight into media",
               "Everything fits inside RM200,000. Nothing is billed on top.")
bars_h(s, 0.55, 1.55, [
    ("Paid media", 100, "RM100,000", TEAL),
    ("Agency management", 48, "RM48,000", GREY),
    ("E-commerce setup", 18, "RM18,000", PALE),
    ("Content production", 18, "RM18,000", PALE),
    ("Creator seeding", 16, "RM16,000", PALE),
], max_v=100, bar_w=3.6, row_h=0.5, label_w=1.85)
txt(s, 7.05, 1.58, 2.4, 2.4,
    "TikTok Shop affiliates\nearn commission out of\neach sale, so creator\nreach stretches beyond\nthe RM16,000.", 11.5, INK, spacing=1.3)
verdict(s, "Every ringgit outside media exists to make the media convert.",
        "Fee lines are indicative until the quotation. Prices exclude SST. Agency management is 12 months at about RM4,000.")

# =====================================================================
# 08 MEDIA BY PLATFORM
# =====================================================================
s = slide_base("Media follows where Malaysians buy groceries",
               "RM100,000 across five platforms, weighted toward the point of sale.")
rows = [
    ["Platform", "RM", "Job"],
    ["TikTok Ads, GMV Max, Spark Ads", "36,000", "Sales through TikTok Shop and boosted creator posts"],
    ["Shopee and Lazada ads", "26,000", "Search ads and sale-day boosts on the official stores"],
    ["Facebook and Instagram", "22,000", "Family buyers, festive hampers and retargeting"],
    ["Google Search and Shopping", "10,000", "People searching for high-protein food"],
    ["Threads", "6,000", "Two tests of TC Boy's voice in paid placements"],
]
table(s, 0.55, 1.52, 8.9, rows, [2.9, 1.0, 5.0], row_h=0.40, body_size=11.5, accent_rows={1: TEAL})
verdict(s, "About 60% of media is bought against sales, so most of it is judged in ringgit.",
        "By objective: about 60% sales, 25% consideration among fitness audiences, 15% reach and tests.")

# =====================================================================
# 09 FLIGHTING
# =====================================================================
s = slide_base("Media spend peaks when Malaysians shop",
               "Monthly paid media in 2027, in RM thousands.")
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
vals = [5, 10, 9, 8, 6, 8, 6, 8, 9, 9, 12, 10]
moments = {1: "CNY,\nRamadan", 2: "Raya", 3: "Protein\nlaunch", 5: "6.6", 8: "9.9", 10: "11.11", 11: "12.12"}
base_y, max_h, max_v = 3.55, 1.65, 12.0
bw, step, x0 = 0.48, 0.725, 0.70
for i, (m, v) in enumerate(zip(months, vals)):
    h = max_h * v / max_v
    color = TEAL if i < 6 else ORANGE
    rect(s, x0 + i * step, base_y - h, bw, h, fill=color)
    txt(s, x0 + i * step - 0.1, base_y - h - 0.25, bw + 0.2, 0.22, str(v), 11, color, bold=True, align=PP_ALIGN.CENTER)
    txt(s, x0 + i * step - 0.1, base_y + 0.05, bw + 0.2, 0.2, m, 10, INK, align=PP_ALIGN.CENTER)
    if i in moments:
        txt(s, x0 + i * step - 0.2, base_y + 0.26, bw + 0.4, 0.4, moments[i], 8.5, GREY,
            align=PP_ALIGN.CENTER, spacing=1.0)
vx = x0 + 6 * step - (step - bw) / 2
v = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(vx), Inches(1.55), Pt(1.0), Inches(base_y - 1.55))
v.shadow.inherit = False; v.fill.solid(); v.fill.fore_color.rgb = PALE; v.line.fill.background()
txt(s, vx + 0.08, 1.50, 1.6, 0.2, "June checkpoint", 9, GREY)
verdict(s, "H1 spends RM46,000 to earn the evidence. H2 spends RM54,000 on the biggest sale days.",
        "Provisional 2027 dates: CNY about 6 February, Ramadan about 8 February to 9 March, Raya about 10 March.")

# =====================================================================
# 10 THE YEAR
# =====================================================================
s = slide_base("The shop opens before the festive peak",
               "The protein story launches once the shop can sell it.")
qs = [
    ("Q1 · Jan to Mar", "Foundation and festive", "Tracking and three official\nstores live by end of\nFebruary. CNY, Ramadan\nand Raya hampers."),
    ("Q2 · Apr to Jun", "Protein launch", "Protein pack, creator\nprogram and run club\npartners. Checkpoint at\nthe end of June."),
    ("Q3 · Jul to Sep", "Scale what worked", "Media moves to the\nwinning channels.\nMerdeka \"homegrown\nprotein\" and 9.9."),
    ("Q4 · Oct to Dec", "Peak sales", "10.10, 11.11 and 12.12.\nYear-end gym and\nhamper bundles."),
]
for i, (k, h, b) in enumerate(qs):
    card(s, 0.55 + i * (cw + gap), 1.52, cw if i < 3 else 2.06, 2.55, k, h, b, TEAL if i < 2 else ORANGE)
verdict(s, "Q1 is the tightest quarter, because festive demand arrives in February, weeks after kickoff.",
        None, top=4.30)

# =====================================================================
# 11 THREADS
# =====================================================================
s = slide_base("No canned brand has a voice on Threads yet",
               "Malaysian brands made Threads a banter channel, and packaged food stayed away.")
statcard(s, 0.55, 1.52, 2.08, 1.15, "280K", "Watsons Malaysia\nThreads followers", TEAL)
statcard(s, 2.83, 1.52, 2.08, 1.15, "1.5K", "likes on one Lotus's offer\npost, against 19 to 48", TEAL)
statcard(s, 5.11, 1.52, 2.08, 1.15, "0", "canned fish brands we\nfound active on Threads", ORANGE)
statcard(s, 7.39, 1.52, 2.06, 1.15, "RM6,000", "for two paid tests\nbeside Instagram", GREY, figsize=24)
txt(s, 0.55, 2.98, 8.9, 0.8,
    "TC Boy posts daily as a warm, cheeky persona and joins the cheap protein, meal prep and\n"
    "festive conversations, with a person approving every reply.",
    12, INK, spacing=1.3)
verdict(s, "TC Boy can be the first brand to answer the protein questions Malaysians already ask.",
        "Logged-out checks, 5 November 2026. Threads ad reach in Malaysia is 3.6 million (DataReportal 2026).")

# =====================================================================
# 12 CREATORS
# =====================================================================
s = slide_base("Creators who train carry the protein message",
               "Three tiers, each with one job, all inside Malaysian food claim rules.")
rows = [
    ["Tier", "Who", "Job", "Paid by"],
    ["Credible voice", "1 or 2 dietitians or doctors", "Explain protein per can, answer\nsodium and mercury questions", "Flat fee"],
    ["Trainers and athletes", "5 to 8 trainers, runners,\nHYROX athletes", "Show TC Boy in real meal prep", "Fee plus product"],
    ["Everyday affiliates", "30 to 50 TikTok Shop\naffiliates", "Post, tag and sell the protein pack", "Commission per sale"],
]
table(s, 0.55, 1.52, 8.9, rows, [1.9, 2.4, 3.0, 1.6], row_h=0.62, body_size=11)
verdict(s, "Creators say \"protein helps build and repair body tissues\", never \"builds muscle\".",
        "Food Regulations 1985, Regulation 18E. We check every script before it posts, and nobody's body is ever the joke.")

# =====================================================================
# 13 CHECKPOINT
# =====================================================================
s = slide_base("June decides the second half with numbers",
               "We agree the gates now, so a budget increase follows a rule.")
rows = [
    ["Gate", "What we check at the end of June"],
    ["Foundation", "Three official stores live and tracking verified by the end of February"],
    ["Sales", "Online sales against your 2026 baseline, and return on marketplace ads"],
    ["Product", "Protein pack share of online orders, and repeat buyers"],
    ["Brand", "Views on fitness creator content, and the Threads following"],
]
table(s, 0.55, 1.52, 8.9, rows, [1.8, 7.1], row_h=0.42, body_size=11.5)
verdict(s, "Clear the foundation gate and two more, and H2 gets RM30,000 to RM60,000 more media.",
        "The extra media goes into 9.9 to 12.12. Targets are set with you once we see the 2026 baseline.")

# =====================================================================
# 14 PROOF
# =====================================================================
s = slide_base("We have grown online stores like this before",
               "Three e-commerce brands in 2025, each with a different starting problem.")
statcard(s, 0.55, 1.52, 2.84, 1.45, "11.5x", "return on TikTok Shop ads for\nAl Hidayah Publications in four\nmonths, with revenue up 300%", TEAL)
statcard(s, 3.58, 1.52, 2.84, 1.45, "6x", "TikTok return on ad spend for\nEduKids by month two, and a\nnew site at RM14,000 a month", TEAL)
statcard(s, 6.61, 1.52, 2.84, 1.45, "+45%", "return on ad spend for Kualesa\nafter testing small, then\nscaling into five markets", TEAL)
txt(s, 0.55, 3.25, 8.9, 0.8,
    "All three combined marketplace or TikTok Shop selling with paid media, which is the\n"
    "same engine this plan builds for TC Boy.",
    12, INK, spacing=1.3)
verdict(s, "Each result came from testing small first, then putting money behind what sold.",
        "Source: Toggle case studies, 2025. Full case notes available on request.")

# =====================================================================
# 15 THE ASK
# =====================================================================
s = slide_base("What we need from you before we finalize",
               "Five items. Each one changes a number in this plan.")
rows = [
    ["Item", "Owner", "Why it matters"],
    ["Confirm the RM200,000 includes media", "TC Boy", "Decides the RM100,000 media line"],
    ["2026 online sales by channel", "TC Boy", "Sets the baseline for every target"],
    ["Nutrition panel for each SKU", "TC Boy", "Every protein claim needs a gram figure"],
    ["Site developer contact and access", "TC Boy", "Tracking and store fixes start in week one"],
    ["Stock and fulfillment plan", "TC Boy", "Sale days fail if stock runs out"],
]
table(s, 0.55, 1.52, 8.9, rows, [3.5, 1.0, 4.4], row_h=0.38, body_size=11)
verdict(s, "Return the onboarding questionnaire by 13 November, and we book a session that week.",
        None, top=4.60)

prs.save(OUT)
print("saved", os.path.abspath(OUT), len(prs.slides._sldIdLst), "slides")
