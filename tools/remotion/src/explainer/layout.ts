import { useVideoConfig } from "remotion";

/**
 * Orientation-aware layout constants. One composition tree renders both the
 * 16:9 master and the 9:16 crop (MOTION.md §3 ships 1920×1080 + 1080×1920);
 * scenes read this to re-flow. Landscape values are the approved master —
 * never change them here without re-validating the 16:9 cut.
 *
 * `pad`  — content side inset. `edge` — canvas-edge inset for seals/anchors
 * (a touch over the canon's 5% so the 9:16 base clears typical social chrome).
 */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  return {
    width,
    height,
    portrait,
    pad: portrait ? 80 : 160,
    edge: portrait ? 110 : 96,
  };
};
