import {PxChartUpdatedEventHandler} from '../../type';
import {handleAvgCost} from './cost';
import {handleExecution} from './execution';
import {handleOpenOrder} from './openOrder';
import {handleOrderEntry} from './orderEntry';
import {handlePrice} from './price';
import {handleSR} from './sr';
import {handleVwap} from './vwap';


export const onPxChartUpdated: PxChartUpdatedEventHandler = (e) => {
  handlePrice(e);
  handleVwap(e);
  handleSR(e);
  handleAvgCost(e);
  handleOpenOrder(e);
  handleExecution(e);
  handleOrderEntry(e);
};
