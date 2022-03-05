import {OnPxChartUpdatedEvent} from '../../../type';
import {handleExecution} from './execution';
import {handleExtrema} from './extrema';


export const handleMarkers = (e: OnPxChartUpdatedEvent) => {
  const {chartObjectRef} = e;

  if (!chartObjectRef.current) {
    return;
  }

  const {price} = chartObjectRef.current.initData.series;
  const markers = [
    ...handleExecution(e),
    ...handleExtrema(e),
  ].sort((a, b) => a.time - b.time);

  price.setMarkers(markers);
};
