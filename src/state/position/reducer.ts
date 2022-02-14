import {createSlice} from '@reduxjs/toolkit';

import {wholeStateUpdateReducer} from '../common';
import {positionDispatchers} from './dispatchers';
import {POSITION_STATE_NAME, PositionDispatcherName, PositionState} from './types';


const initialState: PositionState = {};

const slice = createSlice({
  name: POSITION_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(positionDispatchers[PositionDispatcherName.UPDATE], wholeStateUpdateReducer());
  },
});

export default slice.reducer;
