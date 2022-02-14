import {PxChartInitEventHandler} from '../../type';
import {handleLegendUpdate} from '../eventHandler';
import {handlePrice} from './price';
import {handleSR} from './sr';
import {handleVwap} from './vwap';


export const onPxChartInit: PxChartInitEventHandler = (e) => {
  const price = handlePrice(e);
  const vwap = handleVwap(e);
  const srLevelLines = handleSR(e, price);
  handleLegendUpdate(e, vwap, price);

  return {series: {price, vwap, avgCost: null}, lines: {srLevelLines, openOrders: {}}};
};
