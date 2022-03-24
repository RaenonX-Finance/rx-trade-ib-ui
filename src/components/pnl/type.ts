import {PnLWarningConfig} from '../../types/pnl';


export type PnLSummary = {
  unrealized: number | null,
  realized: number | null,
};

export type PnLStats = {
  avgPx: number | null,
  pxDiff: {
    val: number | null,
    swingRatio: number | null,
  },
  calculated: PnLSummary,
  tws: PnLSummary,
};

export type PnLCommonProps = {
  config: PnLWarningConfig,
};
