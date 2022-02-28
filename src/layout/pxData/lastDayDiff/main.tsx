import React from 'react';

import {useAnimation} from '../../../hooks/animation';
import {PxData} from '../../../types/pxData';
import {getDecimalPlaces} from '../../../utils/calc';
import {formatSignedNumber} from '../../../utils/string';
import styles from './main.module.scss';


type Props = {
  data: PxData,
};

export const PxLastDayDiff = ({data}: Props) => {
  const currentPx = data.data.at(-1)?.close;
  const lastClose = data.lastDayClose;

  const decimals = getDecimalPlaces(data.contract.minTick);
  const diff = (currentPx || 0) - (lastClose || 0);
  const diffPct = currentPx && lastClose ? (diff / lastClose * 100) : 0;

  const elemRef = useAnimation({
    deps: [diff],
  });

  if (!currentPx || !lastClose) {
    return <></>;
  }

  return (
    <span ref={elemRef} className={diff > 0 ? styles['last-day-diff-up'] : styles['last-day-diff-down']}>
      {`${formatSignedNumber(diff, decimals)} (${formatSignedNumber(diffPct, 2)}%)`}
    </span>
  );
};
