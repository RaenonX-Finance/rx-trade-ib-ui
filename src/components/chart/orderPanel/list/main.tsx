import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import {SocketContext} from '../../../../layout/socket/socket';
import {useOpenOrderSelector} from '../../../../state/openOrder/selector';
import {forceMinTick} from '../../../../utils/calc';
import {openOrderColor} from '../../pxData/plot/const';
import {OrderPanelProps} from '../type';


export const OrderList = ({state, identifier}: OrderPanelProps) => {
  const {pxTick} = state;
  const openOrders = useOpenOrderSelector()[identifier];
  const socket = React.useContext(SocketContext);

  if (!socket) {
    return <></>;
  }

  if (!openOrders) {
    return <Alert variant="info">No active orders.</Alert>;
  }

  const onOrderCancel = (orderId: number) => () => {
    socket.emit('orderCancel', orderId.toString());
  };

  return (
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
          .sort((a, b) => b.price - a.price)
          .map((order, idx) => (
            <tr key={idx}>
              <td style={{color: openOrderColor[order.side]}}>{order.side}</td>
              <td>
                {forceMinTick(order.price, pxTick)}
              </td>
              <td>{order.quantity}</td>
              <td>
                <Button size="sm" variant="warning" className="me-2">Update</Button>
                <Button size="sm" variant="danger" onClick={onOrderCancel(order.orderId)}>Cancel</Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
