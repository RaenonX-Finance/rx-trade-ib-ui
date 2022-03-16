import {LineStyle} from 'lightweight-charts';

import {OpenOrderData} from '../../../../../types/openOrder';
import {formatSignedNumber} from '../../../../../utils/string';
import {OnPxChartUpdatedEvent} from '../../type';
import {orderSideColor} from '../const';
import {handlePxLines} from './pxSeries';


export const handleOpenOrder = (e: OnPxChartUpdatedEvent) => {
  handlePxLines(
    e,
    {
      objectKey: 'openOrders',
      axisLabelVisible: true,
      getData: (e) => Object.values(e.payload.openOrder || {}),
      getPx: (data: OpenOrderData) => data.px,
      getLabelTitle: ({side, px, quantity}, currentPx, decimalPlaces) => {
        const diff = formatSignedNumber(px - currentPx, decimalPlaces);
        return `${side} @ ${px} x ${quantity} (${diff})`;
      },
      getPxLineColor: ({side}) => orderSideColor[side],
      getPxLineStyle: () => LineStyle.Dotted,
    },
  );
};
