import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CHANNEL_STACK_FORM } from "../brand/isoForms";
import { TracedForm } from "../components/TracedForm";
import { DraftIn } from "../components/DraftIn";
import { useLayout } from "../layout";
import { COLOR, FONT_FALLBACK, OVERLINE_STYLE, TYPE } from "../tokens";

// Grouping mirrors the core pitch verbatim: "We integrate performance, tech,
// and creative into a single engine" (brain/positioning/agency-profile.md).
// All twelve names from brain/services/.
const COLUMNS: { header: string; items: string[] }[] = [
  {
    header: "Performance",
    items: [
      "Performance Marketing",
      "Search Engine Optimisation",
      "Conversion Optimisation",
      "Consumer Retention",
    ],
  },
  {
    header: "Tech",
    items: [
      "Web Development",
      "Online Store Management",
      "Business Intelligence",
      "Reporting & Analysis",
    ],
  },
  {
    header: "Creative",
    items: ["Creative Production", "Content Marketing", "Branding", "Out Of Home"],
  },
];

/**
 * The service stack. Channel-stack-form is the canonical composite for
 * "the mix: channels, budget split, service stack" (SIGNATURE-DEVICES A2) —
 * a threshold composition here, not a data encoding.
 */
export const Services: React.FC = () => {
  const frame = useCurrentFrame();
  const { portrait, pad } = useLayout();
  const lin = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const trace = interpolate(frame, [4, 40], [0, 1], lin);
  const fill = interpolate(frame, [40, 52], [0, 1], lin);

  if (portrait) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: COLOR.canvas,
          fontFamily: FONT_FALLBACK,
          justifyContent: "center",
          padding: `0 ${pad}px`,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 36 }}>
          <div style={{ flex: 1 }}>
            <DraftIn delay={6}>
              <div style={OVERLINE_STYLE}>What we run</div>
            </DraftIn>
            <DraftIn delay={12}>
              <div
                style={{
                  fontSize: TYPE.h2,
                  fontWeight: 800,
                  color: COLOR.white,
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  marginTop: 16,
                }}
              >
                Performance, tech, and creative — one engine.
              </div>
            </DraftIn>
          </div>
          <TracedForm
            masses={CHANNEL_STACK_FORM.masses}
            traceOrder={[0]}
            viewBox={CHANNEL_STACK_FORM.viewBox}
            width={120}
            traceProgress={trace}
            fillOpacity={fill}
            style={{ flexShrink: 0 }}
          />
        </div>
        <div style={{ marginTop: 64, display: "flex", flexDirection: "column", gap: 40 }}>
          {COLUMNS.map((col, c) => (
            <div key={col.header}>
              <DraftIn delay={28 + c * 6}>
                <div
                  style={{
                    ...OVERLINE_STYLE,
                    paddingBottom: 12,
                    borderBottom: `2px solid ${COLOR.borderStrong}`,
                  }}
                >
                  {col.header}
                </div>
              </DraftIn>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  columnGap: 32,
                  rowGap: 18,
                  marginTop: 22,
                }}
              >
                {col.items.map((item, i) => (
                  <DraftIn key={item} delay={36 + c * 6 + i * 3}>
                    <div
                      style={{
                        fontSize: TYPE.bodyLg,
                        fontWeight: 500,
                        color: COLOR.white,
                      }}
                    >
                      {item}
                    </div>
                  </DraftIn>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill
      style={{ backgroundColor: COLOR.canvas, fontFamily: FONT_FALLBACK }}
    >
      <TracedForm
        masses={CHANNEL_STACK_FORM.masses}
        traceOrder={[0]}
        viewBox={CHANNEL_STACK_FORM.viewBox}
        width={250}
        traceProgress={trace}
        fillOpacity={fill}
        style={{ position: "absolute", left: 220, top: 152 }}
      />
      <div style={{ position: "absolute", left: 640, top: 188, width: 1140 }}>
        <DraftIn delay={6}>
          <div style={OVERLINE_STYLE}>What we run</div>
        </DraftIn>
        <DraftIn delay={12}>
          <div
            style={{
              fontSize: TYPE.h1,
              fontWeight: 800,
              color: COLOR.white,
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              marginTop: 18,
              maxWidth: 1000,
            }}
          >
            Performance, tech, and creative — one engine.
          </div>
        </DraftIn>
        <div style={{ display: "flex", gap: 56, marginTop: 64 }}>
          {COLUMNS.map((col, c) => (
            <div key={col.header} style={{ width: 340 }}>
              <DraftIn delay={28 + c * 6}>
                <div
                  style={{
                    ...OVERLINE_STYLE,
                    paddingBottom: 14,
                    borderBottom: `2px solid ${COLOR.borderStrong}`,
                  }}
                >
                  {col.header}
                </div>
              </DraftIn>
              {col.items.map((item, i) => (
                <DraftIn key={item} delay={36 + c * 6 + i * 3}>
                  <div
                    style={{
                      fontSize: TYPE.bodyLg + 1,
                      fontWeight: 500,
                      color: COLOR.white,
                      marginTop: 26,
                    }}
                  >
                    {item}
                  </div>
                </DraftIn>
              ))}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
