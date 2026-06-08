# /image-prompt

Generate tool-specific image prompts for one client.

## READS
- prompts/image/<tool>.md                  # tool-specific patterns (midjourney / flux / nano-banana / sora-image)
- assets/reference-images/<client>/        # client-owned reference images for style anchoring
- clients/<slug>/style-pack.md             # client visual rules

## WRITES
- clients/<slug>/02-creative/image-prompts/YYYY-MM-DD-<scope>.md

## INPUTS
- $slug — the client slug
- $tool — midjourney / flux / nano-banana / sora-image
- $scope — short label (e.g. "summer-launch", "hero-portrait")
- $brief — what the image needs to show

## STEPS
1. Read the tool prompt patterns from `prompts/image/$tool.md`.
2. Read the client's style-pack for visual rules.
3. Reference any matching images under `assets/reference-images/$slug/`.
4. Render prompts using the tool's grammar (subject → environment → lighting → composition → modifiers).
5. Write to `clients/$slug/02-creative/image-prompts/YYYY-MM-DD-$scope.md`.

## STATUS
scaffold — flesh out under demand
