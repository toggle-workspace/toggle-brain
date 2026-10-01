#!/usr/bin/env python3
"""
Toggle x SignWell acquisition plan, rev4, as a PowerPoint deck.

A faithful port of signwell-toggle-proposal-deck-2026-09-rev4.html. The HTML
stays the source of truth for copy; this script reproduces the same ten slides
as native PowerPoint shapes, text and tables so the client can edit them.

Geometry is carried over 1:1 from the HTML: the deck is 1280x720 CSS pixels,
and one CSS pixel is 9525 EMU, so a 13.333 x 7.5 inch slide maps exactly.

Run:  uv run --with python-pptx python build-deck-rev4.py
"""
import math
import os

from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR, MSO_AUTO_SIZE
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
from lxml import etree

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
LOGO = os.path.join(REPO, "assets", "logos", "toggle-wordmark-black.png")
WAVE = os.environ.get("WAVE_PNG", os.path.join(HERE, "wave.png"))
OUT = os.environ.get(
    "OUT_PPTX",
    os.path.expanduser(
        "~/Desktop/Signwell/Signwell proposal/"
        "signwell-toggle-proposal-deck-2026-09-rev4.pptx"
    ),
)

# ---------------------------------------------------------------------------
# tokens, sampled from the rev3 render and carried into rev4
# ---------------------------------------------------------------------------
PAPER = RGBColor(0xF4, 0xF8, 0xFD)
LIFT = RGBColor(0xFF, 0xFF, 0xFF)
INK = RGBColor(0x0E, 0x1B, 0x33)
INK2 = RGBColor(0x4A, 0x5A, 0x75)
INK3 = RGBColor(0x87, 0x94, 0xAC)
LINE = RGBColor(0xD5, 0xE2, 0xF0)
LINE_SOFT = RGBColor(0xE7, 0xEF, 0xF9)
ACCENT = RGBColor(0x2A, 0x6B, 0xE0)
ACCENT_DEEP = RGBColor(0x1B, 0x4C, 0xB0)
WASH = RGBColor(0xE3, 0xED, 0xFC)
AQUA = RGBColor(0x8C, 0xE0, 0xEC)
DARKTXT = RGBColor(0xB7, 0xC4, 0xDA)
HOT_BG = RGBColor(0xFD, 0xEC, 0xEB)
HOT_TX = RGBColor(0xA3, 0x30, 0x2C)
AMBER_BG = RGBColor(0xFD, 0xF6, 0xE7)
AMBER_LN = RGBColor(0xD2, 0x97, 0x1E)
AMBER_TX = RGBColor(0x8A, 0x62, 0x12)

SERIF = "Instrument Serif"
SANS = "Instrument Sans"
MONO = "JetBrains Mono"

# grid, in CSS pixels
W, H = 1280, 720
PADX, PADT = 64, 56
CONTENT_W = W - PADX * 2            # 1152
C3 = [(64, 372), (454, 372), (844, 372)]
C4 = [(64, 274.5), (356.5, 274.5), (649, 274.5), (941.5, 274.5)]
C5 = [(64, 216), (298, 216), (532, 216), (766, 216), (1000, 216)]

PXE = 9525


def px(v):
    return Emu(int(round(v * PXE)))


def pt(css_px):
    """CSS pixels to points at 96 dpi."""
    return Pt(round(css_px * 0.75, 2))


prs = Presentation()
prs.slide_width = px(W)
prs.slide_height = px(H)
BLANK = prs.slide_layouts[6]


# ---------------------------------------------------------------------------
# text width model, used to flow label/value rows and bullet stacks
# ---------------------------------------------------------------------------
_NARROW = set("iljtfIr.,;:'!|()[]{}·")
_WIDE = set("mwMW@%")
_CAPS = set("ABCDEFGHJKLNOPQRSTUVXYZ")


def _advance(ch):
    if ch in _NARROW:
        return 0.30
    if ch in _WIDE:
        return 0.86
    if ch in _CAPS:
        return 0.68
    if ch.isdigit() or ch in "$":
        return 0.56
    if ch == " ":
        return 0.26
    return 0.525


def text_width(s, size):
    return sum(_advance(c) for c in s) * size


def line_count(s, size, width):
    """Greedy wrap, mirroring how the browser breaks the same string."""
    if not s:
        return 1
    words, lines, cur = s.split(), 1, 0.0
    space = _advance(" ") * size
    for i, wd in enumerate(words):
        wdt = text_width(wd, size)
        add = wdt if i == 0 else space + wdt
        if cur + add > width and i:
            lines += 1
            cur = wdt
        else:
            cur += add
    return lines


# ---------------------------------------------------------------------------
# primitives
# ---------------------------------------------------------------------------
def new_slide(bg=PAPER):
    s = prs.slides.add_slide(BLANK)
    s.background.fill.solid()
    s.background.fill.fore_color.rgb = bg
    return s


def rrect(slide, x, y, w, h, fill, line=None, radius=14, line_w=1):
    shp = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE,
        px(x), px(y), px(w), px(h))
    if radius:
        shp.adjustments[0] = min(0.5, radius / min(w, h))
    if fill is None:
        shp.fill.background()
    else:
        shp.fill.solid()
        shp.fill.fore_color.rgb = fill
    if line is None:
        shp.line.fill.background()
    else:
        shp.line.color.rgb = line
        shp.line.width = px(line_w)
    shp.shadow.inherit = False
    shp.text_frame.word_wrap = True
    return shp


def oval(slide, x, y, d, fill, line=None, line_w=2.5):
    shp = slide.shapes.add_shape(MSO_SHAPE.OVAL, px(x), px(y), px(d), px(d))
    if fill is None:
        shp.fill.background()
    else:
        shp.fill.solid()
        shp.fill.fore_color.rgb = fill
    if line is None:
        shp.line.fill.background()
    else:
        shp.line.color.rgb = line
        shp.line.width = px(line_w)
    shp.shadow.inherit = False
    return shp


