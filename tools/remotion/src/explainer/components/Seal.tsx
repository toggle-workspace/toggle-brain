import React from "react";
import { evolvePath } from "@remotion/paths";
import { FONT_FALLBACK } from "../tokens";

/**
 * The [ bracket ] seal per SIGNATURE-DEVICES §C1: bracket height = 1.4× cap
 * height, arm length = 25% of bracket height, padding = 0.5× cap height,
 * butt caps + miter joins, bracket and text share one color.
 *
 * mode "type"  — text types on, no cursor (intro bumper).
 * mode "draw"  — left bracket draws, text fades, right bracket draws (outro).
 */
export const Seal: React.FC<{
  text: string;
  fontSize: number;
  color: string;
  progress: number;
  mode: "type" | "draw";
  style?: React.CSSProperties;
}> = ({ text, fontSize, color, progress, mode, style }) => {
  const cap = 0.72 * fontSize;
  const bh = 1.4 * cap;
  const arm = 0.25 * bh;
  const gap = 0.5 * cap;
  const sw = 2;

  const leftD = `M ${arm} ${sw / 2} L ${sw / 2} ${sw / 2} L ${sw / 2} ${bh - sw / 2} L ${arm} ${bh - sw / 2}`;
  const rightD = `M ${sw / 2} ${sw / 2} L ${arm - sw / 2} ${sw / 2} L ${arm - sw / 2} ${bh - sw / 2} L ${sw / 2} ${bh - sw / 2}`;

  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
  const leftP = mode === "draw" ? clamp01(progress / 0.3) : 1;
  const textP = mode === "draw" ? clamp01((progress - 0.3) / 0.35) : 1;
  const rightP = mode === "draw" ? clamp01((progress - 0.65) / 0.35) : 1;
  const bracketOpacity = mode === "type" ? clamp01(progress * 4) : 1;
  const typedChars = mode === "type" ? Math.round(clamp01((progress - 0.15) / 0.85) * text.length) : text.length;

  const bracket = (d: string, p: number) => {
    const evolved = evolvePath(p, d);
    return (
      <svg width={arm} height={bh} style={{ opacity: bracketOpacity, flexShrink: 0 }} fill="none">
        <path
          d={d}
          stroke={color}
          strokeWidth={sw}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeDasharray={evolved.strokeDasharray}
          strokeDashoffset={evolved.strokeDashoffset}
        />
      </svg>
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "center", ...style }}>
      {bracket(leftD, leftP)}
      <div
        style={{
          margin: `0 ${gap}px`,
          fontFamily: FONT_FALLBACK,
          fontSize,
          fontWeight: 500,
          color,
          lineHeight: 1,
          whiteSpace: "nowrap",
          opacity: mode === "draw" ? textP : 1,
        }}
      >
        {mode === "type"
          ? text.split("").map((ch, i) => (
              <span key={i} style={{ opacity: i < typedChars ? 1 : 0 }}>
                {ch}
              </span>
            ))
          : text}
      </div>
      {bracket(rightD, rightP)}
    </div>
  );
};
