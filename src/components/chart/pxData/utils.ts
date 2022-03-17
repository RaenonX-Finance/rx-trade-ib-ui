import {BarData, LineData as LineDataApi, UTCTimestamp} from 'lightweight-charts';

import {PxDataBar, PxDataBarSmaKey} from '../../../types/pxData';
import {KeysOfType} from '../../../utils/types';


export const toBarData = (bar: PxDataBar): BarData => ({
  time: bar.epochSec as UTCTimestamp,
  ...bar,
});

type LineData = Omit<LineDataApi, 'value'> & {
  value?: number
};

export type ValidKeyForLineData = KeysOfType<PxDataBar, number | null> | PxDataBarSmaKey;

export const toLineData = <K extends ValidKeyForLineData>(
  key: K,
) => (
  bar: PxDataBar,
): LineData => {
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