def hline(slide, x, y, w, color, weight=1, dash=False):
    shp = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, px(x), px(y), px(w), px(weight))
    shp.fill.solid()
    shp.fill.fore_color.rgb = color
    shp.line.fill.background()
    shp.shadow.inherit = False
    return shp


def vline(slide, x, y, h, color, weight=1.5, dash=True):
    conn = slide.shapes.add_connector(1, px(x), px(y), px(x), px(y + h))
    conn.line.color.rgb = color
    conn.line.width = px(weight)
    if dash:
        ln = conn.line._get_or_add_ln()
        d = etree.SubElement(ln, qn("a:prstDash"))
        d.set("val", "dash")
    return conn


def tbox(slide, x, y, w, h, anchor=MSO_ANCHOR.TOP):
    sh = slide.shapes.add_textbox(px(x), px(y), px(w), px(h))
    tf = sh.text_frame
    tf.word_wrap = True
    tf.auto_size = MSO_AUTO_SIZE.NONE
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = anchor
    return tf


def _spacing(run, css_px):
    """Letter spacing, expressed in hundredths of a point."""
    if not css_px:
        return
    run.font._rPr.set("spc", str(int(round(css_px * 0.75 * 100))))


def style(run, size=13.5, font=SANS, color=INK2, bold=False, italic=False,
          spc=0, caps=False):
    f = run.font
    f.size = pt(size)
    f.name = font
    f.bold = bold
    f.italic = italic
    f.color.rgb = color
    _spacing(run, spc)
    if caps:
        run.font._rPr.set("cap", "all")
    # make the east-asian and symbol fallbacks match the latin face
    rPr = run.font._rPr
    for tag in ("a:ea", "a:cs"):
        el = rPr.find(qn(tag))
        if el is None:
            el = etree.SubElement(rPr, qn(tag))
        el.set("typeface", font)


def para(tf, parts, first=False, align=PP_ALIGN.LEFT, line_spacing=None,
         space_before=0, space_after=0, **kw):
    """parts is a string, or a list of (text, override-kwargs) tuples."""
    p = tf.paragraphs[0] if first else tf.add_paragraph()
    p.alignment = align
    if line_spacing:
        p.line_spacing = line_spacing
    if space_before:
        p.space_before = pt(space_before)
    if space_after:
        p.space_after = pt(space_after)
    if isinstance(parts, str):
        parts = [(parts, {})]
    for txt, over in parts:
        r = p.add_run()
        r.text = txt
        merged = dict(kw)
        merged.update(over)
        style(r, **merged)
    return p


def bullets(slide, x, y, w, items, size=13.5, color=INK2, bullet=ACCENT,
            line_spacing=1.45, gap=6, height=None):
    """A bullet stack using native PowerPoint bullets so wrapping is real."""
    lh = size * line_spacing
    if height is None:
        height = sum(line_count(t, size, w - 16) * lh + gap for t in items) + 8
    tf = tbox(slide, x, y, w, height)
    for i, t in enumerate(items):
        p = para(tf, t, first=(i == 0), size=size, color=color,
                 line_spacing=line_spacing, space_before=(0 if i == 0 else gap))
        pPr = p._pPr if p._pPr is not None else p._p.get_or_add_pPr()
        pPr.set("marL", str(int(16 * PXE)))
        pPr.set("indent", str(int(-16 * PXE)))
        for tag in ("a:buNone", "a:buChar", "a:buClr", "a:buSzPct", "a:buFont"):
            el = pPr.find(qn(tag))
            if el is not None:
                pPr.remove(el)
        clr = etree.SubElement(pPr, qn("a:buClr"))
        srgb = etree.SubElement(clr, qn("a:srgbClr"))
        srgb.set("val", str(bullet))
        szp = etree.SubElement(pPr, qn("a:buSzPct"))
        szp.set("val", "46000")
        bf = etree.SubElement(pPr, qn("a:buFont"))
        bf.set("typeface", "Arial")
        bc = etree.SubElement(pPr, qn("a:buChar"))
        bc.set("char", "\u25a0")
    return height


# ---------------------------------------------------------------------------
# table helper
# ---------------------------------------------------------------------------
NO_STYLE = "{2D5ABB26-0587-4C30-8999-92F81FD0307C}"


def cell_border(cell, edge, color, weight):
    tcPr = cell._tc.get_or_add_tcPr()
    tag = qn("a:" + edge)
    old = tcPr.find(tag)
    if old is not None:
        tcPr.remove(old)
    ln = etree.SubElement(tcPr, tag)
    ln.set("w", str(int(weight * 12700)))
    ln.set("cap", "flat")
    ln.set("cmpd", "sng")
    ln.set("algn", "ctr")
    fill = etree.SubElement(ln, qn("a:solidFill"))
    srgb = etree.SubElement(fill, qn("a:srgbClr"))
    srgb.set("val", str(color))
    # keep the element order LibreOffice and PowerPoint both expect
    order = ["a:lnL", "a:lnR", "a:lnT", "a:lnB", "a:lnTlToBr", "a:lnBlToTr",
             "a:cell3D", "a:fill", "a:solidFill", "a:noFill"]
    tcPr[:] = sorted(tcPr, key=lambda e: order.index(e.tag.split("}")[0].replace("{http://schemas.openxmlformats.org/drawingml/2006/main", "a:")) if False else 0)


def mk_table(slide, x, y, w, col_w, rows, row_h):
    shp = slide.shapes.add_table(rows, len(col_w), px(x), px(y), px(w), px(row_h * rows))
    tbl = shp.table
    tbl.first_row = False
    tbl.horz_banding = False
    tblPr = tbl._tbl.find(qn("a:tblPr"))
    for st in tblPr.findall(qn("a:tableStyleId")):
        tblPr.remove(st)
    sid = etree.SubElement(tblPr, qn("a:tableStyleId"))
    sid.text = NO_STYLE
    for i, cw in enumerate(col_w):
        tbl.columns[i].width = px(cw)
    return tbl


