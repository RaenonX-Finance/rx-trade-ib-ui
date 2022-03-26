import React from 'react';

import {AlertTemplateProps} from 'react-alert';
import Alert from 'react-bootstrap/Alert';


export const PopupAlert = ({message}: AlertTemplateProps) => {
  if (typeof message === 'string') {
    return (
      <Alert variant="light">
        {message}
      </Alert>
    );
  }

  return <>{message}</>;
};
