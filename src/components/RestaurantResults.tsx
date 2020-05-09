import { isNil } from 'lodash';

import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Restaurant } from '../types';
import { getRestaurants } from '../selectors';

export interface RestaurantResultsProps {
  id: string;
  restaurants: Restaurant[];
}


const RestaurantResults = (props: RestaurantResultsProps) => {

  return (

    <div>
      <div>Pizza</div>
      <div>{props.id}</div>
    </div>

  );

};

function mapStateToProps(state: any, ownProps: any) {
  return {
    id: ownProps.match.params.id,
    restaurants: getRestaurants(state),
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantResults);
