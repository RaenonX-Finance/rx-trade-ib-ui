import {createSlice} from '@reduxjs/toolkit';

import {ExecutionGroup} from '../../types/execution';
import {updateEpochSecToLocal} from '../../utils/time';
import {wholeStateUpdateReducer} from '../common';
import {executionDispatchers} from './dispatchers';
import {EXECUTION_STATE_NAME, ExecutionDispatcherName, ExecutionState} from './types';


const initialState: ExecutionState = {};

const slice = createSlice({
  name: EXECUTION_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      executionDispatchers[ExecutionDispatcherName.UPDATE],
      wholeStateUpdateReducer(
        (execution: ExecutionGroup[]) => execution.map((group) => ({
          ...group,
          epochSec: updateEpochSecToLocal(group.epochSec),
        })),
      ),
    );
  },
});

export default slice.reducer;
