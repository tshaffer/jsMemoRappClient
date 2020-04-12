import { MemoRappModelState, Restaurant } from '../types';

export const getRestaurants = (state: MemoRappModelState): Restaurant[] => {
  return state.restaurantsState.restaurants;
};

export const getSelectedRestaurant = (state: MemoRappModelState): Restaurant => {
  return state.restaurantsState.selectedRestaurant;
};