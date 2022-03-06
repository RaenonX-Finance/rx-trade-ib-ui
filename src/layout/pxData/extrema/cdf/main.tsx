import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {bearishColor, bullishColor} from '../../../../components/chart/pxData/plot/const';
import {PxDataExtremaData} from '../../../../types/pxData';
import {PxExtremaCdfPlotProps} from './plot';
import {PxExtremaCDFSingleSide} from './side';


type Props = Pick<PxExtremaCdfPlotProps, 'decimals' | 'currentPct'> & {
  data: PxDataExtremaData,
  currentSide: keyof PxDataExtremaData,
  reverseOnNegative: boolean,
};

export const PxExtremaCDF = ({data, currentSide, currentPct, decimals, reverseOnNegative}: Props) => {
  const {pos, neg} = data;

  return (
    <Row>
      <Col>
        <PxExtremaCDFSingleSide
          title="Upward swing"
          data={pos}
          currentPct={currentSide === 'pos' ? currentPct : undefined}
          decimals={decimals}
          stroke={bullishColor}
          syncId="data"
        />
      </Col>
      <Col>
        <PxExtremaCDFSingleSide
          title="Downward swing"
          data={neg}
          currentPct={currentSide === 'neg' ? currentPct : undefined}
          decimals={decimals}
          stroke={bearishColor}
          reverseX={reverseOnNegative}
          syncId="data"
        />
      </Col>
    </Row>
  );
};
