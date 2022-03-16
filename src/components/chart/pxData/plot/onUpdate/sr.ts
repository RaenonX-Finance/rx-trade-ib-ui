import {LineStyle} from 'lightweight-charts';

import {PxDataSupportResistance} from '../../../../../types/pxData';
import {formatSignedNumber} from '../../../../../utils/string';
import {OnPxChartUpdatedEvent} from '../../type';
import {srLevelColor} from '../const';
import {handlePxLines} from './pxSeries';


export const handleSR = (e: OnPxChartUpdatedEvent) => {
  handlePxLines(
    e,
    {
      objectKey: 'srLevelLines',
      axisLabelVisible: false,
      getData: (e) => e.chartDataRef.current.supportResistance,
      getPx: (data: PxDataSupportResistance) => data.level,
      getLabelTitle: ({level}, currentPx, decimalPlaces) => (
        formatSignedNumber(level - currentPx, decimalPlaces)
      ),
      getPxLineColor: () => srLevelColor,
      getPxLineStyle: () => LineStyle.Dotted,
      configKey: 'srLevel',
    },
  );
};
