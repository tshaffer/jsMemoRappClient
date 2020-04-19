import { cloneDeep } from 'lodash';

import { TagEntity } from '../types';

import { TagAction, MemoRappModelBaseAction } from './baseAction';

// ------------------------------------
export const ADD_TAG = 'ADD_TAG';

// ------------------------------------
// Actions
// ------------------------------------

export const addTag = (
  tag: TagEntity,
): TagAction<TagEntity> => {

  return {
    type: ADD_TAG,
    payload: tag,
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: TagEntity[] = [];

export const tagsReducer = (
  state: TagEntity[] = initialState,
  action: MemoRappModelBaseAction<TagEntity>
): TagEntity[] => {
  switch (action.type) {
    case ADD_TAG: {
      const newState = cloneDeep(state);
      newState.push(action.payload);
      return newState;
    }
    default:
      return state;
  }
};

