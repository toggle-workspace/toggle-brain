#!/usr/bin/env bash
#
# Regenerate the explainer scratch voiceover into public/vo/*.m4a.
#
# These are SCRATCH clips (macOS `say`, voice Daniel/en-GB) — synthetic, meant
# to lock timing and sync. Swap in a pro/neural read by replacing the m4a files
# (keep the filenames); ExplainerVideo.tsx scene durations are sized to the
# clip lengths this prints, so re-check them if a new read is much longer.
#
# The VO COMPLEMENTS the screen (says the why) — it never reads the captions,
# and the proof numbers stay on-screen only. Lines source from
# brain/voice/talking-points.md.  Run:  bash generate-vo.sh
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p public/vo
VOICE="Daniel"; RATE=168
KEYS=(manifesto diagnosis services proof whytoggle outro)
TEXTS=(
"Most agencies sell you marketing. The job is growth. They are not the same thing."
"We diagnose before we prescribe. Sometimes the answer isn't ads at all."
"Twelve services, run by one team. Not twelve vendors. One number to call."
"Different industries. Same job. Find the bottleneck, then scale what works."
"The operator who builds your strategy runs it. And we keep you on results, not a contract."
"Toggle. Your digital growth partner."
)
for i in "${!KEYS[@]}"; do
  k="${KEYS[$i]}"; t="${TEXTS[$i]}"
  say -v "$VOICE" -r "$RATE" --file-format=m4af --data-format=aac -o "public/vo/$k.m4a" "$t"
  dur=$(npx remotion ffprobe "public/vo/$k.m4a" 2>&1 | grep -i Duration | sed -E 's/.*Duration: ([0-9:.]+).*/\1/' | head -1)
  frames=$(echo "$dur" | awk -F: '{printf "%d", ($1*3600+$2*60+$3)*30}')
  printf "%-12s %s  (~%s frames @30fps)\n" "$k" "$dur" "$frames"
done
