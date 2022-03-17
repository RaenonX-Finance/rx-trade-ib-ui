import {PxData} from '../types/pxData';


export const getPxDataTitle = ({contract, periodSec}: PxData) => {
  return `${contract.symbol} - ${(periodSec / 60).toFixed(0)}`;
};
