import {OrderSide, SecurityIdentifier} from './common';


export type OpenOrderData = {
  identifier: number,
  side: OrderSide,
  quantity: number,
  price: number,
};

export type OpenOrder = Record<SecurityIdentifier, OpenOrderData[]>;