def cell(tbl, r, c, text, size=12.5, color=INK2, bold=False, font=SANS,
         align=PP_ALIGN.LEFT, fill=None, spc=0, caps=False, padl=10, padr=10):
    cl = tbl.cell(r, c)
    cl.margin_left, cl.margin_right = px(padl), px(padr)
    cl.margin_top, cl.margin_bottom = px(3), px(3)
    cl.vertical_anchor = MSO_ANCHOR.MIDDLE
    if fill is None:
        cl.fill.background()
    else:
        cl.fill.solid()
        cl.fill.fore_color.rgb = fill
    tf = cl.text_frame
    tf.word_wrap = False
    p = tf.paragraphs[0]
    p.alignment = align
    r_ = p.add_run()
    r_.text = text
    style(r_, size=size, font=font, color=color, bold=bold, spc=spc, caps=caps)
    return cl


# ---------------------------------------------------------------------------
# slide chrome
# ---------------------------------------------------------------------------
def chrome(slide, eyebrow, head_parts, kicker, folio, tight=False):
    oval(slide, PADX, 59, 6, ACCENT, line=None)
    tf = tbox(slide, PADX + 16, 53, 700, 16)
    para(tf, eyebrow, first=True, size=11, font=MONO, color=ACCENT, bold=True,
         spc=1.76, caps=True)
    tf = tbox(slide, PADX, 76, CONTENT_W, 66)
    para(tf, head_parts, first=True, size=52, font=SERIF, color=INK,
         line_spacing=1.0)
    kh = line_count(kicker, 17, CONTENT_W) * 17 * 1.5
    tf = tbox(slide, PADX, 150, CONTENT_W, kh + 6)
    para(tf, kicker, first=True, size=17, color=INK2, line_spacing=1.5)
    tf = tbox(slide, W - PADX - 66, 686, 66, 14)
    para(tf, folio, first=True, size=10, font=MONO, color=INK3, spc=1.4,
         align=PP_ALIGN.RIGHT)
    return 227 - (8 if tight else 0)


def card_label(slide, x, y, w, label):
    tf = tbox(slide, x, y, w, 14)
    para(tf, label, first=True, size=10.5, font=MONO, color=INK3, bold=True,
         spc=1.47, caps=True)


def card_title(slide, x, y, w, title, color=INK, size=17):
    tf = tbox(slide, x, y, w, size * 1.3)
    para(tf, title, first=True, size=size, color=color, bold=True,
         line_spacing=1.25)


def band(slide, y, parts, h=59):
    rrect(slide, PADX, y, CONTENT_W, h, INK, radius=12)
    tf = tbox(slide, PADX + 22, y, CONTENT_W - 44, h, anchor=MSO_ANCHOR.MIDDLE)
    para(tf, parts, first=True, size=23, font=SERIF, color=PAPER,
         line_spacing=1.25)


# ===========================================================================
# 01 - cover
# ===========================================================================
s = new_slide()
if os.path.exists(WAVE):
    s.shapes.add_picture(WAVE, px(0), px(274), px(W), px(446))
if os.path.exists(LOGO):
    s.shapes.add_picture(LOGO, px(PADX), px(92), height=px(52))
tf = tbox(s, PADX, 196, 800, 170)
para(tf, "Acquisition plan", first=True, size=76, font=SERIF, color=INK,
     line_spacing=0.98)
para(tf, [("for ", {}), ("SignWell", {"color": ACCENT, "italic": True})],
     size=76, font=SERIF, color=INK, line_spacing=0.98)

# ===========================================================================
# 02 - executive summary
# ===========================================================================
s = new_slide()
top = chrome(
    s, "Executive summary",
    [("Plan", {"color": ACCENT, "italic": True})],
    "Most of your budget goes to non-brand searches that do not convert, and "
    "your tracking cannot support smart bidding. We fix the tracking first, "
    "then run Google Search and Meta on clean data.", "02")
CH = 416
for i, (x, w) in enumerate(C3):
    rrect(s, x, top, w, CH, WASH if i == 2 else LIFT,
          None if i == 2 else LINE)
card_label(s, C3[0][0] + 22, top + 22, 330, "Where you are")
bullets(s, C3[0][0] + 22, top + 48, 330, [
    "Non-brand search takes 52% of your spend and returns 1.9% of your sign-ups.",
    "Duplicate pixels sit on your site and feed bad signals to Meta.",
    "You have two Tag Manager containers and two GA4 properties, so smart "
    "bidding gets mixed signals.",
])
card_label(s, C3[1][0] + 22, top + 22, 330, "What we change")
bullets(s, C3[1][0] + 22, top + 48, 330, [
    "We write one tracking spec, then open a Google Ads account in your name.",
    "We lead with brand search while the new account learns, and we test "
    "non-brand campaigns to find the keywords worth funding.",
    "We set Meta up in October while the Google account learns, then scale it "
    "from November. LinkedIn and Reddit wait until Q1.",
    "You get one live dashboard and a report every two weeks.",
])
card_label(s, C3[2][0] + 22, top + 22, 330, "What it costs")
tf = tbox(s, C3[2][0] + 22, top + 46, 330, 56)
para(tf, "$20k to $25k", first=True, size=40, font=SERIF, color=ACCENT,
     line_spacing=0.9)
tf = tbox(s, C3[2][0] + 22, top + 110, 330, 110)
para(tf, "That is a month in media, which is the budget you run today. October "
         "starts at $20,000, nearly all of it on Google while we rebuild. From "
         "November, Google holds at $15,500 a month and every added dollar "
         "funds Meta.",
     first=True, size=13, color=INK2, line_spacing=1.5)

