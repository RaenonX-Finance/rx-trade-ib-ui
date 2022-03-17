import {PxDataCollection} from '../types/pxData';
import {getDecimalPlaces} from './calc';


export const updateCurrentPxDataTitle = (pxDataCollection: PxDataCollection) => {
  const currentPx: {[symbol: string]: string} = {};

  Object.entries(pxDataCollection).forEach(([_, pxData]) => {
    const lastBar = pxData.data.at(-1);

    if (!lastBar) {
      return;
    }

    currentPx[pxData.contract.symbol] = lastBar.close.toFixed(getDecimalPlaces(pxData.contract.minTick));
  });

  document.title = Object.entries(currentPx).map(([symbol, px]) => `${symbol} ${px}`).join(' ');
};
