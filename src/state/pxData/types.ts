import {PxDataCollection} from '../../types/pxData';
import {StateBase} from '../types';


export const PX_DATA_STATE_NAME = 'PxData';

export enum PxDataDispatcherName {
  INIT = 'initPx',
  UPDATE = 'updatePx',
  UPDATE_MARKET = 'updateMarketPx',
}

export type PxDataState = StateBase & PxDataCollection;

export type PxDataSelectorReturn = PxDataCollection;
