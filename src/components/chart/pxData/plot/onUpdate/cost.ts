import {LineStyle} from 'lightweight-charts';

import {getDecimalPlaces} from '../../../../../utils/calc';
import {formatSignedNumber} from '../../../../../utils/string';
import {OnPxChartUpdatedEvent} from '../../type';
import {avgCostColor} from '../const';


export const handleAvgCost = ({chartDataRef, chartObjectRef, payload}: OnPxChartUpdatedEvent) => {
  const {position} = payload;

  if (!chartObjectRef.current || !position || !position.avgPx) {
    return;
  }

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  const decimalPlaces = getDecimalPlaces(chartDataRef.current.contract.minTick);
  const avgCost = chartObjectRef.current.initData.series.avgCost;
  const title = `Avg Px (${formatSignedNumber(lastPrice.close - position.avgPx, decimalPlaces)})`;

  if (avgCost) {
    avgCost.applyOptions({
      price: position.avgPx,
      title,
    });
  } else {
    const {price} = chartObjectRef.current.initData.series;

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
