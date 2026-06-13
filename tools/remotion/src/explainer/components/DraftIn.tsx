import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { EASE, f } from "../tokens";

/**
 * The ONE reveal (MOTION.md §2, draft-in): opacity 0→1 + translateY 12px→0,
 * 400ms, video curve. `delay` is in frames relative to the enclosing Sequence.
 */
export const DraftIn: React.FC<{
  delay: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ delay, children, style }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + f(400)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });
  return (
    <div style={{ opacity: p, transform: `translateY(${12 * (1 - p)}px)`, ...style }}>
      {children}
    </div>
  );
};
