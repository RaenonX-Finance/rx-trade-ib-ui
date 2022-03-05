import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {ExecutionGroup} from '../../../types/execution';
import {TradeLogOffcanvas} from './body';


type Props = {
  executions: ExecutionGroup[],
  symbol: string,
};

export const TradeLog = ({executions, symbol}: Props) => {
  const [show, setShow] = React.useState(false);
  const [showNoPnL, setShowNoPnL] = React.useState(false);

  return (
    <>
      <Button size="sm" variant="info" onClick={() => setShow(true)}>
        {`Trade Log (${symbol})`}
      </Button>
      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="bottom"
        scroll
        style={{height: '65vh'}}
      >
        <div className="mb-1"/>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {`Trade Log (${symbol})`}
          </Offcanvas.Title>
          <Col className="me-2">
            <Button className="float-end" variant="info" onClick={() => setShowNoPnL(!showNoPnL)}>
              {`${showNoPnL ? 'Hide' : 'Show'} no PnL`}
            </Button>
          </Col>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <TradeLogOffcanvas executions={executions} showNoPnL={showNoPnL}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
