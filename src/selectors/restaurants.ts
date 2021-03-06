import { MemoRappModelState, Restaurant } from '../types';

export const getRestaurants = (state: MemoRappModelState): Restaurant[] => {
  return state.restaurantsState.restaurants;
};

export const getSelectedRestaurant = (state: MemoRappModelState): Restaurant => {
  return state.restaurantsState.selectedRestaurant;
};

// TEDTODO - current slow method
export const getRestaurantByName = (state: MemoRappModelState, name: string): Restaurant | null => {
  // state.restaurantsState.restaurants.
  for (const restaurant of state.restaurantsState.restaurants) {
    if (restaurant.name === name) {
      return restaurant;
    }
  }
  return null;
}
