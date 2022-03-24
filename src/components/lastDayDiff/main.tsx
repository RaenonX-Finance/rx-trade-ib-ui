import React from 'react';

import {useAnimation} from '../../hooks/animation';
import {PxData} from '../../types/pxData';
import {getDecimalPlaces} from '../../utils/calc';
import {formatSignedNumber} from '../../utils/string';
import {KeysOfType} from '../../utils/types';
import styles from './main.module.scss';


type Props = {
  data: PxData,
  dataKey: KeysOfType<PxData, number | null>,
  prefix: string,
};

export const PxLastDayDiff = ({data, dataKey, prefix}: Props) => {
  const {data: pxData} = data;

  const currentPx = pxData.at(-1)?.close;
  const diffBase = data[dataKey];

  const decimals = getDecimalPlaces(data.contract.minTick);
  const diff = (currentPx || 0) - (diffBase || 0);
  const diffPct = currentPx && diffBase ? (diff / diffBase * 100) : 0;

  const elemRef = useAnimation({
    deps: [diff],
  });

  if (!currentPx || !diffBase) {
    return <></>;
  }

  return (
    <span ref={elemRef} className={diff > 0 ? styles['last-day-diff-up'] : styles['last-day-diff-down']}>
      {`${prefix} ${formatSignedNumber(diff, decimals)} (${formatSignedNumber(diffPct, 2)}%)`}
    </span>
  );
};
