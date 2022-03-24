import React from 'react';

import {useAnimation} from '../../hooks/animation';
import styles from './main.module.scss';


const getAnimationClassName = (secLeft: number): string => {
  if (secLeft < 10) {
    return styles['period-timer-closing'];
  }
  if (secLeft < 20) {
    return styles['period-timer-warning'];
  }
  return styles['period-timer-running'];
};

type Props = {
  periodSec: number,
};

export const PeriodTimer = ({periodSec}: Props) => {
  const [secLeft, setSecLeft] = React.useState(periodSec - (Date.now() / 1000) % periodSec);
  const secLeftElemRef = useAnimation({
    deps: [secLeft],
  });

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setSecLeft(periodSec - (Date.now() / 1000) % periodSec);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <span
      className={`${styles['period-timer']} ${getAnimationClassName(secLeft)}`}
      ref={secLeftElemRef}
    >
      {secLeft.toFixed(0)}&nbsp;s&nbsp;until&nbsp;reset
    </span>
  );
};
