import {createAction} from '@reduxjs/toolkit';

import {PxData} from '../../types/pxData';
import {PxDataMarket} from '../../types/pxDataMarket';
import {PxDataDispatcherName} from './types';


export const pxDataDispatchers = {
  [PxDataDispatcherName.INIT]: createAction<PxData[]>(PxDataDispatcherName.INIT),
  [PxDataDispatcherName.UPDATE]: createAction<PxData>(PxDataDispatcherName.UPDATE),
  [PxDataDispatcherName.UPDATE_MARKET]: createAction<PxDataMarket>(PxDataDispatcherName.UPDATE_MARKET),
};
