import axios from 'axios';
import { addTag } from '../models/tags';

// const serverUrl = 'http://localhost:8000';
const serverUrl = 'http://192.168.0.106:8000';
const apiUrlFragment = '/api/v1/';

export const loadTags = (): any => {
  console.log('loadTags invoked');
  return (dispatch: any, getState: any): any => {
    console.log('loadTags dispatched');
    const path = serverUrl + apiUrlFragment + '/tags';
    axios.get(path)
      .then((response) => {
        const tags: any[] = response.data as any[];
        console.log(tags);

        for (const tag of tags) {
          dispatch(addTag(tag));
        }
      }).catch((err: Error) => {
        console.log(err);
      });
  };
};
