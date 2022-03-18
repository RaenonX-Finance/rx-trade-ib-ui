import {PxData} from '../types/pxData';
import {getDecimalPlaces} from './calc';


export const getPxDataTitle = ({contract, periodSec, data}: PxData, includeCurrentPx = false) => {
  const base = `${contract.symbol}@${(periodSec / 60).toFixed(0)}`;

  if (!includeCurrentPx) {
    return base;
  }

  const lastBar = data.at(-1);
  const decimals = getDecimalPlaces(contract.minTick);

  return `${base} (${lastBar?.close.toFixed(decimals) || '(Unavailable)'})`;
};
