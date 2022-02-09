import {createSlice} from '@reduxjs/toolkit';

import {PxData} from '../../types/pxData';
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
  },
});

export default slice.reducer;
