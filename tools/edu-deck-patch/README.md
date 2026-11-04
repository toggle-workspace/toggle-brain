# edu-deck-patch

Applies Toggle's fixes to a new export of Zaid's education deck ("Industry Focus: Education", Toggle × iWisers), so each time Zaid updates the deck we can bring the fixes across with one command.

## What it does

1. **Footer spacing.** Keeps the bottom 84px of every slide clear, so source lines and full-height cards sit above the footer and the floating slide controls.
2. **File size.** Re-encodes every embedded JPEG as WebP at quality 82. The November 2026 export went from 10.7MB to 4.7MB with no visible loss.
3. **Call planner.** Adds the "Set up this call" panel (press `S`): prospect name, full deck or short call, audit ticks, per-slide ticks, a setup link, and printing that drops unpicked slides. How it works is in `playbooks/education-proposal-deck-interactions.md`.

## Run it

```sh
brew install webp   # once, for cwebp
python3 -I toggle-brain/tools/edu-deck-patch/patch_deck.py deck-standalone.html toggle-iwisers-education-growth-deck.html
```

Run it on Zaid's untouched export, never on a file that already has the planner (the script refuses). Add `--skip-webp` to leave the images alone.

Add `--no-iwisers` for meetings Toggle presents alone. It removes the iWisers name and the work iWisers delivers, so the deck never presents their parent-community seeding as a Toggle service: the Partnership and Parent communities slides go, along with the Seeders channel card, the seeding lanes in the intake planner and open day timeline, the "iWisers assisted" dashboard row and the iWisers line on the close. The script stops if any mention of iWisers or seeders survives. Save that output as `toggle-education-growth-deck.html`.

## When it stops

Every fix looks for exact strings in Zaid's code. If he rewrites one of those places, the script stops and prints the string it could not find. Update that string in `patch_deck.py` to match his new code, then run it again. The audit ticks hide themselves when their slides are missing, so removing or renaming a slide does not break the panel.

## After running

Open the output, press `S`, tick two audit items, present, and step through with the arrow keys. Print to PDF and check that only the picked slides come out.
