import {ISeriesApi, LastPriceAnimationMode} from 'lightweight-charts';

import {OnPxChartInitEvent} from '../../type';
import {toLineData} from '../../utils';


export const handleEma120 = ({chartRef, chartDataRef}: OnPxChartInitEvent): ISeriesApi<'Line'> => {
  if (!chartRef.current) {
    throw new Error('Adding EMA 120 while the chart is not ready');
  }

  const ema120 = chartRef.current.addLineSeries({
    color: '#c45fff',
    title: 'EMA 120',
    lineWidth: 1,
    lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
    priceLineVisible: false,
  });
  ema120.setData(chartDataRef.current.data.map(toLineData('ema120')));

  return ema120;
};
