import {OrderSide} from './common';


export type Order = {
  side: OrderSide,
  quantity: number,
  px: number,
};
