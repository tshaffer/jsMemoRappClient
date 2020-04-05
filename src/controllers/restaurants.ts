import axios from 'axios';
import { rejects } from 'assert';

const serverUrl = 'http://localhost:8000';
const apiUrlFragment = '/api/v1/';

// {{URL}}/api/v1/yelpRestaurants?latitude=37.378424&longitude=-122.117042
export const findRestaurantsByLocation = (latitude: number, longitude: number): Promise<any> => {
  console.log('findRestaurantsByLocation invoked');
  console.log('findRestaurantsByLocation dispatched');
  const path = serverUrl + apiUrlFragment + '/yelpRestaurants?latitude=' + latitude.toString() + '&longitude=' + longitude.toString();
  return axios.get(path)
    .then((response) => {
      const restaurants: any[] = response.data as any[];
      console.log(restaurants);
      // for (const tag of tags) {
      //   dispatch(addTag(tag));
      // }
      return Promise.resolve(restaurants);
    }).catch((err: Error) => {
      console.log(err);
      return Promise.reject(err);
    });
};
