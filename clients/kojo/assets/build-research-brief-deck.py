#!/usr/bin/env python3
"""Toggle x Kojo research brief. 10 slides, 16:9, Toggle design-system canon."""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
import copy

# ---------------------------------------------------------------- tokens
INK        = RGBColor(0x0F, 0x0F, 0x0F)
BODY       = RGBColor(0x4A, 0x4A, 0x4A)
SECONDARY  = RGBColor(0x6B, 0x72, 0x80)
MUTED      = RGBColor(0x9A, 0xA0, 0xA8)
WHITE      = RGBColor(0xFF, 0xFF, 0xFF)
BLUE       = RGBColor(0x4A, 0x7B, 0xF7)   # fills, rules, stripes
BLUE_DEEP  = RGBColor(0x30, 0x56, 0xC9)   # text-safe blue
NAVY       = RGBColor(0x0A, 0x12, 0x24)
CARD       = RGBColor(0xF2, 0xF3, 0xF6)
CALLOUT    = RGBColor(0xDD, 0xE5, 0xFE)
BORDER     = RGBColor(0xE4, 0xE6, 0xEE)
BORDER_STR = RGBColor(0xD2, 0xD6, 0xE2)
TEAL       = RGBColor(0x2E, 0xCC, 0x9B)
ORANGE     = RGBColor(0xF2, 0x8B, 0x4C)
PURPLE     = RGBColor(0x8E, 0x6B, 0xE6)
PINK       = RGBColor(0xF5, 0x9E, 0xC9)

FONT = "Inter Tight"
W, H = 13.333, 7.5
M = 0.72                      # side margin
CW = W - 2 * M                # content width

LOGO_BLACK = "/Users/jordananthonypinto/Desktop/Code/Toggle Brain/assets/logos/toggle-wordmark-black.png"
LOGO_WHITE = "/Users/jordananthonypinto/Desktop/Code/Toggle Brain/assets/logos/toggle-wordmark-white.png"
OUT = "/Users/jordananthonypinto/Desktop/Kojo-Research-Brief-2026-09-24.pptx"

prs = Presentation()
prs.slide_width, prs.slide_height = Inches(W), Inches(H)
BLANK = prs.slide_layouts[6]


# ---------------------------------------------------------------- helpers
def spacing(run, hundredths):
    """Letter-spacing in hundredths of a point."""
    run.font._rPr.set('spc', str(hundredths))


def tabular(run):
    """Tabular figures so stat columns line up."""
    rpr = run.font._rPr
    for tag, val in (('a:latin', FONT),):
        pass
    ln = rpr.makeelement(qn('a:latin'), {'typeface': FONT})
    # OpenType feature via <a:rPr> is not supported by python-pptx; Inter Tight
    # default figures are proportional-safe at these sizes, so we skip.


def tb(slide, x, y, w, h, wrap=True, anchor=MSO_ANCHOR.TOP):
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = wrap
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    return tf


def para(tf, first=False, space_before=0, space_after=0, line=None, align=PP_ALIGN.LEFT):
    p = tf.paragraphs[0] if first else tf.add_paragraph()
    p.space_before = Pt(space_before)
    p.space_after = Pt(space_after)
    p.alignment = align
    if line:
        p.line_spacing = line
    return p


def run(p, text, size=11, bold=False, color=BODY, italic=False, spc=None):
    r = p.add_run()
    r.text = text
    r.font.name = FONT
    r.font.size = Pt(size)
    r.font.bold = bold
    r.font.italic = italic
    r.font.color.rgb = color
    if spc is not None:
        spacing(r, spc)
    return r


def rect(slide, x, y, w, h, fill=None, line=None, line_w=0.75):
    s = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
    s.shadow.inherit = False
    if fill is None:
        s.fill.background()
    else:
        s.fill.solid()
        s.fill.fore_color.rgb = fill
    if line is None:
        s.line.fill.background()
    else:
        s.line.color.rgb = line
        s.line.width = Pt(line_w)
    s.text_frame.word_wrap = True
    return s


def card(slide, x, y, w, h, stripe=None, fill=CARD, border=BORDER):
    """Card with an optional colored top stripe (design-system signature device)."""
    rect(slide, x, y, w, h, fill=fill, line=border)
    if stripe:
        rect(slide, x, y, w, 0.055, fill=stripe)
    return rect  # shape body drawn separately by caller


def eyebrow(slide, text, y=0.62, color=BLUE_DEEP):
    tf = tb(slide, M, y, CW, 0.26)
    p = para(tf, first=True)
    run(p, text.upper(), size=10, bold=True, color=color, spc=120)


