import {LastPriceAnimationMode} from 'lightweight-charts';

import {OnPxChartInitEvent, PxChartSeries} from '../../type';
import {pxLineColors} from '../const';
import {addPxLine} from './pxLine/main';


export const handleEma120 = (e: OnPxChartInitEvent): PxChartSeries['ema120'] => {
  return addPxLine({
    ...e,
    keyOfConfig: 'ema120',
    keyForLineData: 'ema120',
    title: '',
    color: pxLineColors.ema120,
    lineWidth: 2,
    lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
    lastValueVisible: false, // Disable label
    priceLineVisible: false,
  });
};
