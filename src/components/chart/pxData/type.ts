import {IPriceLine, ISeriesApi} from 'lightweight-charts';

import {ExecutionGroup} from '../../../types/execution';
import {CustomSrLevel} from '../../../types/init';
import {OpenOrderData} from '../../../types/openOrder';
import {PositionData} from '../../../types/position';
import {PxData, PxDataBar} from '../../../types/pxData';
import {Optional} from '../../../utils/types';
import {
  ChartDataUpdatedEventHandler,
  ChartInitEventHandler,
  OnChartDataUpdatedEvent,
  OnChartInitEvent,
} from '../base/type';


export type PxChartSeries = {
  price: ISeriesApi<'Candlestick'>,
  vwap: ISeriesApi<'Line'>,
  sma: Record<number, ISeriesApi<'Line'>>,
  ema120: ISeriesApi<'Line'>,
  avgCost: IPriceLine | null,
  orderEntry: IPriceLine | null,
};

export type PxChartLines = {
  srLevelLines: Record<number, IPriceLine>,
  openOrders: Record<number, IPriceLine>,
};

export type PxChartLegendData = Optional<PxDataBar, 'ema120' | 'vwap'> & {
  decimals: number,
};

export type PxChartLayoutConfigKeys =
  'vwap' |
  'ema120' |
  'sma' |
  'srLevel' |
  'srLevelWeak' |
  'extrema' |
  'marker';

export type PxChartLayoutConfigEntry = {
  title: string,
  enable: boolean,
  group: string,
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
  customSrLevels: CustomSrLevel[] | undefined,
};

export type OnPxChartInitEvent = OnChartInitEvent<
  PxData,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfig,
  PxChartPayload
>;

export type PxChartInitEventHandler = ChartInitEventHandler<
  PxData,
  PxChartInitData,
  PxChartLegendData,
  PxChartLayoutConfig,
  PxChartPayload
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
