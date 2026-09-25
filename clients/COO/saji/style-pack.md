# Saji (via COO) style pack

Voice and visual overrides for this account. House voice still applies: see
`brain/voice/writing-standards.md` (binding) and `brain/voice/toggle-house-voice.md`.

---

## Visual system

Deliverables use the **bru-hwc structure** with the **palette shifted to Saji**. COO presents this
work inside a Saji branded deck, so keeping COO's cream and purple would leave a visible seam where
Toggle's slides start. The structure is what carries the family resemblance to COO's other work, not
the color.

Everything structural in `clients/COO/Colgate/design-systems/bru-hwc/README.md` holds: the three page
modes, the two font pairs, the card grid with colored top rules, the inset footer bar, the panel
pair, the timeline, and the 56px margins on a 1000 x 563 slide.

### The Saji palette

Greens and the canvas were sampled from the client's own key visuals in
`C:\Users\Jordan\Desktop\COO (Saji)\2027 Marketing campaign\`, specifically the "Tone of the
Campaign" and "RaRa Campaign Pillar" slides, rather than guessed.

| Token | bru-hwc | Saji variant | Role |
|---|---|---|---|
| `--cream` | `#FCE5CD` | **`#F6FAEC`** | Canvas |
| `--card` | `#FDF2DF` | **`#E9F3DD`** | Card fill |
| `--purple` / `--purple-2` | `#351C75` / `#3B2478` | **`#006838`** | Statements, headlines, card body |
| `--purple-muted` | `#746096` | **`#6E8A76`** | Kickers, running headers |
| `--brick` | `#B5330F` | **`#C5192B`** | Headline accent, card rule 1, alerts |
| `--orange` | `#F6B26B` | **`#F0A03C`** | Panel fills, badges |
| `--orange-rule` | `#F2A25C` | **`#E8912C`** | Card rule 3 |
| `--highlight` | `#EEFF41` | **`#F5EC2E`** | Highlighter, footer bar lead-in word |
| `--gold` | `#FFD966` | **`#F8C84A`** | Accents on dark pages |
| `--maroon` | `#660000` | **`#6B1410`** | Text on gold and orange fills |
| `--ink` | `#1C120B` | **`#052B18`** | Footer bars, photo and divider pages |
| (new) | | **`#00A651`** | Bright Saji green, positive stats, card rule 5 |

`#006838` carries both the statement role and the headline role, so a five card row cycles brick,
green, orange-rule, ink, bright rather than repeating.

### Fonts on Windows

None of the bru-hwc fonts are installed on the Windows desktop, so a .pptx built there maps them to
faces present on every Windows install. See `bru-hwc-fonts-missing-on-windows` in memory.

| Design system | Windows substitute | Role |
|---|---|---|
| Archivo Black | **Arial Black** | Mode C headlines, big stats |
| Archivo | **Arial** | Mode C body, cards, tables, footer bars |
| Lexend | **Century Gothic** | Mode A and B narrative |
| Montserrat | **Century Gothic** | Mode B bold payoffs |

### The landing page is a separate surface

`02-creative/tersaji-raya-2027-contest-landing-page.html` does not use the deck system. A slide and a
mobile contest page have different jobs, so the page keeps the Saji palette and takes its own type
pairing from Google Fonts: **Fraunces** for display warmth (headline, section heads, the big numbers)
and **Plus Jakarta Sans** for the interface. Both load with `font-display: swap` behind a preconnect,
so a slow connection still gets readable text immediately.

Page-specific devices worth keeping if it gets rebuilt: the ketupat weave texture over the hero
gradient, the receipt progress meter that fills from 0/2 to 2/2 as each receipt is attached, the
stepper rail connecting the three steps, the gold Golden Ticket panel, and inline SVG icons rather
than emoji in the upload zones, since emoji render inconsistently across Android builds.

The rev0 page carried a 1x to 5x multiplier meter for the weighted entry mechanic. That mechanic is
gone as of rev1, so the meter now counts required receipts instead. Do not reintroduce a multiplier.

---

## Naming, and the words that matter

- The campaign is **TerSaji Raya**, still KIV. Use it as the working umbrella name until the client
  confirms.
- **RaRa** is the client's own shorthand for Ramadan Raya. It is fine inside COO and client
  documents, since both past decks use it.
- The mascot is **Kak Ji**. The client requires her in the 2027 content plan, so she fronts the
  contest creative.
- The Saji counter inside a Bulan Bintang boutique is a **pop-up**, hyphenated, lowercase unless it
  starts a sentence. Not "popup" and not "pop up".
- The grand prize is the **Golden Ticket**, both words capitalized, **Tiket Emas** in Bahasa
  Malaysia. It is worth RM29,000 and it is found, never won in a draw, so write "found" or
  "dijumpai" rather than "drawn".
- **Never write a bare "RM145,000".** Two separate RM145,000 figures run through this campaign:
  the **contest prize pool** and the **campaign investment**. Always name which one is meant, in
  decks, documents and email.
- The counter reward is the **mystery gift**, the pack is the **campaign pack**, and the kitchen idea
  is a **kitchen redesign**, not a renovation or a makeover.
- The partner is **Bulan Bintang**, two words, both capitalized. Their own campaign is spelled
  **Terrrpaling Raya**, with three r's, which is deliberate on their part.
- Write **Saji x Bulan Bintang** with a lowercase x for the collaboration lockup.
- The parent company is **Delima Oil Products Sdn Bhd**, under **FGV Holdings Berhad**. Delima, not
  Dejima, which is a typo carried in the meeting notes.

## The campaign idea

The client set the direction themselves in their Marketing Leads WhatsApp group, captured on slide 6
of COO's working deck: **Low-key Raya**. Less noise, more meaning. Less showing, more feeling. Less
extravagance, more togetherness. Joy with depth rather than volume.

The tone slide sets the personality as humble, warm, genuine and meaningful, and it is explicit that
Saji is a trusted companion in the small acts of care rather than the hero of the story.

**Do:** write Bahasa Malaysia first and English second, keep Kak Ji in the contest work, anchor every
claim in something the shopper can picture, and let the prize do the persuading.

**Avoid:** extravagance, loud flexing, borrowed grief from world events (the client named this risk
themselves), and any line that makes Saji the hero rather than the companion.

## Audience

Three groups, in the order the contest needs them. The full definitions sit in the proposal deck.

1. **The Raya Household CFO.** Malay woman, 30 to 45, suburban or small town outside KL and
   Selangor. The only one of the three who makes both qualifying purchases unaided.
2. **The Young Raya Stylist.** Malay, 18 to 29, lives on TikTok, Bulan Bintang's core buyer. The
   briefed mechanic shuts her out, which is one reason to change it.
3. **The Balik Kampung Provider.** Malay man, 28 to 45, working in KL or Johor. Buys both categories
   in one trip in the 10 days before Raya.

## Products in the campaign

Saji cooking oil, santan, ketupat and Ketupat Mini, creamer (sweetened and evaporated), AIO, cordial,
kicap, sauces, pes, bunjut, kerisik and coating flour, plus Seri Pelangi margarine and Premeo hybrid
oil. Any Saji product counts toward the RM25 contest threshold, pending the client confirming the
qualifying SKU list.
