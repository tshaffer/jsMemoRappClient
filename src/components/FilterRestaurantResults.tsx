import { isEmpty } from 'lodash';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Fuse from 'fuse.js';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
  RestaurantSearchResults, UserReviews
} from '../types';

import {
  getSearchResults,
} from '../selectors';

export interface FilterRestaurantResultsProps {
  searchResults: RestaurantSearchResults | {};
}

const FilterRestaurantResults = (props: FilterRestaurantResultsProps) => {

  const [_searchTerm, setSearchTerm] = React.useState('');

  const handleSearchTermChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handlePerformSearch = () => {
    console.log('perform search using search term:');
    console.log(_searchTerm);

    if (!isEmpty(props.searchResults)) {
      const memoRappRestaurants = (props.searchResults as RestaurantSearchResults).memoRappRestaurants;

      const list: any[] = [];
      for (const memoRappRestaurant of memoRappRestaurants) {
        const userReviews: UserReviews = memoRappRestaurant.usersReviews[0];
        for (const userReview of userReviews.reviews) {
          list.push({
            comments: userReview.comments
          });
        }
      }

      const options = {
        includeScore: true,
        // Search in `author` and in `tags` array
        keys: ['comments']
      };
      const fuse = new Fuse(list, options);

      const result = fuse.search(_searchTerm);
      console.log('fuzzy search results');
      console.log(result);
    }
  };

  console.log(props.searchResults);

  return (

    <HashRouter>
      <div>
        <h2>MemoRapp</h2>
        <h3>Filter Results</h3>
        <div>
          <TextField
            variant='outlined'
            margin='normal'
            id='searchCriteria'
            label='Search'
            name='search'
            autoComplete='search'
            onChange={handleSearchTermChange}
          />
        </div>
        <Button
          type='button'
          fullWidth
          variant='contained'
          color='primary'
          onClick={handlePerformSearch}
        >
          Search
        </Button>
      </div>
    </HashRouter>
  );
};

function mapStateToProps(state: any) {
  return {
    searchResults: getSearchResults(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterRestaurantResults);
