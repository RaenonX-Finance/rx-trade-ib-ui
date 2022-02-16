import React from 'react';

import {IChartApi} from 'lightweight-charts';

import {OrderPanelState} from '../orderPanel/type';


export type ChartSetState<T> = (updateFunc: (prevLegend: T) => T) => void;

export type ChartStatefulObjects<L, O> = {
  legend: L,
  order: O,
};

export type ChartSetStateObjects<L> = ChartStatefulObjects<ChartSetState<L>, ChartSetState<OrderPanelState>>;

export type ChartInitCalcObject<T, D> = (data: T) => D;

export type ChartCalcObjects<T, L> = ChartStatefulObjects<
  ChartInitCalcObject<T, L>,
  ChartInitCalcObject<T, OrderPanelState>
>;

export type ChartRenderObject<T, D> = (chartData: T, object: D) => React.ReactNode;

export type ChartRenderObjects<T, L> = {
  legend: ChartRenderObject<T, L>,
};

export type ChartObjectRef<T> = {
  chartContainer: HTMLDivElement,
  initData: T,
};

export type InitChartPayload<T, L> = {
  chartDataRef: React.MutableRefObject<T>,
  setObject: ChartSetStateObjects<L>,
  chartContainer: HTMLDivElement,
};

export type UseChartPayload<T, R, L> = {
  initChart: ChartInitEventHandler<T, R, L>,
  onDataUpdated: () => void,
};

export type UseChartReturn<T, R, L> = {
  makeChart: (payload: InitChartPayload<T, L>) => void,
  chartRef: React.MutableRefObject<IChartApi | undefined>,
  chartObjectRef: React.MutableRefObject<ChartObjectRef<R> | undefined>,
};

export type OnChartChangedEventCommon<T, R, L> = {
  chartDataRef: React.MutableRefObject<T>,
  chartObjectRef: React.MutableRefObject<ChartObjectRef<R> | undefined>,
  setObject: ChartSetStateObjects<L>,
};

export type OnChartInitEvent<T, R, L> = InitChartPayload<T, L> & OnChartChangedEventCommon<T, R, L> & {
  chartRef: React.MutableRefObject<IChartApi | undefined>,
};

export type ChartInitEventHandler<T, R, L> = (e: OnChartInitEvent<T, R, L>) => R;

export type OnChartDataUpdatedEvent<T, P, R, L> = OnChartChangedEventCommon<T, R, L> & {
  payload: P,
  order: OrderPanelState,
  showMarker: boolean,
};

export type ChartDataUpdatedEventHandler<T, P, R, L> = (e: OnChartDataUpdatedEvent<T, P, R, L>) => void;
