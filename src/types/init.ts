import {PnLWarningConfig} from './pnl';


export type CustomSrLevel = {
  level: number,
  strong: boolean,
};

export type CustomSrLevelDict = {[contractId in number]: CustomSrLevel[]};

export type InitData = {
  pnlWarningConfig: PnLWarningConfig,
  customSrLevelDict: CustomSrLevelDict,
};
