import React from 'react';

import styles from './main.module.scss';


type Props = {
  periodMs: number,
};

export const PeriodTimer = ({periodMs}: Props) => {
  const [msToNextPeriod, setMsToNextPeriod] = React.useState(periodMs - Date.now() % periodMs);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setMsToNextPeriod(periodMs - Date.now() % periodMs);
    }, 100);

    return () => clearInterval(intervalId);
  });

  const secToNextPeriod = msToNextPeriod / 1000;

  return (
    <div
      className={
        `${styles['period-timer']} ` +
        `${secToNextPeriod < 10 ? styles['period-timer-closing'] : styles['period-timer-running']}`
      }
    >
      <span>{
        secToNextPeriod < 10 ?
          secToNextPeriod.toFixed(1) :
          secToNextPeriod.toFixed(0)
      }</span>
    </div>
  );
};
