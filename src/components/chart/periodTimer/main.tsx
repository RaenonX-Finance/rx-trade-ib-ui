import React from 'react';

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
  const secLeftElemRef = React.useRef<HTMLSpanElement>(null);
  const [secLeft, setSecLeft] = React.useState(periodSec - (Date.now() / 1000) % periodSec);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setSecLeft(periodSec - (Date.now() / 1000) % periodSec);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    if (secLeftElemRef.current) {
      // Trigger animation
      secLeftElemRef.current.style.animation = 'none';
      secLeftElemRef.current.offsetHeight;
      secLeftElemRef.current.style.animation = '';
    }
  }, [secLeft]);

  return (
    <span
      className={`${styles['period-timer']} ${getAnimationClassName(secLeft)}`}
      ref={secLeftElemRef}
    >
      {secLeft.toFixed(0)}&nbsp;s&nbsp;until&nbsp;reset
    </span>
  );
};
