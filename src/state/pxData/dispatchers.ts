import {createAction} from '@reduxjs/toolkit';

import {PxData} from '../../types/pxData';
import {PxDataDispatcherName} from './types';


export const pxDataDispatchers = {
  [PxDataDispatcherName.UPDATE]: createAction<PxData>(PxDataDispatcherName.UPDATE),
};
