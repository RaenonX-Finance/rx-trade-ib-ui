import {useSelector} from 'react-redux';

import {ReduxState} from '../types';
import {CustomSrLevelSelectorReturn} from './types';


export const useCustomSrSelector = (): CustomSrLevelSelectorReturn => {
  return useSelector((state: ReduxState) => state.customSr);
};
