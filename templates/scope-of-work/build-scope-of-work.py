#!/usr/bin/env python3
"""Toggle Solutions scope of work. Reads a JSON brief plus brain/services/*.md, writes a .docx.

    uv run --with python-docx templates/scope-of-work/build-scope-of-work.py <input.json> [out.docx] [--pdf]

The scope wording lives in brain/services/*.md and nowhere else. This script resolves the timing
codes in those files into real dates, applies the per-client overrides in the JSON, and lays the
result out in Word. Full format spec: templates/scope-of-work/README.md.
"""

from __future__ import annotations

import json
import re
import sys
from datetime import date, datetime, timedelta
from pathlib import Path

from docx import Document
from docx.enum.table import WD_ALIGN_VERTICAL
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

# ---------------------------------------------------------------- tokens
# clients/toggle/design-system/TOKENS.md
INK = RGBColor(0x0F, 0x0F, 0x0F)
BODY = RGBColor(0x4A, 0x4A, 0x4A)
SECONDARY = RGBColor(0x6B, 0x72, 0x80)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
BLUE_DEEP = RGBColor(0x30, 0x56, 0xC9)  # text-safe blue: headings, links
ERROR = RGBColor(0xC0, 0x30, 0x28)

H_BLUE = "4A7BF7"  # table header fill
H_CARD = "F2F3F6"  # alternating row fill
H_CALLOUT = "DDE5FE"  # callout box fill
H_BORDER = "D2D6E2"
H_AMBER = "FDF1E3"  # account-manager page fill

FONT = "Inter Tight"
FONT_FALLBACK = "Arial"  # switch here if the client will not have Inter Tight
DATE_FMT = "%-d %B %Y"

REPO = Path(__file__).resolve().parents[2]
SERVICES_DIR = REPO / "brain" / "services"


