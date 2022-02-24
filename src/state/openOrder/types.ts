import {SecurityIdentifier} from '../../types/common';
import {OpenOrder} from '../../types/openOrder';
import {StateBase} from '../types';


export const OPEN_ORDER_STATE_NAME = 'OpenOrder';

export enum OpenOrderDispatcherName {
  UPDATE = 'updateOpenOrder',
  UPDATE_SINGLE = 'updateSingleOpenOrder',
  SORT = 'sortOrderIds',
  SET_POLL = 'setPoll',
}

export type OpenOrderState = StateBase & {
  openOrders: OpenOrder,
  sortedOrderIds: Record<SecurityIdentifier, number[]>,
  poll: boolean,
};

export type OpenOrderSelectorReturn = OpenOrderState;
