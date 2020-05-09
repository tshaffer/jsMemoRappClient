import { isNil } from 'lodash';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { Restaurant, RestaurantSearchResults } from '../types';
import {
  getSearchTags,
  getSearchResults,
} from '../selectors';


export interface RestaurantResultsProps {
  id: string;
  searchTags: string[];
  searchResults: RestaurantSearchResults | {};
}

const RestaurantResults = (props: RestaurantResultsProps) => {

  const handleFilterResults = (event: any) => {
    console.log('navigate to filterSearchResults');
  };

  const renderSearchTags = () => {
    return (
      <div>
        Search Tags:
        {
          props.searchTags.map((searchTag: string) => {
            return (
              <div>{searchTag}</div>
            );
          })
        }
      </div>
    );
  };

  const renderMemoRappRestaunts = () => {
    return (
      <div>MemoRappRestaurants</div>
    );
  };

  const renderYelpRestaurants = () => {
    return (
      <div>YelpRestaurants</div>
    );
  };

  const renderRestaurants = () => {
    return (
      <div>
        {renderMemoRappRestaunts()}
        {renderYelpRestaurants()}
      </div>

    )
  };

  return (
    <HashRouter>
      <div>
        <h2>MemoRapp</h2>
        <h3>Search Results</h3>
        <Tooltip title='Filter'>
          <IconButton
            onClick={handleFilterResults}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        {renderSearchTags()}
        {renderRestaurants()}
      </div>
    </HashRouter>
  );

};

function mapStateToProps(state: any, ownProps: any) {
  return {
    id: ownProps.match.params.id,
    searchTags: getSearchTags(state),
    searchResults: getSearchResults(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantResults);
