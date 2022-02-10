import React from 'react';

import {IChartApi} from 'lightweight-charts';


export type ChartRef<T> = {
  chart: IChartApi,
  element: HTMLElement,
  initData: T,
};

export type InitChartPayload<T, L> = {
  element: HTMLElement,
  chartDataRef: React.MutableRefObject<T>,
  setLegend: ChartSetLegend<L>,
};

export type UseChartPayload<T, R, L> = {
  initChart: ChartInitEventHandler<T, R, L>,
  calculateLegend: ChartInitCalculateLegend<T, L>,
  setLegend: ChartSetLegend<L>,
};

export type UseChartReturn<T, R, L> = {
  makeChart: (payload: InitChartPayload<T, L>) => void,
  chart?: IChartApi,
  initData?: R,
};

export type ChartSetLegend<L> = (updateFunc: (prevLegend: L) => L) => void;

export type OnChartInitEvent<T, L> = {
  chart: IChartApi,
  chartDataRef: React.MutableRefObject<T>,
  setLegend: ChartSetLegend<L>,
};

export type ChartInitEventHandler<T, R, L> = (e: OnChartInitEvent<T, L>) => R;

export type ChartInitCalculateLegend<T, L> = (data: T) => L;

export type OnChartDataUpdatedEvent<T, R, L> = {
  chart: IChartApi,
  chartDataRef: React.MutableRefObject<T>,
  initData: R,
  setLegend: ChartSetLegend<L>,
};

export type ChartDataUpdatedEventHandler<T, R, L> = (e: OnChartDataUpdatedEvent<T, R, L>) => void;
