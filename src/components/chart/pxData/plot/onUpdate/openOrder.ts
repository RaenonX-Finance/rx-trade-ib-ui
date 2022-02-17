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
      getData: (e) => Object.values(e.payload.openOrder || {}),
      getPx: (data: OpenOrderData) => data.px,
      getLabelTitle: ({side, px, quantity}, currentPx, decimalPlaces) => {
        const diff = formatSignedNumber(px - currentPx, decimalPlaces);
        return `${side} @ ${px} x ${quantity} (${diff})`;
      },
      getPxLineColor: ({side}) => openOrderColor[side],
      getPxLineStyle: () => LineStyle.Dotted,
    },
  );
};
