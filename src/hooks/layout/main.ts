import React from 'react';

import {Dimension, UseLayoutReturn} from './type';


const getWindowDimensions = (): Dimension => {
  const {innerWidth: width, innerHeight: height} = window;
  return {width, height};
};

export const useLayout = (): UseLayoutReturn => {
  const [dimension, setDimension] = React.useState(getWindowDimensions());

  React.useEffect(() => {
    const onResize = () => {
      setDimension(getWindowDimensions());
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return {dimension};
};
