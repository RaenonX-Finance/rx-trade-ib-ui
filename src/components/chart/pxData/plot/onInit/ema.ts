import {ISeriesApi, LastPriceAnimationMode} from 'lightweight-charts';

import {OnPxChartInitEvent} from '../../type';
import {pxLineColors} from '../const';
import {addPxLine} from './pxLine/main';
import {AddPxLineOptionsFromInitEvent} from './pxLine/type';


export const addEma120 = (opts: AddPxLineOptionsFromInitEvent): ISeriesApi<'Line'> | null => {
  return addPxLine({
    ...opts,
    keyOfConfig: 'ema120',
    keyForLineData: 'ema120',
    title: '',
    color: pxLineColors.ema120,
    lineWidth: 2,
    lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
    lastValueVisible: false, // Disable label
  });
};

export const handleEma120 = (e: OnPxChartInitEvent): ISeriesApi<'Line'> | null => {
  return addEma120(e);
};
