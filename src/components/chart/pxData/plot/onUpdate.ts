import {IPriceLine, LineStyle} from 'lightweight-charts';

import {getDecimalPlaces} from '../../../../utils/calc';
import {formatSignedNumber} from '../../../../utils/string';
import {OnPxChartUpdatedEvent, PxChartUpdatedEventHandler} from '../type';
import {toBarData, toLineData} from '../utils';
import {avgCostColor} from './const';
import {getSrLevelColor} from './utils';


const handlePrice = ({chartDataRef, chartObjectRef, setObject}: OnPxChartUpdatedEvent) => {
  if (!chartObjectRef.current) {
    return;
  }

  const {price} = chartObjectRef.current.initData.series;

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  price.setData(chartDataRef.current.data.map(toBarData));
  setObject.legend((legend) => ({
    ...legend,
    ...lastPrice,
    latestBar: lastPrice,
  }));
};

const handleVwap = ({chartDataRef, chartObjectRef, setObject}: OnPxChartUpdatedEvent) => {
  if (!chartObjectRef.current) {
    return;
  }

  const {vwap} = chartObjectRef.current.initData.series;

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  const pxLine = toLineData('vwap')(lastPrice);

  vwap.update(pxLine);
  setObject.legend((legend) => ({...legend, vwap: pxLine.value}));
};

const handleSR = ({chartDataRef, chartObjectRef}: OnPxChartUpdatedEvent) => {
  if (!chartObjectRef.current) {
    return;
  }

  const {price} = chartObjectRef.current.initData.series;

  const decimalPlaces = getDecimalPlaces(chartDataRef.current.contract.minTick);

  const existingLevels = new Set(Object.keys(chartObjectRef.current.initData.lines.srLevelLines));

  for (const {level, type, diffCurrent} of chartDataRef.current.supportResistance) {
    const priceLine: IPriceLine = chartObjectRef.current.initData.lines.srLevelLines[level];
    const title = formatSignedNumber(diffCurrent, decimalPlaces);

    if (priceLine) {
      priceLine.applyOptions({title});
    } else {
      chartObjectRef.current.initData.lines.srLevelLines[level] = price.createPriceLine({
        price: level,
        axisLabelVisible: true,
        title,
        color: getSrLevelColor(type),
        lineWidth: 2,
        lineStyle: LineStyle.Dotted,
      });
    }

    existingLevels.delete(level.toString());
  }

  for (const leftOverLevel of Array.from(existingLevels)) {
    const level = parseInt(leftOverLevel);

    price.removePriceLine(chartObjectRef.current.initData.lines.srLevelLines[level]);
    delete chartObjectRef.current.initData.lines.srLevelLines[level];
  }
};

const handleAvgCost = ({chartDataRef, chartObjectRef, position}: OnPxChartUpdatedEvent) => {
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

export const onPxChartUpdated: PxChartUpdatedEventHandler = (e) => {
  handlePrice(e);
  handleVwap(e);
  handleSR(e);
  handleAvgCost(e);
};
