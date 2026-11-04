# -*- coding: utf-8 -*-
"""ELT x Toggle positioning + creative strategy deck. House style, 10 x 5.625in."""
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
from lxml import etree

INK    = RGBColor(0x14, 0x20, 0x1F)
GREY   = RGBColor(0x5B, 0x6B, 0x6A)
PALE   = RGBColor(0xA9, 0xB5, 0xB4)
TEAL   = RGBColor(0x02, 0x95, 0xAD)
ORANGE = RGBColor(0xC0, 0x70, 0x16)
TINT   = RGBColor(0xF2, 0xF6, 0xF5)
RULE   = RGBColor(0xDD, 0xE5, 0xE3)
WHITE  = RGBColor(0xFF, 0xFF, 0xFF)

FOOTER = "ELT × Toggle · Sept 2026"
FONT = "Arial"

# Canonical wordmark, per clients/toggle/design-system/BRAND-IDENTITY.md section 3.
# Outlined vector export, never re-typeset from Alliance No 1. Black on light surfaces.
LOGO = "/Users/yiyang/Desktop/Toggle_Claude/toggle-brain/assets/logos/toggle-wordmark-black.png"
LOGO_RATIO = 2864.0 / 784.0   # 3.653

def wordmark(slide, left, top, width):
    """Place the wordmark at a given width. Height derives from the locked aspect ratio,
    so the mark is never stretched."""
    return slide.shapes.add_picture(LOGO, Inches(left), Inches(top),
                                    width=Inches(width), height=Inches(width / LOGO_RATIO))

prs = Presentation()
prs.slide_width  = Inches(10)
prs.slide_height = Inches(5.625)
BLANK = prs.slide_layouts[6]

# ---------- primitives ----------

def txt(slide, l, t, w, h, text, size, color, bold=False,
        align=PP_ALIGN.LEFT, spacing=None, anchor=MSO_ANCHOR.TOP):
    tb = slide.shapes.add_textbox(Inches(l), Inches(t), Inches(w), Inches(h))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = anchor
    lines = text.split("\n")
    for i, line in enumerate(lines):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        if spacing:
            p.line_spacing = spacing
        r = p.add_run()
        r.text = line
        r.font.name = FONT
        r.font.size = Pt(size)
        r.font.bold = bold
        r.font.color.rgb = color
    return tb

def rect(slide, l, t, w, h, fill=None, line=None, lw=0.75):
    sh = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(l), Inches(t), Inches(w), Inches(h))
    sh.shadow.inherit = False
    if fill is None:
        sh.fill.background()
    else:
        sh.fill.solid()
        sh.fill.fore_color.rgb = fill
    if line is None:
        sh.line.fill.background()
    else:
        sh.line.color.rgb = line
        sh.line.width = Pt(lw)
    sh.text_frame.word_wrap = True
    return sh

def hline(slide, l, t, w, color=RULE, lw=0.75):
    sh = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(l), Inches(t), Inches(w), Pt(lw))
    sh.shadow.inherit = False
    sh.fill.solid()
    sh.fill.fore_color.rgb = color
    sh.line.fill.background()
    return sh

def dot(slide, cx, cy, d, color):
    sh = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(cx - d / 2), Inches(cy - d / 2), Inches(d), Inches(d))
    sh.shadow.inherit = False
    sh.fill.solid()
    sh.fill.fore_color.rgb = color
    sh.line.fill.background()
    return sh

PAGE = {"n": 0}

def slide_base(title, subtitle):
    """House grid: title 26pt bold @0.34, subtitle 13pt grey @0.87, rule @1.26, footer @5.21."""
    PAGE["n"] += 1
    s = prs.slides.add_slide(BLANK)
    txt(s, 0.55, 0.34, 8.9, 0.5, title, 26, INK, bold=True, spacing=0.95)
    if subtitle:
        txt(s, 0.55, 0.87, 8.9, 0.32, subtitle, 13, GREY)
    hline(s, 0.55, 1.26, 8.9)
    txt(s, 0.55, 5.21, 5.0, 0.2, FOOTER, 9, PALE)
    txt(s, 7.30, 5.21, 1.05, 0.2, str(PAGE["n"]), 9, PALE, align=PP_ALIGN.RIGHT)
    wordmark(s, 8.55, 5.13, 0.90)   # 22.9mm, clears the 20mm print minimum
    return s

