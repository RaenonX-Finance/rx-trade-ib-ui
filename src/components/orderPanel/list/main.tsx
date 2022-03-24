import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

import {useSocket} from '../../../hooks/socket/main';
import {openOrderDispatchers} from '../../../state/openOrder/dispatchers';
import {useOpenOrderSelector} from '../../../state/openOrder/selector';
import {OpenOrderDispatcherName} from '../../../state/openOrder/types';
import {useDispatch} from '../../../state/store';
import {OrderPanelProps} from '../type';
import {OrderListButtonBar} from './bar';
import {OrderListEntry} from './entry';


export const OrderList = (props: OrderPanelProps) => {
  const socket = useSocket();
  const dispatch = useDispatch();

  const {identifier} = props;
  const {openOrders: openOrderCollection, sortedOrderIds: sortedOrderIdCollection} = useOpenOrderSelector();
  const openOrders = openOrderCollection[identifier];
  const sortedOrderIds = sortedOrderIdCollection[identifier];
  const [pendingUpdate, setPendingUpdate] = React.useState<Record<number, boolean>>(
    openOrders ?
      Object.fromEntries(Object.keys(openOrders).map((orderId) => [orderId, false])) :
      {},
  );

  if (!openOrders) {
    return <Alert variant="info">No active orders.</Alert>;
  }

  const onReset = () => {
    socket.emit('openOrder', '');
  };

  const setPendingUpdateOfOrder = (orderId: number, flag: boolean) => {
    setPendingUpdate({
      ...pendingUpdate,
      [orderId]: flag,
    });
  };

  return (
    <>
      <OrderListButtonBar onReset={onReset}/>
      <Table responsive className="align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Side</th>
            <th>Type</th>
            <th>Px</th>
            <th>Px Side</th>
            <th>Quantity</th>
            <th>New Avg Px</th>
            <th>PnL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrderIds.map((orderId) => (
            <OrderListEntry
              key={orderId}
              order={openOrders[orderId]}
              allowUpdate={pendingUpdate[orderId]}
              onEdited={() => setPendingUpdateOfOrder(orderId, true)}
              onSubmittedModification={() => {
                setPendingUpdateOfOrder(orderId, false);
                dispatch(openOrderDispatchers[OpenOrderDispatcherName.SORT]());
              }}
              {...props}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};
