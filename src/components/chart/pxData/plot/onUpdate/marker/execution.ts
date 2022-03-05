import {SeriesMarker, UTCTimestamp} from 'lightweight-charts';

import {ExecutionSide} from '../../../../../../types/common';
import {OnPxChartUpdatedEvent} from '../../../type';
import {longLighterColor, shortLighterColor} from '../../const';


type MarkerConfig = Pick<SeriesMarker<UTCTimestamp>, 'position' | 'shape'>;

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

export const handleExecution = ({
  chartDataRef, payload, layoutConfig,
}: OnPxChartUpdatedEvent): SeriesMarker<UTCTimestamp>[] => {
  const {execution} = payload;

  if (!execution?.length || !layoutConfig.marker.enable) {
    return [];
  }

  return execution.map((props) => {
    const {epochSec, side, quantity, realizedPnL} = props;

    return {
      // Displayed marker somehow has a single period of time offset
      time: epochSec - chartDataRef.current.periodSec as UTCTimestamp,
      ...sideToMarkerConfig[side],
      color: realizedPnL ? shortLighterColor : longLighterColor,
      text: quantity.toFixed(0),
    };
  });
};
