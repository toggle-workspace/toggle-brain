import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { ExplainerVideo, TOTAL_DURATION } from "./explainer/ExplainerVideo";
import { OnboardingVideo, totalFrames } from "./onboarding/kit/OnboardingVideo";
import { ONBOARDING_VIDEOS } from "./onboarding/registry";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ToggleExplainer"
        component={ExplainerVideo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ToggleExplainerVertical"
        component={ExplainerVideo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* Client-onboarding series — one composition per video, all driven by the
          shared OnboardingVideo engine + per-video configs in onboarding/registry. */}
      {ONBOARDING_VIDEOS.map((v) => (
        <Composition
          key={v.id}
          id={v.id}
          component={OnboardingVideo}
          durationInFrames={totalFrames(v.scenes)}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ scenes: v.scenes }}
        />
      ))}
    </>
  );
};
