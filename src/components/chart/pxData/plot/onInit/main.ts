import {PxChartInitEventHandler} from '../../type';
import {handleLegendUpdate} from '../eventHandler';
import {handlePxClick} from './order';
import {handlePrice} from './price';
import {handleSR} from './sr';
import {handleVwap} from './vwap';


export const onPxChartInit: PxChartInitEventHandler = (e) => {
  const price = handlePrice(e);
  const vwap = handleVwap(e);
  const srLevelLines = handleSR(e, price);
  handleLegendUpdate(e, vwap, price);
  handlePxClick(e, price);

  return {
    series: {price, vwap, avgCost: null, orderEntry: null},
    lines: {srLevelLines, openOrders: {}},
    position: null,
  };
};
