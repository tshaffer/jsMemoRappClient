import axios from 'axios';
import { Restaurant, RestaurantReview, User } from '../types';

const serverUrl = 'http://localhost:8000';
const apiUrlFragment = '/api/v1/';

export const findRestaurantsByLocation = (latitude: number, longitude: number): Promise<any> => {
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

export const addRestaurant = (restaurant: Restaurant): Promise<any> => {
  const path = serverUrl + apiUrlFragment + '/restaurant';
  return axios.post(
    path,
    restaurant,
  )
  .then((response) => {
    console.log(response);
    return Promise.resolve();
  })
  .catch((error) => {
    console.log(error);
    return Promise.reject(error);
  });
};

export const addRestaurantReview = (restaurant: Restaurant, restaurantReview: RestaurantReview): Promise<any> => {
  const path = serverUrl + apiUrlFragment + '/restaurantReview/' + restaurant._id;

  return axios.post(
    path,
    restaurantReview,
  ).then((response) => {
    console.log(response);
    return Promise.resolve();
  }).catch((error) => {
    console.log(error);
    return Promise.reject(error);
  });
};
