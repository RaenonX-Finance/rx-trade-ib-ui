import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {useSocket} from '../../../../hooks/socket/main';
import {openOrderDispatchers} from '../../../../state/openOrder/dispatchers';
import {OpenOrderDispatcherName} from '../../../../state/openOrder/types';
import {useDispatch} from '../../../../state/store';
import {OrderSide} from '../../../../types/common';
import {OpenOrderData} from '../../../../types/openOrder';
import {forceMinTick} from '../../../../utils/calc';
import {OrderPanelProps} from '../type';
import {calculateNewAvgPx, calculatePnL, sideMultiplier} from '../utils';
import styles from './main.module.scss';


const orderSideClassName: {[side in OrderSide]: string} = {
  BUY: styles['buy'],
  SELL: styles['sell'],
};

type Props = OrderPanelProps & {
  order: OpenOrderData,
};

export const OrderListEntry = ({state, position, multiplier, order}: Props) => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const [allowUpdate, setAllowUpdate] = React.useState(false);

  const {pxTick} = state;
  const {position: pos, avgPx} = position;
  const signedQuantity = sideMultiplier[order.side] * order.quantity;

  const onOrderCancel = (orderId: number) => () => {
    socket.emit('orderCancel', orderId.toString());
    setAllowUpdate(false);
  };

  const onOrderUpdate = () => {
    socket.emit('orderPlace', JSON.stringify(order));
    setAllowUpdate(false);
  };

  return (
    <tr>
      <td className={orderSideClassName[order.side]}>
        {order.side}
      </td>
      <td>
        <Form.Control
          type="number"
          value={forceMinTick(order.px, pxTick)}
          className="text-end"
          onChange={(e) => {
            dispatch(openOrderDispatchers[OpenOrderDispatcherName.UPDATE_SINGLE]({
              ...order,
              px: forceMinTick(parseFloat(e.currentTarget.value), pxTick),
            }));
            setAllowUpdate(true);
          }}
          onMouseOver={(e) => e.currentTarget.focus()}
          step={pxTick}
        />
      </td>
      <td className="text-end">
        {
          pos !== 0 && (pos * sideMultiplier[order.side]) < 0 ?
            ((order.px - avgPx) * Math.sign(pos)).toFixed(2) :
            ''
        }
      </td>
      <td>
        <Form.Control
          type="number"
          value={order.quantity}
          className="text-end"
          onChange={(e) => {
            dispatch(openOrderDispatchers[OpenOrderDispatcherName.UPDATE_SINGLE]({
              ...order,
              quantity: Math.max(1, parseInt(e.currentTarget.value)),
            }));
            setAllowUpdate(true);
          }}
          onMouseOver={(e) => e.currentTarget.focus()}
        />
      </td>
      <td className="text-end">
        {calculateNewAvgPx(avgPx, pos, order.px, signedQuantity)
          .toFixed(2)}
      </td>
      <td>
        {calculatePnL(avgPx, pos, order.px, signedQuantity, multiplier)?.toFixed(2) || ''}
      </td>
      <td>
        <Button variant="outline-warning" onClick={onOrderUpdate} disabled={!allowUpdate} className="me-2">
          Update
        </Button>
        <Button variant="outline-danger" onClick={onOrderCancel(order.orderId)}>
          Cancel
        </Button>
      </td>
    </tr>
  );
};
