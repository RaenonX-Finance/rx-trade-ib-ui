import {createSlice} from '@reduxjs/toolkit';

import {openOrderDispatchers} from './dispatchers';
import {OPEN_ORDER_STATE_NAME, OpenOrderDispatcherName, OpenOrderState} from './types';


const getSortedOrderIds = (state: OpenOrderState) => Object.fromEntries(Object.entries(state.openOrders)
  .map(([key, orders]) => [
    key,
    Object.values(orders)
      .sort((a, b) => b.px - a.px)
      .map(({orderId}) => orderId),
  ]));

const initialState: OpenOrderState = {
  openOrders: {},
  sortedOrderIds: {},
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
        state.sortedOrderIds = [];

        const orderEntries = Object.entries(payload);

        // `state.openOrders`
        orderEntries
          .forEach(([key, value]) => state.openOrders[parseInt(key)] = value);
        // `state.sortedOrderIds`
        state.sortedOrderIds = getSortedOrderIds(state);
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
    builder.addCase(
      openOrderDispatchers[OpenOrderDispatcherName.SORT],
      (state: OpenOrderState) => {
        state.sortedOrderIds = getSortedOrderIds(state);
      },
    );
  },
});

export default slice.reducer;
