#!/usr/bin/env python3
"""Build v3 EN + BM conditional lead-form CSVs from the UNITAR programme master list."""

import csv
from pathlib import Path

MASTER = Path("/Users/zaidsaad/Downloads/2026 Programme Master List(Product Masterlist).csv")
OUT_EN = Path("/Users/zaidsaad/Desktop/Code/tg/unitar/Audaura_LeadForm_v3_EN.csv")
OUT_BM = Path("/Users/zaidsaad/Desktop/Code/tg/unitar/Audaura_LeadForm_v3_BM.csv")

INTAKES = [
    ("2026", "May"),
    ("2026", "September"),
    ("2027", "January"),
    ("2027", "May"),
    ("2027", "September"),
]

INTAKE_BM = {"May": "Mei", "September": "September", "January": "Januari"}

LEVEL_BM = {
    "Foundation": "Program Asasi",
    "Diploma": "Diploma",
    "Bachelor": "Ijazah Sarjana Muda",
    "Master": "Ijazah Sarjana",
    "Doctorate": "Kedoktoran",
    "Certificate": "Sijil",
    "Postgraduate Diploma": "Diploma Pascasiswazah",
}

# Programme name → exact BM string used in v2 lead form (verbatim, including any v2 typos kept consistent with the existing form bindings).
PROGRAMME_BM = {
    # Foundation
    "Foundation in Management": "Program Asasi Pengurusan",
    "Foundation in Arts": "Program Asasi Sastera",
    "Foundation in Information Technology": "Program Asasi Teknologi Maklumat",
    # Diploma — Business / Management
    "Diploma in Business Administration": "Diploma Pentadbiran Perniagaan",
    "Diploma in Business Management": "Diploma Pengurusan Perniagaan",
    "Diploma in Logistics Management": "Diploma Pengurusan Logistik",
    "Diploma in Logistics & Supply Chain Management": "Diploma Logistik dan Pengurusan Rantaian Bekalan",
    "Diploma in Accounting": "Diploma Perakaunan",
    "Diploma in Human Resource Management": "Diploma Pengurusan Sumber Manusia",
    "Diploma in E-Secretaryship": "Diploma E-Kesetiausahaan",
    "Diploma in E-Business": "Diploma E-Perniagaan",
    "Diploma in Hotel Management": "Diploma Pengurusan Hotel",
    "Diploma in Tourism Management": "Diploma Pengurusan Pelancongan",
    # Diploma — Education / Psychology / OSH
    "Diploma in Early Childhood Education": "Diploma Pendidikan Awal Kanak-Kanak",
    "Diploma in Occupational Safety and Health": "Diploma Keselamatan dan Kesihatan Pekerjaan",
    "Diploma in Psychology": "Diploma Psikologi",
    # Diploma — IT / Design
    "Diploma in Information Technology": "Diploma Teknologi Maklumat",
    "Diploma in Computer Graphic Design": "Diploma Seni Reka Grafik Komputer",
    "Diploma in Digital Graphic Design": "Diploma Seni Reka Grafik Digital",
    "Diploma in Multimedia Application": "Diploma Aplikasi Multimedia",
    "Diploma in Animation Design": "Diploma Reka Bentuk Animasi",
    "Diploma in Fashion Design": "Diploma Reka Bentuk Fesyen",
    "Diploma in Fashion Design?": "Diploma Reka Bentuk Fesyen",
    "Diploma in Interior Design": "Diploma Reka Bentuk Dalaman",
    # Bachelor
    "Bachelor in Accounting (Honours)": "Ijazah Sarjana Muda Perakaunan (Kepujian)",
    "Bachelor in Human Resource Management (Honours)": "Ijazah Sarjana Muda Pengurusan Sumber Manusia (Kepujian)",
    "Bachelor in International Business (Honours)": "Ijazah Sarjana Muda Perniagaan Antarabangsa (Kepujian)",
    "Bachelor of Animation Design with Game Art (Honours)": "Ijazah Sarjana Muda Seni Reka Animasi dengan Seni Permainan (Kepujian)",
    "Bachelor of Business Administration (Hons)": "Ijazah Sarjana Muda Pentadbiran Perniagaan (Kepujian)",
    "Bachelor of Business Management (Honours)": "Ijazah Sarjana Muda Pengurusan Perniagaan (Kepujian)",
    "Bachelor of Education (Early Childhood Education) (Hons)": "Ijazah Sarjana Muda Pendidikan (Pendidikan Awal Kanak-Kanak) (Kepujian)",
    "Bachelor of Education (Hons)": "Ijazah Sarjana Muda Pendidikan (Kepujian)",
    "Bachelor of Education (Teaching of English as a Second Language) with Honours": "Ijazah Sarjana Muda Pendidikan (Pengajaran Bahasa Inggeris sebagai Bahasa Kedua) dengan Kepujian",
    "Bachelor of Fashion Design with Marketing (Honours)": "Ijazah Sarjana Muda Seni Reka Fesyen dengan Pemasaran (Kepujian)",
    "Bachelor of Finance (Fintech) (Honours)": "Ijazah Sarjana Muda Kewangan (Fintech) (Kepujian)",
    "Bachelor of Hospitality Management (Honours)": "Ijazah Sarjana Muda Pengurusan Hospitaliti (Kepujian)",
    "Bachelor of Information Technology (Hons)": "Ijazah Sarjana Muda Teknologi Maklumat (Kepujian)",
    "Bachelor of Mass Communication (Honours)": "Ijazah Sarjana Muda Komunikasi Massa (Kepujian)",
    "Bachelor of Psychology (Honours)": "Ijazah Sarjana Muda Psikologi (Kepujian)",
    # Master
    "Master in Applied Artificial Intelligence": "Ijazah Sarjana Aplikasi Kepintaran Buatan",
    "Master of Business Administration": "Ijazah Sarjana Pentadbiran Perniagaan",
    "Master of Computing": "Ijazah Sarjana Perkomputeran",
    "Master of Education": "Ijazah Sarjana Pendidikan",
    "Master of Education (Early Childhood Education)": "Ijazah Sarjana Pendidikan (Pendidikan Awal Kanak-Kanak)",
    "Master of Education (Educational Leadership and Management)": "Ijazah Sarjana Pendidikan (Kepimpinan Pendidikan dan Pengurusan)",
    "Master of Education (Instructional Technology)": "Ijazah Sarjana Pendidikan (Teknologi Pengajaran)",
    "Master of Education (Teaching of English as a Second Language)": "Ijazah Sarjana Pendidikan (Pengajaran Bahasa Inggeris sebagai Bahasa Kedua)",
    "Master of Information Technology": "Ijazah Sarjana Teknologi Maklumat",
    "Master of Science in Management": "Ijazah Sarjana Sains dalam Pengurusan",
    # Doctorate
    "Doctor of Business Administration": "Ijazah Doktor Pentadbiran Perniagaan",
    "Doctor of Education": "Ijazah Doktor Pendidikan",
    "Doctor of Philosophy in Business Administration": "Ijazah Doktor Falsafah Pentadbiran Perniagaan",
    "Doctor of Philosophy in Education": "Ijazah Doktor Falsafah Pendidikan",
    "Doctor of Philosophy in Management": "Ijazah Doktor Falsafah Pengurusan",
    "Doctor of Philosophy Information Technology": "Ijazah Doktor Falsafah Teknologi Maklumat",
    # Postgraduate Diploma
    "Post-Graduate Diploma in Education": "Diploma Pascasiswazah Pendidikan",
    "Postgraduate Diploma in Education": "Diploma Pascasiswazah Pendidikan",
    # Certificate
    "Certificate in Art & Design": "Sijil Seni & Reka Bentuk",
    "Certificate in Business Management": "Sijil Pengurusan Perniagaan",
    "Certificate in Business Studies": "Sijil Pengajian Perniagaan",
}

