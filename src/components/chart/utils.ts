import {BarData, UTCTimestamp} from 'lightweight-charts';

import {PxDataBar} from '../../types/pxData';


export const toBarData = (bar: PxDataBar): BarData => ({
  time: (bar.epochSec - (new Date()).getTimezoneOffset() * 60) as UTCTimestamp,
  ...bar,
});
