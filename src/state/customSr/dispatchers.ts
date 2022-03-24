import {createAction} from '@reduxjs/toolkit';

import {CustomSrLevelDict} from '../../types/init';
import {SrCustomDispatcherName} from './types';


export const customSrDispatchers = {
  [SrCustomDispatcherName.UPDATE]: createAction<CustomSrLevelDict>(SrCustomDispatcherName.UPDATE),
};
