import {PxDataSupportResistance} from '../../../../types/pxData';
import {srLevelColor, srLevelColorEnhanced} from './const';


export const getSrLevelColor = (type: PxDataSupportResistance['type']): string => {
  return (type.fractal && type.window) ? srLevelColorEnhanced : srLevelColor;
};
