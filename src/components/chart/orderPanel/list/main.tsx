import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import {SocketContext} from '../../../../layout/socket/socket';
import {openOrderDispatchers} from '../../../../state/openOrder/dispatchers';
import {useOpenOrderSelector} from '../../../../state/openOrder/selector';
import {OpenOrderDispatcherName} from '../../../../state/openOrder/types';
import {useDispatch} from '../../../../state/store';
import {OrderSide} from '../../../../types/common';
import {OpenOrder, OpenOrderData} from '../../../../types/openOrder';
import {forceMinTick} from '../../../../utils/calc';
import {OrderPanelProps} from '../type';
import styles from './main.module.scss';


const orderSideClassName: {[side in OrderSide]: string} = {
  BUY: styles['buy'],
  SELL: styles['sell'],
};

export const OrderList = ({state, identifier}: OrderPanelProps) => {
  const {pxTick} = state;
  const openOrdersAll = useOpenOrderSelector().openOrders;
  const openOrders = openOrdersAll[identifier];
  const dispatch = useDispatch();
  const socket = React.useContext(SocketContext);

  if (!socket) {
    return <></>;
  }

  if (!openOrders) {
    return <Alert variant="info">No active orders.</Alert>;
  }

  const getUpdatedOpenOrders = (order: OpenOrderData): OpenOrder => {
    return {
      ...openOrdersAll,
      [identifier]: [
        ...openOrders.filter(({orderId}) => orderId != order.orderId),
        order,
      ],
    };
  };

  const onOrderCancel = (orderId: number) => () => {
    socket.emit('orderCancel', orderId.toString());
  };

  const onOrderUpdate = (openOrderId: number) => () => {
    const order = openOrders.find(({orderId}) => orderId === openOrderId);
    if (!order) {
      return;
    }

    socket.emit('orderPlace', JSON.stringify(order));
  };

  const onReset = () => {
    socket.emit('openOrder', '');
  };

  return (
    <>
      <Row className="text-end mb-2">
        <Col>
          <Button size="sm" variant="outline-danger" onClick={onReset}>
            Reset
          </Button>
        </Col>
      </Row>
      <Table responsive className="align-middle">
        <thead>
          <tr>
            <th>Side</th>
            <th>Px</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...openOrders]
            .sort((a, b) => b.px - a.px)
            .map((order, idx) => (
              <tr key={idx}>
                <td className={orderSideClassName[order.side]}>
                  {order.side}
                </td>
                <td>
                  <Form.Control
                    size="sm"
                    type="number"
                    value={forceMinTick(order.px, pxTick)}
                    className="text-end"
                    onChange={(e) => (
                      dispatch(openOrderDispatchers[OpenOrderDispatcherName.UPDATE](getUpdatedOpenOrders({
                        ...order,
                        px: forceMinTick(parseFloat(e.currentTarget.value), pxTick),
                      })))
                    )}
                    onMouseOver={(e) => e.currentTarget.focus()}
                    step={pxTick}
                  />
                </td>
                <td>
                  <Form.Control
                    size="sm"
                    type="number"
                    value={order.quantity}
                    className="text-end"
                    onChange={(e) => (
                      dispatch(openOrderDispatchers[OpenOrderDispatcherName.UPDATE](getUpdatedOpenOrders({
                        ...order,
                        quantity: Math.max(1, parseInt(e.currentTarget.value)),
                      })))
                    )}
                    onMouseOver={(e) => e.currentTarget.focus()}
                  />
                </td>
                <td>
                  <Button size="sm" variant="outline-warning" onClick={onOrderUpdate(order.orderId)} className="me-2">
                    Update
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={onOrderCancel(order.orderId)}>
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};
