import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { DraftIn } from "../components/DraftIn";
import { useLayout } from "../layout";
import { COLOR, EASE, FONT_FALLBACK, OVERLINE_STYLE, TYPE } from "../tokens";

// Receipts per BRAND-IDENTITY §6 (Experienced): every number carries its
// client inline. Sources: brain/case-studies/{unitar,kith-and-kin,al-hidayah}.md
const STATS: { value: string; receipt: string; focal: boolean }[] = [
  { value: "32,000+", receipt: "Qualified leads · UNITAR · 2025", focal: true },
  { value: "+392%", receipt: "Leads at RM35 CPL · Kith & Kin · 2025", focal: false },
  { value: "11.5x", receipt: "TikTok Shop ROI · Al Hidayah · 2025", focal: false },
];

/**
 * Stat-reveal per MOTION.md §3: counters are banned — the numeral appears
 * whole (150ms), a 2px underline rules itself beneath (300ms), the receipt
 * line fades up after (150ms, 100ms offset). One focal blue stat per surface.
 */
const StatBlock: React.FC<{ stat: (typeof STATS)[number]; delay: number }> = ({
  stat,
  delay,
}) => {
  const frame = useCurrentFrame();
  const lin = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const numeral = interpolate(frame, [delay, delay + 5], [0, 1], lin);
  const underline = interpolate(frame, [delay + 5, delay + 14], [0, 1], {
    ...lin,
    easing: EASE,
  });
  const receipt = interpolate(frame, [delay + 17, delay + 22], [0, 1], lin);

  return (
    <div style={{ width: 480 }}>
      <div
        style={{
          fontSize: TYPE.numericHero,
          fontWeight: 800,
          fontVariantNumeric: "tabular-nums",
          color: stat.focal ? COLOR.blue : COLOR.white,
          lineHeight: 1,
          opacity: numeral,
        }}
      >
        {stat.value}
      </div>
      <div
        style={{
          width: 360,
          height: 2,
          backgroundColor: COLOR.borderStrong,
          transform: `scaleX(${underline})`,
          transformOrigin: "left",
          marginTop: 24,
        }}
      />
      <div
        style={{
          fontSize: TYPE.caption,
          fontWeight: 500,
          fontVariantNumeric: "tabular-nums",
          color: COLOR.body,
          marginTop: 16,
          opacity: receipt,
          transform: `translateY(${8 * (1 - receipt)}px)`,
        }}
      >
        {stat.receipt}
      </div>
    </div>
  );
};

export const Proof: React.FC = () => {
  const { portrait, pad } = useLayout();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLOR.canvas,
        fontFamily: FONT_FALLBACK,
        justifyContent: "center",
        paddingLeft: pad,
        paddingRight: portrait ? pad : 0,
      }}
    >
      <DraftIn delay={2}>
        <div style={OVERLINE_STYLE}>The receipts</div>
      </DraftIn>
      <DraftIn delay={8}>
        <div
          style={{
            fontSize: TYPE.h1,
            fontWeight: 800,
            color: COLOR.white,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            marginTop: 18,
          }}
        >
          Judged on results, not activity.
        </div>
      </DraftIn>
      <div
        style={{
          display: "flex",
          flexDirection: portrait ? "column" : "row",
          gap: portrait ? 52 : 80,
          marginTop: portrait ? 72 : 90,
        }}
      >
        {STATS.map((stat, i) => (
          <StatBlock key={stat.receipt} stat={stat} delay={26 + i * 12} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
