import {createSlice} from '@reduxjs/toolkit';

import {Position} from '../../types/position';
import {positionDispatchers} from './dispatchers';
import {POSITION_STATE_NAME, PositionDispatcherName, PositionState} from './types';


const initialState: PositionState = {};

const slice = createSlice({
  name: POSITION_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      positionDispatchers[PositionDispatcherName.UPDATE],
      (state: PositionState, {payload}: {payload: Position}) => {
        Object.entries(payload).forEach(([key, value]) => state[parseInt(key)] = value);
      },
    );
  },
});

export default slice.reducer;
