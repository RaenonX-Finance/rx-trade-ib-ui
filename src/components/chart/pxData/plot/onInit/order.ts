import {ISeriesApi} from 'lightweight-charts';

import {forceMinTick} from '../../../../../utils/calc';
import {OnPxChartInitEvent} from '../../type';


export const handlePxClick = (e: OnPxChartInitEvent, price: ISeriesApi<'Candlestick'>) => {
  const {chartRef, chartDataRef, setObject} = e;

  if (!chartRef.current) {
    throw new Error('Attempt to subscribe chart click while the chart is not ready');
  }

  chartRef.current.subscribeClick(({point}) => {
    if (!point) {
      return;
    }

    let px = price.coordinateToPrice(point.y) as number;
    const currentPx = chartDataRef.current.data.at(-1);

    if (!px || !currentPx) {
      return;
    }

    px = forceMinTick(px, chartDataRef.current.contract.minTick);

    setObject.order((state) => ({
      ...state,
      show: true,
      order: {
        ...state.order,
        side: px > currentPx.close ? 'SELL' : 'BUY',
        px,
      },
    }));
  });
};
