import {PxDataSupportResistance} from '../../../../../types/pxData';
import {OnPxChartUpdatedEvent} from '../../type';
import {getSrLevelColor, srLevelLineStyle, srLevelLineWidth, srLevelLineWidthStrong} from '../const';
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
      getLabelTitle: ({strengthCount}) => strengthCount.toString(),
      configKey: 'srLevel',
    },
  );
};
