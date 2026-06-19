import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/InterTight";
import { COLOR, f } from "../../explainer/tokens";
import { Timed } from "./types";
import { renderScene } from "./scenes";

// weight 600 is the step-row lead; load it alongside the rest so it's exact.
loadFont("normal", { weights: ["400", "500", "600", "700", "800"], subsets: ["latin"] });

const WIPE_F = 9; // 300ms straightedge wipe — MOTION.md §3 (matches the explainer)

/** Total frames for a scene list — register this as durationInFrames. */
export const totalFrames = (scenes: readonly Timed[]): number =>
  scenes.reduce((a, s) => a + f(s.ms), 0);

/**
 * The ONE transition (MOTION.md §3): a vertical 2px blue rule travels
 * left→right, revealing the next scene behind it — the drafting straightedge.
 * No cross-dissolves. Lifted from ExplainerVideo so the whole library shares
 * one transition.
 */
const WipeIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, WIPE_F], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ clipPath: `inset(0 ${(1 - p) * 100}% 0 0)` }}>
      {children}
      {p < 1 ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: `${(1 - p) * 100}%`,
            width: 2,
            backgroundColor: COLOR.blue,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

/**
 * The onboarding-series engine: renders a scene list with the straightedge wipe
 * between scenes. Driven entirely by props (defaultProps in Root.tsx), so every
 * video in the series is one config feeding this one component.
 */
export const OnboardingVideo: React.FC<{ scenes: readonly Timed[] }> = ({ scenes }) => {
  let from = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: COLOR.canvas }}>
      {scenes.map(({ scene, ms }, i) => {
        const start = from;
        const dur = f(ms);
        from += dur;
        const isLast = i === scenes.length - 1;
        return (
          <Sequence
            key={i}
            from={start}
            // extend under the next scene's wipe so the rule reveals it live
            durationInFrames={dur + (isLast ? 0 : WIPE_F)}
            name={`${i}-${scene.kind}`}
          >
            {i === 0 ? renderScene(scene) : <WipeIn>{renderScene(scene)}</WipeIn>}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
