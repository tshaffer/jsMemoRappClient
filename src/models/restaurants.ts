import { cloneDeep } from 'lodash';
import { MemoRappModelBaseAction } from './baseAction';
import { RestaurantsState, Restaurant, UserReviews, TagEntity, Review } from '../types/base';

// ------------------------------------
// Constants
// ------------------------------------

export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const ADD_RESTAURANT_REVIEW = 'ADD_RESTAURANT_REVIEW';
export const SET_SELECTED_RESTAURANT = 'SET_SELECTED_RESTAURANT';
export const SET_RESTAURANT_ID = 'SET_RESTAURANT_ID';
export const SET_RESTAURANT_TAGS = 'SET_RESTAURANT_TAGS';

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

export const addRestaurantReviewToRedux = (
  restaurantDbId: string,
  userName: string,
  tags: TagEntity[],
  date: Date,
  rating: number,
  wouldReturn: boolean,
  comments: string,
) => {
  return {
    type: ADD_RESTAURANT_REVIEW,
    payload: {
      restaurantDbId,
      userName,
      tags,
      date,
      rating,
      wouldReturn,
      comments,
    },
  };
};

export const setSelectedRestaurant = (restaurant: Restaurant) => {
  return {
    type: SET_SELECTED_RESTAURANT,
    payload: restaurant,
  };
};

export const setRestaurantId = (restaurant: Restaurant) => {
  return {
    type: SET_RESTAURANT_ID,
    payload: restaurant,
  };
};

export const setRestaurantTags = (restaurant: Restaurant) => {
  return {
    type: SET_RESTAURANT_TAGS,
    payload: restaurant,
  };
}
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
    case ADD_RESTAURANT_REVIEW: {
      debugger;
      const newState = cloneDeep(state) as RestaurantsState;
      // const restaurants: Restaurant[] = newState.restaurants;
      // for (const restaurant of restaurants) {
      //   if (restaurant.name === action.payload.restaurant.name) {
      //     const restaurantReviews = restaurant.reviews;
      //     restaurantReviews.push(action.payload.review);
      //   }
      // }

      const restaurants: Restaurant[] = newState.restaurants;
      for (const restaurant of restaurants) {
        if (restaurant._id === action.payload.restaurantDbId) {
          const usersReviews: UserReviews[] = restaurant.usersReviews;
          for (const userReviews of usersReviews) {
            if (userReviews.userName === action.payload.userName) {
              userReviews.tags = action.payload.tags;
              const review: Review = {
                date: action.payload.date,
                comments: action.payload.comments,
                rating: action.payload.rating,
                wouldReturn: action.payload.wouldReturn,
              };
              userReviews.reviews.push(review);
            }
          }
        }
      }

      return newState;
    }
    case SET_SELECTED_RESTAURANT: {
      return {
        ...state,
        selectedRestaurant: action.payload,
      };
    }
    case SET_RESTAURANT_ID: {
      const newState = cloneDeep(state) as RestaurantsState;
      const restaurants: Restaurant[] = newState.restaurants;
      for (const restaurant of restaurants) {
        if (restaurant.name === action.payload.name) {
          restaurant._id = action.payload._id;
        }
      }
      return newState;
    }
    // case SET_RESTAURANT_TAGS: {
    //   const newState = cloneDeep(state) as RestaurantsState;
    //   const restaurants: Restaurant[] = newState.restaurants;
    //   for (const restaurant of restaurants) {
    //     if (restaurant._id === action.payload._id) {
    //       restaurant.tags = cloneDeep(action.payload.tags);
    //     }
    //   }
    //   return newState;
    // }
    default:
      return state;
  }
};

