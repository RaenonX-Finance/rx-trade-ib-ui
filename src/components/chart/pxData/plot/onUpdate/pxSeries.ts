import {ISeriesApi, LineStyle} from 'lightweight-charts';

import {getDecimalPlaces} from '../../../../../utils/calc';
import {OnPxChartUpdatedEvent, PxChartLines} from '../../type';


export type HandlePxSeriesOptions< T> = {
  objectKey: keyof PxChartLines,
  getData: (e: OnPxChartUpdatedEvent) => T[] | undefined,
  getPx: (data: T) => number,
  getLabelTitle: (data: T, currentPx: number, decimalPlaces: number) => string,
  getPxLineColor: (data: T) => string,
  getPxLineStyle: (data: T) => LineStyle,
};

const removePxLines = <T>(
  e: OnPxChartUpdatedEvent,
  opts: HandlePxSeriesOptions<T>,
  pxLevelsToRemove: Set<string>,
  pxSeries: ISeriesApi<'Candlestick'>,
) => {
  const {chartObjectRef} = e;
  const {objectKey} = opts;

  if (!chartObjectRef.current) {
    return;
  }

  for (const leftOverLevel of Array.from(pxLevelsToRemove)) {
    const level = parseInt(leftOverLevel);
    const pxLine = chartObjectRef.current.initData.lines[objectKey][level];

    delete chartObjectRef.current.initData.lines[objectKey][level];

    if (pxLine) {
      // Price line could be `undefined` if already removed
      pxSeries.removePriceLine(pxLine);
    }
  }
};

export const handlePxLines = <T>(e: OnPxChartUpdatedEvent, opts: HandlePxSeriesOptions<T>) => {
  const {chartDataRef, chartObjectRef} = e;
  const {
    objectKey,
    getData,
    getPx,
    getLabelTitle,
    getPxLineColor,
    getPxLineStyle,
  } = opts;

  if (!chartObjectRef.current) {
    return;
  }

  const {price: priceSeries} = chartObjectRef.current.initData.series;

  const decimalPlaces = getDecimalPlaces(chartDataRef.current.contract.minTick);

  const leftoverLevels = new Set(Object.keys(chartObjectRef.current.initData.lines[objectKey]));

  const currentPx = chartDataRef.current.data.at(-1);
  const data = getData(e);

  if (!currentPx) {
    return;
  }

  if (!data) {
    // No data available, should remove all Px lines
    removePxLines(e, opts, leftoverLevels, priceSeries);
    return;
  }

  for (const dataEntry of data) {
    const price = getPx(dataEntry);
    const priceLine = chartObjectRef.current.initData.lines[objectKey][price];
    const title = getLabelTitle(dataEntry, currentPx.close, decimalPlaces);

    if (priceLine) {
      priceLine.applyOptions({title});
    } else {
      chartObjectRef.current.initData.lines[objectKey][price] = priceSeries.createPriceLine({
        price,
        axisLabelVisible: true,
        title,
        color: getPxLineColor(dataEntry),
        lineWidth: 2,
        lineStyle: getPxLineStyle(dataEntry),
      });
    }

    leftoverLevels.delete(price.toString());
  }

  removePxLines(e, opts, leftoverLevels, priceSeries);
};
