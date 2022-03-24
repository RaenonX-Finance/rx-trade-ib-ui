import {OrderSide} from '../../types/common';


export const calculateNewAvgPx = (
  currentAvgPx: number,
  position: number,
  orderPx: number,
  signedQuantity: number,
): number => {
  const positionsAfter = position + signedQuantity;

  if (positionsAfter === 0) {
    return 0;
  } else if (positionsAfter * position < 0) {
    // Switched side
    return orderPx;
  }

  return (currentAvgPx * position + orderPx * signedQuantity) / (position + signedQuantity);
};

export const calculatePnL = (
  avgPx: number,
  position: number,
  orderPx: number,
  signedQuantity: number,
  multiplier: number,
): number | null => {
  const positionsAfter = position + signedQuantity;

  if (position * signedQuantity > 0) {
    return null;
  }

  if (positionsAfter === 0 || positionsAfter * position > 0) {
    return (orderPx - avgPx) * (position - positionsAfter) * multiplier;
  }

  return (orderPx - avgPx) * (position) * multiplier;
};

export const sideMultiplier: {[side in OrderSide]: number} = {
  BUY: 1,
  SELL: -1,
};
