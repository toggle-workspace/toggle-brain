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
        "Who else will be involved in the decision, and who gives the final approval?",
        "When would you like to decide, and when should the work start?",
    ]),
    ("2. Goals and budget", [
        f"What would make 2027 a successful year for TC Boy online? Please tick up to two.\n"
        f"{BOX} More online sales\n{BOX} Stronger brand among fitness buyers\n"
        f"{BOX} More supermarket sales\n{BOX} New, younger customers\n{BOX} Other: ______",
        f"Does the RM200,000 include advertising spend, meaning the money paid to TikTok, Shopee, Lazada, Meta and Google?\n"
        f"{BOX} Yes, it is all-in\n{BOX} No, advertising is separate\n{BOX} Not decided yet",
        "At the mid-year checkpoint, what would you need to see to increase the budget?",
    ]),
    ("3. Your sales today", [
        "Roughly how are your sales split today?\n"
        "Supermarkets and hypermarkets ____%\nSundry shops and wholesalers ____%\n"
        "Export ____%\nOnline ____%",
        "About how much did TC Boy sell online in 2026, and through which channels?",
        "Which three products sell the most?",
    ]),
    ("4. Website and marketplaces", [
        "Who built and maintains tcboy.com? Please share the contact person.",
        "Do you sell on Shopee, Lazada, TikTok Shop or Grab today? If yes, what are the store names, and who manages them?",
        "Do any authorized resellers or distributors sell TC Boy online? Please list them.",
        "Do you have rules on online prices compared with supermarket prices?",
        "Your website sells tuna by the carton only. Can we offer smaller packs online, such as 6, 12 or 24 cans?",
    ]),
    ("5. Products and the high-protein direction", [
        f"Can you share the nutrition panel (protein per can) for each product?\n{BOX} Attached\n{BOX} Will send by: ______",
        "Is the high-protein direction for the whole brand, or for some products only? Which ones?",
        "Are any new products planned for 2027, such as new flavors, pouches or ready meals?",
        "Is your halal certification current for all products?",
        f"Do you have brand guidelines (logo, colors, fonts, tone of voice)?\n{BOX} Attached\n{BOX} Will send\n{BOX} None yet",
        "Are there any words, claims or topics we must avoid?",
    ]),
    ("6. Stock and delivery", [
        "Who packs and ships online orders today, and from which location?",
        "On a big sale day such as 11.11, about how many orders could you pack and ship?",
        "Who answers customer questions and complaints online?",
    ]),
    ("7. Marketing so far", [
        "What marketing did you run in the last 12 months (ads, influencers, events, promotions)? What worked, and what did not?",
        "Which brands do you see as your main competitors?",
        f"Do you have product photos and videos we can use?\n{BOX} Yes, we will share a folder\n{BOX} A few\n{BOX} No",
    ]),
    ("8. Accounts", [
        f"Please tick the accounts TC Boy already has. We will send access requests separately, so please do not write any passwords here.\n"
        f"{BOX} Meta Business Manager\n{BOX} TikTok Ads or Business Center\n{BOX} TikTok Shop Seller Center\n"
        f"{BOX} Shopee Seller Centre\n{BOX} Lazada Seller Center\n{BOX} Google Ads\n"
        f"{BOX} Google Analytics\n{BOX} Google Search Console",
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
     "This should take about 20 minutes. Short answers are fine. If you are unsure about a question, "
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
        h.set(qn("w:val"), str(int(Cm(1.3).twips if hasattr(Cm(1.3), "twips") else 737)))
        h.set(qn("w:hRule"), "atLeast")
        tr.append(h)
        cs = OxmlElement("w:cantSplit"); tr.append(cs)
    # keep each short section on one page: chain every row but the last to the next
    for row in t.rows[:-1]:
        for c in row.cells:
            for pp in c.paragraphs:
                pp.paragraph_format.keep_with_next = True
    para(doc, "", 6, space_after=6)

para(doc, "Anything else you would like us to know?", 12.5, TEAL, bold=True, space_after=4)
t = doc.add_table(rows=1, cols=1)
c = t.rows[0].cells[0]
c.width = Cm(17.0)
set_cell_border(c)
tr = t.rows[0]._tr.get_or_add_trPr()
h = OxmlElement("w:trHeight"); h.set(qn("w:val"), "1700"); h.set(qn("w:hRule"), "atLeast"); tr.append(h)

para(doc, "", 6, space_after=10)
para(doc, "Toggle Solutions · Your Digital Growth Partner · toggle.solutions · hello@toggle.solutions",
     8.5, GREY, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=0)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
doc.save(OUT)
print("saved", os.path.abspath(OUT), n, "questions")
