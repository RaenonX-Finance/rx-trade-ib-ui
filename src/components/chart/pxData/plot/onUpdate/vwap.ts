import {OnPxChartUpdatedEvent} from '../../type';
import {toLineData} from '../../utils';


export const handleVwap = ({chartDataRef, chartObjectRef, setObject}: OnPxChartUpdatedEvent) => {
  if (!chartObjectRef.current) {
    return;
  }

  const {vwap} = chartObjectRef.current.initData.series;

  const lastPrice = chartDataRef.current.data.at(-1);

  if (!lastPrice) {
    return;
  }

  const pxLine = toLineData('vwap')(lastPrice);

  vwap.update(pxLine);
  setObject.legend((legend) => ({...legend, vwap: pxLine.value}));
};
