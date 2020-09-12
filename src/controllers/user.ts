import { isNil } from 'lodash';

import axios from 'axios';
import { User } from '../types';

const serverUrl = 'http://localhost:8000';
// const serverUrl = 'http://192.168.0.106:8000';
const apiUrlFragment = '/api/v1/';

export const validateUser = (userName: string, password: string): any => {
  console.log('validateUser invoked');
  const path = serverUrl + apiUrlFragment + '/user/' + userName + '/password/' + password;
  return axios.get(path)
    .then((response) => {
      if (isNil(response.data)) {
        console.log('validation failed');
        return Promise.reject(null);
      }
      else {
        const user: User = response.data as User;
        console.log(user);
        // dispatch(setUser(user));
        return Promise.resolve(user);
      }

    }).catch((err: Error) => {
      console.log(err);
      return Promise.reject(err);
    });
};