def h1(slide, segments, y=0.94, size=30, w=None):
    """segments: list of (text, is_accent)."""
    tf = tb(slide, M, y, w or CW, 0.62)
    p = para(tf, first=True, line=1.06)
    for text, accent in segments:
        run(p, text, size=size, bold=True, color=(BLUE_DEEP if accent else INK))


def kicker(slide, text, y=1.62, w=None, size=12.5):
    tf = tb(slide, M, y, w or (CW * 0.86), 0.5)
    p = para(tf, first=True, line=1.28)
    run(p, text, size=size, color=BODY)


def folio(slide, left, num, dark=False, size=9):
    rect(slide, M, H - 0.72, CW, 0.012, fill=(RGBColor(0x1F, 0x2A, 0x44) if dark else BORDER))
    tf = tb(slide, M, H - 0.60, CW * 0.86, 0.26)
    p = para(tf, first=True)
    run(p, left, size=size, color=(MUTED if dark else SECONDARY), spc=30)
    tf2 = tb(slide, W - M - 0.6, H - 0.60, 0.6, 0.26)
    p2 = para(tf2, first=True, align=PP_ALIGN.RIGHT)
    run(p2, str(num), size=9, bold=True, color=(WHITE if dark else INK))


def mark(slide, white=False):
    slide.shapes.add_picture(LOGO_WHITE if white else LOGO_BLACK,
                             Inches(W - M - 1.12), Inches(0.46), width=Inches(1.12))


def new(num, eyebrow_text, head, kick=None, folio_left="Toggle × Kojo · Research brief",
        folio_size=9):
    s = prs.slides.add_slide(BLANK)
    mark(s)
    eyebrow(s, eyebrow_text)
    h1(s, head)
    if kick:
        kicker(s, kick)
    folio(s, folio_left, num, size=folio_size)
    return s


def bullets(tf, items, size=10, color=BODY, gap=5, line=1.25, bullet_color=BLUE,
            start_new=True):
    for i, item in enumerate(items):
        p = para(tf, first=(i == 0 and not start_new), space_after=gap, line=line)
        pPr = p._p.get_or_add_pPr()
        pPr.set('marL', str(int(0.17 * 914400)))
        pPr.set('indent', str(int(-0.17 * 914400)))
        run(p, "▪  ", size=size, bold=True, color=bullet_color)
        if isinstance(item, tuple):
            run(p, item[0], size=size, bold=True, color=INK)
            run(p, item[1], size=size, color=color)
        else:
            run(p, item, size=size, color=color)


def stat(slide, x, y, w, h, value, label, accent=BLUE):
    rect(slide, x, y, w, h, fill=CARD, line=BORDER)
    rect(slide, x, y, 0.045, h, fill=accent)
    tf = tb(slide, x + 0.24, y + 0.16, w - 0.42, h - 0.3)
    p = para(tf, first=True, space_after=2, line=1.0)
    run(p, value, size=21, bold=True, color=INK)
    p2 = para(tf, line=1.2)
    run(p2, label, size=9, color=SECONDARY)


def cardblock(slide, x, y, w, h, stripe, title, body_lines, title_size=11.5,
              body_size=9.5, fill=CARD, eyebrow_text=None):
    rect(slide, x, y, w, h, fill=fill, line=BORDER)
    rect(slide, x, y, w, 0.055, fill=stripe)
    ty = y + 0.22
    if eyebrow_text:
        tfe = tb(slide, x + 0.22, ty, w - 0.44, 0.2)
        pe = para(tfe, first=True)
        run(pe, eyebrow_text.upper(), size=8, bold=True, color=BLUE_DEEP, spc=100)
        ty += 0.24
    tf = tb(slide, x + 0.22, ty, w - 0.44, h - (ty - y) - 0.2)
    p = para(tf, first=True, space_after=6, line=1.12)
    run(p, title, size=title_size, bold=True, color=INK)
    for line in body_lines:
        pb = para(tf, space_after=4, line=1.24)
        run(pb, line, size=body_size, color=BODY)


