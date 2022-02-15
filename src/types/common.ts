export type OrderSide = 'BUY' | 'SELL';

export type ExecutionSide = 'BOT' | 'SLD';

export type SecurityIdentifier = number;

export const orderSideText: {[type in OrderSide]: string} = {
  BUY: 'BUY',
  SELL: 'SELL',
};
