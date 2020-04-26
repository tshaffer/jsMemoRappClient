import { MemoRappModelState, TagEntity } from '../types';

export const getMemoRappTags = (state: MemoRappModelState): TagEntity[] => {
  return state.tags;
};

export const getMemoRappTagValues = (state: MemoRappModelState): string[] => {
  return state.tags.map((tagEntity: TagEntity) => {
    return tagEntity.value;
  });
};

