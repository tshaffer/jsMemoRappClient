import { isNil } from 'lodash';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Restaurant } from '../types';
import { getRestaurants } from '../selectors';

export interface RestaurantResultsProps {
  restaurants: Restaurant[];
}


const RestaurantResults = (props: RestaurantResultsProps) => {

  return (

    <div>Pizza</div>

  );

};

function mapStateToProps(state: any) {
  return {
    restaurants: getRestaurants(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantResults);
