import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {bearishColor, bullishColor} from '../../../../components/chart/pxData/plot/const';
import {Direction} from '../../../../types/common';
import {PxDataExtrema, PxDataExtremaDataKey} from '../../../../types/pxData';
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
  const pos = points.filter(({diff}) => diff > 0).map((point) => point[pointKey]);
  const neg = points.filter(({diff}) => diff < 0).map((point) => point[pointKey]);

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
      <PxExtremaSwingPointsTable points={points}/>
    </>
  );
};
