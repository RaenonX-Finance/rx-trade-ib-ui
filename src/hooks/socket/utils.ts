import React from 'react';

import {ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {Dispatcher} from '../../state/types';
import {SocketMessageHandler} from '../../types/socket/type';


export const useSocketEventHandler = <T>(
  dispatcher: Dispatcher,
  action: ActionCreatorWithPayload<T>,
  afterAction?: () => void,
): SocketMessageHandler => React.useCallback((
  message: string,
) => {
  const data: T = JSON.parse(message);

  dispatcher(action(data));
  if (afterAction) {
    afterAction();
  }
}, [afterAction]);