# ---------------------------------------------------------------- brain parsing
def norm(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip().lower().rstrip(".")


def _rows(block: str) -> list[list[str]]:
    out = []
    for line in block.splitlines():
        line = line.strip()
        if not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if all(set(c) <= set("-: ") for c in cells):
            continue
        out.append(cells)
    return out[1:] if out else []  # drop the header row


def parse_service(service_id: str) -> dict:
    path = SERVICES_DIR / f"{service_id}.md"
    if not path.exists():
        sys.exit(f"No brain file for service '{service_id}'. Looked in {path}")
    text = path.read_text()

    name = re.search(r"^service:\s*(.+)$", text, re.M)
    # scope_line is plain description written for a signed document. The tagline under the H1 is
    # sales copy for the website and the decks, so it is only a fallback here.
    scope_line = re.search(r"^scope_line:\s*(.+)$", text, re.M)
    tagline = scope_line or re.search(r"^#\s+.+?\n\n(.+?)\n", text, re.S | re.M)

    def section(title: str) -> str:
        m = re.search(rf"^###\s+{title}\s*$(.*?)(?=^###\s|\Z)", text, re.S | re.M)
        return m.group(1) if m else ""

    in_scope = [
        {"deliverable": r[0], "amount": r[1], "type": r[2].lower(), "timing": r[3]}
        for r in _rows(section("In scope"))
        if len(r) >= 4
    ]
    not_in_scope = [
        ln.strip()[2:].strip()
        for ln in section("Not in scope").splitlines()
        if ln.strip().startswith("- ")
    ]
    needs = [
        {"what": r[0], "when": r[1]} for r in _rows(section("What we need from you")) if len(r) >= 2
    ]

    if not in_scope:
        sys.exit(f"{path} has no parsable '### In scope' table.")

    return {
        "id": service_id,
        "name": name.group(1).strip() if name else service_id,
        "tagline": tagline.group(1).strip() if tagline else "",
        "rows": in_scope,
        "not_in_scope": not_in_scope,
        "needs": needs,
    }


# ---------------------------------------------------------------- dates
def week_date(start: date, n: int) -> date:
    d = start + timedelta(weeks=n)
    if d.weekday() == 5:
        d += timedelta(days=2)
    elif d.weekday() == 6:
        d += timedelta(days=1)
    return d


def fmt(d: date) -> str:
    return d.strftime(DATE_FMT)


def lower_first(s: str) -> str:
    """Lowercase the first letter only, so month names inside the phrase survive."""
    return s[:1].lower() + s[1:] if s else s


FIRST_RE = re.compile(r"\s*\(first:\s*W(\d+)\s*(?:=\s*(.+?))?\)\s*")
WEEK_RE = re.compile(r"^W(\d+)$", re.I)


def resolve(timing: str, start: date, label: str, row_type: str) -> dict:
    """Turn a brain timing cell into what the client reads, plus any key-dates entry."""
    key_date, key_label = None, None

    m = FIRST_RE.search(timing)
    if m:
        key_date = week_date(start, int(m.group(1)))
        key_label = (m.group(2) or label).strip()
        timing = FIRST_RE.sub("", timing).strip()

    w = WEEK_RE.match(timing.strip())
    if w:
        d = week_date(start, int(w.group(1)))
        display = f"By {fmt(d)}"
        if row_type == "key" and key_date is None:
            key_date, key_label = d, label
    else:
        display = timing.strip()

    return {"display": display, "key_date": key_date, "key_label": key_label}


# ---------------------------------------------------------------- docx helpers
def style_run(run, size=10.5, color=BODY, bold=False, italic=False, font=None):
    font = font or FONT  # read at call time so a "font" key in the JSON can override it
    run.font.name = font
    run.font.size = Pt(size)
    run.font.color.rgb = color
    run.bold = bold
    run.italic = italic
    rpr = run._element.get_or_add_rPr()
    rfonts = rpr.find(qn("w:rFonts"))
    if rfonts is None:
        rfonts = OxmlElement("w:rFonts")
        rpr.append(rfonts)
    for attr in ("w:ascii", "w:hAnsi", "w:cs"):
        rfonts.set(qn(attr), font)
    return run


def para(container, text="", size=10.5, color=BODY, bold=False, italic=False,
         space_before=0, space_after=6, align=None, keep_next=False, line=1.35):
    p = container.add_paragraph()
    pf = p.paragraph_format
    pf.space_before = Pt(space_before)
    pf.space_after = Pt(space_after)
    pf.line_spacing = line
    pf.keep_with_next = keep_next
    if align is not None:
        p.alignment = align
    if text:
        style_run(p.add_run(text), size=size, color=color, bold=bold, italic=italic)
    return p


def heading(doc, text, level=1, new_page=False):
    """new_page uses pageBreakBefore, not a standalone break paragraph, which would leave a
    blank page whenever the section above already ended near the bottom of one."""
    sizes = {0: 30, 1: 17, 2: 12.5}
    colors = {0: INK, 1: BLUE_DEEP, 2: INK}
    p = para(doc, text, size=sizes[level], color=colors[level], bold=True,
             space_before=0 if new_page else (20 if level else 0),
             space_after=7, keep_next=True, line=1.15)
    p.paragraph_format.page_break_before = new_page
    return p


def bullets(doc, items, color=BODY):
    for it in items:
        p = doc.add_paragraph(style="List Bullet")
        pf = p.paragraph_format
        pf.space_after = Pt(3)
        pf.line_spacing = 1.3
        pf.left_indent = Cm(0.7)
        style_run(p.add_run(it), size=10.5, color=color)


def shade(cell, hex_fill):
    el = OxmlElement("w:shd")
    el.set(qn("w:val"), "clear")
    el.set(qn("w:fill"), hex_fill)
    cell._tc.get_or_add_tcPr().append(el)


def cell_margins(table, top=90, bottom=90, left=130, right=130):
    tblPr = table._tbl.tblPr
    mar = OxmlElement("w:tblCellMar")
    for side, val in (("top", top), ("left", left), ("bottom", bottom), ("right", right)):
        el = OxmlElement(f"w:{side}")
        el.set(qn("w:w"), str(val))
        el.set(qn("w:type"), "dxa")
        mar.append(el)
    tblPr.append(mar)


def table_borders(table, color=H_BORDER, size=4):
    borders = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), "single")
        el.set(qn("w:sz"), str(size))
        el.set(qn("w:color"), color)
        borders.append(el)
    table._tbl.tblPr.append(borders)


