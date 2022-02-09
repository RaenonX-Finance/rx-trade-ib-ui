import React from 'react';

import ReactDOM from 'react-dom';

import {App} from './layout/app';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ReduxProvider} from './state/provider';


ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <App/>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
