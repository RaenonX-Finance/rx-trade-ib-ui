import {createSlice} from '@reduxjs/toolkit';

import {OpenOrder} from '../../types/openOrder';
import {openOrderDispatchers} from './dispatchers';
import {OPEN_ORDER_STATE_NAME, OpenOrderDispatcherName, OpenOrderState} from './types';


const initialState: OpenOrderState = {};

const slice = createSlice({
  name: OPEN_ORDER_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      openOrderDispatchers[OpenOrderDispatcherName.UPDATE],
      (state: OpenOrderState, {payload}: {payload: OpenOrder}) => {
        // Remove all open orders then add it back
        Object.keys(state).forEach((key) => delete state[parseInt(key)]);
        Object.entries(payload).forEach(([key, value]) => state[parseInt(key)] = value);
      },
    );
  },
});

export default slice.reducer;
