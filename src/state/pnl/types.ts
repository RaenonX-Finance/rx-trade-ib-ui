import {PnLDict, PnLWarningConfig} from '../../types/pnl';
import {StateBase} from '../types';


export const PNL_STATE_NAME = 'PnL';

export enum PnLDispatcherName {
  UPDATE = 'updatePnL',
  UPDATE_CONFIG = 'updatePnLConfig',
}

export type PnLState = StateBase & PnLDict & {
  config: PnLWarningConfig | null,
};

export type PnLSelectorReturn = PnLState;
