import {SecurityIdentifier} from './common';


export type PxDataUniqueIdentifier = string;

export type PxDataBar = {
  epochSec: number,
  open: number,
  high: number,
  low: number,
  close: number,
  vwap: number,
  amplitudeHL: number,
  amplitudeOC: number,
  ema120: number,
};

export type PxDataContract = {
  identifier: SecurityIdentifier,
  symbol: string,
  minTick: number,
  multiplier: number,
};

export type PxDataSupportResistance = {
  level: number,
  type: {
    window: boolean,
    fractal: boolean,
  },
};

export type PxData = {
  uniqueIdentifier: string,
  periodSec: number,
  contract: PxDataContract,
  data: PxDataBar[],
  supportResistance: PxDataSupportResistance[],
  lastDayClose: number | null,
};

export type PxDataCollection = {
  [identifier: PxDataUniqueIdentifier]: PxData,
};
