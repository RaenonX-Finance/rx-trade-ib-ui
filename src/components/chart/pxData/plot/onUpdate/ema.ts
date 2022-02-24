import {OnPxChartUpdatedEvent} from '../../type';
import {toLineData} from '../../utils';
import {addEma120} from '../onInit/ema';


export const handleEma120 = (e: OnPxChartUpdatedEvent) => {
  const {chartRef, chartDataRef, chartObjectRef, setObject, layoutConfig} = e;

  if (!chartObjectRef.current) {
    return;
  }

  const {ema120} = chartObjectRef.current.initData.series;

  if (!layoutConfig.ema120.enable && ema120) {
    // Remove EMA 120 according to the config
    chartRef.current?.removeSeries(ema120);
    chartObjectRef.current.initData.series.ema120 = null;
    return;
  }

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  if (!ema120) {
    if (layoutConfig.ema120.enable) {
      // Did not have EMA 120, but config indicates should have it
      chartObjectRef.current.initData.series.ema120 = addEma120(e);
    }

    return;
  }

  const pxLine = toLineData('ema120')(lastPrice);

  ema120.update(pxLine);
  setObject.legend((legend) => ({...legend, ema120: pxLine.value}));
};