def row_flags(row, header=False):
    trPr = row._tr.get_or_add_trPr()
    trPr.append(OxmlElement("w:cantSplit"))
    if header:
        trPr.append(OxmlElement("w:tblHeader"))


def write_cell(cell, text, bold=False, color=BODY, size=10, align=None):
    cell.vertical_alignment = WD_ALIGN_VERTICAL.TOP
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(0)
    p.paragraph_format.line_spacing = 1.25
    if align is not None:
        p.alignment = align
    style_run(p.add_run(text), size=size, color=color, bold=bold)


def build_table(doc, headers, rows, widths=None, zebra=True):
    """A headers list of empty strings builds a plain two-column fact table with no header band."""
    has_header = any(h.strip() for h in headers)
    t = doc.add_table(rows=1 if has_header else 0, cols=len(headers))
    t.autofit = False
    table_borders(t)
    cell_margins(t)
    if has_header:
        row_flags(t.rows[0], header=True)
        for i, h in enumerate(headers):
            shade(t.rows[0].cells[i], H_BLUE)
            write_cell(t.rows[0].cells[i], h, bold=True, color=WHITE, size=9.5)
    for n, r in enumerate(rows):
        cells = t.add_row().cells
        row_flags(t.rows[-1])
        for i, v in enumerate(r):
            if zebra and n % 2 == 1:
                shade(cells[i], H_CARD)
            write_cell(cells[i], str(v),
                       bold=(i == 0 and (len(headers) > 2 or not has_header)),
                       color=INK if (i == 0 and not has_header) else BODY)
    if widths:
        for r in t.rows:
            for i, w in enumerate(widths):
                r.cells[i].width = Cm(w)
    para(doc, "", space_after=2)
    return t


def callout(doc, text, fill=H_CALLOUT, bold_lead=None):
    t = doc.add_table(rows=1, cols=1)
    t.autofit = False
    table_borders(t, color=fill, size=2)
    cell_margins(t, top=150, bottom=150, left=180, right=180)
    c = t.rows[0].cells[0]
    shade(c, fill)
    c.width = Cm(17)
    p = c.paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    p.paragraph_format.line_spacing = 1.35
    if bold_lead:
        style_run(p.add_run(bold_lead + " "), size=10.5, color=INK, bold=True)
    style_run(p.add_run(text), size=10.5, color=BODY)
    para(doc, "", space_after=4)
    return t


def add_footer(doc, left_text):
    footer = doc.sections[0].footer
    p = footer.paragraphs[0]
    p.paragraph_format.tab_stops.add_tab_stop(Cm(17), WD_ALIGN_PARAGRAPH.RIGHT)
    style_run(p.add_run(left_text + "\t"), size=8, color=SECONDARY)
    run = p.add_run()
    style_run(run, size=8, color=SECONDARY)
    for kind, txt in (("begin", None), (None, "PAGE"), ("end", None)):
        if kind:
            fc = OxmlElement("w:fldChar")
            fc.set(qn("w:fldCharType"), kind)
            run._r.append(fc)
        else:
            it = OxmlElement("w:instrText")
            it.set(qn("xml:space"), "preserve")
            it.text = f" {txt} "
            run._r.append(it)


