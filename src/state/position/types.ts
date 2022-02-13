import {Position} from '../../types/position';
import {StateBase} from '../types';


export const POSITION_STATE_NAME = 'Position';

export enum PositionDispatcherName {
  UPDATE = 'updatePosition',
}

export type PositionState = StateBase & Position;

export type PositionSelectorReturn = Position;
