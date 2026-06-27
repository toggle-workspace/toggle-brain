import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TracedWordmark } from "../components/TracedWordmark";
import { TracedLoopForm } from "../components/TracedLoopForm";
import { Seal } from "../components/Seal";
import { useLayout } from "../layout";
import { COLOR, EASE, FONT_FALLBACK, TYPE } from "../tokens";

/**
 * The outro bumper (MOTION.md §3, retimed to 150f / 5s so the close is a real
 * beat, not a hard cut):
 *   0–30    loop-form draws in (constant-speed trace), block face fades 30–38
 *   34–46   wordmark + contact line rise (400ms)
 *   48–66   the tagline seal draws its brackets (600ms)
 *   66–150  hold (the closing VO, wired in ExplainerVideo, lands here)
 * The loop-form is the canonical closing composite (the feedback loop), drawn
 * from the DISCLOSED placeholder geometry (TracedLoopForm) until a designer
 * files the real loop-form.svg (SIGNATURE-DEVICES A2).
 * The seal carries the TAGLINE (not the URL): the wordmark is the brand, the
 * contact line the action, the seal the positioning — three distinct jobs, no
 * repeated "toggle.solutions" string — and it bookends the intro tagline seal.
 * 16:9: the seal anchors the canvas base (§C3). 9:16: it joins the centered
 * closing lockup — a bottom-anchored seal lands under the caption/CTA in a
 * vertical feed, so the centered lockup is the medium-correct read.
 */
export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { portrait, edge } = useLayout();
  const lin = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const eased = { ...lin, easing: EASE };

  const loopTrace = interpolate(frame, [0, 30], [0, 1], lin); // constant speed — linear pen
  const loopFill = interpolate(frame, [30, 38], [0, 1], eased);
  const riseP = interpolate(frame, [34, 46], [0, 1], eased);
  const sealP = interpolate(frame, [48, 66], [0, 1], lin);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLOR.canvas,
        fontFamily: FONT_FALLBACK,
        alignItems: "center",
        // portrait: center the closing group in the tall canvas
        justifyContent: portrait ? "center" : "flex-start",
      }}
    >
      <TracedLoopForm
        width={portrait ? 340 : 400}
        traceProgress={loopTrace}
        fillOpacity={loopFill}
        style={{ marginTop: portrait ? 0 : 112 }}
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
        text="Your Digital Growth Partner"
        fontSize={28}
        color={COLOR.blue}
        progress={sealP}
        mode="draw"
        style={portrait ? { marginTop: 56 } : { position: "absolute", bottom: edge }}
      />
    </AbsoluteFill>
  );
};
