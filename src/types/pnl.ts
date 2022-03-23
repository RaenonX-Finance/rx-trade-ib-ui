export type PnLData = {
  unrealized: number,
  realized: number,
};

export type PnLDict = {[contractId in number]: PnLData};
