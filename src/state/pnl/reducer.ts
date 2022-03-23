import {createSlice} from '@reduxjs/toolkit';

import {wholeStateUpdateReducer} from '../common';
import {pnlDispatchers} from './dispatchers';
import {PNL_STATE_NAME, PnLDispatcherName, PnLState} from './types';


const initialState: PnLState = {
  config: {
    pxDiffVal: 50,
    pxDiffSmaRatio: 2,
    totalPnL: 2000,
    unrealizedPnL: 350,
  },
};

const slice = createSlice({
  name: PNL_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(pnlDispatchers[PnLDispatcherName.UPDATE], wholeStateUpdateReducer());
  },
});

export default slice.reducer;