def verdict(s, text, caveat=None, top=4.42):
    txt(s, 0.55, top, 8.9, 0.42, text, 15.5, INK, spacing=1.0)
    if caveat:
        txt(s, 0.55, top + 0.46, 8.9, 0.4, caveat, 11, GREY, spacing=1.0)

def statcard(s, l, t, w, h, figure, label, figcolor=TEAL, figsize=28):
    rect(s, l, t, w, h, fill=TINT)
    txt(s, l + 0.18, t + 0.16, w - 0.36, 0.45, figure, figsize, figcolor, bold=True)
    txt(s, l + 0.18, t + 0.16 + figsize / 62.0, w - 0.36, h - 0.5, label, 10.5, GREY, spacing=1.05)

def set_border(cell, color="DDE5E3", lw=0.75):
    tcPr = cell._tc.get_or_add_tcPr()
    for e in tcPr.findall(qn("a:lnB")):
        tcPr.remove(e)
    ln = etree.SubElement(tcPr, qn("a:lnB"))
    ln.set("w", str(int(lw * 12700)))
    ln.set("cap", "flat"); ln.set("cmpd", "sng"); ln.set("algn", "ctr")
    fill = etree.SubElement(ln, qn("a:solidFill"))
    clr = etree.SubElement(fill, qn("a:srgbClr"))
    clr.set("val", color)
    tcPr.remove(ln)
    tcPr.insert(0, ln)

def table(s, l, t, w, rows_data, col_w, head_size=10, body_size=11.5,
          row_h=0.34, head_h=0.30, accent_rows=None):
    """rows_data[0] is the header row. accent_rows: {row_index: color}."""
    accent_rows = accent_rows or {}
    nrows, ncols = len(rows_data), len(rows_data[0])
    gt = s.shapes.add_table(nrows, ncols, Inches(l), Inches(t), Inches(w),
                            Inches(head_h + row_h * (nrows - 1))).table
    gt.first_row = False
    gt.horz_banding = False
    for i, cw in enumerate(col_w):
        gt.columns[i].width = Inches(cw)
    gt.rows[0].height = Inches(head_h)
    for r in range(1, nrows):
        gt.rows[r].height = Inches(row_h)
    for r, row in enumerate(rows_data):
        for c, val in enumerate(row):
            cell = gt.cell(r, c)
            cell.margin_left = Inches(0.06)
            cell.margin_right = Inches(0.06)
            cell.margin_top = Inches(0.03)
            cell.margin_bottom = Inches(0.03)
            cell.vertical_anchor = MSO_ANCHOR.MIDDLE
            cell.fill.solid()
            cell.fill.fore_color.rgb = TINT if r == 0 else WHITE
            set_border(cell)
            tf = cell.text_frame
            tf.word_wrap = True
            p = tf.paragraphs[0]
            p.alignment = PP_ALIGN.LEFT
            run = p.add_run()
            run.text = val
            run.font.name = FONT
            run.font.size = Pt(head_size if r == 0 else body_size)
            run.font.bold = (r == 0)
            if r == 0:
                run.font.color.rgb = GREY
            elif r in accent_rows:
                run.font.color.rgb = accent_rows[r]
                run.font.bold = True
            else:
                run.font.color.rgb = INK
    return gt

# =====================================================================
# 01 COVER
# =====================================================================
PAGE["n"] = 1
s = prs.slides.add_slide(BLANK)
rect(s, 0, 0, 10, 5.625, fill=WHITE)
wordmark(s, 0.55, 0.50, 1.60)
txt(s, 0.55, 1.95, 8.6, 1.2, "Built for the weather,\nnot the podium", 40, INK, bold=True, spacing=0.94)
hline(s, 0.55, 3.35, 2.2, color=TEAL, lw=2.0)
txt(s, 0.55, 3.62, 8.6, 0.6,
    "A positioning and creative strategy for ELT\nToggle Solutions · September 2026", 13, GREY, spacing=1.15)
txt(s, 0.55, 5.21, 5.0, 0.2, "Prepared for Yuli · LYT Wellness Sdn Bhd", 9, PALE)
txt(s, 8.0, 5.21, 1.45, 0.2, "1", 9, PALE, align=PP_ALIGN.RIGHT)

