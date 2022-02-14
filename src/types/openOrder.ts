export type OrderSide = 'BUY' | 'SELL';

export type OrderType = 'LMT' | 'STP';

export type OpenOrderData = {
  identifier: number,
  type: OrderType,
  side: OrderSide,
  quantity: number,
  price: number,
};

export type OpenOrder = Record<number, OpenOrderData[]>;
