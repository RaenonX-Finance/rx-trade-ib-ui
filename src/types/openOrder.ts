import {OrderSide, OrderType, SecurityIdentifier} from './common';


export type OpenOrderData = {
  identifier: number,
  type: OrderType,
  side: OrderSide,
  quantity: number,
  price: number,
};

export type OpenOrder = Record<SecurityIdentifier, OpenOrderData[]>;
