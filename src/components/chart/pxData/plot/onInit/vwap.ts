import {ISeriesApi, LastPriceAnimationMode} from 'lightweight-charts';

import {OnPxChartInitEvent} from '../../type';
import {pxLineColors} from '../const';
import {addPxLine} from './pxLine/main';
import {AddPxLineOptionsFromInitEvent} from './pxLine/type';


export const addVwap = (opts: AddPxLineOptionsFromInitEvent): ISeriesApi<'Line'> | null => {
  return addPxLine({
    ...opts,
    keyOfConfig: 'vwap',
    keyForLineData: 'vwap',
    title: 'VWAP',
    color: pxLineColors.vwap,
    lineWidth: 2,
    lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
  });
};

export const handleVwap = (e: OnPxChartInitEvent): ISeriesApi<'Line'> | null => {
  return addVwap(e);
};