# ===========================================================================
# timeline slides (03 and 06 share one builder)
# ===========================================================================
def timeline(slide, top, cards, dark_card):
    rail_y = top - 22
    hline(slide, PADX + 30, rail_y + 7, CONTENT_W - 30, ACCENT, weight=2)
    for i, (cx, _) in enumerate(C4):
        cxx = cx + 24 if i == 0 else cx + (C4[i][1] / 2) - 8
        oval(slide, [88, 418, 748, 1078][i], rail_y, 16,
             ACCENT if i == 3 else PAPER, line=ACCENT)
    CHT = 393
    for i, (x, w) in enumerate(C4):
        is_dark = (i == 3)
        rrect(slide, x, top, w, CHT, INK if is_dark else LIFT,
              None if is_dark else LINE)
        pad = 18
        tf = tbox(slide, x + pad, top + pad, w - pad * 2, 32)
        para(tf, cards[i]["title"], first=True, size=27, font=SERIF,
             color=PAPER if is_dark else INK, line_spacing=1.0)
        tf = tbox(slide, x + pad, top + pad + 32, w - pad * 2, 18)
        para(tf, cards[i]["sub"], first=True, size=13.5,
             color=AQUA if is_dark else ACCENT, bold=True)
        if is_dark:
            tf = tbox(slide, x + pad, top + pad + 62, w - pad * 2, 200)
            para(tf, cards[i]["body"], first=True, size=13.5, color=DARKTXT,
                 line_spacing=1.5)
            continue
        # JetBrains Mono is monospaced, so the chip sizes from the character
        # count plus the tracking, not from the proportional width model.
        chip = cards[i]["chip"]
        chip_w = len(chip) * (11 * 0.6 + 0.88) + 22
        rrect(slide, x + pad, top + pad + 60, chip_w, 27, PAPER, LINE, radius=7)
        tf = tbox(slide, x + pad + 11, top + pad + 60, chip_w, 27,
                  anchor=MSO_ANCHOR.MIDDLE)
        para(tf, chip, first=True, size=11, font=MONO, color=INK2,
             bold=True, spc=0.88, caps=True)
        # the rows run as a borderless table so PowerPoint grows each row to
        # fit its own wrapped text, instead of trusting an estimate
        ry = top + pad + 60 + 27 + 8
        rows = cards[i]["rows"]
        t = mk_table(slide, x + pad, ry, w - pad * 2, [58, w - pad * 2 - 58],
                     len(rows), 24)
        for j, (k, v) in enumerate(rows):
            kc = cell(t, j, 0, k, size=8.8, font=MONO, color=INK3, bold=True,
                      spc=0.62, caps=True, padl=0, padr=0)
            kc.vertical_anchor = MSO_ANCHOR.TOP
            kc.margin_top, kc.margin_bottom = px(9), px(6)
            vc = t.cell(j, 1)
            vc.margin_left, vc.margin_right = px(10), px(0)
            vc.margin_top, vc.margin_bottom = px(6), px(6)
            vc.vertical_anchor = MSO_ANCHOR.TOP
            vc.fill.background()
            vtf = vc.text_frame
            vtf.word_wrap = True
            para(vtf, v, first=True, size=12.8, color=INK2, line_spacing=1.34)
            for c in (0, 1):
                if j < len(rows) - 1:
                    cell_border(t.cell(j, c), "lnB", LINE_SOFT, 1)
            t.rows[j].height = px(20)


s = new_slide()
top = chrome(
    s, "Timeline",
    [("Month by month, ", {}),
     ("October to January", {"color": ACCENT, "italic": True})],
    "Brand search carries October while the new account learns, and we set Meta "
    "up beside it. November launches Meta and adds non-brand budget. December "
    "opens retargeting and lines up LinkedIn, Reddit and ChatGPT ads for Q1.", "03",
    tight=True)
timeline(s, top + 31, [
    {"title": "October", "sub": "Launch and learn", "chip": "Oct  $20,000 media",
     "rows": [("Search", "We move search into an account you own, lead with "
                         "brand terms, and keep non-brand running."),
              ("Social", "We start prepping the Meta ad account, integrations and "
                         "tracking."),
              ("Tracking", "We fix the Meta pixels, set up Meta CAPI, and merge "
                           "Google Tag Manager.")]},
    {"title": "November", "sub": "Scale what works", "chip": "Nov  $22,500 media",
     "rows": [("Search", "We add buyer-led non-brand campaigns and fund the ones "
                         "that stay under $70 a qualified sign-up."),
              ("Social", "Meta goes live. We move spend to the ads that bring "
                         "qualified sign-ups."),
              ("Tracking", "We import purchases with their real value, and full "
                           "reporting starts.")]},
    {"title": "December", "sub": "Fund the winners", "chip": "Dec  $25,000 media",
     "rows": [("Search", "With two months of non-brand data, we scale the "
                         "keywords that work and plan ChatGPT ads for Q1."),
              ("Social", "We open Meta retargeting, raise spend on the ads that "
                         "stay under $70, and plan LinkedIn and Reddit for Q1."),
              ("Tracking", "You have two months of clean data, so you choose the "
                           "next move from numbers you trust.")]},
    {"title": "January", "sub": "The result",
     "body": "You own your accounts, and you choose the next channel to fund "
             "from your own numbers."},
], dark_card=3)

# ===========================================================================
# 04 - paid search
# ===========================================================================
s = new_slide()
top = chrome(
    s, "Lever 01  Paid search",
    [("Five buyers, ", {}),
     ("five different ads", {"color": ACCENT, "italic": True})],
    "We split non-brand search by buyer, then write each ad around what "
    "SignWell offers: API pricing, team seats, a signed BAA, and NOM-151.",
    "04")
