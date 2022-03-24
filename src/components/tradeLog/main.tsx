import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {ExecutionGroup} from '../../types/execution';
import {SignFilterButtons} from '../common/signFilter/main';
import {DisplayEntryType} from '../common/signFilter/type';
import {TradeLogOffcanvas} from './body';
import {PnLTrend} from './pnlTrend/main';
import {TradeLogProps} from './type';


export const TradeLog = (props: TradeLogProps) => {
  const {executions, symbol} = props;

  const [show, setShow] = React.useState(false);
  const [showNoPnL, setShowNoPnL] = React.useState(false);
  const [showPnLTrend, setShowPnLTrend] = React.useState(false);
  const [display, setDisplay] = React.useState<DisplayEntryType>('all');

  const executionsToShow: {[key in DisplayEntryType]: ExecutionGroup[]} = {
    pos: executions.filter(({realizedPnL}) => realizedPnL && realizedPnL > 0),
    neg: executions.filter(({realizedPnL}) => realizedPnL && realizedPnL < 0),
    all: executions,
  };

  return (
    <>
      <PnLTrend show={showPnLTrend} setShow={setShowPnLTrend} {...props}/>
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
            <Button
              className="float-end"
              variant="info"
              onClick={() => setShowNoPnL(!showNoPnL)}
              disabled={display !== 'all'}
            >
              {`${showNoPnL ? 'Hide' : 'Show'} no PnL`}
            </Button>
            <Button
              className="float-end me-2"
              variant="primary"
              onClick={() => setShowPnLTrend(true)}
            >
              PnL Trend
            </Button>
            <SignFilterButtons
              className="float-end me-2"
              display={display}
              setDisplay={setDisplay}
            />
          </Col>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <TradeLogOffcanvas executions={executionsToShow[display]} showNoPnL={showNoPnL}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
