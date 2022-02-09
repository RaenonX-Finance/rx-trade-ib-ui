import {PxDataCollection} from '../../types/pxData';
import {StateBase} from '../types';


export const PX_DATA_STATE_NAME = 'PxData';

export enum PxDataDispatcherName {
  UPDATE = 'update',
}

export type PxDataState = StateBase & PxDataCollection;

export type PxDataSelectorReturn = PxDataCollection;
