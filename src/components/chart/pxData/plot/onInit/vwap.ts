import {LastPriceAnimationMode} from 'lightweight-charts';

import {OnPxChartInitEvent, PxChartSeries} from '../../type';
import {pxLineColors} from '../const';
import {addPxLine} from './pxLine/main';


export const handleVwap = (e: OnPxChartInitEvent): PxChartSeries['vwap'] => {
  return addPxLine({
    ...e,
    keyOfConfig: 'vwap',
    keyForLineData: 'vwap',
    title: 'VWAP',
    color: pxLineColors.vwap,
    lineWidth: 2,
    lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
    priceLineVisible: false,
  });
};
