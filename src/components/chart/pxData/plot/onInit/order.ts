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
    if (!px) {
      return;
    }

    px = forceMinTick(px, chartDataRef.current.contract.minTick);

    // FIXME: According to `px`, current avg post, current position,
    //  position relative to current px to determine order type, side
    setObject.order((state) => ({...state, show: true, order: {...state.order, px}}));
  });
};
