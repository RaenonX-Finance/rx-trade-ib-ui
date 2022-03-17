import {PxDataSupportResistance} from '../../../../../types/pxData';
import {OnPxChartUpdatedEvent} from '../../type';
import {getSrLevelColor, srLevelLineStyle, srLevelLineWidth} from '../const';
import {handlePxLines} from './pxSeries';


export const handleSR = (e: OnPxChartUpdatedEvent) => {
  handlePxLines(
    e,
    {
      objectKey: 'srLevelLines',
      axisLabelVisible: false,
      lineWidth: srLevelLineWidth,
      getData: (e) => e.chartDataRef.current.supportResistance,
      getPx: (data: PxDataSupportResistance) => data.level,
      getPxLineColor: ({strength}) => getSrLevelColor(strength),
      getPxLineStyle: () => srLevelLineStyle,
      configKey: 'srLevel',
    },
  );
};
