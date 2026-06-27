import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLOR, FONT_FALLBACK, OVERLINE_STYLE, TYPE } from "../../explainer/tokens";
import { DraftIn } from "../../explainer/components/DraftIn";
import { TracedWordmark } from "../../explainer/components/TracedWordmark";
import { Seal } from "../../explainer/components/Seal";
import { useLayout } from "../../explainer/layout";
import { StepRow } from "./StepRow";
import { TokenText } from "./TokenText";
import {
  OutroScene as OutroSceneT,
  ReassureScene as ReassureSceneT,
  Scene,
  StepsScene as StepsSceneT,
  TitleScene as TitleSceneT,
} from "./types";

// Title cards use the canon display size (TOKENS §3) — a short hero utterance is
// exactly display's assigned use, so no off-scale invention.
const TITLE_SIZE = TYPE.display;

const surface = (pad: number): React.CSSProperties => ({
  backgroundColor: COLOR.canvas,
  fontFamily: FONT_FALLBACK,
  justifyContent: "center",
  padding: `0 ${pad}px`,
});

const TitleScene: React.FC<TitleSceneT> = ({ overline, title, hook }) => {
  const { pad } = useLayout();
  return (
    <AbsoluteFill style={surface(pad)}>
      <DraftIn delay={6}>
        <TracedWordmark width={156} traceProgress={1} fillOpacity={1} color={COLOR.white} />
      </DraftIn>
      <DraftIn delay={14}>
        <div style={{ ...OVERLINE_STYLE, marginTop: 60 }}>{overline}</div>
      </DraftIn>
      <DraftIn delay={20}>
        <div
          style={{
            fontSize: TITLE_SIZE,
            fontWeight: 800,
            color: COLOR.white,
            lineHeight: 1.14,
            letterSpacing: "-0.02em",
            marginTop: 22,
            maxWidth: 1480,
          }}
        >
          <TokenText text={title} />
        </div>
      </DraftIn>
      <DraftIn delay={28}>
        <div
          style={{
            fontSize: TYPE.bodyLg + 3,
            fontWeight: 500,
            color: COLOR.body,
            lineHeight: 1.35,
            marginTop: 28,
            maxWidth: 1060,
          }}
        >
          <TokenText text={hook} />
        </div>
      </DraftIn>
    </AbsoluteFill>
  );
};

const StepsScene: React.FC<StepsSceneT> = ({
  overline,
  heading,
  numbered = true,
  rows,
  footnote,
}) => {
  const { pad } = useLayout();
  return (
    <AbsoluteFill style={surface(pad)}>
      {overline ? (
        <DraftIn delay={4}>
          <div style={OVERLINE_STYLE}>{overline}</div>
        </DraftIn>
      ) : null}
      <DraftIn delay={9}>
        <div
          style={{
            fontSize: TYPE.h2,
            fontWeight: 800,
            color: COLOR.white,
            letterSpacing: "-0.01em",
            marginTop: 14,
          }}
        >
          {heading}
        </div>
      </DraftIn>
      <div style={{ marginTop: 46, display: "flex", flexDirection: "column", gap: 28 }}>
        {rows.map((r, i) => (
          <StepRow key={i} row={r} index={numbered ? i + 1 : undefined} delay={18 + i * 6} />
        ))}
      </div>
      {footnote ? (
        <DraftIn delay={22 + rows.length * 6}>
          <div
            style={{
              fontSize: TYPE.body,
              color: COLOR.secondary,
              marginTop: 38,
              maxWidth: 1260,
              lineHeight: 1.35,
            }}
          >
            <TokenText text={footnote} />
          </div>
        </DraftIn>
      ) : null}
    </AbsoluteFill>
  );
};

const ReassureScene: React.FC<ReassureSceneT> = ({ overline, heading, points }) => {
  const { pad } = useLayout();
  return (
    <AbsoluteFill style={surface(pad)}>
      {overline ? (
        <DraftIn delay={4}>
          <div style={OVERLINE_STYLE}>{overline}</div>
        </DraftIn>
      ) : null}
      <DraftIn delay={9}>
        <div
          style={{
            fontSize: TYPE.h2,
            fontWeight: 800,
            color: COLOR.white,
            letterSpacing: "-0.01em",
            marginTop: 14,
          }}
        >
          {heading}
        </div>
      </DraftIn>
      <div
        style={{
          marginTop: 52,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 90,
          rowGap: 42,
          maxWidth: 1520,
        }}
      >
        {points.map((p, i) => (
          <DraftIn key={i} delay={18 + i * 6}>
            <div style={{ borderTop: `2px solid ${COLOR.borderStrong}`, paddingTop: 20 }}>
              <div style={{ fontSize: TYPE.h3, fontWeight: 700, color: COLOR.white }}>
                {p.label}
              </div>
              <div
                style={{
                  fontSize: TYPE.body,
                  color: COLOR.body,
                  lineHeight: 1.4,
                  marginTop: 12,
                }}
              >
                <TokenText text={p.detail} />
              </div>
            </div>
          </DraftIn>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const OutroScene: React.FC<OutroSceneT> = ({ cta, support }) => {
  const frame = useCurrentFrame();
  const { edge } = useLayout();
  const sealP = interpolate(frame, [20, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLOR.canvas,
        fontFamily: FONT_FALLBACK,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DraftIn delay={6}>
        <TracedWordmark width={300} traceProgress={1} fillOpacity={1} color={COLOR.white} />
      </DraftIn>
      <DraftIn delay={14}>
        <div
          style={{
            fontSize: TYPE.h2,
            fontWeight: 700,
            color: COLOR.white,
            textAlign: "center",
            lineHeight: 1.25,
            marginTop: 48,
            maxWidth: 1340,
          }}
        >
          <TokenText text={cta} />
        </div>
      </DraftIn>
      {support ? (
        <DraftIn delay={22}>
          <div style={{ fontSize: TYPE.bodyLg, color: COLOR.body, marginTop: 28 }}>
            {support}
          </div>
        </DraftIn>
      ) : null}
      <Seal
        text="toggle.solutions"
        fontSize={30}
        color={COLOR.blue}
        progress={sealP}
        mode="draw"
        style={{ position: "absolute", bottom: edge }}
      />
    </AbsoluteFill>
  );
};

/** Dispatch a scene config to its component. */
export const renderScene = (scene: Scene): React.ReactNode => {
  switch (scene.kind) {
    case "title":
      return <TitleScene {...scene} />;
    case "steps":
      return <StepsScene {...scene} />;
    case "reassure":
      return <ReassureScene {...scene} />;
    case "outro":
      return <OutroScene {...scene} />;
    default: {
      // exhaustiveness guard — a new scene kind must be handled, not silently
      // render blank while still consuming its Sequence duration.
      const _exhaustive: never = scene;
      throw new Error(`unhandled scene kind: ${(_exhaustive as Scene).kind}`);
    }
  }
};