def table(slide, x, y, col_w, header, rows, row_h=0.36, head_h=0.36,
          size=9.5, head_size=9, bold_first=True, zebra=True, total_last=False):
    """Lightweight hand-drawn table. rows: list of list[str]."""
    total_w = sum(col_w)
    # header
    rect(slide, x, y, total_w, head_h, fill=NAVY)
    cx = x
    for i, hcell in enumerate(header):
        tf = tb(slide, cx + 0.14, y + 0.09, col_w[i] - 0.24, head_h - 0.12)
        p = para(tf, first=True)
        run(p, hcell.upper(), size=head_size, bold=True, color=WHITE, spc=70)
        cx += col_w[i]
    ry = y + head_h
    for ri, r in enumerate(rows):
        fill = WHITE if (ri % 2 == 0 or not zebra) else CARD
        if total_last and ri == len(rows) - 1:
            fill = CALLOUT
        rect(slide, x, ry, total_w, row_h, fill=fill, line=BORDER)
        cx = x
        for ci, cell in enumerate(r):
            tf = tb(slide, cx + 0.14, ry + 0.08, col_w[ci] - 0.24, row_h - 0.1)
            p = para(tf, first=True, line=1.14)
            is_total = total_last and ri == len(rows) - 1
            run(p, cell, size=size,
                bold=((bold_first and ci == 0) or is_total),
                color=(INK if ((bold_first and ci == 0) or is_total) else BODY))
            cx += col_w[ci]
        ry += row_h
    return ry


def band(slide, y, segments, h=0.52):
    rect(slide, M, y, CW, h, fill=CALLOUT)
    rect(slide, M, y, 0.05, h, fill=BLUE)
    tf = tb(slide, M + 0.26, y + 0.13, CW - 0.5, h - 0.2)
    p = para(tf, first=True, line=1.15)
    for text, accent in segments:
        run(p, text, size=12, bold=accent, color=(BLUE_DEEP if accent else INK))


def sources(slide, text):
    tf = tb(slide, M, H - 0.60, CW * 0.86, 0.26)
    p = para(tf, first=True)
    run(p, text, size=8, color=MUTED)


# ================================================================ 1 · COVER
s = prs.slides.add_slide(BLANK)
rect(s, 0, 0, W, H, fill=NAVY)
rect(s, 0, 0, 0.16, H, fill=BLUE)
s.shapes.add_picture(LOGO_WHITE, Inches(M), Inches(0.72), width=Inches(1.5))

tf = tb(s, M, 2.38, CW * 0.72, 0.3)
p = para(tf, first=True)
run(p, "RESEARCH BRIEF · 24 SEPTEMBER 2026", size=10, bold=True, color=BLUE, spc=160)

tf = tb(s, M, 2.82, CW * 0.78, 1.7)
p = para(tf, first=True, line=1.02)
run(p, "Kojo", size=54, bold=True, color=WHITE)
p = para(tf, line=1.06, space_before=6)
run(p, "Materials procurement software for ", size=27, bold=True, color=WHITE)
run(p, "trade contractors", size=27, bold=True, color=BLUE)

tf = tb(s, M, 4.94, CW * 0.62, 0.9)
p = para(tf, first=True, line=1.3)
run(p, "Prepared for the introduction call with Alex Ioannidis, Head of Marketing at Kojo. "
        "Everything here comes from public sources, so treat the numbers as a starting point "
        "and confirm them on the call.", size=11.5, color=RGBColor(0xB0, 0xB8, 0xC9))

rect(s, M, 6.18, 3.1, 0.02, fill=RGBColor(0x2A, 0x37, 0x56))
tf = tb(s, M, 6.34, CW * 0.8, 0.3)
p = para(tf, first=True)
run(p, "Toggle Solutions · Referred by Lawrence · Decision needed before 5 October 2026",
    size=9.5, color=MUTED)

# ================================================================ 2 · WHO THEY ARE
s = new(2, "Who they are", [("Kojo sells the ", False), ("buying system", True),
                            (" behind a construction job", False)],
        "Trade contractors use Kojo to request, order, receive and pay for the materials that go "
        "into a building. It replaces the texts, spreadsheets and emailed PDFs that move that work today.",
        folio_left="Sources: usekojo.com · Contrary Research company report · TechCrunch · Pulse2 (Wesco Series C extension)",
        folio_size=8)

y = 2.32
left_w = CW * 0.505
rect(s, M, y, left_w, 2.42, fill=CARD, line=BORDER)
rect(s, M, y, left_w, 0.055, fill=BLUE)
tf = tb(s, M + 0.26, y + 0.28, left_w - 0.52, 2.0)
p = para(tf, first=True, space_after=7, line=1.1)
run(p, "The problem, as a contractor lives it", size=12, bold=True, color=INK)
p = para(tf, line=1.3, space_after=7)
run(p, "A foreman texts a material list from site. Someone in the office retypes it into an email. "
        "The supplier replies with a PDF quote. Weeks later an invoice arrives and nobody checks it "
        "against the quote or against what was delivered.", size=10, color=BODY)
