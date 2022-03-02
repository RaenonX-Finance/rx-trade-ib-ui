import {createAction} from '@reduxjs/toolkit';

import {ErrorMessage} from '../../types/error';
import {ErrorDispatcherName} from './types';


export const errorDispatchers = {
  [ErrorDispatcherName.UPDATE]: createAction<ErrorMessage>(ErrorDispatcherName.UPDATE),
  [ErrorDispatcherName.HIDE_ERROR]: createAction(ErrorDispatcherName.HIDE_ERROR),
};
