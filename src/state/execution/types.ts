import {Execution} from '../../types/execution';
import {StateBase} from '../types';


export const EXECUTION_STATE_NAME = 'Execution';

export enum ExecutionDispatcherName {
  UPDATE = 'updateExecution',
}

export type ExecutionState = StateBase & Execution;

export type ExecutionSelectorReturn = Execution;
