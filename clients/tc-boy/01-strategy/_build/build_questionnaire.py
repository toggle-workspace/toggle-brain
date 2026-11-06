# -*- coding: utf-8 -*-
"""TC Boy onboarding questionnaire (client-facing .docx). Run with the scratchpad venv."""
import os
from docx import Document
from docx.shared import Pt, Inches, RGBColor, Cm
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "..", "00-brief", "TC-Boy-Onboarding-Questionnaire-Nov-2026.docx")
LOGO = "/Users/yiyang/Desktop/Toggle_Claude/toggle-brain/assets/logos/toggle-wordmark-black.png"

INK = RGBColor(0x14, 0x20, 0x1F)
GREY = RGBColor(0x5B, 0x6B, 0x6A)
TEAL = RGBColor(0x02, 0x95, 0xAD)
BOX = "☐"

SECTIONS = [
    ("1. About you", [
        "What is your name, role, email and phone number?",
        "Who gives the final approval, and when would you like the work to start?",
    ]),
    ("2. Your goals", [
        f"What would make 2027 a successful year for TC Boy online? Please tick up to two.\n"
        f"{BOX} More online sales\n{BOX} Stronger brand among fitness buyers\n"
        f"{BOX} More supermarket sales\n{BOX} New, younger customers\n{BOX} Other: ______",
    ]),
    ("3. Sales and channels", [
        "About how much did TC Boy sell online in 2026, and through which channels?",
        "Which three products sell the most?",
        "Do you sell on Shopee, Lazada, TikTok Shop or Grab today? If yes, who manages the stores?",
        "Who built and maintains tcboy.com? Please share the contact person.",
    ]),
    ("4. Orders and accounts", [
        "Who packs and ships online orders today, and about how many orders could you handle on a big sale day such as 11.11?",
        f"Please tick the accounts TC Boy already has. We will send access requests separately, so please do not write any passwords here.\n"
        f"{BOX} Meta Business Manager   {BOX} Google Ads\n{BOX} TikTok Ads   {BOX} TikTok Shop\n"
        f"{BOX} Shopee   {BOX} Lazada\n{BOX} Google Analytics   {BOX} Search Console",
    ]),
]


def set_cell_border(cell, color="DDE5E3", sz=6):
    tcPr = cell._tc.get_or_add_tcPr()
    borders = OxmlElement("w:tcBorders")
    for edge in ("top", "left", "bottom", "right"):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), "single")
        el.set(qn("w:sz"), str(sz))
        el.set(qn("w:color"), color)
        borders.append(el)
    tcPr.append(borders)


def shade(cell, fill="F2F6F5"):
    tcPr = cell._tc.get_or_add_tcPr()
    sh = OxmlElement("w:shd")
    sh.set(qn("w:val"), "clear")
    sh.set(qn("w:color"), "auto")
    sh.set(qn("w:fill"), fill)
    tcPr.append(sh)


def para(doc_or_cell, text, size=10.5, color=INK, bold=False, space_after=4, align=None):
    p = doc_or_cell.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.space_before = Pt(0)
    if align:
        p.alignment = align
    r = p.add_run(text)
    r.font.name = "Arial"
    r.font.size = Pt(size)
    r.font.bold = bold
    r.font.color.rgb = color
    return p


doc = Document()
for s in doc.sections:
    s.page_width, s.page_height = Cm(21.0), Cm(29.7)
    s.left_margin = s.right_margin = Cm(2.0)
    s.top_margin = s.bottom_margin = Cm(1.8)
st = doc.styles["Normal"]
st.font.name = "Arial"
st.element.rPr.rFonts.set(qn("w:eastAsia"), "Arial")
st.font.size = Pt(10.5)

doc.add_picture(LOGO, width=Inches(1.2))
para(doc, "TC Boy × Toggle: onboarding questionnaire", 18, INK, bold=True, space_after=2)
para(doc, "For the 2027 online growth and media proposal", 11, GREY, space_after=10)
para(doc,
     "Thank you for inviting Toggle to propose a plan for 2027. Your answers help us size the plan "
     "around your real numbers, so the proposal fits your business from the first draft. "
     "This should take about 5 minutes. Short answers are fine. If you are unsure about a question, "
     "write \"not sure\" and we will cover it together in our working session.",
     10.5, INK, space_after=6)
para(doc, "Please return this form by Friday, 13 November 2026 to hello@toggle.solutions.",
     10.5, TEAL, bold=True, space_after=12)

n = 0
for title, qs in SECTIONS:
    para(doc, title, 12.5, TEAL, bold=True, space_after=4).paragraph_format.keep_with_next = True
    t = doc.add_table(rows=0, cols=2)
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    t.autofit = False
    t.columns[0].width, t.columns[1].width = Cm(9.0), Cm(8.0)
    for q in qs:
        n += 1
        row = t.add_row()
        qc, ac = row.cells
        qc.width, ac.width = Cm(9.0), Cm(8.0)
        for c in (qc, ac):
            set_cell_border(c)
        shade(qc)
        lines = q.split("\n")
        qc.paragraphs[0].text = ""
        r = qc.paragraphs[0].add_run(f"{n}.  {lines[0]}")
        r.font.name = "Arial"; r.font.size = Pt(10); r.font.color.rgb = INK
        qc.paragraphs[0].paragraph_format.space_after = Pt(3)
        opts = lines[1:]
        ac.paragraphs[0].text = ""
        for i, extra in enumerate(opts):
            target = ac.paragraphs[0] if i == 0 else ac.add_paragraph()
            target.paragraph_format.space_after = Pt(2)
            rr = target.add_run(extra)
            rr.font.name = "Arial"; rr.font.size = Pt(10); rr.font.color.rgb = INK
        tr = row._tr.get_or_add_trPr()
        h = OxmlElement("w:trHeight")
        h.set(qn("w:val"), str(int(Cm(1.0).twips if hasattr(Cm(1.0), "twips") else 737)))
        h.set(qn("w:hRule"), "atLeast")
        tr.append(h)
        cs = OxmlElement("w:cantSplit"); tr.append(cs)
    # keep each short section on one page: chain every row but the last to the next
    for row in t.rows[:-1]:
        for c in row.cells:
            for pp in c.paragraphs:
                pp.paragraph_format.keep_with_next = True
    para(doc, "", 6, space_after=6)

para(doc, "Anything else you would like us to know? Add it to your reply email, and we will read it before the session.",
     10.5, INK, space_after=0)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
doc.save(OUT)
print("saved", os.path.abspath(OUT), n, "questions")
