import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/InterTight";
import { Intro } from "./scenes/Intro";
import { Manifesto } from "./scenes/Manifesto";
import { Diagnosis } from "./scenes/Diagnosis";
import { Services } from "./scenes/Services";
import { Proof } from "./scenes/Proof";
import { WhyToggle } from "./scenes/WhyToggle";
import { Outro } from "./scenes/Outro";
import { COLOR } from "./tokens";

loadFont("normal", { weights: ["400", "500", "700", "800"], subsets: ["latin"] });

const WIPE_F = 9; // 300ms — MOTION.md §3 transition wipe

// Scene durations are sized to hold each scene's voiceover (public/vo/*.m4a)
// plus a lead-in and tail. The VO is a SCRATCH track (macOS `say`, Daniel) —
// swap in a pro/neural read as a drop-in replacement; timing won't change.
// `voLead` = frames after the scene starts before the VO speaks (clears the wipe).
type SceneDef = {
  component: React.FC;
  duration: number;
  name: string;
  vo?: string;
  voLead?: number;
};

const SCENES: SceneDef[] = [
  { component: Intro, duration: 150, name: "intro-bumper" },
  { component: Manifesto, duration: 195, name: "manifesto", vo: "vo/manifesto.m4a", voLead: 12 },
  { component: Diagnosis, duration: 175, name: "diagnosis", vo: "vo/diagnosis.m4a", voLead: 12 },
  { component: Services, duration: 240, name: "services", vo: "vo/services.m4a", voLead: 12 },
  { component: Proof, duration: 240, name: "proof", vo: "vo/proof.m4a", voLead: 12 },
  { component: WhyToggle, duration: 220, name: "why-toggle", vo: "vo/whytoggle.m4a", voLead: 12 },
  { component: Outro, duration: 150, name: "outro-bumper", vo: "vo/outro.m4a", voLead: 42 },
];

export const TOTAL_DURATION = SCENES.reduce((a, s) => a + s.duration, 0);

/**
 * The ONE transition (MOTION.md §3): a vertical 2px blue rule travels
 * left→right at linear speed, revealing the next shot behind it — the
 * drafting straightedge. No cross-dissolves.
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
            // pin the rule to the moving clip edge, not the container edge
            right: `${(1 - p) * 100}%`,
            width: 2,
            backgroundColor: COLOR.blue,
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

export const ExplainerVideo: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: COLOR.canvas }}>
      {SCENES.map(({ component: Scene, duration, name, vo, voLead }, i) => {
        const start = from;
        from += duration;
        const isLast = i === SCENES.length - 1;
        return (
          <Sequence
            key={i}
            from={start}
            // extend under the next scene's wipe so the rule reveals it live
            durationInFrames={duration + (isLast ? 0 : WIPE_F)}
            name={name}
          >
            {i === 0 ? (
              <Scene />
            ) : (
              <WipeIn>
                <Scene />
              </WipeIn>
            )}
            {vo ? (
              <Sequence from={voLead ?? 12} name={`${name}-vo`}>
                <Audio src={staticFile(vo)} />
              </Sequence>
            ) : null}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
