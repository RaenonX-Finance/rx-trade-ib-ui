import {configureStore} from '@reduxjs/toolkit';
import {useDispatch as useReduxDispatch} from 'react-redux';

import {rootReducer as reducer} from './reducer';
import {Dispatcher, PreloadedReduxState} from './types';


export const createStore = (preloadedState?: PreloadedReduxState) => configureStore({
  reducer,
  devTools: true,
  preloadedState,
});

export const useDispatch: () => Dispatcher = () => useReduxDispatch<Dispatcher>();
