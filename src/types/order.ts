import {OrderSide} from './common';


export type Order = {
  side: OrderSide,
  quantity: number,
  px: number,
};

export type OrderSocketMessage = Omit<Order, 'px'> & {
  px: number | null,
};
