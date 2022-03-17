import {OnPxChartUpdatedEvent} from '../../type';
import {handlePxLine} from './pxLine/main';


export const handleVwap = (e: OnPxChartUpdatedEvent) => {
  handlePxLine(
    e,
    {
      keyOfSeries: 'vwap',
      keyOfConfig: 'vwap',
      keyOfLegendData: 'vwap',
      keyForLineData: 'vwap',
    },
  );
};
