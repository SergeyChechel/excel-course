import {TABLE_RESIZE} from './types';
import {CHANGE_TEXT} from '@/redux/types';

// Action creator
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}
