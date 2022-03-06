import {Direction, SecurityIdentifier} from './common';


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
  extremaMin: boolean,
  extremaMax: boolean,
  ema120: number,
};

export type PxDataExtremaDataKey =
  'diff' |
  'amplRatio' |
  'length';

export type ExtremaDataPoint = {
  [key in PxDataExtremaDataKey]: number
} & {
  px: number,
  direction: Direction,
};

export type PxDataExtremaCurrentData = {
  val: number,
  pct: number,
};

export type PxDataExtremaCurrentStats = {[key in PxDataExtremaDataKey]: PxDataExtremaCurrentData};

export type PxDataExtrema = {
  points: ExtremaDataPoint[],
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
