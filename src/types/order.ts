import {OrderSide, SecurityIdentifier} from './common';


export type Order = {
  identifier: SecurityIdentifier,
  side: OrderSide,
  quantity: number,
  px: number,
  periodSec: number,
};

export type OrderSocketMessage = Omit<Order, 'px'> & {
  px: number | null,
};
