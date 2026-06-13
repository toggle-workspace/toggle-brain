import React from "react";
import { AbsoluteFill, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { STEP_FORM } from "../brand/isoForms";
import { TracedForm } from "../components/TracedForm";
import { TracedWordmark } from "../components/TracedWordmark";
import { Seal } from "../components/Seal";
import { useLayout } from "../layout";
import { COLOR, EASE } from "../tokens";

/**
 * The 5s intro bumper — "the line draws the firm" (MOTION.md §3, followed
 * frame-for-frame at 30fps):
 *   0–12    black-to-navy settle
 *   12–78   step-form line-traces, back-to-front (mass B then A), constant
 *           speed (the linear phase — like a pen)
 *   78–90   the one filled face fades in
 *   90–117  wordmark traces left-to-right (the decelerate phase), fill snaps
 *           117–122
 *   134–147 tagline seal types on in the final 500ms, finishing inside the scene
 *
 * Step-form anchored right-third in 16:9, CENTERED in 9:16 (MOTION.md §3 crop
 * rule). 16:9: tagline seal anchors the bottom-left corner per the cover
 * placement canon (SIGNATURE-DEVICES §C3). 9:16: the seal joins the centered
 * stack as the wordmark+tagline lockup (§C2) — corner anchors collide with the
 * platform caption/handle band in a vertical feed, so the lockup is the
 * medium-correct read.
 */
export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { portrait } = useLayout();
  const lin = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const eased = { ...lin, easing: EASE };

  const settleP = interpolate(frame, [0, 12], [0, 1], eased);
  const bg = interpolateColors(settleP, [0, 1], ["#000000", COLOR.canvas]);
  const trace = interpolate(frame, [12, 78], [0, 1], lin); // constant speed — linear
  const fill = interpolate(frame, [78, 90], [0, 1], eased);
  const wmTrace = interpolate(frame, [90, 117], [0, 1], eased); // decelerate phase
  const wmFill = interpolate(frame, [117, 122], [0, 1], lin);
  const sealP = interpolate(frame, [134, 147], [0, 1], lin);

  if (portrait) {
    return (
      <AbsoluteFill
        style={{ backgroundColor: bg, justifyContent: "center", alignItems: "center" }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <TracedForm
            masses={STEP_FORM.masses}
            traceOrder={[1, 0]}
            viewBox={STEP_FORM.viewBox}
            width={540}
            traceProgress={trace}
            fillOpacity={fill}
          />
          <TracedWordmark
            width={440}
            traceProgress={wmTrace}
            fillOpacity={wmFill}
            color={COLOR.white}
            style={{ marginTop: 96 }}
          />
          <Seal
            text="Your Digital Growth Partner"
            fontSize={26}
            color={COLOR.blue}
            progress={sealP}
            mode="type"
            style={{ marginTop: 48 }}
          />
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: bg }}>
      <div
        style={{
          position: "absolute",
          left: 1190,
          top: 104,
          width: 620,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TracedForm
          masses={STEP_FORM.masses}
          traceOrder={[1, 0]}
          viewBox={STEP_FORM.viewBox}
          width={620}
          traceProgress={trace}
          fillOpacity={fill}
        />
        <TracedWordmark
          width={460}
          traceProgress={wmTrace}
          fillOpacity={wmFill}
          color={COLOR.white}
          style={{ marginTop: 96 }}
        />
      </div>
      <Seal
        text="Your Digital Growth Partner"
        fontSize={26}
        color={COLOR.blue}
        progress={sealP}
        mode="type"
        style={{ position: "absolute", left: 96, bottom: 96 }}
      />
    </AbsoluteFill>
  );
};
