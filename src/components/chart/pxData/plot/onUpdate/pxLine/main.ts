import {OnPxChartUpdatedEvent} from '../../../type';
import {toLineData} from '../../../utils';
import {HandlePxLineOptions} from './type';


export const handlePxLine = (e: OnPxChartUpdatedEvent, opts: HandlePxLineOptions) => {
  const {chartRef, chartDataRef, chartObjectRef, setObject, layoutConfig} = e;
  const {keyOfConfig, keyOfSeries, keyOfLegendData, keyForLineData, getAddedSeries} = opts;

  if (!chartObjectRef.current) {
    return;
  }

  const series = chartObjectRef.current.initData.series[keyOfSeries];
  const enabled = layoutConfig[keyOfConfig].enable;

  if (!enabled && series) {
    // Remove series according to the config
    chartRef.current?.removeSeries(series);
    chartObjectRef.current.initData.series[keyOfSeries] = null;
    return;
  }

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  if (!series) {
    if (enabled) {
      // Did not have EMA 120, but config indicates should have it
      chartObjectRef.current.initData.series[keyOfSeries] = getAddedSeries(e);
    }

    return;
  }

  const pxLine = toLineData(keyForLineData)(lastPrice);

  series.update(pxLine);
  setObject.legend((legend) => ({...legend, [keyOfLegendData]: pxLine.value}));
};
