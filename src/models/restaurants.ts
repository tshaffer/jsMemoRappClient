import { cloneDeep } from 'lodash';
import { MemoRappModelBaseAction } from './baseAction';
import { RestaurantsState, Restaurant, UserReviews, TagEntity, Review, RestaurantSearchResults } from '../types/base';

// ------------------------------------
// Constants
// ------------------------------------

export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const ADD_RESTAURANT_REVIEW = 'ADD_RESTAURANT_REVIEW';
export const SET_SELECTED_RESTAURANT = 'SET_SELECTED_RESTAURANT';
export const SET_RESTAURANT_ID = 'SET_RESTAURANT_ID';
export const SET_RESTAURANT_TAGS = 'SET_RESTAURANT_TAGS';
export const SET_RESTAURANT_RESULTS = 'SET_RESTAURANT_RESULTS';

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

interface RestaurantReviewPayload {
  restaurantDbId: string;
  userName: string;
  tags: TagEntity[];
  date: Date;
  rating: number;
  wouldReturn: boolean;
  comments: string;
}

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
};

export const setRestaurantSearchResults = (memoRappRestaurants: any[], yelpRestaurants: any[]) => {
  return {
    type: SET_RESTAURANT_RESULTS,
    payload: {
      memoRappRestaurants,
      yelpRestaurants,
    }
  };
};

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: RestaurantsState = {
  selectedRestaurant: null,
  restaurants: [],
  restaurantSearchResults: {},
};

export const restaurantsReducer = (
  state: RestaurantsState = initialState,
  action: MemoRappModelBaseAction<Restaurant & RestaurantReviewPayload & RestaurantSearchResults>
): RestaurantsState => {
  switch (action.type) {
    case ADD_RESTAURANT: {
      const newRestaurants = cloneDeep(state.restaurants) as Restaurant[];
      newRestaurants.push(action.payload);
      return {
        ...state,
        restaurants: newRestaurants,
      };
    }
    case ADD_RESTAURANT_REVIEW: {

      const newState = cloneDeep(state) as RestaurantsState;

      const { restaurantDbId, tags, userName, date, comments, rating, wouldReturn } = action.payload;
      const review: Review = {
        date,
        comments,
        rating,
        wouldReturn,
      };

      const restaurants: Restaurant[] = newState.restaurants;
      for (const restaurant of restaurants) {
        if (restaurant._id === restaurantDbId) {

          const usersReviews: UserReviews[] = restaurant.usersReviews;
          for (const userReviews of usersReviews) {
            if (userReviews.userName === userName) {
              userReviews.tags = tags;
              userReviews.reviews.push(review);
              return newState;
            }
          }

          // first review for userName
          const usersReview: UserReviews = {
            userName,
            tags,
            reviews: [review],
          };
          restaurant.usersReviews.push(usersReview);
          return newState;
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
    case SET_RESTAURANT_RESULTS: {
      return {
        ...state,
        restaurantSearchResults: action.payload,
      };
    }
    default:
      return state;
  }
};

