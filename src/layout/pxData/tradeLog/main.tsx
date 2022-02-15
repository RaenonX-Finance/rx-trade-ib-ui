import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';

import {ExecutionGroup} from '../../../types/execution';
import {TradeLogOffcanvas} from './body';


type Props = {
  executions: ExecutionGroup[],
  symbol: string,
};

export const TradeLog = ({executions, symbol}: Props) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Row className="text-end">
        <Col>
          <Button variant="info" onClick={() => setShow(true)}>{`Show Trade Log (${symbol})`}</Button>
        </Col>
      </Row>
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="bottom"
        scroll
        style={{height: '65vh'}}
      >
        <div className="mb-2"/>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {`Trade Log (${symbol})`}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <hr/>
        <Offcanvas.Body>
          <TradeLogOffcanvas executions={executions}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
