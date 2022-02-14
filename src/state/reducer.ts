import {combineReducers} from 'redux';

import openOrderReducer from './openOrder/reducer';
import positionReducer from './position/reducer';
import pxDataReducer from './pxData/reducer';


const reducers = {
  pxData: pxDataReducer,
  position: positionReducer,
  openOrder: openOrderReducer,
};

export const rootReducer = combineReducers(reducers);