# ---------------------------------------------------------------- overrides
def apply_overrides(svc: dict, cfg: dict) -> dict:
    keys = {norm(r["deliverable"]): r for r in svc["rows"]}

    # amounts sets How much, timings sets When, types sets whether a row is key/once/recurring.
    # The proposal is what retimes a row, so timings is used on most real client briefs.
    for field, cfg_key in (("amount", "amounts"), ("timing", "timings"), ("type", "types")):
        for k, v in (cfg.get(cfg_key) or {}).items():
            row = keys.get(norm(k))
            if row is None:
                sys.exit(
                    f"[{svc['id']}] {cfg_key} key not found: {k!r}\nValid keys:\n  "
                    + "\n  ".join(r["deliverable"] for r in svc["rows"])
                )
            row[field] = v.lower() if field == "type" else v

    drop = {norm(d) for d in (cfg.get("drop") or [])}
    svc["rows"] = [r for r in svc["rows"] if norm(r["deliverable"]) not in drop]

    for extra in cfg.get("add_rows") or []:
        svc["rows"].append(
            {
                "deliverable": extra["deliverable"],
                "amount": extra.get("amount", ""),
                "type": extra.get("type", "once").lower(),
                "timing": extra.get("timing", ""),
            }
        )

    dnis = {norm(d) for d in (cfg.get("drop_not_in_scope") or [])}
    svc["not_in_scope"] = [n for n in svc["not_in_scope"] if norm(n) not in dnis]
    svc["not_in_scope"] += cfg.get("add_not_in_scope") or []

    dneeds = {norm(d) for d in (cfg.get("drop_needs") or [])}
    svc["needs"] = [n for n in svc["needs"] if norm(n["what"]) not in dneeds]

    for k, v in (cfg.get("needs_when") or {}).items():
        for n in svc["needs"]:
            if norm(n["what"]) == norm(k):
                n["when"] = v
                break
    svc["needs"] += [
        {"what": e["what"], "when": e.get("when", "")} for e in (cfg.get("add_needs") or [])
    ]
    return svc


