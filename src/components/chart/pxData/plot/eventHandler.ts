import {BarPrice, isBusinessDay, ISeriesApi} from 'lightweight-charts';

import {businessDayToEpochSec} from '../../../../utils/chart';
import {OnPxChartInitEvent} from '../type';


export const handleLegendUpdate = (
  e: OnPxChartInitEvent,
  vwap: ISeriesApi<'Line'>,
) => {
  const {chartRef, chartDataRef, setObject} = e;

  if (!chartRef.current) {
    throw new Error('Legend to be handled while the chart is not ready');
  }

  chartRef.current.subscribeCrosshairMove(({seriesPrices, time}) => {
    const last = chartDataRef.current.data.at(-1);

    const vwapPrice = seriesPrices.get(vwap) as BarPrice | undefined;
    const hovered = chartDataRef.current.data.find(({epochSec}) => epochSec === time);

    // Using `last` because moving out of chart makes `lastPrice` undefined
    setObject.legend(({decimals}) => ({
      epochSec: (
        time ?
          (isBusinessDay(time) ? businessDayToEpochSec(time) : time) :
          (last ? last.epochSec : NaN)
      ),
      vwap: vwapPrice || last?.vwap || NaN,
      open: hovered?.open || last?.open || NaN,
      high: hovered?.high || last?.high || NaN,
      low: hovered?.low || last?.low || NaN,
      close: hovered?.close || last?.close || NaN,
      amplitudeHL: hovered?.amplitudeHL || last?.amplitudeHL || NaN,
      amplitudeOC: hovered?.amplitudeOC || last?.amplitudeOC || NaN,
      extremaMin: hovered?.extremaMin || last?.extremaMin || false,
      extremaMax: hovered?.extremaMax || last?.extremaMax || false,
      ema120: hovered?.ema120 || last?.ema120 || NaN,
      ema120Trend: hovered?.ema120Trend || last?.ema120Trend || NaN,
      ema120TrendChange: hovered?.ema120TrendChange || last?.ema120TrendChange || NaN,
      diff: hovered?.diff || last?.diff || NaN,
      diffSma: hovered?.diffSma || last?.diffSma || NaN,
      diffSmaTrend: hovered?.diffSmaTrend || last?.diffSmaTrend || NaN,
      decimals,
    }));
  });
};
