import {useSelector} from 'react-redux';

import {ReduxState} from '../types';
import {PxDataSelectorReturn} from './types';


export const usePxDataSelector = (): PxDataSelectorReturn => {
  return useSelector((state: ReduxState) => state.pxData);
};
