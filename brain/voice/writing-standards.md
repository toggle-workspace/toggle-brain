# Writing standards (binding for every written artifact)

_Read this before writing anything a human will read: documents, ad copy, reports, proposals, decks, emails, HTML pages, social posts, video scripts, journal entries, client deliverables. It applies on top of `toggle-house-voice.md`, `do-say.md`, and `never-say.md`: those files govern what Toggle says, this file governs how any text is written._

_Sources: Zaid's standing rules, stop-slop (Hardik Pandya), copy-test (Harry Dry's three rules, installed as the `/copy-test` skill), voice-fingerprint (installed skill), and tasteskill for HTML. Last updated 2026-07-16._

## Zaid's non-negotiables

1. **Write proper, full sentences.** Every sentence has a subject and a verb. No fragments stacked for drama ("Speed. Precision. Results."), no one-word paragraphs, no staccato punch lines.
2. **Use vocabulary common in America or Southeast Asia.** American spelling (organize, color, center). Words a reader in KL, Manila, Bangkok, or New York uses in normal conversation. Avoid British-isms (whilst, fortnight, amongst, "have a chat"), and avoid ornate words where a plain one exists (utilize, endeavour, commence, leverage-as-a-verb).
3. **NEVER write "--" or an em dash.** Not in prose, not in headings, not in ad copy, not in HTML text. Use a comma, a colon, parentheses, or start a new sentence.

## Prose rules (from stop-slop)

**Cut these phrases on sight.** Throat-clearing ("Here's the thing", "Let me be clear", "The truth is", "It turns out", any "here's what/why/how" opener). Emphasis crutches ("Full stop", "Let that sink in", "Make no mistake", "This matters because"). Filler ("At its core", "In today's world", "It's worth noting", "At the end of the day", "When it comes to"). Meta-commentary ("Let me walk you through", "In this section we'll", "As we'll see"). Vague declaratives ("The implications are significant", "The stakes are high"): name the specific thing instead.

**Kill adverbs.** No "really", "just", "actually", "truly", "genuinely", "simply", "literally", "fundamentally", "incredibly". If the sentence needs the adverb, the verb or the fact is too weak; fix that instead.

**Break these structures.**
- Binary contrasts: "It's not X, it's Y" / "The answer isn't X. It's Y." State Y directly.
- Negative listing: "Not a tool. Not a platform. A partner." State what it is.
- Rhetorical setups: "What if you could...?", "Think about it:". Make the point.
- False agency: "the data tells us", "the campaign delivered", "the decision emerged". Name the human who did the thing.
- Passive voice: "mistakes were made", "the report was created". Put the actor at the front.
- Wh-word sentence openers ("What makes this hard is..."): lead with the subject instead ("The constraint is...").

**Rhythm and specificity.** Vary sentence length; three same-length sentences in a row is a tell. Prefer two items over three in a list. Avoid lazy extremes (every, always, never, nobody) doing vague work; use real numbers and names. Address the reader as "you" rather than "people". If a line sounds like a pull quote, rewrite it.

**Business jargon swap:** navigate → handle · unpack → explain · lean into → accept · landscape → market · game-changer → name the actual change · deep dive → analysis · double down → commit · moving forward → next · circle back → revisit.

## Short marketing copy (headlines, hooks, hero lines, CTAs, subject lines, VO)

Run Harry Dry's three questions on every line (or invoke `/copy-test`):
1. **Can the reader visualize it?** Concrete and picture-able beats abstract.
2. **Can it be falsified?** A checkable claim beats a vague aspiration, and it must be true.
3. **Can nobody else say it?** If a competitor could paste the line unchanged, it is not ours.

Never fabricate a claim, number, or testimonial to make a line pass. Ask for the fact or research it. A line that fails as a headline may still work as a support line; demote it instead of deleting it.

## Localized content (BM, Taglish, TH, CN, or any non-EN surface)

Natural in the target market beats grammatically perfect. Watch for translation residue: sentence structures carried over from English, formal register where locals write casual, wrong code-switch density. When a market+language surface has no voice fingerprint yet, run the `/voice-fingerprint` skill to build one from live top-ranking content before drafting at volume.

## HTML files and visual artifacts (from tasteskill)

1. **State a one-line design read before generating:** what kind of page, for which audience, in which visual language. For Toggle work, the canon in `clients/toggle/design-system/` overrides generic taste.
2. **Anti-default discipline.** Do not default to AI-purple gradients, a centered hero over a dark mesh, three equal feature cards, glassmorphism on everything, or Inter + slate-900. Reach past the LLM defaults on purpose.
3. **Lock the theme.** Pick light or dark per artifact and keep every section consistent; support both only when the surface requires it.
4. **Respect readers:** real copy in mockups follows every prose rule above (no lorem-slop, no "--" in HTML text nodes), `prefers-reduced-motion` respected, honest data in charts.

## Completeness (from full-output-enforcement)

A partial output is a broken output. No placeholder patterns: no "rest of the code here", no "similarly for the remaining sections", no skeletons when the request was a full document. Count the deliverables in the request, deliver that count. If output must split, stop at a clean breakpoint and say exactly where it resumes.

## Pre-flight checklist (run before delivering any written artifact)

- No "--" and no em dash anywhere, including headings, alt text, and HTML strings.
- Full sentences throughout; zero dramatic fragments.
- American/SEA vocabulary; no British-isms, no ornate words.
- Zero banned phrases, zero "not X, it's Y" contrasts, zero negative listings.
- Zero adverb crutches; active voice; every action has a named actor.
- Specifics over abstractions: numbers, names, places.
- Short copy passes visualize / falsify / ownable, with zero invented claims.
- Localized text reads native, not translated.
- HTML follows the design read and the Toggle design-system canon.
- Output is complete; nothing replaced by a placeholder.