# Campus name (master list EN string) → BM string for the BM lead form.
CAMPUS_BM = {
    "UNITAR International University (Main Campus)": "Universiti Antarabangsa UNITAR (Kampus Utama)",
    "UNITAR University College Kuala Lumpur": "Kolej Universiti UNITAR Kuala Lumpur",
    "UNITAR College Ipoh": "Kolej UNITAR Ipoh",
    "UNITAR College Johor Bahru": "Kolej UNITAR Johor Bahru",
    "UNITAR College Kelana Jaya": "Kolej UNITAR Kelana Jaya",
    "UNITAR College Kota Bharu": "Kolej UNITAR Kota Bharu",
    "UNITAR College Kota Kinabalu": "Kolej UNITAR Kota Kinabalu",
    "UNITAR College Kuala Terengganu": "Kolej UNITAR Kuala Terengganu",
    "UNITAR College Kuantan": "Kolej UNITAR Kuantan",
    "UNITAR College Kuching": "Kolej UNITAR Kuching",
    "UNITAR College Melaka": "Kolej UNITAR Melaka",
    "UNITAR College Penang": "Kolej UNITAR Penang",
    "UNITAR College Sungai Petani": "Kolej UNITAR Sungai Petani",
    "Pusat Wilayah UNITAR International University Ipoh": "Pusat Wilayah Universiti Antarabangsa UNITAR Ipoh",
    "Pusat Wilayah UNITAR International University Kota Kinabalu": "Pusat Wilayah Universiti Antarabangsa UNITAR Kota Kinabalu",
    "Pusat Wilayah UNITAR International University Kuala Terengganu": "Pusat Wilayah Universiti Antarabangsa UNITAR Kuala Terengganu",
    "Pusat Wilayah UNITAR International University Kuantan": "Pusat Wilayah Universiti Antarabangsa UNITAR Kuantan",
    "Pusat Wilayah UNITAR International University Kuching": "Pusat Wilayah Universiti Antarabangsa UNITAR Kuching",
    "Pusat Wilayah UNITAR International University Melaka": "Pusat Wilayah Universiti Antarabangsa UNITAR Melaka",
}

