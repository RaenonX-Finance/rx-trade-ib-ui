import {LineSeriesPartialOptions} from 'lightweight-charts';

import {OnPxChartInitEvent, PxChartLayoutConfigKeys} from '../../../type';
import {ValidKeyForLineData} from '../../../utils';


export type AddPxLineOptionsFromInitEvent = Pick<OnPxChartInitEvent, 'chartRef' | 'chartDataRef' | 'layoutConfig'>;

export type AddPxLineOptions =
  AddPxLineOptionsFromInitEvent &
  LineSeriesPartialOptions & {
    keyOfConfig: PxChartLayoutConfigKeys,
    keyForLineData: ValidKeyForLineData,
  };
