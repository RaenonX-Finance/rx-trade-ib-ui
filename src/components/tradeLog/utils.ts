import {ExecutionSide, PriceActionSide} from '../../types/common';


export const toActionSide = (execSide: ExecutionSide, hasPnL: boolean): PriceActionSide => {
  if (execSide === 'BOT') {
    return hasPnL ? 'SHORT' : 'LONG';
  }
  if (execSide === 'SLD') {
    return hasPnL ? 'LONG' : 'SHORT';
  }
  throw new Error('Unable to convert action side');
};
