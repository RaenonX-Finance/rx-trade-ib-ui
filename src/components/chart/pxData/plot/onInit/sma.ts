import {LastPriceAnimationMode} from 'lightweight-charts';

import {OnPxChartInitEvent, PxChartSeries} from '../../type';
import {toLineData} from '../../utils';
import {smaScale} from '../const';


export const handleSma = ({
  chartRef,
  chartDataRef,
  layoutConfig,
}: OnPxChartInitEvent): PxChartSeries['sma'] => {
  const periodCount = chartDataRef.current.smaPeriods.length;

  return Object.fromEntries(chartDataRef.current.smaPeriods
    .map((period, idx) => {
      if (!chartRef.current) {
        throw new Error(`Adding SMA ${period} while the chart is not ready`);
      }

      const smaLine = chartRef.current.addLineSeries({
        color: smaScale(idx / (periodCount - 1)).hex('rgba'),
        title: '',
        lineWidth: 1,
        lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
        priceLineVisible: false, // Disable vertical Px line
        lastValueVisible: false, // Disable label
        crosshairMarkerVisible: false,
        visible: layoutConfig.sma.enable,
      });
      smaLine.setData(chartDataRef.current.data.map(toLineData(`sma${period}`)));

      return [period, smaLine];
    }));
};
