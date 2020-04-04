// ------------------------------------
// Constants

import { MemoRappModelBaseAction } from './baseAction';
import { User } from '../types';

// ------------------------------------
export const SET_USER = 'SET_USER';

// ------------------------------------
// Actions
// ------------------------------------
export interface SetUserPayload {
  user: User;
}

export const setUser = (
  user: User,
): MemoRappModelBaseAction<SetUserPayload> => {
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState: User = {
  userName: '',
  password: '',
  email: '',
};

export const userReducer = (
  state: User = initialState,
  action: MemoRappModelBaseAction<SetUserPayload>
): User => {
  switch (action.type) {
    case SET_USER: {
      return action.payload.user;
    }
    default:
      return state;
  }
};