p = para(tf, line=1.3)
run(p, "Materials are roughly 40% of what a project costs, so every error in that chain lands "
        "straight on the margin.", size=10, color=BODY)

rx = M + left_w + 0.24
rw = CW - left_w - 0.24
rect(s, rx, y, rw, 2.42, fill=WHITE, line=BORDER_STR)
tf = tb(s, rx + 0.26, y + 0.28, rw - 0.52, 2.0)
p = para(tf, first=True, space_after=8, line=1.1)
run(p, "The company", size=12, bold=True, color=INK)
bullets(tf, [
    ("Founded 2018", " in San Francisco as Agora, renamed Kojo in 2022 when it moved beyond electrical."),
    ("Maria Davidson", " is co-founder and CEO, ex Goldman Sachs and 8VC."),
    ("$83.6 million raised", " across four rounds. Battery Ventures led the $39M Series C."),
    ("Wesco International", ", the distributor, put in $10M in October 2025 and is also a supply partner."),
    ("About 150 staff", ", selling into the United States only."),
], size=9.5, gap=5)

ty = 4.86
sw = (CW - 3 * 0.2) / 4
for i, (v, l, c) in enumerate([
    ("$2B", "Material orders processed a year (March 2024)", BLUE),
    ("25,000", "Projects powered, across 47 states", TEAL),
    ("15,000", "Construction professionals on the platform", PURPLE),
    ("$30M", "Saved for customers on material orders", ORANGE),
]):
    stat(s, M + i * (sw + 0.2), ty, sw, 1.28, v, l, accent=c)


# ================================================================ 3 · MODULES
s = new(3, "What they sell", [("Seven modules, ", False), ("one record", True),
                              (" of every dollar of material", False)],
        "Contractors rarely buy all seven at once. Purchasing and Field usually land first, then "
        "Accounting, and Warehouse and Prefab follow as the account grows.")

cols, gap = 4, 0.2
cw = (CW - gap * (cols - 1)) / cols
row_h = 1.72
y0 = 2.34
mods = [
    (BLUE,   "Field", ["The foreman orders materials from a phone, tagged to the right job, "
                       "without calling the office."]),
    (TEAL,   "Purchasing", ["The office turns those requests into quotes, compares vendor prices "
                            "and issues the purchase order."]),
    (PURPLE, "Accounting", ["Every invoice is matched against the purchase order and the delivery "
                            "note before anyone pays it."]),
    (ORANGE, "Warehouse", ["Stock counts, transfers between jobs and a record of what left the "
                           "yard and where it went."]),
    (PINK,   "Prefab", ["The assembly shop takes a requisition, builds the assembly and ships it "
                        "to site as one tracked item."]),
    (BLUE,   "Tool Tracking", ["Who holds which tool, which job it sits on and when it was last "
                               "serviced."]),
    (TEAL,   "Operations", ["The project manager sees committed cost, delivery dates and where a "
                            "job is drifting."]),
]
for i, (c, title, lines) in enumerate(mods):
    r, col = divmod(i, cols)
    cardblock(s, M + col * (cw + gap), y0 + r * (row_h + 0.18), cw, row_h, c, title, lines,
              title_size=12, body_size=9.5)

# eighth cell: the point of the module map
x8 = M + 3 * (cw + gap)
y8 = y0 + row_h + 0.18
rect(s, x8, y8, cw, row_h, fill=CALLOUT, line=BORDER)
rect(s, x8, y8, cw, 0.055, fill=BLUE)
tf = tb(s, x8 + 0.22, y8 + 0.24, cw - 0.44, row_h - 0.4)
p = para(tf, first=True, space_after=6, line=1.1)
run(p, "Why it holds", size=12, bold=True, color=BLUE_DEEP)
p = para(tf, line=1.24)
run(p, "Each module adds seats and adds data. Once purchase history and vendor pricing sit in "
        "Kojo, moving out means losing the record.", size=9.5, color=INK)

# ================================================================ 4 · INTEGRATIONS
s = new(4, "Integrations", [("The integrations are ", False), ("the switching cost", True)],
        "Kojo only works if the money it moves shows up where finance and the project manager already "
        "look. Three connection types carry that weight.",
        folio_left="Sources: usekojo.com/integrations · Procore Marketplace listing · Wesco Series C extension announcement",
        folio_size=8)