# ---------------------------------------------------------------- document
def build(data: dict, out_path: Path) -> Path:
    start = datetime.strptime(data["start_date"], "%Y-%m-%d").date()
    doc_date = datetime.strptime(data.get("document_date") or date.today().isoformat(),
                                 "%Y-%m-%d").date()
    client = data["client"]
    short = data.get("client_short") or client

    services, key_dates, all_needs, unresolved = [], [], [], []
    for cfg in data["services"]:
        svc = apply_overrides(parse_service(cfg["id"]), cfg)
        for n, r in enumerate(svc["rows"]):
            res = resolve(r["timing"], start, r["deliverable"], r["type"])
            r["when"] = res["display"]
            r["_sort_date"] = res["key_date"] if r["type"] != "recurring" else None
            if WEEK_RE.match(r["timing"].strip()):
                r["_sort_date"] = week_date(start, int(WEEK_RE.match(r["timing"].strip()).group(1)))
            r["_order"] = n
            if res["key_date"]:
                key_dates.append((res["key_date"], res["key_label"], svc["name"]))
            if not r["when"]:
                unresolved.append(f"{svc['name']}: no timing on '{r['deliverable']}'")

        # Dated work reads in the order it happens. Recurring and free-text rows keep the order
        # the brain file put them in, and follow. Without this, add_rows always land last.
        svc["rows"].sort(key=lambda r: (r["_sort_date"] is None, r["_sort_date"] or start,
                                        r["_order"]))
        for n in svc["needs"]:
            w = WEEK_RE.match(str(n["when"]).strip())
            n["when_display"] = f"By {fmt(week_date(start, int(w.group(1))))}" if w else n["when"]
            all_needs.append((n["what"], n["when_display"], svc["name"]))
        services.append(svc)

    key_dates.sort(key=lambda x: x[0])

    for svc in services:
        for r in svc["rows"]:
            for field in ("deliverable", "amount", "when"):
                if "[N]" in str(r[field]):
                    unresolved.append(f"{svc['name']}: [N] left in '{r['deliverable']}' ({field})")
        for n in svc["needs"]:
            if "[N]" in n["what"]:
                unresolved.append(f"{svc['name']}: [N] left in '{n['what']}'")

    # ---- page setup
    doc = Document()
    s = doc.sections[0]
    s.page_width, s.page_height = Cm(21), Cm(29.7)
    s.left_margin = s.right_margin = Cm(2)
    s.top_margin = Cm(2)
    s.bottom_margin = Cm(1.8)
    normal = doc.styles["Normal"].font
    normal.name = FONT
    normal.size = Pt(10.5)
    normal.color.rgb = BODY
    add_footer(doc, f"Scope of Work · {short} · Toggle Solutions")

    approval = data.get("approval_window", "three working days")
    quote = data.get("quotation", {})

    # ---- cover
    para(doc, "toggle.solutions", size=12, color=INK, bold=True, space_after=140)
    para(doc, "Scope of Work", size=30, color=INK, bold=True, space_after=0, line=1.05)
    para(doc, f"for {client}", size=30, color=BLUE_DEEP, bold=True, space_after=14, line=1.05)
    para(doc, "What Toggle will do for you, and by when.", size=13, color=BODY, space_after=3)
    para(doc, f"Version {data.get('version', '1.0')} · {fmt(doc_date)}", size=10.5,
         color=SECONDARY, space_after=26)

    first_key = fmt(key_dates[0][0]) if key_dates else "See your key dates"
    cover = build_table(
        doc,
        ["What you bought", "We start", "Your first key date"],
        [[", ".join(sv["name"] for sv in services), fmt(start), first_key]],
        widths=[8.0, 4.5, 4.5],
        zebra=False,
    )
    for c in cover.rows[1].cells:
        shade(c, H_CARD)

    para(doc, "", space_after=90)
    para(doc, f"Prepared by {data.get('prepared_by', 'Toggle Solutions')}", size=10, color=SECONDARY,
         space_after=2)
    para(doc, "hello@toggle.solutions · toggle.solutions", size=10, color=SECONDARY)

    # ---- account manager page
    heading(doc, "Delete this page before you send the document.", level=1, new_page=True)
    para(doc, "Everything the generator assumed, and everything it could not work out. "
              "Check each line, fix the source, and rebuild.", space_after=10)

    callout(doc, f"Dates are counted from the start date, {fmt(start)}. A date landing on a "
                 "Saturday or Sunday moves to the following Monday.", fill=H_AMBER,
            bold_lead="How the dates were worked out.")

    para(doc, "Open items", size=12.5, color=INK, bold=True, space_before=10, space_after=5)
    if unresolved:
        bullets(doc, unresolved, color=ERROR)
        para(doc, "Every [N] above is a number Toggle has not standardized. Set it in the "
                  "JSON under \"amounts\", or fix the brain service file if the number is the "
                  "same for every client.", size=10, color=SECONDARY, space_before=4)
    else:
        bullets(doc, ["Nothing outstanding. Every row has a number and a date."])

    para(doc, "Before you send", size=12.5, color=INK, bold=True, space_before=12, space_after=5)
    bullets(doc, [
        "Check the key dates against the timeline in the proposal you sent them.",
        "Check the service list against the quotation, line by line.",
        "Confirm the names, titles and emails in section 2 are current.",
        "Delete this page.",
    ])
    if data.get("am_notes"):
        para(doc, "Notes from the draft", size=12.5, color=INK, bold=True, space_before=12,
             space_after=5)
        bullets(doc, data["am_notes"])

    # ---- 1. how to read
    heading(doc, "1. How to read this document.", level=1, new_page=True)
    para(doc, f"This document sets out the work Toggle will do for {short}, how much of it, and "
              "when each piece is due. It follows the proposal and the quotation you have already "
              "seen, and turns them into dates both of us can hold each other to.", space_after=8)
    para(doc, f"Section 3 lists your key dates in one place. Section 5 breaks the work down by "
              "service, and each service names what is not included. Read those two sections and "
              "you have the whole agreement.", space_after=8)
    if quote:
        para(doc, f"This document does not carry any prices. Quotation "
                  f"{quote.get('number', '[QUOTATION NUMBER]')}, dated "
                  f"{quote.get('date', '[DATE]')}, is where the fees live. If the two documents "
                  "ever disagree on what you are buying, the quotation decides.", space_after=8)
    para(doc, "If you expected something that is not written here, tell your account lead before "
              "you sign. We would rather fix it now than argue about it in month three.",
         space_after=8)

    # ---- 2. what you bought
    heading(doc, "2. What you bought.", level=1)
    rows = [
        ["Services", ", ".join(sv["name"] for sv in services)],
        ["Start date", fmt(start)],
        ["Term", data.get("term", "[TERM]")],
        ["Review date", data.get("review_date", "[REVIEW DATE]")],
        ["Quotation", f"{quote.get('number', '[NUMBER]')}, dated {quote.get('date', '[DATE]')}"],
        ["Your account lead at Toggle", data.get("account_lead", "[NAME]")],
        ["Your main contact", data.get("client_contact", "[NAME, TITLE]")],
    ]
    build_table(doc, ["", ""], rows, widths=[6.0, 11.0])

    # ---- 3. key dates
    heading(doc, "3. Your key dates.", level=1)
    para(doc, "Every date we have committed to, in order. Recurring work sits in section 5.",
         space_after=8)
    build_table(
        doc,
        ["Date", "What is due", "Service"],
        [[fmt(d), label, svc] for d, label, svc in key_dates],
        widths=[3.6, 8.4, 5.0],
    )

    # ---- 4. what we need from you
    heading(doc, "4. What we need from you, and by when.", level=1)
    para(doc, "Every date in section 3 assumes we get these on time.", space_after=8)
    seen, need_rows = set(), []
    for what, when, svc in all_needs:
        k = norm(what)
        if k in seen:
            continue
        seen.add(k)
        need_rows.append([what, when])
    build_table(doc, ["What we need", "When we need it"], need_rows, widths=[12.0, 5.0])
    callout(doc, f"If we wait longer than {approval} for an approval, or a file arrives late, the "
                 "dates that depend on it move by the same number of days. We will tell you the "
                 "new date in writing when it happens.", bold_lead="If something arrives late.")

    # ---- 5. what we will do
    heading(doc, "5. What we will do.", level=1, new_page=True)
    para(doc, "One section per service you bought. Each one lists the work, the amount, and when "
              "it happens, then what is not included.", space_after=6)

    for i, svc in enumerate(services):
        heading(doc, svc["name"], level=2, new_page=bool(i))
        if svc["tagline"]:
            para(doc, svc["tagline"], size=10.5, color=SECONDARY, space_after=8)
        build_table(
            doc,
            ["What we will do", "How much", "When"],
            [[r["deliverable"], r["amount"], r["when"]] for r in svc["rows"]],
            widths=[7.2, 5.3, 4.5],
        )
        para(doc, "Not in scope", size=11, color=INK, bold=True, space_before=8, space_after=4,
             keep_next=True)
        bullets(doc, svc["not_in_scope"])
        para(doc, "What we need from you", size=11, color=INK, bold=True, space_before=8,
             space_after=4, keep_next=True)
        bullets(doc, [f"{n['what']}, {lower_first(n['when_display'])}." if n["when_display"]
                      else n["what"] for n in svc["needs"]])

    # ---- 6. how we work together
    heading(doc, "6. How we work together.", level=1, new_page=True)
    build_table(
        doc,
        ["", ""],
        [
            ["Your account lead", data.get("account_lead", "[NAME]")],
            ["Review call", data.get("review_call", "60 minutes, once a month")],
            ["Written update", data.get("written_update", "Once a week, by email")],
            ["Reports", data.get("report_day", "By the 5th working day of each month")],
            ["We reply within", data.get("response_time", "One working day, on email")],
            ["We need your approval within", approval],
            ["Working hours", data.get("working_hours",
                                       "Monday to Friday, 9am to 6pm, Malaysia time")],
            ["Public holidays", data.get("holidays", "Malaysian public holidays. We tell you in "
                                                     "advance when one affects a date.")],
        ],
        widths=[6.0, 11.0],
    )
    contacts = data.get("contacts") or []
    if contacts:
        para(doc, "Who to contact", size=11, color=INK, bold=True, space_before=10, space_after=4,
             keep_next=True)
        build_table(
            doc,
            ["For", "Contact", "Email"],
            [[c.get("for", ""), c.get("name", ""), c.get("email", "")] for c in contacts],
            widths=[5.5, 5.0, 6.5],
        )

    # ---- 7. not included
    heading(doc, "7. What is not included, and how to add it.", level=1)
    para(doc, "If you want something that is not written in this document, tell your account lead. "
              "We will send you a short quote with the cost and the date it would be ready. Work "
              "starts once you approve that quote in writing. Nothing outside this document is "
              "chargeable to you unless you approved it first, and nothing outside it is owed to "
              "you unless we agreed it first.", space_after=10)
    para(doc, "What can move the dates", size=11, color=INK, bold=True, space_after=4,
         keep_next=True)
    bullets(doc, data.get("assumptions") or [
        f"An approval that takes longer than {approval}.",
        "Content, images or access that arrive after the date in section 4.",
        "A change to your ad budget, which changes what the budget can produce.",
        "An ad, page or account rejected by Meta, Google or another platform under their policies.",
        "A change to what you sell, or to who you sell it to, after this document is signed.",
    ])
    para(doc, "Where one of these happens, we will tell you which dates move and by how much, in "
              "writing, within two working days.", space_before=6, space_after=8)

    # ---- 8. sign off
    heading(doc, "8. Sign off.", level=1, new_page=True)
    para(doc, "Signing below confirms that this document describes the work you are buying, and "
              "that anything not written in it is not included.", space_after=14)

    sign = doc.add_table(rows=1, cols=2)
    sign.autofit = False
    cell_margins(sign, top=120, bottom=120, left=0, right=200)
    for idx, (title, name_line) in enumerate(
        [(f"For {client}", data.get("client_contact", "")),
         ("For Toggle Solutions", data.get("account_lead", ""))]
    ):
        c = sign.rows[0].cells[idx]
        c.width = Cm(8.5)
        p = c.paragraphs[0]
        p.paragraph_format.space_after = Pt(0)
        style_run(p.add_run(title), size=11, color=INK, bold=True)
        for lbl in ("Name", "Title", "Signature", "Date"):
            q = c.add_paragraph()
            q.paragraph_format.space_before = Pt(16)
            q.paragraph_format.space_after = Pt(0)
            style_run(q.add_run(f"{lbl}  "), size=9.5, color=SECONDARY)
            style_run(q.add_run("_" * 26), size=9.5, color=SECONDARY)
        if name_line:
            q = c.add_paragraph()
            q.paragraph_format.space_before = Pt(6)
            style_run(q.add_run(name_line), size=9, color=SECONDARY, italic=True)

    para(doc, "Version history", size=11, color=INK, bold=True, space_before=26, space_after=4,
         keep_next=True)
    build_table(
        doc,
        ["Version", "Date", "What changed", "Approved by"],
        data.get("version_history") or [[data.get("version", "1.0"), fmt(doc_date),
                                         "First issue", data.get("account_lead", "")]],
        widths=[2.4, 3.4, 7.2, 4.0],
    )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    doc.save(out_path)
    return out_path


