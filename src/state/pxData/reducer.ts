import {createSlice} from '@reduxjs/toolkit';

import {PxData} from '../../types/pxData';
import {PxDataMarket} from '../../types/pxDataMarket';
import {updatePxDataBar} from '../../utils/calc';
import {pxDataDispatchers} from './dispatchers';
import {PX_DATA_STATE_NAME, PxDataDispatcherName, PxDataState} from './types';


const initialState: PxDataState = {};

const slice = createSlice({
  name: PX_DATA_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      pxDataDispatchers[PxDataDispatcherName.UPDATE],
      (state: PxDataState, {payload}: {payload: PxData}) => {
        state[payload.uniqueIdentifier] = payload;
      },
    );
    builder.addCase(
      pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET],
      (state: PxDataState, {payload}: {payload: PxDataMarket}) => {
        const {contractId, px} = payload;
        const pxData = state[contractId];
        const lastBar = pxData?.data.at(-1);

        if (!lastBar) {
          return;
        }

        pxData.data[pxData.data.length - 1] = updatePxDataBar(lastBar, px);
      },
    );
  },
});

export default slice.reducer;
