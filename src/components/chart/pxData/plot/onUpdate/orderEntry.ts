import {LineStyle} from 'lightweight-charts';

import {forceMinTick} from '../../../../../utils/calc';
import {OnPxChartUpdatedEvent} from '../../type';


export const handleOrderEntry = ({chartDataRef, chartObjectRef, order}: OnPxChartUpdatedEvent) => {
  const currentPx = chartDataRef.current.data.at(-1);

  if (!chartObjectRef.current || !currentPx) {
    return;
  }

  const {price: priceSeries, orderEntry} = chartObjectRef.current.initData.series;

  if (!order.show) {
    if (orderEntry) {
      priceSeries.removePriceLine(orderEntry);
      chartObjectRef.current.initData.series.orderEntry = null;
    }
    return;
  }

  const minTick = chartDataRef.current.contract.minTick;

  const {px, quantity} = order.order;

  const orderPx = forceMinTick(px, minTick);
  const title = `${orderPx} x ${quantity}`;

  const commonOptions = {
    price: orderPx,
    title,
    color: '#b321fc',
    lineVisible: true,
  };

  if (orderEntry) {
    orderEntry.applyOptions(commonOptions);
  } else {
    chartObjectRef.current.initData.series.orderEntry = priceSeries.createPriceLine({
      ...commonOptions,
      axisLabelVisible: true,
      lineWidth: 2,
      lineStyle: LineStyle.Dotted,
    });
  }
};
