import {useSelector} from 'react-redux';

import {ReduxState} from '../types';
import {PositionSelectorReturn} from './types';


export const usePositionSelector = (): PositionSelectorReturn => {
  return useSelector((state: ReduxState) => state.position);
};
