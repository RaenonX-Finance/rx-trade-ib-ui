import React from 'react';

import {IChartApi} from 'lightweight-charts';

import {OrderPanelState} from '../../orderPanel/type';


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

export type InitChartPayload<T, L, A> = {
  chartDataRef: React.MutableRefObject<T>,
  setObject: ChartSetStateObjects<L>,
  chartContainer: HTMLDivElement,
  layoutConfig: A,
};

export type UseChartPayload<T, R, L, A, P> = {
  initChart: ChartInitEventHandler<T, R, L, A, P>,
  onDataUpdated: () => void,
};

export type UseChartReturn<T, R, L, A, P> = {
  makeChart: (payload: InitChartPayload<T, L, A> & P) => void,
  chartRef: React.MutableRefObject<IChartApi | undefined>,
  chartObjectRef: React.MutableRefObject<ChartObjectRef<R> | undefined>,
};

export type OnChartChangedEventCommon<T, R, L, A> = {
  chartRef: React.MutableRefObject<IChartApi | undefined>,
  chartDataRef: React.MutableRefObject<T>,
  chartObjectRef: React.MutableRefObject<ChartObjectRef<R> | undefined>,
  setObject: ChartSetStateObjects<L>,
  layoutConfig: A,
};

export type OnChartInitEvent<T, R, L, A, P = {}> =
  InitChartPayload<T, L, A> &
  OnChartChangedEventCommon<T, R, L, A> &
  P;

export type ChartInitEventHandler<T, R, L, A, P = {}> = (e: OnChartInitEvent<T, R, L, A, P>) => R;

export type OnChartDataUpdatedEvent<T, P, R, L, A> = OnChartChangedEventCommon<T, R, L, A> & {
  payload: P,
  order: OrderPanelState,
};

export type ChartDataUpdatedEventHandler<T, P, R, L, A> = (e: OnChartDataUpdatedEvent<T, P, R, L, A>) => void;
