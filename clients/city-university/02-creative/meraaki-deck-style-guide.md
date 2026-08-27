---
client: City University Malaysia
slug: city-university
type: style-guide
owner: Meraaki Digital (partner agency)
source: "Meraaki Digital Content Growth for Open Day Conversion.pptx"
applies_to: the combined City University proposal deck
last_reviewed: 2026-08-21
---

# Meraaki Digital PowerPoint Style Guide

Reverse-engineered from Meraaki's own City University content deck, so the media and CRM section could be built to match. Every value below was read out of their file rather than guessed. Use this to extend the combined deck without breaking the join between the two halves.

This is the partner agency's deck system. It is not City University's brand guide, and it is not Toggle's design system in `clients/toggle/design-system/`.

## Canvas

| Property | Value |
|---|---|
| Slide size | 18288000 x 10287000 EMU |
| In inches | 20.00 x 11.25 (16:9 at double the 10 x 5.625 standard) |
| Background | Solid `#1351AA`, set per slide rather than on the master |
| Layout | Every slide uses `slideLayout7`, which is blank. All artwork is drawn on the slide itself. |

The doubled canvas matters. Point sizes look small next to the numbers you would use on a 10 inch deck, because everything is being displayed at half scale.

## Palette

| Token | Hex | Role |
|---|---|---|
| Deep blue | `#1351AA` | Slide background, and text on light cards |
| Light | `#EAEAEA` | Primary text on the blue background, and the fill for content cards |
| Lime | `#D9E033` | Accent one. Card bars, footer strips, emphasis figures |
| Mid blue | `#2A68C1` | Accent two. Panels, table headers, alternating card bars |
| White | `#FFFFFF` | The horizontal rule under the header, and nothing else |

Five colours, no gradients, no tints. Accents alternate rather than carrying meaning, so a three card row runs lime, mid blue, lime.

## Type

Two families, both fully embedded in the file, so the deck renders correctly on a machine that has neither installed.

| Face | Role |
|---|---|
| **Aileron Bold** | Display only. Slide titles and large figures. |
| **Aileron** | Secondary display, paired against Open Sauce Medium in card headings |
| **Open Sauce Bold** | Heavy emphasis inside body copy |
| **Open Sauce Medium** | Card headings, table headers, footer strips |
| **Open Sauce** | Body copy, labels, the header pair |
| **Open Sauce Italics** | Rare, used for indicative cost lines |

Embedded font parts: `ppt/fonts/font19.fntdata` through `font24.fntdata`. If you rebuild the package from scratch, carry these across or the deck loses its typography everywhere.

### Type scale, as measured

| Role | Size | Face |
|---|---|---|
| Cover title | 152pt | Aileron Bold |
| Section title, one or two words | 82 to 100pt | Aileron Bold |
| Section title, longer | 69 to 77pt | Aileron Bold |
| Card heading | 20pt | Open Sauce Medium, paired with Aileron |
| Sub heading | 18.5pt | Open Sauce Medium |
| Body copy | 13.8pt | Open Sauce |
| Header label | 12pt | Open Sauce |

Titles are set in a narrow column and allowed to wrap across two or three lines. They are placed asymmetrically, sometimes left, sometimes bottom left, sometimes right, rather than always sitting in a bar across the top.

## Geometry

| Element | Position |
|---|---|
| Header label, left | x 1.56, y 0.53, 12pt, reads "Meraaki Digital" |
| Header label, right | x 15.94, y 0.57, width 2.41, 12pt, reads "www.meraakidigital.com" |
| Horizontal rule | y 1.03, running full bleed from x -0.88 to 20.89, white, 0.8pt |
| Left content margin | 1.10 |
| Right content edge | 18.90 |

## Shape rules

**Square corners everywhere.** Their deck contains 168 rectangles and 16 lines, and zero rounded rectangles. Do not introduce a corner radius.

**Cards** are solid `#EAEAEA` rectangles carrying `#1351AA` text. **Panels** are solid `#2A68C1` carrying `#EAEAEA` text. Both take a thin accent bar in lime or mid blue along one edge.

**One rule per slide.** The white line under the header is the only stroke in the system.

## Conventions used for the extension slides

The media and CRM section (slides 13 to 30 of the combined deck) was built to the values above, with these additions where their deck offered no precedent. Follow these if you add more slides.

| Element | Value |
|---|---|
| Slide title | Aileron Bold 44pt, `#EAEAEA`, x 1.10, y 1.32, full content width |
| Sub line under the title | Open Sauce 16pt, `#EAEAEA`, y 2.34 |
| Content top edge | y 3.20 |
| Card accent bar | 0.12 tall across the card top, or 0.12 wide down the left edge |
| Stat card | 2.40 tall. Figure Aileron Bold 32pt, label Open Sauce Medium 16pt, note Open Sauce 13pt |
| Body copy in cards | Open Sauce 14pt, `#1351AA` |
| Bullet | Character 2022, 20pt indent, 5pt paragraph spacing |
| Footer strip | Lime fill, 0.68 tall, Open Sauce Medium 15pt in `#1351AA`, segments separated by three spaces, a pipe, three spaces |
| Table header | Mid blue fill, `#EAEAEA` text, Open Sauce Medium 13pt |
| Table body rows | Alternating `#EAEAEA` and `#F5F5F5`, `#1351AA` text, 13pt |
| Table total row | Lime fill, `#1351AA` bold |
| Table borders | 0.75pt in the background blue, so gridlines read as gaps |

### Column grids

Content width is 17.80, starting at x 1.10, with a 0.35 gutter.

| Columns | Width | x positions |
|---|---|---|
| Two | 8.72 | 1.10, 10.18 |
| Three | 5.70 | 1.10, 7.15, 13.20 |
| Four | 4.19 | 1.10, 5.64, 10.18, 14.71 |
| Five | 3.28 | 1.10, 4.73, 8.36, 11.99, 15.62 |

## Known defects in the source file

Carried here so they get fixed rather than copied forward.

1. Their slide 2 still shows `www.reallygreatsite.com`, the Canva template placeholder.
2. Their slide 8 footer URL reads `www.mераакidigital.com` using Cyrillic homoglyphs for е, р, а, а and к. The link is dead and some security scanners flag homoglyph domains.
3. Their slide 4 is headed "7 Key Gaps" and lists three.
4. Their slide 8 has a sentence that trails off: "paid awareness ads and  — all crafted 2 to 3 weeks out", plus "LEcturers" miscapitalised.
5. Their slide 11 states 12 to 15 assets from Meraaki plus 4 to 6 from the university, then concludes "Total monthly output: 12 to 15". Should be 16 to 21.
6. Their slide 9 carries three unfilled "VIDEO SAMPLE PLACEHOLDER" markers.
7. Their original slide 13 was empty. It was dropped when the decks were combined.
8. Their sample creative on slides 9 and 10 shows SEGi University and Sunway University branded content, unlabelled.

## Conflict with Toggle house style

Their deck uses 17 em dashes. `brain/voice/writing-standards.md` makes no em dash a binding rule with no waiver. The extension slides contain none. Anything written into their half of the deck should follow their existing style, but nothing new authored by Toggle should introduce one.

## Rebuilding the combined deck

The extension slides are generated rather than hand built, then merged into a copy of Meraaki's package so their twelve slides keep their original artwork, theme and embedded fonts untouched. The merge renumbers the generated slides to 13 through 30, points each at `slideLayout7`, and rewrites `presentation.xml`, `presentation.xml.rels` and `[Content_Types].xml`. Verify afterwards that every `sldId` resolves to a file on disk before packaging.
