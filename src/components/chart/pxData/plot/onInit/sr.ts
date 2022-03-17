import {IPriceLine, ISeriesApi} from 'lightweight-charts';

import {getDecimalPlaces} from '../../../../../utils/calc';
import {OnPxChartInitEvent} from '../../type';
import {getSrLevelColor, srLevelLineStyle, srLevelLineWidth, srLevelLineWidthStrong} from '../const';
import {getSrLevelLabel} from '../utils';


export const handleSR = (e: OnPxChartInitEvent, price: ISeriesApi<'Candlestick'>): Record<number, IPriceLine> => {
  const {chartDataRef, layoutConfig} = e;

  const srLevelLines: Record<number, IPriceLine> = {};
  const decimalPlaces = getDecimalPlaces(chartDataRef.current.contract.minTick);
  const currentPx = chartDataRef.current.data.at(-1);

  if (!currentPx || !layoutConfig.srLevel.enable) {
    return {};
  }

  chartDataRef.current.supportResistance.forEach(({level, strength}) => {
    srLevelLines[level] = price.createPriceLine({
      price: level,
      axisLabelVisible: strength > 0.5,
      title: getSrLevelLabel(level, decimalPlaces, strength),
      color: getSrLevelColor(strength),
      lineWidth: strength > 0.5 ? srLevelLineWidthStrong : srLevelLineWidth,
      lineStyle: srLevelLineStyle,
      lineVisible: true,
    });
  });

  return srLevelLines;
};
