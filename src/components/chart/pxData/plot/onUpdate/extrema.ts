import {UTCTimestamp} from 'lightweight-charts';

import {OnPxChartUpdatedEvent} from '../../type';


export const handleExtrema = ({chartDataRef, chartObjectRef, layoutConfig}: OnPxChartUpdatedEvent) => {
  if (!chartObjectRef.current) {
    return;
  }

  const {price} = chartObjectRef.current.initData.series;

  if (!layoutConfig.extrema.enable) {
    price.setMarkers([]);
    return;
  }

  const minData = chartDataRef.current.data.filter(({extrema}) => extrema.min);
  const maxData = chartDataRef.current.data.filter(({extrema}) => extrema.max);

  price.setMarkers(minData.map(({epochSec}) => ({
    // Displayed marker somehow has a single period of time offset
    time: epochSec - chartDataRef.current.periodSec as UTCTimestamp,
    position: 'belowBar',
    shape: 'arrowUp',
    color: '#ff2458',
    text: 'L',
  })));
  price.setMarkers(maxData.map(({epochSec}) => ({
    // Displayed marker somehow has a single period of time offset
    time: epochSec - chartDataRef.current.periodSec as UTCTimestamp,
    position: 'aboveBar',
    shape: 'arrowDown',
    color: '#00e071',
    text: 'H',
  })));
};
