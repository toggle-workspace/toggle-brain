#!/usr/bin/env python3
"""
Saji x Bulan Bintang, Ramadan Raya 2027 digital advertising proposal, rev3.

Rebuilt around the Mata Raya point system and the online to offline loop
agreed in the 24 September COO discussion. Design tokens, grid and type
scale are lifted from rev2 so the two decks read as one document.
"""
import math
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR, MSO_AUTO_SIZE
from pptx.enum.shapes import MSO_SHAPE

# ----------------------------------------------------------------------------
# tokens, sampled from rev2
# ----------------------------------------------------------------------------
CREAM  = RGBColor(0xF6, 0xFA, 0xEC)
DARK   = RGBColor(0x05, 0x2B, 0x18)
GREEN  = RGBColor(0x00, 0x68, 0x38)
WHITE  = RGBColor(0xFF, 0xFF, 0xFF)
RED    = RGBColor(0xC5, 0x19, 0x2B)
CARD   = RGBColor(0xE9, 0xF3, 0xDD)
MUTED  = RGBColor(0x6E, 0x8A, 0x76)
YELLOW = RGBColor(0xF5, 0xEC, 0x2E)
ORANGE = RGBColor(0xE8, 0x91, 0x2C)
GOLD   = RGBColor(0xF8, 0xC8, 0x4A)
LINE   = RGBColor(0xB8, 0xCF, 0xBE)
BRIGHT = RGBColor(0x00, 0xA6, 0x51)
INK    = RGBColor(0x1F, 0x33, 0x26)

DISP = "Arial Black"
BODY = "Arial"

# grid
ML, CW = 0.56, 8.88
BODY_Y, BODY_H = 1.63, 3.02

prs = Presentation()
prs.slide_width = Inches(10)
prs.slide_height = Inches(5.625)
BLANK = prs.slide_layouts[6]


# ----------------------------------------------------------------------------
# primitives
# ----------------------------------------------------------------------------
def new_slide(bg=CREAM):
    s = prs.slides.add_slide(BLANK)
    s.background.fill.solid()
    s.background.fill.fore_color.rgb = bg
    return s


def rect(slide, x, y, w, h, fill, radius=None):
    shp = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE,
        Inches(x), Inches(y), Inches(w), Inches(h))
    shp.fill.solid()
    shp.fill.fore_color.rgb = fill
    shp.line.fill.background()
    shp.shadow.inherit = False
    if radius:
        shp.adjustments[0] = radius
    tf = shp.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    return shp


def text(slide, x, y, w, h, runs, size=9, color=INK, font=BODY, bold=False,
         align=PP_ALIGN.LEFT, space=0, anchor=MSO_ANCHOR.TOP, line=0.92):
    """runs: a string, or a list of (text, {overrides}) tuples."""
    tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.auto_size = MSO_AUTO_SIZE.NONE
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = anchor

    if isinstance(runs, str):
        runs = [(runs, {})]
    p = tf.paragraphs[0]
    p.alignment = align
    p.line_spacing = line
    if space:
        p.space_after = Pt(space)
    for t, ov in runs:
        r = p.add_run()
        r.text = t
        f = r.font
        f.name = ov.get("font", font)
        f.size = Pt(ov.get("size", size))
        f.bold = ov.get("bold", bold)
        f.color.rgb = ov.get("color", color)
    return tb


def bullets(slide, x, y, w, h, items, size=8.5, color=INK, gap=4.5,
            bold_lead=False, lead_color=GREEN, marker=None, line=1.06):
    tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.auto_size = MSO_AUTO_SIZE.NONE
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    for i, it in enumerate(items):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.line_spacing = line
        p.space_after = Pt(gap)
        if marker:
            r = p.add_run()
            r.text = marker + "  "
            r.font.name = BODY
            r.font.size = Pt(size)
            r.font.bold = True
            r.font.color.rgb = lead_color
        if bold_lead and isinstance(it, tuple):
            lead, rest = it
            r = p.add_run()
            r.text = lead
            r.font.name = BODY
            r.font.size = Pt(size)
            r.font.bold = True
            r.font.color.rgb = lead_color
            r2 = p.add_run()
            r2.text = rest
            r2.font.name = BODY
            r2.font.size = Pt(size)
            r2.font.color.rgb = color
        else:
            r = p.add_run()
            r.text = it if isinstance(it, str) else "".join(it)
            r.font.name = BODY
            r.font.size = Pt(size)
            r.font.color.rgb = color
    return tb


