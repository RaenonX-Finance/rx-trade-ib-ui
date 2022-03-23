import {useSelector} from 'react-redux';

import {ReduxState} from '../types';
import {PnLSelectorReturn} from './types';


export const usePnLSelector = (): PnLSelectorReturn => {
  return useSelector((state: ReduxState) => state.pnl);
};
