import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {Direction} from '../../../types/common';
import {ExtremaDataPoint, PxDataExtrema, PxDataExtremaDataKey} from '../../../types/pxData';
import {bearishColor, bullishColor} from '../../chart/pxData/plot/const';
import {SignFilterButtons} from '../../common/signFilter/main';
import {DisplayEntryType} from '../../common/signFilter/type';
import {PxExtremaCdfPlotProps} from './plot';
import {PxExtremaSwingPointsTable} from './pointsTable/main';
import {PxExtremaCDFSingleSide} from './side';


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
          <SignFilterButtons
            display={display}
            setDisplay={setDisplay}
            vertical
          />
        </Col>
        <Col>
          <PxExtremaSwingPointsTable points={pointsOnTable[display]}/>
        </Col>
      </Row>
    </>
  );
};
