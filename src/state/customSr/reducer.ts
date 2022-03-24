import {createSlice} from '@reduxjs/toolkit';

import {wholeStateUpdateReducer} from '../common';
import {customSrDispatchers} from './dispatchers';
import {CustomSrLevelState, SR_CUSTOM_STATE_NAME, SrCustomDispatcherName} from './types';


const initialState: CustomSrLevelState = {};

const slice = createSlice({
  name: SR_CUSTOM_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(customSrDispatchers[SrCustomDispatcherName.UPDATE], wholeStateUpdateReducer());
  },
});

export default slice.reducer;
