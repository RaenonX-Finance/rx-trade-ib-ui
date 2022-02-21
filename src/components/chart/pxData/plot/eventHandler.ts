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
    const lastPrice = chartDataRef.current.data.find(({epochSec}) => epochSec === time);

    setObject.legend((legend) => ({
      ...legend,
      vwap: vwapPrice || last?.vwap || NaN,
      open: lastPrice?.open || last?.open || NaN,
      high: lastPrice?.high || last?.high || NaN,
      low: lastPrice?.low || last?.low || NaN,
      close: lastPrice?.close || last?.close || NaN,
      amplitudeHL: lastPrice?.amplitudeHL || last?.amplitudeHL || NaN,
      amplitudeOC: lastPrice?.amplitudeOC || last?.amplitudeOC || NaN,
      epochSec: (
        time ?
          (isBusinessDay(time) ? businessDayToEpochSec(time) : time) :
          (last ? last.epochSec : NaN)
      ),
    }));
  });
};