y = 2.34
cw3 = (CW - 0.24 * 2) / 3
blocks = [
    (BLUE, "ERP AND ACCOUNTING", "13 systems connected",
     "Sage Intacct, Sage 300 CRE, Sage 100, QuickBooks Online and Desktop, Vista, Spectrum, "
     "Acumatica, CMiC, Foundation, Deltek ComputerEase, eCMS, Access Coins.",
     "Orders and costs land in the accounting system within minutes, so job cost is current "
     "instead of a month behind."),
    (TEAL, "PROJECT MANAGEMENT", "Procore and Autodesk",
     "Purchase orders sync into Procore commitments and the project budget. Kojo is listed on "
     "the Procore marketplace.",
     "The project manager sees committed cost without asking purchasing, which is how Kojo gets "
     "in front of general contractors."),
    (ORANGE, "SUPPLIERS AND DISTRIBUTORS", "10 named partners",
     "Wesco, Graybar, Rexel, Border States, Hajoca, Mayer, Dakota Supply, US Electrical Services, "
     "Crawford, Professional Contractor Supply.",
     "Live catalog pricing and stock at the moment of ordering. This is where the 3.5% material "
     "saving and the caught invoice errors come from."),
]
for i, (c, eb, title, detail, effect) in enumerate(blocks):
    x = M + i * (cw3 + 0.24)
    rect(s, x, y, cw3, 2.64, fill=CARD, line=BORDER)
    rect(s, x, y, cw3, 0.055, fill=c)
    tf = tb(s, x + 0.24, y + 0.26, cw3 - 0.48, 2.3)
    p = para(tf, first=True, space_after=6)
    run(p, eb, size=8, bold=True, color=BLUE_DEEP, spc=100)
    p = para(tf, space_after=8, line=1.1)
    run(p, title, size=13, bold=True, color=INK)
    p = para(tf, space_after=10, line=1.26)
    run(p, detail, size=9.5, color=BODY)
    p = para(tf, line=1.26)
    run(p, "What the customer gets: ", size=9.5, bold=True, color=INK)
    run(p, effect, size=9.5, color=BODY)

band(s, 5.24, [("Wesco is a supply partner and an investor. ", True),
               ("A distributor putting $10 million into the software its customers buy through "
                "is a channel Toggle can market against, and a story most competitors cannot copy.", False)],
     h=0.72)

# ================================================================ 5 · USP
s = new(5, "USP and value", [("They sell a ", False), ("number the CFO can check", True)],
        "Every claim on the site is a percentage of money saved. That is the right instinct, and it "
        "gives Toggle something rare in B2B, a headline a buyer can verify.",
        folio_left="Sources: usekojo.com homepage claims · Kojo invoice-matching data · the $50M example is a Toggle illustration",
        folio_size=8)

y = 2.28
sw = (CW - 4 * 0.16) / 5
for i, (v, l, c) in enumerate([
    ("75%", "Less manual data entry", BLUE),
    ("4 hrs", "Saved per foreman, per week", TEAL),
    ("3.5%", "Saved on materials each year", PURPLE),
    ("3%", "Saved by catching invoice errors", ORANGE),
    ("27%", "Of invoices carry a discrepancy", PINK),
]):
    stat(s, M + i * (sw + 0.16), y, sw, 1.18, v, l, accent=c)

y2 = 3.74
lw = CW * 0.55
rect(s, M, y2, lw, 1.9, fill=WHITE, line=BORDER_STR)
tf = tb(s, M + 0.26, y2 + 0.26, lw - 0.52, 1.5)
p = para(tf, first=True, space_after=8, line=1.1)
run(p, "The claim nobody else can make", size=12, bold=True, color=INK)
p = para(tf, line=1.3, space_after=7)
run(p, "Procurement built on an MEP parts catalog, with a live distributor network behind the "
        "price, covering the chain from the foreman's phone to the paid invoice. Procore owns the "
        "project record. Kojo owns the material record.", size=10, color=BODY)
p = para(tf, line=1.3)
run(p, "Benefit by role: the foreman gets his afternoon back, purchasing gets a price comparison, "
        "finance stops paying for errors, operations sees committed cost the same week.",
    size=10, color=BODY)

rx = M + lw + 0.24
rw = CW - lw - 0.24
rect(s, rx, y2, rw, 1.9, fill=CALLOUT, line=BORDER)
rect(s, rx, y2, rw, 0.055, fill=BLUE)
tf = tb(s, rx + 0.26, y2 + 0.28, rw - 0.52, 1.5)
p = para(tf, first=True, space_after=7, line=1.1)
run(p, "The math to say out loud", size=12, bold=True, color=BLUE_DEEP)
p = para(tf, line=1.32)
run(p, "A contractor doing $50 million a year spends about $20 million on materials. Kojo's own "
        "3.5% saving is $700,000. That is the line that gets a COO to take the demo, and it is "
        "the angle most of their ads are not running yet.", size=10, color=INK)


