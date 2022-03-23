import {PnLDict} from '../../types/pnl';
import {StateBase} from '../types';


export const PNL_STATE_NAME = 'PnL';

export enum PnLDispatcherName {
  UPDATE = 'updatePnL',
}

export type PnLState = StateBase & PnLDict;

export type PnLSelectorReturn = PnLState;
