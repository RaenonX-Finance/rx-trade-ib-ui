import {LineStyle} from 'lightweight-charts';

import {OpenOrderData} from '../../../../../types/openOrder';
import {OnPxChartUpdatedEvent} from '../../type';
import {orderSideColor} from '../const';
import {handlePxLines} from './pxSeries';


export const handleOpenOrder = (e: OnPxChartUpdatedEvent) => {
  handlePxLines<OpenOrderData>(
    e,
    {
      objectKey: 'openOrders',
      getData: (e) => Object.values(e.payload.openOrder || {}),
      getPx: ({px}) => px,
      getLabelTitle: ({side, px, quantity}) => `${side} @ ${px} x ${quantity}`,
      getPxLineColor: ({side}) => orderSideColor[side],
      getPxLineStyle: () => LineStyle.LargeDashed,
      getAxisLabelVisible: () => true,
      getLineWidth: () => 2,
    },
  );
};