# =====================================================================
# 02 STATE OF PLAY
# =====================================================================
s = slide_base("The marketing has not caught up to the product",
               "Every number on this slide is yours, from the 3 September call.")
statcard(s, 0.55, 1.52, 2.08, 1.15, "30%", "reorder rate, organic,\nno retention strategy", TEAL)
statcard(s, 2.83, 1.52, 2.08, 1.15, "6x",  "Shopee ROAS", TEAL)
statcard(s, 5.11, 1.52, 2.08, 1.15, "1.75x", "Meta ROAS, down\nfrom a 3x peak", ORANGE)
statcard(s, 7.39, 1.52, 2.06, 1.15, "10", "subscribers, against\na 65% target", ORANGE)
txt(s, 0.55, 2.94, 8.9, 0.8,
    "Launched January 2026. Sold out twice, roughly 2.5 months of lost trading in total, restocked\n"
    "3 September. Selling on Shopee and Shopify only, with no Lazada, TikTok Shop or Google Ads.",
    12, INK, spacing=1.3)
verdict(s, "Three in ten customers came back without anyone asking them to.",
        "Source: ELT founder call, 3 September 2026. Average cart RM120.")

# =====================================================================
# 03 THE DIAGNOSIS
# =====================================================================
s = slide_base("The Meta decline is creative fatigue",
               "Shopee held 6x across the same window that Meta fell from 3x to 1.75x.")
base_y, max_h, max_v = 3.62, 1.75, 6.4
bars = [("Meta, peak", 3.0, "3.0x", PALE),
        ("Meta, before stockout", 1.75, "1.75x", ORANGE),
        ("Shopee, held", 6.0, "6.0x", TEAL)]
x = 0.75
for label, val, vlabel, color in bars:
    h = max_h * val / max_v
    rect(s, x, base_y - h, 1.35, h, fill=color)
    txt(s, x, base_y - h - 0.30, 1.35, 0.25, vlabel,
        16, color if color != PALE else GREY, bold=True, align=PP_ALIGN.CENTER)
    txt(s, x - 0.18, base_y + 0.09, 1.71, 0.4, label, 10.5, GREY, align=PP_ALIGN.CENTER, spacing=1.05)
    x += 1.60
tgt_h = max_h * 4.0 / max_v
hline(s, 0.6, base_y - tgt_h, 4.9, color=PALE, lw=1.0)
txt(s, 5.60, base_y - tgt_h - 0.12, 1.3, 0.25, "4x target", 10, PALE)
txt(s, 6.95, 1.52, 2.5, 1.6,
    "Same offer, same audience,\nsame price.\n\nOne channel held. The\nother halved.", 12, INK, spacing=1.3)
verdict(s, "You named creative strategy as the bottleneck. The channel split is the evidence.",
        "Source: ELT founder call, 3 September 2026. Exact date windows pending Meta Ads Manager access.")

# =====================================================================
# 04 COMPETITOR POSITIONING MAP
# =====================================================================
s = slide_base("Every competitor you named sells the podium",
               "Four brands, one audience: the person who already calls themselves an athlete.")
px, py, pw, ph = 1.42, 1.48, 4.85, 2.42
mx, my = px + pw / 2, py + ph / 2
rect(s, mx, py, pw / 2, ph / 2, fill=TINT)
hline(s, px, my, pw, color=RULE, lw=1.0)
v = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(mx), Inches(py), Pt(0.75), Inches(ph))
v.shadow.inherit = False; v.fill.solid(); v.fill.fore_color.rgb = RULE; v.line.fill.background()
txt(s, 0.55, py - 0.02, 0.82, 0.4, "Serious\ndose", 9, GREY, spacing=1.05)
txt(s, 0.55, py + ph - 0.34, 0.82, 0.4, "Light\ndose", 9, GREY, spacing=1.05)
txt(s, px, py + ph + 0.09, 2.2, 0.25, "For the athlete", 10, GREY)
txt(s, px + pw - 2.2, py + ph + 0.09, 2.2, 0.25, "For everyday life", 10, GREY, align=PP_ALIGN.RIGHT)
brands = [
    ("LMNT",            1.72, 1.82, "1,000mg, RM11 to RM13"),
    ("Supernatural+",   1.72, 2.24, "1,000mg, “Perform Harder”"),
    ("Above Hydration", 1.72, 2.56, "502mg, RM88, Ironman"),
    ("Ten Plus",        4.02, 3.10, "Jamu botanicals"),
    ("100Plus Zero",    4.02, 3.55, "80mg, RM2.50 a can"),
]
for name, cx, cy, note in brands:
    dot(s, cx, cy, 0.11, GREY)
    txt(s, cx + 0.14, cy - 0.115, 2.1, 0.2, name, 10.5, INK, bold=True)
    txt(s, cx + 0.14, cy + 0.05, 2.1, 0.2, note, 9, GREY)
