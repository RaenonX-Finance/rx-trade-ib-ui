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

    const pxData = chartDataRef.current;

    let px = price.coordinateToPrice(point.y) as number;
    const currentPx = pxData.data.at(-1);

    if (!px || !currentPx) {
      return;
    }

    px = forceMinTick(px, pxData.contract.minTick);

    setObject.order((state) => ({
      ...state,
      show: true,
      order: {
        ...state.order,
        identifier: pxData.contract.identifier,
        side: px > currentPx.close ? 'SELL' : 'BUY',
        px,
      },
    }));
  });
};
