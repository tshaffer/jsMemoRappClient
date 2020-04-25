import axios from 'axios';
import { cloneDeep } from 'lodash';
import {
  Restaurant, TagEntity,
} from '../types';

import {
  addRestaurant,
  // addRestaurantReviewToRedux,
  setRestaurantId,
  setSelectedRestaurant,
  setRestaurantTags,
} from '../models';
import { getRestaurantByName } from '../selectors';

const serverUrl = 'http://localhost:8000';
const apiUrlFragment = '/api/v1/';

export const fetchAllRestaurantsByLocation = (latitude: number, longitude: number): Promise<any> => {
  const path = serverUrl + apiUrlFragment + '/restaurantsByLocation?latitude=' + latitude.toString() + '&longitude=' + longitude.toString();
  return axios.get(path)
    .then((response) => {
      const restaurants: any[] = response.data as any[];
      console.log(restaurants);
      return Promise.resolve(restaurants);
    }).catch((err: Error) => {
      console.log(err);
      return Promise.reject(err);
    });
};

export const createMemoRappRestaurant = (restaurant: Restaurant): any => {
  return (dispatch: any, getState: any) => {
    const path = serverUrl + apiUrlFragment + '/restaurant';
    return axios.post(
      path,
      restaurant,
    )
      .then((response) => {
        const addedRestaurant: Restaurant = response.data.data as Restaurant;
        console.log(addedRestaurant);

        // update restaurant in redux with db _id
        dispatch(setRestaurantId(addedRestaurant));
        // const updatedRestaurant = getRestaurantByName(getState(), addedRestaurant.name);
        // updatedRestaurant.tags = cloneDeep(restaurant.tags);
        // dispatch(setRestaurantTags(updatedRestaurant));

        return Promise.resolve(addedRestaurant);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  };
};

// identifiers required
//    restaurant id
//    user name
// data required
//    tags: string[];
//    date: Date;
//    comments: string;
//    rating: number;
//    wouldReturn: boolean;
export const addReview = (
  restaurantDbId: string,
  userName: string,
  tags: string[],
  date: Date,
  rating: number,
  wouldReturn: boolean,
  comments: string,
): any => {

  const path = serverUrl + apiUrlFragment + 'restaurantReview';
  const reviewBody: any = {
    restaurantDbId,
    userName,
    tags,
    date,
    rating,
    wouldReturn,
    comments
  };

  return axios.post(
    path,
    reviewBody,
  ).then((response) => {
    console.log(response);
    return Promise.resolve();
  }).catch((error) => {
    console.log(error);
    return Promise.reject(error);
  });
};

// export const postMemoRappRestaurantReview = (restaurant: Restaurant, restaurantReview: RestaurantReview): any => {

//   const path = serverUrl + apiUrlFragment + '/restaurantReview/' + restaurant._id;

//   return axios.post(
//     path,
//     restaurantReview,
//   ).then((response) => {
//     console.log(response);
//     return Promise.resolve();
//   }).catch((error) => {
//     console.log(error);
//     return Promise.reject(error);
//   });
// };

// export const addRestaurantReview = (restaurant: Restaurant, restaurantReview: RestaurantReview): any => {

//   return (dispatch: any) => {

//     return postMemoRappRestaurantReview(restaurant, restaurantReview)
//       .then(() => {
//         dispatch(addRestaurantReviewToRedux(restaurant, restaurantReview));
//       });
//   };
// };

export const addRestaurantToRedux = (
  restaurant: Restaurant,
) => {
  return (dispatch: any) => {
    dispatch(addRestaurant(restaurant));
  };
};

export const setSelectedRestaurantInRedux = (restaurant: Restaurant): any => {
  return (dispatch: any) => {
    dispatch(setSelectedRestaurant(restaurant));
  };
};
