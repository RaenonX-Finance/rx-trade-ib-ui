import {OrderSide, SecurityIdentifier} from './common';


export type OrderFilledResult = {
  identifier: SecurityIdentifier,
  symbol: string,
  action: OrderSide,
  quantity: number,
  fillPx: number,
};
