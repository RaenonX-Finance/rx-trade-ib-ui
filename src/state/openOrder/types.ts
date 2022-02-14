import {OpenOrder} from '../../types/openOrder';
import {StateBase} from '../types';


export const OPEN_ORDER_STATE_NAME = 'OpenOrder';

export enum OpenOrderDispatcherName {
  UPDATE = 'updateOpenOrder',
}

export type OpenOrderState = StateBase & OpenOrder;

export type OpenOrderSelectorReturn = OpenOrder;
