import {OrderSide, OrderType} from './common';


export type Order = {
  type: OrderType,
  side: OrderSide,
  quantity: number,
  px: number,
};
