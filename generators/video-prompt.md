# /video-prompt

Generate tool-specific video prompts for one client.

## READS
- prompts/video/<tool>.md                  # tool-specific patterns (runway / sora / veo)
- clients/<slug>/style-pack.md             # client visual rules

## WRITES
- clients/<slug>/02-creative/video-prompts/YYYY-MM-DD-<scope>.md

## INPUTS
- $slug — the client slug
- $tool — runway / sora / veo
- $scope — short label (e.g. "product-loop", "lifestyle-cutdown")
- $brief — what the shot needs to do

## STEPS
1. Read the tool prompt patterns from `prompts/video/$tool.md`.
2. Read the client's style-pack for visual rules.
3. Render prompts using the tool's shot grammar (camera move, subject motion, duration, aspect).
4. Note duration limits and ratio per tool.
5. Write to `clients/$slug/02-creative/video-prompts/YYYY-MM-DD-$scope.md`.

## STATUS
scaffold — flesh out under demand
