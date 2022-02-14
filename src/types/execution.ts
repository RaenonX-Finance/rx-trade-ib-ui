import {ExecutionSide, SecurityIdentifier} from './common';


export type ExecutionGroup = {
  epochSec: number,
  side: ExecutionSide,
  quantity: number,
  avgPx: number,
  realizedPnL: number | null,
};

export type Execution = Record<SecurityIdentifier, ExecutionGroup[]>;
