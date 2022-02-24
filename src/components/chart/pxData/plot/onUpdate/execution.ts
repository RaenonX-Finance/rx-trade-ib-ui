import {SeriesMarker, Time, UTCTimestamp} from 'lightweight-charts';

import {ExecutionSide} from '../../../../../types/common';
import {OnPxChartUpdatedEvent} from '../../type';
import {longLighterColor, shortLighterColor} from '../const';


type MarkerConfig = Pick<SeriesMarker<Time>, 'position' | 'shape'>;

const sideToMarkerConfig: {[side in ExecutionSide]: MarkerConfig} = {
  BOT: {
    position: 'belowBar',
    shape: 'arrowUp',
  },
  SLD: {
    position: 'aboveBar',
    shape: 'arrowDown',
  },
};

export const handleExecution = ({chartDataRef, chartObjectRef, payload, layoutConfig}: OnPxChartUpdatedEvent) => {
  const {execution} = payload;

  if (!chartObjectRef.current) {
    return;
  }

  const {price} = chartObjectRef.current.initData.series;

  if (!execution?.length || !layoutConfig.marker.enable) {
    price.setMarkers([]);
    return;
  }

  price.setMarkers(execution.map((props) => {
    const {epochSec, side, quantity, realizedPnL} = props;

    return {
      // Displayed marker somehow has a single period of time offset
      time: epochSec - chartDataRef.current.periodSec as UTCTimestamp,
      ...sideToMarkerConfig[side],
      color: realizedPnL ? shortLighterColor : longLighterColor,
      text: quantity.toFixed(0),
    };
  }));
};
