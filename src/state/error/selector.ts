import {useSelector} from 'react-redux';

import {ReduxState} from '../types';
import {ErrorSelectorReturn} from './types';


export const useErrorSelector = (): ErrorSelectorReturn => {
  return useSelector((state: ReduxState) => state.error);
};
