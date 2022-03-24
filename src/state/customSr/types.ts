import {CustomSrLevelDict} from '../../types/init';
import {StateBase} from '../types';


export const SR_CUSTOM_STATE_NAME = 'SrCustom';

export enum SrCustomDispatcherName {
  UPDATE = 'updateCustomSr'
}

export type CustomSrLevelState = StateBase & CustomSrLevelDict;

export type CustomSrLevelSelectorReturn = CustomSrLevelDict;
