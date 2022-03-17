import React from 'react';

import {PxDataIndividual, PxDataIndividualProps} from './individual';


type Props = PxDataIndividualProps;

export const PxDataAlwaysShow = (props: Props) => {
  return <PxDataIndividual {...props}/>;
};