# ---------------------------------------------------------------- cli
SOFFICE = Path("/Applications/LibreOffice.app/Contents/MacOS/soffice")


def to_pdf(docx_path: Path) -> Path | None:
    """Export a PDF next to the .docx. Send the PDF when the client will not have Inter Tight."""
    import subprocess

    if not SOFFICE.exists():
        print("LibreOffice not found, skipping PDF. Export from Word instead.")
        return None
    subprocess.run(
        [str(SOFFICE), "--headless", "--convert-to", "pdf", "--outdir",
         str(docx_path.parent), str(docx_path)],
        check=True, capture_output=True,
    )
    return docx_path.with_suffix(".pdf")


def main() -> None:
    global FONT
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = {a for a in sys.argv[1:] if a.startswith("--")}
    if not args:
        sys.exit(__doc__)

    data = json.loads(Path(args[0]).read_text())
    FONT = data.get("font") or FONT

    if len(args) > 1:
        out = Path(args[1])
    else:
        slug = data.get("slug", "client")
        out = Path(args[0]).parent / f"{slug}-scope-of-work-{data['document_date']}.docx"

    path = build(data, out)
    print(f"Wrote {path}")
    print("Services:", ", ".join(s["id"] for s in data["services"]))
    if "--pdf" in flags:
        pdf = to_pdf(path)
        if pdf:
            print(f"Wrote {pdf}")


if __name__ == "__main__":
    main()
