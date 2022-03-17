import {ISeriesApi, LastPriceAnimationMode} from 'lightweight-charts';

import {OnPxChartInitEvent} from '../../type';
import {addPxLine} from './pxLine/main';
import {AddPxLineOptionsFromInitEvent} from './pxLine/type';


export const addEma120 = (opts: AddPxLineOptionsFromInitEvent): ISeriesApi<'Line'> | null => {
  return addPxLine({
    ...opts,
    keyOfConfig: 'ema120',
    keyForLineData: 'ema120',
    title: 'EMA 120',
    color: '#c45fff',
    lineWidth: 1,
    lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
  });
};

export const handleEma120 = (e: OnPxChartInitEvent): ISeriesApi<'Line'> | null => {
  return addEma120(e);
};
