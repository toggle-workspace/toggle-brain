export type PolyPoints = readonly (readonly number[])[];

export const polyToD = (points: PolyPoints): string =>
  "M " + points.map(([x, y]) => `${x} ${y}`).join(" L ") + " Z";
