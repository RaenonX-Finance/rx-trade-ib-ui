import {createSlice} from '@reduxjs/toolkit';

import {PxData} from '../../types/pxData';
import {PxDataMarket} from '../../types/pxDataMarket';
import {updatePxDataBar} from '../../utils/calc';
import {updateEpochSecToLocal} from '../../utils/time';
import {updateCurrentPxDataTitle} from '../../utils/title';
import {pxDataDispatchers} from './dispatchers';
import {PX_DATA_STATE_NAME, PxDataDispatcherName, PxDataState} from './types';


const initialState: PxDataState = {};

const fixPxDataEpochSec = (pxData: PxData): PxData => {
  pxData.data = pxData.data.map((item) => ({
    ...item,
    epochSec: updateEpochSecToLocal(item.epochSec),
  }));

  return pxData;
};

const slice = createSlice({
  name: PX_DATA_STATE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      pxDataDispatchers[PxDataDispatcherName.INIT],
      (state: PxDataState, {payload}: {payload: PxData[]}) => {
        payload.forEach((pxData) => state[pxData.uniqueIdentifier] = fixPxDataEpochSec(pxData));
        updateCurrentPxDataTitle(state);
      },
    );
    builder.addCase(
      pxDataDispatchers[PxDataDispatcherName.UPDATE],
      (state: PxDataState, {payload}: {payload: PxData}) => {
        state[payload.uniqueIdentifier] = fixPxDataEpochSec(payload);
        updateCurrentPxDataTitle(state);
      },
    );
    builder.addCase(
      pxDataDispatchers[PxDataDispatcherName.UPDATE_MARKET],
      (state: PxDataState, {payload}: {payload: PxDataMarket}) => {
        const {contractId, px} = payload;

        Object.entries(state).forEach(([_, pxData]) => {
          if (pxData.contract.identifier !== contractId) {
            return;
          }

          const lastBar = pxData.data.at(-1);

          if (!lastBar) {
            console.error(
              `Last data of the PxData ` +
              `(Contract: ${pxData.contract.symbol} / Period: ${pxData.periodSec} sec) undefined.`,
            );
            return;
          }

          pxData.data[pxData.data.length - 1] = updatePxDataBar(lastBar, px);
        });

        updateCurrentPxDataTitle(state);
      },
    );
  },
});

export default slice.reducer;
