import {LineStyle} from 'lightweight-charts';

import {OpenOrderData} from '../../../../../types/openOrder';
import {formatSignedNumber} from '../../../../../utils/string';
import {OnPxChartUpdatedEvent} from '../../type';
import {openOrderColor} from '../const';
import {handlePxLines} from './pxSeries';


export const handleOpenOrder = (e: OnPxChartUpdatedEvent) => {
  handlePxLines(
    e,
    {
      objectKey: 'openOrders',
      getData: (e) => e.payload.openOrder,
      getPx: (data: OpenOrderData) => data.price,
      getLabelTitle: ({side, type, price, quantity}, currentPx, decimalPlaces) => {
        const diff = formatSignedNumber(price - currentPx, decimalPlaces);
        return `${side} ${type} @ ${price} x ${quantity} (${diff})`;
      },
      getPxLineColor: ({side}) => openOrderColor[side],
      getPxLineStyle: () => LineStyle.SparseDotted,
    },
  );
};
