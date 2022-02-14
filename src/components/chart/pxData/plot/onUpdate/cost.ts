import {LineStyle} from 'lightweight-charts';

import {getDecimalPlaces} from '../../../../../utils/calc';
import {formatSignedNumber} from '../../../../../utils/string';
import {OnPxChartUpdatedEvent} from '../../type';
import {avgCostColor} from '../const';


export const handleAvgCost = ({chartDataRef, chartObjectRef, payload}: OnPxChartUpdatedEvent) => {
  const {position: positionData} = payload;

  if (!chartObjectRef.current) {
    return;
  }

  const {price, avgCost} = chartObjectRef.current.initData.series;

  if (!positionData || !positionData.avgPx) {
    // No position, related line should be removed, if exists
    chartObjectRef.current.initData.series.avgCost = null;

    if (avgCost) {
      price.removePriceLine(avgCost);
    }

    return;
  }

  const lastPrice = chartDataRef.current.data.at(-1);
  const {avgPx, position} = positionData;

  if (!lastPrice) {
    return;
  }

  const decimalPlaces = getDecimalPlaces(chartDataRef.current.contract.minTick);
  const title = `Avg Px / ${position} (${formatSignedNumber(lastPrice.close - avgPx, decimalPlaces)})`;

  if (avgCost) {
    avgCost.applyOptions({
      price: avgPx,
      title,
    });
  } else {
    chartObjectRef.current.initData.series.avgCost = price.createPriceLine({
      price: avgPx,
      axisLabelVisible: true,
      title,
      color: avgCostColor,
      lineWidth: 2,
      lineStyle: LineStyle.LargeDashed,
    });
  }
};
