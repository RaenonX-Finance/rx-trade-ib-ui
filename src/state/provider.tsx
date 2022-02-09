import React from 'react';

import {Provider} from 'react-redux';

import {createStore} from './store';
import {ReduxStore} from './types';


export type ReduxProviderProps = {
  reduxStore?: ReduxStore,
  persist?: boolean,
};

export const ReduxProvider = ({
  children, reduxStore,
}: React.PropsWithChildren<ReduxProviderProps>) => {
  if (!reduxStore) {
    reduxStore = createStore();
  }

  return (
    <Provider store={reduxStore}>
      {children}
    </Provider>
  );
};
