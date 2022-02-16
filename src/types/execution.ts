import {ExecutionSide, SecurityIdentifier} from './common';


export type ExecutionGroup = {
  epochSec: number,
  side: ExecutionSide,
  quantity: number,
  avgPx: number,
  realizedPnL: number | null,
  totalPnL: number | null,
  profit: number | null,
  loss: number | null,
  winRate: number | null,
  avgTotalProfit: number | null,
  avgTotalLoss: number | null,
  avgTotalRrRatio: number | null,
  thresholdWinRate: number | null,
};

export type Execution = Record<SecurityIdentifier, ExecutionGroup[]>;
