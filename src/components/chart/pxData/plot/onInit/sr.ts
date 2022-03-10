import {IPriceLine, ISeriesApi, LineStyle} from 'lightweight-charts';

import {getDecimalPlaces} from '../../../../../utils/calc';
import {formatSignedNumber} from '../../../../../utils/string';
import {OnPxChartInitEvent} from '../../type';
import {srLevelColor} from '../const';


export const handleSR = (e: OnPxChartInitEvent, price: ISeriesApi<'Candlestick'>): Record<number, IPriceLine> => {
  const {chartDataRef, layoutConfig} = e;

  const srLevelLines: Record<number, IPriceLine> = {};
  const decimalPlaces = getDecimalPlaces(chartDataRef.current.contract.minTick);
  const currentPx = chartDataRef.current.data.at(-1);

  if (!currentPx || !layoutConfig.srLevel.enable) {
    return {};
  }

  chartDataRef.current.supportResistance.forEach(({level}) => {
    const title = formatSignedNumber(level - currentPx.close, decimalPlaces);

    srLevelLines[level] = price.createPriceLine({
      price: level,
      axisLabelVisible: true,
      title,
      color: srLevelColor,
      lineWidth: 2,
      lineStyle: LineStyle.Dotted,
      lineVisible: true,
    });
  });

  return srLevelLines;
};
