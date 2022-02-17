import {LineStyle} from 'lightweight-charts';

import {PxDataSupportResistance} from '../../../../../types/pxData';
import {formatSignedNumber} from '../../../../../utils/string';
import {OnPxChartUpdatedEvent} from '../../type';
import {getSrLevelColor} from '../utils';
import {handlePxLines} from './pxSeries';


export const handleSR = (e: OnPxChartUpdatedEvent) => {
  handlePxLines(
    e,
    {
      objectKey: 'srLevelLines',
      getData: (e) => e.chartDataRef.current.supportResistance,
      getPx: (data: PxDataSupportResistance) => data.level,
      getLabelTitle: ({level}, currentPx, decimalPlaces) => (
        formatSignedNumber(level - currentPx, decimalPlaces)
      ),
      getPxLineColor: ({type}) => getSrLevelColor(type),
      getPxLineStyle: () => LineStyle.SparseDotted,
    },
  );
};