dot(s, 4.55, 1.92, 0.18, TEAL)
txt(s, 4.75, 1.80, 1.4, 0.25, "ELT", 13, TEAL, bold=True)
txt(s, 6.62, 1.48, 2.85, 2.1,
    "Everyone with a serious\ndose built it for athletes.\n\nThe only everyday option\nis 80mg in a can.\n\nAbove charges RM88. You\nare not the premium option,\nyou are the reasonable one.", 11.5, INK, spacing=1.28)
verdict(s, "Above and Supernatural+ would have to drop their athlete rosters to compete here.",
        "Sources: abovehydration.co, supernaturalplus.com, mytenplus.com, accessed 3 September 2026.")

# =====================================================================
# 05 THE POSITION
# =====================================================================
s = slide_base("Built for the weather, not the podium",
               "The enemy is the climate you live in, not your personal best.")
rect(s, 0.55, 1.50, 8.9, 1.30, fill=TINT)
txt(s, 0.88, 1.70, 8.24, 1.0,
    "For people who sweat in Malaysia, ELT is the everyday electrolyte dosed for the heat rather "
    "than the finish line, because 600mg is what a Tuesday costs and 1,000mg is what a race costs.",
    15.5, INK, spacing=1.24)
rtb = [
    ("A chef made it", "Eight months of R&D and 29% real citrus. Nobody in your set can claim it."),
    ("600mg, not 1,000mg", "Dosed for a Tuesday. LMNT and Supernatural+ run a race-day dose."),
    ("All natural", "Stevia-sweetened and halal-certified. Closes the objection quietly."),
]
x = 0.55
for label, body in rtb:
    txt(s, x, 3.00, 2.75, 0.22, label.upper(), 10, TEAL, bold=True)
    hline(s, x, 3.26, 2.75, color=RULE)
    txt(s, x, 3.38, 2.75, 0.95, body, 11.5, INK, spacing=1.25)
    x += 3.03
verdict(s, "The only position in the category that 100Plus cannot buy and Above cannot follow.",
        "Confirmed on the 3 September call: approachable, not elitist.")

# =====================================================================
# 06 THE SODIUM MATH
# =====================================================================
s = slide_base("An hour of play here costs 1,240mg of sodium",
               "Measured on recreational runners in conditions almost identical to Kuala Lumpur.")
bars = [
    ("Lost in one hour of play", 1240, "1,240mg", ORANGE),
    ("Returned by one ELT sachet", 600, "600mg", TEAL),
    ("Returned by one 100Plus Zero", 80, "80mg", PALE),
    ("Returned by plain water", 0, "0mg", PALE),
]
bx, bw_max, bmax = 3.30, 4.35, 1240.0
y = 1.66
for label, val, vlabel, color in bars:
    txt(s, 0.55, y + 0.03, 2.65, 0.24, label, 11.5, INK)
    w = bw_max * val / bmax
    if w > 0.01:
        rect(s, bx, y, w, 0.27, fill=color)
    txt(s, bx + max(w, 0.02) + 0.10, y + 0.02, 1.1, 0.24, vlabel, 12,
        color if color != PALE else GREY, bold=True)
    y += 0.53
rect(s, 0.55, 3.80, 8.9, 0.50, fill=TINT)
txt(s, 0.80, 3.92, 8.5, 0.3,
    "Replacing one hour of sweat takes two ELT sachets, or fifteen and a half cans of 100Plus Zero.",
    12.5, INK)
