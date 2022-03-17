import {ISeriesApi} from 'lightweight-charts';

import {toLineData} from '../../../utils';
import {AddPxLineOptions} from './type';


export const addPxLine = ({
  chartRef,
  chartDataRef,
  layoutConfig,
  keyOfConfig,
  keyForLineData,
  priceLineVisible,
  title,
  ...props
}: AddPxLineOptions): ISeriesApi<'Line'> => {
  if (!chartRef.current) {
    throw new Error(`Adding ${title} while the chart is not ready`);
  }

  const series = chartRef.current.addLineSeries({
    ...props,
    title,
    priceLineVisible,
    visible: layoutConfig[keyOfConfig].enable,
  });
  series.setData(chartDataRef.current.data.map(toLineData(keyForLineData)));

  return series;
};
