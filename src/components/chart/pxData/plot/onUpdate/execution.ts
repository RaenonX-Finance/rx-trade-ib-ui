import {SeriesMarker, Time, UTCTimestamp} from 'lightweight-charts';

import {ExecutionSide} from '../../../../../types/common';
import {OnPxChartUpdatedEvent} from '../../type';
import {tradeEntryColor, tradeExitColor} from '../const';


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

export const handleExecution = ({chartObjectRef, payload}: OnPxChartUpdatedEvent) => {
  const {execution} = payload;

  if (!chartObjectRef.current) {
    return;
  }

  const {price} = chartObjectRef.current.initData.series;

  if (!execution?.length) {
    price.setMarkers([]);
    return;
  }

  price.setMarkers(execution.map((props) => {
    const {epochSec, side, quantity, realizedPnL} = props;

    return {
      time: epochSec as UTCTimestamp,
      ...sideToMarkerConfig[side],
      color: realizedPnL ? tradeExitColor : tradeEntryColor,
      text: quantity.toFixed(0),
    };
  }));
};
