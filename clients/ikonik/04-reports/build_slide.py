from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.oxml.ns import qn
from pptx.oxml import parse_xml
import sys

INK   = RGBColor(0x14,0x20,0x1F); GREY = RGBColor(0x5B,0x6B,0x6A)
PALE  = RGBColor(0xA9,0xB5,0xB4); TEAL = RGBColor(0x02,0x95,0xAD)
ORNG  = RGBColor(0xC0,0x70,0x16); TINT = RGBColor(0xF2,0xF6,0xF5)
RULE  = RGBColor(0xDD,0xE5,0xE3); WHITE= RGBColor(0xFF,0xFF,0xFF)
F = "Arial"
NS = 'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"'

prs = Presentation(); prs.slide_width = Inches(10); prs.slide_height = Inches(5.625)
s = prs.slides.add_slide(prs.slide_layouts[6])
bg = s.background.fill; bg.solid(); bg.fore_color.rgb = WHITE

def textbox(x, y, w, h, text, size, color, bold=False, align=PP_ALIGN.LEFT):
    tb = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = tb.text_frame; tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    p = tf.paragraphs[0]; p.alignment = align
    r = p.add_run(); r.text = text
    r.font.name = F; r.font.size = Pt(size); r.font.bold = bold; r.font.color.rgb = color
    return tb

def set_border(cell, edge, rgb, pt):
    """edge: 'T' or 'B'. Real table cell borders, so rules track row boundaries."""
    tcPr = cell._tc.get_or_add_tcPr()
    tag = 'a:ln' + edge
    for e in tcPr.findall(qn(tag)):
        tcPr.remove(e)
    ln = parse_xml(
        f'<a:ln{edge} {NS} w="{int(pt*12700)}" cap="flat" cmpd="sng" algn="ctr">'
        f'<a:solidFill><a:srgbClr val="{rgb}"/></a:solidFill>'
        f'<a:prstDash val="solid"/></a:ln{edge}>')
    # lnT precedes lnB, and both precede the cell fill
    idx = 0
    if edge == 'B' and tcPr.findall(qn('a:lnT')):
        idx = 1
    tcPr.insert(idx, ln)

# ---- Title block: title wraps to two lines, so the stack is spaced for that ----
textbox(0.55, 0.32, 8.9, 0.80,
        "August hit the target tier. September sits one tier below.", 24, INK, bold=True)
textbox(0.55, 1.16, 8.9, 0.34,
        "The bonus is set by average paid enquiries per day across the calendar month, organic excluded. "
        "The two months together pay RM10,500.", 12, GREY)

ln = s.shapes.add_shape(1, Inches(0.55), Inches(1.52), Inches(8.9), Emu(9525))
ln.fill.solid(); ln.fill.fore_color.rgb = RULE; ln.line.fill.background(); ln.shadow.inherit = False

# ---- Table ----
rows_data = [
    ("",                         "TARGET",     "AUGUST ACTUAL", "SEPT PROJECTED"),
    ("Paid enquiries",           "3,000+",     "3,737",         "2,583"),
    ("Avg paid enquiries / day", "100.0",      "120.5",         "86.1"),
    ("Against target",           "n/a",        "20.5% above",   "13.9% below"),
    ("Bonus tier hit",           "100 to 139", "100 to 139",    "60 to 99"),
    ("Performance fee",          "+RM3,000",   "+RM3,000",      "+RM1,500"),
    ("Total monthly fee",        "RM6,000",    "RM6,000",       "RM4,500"),
]
BOLD_ROWS = (2, 4)
n_rows, tbl_top, tbl_h = len(rows_data), 1.66, 2.02
tbl = s.shapes.add_table(n_rows, 4, Inches(0.55), Inches(tbl_top), Inches(8.9), Inches(tbl_h)).table
tbl.first_row = False; tbl.horz_banding = False
for c, w in zip(tbl.columns, [2.9, 2.0, 2.0, 2.0]):
    c.width = Inches(w)
for r in tbl.rows:
    r.height = Inches(tbl_h / n_rows)

for ri, vals in enumerate(rows_data):
    is_head, is_tot = (ri == 0), (ri == n_rows - 1)
    for ci, val in enumerate(vals):
        cell = tbl.cell(ri, ci)
        cell.fill.solid(); cell.fill.fore_color.rgb = TINT if is_head else WHITE
        cell.margin_left = cell.margin_right = Inches(0.11)
        cell.margin_top = cell.margin_bottom = Inches(0.04)
        cell.vertical_anchor = MSO_ANCHOR.MIDDLE
        p = cell.text_frame.paragraphs[0]
        p.alignment = PP_ALIGN.LEFT if ci == 0 else PP_ALIGN.RIGHT
        run = p.add_run(); run.text = val; run.font.name = F
        if is_head:
            run.font.size = Pt(8); run.font.bold = True; run.font.color.rgb = GREY
        elif is_tot:
            run.font.size = Pt(13); run.font.bold = True
            run.font.color.rgb = TEAL if ci == 2 else (ORNG if ci == 3 else INK)
        else:
            run.font.size = Pt(11)
            run.font.bold = ri in BOLD_ROWS and ci in (2, 3)
            if ci == 2 and ri > 1:   run.font.color.rgb = TEAL
            elif ci == 3 and ri > 1: run.font.color.rgb = ORNG
            elif val == "n/a":       run.font.color.rgb = PALE
            else:                    run.font.color.rgb = INK
        # borders
        if is_head:                set_border(cell, 'B', 'A9B5B4', 1.0)
        elif is_tot:               set_border(cell, 'T', '14201F', 1.75)
        elif ri < n_rows - 2:      set_border(cell, 'B', 'DDE5E3', 0.5)

# ---- Tier ladder ----
cards = [("Below 60 / day",           "RM3,000",     None,              RULE),
         ("60 to 99 / day",           "RM4,500",     "September, 86.1", ORNG),
         ("100 to 139 / day, target", "RM6,000",     "August, 120.5",   TEAL),
         ("140+ / day",               "RM7,500 cap", None,              RULE)]
cw, gap, cy, ch = 2.135, 0.12, 3.86, 0.92
for i, (title, fee, mark, accent) in enumerate(cards):
    x = 0.55 + i * (cw + gap)
    box = s.shapes.add_shape(1, Inches(x), Inches(cy), Inches(cw), Inches(ch))
    box.fill.solid(); box.fill.fore_color.rgb = TINT
    box.line.fill.background(); box.shadow.inherit = False
    top = s.shapes.add_shape(1, Inches(x), Inches(cy), Inches(cw), Inches(0.05))
    top.fill.solid(); top.fill.fore_color.rgb = accent
    top.line.fill.background(); top.shadow.inherit = False
    textbox(x + 0.16, cy + 0.15, cw - 0.3, 0.18, title, 9, GREY, bold=True)
    textbox(x + 0.16, cy + 0.37, cw - 0.3, 0.26, fee, 15, INK, bold=True)
    if mark:
        textbox(x + 0.16, cy + 0.66, cw - 0.3, 0.18, mark, 9, accent, bold=True)

textbox(0.55, 5.21, 7.4, 0.2,
        "Ikonik × Toggle · Figures as at 19 September 2026 · September projected at "
        "today’s cost per enquiry, Meta and Google only", 9, PALE)
textbox(8.95, 5.21, 0.5, 0.2, "1", 9, PALE, align=PP_ALIGN.RIGHT)

prs.save(sys.argv[1]); print("saved")
