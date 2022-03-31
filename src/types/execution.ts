import {ExecutionSide, SecurityIdentifier} from './common';


export type ExecutionGroup = {
  epochSec: number,
  side: ExecutionSide,
  quantity: number,
  avgPx: number,
  realizedPnL: number | null,
  realizedPnLSum: number | null,
  profit: number | null,
  loss: number | null,
  winRate: number | null,
  profitLong: number | null,
  lossLong: number | null,
  winRateLong: number | null,
  profitShort: number | null,
  lossShort: number | null,
  winRateShort: number | null,
  avgPnLProfit: number | null,
  avgPnLLoss: number | null,
  avgPnLRrRatio: number | null,
  avgPnLEwr: number | null,
  pxSide: number | null,
  pxSideSum: number | null,
  pxSideDiffSmaRatio: number | null,
  avgPxProfit: number | null,
  avgPxLoss: number | null,
  avgPxRrRatio: number | null,
  avgPxEwr: number | null,
  totalProfit: number | null,
  totalLoss: number | null,
};

export type Execution = Record<SecurityIdentifier, ExecutionGroup[]>;