verdict(s, "This is the number the brand rests on, and nobody in the category is teaching it.",
        "Nutrients 2021: 166 recreational runners, 29.6°C, 70% humidity. Men 54 mmol/h, women 39 mmol/h (about 900mg).")

# =====================================================================
# 07 RULES IN, RULES OUT
# =====================================================================
s = slide_base("This rules people in, and it rules people out",
               "A position that excludes nobody sells to nobody.")
rect(s, 0.55, 1.52, 4.35, 2.6, fill=TINT)
txt(s, 0.78, 1.72, 3.9, 0.25, "IN", 10, TEAL, bold=True)
txt(s, 0.78, 2.02, 3.9, 2.0,
    "Recreational padel, golf, soccer, squash,\ntennis and pickleball players.\n\n"
    "Parents watching their kids play.\n\n"
    "People who quit electrolytes over the taste.\n\n"
    "Anyone commuting in the heat.", 12, INK, spacing=1.28)
rect(s, 5.10, 1.52, 4.35, 2.6, fill=None, line=RULE)
txt(s, 5.33, 1.72, 3.9, 0.25, "OUT", 10, ORANGE, bold=True)
txt(s, 5.33, 2.02, 3.9, 2.0,
    "HYROX and competitive endurance.\n\n"
    "Race-day dosing language.\n\n"
    "Sponsored-pro creative.\n\n"
    "Anything implying you must be fit to qualify.", 12, GREY, spacing=1.28)
verdict(s, "You made this call on the phone. Writing it down stops the creative drifting back.",
        "Source: ELT founder call, 3 September 2026.")

# =====================================================================
# 08 THE ANGLE SYSTEM (the flow)
# =====================================================================
s = slide_base("Three angles, one position, three stages",
               "Each angle owns a stage and hands off to the next, instead of competing for the same budget.")
SX, SW = 0.55, 8.9
c1, c2 = SX + SW / 3.0, SX + 2 * SW / 3.0
for label, lx in [("COLD", SX), ("WARM", c1), ("REPEAT", c2)]:
    txt(s, lx + 0.10, 1.44, 2.5, 0.22, label, 10, TEAL, bold=True)
hline(s, SX, 1.70, SW, color=RULE)
for cx in (c1, c2):
    vd = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(cx), Inches(1.70), Pt(0.75), Inches(1.92))
    vd.shadow.inherit = False; vd.fill.solid(); vd.fill.fore_color.rgb = RULE; vd.line.fill.background()
lanes = [
    ("You are losing more than water", "UGC, face to camera, 15s", SX,  c1 - SX,        TEAL,   1.82),
    ("The heat is the opponent",       "Reactive and topical, 9:16", SX, c2 - SX,        INK,    2.42),
    ("You quit the taste, not the habit", "Chef-led demo and taste test", c1, SX + SW - c1, ORANGE, 3.02),
]
for name, fmt, lx, lw, col, ly in lanes:
    rect(s, lx + 0.04, ly, lw - 0.08, 0.50, fill=TINT)
    txt(s, lx + 0.20, ly + 0.06, lw - 0.40, 0.22, name, 12, col, bold=True)
    txt(s, lx + 0.20, ly + 0.26, lw - 0.40, 0.20, fmt, 10, GREY)
mets = [("Hook rate above 30%", SX), ("Cost per purchase under RM40", c1), ("Repeat rate at 60 days", c2)]
for m, lx in mets:
    txt(s, lx + 0.04, 3.74, SW / 3.0 - 0.15, 0.4, m, 11, INK, spacing=1.15)
verdict(s, "The sodium angle opens, the heat angle carries, the taste angle brings them back.",
        "Format evidence: creator-led beats product-only by 2.3x on hold rate, UGC hook rate 34% against 26% for studio.")

# =====================================================================
# 09 WHAT EACH ANGLE SAYS
# =====================================================================
s = slide_base("What each angle actually says",
               "The hook, the evidence under it, and the number it answers to.")
