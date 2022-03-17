import {ISeriesApi, LastPriceAnimationMode} from 'lightweight-charts';

import {OnPxChartInitEvent} from '../../type';
import {toLineData} from '../../utils';


export const addVwap = ({
  chartRef, chartDataRef,
}: Pick<OnPxChartInitEvent, 'chartRef' | 'chartDataRef'>): ISeriesApi<'Line'> | null => {
  if (!chartRef.current) {
    throw new Error('Adding VWAP while the chart is not ready');
  }

  const vwap = chartRef.current.addLineSeries({
    color: '#5fa9ff',
    title: 'VWAP',
    lineWidth: 2,
    lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
  });
  vwap.setData(chartDataRef.current.data.map(toLineData('vwap')));

  return vwap;
};

export const handleVwap = (e: OnPxChartInitEvent): ISeriesApi<'Line'> | null => {
  const {layoutConfig} = e;

  if (!layoutConfig.vwap.enable) {
    return null;
  }

  return addVwap(e);
};
