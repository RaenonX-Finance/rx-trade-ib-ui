import {createAction} from '@reduxjs/toolkit';

import {PxDataSocket} from '../../types/pxData';
import {PxDataMarket} from '../../types/pxDataMarket';
import {PxDataDispatcherName} from './types';


export const pxDataDispatchers = {
  [PxDataDispatcherName.INIT]: createAction<PxDataSocket[]>(PxDataDispatcherName.INIT),
  [PxDataDispatcherName.UPDATE]: createAction<PxDataSocket>(PxDataDispatcherName.UPDATE),
  [PxDataDispatcherName.UPDATE_MARKET]: createAction<PxDataMarket>(PxDataDispatcherName.UPDATE_MARKET),
};
