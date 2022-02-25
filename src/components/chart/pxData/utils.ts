import {BarData, LineData as LineDataApi, UTCTimestamp} from 'lightweight-charts';

import {PxDataBar} from '../../../types/pxData';


export const toBarData = (bar: PxDataBar): BarData => ({
  time: bar.epochSec as UTCTimestamp,
  ...bar,
});

type LineData = Omit<LineDataApi, 'value'> & {
  value?: number
};

export const toLineData = <K extends keyof PxDataBar>(key: K) => (bar: PxDataBar): LineData => {
  const value = bar[key];

  if (!value) {
    return {
      time: bar.epochSec as UTCTimestamp,
    };
  }

  return {
    time: bar.epochSec as UTCTimestamp,
    value,
  };
};
