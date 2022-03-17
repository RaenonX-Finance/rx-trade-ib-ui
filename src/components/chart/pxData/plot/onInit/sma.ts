import {LastPriceAnimationMode} from 'lightweight-charts';

import {OnPxChartInitEvent, PxChartSeries} from '../../type';
import {toLineData} from '../../utils';
import {smaScale} from '../const';


export const addSma = ({
  chartRef,
  chartDataRef,
  layoutConfig,
}: Pick<OnPxChartInitEvent, 'chartRef' | 'chartDataRef' | 'layoutConfig'>): PxChartSeries['sma'] => {
  if (!layoutConfig.sma.enable) {
    return [];
  }

  const periodCount = chartDataRef.current.smaPeriods.length;

  return Object.fromEntries(chartDataRef.current.smaPeriods
    .map((period, idx) => {
      if (!chartRef.current) {
        throw new Error(`Adding SMA ${period} while the chart is not ready`);
      }

      const smaLine = chartRef.current.addLineSeries({
        color: smaScale(idx / (periodCount - 1)).hex('rgb'),
        title: '',
        lineWidth: 1,
        lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
        priceLineVisible: false, // Disable vertical Px line
        lastValueVisible: false, // Disable label
      });
      smaLine.setData(chartDataRef.current.data.map(toLineData(`sma${period}`)));

      return [period, smaLine];
    }));
};

export const handleSma = (e: OnPxChartInitEvent): PxChartSeries['sma'] => {
  return addSma(e);
};
