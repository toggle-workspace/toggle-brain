import React from "react";
import { COLOR, TYPE } from "../../explainer/tokens";
import { DraftIn } from "../../explainer/components/DraftIn";
import { StepRow as StepRowT } from "./types";
import { PathChip } from "./PathChip";
import { TokenText } from "./TokenText";

/**
 * One row of a steps list: a numbered index (or a blueprint-tick bullet when
 * unnumbered), the imperative lead, an optional menu path, and an optional note.
 * Reveals via the one draft-in (MOTION.md §2) at `delay` frames into the scene.
 */
export const StepRow: React.FC<{
  row: StepRowT;
  index?: number; // omit → tick bullet (statement rows)
  delay: number;
}> = ({ row, index, delay }) => {
  return (
    <DraftIn delay={delay}>
      <div style={{ display: "flex", gap: 24, alignItems: "baseline" }}>
        <div
          style={{
            minWidth: 46,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: index === undefined ? "flex-start" : "flex-end",
          }}
        >
          {index === undefined ? (
            // blueprint tick — a single drawn rule, the straightedge in miniature
            <div style={{ width: 22, height: 2, backgroundColor: COLOR.blue }} />
          ) : (
            <div
              style={{
                fontSize: TYPE.h3,
                fontWeight: 800,
                // ink, not blue — accents are fills/lines, never glyph color at
                // body size (BRAND-IDENTITY §4). Blue is reserved for the overline.
                color: COLOR.white,
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
              }}
            >
              {String(index).padStart(2, "0")}
            </div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: TYPE.bodyLg + 3,
              fontWeight: 600,
              color: COLOR.white,
              lineHeight: 1.25,
            }}
          >
            <TokenText text={row.lead} />
          </div>
          {row.path ? <PathChip path={row.path} style={{ marginTop: 12 }} /> : null}
          {row.note ? (
            <div
              style={{
                fontSize: TYPE.body,
                color: COLOR.secondary,
                lineHeight: 1.3,
                marginTop: 10,
                maxWidth: 1180,
              }}
            >
              <TokenText text={row.note} />
            </div>
          ) : null}
        </div>
      </div>
    </DraftIn>
  );
};