# ----------------------------------------------------------------------------
# slide furniture
# ----------------------------------------------------------------------------
def head(slide, title, kicker=None, tick=RED):
    """Measure the title and kicker, then set the top of the content band to
    wherever the kicker actually ends. Nothing below can collide with them."""
    global _band_top
    rect(slide, ML, 0.40, 0.24, 0.08, tick)
    th = est_h(title, CW, 24, 0.96)
    if "|" in title:
        a, b = title.split("|", 1)
        text(slide, ML, 0.62, CW, th + 0.08,
             [(a, {"color": GREEN}), (b, {"color": MUTED})],
             size=24, font=DISP, line=0.96)
    else:
        text(slide, ML, 0.62, CW, th + 0.08, title, size=24, font=DISP,
             color=GREEN, line=0.96)
    y = 0.62 + th + 0.16
    if kicker:
        # subtext spans the full heading width, never capped narrower
        kh = est_h(kicker, CW, 11, 1.12)
        text(slide, ML, y, CW, kh + 0.08, kicker, size=11, color=MUTED, line=1.12)
        y += kh + 0.22
    _band_top = max(1.63, y)
    return _band_top


def foot(slide, lead, rest):
    rect(slide, 0.48, 4.86, 9.04, 0.44, DARK)
    text(slide, 0.72, 4.90, 8.56, 0.38,
         [(lead + " ", {"color": YELLOW, "bold": True}), (rest, {"color": WHITE})],
         size=9.5, anchor=MSO_ANCHOR.MIDDLE, line=1.0)


def divider(num, title, kicker):
    s = new_slide(DARK)
    rect(s, 0, 0, 0.14, 5.625, RED)
    text(s, 0.70, 1.70, 4.00, 0.40, num, size=21, font=DISP, color=WHITE)
    text(s, 0.70, 2.32, 7.60, 0.90, title, size=38, font=DISP, color=WHITE, line=0.94)
    text(s, 0.70, 3.35, 8.60, 0.90, kicker, size=15, color=GOLD, line=1.18)
    return s


def est_h(txt, width_in, size_pt, line_spacing=1.14):
    """Estimate rendered height. Calibrated against Arial at 8.5pt, where a
    2.47in column fits about 44 characters per line."""
    # 0.84 accounts for ragged-right wrapping plus the gap between our renderer's
    # metrics and PowerPoint's. Erring toward MORE predicted lines is the safe side.
    cpi = 17.6 * 8.5 / size_pt
    cpl = max(6.0, width_in * cpi * 0.84)
    lines = 0
    for para in str(txt).split("\n"):
        lines += max(1, math.ceil(len(para) / cpl))
    return lines * size_pt * line_spacing / 72.0


# the band a content block may occupy, between the kicker and the footer bar.
# _band_top is recomputed by head() on every slide from the real title and kicker
# heights, so a heading that wraps an extra line pushes the body down instead of
# being overlapped by it.
BAND_BOT = 4.74
_band_top = 1.63


def vcenter(block_h):
    # biased above true center, so a short block reads as attached to the kicker
    return _band_top + max(0.0, (BAND_BOT - _band_top - block_h) * 0.34)


