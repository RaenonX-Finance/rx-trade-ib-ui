import {LineStyle} from 'lightweight-charts';

import {getDecimalPlaces} from '../../../../../utils/calc';
import {formatSignedNumber} from '../../../../../utils/string';
import {OnPxChartUpdatedEvent} from '../../type';
import {avgCostColor} from '../const';


export const handleAvgCost = ({chartDataRef, chartObjectRef, payload}: OnPxChartUpdatedEvent) => {
  const {position} = payload;

  if (!chartObjectRef.current) {
    return;
  }

  const {price, avgCost} = chartObjectRef.current.initData.series;

  if (!position || !position.avgPx) {
    // No position, related line should be removed, if exists
    chartObjectRef.current.initData.series.avgCost = null;

    if (avgCost) {
      price.removePriceLine(avgCost);
    }

    return;
  }

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  const decimalPlaces = getDecimalPlaces(chartDataRef.current.contract.minTick);
  const title = `Avg Px (${formatSignedNumber(lastPrice.close - position.avgPx, decimalPlaces)})`;

  if (avgCost) {
    avgCost.applyOptions({
      price: position.avgPx,
      title,
    });
  } else {
    chartObjectRef.current.initData.series.avgCost = price.createPriceLine({
      price: position.avgPx,
      axisLabelVisible: true,
      title,
      color: avgCostColor,
      lineWidth: 2,
      lineStyle: LineStyle.LargeDashed,
    });
  }
};
