import { MemoRappModelState } from '../types';

export const getRestaurants = (state: MemoRappModelState): any[] => {
  return state.restaurantsState.restaurants;
};

