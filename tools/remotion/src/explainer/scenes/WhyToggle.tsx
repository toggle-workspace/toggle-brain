import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { DraftIn } from "../components/DraftIn";
import { useLayout } from "../layout";
import { COLOR, EASE, FONT_FALLBACK, OVERLINE_STYLE, TYPE } from "../tokens";

// brain/positioning/differentiators.md, compressed to the three the video
// has room to land.
const ROWS: { title: string; sub: string }[] = [
  {
    title: "Senior operators only",
    sub: "The person who builds the strategy runs the account — no junior account-manager layer.",
  },
  {
    title: "One partner, one engine",
    sub: "Acquisition, conversion, and retention on the same team, same data, same accountability.",
  },
  {
    // process.md verbatim — "long-term" is load-bearing: the rate card is
    // monthly retainers with a 3-month minimum (SIGNATURE-DEVICES B3 note),
    // so an absolute "no lock-ins" claim would detonate at contract review.
    title: "No long-term lock-ins",
    sub: "We retain clients through results, not contracts.",
  },
];

/** Each row: a 2px rule draws, the copy rises behind it — the lower-third gesture. */
export const WhyToggle: React.FC = () => {
  const frame = useCurrentFrame();
  const { portrait, pad, width } = useLayout();

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
        <div style={{ ...OVERLINE_STYLE, marginBottom: 56 }}>Why Toggle</div>
      </DraftIn>
      {ROWS.map((row, i) => {
        const delay = 10 + i * 22;
        const ruleP = interpolate(frame, [delay, delay + 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE,
        });
        return (
          <div key={row.title} style={{ marginBottom: 58 }}>
            <div
              style={{
                width: 72,
                height: 2,
                backgroundColor: COLOR.blue,
                transform: `scaleX(${ruleP})`,
                transformOrigin: "left",
                marginBottom: 20,
              }}
            />
            <DraftIn delay={delay + 3}>
              <div
                style={{
                  fontSize: TYPE.h3,
                  fontWeight: 700,
                  color: COLOR.white,
                  lineHeight: 1.25,
                }}
              >
                {row.title}
              </div>
            </DraftIn>
            <DraftIn delay={delay + 8}>
              <div
                style={{
                  fontSize: TYPE.bodyLg + 1,
                  fontWeight: 400,
                  color: COLOR.body,
                  lineHeight: 1.5,
                  marginTop: 10,
                  maxWidth: portrait ? width - 2 * pad : 1100,
                }}
              >
                {row.sub}
              </div>
            </DraftIn>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
