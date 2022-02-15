import {ISeriesApi} from 'lightweight-charts';

import {OnPxChartInitEvent} from '../../type';


export const handlePxClick = ({chartRef, setObject}: OnPxChartInitEvent, price: ISeriesApi<'Candlestick'>) => {
  if (!chartRef.current) {
    throw new Error('Attempt to subscribe chart click while the chart is not ready');
  }

  chartRef.current.subscribeClick(({point}) => {
    if (!point) {
      return;
    }

    const px = price.coordinateToPrice(point.y);
    if (!px) {
      return;
    }

    // FIXME: According to `px`, current avg post, current position,
    //  position relative to current px to determine order type, side
    setObject.order((state) => ({...state, show: true, order: {...state.order, px}}));
  });
};
