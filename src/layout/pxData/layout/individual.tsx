import React from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {PxDataChart} from '../../../components/chart/pxData/main';
import {toBarData} from '../../../components/chart/pxData/utils';
import {TimeAgo} from '../../../components/timeAgo/main';
import {PxData} from '../../../types/pxData';
import styles from './individual.module.scss';


type Props = {
  data: PxData,
};

export const PriceDataIndividual = ({data}: Props) => {
  const [lastUpdated, setLastUpdated] = React.useState(Date.now());
  const updateIndicatorRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (updateIndicatorRef.current) {
      // Trigger animation
      updateIndicatorRef.current.style.animation = 'none';
      updateIndicatorRef.current.offsetHeight;
      updateIndicatorRef.current.style.animation = '';
    }
  }, [lastUpdated]);

  return (
    <div>
      <h4>{data.contract.symbol}</h4>
      <Row className="g-0 mb-2">
        <Col>
          <PxDataChart
            chartData={data}
            height={700}
            onDataUpdated={({chartData, initData}) => {
              const {price} = initData.series;
              const lastPrice = chartData.data.at(-1);

              if (!lastPrice) {
                return;
              }

              price.update(toBarData(lastPrice));

              setLastUpdated(Date.now());
            }}
          />
        </Col>
      </Row>
      <Row className="g-0 text-end">
        <Col>
          <TimeAgo
            ref={updateIndicatorRef}
            epochSec={lastUpdated}
            format={(secDiffMs) => `Last updated ${secDiffMs.toFixed(2)} secs ago`}
            updateMs={100}
            className={styles['update-animation']}
          />
        </Col>
      </Row>
    </div>
  );
};
