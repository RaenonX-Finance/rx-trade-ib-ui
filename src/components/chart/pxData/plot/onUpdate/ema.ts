import {OnPxChartUpdatedEvent} from '../../type';
import {toLineData} from '../../utils';


export const handleEma120 = ({chartDataRef, chartObjectRef, setObject}: OnPxChartUpdatedEvent) => {
  if (!chartObjectRef.current) {
    return;
  }

  const {ema120} = chartObjectRef.current.initData.series;

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  const pxLine = toLineData('ema120')(lastPrice);

  ema120.update(pxLine);
  setObject.legend((legend) => ({...legend, ema120: pxLine.value}));
};
