import {LineStyle} from 'lightweight-charts';

import {forceMinTick, getDecimalPlaces} from '../../../../../utils/calc';
import {formatSignedNumber} from '../../../../../utils/string';
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
  const decimalPlaces = getDecimalPlaces(minTick);

  const {px, quantity} = order.order;

  const orderPx = forceMinTick(px, minTick);
  const diff = formatSignedNumber(px - currentPx.close, decimalPlaces);
  const title = `${orderPx} x ${quantity} (${diff})`;

  const commonOptions = {
    price: orderPx,
    title,
    color: '#303030',
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
