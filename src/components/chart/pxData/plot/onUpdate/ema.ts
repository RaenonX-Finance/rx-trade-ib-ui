import {OnPxChartUpdatedEvent} from '../../type';
import {handlePxLine} from './pxLine/main';


export const handleEma120 = (e: OnPxChartUpdatedEvent) => {
  handlePxLine(
    e,
    {
      keyOfSeries: 'ema120',
      keyOfConfig: 'ema120',
      keyOfLegendData: 'ema120',
      keyForLineData: 'ema120',
    },
  );
};
