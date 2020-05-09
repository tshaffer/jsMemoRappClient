import { isNil } from 'lodash';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { Restaurant } from '../types';
import {
  getRestaurants,
  getSearchTags,
} from '../selectors';


export interface RestaurantResultsProps {
  id: string;
  restaurants: Restaurant[];
  searchTags: string[];
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
          props.searchTags.map( (searchTag: string) => {
            return (
              <div>{searchTag}</div>
            );
          })
        }
      </div>
    );
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
      </div>
    </HashRouter>
  );

};

function mapStateToProps(state: any, ownProps: any) {
  return {
    id: ownProps.match.params.id,
    restaurants: getRestaurants(state),
    searchTags: getSearchTags(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantResults);