BUY = [
    ("API builders", "25 Live API Docs Free Monthly",
     "Send legally binding API documents with a card on file. Then from $0.85 each."),
    ("Growing teams", "3 Senders From $30 a Month",
     "Unlimited templates for your team. $30 billed yearly, or $36 monthly with no contract."),
    ("Healthcare", "Signed BAA, Month to Month",
     "HIPAA eSignatures with a signed BAA and SOC 2 Type II. Built for home care teams."),
    ("DocuSign switchers", "Unlimited Documents From $12",
     "Leaving DocuSign? Send unlimited documents from $12 a month. Cancel anytime."),
    ("Mexico", "Firma Electrónica NOM-151",
     "Firma contratos con validez legal en México. Empieza gratis, sin tarjeta."),
]
by = top - 24
for (x, w), (seg, hd, ds) in zip(C5, BUY):
    rrect(s, x, by, w, 157, LIFT, LINE, radius=12)
    tf = tbox(s, x + 15, by + 16, w - 30, 18)
    para(tf, seg, first=True, size=13.5, color=INK, bold=True)
    tf = tbox(s, x + 15, by + 38, w - 30, 46)
    para(tf, hd, first=True, size=17, color=ACCENT_DEEP, line_spacing=1.22)
    tf = tbox(s, x + 15, by + 88, w - 30, 62)
    para(tf, ds, first=True, size=12.5, color=INK2, line_spacing=1.42)
ly = by + 175
for i, (x, w) in enumerate(C3):
    rrect(s, x, ly, w, 265, WASH if i == 2 else LIFT, None if i == 2 else LINE)
card_title(s, C3[0][0] + 22, ly + 22, 330, "Rebuild")
bullets(s, C3[0][0] + 22, ly + 50, 330, [
    "We open a Google Ads account in your name.",
    "We split non-brand by buyer: API, teams, healthcare and switchers.",
    "We stop paying for login searches."])
card_title(s, C3[1][0] + 22, ly + 22, 330, "Reallocate")
bullets(s, C3[1][0] + 22, ly + 50, 330, [
    "We cap the current non-brand keywords at $1,700 a month, which is what they earn today.",
    "The rest funds brand, switcher, vertical and Meta campaigns.",
    "LinkedIn stays with your team for now."])
card_title(s, C3[2][0] + 22, ly + 22, 330, "Measure")
bullets(s, C3[2][0] + 22, ly + 50, 330, [
    "We measure every campaign against $70 a qualified sign-up, your break-even.",
    "We report paying customers and ACV by campaign.",
    "You get a live Looker Studio dashboard instead of a PDF."])

# ===========================================================================
# 05 - measurement and reporting
# ===========================================================================
s = new_slide()
top = chrome(
    s, "Measurement and reporting",
    [("Your tracking, and ", {}),
     ("your dashboard", {"color": ACCENT, "italic": True})],
    "In October we fix the Meta pixels, set up Meta CAPI, and clean up Google "
    "Tag Manager. Your first dashboard and report land in October, and full "
    "reporting runs from November.",
    "05")
CH5 = 341
for i, (x, w) in enumerate(C3):
    rrect(s, x, top, w, CH5, WASH if i == 2 else LIFT, None if i == 2 else LINE)
col = [
    ("Tracking", "Events we track", [
        "Sign-up.",
        "Qualified sign-up, with the questionnaire answers.",
        "Document sent.",
        "Limit hit.",
        "Plan changed.",
        "Purchase, with the amount paid."]),
    ("Cleanup", "Tags we fix", [
        "We make each Meta pixel fire once.",
        "We set up Meta CAPI to send sign-ups and purchases from the server.",
        "We merge two Tag Manager containers into one.",
        "We import purchases into Google Ads."]),
    ("Dashboard", "What the dashboard shows", [
        "Spend, sign-ups and paying customers, by campaign.",
        "Cost per qualified sign-up, against $70.",
        "Spend and sign-ups by keyword.",
        "ACV by channel and by vertical.",
        "Updated daily, so you can open it any day."]),
]
for (x, w), (lab, title, items) in zip(C3, col):
    card_label(s, x + 22, top + 22, w - 44, lab)
    card_title(s, x + 22, top + 46, w - 44, title)
    h = bullets(s, x + 22, top + 78, w - 44, items)
    if lab == "Tracking":
        tf = tbox(s, x + 22, top + 78 + h + 18, w - 44, 34)
        para(tf, "All six run through one GA4 property and one container.",
             first=True, size=12.5, color=INK2, line_spacing=1.5)
band(s, top + CH5 + 18,
     [("Reporting starts in October, and ", {}),
      ("runs in full from November.", {"color": AQUA, "italic": True})])

# ===========================================================================
# 06 - tracking roadmap
# ===========================================================================
s = new_slide()
top = chrome(
    s, "Tracking roadmap",
    [("Clean signals in week 1, ", {}),
     ("real value by November", {"color": ACCENT, "italic": True})],
    "Meta and the new Google Ads account launch on clean sign-up tracking. "
    "Your engineers add six events once, and by November purchases reach both "
    "platforms with their real value.", "06", tight=True)
timeline(s, top + 31, [
    {"title": "Clean up", "sub": "Remove the bad tags", "chip": "Oct  week 1",
     "rows": [("We do", "We remove the dead and copied tags, make the Meta pixel "
                        "fire once, and track sign-ups in the new Google Ads account."),
              ("You give", "Admin access to Tag Manager, GA4, Google Ads and Meta."),
              ("Done when", "We record each sign-up once on both platforms, from "
                            "launch day.")]},
    {"title": "Rebuild", "sub": "One spec, one container", "chip": "Oct  weeks 2 to 4",
     "rows": [("We do", "We write the spec for the six events, merge the two "
                        "containers and two GA4 properties, and set up Meta CAPI."),
              ("You give", "One engineer to add the six events to the app from our spec."),
              ("Done when", "Platform counts match your app database within a "
                            "margin we agree first.")]},
    {"title": "Connect", "sub": "Send purchase values back", "chip": "Nov  weeks 5 to 8",
     "rows": [("We do", "We import purchases and replace the flat $14 sign-up "
                        "value with values by use case."),
              ("You give", "A daily export of purchases and plan changes from billing."),
              ("Done when", "The dashboard shows cost per paying customer by campaign.")]},
    {"title": "From November", "sub": "The result",
     "body": "Every sign-up and purchase reaches Google Ads, Meta and your "
             "dashboard with its real value, so bidding and reporting run on "
             "the same numbers."},
], dark_card=3)

