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

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // grid styles added, some unused
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
  }),
);

export interface FilterRestaurantResultsProps {
  searchResults: RestaurantSearchResults | {};
}

const FilterRestaurantResults = (props: FilterRestaurantResultsProps) => {

  const classes = useStyles();

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
            memoRappRestaurant,
            userReview,
            comments: userReview.comments,
          });
        }
      }

      const options = {
        includeScore: true,
        includeMatches: true,
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
        <div className={classes.container}>
          <div style={{ gridColumnEnd: 'span 12' }}>
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
        </div>
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
