export type PxDataBar = {
  epochSec: number,
  amplitude: number,
  open: number,
  high: number,
  low: number,
  close: number,
};

export type SupportResistance = {
  level: number,
  diffCurrent: number,
  type: {
    window: boolean,
    fractal: boolean,
  },
};

export type PxData = {
  symbol: string,
  data: PxDataBar[],
  supportResistance: SupportResistance[],
};

export type PxDataCollection = {
  [symbol: string]: PxData,
};
