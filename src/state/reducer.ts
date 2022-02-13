import {combineReducers} from 'redux';

import positionReducer from './position/reducer';
import pxDataReducer from './pxData/reducer';


const reducers = {
  pxData: pxDataReducer,
  position: positionReducer,
};

export const rootReducer = combineReducers(reducers);
