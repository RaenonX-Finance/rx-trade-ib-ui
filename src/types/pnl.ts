export type PnLData = {
  unrealized: number,
  realized: number,
};

export type PnLDict = {[contractId in number]: PnLData};

export type PnLWarningConfig = {
  pxDiffVal: number,
  pxDiffSmaRatio: number,
  totalPnL: number,
  unrealizedPnL: number,
};
