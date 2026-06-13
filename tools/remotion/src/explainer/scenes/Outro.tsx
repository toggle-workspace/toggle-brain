import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { TracedWordmark } from "../components/TracedWordmark";
import { Seal } from "../components/Seal";
import { useLayout } from "../layout";
import { COLOR, EASE, FONT_FALLBACK, TYPE } from "../tokens";

/**
 * The 3s-class outro bumper (MOTION.md §3): loop-form already on screen
 * (static) → wordmark + contact line fade up together (400ms) → the
 * [ toggle.solutions ] seal draws its brackets (600ms) → hold ~1.5s.
 * The loop-form is the canonical closing composite (the feedback loop);
 * the filed asset is the DISCLOSED placeholder — swap in loop-form.svg
 * once a designer traces the Sunway Thank-You artwork (SIGNATURE-DEVICES A2).
 * 16:9: the seal anchors the canvas base (§C3). 9:16: it joins the centered
 * closing lockup — a bottom-anchored URL seal lands under the caption/CTA in a
 * vertical feed, so the centered lockup is the medium-correct read.
 */
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { portrait, edge } = useLayout();
  const eased = {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE,
  } as const;
  const riseP = interpolate(frame, [10, 22], [0, 1], eased);
  const sealP = interpolate(frame, [24, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLOR.canvas,
        fontFamily: FONT_FALLBACK,
        alignItems: "center",
        // portrait: center the closing group in the tall canvas, seal at base
        justifyContent: portrait ? "center" : "flex-start",
      }}
    >
      <Img
        src={staticFile("loop-form-PLACEHOLDER.svg")}
        style={{ width: portrait ? 340 : 400, marginTop: portrait ? 0 : 112 }}
      />
      <div
        style={{
          opacity: riseP,
          transform: `translateY(${12 * (1 - riseP)}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TracedWordmark
          width={portrait ? 440 : 460}
          traceProgress={1}
          fillOpacity={1}
          color={COLOR.white}
          style={{ marginTop: portrait ? 80 : 96 }}
        />
        <div
          style={{
            fontSize: TYPE.caption,
            fontWeight: 500,
            color: COLOR.body,
            marginTop: portrait ? 72 : 96,
          }}
        >
          hello@toggle.solutions
        </div>
      </div>
      <Seal
        text="toggle.solutions"
        fontSize={30}
        color={COLOR.blue}
        progress={sealP}
        mode="draw"
        style={portrait ? { marginTop: 56 } : { position: "absolute", bottom: edge }}
      />
    </AbsoluteFill>
  );
};
