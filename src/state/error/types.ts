import {ErrorMessage} from '../../types/error';
import {StateBase} from '../types';


export const ERROR_STATE_NAME = 'Error';

export enum ErrorDispatcherName {
  UPDATE = 'updateErrorMessage',
  HIDE_ERROR = 'hideError',
}

export type ErrorState = StateBase & ErrorMessage & {
  show: boolean,
};

export type ErrorSelectorReturn = ErrorState;
