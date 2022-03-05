import {SecurityIdentifier} from './common';


export type PxDataUniqueIdentifier = string;

export type PxDataContract = {
  identifier: SecurityIdentifier,
  symbol: string,
  minTick: number,
  multiplier: number,
};

export type PxDataBar = {
  epochSec: number,
  open: number,
  high: number,
  low: number,
  close: number,
  vwap: number,
  amplitudeHL: number,
  amplitudeOC: number,
  extrema: {
    min: boolean,
    max: boolean,
  },
  ema120: number,
};

export type PxDataExtremaData = {
  pos: number[],
  neg: number[],
};

export type PxDataExtremaCurrentData = {
  val: number,
  pct: number,
};

export type PxDataExtremaCurrentStats = {
  swingDiff: PxDataExtremaCurrentData,
  swingDiffAmplRatio: PxDataExtremaCurrentData,
  duration: PxDataExtremaCurrentData,
};

export type PxDataExtrema = {
  diff: PxDataExtremaData,
  diffAmplRatio: PxDataExtremaData,
  length: PxDataExtremaData,
  current: PxDataExtremaCurrentStats,
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
  extrema: PxDataExtrema,
  supportResistance: PxDataSupportResistance[],
  lastDayClose: number | null,
};

export type PxDataCollection = {
  [identifier: PxDataUniqueIdentifier]: PxData,
};
