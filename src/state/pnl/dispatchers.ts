import {createAction} from '@reduxjs/toolkit';

import {PnLDict, PnLWarningConfig} from '../../types/pnl';
import {PnLDispatcherName} from './types';


export const pnlDispatchers = {
  [PnLDispatcherName.UPDATE]: createAction<PnLDict>(PnLDispatcherName.UPDATE),
  [PnLDispatcherName.UPDATE_CONFIG]: createAction<PnLWarningConfig>(PnLDispatcherName.UPDATE_CONFIG),
};
