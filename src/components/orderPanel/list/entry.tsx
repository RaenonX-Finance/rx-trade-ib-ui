import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import {useSocket} from '../../../hooks/socket/main';
import {openOrderDispatchers} from '../../../state/openOrder/dispatchers';
import {OpenOrderDispatcherName} from '../../../state/openOrder/types';
import {useDispatch} from '../../../state/store';
import {OrderSide} from '../../../types/common';
import {OpenOrderData} from '../../../types/openOrder';
import {OrderSocketMessage} from '../../../types/order';
import {forceMinTick} from '../../../utils/calc';
import {OrderPanelProps} from '../type';
import {calculateNewAvgPx, calculatePnL, sideMultiplier} from '../utils';
import styles from './main.module.scss';


const orderSideClassName: {[side in OrderSide]: string} = {
  BUY: styles['buy'],
  SELL: styles['sell'],
};

type Props = OrderPanelProps & {
  order: OpenOrderData,
  allowUpdate: boolean,
  onEdited: () => void,
  onSubmittedModification: () => void,
};

export const OrderListEntry = ({
  state,
  position,
  multiplier,
  order,
  allowUpdate,
  onEdited,
  onSubmittedModification,
  periodSec,
}: Props) => {
  const dispatch = useDispatch();
  const socket = useSocket();

  const {pxTick} = state;
  const {position: pos, avgPx} = position;
  const signedQuantity = sideMultiplier[order.side] * order.quantity;

  const onOrderCancel = (orderId: number) => () => {
    socket.emit('orderCancel', orderId.toString());
    onSubmittedModification();
  };

  const onOrderUpdate = () => {
    const orderMessageBody: OrderSocketMessage = {
      ...order,
      periodSec,
      forceBracket: null,
    };
    socket.emit('orderPlace', JSON.stringify(orderMessageBody));
    onSubmittedModification();
  };

  const onOrderButtonClicked = (diff: number) => () => {
    dispatch(openOrderDispatchers[OpenOrderDispatcherName.UPDATE_SINGLE]({
      ...order,
      px: forceMinTick(order.px + diff, pxTick),
    }));
    onEdited();
  };

  return (
    <tr className={styles['order-entry-row']}>
      <td>
        {order.groupId}
      </td>
      <td className={orderSideClassName[order.side]}>
        {order.side}
      </td>
      <td>
        {order.type}
      </td>
      <td>
        <InputGroup>
          <Button
            variant="outline-danger"
            size="sm"
            className={styles['order-px-button']}
            onClick={onOrderButtonClicked(-pxTick)}
          >
            <i className="bi bi-dash-lg"/>
          </Button>
          <Form.Control
            type="number"
            value={forceMinTick(order.px, pxTick)}
            className="text-end"
            onChange={(e) => {
              dispatch(openOrderDispatchers[OpenOrderDispatcherName.UPDATE_SINGLE]({
                ...order,
                px: forceMinTick(parseFloat(e.currentTarget.value), pxTick),
              }));
              onEdited();
            }}
            onMouseOver={(e) => e.currentTarget.focus()}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') {
                return;
              }

              onOrderUpdate();
            }}
            step={pxTick * 4}
          />
          <Button
            variant="outline-success"
            size="sm"
            className={styles['order-px-button']}
            onClick={onOrderButtonClicked(pxTick)}
          >
            <i className="bi bi-plus-lg"/>
          </Button>
        </InputGroup>
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
            onEdited();
          }}
          onMouseOver={(e) => e.currentTarget.focus()}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') {
              return;
            }

            onOrderUpdate();
          }}
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
        <Button variant="outline-warning" size="sm" onClick={onOrderUpdate} disabled={!allowUpdate} className="me-2">
          Update
        </Button>
        <Button variant="outline-danger" size="sm" onClick={onOrderCancel(order.orderId)}>
          Cancel
        </Button>
      </td>
    </tr>
  );
};