rows = [
    ["Angle", "The hook we would run", "Why it should work", "Measured on"],
    ["Sodium loss\n(cold)", "“One hour of padel in this heat\ncosts you 1,240mg of sodium.\nYour water bottle gives back zero.”",
     "Quantifies an invisible loss and\nremoves blame. The number is\nmeasured, so it survives review", "Hook rate\nabove 30%"],
    ["The heat\n(cold and warm)", "“We stopped blaming ourselves\nand started blaming the weather.”",
     "March 2026 heat alerts above\n37°C, and 30 areas past unhealthy\nAPI in August. Always available", "Cost per purchase\nunder RM40"],
    ["Taste\n(warm and repeat)", "“You did not quit electrolytes.\nYou quit the taste.”",
     "A chef spent 8 months on it, and\n30% already reorder without\nbeing asked to", "Repeat rate\nat 60 days"],
]
table(s, 0.55, 1.52, 8.9, rows, [1.55, 3.05, 2.75, 1.55], row_h=0.74, body_size=10.5)
verdict(s, "One rewrite first: claim the sweat loss, which is measured, not the cramp cure.",
        "Cramp causation is contested and leans neuromuscular (Sports Medicine, 2019). The rewrite keeps the payoff.")

# =====================================================================
# 10 SECOND WAVE ANGLES
# =====================================================================
s = slide_base("Three angles you are not running yet",
               "The second wave. A new audience, a new intent pool, and a new revenue model.")
SX, SW = 0.55, 8.9
c1, c2 = SX + SW / 3.0, SX + 2 * SW / 3.0
for label, lx in [("COLD", SX), ("WARM", c1), ("REPEAT", c2)]:
    txt(s, lx + 0.10, 1.44, 2.5, 0.22, label, 10, TEAL, bold=True)
hline(s, SX, 1.70, SW, color=RULE)
for cx in (c1, c2):
    vd = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(cx), Inches(1.70), Pt(0.75), Inches(1.92))
    vd.shadow.inherit = False; vd.fill.solid(); vd.fill.fore_color.rgb = RULE; vd.line.fill.background()
lanes2 = [
    ("“You packed the water. You forgot the salt.”", "Parent POV, sideline footage",
     SX, c2 - SX, TEAL, 1.82),
    ("“RM11 a sachet, or RM5.40.”", "Halal certified. Side-by-side, 9:16",
     c1, c2 - c1, INK, 2.42),
    ("“Never open the last sachet.”", "Founder to camera, email and ad",
     c2, SX + SW - c2, ORANGE, 3.02),
]
for name, fmt, lx, lw, col, ly in lanes2:
    rect(s, lx + 0.04, ly, lw - 0.08, 0.50, fill=TINT)
    txt(s, lx + 0.20, ly + 0.06, lw - 0.40, 0.22, name, 12, col, bold=True)
    txt(s, lx + 0.20, ly + 0.26, lw - 0.40, 0.20, fmt, 10, GREY)
mets2 = [("143,000 players, and zero\nbrands talking to the parent", SX),
         ("81% say halal certification\ndrives their purchase", c1),
         ("30% already reorder\nwith nobody asking them to", c2)]
for m, lx in mets2:
    txt(s, lx + 0.04, 3.72, SW / 3.0 - 0.15, 0.5, m, 11, INK, spacing=1.15)
verdict(s, "Wave one sells the product. Wave two opens the audience, the switch and the habit.",
        "Confirm ELT holds JAKIM product certification, not only halal-certified ingredients, before scaling the switch.")

# =====================================================================
# 09 CREATIVE VOLUME
# =====================================================================
s = slide_base("Creative volume is what stops the next decline",
               "The decline happened on a fixed set of assets, so the plan carries a stated monthly output.")
rows = [
    ["Daily Meta spend", "New assets a month", "Composition"],
    ["RM150", "6", "3 angles × 2 formats"],
    ["RM300", "10", "3 angles × 3 formats, plus 1 test"],
    ["RM500", "14", "3 angles × 4 formats, plus 2 tests"],
]
table(s, 0.55, 1.52, 5.6, rows, [1.85, 1.75, 2.0], row_h=0.40)
txt(s, 6.45, 1.52, 3.0, 1.8,
    "Raising budget on a static\nlibrary produced the decline\nfrom 3x. It would produce it\nagain at RM500 a day.", 12, INK, spacing=1.3)
verdict(s, "Spend and creative output move together, or the fatigue repeats.",
        "Asset counts are our recommendation, pending Meta frequency data once we have account access.")

# =====================================================================
# 10 THE PARENT LANE
# =====================================================================
s = slide_base("The parents on the sideline are unclaimed",
               "Nobody in the category talks to the person buying for someone else.")
