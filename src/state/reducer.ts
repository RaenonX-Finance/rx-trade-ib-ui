import {combineReducers} from 'redux';

import executionReducer from './execution/reducer';
import openOrderReducer from './openOrder/reducer';
import positionReducer from './position/reducer';
import pxDataReducer from './pxData/reducer';


const reducers = {
  pxData: pxDataReducer,
  position: positionReducer,
  openOrder: openOrderReducer,
  execution: executionReducer,
};

export const rootReducer = combineReducers(reducers);
