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
  vwap: ISeriesApi<'Line'>,
};

export type PxChartLines = {
  srLevelLines: Record<number, IPriceLine>,
};

export type PxChartLegendData = {
  epochSec: number,
  decimals: number,
  open: number,
  high: number,
  low: number,
  close: number,
  vwap: number,
};

export type PxChartReturnData = {
  series: PxChartSeries,
  lines: PxChartLines,
};

export type OnPxChartInitEvent = OnChartInitEvent<
  PxData,
  PxChartLegendData
>;

export type PxChartInitEventHandler = ChartInitEventHandler<
  PxData,
  PxChartReturnData,
  PxChartLegendData
>;

export type OnPxChartUpdatedEvent = OnChartDataUpdatedEvent<
  PxData,
  PxChartReturnData,
  PxChartLegendData
>;

export type PxChartUpdatedEventHandler = ChartDataUpdatedEventHandler<
  PxData,
  PxChartReturnData,
  PxChartLegendData
>;
