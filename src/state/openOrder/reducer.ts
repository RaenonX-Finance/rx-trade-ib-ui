import {createSlice} from '@reduxjs/toolkit';

import {wholeStateUpdateReducer} from '../common';
import {openOrderDispatchers} from './dispatchers';
import {OPEN_ORDER_STATE_NAME, OpenOrderDispatcherName, OpenOrderState} from './types';


const initialState: OpenOrderState = {};

const slice = createSlice({
  name: OPEN_ORDER_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(openOrderDispatchers[OpenOrderDispatcherName.UPDATE], wholeStateUpdateReducer());
  },
});

export default slice.reducer;
