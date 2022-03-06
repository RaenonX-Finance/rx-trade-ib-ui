export type CdfData = {
  val: number,
  pct: number,
};

export const toCdfData = (data: number[], reverse: boolean): CdfData[] => (
  [...data]
    .sort((a, b) => reverse ? b - a : a - b)
    .map((item, idx) => ({val: item, pct: (1 - idx / data.length) * 100}))
);
