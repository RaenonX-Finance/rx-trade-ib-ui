import {OrderSide, SecurityIdentifier} from './common';


export type OpenOrderData = {
  orderId: number,
  identifier: SecurityIdentifier,
  side: OrderSide,
  quantity: number,
  px: number,
};

export type OpenOrder = Record<SecurityIdentifier, OpenOrderData[]>;
