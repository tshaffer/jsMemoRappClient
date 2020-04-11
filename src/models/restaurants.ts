import { cloneDeep } from 'lodash';

// ------------------------------------
// Constants

import {  MemoRappModelBaseAction } from './baseAction';

export const ADD_RESTAURANT = 'ADD_RESTAURANT';

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

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: any[] = [];

export const restaurantsReducer = (
  state: any[] = initialState,
  action: MemoRappModelBaseAction<AddRestaurantPayload>
): string[] => {
  switch (action.type) {
    case ADD_RESTAURANT: {
      const newState = cloneDeep(state);
      newState.push(action.payload);
      return newState;
    }
    default:
      return state;
  }
};