# ================================================================ 6 · AUDIENCE
s = new(6, "Audience", [("A ", False), ("nameable list", True),
                        (" of a few thousand US contractors", False)],
        "The buyer can be listed by trade, revenue band and state, which decides how Toggle would "
        "spend the money. Broad reach is the wrong instrument here.",
        folio_left="Sources: usekojo.com customer pages · Contrary Research · NECA and MCAA partnership pages",
        folio_size=8)

y = 2.26
cw3 = (CW - 0.24 * 2) / 3
cardblock(s, M, y, cw3, 2.74, BLUE, "Who buys it",
          ["Specialty trade contractors and self-perform general contractors.",
           "Electrical, mechanical and plumbing lead. Concrete, drywall, glazing, roofing and "
           "flooring follow.",
           "Commercial work: hospitals, schools, stadiums, offices and multifamily. Not home repair.",
           "Roughly $10M to $500M in revenue, big enough to employ a purchasing manager and run a "
           "warehouse."],
          eyebrow_text="Firmographics", body_size=9.5)
cardblock(s, M + cw3 + 0.24, y, cw3, 2.74, TEAL, "Who signs and who blocks",
          ["COO or VP of Operations holds the budget and feels the margin loss.",
           "Purchasing manager is the daily user and the internal champion.",
           "CFO or controller buys the invoice-matching story.",
           "Warehouse manager owns inventory accuracy.",
           "The field foreman decides whether it survives. If he will not use the app, the account "
           "churns."],
          eyebrow_text="Buying committee", body_size=9.5)
cardblock(s, M + 2 * (cw3 + 0.24), y, cw3, 2.74, ORANGE, "Where they are",
          ["United States only, active in 47 states. No stated international push.",
           "Density sits in Texas, Florida, California, the Carolinas and the Northeast corridor.",
           "They gather at NECA for electrical and MCAA for mechanical, both already Kojo partners, "
           "plus Procore Groundbreak and the distributor counter.",
           "The buyer skews 40 plus and has little patience for software that adds steps."],
          eyebrow_text="Regions and channels", body_size=9.5)

band(s, 5.30, [("For marketing this means: ", True),
               ("account based targeting against a named list beats broad prospecting, and the "
                "trade associations are a paid channel Kojo already has a relationship with.", False)],
     h=0.66)

# ================================================================ 7 · COMPETITORS
s = new(7, "Competition", [("Two challengers, ", False), ("one platform", True),
                           (", and a spreadsheet", False)],
        "Most lost deals go to a contractor who decides Excel and a phone call are good enough, "
        "so the campaign has to argue against the status quo before it argues against a vendor.",
        folio_left="Sources: Contrary Research competitor section · Capterra and TrustRadius alternative listings · Procore Marketplace",
        folio_size=8)

y = 2.30
rows = [
    ["StructShare", "Direct challenger",
     "Founded 2017, about $8M raised. Same MEP procurement job, lighter on inventory and warehouse.",
     "Kojo wins on depth"],
    ["Field Materials", "Direct challenger",
     "Founded 2022, about $4.7M raised. AI-first quote and invoice capture, thinner workflow.",
     "Kojo wins on breadth"],
    ["Procore", "Platform incumbent",
     "Public, about $11.5B market cap. Owns the project record and sells procurement inside it. Also a formal integration partner.",
     "Partner and threat at once"],
    ["Excel, phone, email", "The real default",
     "No licence fee, no rollout, no foreman to train. Costs the contractor 3 to 4% of materials and nobody has measured it.",
     "Where the budget actually sits"],
]
end_y = table(s, M, y, [2.05, 1.85, 5.9, 2.09],
              ["Competitor", "Type", "What they are", "Toggle's read"], rows,
              row_h=0.66, head_h=0.34, size=9.5)

y3 = end_y + 0.26
cw2 = (CW - 0.24) / 2
rect(s, M, y3, cw2, 1.12, fill=CARD, line=BORDER)
rect(s, M, y3, 0.045, 1.12, fill=PURPLE)
tf = tb(s, M + 0.24, y3 + 0.18, cw2 - 0.46, 0.86)
p = para(tf, first=True, space_after=5, line=1.1)
run(p, "Watch list", size=11, bold=True, color=INK)
p = para(tf, line=1.24)
run(p, "Trimble and Autodesk can bundle procurement into suites contractors already pay for. "
        "ToolWatch competes on tool tracking alone. Vergo, CostCrunch and DigiBuild are early but "
        "loud on AI.", size=9.5, color=BODY)

