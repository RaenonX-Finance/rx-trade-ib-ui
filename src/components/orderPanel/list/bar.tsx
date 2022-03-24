import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


type Props = {
  onReset: () => void,
};

export const OrderListButtonBar = ({onReset}: Props) => {
  return (
    <Row className="text-end mb-2">
      <Col>
        <Button size="sm" variant="outline-danger" onClick={onReset}>
          Reset
        </Button>
      </Col>
    </Row>
  );
};