def cards(slide, items, y=None, h=None, cols=3, gap=0.20, pad=0.18):
    """Each card is ONE text frame holding flowing paragraphs.

    Stacking separate text boxes at estimated offsets is what let blocks collide:
    if PowerPoint wrapped one line more than predicted, a box overran the box
    below it. Paragraphs inside a shared frame reflow instead, so overlap is
    structurally impossible. Card height is still estimated, but only to size the
    panel, and an underestimate now costs whitespace instead of a collision."""
    w = (CW - gap * (cols - 1)) / cols
    iw = w - pad * 2
    hs = 12.5 if cols <= 3 else 10.5
    BAR = 0.06

    def specs(it):
        """(text, size, font, color, bold, line_spacing, space_after_pt)"""
        out = []
        if it.get("big"):
            out.append((it["big"], 20, DISP, it.get("accent", GREEN), False, 0.94, 4))
        if it.get("eyebrow"):
            out.append((it["eyebrow"].upper(), 8, BODY, MUTED, True, 1.0, 5))
        if it.get("head"):
            out.append((it["head"], hs, DISP, GREEN, False, 0.96, 7))
        for label, body in it.get("blocks", []):
            if label:
                out.append((label.upper(), 7.5, BODY, ORANGE, True, 1.0, 3))
            out.append((body, it.get("body_size", 8.5), BODY, INK, False, 1.14, 8))
        return out

    def measure(it):
        return sum(est_h(t, iw, sz, ls) + sa / 72.0
                   for t, sz, fn, cl, bd, ls, sa in specs(it))

    H = max(measure(it) for it in items) + pad + BAR + 0.18
    top = y if y is not None else vcenter(H)
    H = min(H, BAND_BOT - top)

    for i, it in enumerate(items):
        x = ML + i * (w + gap)
        shp = rect(slide, x, top, w, H, it.get("fill", CARD))
        rect(slide, x, top, w, BAR, it.get("accent", GREEN))
        tf = shp.text_frame
        tf.word_wrap = True
        tf.auto_size = MSO_AUTO_SIZE.NONE
        tf.vertical_anchor = MSO_ANCHOR.TOP
        tf.margin_left = tf.margin_right = Inches(pad)
        tf.margin_top = Inches(pad + BAR)
        tf.margin_bottom = Inches(0.10)
        for j, (t, sz, fn, cl, bd, ls, sa) in enumerate(specs(it)):
            p = tf.paragraphs[0] if j == 0 else tf.add_paragraph()
            # autoshape text frames default to centered, so set this explicitly
            p.alignment = PP_ALIGN.LEFT
            p.line_spacing = ls
            p.space_after = Pt(sa)
            r = p.add_run()
            r.text = t
            r.font.name = fn
            r.font.size = Pt(sz)
            r.font.bold = bd
            r.font.color.rgb = cl
    return top + H


def table(slide, headers, rows, col_w, y=None, hh=0.30, rh=0.285,
          fs=8.5, hfs=7.0, x=ML, first_bold=True, note=None):
    total = sum(col_w)
    # every row clears its tallest cell, so a cell that wraps to two lines can
    # never spill down into the row beneath it
    need = max((est_h(str(c), col_w[i] - 0.20, fs, 1.06)
                for row in rows for i, c in enumerate(row)), default=0.0)
    rh = max(rh, need + 0.13)
    hneed = max((est_h(str(hd), col_w[i] - 0.20, hfs, 1.0)
                 for i, hd in enumerate(headers)), default=0.0)
    hh = max(hh, hneed + 0.12)
    if y is None:
        block = hh + rh * len(rows)
        if note:
            block += 0.10 + est_h(note, total, 8, 1.12)
        y = vcenter(block)
    # header
    rect(slide, x, y, total, hh, GREEN)
    cx = x
    for i, hd in enumerate(headers):
        text(slide, cx + 0.10, y + 0.06, col_w[i] - 0.14, 0.20, hd.upper(),
             size=hfs, color=WHITE, bold=True, line=1.0)
        cx += col_w[i]
    # rows
    ry = y + hh
    for j, row in enumerate(rows):
        fill = WHITE if j % 2 == 0 else CARD
        rect(slide, x, ry, total, rh, fill)
        cx = x
        for i, cell in enumerate(row):
            strong = (i == 0 and first_bold)
            col = GREEN if strong else INK
            text(slide, cx + 0.10, ry + 0.055, col_w[i] - 0.14, rh - 0.08, str(cell),
                 size=fs, color=col, bold=strong, line=1.0)
            cx += col_w[i]
        ry += rh
    if note:
        text(slide, x, ry + 0.10, total, est_h(note, total, 8, 1.12) + 0.06, note,
             size=8, color=MUTED, line=1.12)
    return ry


# ============================================================================
# 1. cover
# ============================================================================
s = new_slide(DARK)
rect(s, 0, 0, 0.14, 5.625, RED)
rect(s, 0.70, 1.20, 0.34, 0.07, GOLD)
text(s, 0.70, 1.46, 7.0, 0.26, "INTERNAL WORKING DECK  ·  REV3-CLEANED  ·  30 SEPTEMBER 2026",
     size=9.5, color=GOLD, bold=True)
