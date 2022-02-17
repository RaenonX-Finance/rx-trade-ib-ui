import {createSlice} from '@reduxjs/toolkit';

import {OpenOrder} from '../../types/openOrder';
import {openOrderDispatchers} from './dispatchers';
import {OPEN_ORDER_STATE_NAME, OpenOrderDispatcherName, OpenOrderState} from './types';


const initialState: OpenOrderState = {
  openOrders: {},
  poll: true,
};

const slice = createSlice({
  name: OPEN_ORDER_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      openOrderDispatchers[OpenOrderDispatcherName.UPDATE],
      (state: OpenOrderState, {payload}: {payload: OpenOrder}) => {
        // Remove all then add it back
        state.openOrders = {};
        Object
          .entries(payload)
          .forEach(([key, value]) => state.openOrders[parseInt(key)] = value);
      },
    );
    builder.addCase(
      openOrderDispatchers[OpenOrderDispatcherName.SET_POLL],
      (state: OpenOrderState, {payload}: {payload: boolean}) => {
        state.poll = payload;
      },
    );
  },
});

export default slice.reducer;