rect(s, M + cw2 + 0.24, y3, cw2, 1.12, fill=CALLOUT, line=BORDER)
rect(s, M + cw2 + 0.24, y3, 0.045, 1.12, fill=BLUE)
tf = tb(s, M + cw2 + 0.48, y3 + 0.18, cw2 - 0.46, 0.86)
p = para(tf, first=True, space_after=5, line=1.1)
run(p, "What this hands the campaign", size=11, bold=True, color=BLUE_DEEP)
p = para(tf, line=1.24)
run(p, "Competitor search volume is small. The money goes on problem-aware terms and on creating "
        "demand among contractors who do not yet know this category exists.", size=9.5, color=INK)


# ================================================================ 8 · MARKET
s = new(8, "Market size", [("A ", False), ("$1.6 billion", True),
                           (" software market sitting on a $3.9 trillion spend", False)],
        "The software category is small and growing steadily. The pool of money it manages is enormous, "
        "which is why the savings pitch outperforms a software pitch.",
        folio_left="Sources: Research and Markets and GM Insights procurement software forecasts · Contrary Research · US Census NAICS 2382 · Dun and Bradstreet",
        folio_size=8)

y = 2.26
sw = (CW - 3 * 0.2) / 4
for i, (v, l, c) in enumerate([
    ("$1.62B", "Construction procurement software market, 2026", BLUE),
    ("$2.60B", "Same market by 2032, about 8.2% a year", TEAL),
    ("$24.2B", "Wider construction tech by 2033, 16.9% a year", PURPLE),
    ("$3.9T", "Global spend on construction materials each year", ORANGE),
]):
    stat(s, M + i * (sw + 0.2), y, sw, 1.22, v, l, accent=c)

y2 = 3.72
lw = CW * 0.52
rect(s, M, y2, lw, 2.0, fill=WHITE, line=BORDER_STR)
tf = tb(s, M + 0.26, y2 + 0.24, lw - 0.52, 1.6)
p = para(tf, first=True, space_after=8, line=1.1)
run(p, "How many companies could actually buy it", size=12, bold=True, color=INK)
bullets(tf, [
    ("331,067", " building equipment contractor establishments in the US (NAICS 2382)."),
    ("120,172", " electrical and 208,058 plumbing, heating and air conditioning firms sit inside that."),
    ("About 945,000", " specialty trade contractor records overall, most of them too small to buy."),
], size=9.5, gap=6)

rx = M + lw + 0.24
rw = CW - lw - 0.24
rect(s, rx, y2, rw, 2.0, fill=CALLOUT, line=BORDER)
rect(s, rx, y2, rw, 0.055, fill=BLUE)
tf = tb(s, rx + 0.26, y2 + 0.26, rw - 0.52, 1.6)
p = para(tf, first=True, space_after=7, line=1.1)
run(p, "The number that matters for media planning", size=12, bold=True, color=BLUE_DEEP)
p = para(tf, line=1.3, space_after=6)
run(p, "Only contractors with a purchasing function and a warehouse are real buyers. Take 5% of the "
        "331,067 and the target is roughly 16,500 companies. Kojo counts customers in the hundreds, "
        "so penetration is still low single digits.", size=10, color=INK)
p = para(tf, line=1.3)
run(p, "The 5% is Toggle's assumption and Alex should correct it with their own list size.",
    size=9.5, color=BLUE_DEEP, bold=True)


# ================================================================ 9 · PROPOSAL
s = new(9, "What Toggle would do", [("Prove the pipeline, ", False), ("then buy the list", True)],
        "Their Demand Gen Manager leaves on 5 October, so the first job is making sure nothing goes "
        "unowned. Say this out loud if Alex asks what we would do.")

y = 2.26
cw3 = (CW - 0.22 * 2) / 3
plays = [
    (BLUE, "DAYS 1 TO 30", "Take the handover and fix the measurement",
     ["One tracking spec across GA4, the site and the CRM.",
      "Self-reported attribution on the demo form, because nothing else catches association and "
      "webinar pipeline.",
      "One dashboard that reports pipeline by source, so October does not lose the history."]),
    (TEAL, "DAYS 31 TO 60", "Capture the demand that already exists",
     ["Google and Microsoft search on the terms a purchasing manager types, including Procore "
      "materials integration and competitor names.",
      "Bing matters here. This buyer works on a desktop in an office.",
      "Rebuild the demo page and the trade landing pages around the savings number."]),
    (PURPLE, "DAYS 61 TO 90", "Create demand across the named list",
     ["LinkedIn account based campaigns against the contractor list, split by trade and revenue band.",
      "Meta and YouTube for the foreman audience, who are not on LinkedIn during the day.",
      "Cut the webinars and customer stories into short video, and put Alex and the founder on "
      "LinkedIn weekly."]),
]
for i, (c, eb, title, lines) in enumerate(plays):
    cardblock(s, M + i * (cw3 + 0.22), y, cw3, 2.22, c, title, lines,
              title_size=12, body_size=9.5, eyebrow_text=eb)

