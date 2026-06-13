import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { DraftIn } from "../components/DraftIn";
import { useLayout } from "../layout";
import { COLOR, EASE, FONT_FALLBACK, OVERLINE_STYLE, TYPE } from "../tokens";

/**
 * Pillar 1: diagnosis before prescription. A 2px blueprint rule draws
 * left-to-right (the lower-third gesture from MOTION.md §3), the copy
 * rises behind it.
 */
export const Diagnosis: React.FC = () => {
  const frame = useCurrentFrame();
  const { portrait, pad, width } = useLayout();
  const ruleP = interpolate(frame, [4, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLOR.canvas,
        justifyContent: "center",
        fontFamily: FONT_FALLBACK,
        paddingLeft: pad,
        paddingRight: portrait ? pad : 0,
      }}
    >
      <div
        style={{
          width: 96,
          height: 2,
          backgroundColor: COLOR.blue,
          transform: `scaleX(${ruleP})`,
          transformOrigin: "left",
          marginBottom: 36,
        }}
      />
      <DraftIn delay={10}>
        <div style={OVERLINE_STYLE}>How we work</div>
      </DraftIn>
      <DraftIn delay={16}>
        <div
          style={{
            fontSize: TYPE.h1,
            fontWeight: 800,
            color: COLOR.white,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            marginTop: 24,
          }}
        >
          Diagnosis before prescription.
        </div>
      </DraftIn>
      <DraftIn delay={30}>
        <div
          style={{
            fontSize: TYPE.bodyLg + 1,
            fontWeight: 400,
            color: COLOR.body,
            lineHeight: 1.5,
            maxWidth: portrait ? width - 2 * pad : 960,
            marginTop: 32,
          }}
        >
          Before a ringgit goes to any channel, we benchmark the whole system —
          traffic, messaging, conversion, sales follow-up, tracking — and fix
          what is actually limiting growth.
        </div>
      </DraftIn>
    </AbsoluteFill>
  );
};