# ===========================================================================
# dashboard chrome shared by 07 and 08
# ===========================================================================
def dash_frame(slide, top, title, sub, pills, height=427):
    rrect(slide, PADX, top, CONTENT_W, height, LIFT, LINE)
    tf = tbox(slide, PADX + 20, top + 16, 500, 22)
    para(tf, title, first=True, size=17, color=INK, bold=True)
    tf = tbox(slide, PADX + 20, top + 40, 500, 14)
    para(tf, sub, first=True, size=9.5, font=MONO, color=INK3, bold=True,
         spc=1.33, caps=True)
    rx = W - PADX - 20
    for label, flag in reversed(pills):
        pw = (len(label) * (10 * 0.6 + 1.0) + 26) if flag \
            else (text_width(label, 12) + 26)
        rrect(slide, rx - pw, top + 14, pw, 26,
              AMBER_BG if flag else None, AMBER_LN if flag else LINE, radius=13)
        tf = tbox(slide, rx - pw, top + 14, pw, 26, anchor=MSO_ANCHOR.MIDDLE)
        para(tf, label, first=True, align=PP_ALIGN.CENTER,
             size=10 if flag else 12, font=MONO if flag else SANS,
             color=AMBER_TX if flag else INK2, bold=flag,
             spc=1.0 if flag else 0, caps=flag)
        rx -= pw + 8
    return top + 56


s = new_slide()
top = chrome(
    s, "Sample dashboard  Looker Studio",
    [("Your August, ", {}),
     ("on one dashboard", {"color": ACCENT, "italic": True})],
    "This is a sample of the dashboard you get, built from your real August "
    "numbers. Paying customers and ACV stay empty until we import purchases "
    "in November.", "07", tight=True)
body = dash_frame(s, top, "SignWell · Paid acquisition",
                  "Sample dashboard · your August 2026 data",
                  [("Sample dashboard, your real August data", True),
                   ("Aug 1 to Aug 31, 2026", False),
                   ("Qualified sign-ups", False)])
TILES = [
    ("Spend", "$17,342", "Four campaigns", False),
    ("Qualified sign-ups", "1,290", "Plus 481 with no campaign attached", False),
    ("Cost per qualified sign-up", "$13.44", "Blended. Non-brand alone: $378.68", False),
    ("Paying customers", "Not tracked", "We import these from November", True),
    ("ACV", "Not tracked", "We import these from November", True),
]
tw = (CONTENT_W - 40 - 40) / 5
for i, (lab, val, cap, mut) in enumerate(TILES):
    tx = PADX + 20 + i * (tw + 10)
    rrect(s, tx, body, tw, 92, PAPER, None, radius=10)
    tf = tbox(s, tx + 13, body + 11, tw - 26, 12)
    para(tf, lab, first=True, size=9, font=MONO, color=INK3, bold=True,
         spc=1.08, caps=True)
    tf = tbox(s, tx + 13, body + 28, tw - 26, 32)
    para(tf, val, first=True, size=22 if mut else 28, font=SERIF,
         color=INK3 if mut else INK, line_spacing=1.0)
    tf = tbox(s, tx + 13, body + 62, tw - 26, 28)
    para(tf, cap, first=True, size=10.5, color=INK2, line_spacing=1.35)

cy = body + 106
tf = tbox(s, PADX + 20, cy, 400, 20)
para(tf, "Cost per qualified sign-up by campaign", first=True, size=14.5,
     color=INK, bold=True)
ch_x, ch_w = PADX + 20, 543
track_x = ch_x + 136 + 12
track_w = ch_w - 148
bars = [("Brand search", 3.81, "$3.81"), ("Performance Max", 8.69, "$8.69"),
        ("Non-brand search", 378.68, "$378.68"), ("LinkedIn", None, None)]
by0 = cy + 32
vline(s, track_x + track_w * 0.175, by0 - 10, 4 * 29 + 4, INK)
tf = tbox(s, track_x + track_w * 0.175 + 5, by0 - 14, 150, 12)
para(tf, "$70 break-even", first=True, size=9.5, font=MONO, color=INK, bold=True)
for i, (lab, val, txt) in enumerate(bars):
    yy = by0 + i * 29
    tf = tbox(s, ch_x, yy + 2, 136, 16)
    para(tf, lab, first=True, size=13, color=INK2)
    rrect(s, track_x, yy, track_w, 19, LINE_SOFT, None, radius=4)
    if val is None:
        tf = tbox(s, track_x + 10, yy, 220, 19, anchor=MSO_ANCHOR.MIDDLE)
        para(tf, "No sign-ups recorded", first=True, size=12, color=INK3)
        continue
    bw = max(4, track_w * (val / 400.0))
    rrect(s, track_x, yy, bw, 19, ACCENT, None, radius=4)
    wide = bw > track_w * 0.5
    tf = tbox(s, track_x + bw - 80 if wide else track_x + bw + 8, yy, 76, 19,
              anchor=MSO_ANCHOR.MIDDLE)
    para(tf, txt, first=True, size=11, font=MONO, color=LIFT if wide else INK,
         bold=True, align=PP_ALIGN.RIGHT if wide else PP_ALIGN.LEFT)
for i, tick in enumerate(["$0", "$100", "$200", "$300", "$400"]):
    tfx = track_x + track_w * (i / 4.0)
    tf = tbox(s, tfx - (0 if i == 0 else (34 if i == 4 else 17)),
              by0 + 4 * 29 + 2, 34, 12)
    para(tf, tick, first=True, size=9, font=MONO, color=INK3,
         align=PP_ALIGN.LEFT if i == 0 else
         (PP_ALIGN.RIGHT if i == 4 else PP_ALIGN.CENTER))

