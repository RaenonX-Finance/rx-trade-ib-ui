import {OpenOrder} from '../../types/openOrder';
import {StateBase} from '../types';


export const OPEN_ORDER_STATE_NAME = 'OpenOrder';

export enum OpenOrderDispatcherName {
  UPDATE = 'updateOpenOrder',
  SET_POLL = 'setPoll',
}

export type OpenOrderState = StateBase & {
  openOrders: OpenOrder,
  poll: boolean,
};

export type OpenOrderSelectorReturn = OpenOrderState;
