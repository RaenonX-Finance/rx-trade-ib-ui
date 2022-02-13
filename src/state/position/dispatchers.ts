import {createAction} from '@reduxjs/toolkit';

import {Position} from '../../types/position';
import {PositionDispatcherName} from './types';


export const positionDispatchers = {
  [PositionDispatcherName.UPDATE]: createAction<Position>(PositionDispatcherName.UPDATE),
};