text(s, 0.70, 1.88, 8.40, 0.64, "TerSaji Raya 2027", size=44, font=DISP, color=WHITE, line=0.94)
text(s, 0.70, 2.70, 8.40, 0.44, "Saji Ramadan Raya contest, digital plan",
     size=19, color=WHITE, line=1.0)
text(s, 0.70, 3.26, 8.50, 0.88,
     "The Mata Raya point system, how people move from ads to shops, and what we need "
     "Saji to answer.",
     size=13.5, color=GOLD, line=1.22)
rect(s, 0.70, 4.42, 8.60, 0.02, RGBColor(0x1D, 0x4A, 0x33))
text(s, 0.70, 4.60, 8.60, 0.30, "Toggle Solutions and COO   ·   For the 14 October session",
     size=10, color=RGBColor(0x9F, 0xBF, 0xA9))

# ============================================================================
# 2. where we landed
# ============================================================================
s = new_slide()
head(s, "Where we landed.",
     "We wrote rev2 on 15 September. Two meetings after that changed the plan.")
cards(s, [
    {"eyebrow": "22 September", "head": "We met Bulan Bintang", "accent": ORANGE,
     "blocks": [("", "They asked for a title sponsorship worth at least RM1.5 million. The "
                     "split is 40% product and 60% cash. Saji committed 300,000 sampling packs "
                     "worth about RM500,000.")]},
    {"eyebrow": "24 September", "head": "Saji narrowed the ask", "accent": RED,
     "blocks": [("", "Saji wants to push new product sampling. They will focus on bazaars and "
                     "roadshows. They are unlikely to take the Gold tier. The mechanic must work "
                     "with or without Bulan Bintang.")]},
    {"eyebrow": "What this changed", "head": "The pop-up is gone", "accent": GREEN,
     "blocks": [("", "Our rev2 plan put a Saji counter inside all 14 boutiques. Everything depended on "
                     "that one yes. We now build a point system that runs on Saji alone.")]},
], h=3.02)
foot(s, "The fix:", "Bulan Bintang now adds Mata instead of blocking entry.")

# ============================================================================
# 3. the problem
# ============================================================================
s = new_slide()
head(s, "Reach went up every year. Entries went down every year.",
     "The last column counts entries for every million people reached. It has fallen 90% since 2022.")
table(s,
      ["YEAR", "IMPRESSIONS", "VIEWS", "REACH", "ENGAGEMENT", "ENTRIES", "ENTRIES PER 1M REACHED"],
      [["2022", "15.06M", "3.40M", "4.46M", "0.94M", "11,834", "2,653"],
       ["2023", "40.03M", "13.81M", "15.61M", "17.35M", "8,464", "542"],
       ["2024", "50.40M", "10.43M", "15.66M", "6.85M", "7,576", "484"],
       ["2025", "51.60M", "11.21M", "20.12M", "1.88M", "4,179", "208"],
       ["2026", "51.00M", "38.82M", "13.80M", "0.04M", "3,765", "273"]],
      col_w=[0.78, 1.36, 1.14, 1.14, 1.42, 1.14, 1.90], rh=0.30,
      note="Source: the RARA 2025 and RARA 2026 decks.")
foot(s, "The cause:",
     "entering cost RM175 across two brands and two shops. We are fixing the price of entry "
     "rather than the media budget.")

# ============================================================================
# 4. the mechanic
# ============================================================================
s = new_slide()
head(s, "The mechanic is one balance and four rules.",
     "We call the points Mata. Every shopper has one Mata balance that runs for ten weeks.")
cards(s, [
    {"big": "01", "eyebrow": "Earn", "accent": GREEN, "body_h": 1.48,
     "blocks": [("", "Every RM1 of Saji earns 1 Mata. Receipts, bonus codes and featured "
                     "products all pay into the same balance.")]},
    {"big": "02", "eyebrow": "Qualify", "accent": ORANGE, "body_h": 1.48,
     "blocks": [("", "Every 25 Mata gives one chance in that week's draw. More Mata means more "
                     "chances in the same draw.")]},
    {"big": "03", "eyebrow": "Keep", "accent": RED, "body_h": 1.48,
     "blocks": [("", "The balance never resets. Mata earned in February still count in the "
                     "final draw on 9 April.")]},
    {"big": "04", "eyebrow": "Unlock", "accent": GOLD, "body_h": 1.48,
     "blocks": [("", "At 50, 150 and 300 Mata a shopper gets a reward. These rewards need no "
                     "luck at all.")]},
], cols=4)
foot(s, "One rule protects the sales logic:",
     "a shopper needs at least one Saji receipt before Mata turn into chances.")

