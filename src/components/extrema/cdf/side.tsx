import React from 'react';

import {toCdfData} from '../../../utils/cdf';
import {PxExtremaCdfPlot, PxExtremaCdfPlotProps} from './plot';


type Props = Pick<PxExtremaCdfPlotProps, 'decimals' | 'currentPct' | 'stroke' | 'reverseX' | 'syncId'> & {
  title: string,
  data: number[],
};

export const PxExtremaCDFSingleSide = (props: Props) => {
  const {title, data, reverseX} = props;
  const cdfData = toCdfData(data, reverseX || false);

  return (
    <>
      <h4>{title}</h4>
      <PxExtremaCdfPlot {...props} data={cdfData}/>
    </>
  );
};
