import React from 'react';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {bearishColor, bullishColor} from '../../../../components/chart/pxData/plot/const';
import {Direction} from '../../../../types/common';
import {ExtremaDataPoint, PxDataExtrema, PxDataExtremaDataKey} from '../../../../types/pxData';
import {PxExtremaCdfPlotProps} from './plot';
import {PxExtremaSwingPointsTable} from './pointsTable/main';
import {PxExtremaCDFSingleSide} from './side';


type DisplayEntryType = 'pos' | 'neg' | 'all';

type Props = Pick<PxExtremaCdfPlotProps, 'decimals' | 'currentPct'> & {
  points: PxDataExtrema['points'],
  pointKey: PxDataExtremaDataKey,
  currentSide: Direction,
  reverseOnNegative: boolean,
};

export const PxExtremaCDF = ({points, pointKey, currentSide, currentPct, decimals, reverseOnNegative}: Props) => {
  const [display, setDisplay] = React.useState<DisplayEntryType>('all');

  const pointsOnTable: {[key in DisplayEntryType]: ExtremaDataPoint[]} = {
    pos: points.filter(({diff}) => diff > 0),
    neg: points.filter(({diff}) => diff < 0),
    all: points,
  };

  const pos = pointsOnTable['pos'].map((point) => point[pointKey]);
  const neg = pointsOnTable['neg'].map((point) => point[pointKey]);

  return (
    <>
      <Row>
        <Col>
          <PxExtremaCDFSingleSide
            title="Upward swing"
            data={pos}
            currentPct={currentSide === 'UP' ? currentPct : undefined}
            decimals={decimals}
            stroke={bullishColor}
            syncId="data"
          />
        </Col>
        <Col>
          <PxExtremaCDFSingleSide
            title="Downward swing"
            data={neg}
            currentPct={currentSide === 'DOWN' ? currentPct : undefined}
            decimals={decimals}
            stroke={bearishColor}
            reverseX={reverseOnNegative}
            syncId="data"
          />
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <ButtonGroup vertical>
            <Button variant={display === 'pos' ? 'success' : 'outline-success'} onClick={() => setDisplay('pos')}>
              <i className="bi bi-plus-lg"/>
            </Button>
            <Button variant={display === 'neg' ? 'danger' : 'outline-danger'} onClick={() => setDisplay('neg')}>
              <i className="bi bi-dash-lg"/>
            </Button>
            <Button variant={display === 'all' ? 'info' : 'outline-info'} onClick={() => setDisplay('all')}>
              <i className="bi bi-plus-slash-minus"/>
            </Button>
          </ButtonGroup>
        </Col>
        <Col>
          <PxExtremaSwingPointsTable points={pointsOnTable[display]}/>
        </Col>
      </Row>
    </>
  );
};
