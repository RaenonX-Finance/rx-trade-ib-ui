import {ISeriesApi} from 'lightweight-charts';

import {KeysOfType} from '../../../../../../utils/types';
import {PxChartLayoutConfigKeys, PxChartLegendData, PxChartSeries} from '../../../type';
import {ValidKeyForLineData} from '../../../utils';


export type HandlePxLineOptions = {
  keyOfSeries: KeysOfType<PxChartSeries, ISeriesApi<'Line'> | null>,
  keyOfConfig: PxChartLayoutConfigKeys,
  keyOfLegendData: keyof PxChartLegendData,
  keyForLineData: ValidKeyForLineData,
};
