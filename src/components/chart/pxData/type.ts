import {IPriceLine, ISeriesApi} from 'lightweight-charts';

import {PxData} from '../../../types/pxData';
import {
  ChartDataUpdatedEventHandler,
  ChartInitEventHandler,
  OnChartDataUpdatedEvent,
  OnChartInitEvent,
} from '../base/type';


export type PxChartSeries = {
  price: ISeriesApi<'Candlestick'>,
};

export type PxChartLines = {
  srLevelLines: Record<number, IPriceLine>,
};

export type PxChartReturnData = {
  series: PxChartSeries,
  lines: PxChartLines,
};

export type OnPxChartInitEvent = OnChartInitEvent<PxData>;

export type PxChartInitEventHandler = ChartInitEventHandler<PxData, PxChartReturnData>;

export type OnPxChartUpdatedEvent = OnChartDataUpdatedEvent<PxData, PxChartReturnData>;

export type PxChartUpdatedEventHandler = ChartDataUpdatedEventHandler<PxData, PxChartReturnData>;