y2 = 4.62
tw = [2.5, 1.7, 1.7, 1.7]
rows = [
    ["Google and Microsoft search", "$8,000", "$12,000", "$18,000"],
    ["LinkedIn, account based", "$4,000", "$8,000", "$14,000"],
    ["Meta, YouTube, retargeting", "$2,500", "$4,000", "$7,000"],
    ["Creative and testing reserve", "$500", "$1,000", "$1,000"],
    ["Monthly media total", "$15,000", "$25,000", "$40,000"],
]
table(s, M, y2, tw, ["Media line, per month", "Lean", "Core", "Scale"], rows,
      row_h=0.315, head_h=0.32, size=9.5, total_last=True)

bx = M + sum(tw) + 0.26
bw = CW - sum(tw) - 0.26
rect(s, bx, y2, bw, 2.0, fill=CALLOUT, line=BORDER)
rect(s, bx, y2, bw, 0.055, fill=BLUE)
tf = tb(s, bx + 0.24, y2 + 0.24, bw - 0.48, 1.62)
p = para(tf, first=True, space_after=6, line=1.1)
run(p, "How to frame the money", size=11.5, bold=True, color=BLUE_DEEP)
p = para(tf, line=1.24, space_after=5)
run(p, "Recommend the core tier: $25,000 a month in media on a 90 day commitment, every new line "
        "carrying a kill date. Toggle's fee gets quoted once we see the accounts.",
    size=9.5, color=INK)
p = para(tf, line=1.24)
run(p, "These are Toggle's planning numbers. Ask Alex for current spend before committing to any "
        "of them.", size=9.5, bold=True, color=BLUE_DEEP)

# ================================================================ 10 · QUESTIONS
s = new(10, "Discovery", [("Ten questions ", True), ("for Alex", False)],
        "Answers to the first four decide whether Toggle can quote at all. The rest shape the scope.")

y = 2.22
qs = [
    ("01", "What does pipeline look like by source today, and which source do you actually trust?"),
    ("02", "What is the average contract value and how long does it take to go from demo request to signature?"),
    ("03", "How many accounts are on the target list, and how do you segment it by trade and revenue?"),
    ("04", "What is the split between new logos and expansion inside contractors you already have?"),
    ("05", "What is monthly media spend now, across which platforms, and who has been running it?"),
    ("06", "What does the Demand Gen Manager own that becomes unowned on 5 October?"),
    ("07", "Which channel has produced the best closed-won so far: associations, webinars, search or outbound?"),
    ("08", "How much pipeline comes through Procore, Autodesk and the distributors, and is Wesco a live co-marketing channel?"),
    ("09", "What percentage of demo requests become qualified opportunities, and where do the rest fall out?"),
    ("10", "What number would make this a clear win for you by the end of the quarter?"),
]
qw = (CW - 0.24) / 2
rh = 0.62
for i, (n, q) in enumerate(qs):
    col, r = divmod(i, 5)
    x = M + col * (qw + 0.24)
    yy = y + r * (rh + 0.11)
    rect(s, x, yy, qw, rh, fill=(CARD if i % 2 == 0 else WHITE), line=BORDER)
    rect(s, x, yy, 0.045, rh, fill=(BLUE if col == 0 else TEAL))
    tfn = tb(s, x + 0.22, yy + 0.19, 0.42, 0.3)
    pn = para(tfn, first=True)
    run(pn, n, size=12, bold=True, color=BLUE_DEEP)
    tfq = tb(s, x + 0.68, yy + 0.11, qw - 0.92, rh - 0.16, anchor=MSO_ANCHOR.MIDDLE)
    pq = para(tfq, first=True, line=1.18)
    run(pq, q, size=9.5, color=INK)

band(s, 6.06, [("Ask question 06 early. ", True),
               ("A departure on 5 October with an overlap window is the reason this call is happening, "
                "and it tells Toggle how fast the scope has to start.", False)], h=0.56)

prs.save(OUT)
print("saved:", OUT, "| slides:", len(prs.slides._sldIdLst))