# ============================================================================
# 5. how people earn
# ============================================================================
s = new_slide()
head(s, "Four ways to earn Mata.",
     "Each route pays into the same balance. Each one carries its own tracking tag.")
table(s,
      ["ROUTE", "WHAT IT PAYS", "WHERE IT HAPPENS", "WHAT SAJI GETS BACK"],
      [["Saji receipt", "RM1 = 1 Mata", "Any shop that sells Saji",
        "Basket size and which products people buy"],
       ["Featured product", "2x or 3x Mata", "Saji picks one product each Monday",
        "Trial of a new product with no price cut"],
       ["Bonus QR code", "25 to 50 Mata", "Roadshows, bazaars, packs, shelves",
        "Footfall turned into a contact we can reach again"],
       ["Streak and referral", "25 Mata", "The contest page",
        "Repeat visits and free reach"]],
      col_w=[1.60, 1.46, 2.42, 3.40], rh=0.42)
foot(s, "The featured product is the strongest part:",
     "Saji can push a different product every week and never cut the price.")

# ============================================================================
# 6. what people win
# ============================================================================
s = new_slide()
head(s, "What people win.",
     "The prize pool is RM70,000. Milestones and the leaderboard add no cash cost.")
cards(s, [
    {"big": "RM56,000", "eyebrow": "40 weekly winners", "head": "Four a week, ten weeks",
     "accent": GREEN, "body_h": 1.24,
     "blocks": [("", "Each winner gets RM500 cash and RM900 of Saji products. More Mata "
                     "means more chances in the weekly draw.")]},
    {"big": "RM14,000", "eyebrow": "One grand draw", "head": "Drawn on 9 April",
     "accent": GOLD, "body_h": 1.24,
     "blocks": [("", "This draw uses every Mata a shopper earned across all ten weeks. Week "
                     "one spending still counts in April.")]},
    {"big": "Top 10", "eyebrow": "One national board", "head": "Rank and the gap above you",
     "accent": ORANGE, "body_h": 1.24,
     "blocks": [("", "We show the top five, your own rank, and the Mata gap to the person "
                     "above you. The top ten at the close win the Campaign Pack.")]},
], h=2.55)
rect(s, ML, 4.26, CW, 0.44, CARD)
rect(s, ML, 4.26, 0.05, 0.44, RED)
text(s, ML + 0.18, 4.34, CW - 0.32, 0.30,
     [("Milestones: ", {"bold": True, "color": GREEN}),
      ("a shopper gets the Mystery Gift at 50 Mata and the Campaign Pack at 150. At 300 "
       "Mata she gets a guaranteed spin. Nobody needs luck to collect these.", {})],
     size=8.5, line=1.08)
foot(s, "Why the board is national:",
     "Selangor has about 1,176 collectors and Perlis about 38. One state prize for both is "
     "unfair and easy to game.")

# ============================================================================
# 7. with or without bulan bintang
# ============================================================================
s = new_slide()
head(s, "The contest works with or without Bulan Bintang.",
     "Saji asked for this on 24 September. Config A ships alone. Config B switches on the day "
     "they sign.")
cards(s, [
    {"eyebrow": "Config A  ·  we build this one", "head": "Saji only", "accent": GREEN,
     "body_h": 1.70,
     "blocks": [("", "RM1 of Saji earns 1 Mata at any shop. Roadshow trucks, bazaars, shelf "
                     "displays and the 300,000 sample packs carry the codes. Prizes, draws and "
                     "milestones all run as planned. Nothing waits for a partner signature.")]},
    {"eyebrow": "Config B  ·  we switch this on", "head": "With Bulan Bintang", "accent": ORANGE,
     "body_h": 1.70,
     "blocks": [("", "A boutique receipt earns bonus Mata up to a cap. Each of the 14 stores "
                     "carries a 50 Mata code. Their footfall and their 400,000 data records come "
                     "in as extra reach. The pop-up kiosk becomes a bonus.")]},
], cols=2)
foot(s, "What this buys us:",
     "we can lock the build in December without knowing their answer.")

