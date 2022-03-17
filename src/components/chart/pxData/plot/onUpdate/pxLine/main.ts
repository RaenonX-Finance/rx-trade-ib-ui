import {OnPxChartUpdatedEvent} from '../../../type';
import {toLineData} from '../../../utils';
import {HandlePxLineOptions} from './type';


export const handlePxLine = (e: OnPxChartUpdatedEvent, opts: HandlePxLineOptions) => {
  const {chartDataRef, chartObjectRef, setObject, layoutConfig} = e;
  const {keyOfConfig, keyOfSeries, keyOfLegendData, keyForLineData} = opts;

  if (!chartObjectRef.current) {
    return;
  }

  const series = chartObjectRef.current.initData.series[keyOfSeries];

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  const pxLine = toLineData(keyForLineData)(lastPrice);

  series.update(pxLine);
  series.applyOptions({visible: layoutConfig[keyOfConfig].enable});
  setObject.legend((legend) => ({...legend, [keyOfLegendData]: pxLine.value}));
};