EXCLUDE_REMARKS = {"On Hold", "Exist but not offering"}


def normalise(s: str) -> str:
    return " ".join(s.replace("\n", " ").split()).strip()


def build():
    rows = []
    with MASTER.open(newline="", encoding="utf-8") as f:
        reader = csv.reader(f)
        all_rows = list(reader)

    # Header is on rows 1+2 (source row + actual header row)
    data_rows = all_rows[2:]

    seen = set()  # dedupe (level, programme_display, campus)
    parsed = []
    for r in data_rows:
        if len(r) < 8:
            continue
        prog = normalise(r[0])
        remarks = normalise(r[1])
        campus = normalise(r[2])
        mode = normalise(r[3])
        level = normalise(r[7])
        if not prog or not campus or not level:
            continue
        if remarks in EXCLUDE_REMARKS:
            continue
        if level not in LEVEL_BM:
            continue

        # Strip stray trailing punctuation from name (e.g., "Diploma in Fashion Design?")
        prog_clean = prog.rstrip("?").strip()

        suffix = " - Online" if mode == "Online" else ""
        display_en = f"{prog_clean}{suffix}"

        key = (level, display_en, campus)
        if key not in seen:
            seen.add(key)
            parsed.append((level, prog_clean, suffix, campus, remarks))

        # Add explicit "- BM" variant when remarks indicate BM offering
        if "Offered in BM as well" in remarks:
            display_bm_variant = f"{prog_clean}{suffix} - BM"
            key_bm = (level, display_bm_variant, campus)
            if key_bm not in seen:
                seen.add(key_bm)
                parsed.append((level, prog_clean, f"{suffix} - BM", campus, remarks + " [BM-medium variant]"))

    # Emit EN
    with OUT_EN.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow([
            "What level of study are you interested in?",
            "What is your preferred programmes?",
            "What is you preferred campus?",
            "What is you preferred intake year",
            "What is you preferred intake month?",
        ])
        for level, prog_clean, suffix, campus, _ in parsed:
            display = f"{prog_clean}{suffix}"
            for year, month in INTAKES:
                w.writerow([level, display, campus, year, month])

    # Emit BM
    missing_prog = set()
    missing_campus = set()
    with OUT_BM.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow([
            "Tahap Pengajian",
            "Program Pilihan",
            "Kampus Pilihan",
            "Tahun Pengambilan Pilihan",
            "Bulan Pengambilan Pilihan",
        ])
        for level, prog_clean, suffix, campus, _ in parsed:
            level_bm = LEVEL_BM[level]
            base_bm = PROGRAMME_BM.get(prog_clean)
            if base_bm is None:
                missing_prog.add(prog_clean)
                base_bm = prog_clean  # fallback so file still emits
            # Translate suffix
            bm_suffix = (
                suffix.replace(" - Online", " - Dalam Talian")
                .replace(" - BM", " - BM")
            )
            display_bm = f"{base_bm}{bm_suffix}"
            campus_bm = CAMPUS_BM.get(campus)
            if campus_bm is None:
                missing_campus.add(campus)
                campus_bm = campus
            for year, month in INTAKES:
                w.writerow([level_bm, display_bm, campus_bm, year, INTAKE_BM[month]])

    print(f"EN rows written: {len(parsed) * len(INTAKES)} ({len(parsed)} programmes × {len(INTAKES)} intakes)")
    print(f"BM rows written: {len(parsed) * len(INTAKES)}")
    if missing_prog:
        print("\n[!] Programmes missing BM translation (used EN fallback):")
        for p in sorted(missing_prog):
            print(f"    - {p}")
    if missing_campus:
        print("\n[!] Campuses missing BM translation (used EN fallback):")
        for c in sorted(missing_campus):
            print(f"    - {c}")


if __name__ == "__main__":
    build()
