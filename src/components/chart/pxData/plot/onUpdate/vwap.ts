import {OnPxChartUpdatedEvent} from '../../type';
import {toLineData} from '../../utils';
import {addVwap} from '../onInit/vwap';


export const handleVwap = (e: OnPxChartUpdatedEvent) => {
  const {chartDataRef, chartObjectRef, setObject, layoutConfig} = e;

  if (!chartObjectRef.current) {
    return;
  }

  const {vwap} = chartObjectRef.current.initData.series;

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice || !vwap) {
    if (layoutConfig.vwap.enable) {
      // Did not have VWAP, but config indicates should have it
      chartObjectRef.current.initData.series.vwap = addVwap(e);
    }

    return;
  }

  const pxLine = toLineData('vwap')(lastPrice);

  vwap.update(pxLine);
  setObject.legend((legend) => ({...legend, vwap: pxLine.value}));
};
