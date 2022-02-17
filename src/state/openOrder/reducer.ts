import {createSlice} from '@reduxjs/toolkit';

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
      (state: OpenOrderState, {payload}) => {
        // Remove all then add it back
        state.openOrders = {};
        Object
          .entries(payload)
          .forEach(([key, value]) => state.openOrders[parseInt(key)] = value);
      },
    );
    builder.addCase(
      openOrderDispatchers[OpenOrderDispatcherName.SET_POLL],
      (state: OpenOrderState, {payload}) => {
        state.poll = payload;
      },
    );
    builder.addCase(
      openOrderDispatchers[OpenOrderDispatcherName.UPDATE_SINGLE],
      (state: OpenOrderState, {payload: order}) => {
        const {identifier} = order;

        state.openOrders[identifier][order.orderId] = order;
      },
    );
  },
});

export default slice.reducer;
