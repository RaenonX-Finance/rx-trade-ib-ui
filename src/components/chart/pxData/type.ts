import {IPriceLine, ISeriesApi} from 'lightweight-charts';

import {OpenOrderData} from '../../../types/openOrder';
import {PositionData} from '../../../types/position';
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
  avgCost: IPriceLine | null,
};

export type PxChartLines = {
  srLevelLines: Record<number, IPriceLine>,
  openOrders: Record<number, IPriceLine>,
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

export type PxChartInitData = {
  series: PxChartSeries,
  lines: PxChartLines,
};

export type PxChartPayload = {
  position: PositionData | undefined,
  openOrder: OpenOrderData[] | undefined,
};

export type OnPxChartInitEvent = OnChartInitEvent<
  PxData,
  PxChartInitData,
  PxChartLegendData
>;

export type PxChartInitEventHandler = ChartInitEventHandler<
  PxData,
  PxChartInitData,
  PxChartLegendData
>;

export type OnPxChartUpdatedEvent = OnChartDataUpdatedEvent<
  PxData,
  PxChartPayload,
  PxChartInitData,
  PxChartLegendData
>;

export type PxChartUpdatedEventHandler = ChartDataUpdatedEventHandler<
  PxData,
  PxChartPayload,
  PxChartInitData,
  PxChartLegendData
>;
