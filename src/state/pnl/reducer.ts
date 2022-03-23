import {createSlice} from '@reduxjs/toolkit';

import {PnLWarningConfig} from '../../types/pnl';
import {wholeStateUpdateReducer} from '../common';
import {pnlDispatchers} from './dispatchers';
import {PNL_STATE_NAME, PnLDispatcherName, PnLState} from './types';


const initialState: PnLState = {
  config: null,
};

const slice = createSlice({
  name: PNL_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(pnlDispatchers[PnLDispatcherName.UPDATE], wholeStateUpdateReducer());
    builder.addCase(
      pnlDispatchers[PnLDispatcherName.UPDATE_CONFIG],
      (state: PnLState, {payload}: {payload: PnLWarningConfig}) => {
        state.config = payload;
      },
    );
  },
});

export default slice.reducer;
