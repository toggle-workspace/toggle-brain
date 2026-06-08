# `templates/` — empty shells

Templates are *unfilled skeletons*. Copy them into a client folder; never fill them in place.

---

## The rules of this zone

1. **Copy out, don't edit here.** A template is a structure. Filling it in `templates/` ruins it for every future client.
2. **One concept per template.** A TikTok brief is one file; a creative brief is another; don't merge them with conditional sections.
3. **Templates are short.** A new hire should be able to skim one in 30 seconds. If yours is over a page, split it.
4. **Templates link to `brain/`, not duplicate it.** A proposal template references `brain/positioning/elevator-pitches.md` instead of pasting one in.

---

## What's in here

| File | Used for |
|---|---|
| `briefs/tiktok.md` | TikTok shoot/creative brief |
| `briefs/meta.md` | Meta/Facebook campaign brief |
| `briefs/creative.md` | Generic creative brief (channel-agnostic) |
| `proposals/proposal.md` | Pitch-stage proposal |
| `quotations/quotation.md` | Quote rendering shell (`/quote` uses this) |
| `reports/monthly-performance.md` | Recurring monthly client report |
| `reports/campaign-recap.md` | Post-campaign recap |
| `decks/pitch-deck.md` | Pitch deck markdown outline |
| `meeting-notes.md` | Meeting notes shell |
| `content-calendar.md` | Content calendar shell |

---

## How to use one

```bash
# Example: drafting a Meta brief for Audaura
cp templates/briefs/meta.md clients/audaura-unitar/00-brief/2026-06-meta-enrollment.md
# Then fill it in. Don't touch templates/briefs/meta.md.
```

If you find yourself wanting to change a template *for one specific client*, override in the client folder. If you want to change it *for everyone*, open a PR against `templates/`.
