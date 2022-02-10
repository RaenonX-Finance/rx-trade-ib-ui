import {ISeriesApi} from 'lightweight-charts';


export type PxChartDefaultSeries = {
  price: ISeriesApi<'Candlestick'>,
};

export type PxChartReturnData = {
  series: PxChartDefaultSeries,
};

