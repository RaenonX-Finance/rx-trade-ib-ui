export type OrderSide = 'BUY' | 'SELL';

export type OrderType = 'LMT' | 'STP' | 'MKT';

export type ExecutionSide = 'BOT' | 'SLD';

export type SecurityIdentifier = number;

export const orderTypeText: {[type in OrderType]: string} = {
  LMT: 'LMT',
  STP: 'STP',
  MKT: 'MKT',
};

export const orderSideText: {[type in OrderSide]: string} = {
  BUY: 'BUY',
  SELL: 'SELL',
};
