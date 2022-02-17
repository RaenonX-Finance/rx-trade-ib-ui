import React from 'react';

import {AlertComponentProps} from 'react-alert';
import Alert from 'react-bootstrap/Alert';


export const PopupAlert = ({message}: AlertComponentProps) => {
  if (typeof message === 'string') {
    return (
      <Alert variant="light">
        {message}
      </Alert>
    );
  }

  return <>{message}</>;
};
