import React from "react";
import { COLOR } from "../tokens";

/**
 * The loop-form, drawn in (the closing bookend to the intro's step-form trace —
 * "the line draws the firm" → the line closes the loop). Geometry is the
 * canonical placeholder (assets/illustrations/loop-form-PLACEHOLDER.svg,
 * SIGNATURE-DEVICES A2 — TRACED asset, the only curves in the system): the
 * flattened iso circuit threading a block. Each shape uses pathLength=1 so a
 * single strokeDashoffset sweep draws its whole perimeter; the block's one
 * filled face fades in last (strokes-then-fill, §A1).
 *
 * Deviation, disclosed: MOTION.md §3 specs the outro loop-form as static. The
 * draw-in is a deliberate enhancement so the close is an intentional beat, not
 * a hard pop — it stays inside the brand's drawing-in vocabulary. Swap the
 * geometry when a designer files the real loop-form.svg.
 */
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

export const TracedLoopForm: React.FC<{
  width: number;
  traceProgress: number;
  fillOpacity: number;
  style?: React.CSSProperties;
}> = ({ width, traceProgress, fillOpacity, style }) => {
  const sw = (2 * 400) / width; // 2px on screen, in the 400-wide viewBox
  const dash = (range: [number, number]) => ({
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1 - seg(traceProgress, range[0], range[1]),
  });

  return (
    <svg
      viewBox="0 0 400 270"
      width={width}
      style={style}
      fill="none"
      stroke={COLOR.blue}
      strokeWidth={sw}
      strokeLinecap="butt"
      strokeLinejoin="miter"
    >
      {/* the iso loop — outer then inner circuit */}
      <g transform="translate(150,60)">
        <g transform="matrix(0.866,0.5,-0.866,0.5,0,0)">
          <rect x={0} y={0} width={260} height={150} rx={60} {...dash([0, 0.45])} />
          <rect x={34} y={34} width={192} height={82} rx={41} {...dash([0.4, 0.75])} />
        </g>
      </g>
      {/* the threaded block — strokes draw, the one filled face fades in last */}
      <g transform="translate(318,112)">
        <polygon points="-39.8,23 0,46 0,0 -39.8,-23" fill={COLOR.blue} opacity={fillOpacity} stroke="none" />
        <polygon points="0,-46 39.8,-23 0,0 -39.8,-23" {...dash([0.7, 0.9])} />
        <polygon points="39.8,23 0,46 0,0 39.8,-23" {...dash([0.8, 1])} />
        <polygon points="-39.8,23 0,46 0,0 -39.8,-23" {...dash([0.85, 1])} />
      </g>
    </svg>
  );
};