statcard(s, 0.55, 1.52, 2.87, 1.0, "397", "pickleball and padel venues\nin Malaysia", TEAL)
statcard(s, 3.58, 1.52, 2.87, 1.0, "143,000", "active pickleball players,\nthe highest in Asia", TEAL)
statcard(s, 6.61, 1.52, 2.84, 1.0, "0", "competitors in your set\nspeaking to the parent", ORANGE)
txt(s, 0.55, 2.80, 8.9, 1.0,
    "A parent buys for two, buys on a schedule rather than on impulse, and does not compare sodium\n"
    "specifications. Every testimonial on Above Hydration is an athlete.", 12, INK, spacing=1.3)
verdict(s, "The cheapest reach in the plan, and it only works from an approachable position.",
        "Sources: PicklePadel.my and thepickleballers, 2026. Audience confirmed by Yuli, 3 September 2026.")

# =====================================================================
# 11 THE TARGET CONFLICT
# =====================================================================
s = slide_base("Your two targets describe different businesses",
               "ROAS is cart size divided by cost per purchase, so the two numbers are locked together.")
rows = [
    ["At your RM120 average cart", "Cost per purchase", "ROAS it produces"],
    ["Your CPP target", "under RM50", "2.4x"],
    ["Your ROAS target, lower bound", "RM30", "4.0x"],
    ["Your ROAS target, upper bound", "RM24", "5.0x"],
]
table(s, 0.55, 1.52, 5.6, rows, [2.55, 1.55, 1.5], row_h=0.38,
      accent_rows={1: ORANGE})
txt(s, 6.45, 1.52, 3.0, 1.8,
    "RM50 against a RM120 cart\nis 2.4x.\n\nTo hold CPP at RM50 and\nreach 4x, the cart has to\nreach RM200.", 12, INK, spacing=1.3)
rect(s, 0.55, 3.42, 8.9, 0.62, fill=TINT)
txt(s, 0.78, 3.56, 8.5, 0.4,
    "Move both levers: cost per purchase to RM35 to RM40, cart to RM150 to RM170. That lands ROAS "
    "between 3.8x and 4.9x.", 12.5, INK, spacing=1.15)
verdict(s, "Both targets are reachable, but not at the same time on today's cart.",
        "Source: targets and the RM120 cart from the 3 September call.")

# =====================================================================
# 12 THE SPEND PLAN
# =====================================================================
s = slide_base("RM500 a day, reached in three gated steps",
               "Back-calculated from your six-month target, with a gate between each step.")
rows = [
    ["Step", "Daily Meta spend", "Gate to clear before the next step", "Target ROAS"],
    ["Months 1 and 2", "RM150", "Cost per purchase under RM45", "2.5x, rising"],
    ["Months 3 and 4", "RM300", "Cost per purchase under RM40", "3.5x"],
    ["Months 5 and 6", "RM500", "Cost per purchase holding under RM40", "4.0x to 4.5x"],
]
table(s, 0.55, 1.52, 8.9, rows, [1.7, 1.75, 3.75, 1.7], row_h=0.38)
rect(s, 0.55, 3.12, 8.9, 0.92, fill=TINT)
txt(s, 0.78, 3.26, 8.5, 0.7,
    "Six-month Meta spend RM57,000, against RM170,000 to RM230,000 of revenue at a blended 3.0x to\n"
    "4.0x. At RM500 a day and a RM160 cart, that needs 375 orders a month, or 12 to 13 a day.",
    12.5, INK, spacing=1.2)
verdict(s, "Each step buys the right to the next one.",
        "Ad spend is pass-through, billed separately. Bands, not point estimates, until 30 days of live data.")

# =====================================================================
# 13 SUBSCRIPTION
# =====================================================================
s = slide_base("Turn the 30% who reorder into subscribers",
               "Ten subscribers today. The gap between those two numbers is the most valuable project here.")
rows = [
    ["", "One-time buyer", "Subscriber at six months"],
    ["Revenue per customer", "RM120", "RM840"],
    ["Acquisition cost", "RM40", "RM40"],
    ["Value against acquisition", "3x", "21x"],
]
table(s, 0.55, 1.52, 5.9, rows, [2.3, 1.7, 1.9], row_h=0.38,
      accent_rows={3: TEAL})
