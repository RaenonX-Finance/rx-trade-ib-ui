import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

import {SocketContext} from '../../../../layout/socket/socket';
import {useOpenOrderSelector} from '../../../../state/openOrder/selector';
import {OrderPanelProps} from '../type';
import {OrderListButtonBar} from './bar';
import {OrderListEntry} from './entry';


export const OrderList = (props: OrderPanelProps) => {
  const {identifier} = props;
  const openOrdersAll = useOpenOrderSelector().openOrders;
  const openOrders = openOrdersAll[identifier];
  const socket = React.useContext(SocketContext);

  if (!socket) {
    return <></>;
  }

  if (!openOrders) {
    return <Alert variant="info">No active orders.</Alert>;
  }

  const onReset = () => {
    socket.emit('openOrder', '');
  };

  return (
    <>
      <OrderListButtonBar onReset={onReset}/>
      <Table responsive className="align-middle">
        <thead>
          <tr>
            <th>Side</th>
            <th>Px</th>
            <th>Px Side</th>
            <th>Quantity</th>
            <th>New Avg Px</th>
            <th>PnL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...Object.values(openOrders)]
            .sort((a, b) => b.px - a.px)
            .map((order) => (
              <OrderListEntry key={order.orderId} {...props} order={order}/>
            ))}
        </tbody>
      </Table>
    </>
  );
};
