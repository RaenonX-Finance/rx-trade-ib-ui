import {ISeriesApi, LineStyle, LineWidth} from 'lightweight-charts';

import {getDecimalPlaces} from '../../../../../utils/calc';
import {OnPxChartUpdatedEvent, PxChartLayoutConfigKeys, PxChartLines} from '../../type';


export type HandlePxSeriesOptions< T> = {
  objectKey: keyof PxChartLines,
  getData: (e: OnPxChartUpdatedEvent) => T[] | undefined,
  getPx: (data: T) => number,
  getPxLineColor: (data: T) => string,
  getPxLineStyle: (data: T) => LineStyle,
  getLineWidth: (data: T) => LineWidth,
  getAxisLabelVisible: (data: T) => boolean,
  getLabelTitle: (data: T, currentPx: number, decimalPlaces: number) => string,
  configKey?: PxChartLayoutConfigKeys,
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
    const level = parseFloat(leftOverLevel);
    const pxLine = chartObjectRef.current.initData.lines[objectKey][level];

    delete chartObjectRef.current.initData.lines[objectKey][level];

    if (pxLine) {
      // Price line could be `undefined` if already removed
      pxSeries.removePriceLine(pxLine);
    }
  }
};

export const handlePxLines = <T>(e: OnPxChartUpdatedEvent, opts: HandlePxSeriesOptions<T>) => {
  const {chartDataRef, chartObjectRef, layoutConfig} = e;
  const {
    objectKey,
    configKey,
    getData,
    getPx,
    getLabelTitle,
    getPxLineColor,
    getPxLineStyle,
    getAxisLabelVisible,
    getLineWidth,
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

  if (!data || (configKey && !layoutConfig[configKey].enable)) {
    // No data available / layout config not enabled, remove all Px lines
    removePxLines(e, opts, leftoverLevels, priceSeries);
    return;
  }

  for (const dataEntry of data) {
    const price = getPx(dataEntry);
    const priceLine = chartObjectRef.current.initData.lines[objectKey][price];
    const title = getLabelTitle ? getLabelTitle(dataEntry, currentPx.close, decimalPlaces) : '';

    if (priceLine) {
      priceLine.applyOptions({title});
    } else {
      chartObjectRef.current.initData.lines[objectKey][price] = priceSeries.createPriceLine({
        price,
        axisLabelVisible: getAxisLabelVisible(dataEntry),
        lineVisible: true,
        title,
        color: getPxLineColor(dataEntry),
        lineWidth: getLineWidth(dataEntry),
        lineStyle: getPxLineStyle(dataEntry),
      });
    }

    leftoverLevels.delete(price.toString());
  }

  removePxLines(e, opts, leftoverLevels, priceSeries);
};