tx0 = PADX + 20 + 569
tf = tbox(s, tx0, cy, 400, 20)
para(tf, "Campaigns", first=True, size=14.5, color=INK, bold=True)
COLS = [173, 92, 90, 88, 100]
tbl = mk_table(s, tx0, cy + 26, sum(COLS), COLS, 6, 28)
hdr = ["Campaign", "Spend", "Qualified", "Cost each", "Paying"]
for c, t in enumerate(hdr):
    cell(tbl, 0, c, t, size=10, font=MONO, color=INK3, bold=True, spc=1.2,
         caps=True, align=PP_ALIGN.LEFT if c == 0 else PP_ALIGN.RIGHT)
ROWS7 = [
    ("Brand search", "$3,981.44", "1,044", "$3.81", "Not tracked", False),
    ("Performance Max", "$1,930.22", "222", "$8.69", "Not tracked", False),
    ("Non-brand search", "$9,088.20", "24", "$378.68", "Not tracked", True),
    ("LinkedIn", "$2,341.70", "0", "No data", "Not tracked", False),
    ("Total", "$17,341.56", "1,290", "$13.44", "Not tracked", False),
]
for r, (a, b, c_, d, e, hot) in enumerate(ROWS7, start=1):
    fill = HOT_BG if hot else None
    tot = (a == "Total")
    cell(tbl, r, 0, a, color=HOT_TX if hot else INK, bold=True, fill=fill)
    for ci, v in enumerate([b, c_, d], start=1):
        cell(tbl, r, ci, v, color=INK3 if v == "No data" else INK2, bold=tot,
             fill=fill, align=PP_ALIGN.RIGHT)
    cell(tbl, r, 4, e, color=INK3, bold=tot, fill=fill, align=PP_ALIGN.RIGHT)
for r in range(6):
    for c in range(5):
        cl = tbl.cell(r, c)
        if r == 0:
            cell_border(cl, "lnB", INK, 2)
        elif r == 5:
            cell_border(cl, "lnB", INK, 2)
        else:
            cell_border(cl, "lnB", LINE, 1)
tbl.rows[0].height = px(26)
for r in range(1, 6):
    tbl.rows[r].height = px(28)
tf = tbox(s, tx0, cy + 26 + 26 + 5 * 28 + 9, 560, 16)
para(tf, "Plus 481 sign-ups that arrived through Sign in with Google, with no "
         "campaign attached.", first=True, size=11.5, color=INK2)

# ===========================================================================
# 08 - keyword dashboard
# ===========================================================================
s = new_slide()
top = chrome(
    s, "Sample dashboard  Keywords",
    [("Every sign-up, ", {}),
     ("down to the keyword", {"color": ACCENT, "italic": True})],
    "Your current agency has never shown you what each keyword costs, so these "
    "are example keywords in the layout you get in week one. Your own numbers "
    "replace them on day one.", "08", tight=True)
body = dash_frame(s, top, "SignWell · Keywords",
                  "Sample dashboard · example keywords, not your data",
                  [("Sample dashboard, example keywords", True),
                   ("Qualified sign-ups", False)])
KCOLS = [217, 62, 84, 88, 92]
BRAND = [
    ("signwell", "Exact", "$1,963", "640", "$3.07", False),
    ("sign well", "Phrase", "$784", "259", "$3.03", False),
    ("signwell pricing", "Exact", "$341", "104", "$3.28", False),
    ("signwell login", "Exact", "$893", "41", "$21.78", True),
    ("Total", "", "$3,981", "1,044", "$3.81", False),
]
NONBRAND = [
    ("electronic signature", "Broad", "$3,120", "3", "$1,040", True),
    ("esignature software", "Phrase", "$2,016", "4", "$504", True),
    ("free electronic signature", "Broad", "$1,642", "2", "$821", True),
    ("docusign alternative", "Phrase", "$1,626", "10", "$163", False),
    ("digital signature api", "Exact", "$684", "5", "$137", False),
    ("Total", "", "$9,088", "24", "$378.68", False),
]
for col_i, (title, data) in enumerate(
        [("Brand keywords", BRAND), ("Non-brand keywords", NONBRAND)]):
    kx = PADX + 20 + col_i * 569
    tf = tbox(s, kx, body, 400, 20)
    para(tf, title, first=True, size=14.5, color=INK, bold=True)
    t = mk_table(s, kx, body + 26, sum(KCOLS), KCOLS, len(data) + 1, 27)
    for c, htxt in enumerate(["Keyword", "Match", "Spend", "Qualified", "Cost each"]):
        cell(t, 0, c, htxt, size=9.5, font=MONO, color=INK3, bold=True, spc=1.14,
             caps=True, align=PP_ALIGN.LEFT if c < 2 else PP_ALIGN.RIGHT)
    for r, (kw, mt, sp, ql, ce, hot) in enumerate(data, start=1):
        fill = HOT_BG if hot else None
        tot = (kw == "Total")
        cell(t, r, 0, kw, color=HOT_TX if hot else INK, bold=True, fill=fill)
        cell(t, r, 1, mt, size=10.5, color=INK3, fill=fill, padl=0, padr=6)
        for ci, v in enumerate([sp, ql, ce], start=2):
            cell(t, r, ci, v, color=INK2, bold=tot, fill=fill,
                 align=PP_ALIGN.RIGHT)
    last = len(data)
    for r in range(last + 1):
        for c in range(5):
            cl = t.cell(r, c)
            if r == 0 or r == last:
                cell_border(cl, "lnB", INK, 2)
            else:
                cell_border(cl, "lnB", LINE, 1)
    t.rows[0].height = px(25)
    for r in range(1, last + 1):
        t.rows[r].height = px(27)

