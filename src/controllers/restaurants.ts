import axios from 'axios';
import { isString } from 'lodash';
import {
  Restaurant, TagEntity,
} from '../types';

import {
  addRestaurant,
  addRestaurantReviewToRedux,
  setRestaurantId,
  setSelectedRestaurant,
  setRestaurantTags,
} from '../models';

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

export const postMemoRappRestaurantReview = (
  restaurantDbId: string,
  userName: string,
  tags: TagEntity[],
  date: Date,
  rating: number,
  wouldReturn: boolean,
  comments: string,
): Promise<any> => {


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

export const addReview = (
  restaurantDbId: string,
  userName: string,
  tags: string[],
  date: Date,
  rating: number,
  wouldReturn: boolean,
  comments: string,
): any => {

  return (dispatch: any) => {

    const tagEntities: TagEntity[] = [];
    for (const tag of tags) {
      if (isString(tag) && tag.length > 0) {
        tagEntities.push(
          {
            value: tag.trim(),
          }
        );
      }
    }
  
    const promise = postMemoRappRestaurantReview(
      restaurantDbId,
      userName,
      tagEntities,
      date,
      rating,
      wouldReturn,
      comments,
    );
    promise.then((response: any) => {
      dispatch(addRestaurantReviewToRedux(
        restaurantDbId,
        userName,
        tagEntities,
        date,
        rating,
        wouldReturn,
        comments,  
      ));
    });
  };
};


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
