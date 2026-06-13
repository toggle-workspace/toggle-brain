import React, { useMemo } from "react";
import { evolvePath, getSubpaths } from "@remotion/paths";
import { WORDMARK_PATHS, WORDMARK_VIEWBOX } from "../brand/wordmarkPaths";

/**
 * The wordmark trace from MOTION.md §3: letter outlines draw left-to-right
 * over the trace window, then the fill snaps in. Letterforms come only from
 * the filed vector (BRAND-IDENTITY §3 — never re-typeset). White on dark.
 */
export const TracedWordmark: React.FC<{
  width: number;
  traceProgress: number;
  fillOpacity: number;
  color: string;
  style?: React.CSSProperties;
}> = ({ width, traceProgress, fillOpacity, color, style }) => {
  const letters = useMemo(() => WORDMARK_PATHS.map((d) => getSubpaths(d)), []);
  const strokeW = (2 * WORDMARK_VIEWBOX.width) / width;

  const n = letters.length;
  const dur = 0.5; // each letter draws over half the window, staggered left-to-right
  return (
    <svg
      viewBox={`0 0 ${WORDMARK_VIEWBOX.width} ${WORDMARK_VIEWBOX.height}`}
      width={width}
      style={style}
      fill="none"
    >
      {letters.map((subpaths, i) => {
        const start = (i * (1 - dur)) / (n - 1);
        const local = Math.max(0, Math.min(1, (traceProgress - start) / dur));
        return (
          <g key={i}>
            {subpaths.map((sp, j) => {
              const evolved = evolvePath(local, sp);
              return (
                <path
                  key={j}
                  d={sp}
                  stroke={color}
                  strokeWidth={strokeW}
                  strokeDasharray={evolved.strokeDasharray}
                  strokeDashoffset={evolved.strokeDashoffset}
                />
              );
            })}
            <path d={subpaths.join(" ")} fill={color} opacity={fillOpacity} fillRule="evenodd" />
          </g>
        );
      })}
    </svg>
  );
};