FINDS = [
    ("Where the money goes",
     "Three generic keywords took $6,778 for 9 sign-ups, at $753 each."),
    ("Where the buyers are",
     "Two buyer-led keywords took $2,310 for 15 sign-ups, at $154 each."),
    ("What we stop",
     "The login keyword took $893 from people who already pay you."),
]
fy = top + 427 - 18 - 72
fw = (CONTENT_W - 40 - 24) / 3
for i, (lab, txt) in enumerate(FINDS):
    fx = PADX + 20 + i * (fw + 12)
    rrect(s, fx, fy, fw, 72, PAPER, None, radius=10)
    tf = tbox(s, fx + 13, fy + 11, fw - 26, 12)
    para(tf, lab, first=True, size=9, font=MONO, color=ACCENT, bold=True,
         spc=1.08, caps=True)
    tf = tbox(s, fx + 13, fy + 28, fw - 26, 40)
    para(tf, txt, first=True, size=12, color=INK2, line_spacing=1.42)

# ===========================================================================
# 09 - sample report
# ===========================================================================
s = new_slide()
top = chrome(
    s, "Sample report  Every two weeks",
    [("What you read ", {}),
     ("every two weeks", {"color": ACCENT, "italic": True})],
    "One page every two weeks, built from the same data as the dashboard. This "
    "is your August, written the way we would have reported it.", "09")
for i, (x, w) in enumerate(C3):
    rrect(s, x, top, w, CH5, WASH if i == 2 else LIFT, None if i == 2 else LINE)
rep = [
    ("What happened", "Results for the period", [
        "Brand search brought 1,044 qualified sign-ups at $3.81 each, which is "
        "81% of every sign-up we can trace.",
        "Non-brand search took 52% of spend for 24 sign-ups at $378.68 each.",
        "LinkedIn spent $2,341.70 and recorded no sign-ups.",
        "481 sign-ups came through Sign in with Google with no campaign attached."]),
    ("What we change", "The next two weeks", [
        "We cap the current non-brand keywords at $1,700 and fund buyer-led campaigns.",
        "We exclude brand terms from Performance Max, so its sign-ups are its own.",
        "We add a referral exclusion for Sign in with Google, so those 481 keep "
        "their real source."]),
    ("What we need", "Two things to confirm", [
        "August billed $17,342 against a $20,000 budget. Tell us what the $2,658 "
        "difference covers.",
        "Approve next month's media budget."]),
]
for (x, w), (lab, title, items) in zip(C3, rep):
    card_label(s, x + 22, top + 22, w - 44, lab)
    card_title(s, x + 22, top + 46, w - 44, title)
    bullets(s, x + 22, top + 78, w - 44, items)
band(s, top + CH5 + 18,
     [("Each report ends with what we change next, and ", {}),
      ("what we need from you.", {"color": AQUA, "italic": True})])

# ===========================================================================
# 10 - budget
# ===========================================================================
s = new_slide()
top = chrome(
    s, "Budget",
    [("Where the ", {}),
     ("$20,000 to $25,000", {"color": ACCENT, "italic": True}),
     (" goes each month", {})],
    "Google carries October while we rebuild. Meta takes a bigger share as its "
    "tracking and creative come online. We set the campaign split in week one, "
    "once we can see inside the account.",
    "10")
MONTHS = [
    ("October", "$20,000", 90, 10,
     "Brand and non-brand search carry the month. Meta spend starts only "
     "after the pixel is clean."),
    ("November", "$22,500", 69, 31,
     "Meta goes live alongside the accounting vertical test, and non-brand "
     "scales into the pockets that work."),
    ("December", "$25,000", 62, 38,
     "Retargeting opens, and budget follows the campaigns that stay under "
     "$70. We review LinkedIn, Reddit and ChatGPT ads for Q1."),
]
MH = 255
TEAL = RGBColor(0x2E, 0x8C, 0x9C)
for (x, w), (month, figure, gshare, mshare, body) in zip(C3, MONTHS):
    rrect(s, x, top, w, MH, LIFT, LINE)
    card_label(s, x + 22, top + 22, w - 44, month)
    tf = tbox(s, x + 22, top + 40, w - 44, 52)
    para(tf, figure, first=True, size=46, font=SERIF, color=INK,
         line_spacing=1.0)
    # the split bar: an aqua track with the Google share laid over it
    bar_w = w - 44
    rrect(s, x + 22, top + 128, bar_w, 10, AQUA, None, radius=5)
    rrect(s, x + 22, top + 128, bar_w * gshare / 100.0, 10, ACCENT, None,
          radius=5)
    tf = tbox(s, x + 22, top + 146, bar_w * 0.55, 16)
    para(tf, f"Google about {int(round(gshare / 10.0)) * 10}%", first=True,
         size=12.5, color=ACCENT, bold=True)
    tf = tbox(s, x + 22 + bar_w * 0.45, top + 146, bar_w * 0.55, 16)
    para(tf, f"Meta about {int(round(mshare / 10.0)) * 10}%", first=True,
         size=12.5, color=TEAL, align=PP_ALIGN.RIGHT)
    tf = tbox(s, x + 22, top + 178, w - 44, 66)
    para(tf, body, first=True, size=13.5, color=INK2, line_spacing=1.5)

fy = 551
FOOT = [
    ("These shares show direction, not a commitment. We set the "
     "campaign-level split in week one.", True),
    ("Every new line has a kill date. We measure each campaign against $70 a "
     "qualified sign-up and close the ones that miss it.", False),
    ("The accounts stay in SignWell's name. The spend, the history and the "
     "data stay yours, whatever happens to this engagement.", False),
]
for (x, w), (txt, wash) in zip(C3, FOOT):
    rrect(s, x, fy, w, 94, WASH if wash else LIFT, None if wash else LINE)
    tf = tbox(s, x + 20, fy + 16, w - 40, 62)
    para(tf, txt, first=True, size=13.5, color=INK2, line_spacing=1.5)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
prs.save(OUT)
print("wrote", OUT)
print("slides:", len(prs.slides.__iter__.__self__._sldIdLst))
