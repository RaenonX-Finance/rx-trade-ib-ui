import {createAction} from '@reduxjs/toolkit';

import {PnLDict} from '../../types/pnl';
import {PnLDispatcherName} from './types';


export const pnlDispatchers = {
  [PnLDispatcherName.UPDATE]: createAction<PnLDict>(PnLDispatcherName.UPDATE),
};
