import {IPriceLine, ISeriesApi} from 'lightweight-charts';

import {OnPxChartInitEvent} from '../../type';
import {getSrLevelColor, srLevelLineStyle, srLevelLineWidth} from '../const';


export const handleSR = (e: OnPxChartInitEvent, price: ISeriesApi<'Candlestick'>): Record<number, IPriceLine> => {
  const {chartDataRef, layoutConfig} = e;

  const srLevelLines: Record<number, IPriceLine> = {};
  const currentPx = chartDataRef.current.data.at(-1);

  if (!currentPx || !layoutConfig.srLevel.enable) {
    return {};
  }

  chartDataRef.current.supportResistance.forEach(({level, strength}) => {
    srLevelLines[level] = price.createPriceLine({
      price: level,
      axisLabelVisible: false,
      title: strength.toFixed(0),
      color: getSrLevelColor(strength),
      lineWidth: srLevelLineWidth,
      lineStyle: srLevelLineStyle,
      lineVisible: true,
    });
  });

  return srLevelLines;
};
