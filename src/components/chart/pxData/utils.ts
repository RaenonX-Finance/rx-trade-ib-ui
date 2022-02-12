import {BarData, LineData, UTCTimestamp} from 'lightweight-charts';

import {PxDataBar} from '../../../types/pxData';


export const toBarData = (bar: PxDataBar): BarData => ({
  time: bar.epochSec as UTCTimestamp,
  ...bar,
});

export const toLineData = <K extends keyof PxDataBar>(key: K) => (bar: PxDataBar): LineData => ({
  time: bar.epochSec as UTCTimestamp,
  value: bar[key],
});
