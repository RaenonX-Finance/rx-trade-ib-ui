import {combineReducers} from 'redux';

import pxDataReducer from './pxData/reducer';


const reducers = {
  pxData: pxDataReducer,
};

export const rootReducer = combineReducers(reducers);
