import {SecurityIdentifier} from './common';


export type PositionData = {
  identifier: number,
  position: number,
  avgPx: number,
};

export type Position = Record<SecurityIdentifier, PositionData>;
