# -*- coding: utf-8 -*-
"""TC Boy x Toggle 2027 proposal deck. House style, 10 x 5.625in."""
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

FOOTER = "TC Boy × Toggle · 2027 plan"
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
