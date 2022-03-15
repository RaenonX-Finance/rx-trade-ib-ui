type GetEma120Diff = {
  ema120Pivot?: number,
  ema120Current?: number,
  close: number,
  pivotIdx: number,
};

export const getEma120Diff = ({ema120Pivot, ema120Current, close, pivotIdx}: GetEma120Diff) => {
  if (!ema120Current || pivotIdx < 0) {
    return 0;
  }

  if (!ema120Pivot) {
    return close - ema120Current;
  }

  const diffCurrent = close - ema120Current;
  const diffPivot = close - ema120Pivot;

  if (Math.abs(diffCurrent) > Math.abs(diffPivot)) {
    return diffCurrent;
  } else if (Math.abs(diffPivot) > Math.abs(diffCurrent)) {
    return diffPivot;
  }

  return 0;
};
