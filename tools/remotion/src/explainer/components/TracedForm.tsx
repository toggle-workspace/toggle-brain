import React, { useMemo } from "react";
import { COLOR } from "../tokens";
import { polyToD, PolyPoints } from "../brand/geometry";

type Poly = { readonly points: PolyPoints; readonly filled: boolean };
type Seg = { x1: number; y1: number; x2: number; y2: number; len: number };

/**
 * Line-traces an isometric form at constant pen speed (MOTION.md: "strokes draw
 * at constant speed — like a pen"). Masses are traced in the order given
 * (back-to-front per the intro-bumper spec). Faces are exploded into UNIQUE
 * edges first — A1: "one line per visible edge, no doubled paths" — so shared
 * edges are stroked once and the pen never retraces. The single filled face
 * fades in separately via fillOpacity — strokes first, fill last.
 */
export const TracedForm: React.FC<{
  masses: readonly (readonly Poly[])[];
  traceOrder: readonly number[];
  viewBox: string;
  width: number;
  traceProgress: number;
  fillOpacity: number;
  style?: React.CSSProperties;
}> = ({ masses, traceOrder, viewBox, width, traceProgress, fillOpacity, style }) => {
  const vbWidth = Number(viewBox.split(" ")[2]);
  const strokeW = (2 * vbWidth) / width; // 2px on screen, in viewBox units

  const { segs, fills } = useMemo(() => {
    const seen = new Set<string>();
    const uniqueSegs: Seg[] = [];
    const fillDs: string[] = [];
    traceOrder.forEach((mi) => {
      masses[mi].forEach((p) => {
        if (p.filled) {
          fillDs.push(polyToD(p.points));
        }
        const pts = p.points;
        for (let i = 0; i < pts.length; i++) {
          const [x1, y1] = pts[i];
          const [x2, y2] = pts[(i + 1) % pts.length];
          const a = `${x1.toFixed(2)},${y1.toFixed(2)}`;
          const b = `${x2.toFixed(2)},${y2.toFixed(2)}`;
          const key = a < b ? `${a}|${b}` : `${b}|${a}`;
          if (seen.has(key)) {
            continue;
          }
          seen.add(key);
          uniqueSegs.push({ x1, y1, x2, y2, len: Math.hypot(x2 - x1, y2 - y1) });
        }
      });
    });
    return { segs: uniqueSegs, fills: fillDs };
  }, [masses, traceOrder]);

  const total = segs.reduce((a, s) => a + s.len, 0);
  const drawn = traceProgress * total;

  let acc = 0;
  return (
    <svg viewBox={viewBox} width={width} style={style} fill="none">
      {fills.map((d, i) => (
        <path key={`f${i}`} d={d} fill={COLOR.blue} opacity={fillOpacity} />
      ))}
      {segs.map((s, i) => {
        const start = acc;
        acc += s.len;
        const local = s.len === 0 ? 1 : Math.max(0, Math.min(1, (drawn - start) / s.len));
        return (
          <line
            key={i}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke={COLOR.blue}
            strokeWidth={strokeW}
            strokeLinecap="butt"
            strokeDasharray={s.len}
            strokeDashoffset={s.len * (1 - local)}
          />
        );
      })}
    </svg>
  );
};
