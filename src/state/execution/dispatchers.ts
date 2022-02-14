import {createAction} from '@reduxjs/toolkit';

import {Execution} from '../../types/execution';
import {ExecutionDispatcherName} from './types';


export const executionDispatchers = {
  [ExecutionDispatcherName.UPDATE]: createAction<Execution>(ExecutionDispatcherName.UPDATE),
};