# ============================================================================
# 8. online to offline
# ============================================================================
s = new_slide()
head(s, "Online to offline, and back again.",
     "Ads send people to the page. Codes at every physical stop bring them back. Every code "
     "below lands on the same page.")
table(s,
      ["TOUCHPOINT", "WHAT IT PAYS", "TAG", "HOW MUCH WE HAVE IN 2027"],
      [["Saji receipt, any shop", "RM1 = 1 Mata", "receipt", "Every shop that sells Saji"],
       ["Roadshow truck QR", "50 Mata and one spin", "roadshow", "96 roadshow days at 32 shops"],
       ["Shelf display QR", "25 Mata", "posm", "320 sampling days at 120 shops"],
       ["Sample pack code", "25 Mata", "sampling", "300,000 packs"],
       ["Campaign pack code", "50 Mata", "pack", "Limited run, volume to confirm"],
       ["Weekly WhatsApp code", "25 Mata", "crm", "Everyone who registered"],
       ["Bulan Bintang store QR", "50 Mata", "partner", "14 stores, Config B only"]],
      col_w=[2.46, 1.86, 0.92, 3.64], rh=0.295)
foot(s, "What 2026 was missing:",
     "entries came by WhatsApp, so Meta and TikTok never saw them.")

# ============================================================================
# 9. ten weeks with one shopper
# ============================================================================
s = new_slide()
head(s, "Ten weeks with one shopper.",
     "Puan Noraini is 38 and lives in Sungai Petani. Every number below follows the rules on "
     "slide 4.")
table(s,
      ["WEEK", "WHAT SHE DOES", "MATA", "BALANCE", "WHAT SAJI LEARNS"],
      [["1", "Taps a TikTok ad and registers in 40 seconds", "0", "0", "Name, phone, Kedah"],
       ["2", "Buys RM38 of Saji and uploads the receipt", "+38", "38", "Her first basket size"],
       ["3", "Buys the new Ketupat product on a 2x week", "+40", "78", "She tried a new product"],
       ["4", "Scans the truck at the bazaar and wins an apron", "+50", "128", "The roadshow worked"],
       ["5", "Enters the weekly code from her WhatsApp", "+25", "153", "We reach her for free"],
       ["6", "Sees the brand film as a retargeted view", "0", "153", "Cheaper film delivery"],
       ["8", "Buys RM60 of Raya food with a 2x product", "+120", "273", "A second new product"],
       ["10", "Buys RM55 more before the contest closes", "+55", "328", "Her full season profile"]],
      col_w=[0.62, 3.62, 0.72, 0.92, 2.46], rh=0.285, fs=8.0, hfs=6.8)
foot(s, "At the close:",
     "13 chances, RM173 of tracked spend, four receipts and two new products tried.")

# ============================================================================
# 10. the landing page
# ============================================================================
s = new_slide()
head(s, "The landing page.",
     "The rev1 page was a form people filled once. It now holds a balance people come back to.")
cards(s, [
    {"eyebrow": "At the front door", "head": "Registration is free", "accent": GREEN,
     "body_h": 1.10,
     "blocks": [("", "A shopper gives three fields and gets a Mata balance. She needs no "
                     "purchase and no app. Her receipt can come weeks later.")]},
    {"eyebrow": "On every return visit", "head": "The balance leads", "accent": ORANGE,
     "body_h": 1.10,
     "blocks": [("", "She sees her Mata, her chances, and how far she is from her next "
                     "reward. A first-time visitor sees the prize instead.")]},
    {"eyebrow": "One box, seven codes", "head": "Every code lands here", "accent": RED,
     "body_h": 1.10,
     "blocks": [("", "Roadshow, pack, shelf and WhatsApp codes all use the same field. Each "
                     "code keeps its own tag, so we can report what worked.")]},
    {"eyebrow": "The technical reason", "head": "We optimize to sign-ups", "accent": GOLD,
     "body_h": 1.10,
     "blocks": [("", "4,000 receipt uploads is 400 a week. Split across campaigns, most ad sets never "
                     "leave the learning phase. 12,000 sign-ups fixes that.")]},
], cols=4)
foot(s, "Why we send people to a page:",
     "you cannot scan a QR code with the phone that is showing it.")

