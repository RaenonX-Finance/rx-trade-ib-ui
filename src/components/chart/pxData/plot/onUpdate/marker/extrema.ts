import {SeriesMarker, UTCTimestamp} from 'lightweight-charts';

import {OnPxChartUpdatedEvent} from '../../../type';
import {bearishColor, bullishColor} from '../../const';


export const handleExtrema = ({
  chartDataRef, layoutConfig,
}: OnPxChartUpdatedEvent): SeriesMarker<UTCTimestamp>[] => {
  if (!layoutConfig.extrema.enable) {
    return [];
  }

  const minData = chartDataRef.current.data.filter(({extremaMin}) => extremaMin);
  const maxData = chartDataRef.current.data.filter(({extremaMax}) => extremaMax);

  return [
    ...minData.map<SeriesMarker<UTCTimestamp>>(({epochSec}) => ({
      time: epochSec as UTCTimestamp,
      position: 'belowBar',
      shape: 'arrowUp',
      color: bearishColor,
      text: 'L',
    })),
    ...maxData.map<SeriesMarker<UTCTimestamp>>(({epochSec}) => ({
      time: epochSec as UTCTimestamp,
      position: 'aboveBar',
      shape: 'arrowDown',
      color: bullishColor,
      text: 'H',
    })),
  ];
};
