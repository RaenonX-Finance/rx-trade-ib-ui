import React from 'react';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


type Props = {
  label: string,
  value: number | string,
};

export const StatsField = ({label, value}: Props) => {
  return (
    <FloatingLabel label={label} className="mb-3">
      <Form.Control
        size="lg"
        type="number"
        placeholder=""
        className="text-end pe-0"
        value={value}
        disabled
      />
    </FloatingLabel>
  );
};
