import {IChartApi} from 'lightweight-charts';


export type ChartRef<T> = {
  chart: IChartApi,
  element: HTMLElement,
  initData: T,
};

export type UseChartReturn<T, R> = {
  makeChart: (element: HTMLElement, chartData: T) => void,
  chart?: IChartApi,
  initData?: R,
};

export type OnChartInitEvent<D> = {
  chart: IChartApi,
  chartData: D,
};

export type ChartInitEventHandler<T, R> = (e: OnChartInitEvent<T>) => R;

type OnChartDataUpdatedEvent<T, R> = {
  chart: IChartApi,
  chartData: T,
  initData: R,
};

export type ChartDataUpdatedEventHandler<T, R> = (e: OnChartDataUpdatedEvent<T, R>) => void;