txt(s, 6.70, 1.52, 2.75, 1.8,
    "At 375 orders a month,\n65% on subscription is\n244 subscribers.\n\nRoughly RM34,000 a month\nrecurring, or RM410,000\na year.", 12, INK, spacing=1.3)
verdict(s, "A subscriber is worth about seven times a one-time buyer.",
        "Assumes six-month retention at a RM140 cart. We baseline and re-forecast after 90 days of cohort data.")

# =====================================================================
# 14 GEOGRAPHY
# =====================================================================
s = slide_base("Malaysia first, and Singapore has to wait",
               "Your instinct on the call was right, and the arithmetic is worse than it looks.")
rows = [
    ["Market", "Cost per purchase", "ROAS at a RM160 cart", "Verdict"],
    ["Malaysia", "RM40", "4.0x", "Scale now"],
    ["Singapore", "RM100 to RM120", "1.3x to 1.6x", "Hold"],
    ["Philippines", "To be tested", "To be tested", "Test next, lower CPMs"],
]
table(s, 0.55, 1.52, 8.9, rows, [1.85, 2.35, 2.5, 2.2], row_h=0.38,
      accent_rows={2: ORANGE})
txt(s, 0.55, 3.15, 8.9, 0.8,
    "Singapore CPMs run roughly three times Malaysia. That sits below your 4x target before a single\n"
    "creative decision gets made. ELT already ships to the Philippines.", 12, INK, spacing=1.28)
verdict(s, "Hold Singapore until the cart clears RM200. Test the Philippines first.",
        "CPM and CPA multiples from Yi Yang's market read, 3 September 2026, to be validated against live delivery data.")

# =====================================================================
# 15 HOW WE WOULD WORK
# =====================================================================
s = slide_base("Start with consulting, scale into management",
               "You named creative strategy as the bottleneck, not budget or channel setup. This prices that.")
rows = [
    ["Tier", "What you get", "Commitment", "Fee"],
    ["Positioning and creative\nstrategy", "The position, the angle-to-job architecture, the\ncreative brief system, the spend model, the\nmeasurement baseline", "One-off", "TBD"],
    ["Strategy plus production", "The above, plus the monthly asset output", "Monthly", "TBD"],
    ["Full management", "The above, plus Meta and Shopee management,\nTikTok Shop and Lazada launch, subscription build", "Monthly", "TBD"],
]
table(s, 0.55, 1.52, 8.9, rows, [2.15, 4.55, 1.3, 0.9], row_h=0.72, body_size=10.5,
      accent_rows={})
verdict(s, "Start at tier one. The bottleneck you named is cheaper to fix than to manage around.",
        "Fees to be confirmed by Viknesh and Zaid before sending. Ad spend billed separately. No long-term lock-in.")

# =====================================================================
# 16 THE ASK
# =====================================================================
s = slide_base("What we need before spend goes live",
               "Item, owner, and why it blocks the work.")
rows = [
    ["Item", "Owner", "Why it blocks"],
    ["Meta Ads Manager and GA4 access", "ELT", "Baselines cost per purchase, confirms the 3x to 1.75x decline"],
    ["Shopify and Shopee back end", "ELT", "Baselines the 30% reorder rate and the real cart size"],
    ["Batch and inventory schedule, two quarters", "ELT", "You sold out twice. Spend has to sit inside supply"],
    ["Cost per unit at each batch size", "ELT", "Prices the bundle that lifts the cart to RM160"],
    ["Sign-off on the position", "Yuli", "Every creative decision downstream forks here"],
    ["Decision on the starting tier", "Yuli", "We can start inside a week of a yes"],
]
table(s, 0.55, 1.52, 8.9, rows, [3.5, 0.85, 4.55], row_h=0.38, body_size=11)
verdict(s, "Monday, 7 September. If the position is right, we start tier one this month.",
        None, top=4.60)

prs.save("/Users/yiyang/Desktop/Toggle_Claude/toggle-brain/clients/elt/ELT-Toggle-Positioning-Creative-Strategy-Sept-2026.pptx")
print("slides:", len(prs.slides.__iter__.__self__._sldIdLst))
print("saved")
