import {ISeriesApi, LastPriceAnimationMode} from 'lightweight-charts';

import {OnPxChartInitEvent} from '../../type';
import {toLineData} from '../../utils';


export const handleVwap = ({chartRef, chartDataRef}: OnPxChartInitEvent): ISeriesApi<'Line'> => {
  if (!chartRef.current) {
    throw new Error('Adding VWAP while the chart is not ready');
  }

  const vwap = chartRef.current.addLineSeries({
    color: '#5fa9ff',
    lineWidth: 2,
    lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
  });
  vwap.setData(chartDataRef.current.data.map(toLineData('vwap')));

  return vwap;
};
