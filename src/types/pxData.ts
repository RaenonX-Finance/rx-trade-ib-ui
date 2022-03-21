import {Direction, SecurityIdentifier} from './common';


export type PxDataUniqueIdentifier = string;

export type PxDataContract = {
  identifier: SecurityIdentifier,
  symbol: string,
  minTick: number,
  multiplier: number,
};

export type PxDataBarSmaKey = `sma${number}`;

export type PxDataBar = {
  epochSec: number,
  open: number,
  high: number,
  low: number,
  close: number,
  vwap: number,
  amplitudeHL: number | null,
  amplitudeOC: number | null,
  extremaMin: boolean | null,
  extremaMax: boolean | null,
  ema120: number | null,
  ema120Trend: number | null,
  ema120TrendChange: number | null,
  diff: number,
  diffSma: number | null,
  diffSmaTrend: number | null,
} & {
  [smaKey in PxDataBarSmaKey]?: number
};

export type PxDataExtremaDataKey =
  'diff' |
  'diffSmaRatio' |
  'length';

export type ExtremaDataPoint = {
  [key in PxDataExtremaDataKey]: number
} & {
  epochSec: number,
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
  strength: number,
  strengthCount: number,
  strong: boolean,
};

export type PxDataSocket = {
  uniqueIdentifier: string,
  periodSec: number,
  contract: PxDataContract,
  data: PxDataBar[],
  extrema: PxDataExtrema,
  supportResistance: PxDataSupportResistance[],
  lastDayClose: number | null,
  todayOpen: number | null,
  isMajor: boolean,
  smaPeriods: number[],
};

export type PxData = PxDataSocket & {
  lastUpdated: number,
};

export type PxDataCollection = {
  [identifier: PxDataUniqueIdentifier]: PxData,
};