# ============================================================================
# 11. the media plan
# ============================================================================
s = new_slide()
head(s, "The media plan.",
     "Half of these numbers come from Saji's 2025 delivery. Half are our estimates, because no "
     "past deck shows the spend.")
alloc = [("40%", "Contest sign-ups", GREEN), ("52%", "Video and reach", ORANGE),
         ("8%", "KOL Spark Ads", RED)]
aw = (CW - 0.40) / 3
for i, (pct, lab, col) in enumerate(alloc):
    ax = ML + i * (aw + 0.20)
    rect(s, ax, 1.70, aw, 0.52, CARD)
    rect(s, ax, 1.70, 0.05, 0.52, col)
    text(s, ax + 0.16, 1.77, 0.72, 0.30, pct, size=16, font=DISP, color=col, line=0.94)
    text(s, ax + 0.94, 1.83, aw - 1.10, 0.30, lab, size=9.5, color=INK, bold=True, line=1.0)
table(s,
      ["LINE", "PLATFORM", "OBJECTIVE", "CPM", "VIEW RATE", "PER VIEW OR CPC", "WHERE IT CAME FROM"],
      [["Contest", "Meta", "Sign-ups", "RM22.00", "n/a", "CPC RM0.45", "CPM estimated, CTR from 2025"],
       ["Contest", "TikTok", "Sign-ups", "RM15.00", "n/a", "CPC RM0.30", "CPM estimated, CTR from 2025"],
       ["Video", "TikTok", "Video views", "RM2.20", "70%", "RM0.0031", "2025 delivery"],
       ["Video", "Meta", "Reels video", "RM3.50", "55%", "RM0.0064", "2025 frequency, rest estimated"],
       ["Video", "YouTube", "In-stream", "RM3.80", "32%", "RM0.0119", "Estimated"],
       ["Engage", "TikTok", "Spark on KOL", "RM2.60", "65%", "RM0.0040", "Estimated"]],
      col_w=[0.72, 0.84, 1.10, 0.82, 0.96, 1.30, 3.14], y=2.42, rh=0.285, fs=8.0, hfs=6.6)
foot(s, "We run the contest as two campaigns:",
     "KL and Selangor take 30% and the other states 70%. One campaign would spend it all in KL.")

# ============================================================================
# 12. what it delivers
# ============================================================================
s = new_slide()
head(s, "What RM145,000 delivers.",
     "This covers media, production, creative and management for ten weeks. The RM70,000 "
     "prize pool sits outside it.")
table(s,
      ["MEASURE", "BRIEF TARGET", "OUR PLAN", "2026 ACTUAL"],
      [["Contest entrants (with receipt)", "4,000", "5,040", "3,765"],
       ["Sign-ups (no purchase needed)", "Not set", "12,000", "0"],
       ["Qualifying receipts", "Not set", "13,100", "Not tracked"],
       ["Paid reach", "15M", "13.9M", "13.8M"],
       ["Video views", "40M campaign wide", "15.1M paid", "38.8M campaign wide"],
       ["Impressions", "Not set", "25.7M", "51.0M"],
       ["Engagement rate", "3%", "2.3% of impressions", "0.08% of impressions"]],
      col_w=[2.46, 2.16, 2.20, 2.06], rh=0.285,
      note="Our plan column is paid media only. KOL, organic, roadshows and sample packs all "
           "sit on top of it.")
foot(s, "The number to watch:",
     "we estimated the 7.5% sign-up rate. Nobody has measured it. At 5% we get 2,800 entrants.")

# ============================================================================
# 13. timeline
# ============================================================================
s = new_slide()
head(s, "Timeline.",
     "We present on 14 or 15 October. The page has to be live on 15 January.")
miles = [("14 Oct", "Present to Saji"), ("Late Oct", "Award"),
         ("Mid Dec", "Permit and packaging"), ("15 Jan", "Page live"),
         ("25 Jan", "Launch event"), ("1 Feb", "Contest ads live"),
         ("5 Apr", "Contest closes")]
