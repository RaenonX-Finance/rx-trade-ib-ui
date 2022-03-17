import {PxDataSupportResistance} from '../../../../../types/pxData';
import {OnPxChartUpdatedEvent} from '../../type';
import {getSrLevelColor, srLevelLineStyle, srLevelLineWidth, srLevelLineWidthStrong} from '../const';
import {getSrLevelLabel} from '../utils';
import {handlePxLines} from './pxSeries';


export const handleSR = (e: OnPxChartUpdatedEvent) => {
  handlePxLines<PxDataSupportResistance>(
    e,
    {
      objectKey: 'srLevelLines',
      getData: (e) => e.chartDataRef.current.supportResistance,
      getPx: ({level}) => level,
      getPxLineColor: ({strength}) => getSrLevelColor(strength),
      getPxLineStyle: () => srLevelLineStyle,
      getLineWidth: ({strength}) => strength > 0.5 ? srLevelLineWidthStrong : srLevelLineWidth,
      getAxisLabelVisible: ({strength}) => strength > 0.5,
      getLabelTitle: ({strength, level}, _, decimalPlaces) => (
        getSrLevelLabel(level, decimalPlaces, strength)
      ),
      configKey: 'srLevel',
    },
  );
};
