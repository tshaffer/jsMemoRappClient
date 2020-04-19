import { MemoRappModelState, TagEntity } from '../types';

export const getMemoRappTags = (state: MemoRappModelState): string[] => {
  return state.tags;
};

