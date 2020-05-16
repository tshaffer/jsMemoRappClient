import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
  RestaurantSearchResults
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
  };

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
