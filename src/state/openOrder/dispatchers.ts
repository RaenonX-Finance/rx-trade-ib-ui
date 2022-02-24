import {createAction} from '@reduxjs/toolkit';

import {OpenOrder, OpenOrderData} from '../../types/openOrder';
import {OpenOrderDispatcherName} from './types';


export const openOrderDispatchers = {
  [OpenOrderDispatcherName.UPDATE]: createAction<OpenOrder>(OpenOrderDispatcherName.UPDATE),
  [OpenOrderDispatcherName.UPDATE_SINGLE]: createAction<OpenOrderData>(OpenOrderDispatcherName.UPDATE_SINGLE),
  [OpenOrderDispatcherName.SORT]: createAction(OpenOrderDispatcherName.SORT),
  [OpenOrderDispatcherName.SET_POLL]: createAction<boolean>(OpenOrderDispatcherName.SET_POLL),
};
