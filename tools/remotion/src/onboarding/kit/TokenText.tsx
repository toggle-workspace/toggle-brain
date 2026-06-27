import React from "react";
import { COLOR } from "../../explainer/tokens";

/**
 * Renders a string, styling any `{{TOKEN}}` span as a visible placeholder
 * (blue-text + dashed underline). These are real identifiers we must never
 * invent — they're filled per-client before the master is sent. The dashed
 * treatment is the honest signal that this render is a template, not a final.
 */
const TOKEN_RE = /(\{\{[^}]+\}\})/g;

export const TokenText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(TOKEN_RE);
  return (
    <>
      {parts.map((p, i) =>
        /^\{\{[^}]+\}\}$/.test(p) ? (
          <span
            key={i}
            style={{
              // Placeholder field: ink glyph (currentColor) on a faint blue FILL.
              // Accents are fills, never glyph color (BRAND-IDENTITY §4) — so the
              // token reads as a highlighted "fill-me" field, not blue body text.
              // These are replaced in per-client finals, so the highlight only ever
              // marks an unresolved template master.
              backgroundColor: "rgba(74, 123, 247, 0.18)",
              borderRadius: 4,
              padding: "0.02em 0.2em",
              whiteSpace: "nowrap",
            }}
          >
            {p}
          </span>
        ) : (
          <React.Fragment key={i}>{p}</React.Fragment>
        ),
      )}
    </>
  );
};
