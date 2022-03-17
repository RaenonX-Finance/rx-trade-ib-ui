import {LineSeriesPartialOptions} from 'lightweight-charts';

import {OnPxChartInitEvent, PxChartLayoutConfigKeys} from '../../../type';
import {ValidKeyForLineData} from '../../../utils';


export type AddPxLineOptionsFromInitEvent = Pick<OnPxChartInitEvent, 'chartRef' | 'chartDataRef' | 'layoutConfig'>;

export type AddPxLineOptions =
  AddPxLineOptionsFromInitEvent &
  Pick<LineSeriesPartialOptions, 'lineWidth' | 'lastPriceAnimation'> & {
    keyOfConfig: PxChartLayoutConfigKeys,
    keyForLineData: ValidKeyForLineData,
    title: string,
    color: string,
  };
