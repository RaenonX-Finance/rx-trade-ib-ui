import React from 'react';

import ReactDOM from 'react-dom';

import {App} from './layout/app';
import './styles/bootstrap.scss';
import './styles/index.scss';
import './styles/scrollbar.scss';
import {ReduxProvider} from './state/provider';


ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <App/>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
