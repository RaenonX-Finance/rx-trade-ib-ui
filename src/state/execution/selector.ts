import {useSelector} from 'react-redux';

import {ReduxState} from '../types';
import {ExecutionSelectorReturn} from './types';


export const useExecutionSelector = (): ExecutionSelectorReturn => {
  return useSelector((state: ReduxState) => state.execution);
};
