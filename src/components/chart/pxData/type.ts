import {IPriceLine, ISeriesApi} from 'lightweight-charts';

import {ExecutionGroup} from '../../../types/execution';
import {OpenOrderData} from '../../../types/openOrder';
import {PositionData} from '../../../types/position';
import {PxData, PxDataBar} from '../../../types/pxData';
import {
  ChartDataUpdatedEventHandler,
  ChartInitEventHandler,
  OnChartDataUpdatedEvent,
  OnChartInitEvent,
} from '../base/type';


export type PxChartSeries = {
  price: ISeriesApi<'Candlestick'>,
  vwap: ISeriesApi<'Line'>,
  ema120: ISeriesApi<'Line'> | null,
  avgCost: IPriceLine | null,
  orderEntry: IPriceLine | null,
};

export type PxChartLines = {
  srLevelLines: Record<number, IPriceLine>,
  openOrders: Record<number, IPriceLine>,
};

export type PxChartLegendData = PxDataBar & {
  decimals: number,
};

export type PxChartLayoutConfigKeys = 'ema120' | 'srLevel' | 'marker';

export type PxChartLayoutConfigEntry = {
  title: string,
  enable: boolean,
};

export type PxChartLayoutConfig = {[key in PxChartLayoutConfigKeys]: PxChartLayoutConfigEntry};

export type PxChartInitData = {
  series: PxChartSeries,
  lines: PxChartLines,
  position: PositionData | null,
};

export type PxChartPayload = {
  position: PositionData | undefined,
  openOrder: Record<number, OpenOrderData> | undefined,
  execution: ExecutionGroup[] | undefined,
};

export type OnPxChartInitEvent = OnChartInitEvent<
  PxData,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfig
>;

export type PxChartInitEventHandler = ChartInitEventHandler<
  PxData,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfig
>;

export type OnPxChartUpdatedEvent = OnChartDataUpdatedEvent<
  PxData,
  PxChartPayload,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfig
>;

export type PxChartUpdatedEventHandler = ChartDataUpdatedEventHandler<
  PxData,
  PxChartPayload,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfig
>;