mw = (CW - 0.12 * 6) / 7
rect(s, ML, 1.92, CW, 0.035, LINE)
for i, (d, lab) in enumerate(miles):
    mx = ML + i * (mw + 0.12)
    col = GREEN if i in (3, 5) else (RED if i == 6 else MUTED)
    rect(s, mx + mw / 2 - 0.05, 1.86, 0.10, 0.15, col)
    text(s, mx, 1.66, mw, 0.20, d, size=9.5, font=DISP, color=col, align=PP_ALIGN.CENTER, line=1.0)
    text(s, mx, 2.14, mw, 0.40, lab, size=7.8, color=INK, align=PP_ALIGN.CENTER, line=1.08)
cards(s, [
    {"eyebrow": "Weeks 1 to 3", "head": "1 to 23 February", "accent": GREEN, "body_h": 1.00,
     "blocks": [("", "The contest runs alone with no film yet. Chinese New Year lands on "
                     "6 February, so we cut weight 30% for three days. Ramadan opens 8 February. "
                     "First four winners on 19 February.")]},
    {"eyebrow": "Weeks 4 to 6", "head": "24 February to 9 March", "accent": ORANGE, "body_h": 1.00,
     "blocks": [("", "Teasers run on 17 and 22 February. The film launches 24 February. We "
                     "retarget film viewers into the contest. They convert best because they "
                     "are already registered.")]},
    {"eyebrow": "Weeks 7 to 10", "head": "10 March to 5 April", "accent": RED, "body_h": 1.00,
     "blocks": [("", "Raya lands 10 March, so we pull contest spend for three days. Balik "
                     "kampung and open house run through Syawal. Grand draw 9 April and the "
                     "report by 17 April.")]},
], y=2.68)
foot(s, "The date that cannot move:",
     "15 January. The page, the Mata system and every printed code must be live and tested.")

# ============================================================================
# 14. open questions
# ============================================================================
s = new_slide()
head(s, "What is still open.",
     "Six risks we are carrying, and eight answers we need from Saji.")
rect(s, ML, 1.62, 4.34, 3.12, CARD)
rect(s, ML, 1.62, 4.34, 0.06, RED)
text(s, ML + 0.18, 1.82, 3.98, 0.20, "RISKS WE CARRY", size=8, color=MUTED, bold=True)
bullets(s, ML + 0.18, 2.08, 3.98, 2.54, [
    "We built on RM145,000. The RM50,000 from 24 September looks like the Bulan Bintang tier "
    "rather than our budget.",
    "The 7.5% sign-up rate is an estimate. At 5% we miss the 4,000 target.",
    "Checking 13,100 receipts is three times the 2026 workload. We have not costed the people "
    "for it.",
    "A draw plus any instant win may count as two games of chance under one permit.",
    "Roda Rezeki stock, truck numbers and bazaar space sit outside this budget.",
    "We still do not know what 2026 spent by platform, so every CPM is an estimate.",
], size=7.8, gap=6.0, marker="▪", lead_color=RED)

rect(s, 5.10, 1.62, 4.34, 3.12, CARD)
rect(s, 5.10, 1.62, 4.34, 0.06, GREEN)
text(s, 5.28, 1.82, 3.98, 0.20, "ANSWERS WE NEED FROM SAJI", size=8, color=MUTED, bold=True)
bullets(s, 5.28, 2.08, 3.98, 2.54, [
    "Is RM50,000 our campaign budget, or the Bulan Bintang tier?",
    "What did the 2026 campaign spend on digital, by platform?",
    "Which products carry the Mata multiplier, and who signs off each Monday?",
    "One grand draw of RM14,000, or a smaller prize every week?",
    "Does Bulan Bintang join, at which tier, and by what date?",
    "How many roadshow and bazaar stops, and how many trucks?",
    "Who owns the entry database, and who is the PDPA data controller?",
    "Who checks the receipts, and how fast can they do it?",
], size=7.8, gap=5.0, marker="▪", lead_color=GREEN)
foot(s, "Two things block the 15 January page:",
     "pixel access and the domain. We can work around everything else.")

# ----------------------------------------------------------------------------
import sys
out = sys.argv[1] if len(sys.argv) > 1 else "rev3-cleaned.pptx"
prs.save(out)
print("saved " + out + " with " + str(len(prs.slides.__iter__.__self__._sldIdLst)) + " slides")
