import React from "react";
import { COLOR, FONT_FALLBACK, TYPE } from "../../explainer/tokens";
import { MenuPath } from "./types";
import { TokenText } from "./TokenText";

/**
 * A platform menu path rendered as the drafting straightedge: a 2px blueprint
 * rule on the left, segments in blue separated by ›. NOT a [ bracket ] seal —
 * SIGNATURE-DEVICES §C1 forbids seals around paths (> 28 chars, not an
 * utterance). This is the wayfinding device, distinct from the brand seal.
 */
export const PathChip: React.FC<{ path: MenuPath; style?: React.CSSProperties }> = ({
  path,
  style,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        rowGap: 4,
        columnGap: 9,
        paddingLeft: 16,
        borderLeft: `2px solid ${COLOR.borderStrong}`,
        ...style,
      }}
    >
      {path.map((seg, i) => (
        <React.Fragment key={i}>
          {i > 0 ? (
            <span style={{ color: COLOR.secondary, fontSize: TYPE.body }}>›</span>
          ) : null}
          <span
            style={{
              fontFamily: FONT_FALLBACK,
              fontSize: TYPE.body,
              fontWeight: 500,
              // white glyphs; the gray straightedge rule + › give the path its
              // identity. Blue stays a fill/line, never body glyph color (§4).
              color: COLOR.white,
              letterSpacing: "0.01em",
            }}
          >
            <TokenText text={seg} />
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};
