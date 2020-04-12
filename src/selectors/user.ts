import { MemoRappModelState, User } from '../types';

export const getUser = (state: MemoRappModelState): User => {
  return state.user;
}
