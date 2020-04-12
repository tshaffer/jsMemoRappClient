import { cloneDeep } from 'lodash';
import { MemoRappModelBaseAction } from './baseAction';
import { RestaurantsState, Restaurant } from '../types/base';

// ------------------------------------
// Constants
// ------------------------------------

export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const SET_SELECTED_RESTAURANT = 'SET_SELECTED_RESTAURANT';

// ------------------------------------
// Actions
// ------------------------------------

export const addRestaurant = (
  restaurant: Restaurant,
) => {
  return {
    type: ADD_RESTAURANT,
    payload: restaurant,
  };
};

export const setSelectedRestaurant = (restaurant: Restaurant) => {
  return {
    type: SET_SELECTED_RESTAURANT,
    payload: restaurant,
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: RestaurantsState = {
  selectedRestaurant: null,
  restaurants: [],
};

export const restaurantsReducer = (
  state: RestaurantsState = initialState,
  action: MemoRappModelBaseAction<any>
): RestaurantsState => {
  switch (action.type) {
    case ADD_RESTAURANT: {
      const newRestaurants = cloneDeep(state.restaurants);
      newRestaurants.push(action.payload);
      return {
        ...state,
        restaurants: newRestaurants,
      };
    }
    case SET_SELECTED_RESTAURANT: {
      return {
        ...state,
        selectedRestaurant: action.payload,
      };
    }
    default:
      return state;
  }
};

