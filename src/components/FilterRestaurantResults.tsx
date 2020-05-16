import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
  return (
    <div>Pizza</div>
  );
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    searchResults: getSearchResults(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterRestaurantResults);
