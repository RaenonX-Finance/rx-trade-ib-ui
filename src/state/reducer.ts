import {combineReducers} from 'redux';

import customSrReducer from './customSr/reducer';
import errorReducer from './error/reducer';
import executionReducer from './execution/reducer';
import openOrderReducer from './openOrder/reducer';
import pnlReducer from './pnl/reducer';
import positionReducer from './position/reducer';
import pxDataReducer from './pxData/reducer';


const reducers = {
  pxData: pxDataReducer,
  position: positionReducer,
  openOrder: openOrderReducer,
  execution: executionReducer,
  pnl: pnlReducer,
  customSr: customSrReducer,
  error: errorReducer,
};

export const rootReducer = combineReducers(reducers);
