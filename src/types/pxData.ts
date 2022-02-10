export type PxDataBar = {
  epochSec: number,
  amplitude: number,
  open: number,
  high: number,
  low: number,
  close: number,
  vwap: number,
};

export type PxDataContract = {
  symbol: string,
  minTick: number,
};

export type PxDataSupportResistance = {
  level: number,
  diffCurrent: number,
  type: {
    window: boolean,
    fractal: boolean,
  },
};

export type PxData = {
  uniqueIdentifier: number,
  contract: PxDataContract,
  data: PxDataBar[],
  supportResistance: PxDataSupportResistance[],
};

export type PxDataCollection = {
  [identifier: number]: PxData,
};
