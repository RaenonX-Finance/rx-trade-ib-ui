import {OrderSide, SecurityIdentifier} from './common';


export type Order = {
  orderId: number | null,
  identifier: SecurityIdentifier,
  side: OrderSide,
  quantity: number,
  px: number,
  periodSec: number,
};

export type OrderSocketMessage = Omit<Order, 'px'> & {
  px: number | null,
  forceBracket: boolean | null,
};
