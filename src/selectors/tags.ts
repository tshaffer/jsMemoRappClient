import { MemoRappModelState, TagEntity } from '../types';

export const getMemoRappTags = (state: MemoRappModelState): TagEntity[] => {
  return state.tags;
};
