import {useSelector} from 'react-redux';

import {ReduxState} from '../types';
import {OpenOrderSelectorReturn} from './types';


export const useOpenOrderSelector = (): OpenOrderSelectorReturn => {
  return useSelector((state: ReduxState) => state.openOrder);
};
