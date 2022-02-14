import {IPriceLine, ISeriesApi, LineStyle} from 'lightweight-charts';

import {getDecimalPlaces} from '../../../../../utils/calc';
import {formatSignedNumber} from '../../../../../utils/string';
import {OnPxChartInitEvent} from '../../type';
import {getSrLevelColor} from '../utils';


export const handleSR = (e: OnPxChartInitEvent, price: ISeriesApi<'Candlestick'>): Record<number, IPriceLine> => {
  const {chartDataRef} = e;

  const srLevelLines: Record<number, IPriceLine> = {};
  const decimalPlaces = getDecimalPlaces(chartDataRef.current.contract.minTick);

  chartDataRef.current.supportResistance.forEach(({level, diffCurrent, type}) => {
    const title = formatSignedNumber(diffCurrent, decimalPlaces);

    srLevelLines[level] = price.createPriceLine({
      price: level,
      axisLabelVisible: true,
      title,
      color: getSrLevelColor(type),
      lineWidth: 2,
      lineStyle: LineStyle.Dotted,
    });
  });

  return srLevelLines;
};
