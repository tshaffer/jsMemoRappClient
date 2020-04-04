/** @module Model:base */

import {
  combineReducers
} from 'redux';
import { MemoRappModelState } from '../types';

import { tagsReducer } from './tags';
import { userReducer } from './user';

// -----------------------------------------------------------------------
// Reducers
// -----------------------------------------------------------------------
export const rootReducer = combineReducers<MemoRappModelState>({
  tags: tagsReducer,
  user: userReducer,
});

// -----------------------------------------------------------------------
// Validators
// -----------------------------------------------------------------------

