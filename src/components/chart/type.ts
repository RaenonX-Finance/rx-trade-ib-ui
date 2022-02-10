import {IChartApi, ISeriesApi} from 'lightweight-charts';

import {PxData} from '../../types/pxData';


export type ChartDefaultSeries = {
  price: ISeriesApi<'Candlestick'>,
};

export type ChartRef = {
  chart: IChartApi,
  element: HTMLElement,
  series: ChartDefaultSeries,
};

export type UseChartsReturn = {
  makeChart: (element: HTMLElement, data: PxData) => void,
} & ({
  chart: undefined,
  series: undefined,
} | {
  chart: IChartApi,
  series: ChartDefaultSeries,
});

export type OnChartInitializationEvent = {
  chart: IChartApi,
  data: PxData
};

export type ChartInitializationHandler = (e: OnChartInitializationEvent) => ChartDefaultSeries;

