import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { DraftIn } from "../components/DraftIn";
import { useLayout } from "../layout";
import { COLOR, EASE, FONT_FALLBACK, TYPE } from "../tokens";

/**
 * The strikethrough rewrite — the ONE strikethrough this artifact gets
 * (SIGNATURE-DEVICES B1: one per artifact). Canon row 1: the website-hero
 * negation. Struck line in text.secondary, strike at the native mid-x
 * position, thickness 0.12 × font-size; rewrite carries more weight.
 * In 9:16 the struck line stays one line (the strike is a single full-width
 * rule — B1 forbids per-fragment strikes), so it shrinks; the rewrite is
 * allowed to wrap since it carries no strike.
 */
export const Manifesto: React.FC = () => {
  const frame = useCurrentFrame();
  const { portrait, pad, width } = useLayout();
  const struckSize = portrait ? 44 : 60;
  const rewriteSize = portrait ? 62 : TYPE.display;
  const maxW = width - 2 * pad;
  const strikeP = interpolate(frame, [14, 23], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLOR.canvas,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT_FALLBACK,
        // gate side-padding on orientation so the 16:9 master keeps its full
        // width — never let the portrait `pad` set the landscape wrap wall
        padding: portrait ? `0 ${pad}px` : 0,
      }}
    >
      <DraftIn delay={2}>
        <div
          style={{
            position: "relative",
            fontSize: struckSize,
            fontWeight: 800,
            color: COLOR.secondary,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}
        >
          YOUR MARKETING AGENCY
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "55%",
              width: `${strikeP * 100}%`,
              height: Math.round(0.12 * struckSize),
              backgroundColor: COLOR.secondary,
            }}
          />
        </div>
      </DraftIn>
      <DraftIn delay={26}>
        <div
          style={{
            fontSize: rewriteSize,
            fontWeight: 800,
            color: COLOR.white,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            marginTop: portrait ? 24 : 28,
            maxWidth: portrait ? maxW : undefined,
            textAlign: "center",
          }}
        >
          YOUR DIGITAL GROWTH PARTNER
        </div>
      </DraftIn>
      <DraftIn delay={44}>
        <div
          style={{
            fontSize: TYPE.bodyLg + 3,
            fontWeight: 400,
            color: COLOR.body,
            marginTop: portrait ? 40 : 44,
            maxWidth: portrait ? maxW : undefined,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          We diagnose the whole growth system before recommending a single channel.
        </div>
      </DraftIn>
    </AbsoluteFill>
  );
};
