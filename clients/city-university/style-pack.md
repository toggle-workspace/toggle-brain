---
client: City University Malaysia
slug: city-university
last_reviewed: 2026-08-21
---

# City University Malaysia Style Pack

> Base: `prompts/style-packs/toggle-default.md`. This file overrides only what differs.

## Binding rule for decks

**Every deck built for City University follows Meraaki Digital's deck system, not Toggle's.**

Read [`02-creative/meraaki-deck-style-guide.md`](02-creative/meraaki-deck-style-guide.md) before drawing a single slide. It carries the canvas size, the palette, both typefaces with their measured type scale, the header and rule geometry, the shape rules and the column grids.

**Why.** The City University proposal goes out under Meraaki Digital's brand, with Meraaki holding the content and Open Day section and Toggle holding paid media and CRM. A deck in Toggle's design system would not sit alongside their slides, and the client sees one document rather than two.

This overrides `clients/toggle/design-system/` for this client. The Toggle canon still governs Toggle's own decks and anything not going out under the Meraaki brand.

### The five things that break the join if you get them wrong

1. Canvas is 20 x 11.25 inches, double the usual 10 x 5.625. Point sizes look small because everything renders at half scale.
2. Background is solid `#1351AA`, set per slide. Never white.
3. Display type is Aileron Bold. Body and card type is the Open Sauce family. Both are embedded in their package, so carry the font parts across on any rebuild.
4. Square corners everywhere. Their deck contains zero rounded rectangles.
5. Toggle is not named anywhere in the client-facing deck. Attribution, contacts and benchmark credits all read Meraaki Digital. Contact is Rooban, Founder, Meraaki Digital, (+60) 14-648 2623.

### Extending the combined deck

The combined proposal is `01-strategy/full-funnel-and-crm-proposal-2026-08-18.pptx` for the Toggle-branded version, and the merged Meraaki-branded deck sits on Jordan's Desktop. Meraaki's slides run 1 to 12 and the media and CRM section runs 13 to 30. New slides go in at the end of the relevant section, built to the conventions in the style guide.

## Voice overrides

- Tone: inherits `brain/voice/` defaults. Full sentences, American and Southeast Asian vocabulary, no em dashes.
- Note that Meraaki's own slides use em dashes. Leave theirs alone, and never introduce one into a slide Toggle authors.
- Do not name programmes. City University nominates which programmes get advertised.
- Do not state a fee, scholarship or waiver figure without written confirmation from City University, because the ad platforms hold the advertiser to what the ad says.

## Visual overrides

- Primary colors: `#1351AA` background, `#EAEAEA` text and cards, `#D9E033` lime accent, `#2A68C1` mid blue accent, `#FFFFFF` rules only.
- Typography: Aileron Bold for display, Open Sauce family for everything else.
- Logo usage rules: Meraaki Digital wordmark and URL in the header pair. No Toggle logo on client-facing slides.
- Reference images: `02-creative/image-prompts/` holds the audience mockup prompts.

## Platform tone

- Meta: three audiences, leavers 18 to 24, parents 35 to 55, working adults 25 to 45.
- TikTok: vertical 9:16, on screen text throughout, hook rate read at one week.
- Languages: English, Bahasa Malaysia and Mandarin, each written natively for its audience rather than translated.

## Examples of yes and no

- Yes: a slide on the `#1351AA` ground with an `#EAEAEA` card, a lime accent bar and an Aileron Bold title.
- No: a white slide with rounded cards and Inter Tight, which is the Toggle house deck and belongs to a different document.
