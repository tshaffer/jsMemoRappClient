import { cloneDeep } from 'lodash';
import { MemoRappModelBaseAction } from './baseAction';
import { RestaurantsState } from '../types/base';

// ------------------------------------
// Constants
// ------------------------------------

export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const SET_SELECTED_RESTAURANT = 'SET_SELECTED_RESTAURANT';

// ------------------------------------
// Actions
// ------------------------------------

export interface AddRestaurantPayload {
  name: string;
  data: any;
}

export const addRestaurant = (
  name: string,
  data: any,
): MemoRappModelBaseAction<AddRestaurantPayload> => {

  return {
    type: ADD_RESTAURANT,
    payload: {
      name,
      data,
    },
  };
};

export const setSelectedRestaurant = (restaurant: any) => {
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
  action: MemoRappModelBaseAction<AddRestaurantPayload>
): RestaurantsState => {
  switch (action.type) {
    case ADD_RESTAURANT: {
      const newRestaurants = cloneDeep(state.restaurants);
      newRestaurants.push(action.payload.data);
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

